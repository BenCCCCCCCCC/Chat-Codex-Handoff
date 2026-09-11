import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { extractSource } from './ingestion.mjs';
import { createServer } from './server.mjs';
import { Ledger } from './ledger.mjs';

test('active extractor and setup have no private runtime coupling or automatic installer',()=>{
  for(const file of ['ingestion.mjs','extract_source.py','requirements-extractor.txt','README.md']){
    const s=readFileSync(new URL(file,import.meta.url),'utf8');
    assert(!/codex-runtimes|codex-primary-runtime|ChatGPT.*internals/i.test(s));
    if(file==='ingestion.mjs')assert(!/\bpip\b|https?:/.test(s));
  }
});

test('real missing interpreter and empty venv fail closed over HTTP; ledger unchanged; providers never called',async()=>{
  const root=mkdtempSync(fileURLToPath(new URL('./runtime/portability-',import.meta.url)));
  const python=fileURLToPath(new URL('./.venv/Scripts/python.exe',import.meta.url));
  const creation=spawnSync(python,['-I','-m','venv','--without-pip',root+'/empty'],{windowsHide:true,env:{SystemRoot:process.env.SystemRoot}});
  assert.equal(creation.status,0);
  const book=new Ledger(root+'/ledger.json');const before=JSON.stringify(book.read());let providerCalls=0;
  for(const [runtime,error] of [[root+'/absent/python.exe','EXTRACTOR_SETUP_REQUIRED'],[root+'/empty/Scripts/python.exe','EXTRACTOR_DEPENDENCY_REQUIRED']]){
    const server=createServer({book,semanticCall:async()=>{providerCalls++;},asrCall:async()=>{providerCalls++;},extractCall:(bytes,kind)=>extractSource(bytes,kind,{python:runtime})});
    await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
    try{for(const kind of ['txt','pdf']){const r=await fetch(origin+'/api/extract',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','X-Source-Format':kind},body:'local fixture'});assert.equal(r.status,422);assert.deepEqual(await r.json(),{error});}}
    finally{await new Promise(r=>server.close(r));}
  }
  assert.equal(providerCalls,0);assert.equal(JSON.stringify(book.read()),before);
});

