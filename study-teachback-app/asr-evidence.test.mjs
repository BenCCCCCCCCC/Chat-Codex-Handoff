import test from 'node:test';
import assert from 'node:assert/strict';
import {captureASREvidence} from './asr-evidence.mjs';
test('invalid provider timestamps retain allowlisted evidence before rejection',()=>{
  let saved;const data={text:'只有持票者才可入场',segments:[{text:'只有持票者才可入场',start:0,end:99}],words:[{word:'持票',start:0,end:1}],secret:'must not persist'};
  const r=captureASREvidence(data,7.31,'fictitious-credential',s=>saved=s);
  assert.equal(r.outcome,'ASR_VALIDATION_FAILED');assert.equal(saved.segments[0].end,99);assert(!('secret' in saved));
});
test('missing word timing degrades to PARTIAL; valid timestamps require human review',()=>{
  const data={text:'你好',segments:[{text:'你好',start:0,end:1}]};
  assert.equal(captureASREvidence(data,2,'fictitious-credential',()=>{}).transcription.wordTiming.status,'PARTIAL');
  data.words=[{word:'你好',start:0,end:1}];assert.equal(captureASREvidence(data,2,'fictitious-credential',()=>{}).outcome,'HTTP_PASS_TIMESTAMP_REVIEW_REQUIRED');
});
