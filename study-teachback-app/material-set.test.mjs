import test from 'node:test';
import assert from 'node:assert/strict';
import {addMaterial,selectMaterials,selectContext,saveStudyIssue,validateMaterialSet} from './material-set.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';
import {makeTextAttempt} from './text-teachback.mjs';
import {searchRecords,resolveRecordHit,hasDraft} from './record-search.mjs';

const setup=()=>({id:'topic',createdAt:1,source:{id:'slides',title:'课件',text:'长度为 8 的循环队列，预留一个空位时，最多存放 7 个元素。'},goals:[],messages:[],attempts:[],mode:'learn',resume:{view:'learn'}});
function addNote(t){return addMaterial(t,{title:'笔记',text:'另记元素个数时，长度为 8 的循环队列可以存放 8 个元素。'},{uid:()=> 'notes'});}
function explain(t,value){const a=makeTextAttempt(t,{text:value,kind:'full',assistance:'none'});t.attempts.push(a);t.resume={view:'attempt',attemptId:a.id};return a;}

test('material combinations preserve separate answers, drafts, sources and exact search destinations',async()=>{
  const t=setup(),old=explain(t,'采用预留空位实现，因此是 7 个。');t.chatDraft='原问题草稿';const original=structuredClone(old);addNote(t);
  selectMaterials(t,['slides','notes'],{uid:()=> 'combined'});assert.equal(t.attempts.length,0);assert.equal(t.chatDraft,undefined);assert.equal(t.createdAt,1);
  assert.match(t.source.text,/预留一个空位/);assert.match(t.source.text,/另记元素个数/);assert.equal(t.source.provenance.regions.length,2);
  const current=explain(t,'先区分实现约定，两个条件对应不同容量。');t.chatDraft='新的草稿';
  const hits=searchRecords([t],'采用预留空位')[0].hits;assert.equal(hits[0].target.contextId,'slides');assert(resolveRecordHit(t,hits[0].key));assert(hasDraft(t));
  selectContext(t,'slides');assert.deepEqual(t.attempts[0],original);assert.equal(t.chatDraft,'原问题草稿');
  selectContext(t,'combined');assert.equal(t.attempts[0].id,current.id);assert.equal(t.chatDraft,'新的草稿');validateMaterialSet(t);
  const restored=restoredCopy(decodeBackup(await encodeBackup(t)));selectContext(restored,'slides');assert.deepEqual(restored.attempts[0],original);
});

test('condition notes keep source evidence and learning location; missing or altered evidence cannot become a decision',async()=>{
  const t=setup();addNote(t);selectMaterials(t,['slides','notes'],{uid:()=> 'combined'});const a=explain(t,'题面没有交代实现，暂时无法唯一判断。');
  const issue={question:'队列能存 7 个还是 8 个？',condition:'本题采用预留一个空位的实现。',status:'condition',evidence:t.materials.map(m=>({materialId:m.id,quote:m.text}))};
  const saved=saveStudyIssue(t,issue);assert.equal(saved.contextId,'combined');assert.equal(saved.resume.attemptId,a.id);
  assert.throws(()=>saveStudyIssue(t,{...issue,evidence:[{materialId:'notes',quote:'不存在的引文'}]}),/ISSUE_EVIDENCE_REQUIRED/);
  const backup=await encodeBackup(t);assert.equal(JSON.parse(backup).format,'study-teachback-export-v2');assert.equal(decodeBackup(backup).studyIssues[0].condition,issue.condition);
  const tampered=JSON.parse(backup);tampered.topic.materials[0].text='修改原材料';assert.throws(()=>decodeBackup(JSON.stringify(tampered)),/BACKUP_INVALID/);
  assert.throws(()=>selectMaterials(t,[]),/MATERIAL_SELECTION_REQUIRED/);assert.equal(t.source.id,'combined');
  t.practiceRounds=[{id:'question-1',createdAt:1,question:'采用预留空位时容量多少？',introduction:'',draft:'',answers:[]}];t.activePracticeId='question-1';t.resume={view:'practice'};
  const practiceIssue=saveStudyIssue(t,{...issue,status:'deferred'});t.activePracticeId='later-question';assert.equal(practiceIssue.resume.roundId,'question-1');
});

test('archived audio and unknown requests survive backup while topic expiry and single-source compatibility stay unchanged',async()=>{
  const t=setup();t.attempts=[{id:'voice',createdAt:1,kind:'full',assistance:'source',source:structuredClone(t.source),audio:new Blob(['original audio'],{type:'audio/wav'}),duration:1,raw:null,corrections:[],reports:[]}];
  t.practiceRequest={status:'pending',createdAt:1};addNote(t);selectMaterials(t,['notes']);
  const restored=restoredCopy(decodeBackup(await encodeBackup(t)),{now:100,id:'copy'});assert.equal(restored.createdAt,1);assert.equal(restored.restoredAt,100);
  selectContext(restored,'slides');assert.equal(await restored.attempts[0].audio.text(),'original audio');assert.equal(restored.practiceRequest.status,'unknown');
  const legacy=setup();assert.equal(JSON.parse(await encodeBackup(legacy)).format,'study-teachback-export-v1');assert.deepEqual(decodeBackup(await encodeBackup(legacy)),legacy);
});
