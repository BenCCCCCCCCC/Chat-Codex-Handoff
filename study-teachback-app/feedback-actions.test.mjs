import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from './server.mjs';
import {Ledger} from './ledger.mjs';
import {repairFocus,remediationFocus,validateFindings,attemptValue} from './core.mjs';
const live=JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r3/LUNA_LOGIC_REV3.json',import.meta.url))).cases.find(c=>c.id==='self_repair');
test('retained real supported + . . remains valid evidence but has no remediation',()=>{
  const f=live.result.findings.find(f=>f.status==='supported'&&f.repair==='. .');assert(f);
  validateFindings(live.result,live.source,live.fixture,'content');assert.equal(remediationFocus(f,'content'),null);
});
test('empty-equivalent, punctuation, invisible and placeholder actionable focus fails closed',()=>{
  for(const status of ['missing','incorrect','unknown'])for(const repair of ['', '   ','. .','。。。','— —','\u200b\u2060','\n\t','N/A','N/A.','无','null','不确定','123']){
    assert.throws(()=>remediationFocus({status,repair},'content'),/INVALID_REPAIR_FOCUS/);
    assert.throws(()=>repairFocus(repair),/INVALID_REPAIR_FOCUS/);
    assert.throws(()=>attemptValue({...live.fixture,kind:'partial',focus:repair}),/INVALID_REPAIR_FOCUS/);
  }
});
test('valid missing incorrect unknown repair stays source/attempt/version bound',()=>{
  for(const status of ['missing','incorrect','unknown']){
    const r=structuredClone(live.result);r.findings=[{...r.findings[0],status,repair:'请澄清浇水的必要条件。'}];if(status==='missing')Object.assign(r.findings[0],{spanId:null,quote:null});
    assert.equal(remediationFocus(r.findings[0],'content'),'请澄清浇水的必要条件。');validateFindings(r,live.source,live.fixture,'content');
    r.findings[0].repair='. .';assert.throws(()=>validateFindings(r,live.source,live.fixture,'content'),/INVALID_REPAIR_FOCUS/);
  }
});
test('supported and all delivery statuses never expose knowledge remediation',()=>{
  assert.equal(remediationFocus({status:'supported',repair:'有效但无需修正'},'content'),null);
  for(const status of ['observation','missing','incorrect','unknown','supported'])assert.equal(remediationFocus({status,repair:'请再讲'},'delivery'),null);
});
test('direct Tutor repair request rejects invalid focus before provider invocation',async()=>{
  let calls=0;const server=createServer({book:new Ledger(join(mkdtempSync(join(tmpdir(),'feedback-gate-')),'usage.json')),semanticCall:async()=>{calls++;throw Error('UNEXPECTED_CALL');}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  try{for(const focus of ['. .','\u200b','N/A.']){const r=await fetch(origin+'/api/teach',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify({source:live.source,mode:'repair',message:'请再教',focus})});assert.equal((await r.json()).error,'INVALID_REPAIR_FOCUS');}assert.equal(calls,0);}finally{await new Promise(r=>server.close(r));}
});
