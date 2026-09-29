import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as core from './core.mjs';
import {createServer} from './server.mjs';
import {TEACH} from './schemas.mjs';
const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
function harness(){
  const nodes=new Map(),requests=[],saved=[],notices=[];
  const $=id=>{if(!nodes.has(id))nodes.set(id,{value:'',textContent:''});return nodes.get(id);};
  const context=vm.createContext({...core,$,topic:null,importPending:false,controller:null,capturePending:false,record:null,processing:false,
    uid:()=> 'synthetic',structuredClone,deleted:new Set(),clearImport(){},renderTopic(){},notice:x=>notices.push(x),friendly:x=>x,act:fn=>fn(),
    save:async()=>saved.push(structuredClone(context.topic)),api:async(path,body)=>{requests.push(structuredClone(body));return {value:{message:'Tutor',question:'Why?',goals:[]}};}});
  vm.runInContext(app.slice(app.indexOf('async function teach('),app.indexOf('let importPending')),context);
  vm.runInContext(app.slice(app.indexOf("$('learn').onclick"),app.indexOf("$('chatForm').onsubmit")),context);
  return {$,context,requests,saved,notices,start:()=>$('learn').onclick()};
}
test('source alone starts with empty manual title',async()=>{
  const h=harness();h.$('source').value='Only enter when open.';await h.start();
  assert.equal(h.requests.length,1,JSON.stringify(h.notices));assert.equal(h.context.topic.source.title,'Only enter when open.');
});
test('local titles: meaningful line, filename, bounds, fallback; source untouched',()=>{
  assert.equal(core.autoTitle('\n---\n  核心条件  \n正文'),'核心条件');
  assert.equal(core.autoTitle('正文','规则.v2.md'),'规则.v2');
  assert.equal(core.autoTitle('---\n!!!'),'学习材料');
  assert.equal(core.autoTitle('字'.repeat(150)).length,120);
});
for(const [focus,known] of [['',''],['条件',''],['','已了解定义'],['条件','已了解定义']])test(`setup metadata survives save/reload; focus=${!!focus}, known=${!!known}`,async()=>{
  const h=harness();h.$('source').value='Rule';h.$('setupFocus').value=focus;h.$('setupKnown').value=known;await h.start();
  assert.equal(h.requests.length,1);
  assert.deepEqual(h.requests[0].setupContext,{focus,known});
  assert.equal(h.requests[0].history.length,0);
  assert(h.saved.every(t=>t.messages.every(m=>m.role!=='user')));
  h.context.topic=structuredClone(h.saved.at(-1));
  await vm.runInContext("teach('Actual question')",h.context);
  assert.deepEqual(h.requests[1].setupContext,{focus,known});
  assert.deepEqual(Array.from(h.context.topic.messages.filter(m=>m.role==='user'),m=>m.text),['Actual question']);
  assert.equal(h.context.topic.source.title,'Rule');
});
test('empty and oversized sources do not dispatch',async()=>{
  for(const value of ['', '  ', '字'.repeat(5001)]){const h=harness();h.$('source').value=value;await h.start();assert.equal(h.requests.length,0);assert.equal(h.saved.length,0);assert(h.notices.length);}
});
test('accepted file selection sets filename title and preserves selected source',async()=>{
  const h=harness();h.context.updateCounts=()=>{};h.$('selectedFile').textContent='访客规则.v2.txt';h.$('extractedText').value='Only enter when open.';
  vm.runInContext(app.slice(app.indexOf('function useImported('),app.indexOf("$('useSelection').onclick")),h.context);
  vm.runInContext('useImported(true)',h.context);await h.start();
  assert.equal(h.context.topic.source.title,'访客规则.v2');assert.equal(h.context.topic.source.text,'Only enter when open.');
});
test('Tutor endpoint forwards bounded context once, legacy defaults, invalid input fails before dispatch',async()=>{
  const inputs=[];
  const server=createServer({book:{summary:()=>({})},semanticCall:async(prompt,input)=>{
    assert.equal(prompt,TEACH);inputs.push(input);return {value:{sourceId:'source',message:'Explanation',goals:[{text:'Rule',sourceQuote:'Rule'}],question:'Why?'}};
  }});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  const send=setupContext=>fetch(origin+'/api/teach',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify({source:{id:'source',title:'Rule',text:'Rule'},mode:'learn',message:'Start',history:[],setupContext})});
  try{
    for(const setupContext of [undefined,{focus:'Focus',known:''},{focus:'',known:'Self report'},{focus:'Focus',known:'Self report'}]){
      const before=inputs.length;const response=await send(setupContext);assert.equal(response.status,200);await response.json();assert.equal(inputs.length,before+1);assert.deepEqual(inputs.at(-1).setupContext,setupContext??{focus:'',known:''});assert.deepEqual(inputs.at(-1).history,[]);
    }
    const before=inputs.length;
    for(const invalid of [{focus:'x'.repeat(501)},{known:1},[]]){const response=await send(invalid);assert.equal(response.status,422);assert.equal((await response.json()).error,'INVALID_SETUP_CONTEXT');}
    assert.equal(inputs.length,before);assert.match(TEACH,/不是掌握证据/);assert.match(TEACH,/不可隐藏自述与来源或实际回答的矛盾/);
  }finally{await new Promise(r=>server.close(r));}
});
