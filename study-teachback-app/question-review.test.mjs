import test from 'node:test';
import assert from 'node:assert/strict';
import {createPracticeFlow,activePractice} from './practice.mjs';
import {answerDisposition} from './question-review.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';
import {searchRecords,resolveRecordHit,hasDraft} from './record-search.mjs';
import {taskSplitCases} from './task-split-fixtures.mjs';

function harness(){
  const topic={id:'topic',createdAt:1,source:{id:'source',title:'条件',text:'只有完成备份才升级系统。'},goals:[],messages:[],attempts:[],practiceRounds:[{id:'original',createdAt:1,question:'已经备份，是否一定可以升级？',introduction:'旧情境',draft:'不能确定',assistance:'source_visible',answers:[{id:'old-answer',text:'不能确定',result:'旧反馈错误地断言你答错了。',status:'complete'}]}]};
  let seq=0,fail=false;const requests=[];
  const flow=createPracticeFlow({getTopic:()=>topic,canStart:()=>true,setBusy(){},changed(){},uid:()=>`id-${++seq}`,now:()=>100+seq,save:async()=>{if(fail)throw Error('STORAGE_FAILED');},request:async(path,body)=>{requests.push(body);return {value:{message:'新的回答反馈',question:'新问题'}};}});
  return {topic,flow,requests,fail:value=>{fail=value;},fill(){Object.assign(activePractice(topic).review,{note:'原题混淆了必要和充分条件。',basisQuote:topic.source.text,proposedQuestion:'没有完成备份，可以升级系统吗？'});}};
}
test('retaining a reviewed question preserves old answers but neither caches nor sends their excluded judgments',async()=>{
  const h=harness(),r=activePractice(h.topic),original=structuredClone(r.answers);
  await h.flow.flagQuestion();h.fill();await h.flow.answer();assert.equal(h.requests.length,0);
  await h.flow.retainQuestion();assert.deepEqual(r.answers,original);assert.equal(answerDisposition(r,r.answers[0]),'excluded');
  await h.flow.answer();assert.equal(r.answers.length,2);assert.equal(h.requests.length,1);
  assert(!JSON.stringify(h.requests[0]).includes('旧反馈'));assert.equal(answerDisposition(r,r.answers[1]),'current');
  await h.flow.flagQuestion();await h.flow.withdrawFlag();assert.equal(r.reviewHistory.length,2);
  assert.equal(answerDisposition(r,r.answers[0]),'excluded');assert.equal(answerDisposition(r,r.answers[1]),'current');
  assert.match(searchRecords([h.topic],'旧反馈')[0].hits[0].label,/不作答错依据/);
  assert.deepEqual(decodeBackup(await encodeBackup(h.topic)).practiceRounds[0].answers,r.answers);
});
test('revision requires cited material, creates an independent question once and preserves its full ancestry through backup',async()=>{
  const h=harness(),old=activePractice(h.topic),original=structuredClone({question:old.question,introduction:old.introduction,draft:old.draft,answers:old.answers});
  await h.flow.flagQuestion();h.fill();old.review.basisQuote='材料外的说法';await assert.rejects(h.flow.reviseQuestion(),/REVIEW_BASIS_REQUIRED/);assert.equal(h.topic.practiceRounds.length,1);
  h.fill();await Promise.all([h.flow.reviseQuestion(),h.flow.reviseQuestion()]);const newer=activePractice(h.topic);
  assert.equal(h.topic.practiceRounds.length,2);assert.equal(newer.draft,'');assert.equal(newer.answers.length,0);assert.equal(h.requests.length,0);
  assert.equal(hasDraft(h.topic),false);
  assert.deepEqual({question:old.question,introduction:old.introduction,draft:old.draft,answers:old.answers},original);assert.equal(answerDisposition(old,old.answers[0]),'excluded');
  await h.flow.select(old.id);await h.flow.answer();assert.equal(h.requests.length,0);await h.flow.select(newer.id);
  newer.draft='不可以。';await h.flow.answer();assert.equal(h.requests[0].focus,newer.question);assert(!JSON.stringify(h.requests[0]).includes('旧反馈'));
  await h.flow.flagQuestion();h.fill();newer.review.proposedQuestion='升级系统前必须先完成什么？';await h.flow.reviseQuestion();
  const copy=restoredCopy(decodeBackup(await encodeBackup(h.topic)));assert.equal(copy.practiceRounds.length,3);assert.deepEqual(copy.practiceRounds[0].answers,original.answers);
  const tampered=JSON.parse(await encodeBackup(h.topic));tampered.topic.practiceRounds[1].revision.parentRoundId='missing';assert.throws(()=>decodeBackup(JSON.stringify(tampered)),/BACKUP_INVALID/);
  const reopened=JSON.parse(await encodeBackup(h.topic));reopened.topic.practiceRounds[0].review=null;assert.throws(()=>decodeBackup(JSON.stringify(reopened)),/BACKUP_INVALID/);
});

test('review search resolves distinct historical notes and backups reject a resolved event as the active review',async()=>{
  const h=harness();await h.flow.flagQuestion();h.fill();activePractice(h.topic).review.note='第一次核对：范围不清';await h.flow.retainQuestion();
  await h.flow.flagQuestion();h.fill();activePractice(h.topic).review.note='第二次核对：核实前提';await h.flow.withdrawFlag();
  const hits=searchRecords([h.topic],'第二次核对')[0].hits;
  assert.equal(hits.length,1);assert.equal(resolveRecordHit(h.topic,hits[0].key).text,'第二次核对：核实前提');
  const tampered=JSON.parse(await encodeBackup(h.topic));tampered.topic.practiceRounds[0].review=structuredClone(tampered.topic.practiceRounds[0].reviewHistory[0]);
  assert.throws(()=>decodeBackup(JSON.stringify(tampered)),/BACKUP_INVALID/);
});
test('a revised local question cannot reuse its old answer key or lose the original feedback destination',async()=>{
  const h=harness(),c=taskSplitCases[0];h.topic.source=c.source;h.topic.practiceRounds=[];
  const target={attempt:c.attempt,report:c.report,findingIndex:0};await h.flow.fromFeedback(target);const old=activePractice(h.topic);
  old.draft='c0';await h.flow.answer();await h.flow.flagQuestion();h.fill();await h.flow.reviseQuestion();const newer=activePractice(h.topic);
  assert.equal(newer.task,undefined);assert.deepEqual(newer.origin,old.origin);assert.deepEqual(newer.taskTarget,old.taskTarget);
  await h.flow.fromFeedback(target);assert.equal(activePractice(h.topic).id,newer.id);
  assert.equal(decodeBackup(await encodeBackup(h.topic)).practiceRounds.length,2);
});
test('save failure retains one revision for retry and legacy pending review remains readable',async()=>{
  const h=harness();await h.flow.flagQuestion();h.fill();h.fail(true);await assert.rejects(h.flow.reviseQuestion(),/STORAGE_FAILED/);
  assert.equal(h.topic.practiceRounds.length,2);h.fail(false);await h.flow.reviseQuestion();assert.equal(h.topic.practiceRounds.length,2);assert.equal(h.requests.length,0);
  const copy=decodeBackup(await encodeBackup(h.topic));assert.equal(copy.practiceRounds[0].review.status,'replaced');
  const legacy=harness().topic;legacy.practiceRounds[0].review={status:'held',origin:'learner',createdAt:1};assert.equal(decodeBackup(await encodeBackup(legacy)).practiceRounds[0].review.status,'held');
});
