import assert from 'node:assert/strict';
import {taskSplitCases} from './task-split-fixtures.mjs';
export async function feedbackReturnChecks({check,evaluate,until,reloadPage,click,calls,shot}){
  await check('practice returns to the original report after newer feedback, reload and backup without replacing the current draft',async()=>{
    const c=structuredClone(taskSplitCases[0]),before=calls.length;
    const report={...c.report,id:'original-report',channel:'content',createdAt:Date.now()};
    const a={...c.attempt,source:c.source,createdAt:Date.now(),raw:{id:c.attempt.transcriptVersion,spans:c.attempt.spans,reviewed:true},corrections:[],reports:[report]};
    const t={id:'return-topic',createdAt:Date.now(),source:c.source,goals:[],messages:[],attempts:[a],resume:{view:'attempt',attemptId:a.id}};
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob(['synthetic audio']);await db.put(t);db.close();})()`);
    await reloadPage();await until(`document.querySelector('#feedback .diagnosticTarget')`);
    await evaluate(`document.querySelector('#feedback .diagnosticTarget').click()`);await until(`!document.getElementById('practiceReturn').hidden`);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=await db.get('return-topic'),a=t.attempts[0];const newer=structuredClone(a.reports[0]);newer.id='later-report';newer.findings[0].message='Later feedback';a.reports.push(newer);a.transcriptDraft={baseVersionId:a.raw.id,updatedAt:Date.now(),edits:a.raw.spans.map(s=>({id:s.id,text:'Unsaved confirmation draft'}))};const b=await import('/backup.mjs');await db.put(b.restoredCopy(b.decodeBackup(await b.encodeBackup(t)),{id:'copy-return'}));await db.delete(t.id);db.close();})()`);
    await reloadPage();await click('practiceReturn');await until(`!document.getElementById('searchExcerpt').hidden`);
    const text=await evaluate(`document.getElementById('searchExcerptText').textContent`);
    assert(text.includes(c.report.findings[0].message));assert(!text.includes('Later feedback'));
    assert.equal(await evaluate(`document.querySelector('#transcript textarea').value`),'Unsaved confirmation draft');
    await reloadPage();assert(await evaluate(`!document.getElementById('searchExcerpt').hidden`));await shot('practice-original-feedback','searchExcerpt');
    await click('returnToPractice');await until(`document.getElementById('workspace').dataset.view==='practice'`);
    assert.equal(calls.length,before);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=await db.get('copy-return');t.attempts=[];await db.put(t);db.close();})()`);
    await reloadPage();assert(await evaluate(`document.getElementById('practiceReturn').disabled`));assert.match(await evaluate(`document.getElementById('practiceOriginStatus').textContent`),/删除/);
    await click('historyButton');await click('deleteAll');await reloadPage();
  });
}
