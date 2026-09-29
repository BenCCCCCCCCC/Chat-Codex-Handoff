import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {autoTitle,setupContextValue} from './core.mjs';
const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
function harness(text){
  const nodes=new Map(),calls=[],notices=[];
  const $=id=>{if(!nodes.has(id))nodes.set(id,{value:'',textContent:'',selectionStart:0,selectionEnd:0,hidden:true,addEventListener(){}});return nodes.get(id);};
  const context=vm.createContext({$,autoTitle,setupContextValue,controller:null,capturePending:false,record:null,processing:false,topic:null,uid:()=> 'id',act:fn=>fn(),notice:x=>notices.push(x),reveal:(id,show=true)=>{$(id).hidden=!show;},save:async()=>{},renderTopic(){},teach:async()=>calls.push('teach'),api:async path=>{calls.push(path);return {blocks:[{text}]};}});
  vm.runInContext(app.slice(app.indexOf('let importPending'),app.indexOf("$('chatForm').onsubmit")),context);
  return {$,context,calls,notices,async upload(){ $('sourceFile').files=[{name:'规则.v2.docx',size:10,arrayBuffer:async()=>new ArrayBuffer(0)}];await $('sourceFile').onchange();},start:()=>$('learn').onclick()};
}
test('successful extraction makes small file ready without manual use-all',async()=>{
  const h=harness('Rule');await h.upload();assert.equal(h.$('extractedText').value,'Rule');assert.equal(h.$('source').value,'Rule');await h.start();assert.deepEqual(h.calls,['/api/extract','teach']);
});
for(const length of [1,4999,5000])test(`normalized ${length} characters auto-use with filename and count`,async()=>{
  const h=harness(' \n'+'字'.repeat(length)+'\n ');h.$('setupFocus').value='条件';h.$('setupKnown').value='定义';await h.upload();
  assert.equal(h.$('source').value,'字'.repeat(length));assert.equal(h.$('title').value,'规则.v2');assert.equal(h.$('importPreview').hidden,false);assert.equal(h.$('sourceCount').textContent,`${length.toLocaleString()} / 5,000 字`);assert.deepEqual(h.calls,['/api/extract']);
  await h.start();assert.deepEqual({...h.context.topic.setupContext},{focus:'条件',known:'定义'});assert.equal(h.context.topic.messages.length,0);
});
for(const previous of ['', 'Earlier source'])test(`5001 characters require selection; preserve prior source=${!!previous}`,async()=>{
  const h=harness('字'.repeat(5001));h.$('source').value=previous;await h.upload();assert.equal(h.$('source').value,previous);assert.equal(h.$('extractedText').value.length,5001);assert.match(h.notices.at(-1),/选取最多 5,000 字/);assert.deepEqual(h.calls,['/api/extract']);
  h.$('extractedText').selectionStart=10;h.$('extractedText').selectionEnd=30;h.$('useSelection').onclick();assert.equal(h.$('source').value,'字'.repeat(20));assert.equal(h.$('title').value,'规则.v2');
});
test('manual subset replaces auto-use; clearing preview retains source; explicit source clear fails closed',async()=>{
  const h=harness('First\n\nSecond');await h.upload();h.$('extractedText').selectionStart=7;h.$('extractedText').selectionEnd=13;h.$('useSelection').onclick();assert.equal(h.$('source').value,'Second');
  h.$('clearImport').onclick();assert.equal(h.$('source').value,'Second');assert.equal(h.$('importPreview').hidden,true);assert.equal(h.$('extractedText').value,'');
  h.$('source').value='';await h.start();assert.deepEqual(h.calls,['/api/extract']);assert.match(h.notices.at(-1),/请先放入/);
});
test('direct paste needs no import and derives title locally',async()=>{
  const h=harness('unused');h.$('source').value='Pasted rule';await h.start();assert.deepEqual(h.calls,['teach']);assert.equal(h.context.topic.source.title,'Pasted rule');
});
