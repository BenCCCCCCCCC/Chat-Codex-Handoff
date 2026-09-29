import test from 'node:test';
import assert from 'node:assert/strict';
import {observations} from './core.mjs';
import {confirmLocalProcess,processEvidence,localize} from './diagnostic-localization.mjs';
import {diagnosticFixtures} from './diagnostic-fixtures.mjs';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
// Timing-only synthetic PCM, NOT the owner recording or a lexical filler oracle.
function pcm(gaps,duration=22,rate=1000){const samples=new Float32Array(duration*rate).fill(.1);for(const [s,e] of gaps)samples.fill(0,Math.round(s*rate),Math.round(e*rate));return samples;}
const auditGaps=[[14.54,15.42],[16.08,16.22],[16.74,16.94],[16.96,17.28]];
for(const [longCount,shortCount] of [[9,1],[1,8],[9,8],[0,8],[9,0]])test(`actual candidate UI stays bounded and exposes both types: ${longCount}/${shortCount}`,()=>{
  const events=[...Array.from({length:longCount},(_,i)=>({id:`e${i}`,type:'near_silence_candidate',start:10+i*2,end:11+i*2})),...Array.from({length:shortCount},(_,i)=>({id:`c${i}`,type:'short_pause_cluster_candidate',start:1+i*2,end:2.2+i*2}))];
  const before=JSON.stringify(events),labels=[],played=[],confirmed=[];
  const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8').replace(/\r\n/g,'\n');
  const body=app.slice(app.indexOf('  const events=a.observation?.events??[];'),app.indexOf('\n}\nfunction processFor('));
  const node=()=>({append(){}});
  const context={$:node,el:node,button:(label,action)=>{labels.push({label,action});return node();},play:(start,end,done)=>{played.push([start,end]);done();},confirmProcess:(a,e)=>confirmed.push(e.id)};
  const render=vm.runInNewContext(`(function(a){${body}})`,context);
  render({raw:{},duration:60,observation:{events}});
  const replay=labels.filter(x=>x.label.startsWith('回听候选'));
  assert.equal(replay.length,Math.min(8,events.length));assert.equal(JSON.stringify(events),before);
  if(longCount)assert(replay.some(x=>x.label.includes('近静音')));
  if(shortCount)assert(replay.some(x=>x.label.includes('短间隔聚集')));
  for(const x of replay)x.action();for(const x of labels.filter(x=>x.label==='确认并保存过程证据'))x.action();
  assert.equal(new Set(confirmed).size,replay.length);assert(confirmed.every(id=>events.find(e=>e.id===id).heard));
  assert(played.every((p,i)=>!i||p[0]>=played[i-1][0]));
});
test('derived real-audit timing retains long e0 and surfaces bounded short-gap candidate',()=>{
  const r=observations([pcm(auditGaps)],1000);assert.equal(r.reason,'UNVALIDATED_ACTIVITY');assert.equal(r.events.length,2);
  assert.deepEqual(r.events[0],{id:'e0',type:'near_silence_candidate',start:14.54,end:15.42});
  assert.deepEqual(r.events[1],{id:'e1',type:'short_pause_cluster_candidate',start:16.08,end:17.28});
});
for(const [name,gaps] of [
  ['syllable gaps',Array.from({length:30},(_,i)=>[1+i*.2,1.06+i*.2])],
  ['isolated pauses',[[1,1.2],[4,4.2],[7,7.2]]],
  ['only two gaps',[[1,1.3],[1.6,1.92]]],
  ['insufficient cumulative low energy',[[1,1.14],[1.5,1.64],[1.9,2.04]]],
  ['almost continuous silence',[[1,1.22],[1.24,1.46],[1.48,1.7]]],
  ['long silence separates short gaps',[[1,1.2],[1.3,2.02],[2.1,2.3],[2.4,2.6]]]
])test(`reject cluster: ${name}`,()=>assert.equal(observations([pcm(gaps)],1000).events.filter(e=>e.type==='short_pause_cluster_candidate').length,0));
test('existing silence/interruption/clipping guards remain fail closed; candidates are bounded',()=>{
  assert.equal(observations([new Float32Array(3000)],1000).events.length,0);
  assert.equal(observations([pcm(auditGaps)],1000,true).events.length,0);
  assert.equal(observations([new Float32Array(3000).fill(1)],1000).events.length,0);
  const gaps=Array.from({length:20},(_,i)=>[[i*3+.2,i*3+.4],[i*3+.7,i*3+.9],[i*3+1.1,i*3+1.3]]).flat();
  const events=observations([pcm(gaps,62)],1000).events;assert.equal(events.length,8);assert(events.every(e=>e.end-e.start<=2));
});
for(const id of ['hesitant-correct','fluent-wrong','uncertain-relation','correct-self-repair','gap-without-process'])test(`separate and converge channels: ${id}`,()=>{
  const f=structuredClone(diagnosticFixtures.find(f=>f.id===id)),event={id:'e0',type:'short_pause_cluster_candidate',start:1,end:2.2,heard:true};
  const e=confirmLocalProcess(f.attempt,event,[event]);assert.equal(e.type,'short_pause_cluster');assert.equal(e.quote,null);
  const result=localize({...f,evidence:[e],events:[event]});assert.deepEqual(result.contentFindings.map(x=>x.status),f.expected.content);
  assert.equal(localize({...f,report:null,evidence:[e],events:[event]}).diagnosticTargets.length,0);
  assert.equal(result.diagnosticTargets.length,f.expected.targets);
  if(id==='uncertain-relation'){assert.equal(result.diagnosticTargets[0].processEvidenceIds.length,1);assert.equal(result.diagnosticTargets[0].kind,'worth_verifying');}
  if(id==='fluent-wrong')assert.equal(localize({...f,evidence:[]}).diagnosticTargets.length,1);
  if(id==='gap-without-process')assert.equal(result.diagnosticTargets[0].processEvidenceIds.length,0);
  const candidate={...e,confirmation:'candidate'};assert(localize({...f,evidence:[candidate],events:[event]}).diagnosticTargets.every(t=>t.processEvidenceIds.length===0));
  assert.throws(()=>processEvidence([{...e,type:'near_silence'}],f.attempt,[event]),/INVALID_PROCESS_EVENT/);
  assert.throws(()=>confirmLocalProcess(f.attempt,{...event,heard:false},[event]),/NOT_HEARD/);
});
test('actual short-cluster local confirmation saves and rerenders without provider dispatch',async()=>{
  const f=structuredClone(diagnosticFixtures.find(f=>f.id==='uncertain-relation'));
  const event={id:'e0',type:'short_pause_cluster_candidate',start:1,end:2.2,heard:true};
  const a={...f.attempt,raw:{id:f.attempt.transcriptVersion},reports:[],observation:{events:[event]}};let saved=0,rendered=0;
  const forbidden=()=>{throw Error('UNEXPECTED_PROVIDER');};
  const c=vm.createContext({current:a,topic:{attempts:[a]},deleted:new Set(),processing:false,confirmLocalProcess,canNavigate:()=>true,latest:a=>a.raw,attemptRequest:()=>f.attempt,save:async()=>saved++,renderAttempt:()=>rendered++,notice(){},api:forbidden,fetch:forbidden,diagnose:forbidden});
  const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');vm.runInContext(app.slice(app.indexOf('function processFor('),app.indexOf('function renderProcess(')),c);
  await vm.runInContext('confirmProcess(current,current.observation.events[0])',c);assert.equal(saved,1);assert.equal(rendered,1);assert.equal(a.reports[0].processEvidence[0].type,'short_pause_cluster');
});
