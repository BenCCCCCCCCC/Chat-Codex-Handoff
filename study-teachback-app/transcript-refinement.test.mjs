import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {wordPlayback,rawPlaybackParts,quotePlayback} from './transcript-playback.mjs';
import {criticalPresence,speechScore} from './natural-speech-eval.mjs';
import {speechCases} from './natural-speech-fixtures.mjs';
import {waveBytes} from './core.mjs';
import {transcribe,ASR_STYLE_PROMPT} from './provider.mjs';
import {Ledger} from './ledger.mjs';
import {transcriptionTerms} from './transcription-terms.mjs';

const raw=JSON.parse(readFileSync(new URL('../docs/research/voice-quality-live.json',import.meta.url))).asr.result;
test('raw words retain exact text and times; zero duration offers labelled context or whole segment',()=>{
  const original=JSON.stringify(raw),word=raw.words[14];
  assert.equal(word.start,word.end);
  assert.deepEqual(wordPlayback(raw,'w0'),{level:'word',start:raw.words[0].start,end:raw.words[0].end});
  assert.deepEqual(wordPlayback(raw,'w14'),{level:'context',start:raw.words[13].start,end:raw.words[15].end});
  assert.equal(rawPlaybackParts(raw).map(p=>p.text).join(''),raw.text);
  assert.equal(JSON.stringify(raw),original);
  const sparse={...raw,words:[word]};
  assert.deepEqual(wordPlayback(sparse,'w14'),{level:'segment',start:raw.spans[0].start,end:raw.spans[0].end});
  assert.deepEqual(rawPlaybackParts({...raw,text:'用户另写的文字'}),[{text:'用户另写的文字'}]);
});
test('ASR sends a script style hint by default, explicit baseline omits it, raw output is unchanged',async()=>{
  const data={text:'原文',segments:[{start:0,end:1,text:'原文'}],words:[{word:'原文',start:0,end:1}]};
  const book=new Ledger(join(mkdtempSync(join(tmpdir(),'asr-style-')),'usage.json'));
  const terms=transcriptionTerms(' 华硕，Eee PC,IT，Eee PC ');
  assert.deepEqual(terms,['华硕','Eee PC','IT']);
  assert.throws(()=>transcriptionTerms('很长'.repeat(50)),/TRANSCRIPTION_TERMS_LIMIT/);
  for(const [options,expected] of [[{},ASR_STYLE_PROMPT],[{prompt:null},null],[{terms},`${ASR_STYLE_PROMPT} 相关名称：华硕、Eee PC、IT。`]]){
    const result=await transcribe(new Uint8Array(waveBytes(new Float32Array(16000))),options.terms?'synthetic-terms':'synthetic',{book,...options,
      fetcher:async(_,request)=>{
        assert.equal(request.body.get('prompt'),expected);
        assert.equal(request.body.get('language'),'zh');
        assert.deepEqual(request.body.getAll('timestamp_granularities[]'),['word','segment']);
        return new Response(JSON.stringify(data),{status:200});
      }});
    assert.equal(result.text,data.text);
    assert.equal(result.styleHint,expected?'zh-Hans-v1':'unspecified');
    assert.deepEqual(result.termHints,options.terms??[]);
  }
});

test('zero runs at segment edges use existing segment/word bounds; shared boundaries follow text',()=>{
  const raw={text:'甲乙丙丁戊己',spans:[{id:'s0',start:0,end:4,text:'甲乙丙'},{id:'s1',start:4,end:8,text:'丁戊己'}],words:[
    {id:'w0',text:'甲',start:0,end:0,usable:false},{id:'w1',text:'乙',start:0,end:0,usable:false},
    {id:'w2',text:'丙',start:1,end:2,usable:true},{id:'w3',text:'丁',start:4,end:4,usable:false},
    {id:'w4',text:'戊',start:5,end:6,usable:true},{id:'w5',text:'己',start:8,end:8,usable:false}
  ]},snapshot=JSON.stringify(raw);
  for(const id of ['w0','w1'])assert.deepEqual(wordPlayback(raw,id),{level:'context',start:0,end:2});
  assert.deepEqual(wordPlayback(raw,'w3'),{level:'context',start:4,end:6});
  assert.deepEqual(wordPlayback(raw,'w5'),{level:'context',start:5,end:8});
  assert.deepEqual(quotePlayback(raw,raw.spans[1],'丁'),{level:'quote-context',start:4,end:6.3});
  // No reliable text assignment at a shared boundary: do not silently pick either segment.
  assert.equal(wordPlayback({...raw,text:'changed'},'w3'),null);
  const wide=structuredClone(raw);wide.words[2].end=3.5;
  assert.equal(wordPlayback(wide,'w0').level,'segment');
  assert.equal(JSON.stringify(raw),snapshot);
});
test('real zero-length word in a short quote replays neighbouring provider boundaries without editing raw timing',()=>{
  const speech=JSON.parse(readFileSync(new URL('../docs/research/natural-speech-live.json',import.meta.url))).asr.find(x=>x.id==='fleurs-276').result;
  const snapshot=JSON.stringify(speech),word=speech.words.find(w=>w.text==='项'),span=speech.spans.find(s=>word.start>=s.start&&word.end<=s.end);
  assert.equal(word.start,word.end);
  const context=wordPlayback(speech,word.id),anchor=quotePlayback(speech,span,'项');
  assert.equal(anchor.level,'quote-context');
  assert.equal(anchor.start,Math.max(span.start,context.start-.3));
  assert.equal(anchor.end,Math.min(span.end,context.end+.3));
  assert(anchor.end-anchor.start<span.end-span.start);
  assert.equal(JSON.stringify(speech),snapshot);
});
test('quoted feedback narrows only an unchanged unique mapped quote, with context and safe segment fallbacks',()=>{
  const span={id:'s0',start:0,end:8,text:'净空十五米，八月通车。'};
  const original={spans:[span],words:[
    {id:'w0',text:'净空',start:1,end:2,usable:true},{id:'w1',text:'十五米',start:2,end:3,usable:true},
    {id:'w2',text:'八月',start:4,end:5,usable:true},{id:'w3',text:'通车',start:5,end:6,usable:true}
  ]},snapshot=JSON.stringify(original),fallback={level:'segment',start:0,end:8};
  assert.deepEqual(quotePlayback(original,span,'十五米'),{level:'quote',start:1.7,end:3.3});
  assert.deepEqual(quotePlayback(original,{...span,text:'净空15米，八月通车。'},'15米'),fallback);
  const repeated={...span,text:'十五米，十五米。'};
  assert.deepEqual(quotePlayback({...original,spans:[repeated]},repeated,'十五米'),fallback);
  assert.deepEqual(quotePlayback({...original,words:original.words.filter(w=>w.id!=='w1')},span,'十五米'),fallback);
  assert.deepEqual(quotePlayback({...original,words:original.words.map(w=>w.id==='w1'?{...w,end:2,usable:false}:w)},span,'十五米'),fallback);
  assert.equal(JSON.stringify(original),snapshot);
});
test('speech evaluation keeps number boundaries and reference provenance separate from character differences',()=>{
  const height=speechCases[1].critical.find(x=>x.label==='15 米'),it=speechCases[0].critical.find(x=>x.label==='IT');
  for(const text of ['15 米','十五米'])assert(criticalPresence(text,height));
  for(const text of ['115米','一百十五米','50米'])assert(!criticalPresence(text,height));
  assert(criticalPresence('台北 IT 资讯月',it));assert(!criticalPresence('台北 with',it));
  const score=speechScore(speechCases[2],raw,7.31);
  assert.equal(score.characterDifference,null);assert.equal(score.timingAccuracy,'NOT_MEASURED_NO_HUMAN_ALIGNMENT');
});
