import { observations, waveBytes, revisedTranscript, validateFindings, remediationFocus, repairFocus } from './core.mjs';
import { openStore } from './storage.mjs';
const $=id=>document.getElementById(id), uid=()=>crypto.randomUUID();
let db,topic=null,current=null,pending=null,controller=null,record=null,blobURL=null,playEnd=null,deleted=new Set(),memoryOnly=false,processing=false;
const heard=new Set(),editors=new Map();
const notice=message=>{$('notice').textContent=message;};
const reveal=(id,show=true)=>{$(id).hidden=!show;};
function el(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
function button(label,fn,cls='quiet'){const b=el('button',label,cls);b.onclick=()=>label==='删除主题'?confirmDelete('删除这个主题及其全部讲解、原声、转写和反馈。',fn,b):act(fn);return b;}
async function act(fn){try{await fn();}catch(e){notice(friendly(e.message));}}
function friendly(code){const messages={EXTRACTOR_SETUP_REQUIRED:'本机文档提取环境未配置，请按 README 完成产品 Python 环境设置。材料没有发送给模型。',EXTRACTOR_DEPENDENCY_REQUIRED:'本机文档提取依赖缺失或版本不符，请按 README 安装指定版本 pypdf。材料没有发送给模型。',FILE_TOO_LARGE:'文件超过 10 MB，请选择更小的材料。',TEXT_ENCODING_UNSUPPORTED:'文本编码不受支持，请另存为 UTF-8 或 UTF-16。',NO_EXTRACTABLE_TEXT:'未提取到文字；扫描 PDF/图片需要先转换为可选取文本。本应用不执行 OCR。',INVALID_DOCUMENT:'文件无法安全解析，请检查格式或复制文字。',DOCUMENT_LIMIT:'材料超过本次提取限制，请拆分文档。',ENCRYPTED_DOCUMENT:'不支持加密文件，请使用未加密的低风险材料。',EXTRACTION_TIMEOUT:'本机提取超时，请缩小文件。',ASR_REVIEW_REQUIRED:'请先回听并确认转写，尤其是否定词、数字、条件和术语。',BUDGET_STOP:'本次 API 预算已达到停止条件。原始讲解已保留。',ATTEMPT_LIMIT:'本次讲解的转写次数或总次数已达上限。原始讲解仍可回放。',CREDENTIAL_MISSING:'服务端尚未配置 API 凭据；请由开发者配置，学习数据仍保留。',REQUEST_IN_PROGRESS:'上一个请求仍在完成，请稍后再试。',NOT_HEARD:'请逐段完整回听后再确认。',STORAGE_FAILED:'本机存储失败，当前内容仅在此页内存中。请立即导出或重试保存，不要关闭页面。',NO_AUDIO:'没有收到可用录音，请检查麦克风。',SOUND_EVIDENCE_INSUFFICIENT:'声音证据不足，保留原声供回听。'};return messages[code]??`处理未完成（${/^[A-Z0-9_]+$/.test(code)?code:'LOCAL_ERROR'}）。原始学习记录不会因此删除。`;}
async function save(){if(!topic||deleted.has(topic.id))return;try{await db.put(topic);memoryOnly=false;reveal('storageRecovery',false);}catch{memoryOnly=true;reveal('storageRecovery');throw new Error('STORAGE_FAILED');}}
async function api(path,body,headers={}){
  if(controller||record)throw new Error('REQUEST_IN_PROGRESS');
  controller=new AbortController();$('send').disabled=true;$('explain').disabled=true;$('workspace').setAttribute('aria-busy','true');
  try{const response=await fetch(path,{method:'POST',headers:{'X-Study-Request':'1',...headers,...(body instanceof ArrayBuffer?{}:{'Content-Type':'application/json'})},body:body instanceof ArrayBuffer?body:JSON.stringify(body),signal:controller.signal});const result=await response.json();if(!response.ok)throw new Error(result.error);return result;}
  finally{controller=null;$('send').disabled=false;$('explain').disabled=false;$('workspace').removeAttribute('aria-busy');updateBudget();}
}
async function updateBudget(){try{const s=await(await fetch('/api/status')).json();$('budget').textContent=`本次账本：${s.ledger.requests} 次请求；已知费用估算 $${s.ledger.knownCostUSD.toFixed(6)}；含未结算预留 $${s.ledger.exposureUSD.toFixed(6)} / $5。现金新增上限 $10，不自动充值。`; }catch{}}
function renderTopic(){
  reveal('setup',false);reveal('workspace');reveal('dock');$('topicTitle').textContent=topic.source.title;$('sourceText').textContent=topic.source.text;
  $('goals').replaceChildren(...(topic.goals??[]).map(g=>el('li',g.text)));
  $('messages').replaceChildren(...topic.messages.map(m=>el('div',m.text,`message ${m.role}`)));$('messages').scrollTop=$('messages').scrollHeight;
  $('question').textContent=topic.question??'';$('phase').textContent=topic.mode==='apply'||topic.mode==='apply_answer'?'APPLY · 换个情境试试':topic.mode==='repair'?'REPAIR · 再学这一点':'LEARN · 一起学';
}
async function teach(message,mode='learn',focus=null){
  if(record||controller||processing)throw new Error('REQUEST_IN_PROGRESS');
  if(mode==='repair')focus=repairFocus(focus);
  const target=topic;target.messages.push({role:'user',text:message});target.mode=mode;await save();renderTopic();notice('正在一起梳理这段材料……');
  try{const r=await api('/api/teach',{source:target.source,mode,message,focus,history:target.messages.slice(0,-1)});
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
function clearImport(){ $('selectionCount').textContent='已选 0 字';$('sourceFile').value='';$('extractedText').value='';$('importStatus').textContent='';reveal('importPreview',false); }
$('clearImport').onclick=clearImport;
$('sourceFile').onchange=()=>act(async()=>{
  const file=$('sourceFile').files[0];if(!file)return;
  if(controller||importPending)return notice('请先等当前处理完成。');
  clearImport();importPending=true;$('learn').disabled=true;$('sourceFile').disabled=true;
  try{
    if(file.size>10*1024*1024)throw new Error('FILE_TOO_LARGE');
    notice('正在本机提取材料……');
    const result=await api('/api/extract',await file.arrayBuffer(),{'X-Source-Format':file.name.split('.').pop().toLowerCase()});
    $('extractedText').value=result.blocks.map(b=>b.text).join('\n\n');
    $('importStatus').textContent=`已提取 ${result.blocks.length} 个正文/页面/幻灯片区块。请核对顺序和空白页；选中所需文字后使用，尚未发送给模型。`;
    if(!$('title').value.trim())$('title').value=file.name.replace(/\.[^.]+$/,'').slice(0,120);
    reveal('importPreview');notice('请预览并选择这一轮要学习的文字。');
  }finally{importPending=false;$('learn').disabled=false;$('sourceFile').disabled=false;}
});
function useImported(all){
  const preview=$('extractedText');const selected=(all?preview.value:preview.value.slice(preview.selectionStart,preview.selectionEnd)).trim();
  if(!selected)return notice('请先在预览中选中文字。');
  if(selected.length>5000)return notice('这一轮最多 5,000 字，请缩小选段；不会自动截断材料。');
  $('source').value=selected;updateCounts();notice('选段已放入学习材料。可继续编辑，点击“开始一起学”才会发送给模型。');
}
$('useSelection').onclick=()=>useImported(false);$('useAll').onclick=()=>useImported(true);
$('learn').onclick=()=>act(async()=>{
  if(importPending||controller)return;
  if(!$('title').value.trim()||!$('source').value.trim())return notice('先写一个主题，再放入这一轮的有限材料。');
  clearImport();
  topic={id:uid(),createdAt:Date.now(),source:{id:uid(),title:$('title').value.trim(),text:$('source').value.trim()},goals:[],messages:[],attempts:[],mode:'learn'};await save();renderTopic();await teach('请先帮我理解这段材料，从核心关系开始，问我一个简短问题。');
});
$('chatForm').onsubmit=e=>{e.preventDefault();if(!canNavigate())return;act(async()=>{const message=$('chat').value.trim();if(!message)return;$('chat').value='';if(topic.mode==='apply'&&topic.apply){topic.apply.answer=message;await teach(message,'apply_answer',topic.apply.question);}else await teach(message,topic.mode==='repair'?'repair':'learn',topic.focus??null);});};
function prepare(kind='full',focus=null,parentId=null){
  if(!canNavigate())return;if(!topic)return;if(kind==='partial')focus=repairFocus(focus);pending={kind,focus,parentId};reveal('recording');$('recordTitle').textContent=kind==='partial'?'只讲这一点':'我来讲讲';$('recordFocus').textContent=focus??'用自己的话说明这个概念、条件或过程。';$('recording').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('start').focus();$('timer').textContent='00:00';
}
$('explain').onclick=()=>prepare();$('fullAgain').onclick=()=>prepare('full',null,current?.id);
$('cancelRecord').onclick=()=>{if(!record)reveal('recording',false);};
function stopRecording(interrupted=false){if(!record)return;record.interrupted ||= interrupted;if(record.recorder.state!=='inactive')record.recorder.stop();}
$('finish').onclick=()=>stopRecording();
$('start').onclick=()=>act(async()=>{
  if(record||controller||processing||memoryOnly)return notice('请先等当前处理完成。');
  $('start').disabled=true;let stream,context;
  try{
    const all=await db.all();if(all.reduce((n,t)=>n+t.attempts.length,0)>=60)throw new Error('ATTEMPT_LIMIT');
    const attemptId=uid();await api('/api/register',{attemptId});
    stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1},video:false});
    const type=['audio/webm;codecs=opus','audio/webm'].find(x=>MediaRecorder.isTypeSupported(x));if(!type)throw new Error('RECORDING_FORMAT_UNSUPPORTED');
    context=new AudioContext();await context.resume();const analyser=context.createAnalyser();context.createMediaStreamSource(stream).connect(analyser);
    const recorder=new MediaRecorder(stream,{mimeType:type}),chunks=[];const started=performance.now();
    record={id:attemptId,recorder,stream,context,started,interrupted:false,target:topic,kind:pending.kind,focus:pending.focus,parentId:pending.parentId,assistance:$('assistance').value};
    const own=record;recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onerror=()=>stopRecording(true);stream.getAudioTracks().forEach(track=>{track.onended=()=>stopRecording(true);track.onmute=()=>stopRecording(true);});
    recorder.onstop=()=>act(async()=>{
      clearInterval(own.tick);stream.getTracks().forEach(t=>{t.onended=null;t.onmute=null;t.stop();});await context.close();record=null;delete document.body.dataset.recording;
      $('start').disabled=false;reveal('start');reveal('finish',false);$('assistance').disabled=false;reveal('materialPanel');reveal('chatForm');document.querySelector('.learning').hidden=false;$('promptView').textContent='';
      const audio=new Blob(chunks,{type:recorder.mimeType});if(!audio.size)throw new Error('NO_AUDIO');
      const a={id:own.id,createdAt:Date.now(),kind:own.kind,focus:own.focus,parentId:own.parentId,assistance:own.assistance,source:structuredClone(own.target.source),anchors:structuredClone(own.target.goals),anchorVersion:own.target.anchorVersion??null,audio,captureDuration:Math.min(180,(performance.now()-started)/1000),interrupted:own.interrupted,raw:null,corrections:[],reports:[],status:'SAVED'};
      own.target.attempts.push(a);current=a;
      try{await save();}catch(e){renderAttempt();throw e;}
      reveal('recording',false);renderAttempt();await processAudio(a);
    });
    const samples=new Float32Array(analyser.fftSize);own.tick=setInterval(()=>{const seconds=(performance.now()-started)/1000;$('timer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;analyser.getFloatTimeDomainData(samples);$('level').value=Math.min(1,Math.sqrt(samples.reduce((s,x)=>s+x*x,0)/samples.length)*5);if(seconds>=179.5)stopRecording();},100);
    reveal('start',false);reveal('finish');$('assistance').disabled=true;reveal('materialPanel',own.assistance==='source');reveal('chatForm',false);document.querySelector('.learning').hidden=true;$('promptView').textContent=own.assistance==='keywords'?topic.goals.map(g=>g.text).join(' · '):'';document.body.dataset.recording='true';$('sourceDetails').open=true;recorder.start(1000);$('finish').focus();notice('正在录音。按“结束讲解”完成本次尝试。');
  }catch(e){stream?.getTracks().forEach(t=>t.stop());if(context&&context.state!=='closed')await context.close();record=null;$('start').disabled=false;notice(e.name==='NotAllowedError'?'麦克风权限未允许。学习内容已保留，请在浏览器中允许麦克风后重试。':friendly(e.message));}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&record)stopRecording(true);});
window.addEventListener('beforeunload',e=>{if(record||memoryOnly||controller||processing){e.preventDefault();e.returnValue='';}});
async function processAudio(a){
  if(processing)throw new Error('REQUEST_IN_PROGRESS');processing=true;
  notice('原声已保存，正在检查声音并转写……');let context;
  try{
    context=new AudioContext();const decoded=await context.decodeAudioData(await a.audio.arrayBuffer());a.duration=decoded.duration;
    if(a.duration>180||a.duration<=0)throw new Error('DURATION_LIMIT');
    a.observation=observations([decoded.getChannelData(0)],decoded.sampleRate,a.interrupted);
    await save();
    if(a.interrupted||['NEAR_SILENT','CLIPPING'].includes(a.observation.reason)){a.status='SOUND_EVIDENCE_INSUFFICIENT';await save();renderAttempt();return notice('声音证据不足或采集中断。已保留原声，请回听后重新录制。');}
    const offline=new OfflineAudioContext(1,Math.ceil(decoded.duration*16000),16000),source=offline.createBufferSource();source.buffer=decoded;source.connect(offline.destination);source.start();const normalized=await offline.startRendering();
    const wav=waveBytes(normalized.getChannelData(0));
    const result=await api('/api/asr',wav,{'Content-Type':'audio/wav','X-Attempt-Id':a.id});
    if(deleted.has(a.id)||!topic||deleted.has(topic.id))return;
    a.raw={...result,id:uid(),origin:'ASR',createdAt:Date.now()};a.status='REVIEW_REQUIRED';await save();renderAttempt();notice('转写完成。请逐段回听，检查关键字后再开始诊断。');
  }catch(e){a.status='PARTIAL';a.error=context?'ASR_OR_DECODE_FAILED':'DECODE_FAILED';try{await save();}catch{}renderAttempt();throw e;}
  finally{processing=false;if(context&&context.state!=='closed')await context.close();}
}
$('retryAsr').onclick=()=>act(()=>processAudio(current));
function latest(a){return a.corrections.at(-1)??a.raw;}
function attemptRequest(a){const v=latest(a);return {id:a.id,sourceId:a.source.id,transcriptVersion:v.id,duration:a.duration,spans:v.spans,kind:a.kind,focus:a.focus,assistance:a.assistance,reviewed:v.reviewed===true,interrupted:a.interrupted};}
function play(start=0,end=current?.duration,onComplete){
  const player=$('player');player.currentTime=start;let last=start,covered=0;playEnd={end,onComplete,start};
  player.ontimeupdate=()=>{const now=player.currentTime;if(!player.paused && now>=last && now-last<1)covered+=now-last;last=now;if(now>=end-.05){player.pause();player.ontimeupdate=null;if(covered>=Math.max(0,end-start-.3))onComplete?.();}};return player.play();
}
function renderAttempt(){
  if(!current)return;const a=current;heard.clear();editors.clear();reveal('attemptPanel');$('attemptKind').textContent=a.kind==='partial'?'局部新录音':'完整录音';
  if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(a.audio);$('player').src=blobURL;
  $('audioStatus').textContent=`${a.duration?`${a.duration.toFixed(1)} 秒 · `:''}${a.interrupted?'采集中断 · ':''}${a.observation?.reason??'尚未完成声音检查'}。仅候选观测，非流利度评分。`;
  $('rawText').textContent=a.raw?.text??'尚未取得转写';$('transcript').replaceChildren();$('feedback').replaceChildren();$('observations').replaceChildren();
  reveal('retryAsr',!a.raw&&!a.interrupted);reveal('confirm',!!a.raw);reveal('reviewHint',!!a.raw);
  if(a.raw){$('reviewHint').textContent=a.raw.wordTiming?.status==='PARTIAL'?'词级定位部分不可用；请按整段回听，确认否定词、数字、条件和术语后再诊断。':'请逐段完整回听并确认关键字后再诊断。';const v=latest(a);v.spans.forEach(s=>{const row=el('div',undefined,'spanRow'),editor=el('textarea');editor.setAttribute('aria-label',`核对文字 ${s.start.toFixed(1)} 至 ${s.end.toFixed(1)} 秒`);editor.value=s.text;editor.rows=2;editor.maxLength=2000;editors.set(s.id,editor);const b=button(`回听 ${s.start.toFixed(1)}–${s.end.toFixed(1)} 秒`,()=>play(s.start,s.end,()=>{heard.add(s.id);b.textContent='已完整回听 ✓';}));row.append(b,editor);$('transcript').append(row);});
    if(v.reviewed)$('reviewHint').textContent='已保存核对版本。再次修改后需要重新回听确认；这不会创建新口头表现。';
    for(const report of a.reports.filter(r=>r.transcriptVersion===v.id))renderFeedback(report);
  }
  const events=a.observation?.events??[];
  if(events.length&&a.raw){$('observations').append(el('p','以下仅是近静音候选。完整回听确认确实影响表达后，才请求解释。','muted'));events.slice(0,8).forEach(event=>{const row=el('div'),b=button(`回听候选 ${event.start.toFixed(1)}–${event.end.toFixed(1)} 秒`,()=>play(Math.max(0,event.start-.5),Math.min(a.duration,event.end+.5),()=>{event.heard=true;b.textContent='候选已回听 ✓';}));const c=button('确认此候选并分析',async()=>{if(!event.heard)throw new Error('NOT_HEARD');if(!latest(a).reviewed)throw new Error('ASR_REVIEW_REQUIRED');await diagnose(a,'delivery',[{...event,confirmed:true}]);});row.append(b,c);$('observations').append(row);});}
}
$('confirm').onclick=()=>act(async()=>{
  const a=current; if(!a?.raw)return;if(a.raw.spans.some(s=>!heard.has(s.id)))throw new Error('NOT_HEARD');
  const corrected=revisedTranscript(a,a.raw.spans.map(s=>({text:editors.get(s.id).value})));a.corrections.push(corrected);await save();await diagnose(a,'content');
});
async function diagnose(a,channel,events=[]){
  const request=attemptRequest(a);notice(channel==='content'?'正在核对内容和逻辑……':'正在解释已确认的声音候选……');
  const result=await api('/api/diagnose',{source:a.source,attempt:request,channel,events});
  if(deleted.has(a.id)||!topic||deleted.has(topic.id))return;
  validateFindings(result.value,a.source,request,channel,events);a.reports.push({...result.value,channel,createdAt:Date.now()});a.status='DIAGNOSED';await save();renderAttempt();notice('反馈已与本次来源、转写版本和原声关联。可以继续学，也可以再讲。');
}
function renderFeedback(report){
  $('feedback').append(el('h3',report.channel==='content'?'内容与逻辑':'表达观察'));
  if(!report.findings.length)$('feedback').append(el('p','本次没有足够证据生成此类反馈。'));
  for(const f of report.findings){const card=el('article',undefined,'finding'),labels={supported:'已表达',missing:'本次尚未表达',incorrect:'需要澄清',unknown:'证据不足',observation:'表达观察'};card.dataset.status=f.status;card.append(el('strong',labels[f.status]),el('p',f.message),el('blockquote',`材料：${f.sourceQuote}`));
    if(f.spanId){const span=latest(current).spans.find(s=>s.id===f.spanId);card.append(el('blockquote',`本次原话：${f.quote}`),button('回听对应原声',()=>play(span.start,span.end)));}else card.append(el('p','未表达内容没有可对应的音频时间点。','muted'));
    let focus=null;try{focus=remediationFocus(f,report.channel);}catch{}
    if(focus)card.append(button('再学这一点',async()=>{topic.focus=remediationFocus(f,report.channel);await teach('请针对这一点帮助我理解，不要直接给整篇背诵稿。','repair',remediationFocus(f,report.channel));$('messages').scrollIntoView({behavior:'smooth'});}),button('再讲这一点',()=>prepare('partial',remediationFocus(f,report.channel),current.id)));$('feedback').append(card);
  }
}
$('apply').onclick=()=>act(()=>teach('给我一个新的、相关的应用情境，不要先公布答案。','apply'));
async function exportTopic(){
  if(!topic)return;const data=structuredClone(topic);for(const a of data.attempts){const bytes=new Uint8Array(await a.audio.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));a.audio={mime:a.audio.type,base64:btoa(binary)};}
  const url=URL.createObjectURL(new Blob([JSON.stringify({format:'study-teachback-export-v1',exportedAt:new Date().toISOString(),notice:'导出副本不受应用内删除控制',topic:data},null,2)],{type:'application/json'}));const link=el('a');link.href=url;link.download=`study-${topic.id}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
$('export').onclick=()=>act(exportTopic);
$('recoveryExport').onclick=()=>act(exportTopic);
$('retrySave').onclick=()=>act(async()=>{await save();if(current)renderAttempt();notice('已重新保存到本机。');});
function abortPending(){controller?.abort();}
$('deleteAttempt').onclick=()=>act(async()=>{if(!current)return;abortPending();deleted.add(current.id);topic.attempts=topic.attempts.filter(a=>a.id!==current.id);await save();$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);current=null;reveal('attemptPanel',false);notice('这次原声及其关联转写、纠正和反馈已从本地删除。已导出副本和已在途的云请求不受此操作控制。');});
async function history(){if(memoryOnly)throw new Error('STORAGE_FAILED');if(processing)throw new Error('REQUEST_IN_PROGRESS');if(record)throw new Error('RECORDING_ACTIVE');if(controller)throw new Error('REQUEST_IN_PROGRESS');reveal('history');const list=$('historyList');list.replaceChildren();for(const t of await db.all()){const row=el('div');row.append(el('strong',t.source.title),el('p',`${new Date(t.createdAt).toLocaleString()} · ${t.attempts.length} 次讲解`,'muted'),button('继续学习',()=>{if(!canNavigate())return;topic=t;current=null;renderTopic();reveal('attemptPanel',false);reveal('history',false);}));for(const a of t.attempts)row.append(button(`${a.kind==='partial'?'局部':'完整'} · ${new Date(a.createdAt).toLocaleTimeString()}`,()=>{if(!canNavigate())return;topic=t;current=a;renderTopic();renderAttempt();reveal('history',false);}));row.append(button('删除主题',async()=>{abortPending();deleted.add(t.id);await db.delete(t.id);if(topic?.id===t.id){topic=null;current=null;$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);reveal('workspace',false);reveal('dock',false);reveal('setup');}await history();},'danger'));list.append(row);}if(!list.children.length)list.append(el('p','还没有保存的学习记录。'));$('history').scrollIntoView({behavior:'smooth'});}
$('historyButton').onclick=()=>act(history);
function canNavigate(){if(memoryOnly){notice(friendly('STORAGE_FAILED'));return false;}if(record||controller||processing||importPending){notice(friendly('REQUEST_IN_PROGRESS'));return false;}return true;}
function newTopic(){if(importPending)return false;if(!canNavigate())return false;abortPending();clearImport();topic=null;current=null;reveal('workspace',false);reveal('dock',false);reveal('history',false);reveal('setup');$('title').value='';$('source').value='';updateCounts();return true;}
$('newTopic').onclick=newTopic;$('revise').onclick=()=>{const s=topic.source;if(!newTopic())return;$('title').value=s.title;$('source').value=s.text;updateCounts();notice('新版材料将建立新的学习记录；旧来源、标准和讲解保留。');};
$('deleteAll').onclick=()=>act(async()=>{if(record)throw new Error('RECORDING_ACTIVE');abortPending();for(const t of await db.all())deleted.add(t.id);await db.clear();if(topic)deleted.add(topic.id);topic=null;current=null;memoryOnly=false;reveal('storageRecovery',false);$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);reveal('workspace',false);reveal('dock',false);reveal('history',false);reveal('setup');reveal('attemptPanel',false);notice('全部本地学习对象已删除。费用账本不含正文，独立保留以防重置预算。导出副本不受此操作控制。');});
// Presentation-only confirmation: cancellation never reaches the original destructive handler.
function confirmDelete(scope,action,trigger){
  if(record||processing){notice(friendly('REQUEST_IN_PROGRESS'));return;}
  const dialog=$('deleteDialog');if(dialog.open)return;
  $('deleteScope').textContent=scope;dialog.returnValue='';
  const restore=()=>{const target=trigger?.isConnected&&trigger.getClientRects().length?trigger:!$('history').hidden?$('historyTitle'):$('title');target.focus();};
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
await act(async()=>{db=await openStore();await updateBudget();const all=await db.all();if(all.length){topic=all.at(-1);renderTopic();}});
