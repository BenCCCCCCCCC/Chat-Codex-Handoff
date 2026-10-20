import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
const implementation=app.slice(app.indexOf('async function teach('),app.indexOf('let importPending'));
const empty=()=>({id:'topic',source:{id:'source',text:'Rule'},goals:[],messages:[],attempts:[]});
function harness(topic=empty()) {
  const sent=[],saved=[];
  const context=vm.createContext({topic,record:null,capturePending:false,controller:null,processing:false,
    deleted:new Set(),structuredClone,uid:()=>crypto.randomUUID(),repairFocus:x=>x,
    save:async()=>saved.push(structuredClone(topic)),renderTopic(){},notice(){},
    api:async(path,body)=>{sent.push(structuredClone(body));return {value:{message:'Reply',question:'Why?',goals:[]}};}});
  vm.runInContext(implementation,context);
  return {topic,sent,saved,context,run:code=>vm.runInContext(code,context)};
}
test('failed chat survives reload and explicit retry sends original context once without another user entry',async()=>{
  const h=harness();h.topic.contextNote='The original point';h.topic.messages.push({role:'assistant',text:'Earlier explanation'});
  h.context.api=async(path,body)=>{h.sent.push(structuredClone(body));throw Error('API_RESULT_UNAVAILABLE');};
  await assert.rejects(h.run("teach('My question')"),/API_RESULT_UNAVAILABLE/);
  assert.equal(h.saved.at(-1).chatRequest.status,'unknown');
  const reopened=harness(structuredClone(h.saved.at(-1)));
  reopened.topic.contextNote='A later point';
  assert.equal(reopened.sent.length,0);
  await reopened.run("teach('', 'learn', null, {retry:true})");
  assert.deepEqual(reopened.sent,h.sent);
  assert.equal(reopened.sent[0].contextNote,'The original point');
  assert.deepEqual(reopened.topic.messages.filter(m=>m.role==='user').map(m=>m.text),['My question']);
  await reopened.run("teach('', 'learn', null, {retry:true})");
  assert.equal(reopened.sent.length,1);
});
test('pending initial explanation remains internal and retries after reload without fabricating user input',async()=>{
  const h=harness();let release;
  h.context.api=()=>new Promise(r=>{release=r;});
  const first=h.run("teach('internal starter','learn',null,{internalStarter:true})");
  await Promise.resolve();
  const reopened=harness(structuredClone(h.saved.at(-1)));
  assert.equal(reopened.topic.chatRequest.status,'pending');
  await reopened.run("teach('', 'learn', null, {retry:true})");
  assert.equal(reopened.topic.messages.filter(m=>m.role==='user').length,0);
  assert.deepEqual(reopened.sent[0].history,[]);
  release({value:{message:'Reply',question:'Why?',goals:[]}});await first;
});
test('chat locks before save and keeps received reply when final persistence fails',async()=>{
  const h=harness();let release,count=0;
  h.context.save=async()=>{if(++count===1)await new Promise(r=>{release=r;});else throw Error('STORAGE_FAILED');};
  const first=h.run("teach('A question')");
  await assert.rejects(h.run("teach('A question')"),/REQUEST_IN_PROGRESS/);
  assert.equal(h.sent.length,0);release();
  await assert.rejects(first,/STORAGE_FAILED/);
  assert.equal(h.context.processing,false);
  assert.equal(h.topic.chatRequest.status,'complete');
  assert.equal(h.topic.messages.at(-1).text,'Reply');
  await h.run("teach('', 'learn', null, {retry:true})");
  assert.equal(h.sent.length,1);
  assert.equal(h.topic.messages.filter(m=>m.role==='user').length,1);
});
