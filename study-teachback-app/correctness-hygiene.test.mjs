import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { transcribe } from './provider.mjs';
import vm from 'node:vm';
import { Ledger } from './ledger.mjs';
import { createServer } from './server.mjs';
import { waveBytes } from './core.mjs';
const app = readFileSync(new URL('./app.mjs', import.meta.url), 'utf8');
const book = () => new Ledger(join(mkdtempSync(join(tmpdir(), 'batch-a-')), 'ledger.json'));

test('A3 duplicate registration preserves events, reservations and two-submission allowance', () => {
  const b = book(); b.register('valid'); b.reserve({kind:'asr',attemptId:'valid',minutes:3});
  const before = readFileSync(b.path, 'utf8'); b.register('valid');
  assert.equal(readFileSync(b.path, 'utf8'), before); assert.equal(b.summary().attempts, 1);
  b.reserve({kind:'asr',attemptId:'valid',minutes:3}); b.register('valid');
  assert.throws(() => b.reserve({kind:'asr',attemptId:'valid',minutes:3}), /ATTEMPT_LIMIT/);
  assert.equal(b.summary().unsettled, 2);
});
test('A3 registration at cap accepts existing identity only; legacy ASR identity is retained', () => {
  const b = book(); b.reserve({kind:'asr',attemptId:'legacy',minutes:3});
  for (let i=0;i<59;i++) b.register('a'+i);
  const before = readFileSync(b.path, 'utf8');
  b.register('legacy'); b.register('a0');
  assert.equal(readFileSync(b.path, 'utf8'), before);
  assert.throws(() => b.register('new'), /ATTEMPT_LIMIT/);
});
test('A3 invalid registration IDs fail without a ledger write', () => {
  const b = book(); for (const id of [undefined,null,{},42,'','bad/id','x'.repeat(81)]) assert.throws(() => b.register(id), /INVALID_ID/);
  assert.equal(b.summary().attempts, 0);
});
for (const failure of ['invalid','lock','corrupt','cap']) test(`A3 HTTP ${failure} blocks ASR provider dispatch`, async () => {
  const b = book(); let calls=0;
  if(failure==='lock')writeFileSync(b.path+'.lock','test lock');
  if(failure==='corrupt')writeFileSync(b.path,'invalid JSON');
  if(failure==='cap')for(let i=0;i<60;i++)b.register('a'+i);
  const server=createServer({book:b,asrCall:async()=>{calls++;return {};},semanticCall:async()=>{throw Error('UNEXPECTED');}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  try {
    const id=failure==='invalid'?'bad/id':'new';
    const headers={Origin:origin,'X-Study-Request':'1'};
    const reg=await fetch(origin+'/api/register',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({attemptId:id})});
    assert.equal(reg.status,422);
    const asr=await fetch(origin+'/api/asr',{method:'POST',headers:{...headers,'Content-Type':'audio/wav','X-Attempt-Id':id},body:waveBytes(new Float32Array(16000))});
    assert.equal(asr.status,422);assert.equal(calls,0);
  } finally { await new Promise(r=>server.close(r)); }
});

function captureHarness(kind='valid') {
  const nodes=new Map(), events=[], target={id:'topic',source:{id:'source'},goals:[],attempts:[]};
  const $=id=>{if(!nodes.has(id))nodes.set(id,{value:'none',hidden:false,disabled:false,textContent:'',focus(){},setAttribute(){},removeAttribute(){}});return nodes.get(id);};
  let completePermission;const permission=new Promise(r=>completePermission=r);
  const track={stop(){events.push('track stopped');}};
  const stream={getTracks:()=>[track],getAudioTracks:()=>[track]};
  class Recorder {
    static isTypeSupported(){return kind!=='unsupported';}
    constructor(){this.state='inactive';this.mimeType='audio/webm';}
    start(){if(kind==='startup')throw Error('START_FAILED');this.state='recording';}
    stop(){this.state='inactive';this.ondataavailable({data:new Blob(kind==='empty'?[]:['synthetic original'])});this.done=this.onstop();}
  }
  class Audio {
    async resume(){} async close(){this.state='closed';}
    createAnalyser(){return {fftSize:16,getFloatTimeDomainData(){}};}
    createMediaStreamSource(){return {connect(){}};}
    async decodeAudioData(){if(kind==='decode')throw Error('DECODE_FAILED');return {duration:1,sampleRate:16000,getChannelData:()=>new Float32Array(16000)};}
  }
  const context=vm.createContext({$,topic:target,current:null,pending:{kind:'full',focus:null,parentId:null},record:null,capturePending:false,controller:null,processing:false,memoryOnly:false,
    deleted:new Set(),db:{all:async()=>[target]},uid:()=> 'capture-id',navigator:{mediaDevices:{getUserMedia:async()=>{events.push('permission');if(kind==='denied')throw new DOMException('denied','NotAllowedError');if(kind==='late')await permission;return stream;}}},
    AudioContext:Audio,MediaRecorder:Recorder,Blob,Float32Array,structuredClone,performance:{now:()=>1000},setInterval:()=>1,clearInterval(){},
    OfflineAudioContext:class {createBufferSource(){return {connect(){},start(){}};}async startRendering(){return {getChannelData:()=>new Float32Array(16000)};}},
    waveBytes:()=>new ArrayBuffer(8),observations:()=>({reason:kind==='silent'?'NEAR_SILENT':kind==='clipping'?'CLIPPING':'UNVALIDATED_ACTIVITY'}),document:{body:{dataset:{}},querySelector:()=>({hidden:false})},
    reveal:(id,show=true)=>{$(id).hidden=!show;},notice:message=>events.push(message),friendly:x=>x,renderAttempt(){},
    act:async fn=>{try{await fn();}catch(e){events.push(e.message);}},save:async()=>{events.push('saved');if(kind==='storage')throw Error('STORAGE_FAILED');},
    api:async(path)=>{events.push(path);if(path==='/api/register'&&kind==='register')throw Error('LEDGER_LOCKED');return {};}});
  vm.runInContext(app.slice(app.indexOf('function stopRecording('),app.indexOf("document.addEventListener('visibilitychange'"))+app.slice(app.indexOf('async function processAudio('),app.indexOf("$('retryAsr').onclick")),context);
  return {context,target,events,$,release:completePermission,async start(){await $('start').onclick();},async stop(){const recorder=context.record.recorder;recorder.stop();await recorder.done;}};
}
for(const kind of ['denied','unsupported','startup','empty','decode','silent','clipping','storage','register','valid'])test(`A3 synthetic capture ${kind}: original preservation and registration boundary`,async()=>{
  const h=captureHarness(kind);await h.start();
  assert(!h.events.includes('/api/register'),'startup must not register');
  if(h.context.record)await h.stop();
  const registrations=h.events.filter(x=>x==='/api/register').length;
  assert.equal(registrations,['register','valid'].includes(kind)?1:0);
  assert.equal(h.events.filter(x=>x==='/api/asr').length,kind==='valid'?1:0);
  if(['decode','storage','register','valid'].includes(kind))assert(h.target.attempts[0].audio.size>0);
  if(registrations)assert(h.events.indexOf('saved')<h.events.indexOf('/api/register'));
  assert.equal(h.context.record,null);assert.equal(h.context.capturePending,false);assert.equal(h.$('start').disabled,false);
});

test('A3 HTTP repeated registration cannot buy an extra ASR submission or clear reserves',async()=>{
  const b=book();let dispatches=0;
  const server=createServer({book:b,asrCall:(bytes,id,options)=>transcribe(bytes,id,{...options,fetcher:async()=>{dispatches++;throw Error('synthetic timeout');}})});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  try{
    for(let i=0;i<3;i++){
      const headers={Origin:origin,'X-Study-Request':'1'};
      const r=await fetch(origin+'/api/register',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({attemptId:'same'})});assert.equal(r.status,200);
      const asr=await fetch(origin+'/api/asr',{method:'POST',headers:{...headers,'X-Attempt-Id':'same'},body:waveBytes(new Float32Array(16000))});assert.equal(asr.status,422);
      if(i===2)assert.equal((await asr.json()).error,'ATTEMPT_LIMIT');
    }
    assert.equal(dispatches,2);assert.equal(b.summary().attempts,1);assert.equal(b.summary().unsettled,2);assert.equal(b.summary().minutes,6);
  }finally{await new Promise(r=>server.close(r));}
});

test('A2 entry documents identify product, canonical branch, working links and honest validation limits',()=>{
  const paths=['../README.md','./README.md','../docs/master/CURRENT_STATE.md','../docs/master/HANDOFF.md'];
  for(const path of paths){
    const url=new URL(path,import.meta.url),text=readFileSync(url,'utf8');
    assert(text.includes('知而能讲'));assert(text.includes('meta/master-state'));
    assert(text.includes('https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/'));
    assert(!text.includes('OWNER-DEFERRED / NOT EXECUTED'));
    for(const [,link] of text.matchAll(/\]\(([^)]+)\)/g))if(!/^https?:/.test(link))assert(existsSync(new URL(link,url)),`${path}: ${link}`);
  }
  for(const path of paths.slice(2)){const text=readFileSync(new URL(path,import.meta.url),'utf8');assert(text.includes('非权威指针'));assert(!text.includes('R1-BUILD-01'));}
  const readme=readFileSync(new URL('./README.md',import.meta.url),'utf8');assert(readme.includes('Phase 3 尚未执行'));assert(readme.includes('OPENAI_API_KEY'));assert(readme.includes('pypdf 6.18.0'));
});

test('A0 outbound tripwire and owner-ledger guard fail before I/O (deliberate negative probes)',()=>{
  assert.throws(()=>fetch('https://offline-test.invalid/blocked'),/TEST_OUTBOUND_BLOCKED/);
  assert.throws(()=>new Ledger(new URL('./runtime/usage.json',import.meta.url).pathname.replace(/^\/(.:)/,'$1')).read(),/TEST_OWNER_LEDGER_BLOCKED/);
});
for(const change of ['different','deleted'])test(`A3 late permission cannot attach to ${change} topic`,async()=>{
  const h=captureHarness('late'),started=h.start();
  for(let i=0;i<10&&!h.events.includes('permission');i++)await Promise.resolve();
  assert.equal(h.context.capturePending,true);
  if(change==='different')h.context.topic={id:'other',attempts:[]};else h.context.deleted.add('topic');
  h.release();await started;
  assert.equal(h.target.attempts.length,0);assert(!h.events.includes('/api/register'));assert.equal(h.context.record,null);assert(h.events.includes('track stopped'));
});
