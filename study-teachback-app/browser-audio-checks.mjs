import assert from 'node:assert/strict';

export async function audioChecks({check,evaluate,until,click,reloadPage,shot,cdp,all,calls,setFailASR}){
  const select=async(expression,name='已有讲解.wav')=>{
    await evaluate(`(async()=>{const files=new DataTransfer();files.items.add(new File([${expression}],${JSON.stringify(name)},{type:'audio/wav'}));const input=document.getElementById('audioFile');input.files=files.files;input.dispatchEvent(new Event('change'));})()`);
    await until(`!document.getElementById('uploadAudio').disabled`);
  };
  await check('uploaded stereo audio is preserved without API, survives reload and transcribes only on explicit action',async()=>{
    await evaluate(`(async()=>{
      const db=await(await import('/storage.mjs')).openStore();await db.clear();
      await db.put({id:'audio-topic',createdAt:Date.now(),source:{id:'audio-source',title:'浇水的条件',text:'只有土壤干燥时才浇水，湿润时不要浇水。'},goals:[],messages:[],attempts:[],mode:'learn',resume:{view:'learn'}});db.close();
    })()`);await reloadPage();const before=calls.length;
    await click('explain');await shot('audio-entry');
    await evaluate(`{
      const rate=16000,n=rate*2,buffer=new ArrayBuffer(44+n*4),v=new DataView(buffer);
      const str=(o,s)=>Array.from(s).forEach((c,i)=>v.setUint8(o+i,c.charCodeAt(0)));
      str(0,'RIFF');v.setUint32(4,36+n*4,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,2,true);v.setUint32(24,rate,true);v.setUint32(28,rate*4,true);v.setUint16(32,4,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,n*4,true);
      for(let i=0;i<n;i++)v.setInt16(46+i*4,Math.sin(i*2*Math.PI*220/rate)*12000,true);
      window.uploadBytes=buffer;
    }`);
    await select('window.uploadBytes');await until(`!document.getElementById('attemptPanel').hidden`);
    const stored=(await evaluate(all))[0].attempts[0];
    assert.equal(stored.assistance,'unknown');assert.equal(stored.captureOrigin,'upload');
    assert.equal(stored.status,'SAVED');assert.notEqual(stored.observation.reason,'NEAR_SILENT');
    assert.equal(calls.length,before);assert.equal(await evaluate(`document.getElementById('retryAsr').textContent`),'开始转写');
    assert.equal(await evaluate(`document.getElementById('contentPane').hidden`),true);
    assert(await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore(),t=(await db.all())[0];db.close();const a=new Uint8Array(await t.attempts[0].audio.arrayBuffer()),b=new Uint8Array(window.uploadBytes);return a.length===b.length&&a.every((x,i)=>x===b[i]);})()`));
    await shot('audio-saved');
    await reloadPage();assert.equal(calls.length,before);
    setFailASR('ASR_RESULT_UNAVAILABLE');await click('retryAsr');
    await until(`document.getElementById('notice').textContent.includes('ASR_RESULT_UNAVAILABLE')`);
    assert.equal(calls.length,before+1);setFailASR(null);
    await click('retryAsr');await until(`document.querySelector('#transcript textarea')`);
    assert.equal(calls.length,before+2);assert.equal((await evaluate(all))[0].attempts.length,1);
    await click('confirm');await until(`document.getElementById('confirm').textContent.includes('查看')`);
    assert.equal(calls.length,before+3);
    assert.equal((await evaluate(all))[0].attempts[0].reports[0].analysis.method,'confirmed_transcript');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:1000,deviceScaleFactor:1,mobile:false});
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'));await shot('audio-review-mobile');
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('unreadable and overlong uploads leave existing attempts intact and make no API calls',async()=>{
    const before=calls.length;await click('fullAgain');await select("'not audio'");
    assert(await evaluate(`document.getElementById('notice').textContent.includes('无法读取')`));
    await select(`(await import('/core.mjs')).waveBytes(new Float32Array(181*16000))`);
    assert(await evaluate(`document.getElementById('notice').textContent.includes('最长 3 分钟')`));
    assert.equal((await evaluate(all))[0].attempts.length,1);assert.equal(calls.length,before);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
}
