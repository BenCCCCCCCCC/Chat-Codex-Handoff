import assert from 'node:assert/strict';
export async function dailyChecks({check,evaluate,until,reloadPage,click,calls,shot,cdp,setAIConfigured}){
  await check('daily recovery keeps unconfigured recordings saved, continues in text and explicitly analyses an interrupted fragment with visible expiry',async()=>{
    setAIConfigured(false);await reloadPage();const before=calls.length;
    const input=(id,value)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
    const read=`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0];db.close();return {...t,attempts:t.attempts.map(a=>({...a,audio:a.audio?{size:a.audio.size}:null}))};})()`;
    await input('source','只有土壤干燥时才浇水，湿润时不要浇水。');await click('learn');await until(`!document.getElementById('workspace').hidden`);
    await click('explain');await click('chooseVoice');await click('start');await until(`!document.getElementById('finish').hidden`);await new Promise(r=>setTimeout(r,900));await click('finish');
    await until(`document.getElementById('notice').textContent.includes('本次未发送转写请求')&&!document.getElementById('audioContinueText').disabled`);
    const saved=(await evaluate(read)).attempts[0];assert.equal(saved.status,'SAVED');assert.equal(saved.raw,null);assert(saved.audio.size>0);assert.equal(calls.length,before);
    await click('audioContinueText');await input('textExplanation','土干了才浇水。');await click('saveTextExplanation');await until(`document.getElementById('attemptKind').textContent.includes('文字')`);
    assert.equal((await evaluate(read)).attempts[1].parentId,saved.id);assert.equal(calls.length,before);
    await click('fullAgain');await click('chooseVoice');await click('start');await until(`!document.getElementById('finish').hidden`);await new Promise(r=>setTimeout(r,900));await evaluate(`window.testTracks[0].dispatchEvent(new Event('ended'))`);
    await until(`document.getElementById('notice').textContent.includes('采集中断')&&!document.getElementById('audioContinueText').disabled`);const interrupted=(await evaluate(read)).attempts.at(-1);assert(interrupted.interrupted);assert.equal(calls.length,before);
    setAIConfigured(true);await click('refreshCapabilities');await until(`!document.getElementById('retryAsr').disabled`);assert.match(await evaluate(`document.getElementById('retryAsr').textContent`),/保留片段/);await click('retryAsr');await until(`document.querySelector('#transcript textarea')&&!document.getElementById('confirm').disabled`);
    await click('confirm');await until(`document.getElementById('confirm').textContent.includes('查看')`);const final=await evaluate(read),last=final.attempts.at(-1);assert(last.interrupted&&last.fragmentAcceptedAt);assert.equal(last.audio.size,interrupted.audio.size);assert.equal(last.reports.length,1);
    await click('historyButton');assert.match(await evaluate(`document.querySelector('.expiry-label').textContent`),/保留至/);assert.match(await evaluate(`document.getElementById('historyList').textContent`),/继续学习不会延长/);
    const expires=await evaluate(`new Date(${final.createdAt}+7*86400000).toLocaleString()`);assert((await evaluate(`document.getElementById('historyList').textContent`)).includes(expires));
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await shot('daily-retention-mobile','history');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0],b=await import('/backup.mjs');await db.put(b.restoredCopy(b.decodeBackup(await b.encodeBackup(t))));await db.delete(t.id);db.close();})()`);await reloadPage();assert.match(await evaluate(`document.getElementById('voiceState').textContent`),/录音片段/);
    await click('historyButton');await click('deleteAll');await reloadPage();await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
}
