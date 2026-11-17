import test from 'node:test';
import assert from 'node:assert/strict';
import {importedDocument,selectedProvenance,quoteLocations,validateSourceProvenance} from './source-provenance.mjs';
import {encodeBackup,decodeBackup} from './backup.mjs';
import {mountSetupDraft} from './setup-draft.mjs';

test('trimmed selection retains original page offsets, cross-page and ambiguous quotations stay explicit',()=>{
  const document=importedDocument([{label:'第 1 页',text:'  Rule A. Same.'},{label:'第 2 页',text:''},{label:'第 3 页',text:'Rule B. Same.  '}],'lesson.pdf');
  const p=selectedProvenance(document,7,document.text.length);
  const source={text:p.text,provenance:p};validateSourceProvenance(source);
  assert.deepEqual(quoteLocations(source,'Rule B.')[0].labels,['第 3 页']);
  assert.equal(quoteLocations(source,'Same.').length,2);
  assert.deepEqual(quoteLocations(source,'Same.')[0].labels,['第 1 页']);
  assert.deepEqual(quoteLocations({text:'aaa'},'aa').map(x=>x.start),[0,1]);
  assert.throws(()=>validateSourceProvenance({...source,text:'Changed'}),/INVALID_SOURCE_PROVENANCE/);
});
test('material edits remove page claims, undo restores exact metadata, and new-topic snapshots leave the old source intact',()=>{
  const nodes=new Map(),saved=new Map();const $=id=>{if(!nodes.has(id))nodes.set(id,{value:'',addEventListener(){}});return nodes.get(id);};
  const draft=mountSetupDraft({$,storage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)}});
  const p=selectedProvenance(importedDocument([{label:'幻灯片 2',text:'Old material'}],'lesson.pptx'));
  const old={id:'original',title:'Course',text:p.text,provenance:p};
  draft.replaceMaterial(p.text,'Course',{provenance:p,revisionOf:old.id});
  draft.replaceMaterial('Replacement','New file');draft.undo();
  assert.deepEqual(draft.sourceMetadata(),{revisionOf:old.id,provenance:p});
  $('source').value='Edited material';draft.capture();
  assert.deepEqual(draft.sourceMetadata(),{revisionOf:old.id});assert.equal(old.text,'Old material');
});
test('v1 backups retain page provenance and reject mismatched offsets without requiring historical metadata',async()=>{
  const p=selectedProvenance(importedDocument([{label:'第 3 页',text:'Rule'}],'lesson.pdf'));
  const topic={id:'topic',createdAt:1,source:{id:'source',title:'Course',text:p.text,provenance:p,revisionOf:'old-source'},goals:[],messages:[],attempts:[]};
  const decoded=decodeBackup(await encodeBackup(topic));assert.deepEqual(decoded.source,topic.source);
  const broken=JSON.parse(await encodeBackup(topic));broken.topic.source.provenance.regions[0].end=99;
  assert.throws(()=>decodeBackup(JSON.stringify(broken)),/BACKUP_INVALID/);
  delete topic.source.provenance;delete topic.source.revisionOf;assert.equal(decodeBackup(await encodeBackup(topic)).source.id,'source');
});
