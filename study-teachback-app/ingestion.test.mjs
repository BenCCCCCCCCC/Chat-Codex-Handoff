import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';
import { extractSource } from './ingestion.mjs';

test('local extraction route returns exact text, rejects invalid format/origin, never invokes provider or ledger',async()=>{
  const forbidden=()=>{throw new Error('UNEXPECTED_PAID_OR_LEDGER_CALL');};
  const server=createServer({semanticCall:forbidden,asrCall:forbidden,book:{register:forbidden,summary:forbidden}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin=`http://127.0.0.1:${server.address().port}`;
  try{
    const send=(kind,body,from=origin)=>fetch(origin+'/api/extract',{method:'POST',headers:{Origin:from,'X-Study-Request':'1','X-Source-Format':kind},body});
    for(const kind of ['txt','md']){const r=await send(kind,'只有A才B。');assert.equal(r.status,200);assert.equal((await r.json()).blocks[0].text,'只有A才B。');}
    assert.equal((await send('txt','private','http://example.com')).status,403);
    const invalid=await send('exe','bad');assert.equal((await invalid.json()).error,'FORMAT_UNSUPPORTED');
    const empty=await send('txt',' ');assert.equal((await empty.json()).error,'NO_EXTRACTABLE_TEXT');
  }finally{await new Promise(r=>server.close(r));}
});
test('oversized input is rejected before subprocess extraction',()=>{
  assert.throws(()=>extractSource(Buffer.alloc(10*1024*1024+1),'txt'),/FILE_TOO_LARGE/);
});
test('Node text import preserves UTF encodings and rejects invalid, empty or oversized text without Python',()=>{
  for(const bytes of [Buffer.from('条件与例外'),Buffer.concat([Buffer.from([0xef,0xbb,0xbf]),Buffer.from('条件与例外')]),Buffer.concat([Buffer.from([0xff,0xfe]),Buffer.from('条件与例外','utf16le')])]){
    assert.equal(extractSource(bytes,'txt',{python:'absent'}).blocks[0].text,'条件与例外');
  }
  for(const [bytes,error] of [[Buffer.from([0xff]),'TEXT_ENCODING_UNSUPPORTED'],[Buffer.from('\0'),'INVALID_DOCUMENT'],[Buffer.from(' '),'NO_EXTRACTABLE_TEXT'],[Buffer.alloc(200001,65),'DOCUMENT_LIMIT']])assert.throws(()=>extractSource(bytes,'md'),new RegExp(error));
});
test('capability and identity endpoints work with missing AI and broken ledger; local import is independent of a busy model',async()=>{
  let release,entered,configured=false;const started=new Promise(r=>entered=r);const pending=new Promise(r=>release=r);let paid=0;
  const server=createServer({keyConfigured:()=>configured,capabilityCall:async()=>({text:true,office:false,pdf:false}),book:{summary:()=>({})},semanticCall:async()=>{paid++;entered();await pending;throw Error('TEST_STOP');}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  try{
    const caps=await(await fetch(origin+'/api/capabilities')).json();assert.equal(caps.ai,false);assert.equal(caps.imports.text,true);
    assert.deepEqual(await(await fetch(origin+'/api/health')).json(),{app:'zhi-er-neng-jiang',apiVersion:1});
    const headers={Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'};
    const unavailable=await fetch(origin+'/api/teach',{method:'POST',headers,body:'{}'});assert.equal((await unavailable.json()).error,'CREDENTIAL_MISSING');assert.equal(paid,0);configured=true;
    const model=fetch(origin+'/api/teach',{method:'POST',headers,body:JSON.stringify({source:{id:'s',title:'Rule',text:'Rule'},mode:'learn',message:'Explain'})});await started;
    const local=await fetch(origin+'/api/extract',{method:'POST',headers:{...headers,'X-Source-Format':'txt'},body:'Independent material'});
    assert.equal(local.status,200);assert.equal((await local.json()).blocks[0].text,'Independent material');
    release();await model;assert.equal(paid,1);
  }finally{release();await new Promise(r=>server.close(r));}
  const broken=createServer({book:{summary(){throw Error('BROKEN');}},keyConfigured:()=>false,capabilityCall:async()=>({text:true,office:false,pdf:false})});
  await new Promise(r=>broken.listen(0,'127.0.0.1',r));
  try{assert.equal((await fetch(`http://127.0.0.1:${broken.address().port}/api/health`)).status,200);}finally{await new Promise(r=>broken.close(r));}
});
