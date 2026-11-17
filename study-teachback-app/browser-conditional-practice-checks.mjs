import assert from 'node:assert/strict';
export async function conditionalPracticeChecks({check,evaluate,until,reloadPage,click,calls,shot,cdp,setAIConfigured,requests}){
  await check('condition-bound new questions, repeat evidence and reviewed revisions retain original work through recovery',async()=>{
    const before=calls.length;setAIConfigured(false);await reloadPage();
    const input=(id,text)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(text)};e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));}`);
    const source='预留空位时，长度n的循环队列最多存n−1个。另记count时，不预留空位，长度n最多存n个。队列先入先出。';
    await input('source',source);await input('title','条件与再次作答');await click('learn');await until(`!document.getElementById('workspace').hidden`);
    await click('explain');await input('textExplanation','采用另记count实现，长度8最多放8个。');await click('saveTextExplanation');await until(`!document.getElementById('attemptPanel').hidden`);
    await evaluate(`document.getElementById('studyIssues').open=document.getElementById('issueEditor').open=true;`);
    await input('issueQuestion','本次按哪种实现核对容量？');await input('issueStatus','condition');await input('issueCondition','本次采用另记count，不预留空位。');
    await evaluate(`{const e=document.querySelector('#issueEvidence textarea');e.value=${JSON.stringify(source)};e.dispatchEvent(new Event('input'));}`);await click('saveStudyIssue');await until(`document.querySelector('#judgementChoices input')&&!document.querySelector('#judgementChoices input').disabled`);
    await evaluate(`document.getElementById('judgementChoices').open=true;document.querySelector('#judgementChoices input').click()`);await until(`document.querySelector('#judgementChoices input').checked&&!document.querySelector('#judgementChoices input').disabled`);
    setAIConfigured(true);await click('refreshCapabilities');await until(`!document.getElementById('confirm').disabled`);await click('confirm');await until(`document.querySelector('[data-condition-practice]')&&!document.querySelector('[data-condition-practice]').disabled`);
    await evaluate(`document.getElementById('sourceDetails').open=false;document.querySelector('[data-condition-practice]').click()`);await until(`!document.getElementById('practicePanel').hidden&&!document.getElementById('practiceDraft').disabled`);
    assert.match(await evaluate(`document.getElementById('practiceConditionsText').textContent`),/另记count/);
    await evaluate(`document.getElementById('practiceConditionEvidence').open=true`);await until(`document.getElementById('answerEvidenceStatus').textContent.includes('本次参考入口：材料原文')`);
    await input('answerAssistance','none');await input('practiceDraft','可以存10个。');await click('practiceSubmit');await until(`document.querySelectorAll('#practiceAnswers article').length===1&&!document.getElementById('practiceAgain').hidden`);
    await evaluate(`document.querySelector('#practiceAnswers details').open=true`);
    await click('practiceAgain');await until(`!document.getElementById('practiceDraft').disabled`);assert.match(await evaluate(`document.getElementById('answerEvidenceStatus').textContent`),/同题再次作答/);
    await input('practiceDraft','可以存10个。');await click('practiceSubmit');await until(`document.querySelectorAll('#practiceAnswers article').length===2&&!document.getElementById('practiceAgain').hidden`);
    assert.equal(calls.length,before+4);assert(requests.filter(r=>r.practiceConditions&&r.mode==='apply_answer').every(r=>!r.history));
    const read=`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];db.close();return t;})()`;
    const saved=await evaluate(read),answers=saved.practiceRounds[0].answers;
    assert.equal(answers[0].evidence.selfReport,'none');assert.equal(answers[0].evidence.references[0].kind,'material');assert.equal(answers[1].evidence.priorReferences.at(-1).kind,'history');
    await reloadPage();assert.equal(await evaluate(`document.querySelectorAll('#practiceAnswers article').length`),2);
    await click('practiceReturn');await until(`!document.getElementById('searchExcerpt').hidden`);assert.match(await evaluate(`document.getElementById('searchExcerptText').textContent`),/当时采用的条件/);
    await click('returnToPractice');await until(`document.getElementById('practicePanel').dataset.active==='true'`);
    await click('practiceFlag');await until(`!document.getElementById('questionReview').hidden&&!document.getElementById('reviewNote').disabled`);await input('reviewNote','把新题长度明确改为12，继续采用计数实现。');await input('reviewBasis',source);await input('reviewQuestion','采用另记count、不预留空位，长度12的循环队列最多放几个？');await click('reviewRevise');await until(`document.getElementById('reviewConfirmDialog').open`);
    assert.match(await evaluate(`document.getElementById('reviewPreviewQuestion').textContent`),/沿用本题固定条件/);await click('reviewConfirm');await until(`document.getElementById('practiceHeading').textContent==='修订题'&&!document.getElementById('practiceDraft').disabled`);
    await input('practiceDraft','可以存12个。');await click('practiceSubmit');await until(`document.querySelectorAll('#practiceAnswers article').length===1&&!document.getElementById('practiceAgain').hidden`);
    const revised=await evaluate(read);assert.deepEqual(revised.practiceRounds[0].answers,answers);assert.equal(revised.practiceRounds[0].review.status,'replaced');assert.deepEqual(revised.practiceRounds[1].conditionContext,revised.practiceRounds[0].conditionContext);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0],b=await import('/backup.mjs'),copy=b.restoredCopy(b.decodeBackup(await b.encodeBackup(t)));await db.put(copy);await db.delete(t.id);db.close();})()`);await reloadPage();
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await shot('conditional-practice-evidence','practiceBody');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    await evaluate(`document.querySelector('#practiceAnswers details').open=true`);assert.match(await evaluate(`document.getElementById('practiceAnswers').textContent`),/修订题首次作答/);
    await evaluate(`document.getElementById('practiceQuestionSelect').value=${JSON.stringify(revised.practiceRounds[0].id)};document.getElementById('practiceQuestionSelect').dispatchEvent(new Event('change'))`);await until(`document.getElementById('practiceDraft').disabled&&document.querySelectorAll('#practiceAnswers article').length===2`);assert.match(await evaluate(`document.getElementById('practiceAnswers').textContent`),/已排除为答错依据/);
    await click('historyButton');await click('deleteAll');await reloadPage();await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
}
