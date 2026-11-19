import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {PRODUCTION_ASR_MODEL,transcriptionForm,normalizeTranscription} from './asr-contract.mjs';
import {Ledger} from './ledger.mjs';
import {contentInput} from './core.mjs';
import {quotePlayback,playbackLabel,rawPlaybackParts} from './transcript-playback.mjs';
import {localize,confirmLocalProcess} from './diagnostic-localization.mjs';
import {encodeBackup,decodeBackup} from './backup.mjs';

test('candidate multipart contract is prepared without changing the live model or copying Whisper-only fields',()=>{
  assert.equal(PRODUCTION_ASR_MODEL,'whisper-1');
  const form=transcriptionForm(new Uint8Array([0]),{model:'gpt-transcribe',prompt:'普通话课程',terms:['循环队列','count']});
  assert.equal(form.get('model'),'gpt-transcribe');assert.deepEqual(form.getAll('languages[]'),['zh']);assert.deepEqual(form.getAll('keywords[]'),['循环队列','count']);
  for(const key of ['language','response_format','timestamp_granularities[]'])assert.equal(form.has(key),false);
  assert.throws(()=>transcriptionForm([], {model:'gpt-transcribe',terms:['<猜词>']}),/TRANSCRIPTION_TERMS_LIMIT/);
});
test('text-only transcription offers full-recording replay and cannot associate acoustic events with a sentence; backup retains that limit',async()=>{
  const source={id:'source',title:'合成样本',text:'采用预留空位时，长度8容量7。'},duration=12;
  const raw={...normalizeTranscription({text:'长度8容量8。',languages:[{code:'zh'}]},duration,'gpt-transcribe'),id:'raw',reviewed:true,model:'gpt-transcribe'};
  const a={id:'a',sourceId:source.id,transcriptVersion:raw.id,duration,spans:raw.spans,assistance:'none',kind:'full',reviewed:true,timing:'recording'};
  const finding={status:'incorrect',message:'本次约定预留空位。',sourceQuote:source.text,spanId:'s0',quote:raw.text,eventId:null,repair:'核对预留空位的用途。'};
  const report={sourceId:source.id,attemptId:'a',transcriptVersion:raw.id,findings:[finding]};
  const event={id:'e1',type:'near_silence_candidate',start:2,end:3,heard:true},evidence=confirmLocalProcess(a,event,[event]);
  assert.equal(quotePlayback(raw,raw.spans[0],raw.text).level,'recording');assert.match(playbackLabel(quotePlayback(raw,raw.spans[0],raw.text)),/未提供词句时间/);assert.equal(rawPlaybackParts(raw)[0].anchor,undefined);
  const target=localize({source,attempt:a,report,evidence:[evidence],events:[event]}).diagnosticTargets[0];
  assert.deepEqual(target.processEvidenceIds,[]);assert.equal(target.contentLocation.precision,'paragraph');assert.equal(contentInput(source,a).attempt.spans[0].start,undefined);
  const topic={id:'topic',createdAt:1,source,goals:[],messages:[],attempts:[{...a,source,createdAt:1,audio:new Blob(['synthetic']),raw,corrections:[],reports:[{...report,channel:'content'}]}]};
  const encoded=await encodeBackup(topic);assert.equal(JSON.parse(encoded).format,'study-teachback-export-v5');assert.deepEqual(decodeBackup(encoded).attempts[0].raw,raw);
  const bad=JSON.parse(encoded);bad.topic.attempts[0].raw.spans[0].end=3;assert.throws(()=>decodeBackup(JSON.stringify(bad)),/BACKUP_INVALID/);
  assert.throws(()=>normalizeTranscription({text:''},duration,'gpt-transcribe'),/INVALID_TEXT/);
  const long=normalizeTranscription({text:'材料'.repeat(1500)},duration,'gpt-transcribe');assert.equal(long.spans.length,2);assert(long.spans.every(s=>s.start===0&&s.end===duration));
});
test('mixed ASR models settle at their reservation rates, retain failed exposure and read legacy Whisper events',()=>{
  const book=new Ledger(join(mkdtempSync(join(tmpdir(),'asr-migration-')),'usage.json'));
  const legacy={type:'reserve',id:'old',model:'whisper-1',kind:'asr',attemptId:'old',input:0,output:0,minutes:3,reserveUSD:.018};
  writeFileSync(book.path,JSON.stringify({version:1,events:[legacy]}));book.settle('old',{seconds:60},'old-request');
  const candidate=book.reserve({kind:'asr',model:'gpt-transcribe',attemptId:'candidate',minutes:3});assert.equal(candidate.reserveUSD,3*.0045);
  book.settle(candidate.id,{seconds:60},'candidate-request');assert.equal(book.read().events.at(-1).costUSD,.0045);
  const failed=book.reserve({kind:'asr',model:'gpt-transcribe',attemptId:'failed',minutes:3});book.failure(failed.id,'TIMEOUT');
  assert.equal(book.summary().knownCostUSD,.006+.0045);assert.equal(book.summary().unsettled,1);
  assert.equal(book.summary().exposureUSD,.006+.0045+3*.0045);
  const before=book.summary().requests;assert.throws(()=>book.reserve({kind:'asr',model:'unknown',attemptId:'x',minutes:3}),/ASR_MODEL_UNSUPPORTED/);assert.equal(book.summary().requests,before);
});
