import assert from 'node:assert/strict';
import {normalizeTranscription} from './asr-contract.mjs';

export async function materialVersionChecks({check,evaluate,until,reloadPage,shot,cdp,click,calls,setAIConfigured,savedWave}){
  const input=(id,value)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
  const read=`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0];db.close();return t;})()`;
  await check('rename and revise recover drafts, preserve old feedback, survive failed save, and restore versioned history on mobile',async()=>{
    setAIConfigured(false);await reloadPage();await input('source','长度8，预留一个空位时容量7。');await input('title','原课件');await click('learn');await until(`!document.getElementById('workspace').hidden`);
    await click('explain');await input('textExplanation','长度8时可放7个元素。');await click('saveTextExplanation');await until(`!document.getElementById('attemptPanel').hidden`);
    setAIConfigured(true);await click('refreshCapabilities');await until(`!document.getElementById('confirm').disabled`);await click('confirm');await until(`document.querySelector('#feedback .finding')`);
    const original=(await evaluate(read)).attempts[0],before=calls.length;
    await evaluate(`document.getElementById('materialSet').open=true;document.querySelector('[data-edit-material]').click()`);await until(`!document.getElementById('materialEditor').hidden&&!document.getElementById('saveMaterialRevision').disabled`);
    await input('materialRevisionTitle','循环队列课件');await click('saveMaterialRevision');await until(`document.querySelectorAll('#materialChoices input').length===2&&!document.getElementById('saveMaterialRevision').disabled`);
    assert.match(await evaluate(`document.getElementById('activeMaterials').textContent`),/原课件 · v1/);assert.match(await evaluate(`document.getElementById('materialVersionNotice').textContent`),/历史版本/);assert.equal(calls.length,before);
    await evaluate(`document.querySelector('[data-edit-material]').click()`);await until(`!document.getElementById('materialEditor').hidden&&!document.getElementById('saveMaterialRevision').disabled`);
    await input('materialRevisionText','长度8，另记count且不预留空位时容量8。');await input('materialRevisionNote','补充另一种实现');await click('historyButton');await reloadPage();
    if(await evaluate(`!document.getElementById('history').hidden`)){await evaluate(`document.querySelector('#historyList button').click()`);}
    // Resume the active topic through the existing history entry if needed.
    await until(`!document.getElementById('workspace').hidden`);await evaluate(`document.getElementById('materialSet').open=true;document.getElementById('materialEditor').open=true`);
    assert.equal(await evaluate(`document.getElementById('materialRevisionText').value`),'长度8，另记count且不预留空位时容量8。');
    await evaluate(`window.versionNativePut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(){throw new DOMException('synthetic quota','QuotaExceededError');};`);
    await click('saveMaterialRevisionContinue');await until(`!document.getElementById('storageRecovery').hidden&&!document.getElementById('saveMaterialRevisionContinue').disabled`);
    assert.equal((await evaluate(read)).materials.length,2);assert.equal(await evaluate(`document.getElementById('materialEditor').hidden`),false);
    await evaluate(`IDBObjectStore.prototype.put=window.versionNativePut`);await click('retrySave');await until(`document.getElementById('storageRecovery').hidden`);await click('saveMaterialRevisionContinue');await until(`!document.getElementById('continuationInfo').hidden&&!document.getElementById('saveMaterialRevisionContinue').disabled`);
    const revised=await evaluate(read);assert.equal(revised.materials.length,3);assert.equal(revised.attempts[0].reports.length,0);assert.deepEqual(revised.studyContexts[0].attempts[0],original);assert.equal(calls.length,before);
    assert.match(await evaluate(`document.getElementById('activeMaterials').textContent`),/v3/);await shot('material-versions-desktop','materialSet');
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0],b=await import('/backup.mjs'),json=await b.encodeBackup(t);window.versionBackupFormat=JSON.parse(json).format;await db.put(b.restoredCopy(b.decodeBackup(json)));await db.delete(t.id);db.close();})()`);
    assert.equal(await evaluate('window.versionBackupFormat'),'study-teachback-export-v5');await reloadPage();
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await evaluate(`document.getElementById('materialSet').open=true;document.querySelector('#materialChoices details').open=true`);await shot('material-versions-mobile','materialSet');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    await click('continuationOrigin');await until(`document.getElementById('continuationInfo').hidden&&!document.getElementById('confirm').disabled`);assert.deepEqual((await evaluate(read)).attempts[0],original);assert(await evaluate(`document.querySelector('#feedback .finding')`));
    // Drop the old version from this use without deleting its evidence.
    await evaluate(`document.getElementById('materialSet').open=true;const inputs=[...document.querySelectorAll('#materialChoices input')];inputs.forEach((e,i)=>e.checked=i===0)`);await click('useMaterials');await until(`!document.getElementById('continuationInfo').hidden&&!document.getElementById('useMaterials').disabled`);assert.equal((await evaluate(read)).materials.length,3);
    await click('historyButton');await click('deleteAll');await reloadPage();await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('candidate text-only audio displays full-recording replay, confirms text and restores without invented word timing',async()=>{
    const raw={...normalizeTranscription({text:'水从液态变为气态。'},7.31,'gpt-transcribe'),id:'raw',reviewed:false,model:'gpt-transcribe'},before=calls.length;
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),source={id:'candidate-source',title:'转写兼容合成样本',text:'蒸发是水从液态变为气态。'},a={id:'candidate-attempt',createdAt:Date.now(),source,kind:'full',assistance:'none',duration:7.31,audio:new Blob([new Uint8Array(${JSON.stringify(savedWave)})],{type:'audio/wav'}),raw:${JSON.stringify(raw)},corrections:[],reports:[]};await db.put({id:'candidate-topic',createdAt:Date.now(),source,goals:[],messages:[],attempts:[a],resume:{view:'attempt',attemptId:a.id}});db.close();})()`);await reloadPage();
    assert.match(await evaluate(`document.getElementById('reviewHint').textContent`),/未提供词句时间/);assert.equal(await evaluate(`document.querySelectorAll('#rawText button').length`),0);assert.match(await evaluate(`document.querySelector('#transcript button').textContent`),/整段录音/);assert.equal(calls.length,before);
    await shot('asr-recording-fallback','attemptPanel');await click('confirm');await until(`document.querySelector('#feedback .finding')`);assert.equal(calls.length,before+1);
    assert.match(await evaluate(`document.querySelector('#feedback [data-replay="recording"]').textContent`),/未提供词句时间/);
    await click('historyButton');await click('deleteAll');await reloadPage();
  });
}
