import assert from 'node:assert/strict';

export async function contextChecks({check,evaluate,until,click,reloadPage,shot,cdp,all,calls,requests,setFail}){
  const input=(id,value)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
  const search=async(query,label)=>{
    await click('historyButton');await input('historySearch',query);
    await evaluate(`[...document.querySelectorAll('.history-hit')].find(b=>b.textContent.startsWith(${JSON.stringify(label)})).click()`);
    await until(`document.getElementById('history').hidden&&!document.getElementById('workspace').hasAttribute('aria-busy')`);
  };
  await check('search jumps to old messages with neighbors and opens the exact historical transcript without replacing current text',async()=>{
    const before=calls.length;
    await evaluate(`(async()=>{
      const db=await(await import('/storage.mjs')).openStore();await db.clear();
      const source={id:'context-source',title:'植物的浇水条件',text:'只有土壤干燥时才浇水，湿润时不要浇水。'};
      const wave=(await import('/core.mjs')).waveBytes(new Float32Array(16000));
      await db.put({id:'context-topic',createdAt:Date.now(),source,goals:[],mode:'learn',resume:{view:'learn'},
        messages:Array.from({length:100},(_,i)=>({role:i%2?'user':'assistant',text:i===8?'回顾标记：浇水需要满足什么条件？':'第 '+i+' 条：先看土壤条件，再判断是否需要浇水。'})),
        attempts:[{id:'context-attempt',createdAt:Date.now(),source,kind:'full',assistance:'none',duration:1,
          audio:new Blob([wave],{type:'audio/wav'}),status:'REVIEW_REQUIRED',reports:[],
          raw:{id:'raw-v1',text:'旧转写标记：湿润时也浇水。',spans:[{id:'s0',start:0,end:1,text:'旧转写标记：湿润时也浇水。'}]},
          corrections:[{id:'corrected-v2',reviewed:true,spans:[{id:'s0',start:0,end:1,text:'湿润时不浇水。'}]}]}]});db.close();
    })()`);
    await reloadPage();await search('回顾标记','对话');
    assert.equal(await evaluate(`document.activeElement.dataset.messageIndex`),'8');
    assert.equal(await evaluate(`document.querySelectorAll('#messages .message').length`),24);
    assert(await evaluate(`document.querySelector('[data-message-index="7"]')&&document.querySelector('[data-message-index="9"]')`));
    await click('chatNewer');assert.equal(await evaluate(`document.querySelectorAll('#messages .message').length`),48);
    await shot('message-location','phase');
    await click('chatLatest');assert(await evaluate(`document.querySelector('[data-message-index="99"]')!==null`));
    await search('旧转写标记','原始转写');
    assert(await evaluate(`!document.getElementById('searchExcerpt').hidden&&document.getElementById('searchExcerptText').textContent.includes('旧转写标记')`));
    assert.equal(await evaluate(`document.querySelector('#transcript textarea').value`),'湿润时不浇水。');
    assert.equal(calls.length,before);
    await shot('transcript-location','attemptPanel');
  });
  await check('context note persists across reload and explicit retry uses the original note snapshot',async()=>{
    await search('回顾标记','对话');
    await evaluate(`document.getElementById('chatContext').open=true`);
    await input('contextNote','已经厘清：先观察土壤。下一步讨论光照是否改变条件。');
    await click('historyButton');await reloadPage();
    assert.equal(await evaluate(`document.getElementById('contextNote').value`),'已经厘清：先观察土壤。下一步讨论光照是否改变条件。');
    setFail();await input('chat','光照能单独决定浇水吗？');await evaluate(`document.getElementById('chatForm').requestSubmit()`);
    await until(`!document.getElementById('chatRetry').disabled&&document.getElementById('notice').textContent.includes('API_RESULT_UNAVAILABLE')`);
    const original=structuredClone(requests.at(-1));
    await input('contextNote','后来补充的要点');await click('historyButton');await reloadPage();
    await click('chatRetry');await until(`document.getElementById('chatRecovery').hidden`);
    assert.deepEqual(requests.at(-1),original);
    assert.equal(await evaluate(`document.getElementById('contextNote').value`),'后来补充的要点');
    await evaluate(`document.getElementById('chatContext').open=true`);
    await shot('context-note','phase');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));await shot('context-mobile','chatContext');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('unconfirmed voice edits survive reload and backup, then create a version-bound report with request trace',async()=>{
    await search('旧转写标记','原始转写');
    const before=calls.length;
    await evaluate(`{const e=document.querySelector('#transcript textarea');e.value='核对草稿标记：湿润时先不要浇水。';e.dispatchEvent(new Event('input',{bubbles:true}));}`);
    await click('historyButton');await reloadPage();
    assert.equal(await evaluate(`document.querySelector('#transcript textarea').value`),'核对草稿标记：湿润时先不要浇水。');
    assert.equal(calls.length,before);
    const backup=await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];db.close();const b=await import('/backup.mjs');const copy=b.restoredCopy(b.decodeBackup(await b.encodeBackup(t)));return {draft:copy.attempts[0].transcriptDraft,versions:copy.attempts[0].corrections.length,note:copy.contextNote};})()`);
    assert.equal(backup.draft.edits[0].text,'核对草稿标记：湿润时先不要浇水。');assert.equal(backup.versions,1);assert.equal(backup.note,'后来补充的要点');
    await search('核对草稿标记','核对草稿');
    assert.equal(await evaluate(`document.activeElement.tagName`),'TEXTAREA');
    await click('confirm');await until(`document.querySelector('#feedback .finding')&&!document.getElementById('confirm').disabled`);
    const a=(await evaluate(all))[0].attempts[0],report=a.reports.at(-1);
    assert.equal(a.transcriptDraft,undefined);assert.equal(a.corrections.length,2);
    assert.equal(report.transcriptVersion,a.corrections.at(-1).id);
    assert.equal(report.analysis.model,'TEST_STUB_NOT_API');assert.equal(report.analysis.requestId,'req_synthetic_diagnosis');
    assert.equal(calls.length,before+1);
    await evaluate(`document.getElementById('analysisDetails').open=true`);await shot('voice-analysis-trace','attemptPanel');
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
}
