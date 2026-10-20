import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {wordPlayback,rawPlaybackParts} from './transcript-playback.mjs';
import {waveBytes} from './core.mjs';
import {transcribe,ASR_STYLE_PROMPT} from './provider.mjs';
import {Ledger} from './ledger.mjs';

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
  for(const [options,expected] of [[{},ASR_STYLE_PROMPT],[{prompt:null},null]]){
    const result=await transcribe(new Uint8Array(waveBytes(new Float32Array(16000))),'synthetic',{book,...options,
      fetcher:async(_,request)=>{
        assert.equal(request.body.get('prompt'),expected);
        assert.equal(request.body.get('language'),'zh');
        assert.deepEqual(request.body.getAll('timestamp_granularities[]'),['word','segment']);
        return new Response(JSON.stringify(data),{status:200});
      }});
    assert.equal(result.text,data.text);
    assert.equal(result.styleHint,expected?'zh-Hans-v1':'unspecified');
  }
});
