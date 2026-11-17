import test from 'node:test';
import assert from 'node:assert/strict';
import {feedbackReference,resolveFeedback} from './feedback-reference.mjs';
import {createPracticeFlow} from './practice.mjs';
import {taskSplitCases} from './task-split-fixtures.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';

test('two reports on one version keep separate practice origins across backup, deletion and reload',async()=>{
  const c=structuredClone(taskSplitCases[0]),a={...c.attempt,source:c.source,createdAt:1,audio:new Blob(['audio']),raw:{id:c.attempt.transcriptVersion,spans:c.attempt.spans,reviewed:true},corrections:[],reports:[]};
  const r1={...c.report,channel:'content'},r2=structuredClone(r1);a.reports.push(r1,r2);
  const topic={id:'topic',createdAt:1,source:c.source,goals:[],messages:[],attempts:[a]};let seq=0;
  const flow=createPracticeFlow({getTopic:()=>topic,canStart:()=>true,setBusy(){},save:async()=>{},changed(){},request:()=>assert.fail('No provider request'),uid:()=>`round-${++seq}`});
  for(const report of a.reports)await flow.fromFeedback({attempt:c.attempt,report:c.report,findingIndex:0,feedbackRef:feedbackReference(a,report,0,()=>`report-${++seq}`)});
  assert.equal(topic.practiceRounds.length,2);
  const copy=restoredCopy(decodeBackup(await encodeBackup(topic))),round=copy.practiceRounds[0];
  assert.equal(resolveFeedback(copy,round.origin,round.taskTarget).report.id,r1.id);
  const legacy={...round.origin};delete legacy.feedbackRef;
  assert.match(resolveFeedback(copy,legacy,round.taskTarget).reason,/多份/);
  copy.attempts[0].reports.pop();assert.equal(resolveFeedback(copy,legacy,round.taskTarget).report.id,r1.id);
  copy.attempts=[];assert.match(resolveFeedback(copy,round.origin,round.taskTarget).reason,/删除/);
  assert.equal(decodeBackup(await encodeBackup(copy)).practiceRounds.length,2);
});
