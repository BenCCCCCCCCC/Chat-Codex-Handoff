import test from 'node:test';
import assert from 'node:assert/strict';
import {createPracticeFlow, activePractice, practiceRounds, activityTime, resumePoint} from './practice.mjs';

function setup(initial) {
  let topic = initial ?? {id:'topic',createdAt:1,source:{id:'source',text:'检查条件后再行动。'},messages:[],attempts:[]};
  const calls = [], saved = [];
  let sequence = 0, reject = false, failSave = false, busy = false;
  const options = {
    getTopic:()=>topic, canStart:()=>!busy, setBusy:value=>{busy=value;}, changed(){},
    uid:()=>String(++sequence), now:()=>100+sequence,
    save:async target=>{if(failSave)throw Error('STORAGE_FAILED');saved.push(structuredClone(target));},
    request:async(path,body)=>{
      calls.push(structuredClone(body));
      if(reject){reject=false;throw Error('API_RESULT_UNAVAILABLE');}
      return {value:{question:`第 ${calls.length} 道情境问题？`,message:body.mode==='apply'?'这里是新的情境。':`对“${body.message}”的反馈。`}};
    }
  };
  return {get topic(){return topic;},calls,saved,options,flow:createPracticeFlow(options),
    rejectNext(){reject=true;},failSaving(value){failSave=value;},reload(){topic=structuredClone(saved.at(-1));return createPracticeFlow(options);}};
}

test('practice keeps questions and answer revisions separate; revisiting an answer reuses its feedback',async()=>{
  const h=setup();await h.flow.start();
  const first=activePractice(h.topic);first.draft='先检查条件。';await h.flow.answer();
  first.draft='先检查，满足条件后才行动。';await h.flow.answer();
  assert.equal(first.answers.length,2);assert(first.answers.every(a=>a.status==='complete'));
  assert.equal(h.calls[1].focus,first.question);assert.equal(h.calls[2].history[1].text,'先检查条件。');
  await h.flow.start();assert.equal(practiceRounds(h.topic).length,2);
  await h.flow.select(first.id);first.draft='先检查条件。';
  const before=h.calls.length;await h.flow.answer();assert.equal(h.calls.length,before);
  assert.equal(first.answers.length,2);assert.equal(h.topic.messages.length,0);
});

test('failed answers survive reload, never auto-retry, and an explicit retry keeps one answer record',async()=>{
  const h=setup();await h.flow.start();activePractice(h.topic).draft='我的回答';
  h.rejectNext();await assert.rejects(h.flow.answer(),/API_RESULT_UNAVAILABLE/);
  const flow=h.reload(),round=activePractice(h.topic),before=h.calls.length;
  assert.equal(round.draft,'我的回答');assert.equal(round.answers[0].status,'unknown');
  assert.equal(h.calls.length,before);assert.equal(resumePoint(h.topic).view,'practice');
  await flow.answer();assert.equal(h.calls.length,before+1);assert.equal(round.answers.length,1);
  assert.equal(round.answers[0].status,'complete');assert.equal(round.draft,'');
});

test('a received answer remains available when result persistence fails, without another dispatch',async()=>{
  const h=setup();await h.flow.start();const round=activePractice(h.topic);round.draft='保留这次回答';
  const request=h.options.request;
  h.options.request=async(...args)=>{const result=await request(...args);h.failSaving(true);return result;};
  const flow=createPracticeFlow(h.options);
  await assert.rejects(flow.answer(),/STORAGE_FAILED/);
  assert.equal(round.answers[0].status,'complete');assert.match(round.answers[0].result,/保留这次回答/);
  h.failSaving(false);await h.options.save(h.topic);
  round.draft='保留这次回答';const before=h.calls.length;await flow.answer();
  assert.equal(h.calls.length,before);assert.equal(round.answers.length,1);
});

test('resume follows recent activity and stored position; legacy practice and retention timestamps survive',()=>{
  const old={id:'z',createdAt:10,updatedAt:20,attempts:[{id:'a',createdAt:15}],resume:{view:'attempt',attemptId:'a'}};
  const recent={id:'a',createdAt:5,updatedAt:30,mode:'apply_answer',apply:{id:'legacy',createdAt:7,question:'为什么？',answer:'旧回答',result:'旧反馈'}};
  assert.equal([old,recent].sort((a,b)=>activityTime(b)-activityTime(a))[0].id,'a');
  assert.deepEqual(resumePoint(old),{view:'attempt',attemptId:'a'});
  assert.deepEqual(resumePoint(recent),{view:'practice'});
  assert.equal(activePractice(recent).answers[0].result,'旧反馈');assert.equal(recent.apply.answer,'旧回答');
  assert.equal(recent.createdAt,5);
  old.resume={view:'learn'};assert.deepEqual(resumePoint(old),{view:'learn'});
});
