import test from 'node:test';
import assert from 'node:assert/strict';
import {addMaterial,selectMaterials,selectContext,saveStudyIssue} from './material-set.mjs';
import {captureMaterialWork,continueWithMaterials,continueStudyIssue,continuationOrigin} from './material-continuation.mjs';
import {makeTextAttempt,comparisonFor} from './text-teachback.mjs';
import {issueForAttempt,missingIssueMaterials} from './judgement.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';
const setup=()=>{
  const t={id:'t',createdAt:1,source:{id:'a',title:'课件',text:'长度8，预留空位时最多放7个。'},goals:[],messages:[],attempts:[],resume:{view:'learn'},chatDraft:'另一种实现也必须少一个吗？',contextNote:'当前要厘清实现约定。'};
  const a=makeTextAttempt(t,{kind:'full',text:'长度8最多放7个。',assistance:'source'});t.attempts.push(a);t.resume={view:'attempt',attemptId:a.id};
  a.reports.push({id:'report',channel:'content',createdAt:2,sourceId:t.source.id,attemptId:a.id,transcriptVersion:a.raw.id,findings:[]});
  addMaterial(t,{title:'补充笔记',text:'另记count、不预留空位，长度8最多放8个。'},{uid:()=> 'b'});
  const issue=saveStudyIssue(t,{question:'预留空位还是另记count？',condition:'本次另记count，不预留空位。',status:'condition',evidence:[{materialId:'b',quote:t.materials[1].text}]});return {t,a,issue};
};
test('saved cross-source condition brings its missing material and current expression into a new analysis without altering old evidence',async()=>{
  const {t,a,issue}=setup(),old=structuredClone(a);assert.deepEqual(missingIssueMaterials(issue,t),['b']);assert.throws(()=>issueForAttempt(issue,t),/ISSUE_MATERIALS_REQUIRED/);
  const next=continueStudyIssue(t,issue.id);assert.equal(next.raw.text,old.raw.text);assert.equal(next.raw.reviewed,false);assert.equal(next.reports.length,0);
  assert.equal(next.judgementIssues[0].sourceId,t.source.id);assert.equal(next.judgementIssues[0].id,issue.id);assert.equal(next.continuation.intent,'另一种实现也必须少一个吗？');assert.equal(t.contextNote,'当前要厘清实现约定。');
  assert.deepEqual(continuationOrigin(t,next.continuation).attempt,old);assert.equal(issue.contextId,'a');assert.deepEqual(missingIssueMaterials(issue,t),[]);
  const comparison=comparisonFor(t,next);assert.deepEqual(comparison.beforeReports,old.reports);assert.equal(comparison.afterReports.length,0);assert.match(comparison.note,/材料不同/);
  const backup=await encodeBackup(t);assert.equal(JSON.parse(backup).format,'study-teachback-export-v4');const restored=restoredCopy(decodeBackup(backup));assert.deepEqual(restored.attempts[0],next);selectContext(restored,'a');assert.deepEqual(restored.attempts[0],old);
});
test('continuation into an existing source workspace preserves both workspaces drafts, reports and unknown requests',async()=>{
  const {t,a}=setup();t.textDraft={kind:'full',text:'原文字草稿',assistance:'source'};const original=structuredClone(t.textDraft);
  selectMaterials(t,['a','b']);t.chatDraft='已有新问题';t.textDraft={kind:'full',text:'另一份未完成草稿',assistance:'source'};const destination=structuredClone(t.textDraft);t.practiceRequest={status:'unknown',createdAt:3};const id=t.source.id;
  selectContext(t,'a');a.contentScope='retained_fragment';a.transcriptDraft={baseVersionId:a.raw.id,updatedAt:4,edits:[{id:'p0',text:'尚未确认：是否存在不预留的实现？'}]};
  const next=continueWithMaterials(t,['a','b']);assert.equal(next.raw.text,a.transcriptDraft.edits[0].text);assert.equal(next.continuation.fromDraft,true);assert.deepEqual(t.textDraft,destination);assert.equal(t.chatDraft,'已有新问题');assert.equal(t.practiceRequest.status,'unknown');assert.equal(t.source.id,id);
  selectContext(t,'a');assert.deepEqual(t.textDraft,original);assert.equal(t.attempts[0].reports.length,1);decodeBackup(await encodeBackup(t));
  assert.equal(next.contentScope,'retained_fragment');
});
test('invalid continuation leaves the current work intact; quote coincidence cannot substitute for including the referenced material',()=>{
  const {t,issue}=setup(),before=structuredClone(t);const work=captureMaterialWork(t);work.text='字'.repeat(2001);
  assert.throws(()=>continueWithMaterials(t,['a','b'],{work}),/CONTINUATION_TOO_LONG/);assert.deepEqual(t,before);
  t.source.text+=t.materials[1].text;assert.throws(()=>issueForAttempt(issue,t),/ISSUE_MATERIALS_REQUIRED/);
});
