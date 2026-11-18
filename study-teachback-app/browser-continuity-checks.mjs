import assert from 'node:assert/strict';
export async function continuityChecks({check,evaluate,until,reloadPage,shot,cdp,click,calls,setAIConfigured}){
  await check('supplementary evidence makes a previously unusable condition actionable and continues the current explanation without rewriting history',async()=>{
    setAIConfigured(false);await reloadPage();
    const input=(id,value)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
    const read=`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0];db.close();return t;})()`;
    const a='数组长度8，预留一个空位时最多保存7个元素。',b='另记count、不预留空位时，长度8最多保存8个元素。';
    await input('source',a);await input('title','材料续学样本');await click('learn');await until(`!document.getElementById('workspace').hidden`);
    await click('explain');await input('textExplanation','长度8最多放7个，是否所有实现都如此？');await click('saveTextExplanation');await until(`!document.getElementById('attemptPanel').hidden`);
    setAIConfigured(true);await click('refreshCapabilities');await until(`!document.getElementById('confirm').disabled`);await click('confirm');await until(`document.querySelector('#feedback .finding')`);
    const original=(await evaluate(read)).attempts[0],before=calls.length;
    await evaluate(`document.getElementById('materialSet').open=true;document.getElementById('addMaterialDetails').open=true`);
    await input('materialTitle','补充笔记B');await input('materialText',b);await click('addMaterial');await until(`document.querySelectorAll('#materialChoices input').length===2&&!document.getElementById('addMaterial').disabled`);
    await evaluate(`document.querySelectorAll('#materialChoices button')[1].click()`);await click('quoteMaterial');await input('issueQuestion','采用预留空位还是另记count？');await input('issueStatus','condition');await input('issueCondition','本次另记count，不预留空位。');await click('saveStudyIssue');
    await until(`document.querySelector('[data-continue-issue]')&&!document.querySelector('[data-continue-issue]').disabled`);
    assert.match(await evaluate(`document.getElementById('judgementChoices').textContent`),/需要补入：补充笔记B/);assert.equal(calls.length,before);
    await evaluate(`document.getElementById('judgementChoices').open=true;document.querySelector('[data-continue-issue]').click()`);
    await until(`!document.getElementById('continuationInfo').hidden&&!document.getElementById('confirm').disabled`);
    assert.equal(calls.length,before);assert.equal(await evaluate(`document.querySelector('#transcript textarea').value`),original.raw.spans[0].text);
    assert(await evaluate(`document.querySelector('#judgementChoices input').checked`));const continued=await evaluate(read);
    assert.deepEqual(continued.studyContexts[0].attempts[0],original);assert.equal(continued.attempts[0].reports.length,0);assert.equal(continued.attempts[0].raw.reviewed,false);
    await evaluate(`{const e=document.querySelector('#transcript textarea');e.value='本次另记count且不预留空位，因此长度8可放8个。';e.dispatchEvent(new Event('input',{bubbles:true}));}`);
    await click('confirm');await until(`document.querySelector('[data-judgement="judgeable"]')`);assert.equal(calls.length,before+1);assert.equal(calls.at(-1).sourceId,continued.source.id);
    await shot('material-continuation-desktop','attemptPanel');
    await evaluate(`document.querySelector('[data-condition-practice]').click()`);await until(`document.getElementById('practicePanel').dataset.active==='true'&&!document.getElementById('practiceDraft').disabled`);await input('practiceDraft','按另记count实现，长度10可放10个。');await click('practiceSubmit');await until(`!document.getElementById('practiceAgain').hidden&&!document.getElementById('practiceReturn').disabled`);assert.equal(calls.length,before+3);await click('practiceReturn');await until(`!document.getElementById('searchExcerpt').hidden`);
    await reloadPage();assert(await evaluate(`document.querySelector('[data-judgement="judgeable"]')`));
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0],b=await import('/backup.mjs');await db.put(b.restoredCopy(b.decodeBackup(await b.encodeBackup(t))));await db.delete(t.id);db.close();})()`);await reloadPage();
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await shot('material-continuation-mobile','attemptPanel');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    await click('continuationOrigin');await until(`document.getElementById('continuationInfo').hidden&&!document.getElementById('confirm').disabled`);assert.equal(await evaluate(`document.querySelector('#transcript textarea').value`),original.raw.spans[0].text);assert.deepEqual((await evaluate(read)).attempts[0],original);
    await evaluate(`document.getElementById('materialSet').open=true;document.getElementById('addMaterialDetails').open=true`);await input('materialTitle','另一份补充');await input('materialText','区分约定后再确定容量。');await click('addAndContinue');await until(`!document.getElementById('continuationInfo').hidden&&!document.getElementById('addAndContinue').disabled`);assert.equal(calls.length,before+3);
    await click('historyButton');await click('deleteAll');await reloadPage();await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
}
