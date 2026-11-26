import assert from 'node:assert/strict';
import {taskSplitCases} from './task-split-fixtures.mjs';

export async function workspaceChecks({check,evaluate,until,click,reloadPage,shot,cdp,all,calls,pause,setDelay}){
  const input=(id,text)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(text)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
  const choose=async query=>{
    await click('historyButton');await until(`!document.getElementById('history').hidden`);
    await input('historySearch',query);
    await evaluate(`document.querySelector('.history-continue').click()`);
    await until(`document.getElementById('history').hidden && !document.getElementById('workspace').hasAttribute('aria-busy')`);
  };

  await check('global history resumes the exact pending gap in a former material context without an exercise',async()=>{
    const c=structuredClone(taskSplitCases[0]),now=Date.now(),before=calls.length;
    const report={...c.report,id:'pending-original-report',channel:'content',createdAt:now};
    const ref={sourceId:c.source.id,attemptId:c.attempt.id,transcriptVersion:c.attempt.transcriptVersion,reportId:report.id,findingIndex:0};
    const attempt={id:ref.attemptId,kind:'full',inputMode:'text',status:'SAVED',source:c.source,createdAt:now,raw:{id:ref.transcriptVersion,origin:'USER_TEXT',text:c.attempt.spans[0].text,spans:c.attempt.spans,reviewed:true},corrections:[],reports:[report]};
    const repeat={...attempt,id:'pending-repeat',kind:'partial',parentId:attempt.id,parentVersionId:ref.transcriptVersion,feedbackRef:ref,reports:[],raw:{...attempt.raw,id:'pending-repeat-version',text:'已复述原材料的必要条件。',spans:[{id:'p0',text:'已复述原材料的必要条件。'}]}};
    const active={id:'pending-new-source',title:'新版备份说明',text:'这是另一个材料版本。'};
    const topic={id:'pending-global',createdAt:now,studyTitle:'系统备份',source:active,goals:[],attempts:[],messages:[],mode:'learn',resume:{view:'learn'},updatedAt:now-1000,
      materials:[c.source,active],activeMaterialIds:[active.id],studyContexts:[{id:c.source.id,materialIds:[c.source.id],source:c.source,goals:[],messages:[],attempts:[attempt,repeat],practiceRounds:[],
        taskUnavailable:{origin:{feedbackRef:ref},target:c.context.target,reason:'暂未生成合适的检验题。'}}]};
    const other={id:'no-global-gap',createdAt:now,source:{id:'no-gap-source',title:'其他主题',text:'与备份无关。'},goals:[],attempts:[],messages:[],mode:'learn',updatedAt:now};
    const install="(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();await db.put("+JSON.stringify(topic)+");await db.put("+JSON.stringify(other)+");db.close();})()";
    const enter=async()=>{await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});};
    const select=async value=>evaluate("{const e=document.getElementById('historyFilter');e.value="+JSON.stringify(value)+";e.dispatchEvent(new Event('change'));}");
    for(const width of [1280,390]){
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
      await evaluate(install);await reloadPage();await click('historyButton');await select('practice');
      assert.equal(await evaluate("document.querySelectorAll('.history-pending').length"),0);
      await select('pending');assert.equal(await evaluate("document.querySelectorAll('#historyList > div').length"),1);
      await input('historySearch','系统备份');
      assert(await evaluate("(()=>{const b=document.querySelector('.history-pending');b.focus();const r=b.getBoundingClientRect();return document.activeElement===b&&r.width>0&&r.left>=0&&r.right<=innerWidth&&document.documentElement.scrollWidth<=innerWidth;})()"));
      await shot('global-pending-'+width,'history');await enter();
      await until("document.getElementById('history').hidden && !document.getElementById('searchReturn').hidden && document.activeElement.id==='practiceContinueGap'");
      assert.equal(await evaluate("document.getElementById('practiceContinueGap').textContent"),'回看依据');
      assert.equal(await evaluate("document.getElementById('practiceGapFinding').textContent"),report.findings[0].message);
      assert.match(await evaluate("document.getElementById('practiceStatus').textContent"),/已保存这点的重讲/);
      const saved=(await evaluate(all)).find(t=>t.id===topic.id);
      assert.deepEqual(saved.activeMaterialIds,[c.source.id]);assert.deepEqual(saved.taskUnavailable.origin.feedbackRef,ref);
      assert.deepEqual(saved.attempts[1].feedbackRef,ref);assert.equal(saved.attempts[1].parentVersionId,attempt.raw.id);assert.equal(saved.practiceRounds.length,0);
      await enter();
      await until("!document.getElementById('searchExcerpt').hidden && !document.getElementById('searchReturn').hidden");
      const excerpt=await evaluate("document.getElementById('searchExcerptText').textContent");
      assert(excerpt.includes(c.source.text)&&excerpt.includes(c.attempt.spans[0].text)&&excerpt.includes(report.findings[0].message));
      await evaluate("document.getElementById('searchReturn').focus()");await enter();
      await until("!document.getElementById('history').hidden && document.activeElement.matches('.history-pending')");
      assert.equal(await evaluate("document.getElementById('historyFilter').value"),'pending');
      assert.equal(await evaluate("document.getElementById('historySearch').value"),'系统备份');
    }
    await evaluate("(async()=>{const db=await(await import('/storage.mjs')).openStore();const value=await db.get("+JSON.stringify(topic.id)+");delete value.taskUnavailable;await db.put(value);db.close();})()");
    await enter();await until("document.getElementById('notice').textContent.includes('没有可继续的待检验项')");
    assert(await evaluate("!document.getElementById('history').hidden && document.activeElement.matches('.history-pending')"));
    assert.equal(calls.length,before);await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
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
