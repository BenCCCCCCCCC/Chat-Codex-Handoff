import { observations, waveBytes, revisedTranscript, validateFindings, repairFocus, autoTitle, setupContextValue } from './core.mjs';
import { openStore } from './storage.mjs';
import { confirmLocalProcess, localize, processEvidence } from './diagnostic-localization.mjs';
const $=id=>document.getElementById(id), uid=()=>crypto.randomUUID();
let db,topic=null,current=null,pending=null,controller=null,record=null,blobURL=null,playEnd=null,deleted=new Set(),memoryOnly=false,processing=false,capturePending=false;
const editors=new Map();
const diagnosisStates=new WeakMap();
// Transient playback copies only. Original stored/exported audio is untouched.
const replayWaves=new WeakMap();let replayOriginal=null,replayRequest=0;
const notice=message=>{$('notice').textContent=message;};
const reveal=(id,show=true)=>{$(id).hidden=!show;};
function el(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
function button(label,fn,cls='quiet'){const b=el('button',label,cls);b.onclick=()=>label==='删除主题'?confirmDelete('删除这个主题及其全部讲解、原声、转写和反馈。',fn,b):act(fn);return b;}
async function act(fn){try{await fn();}catch(e){notice(friendly(e.message));}}
function friendly(code){const messages={EXTRACTOR_SETUP_REQUIRED:'本机文档提取环境未配置，请按 README 完成产品 Python 环境设置。材料没有发送给模型。',EXTRACTOR_DEPENDENCY_REQUIRED:'本机文档提取依赖缺失或版本不符，请按 README 安装指定版本 pypdf。材料没有发送给模型。',FILE_TOO_LARGE:'文件超过 10 MB，请选择更小的材料。',TEXT_ENCODING_UNSUPPORTED:'文本编码不受支持，请另存为 UTF-8 或 UTF-16。',NO_EXTRACTABLE_TEXT:'未提取到文字；扫描 PDF/图片需要先转换为可选取文本。本应用不执行 OCR。',INVALID_DOCUMENT:'文件无法安全解析，请检查格式或复制文字。',DOCUMENT_LIMIT:'材料超过本次提取限制，请拆分文档。',ENCRYPTED_DOCUMENT:'不支持加密文件，请使用未加密的低风险材料。',EXTRACTION_TIMEOUT:'本机提取超时，请缩小文件。',ASR_REVIEW_REQUIRED:'请先确认用于诊断的转写；建议回听检查否定词、数字、条件和术语。',BUDGET_STOP:'本次 API 预算已达到停止条件。原始讲解已保留。',ATTEMPT_LIMIT:'本次讲解的转写次数或总次数已达上限。原始讲解仍可回放。',CREDENTIAL_MISSING:'服务端尚未配置 API 凭据；请由开发者配置，学习数据仍保留。',REQUEST_IN_PROGRESS:'上一个请求仍在完成，请稍后再试。',NOT_HEARD:'请先完整回听这个过程候选，再保存过程证据。',STORAGE_FAILED:'本机存储失败，当前内容仅在此页内存中。请立即导出或重试保存，不要关闭页面。',NO_AUDIO:'没有收到可用录音，请检查麦克风。',SOUND_EVIDENCE_INSUFFICIENT:'声音证据不足，保留原声供回听。'};return messages[code]??`处理未完成（${/^[A-Z0-9_]+$/.test(code)?code:'LOCAL_ERROR'}）。原始学习记录不会因此删除。`;}
async function save(){if(!topic||deleted.has(topic.id))return;try{await db.put(topic);memoryOnly=false;reveal('storageRecovery',false);}catch{memoryOnly=true;reveal('storageRecovery');throw new Error('STORAGE_FAILED');}}
async function api(path,body,headers={}){
  if(controller||record)throw new Error('REQUEST_IN_PROGRESS');
  controller=new AbortController();$('send').disabled=true;$('explain').disabled=true;$('workspace').setAttribute('aria-busy','true');
  try{const response=await fetch(path,{method:'POST',headers:{'X-Study-Request':'1',...headers,...(body instanceof ArrayBuffer?{}:{'Content-Type':'application/json'})},body:body instanceof ArrayBuffer?body:JSON.stringify(body),signal:controller.signal});const result=await response.json();if(!response.ok)throw new Error(result.error);return result;}
  finally{controller=null;$('send').disabled=false;$('explain').disabled=false;$('workspace').removeAttribute('aria-busy');updateBudget();}
}
async function updateBudget(){try{const response=await fetch('/api/status');if(!response.ok)throw new Error('BUDGET_UNAVAILABLE');const s=await response.json();$('budget').textContent=`本次账本：${s.ledger.requests} 次请求；已知费用估算 $${s.ledger.knownCostUSD.toFixed(6)}；含未结算预留 $${s.ledger.exposureUSD.toFixed(6)} / $5。现金新增上限 $10，不自动充值。`; }catch{$('budget').textContent='预算状态暂不可用；无法确认可用额度。';}}
function renderTopic(){
  reveal('setup',false);reveal('workspace');reveal('dock');$('topicTitle').textContent=topic.source.title;$('sourceText').textContent=topic.source.text;
  $('goals').replaceChildren(...(topic.goals??[]).map(g=>el('li',g.text)));
  $('messages').replaceChildren(...topic.messages.map(m=>el('div',m.text,`message ${m.role}`)));$('messages').scrollTop=$('messages').scrollHeight;
  $('question').textContent=topic.question??'';$('phase').textContent=topic.mode==='apply'||topic.mode==='apply_answer'?'换个情境试试':topic.mode==='repair'?'再学这一点':'一起学';
}
async function teach(message,mode='learn',focus=null,{internalStarter=false}={}){
  if(record||capturePending||controller||processing)throw new Error('REQUEST_IN_PROGRESS');
  if(mode==='repair')focus=repairFocus(focus);
  const target=topic,history=target.messages.slice();
  if(!internalStarter)target.messages.push({role:'user',text:message});target.mode=mode;await save();renderTopic();notice('正在一起梳理这段材料……');
  try{const r=await api('/api/teach',{source:target.source,mode,message,focus,history,setupContext:target.setupContext});
    if(deleted.has(target.id)||topic!==target)return;
    target.messages.push({role:'assistant',text:r.value.message});target.question=r.value.question;
    if(!target.goals.length){target.goals=r.value.goals;target.anchorVersion=uid();target.source.anchors=structuredClone(target.goals);target.source.anchorVersion=target.anchorVersion;}
    if(mode==='apply')target.apply={id:uid(),question:r.value.question,createdAt:Date.now(),assistance:'source_visible',answer:null};
    if(mode==='apply_answer'&&target.apply)target.apply.result=r.value.message;
    await save();renderTopic();notice('可以继续问，也可以随时“我来讲讲”。');
  }catch(e){notice(friendly(e.message));throw e;}
}
let importPending=false;
function updateCounts(){ $('sourceCount').textContent=`${$('source').value.length.toLocaleString()} / 5,000 字`;$('selectionCount').textContent=`已选 ${$('extractedText').value.slice($('extractedText').selectionStart,$('extractedText').selectionEnd).trim().length.toLocaleString()} 字`; }
$('source').addEventListener('input',updateCounts);$('extractedText').addEventListener('select',updateCounts);
function clearImport(){ $('selectedFile').textContent='';$('extractionState').textContent='';reveal('fileProgress',false); $('selectionCount').textContent='已选 0 字';$('sourceFile').value='';$('extractedText').value='';$('importStatus').textContent='';reveal('importPreview',false); }
$('clearImport').onclick=clearImport;
$('sourceFile').onchange=()=>act(async()=>{
  const file=$('sourceFile').files[0];if(!file)return;
  if(controller||importPending)return notice('请先等当前处理完成。');
  clearImport();$('selectedFile').textContent=file.name;$('extractionState').textContent='正在本机解析…';reveal('fileProgress');importPending=true;$('learn').disabled=true;$('sourceFile').disabled=true;
  try{
    if(file.size>10*1024*1024)throw new Error('FILE_TOO_LARGE');
    notice('');
    const result=await api('/api/extract',await file.arrayBuffer(),{'X-Source-Format':file.name.split('.').pop().toLowerCase()});
    $('extractedText').value=result.blocks.map(b=>b.text).join('\n\n');
    $('extractionState').textContent='解析完成';$('importStatus').textContent=`${result.blocks.length} 个正文/页面/幻灯片区块。核对文字后，选取最多 5,000 字。`;
    reveal('importPreview');
    if($('extractedText').value.trim().length<=5000){
      useImported(true);
      notice('全文已放入学习材料，可以直接开始学习；也可从预览中重新选取片段。');
    }else{
      notice('文件超过 5,000 字，请在预览中选取最多 5,000 字，再点击“使用选中文字”。未自动替换现有学习材料。');
      updateCounts();
    }
  }catch(e){$('extractionState').textContent='解析未完成，可重新选择文件或粘贴文字。';throw e;}finally{importPending=false;$('learn').disabled=false;$('sourceFile').disabled=false;}
});
function useImported(all){
  const preview=$('extractedText');const selected=(all?preview.value:preview.value.slice(preview.selectionStart,preview.selectionEnd)).trim();
  if(!selected)return notice('请先在预览中选中文字。');
  if(selected.length>5000)return notice('这一轮最多 5,000 字，请缩小选段；不会自动截断材料。');
  $('source').value=selected;$('title').value=autoTitle(selected,$('selectedFile').textContent);updateCounts();notice('选段已放入学习材料。可继续编辑，点击“开始学习”才会发送给模型。');
}
$('useSelection').onclick=()=>useImported(false);$('useAll').onclick=()=>useImported(true);
$('learn').onclick=()=>act(async()=>{
  if(importPending||controller||capturePending||record||processing)return;
  if(!$('source').value.trim())return notice('请先放入这一轮的学习材料。');
  if($('source').value.length>5000)return notice('这一轮最多 5,000 字，请缩小材料。');
  const setupContext=setupContextValue({focus:$('setupFocus').value,known:$('setupKnown').value});
  clearImport();
  topic={id:uid(),createdAt:Date.now(),source:{id:uid(),title:$('title').value.trim()||autoTitle($('source').value),text:$('source').value.trim()},setupContext,goals:[],messages:[],attempts:[],mode:'learn'};await save();renderTopic();await teach('请先帮我理解这段材料，从核心关系开始，问我一个简短问题。','learn',null,{internalStarter:true});
});
$('chatForm').onsubmit=e=>{e.preventDefault();if(!canNavigate())return;act(async()=>{const message=$('chat').value.trim();if(!message)return;$('chat').value='';if(topic.mode==='apply'&&topic.apply){topic.apply.answer=message;await teach(message,'apply_answer',topic.apply.question);}else await teach(message,topic.mode==='repair'?'repair':'learn',topic.focus??null);});};
function prepare(kind='full',focus=null,parentId=null){
  if(!canNavigate())return;if(!topic)return;if(kind==='partial')focus=repairFocus(focus);pending={kind,focus,parentId};reveal('recording');$('recordTitle').textContent=kind==='partial'?'只讲这一点':'我来讲讲';$('recordFocus').textContent=focus??'用自己的话说明这个概念、条件或过程。';$('recording').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('start').focus();$('timer').textContent='00:00';
}
$('explain').onclick=()=>prepare();$('fullAgain').onclick=()=>prepare('full',null,current?.id);
$('cancelRecord').onclick=()=>{if(!record&&!capturePending)reveal('recording',false);};
function stopRecording(interrupted=false){if(!record)return;record.interrupted ||= interrupted;if(record.recorder.state!=='inactive')record.recorder.stop();}
function resetRecordingUI(){
  delete document.body.dataset.recording;$('start').disabled=false;reveal('start');reveal('finish',false);$('assistance').disabled=false;reveal('materialPanel');reveal('chatForm');document.querySelector('.learning').hidden=false;$('promptView').textContent='';
}
$('finish').onclick=()=>stopRecording();
$('start').onclick=()=>act(async()=>{
  if(record||capturePending||controller||processing||memoryOnly)return notice('请先等当前处理完成。');
  if(!topic||!pending)return;
  const target=topic,plan={...pending},assistance=$('assistance').value;
  const active=()=>topic===target&&!deleted.has(target.id);
  capturePending=true;$('start').disabled=true;let stream,context;
  try{
    // The ledger's unchanged 60-attempt cap applies after valid audio is saved;
    // retained invalid captures are not valid-attempt registrations.
    if(!active())throw new Error('CAPTURE_CANCELLED');
    const attemptId=uid();
    stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1},video:false});
    if(!active())throw new Error('CAPTURE_CANCELLED');
    const type=['audio/webm;codecs=opus','audio/webm'].find(x=>MediaRecorder.isTypeSupported(x));if(!type)throw new Error('RECORDING_FORMAT_UNSUPPORTED');
    context=new AudioContext();await context.resume();const analyser=context.createAnalyser();context.createMediaStreamSource(stream).connect(analyser);
    if(!active())throw new Error('CAPTURE_CANCELLED');
    const recorder=new MediaRecorder(stream,{mimeType:type}),chunks=[];const started=performance.now();
    record={id:attemptId,recorder,stream,context,started,interrupted:false,target,kind:plan.kind,focus:plan.focus,parentId:plan.parentId,assistance};
    const own=record;recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onerror=()=>stopRecording(true);stream.getAudioTracks().forEach(track=>{track.onended=()=>stopRecording(true);track.onmute=()=>stopRecording(true);});
    recorder.onstop=()=>act(async()=>{
      try{
      clearInterval(own.tick);stream.getTracks().forEach(t=>{t.onended=null;t.onmute=null;t.stop();});await context.close();record=null;delete document.body.dataset.recording;
      resetRecordingUI();if(!active())throw new Error('CAPTURE_CANCELLED');
      const audio=new Blob(chunks,{type:recorder.mimeType});if(!audio.size)throw new Error('NO_AUDIO');
      const a={id:own.id,createdAt:Date.now(),kind:own.kind,focus:own.focus,parentId:own.parentId,assistance:own.assistance,source:structuredClone(own.target.source),anchors:structuredClone(own.target.goals),anchorVersion:own.target.anchorVersion??null,audio,captureDuration:Math.min(180,(performance.now()-started)/1000),interrupted:own.interrupted,raw:null,corrections:[],reports:[],status:'SAVED'};
      own.target.attempts.push(a);current=a;
      try{await save();}catch(e){renderAttempt();throw e;}
      reveal('recording',false);renderAttempt();await processAudio(a);
      }finally{record=null;capturePending=false;resetRecordingUI();}
    });
    recorder.start(1000);
    const samples=new Float32Array(analyser.fftSize);own.tick=setInterval(()=>{const seconds=(performance.now()-started)/1000;$('timer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;analyser.getFloatTimeDomainData(samples);$('level').value=Math.min(1,Math.sqrt(samples.reduce((s,x)=>s+x*x,0)/samples.length)*5);if(seconds>=179.5)stopRecording();},100);
    reveal('start',false);reveal('finish');$('assistance').disabled=true;reveal('materialPanel',own.assistance==='source');reveal('chatForm',false);document.querySelector('.learning').hidden=true;$('promptView').textContent=own.assistance==='keywords'?target.goals.map(g=>g.text).join(' · '):'';document.body.dataset.recording='true';$('sourceDetails').open=true;$('finish').focus();notice('正在录音。按“结束讲解”完成本次尝试。');
  }catch(e){clearInterval(record?.tick);record=null;stream?.getTracks().forEach(t=>{t.onended=null;t.onmute=null;t.stop();});try{if(context&&context.state!=='closed')await context.close();}finally{capturePending=false;resetRecordingUI();}notice(e.name==='NotAllowedError'?'麦克风权限未允许。学习内容已保留，请在浏览器中允许麦克风后重试。':friendly(e.message));}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&record)stopRecording(true);});
window.addEventListener('beforeunload',e=>{if(record||capturePending||memoryOnly||controller||processing){e.preventDefault();e.returnValue='';}});
async function processAudio(a){
  if(processing)throw new Error('REQUEST_IN_PROGRESS');if(memoryOnly)throw new Error('STORAGE_FAILED');processing=true;
  notice('原声已保存，正在检查声音并转写……');let context;
  try{
    context=new AudioContext();const decoded=await context.decodeAudioData(await a.audio.arrayBuffer());a.duration=decoded.duration;
    if(a.duration>180||a.duration<=0)throw new Error('DURATION_LIMIT');
    a.observation=observations([decoded.getChannelData(0)],decoded.sampleRate,a.interrupted);
    await save();
    if(a.interrupted||['NEAR_SILENT','CLIPPING'].includes(a.observation.reason)){a.status='SOUND_EVIDENCE_INSUFFICIENT';await save();renderAttempt();return notice('声音证据不足或采集中断。已保留原声，请回听后重新录制。');}
    const offline=new OfflineAudioContext(1,Math.ceil(decoded.duration*16000),16000),source=offline.createBufferSource();source.buffer=decoded;source.connect(offline.destination);source.start();const normalized=await offline.startRendering();
    const wav=waveBytes(normalized.getChannelData(0));
    replayWaves.set(a.audio,new Blob([wav],{type:'audio/wav'}));
    await api('/api/register',{attemptId:a.id});
    const result=await api('/api/asr',wav,{'Content-Type':'audio/wav','X-Attempt-Id':a.id});
    if(deleted.has(a.id)||!topic||deleted.has(topic.id))return;
    a.raw={...result,id:uid(),origin:'ASR',createdAt:Date.now()};a.status='REVIEW_REQUIRED';await save();renderAttempt();notice('转写完成。诊断将使用当前文字；建议回听检查关键字，也可直接确认文字并继续。');
  }catch(e){a.status='PARTIAL';a.error=context?'ASR_OR_DECODE_FAILED':'DECODE_FAILED';try{await save();}catch{}renderAttempt();throw e;}
  finally{processing=false;if(context&&context.state!=='closed')await context.close();}
}
$('retryAsr').onclick=()=>act(()=>{if(!canNavigate())return;return processAudio(current);});
function latest(a){return a.corrections.at(-1)??a.raw;}
function attemptRequest(a){const v=latest(a);return {id:a.id,sourceId:a.source.id,transcriptVersion:v.id,duration:a.duration,spans:v.spans,kind:a.kind,focus:a.focus,assistance:a.assistance,reviewed:v.reviewed===true,interrupted:a.interrupted};}
async function play(start=0,end=current?.duration,onComplete){
  const attempt=current,original=attempt.audio,request=++replayRequest;playEnd?.cancel('superseded');$('player').pause();
  let wav=replayWaves.get(original);
  if(!wav){let context;try{
    context=new AudioContext();const decoded=await context.decodeAudioData(await original.arrayBuffer());
    const offline=new OfflineAudioContext(1,Math.ceil(decoded.duration*16000),16000),source=offline.createBufferSource();source.buffer=decoded;source.connect(offline.destination);source.start();
    const normalized=await offline.startRendering();wav=new Blob([waveBytes(normalized.getChannelData(0))],{type:'audio/wav'});replayWaves.set(original,wav);
  }finally{if(context&&context.state!=='closed')await context.close();}}
  if(request!==replayRequest||current!==attempt||deleted.has(attempt.id))return;
  if(replayOriginal!==original){if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(wav);$('player').src=blobURL;replayOriginal=original;}
  const player=$('player');if(player.readyState===0)await new Promise((resolve,reject)=>{
    const done=()=>{player.removeEventListener('loadedmetadata',loaded);player.removeEventListener('error',failed);};
    const loaded=()=>{done();resolve();},failed=()=>{done();reject(new Error('REPLAY_LOAD_FAILED'));};
    player.addEventListener('loadedmetadata',loaded);player.addEventListener('error',failed);
  });
  if(request!==replayRequest||current!==attempt||deleted.has(attempt.id))return;
  return playPrepared(start,end,onComplete);
}
function playPrepared(start,end,onComplete){
  const player=$('player'),attempt=current,source=blobURL;playEnd?.cancel('superseded');player.pause();player.currentTime=start;
  let started=false,last=start,covered=0;
  const observer=globalThis.__studyReplayObserver,invocationId=observer?.nextId?.();
  const observe=(event,details={})=>{if(typeof observer!=='function')return;try{observer({invocationId,event,start,end,started,last,covered,currentTime:player.currentTime,duration:player.duration,played:Array.from({length:player.played.length},(_,i)=>[player.played.start(i),player.played.end(i)]),genuine:null,active:active(),attemptMatches:current===attempt,blobMatches:blobURL===source,seeking:player.seeking,cancelReason:null,completionReason:null,...details});}catch{}};
  const handlers={},state={cancel(reason){observe('cancel',{cancelReason:reason});for(const [type,fn] of Object.entries(handlers))player.removeEventListener(type,fn);if(playEnd===state)playEnd=null;}};playEnd=state;
  const active=()=>playEnd===state&&current===attempt&&blobURL===source;
  handlers.seeking=()=>{observe('seeking');if(started)state.cancel('seek-after-start');};
  handlers.emptied=()=>state.cancel('emptied');handlers.error=()=>state.cancel('media-error');
  handlers.timeupdate=handlers.ended=event=>{
    observe(event?.type??'progress');
    if(!active()||!started||player.seeking){observe('ignored-progress');return;}
    const now=player.currentTime;
    // Native played ranges distinguish actual media coverage from event cadence.
    // Any seek after startup invalidates this invocation, including old played ranges.
    let genuine=false;for(let i=0;i<player.played.length;i++)if(player.played.start(i)<=last&&player.played.end(i)>=now)genuine=true;
    observe('continuity',{genuine});if(now<last||!genuine){state.cancel(now<last?'backward-progress':'no-native-continuity');return;}
    covered+=Math.max(0,Math.min(now,end)-Math.max(last,start));last=now;observe('coverage',{genuine,completionEligible:now>=end-.05&&covered>0&&covered>=Math.max(0,end-start-.3)});
    if(now>=end-.05){const complete=covered>0&&covered>=Math.max(0,end-start-.3);observe('endpoint',{genuine,completionEligible:complete,completionReason:complete?'genuine-coverage':'insufficient-coverage'});state.cancel(complete?'complete':'insufficient-coverage');player.pause();if(complete)onComplete?.();}
  };
  for(const [type,fn] of Object.entries(handlers))player.addEventListener(type,fn);
  observe('play-request');return player.play().then(()=>{observe('play-resolved');if(active()){if(player.currentTime>start+.05||player.seeking){state.cancel('invalid-start-position');return;}started=true;observe('started');}},error=>{state.cancel('play-rejected');throw error;});
}
function diagnosisView(a){
  const versions=[a.raw,...a.corrections],draft=a.raw.spans.map(s=>editors.get(s.id)?.value??latest(a).spans.find(v=>v.id===s.id).text);
  const same=v=>v&&v.spans.length===draft.length&&v.spans.every((s,i)=>s.text===draft[i]);
  const reports=a.reports.filter(r=>r.channel==='content');
  const matching=reports.slice().reverse().find(r=>same(versions.find(v=>v.id===r.transcriptVersion)));
  const report=matching??reports.at(-1),version=report&&versions.find(v=>v.id===report.transcriptVersion);
  return {draft,report,version,current:!!matching,changed:!same(latest(a)),...(diagnosisStates.get(a)??{})};
}
function focusDiagnosis(){const heading=$('contentHeading');heading.focus();heading.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
function updateDiagnosisState(){
  const a=current;if(!a?.raw)return;const v=diagnosisView(a);
  $('confirm').disabled=!!v.pending||!!v.saveFailed;for(const e of editors.values())e.readOnly=!!v.pending;
  $('confirm').textContent=v.pending?'诊断中…':v.current?'查看当前诊断结果':v.changed?'确认修改并重新诊断':v.error?'确认当前文字并再次诊断':'确认使用当前文字，开始诊断';
  const binding=v.version?'版本 '+v.version.id.slice(0,8)+' · '+new Date(v.report.createdAt).toLocaleString():'';
  $('diagnosisState').textContent=v.pending?'当前文字已确认，正在诊断…':v.error?v.error:v.current?'诊断完成 · '+binding:v.report?'文字已修改，先前结果已过时 · '+binding:'当前文字待确认；回听可选。';
  $('resultBinding').textContent=v.report?(v.pending?'先前结果（新诊断进行中）':v.current?'当前结果':'先前结果，仅供查看，不适用于当前文字')+' · '+binding:'';
  $('feedback').replaceChildren();if(v.report&&v.version)renderFeedback(v.report,{version:v.version,stale:!v.current||!!v.pending});
}
function renderAttempt(){
  if(!current)return;const a=current;editors.clear();reveal('attemptPanel');$('attemptKind').textContent=a.kind==='partial'?'局部新录音':'完整录音';
  replayRequest++;replayOriginal=null;if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(a.audio);$('player').src=blobURL;
  $('audioStatus').textContent=`${a.duration?`${a.duration.toFixed(1)} 秒 · `:''}${a.interrupted?'采集中断 · ':''}${a.observation?.reason??'尚未完成声音检查'}。仅候选观测，非流利度评分。`;
  $('rawText').textContent=a.raw?.text??'尚未取得转写';$('transcript').replaceChildren();$('feedback').replaceChildren();$('observations').replaceChildren();$('processFeedback').replaceChildren();
  reveal('retryAsr',!a.raw&&!a.interrupted);reveal('confirm',!!a.raw);reveal('reviewHint',!!a.raw);reveal('diagnosisState',!!a.raw);reveal('resultBinding',!!a.raw);
  if(a.raw){$('reviewHint').textContent=(a.raw.wordTiming?.status==='PARTIAL'?'词级定位部分不可用。':'')+'诊断使用当前转写。ASR 可能误听否定词、数字、条件和术语；建议回听或修改后继续，逐段回听不是必需步骤。';const v=latest(a);v.spans.forEach(s=>{const row=el('div',undefined,'spanRow'),editor=el('textarea');editor.setAttribute('aria-label',`核对文字 ${s.start.toFixed(1)} 至 ${s.end.toFixed(1)} 秒`);editor.value=s.text;editor.rows=2;editor.maxLength=2000;editor.oninput=()=>{const state=diagnosisStates.get(a);if(state&&!state.pending&&!state.saveFailed)diagnosisStates.delete(a);updateDiagnosisState();};editors.set(s.id,editor);const b=button(`可选回听 ${s.start.toFixed(1)}–${s.end.toFixed(1)} 秒`,()=>play(s.start,s.end,()=>{b.textContent='本次页面已播放 ✓';}));row.append(b,editor);$('transcript').append(row);});
    if(v.reviewed)$('reviewHint').textContent+=' 已保存用于诊断的文字确认；这不表示音频已回听。修改后可再次确认，不会创建新口头表现。';
    for(const report of a.reports.filter(r=>r.transcriptVersion===v.id)){
      if(report.channel==='delivery')$('processFeedback').append(el('p','历史过程报告（旧格式，未作为定位证据）','muted'),...report.findings.map(f=>el('p',f.message)));
    }
    renderProcess(a);updateDiagnosisState();
  }
  const events=a.observation?.events??[];
  // Keep the eight-row limit without starving either detector type. Preserve IDs
  // and stored order; reserve up to four per type, then fill spare rows by time.
  const ordered=events.slice().sort((x,y)=>x.start-y.start);
  const visible=['near_silence_candidate','short_pause_cluster_candidate'].flatMap(type=>ordered.filter(e=>e.type===type).slice(0,4));
  for(const event of ordered)if(visible.length<8&&!visible.includes(event))visible.push(event);
  visible.sort((x,y)=>x.start-y.start);
  if(events.length&&a.raw){$('observations').append(el('p',`以下是本地低能量间隔候选，不能识别“额/嗯”，也不代表不理解。回听并核对转写后可确认保存；不会为此调用模型。显示 ${visible.length} / ${events.length} 条候选。`,'muted'));visible.forEach(event=>{const row=el('div'),b=button(`回听候选（${event.type==='short_pause_cluster_candidate'?'短间隔聚集':'近静音'}） ${event.start.toFixed(1)}–${event.end.toFixed(1)} 秒`,()=>play(Math.max(0,event.start-.5),Math.min(a.duration,event.end+.5),()=>{event.heard=true;b.textContent='候选已回听 ✓';}));const c=button('确认并保存过程证据',()=>confirmProcess(a,event));row.append(b,c);$('observations').append(row);});}
}
function processFor(a){return a.reports.filter(r=>r.channel==='process'&&r.transcriptVersion===latest(a).id).flatMap(r=>r.processEvidence);}
async function confirmProcess(a,event){
  if(!canNavigate())return;
  const target=topic;if(current!==a||!target?.attempts.includes(a)||deleted.has(a.id))throw new Error('INVALID_REFERENCE');
  const evidence=confirmLocalProcess(attemptRequest(a),event,a.observation?.events??[]);
  if(!processFor(a).some(e=>e.id===evidence.id))a.reports.push({channel:'process',attemptId:a.id,transcriptVersion:evidence.transcriptVersion,processEvidence:[evidence],createdAt:Date.now()});
  processing=true;
  try{await save();if(topic===target&&!deleted.has(a.id)){renderAttempt();notice('过程证据已在本机保存，未调用模型；它本身不表示理解有误。');}}finally{processing=false;}
}
function renderProcess(a){
  let evidence;try{evidence=processEvidence(processFor(a),attemptRequest(a),a.observation?.events??[]);}catch{ $('processFeedback').append(el('p','过程证据引用无法核对，未用于定位。','muted'));return; }
  const labels={near_silence:'近静音',short_pause_cluster:'短低能量间隔聚集',restart:'重新起句',self_repair:'明确自我修正',repetition:'重复',coarse_segment:'粗粒度分段'};
  for(const e of evidence){
    const card=el('article',undefined,'processObservation');card.dataset.evidenceId=e.id;
    card.append(el('strong',labels[e.type]),el('p',e.origin==='fixture'?'预标注示例，不代表已有检测器。':e.confirmation==='human_confirmed'?'本地候选，已回听确认。':'本地候选，尚未确认。'),el('p','这是讲解过程观察，不是知识判断。','muted'));
    if(e.quote!==null)card.append(el('blockquote',e.quote));
    const span=e.spanId&&latest(a).spans.find(s=>s.id===e.spanId),start=e.start??span?.start,end=e.end??span?.end;
    if(start!==undefined)card.append(button(`回听过程 ${start.toFixed(1)}–${end.toFixed(1)} 秒`,()=>play(start,end)));
    $('processFeedback').append(card);
  }
}
$('confirm').onclick=()=>act(async()=>{
  if(record||capturePending||controller||processing)throw new Error('REQUEST_IN_PROGRESS');
  const a=current;if(!a?.raw)return;const view=diagnosisView(a);
  if(view.saveFailed)throw new Error('STORAGE_FAILED');
  if(view.current){updateDiagnosisState();focusDiagnosis();return;}
  processing=true;diagnosisStates.set(a,{pending:true});updateDiagnosisState();let complete=false;
  try{
    const corrected=revisedTranscript(a,view.draft.map(text=>({text})));a.corrections.push(corrected);await save();await diagnose(a);complete=true;
  }catch(e){diagnosisStates.set(a,{saveFailed:e.message==='STORAGE_FAILED',error:e.message==='STORAGE_FAILED'?'本机保存失败；请重试保存或导出，不要重新提交诊断。':'本次诊断未完成或结果未知；先前结果已保留，不会自动重试。'});throw e;}
  finally{processing=false;const state=diagnosisStates.get(a);if(state?.pending)diagnosisStates.delete(a);if(current===a){updateDiagnosisState();if(complete)focusDiagnosis();}}
});
async function diagnose(a){
  const channel='content',events=[],request=attemptRequest(a);notice('正在核对内容和逻辑……');
  const result=await api('/api/diagnose',{source:a.source,attempt:request,channel,events});
  if(deleted.has(a.id)||!topic||deleted.has(topic.id))return;
  validateFindings(result.value,a.source,request,channel,events);a.reports.push({...result.value,channel,createdAt:Date.now()});a.status='DIAGNOSED';await save();renderAttempt();notice('内容反馈已关联原声。过程候选需另行回听确认，确认后会在本机核对同段关联，不调用模型。');
}
function renderFeedback(report,{version=latest(current),stale=false}={}){
  if(report.channel!=='content')return;
  if(!version.reviewed||current.interrupted){$('feedback').append(el('p','先确认用于诊断的转写，再查看内容定位。','muted'));return;}
  let targets=[];try{const {sourceId,attemptId,transcriptVersion,findings}=report;targets=localize({source:current.source,attempt:{...attemptRequest(current),transcriptVersion:version.id,spans:version.spans,reviewed:version.reviewed===true},report:{sourceId,attemptId,transcriptVersion,findings},evidence:(current.reports??[]).filter(r=>r.channel==='process'&&r.transcriptVersion===version.id).flatMap(r=>r.processEvidence),events:current.observation?.events??[]}).diagnosticTargets;}catch{ $('feedback').append(el('p','该反馈尚未通过当前来源／转写校验，不生成定位建议。','muted')); }
  if(!report.findings.length)$('feedback').append(el('p','本次没有足够证据生成此类反馈。'));
  const labels={supported:'已表达',missing:'本次尚未表达',incorrect:'需要澄清',unknown:'证据不足'},order={incorrect:0,missing:1,unknown:2,supported:3};
  const overview=el('div',undefined,'feedback-overview');
  for(const status of ['incorrect','missing','unknown','supported']){const count=report.findings.filter(f=>f.status===status).length;if(count)overview.append(el('span',`${labels[status]} ${count}`));}
  $('feedback').append(overview);
  // Keep the original finding index for evidence IDs while grouping by status.
  for(const [index,f] of [...report.findings.entries()].sort((a,b)=>order[a[1].status]-order[b[1].status])){const card=el('article',undefined,'finding');card.dataset.status=f.status;card.append(el('strong',labels[f.status]),el('p',f.message));
    const evidence=el('details');evidence.append(el('summary','查看材料与原话'),el('blockquote',`材料：${f.sourceQuote}`));
    if(f.spanId){const span=version.spans.find(s=>s.id===f.spanId);evidence.append(el('blockquote',`本次原话：${f.quote}`),button('回听对应原声',()=>play(span.start,span.end)));}else evidence.append(el('p','未表达内容没有可对应的音频时间点。','muted'));
    card.append(evidence);
    const target=targets.find(t=>t.contentFindingIds.includes(`content:${current.id}:${report.transcriptVersion}:${index}`));
    if(target&&!stale){card.dataset.targetId=target.id;card.append(el('p',`值得核对的关系：${target.focus}`,'diagnosticTarget'));
      if(target.processEvidenceIds.length)card.append(el('p',`另有 ${target.processEvidenceIds.length} 条同段过程观察，见“讲解过程”；时间相邻不证明理解有误。`,'muted'));
      card.append(button('再学这一点',async()=>{topic.focus=target.focus;await teach('请针对这一点帮助我理解，不要直接给整篇背诵稿。','repair',target.focus,{internalStarter:true});$('messages').scrollIntoView({behavior:'smooth'});}),button('再讲这一点',()=>prepare('partial',target.focus,current.id)));}
    $('feedback').append(card);
  }
}
$('apply').onclick=()=>act(()=>teach('给我一个新的、相关的应用情境，不要先公布答案。','apply',null,{internalStarter:true}));
async function exportTopic(){
  if(!topic)return;const data=structuredClone(topic);for(const a of data.attempts){const bytes=new Uint8Array(await a.audio.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));a.audio={mime:a.audio.type,base64:btoa(binary)};}
  const url=URL.createObjectURL(new Blob([JSON.stringify({format:'study-teachback-export-v1',exportedAt:new Date().toISOString(),notice:'导出副本不受应用内删除控制',topic:data},null,2)],{type:'application/json'}));const link=el('a');link.href=url;link.download=`study-${topic.id}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
$('export').onclick=()=>act(exportTopic);
$('recoveryExport').onclick=()=>act(exportTopic);
$('retrySave').onclick=()=>act(async()=>{await save();if(current){diagnosisStates.delete(current);renderAttempt();}notice('已重新保存到本机。');});
function abortPending(){controller?.abort();}
$('deleteAttempt').onclick=()=>act(async()=>{if(!current)return;abortPending();deleted.add(current.id);topic.attempts=topic.attempts.filter(a=>a.id!==current.id);await save();$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);current=null;reveal('attemptPanel',false);notice('这次原声及其关联转写、纠正和反馈已从本地删除。已导出副本和已在途的云请求不受此操作控制。');});
async function history(){if(memoryOnly)throw new Error('STORAGE_FAILED');if(processing)throw new Error('REQUEST_IN_PROGRESS');if(record)throw new Error('RECORDING_ACTIVE');if(controller)throw new Error('REQUEST_IN_PROGRESS');reveal('history');const list=$('historyList');list.replaceChildren();for(const t of await db.all()){const row=el('div');row.append(el('strong',t.source.title),el('p',`${new Date(t.createdAt).toLocaleString()} · ${t.attempts.length} 次讲解`,'muted'),button('继续学习',()=>{if(!canNavigate())return;topic=t;current=null;renderTopic();reveal('attemptPanel',false);reveal('history',false);}));for(const a of t.attempts)row.append(button(`${a.kind==='partial'?'局部':'完整'} · ${new Date(a.createdAt).toLocaleTimeString()}`,()=>{if(!canNavigate())return;topic=t;current=a;renderTopic();renderAttempt();reveal('history',false);}));row.append(button('删除主题',async()=>{abortPending();deleted.add(t.id);await db.delete(t.id);if(topic?.id===t.id){topic=null;current=null;$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);reveal('workspace',false);reveal('dock',false);reveal('setup');}await history();},'danger'));list.append(row);}if(!list.children.length)list.append(el('p','还没有保存的学习记录。'));$('history').scrollIntoView({behavior:'smooth'});}
$('historyButton').onclick=()=>act(history);
function canNavigate(){if(memoryOnly){notice(friendly('STORAGE_FAILED'));return false;}if(record||capturePending||controller||processing||importPending){notice(friendly('REQUEST_IN_PROGRESS'));return false;}return true;}
function newTopic(){if(importPending)return false;if(!canNavigate())return false;abortPending();clearImport();topic=null;current=null;reveal('workspace',false);reveal('dock',false);reveal('history',false);reveal('recording',false);reveal('attemptPanel',false);reveal('setup');$('title').value='';$('source').value='';$('setupFocus').value='';$('setupKnown').value='';updateCounts();notice('');$('source').focus();return true;}
$('newTopic').onclick=newTopic;$('revise').onclick=()=>{const s=topic.source,context=topic.setupContext;if(!newTopic())return;$('setupFocus').value=context?.focus??'';$('setupKnown').value=context?.known??'';$('title').value=s.title;$('source').value=s.text;updateCounts();notice('新版材料将建立新的学习记录；旧来源、标准和讲解保留。');};
$('deleteAll').onclick=()=>act(async()=>{if(record)throw new Error('RECORDING_ACTIVE');abortPending();for(const t of await db.all())deleted.add(t.id);await db.clear();if(topic)deleted.add(topic.id);topic=null;current=null;memoryOnly=false;reveal('storageRecovery',false);$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);reveal('workspace',false);reveal('dock',false);reveal('history',false);reveal('setup');reveal('attemptPanel',false);notice('全部本地学习对象已删除。费用账本不含正文，独立保留以防重置预算。导出副本不受此操作控制。');});
// Presentation-only confirmation: cancellation never reaches the original destructive handler.
function confirmDelete(scope,action,trigger){
  if(record||capturePending||processing){notice(friendly('REQUEST_IN_PROGRESS'));return;}
  const dialog=$('deleteDialog');if(dialog.open)return;
  $('deleteScope').textContent=scope;dialog.returnValue='';
  const restore=()=>{const target=trigger?.isConnected&&trigger.getClientRects().length?trigger:!$('history').hidden?$('historyTitle'):$('source');target.focus();};
  $('deleteCancel').onclick=()=>dialog.close('cancel');
  $('deleteConfirm').onclick=()=>{dialog.onclose=null;dialog.close('confirm');act(async()=>{await action.call(trigger);restore();});};
  dialog.onclose=()=>{dialog.onclose=null;restore();};
  dialog.showModal();$('deleteCancel').focus();
}
for(const [id,scope] of [['deleteAttempt','只删除当前这次讲解的原声、转写、更正和反馈；保留主题及其他讲解。'],['deleteAll','删除此浏览器内全部主题、讲解、原声、转写和反馈。']]){
  const original=$(id).onclick;$(id).onclick=()=>confirmDelete(scope,original,$(id));
}
const narrow=matchMedia('(max-width:760px)');$('sourceDetails').open=!narrow.matches;
narrow.addEventListener('change',()=>{if(!record)$('sourceDetails').open=!narrow.matches;});
for(const link of document.querySelectorAll('a[href="/demo"]'))link.onclick=e=>{if(!canNavigate())e.preventDefault();};
await act(async()=>{db=await openStore();await updateBudget();const all=await db.all();if(all.length){topic=all.at(-1);renderTopic();}});
