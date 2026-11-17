import test from 'node:test';
import assert from 'node:assert/strict';
import {judgementIssues,scopedReport,sameJudgement,validateJudgementReport} from './judgement.mjs';
import {makeTextAttempt} from './text-teachback.mjs';
import {encodeBackup,decodeBackup} from './backup.mjs';
import {createServer} from './server.mjs';

const source={id:'queue',title:'两种实现',text:'预留空位时，长度8最多存7个。另记计数时，长度8最多存8个。队列按先入先出。'};
const issue=(status='deferred')=>({id:status,sourceId:source.id,question:'队列能放几个？',status,condition:status==='condition'?'本次采用另记计数。':'题目尚未说明实现。',evidence:[{materialId:'notes',title:'笔记',quote:'另记计数时，长度8最多存8个。'}]});
const topic=()=>({id:'topic',createdAt:1,source,goals:[],messages:[],attempts:[]});
function fixture(){const t=topic(),a=makeTextAttempt(t,{text:'能放8个。队列按先入先出。',kind:'full',assistance:'none'});t.attempts.push(a);return {t,a,attempt:{id:a.id,transcriptVersion:a.raw.id,spans:a.raw.spans,inputMode:'text',sourceId:source.id,kind:'full',assistance:'none',reviewed:true}};}
const finding=(attempt,scoped=false)=>({status:'supported',message:scoped?'在计数实现下，容量表达成立。':'先入先出表达成立。',sourceQuote:scoped?'另记计数时，长度8最多存8个。':'队列按先入先出。',spanId:attempt.spans[0].id,quote:scoped?'能放8个。':'队列按先入先出。',eventId:null,repair:null});
function response(attempt,i){return {sourceId:source.id,attemptId:attempt.id,transcriptVersion:attempt.transcriptVersion,findings:[finding(attempt)],assessments:[{issueId:i.id,decision:i.status==='deferred'?'deferred':'judgeable',reason:i.status==='deferred'?'先确认题目采用哪种实现。':'按明确选用的计数实现核对。',findings:i.status==='deferred'?[]:[finding(attempt,true)]}]};}

test('deferred scope has no verdict while unrelated knowledge can still receive feedback',()=>{
  const {attempt}=fixture(),i=issue(),value=response(attempt,i),report=scopedReport(value,source,attempt,[i]);
  assert.equal(report.findings.length,1);assert.equal(report.judgement.assessments[0].decision,'deferred');assert.deepEqual(report.judgement.assessments[0].findingIndexes,[]);
  for(const modify of [v=>v.assessments[0].decision='judgeable',v=>v.assessments[0].findings=[finding(attempt,true)],v=>v.assessments=[]]){
    const invalid=structuredClone(value);modify(invalid);assert.throws(()=>scopedReport(invalid,source,attempt,[i]));
  }
});
test('adopted condition binds reports, supports later deferral and never rewrites original feedback',async()=>{
  const {t,a,attempt}=fixture(),i=issue('condition');a.judgementIssues=[i];
  const report={...scopedReport(response(attempt,i),source,attempt,[i]),id:'first',channel:'content',createdAt:2};a.reports.push(report);const original=structuredClone(report);
  assert(sameJudgement(report,a.judgementIssues));assert.deepEqual(report.judgement.assessments[0].findingIndexes,[1]);
  a.judgementIssues=[issue()];assert(!sameJudgement(report,a.judgementIssues));assert.deepEqual(report,original);
  const restored=decodeBackup(await encodeBackup(t));assert.deepEqual(restored.attempts[0].reports[0],original);assert.deepEqual(restored.attempts[0].judgementIssues,a.judgementIssues);
  const invalid=structuredClone(report);invalid.judgement.assessments[0].decision='deferred';assert.throws(()=>validateJudgementReport(invalid,source,attempt));
  const value=response(attempt,i);value.assessments[0]={issueId:i.id,decision:'deferred',reason:'所选前提仍不足以确定当前情境。',findings:[]};assert.equal(scopedReport(value,source,attempt,[i]).findings.length,1);
});
test('condition evidence must belong to this source; legacy reports remain readable',()=>{
  const {attempt}=fixture(),i=issue();assert.throws(()=>judgementIssues([{...i,sourceId:'other'}],source));assert.throws(()=>judgementIssues([{...i,evidence:[{...i.evidence[0],quote:'不存在'}]}],source));
  const value=response(attempt,i);delete value.assessments;assert.equal(validateJudgementReport(value,source,attempt,[]),value);assert(sameJudgement(value,undefined));
});
test('actual HTTP diagnosis dispatch carries explicit choices and rejects a verdict for deferred work',async()=>{
  const {attempt}=fixture(),i=issue();let received,calls=0,invalid=false;
  const server=createServer({keyConfigured:()=>true,book:{summary:()=>({})},semanticCall:async(prompt,input)=>{calls++;received={prompt,input};const value=response(attempt,i);if(invalid)value.assessments[0].findings=[finding(attempt,true)];return {value};}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  const post=issues=>fetch(origin+'/api/diagnose',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify({source,attempt,channel:'content',judgementIssues:issues})});
  try{const ok=await post([i]);assert.equal(ok.status,200);assert.equal((await ok.json()).value.judgement.assessments[0].decision,'deferred');assert.deepEqual(received.input.judgementIssues,[i]);
    invalid=true;const rejected=await post([i]);assert.equal(rejected.status,422);assert.equal((await rejected.json()).error,'DEFERRED_JUDGEMENT');
    const count=calls;assert.equal((await post([{...i,sourceId:'other'}])).status,422);assert.equal(calls,count);
  }finally{await new Promise(r=>server.close(r));}
});
