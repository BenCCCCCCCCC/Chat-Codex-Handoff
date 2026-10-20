import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import { autoTitle, setupContextValue } from './core.mjs';
import { localize } from './diagnostic-localization.mjs';
const source=readFileSync(process.env.STUDY_TEST_APP_SOURCE??new URL('./app.mjs',import.meta.url),'utf8');
const teach=source.slice(source.indexOf('async function teach('),source.indexOf('let importPending'));
for(const fail of [false,true])test(`starter provenance and first owner input; initial rejection=${fail}`,async()=>{
  const topic={id:'topic',source:{id:'source'},messages:[],goals:[]},requests=[],saved=[];
  let reject=fail;
  const context=vm.createContext({topic,record:null,capturePending:false,controller:null,processing:false,deleted:new Set(),uid:()=> 'anchor',structuredClone,repairFocus:x=>x,save:async()=>saved.push(structuredClone(topic)),renderTopic(){},notice(){},friendly:x=>x,api:async(path,body)=>{requests.push(structuredClone(body));if(reject){reject=false;throw Error('INVALID_SOURCE_QUOTE');}return {value:{message:'Tutor reply',question:'Question',goals:[]}};}});
  vm.runInContext(teach,context);
  await vm.runInContext("teach('internal starter','learn',null,{internalStarter:true})",context).catch(e=>{assert.equal(e.message,'INVALID_SOURCE_QUOTE');});
  assert.equal(topic.messages.filter(m=>m.role==='user').length,0);
  assert(saved.every(t=>t.messages.every(m=>m.role!=='user')));
  assert.equal(topic.messages.length,fail?0:1);
  await vm.runInContext("teach('real owner question')",context);
  assert.equal(topic.messages.find(m=>m.role==='user').text,'real owner question');
  assert(requests.every(r=>r.history.every(m=>m.text!=='internal starter')));
});
test('Learn entry explicitly marks automatic starter internal',()=>assert.match(source,/await teach\('请先帮我理解[^\n]+internalStarter:true/));

// Exercise the actual UI action bodies and rendering, not just an explicit flag.
for(const mode of ['learn','repair'])for(const outcome of ['success','quote','request'])test(`A1 ${mode}/${outcome}: persisted/rendered messages and later history preserve only real input`,async()=>{
  const nodes=new Map(),buttons=[],saved=[],requests=[];
  const node=()=>({textContent:'',value:'',hidden:false,children:[],append(...v){this.children.push(...v);},replaceChildren(...v){this.children=v;},scrollIntoView(){},dataset:{}});
  const $=id=>{if(!nodes.has(id))nodes.set(id,node());return nodes.get(id);};
  let reject=outcome!=='success';
  const context=vm.createContext({autoTitle,setupContextValue,$,topic:{id:'topic',source:{id:'source',title:'Synthetic',text:'Rule'},messages:[],goals:[],attempts:[]},
    current:{id:'attempt',source:{id:'source',title:'Synthetic',text:'Rule'},duration:1,kind:'full',assistance:'none',raw:{id:'raw',reviewed:true,spans:[{id:'s0',start:0,end:1,text:'Rule'}]}},record:null,capturePending:false,controller:null,processing:false,importPending:false,
    localize,processFor:()=>[],attemptRequest:a=>({id:a.id,sourceId:a.source.id,transcriptVersion:a.raw.id,duration:a.duration,kind:a.kind,assistance:a.assistance,reviewed:a.raw.reviewed,spans:a.raw.spans}),
    deleted:new Set(),structuredClone,uid:()=> 'synthetic-id',clearImport(){},repairFocus:x=>x,remediationFocus:()=> 'Condition',latest:a=>a.raw,
    reveal(){},el:(tag,text)=>Object.assign(node(),{textContent:text}),button:(label,fn)=>{buttons.push({label,fn});return node();},
    notice(){},friendly:x=>x,canNavigate:()=>true,act:fn=>fn(),renderPractice(){},practice:{start(){}},
    save:async()=>saved.push(structuredClone(context.topic)),
    api:async(path,body)=>{requests.push(structuredClone(body));if(reject){reject=false;throw Error(outcome==='quote'?'INVALID_SOURCE_QUOTE':'API_RESULT_UNAVAILABLE');}return {value:{message:'Synthetic tutor',goals:[],question:'Question'}};}});
  vm.runInContext(source.slice(source.indexOf('function renderTopic('),source.indexOf('let importPending')),context);
  vm.runInContext(source.slice(source.indexOf("$('learn').onclick"),source.indexOf("function prepare(")),context);
  vm.runInContext(source.slice(source.indexOf('function renderFeedback('),source.indexOf('async function exportTopic(')),context);
  $('title').value='Synthetic';$('source').value='Rule';
  let action;
  if(mode==='learn')action=$('learn').onclick;
  if(mode==='repair'){vm.runInContext("renderFeedback({channel:'content',sourceId:'source',attemptId:'attempt',transcriptVersion:'raw',findings:[{status:'missing',message:'Gap',sourceQuote:'Rule',spanId:null,quote:null,eventId:null,repair:'Condition'}]})",context);action=buttons.find(b=>b.label==='再学这一点').fn;}
  await action().catch(e=>assert.equal(e.message,outcome==='quote'?'INVALID_SOURCE_QUOTE':'API_RESULT_UNAVAILABLE'));
  assert.equal(requests.length,1);const generated=requests[0].message;assert(generated.length>0);
  assert(saved.every(t=>t.messages.every(m=>m.role!=='user')));
  assert.equal(context.topic.messages.filter(m=>m.role==='user').length,0);
  assert($('messages').children.every(n=>n.textContent!==generated));
  for(const text of ['First actual input','Subsequent actual input']){$('chat').value=text;await $('chatForm').onsubmit({preventDefault(){}});}
  // onsubmit delegates to act without returning it; drain its short async chain.
  for(let i=0;i<20;i++)await Promise.resolve();
  assert.deepEqual(Array.from(context.topic.messages.filter(m=>m.role==='user'),m=>m.text),['First actual input','Subsequent actual input']);
  assert(requests.every(r=>r.history.every(m=>m.text!==generated)));
  assert(requests.at(-1).history.some(m=>m.text==='First actual input'));
  assert($('messages').children.some(n=>n.textContent==='First actual input'));
  assert($('messages').children.some(n=>n.textContent==='Subsequent actual input'));
});
