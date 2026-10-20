import test from 'node:test';
import assert from 'node:assert/strict';
import {audioFile,AUDIO_LIMIT} from './audio-input.mjs';
import {transcriptionScore,asrScore,contentScore} from './quality-eval.mjs';
import {encodeBackup,decodeBackup} from './backup.mjs';
import {contentInput} from './core.mjs';

test('import keeps original bytes and unknown assistance through backup and content input',async()=>{
  const bytes=new Uint8Array([1,2,3,4]);
  const audio=audioFile(new File([bytes],'lesson.M4A',{type:'video/mp4'}));
  const source={id:'source',title:'规则',text:'湿润时不要浇水。'};
  const a={id:'upload',createdAt:1,source,kind:'full',assistance:'unknown',captureOrigin:'upload',fileName:'lesson.M4A',
    audio,duration:1,raw:null,corrections:[],reports:[]};
  const restored=decodeBackup(await encodeBackup({id:'topic',createdAt:1,source,goals:[],messages:[],attempts:[a]})).attempts[0];
  assert.equal(restored.audio.type,'audio/mp4');assert.deepEqual(new Uint8Array(await restored.audio.arrayBuffer()),bytes);
  assert.equal(restored.fileName,'lesson.M4A');assert.equal(restored.captureOrigin,'upload');
  const input=contentInput(source,{...a,sourceId:'source',transcriptVersion:'v1',reviewed:true,
    spans:[{id:'s0',start:0,end:1,text:'湿润时不要浇水。'}]});
  assert.equal(input.attempt.assistance,'unknown');assert(!('audio' in input.attempt));
  assert.throws(()=>audioFile({size:AUDIO_LIMIT+1,name:'large.wav'}),/AUDIO_TOO_LARGE/);
});
test('CER preserves meaning-changing negatives and digits; script differences stay visible',()=>{
  assert.equal(transcriptionScore('不要浇水。','要浇水').deletions,1);
  assert.equal(transcriptionScore('2 分钟','3分钟').substitutions,1);
  assert.equal(transcriptionScore('澆水','浇水').substitutions,1);
  assert.equal(transcriptionScore('Ａ，Ｂ。','AB').cer,0);
  const normalized={text:'不要浇水。',spans:[{id:'s0',start:0,end:1,text:'不要浇水。'}],
    words:[{id:'w0',text:'不要',start:0,end:0,usable:false}]};
  const score=asrScore('不要浇水。',normalized,1);
  assert.equal(score.cer,0);assert.equal(score.timing.valid,true);
  assert.equal(score.timing.wordTiming.status,'PARTIAL');
});
test('content verdict and evidence checks remain independent',()=>{
  const source={id:'source',title:'规则',text:'湿润时不要浇水。'},fixture={id:'a',transcriptVersion:'v1',spans:[{id:'s0',text:source.text}]};
  const result={sourceId:'source',attemptId:'a',transcriptVersion:'v1',findings:[{status:'supported',
    message:'符合材料。',sourceQuote:'不存在的引文',spanId:'s0',quote:source.text,eventId:null,repair:']'}]};
  const score=contentScore({source,fixture,result,expectation:'correct'});
  assert.equal(score.verdictPass,true);assert.equal(score.evidenceValid,false);
  assert.deepEqual(score.nonInformativeRepairIndices,[0]);
});
