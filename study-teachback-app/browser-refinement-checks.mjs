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
        findings:[{status:'supported',message:'已表达浇水必须满足的条件。',sourceQuote:source.text,spanId:'s0',quote:a.raw.spans[0].text,eventId:null,repair:null}]});
      await db.put({id:'refinement-topic',createdAt:Date.now(),source,goals:[],messages:[],attempts:[a],mode:'learn',resume:{view:'attempt',attemptId:a.id}});db.close();
    })()`);
    await reloadPage();await until(`document.querySelector('#rawText .word-link')`);
    await evaluate(`document.getElementById('rawTranscriptDetails').open=true`);
    assert.equal(await evaluate(`document.getElementById('rawText').textContent`),raw.text);
    assert.equal(await evaluate(`document.querySelectorAll('#feedback .diagnosticTarget').length`),0);
    assert.equal(await evaluate(`document.querySelector('#feedback .finding').dataset.status`),'supported');
    await cdp('Page.bringToFront');
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
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
}
