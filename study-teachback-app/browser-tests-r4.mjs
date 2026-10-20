import { spawn } from 'node:child_process';
import { mkdirSync,writeFileSync,mkdtempSync,readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';
import { Ledger } from './ledger.mjs';
import { waveDuration,normalizeASR } from './core.mjs';
import { diagnosticFixtures } from './diagnostic-fixtures.mjs';
if(!process.env.STUDY_TEST_OUTPUT)throw Error('Run through run-offline-tests.mjs browser');
const root=process.env.STUDY_TEST_OUTPUT+'/';mkdirSync(root,{recursive:true});
const environmentProbe=process.argv.includes('--environment-probe'),recoveryOnly=process.argv.includes('--recovery-only');
const probe={mode:environmentProbe?'NON_HEADLESS_TRUSTED_POINTER':'EXISTING_SUITE',lifecycle:[],states:[],trustedInputs:[]};
const run=Date.now(), profile=process.env.STUDY_TEST_PROFILE??mkdtempSync(root+'edge-test-');
const calls=[],cases=[],errors=[],network=[];let failASR=null,delaySemantic=0,rejectStarter=false,failTeach=false,failRegister=false;const provenanceRequests=[];
let diagnosisGate=null;
const savedASR=normalizeASR(JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r2/SYNTHETIC_ASR_FIELDS.json',import.meta.url))),7.31);
const savedWave=[...readFileSync(new URL('./fixtures/synthetic-mandarin-v2.wav',import.meta.url))];
const testBook=new Ledger(root+`browser-test-ledger-${run}.json`),register=testBook.register.bind(testBook);
testBook.register=id=>{if(failRegister)throw Error('LEDGER_LOCKED');return register(id);};
const server=createServer({book:testBook,semanticCall:async(prompt,input)=>{
  calls.push({kind:input.mode??(input.events?'delivery':'content'),sourceId:input.source.id,focus:input.focus??null});if(delaySemantic)await new Promise(r=>setTimeout(r,delaySemantic));
  if(!input.mode&&!input.events&&diagnosisGate)await diagnosisGate;
  if(input.mode)provenanceRequests.push(structuredClone(input));
  if(failTeach){failTeach=false;throw Error('API_RESULT_UNAVAILABLE');}
  if(rejectStarter){rejectStarter=false;return {value:{sourceId:input.source.id,message:'Rejected stub',goals:[{text:'Goal',sourceQuote:'NOT IN SOURCE'}],question:'Question'}};}
  if(input.mode)return {model:'TEST_STUB_NOT_API',value:{sourceId:input.source.id,message:input.mode==='apply'?'新情境：昨天浇过水，今天摸起来还是湿的。':'我们先看条件：干了才浇，湿的时候先不浇。',goals:[{text:'把条件和行动联系起来',sourceQuote:input.source.text}],question:input.mode==='apply'?'现在要浇水吗？为什么？':'你能换句话说说这个条件吗？'}};
  if(input.events)return {model:'TEST_STUB_NOT_API',value:{sourceId:input.source.id,attemptId:input.attempt.id,transcriptVersion:input.attempt.transcriptVersion,findings:[{status:'observation',message:'确认的近静音候选，可尝试在两句之间明确过渡。',sourceQuote:input.source.text,spanId:input.attempt.spans[0].id,quote:input.attempt.spans[0].text,eventId:input.events[0].id,repair:'再讲时试着提示句间关系。'}]}};
  return {model:'TEST_STUB_NOT_API',value:{sourceId:input.source.id,attemptId:input.attempt.id,transcriptVersion:input.attempt.transcriptVersion,findings:[{status:'incorrect',message:'工程补救 fixture：请澄清条件与行动的关系。',sourceQuote:input.source.text,spanId:input.attempt.spans[0].id,quote:input.attempt.spans[0].text,eventId:null,repair:'再用一个不同的情境说明条件。'}]}};
},asrCall:async(bytes,id)=>{calls.push({kind:'asr',attemptId:id});if(failASR)throw new Error(failASR);const duration=waveDuration(bytes);return {model:'TEST_STUB_NOT_API',duration,text:'土壤干了才浇水，湿的先不浇。',spans:[{id:'s0',start:0,end:Math.min(1,duration),text:'土壤干了才浇水，湿的先不浇。'}],words:[],reviewRequired:true,alignment:'SYNTHETIC_TEST'};}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
const edge=spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',[...(environmentProbe?['--window-size=1280,1000']:['--headless=new']),'--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--disable-component-update','--no-proxy-server','--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1','--remote-debugging-address=127.0.0.1','--remote-debugging-port=0',`--user-data-dir=${profile}`,'--autoplay-policy=no-user-gesture-required','about:blank'],{windowsHide:!environmentProbe,stdio:['ignore','ignore','pipe']});
let edgeLog='';edge.stderr.on('data',chunk=>edgeLog+=chunk);edge.on('error',e=>edgeLog+=e.code);
let ws,seq=0;const callbacks=new Map();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function cdp(method,params={}){const id=++seq;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{callbacks.delete(id);reject(new Error('CDP_TIMEOUT '+method));},method==='Page.captureScreenshot'?45000:20000);callbacks.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await cdp('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text+': '+r.exceptionDetails.exception?.description);return r.result?.value;}
async function until(expression){for(let i=0;i<100;i++){try{if(await evaluate(expression))return;}catch(e){if(!e.message.includes("Cannot read properties of null"))throw e;}await pause(100);}throw new Error('WAIT_FAILED '+expression+' NOTICE='+await evaluate("document.getElementById('notice')?.textContent"));}
async function reloadPage(){
  await evaluate(`document.documentElement.dataset.testReload='old'`);await cdp('Page.reload');
  await until(`document.documentElement.dataset.testReload!=='old' && document.getElementById('budget')?.textContent.length>0`);
}
async function openHistoryAttempt(){
  await evaluate(`[...document.querySelectorAll('#historyList button')].find(b=>b.textContent.startsWith('完整')).click()`);
  await until(`document.getElementById('history').hidden && !document.getElementById('workspace').hasAttribute('aria-busy')`);
}
async function trustedPointer(expression,label){
  await cdp('Page.bringToFront');
  await evaluate(`(${expression}).scrollIntoView({behavior:'instant',block:'center'})`);await pause(120);
  const point=await evaluate(`(()=>{const e=(${expression}),r=e.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;return {x,y,hit:e.contains(document.elementFromPoint(x,y)),visibilityState:document.visibilityState,hasFocus:document.hasFocus()};})()`);
  assert(point.hit,`Pointer target obscured: ${label}`);assert.equal(point.visibilityState,'visible');probe.states.push({label,phase:'before-input',...point});
  await cdp('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});
  await cdp('Input.dispatchMouseEvent',{type:'mousePressed',x:point.x,y:point.y,button:'left',clickCount:1});
  await cdp('Input.dispatchMouseEvent',{type:'mouseReleased',x:point.x,y:point.y,button:'left',clickCount:1});
  const input=await evaluate('window.probeInputs.at(-1)');assert(input?.trusted,`Untrusted input: ${label}`);probe.trustedInputs.push({label,...input});
}
async function probeState(label){probe.states.push({label,...await evaluate(`({visibilityState:document.visibilityState,hasFocus:document.hasFocus(),currentTime:document.getElementById('player').currentTime,duration:document.getElementById('player').duration,paused:document.getElementById('player').paused,ended:document.getElementById('player').ended})`)});}
const click=async id=>{await evaluate(`document.getElementById(${JSON.stringify(id)}).click()`);if(['deleteAttempt','deleteAll'].includes(id)){await until(`document.getElementById('deleteDialog').open`);await evaluate(`document.getElementById('deleteConfirm').click()`);}};
const all=`(async()=>{const s=await import('/storage.mjs');const db=await s.openStore();const t=await db.all();db.close();return t.map(t=>({...t,attempts:t.attempts.map(a=>({...a,audio:{size:a.audio.size,type:a.audio.type}}))}));})()`;
const screenshots=[],replaySnapshots=[];
async function shot(name,target){if(target)await evaluate(`document.getElementById(${JSON.stringify(target)}).scrollIntoView({behavior:'instant',block:'start'})`);await pause(120);const r=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});const file=`${run}-${name}.png`;writeFileSync(join(root,file),Buffer.from(r.data,'base64'));screenshots.push({file,state:name,viewport:await evaluate('({width:innerWidth,height:innerHeight})'),scope:'Actual product / synthetic fixtures / stub provider'});}
async function check(name,fn){try{await fn();cases.push({name,status:'PASS'});console.log('PASS '+name);}catch(e){cases.push({name,status:'FAIL',error:e.message});throw e;}finally{try{const events=await evaluate('window.replayTrace');if(events?.length){replaySnapshots.push({name,events,internal:await evaluate('window.replayInternal')});writeFileSync(join(root,'replay-snapshots.json'),JSON.stringify(replaySnapshots,null,2));await evaluate('window.replayTrace=[];window.replayInternal=[]');}}catch{}}}
try{
  let targets;for(let i=0;i<100;i++){try{const port=readFileSync(join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];targets=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();if(targets.length)break;}catch{}await pause(100);}
  assert(targets?.length,'EDGE_CDP_UNAVAILABLE');ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
  ws.onmessage=message=>{const m=JSON.parse(message.data);if(m.id){const cb=callbacks.get(m.id);if(cb){clearTimeout(cb.timer);callbacks.delete(m.id);m.error?cb.reject(new Error(m.error.message)):cb.resolve(m.result);}}else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description??m.params.exceptionDetails.text);else if(m.method==='Network.requestWillBeSent')network.push(m.params.request.url);else if(environmentProbe&&m.method==='Page.lifecycleEvent')probe.lifecycle.push(m.params);};
  await cdp('Runtime.enable');await cdp('Page.enable');if(environmentProbe){probe.version=await cdp('Browser.getVersion');probe.profile=profile;probe.pid=edge.pid;await cdp('Page.setLifecycleEventsEnabled',{enabled:true});await cdp('Page.bringToFront');}await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  if(environmentProbe)await cdp('Page.addScriptToEvaluateOnNewDocument',{source:`window.probeInputs=[];document.addEventListener('click',e=>{window.probeInputs.push({trusted:e.isTrusted,text:e.target.textContent,at:performance.now(),visibilityState:document.visibilityState,hasFocus:document.hasFocus()});},true);`});
  await cdp('Page.addScriptToEvaluateOnNewDocument',{source:`window.replayInternal=[];let replayInvocation=0;window.__studyReplayObserver=value=>{window.replayInternal.push({...value,visibilityState:document.visibilityState,hasFocus:document.hasFocus(),at:performance.now()});if(window.replayInternal.length>300)window.replayInternal.shift();};window.__studyReplayObserver.nextId=()=>++replayInvocation;`});
  await cdp('Page.addScriptToEvaluateOnNewDocument',{source:`window.replayTrace=[];const nativePlay=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(this.id!=='player')return nativePlay.call(this);const p=this;let last=p.currentTime,covered=0;const log=type=>{if(type==='timeupdate'){const delta=p.currentTime-last;if(!p.paused&&delta>=0&&delta<1)covered+=delta;last=p.currentTime;}window.replayTrace.push({type,at:performance.now(),visibilityState:document.visibilityState,hasFocus:document.hasFocus(),time:p.currentTime,duration:p.duration,paused:p.paused,seeking:p.seeking,ended:p.ended,covered,played:Array.from({length:p.played.length},(_,i)=>[p.played.start(i),p.played.end(i)]),complete:document.querySelector('#transcript button')?.textContent});if(window.replayTrace.length>180)window.replayTrace.shift();};for(const type of ['playing','timeupdate','pause','ended','seeking','seeked','error'])p.addEventListener(type,()=>log(type));log('play-request');const result=nativePlay.call(p);result.then(()=>log('play-resolved'),()=>log('play-rejected'));return result;};`});
  await cdp('Page.addScriptToEvaluateOnNewDocument',{source:`window.testMic='tone';window.testTracks=[];Object.defineProperty(navigator.mediaDevices,'getUserMedia',{value:async()=>{if(window.testMic==='deferredDenied')await new Promise((resolve,reject)=>window.rejectPermission=()=>reject(new DOMException('test denied','NotAllowedError')));if(window.testMic==='denied')throw new DOMException('test denied','NotAllowedError');const ctx=new AudioContext();window.testContext=ctx;await ctx.resume();const out=ctx.createMediaStreamDestination(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.frequency.value=220;gain.gain.value=window.testMic==='silent'?0:0.2;osc.connect(gain);gain.connect(out);osc.start();window.testTracks=out.stream.getTracks();return out.stream;}});`});
  await cdp('Network.enable');await cdp('Network.setBlockedURLs',{urls:['https://*','http://api.*']});
  await cdp('Page.navigate',{url:origin+'/'});await until(`document.getElementById('learn') && document.getElementById('budget').textContent.length>0`);
  if(!environmentProbe&&!process.argv.includes('--replay-only')){
    await check('chat failure reload and explicit retry preserve original input/context with one dispatch',async()=>{
      failTeach=true;
      await evaluate(`document.getElementById('source').value='只有土壤干燥时才浇水，湿润时不要浇水。';`);
      await click('learn');await until(`!document.getElementById('chatRetry').disabled && document.getElementById('notice').textContent.includes('API_RESULT_UNAVAILABLE')`);
      assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),0);
      await reloadPage();const before=calls.length;await click('chatRetry');
      await until(`document.getElementById('chatRecovery').hidden`);
      assert.equal(calls.length,before+1);
      failTeach=true;
      await evaluate(`document.getElementById('chat').value='昨天浇过水，今天还湿，要浇吗？';document.getElementById('chatForm').requestSubmit()`);
      await until(`!document.getElementById('chatRetry').disabled && document.getElementById('notice').textContent.includes('API_RESULT_UNAVAILABLE')`);
      const request=structuredClone(provenanceRequests.at(-1)),count=calls.length;
      await reloadPage();assert.equal(calls.length,count);
      for(const width of [1440,390]){
        await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
        assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
        await shot(`chat-recovery-${width}`);
      }
      delaySemantic=200;
      await evaluate(`document.getElementById('chatRetry').click();document.getElementById('chatRetry').click();`);
      await until(`document.getElementById('chatRecovery').hidden`);delaySemantic=0;
      assert.equal(calls.length,count+1);assert.deepEqual(provenanceRequests.at(-1),request);
      assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),1);
      await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
      await click('startPractice');await until(`document.getElementById('practiceQuestion').textContent && !document.getElementById('practiceSubmit').disabled`);
      await shot('focused-practice');
      await click('backToChat');await until(`document.getElementById('workspace').dataset.view==='learn'`);
      const noNew=calls.length;await click('startPractice');await until(`document.getElementById('workspace').dataset.view==='practice'`);
      assert.equal(calls.length,noNew);
    });
    await check('export preview, cancel, invalid input and atomic restore preserve originals and seven-day copy retention',async()=>{
      const before=calls.length;
      await evaluate(`window.exportBlobs=new Map();const create=URL.createObjectURL;URL.createObjectURL=b=>{const u=create(b);window.exportBlobs.set(u,b);return u;};const click=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){if(this.download)window.exportBlob=window.exportBlobs.get(this.href);else click.call(this);};`);
      await click('topicExport');await until('!!window.exportBlob');
      await evaluate(`(async()=>{window.backupText=await window.exportBlob.text();})()`);
      const original=JSON.stringify(await evaluate(all));
      async function selectBackup(valid=true){
        await evaluate(`{const files=new DataTransfer();files.items.add(new File([${valid?'window.backupText':"'{}'"}],'study.json',{type:'application/json'}));document.getElementById('backupFile').files=files.files;document.getElementById('backupFile').dispatchEvent(new Event('change'));}`);
        await until(valid?`!document.getElementById('backupConfirm').disabled`:`document.getElementById('backupStatus').textContent.length>0`);
      }
      await click('historyButton');await click('backupOpen');await selectBackup(false);
      assert.equal(JSON.stringify(await evaluate(all)),original);
      await selectBackup();await shot('backup-preview');await click('backupCancel');
      assert.equal(JSON.stringify(await evaluate(all)),original);
      await click('backupOpen');await selectBackup();await click('backupConfirm');
      await until(`!document.getElementById('backupDialog').open && document.getElementById('notice').textContent.includes('已恢复')`);
      const records=await evaluate(all),copy=records.find(t=>t.restoredAt),source=records.find(t=>!t.restoredAt);
      assert.equal(records.length,2);assert.notEqual(copy.id,source.id);
      assert.deepEqual(source,JSON.parse(original)[0]);
      assert.deepEqual(copy.practiceRounds,source.practiceRounds);
      assert.deepEqual(copy.messages,source.messages);
      assert.equal(calls.length,before);
      await reloadPage();assert.equal(calls.length,before);
      assert.equal(await evaluate(`document.getElementById('workspace').dataset.view`),'practice');
      assert(await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all()).find(t=>t.restoredAt);t.createdAt=Date.now()-8*86400000;await db.put(t);await db.expire(t.restoredAt+7*86400000-1);const kept=!!await db.get(t.id);await db.expire(t.restoredAt+7*86400000);const expired=!await db.get(t.id);await db.clear();db.close();return kept&&expired;})()`));
      await reloadPage();await shot('quiet-home');
    });
  }
  if(environmentProbe){
    const select=id=>`document.getElementById('${id}')`,historyAttempt=`[...document.querySelectorAll('#historyList button')].find(b=>b.textContent.startsWith('完整'))`;
    await evaluate(`document.querySelector('.process-details').open=true`);
    const confirmProcess=`[...document.querySelectorAll('#observations button')].find(b=>b.textContent==='确认并保存过程证据')`;
    await check('E0 archived synthetic ASR offers optional replay before explicit confirmation',async()=>{
      const source={id:'probe-source',title:'隔离 synthetic ASR 环境探针',text:savedASR.text};
      const t={id:'probe-topic',createdAt:Date.now(),source,goals:[],messages:[],attempts:[{id:'probe-attempt',createdAt:Date.now(),source,kind:'full',focus:null,assistance:'none',duration:7.31,observation:JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r3/DELIVERY_ENGINEERING.json',import.meta.url))).acoustic,raw:{...savedASR,id:'probe-raw',origin:'ARCHIVED_SYNTHETIC_ASR'},corrections:[],reports:[],status:'REVIEW_REQUIRED'}]};
      await evaluate(`(async()=>{const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob([new Uint8Array(${JSON.stringify(savedWave)})],{type:'audio/wav'});const db=await(await import('/storage.mjs')).openStore();await db.put(t);db.close();})()`);
      await reloadPage();await until(`!document.getElementById('workspace').hidden`);await trustedPointer(select('historyButton'),'open history');await until(`document.querySelectorAll('#historyList button').length>=3`);await trustedPointer(historyAttempt,'open saved attempt');
      assert.equal(calls.length,0);assert(await evaluate(`!document.getElementById('confirm').disabled && document.getElementById('reviewHint').textContent.includes('逐段回听不是必需步骤')`));
    });
    await check('E0 trusted saved-ASR 0–6.46 replay has genuine native coverage then fake content confirmation',async()=>{
      await trustedPointer(`document.querySelector('#transcript button')`,'critical transcript replay');await until(`document.querySelector('#transcript button').textContent.includes('✓')`);await probeState('transcript replay complete');
      const trace=await evaluate('window.replayInternal'),done=trace.find(x=>x.completionReason==='genuine-coverage');assert(done);assert.equal(done.start,0);assert.equal(done.end,savedASR.spans[0].end);assert(done.covered>=done.end-.3);assert(done.genuine&&done.active);assert(trace.every(x=>x.visibilityState==='visible'));
      probe.transcriptCompletion=done;await trustedPointer(select('confirm'),'confirm reviewed content');await until(`document.querySelectorAll('#feedback .finding').length===1`);assert.equal(calls.length,1);assert.equal(calls[0].kind,'content');
    });
    await check('E0 B3 trusted candidate replay persists one process report with zero semantic dispatch',async()=>{
      const before=calls.length,ledgerBefore=JSON.stringify(testBook.read());probe.processBefore={calls:before,ledger:JSON.parse(ledgerBefore)};
      await trustedPointer(confirmProcess,'process before replay');await until(`document.getElementById('notice').textContent.includes('完整回听这个过程候选')`);
      await trustedPointer(`document.querySelector('#observations button')`,'critical candidate replay');await until(`document.querySelector('#observations button').textContent.includes('✓')`);await probeState('candidate replay complete');
      const trace=await evaluate('window.replayInternal'),done=trace.filter(x=>x.completionReason==='genuine-coverage').at(-1);assert(done?.genuine);assert(done.covered>=done.end-done.start-.3);assert(trace.every(x=>x.visibilityState==='visible'));probe.candidateCompletion=done;
      await trustedPointer(confirmProcess,'save local process');await until(`document.querySelectorAll('.processObservation').length===1`);
      let reports=(await evaluate(all))[0].attempts[0].reports;assert.deepEqual(reports.map(r=>r.channel),['content','process']);assert.equal(reports[1].processEvidence.length,1);assert.equal(reports[1].processEvidence[0].confirmation,'human_confirmed');assert(!('sourceQuote' in reports[1].processEvidence[0]));assert(!('status' in reports[1].processEvidence[0]));
      await trustedPointer(confirmProcess,'duplicate local process confirmation');await until(`document.getElementById('notice').textContent.includes('本机保存')`);assert.equal((await evaluate(all))[0].attempts[0].reports.length,2);assert.equal(calls.length,before);assert.equal(JSON.stringify(testBook.read()),ledgerBefore);
      assert.equal(await evaluate(`document.querySelectorAll('#feedback .finding').length`),1);assert.equal(await evaluate(`document.querySelectorAll('#processFeedback .finding,#processFeedback .diagnosticTarget').length`),0);assert.equal(await evaluate(`document.getElementById('contentHeading').textContent`),'内容理解');assert.equal(await evaluate(`document.getElementById('processHeading').textContent`),'讲解过程');
      // Persist critical traces before the deliberate reload resets the document observer.
      writeFileSync(join(root,'probe-candidate-trace.json'),JSON.stringify({internal:trace,native:await evaluate('window.replayTrace')},null,2));
      await reloadPage();await until(`!document.getElementById('workspace').hidden`);await trustedPointer(select('historyButton'),'history after reload');await until(`document.querySelectorAll('#historyList button').length>=3`);await trustedPointer(historyAttempt,'saved attempt after reload');assert.equal(await evaluate(`document.querySelectorAll('.processObservation').length`),1);
      reports=(await evaluate(all))[0].attempts[0].reports;assert.equal(reports.filter(r=>r.channel==='process').length,1);assert.equal(calls.length,before);assert.equal(JSON.stringify(testBook.read()),ledgerBefore);probe.processAfter={calls:calls.length,ledger:testBook.read(),processReports:reports.filter(r=>r.channel==='process'),persisted:true};await probeState('after reload');await shot('representative-probe','attemptPanel');
    });
  }else if(process.argv.includes('--replay-only')){
    await check('C0 saved synthetic audio genuinely replays requested first second',async()=>{
      const f=diagnosticFixtures[0],t={id:'replay-probe',createdAt:Date.now(),source:f.source,messages:[],goals:[],attempts:[{...f.attempt,source:f.source,duration:7.31,createdAt:Date.now(),raw:{id:'probe-raw',reviewed:false,text:'synthetic',spans:[{id:'s0',start:0,end:1,text:'synthetic'}]},corrections:[],reports:[]}]};
      await evaluate(`(async()=>{const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob([new Uint8Array(${JSON.stringify(savedWave)})],{type:'audio/wav'});const db=await(await import('/storage.mjs')).openStore();await db.put(t);db.close();})()`);
      await reloadPage();await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();
      await evaluate(`document.querySelector('#transcript button').click()`);
      await until(`!document.getElementById('player').paused && document.getElementById('player').currentTime>0`);
      // Deterministic legitimate event-cadence stress: media continues on its own thread.
      // No seeking, currentTime assignment or heard-state manipulation.
      await evaluate(`(()=>{const until=performance.now()+2500;while(performance.now()<until){}return true;})()`);
      await until(`document.querySelector('#transcript button').textContent.includes('✓')`);
    });
    await check('C0 native synthetic recording replays requested first second',async()=>{
      await click('fullAgain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(1400);await click('finish');await until(`document.querySelectorAll('#transcript textarea').length===1 && document.getElementById('notice').textContent.includes('转写完成')`);
      await evaluate(`document.querySelector('#transcript button').click()`);await until(`document.querySelector('#transcript button').textContent.includes('✓')`);
    });
    await check('D0 residual short native recording plays through its requested endpoint',async()=>{
      await click('fullAgain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(800);await click('finish');await until(`document.querySelectorAll('#transcript textarea').length===1 && document.getElementById('notice').textContent.includes('转写完成')`);
      await evaluate(`document.querySelector('#transcript button').click()`);await until(`document.querySelector('#transcript button').textContent.includes('✓')`);
    });
  }else if(!recoveryOnly){
  for(const setupContext of [{focus:'',known:''},{focus:'条件',known:''},{focus:'',known:'了解定义'},{focus:'条件',known:'了解定义'}])await check(`setup source-only title and persisted metadata ${JSON.stringify(setupContext)}`,async()=>{
    const before=provenanceRequests.length;
    await evaluate(`document.getElementById('title').value='';document.getElementById('source').value='只有土壤干燥才浇水。';document.getElementById('setupFocus').value=${JSON.stringify(setupContext.focus)};document.getElementById('setupKnown').value=${JSON.stringify(setupContext.known)};`);
    await click('learn');await until(`document.querySelectorAll('.message.assistant').length===1`);
    assert.equal(provenanceRequests.length,before+1);assert.deepEqual(provenanceRequests.at(-1).setupContext,setupContext);assert.deepEqual(provenanceRequests.at(-1).history,[]);
    await reloadPage();await until(`!document.getElementById('workspace').hidden`);
    const t=(await evaluate(all))[0];assert.equal(t.source.title,'只有土壤干燥才浇水。');assert.deepEqual(t.setupContext,setupContext);assert.equal(t.messages.filter(m=>m.role==='user').length,0);assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),0);
    await click('newTopic');assert.equal(await evaluate(`document.getElementById('setupFocus').value+document.getElementById('setupKnown').value`),'');
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
  for(const outcome of ['quote'])await check(`provenance initial ${outcome} and first/subsequent real owner input`,async()=>{
    const rejected=outcome!=='success';rejectStarter=outcome==='quote';failTeach=outcome==='request';const start=provenanceRequests.length;
    await evaluate(`document.getElementById('title').value='Synthetic provenance';document.getElementById('source').value='只有土壤干燥时才浇水，湿润时不要浇水。';`);await click('learn');
    await until(rejected?`document.getElementById('notice').textContent.includes('${outcome==='quote'?'INVALID_SOURCE_QUOTE':'API_RESULT_UNAVAILABLE'}')`:`document.querySelectorAll('.message.assistant').length===1`);
    assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),0);
    let t=(await evaluate(all))[0];assert.equal(t.messages.filter(m=>m.role==='user').length,0);assert.equal(t.messages.length,rejected?0:1);
    assert.equal(provenanceRequests.length,start+1);
    await evaluate(`document.getElementById('chat').value='Synthetic owner question';document.getElementById('chatForm').requestSubmit()`);
    await until(`document.querySelectorAll('.message.assistant').length===${rejected?1:2}`);
    t=(await evaluate(all))[0];assert.deepEqual(t.messages.filter(m=>m.role==='user').map(m=>m.text),['Synthetic owner question']);
    assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),1);assert.equal(provenanceRequests.length,start+2);
    assert(provenanceRequests.slice(start).every(r=>r.history.every(m=>!m.text.includes('请先帮我理解这段材料'))));
    await evaluate(`document.getElementById('chat').value='Second synthetic owner input';document.getElementById('chatForm').requestSubmit()`);
    await until(`document.querySelectorAll('.message.assistant').length===${rejected?2:3}`);
    assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),2);
    assert(provenanceRequests.at(-1).history.some(m=>m.text==='Synthetic owner question'));
    await evaluate(`(async()=>{const {openStore}=await import('/storage.mjs');const s=await openStore();await s.clear();s.close();})()`);
    await reloadPage();await until(`document.getElementById('learn') && document.getElementById('budget').textContent.length>0`);
  });
  for(const mode of ['repair'])for(const outcome of ['success','quote','request'])await check(`A1 browser ${mode}/${outcome} provenance, persistence and later real input`,async()=>{
    const t={id:'action-provenance',createdAt:Date.now(),source:{id:'source',title:'Synthetic actions',text:'只有土壤干燥才浇水。'},goals:[],messages:[{role:'user',text:'Earlier actual question'}],attempts:[],mode:'learn'};
    t.attempts=[{id:'synthetic-attempt',createdAt:Date.now(),source:t.source,kind:'full',assistance:'none',duration:1,raw:{id:'raw',text:'test',spans:[{id:'s0',start:0,end:1,text:'test'}],reviewed:true},corrections:[],reports:[{channel:'content',sourceId:t.source.id,attemptId:'synthetic-attempt',transcriptVersion:'raw',findings:[{status:'missing',message:'Synthetic gap',sourceQuote:t.source.text,spanId:null,quote:null,eventId:null,repair:'请说明条件。'}]}]}];
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob(['synthetic placeholder']);await db.put(t);db.close();})()`);
    await reloadPage();await until(`!document.getElementById('workspace').hidden`);
    await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();
    const start=provenanceRequests.length;rejectStarter=outcome==='quote';failTeach=outcome==='request';
    await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再学这一点').click()`);
    await until(`!document.getElementById('workspace').hasAttribute('aria-busy') && ${outcome==='success'?"document.getElementById('chatRecovery').hidden":"document.getElementById('notice').textContent.includes('"+(outcome==='quote'?'INVALID_SOURCE_QUOTE':'API_RESULT_UNAVAILABLE')+"')"}`);
    assert.equal(provenanceRequests.length,start+1);assert.equal(provenanceRequests.at(-1).mode,mode);
    const internal=provenanceRequests.at(-1).message;
    assert.deepEqual((await evaluate(all))[0].messages.filter(m=>m.role==='user').map(m=>m.text),['Earlier actual question']);assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),1);
    for(const text of ['First real answer','Next real question']){await evaluate(`document.getElementById('chat').value=${JSON.stringify(text)};document.getElementById('chatForm').requestSubmit()`);await until(`!document.getElementById('workspace').hasAttribute('aria-busy') && document.getElementById('chatRecovery').hidden`);}
    const saved=(await evaluate(all))[0];assert.deepEqual(saved.messages.filter(m=>m.role==='user').map(m=>m.text),['Earlier actual question','First real answer','Next real question']);
    assert.equal(await evaluate(`document.querySelectorAll('.message.user').length`),3);assert(saved.messages.every(m=>m.text!==internal));assert(provenanceRequests.slice(start).every(r=>r.history.every(m=>m.text!==internal)));
    assert(provenanceRequests.at(-1).history.some(m=>m.text==='First real answer'));
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();await until(`document.getElementById('learn') && document.getElementById('budget').textContent.length>0`);
  });
  async function practiceTopic(){
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();await db.put({id:'practice-topic',createdAt:Date.now(),source:{id:'practice-source',title:'条件与行动',text:'只有土壤干燥才浇水。'},goals:[],messages:[{role:'user',text:'请解释条件。'}],attempts:[],mode:'learn'});db.close();})()`);
    await reloadPage();
  }
  async function practiceInput(text){await evaluate(`document.getElementById('practiceDraft').value=${JSON.stringify(text)};document.getElementById('practiceDraft').dispatchEvent(new Event('input'))`);}
  await check('practice keeps two questions and answer revisions; double submit and repeat answer do not duplicate calls',async()=>{
    await practiceTopic();const before=provenanceRequests.length;
    await click('startPractice');await until(`document.getElementById('practiceQuestion').textContent && !document.getElementById('practiceSubmit').disabled`);
    const question=await evaluate(`document.getElementById('practiceQuestion').textContent`);
    await practiceInput('土壤还湿，所以现在先不浇。');
    await until(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];db.close();return t.practiceRounds[0].draft==='土壤还湿，所以现在先不浇。';})()`);
    delaySemantic=300;
    await evaluate(`document.getElementById('practiceForm').requestSubmit();document.getElementById('practiceForm').requestSubmit()`);
    await until(`document.querySelector('#practiceAnswers strong') && !document.getElementById('practiceSubmit').disabled`);delaySemantic=0;
    assert.equal(provenanceRequests.length,before+2);
    assert.equal(provenanceRequests.at(-1).focus,question);
    assert.equal(await evaluate(`document.querySelector('.journey [aria-current]').dataset.step`),'4');
    for(const width of [1440,390]){
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
      assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));await shot(`practice-${width}`,'practicePanel');
    }
    await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
    await practiceInput('我先检查土壤，只有干了才浇水。');await evaluate(`document.getElementById('practiceForm').requestSubmit()`);
    await until(`document.querySelectorAll('#practiceAnswers strong').length===2 && !document.getElementById('practiceSubmit').disabled`);
    const first=(await evaluate(all))[0].practiceRounds[0];
    await click('practiceNew');await until(`document.querySelectorAll('#practiceQuestionSelect option').length===2 && !document.getElementById('practiceSubmit').disabled`);
    await evaluate(`document.getElementById('practiceQuestionSelect').value=${JSON.stringify(first.id)};document.getElementById('practiceQuestionSelect').dispatchEvent(new Event('change'))`);
    await until(`document.querySelectorAll('#practiceAnswers strong').length===2`);
    const beforeReuse=calls.length;await practiceInput(first.answers[0].text);await evaluate(`document.getElementById('practiceForm').requestSubmit()`);
    await until(`document.getElementById('practiceDraft').value==='' && !document.getElementById('practiceSubmit').disabled`);
    assert.equal(calls.length,beforeReuse);
    const saved=(await evaluate(all))[0];assert.equal(saved.practiceRounds.length,2);assert.equal(saved.practiceRounds[0].answers.length,2);
    assert.deepEqual(saved.messages,[{role:'user',text:'请解释条件。'}]);
  });
  await check('practice failure preserves the answer and question across reload; retry is explicit',async()=>{
    await practiceTopic();await click('startPractice');await until(`document.getElementById('practiceQuestion').textContent && !document.getElementById('practiceSubmit').disabled`);
    await practiceInput('不浇，因为土壤仍湿。');failTeach=true;await evaluate(`document.getElementById('practiceForm').requestSubmit()`);
    await until(`document.getElementById('notice').textContent.includes('API_RESULT_UNAVAILABLE') && !document.getElementById('practiceSubmit').disabled`);
    const before=calls.length;await reloadPage();assert.equal(calls.length,before);
    assert.equal(await evaluate(`document.getElementById('practiceDraft').value`),'不浇，因为土壤仍湿。');
    assert.equal(await evaluate(`document.getElementById('practiceSubmit').textContent`),'重试这次回答');
    await evaluate(`document.getElementById('practiceForm').requestSubmit()`);await until(`document.querySelector('#practiceAnswers strong') && !document.getElementById('practiceSubmit').disabled`);
    assert.equal(calls.length,before+1);assert.equal((await evaluate(all))[0].practiceRounds[0].answers.length,1);
    failTeach=true;await click('practiceNew');await until(`document.getElementById('practiceStatus').textContent.includes('上次出题')`);
    const after=calls.length;await reloadPage();assert.equal(calls.length,after);assert.equal((await evaluate(all))[0].practiceRounds.length,1);
    assert(await evaluate(`document.querySelector('#practiceAnswers strong')!==null`));
  });
  await check('reopening and history continue the latest active topic and its review position without model calls',async()=>{
    const before=calls.length,f=diagnosticFixtures.find(f=>f.id==='fluent-wrong'),stamp=Date.now();
    const recent={id:'a-recent',createdAt:stamp-20000,updatedAt:stamp-1000,source:{...f.source,title:'最近核对的主题'},goals:[],messages:[],mode:'learn',resume:{view:'attempt',attemptId:f.attempt.id},attempts:[{...f.attempt,source:f.source,createdAt:stamp-15000,raw:{id:f.attempt.transcriptVersion,spans:f.attempt.spans,reviewed:true},corrections:[],reports:[{...f.report,channel:'content'}]}]};
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();const t=${JSON.stringify(recent)};t.attempts[0].audio=new Blob(['synthetic placeholder']);await db.put(t);await db.put({id:'z-older',createdAt:${stamp-10000},source:{id:'old-source',title:'较早的主题',text:'旧材料'},goals:[],messages:[],attempts:[],mode:'learn'});db.close();})()`);
    await reloadPage();assert.equal(await evaluate(`document.getElementById('topicTitle').textContent`),'最近核对的主题');
    assert(await evaluate(`!document.getElementById('attemptPanel').hidden && document.querySelector('#feedback .finding')!==null`));
    await click('historyButton');await until(`document.querySelectorAll('#historyList>div').length===2`);assert(await evaluate(`document.querySelector('#historyList>div').textContent.includes('继续核对与反馈')`));
    await evaluate(`[...document.querySelectorAll('#historyList .history-continue')][1].click()`);
    await until(`document.getElementById('topicTitle').textContent==='较早的主题' && document.getElementById('history').hidden && !document.getElementById('workspace').hasAttribute('aria-busy')`);
    await reloadPage();assert.equal(await evaluate(`document.getElementById('topicTitle').textContent`),'较早的主题');assert.equal(calls.length,before);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
  for(const f of diagnosticFixtures)await check(`B4 zero-call UI fixture ${f.id}`,async()=>{
    const before=calls.length,ledgerBefore=JSON.stringify(testBook.read());
    const a={...f.attempt,source:f.source,createdAt:Date.now(),raw:{id:f.attempt.transcriptVersion,text:f.attempt.spans.map(s=>s.text).join(''),spans:f.attempt.spans,reviewed:f.attempt.reviewed},corrections:[],reports:[{...f.report,channel:'content'},...(f.evidence.length?[{channel:'process',attemptId:f.attempt.id,transcriptVersion:f.attempt.transcriptVersion,processEvidence:f.evidence}]:[])]};
    const t={id:'diagnostic-ui',source:f.source,createdAt:Date.now(),goals:[],messages:[],attempts:[a],mode:'learn'};
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob(['synthetic placeholder']);await db.put(t);db.close();})()`);
    await reloadPage();await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();
    assert.equal(await evaluate(`document.querySelectorAll('#feedback .diagnosticTarget').length`),f.expected.targets??0);
    assert.equal(await evaluate(`document.querySelectorAll('#processFeedback .processObservation').length`),f.expected.process??0);
    assert.equal(await evaluate(`document.querySelectorAll('#processFeedback .finding, #processFeedback .diagnosticTarget, #feedback .processObservation').length`),0);
    if(f.expected.blocked)assert.equal(await evaluate(`document.querySelectorAll('#feedback .finding').length`),0);
    if(f.id==='gap-without-process')assert.equal(await evaluate(`[...document.querySelectorAll('#feedback button')].filter(b=>!['再学这一点','再讲这一点'].includes(b.textContent)).length`),0);
    if(f.expected.targets){await evaluate(`[...document.querySelectorAll('#feedback button')].find(b=>b.textContent==='再讲这一点').click()`);assert.equal(await evaluate(`document.getElementById('recordFocus').textContent`),f.report.findings[0].repair);await click('cancelRecord');}
    assert.equal(calls.length,before);assert.equal(JSON.stringify(testBook.read()),ledgerBefore);
    await shot(`diagnostic-${f.id}`,'attemptPanel');
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();await db.clear();db.close();})()`);await reloadPage();
  });
  calls.length=0;
  await check('R2 prominent native file entry at desktop and mobile before any provider call',async()=>{
    for(const width of [1440,390]){
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});await evaluate(`window.scrollTo(0,0)`);
      assert(await evaluate(`(()=>{const f=document.getElementById('sourceFile'),r=f.getBoundingClientRect();return r.width>180 && r.top>0 && r.bottom<innerHeight && getComputedStyle(f).display!=='none' && document.documentElement.scrollWidth<=innerWidth+1;})()`));
      assert(await evaluate(`document.querySelector('.file-title').textContent==='选择学习文件' && document.getElementById('fileTypes').textContent.includes('10 MB')`));
      await shot(`initial-file-entry-${width}`);
    }
    assert.equal(calls.length,0);
    await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('local MD import, selection, no provider call until Learn, clear preview',async()=>{
    const before=calls.length;
    await evaluate(`const dt=new DataTransfer();dt.items.add(new File(['条件：只有持票者才可以入场。\\n补充：闭馆时不能入场。'],'fixture.md',{type:'text/plain'}));document.getElementById('sourceFile').files=dt.files;document.getElementById('sourceFile').dispatchEvent(new Event('change'));`);
    await until(`!document.getElementById('importPreview').hidden`);assert.equal(calls.length,before);assert.equal(await evaluate(`document.getElementById('selectedFile').textContent`),'fixture.md');assert.equal(await evaluate(`document.getElementById('extractionState').textContent`),'解析完成');await shot('preview','fileProgress');
    assert(await evaluate(`document.getElementById('source').value===document.getElementById('extractedText').value.trim() && document.getElementById('title').value==='fixture' && document.getElementById('sourceCount').textContent.startsWith(document.getElementById('source').value.length.toLocaleString())`));
    await evaluate(`const p=document.getElementById('extractedText');p.setSelectionRange(0,18);`);await click('useSelection');
    assert.equal(await evaluate(`document.getElementById('source').value`),await evaluate(`document.getElementById('extractedText').value.slice(0,18).trim()`));
    const selectedText=await evaluate(`document.getElementById('source').value`);await evaluate(`document.getElementById('extractedText').value='字'.repeat(5001)`);await click('useAll');assert.equal(await evaluate(`document.getElementById('source').value`),selectedText);assert.equal(calls.length,before);
    await click('clearImport');assert(await evaluate(`document.getElementById('extractedText').value==='' && document.getElementById('source').value.length>0`));
  });
  await check('study-first source and tutor, persistent teach-back without rubric/upload',async()=>{await evaluate(`document.getElementById('title').value='工程测试 · 植物浇水';document.getElementById('source').value='只有土壤干燥时才浇水，湿润时不要浇水。';`);await click('learn');await until(`document.querySelectorAll('.message.assistant').length===1`);assert(await evaluate(`!document.getElementById('dock').hidden && document.getElementById('sourceFile').accept==='.md,.txt,.pdf,.docx,.pptx'`));});
  await check('workspace stage and prompt starters preserve drafts without dispatch',async()=>{
    const before=calls.length;
    await until(`document.querySelector('.journey [aria-current]').dataset.step==='1'`);
    assert(await evaluate(`!document.getElementById('learningOptions').open`));
    await evaluate(`document.querySelector('[data-prompt]').click()`);
    assert(await evaluate(`document.getElementById('chat').value.includes('例子') && document.activeElement.id==='chat'`));
    await evaluate(`document.getElementById('chat').value='自己的问题';document.querySelectorAll('[data-prompt]')[1].click()`);
    assert.equal(await evaluate(`document.getElementById('chat').value`),'自己的问题');
    assert.equal(calls.length,before);await evaluate(`document.getElementById('chat').value=''`);
  });
  await check('A responsive layout, readable focus, reduced motion and text zoom',async()=>{
    for(const width of [1440,1024,768,390,320]){
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
      await evaluate(`window.scrollTo(0,0)`);assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
      await shot(`learn-${width}`);
    }
    await cdp('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    assert(await evaluate(`matchMedia('(prefers-reduced-motion:reduce)').matches`));
    await evaluate(`document.documentElement.style.fontSize='200%';document.getElementById('chat').focus()`);assert(await evaluate(`parseFloat(getComputedStyle(document.querySelector('.message')).fontSize)>=34`));
    assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));await shot('text-200-percent');await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});assert.equal(await evaluate(`document.activeElement.id`),'send');assert(await evaluate(`document.activeElement.getBoundingClientRect().bottom<=document.getElementById('dock').getBoundingClientRect().top`));
    await evaluate(`document.documentElement.style.fontSize='';document.getElementById('chat').blur()`);
    await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  });
  await check('microphone denial preserves study state and consumes no registration',async()=>{const before=testBook.summary().attempts;await click('explain');await evaluate(`window.testMic='denied'`);await click('start');await until(`document.getElementById('notice').textContent.includes('权限未允许')`);assert.equal((await evaluate(all))[0].attempts.length,0);assert.equal(testBook.summary().attempts,before);});
  for(const kind of ['unsupported','startup'])await check(`A3 browser ${kind} consumes no attempt; UI recovers`,async()=>{
    const before=testBook.summary().attempts;
    await evaluate(`window.testMic='tone';window.savedSupported=MediaRecorder.isTypeSupported;window.savedStart=MediaRecorder.prototype.start;${kind==='unsupported'?"MediaRecorder.isTypeSupported=()=>false":"MediaRecorder.prototype.start=function(){throw Error('START_FAILED')}"}`);
    await click('start');await until(`!document.getElementById('start').disabled`);assert.equal(testBook.summary().attempts,before);assert.equal((await evaluate(all))[0].attempts.length,0);assert(await evaluate(`!document.body.dataset.recording && document.getElementById('finish').hidden`));
    await evaluate(`MediaRecorder.isTypeSupported=window.savedSupported;MediaRecorder.prototype.start=window.savedStart`);
  });
  await check('A3 pending permission blocks navigation, deletion and duplicate startup',async()=>{
    const before=testBook.summary().attempts,id=(await evaluate(all))[0].id;
    await evaluate(`window.testMic='deferredDenied'`);await click('start');await until(`!!window.rejectPermission`);
    await click('revise');await evaluate(`document.getElementById('deleteAll').click();document.getElementById('start').click()`);
    assert(await evaluate(`!document.getElementById('workspace').hidden && !document.getElementById('deleteDialog').open`));assert.equal((await evaluate(all))[0].id,id);
    await evaluate(`window.rejectPermission()`);await until(`!document.getElementById('start').disabled`);assert.equal(testBook.summary().attempts,before);
  });
  await check('native MediaRecorder + decode + original IndexedDB Blob + exactly one registration',async()=>{const before=testBook.summary().attempts;await evaluate(`window.testMic='tone'`);await click('start');await until(`!document.getElementById('finish').hidden`);assert.equal(testBook.summary().attempts,before);await shot('recording','recording');assert(await evaluate(`document.body.dataset.recording==='true' && document.querySelector('.learning').hidden`));await pause(1400);await click('finish');await until(`document.querySelectorAll('#transcript textarea').length===1`);const t=(await evaluate(all))[0];assert.equal(t.attempts.length,1);assert(t.attempts[0].audio.size>0);assert(t.attempts[0].raw.spans.length);assert.equal(t.attempts[0].corrections.length,0);assert.equal(testBook.summary().attempts,before+1);assert.equal(testBook.read().events.filter(e=>e.type==='attempt'&&e.attemptId===t.attempts[0].id).length,1);});
  await check('C2 optional replay and delayed double confirm preserve one visible current-version report',async()=>{
    await shot('partial-review','attemptPanel');assert(await evaluate(`document.getElementById('reviewHint').textContent.includes('逐段回听不是必需步骤')`));
    const before=(await evaluate(all))[0].attempts[0],count=calls.length;
    await evaluate(`document.querySelector('#transcript textarea').value='只有土壤干燥才浇水，湿润时先不浇。'`);
    let release;diagnosisGate=new Promise(r=>release=r);
    try{
      await click('confirm');for(let i=0;i<100&&calls.length===count;i++)await pause(50);assert.equal(calls.length,count+1);
      const pending=(await evaluate(all))[0].attempts[0];assert.equal(pending.corrections.length,1);
      assert(await evaluate(`document.getElementById('confirm').disabled && [...document.querySelectorAll('#transcript textarea')].every(e=>e.readOnly) && document.getElementById('diagnosisState').textContent.includes('正在诊断')`));await click('confirm');
      const duplicate=(await evaluate(all))[0].attempts[0];assert.deepEqual(duplicate.corrections,pending.corrections);assert.equal(calls.length,count+1);
    }finally{release();diagnosisGate=null;}
    await until(`document.querySelectorAll('.finding').length===1`);const after=(await evaluate(all))[0].attempts[0];
    assert.equal(after.id,before.id);assert.equal(after.audio.size,before.audio.size);assert.equal(after.raw.text,before.raw.text);
    assert.equal(after.corrections.length,1);assert.notEqual(after.raw.id,after.corrections[0].id);assert.equal(after.reports.at(-1).transcriptVersion,after.corrections[0].id);
    assert.equal(after.corrections[0].origin,'USER_TRANSCRIPT_CONFIRMATION');assert.equal(after.corrections[0].spans[0].text,'只有土壤干燥才浇水，湿润时先不浇。');
    assert(await evaluate(`document.getElementById('reviewHint').textContent.includes('这不表示音频已回听')`));
    await evaluate(`document.querySelector('#transcript button').click()`);await until(`document.querySelector('#transcript button').textContent.includes('✓')`);assert.equal(calls.length,count+1);
  });
  await check('diagnosis complete, dirty/stale, revert and keyboard reuse do not dispatch',async()=>{
    const before=calls.length;
    assert(await evaluate(`!!document.querySelector('#feedback .finding details') && !document.querySelector('#feedback .finding details').open`));
    await evaluate(`document.querySelector('#feedback .finding summary').click()`);
    assert(await evaluate(`document.querySelector('#feedback .finding details').open && document.querySelector('#feedback .finding blockquote').getClientRects().length>0`));
    assert(await evaluate(`document.getElementById('diagnosisState').textContent.includes('诊断完成') && !document.getElementById('confirm').disabled`));
    await evaluate(`(()=>{window.confirmedText=document.querySelector('#transcript textarea').value;const e=document.querySelector('#transcript textarea');e.value+='修改';e.dispatchEvent(new Event('input'));})()`);
    assert(await evaluate(`document.getElementById('diagnosisState').textContent.includes('过时') && document.getElementById('confirm').textContent.includes('确认修改并重新诊断') && ![...document.querySelectorAll('#feedback button')].some(b=>b.textContent.includes('再学')||b.textContent.includes('再讲'))`));
    await evaluate(`(()=>{const e=document.querySelector('#transcript textarea');e.value=window.confirmedText;e.dispatchEvent(new Event('input'));document.getElementById('confirm').focus();})()`);
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await until(`document.activeElement.id==='contentHeading'`);assert.equal(calls.length,before);assert.equal((await evaluate(all))[0].attempts[0].corrections.length,1);
  });
  await check('targeted repair routes feedback back into tutor',async()=>{await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再学这一点').click()`);await until(`document.getElementById('phase').textContent.includes('再学这一点') && document.querySelectorAll('.message.assistant').length===2`);assert(calls.some(c=>c.kind==='repair'));});
  await check('partial re-record is a new attempt with parent and focus',async()=>{await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再讲这一点').click()`);await click('start');await until(`!document.getElementById('finish').hidden`);await pause(1200);await click('finish');await until(`document.getElementById('notice').textContent.includes('转写完成')`);const t=(await evaluate(all))[0];assert.equal(t.attempts.length,2);assert.equal(t.attempts[1].kind,'partial');assert.equal(t.attempts[1].parentId,t.attempts[0].id);assert.notEqual(t.attempts[1].id,t.attempts[0].id);});
  await check('recorded teach-back leads into a separate application question and answer',async()=>{
    const before=(await evaluate(all))[0];await click('apply');
    await until(`document.getElementById('practiceQuestion').textContent.includes('现在') && !document.getElementById('practiceSubmit').disabled`);
    await practiceInput('不需要，因为还是湿的。');await evaluate(`document.getElementById('practiceForm').requestSubmit()`);
    await until(`document.querySelector('#practiceAnswers strong') && !document.getElementById('practiceSubmit').disabled`);
    const after=(await evaluate(all))[0];assert.equal(after.practiceRounds[0].answers[0].text,'不需要，因为还是湿的。');
    assert.deepEqual(after.messages,before.messages);assert.equal(after.attempts.length,before.attempts.length);
  });
  await check('history reload preserves raw audio and corrected versions',async()=>{await reloadPage();await until(`!document.getElementById('workspace').hidden`);const t=(await evaluate(all))[0];assert.equal(t.attempts.length,2);assert.equal(t.attempts[0].corrections.length,1);assert(t.attempts[0].audio.size>0);await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=4`);await openHistoryAttempt();});
  await check('review confirmation survives history reload without implying playback',async()=>{assert(await evaluate(`document.getElementById('reviewHint').textContent.includes('这不表示音频已回听') && document.querySelector('#transcript button').textContent.includes('可选回听') && document.getElementById('player').controls`));});
  await check('API timeout then budget stop preserves one original attempt across explicit retry',async()=>{failASR='API_RESULT_UNAVAILABLE';await click('fullAgain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(1100);await click('finish');await until(`document.getElementById('notice').textContent.includes('API_RESULT_UNAVAILABLE')`);let t=(await evaluate(all))[0],a=t.attempts.at(-1);assert.equal(t.attempts.length,3);const identity=a.id,size=a.audio.size;failASR='BUDGET_STOP';await click('retryAsr');await until(`document.getElementById('notice').textContent.includes('预算')`);await shot('budget-stop','notice');t=(await evaluate(all))[0];assert.equal(t.attempts.length,3);assert.equal(t.attempts.at(-1).id,identity);assert.equal(t.attempts.at(-1).audio.size,size);failASR=null;});
  await check('device interruption preserves original and skips semantic diagnosis',async()=>{await click('fullAgain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(800);await evaluate(`window.testTracks[0].dispatchEvent(new Event('ended'))`);await until(`document.getElementById('notice').textContent.includes('采集中断')`);assert((await evaluate(all))[0].attempts.at(-1).interrupted);});
  await check('decode failure retains original, shows retry state',async()=>{await evaluate(`window.savedDecode=AudioContext.prototype.decodeAudioData;AudioContext.prototype.decodeAudioData=async()=>{throw new DOMException('test','EncodingError')}`);await click('fullAgain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(800);await click('finish');await until(`document.getElementById('notice').textContent.includes('LOCAL_ERROR')`);assert((await evaluate(all))[0].attempts.at(-1).audio.size>0);await evaluate(`AudioContext.prototype.decodeAudioData=window.savedDecode`);});
  await check('export contains exact audio bytes, raw/corrected versions, reports and source',async()=>{
    await evaluate(`window.exportBlobs=new Map();window.originalCreate=URL.createObjectURL;URL.createObjectURL=b=>{const u=window.originalCreate(b);window.exportBlobs.set(u,b);return u;};window.anchorClick=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){if(this.download)window.exportBlob=window.exportBlobs.get(this.href);else window.anchorClick.call(this);};`);
    await click('export');await until('!!window.exportBlob');
    assert(await evaluate(`(async()=>{const e=JSON.parse(await window.exportBlob.text());const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];db.close();return JSON.stringify(e.topic.practiceRounds)===JSON.stringify(t.practiceRounds);})()`));
    assert(await evaluate(`(async()=>{const e=JSON.parse(await window.exportBlob.text());const db=await (await import('/storage.mjs')).openStore();const t=(await db.all())[0];db.close();if(e.topic.source.id!==t.source.id||e.topic.attempts.length!==t.attempts.length)return false;for(let i=0;i<t.attempts.length;i++){const a=t.attempts[i],x=e.topic.attempts[i],b=new Uint8Array(await a.audio.arrayBuffer()),decoded=atob(x.audio.base64);if(b.length!==decoded.length||!b.every((v,j)=>v===decoded.charCodeAt(j))||JSON.stringify(a.raw)!==JSON.stringify(x.raw)||JSON.stringify(a.corrections)!==JSON.stringify(x.corrections)||JSON.stringify(a.reports)!==JSON.stringify(x.reports))return false;}return true;})()`));
    assert(await evaluate(`(async()=>{const {decodeBackup,restoredCopy}=await import('/backup.mjs');const t=restoredCopy(decodeBackup(await window.exportBlob.text()));const db=await(await import('/storage.mjs')).openStore();await db.add(t);const restored=await db.get(t.id);await db.delete(t.id);db.close();return restored.attempts.every((a,i)=>a.audio.size===t.attempts[i].audio.size&&JSON.stringify(a.reports)===JSON.stringify(t.attempts[i].reports));})()`));
  });
  await check('delete dialog cancel and Escape preserve data and restore focus',async()=>{
    const before=JSON.stringify(await evaluate(all));
    await evaluate(`document.getElementById('deleteAttempt').click()`);await until(`document.getElementById('deleteDialog').open`);
    assert.equal(await evaluate(`document.activeElement.id`),'deleteCancel');await shot('delete-confirmation');
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await until(`!document.getElementById('deleteDialog').open`);assert.equal(JSON.stringify(await evaluate(all)),before);
    assert.equal(await evaluate(`document.activeElement.id`),'deleteAttempt');
    await evaluate(`document.getElementById('deleteAttempt').click()`);await click('deleteCancel');await until(`!document.getElementById('deleteDialog').open`);assert.equal(JSON.stringify(await evaluate(all)),before);
  });
  await check('per-attempt delete removes linked objects and preserves other attempts',async()=>{const before=(await evaluate(all))[0];await click('deleteAttempt');await until(`document.getElementById('notice').textContent.includes('这次原声')`);const after=(await evaluate(all))[0];assert.equal(after.attempts.length,before.attempts.length-1);assert(!after.attempts.some(a=>a.id===before.attempts.at(-1).id));assert.equal(after.attempts[0].id,before.attempts[0].id);});
  await check('quota failure preserves memory audio, offers export and retry save',async()=>{const count=(await evaluate(all))[0].attempts.length;
    await evaluate(`window.originalPut=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(v,...args){if(v.attempts?.length>${count})throw new DOMException('quota fixture','QuotaExceededError');return window.originalPut.call(this,v,...args);};`);
    await click('explain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(900);await click('finish');await until(`!document.getElementById('storageRecovery').hidden`);await shot('storage-failure','storageRecovery');assert.equal((await evaluate(all))[0].attempts.length,count);
    await evaluate('window.exportBlob=null');await click('recoveryExport');await until('!!window.exportBlob');assert.equal(await evaluate('(async()=>JSON.parse(await window.exportBlob.text()).topic.attempts.length)()'),count+1);
    await click('revise');assert(await evaluate(`!document.getElementById('workspace').hidden`));
    await evaluate('IDBObjectStore.prototype.put=window.originalPut');await click('retrySave');await until(`document.getElementById('storageRecovery').hidden`);assert.equal((await evaluate(all))[0].attempts.length,count+1);
  });
  await check('pending semantic navigation cannot replace topic or misattach result',async()=>{delaySemantic=1200;const id=(await evaluate(all))[0].id;await evaluate(`document.getElementById('chat').value='还有问题';document.getElementById('chatForm').requestSubmit()`);await until(`document.getElementById('notice').textContent.includes('梳理')`);await click('revise');assert(await evaluate(`!document.getElementById('workspace').hidden`));await until(`document.getElementById('chatRecovery').hidden`);assert.equal((await evaluate(all))[0].id,id);delaySemantic=0;});
  await check('seven-day expiry cleans linked objects but preserves live topic',async()=>{await evaluate(`(async()=>{const {openStore}=await import('/storage.mjs');const db=await openStore();await db.put({id:'expired-engineering',createdAt:Date.now()-8*86400000,source:{title:'expired'},attempts:[{audio:new Blob(['test'])}]});db.close();})()`);await reloadPage();await until(`!document.getElementById('workspace').hidden`);assert.equal((await evaluate(all)).length,1);});
  await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}).then(r=>writeFileSync(join(root,'browser-learning.png'),Buffer.from(r.data,'base64')));
  await check('source revision creates distinct record, preserves prior source/attempts',async()=>{const before=(await evaluate(all))[0];await click('revise');await evaluate(`document.getElementById('source').value='新版规则：只有土壤干燥时才浇水。'`);await click('learn');await until(`document.querySelectorAll('.message.assistant').length===1`);const t=await evaluate(all);assert.equal(t.length,2);assert(t.some(x=>x.id===before.id&&x.source.text===before.source.text&&x.attempts.length===before.attempts.length));});
  await check('delete all actually removes IndexedDB topic and linked audio records',async()=>{await click('historyButton');await click('deleteAll');await until(`document.getElementById('notice').textContent.includes('全部本地学习对象已删除')`);assert.equal((await evaluate(all)).length,0);});
  await check('saved real ASR PARTIAL words replay through validated segment before diagnosis',async()=>{
    const raw={...savedASR,id:'real-raw',origin:'ASR',createdAt:Date.now()};const t={id:'real-shape',createdAt:Date.now(),source:{id:'real-source',title:'保存的真实 ASR 回放',text:savedASR.text},goals:[],messages:[],attempts:[{id:'real-attempt',createdAt:Date.now(),source:{id:'real-source',title:'保存的真实 ASR 回放',text:savedASR.text},kind:'full',focus:null,assistance:'none',duration:7.31,observation:JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r3/DELIVERY_ENGINEERING.json',import.meta.url))).acoustic,raw,corrections:[],reports:[],status:'REVIEW_REQUIRED'}]};
    await evaluate(`(async()=>{const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob([new Uint8Array(${JSON.stringify(savedWave)})],{type:'audio/wav'});const db=await (await import('/storage.mjs')).openStore();await db.put(t);db.close();})()`);
    await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();assert(await evaluate(`document.getElementById('reviewHint').textContent.includes('词级定位部分不可用')`));await evaluate(`document.querySelector('#transcript button').click()`);await until(`document.querySelector('#transcript button').textContent.includes('✓')`);await click('confirm');await until(`document.querySelectorAll('.finding').length===1`);const a=(await evaluate(all))[0].attempts[0];assert.equal(a.raw.words[14].start,a.raw.words[14].end);assert.equal(a.raw.words[14].usable,false);assert.equal(a.corrections.length,1);
  });
  await check('B3 local process confirmation requires replay, stores separate evidence and makes zero provider dispatches',async()=>{
    const before=calls.length,ledgerBefore=JSON.stringify(testBook.read());
    await evaluate(`[...document.querySelectorAll('#observations button')].find(b=>b.textContent==='确认并保存过程证据').click()`);await until(`document.getElementById('notice').textContent.includes('完整回听这个过程候选')`);
    await evaluate(`document.querySelector('#observations button').click()`);await until(`document.querySelector('#observations button').textContent.includes('✓')`);await evaluate(`[...document.querySelectorAll('#observations button')].find(b=>b.textContent==='确认并保存过程证据').click()`);await until(`document.querySelectorAll('.processObservation').length===1`);
    const reports=(await evaluate(all))[0].attempts[0].reports;assert.deepEqual(reports.map(r=>r.channel),['content','process']);
    const evidence=reports[1].processEvidence[0];assert.equal(evidence.confirmation,'human_confirmed');assert(!('sourceQuote' in evidence));assert(!('status' in evidence));assert.equal(calls.length,before);assert.equal(JSON.stringify(testBook.read()),ledgerBefore);
    assert.equal(await evaluate(`document.querySelectorAll('#feedback .finding').length`),1);assert.equal(await evaluate(`document.querySelectorAll('#processFeedback .finding, #processFeedback .diagnosticTarget').length`),0);
    assert.equal(await evaluate(`document.getElementById('contentHeading').textContent`),'内容理解');assert.equal(await evaluate(`document.getElementById('processHeading').textContent`),'讲解过程');
    await evaluate(`[...document.querySelectorAll('#observations button')].find(b=>b.textContent==='确认并保存过程证据').click()`);await until(`document.getElementById('notice').textContent.includes('本机保存')`);assert.equal((await evaluate(all))[0].attempts[0].reports.length,2);assert.equal(calls.length,before);
    await reloadPage();await until(`!document.getElementById('workspace').hidden`);await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();assert.equal(await evaluate(`document.querySelectorAll('.processObservation').length`),1);assert.equal(calls.length,before);
  });
  await check('short-gap candidate replays and saves locally without a semantic call',async()=>{
    const before=calls.length;
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];t.attempts[0].observation.events.push({id:'cluster-test',type:'short_pause_cluster_candidate',start:1,end:2.2});await db.put(t);db.close();})()`);
    await reloadPage();await until(`!document.getElementById('workspace').hidden`);await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();
    await evaluate(`window.testClusterRow=[...document.querySelectorAll('#observations button')].find(b=>b.textContent.includes('短间隔聚集')).parentElement;window.testClusterRow.querySelector('button').click()`);await until(`window.testClusterRow.querySelector('button').textContent.includes('✓')`);
    await evaluate(`window.testClusterRow.querySelector('button:last-child').click()`);await until(`document.getElementById('processFeedback').textContent.includes('短低能量间隔聚集')`);
    assert.equal(calls.length,before);assert.equal(await evaluate(`document.querySelectorAll('#processFeedback .finding').length`),0);
    const a=(await evaluate(all))[0].attempts[0];assert(a.reports.some(r=>r.channel==='process'&&r.processEvidence.some(e=>e.type==='short_pause_cluster'&&e.confirmation==='human_confirmed')));
  });
  await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false}).then(r=>writeFileSync(join(root,'browser-real-asr.png'),Buffer.from(r.data,'base64')));
  await check('stale history navigation blocked and pending delete-all prevents late restoration',async()=>{
    await evaluate(`(async()=>{const db=await (await import('/storage.mjs')).openStore();await db.put({id:'other-topic',createdAt:Date.now(),source:{id:'other-source',title:'不得切入',text:'工程材料'},goals:[],messages:[],attempts:[],mode:'learn'});db.close();})()`);
    await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=5`);delaySemantic=1200;await evaluate(`document.getElementById('chat').value='慢请求';document.getElementById('chatForm').requestSubmit()`);await until(`document.getElementById('notice').textContent.includes('梳理')`);
    await evaluate(`[...document.querySelectorAll('#historyList .history-continue')].at(-1).click()`);assert.notEqual(await evaluate(`document.getElementById('topicTitle').textContent`),'不得切入');
    await click('deleteAll');await until(`document.getElementById('workspace').hidden`);await pause(1500);assert.equal((await evaluate(all)).length,0);assert(await evaluate(`document.getElementById('workspace').hidden`));delaySemantic=0;
  });
  await check('real supported punctuation repair renders no remediation; valid gaps retain focus actions',async()=>{
    const live=JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r3/LUNA_LOGIC_REV3.json',import.meta.url))).cases.find(c=>c.id==='self_repair');
    assert(live.result.findings.some(f=>f.status==='supported'&&f.repair==='. .'));
    async function show(report){const t={id:'feedback-gate',createdAt:Date.now(),source:live.source,goals:[],messages:[],attempts:[{...live.fixture,source:live.source,createdAt:Date.now(),raw:{id:live.fixture.transcriptVersion,text:live.fixture.spans[0].text,spans:live.fixture.spans,reviewed:true},corrections:[],reports:[{...report,channel:'content'}]}]};await evaluate(`(async()=>{const t=${JSON.stringify(t)};t.attempts[0].audio=new Blob(['synthetic placeholder']);const db=await (await import('/storage.mjs')).openStore();await db.put(t);db.close();})()`);await click('historyButton');await until(`document.querySelectorAll('#historyList button').length>=3`);await openHistoryAttempt();}
    const buttons=`[...document.querySelectorAll('.finding button')].filter(b=>['再学这一点','再讲这一点'].includes(b.textContent)).length`;
    await show(live.result);await shot('supported','feedback');assert.equal(await evaluate(buttons),0);assert(await evaluate(`document.getElementById('feedback').textContent.includes('已表达')`));
    for(const status of ['missing','incorrect','unknown']){
      const r=structuredClone(live.result);r.findings=[{...r.findings[0],status,repair:'. .'}];if(status==='missing')Object.assign(r.findings[0],{spanId:null,quote:null,message:'工程合成示例：这次尚未说明土壤湿润时应如何处理；这不代表你不知道。'});await show(r);assert.equal(await evaluate(buttons),0);
      r.findings[0].repair='请澄清浇水的必要条件。';await show(r);if(status==='missing')await shot('missing','feedback');assert.equal(await evaluate(buttons),2);
      const beforeRepair=calls.length;await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再学这一点').click()`);for(let i=0;i<100&&calls.length===beforeRepair;i++)await pause(30);assert(calls.length>beforeRepair);await until(`!document.getElementById('workspace').hasAttribute('aria-busy') && document.getElementById('chatRecovery').hidden`);assert.equal(calls.at(-1).focus,r.findings[0].repair);
      await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再讲这一点').click()`);assert.equal(await evaluate(`document.getElementById('recordFocus').textContent`),r.findings[0].repair);await click('cancelRecord');
      await click('fullAgain');assert.equal(await evaluate(`document.getElementById('recordTitle').textContent`),'我来讲讲');await click('cancelRecord');
    }
  });
  await check('A3 registration failure retains saved original; retry registers same ID once before ASR',async()=>{
    const before=testBook.summary().attempts,asrBefore=calls.filter(c=>c.kind==='asr').length;failRegister=true;
    await click('fullAgain');await click('start');await until(`!document.getElementById('finish').hidden`);await pause(900);await click('finish');
    await until(`document.getElementById('notice').textContent.includes('LEDGER_LOCKED')`);
    const a=(await evaluate(all))[0].attempts.at(-1);assert(a.audio.size>0);assert.equal(a.raw,null);assert.equal(testBook.summary().attempts,before);assert.equal(calls.filter(c=>c.kind==='asr').length,asrBefore);
    failRegister=false;await click('retryAsr');await until(`document.getElementById('notice').textContent.includes('转写完成')`);
    const after=(await evaluate(all))[0].attempts.at(-1);assert.equal(after.id,a.id);assert.deepEqual(after.audio,a.audio);assert.equal(testBook.summary().attempts,before+1);assert.equal(calls.filter(c=>c.kind==='asr').length,asrBefore+1);
  });
  await check('topic deletion is scoped, cancel keeps topic, confirmed focus returns to history',async()=>{
    await click('historyButton');await until(`document.querySelector('#historyList .danger')`);const before=JSON.stringify(await evaluate(all));
    await evaluate(`document.querySelector('#historyList .danger').click()`);await until(`document.getElementById('deleteDialog').open`);await shot('history-delete');await click('deleteCancel');await pause(100);assert.equal(JSON.stringify(await evaluate(all)),before);
    await evaluate(`document.querySelector('#historyList .danger').click()`);await click('deleteConfirm');await until(`document.getElementById('historyList').textContent.includes('还没有')`);assert.equal((await evaluate(all)).length,0);await until(`document.activeElement.id==='historyTitle'`);
  });
  }
  if(!environmentProbe&&!recoveryOnly&&!process.argv.includes('--replay-only'))await check('independent demo completes both examples without API requests or personal-record changes',async()=>{
    await evaluate(`(async()=>{const db=await (await import('/storage.mjs')).openStore();await db.put({id:'demo-preserve',createdAt:Date.now(),source:{title:'个人记录必须保留'},attempts:[]});db.close();})()`);
    const before=JSON.stringify(await evaluate(all)),requestIndex=network.length,dispatches=calls.length;
    await cdp('Page.navigate',{url:origin+'/demo'});await until(`document.getElementById('demoTitle')?.textContent.length>0`);
    for(const sample of [0,1]){
      await evaluate(`document.querySelector('[data-sample="${sample}"]').click()`);
      await click('demoNext');await click('demoNext');
      assert.equal(await evaluate(`document.querySelector('#demoFindings .finding').dataset.status`),'incorrect');
      await evaluate(`document.querySelector('#demoFindings summary').click()`);assert(await evaluate(`document.querySelector('#demoFindings details').open`));
      if(sample===0)await shot('demo-feedback');
      await click('demoBack');await evaluate(`document.querySelector('[name=exampleAnswer][value="1"]').click()`);await click('demoNext');
      assert.equal(await evaluate(`document.querySelector('#demoFindings .finding').dataset.status`),'supported');
      await click('demoNext');await click('practiceB');assert(await evaluate(`document.getElementById('practiceFeedback').textContent.length>10`));
      await click('practiceA');assert(await evaluate(`document.getElementById('practiceFeedback').textContent.startsWith('对。')`));
    }
    await click('demoReset');assert(await evaluate(`document.querySelector('[data-demo-step="0"]').getAttribute('aria-current')==='step' && document.getElementById('practiceFeedback').textContent===''`));
    for(const width of [1440,390]){
      await cdp('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});await evaluate(`window.scrollTo(0,0)`);
      assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));await shot(`demo-${width}`);
    }
    assert.equal(JSON.stringify(await evaluate(all)),before);assert.equal(calls.length,dispatches);
    assert(!network.slice(requestIndex).some(url=>url.includes('/api/')));
  });
  assert.deepEqual(errors,[]);assert(network.every(url=>url.startsWith(origin+'/')||url.startsWith('blob:'+origin+'/')||url.startsWith('data:')),'unexpected browser network');
}catch(e){cases.push({name:'suite completion',status:'FAIL',error:e.message});console.log('BROWSER FAILURE: '+e.message);}
finally{try{writeFileSync(join(root,'replay-trace.json'),JSON.stringify(await evaluate('window.replayTrace'),null,2));}catch{}
writeFileSync(join(root,'edge.log'),edgeLog);writeFileSync(join(root,`browser-${run}.json`),JSON.stringify({at:new Date().toISOString(),kind:'EDGE_HEADLESS_REAL_BROWSER_WITH_SYNTHETIC_MEDIA_AND_STUBBED_PROVIDER',cases,calls,network,screenshots,consoleErrors:errors,physicalMicrophone:false,liveAPI:false,environmentProbe:probe},null,2));try{if(ws)await cdp('Browser.close');}catch{}ws?.close();edge.kill();await new Promise(r=>server.close(r));}
if(cases.some(c=>c.status==='FAIL')||!cases.length)process.exitCode=1;
