import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';
import { createServer } from './server.mjs';
import { Ledger } from './ledger.mjs';
import { revisedTranscript, validateFindings, waveBytes } from './core.mjs';
import { semantic } from './provider.mjs';
import {transcriptTexts,updateTranscriptDraft,analysisTrace} from './voice-review.mjs';
import {quotePlayback,playbackLabel} from './transcript-playback.mjs';
import { localize } from './diagnostic-localization.mjs';
import { diagnosticFixtures } from './diagnostic-fixtures.mjs';
import { TEACH, teachingSchema } from './schemas.mjs';

const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
const book=()=>new Ledger(join(mkdtempSync(join(tmpdir(),'batch-c-')),'ledger.json'));
const source={id:'source',title:'Synthetic rule',text:'Only enter when open.'};
async function listen(server){await new Promise(r=>server.listen(0,'127.0.0.1',r));return `http://127.0.0.1:${server.address().port}`;}
const post=(origin,path,body)=>fetch(origin+path,{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify(body)});

for(const length of [2500,2501,4000])test(`C1 accepted Tutor ${length} characters survives persisted next-turn history unchanged`,async()=>{
  const requests=[],b=book(),reply='讲'.repeat(length),saved=[];
  const server=createServer({book:b,semanticCall:async(_,input)=>{
    requests.push(structuredClone(input));return {value:{sourceId:source.id,message:reply,goals:[{text:'Condition',sourceQuote:source.text}],question:'Why?'}};
  }});
  const origin=await listen(server),topic={id:'topic',source:structuredClone(source),messages:[],goals:[]};
  const context=vm.createContext({topic,record:null,capturePending:false,controller:null,processing:false,deleted:new Set(),structuredClone,uid:()=> 'anchor',repairFocus:x=>x,
    save:async()=>saved.push(structuredClone(topic)),renderTopic(){},notice(){},friendly:x=>x,
    api:async(path,body)=>{const response=await post(origin,path,body),result=await response.json();assert.equal(response.status,200,JSON.stringify(result));return result;}});
  vm.runInContext(app.slice(app.indexOf('async function teach('),app.indexOf('let importPending')),context);
  try{
    await vm.runInContext("teach('internal','learn',null,{internalStarter:true})",context);
    assert.equal(saved.at(-1).messages[0].text,reply);
    await vm.runInContext("teach('Why does registration not suffice?')",context);
    assert.equal(requests.length,2);assert.deepEqual(requests[1].history,[{role:'assistant',text:reply}]);
    assert.equal(topic.messages.filter(m=>m.role==='user').length,1);assert.equal(b.summary().requests,0);
  }finally{await new Promise(r=>server.close(r));}
});

function confirmationHarness(){
  const nodes=new Map(),saved=[],visible=[],notices=[],pending=[];
  const $=id=>{if(!nodes.has(id))nodes.set(id,{classList:{toggle(){}},children:[],value:'',append(...x){this.children.push(...x);},replaceChildren(...x){this.children=x;if(id==='feedback')visible.length=0;},setAttribute(){},removeAttribute(){},focus(){this.focused=true;},scrollIntoView(){this.scrolled=true;}});return nodes.get(id);};
  const a={id:'attempt',source,duration:1,kind:'full',assistance:'none',audio:new Blob(['synthetic']),raw:{id:'raw',text:'Enter when open.',spans:[{id:'s0',start:0,end:1,text:'Enter when open.'}]},corrections:[],reports:[]};
  let saveGate=null;
  const context=vm.createContext({$,current:a,topic:{id:'topic',attempts:[a]},record:null,capturePending:false,processing:false,controller:null,deleted:new Set(),
    diagnosisStates:new WeakMap(),matchMedia:()=>({matches:true}),editors:new Map(),revisedTranscript,validateFindings,AbortController,ArrayBuffer,
    transcriptTexts,updateTranscriptDraft,analysisTrace,renderRawPlayback(){},voiceDrafts:{flush:async()=>{},mark(){}},
    blobURL:null,replayRequest:0,replayOriginal:null,URL:{createObjectURL:()=> 'blob:synthetic',revokeObjectURL(){}},
    notice:x=>notices.push(x),friendly:x=>x,act:async fn=>{try{await fn();}catch(e){notices.push(e.message);}},
    reveal(){},el:()=>({setAttribute(){},append(){}}),button:()=>({}),renderProcess(){},renderFeedback:r=>visible.push(r),updateBudget(){},
    save:async()=>{saved.push(structuredClone(a));if(saveGate)await saveGate;},
    fetch:async(_,options)=>{const request=JSON.parse(options.body);return new Promise((resolve,reject)=>pending.push({request,reject,resolve:()=>resolve({ok:true,json:async()=>({value:{sourceId:source.id,attemptId:a.id,transcriptVersion:request.attempt.transcriptVersion,findings:[]}})})}));}});
  vm.runInContext(app.slice(app.indexOf('async function api('),app.indexOf('async function updateBudget(')),context);
  vm.runInContext(app.slice(app.indexOf('function latest('),app.indexOf('async function play(')),context);
  vm.runInContext(app.slice(app.indexOf('function diagnosisView('),app.indexOf('function processFor(')),context);
  vm.runInContext(app.slice(app.indexOf("$('confirm').onclick"),app.indexOf('function renderFeedback(')),context);
  vm.runInContext('renderAttempt()',context);
  return {a,context,pending,saved,visible,notices,node:$,render:()=>vm.runInContext('renderAttempt()',context),click:()=>$('confirm').onclick(),review(text='Enter when open.') {context.editors.set('s0',{value:text});},blockSave(){let release;saveGate=new Promise(r=>release=r);return ()=>{saveGate=null;release();};}};
}
const drain=async()=>{for(let i=0;i<30;i++)await Promise.resolve();};

test('C2 delayed diagnosis double confirm preserves current version and visible report; later edit works',async()=>{
  const h=confirmationHarness(),raw=JSON.stringify(h.a.raw);h.review();const first=h.click();await drain();
  assert.equal(h.pending.length,1);const version=h.a.corrections[0].id;
  await h.click();const during=h.a.corrections.length;
  h.pending[0].resolve();await first;
  console.log(JSON.stringify({case:'C2 pending double confirm',correctionsDuring:during,dispatches:h.pending.length,current:h.a.corrections.at(-1).id,report:h.a.reports[0].transcriptVersion,visible:h.visible.length}));
  assert.equal(during,1);assert.equal(h.pending.length,1);assert.equal(h.a.corrections.at(-1).id,version);assert.equal(h.visible.length,1);
  assert(h.notices.includes('REQUEST_IN_PROGRESS'));assert.equal(JSON.stringify(h.a.raw),raw);assert.equal(h.context.processing,false);
  h.review('Enter only when open.');const next=h.click();await drain();assert.equal(h.pending.length,2);h.pending[1].resolve();await next;
  assert.equal(h.a.corrections.length,2);assert.notEqual(h.a.corrections[1].id,version);assert.equal(h.a.reports[1].transcriptVersion,h.a.corrections[1].id);
});
test('C2 lock precedes asynchronous persistence and releases after save failure',async()=>{
  const h=confirmationHarness();h.review();const release=h.blockSave(),first=h.click();await drain();const second=h.click();await drain();
  const during=h.a.corrections.length;release();await drain();for(const p of h.pending)p.resolve();await Promise.all([first,second]);
  assert.equal(during,1);assert.equal(h.pending.length,1);
  h.review('Changed for save failure.');h.context.save=async()=>{throw Error('STORAGE_FAILED');};await h.click();assert.equal(h.context.processing,false);assert.equal(h.pending.length,1);
});
test('C2 no replay still allows diagnosis; failed provider releases operation for explicit later confirmation',async()=>{
  const h=confirmationHarness();const first=h.click();await drain();assert.equal(h.pending.length,1);assert.equal(h.a.corrections[0].origin,'USER_TRANSCRIPT_CONFIRMATION');assert(!h.notices.includes('NOT_HEARD'));h.pending[0].reject(Error('SYNTHETIC_FAILURE'));await first;
  assert.equal(h.context.processing,false);assert.equal(h.context.controller,null);
  const next=h.click();await drain();h.pending[1].resolve();await next;assert.equal(h.visible.length,1);
});

for(const failure of ['corrupt','unreadable'])test(`C3 ${failure} ledger status is controlled, loop stays alive and provider dispatch stays blocked`,async()=>{
  const b=book();b.reserve({kind:'semantic',input:12,output:12});
  if(failure==='corrupt')writeFileSync(b.path,'{broken synthetic ledger');
  else b.read=()=>{throw Error('LEDGER_UNREADABLE');};
  const before=readFileSync(b.path,'utf8');let calls=0;
  const server=createServer({book:b,semanticCall:async()=>{calls++;return {};},asrCall:async()=>{calls++;return {};}});
  // Invoke the actual async listener first: pre-fix rejection is captured by node:test,
  // not leaked as an unhandled rejection that would terminate the whole runner.
  let status,body;await server.listeners('request')[0]({method:'GET',url:'/api/status',headers:{host:'127.0.0.1:4318'},socket:{localPort:4318}},
    {writeHead:s=>status=s,end:x=>body=JSON.parse(x)});
  assert.equal(status,503);assert.equal(body.error,'BUDGET_UNAVAILABLE');assert.equal(body.ledger,undefined);
  const origin=await listen(server);
  try{
    assert.equal((await fetch(origin+'/api/status')).status,503);assert.equal((await fetch(origin+'/')).status,200);
    const r=await post(origin,'/api/teach',{source,mode:'learn',message:'Why?',history:[]});assert.equal(r.status,503);
    const asr=await fetch(origin+'/api/asr',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','X-Attempt-Id':'synthetic'},body:waveBytes(new Float32Array(16000))});assert.equal(asr.status,503);
    const attempt={id:'attempt',sourceId:source.id,transcriptVersion:'v1',duration:1,spans:[{id:'s0',start:0,end:1,text:'Rule'}],kind:'full',assistance:'none',reviewed:true};
    assert.equal((await post(origin,'/api/diagnose',{source,attempt,channel:'content'})).status,503);
    assert.equal(calls,0);assert.equal(readFileSync(b.path,'utf8'),before);assert.equal((await fetch(origin+'/')).status,200);
  }finally{await new Promise(r=>server.close(r));}
});
test('C3 healthy status retains ledger summary and read does not write',async()=>{
  const b=book();b.reserve({kind:'semantic',input:10,output:10});const before=readFileSync(b.path,'utf8'),server=createServer({book:b});const origin=await listen(server);
  try{const r=await fetch(origin+'/api/status');assert.equal(r.status,200);const value=await r.json();assert.deepEqual(value.ledger,b.summary());assert.deepEqual(value.models,['whisper-1','gpt-5.6-luna']);assert.equal(readFileSync(b.path,'utf8'),before);}
  finally{await new Promise(r=>server.close(r));}
});

test('C1 history stays at six whole messages; oversized required input still fails before dispatch',async()=>{
  const b=book(),requests=[];let output='Short reply';
  const server=createServer({book:b,semanticCall:async(_,input)=>{requests.push(input);return {value:{sourceId:input.source.id,message:output,goals:[{text:'Condition',sourceQuote:input.source.text.slice(0,600)}],question:'Why?'}};}});
  const origin=await listen(server),history=Array.from({length:8},(_,i)=>({role:'assistant',text:i<2?'Old message '+i:String(i)+'讲'.repeat(3999)}));
  try{
    const payload={source,mode:'learn',message:'Why?',history};assert.equal((await post(origin,'/api/teach',payload)).status,200);
    assert.deepEqual(requests[0].history,history.slice(-6));
    const longPayload={...payload,source:{...source,text:'材'.repeat(5000)},contextNote:'要点',history:Array.from({length:6},()=>({role:'assistant',text:'讲'.repeat(4000)}))};
    assert.equal((await post(origin,'/api/teach',longPayload)).status,200);assert.equal(requests.length,2);
    assert.equal(requests[1].contextNote,'要点');
    assert.equal((await post(origin,'/api/teach',{...payload,history:[{role:'assistant',text:'x'.repeat(4001)}]})).status,422);assert.equal(requests.length,2);
    output='x'.repeat(4001);assert.equal((await post(origin,'/api/teach',{...payload,history:[]})).status,422);
    let dispatches=0;const before=b.summary();
    await assert.rejects(semantic(TEACH,{...requests[0],history:[],message:'讲'.repeat(10000)},teachingSchema,{book:b,fetcher:async()=>{dispatches++;throw Error('UNEXPECTED');}}),/INPUT_TOO_LARGE/);
    assert.equal(dispatches,0);assert.deepEqual(b.summary(),before);
  }finally{await new Promise(r=>server.close(r));}
});
test('C3 unavailable status replaces stale budget display without showing zero usage',async()=>{
  const node={textContent:'old budget'};
  const context=vm.createContext({$:()=>node,fetch:async()=>({ok:false,json:async()=>({error:'BUDGET_UNAVAILABLE'})})});
  vm.runInContext(app.slice(app.indexOf('async function updateBudget('),app.indexOf('function renderTopic(')),context);
  await vm.runInContext('updateBudget()',context);assert.match(node.textContent,/预算状态暂不可用/);assert(!node.textContent.includes('$0'));
});


test('review UX confirms current edits without playback; reload keeps honest confirmation and raw audio',async()=>{
  const h=confirmationHarness(),raw=JSON.stringify(h.a.raw),audio=h.a.audio;
  assert.match(h.node('reviewHint').textContent,/回听可选/);
  h.review('Do not enter when closed.');const first=h.click();await drain();
  assert.equal(h.pending.length,1);assert.equal(h.pending[0].request.attempt.spans[0].text,'Do not enter when closed.');
  assert.equal(h.pending[0].request.attempt.reviewed,true);assert.equal(h.a.corrections[0].origin,'USER_TRANSCRIPT_CONFIRMATION');
  h.pending[0].resolve();await first;h.render();
  assert.match(h.node('reviewHint').textContent,/回听可选/);assert.match(h.node('reviewHint').textContent,/数字、术语、否定与条件/);
  assert.equal(h.context.editors.get('s0').value,'Do not enter when closed.');assert.equal(JSON.stringify(h.a.raw),raw);assert.equal(h.a.audio,audio);
  assert.equal(h.pending.length,1);assert.equal(h.a.corrections[0].heard,undefined);
});


test('diagnosis state locks synchronously, completes with focus, and reuses unchanged result',async()=>{
 const h=confirmationHarness(),release=h.blockSave(),first=h.click();
 assert.equal(h.node('confirm').disabled,true);assert.equal(h.context.editors.get('s0').readOnly,true);assert.match(h.node('diagnosisState').textContent,/正在诊断/);
 await h.click();await drain();assert.equal(h.a.corrections.length,1);release();await drain();h.pending[0].resolve();await first;
 assert.equal(h.node('confirm').disabled,false);assert.equal(h.context.editors.get('s0').readOnly,false);assert.match(h.node('diagnosisState').textContent,/诊断完成/);
 assert(h.node('contentHeading').focused&&h.node('contentHeading').scrolled);
 await h.click();assert.equal(h.pending.length,1);assert.equal(h.a.corrections.length,1);
});
test('diagnosis state dirty, revert, and changed resubmit retain prior result through failure',async()=>{
 const h=confirmationHarness();const first=h.click();await drain();h.pending[0].resolve();await first;const prior=h.a.reports[0];
 h.context.editors.get('s0').value='Changed condition.';h.context.editors.get('s0').oninput();
 assert.match(h.node('diagnosisState').textContent,/过时/);assert.match(h.node('confirm').textContent,/确认修改并重新诊断/);assert.equal(h.visible[0],prior);
 h.context.editors.get('s0').value='Enter when open.';h.context.editors.get('s0').oninput();assert.match(h.node('diagnosisState').textContent,/诊断完成/);await h.click();assert.equal(h.pending.length,1);
 h.context.editors.get('s0').value='Changed condition.';h.context.editors.get('s0').oninput();const next=h.click();await drain();assert.equal(h.visible[0],prior);assert.match(h.node('resultBinding').textContent,/新诊断进行中/);
 h.pending[1].reject(Error('SYNTHETIC_FAILURE'));await next;assert.equal(h.visible[0],prior);assert.match(h.node('diagnosisState').textContent,/未完成/);assert.equal(h.a.reports.length,1);assert.equal(h.context.editors.get('s0').readOnly,false);
 h.render();assert.equal(h.visible[0],prior);assert.match(h.node('resultBinding').textContent,/先前结果/);
});
test('result save failure cannot cause another diagnosis; result remains inspectable',async()=>{
 const h=confirmationHarness();let saves=0;h.context.save=async()=>{if(++saves===2)throw Error('STORAGE_FAILED');};
 const first=h.click();await drain();h.pending[0].resolve();await first;assert.equal(h.a.reports.length,1);assert.match(h.node('diagnosisState').textContent,/本机保存失败/);
 await h.click();assert.equal(h.pending.length,1);assert.equal(h.a.corrections.length,1);
});


test('actual stale report retains findings but omits repair actions and uses bound version',()=>{
 const f=structuredClone(diagnosticFixtures.find(f=>f.id==='fluent-wrong')),buttons=[];
 const node=()=>({dataset:{},append(){}}),version={id:f.attempt.transcriptVersion,spans:f.attempt.spans,reviewed:true};
 const c=vm.createContext({current:{...f.attempt,source:f.source,reports:[]},latest:()=>version,attemptRequest:()=>({...f.attempt,transcriptVersion:'new-draft'}),localize,quotePlayback,playbackLabel,$:node,el:node,button:(label,fn)=>{buttons.push(label);return node();}});
 vm.runInContext(app.slice(app.indexOf('function renderFeedback('),app.indexOf("$('apply').onclick")),c);c.report={...f.report,channel:'content'};c.version=version;
 vm.runInContext('renderFeedback(report,{version,stale:true})',c);assert(!buttons.includes('再学这一点'));assert(!buttons.includes('再讲这一点'));
 buttons.length=0;vm.runInContext('renderFeedback(report,{version,stale:false})',c);assert(buttons.includes('再学这一点'));assert(buttons.includes('再讲这一点'));
});
