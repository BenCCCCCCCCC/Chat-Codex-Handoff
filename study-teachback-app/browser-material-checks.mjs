import assert from 'node:assert/strict';
export async function materialChecks({check,evaluate,until,reloadPage,click,calls,shot,cdp,setAIConfigured}){
  await check('one topic keeps course materials, condition notes and separate learning contexts through search and backup',async()=>{
    const before=calls.length;setAIConfigured(false);await reloadPage();
    const input=(id,text)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(text)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
    const slides='长度为 8 的循环队列，预留一个空位时，最多存放 7 个元素。',notes='另记元素个数时，长度为 8 的循环队列可以存放 8 个元素。';
    await input('source',slides);await input('title','循环队列');await click('learn');await until(`!document.getElementById('workspace').hidden`);
    await click('explain');await input('textExplanation','采用预留空位实现，因此是 7 个。');await click('saveTextExplanation');await until(`!document.getElementById('attemptPanel').hidden`);
    await evaluate(`document.getElementById('materialSet').open=true;document.getElementById('addMaterialDetails').open=true;`);
    await input('materialTitle','课堂笔记');
    await evaluate(`{const f=document.getElementById('materialFile'),dt=new DataTransfer();dt.items.add(new File([${JSON.stringify(notes)}],'notes.txt',{type:'text/plain'}));f.files=dt.files;f.dispatchEvent(new Event('change'));}`);
    await until(`!document.getElementById('materialImportPreview').hidden`);await click('materialUseAll');await until(`document.getElementById('materialText').value===${JSON.stringify(notes)}`);await click('addMaterial');
    await until(`document.querySelectorAll('#materialChoices input').length===2`);assert.equal(calls.length,before);
    await evaluate(`document.querySelectorAll('#materialChoices input')[1].checked=true;window.materialNativePut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(){throw new DOMException('test quota','QuotaExceededError');};`);
    await click('useMaterials');await until(`!document.getElementById('storageRecovery').hidden`);await evaluate(`IDBObjectStore.prototype.put=window.materialNativePut`);await click('retrySave');await until(`document.getElementById('storageRecovery').hidden`);
    assert(await evaluate(`document.getElementById('attemptPanel').hidden`));await reloadPage();assert(await evaluate(`document.getElementById('activeMaterials').textContent.includes('课堂笔记')`));assert(await evaluate(`document.getElementById('attemptPanel').hidden`));
    await click('explain');await input('textExplanation','题面没有说明实现约定，7 或 8 取决于条件。');await click('saveTextExplanation');await until(`!document.getElementById('attemptPanel').hidden`);
    await evaluate(`document.getElementById('materialSet').open=true;document.querySelectorAll('#materialChoices button')[0].click();`);await click('quoteMaterial');
    await evaluate(`document.querySelectorAll('#materialChoices button')[1].click()`);await click('quoteMaterial');
    await input('issueQuestion','长度为 8 的队列为什么出现两个容量？');await input('issueCondition','若题面采用预留空位则为 7；另记计数则为 8，缺少约定时暂缓。');await click('saveStudyIssue');
    await until(`document.querySelector('#studyIssueList article')`);assert.equal(calls.length,before);
    setAIConfigured(true);await click('refreshCapabilities');await until(`!document.getElementById('confirm').disabled`);await click('confirm');await until(`document.querySelector('#feedback .finding')`);assert.equal(calls.length,before+1);
    await click('historyButton');await input('historySearch','采用预留空位实现');await until(`document.querySelector('.history-hit')`);await evaluate(`document.querySelector('.history-hit').click()`);await until(`document.getElementById('history').hidden&&!document.getElementById('attemptPanel').hidden&&!document.getElementById('workspace').hasAttribute('aria-busy')`);
    assert.equal(await evaluate(`document.querySelector('#transcript textarea').value`),'采用预留空位实现，因此是 7 个。');
    await evaluate(`document.getElementById('studyIssues').open=true;document.querySelector('#studyIssueList button').click()`);await until(`document.querySelector('#transcript textarea')?.value==='题面没有说明实现约定，7 或 8 取决于条件。'`);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0],b=await import('/backup.mjs');window.materialBackup=b.restoredCopy(b.decodeBackup(await b.encodeBackup(t)));await db.put(window.materialBackup);await db.delete(t.id);db.close();})()`);
    await reloadPage();assert(await evaluate(`document.querySelector('#feedback .finding')`));
    await evaluate(`document.getElementById('studyIssues').open=true`);assert.match(await evaluate(`document.getElementById('studyIssueList').textContent`),/结论暂缓/);
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await shot('materials-condition-history','studyIssues');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    await click('historyButton');await click('deleteAll');await reloadPage();await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
}
