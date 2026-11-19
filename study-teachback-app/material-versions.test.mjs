import test from 'node:test';
import assert from 'node:assert/strict';
import {reviseMaterial,materialVersion,currentMaterials,revisedMaterialSelection,selectContext,saveStudyIssue,addMaterial,validateMaterialSet} from './material-set.mjs';
import {continueWithMaterials} from './material-continuation.mjs';
import {issueForAttempt,missingIssueMaterials} from './judgement.mjs';
import {makeTextAttempt} from './text-teachback.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';
import {searchRecords} from './record-search.mjs';

function fixture(){
  const value='长度8，预留一个空位，容量7。',source={id:'original',title:'课件',text:value,provenance:{fileName:'slides.pdf',text:value,regions:[{label:'第2页',start:0,end:value.length}]}};
  const t={id:'topic',createdAt:1,source,goals:[],messages:[],attempts:[],resume:{view:'learn'}};
  const a=makeTextAttempt(t,{text:'容量7。',kind:'full',assistance:'none'});t.attempts.push(a);t.resume={view:'attempt',attemptId:a.id};
  const issue=saveStudyIssue(t,{question:'容量依据？',status:'condition',condition:'预留一个空位。',evidence:[{materialId:source.id,quote:value}]});a.judgementIssues=[issueForAttempt(issue,t)];
  a.reports=[{channel:'content',sourceId:source.id,attemptId:a.id,transcriptVersion:a.raw.id,findings:[{status:'supported',message:'符合当时约定。',sourceQuote:value,spanId:a.raw.spans[0].id,quote:'容量7。',eventId:null,repair:null}]}];
  t.practiceRounds=[{id:'q1',createdAt:1,question:'若长度10呢？',introduction:'原题',draft:'待补充',answers:[{id:'answer1',text:'9',status:'complete',result:'按旧条件成立。'}]}];
  t.chatRequest={id:'pending',message:'为什么？',history:[],mode:'learn',status:'unknown',internalStarter:false};return t;
}
test('rename then revise keep exact historical sources, answers, feedback, pending request and condition evidence through v5 restore',async()=>{
  const t=fixture(),original=structuredClone(t.attempts[0]),question=structuredClone(t.practiceRounds[0]);
  const renamed=reviseMaterial(t,{baseId:'original',title:'队列课件',text:t.source.text,note:'名称更清楚'},{uid:()=> 'renamed',now:()=>2});
  assert.deepEqual(renamed.provenance,t.source.provenance);assert.equal(t.source.id,'original');assert.equal(currentMaterials(t).length,1);
  continueWithMaterials(t,revisedMaterialSelection(t,renamed.id));assert.equal(t.attempts[0].judgementIssues.length,0);assert.equal(t.attempts[0].reports.length,0);assert.equal(t.attempts[0].raw.reviewed,false);
  assert.deepEqual(t.attempts[0].continuation.unappliedConditions,['容量依据？']);
  assert.deepEqual(missingIssueMaterials(t.studyIssues[0],t),['original']);
  const revised=reviseMaterial(t,{baseId:renamed.id,title:'队列课件',text:'长度8，另记count，不预留空位，容量8。',note:'补充另一种实现'},{uid:()=> 'revised',now:()=>3});
  assert.equal(revised.provenance,undefined);continueWithMaterials(t,revisedMaterialSelection(t,revised.id));assert.equal(materialVersion(t,'revised').number,3);assert.equal(t.createdAt,1);
  const encoded=await encodeBackup(t);assert.equal(JSON.parse(encoded).format,'study-teachback-export-v5');
  const copy=restoredCopy(decodeBackup(encoded),{id:'restored',now:10});selectContext(copy,'original');
  assert.deepEqual(copy.attempts[0],original);assert.deepEqual(copy.practiceRounds[0],question);assert.equal(copy.chatRequest.status,'unknown');
  assert.equal(copy.studyIssues[0].evidence[0].materialId,'original');assert(searchRecords([copy],'队列课件')[0].hits.some(h=>h.target.materialId==='revised'));
  selectContext(copy,'revised');validateMaterialSet(copy);
});
test('revision drafts recover; no-op and stale edits do not change state; revision histories do not consume the 12 material slots',async()=>{
  const t=fixture();t.materialRevisionDraft={baseId:'original',title:'尚未保存的改名',text:t.source.text,note:'待核对'};
  assert.deepEqual(decodeBackup(await encodeBackup(t)).materialRevisionDraft,t.materialRevisionDraft);
  const before=structuredClone(t);assert.throws(()=>reviseMaterial(t,{baseId:'original',title:t.source.title,text:t.source.text}),/MATERIAL_UNCHANGED/);assert.deepEqual(t,before);
  reviseMaterial(t,t.materialRevisionDraft,{uid:()=> 'renamed',now:()=>2});
  assert.throws(()=>reviseMaterial(t,{baseId:'original',title:'过期编辑',text:t.source.text}),/MATERIAL_VERSION_CHANGED/);
  for(let i=0;i<11;i++)addMaterial(t,{title:`材料${i}`,text:'合成文字'},{uid:()=>`m${i}`});
  assert.equal(t.materials.length,13);assert.equal(currentMaterials(t).length,12);validateMaterialSet(t);
  assert.throws(()=>addMaterial(t,{title:'超额',text:'合成文字'}),/MATERIAL_LIMIT/);
  const payload=JSON.parse(await encodeBackup(t));payload.topic.materialVersions[0].parentId='renamed';assert.throws(()=>decodeBackup(JSON.stringify(payload)),/BACKUP_INVALID/);
});
