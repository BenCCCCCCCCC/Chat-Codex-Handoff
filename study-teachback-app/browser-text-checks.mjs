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
    await until(`!document.getElementById('storageRecovery').hidden`);await evaluate(`IDBObjectStore.prototype.put=window.textNativePut`);await click('retrySave');await until(`document.getElementById('storageRecovery').hidden`);
    await until(`!document.getElementById('attemptPanel').hidden`);assert.equal(calls.length,before);
    assert(await evaluate(`document.getElementById('confirm').disabled&&document.getElementById('confirm').textContent.includes('配置 AI')`));
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
    setAIConfigured(true);await reloadPage();await click('confirm');await until(`document.querySelector('#feedback .finding')`);
    assert.deepEqual(calls.slice(before).map(c=>c.kind),['content']);
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
}
