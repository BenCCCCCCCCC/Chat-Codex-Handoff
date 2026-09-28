import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {waveBytes,waveDuration} from './core.mjs';
const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
const code=app.slice(app.indexOf('function playPrepared('),app.indexOf('function renderAttempt('));
function setup(){
  const listeners=new Map();let ranges=[],resolve,reject;
  const player={currentTime:0,paused:true,seeking:false,played:{get length(){return ranges.length;},start:i=>ranges[i][0],end:i=>ranges[i][1]},
    pause(){this.paused=true;},play(){this.paused=false;return new Promise((r,j)=>{resolve=r;reject=j;});},
    addEventListener(t,f){if(!listeners.has(t))listeners.set(t,new Set());listeners.get(t).add(f);},removeEventListener(t,f){listeners.get(t)?.delete(f);}};
  const context=vm.createContext({$:()=>player,current:{duration:5},blobURL:'synthetic',playEnd:null});vm.runInContext(code,context);
  const emit=t=>{for(const f of [...listeners.get(t)??[]])f();};
  return {player,context,listeners,emit,start:(s,e,fn)=>context.playPrepared(s,e,fn),get resolvePlay(){return resolve;},resolve:()=>resolve(),reject:()=>reject(Error('PLAY_FAILED')),tick:(time,played,paused=false)=>{player.currentTime=time;player.paused=paused;ranges=played;emit('timeupdate');}};
}
test('C2 genuine full coverage completes with sparse events and unchanged tolerance',async()=>{
  const h=setup();let n=0;const p=h.start(0,1,()=>n++);h.resolve();await p;
  h.tick(.018,[[0,.018]]);h.tick(2.441,[[0,2.441]]);assert.equal(n,1);h.emit('ended');assert.equal(n,1);
});
test('C2 natural ended event counts actual final coverage even when paused',async()=>{
  const h=setup();let n=0;const p=h.start(0,1,()=>n++);h.resolve();await p;h.tick(1,[[0,1]],true);assert.equal(n,1);
});
test('C2 insufficient coverage and unplayed jump never complete',async()=>{
  for(const jump of [false,true]){const h=setup();let n=0;const p=h.start(0,2,()=>n++);h.resolve();await p;h.tick(.2,[[0,.2]]);if(jump)h.tick(2,[[0,.2],[1.9,2]]);assert.equal(n,0);}
});
test('C2 seek to old already-played end cannot reuse historical coverage',async()=>{
  const h=setup();let n=0;const p=h.start(0,2,()=>n++);h.resolve();await p;h.tick(.1,[[0,5]]);h.player.seeking=true;h.player.currentTime=2;h.emit('seeking');h.player.seeking=false;h.tick(2,[[0,5]]);assert.equal(n,0);
});
test('C2 new replay supersedes stale callback',async()=>{
  const h=setup();let old=0,fresh=0;const a=h.start(0,1,()=>old++),oldResolve=h.resolve;const stale=[...h.listeners.get('timeupdate')][0];
  // Resolve first play before superseding; captured handler must still be inert.
  oldResolve();await a;const b=h.start(0,1,()=>fresh++);h.resolve();await b;h.tick(.5,[[0,.5]]);stale();h.tick(1,[[0,1]]);assert.equal(old,0);assert.equal(fresh,1);
});
test('C2 late old play promise cannot activate a superseded invocation',async()=>{
  const h=setup();let old=0,fresh=0;const a=h.start(0,1,()=>old++),resolveOld=h.resolvePlay;
  const b=h.start(0,1,()=>fresh++);resolveOld();await a;h.tick(.9,[[0,.9]]);assert.equal(old+fresh,0);
  h.player.currentTime=0;h.resolve();await b;h.tick(1,[[0,1]]);assert.equal(old,0);assert.equal(fresh,1);
});
test('C2 rejected play or source/attempt replacement cannot mark heard',async()=>{
  const h=setup();let n=0;const p=h.start(0,1,()=>n++);h.tick(1,[[0,1]]);h.reject();await assert.rejects(p,/PLAY_FAILED/);h.tick(1,[[0,1]]);assert.equal(n,0);
  const q=h.start(0,1,()=>n++);h.resolve();await q;h.context.current={duration:5};h.tick(1,[[0,1]]);assert.equal(n,0);
});

test('D0 captured mismatch stays fail-closed: .78 requested vs .72 native end',async()=>{
  const h=setup(),trace=[];h.context.__studyReplayObserver=x=>trace.push(x);let n=0;
  const p=h.start(0,.78,()=>n++);h.resolve();await p;h.tick(.72,[[0,.72]],true);h.emit('ended');
  assert.equal(n,0);const last=trace.filter(x=>x.event==='coverage').at(-1);
  assert.equal(last.end,.78);assert.equal(last.covered,.72);assert.equal(last.active,true);assert.equal(last.genuine,true);assert.equal(last.completionEligible,false);
});

function preparedSetup(){
  const listeners=new Map(),urls=new Map(),original=new Blob(['synthetic compressed original']);let ranges=[],plays=0,decodes=0;
  const player={currentTime:0,duration:.72,readyState:1,paused:true,seeking:false,
    played:{get length(){return ranges.length;},start:i=>ranges[i][0],end:i=>ranges[i][1]},
    addEventListener(t,f){if(!listeners.has(t))listeners.set(t,new Set());listeners.get(t).add(f);},removeEventListener(t,f){listeners.get(t)?.delete(f);},pause(){this.paused=true;},
    play(){plays++;this.paused=false;assert.equal(this.readyState,1);return Promise.resolve();},
    set src(value){this.readyState=0;queueMicrotask(async()=>{emit('emptied');this.duration=waveDuration(new Uint8Array(await urls.get(value).arrayBuffer()));this.readyState=1;emit('loadedmetadata');});}};
  const emit=t=>{for(const f of [...listeners.get(t)??[]])f({type:t});};
  class Audio{async decodeAudioData(){decodes++;return {duration:.78};}async close(){this.state='closed';}}
  class Offline{constructor(channels,length){this.length=length;}createBufferSource(){return {connect(){},start(){}};}async startRendering(){return {getChannelData:()=>new Float32Array(this.length)};}}
  const a={id:'attempt',duration:.78,audio:original};
  const c=vm.createContext({$:()=>player,current:a,deleted:new Set(),blobURL:'old',playEnd:null,replayOriginal:null,replayRequest:0,replayWaves:new WeakMap(),Blob,AudioContext:Audio,OfflineAudioContext:Offline,waveBytes,
    URL:{revokeObjectURL(){},createObjectURL:b=>{const id='wav-'+urls.size;urls.set(id,b);return id;}}});
  vm.runInContext(app.slice(app.indexOf('async function play('),app.indexOf('function renderAttempt(')),c);
  return {c,a,original,player,urls,counts:()=>({plays,decodes}),tick:t=>{ranges=[[0,t]];player.currentTime=t;emit('timeupdate');}};
}
test('D1 replay uses diagnostic PCM clock, waits metadata and preserves original blob',async()=>{
  const h=preparedSetup();let heard=0;await h.c.play(0,.78,()=>heard++);
  assert.equal(h.player.duration,.78);h.tick(.78);assert.equal(heard,1);assert.equal(h.a.audio,h.original);assert.equal(await h.original.text(),'synthetic compressed original');
  await h.c.play(0,.78,()=>heard++);h.tick(.78);assert.equal(heard,2);assert.deepEqual(h.counts(),{plays:2,decodes:1});
});
test('D1 pending replay preparation cannot start after attempt replacement or decode rejection',async()=>{
  const h=preparedSetup();const p=h.c.play(0,.78,()=>assert.fail('stale heard'));h.c.current={id:'other'};await p;assert.equal(h.counts().plays,0);
  const broken=preparedSetup();broken.c.AudioContext=class{async decodeAudioData(){throw Error('DECODE_FAILED');}async close(){}};
  await assert.rejects(broken.c.play(0,.78,()=>assert.fail('failed heard')),/DECODE_FAILED/);assert.equal(broken.counts().plays,0);
});
