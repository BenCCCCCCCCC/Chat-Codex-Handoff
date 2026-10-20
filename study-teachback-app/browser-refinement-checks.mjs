import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

export async function refinementChecks({check,evaluate,until,reloadPage,shot,cdp,all,calls}){
  await check('original words replay exact or labelled context ranges; corrected draft and supported report survive reload',async()=>{
    const raw=JSON.parse(readFileSync(new URL('../docs/research/voice-quality-live.json',import.meta.url))).asr.result;
    const bytes=[...readFileSync(new URL('./fixtures/synthetic-mandarin-v2.wav',import.meta.url))];
    const before=calls.length;
    await evaluate(`(async()=>{
      const db=await(await import('/storage.mjs')).openStore();await db.clear();
      const source={id:'refinement-source',title:'浇水的条件',text:'只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。'};
      const raw=${JSON.stringify(raw)};
      const a={id:'refinement-attempt',createdAt:Date.now(),source,kind:'full',focus:null,assistance:'unknown',duration:7.31,
        audio:new Blob([new Uint8Array(${JSON.stringify(bytes)})],{type:'audio/wav'}),raw:{...raw,id:'refinement-raw'},corrections:[],reports:[],status:'REVIEW_REQUIRED'};
      const version=(await import('/core.mjs')).revisedTranscript(a,a.raw.spans.map(s=>({text:s.text})));a.corrections.push(version);
      a.reports.push({channel:'content',createdAt:Date.now(),sourceId:source.id,attemptId:a.id,transcriptVersion:version.id,
        findings:[
          {status:'supported',message:'已表达浇水必须满足的条件。',sourceQuote:source.text,spanId:'s0',quote:raw.words.slice(1,5).map(w=>w.text).join(''),eventId:null,repair:null},
          {status:'supported',message:'已表达湿润时不要浇水。',sourceQuote:source.text,spanId:'s0',quote:'土壤濕潤時不要澆水',eventId:null,repair:null}
        ]});
      await db.put({id:'refinement-topic',createdAt:Date.now(),source,goals:[],messages:[],attempts:[a],mode:'learn',resume:{view:'attempt',attemptId:a.id}});db.close();
    })()`);
    await reloadPage();await until(`document.querySelector('#rawText .word-link')`);
    await evaluate(`document.getElementById('rawTranscriptDetails').open=true`);
    assert.equal(await evaluate(`document.getElementById('rawText').textContent`),raw.text);
    assert.equal(await evaluate(`document.querySelectorAll('#feedback .diagnosticTarget').length`),0);
    assert.equal(await evaluate(`document.querySelector('#feedback .finding').dataset.status`),'supported');
    assert.equal(await evaluate(`document.querySelector('#feedback .supported-findings').open`),false);
    await evaluate(`document.querySelector('#feedback .supported-findings').open=true`);
    await cdp('Page.bringToFront');
    await evaluate(`{const b=document.querySelector('#feedback [data-replay="quote"]');b.closest('details').open=true;b.scrollIntoView({block:'center'});b.focus();}`);
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
    await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    const quoteStart=Math.max(raw.spans[0].start,raw.words[1].start-.3),quoteEnd=Math.min(raw.spans[0].end,raw.words[4].end+.3);
    await until(`window.replayInternal.some(x=>x.start===${quoteStart}&&x.end===${quoteEnd}&&x.completionReason==='genuine-coverage')`);
    // The second quote includes w14's zero duration; its nearby valid words still
    // provide a bounded, explicitly approximate replay range.
    await evaluate(`{const b=document.querySelector('#feedback [data-replay="quote-context"]');b.closest('details').open=true;b.scrollIntoView({block:'center'});b.focus();}`);
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
    await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    const contextEnd=Math.min(raw.spans[0].end,raw.words.at(-1).end+.3);
    await until(`window.replayInternal.some(x=>x.start===${Math.max(raw.spans[0].start,raw.words[13].start-.3)}&&x.end===${contextEnd}&&x.completionReason==='genuine-coverage')`);
    for(const id of ['w0','w14']){
      await evaluate(`{const b=document.querySelector('#rawText [data-word-id="${id}"]');b.scrollIntoView({block:'center'});b.focus();}`);
      assert.equal(await evaluate(`document.activeElement.dataset.wordId`),id);
      await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
      await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
      const start=id==='w0'?raw.words[0].start:raw.words[13].start,end=id==='w0'?raw.words[0].end:raw.words[15].end;
      await until(`window.replayInternal.some(x=>x.start===${start}&&x.end===${end}&&x.completionReason==='genuine-coverage')`);
    }
    assert(await evaluate(`document.getElementById('rawPlaybackStatus').textContent.includes('邻近范围，非独立词时间')`));
    await shot('transcript-refinement','voiceHeading');
    await evaluate(`{const e=document.querySelector('#transcript textarea');e.value='我校对后的文字';e.dispatchEvent(new Event('input'));}`);
    await until(`document.getElementById('voiceDraftStatus').textContent.includes('已保存')`);
    await reloadPage();await until(`document.querySelector('#transcript textarea')?.value==='我校对后的文字'`);
    assert.equal(await evaluate(`document.getElementById('rawText').textContent`),raw.text);
    assert.equal((await evaluate(all))[0].attempts[0].reports[0].findings[0].repair,null);
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:false});
    await evaluate(`document.getElementById('rawTranscriptDetails').open=true`);
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));
    await shot('transcript-refinement-mobile','rawTranscriptDetails');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
    assert.equal(calls.length,before);
    // Reuse this saved attempt to exercise the new route; this synthetic finding
    // tests state and billing behaviour, not model judgement.
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0],a=t.attempts[0];
      delete a.transcriptDraft;
      a.reports[0].findings.push({status:'missing',message:'检验干燥这一条件的含义。',sourceQuote:t.source.text,spanId:null,quote:null,eventId:null,repair:'假设土壤仍湿润，现在能浇水吗？'});
      await db.put(t);db.close();})()`);
    await reloadPage();await until(`document.querySelector('[data-answer-target]')`);
    assert.equal(await evaluate(`document.querySelector('.feedback-alternatives').open`),false);
    await shot('feedback-probe','contentHeading');
    await evaluate(`{const b=document.querySelector('[data-answer-target]');b.scrollIntoView({block:'center'});b.focus();}`);
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
    await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await until(`document.activeElement.id==='practiceDraft'`);
    assert.equal(calls.length,before,'opening an existing task makes no provider call');
    assert.equal(await evaluate(`document.getElementById('practiceQuestion').textContent`),'假设土壤仍湿润，现在能浇水吗？');
    await evaluate(`{const e=document.getElementById('practiceDraft');e.value='现在不能浇水。';e.dispatchEvent(new Event('input'));e.dispatchEvent(new Event('blur'));}`);
    await until(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];db.close();return t.practiceRounds?.[0].draft==='现在不能浇水。';})()`);
    await reloadPage();await until(`document.getElementById('practiceDraft').value==='现在不能浇水。'`);
    const round=(await evaluate(all))[0].practiceRounds[0];
    assert.equal(round.origin.attemptId,'refinement-attempt');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:false});
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));await shot('feedback-probe-mobile','practicePanel');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
    await evaluate(`document.getElementById('practiceForm').requestSubmit()`);
    await until(`document.querySelector('#practiceAnswers strong') && !document.getElementById('practiceSubmit').disabled`);
    assert.equal(calls.length,before+1,'only submitting the answer calls the provider');
    assert.equal((await evaluate(all))[0].practiceRounds[0].answers.length,1);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
}
