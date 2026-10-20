import test from 'node:test';
import assert from 'node:assert/strict';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';
import {revisedTranscript} from './core.mjs';
import {transcriptTexts,updateTranscriptDraft,analysisTrace} from './voice-review.mjs';
function fixture() {
  const source={id:'source',title:'Condition',text:'Enter only when open.'};
  const a={id:'attempt',createdAt:1000,source,kind:'full',assistance:'none',duration:1,
    audio:new Blob([new Uint8Array([0,255,13,10,77])],{type:'audio/wav'}),
    raw:{id:'raw',text:'Enter.',spans:[{id:'s0',start:0,end:1,text:'Enter.'}]},corrections:[],reports:[]};
  a.corrections.push(revisedTranscript(a,[{text:'Enter only when open.'}]));
  a.reports.push({sourceId:source.id,attemptId:a.id,transcriptVersion:a.corrections[0].id,channel:'content',
    findings:[{status:'supported',message:'Matches',sourceQuote:source.text,spanId:'s0',quote:source.text,eventId:null,repair:'Keep it.'}]});
  return {id:'topic',createdAt:1000,source,goals:[],messages:[{role:'user',text:'Why?'}],attempts:[a],
    practiceRounds:[{id:'round',createdAt:1000,question:'What if closed?',introduction:'A new context',draft:'Stay outside',
      answers:[{id:'answer',text:'Wait',status:'pending',result:null}]}],
    resume:{view:'attempt',attemptId:a.id}};
}
test('v1 backup round trip preserves audio, corrections, report links and practice; restore is a separate copy',async()=>{
  const original=fixture();original.contextNote='Remember the condition.';
  original.transcriptionTerms='新一轮的术语';
  original.practiceRounds[0].origin={targetId:'target:attempt:v1:0',sourceId:'source',attemptId:'attempt',transcriptVersion:'v1'};
  original.practiceRounds[0].review={status:'held',origin:'learner',createdAt:1001};
  original.attempts[0].transcriptionTerms=['华硕','Eee PC'];
  // New supported findings carry no advice; legacy string advice is tested separately.
  original.attempts[0].reports[0].findings[0].repair=null;
  updateTranscriptDraft(original.attempts[0],[{id:'s0',text:'Unconfirmed edit'}]);
  original.attempts[0].reports[0].analysis=analysisTrace({model:'test',requestId:'req_test',reservationId:'local_test'});
  const text=await encodeBackup(original), decoded=decodeBackup(text);
  const copy=restoredCopy(decoded,{id:'copy',now:900000000});
  assert.equal(copy.createdAt,original.createdAt);assert.equal(copy.restoredAt,900000000);
  assert.equal(copy.restoredFrom,original.id);assert.notEqual(copy.id,original.id);
  assert.deepEqual(copy.attempts[0].raw,original.attempts[0].raw);
  assert.deepEqual(copy.attempts[0].corrections,original.attempts[0].corrections);
  assert.deepEqual(copy.attempts[0].reports,original.attempts[0].reports);
  assert.equal(copy.contextNote,original.contextNote);
  assert.equal(copy.transcriptionTerms,original.transcriptionTerms);
  assert.deepEqual(copy.attempts[0].transcriptionTerms,['华硕','Eee PC']);
  assert.deepEqual(transcriptTexts(copy.attempts[0]),['Unconfirmed edit']);
  assert.equal(copy.attempts[0].corrections.length,1,'saving a draft creates no confirmed version');
  assert.deepEqual(await copy.attempts[0].audio.arrayBuffer(),await original.attempts[0].audio.arrayBuffer());
  assert.deepEqual(copy.resume,original.resume);
  assert.equal(copy.practiceRounds[0].draft,'Stay outside');
  assert.deepEqual(copy.practiceRounds[0].origin,original.practiceRounds[0].origin);
  assert.deepEqual(copy.practiceRounds[0].review,original.practiceRounds[0].review);
  assert.equal(copy.practiceRounds[0].answers[0].status,'unknown');
  assert.equal(original.practiceRounds[0].answers[0].status,'pending');
});
test('reject unrelated or broken backups before storage; source/report binding cannot be silently changed',async()=>{
  assert.throws(()=>decodeBackup('{}'),/BACKUP_FORMAT/);
  assert.throws(()=>decodeBackup('{"format":'),/BACKUP_INVALID/);
  const original=JSON.parse(await encodeBackup(fixture()));
  const broken=structuredClone(original);broken.topic.attempts[0].reports[0].transcriptVersion='missing';
  assert.throws(()=>decodeBackup(JSON.stringify(broken)),/BACKUP_INVALID/);
  const audio=structuredClone(original);audio.topic.attempts[0].audio.base64='not base64';
  assert.throws(()=>decodeBackup(JSON.stringify(audio)),/BACKUP_INVALID/);
  const old={format:original.format,topic:{...original.topic,attempts:[],practiceRounds:undefined,
    apply:{question:'Legacy question',answer:'Legacy answer',result:'Legacy feedback'}}};
  assert.equal(decodeBackup(JSON.stringify(old)).apply.result,'Legacy feedback');
});
