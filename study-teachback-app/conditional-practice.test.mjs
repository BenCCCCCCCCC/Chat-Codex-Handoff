import test from 'node:test';
import assert from 'node:assert/strict';
import {createPracticeFlow,activePractice,resumePoint} from './practice.mjs';
import {notePracticeReference,validatePracticeEvidence,resolveConditionFeedback} from './conditional-practice.mjs';
import {answerDisposition} from './question-review.mjs';
import {makeTextAttempt} from './text-teachback.mjs';
import {scopedReport} from './judgement.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';
import {createServer} from './server.mjs';

function setup(){
  const source={id:'source',title:'两种队列',text:'预留空位时长度8最多放7个。另记计数时长度8最多放8个。队列先入先出。'};
  let topic={id:'topic',createdAt:1,source,goals:[],messages:[],attempts:[],resume:{view:'learn'}},seq=0,busy=false,reject=false,defer=false,saveFailure=false,ai=true;
  const a=makeTextAttempt(topic,{text:'我采用另记计数，可放8个。',kind:'full',assistance:'source'});topic.attempts.push(a);
  const issue={id:'count',sourceId:source.id,question:'采用什么实现？',status:'condition',condition:'采用另记计数，不预留空位。',evidence:[{materialId:source.id,title:source.title,quote:'另记计数时长度8最多放8个。'}]};
  a.judgementIssues=[issue];a.reports=[{...scopedReport({sourceId:source.id,attemptId:a.id,transcriptVersion:a.raw.id,findings:[],assessments:[{issueId:issue.id,decision:'judgeable',reason:'按计数实现可判。',findings:[]}]},source,{id:a.id,transcriptVersion:a.raw.id,spans:a.raw.spans},[issue]),id:'report',channel:'content',createdAt:2}];
  const ref={sourceId:source.id,attemptId:a.id,transcriptVersion:a.raw.id,reportId:'report',issueIds:[issue.id]},calls=[],saved=[];
  const result=body=>({sourceId:source.id,decision:defer?'deferred':'judgeable',question:body.mode==='apply'&&!defer?'沿用计数实现，换一个长度为10的队列最多存几个？':null,message:defer?'题面仍缺少必要前提，需要核对。':body.mode==='apply'?'只采用本题指定的实现。':'在本题计数实现下，回答成立。',sourceQuotes:[source.text]});
  const options={getTopic:()=>topic,canStart:()=>!busy,setBusy:v=>busy=v,changed(){},requireAI:()=>{if(!ai)throw Error('CREDENTIAL_MISSING');},uid:()=>`id-${++seq}`,now:()=>1000+seq,
    save:async()=>{if(saveFailure)throw Error('STORAGE_FAILED');saved.push(structuredClone(topic));},
    request:async(_,body)=>{calls.push(structuredClone(body));if(reject){reject=false;throw Error('API_RESULT_UNAVAILABLE');}return {value:result(body)};}};
  return {flow:createPracticeFlow(options),get topic(){return topic;},ref,calls,saved,source,result,setDefer:v=>defer=v,setAI:v=>ai=v,setSaveFailure:v=>saveFailure=v,rejectNext:()=>reject=true,
    reload(){topic=restoredCopy(structuredClone(saved.at(-1)));return createPracticeFlow(options);}};
}

test('new question carries a frozen condition; explicit repeat preserves equal answers and real reference evidence',async()=>{
  const h=setup(),old=structuredClone(h.topic.attempts[0]);await h.flow.fromConditions(h.ref);const r=activePractice(h.topic);
  assert.deepEqual(h.calls[0].practiceConditions,r.conditionContext);assert.equal(h.calls[0].history,undefined);
  notePracticeReference(r,'material','',()=>1005);r.work.selfReport='none';r.draft='十个。';await h.flow.answer();
  const first=structuredClone(r.answers[0]);assert.equal(first.evidence.references[0].kind,'material');assert.equal(first.evidence.selfReport,'none');assert.equal(r.work,null);
  // Seeing feedback later cannot rewrite evidence attached to the earlier answer.
  notePracticeReference(r,'history',first.id,()=>1010);await h.flow.again();r.draft='十个。';await h.flow.answer();
  assert.equal(r.answers.length,2);assert.deepEqual(r.answers[0],first);assert.deepEqual(r.answers[1].evidence.priorAnswerIds,[first.id]);assert.deepEqual(r.answers[1].evidence.availableFeedbackIds,[first.id]);
  assert.equal(r.answers[1].evidence.priorReferences.at(-1).kind,'history');assert.equal(h.calls[2].history,undefined);
  h.topic.attempts[0].judgementIssues[0].condition='后来换了笔记';assert.equal(r.conditionContext.issues[0].condition,'采用另记计数，不预留空位。');assert.deepEqual(h.topic.attempts[0].reports,old.reports);
  validatePracticeEvidence(r,h.source);const backup=await encodeBackup(h.topic);assert.equal(JSON.parse(backup).format,'study-teachback-export-v3');const decoded=decodeBackup(backup);assert.deepEqual(decoded.practiceRounds[0].answers,r.answers);
  const invalid=JSON.parse(backup);invalid.topic.practiceRounds[0].conditionContext.issues[0].condition='擅自改用预留空位';assert.throws(()=>decodeBackup(JSON.stringify(invalid)),/BACKUP_INVALID/);
  const before=h.calls.length;await h.flow.fromConditions(h.ref);assert.equal(h.calls.length,before);assert.equal(h.topic.practiceRounds.length,1);
});
test('failed answer retries its original snapshot; a fresh answer needs an explicit new session',async()=>{
  const h=setup();await h.flow.fromConditions(h.ref);let r=activePractice(h.topic);r.draft='十个。';h.rejectNext();await assert.rejects(h.flow.answer(),/API_RESULT_UNAVAILABLE/);
  const original=structuredClone(r.answers[0]),flow=h.reload();r=activePractice(h.topic);notePracticeReference(r,'material');
  const count=h.calls.length;assert.equal(r.answers[0].status,'unknown');await flow.answer();assert.equal(h.calls.length,count+1);assert.equal(r.answers.length,1);assert.deepEqual(r.answers[0].evidence,original.evidence);
  const final=structuredClone(r.answers[0]);await flow.answer();assert.deepEqual(r.answers[0],final);assert.equal(h.calls.length,count+1);
});
test('condition problem pauses judgement; review and revision preserve old answers and carry conditions into the new question',async()=>{
  const h=setup();await h.flow.fromConditions(h.ref);const original=activePractice(h.topic);original.draft='十个。';h.setDefer(true);await h.flow.answer();
  assert.equal(original.answers[0].conditionResult.decision,'deferred');assert.equal(original.review.origin,'condition_check');const count=h.calls.length;
  original.draft='另一个回答';await h.flow.answer();assert.equal(h.calls.length,count);
  notePracticeReference(original,'history',original.answers[0].id);
  assert.equal(original.review.note,'');original.review.note='按材料保留计数规则，在新题明确长度。';original.review.proposedQuestion='明确采用另记计数，数组长度12，最多存几个？';await h.flow.reviseQuestion();const next=activePractice(h.topic);
  assert.deepEqual(next.conditionContext,original.conditionContext);assert.equal(original.review.status,'replaced');assert.equal(answerDisposition(original,original.answers[0]),'excluded');
  assert.deepEqual(next.work.priorReferences,original.referenceLog);
  assert.equal(original.answers[0].text,'十个。');h.setDefer(false);next.draft='十二个。';await h.flow.answer();assert.equal(next.answers[0].evidence.parentQuestionId,original.id);assert.equal(h.calls.at(-1).history,undefined);
  assert.equal(decodeBackup(await encodeBackup(h.topic)).practiceRounds.length,2);
});
test('no AI or failed pre-dispatch storage cannot consume an answer session or replace history',async()=>{
  const h=setup();h.setAI(false);const before=structuredClone(h.topic);await assert.rejects(h.flow.fromConditions(h.ref),/CREDENTIAL_MISSING/);assert.equal(h.calls.length,0);assert.deepEqual(h.topic.practiceRequest,before.practiceRequest);assert.deepEqual(h.topic.resume,before.resume);
  h.setAI(true);await h.flow.fromConditions(h.ref);const r=activePractice(h.topic);r.draft='十个。';const work=structuredClone(r.work);h.setSaveFailure(true);await assert.rejects(h.flow.answer(),/STORAGE_FAILED/);
  assert.deepEqual(r.work,work);assert.equal(r.answers.length,0);assert.equal(h.calls.length,1);
  h.setSaveFailure(false);h.setDefer(true);await h.flow.start();assert.equal(h.topic.practiceRequest.status,'deferred');assert.equal(decodeBackup(await encodeBackup(h.topic)).practiceRequest.status,'deferred');
  h.topic.attempts=[];assert(!resolveConditionFeedback(h.topic,h.ref).report);assert.equal(activePractice(h.topic).conditionContext.issues[0].id,'count');
  const first=setup();first.setDefer(true);await first.flow.fromConditions(first.ref);const recovered=restoredCopy(decodeBackup(await encodeBackup(first.topic)));assert.deepEqual(resumePoint(recovered),{view:'practice'});assert.equal(recovered.practiceRequest.status,'deferred');
});
test('HTTP conditional route omits old judgements and validates source conditions before dispatch',async()=>{
  const h=setup();await h.flow.fromConditions(h.ref);const context=activePractice(h.topic).conditionContext;let input,calls=0;
  const server=createServer({keyConfigured:()=>true,book:{summary:()=>({})},semanticCall:async(_,value)=>{input=value;calls++;return {value:h.result(value)};}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  const post=context=>fetch(origin+'/api/teach',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify({source:h.source,mode:'apply_answer',focus:'长度10可放几个？',message:'十个',practiceConditions:context,history:[{role:'assistant',text:'旧判语不能进入新判断'}]})});
  try{assert.equal((await post(context)).status,200);assert.equal(input.history,undefined);assert.equal(input.answer,'十个');assert.deepEqual(input.practiceConditions.issues,context.issues);
    const bad=structuredClone(context);bad.issues[0].status='deferred';assert.equal((await post(bad)).status,422);assert.equal(calls,1);
  }finally{await new Promise(r=>server.close(r));}
});
