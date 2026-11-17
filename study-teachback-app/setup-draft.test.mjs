import test from 'node:test';
import assert from 'node:assert/strict';
import {mountSetupDraft,SETUP_DRAFT_KEY} from './setup-draft.mjs';
import {RETENTION_MS} from './core.mjs';
function harness(storage=new Map(),now=()=>1000){
  const nodes=new Map();const $=id=>{if(!nodes.has(id))nodes.set(id,{value:'',textContent:'',addEventListener(){}});return nodes.get(id);};
  const backing={getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)};
  const draft=mountSetupDraft({$,storage:backing,now});return {$,draft,storage,backing};
}
test('setup fields and material undo survive reload without extending seven-day creation retention',()=>{
  const h=harness();h.$('source').value='Original';h.$('title').value='Course';h.$('setupFocus').value='Conditions';h.draft.capture();
  h.draft.replaceMaterial('Imported','File');const next=harness(h.storage,()=>2000);
  assert.equal(next.$('source').value,'Imported');assert.equal(next.$('title').value,'Course');
  next.$('setupKnown').value='Definitions';next.draft.capture();next.draft.undo();
  assert.equal(next.$('source').value,'Original');assert.equal(next.$('setupKnown').value,'Definitions');
  assert.equal(JSON.parse(h.storage.get(SETUP_DRAFT_KEY)).createdAt,1000);
  assert.equal(harness(h.storage,()=>1000+RETENTION_MS).draft.hasContent(),false);
});
test('failed synchronous save leaves editable contents and undo in memory for explicit retry',()=>{
  const h=harness();h.$('source').value='Unsaved';h.backing.setItem=()=>{throw Error('Quota');};
  assert.throws(()=>h.draft.capture(),/SETUP_DRAFT_SAVE_FAILED/);assert.equal(h.draft.dirty,true);
  h.draft.restore();assert.equal(h.$('source').value,'Unsaved');
  h.backing.setItem=(key,value)=>h.storage.set(key,value);h.draft.flush();
  assert.equal(h.draft.dirty,false);assert.equal(harness(h.storage).$('source').value,'Unsaved');
  h.draft.clear();assert.equal(h.storage.size,0);assert.equal(h.$('source').value,'');
});
