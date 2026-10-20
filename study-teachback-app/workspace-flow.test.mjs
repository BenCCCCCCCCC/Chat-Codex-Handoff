import test from 'node:test';
import assert from 'node:assert/strict';
import {createDraftSaver} from './draft-save.mjs';
import {searchRecords} from './record-search.mjs';
import {encodeBackup,decodeBackup,restoredCopy} from './backup.mjs';

test('navigation flush awaits an active draft write and the newer edit, retaining a failed write for retry',async()=>{
  let release,fail=false;const writes=[],states=[],topic={chatDraft:'first'};
  const saver=createDraftSaver({delay:60000,onStatus:s=>states.push(s),save:async t=>{
    const snapshot=t.chatDraft;
    if(!writes.length)await new Promise(r=>{release=r;});
    if(fail)throw Error('STORAGE_FAILED');
    writes.push(snapshot);
  }});
  saver.mark(topic);const writing=saver.flush();await Promise.resolve();
  topic.chatDraft='next';saver.mark(topic);
  let navigated=false;const navigation=saver.flush().then(()=>{navigated=true;});
  assert.equal(navigated,false);release();await Promise.all([writing,navigation]);
  assert.deepEqual(writes,['first','next']);assert.equal(saver.pending,false);
  fail=true;topic.chatDraft='keep me';saver.mark(topic);
  await assert.rejects(saver.flush(),/STORAGE_FAILED/);
  assert.equal(saver.pending,true);assert.equal(states.at(-1),'error');
  fail=false;await saver.flush();assert.equal(writes.at(-1),'keep me');assert.equal(saver.pending,false);
  fail=true;saver.mark(topic);await assert.rejects(saver.flush(),/STORAGE_FAILED/);
  const count=writes.length;await saver.discard();await saver.flush();
  assert.equal(saver.pending,false);assert.equal(writes.length,count,'deletion can discard an unsaved draft');
});

test('local search finds old transcripts and practice feedback, combines terms, filters and preserves order',()=>{
  const base={source:{title:'植物',text:'干燥时浇水'},messages:[],attempts:[]};
  const records=[
    {...base,id:'chat',chatDraft:'还想问光照',messages:[{text:'ＬＥＡＦ 光合作用'}]},
    {...base,id:'voice',attempts:[{id:'voice-a',raw:{id:'raw',spans:[{id:'s1',text:'土壤干燥'}]},corrections:[{id:'corrected',spans:[{id:'s1',text:'湿润时不浇水'}]}],reports:[{findings:[{message:'条件需要澄清'}]}]}]},
    {...base,id:'practice',practiceRounds:[{question:'新情境',draft:'',answers:[{text:'先不浇水',result:'判断符合条件'}]}]}
  ];
  const ids=(q,f)=>searchRecords(records,q,f).map(r=>r.topic.id);
  assert.deepEqual(ids('leaf 光合'),['chat']);assert.deepEqual(ids('植物 湿润'),['voice']);
  assert.match(searchRecords(records,'湿润')[0].snippet,/湿润/);
  assert.deepEqual(ids('符合条件','practice'),['practice']);
  assert.deepEqual(ids('','draft'),['chat']);assert.deepEqual(ids('','audio'),['voice']);
  assert.deepEqual(ids('missing'),[]);assert.deepEqual(ids(''),['chat','voice','practice']);
});

test('chat draft travels with the existing backup format, including a restored copy',async()=>{
  const topic={id:'topic',createdAt:Date.now(),source:{id:'source',title:'Rule',text:'Rule'},goals:[],messages:[],attempts:[],chatDraft:'尚未发送的问题'};
  const decoded=decodeBackup(await encodeBackup(topic));
  assert.equal(restoredCopy(decoded).chatDraft,topic.chatDraft);
});
