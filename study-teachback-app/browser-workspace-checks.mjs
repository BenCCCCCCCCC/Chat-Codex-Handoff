import assert from 'node:assert/strict';

export async function workspaceChecks({check,evaluate,until,click,reloadPage,shot,cdp,all,calls,pause,setDelay}){
  const input=(id,text)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(text)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
  const choose=async query=>{
    await click('historyButton');await until(`!document.getElementById('history').hidden`);
    await input('historySearch',query);
    await evaluate(`document.querySelector('.history-continue').click()`);
    await until(`document.getElementById('history').hidden && !document.getElementById('workspace').hasAttribute('aria-busy')`);
  };
  await check('workspace drafts survive immediate navigation, topic switches, reload and a failed write',async()=>{
    const before=calls.length;
    await evaluate(`(async()=>{
      const db=await(await import('/storage.mjs')).openStore();await db.clear();
      const base={createdAt:Date.now(),goals:[],attempts:[],mode:'learn'};
      await db.put({...base,id:'draft-plant',source:{id:'plant-source',title:'植物与光照',text:'只有土壤干燥时才浇水，湿润时不要浇水。'},messages:Array.from({length:60},(_,i)=>({role:i%2?'user':'assistant',text:'第 '+(i+1)+' 条 · '+(i%2?'光照与土壤湿度怎样共同影响植物？':'先观察土壤是否干燥，再决定是否浇水。光照会影响水分蒸发，但不能单独决定是否浇水。')})),updatedAt:Date.now()+1});
      await db.put({...base,id:'draft-other',source:{id:'other-source',title:'概率与条件',text:'条件改变后，需要重新判断。'},messages:[]});db.close();
    })()`);
    await reloadPage();await until(`document.querySelectorAll('#messages .message').length===24`);
    await input('chat','还没发送：光照会改变判断吗？');await click('historyButton');
    await until(`!document.getElementById('history').hidden`);
    assert.equal((await evaluate(all)).find(t=>t.id==='draft-plant').chatDraft,'还没发送：光照会改变判断吗？');
    await input('historySearch','光照');
    await evaluate(`document.getElementById('historyFilter').value='draft';document.getElementById('historyFilter').dispatchEvent(new Event('change'))`);
    assert.equal(await evaluate(`document.querySelectorAll('.history-continue').length`),1);
    assert(await evaluate(`document.querySelector('.history-snippet').textContent.includes('光照')`));
    await shot('record-search','history');
    await click('historyClear');await choose('概率');
    assert.equal(await evaluate(`document.getElementById('chat').value`),'');
    await choose('植物');await reloadPage();
    assert.equal(await evaluate(`document.getElementById('chat').value`),'还没发送：光照会改变判断吗？');
    assert.equal(calls.length,before);
    await evaluate(`window.nativePut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(){throw Error('synthetic disk full');};`);
    await input('chat','保存失败时仍保留这句草稿');
    await until(`!document.getElementById('storageRecovery').hidden`);
    assert.equal(await evaluate(`document.getElementById('chat').value`),'保存失败时仍保留这句草稿');
    await evaluate(`IDBObjectStore.prototype.put=window.nativePut`);await click('retrySave');
    await until(`document.getElementById('storageRecovery').hidden && document.getElementById('chatDraftStatus').textContent==='草稿已保存'`);
    await reloadPage();assert.equal(await evaluate(`document.getElementById('chat').value`),'保存失败时仍保留这句草稿');
  });
  await check('long conversations page earlier messages, preserve reading position and keep the next draft after a reply',async()=>{
    await evaluate(`document.getElementById('messages').scrollTop=0`);
    await click('chatOlder');assert.equal(await evaluate(`document.querySelectorAll('#messages .message').length`),48);
    assert(await evaluate(`document.getElementById('messages').scrollTop>0`));
    await input('chat','这次发送的问题');setDelay(1000);
    await evaluate(`document.getElementById('chatForm').requestSubmit()`);
    await until(`document.getElementById('workspace').hasAttribute('aria-busy')`);
    await input('chat','等待回复时写下的下一句');
    await evaluate(`window.readingNode=document.querySelector('#messages .message');document.getElementById('messages').scrollTop=0`);
    await until(`document.getElementById('chatRecovery').hidden`);setDelay(0);
    assert(await evaluate(`window.readingNode===document.querySelector('#messages .message') && document.getElementById('messages').scrollTop<10`));
    assert.equal(await evaluate(`document.getElementById('chat').value`),'等待回复时写下的下一句');
    assert.equal(await evaluate(`document.getElementById('chatLatest').hidden`),false);
    await click('chatLatest');assert(await evaluate(`document.getElementById('messages').scrollTop>0`));
    await shot('draft-long-chat','phase');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await shot('draft-chat-mobile','phase');
    assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('voice ASR result remains reviewable after local save failure and continues to bound diagnosis without retranscription',async()=>{
    await evaluate(`window.nativePut=IDBObjectStore.prototype.put;window.failReceivedASR=true;IDBObjectStore.prototype.put=function(t,...rest){if(window.failReceivedASR&&t.attempts?.at(-1)?.raw){window.failReceivedASR=false;throw Error('synthetic disk full after ASR');}return window.nativePut.call(this,t,...rest);};`);
    const before=calls.filter(c=>c.kind==='asr').length;
    await click('explain');await click('start');await until(`!document.getElementById('finish').hidden`);
    await pause(1100);await click('finish');
    await until(`!document.getElementById('storageRecovery').hidden && !document.getElementById('confirm').hidden`);
    assert.equal(await evaluate(`document.getElementById('retryAsr').hidden`),true);
    assert.equal(await evaluate(`document.getElementById('voiceState').textContent`),'');
    await evaluate(`IDBObjectStore.prototype.put=window.nativePut`);await click('retrySave');
    await until(`document.getElementById('notice').textContent.includes('已重新保存')`);
    const attempt=(await evaluate(all)).find(t=>t.id==='draft-plant').attempts[0];
    assert.equal(attempt.status,'REVIEW_REQUIRED');assert(attempt.raw&&attempt.audio.size>0);
    assert.equal(calls.filter(c=>c.kind==='asr').length,before+1);
    await click('confirm');await until(`document.querySelector('#feedback .finding') && !document.getElementById('confirm').disabled`);
    const diagnosed=(await evaluate(all)).find(t=>t.id==='draft-plant').attempts[0];
    assert.equal(diagnosed.reports[0].transcriptVersion,diagnosed.corrections[0].id);
    assert.equal(diagnosed.reports[0].attemptId,diagnosed.id);
    await shot('voice-checked','attemptPanel');
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);
    await reloadPage();
  });
}
