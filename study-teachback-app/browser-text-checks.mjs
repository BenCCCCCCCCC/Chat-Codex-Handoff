import assert from 'node:assert/strict';
export async function textChecks({check,evaluate,until,reloadPage,click,calls,shot,cdp,setAIConfigured}){
  await check('typed teach-back preserves drafts, saves locally, diagnoses explicitly and compares pinned versions through backup',async()=>{
    const before=calls.length;setAIConfigured(false);await reloadPage();
    await evaluate(`document.getElementById('source').value='只有土壤干燥时才浇水，湿润时不要浇水。'`);await click('learn');await until(`!document.getElementById('workspace').hidden`);
    await click('explain');assert(await evaluate(`document.getElementById('textComposer').open&&document.activeElement.id==='textExplanation'`));
    await evaluate(`{const e=document.getElementById('textExplanation');e.value='土壤湿润时也要浇水。';e.dispatchEvent(new Event('input'));}`);
    await click('cancelRecord');await click('historyButton');await reloadPage();await click('historyButton');
    await evaluate(`{const s=document.getElementById('historySearch');s.value='土壤湿润时也要浇水';s.dispatchEvent(new Event('input'));}`);
    await until(`document.querySelector('.history-hit')`);await evaluate(`document.querySelector('.history-hit').click()`);
    await until(`!document.getElementById('recording').hidden&&document.activeElement.id==='textExplanation'`);
    assert.equal(await evaluate(`document.getElementById('textExplanation').value`),'土壤湿润时也要浇水。');
    await evaluate(`window.textNativePut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(){throw new DOMException('test quota','QuotaExceededError');}`);
    await evaluate(`document.getElementById('saveTextExplanation').click();document.getElementById('saveTextExplanation').click()`);
    await until(`!document.getElementById('storageRecovery').hidden`);assert(!await evaluate(`document.getElementById('diagnosisState').textContent.includes('保存在本机')`));await evaluate(`IDBObjectStore.prototype.put=window.textNativePut`);await click('retrySave');await until(`document.getElementById('storageRecovery').hidden`);
    await until(`!document.getElementById('attemptPanel').hidden`);assert.equal(calls.length,before);
    assert(await evaluate(`document.getElementById('confirm').disabled&&document.getElementById('confirm').textContent.includes('配置 AI')`));
    assert(await evaluate(`document.getElementById('confirm').hidden&&document.getElementById('reviewActions').contains(document.getElementById('fullAgain'))&&document.getElementById('diagnosisState').textContent.includes('尚未发送给 AI')`));
    assert(await evaluate(`document.getElementById('player').hidden&&document.getElementById('processDetails').hidden&&!document.querySelector('#transcript button')`));
    assert(!await evaluate(`document.getElementById('diagnosisState').textContent.includes('回听')`));
    assert(await evaluate(`document.getElementById('apply').disabled&&document.getElementById('apply').textContent.includes('配置 AI')`));
    await click('apply');await click('historyButton');await reloadPage();
    assert(await evaluate(`!document.getElementById('attemptPanel').hidden`));
    assert(await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0];db.close();return !t.practiceRequest&&t.resume.view==='attempt'&&(t.practiceRounds??[]).length===0;})()`));
    // Old unknown records cannot be identified as unsent: keep them, recover useful work.
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0];t.practiceRequest={status:'unknown',createdAt:Date.now()};t.resume={view:'practice'};await db.put(t);db.close();})()`);
    await reloadPage();assert(await evaluate(`!document.getElementById('attemptPanel').hidden&&document.getElementById('startPractice').textContent==='查看出题状态'`));
    await click('historyButton');assert.equal(await evaluate(`document.querySelector('.history-continue').textContent`),'继续核对与反馈');
    await evaluate(`document.querySelector('.history-continue').click()`);await until(`document.getElementById('history').hidden`);
    assert.equal(calls.length,before);await shot('local-text-resumed','attemptPanel');
    setAIConfigured(true);await reloadPage();
    assert(await evaluate(`!document.getElementById('confirm').hidden&&!document.getElementById('confirm').disabled&&document.getElementById('diagnosisState').textContent.includes('发送给 AI')`));
    assert.equal(calls.length,before);
    await click('confirm');await until(`document.querySelector('#feedback .finding')`);
    assert(!await evaluate(`document.getElementById('diagnosisState').textContent.includes('尚未发送给 AI')`));
    assert.deepEqual(calls.slice(before).map(c=>c.kind),['content']);
    await click('explain');
    await evaluate(`{const e=document.getElementById('textExplanation');e.value='先保留这份完整讲解。';e.dispatchEvent(new Event('input'));}`);
    await evaluate(`[...document.querySelectorAll('#feedback button')].find(b=>b.textContent==='再讲这一点').click()`);
    assert(await evaluate(`document.getElementById('recordTitle').textContent==='我来讲讲'&&document.getElementById('textExplanation').value==='先保留这份完整讲解。'&&document.getElementById('textDraftContext').textContent.includes('保存或清空')`));
    await click('discardTextDraft');await click('deleteConfirm');
    await until(`document.activeElement.id==='textExplanation'&&!document.getElementById('textExplanation').value`);
    await evaluate(`[...document.querySelectorAll('#feedback button')].find(b=>b.textContent==='再讲这一点').click()`);
    await evaluate(`document.getElementById('textComposer').open=true;const e=document.getElementById('textExplanation');e.value='只有土壤干燥才浇水；湿润时先不浇。';e.dispatchEvent(new Event('input'));`);
    await click('saveTextExplanation');await until(`!document.getElementById('attemptComparison').hidden`);
    await evaluate(`document.getElementById('attemptComparison').open=true`);
    assert.equal(await evaluate(`document.getElementById('beforeText').textContent`),'土壤湿润时也要浇水。');
    assert.equal(await evaluate(`document.getElementById('afterText').textContent`),'只有土壤干燥才浇水；湿润时先不浇。');
    assert.equal(calls.length,before+1);
    await click('confirm');await until(`document.querySelector('#afterReports section')`);assert.equal(calls.length,before+2);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0],b=await import('/backup.mjs');window.textRecordValid=t.attempts.length===2&&t.attempts.every(a=>!a.audio&&!a.duration&&a.inputMode==='text');const original=t.attempts[0];original.corrections.push({...original.corrections.at(-1),id:'later-edit',spans:[{id:'p0',text:'后来改写的旧讲解'}]});const copy=b.restoredCopy(b.decodeBackup(await b.encodeBackup(t)));await db.put(copy);await db.delete(t.id);db.close();})()`);
    assert(await evaluate('window.textRecordValid'));await reloadPage();await evaluate(`document.getElementById('attemptComparison').open=true`);
    assert.equal(await evaluate(`document.getElementById('beforeText').textContent`),'土壤湿润时也要浇水。');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));await shot('typed-comparison-mobile','attemptComparison');
    assert.equal(calls.length,before+2);await click('historyButton');await click('deleteAll');await reloadPage();
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('two topic writers using the same revision cannot both overwrite the record',async()=>{
    const result=await evaluate(`(async()=>{
      const {openStore}=await import('/storage.mjs'),name='guard-'+crypto.randomUUID();
      const a=await openStore(name),b=await openStore(name),id='synthetic',now=Date.now();
      const initial={id,createdAt:now,updatedAt:now};
      await a.putCurrent(initial,null,true);
      const outcomes=await Promise.allSettled([
        a.putCurrent({...initial,updatedAt:now+1,note:'first'},now),
        b.putCurrent({...initial,updatedAt:now+1,note:'second'},now)
      ]);
      const stored=await a.get(id);
      a.close();b.close();indexedDB.deleteDatabase(name);
      return {winners:outcomes.flatMap((r,i)=>r.status==='fulfilled'?[['first','second'][i]]:[]),
        rejections:outcomes.filter(r=>r.status==='rejected').map(r=>r.reason.message),stored:stored.note};
    })()`);
    assert.deepEqual(result.winners,[result.stored]);assert.deepEqual(result.rejections,['STORAGE_CHANGED']);
  });
}
