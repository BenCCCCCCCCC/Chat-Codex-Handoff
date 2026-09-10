import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeASR,replayAnchor,contentInput} from './core.mjs';
const fixture=JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r2/SYNTHETIC_ASR_FIELDS.json',import.meta.url)));
test('real fifth response preserves all provider values; segment PASS, 22 words PARTIAL',()=>{
  const before=JSON.stringify(fixture),r=normalizeASR(fixture,7.31);assert.equal(r.spans.length,1);assert.equal(r.words.length,22);
  assert.equal(r.wordTiming.status,'PARTIAL');assert.deepEqual(r.wordTiming.unusableWordIds,['w14']);assert.equal(r.words[14].timingQuality,'UNUSABLE_ZERO_DURATION');
  r.words.forEach((w,i)=>{assert.equal(w.start,fixture.words[i].start);assert.equal(w.end,fixture.words[i].end);assert.equal(w.text,fixture.words[i].word);});assert.equal(JSON.stringify(fixture),before);
});
test('malformed words reversed, nonfinite, out-of-range and backwards rejected',()=>{
  for(const change of [d=>d.words[0].end=-1,d=>d.words[0].start=NaN,d=>d.words[0].end=Infinity,d=>d.words[0].start=-1,d=>d.words[0].end=8,d=>d.words[2].start=0,d=>d.words[2].end=.7]){const d=structuredClone(fixture);change(d);assert.throws(()=>normalizeASR(d,7.31));}
});
test('segments retain hard positive duration, finite range and order gates',()=>{
  for(const change of [d=>d.segments[0].end=0,d=>d.segments[0].end=8,d=>d.segments[0].start=NaN,d=>d.segments[0].text='',d=>d.segments=[{text:'a',start:2,end:3},{text:'b',start:1,end:2}]]){const d=structuredClone(fixture);change(d);assert.throws(()=>normalizeASR(d,7.31));}
});
test('critical unusable/missing word falls back to segment, diagnosis blocked before confirmation',()=>{
  const r=normalizeASR(fixture,7.31);
  for(const wordId of ['w14','missing']){const a=replayAnchor(r,'s0',wordId);assert.equal(a.level,'segment');assert.equal(a.preciseWordAnchor,false);assert.equal(a.end,r.spans[0].end);assert(a.reviewRequired);}
  assert.equal(replayAnchor(r,'s0','w0').level,'word');
  const source={id:'src',title:'rule',text:fixture.text};
  for(const critical of ['不要','20','只有','土壤']){const a={id:'a',sourceId:'src',transcriptVersion:'raw',duration:7.31,spans:[{...r.spans[0],text:critical}],assistance:'none',kind:'full',reviewed:false,interrupted:false};assert.throws(()=>contentInput(source,a),/ASR_REVIEW_REQUIRED/);assert.doesNotThrow(()=>contentInput(source,{...a,reviewed:true}));}
});
test('missing word timing is PARTIAL and has no precise anchor',()=>{const d=structuredClone(fixture);delete d.words;const r=normalizeASR(d,7.31);assert(r.wordTiming.missing);assert.equal(replayAnchor(r,'s0','w0').level,'segment');});
