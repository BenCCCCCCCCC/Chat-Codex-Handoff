import {goalSource,learningRecord,roundState} from './learning-record.mjs';
import {activePractice} from './practice.mjs';
import {learningContexts,selectContext} from './material-set.mjs';
import {continuationOrigin} from './material-continuation.mjs';
import {mountMaterialSet} from './material-set-ui.mjs';
import {makeTextAttempt,comparisonFor} from './text-teachback.mjs';
import { RETENTION_MS, waveBytes, revisedTranscript, validateFindings, repairFocus, autoTitle, setupContextValue } from './core.mjs';
import {issueForAttempt,judgementIssues,sameJudgement,validateJudgementReport} from './judgement.mjs';
import {renderJudgementChoices,appendJudgementSummary} from './judgement-ui.mjs';
import {resolveConditionFeedback} from './conditional-practice.mjs';
import {renderRawPlayback,quotePlayback,playbackLabel} from './transcript-playback.mjs';
import {transcriptionTerms} from './transcription-terms.mjs';
import {audioFile,prepareAudio} from './audio-input.mjs';
import { openStore } from './storage.mjs';
import { confirmLocalProcess, localize, processEvidence } from './diagnostic-localization.mjs';
import {activityTime, resumePoint, practiceRounds} from './practice.mjs';
import {mountPractice} from './practice-ui.mjs';
import {feedbackReference,resolveFeedback,sameFeedbackReference} from './feedback-reference.mjs';
import {encodeBackup} from './backup.mjs';
import {mountBackup} from './backup-ui.mjs';
import {mountChat} from './chat-ui.mjs';
import {searchRecords,hasDraft,resolveRecordHit} from './record-search.mjs';
import {createDraftSaver} from './draft-save.mjs';
import {transcriptTexts,updateTranscriptDraft,analysisTrace} from './voice-review.mjs';
import {focusHit,hitDestination,transcriptHit} from './search-focus.mjs';
import {mountSetupDraft} from './setup-draft.mjs';
import {importedDocument,selectedProvenance,renderMaterial} from './source-provenance.mjs';
const $=id=>document.getElementById(id), uid=()=>crypto.randomUUID();
let db,topic=null,current=null,pending=null,controller=null,record=null,blobURL=null,playEnd=null,deleted=new Set(),memoryOnly=false,processing=false,capturePending=false;
let storageConflict=false;
const saveQueues=new WeakMap(),newTopics=new WeakSet();
const storageConflictMessage='本机记录已在另一页面更新或不再可用，本页未覆盖。请导出当前记录，确认备份已下载后再刷新或关闭；未导出的修改会丢失。';
let serviceCapabilities=null;
const editors=new Map();
const diagnosisStates=new WeakMap();
// Transient playback copies only. Original stored/exported audio is untouched.
const replayWaves=new WeakMap();let replayOriginal=null,replayRequest=0;
const notice=message=>{$('notice').textContent=message;};
const reveal=(id,show=true)=>{$(id).hidden=!show;};
function el(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;}
function button(label,fn,cls='quiet'){const b=el('button',label,cls);b.onclick=()=>label==='删除主题'?confirmDelete('删除这个主题及其全部讲解、原声、转写和反馈。',fn,b):act(fn);return b;}
async function act(fn){try{await fn();}catch(e){notice(friendly(e.message));}}
function friendly(code){if(code==='STORAGE_FAILED'&&storageConflict)return storageConflictMessage;const messages={MATERIAL_DRAFT_EXISTS:'请先保存或放弃正在编辑的材料版本，草稿仍保留。',MATERIAL_VERSION_CHANGED:'该材料已有更新版本，请先核对最新版本再修订。',MATERIAL_UNCHANGED:'名称和文字没有变化，无需保存新版本。',FRAGMENT_OMISSION_UNSUPPORTED:'录音只保留了部分内容，本次结果却按未录内容判断遗漏，已拒绝该结果；原声与文字仍保留。',CONTINUATION_TOO_LONG:'当前文字超过 2,000 字，原记录仍保留。请先选择一个重点，用文字草稿继续。',ISSUE_MATERIALS_REQUIRED:'请先补入该条件引用的材料。',INVALID_PRACTICE_CONDITIONS:'本题的条件或来源无法核对，已保留原记录；请返回条件反馈重新选择。',ANSWER_SESSION_LOCKED:'这次回答已经保存；请原样重试，或另起一次作答保留新回答。',JUDGEMENT_LIMIT:'每次反馈最多选择 3 个相关疑点，请取消无关或重复的记录。',INVALID_JUDGEMENT:'条件与结果的关联无法核对，未保存为有效反馈。',DEFERRED_JUDGEMENT:'返回结果试图判断已暂缓的项目，已拒绝保存；原始讲解和先前反馈仍保留。',MATERIAL_SELECTION_REQUIRED:'请至少选择一份材料。',MATERIAL_SELECTION_TOO_LARGE:'本次材料组合最多 5,000 字、100 个位置区块，请缩小所选材料；不会自动截断。',MATERIAL_LIMIT:'一个主题目前最多保存 12 份材料。',ISSUE_EVIDENCE_REQUIRED:'请至少引用一段材料中实际存在的原句。',SELECT_MATERIAL_QUOTE:'请先在材料原文中选取最多 1,500 字。',STUDY_WORK_MISSING:'这张疑点卡关联的讲解或题目已删除，已返回当时的材料；疑点与引文仍保留。',STUDY_CONTEXT_MISSING:'原学习位置已不存在，当前记录仍保留。',INVALID_TEXT:'请填写完整的文字，并遵守输入框字数限制。',REVIEW_BASIS_REQUIRED:'请填写复核说明，并粘贴材料中确实存在的原文作为依据；材料不足时可继续暂停。',QUESTION_UNCHANGED:'请修改题目，或选择保留原题后重新作答。',REVIEW_CHANGED:'题目或复核内容已改变，请重新预览后确认。',TRANSCRIPTION_TERMS_LIMIT:'术语最多 8 项，每项 24 字、合计 80 字；请用逗号分隔简短名称。',AUDIO_TOO_LARGE:'音频超过 25 MB，请压缩或裁剪后重新选择。',AUDIO_FORMAT_UNSUPPORTED:'请选择 WAV、MP3、M4A、MP4、WebM、OGG、FLAC 或 AAC 音频。',AUDIO_DECODE_FAILED:'浏览器无法读取这段音频，请转为 WAV 或 MP3 后重试。',DURATION_LIMIT:'每次讲解最长 3 分钟，请先裁剪音频。',EXTRACTOR_SETUP_REQUIRED:'本机文档提取环境未配置，请按 README 完成产品 Python 环境设置。材料没有发送给模型。',EXTRACTOR_DEPENDENCY_REQUIRED:'本机文档提取依赖缺失或版本不符，请按 README 安装指定版本 pypdf。材料没有发送给模型。',FILE_TOO_LARGE:'文件超过 10 MB，请选择更小的材料。',TEXT_ENCODING_UNSUPPORTED:'文本编码不受支持，请另存为 UTF-8 或 UTF-16。',NO_EXTRACTABLE_TEXT:'未提取到文字；扫描 PDF/图片需要先转换为可选取文本。本应用不执行 OCR。',INVALID_DOCUMENT:'文件无法安全解析，请检查格式或复制文字。',DOCUMENT_LIMIT:'材料超过本次提取限制，请拆分文档。',ENCRYPTED_DOCUMENT:'不支持加密文件，请使用未加密的低风险材料。',EXTRACTION_TIMEOUT:'本机提取超时，请缩小文件。',ASR_REVIEW_REQUIRED:'请先确认用于诊断的转写；建议回听检查否定词、数字、条件和术语。',BUDGET_STOP:'本次 API 预算已达到停止条件。原始讲解已保留。',ATTEMPT_LIMIT:'本次讲解的转写次数或总次数已达上限。原始讲解仍可回放。',CREDENTIAL_MISSING:'服务端尚未配置 API 凭据；请由开发者配置，学习数据仍保留。',REQUEST_IN_PROGRESS:'上一个请求仍在完成，请稍后再试。',NOT_HEARD:'请先完整回听这个过程候选，再保存过程证据。',STORAGE_FAILED:'本机存储失败，当前内容仅在此页内存中。请立即导出或重试保存，不要关闭页面。',NO_AUDIO:'没有收到可用录音，请检查麦克风。',SOUND_EVIDENCE_INSUFFICIENT:'声音证据不足，保留原声供回听。'};return messages[code]??`处理未完成（${/^[A-Z0-9_]+$/.test(code)?code:'LOCAL_ERROR'}）。原始学习记录不会因此删除。`;}
async function save(target=topic,{create=false}={}){
  if(!target||deleted.has(target.id))return;
  if(create)newTopics.add(target);
  const write=(saveQueues.get(target)??Promise.resolve()).catch(()=>{}).then(async()=>{
    if(deleted.has(target.id))return;
    const expected=target.updatedAt??null,updatedAt=Math.max(Date.now(),(expected??0)+1);
    try{
      await db.putCurrent(structuredClone({...target,updatedAt}),expected,newTopics.has(target));
      target.updatedAt=updatedAt;newTopics.delete(target);
      if(target.id===topic?.id){memoryOnly=false;storageConflict=false;reveal('storageRecovery',false);}
    }catch(e){
      if(target.id===topic?.id){
        memoryOnly=true;storageConflict=e?.message==='STORAGE_CHANGED';
        $('storageRecoveryStatus').textContent=storageConflict?storageConflictMessage:'存储未完成。请重试保存或立即导出；关闭页面可能丢失尚未保存的内容。';
        reveal('retrySave',!storageConflict);reveal('storageRecovery');
      }
      throw new Error('STORAGE_FAILED');
    }
  });
  saveQueues.set(target,write);
  try{await write;}finally{if(saveQueues.get(target)===write)saveQueues.delete(target);}
}
async function api(path,body,headers={}){
  if(controller||record)throw new Error('REQUEST_IN_PROGRESS');
  if(path!=='/api/extract'&&serviceCapabilities?.ai!==true)throw Object.assign(new Error('CREDENTIAL_MISSING'),{notSent:true});
  controller=new AbortController();$('send').disabled=true;$('explain').disabled=true;$('workspace').setAttribute('aria-busy','true');
  try{const response=await fetch(path,{method:'POST',headers:{'X-Study-Request':'1',...headers,...(body instanceof ArrayBuffer?{}:{'Content-Type':'application/json'})},body:body instanceof ArrayBuffer?body:JSON.stringify(body),signal:controller.signal});const result=await response.json();if(!response.ok)throw Object.assign(new Error(result.error),result.error==='CREDENTIAL_MISSING'?{notSent:true}:{});return result;}
  finally{controller=null;$('send').disabled=false;$('explain').disabled=false;$('workspace').removeAttribute('aria-busy');renderService();updateBudget();}
}
function renderService(){
  const ai=serviceCapabilities?.ai===true;
  $('serviceHelp').hidden=ai&&serviceCapabilities.imports.office&&serviceCapabilities.imports.pdf;
  $('serviceStatus').textContent=serviceCapabilities?(ai?'AI 已配置。':'AI 尚未配置 · 查看设置'):'正在检查可用功能；本机材料仍可保存。';
  $('importCapabilities').textContent=serviceCapabilities?'TXT / MD 可直接导入。'+(!serviceCapabilities.imports.office?' DOCX / PPTX 需要本机 Python 环境。':'')+(!serviceCapabilities.imports.pdf?' PDF 需要本机 Python 和指定版本 pypdf。':''):'';
  $('learn').textContent=ai?'先和 AI 讨论':'保存材料，进入学习';
  $('startHint').textContent=ai?'讲解先存本机。讨论会把选段发给 AI。':'讲解先存本机。诊断需配置 AI。';
  $('send').disabled=!ai||!!controller;
  renderPractice();
}
async function refreshCapabilities(){
  try{
    const response=await fetch('/api/capabilities');if(!response.ok)throw Error('UNAVAILABLE');
    const value=await response.json();if(value.app!=='zhi-er-neng-jiang'||value.apiVersion!==1||typeof value.ai!=='boolean')throw Error('UNAVAILABLE');
    serviceCapabilities=value;renderService();if(current?.raw)updateDiagnosisState();else if(current)renderAttempt();
  }catch{
    serviceCapabilities=null;renderService();$('serviceStatus').textContent='暂时无法检查 AI 配置。可以先保存材料，稍后重新检查。';
  }
}
async function updateBudget(){try{const response=await fetch('/api/status');if(!response.ok)throw new Error('BUDGET_UNAVAILABLE');const s=await response.json();$('budget').textContent=`本次账本：${s.ledger.requests} 次请求；已知费用估算 $${s.ledger.knownCostUSD.toFixed(6)}；含未结算预留 $${s.ledger.exposureUSD.toFixed(6)} / $5。现金新增上限 $10，不自动充值。`; }catch{$('budget').textContent='预算状态暂不可用；无法确认可用额度。';}}
function requestedStudyEntry(url){
  const entry=url.searchParams.get('entry');
  return entry==='home'||entry==='new'?entry:null;
}
function renderTopic(){
  // Only an explicit choice to open a topic consumes the one-page entry intent.
  const url=new URL(window.location.href);
  if(requestedStudyEntry(url)){
    url.searchParams.delete('entry');
    window.history.replaceState(window.history.state,'',url);
  }
  reveal('setup',false);reveal('workspace');reveal('dock');$('topicTitle').textContent=topic.studyTitle??topic.source.title;$('topicExpiry').textContent=expiryLabel(topic).split(' · ')[0];$('continuedIntent').hidden=!topic.continuationIntent;$('continuedIntent').textContent=topic.continuationIntent?'继续学习：'+(topic.continuationIntent.intent||'已补充材料，可保存文字讲解，再按所选条件分析。'):'';materials.render();
  renderMaterial({textNode:$('sourceText'),locationNode:$('sourceLocation'),source:topic.source});reveal('sourceReturn',false);
  $('goals').replaceChildren(...(topic.selectedGoal?[topic.selectedGoal]:topic.goals??[]).map(g=>el('li',g.text)));
  reveal('repairReturn',!!topic.repairRef&&topic.mode==='repair');
  chat.render();
  $('question').textContent=topic.question??'';$('phase').textContent=topic.mode==='repair'?'再学这一点':'一起学';
  renderPractice();
  $('explain').textContent=topic.textDraft?'继续文字草稿':'我来讲讲 ↗';
  renderChatRecovery();
}
function renderChatRecovery(){
  const request=topic?.chatRequest, unfinished=request&&request.status!=='complete';
  reveal('chatRecovery',!!unfinished);
  $('chatRetry').disabled=processing||!!controller||memoryOnly;
  $('chatRecoveryText').textContent=processing?'正在回复…':'回复未完成，问题已保留。重试会发起新请求。';
  $('chatRetry').textContent=request?.internalStarter?'重试讲解':'重试原问题';
}
async function teach(message,mode='learn',focus=null,{internalStarter=false,retry=false}={}){
  if(record||capturePending||controller||processing)throw new Error('REQUEST_IN_PROGRESS');
  if(serviceCapabilities?.ai!==true)throw new Error('CREDENTIAL_MISSING');
  if(mode==='repair')focus=repairFocus(focus);
  const target=topic;
  if(retry&&(!target.chatRequest||target.chatRequest.status==='complete'))return;
  // Lock before persistence: a fast second click must not append or dispatch again.
  processing=true;
  const request=retry?target.chatRequest:{id:uid(),message,mode,focus,internalStarter,
    history:target.messages.slice(-6),contextNote:target.contextNote??'',createdAt:Date.now()};
  if(!retry&&!internalStarter){
    target.messages.push({role:'user',text:message});
    if(target.chatDraft?.trim()===message)target.chatDraft='';
  }
  target.chatRequest=request;request.status='pending';target.mode=request.mode;target.resume={view:'learn'};
  try{
    await save(target);renderTopic();notice('');
    const r=await api('/api/teach',{source:target.source,mode:request.mode,message:request.message,focus:request.focus,history:request.history,contextNote:request.contextNote??'',setupContext:target.setupContext});
    if(deleted.has(target.id)||topic!==target)return;
    target.messages.push({role:'assistant',text:r.value.message});target.question=r.value.question;
    if(!target.goals.length){target.goals=r.value.goals;target.anchorVersion=uid();target.source.anchors=structuredClone(target.goals);target.source.anchorVersion=target.anchorVersion;}
    request.status='complete';request.completedAt=Date.now();request.contextUsage=r.contextUsage??null;
    await save(target);notice('');
  }catch(e){
    // Keep received answers even when the final local write fails.
    if(request.status!=='complete')request.status='unknown';
    if(e.message!=='STORAGE_FAILED'&&!deleted.has(target.id))await save(target);
    throw e;
  }finally{processing=false;if(topic===target&&!deleted.has(target.id))renderTopic();}
}
let importPending=false,importDocument=null;
function updateCounts(){ $('sourceCount').textContent=`${$('source').value.length.toLocaleString()} / 5,000 字`;$('selectionCount').textContent=`已选 ${$('extractedText').value.slice($('extractedText').selectionStart,$('extractedText').selectionEnd).trim().length.toLocaleString()} 字`; }
$('source').addEventListener('input',updateCounts);$('extractedText').addEventListener('select',updateCounts);
function clearImport(){importDocument=null; $('selectedFile').textContent='';$('extractionState').textContent='';reveal('fileProgress',false); $('selectionCount').textContent='已选 0 字';$('sourceFile').value='';$('extractedText').value='';$('importStatus').textContent='';reveal('importPreview',false); }
$('clearImport').onclick=clearImport;
$('sourceFile').onchange=()=>act(async()=>{
  const file=$('sourceFile').files[0];if(!file)return;
  if(controller||importPending)return notice('请先等当前处理完成。');
  clearImport();$('selectedFile').textContent=file.name;$('extractionState').textContent='正在本机解析…';reveal('fileProgress');importPending=true;$('learn').disabled=true;$('sourceFile').disabled=true;
  try{
    if(file.size>10*1024*1024)throw new Error('FILE_TOO_LARGE');
    notice('');
    const result=await api('/api/extract',await file.arrayBuffer(),{'X-Source-Format':file.name.split('.').pop().toLowerCase()});
    importDocument=importedDocument(result.blocks,file.name);$('extractedText').value=importDocument.text;
    $('extractionState').textContent='解析完成';$('importStatus').textContent=`${result.blocks.length} 个正文/页面/幻灯片区块。核对文字后，选取最多 5,000 字。`;
    const empty=result.blocks.filter(b=>!b.text.trim()).map(b=>b.label);
    if(empty.length)$('importStatus').textContent+=` ${empty.join('、')}未提取到文字，请核对原文件中的图片或扫描内容。`;
    reveal('importPreview');
    if($('extractedText').value.trim().length<=5000&&!$('source').value.trim()){
      useImported(true);
      notice('全文已放入学习材料，可以直接开始学习；也可从预览中重新选取片段。');
    }else{
      notice($('extractedText').value.trim().length>5000?'文件超过 5,000 字，请选取本次学习的片段。现有草稿已保留。':'解析完成，现有正文和标题已保留。核对预览后，可点击“替换为全部文本”或选择片段。');
      updateCounts();
    }
  }catch(e){$('extractionState').textContent='解析未完成，可重新选择文件或粘贴文字。';throw e;}finally{importPending=false;$('learn').disabled=false;$('sourceFile').disabled=false;}
});
function useImported(all){
  const preview=$('extractedText');const selected=(all?preview.value:preview.value.slice(preview.selectionStart,preview.selectionEnd)).trim();
  if(!selected)return notice('请先在预览中选中文字。');
  if(selected.length>5000)return notice('这一轮最多 5,000 字，请缩小选段；不会自动截断材料。');
  const provenance=importDocument?.text===preview.value?selectedProvenance(importDocument,all?0:preview.selectionStart,all?preview.value.length:preview.selectionEnd):null;
  const sourceMeta={...(provenance?{provenance}:{}),...(importDocument?.revisionOf?{revisionOf:importDocument.revisionOf}:{})};
  setupDraft.replaceMaterial(selected,autoTitle(selected,$('selectedFile').textContent),sourceMeta);updateCounts();notice('材料已替换，可以撤销。直接讲解会把材料保存在本机。');
}
$('useSelection').onclick=()=>act(()=>useImported(false));$('useAll').onclick=()=>act(()=>useImported(true));
$('learn').onclick=()=>act(()=>startTopic(false));
$('directExplain').onclick=()=>act(()=>startTopic(true));
async function startTopic(explainFirst){
  if(importPending||controller||capturePending||record||processing)return;
  if(!$('source').value.trim()){$('source').focus();return notice('请先放入这一轮的学习材料。');}
  if($('source').value.length>5000)return notice('这一轮最多 5,000 字，请缩小材料。');
  const setupContext=setupContextValue({focus:$('setupFocus').value,known:$('setupKnown').value});
  topic={id:uid(),createdAt:Date.now(),source:{id:uid(),title:$('title').value.trim()||autoTitle($('source').value),text:$('source').value.trim(),...setupDraft.sourceMetadata()},setupContext,goals:[],messages:[],attempts:[],mode:'learn'};
  processing=true;
  try{await save(topic,{create:true});setupDraft.clear();clearImport();}finally{processing=false;}
  if(explainFirst){renderTopic();showPreparation();notice('材料已保存在本机。');return;}
  if(serviceCapabilities?.ai!==true){renderTopic();notice('材料已保存在本机。可查看和整理，配置 AI 后再发送问题。');return;}
  await teach('请先帮我理解这段材料，从核心关系开始，问我一个简短问题。','learn',null,{internalStarter:true});
}
$('chatForm').onsubmit=e=>{e.preventDefault();if(!canNavigate())return;act(async()=>{const message=$('chat').value.trim();if(!message)return;await chat.flushDraft();const retry=topic.chatRequest?.status!=='complete'&&!topic.chatRequest?.internalStarter&&topic.chatRequest?.message===message;await teach(message,topic.mode==='repair'?'repair':'learn',topic.focus??null,{retry});});};
$('chatRetry').onclick=()=>act(async()=>{if(canNavigate())await teach('', 'learn',null,{retry:true});});
function prepare(kind='full',focus=null,parentId=null,feedbackRef=null){
  if(!canNavigate())return;showPreparation(kind,focus,parentId,feedbackRef);
}
function showPreparation(kind='full',focus=null,parentId=null,feedbackRef=null){
  if(!topic)return;
  if(kind==='partial')focus=repairFocus(focus);
  const parent=topic.attempts.find(a=>a.id===parentId);
  const requested={kind,focus,parentId,parentVersionId:feedbackRef?.transcriptVersion??parent?.corrections.at(-1)?.id??parent?.raw?.id??null,...(feedbackRef?{feedbackRef}:{})};
  const draft=topic.textDraft;
  // The visible prompt and the stored draft must refer to the same feedback.
  const saved=draft&&{kind:draft.kind,focus:draft.focus??null,parentId:draft.parentId??null,parentVersionId:draft.parentVersionId??null,
    ...(draft.feedbackRef?{feedbackRef:draft.feedbackRef}:{})};
  const different=!!(saved&&(kind==='partial'||parentId||feedbackRef)&&JSON.stringify(saved)!==JSON.stringify(requested));
  pending=saved??requested;
  renderTextComposer(different);$('transcriptionTerms').value=topic.transcriptionTerms??'';$('termDraftStatus').textContent='';reveal('recording');$('recordTitle').textContent=pending.kind==='partial'?'只讲这一点':'我来讲讲';$('recordFocus').textContent=pending.focus??'';$('recording').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});reveal('voiceComposer',false);reveal('textComposer');$('chooseText').setAttribute('aria-pressed','true');$('chooseVoice').setAttribute('aria-pressed','false');$('textExplanation').focus();$('timer').textContent='00:00';
}
function setTextBusy(busy){
  for(const id of ['textExplanation','textAssistance','discardTextDraft','chooseText','chooseVoice'])$(id).disabled=busy;
  $('saveTextExplanation').disabled=busy||!topic?.textDraft?.text.trim();
}
function renderTextComposer(different=false){
  const d=topic.textDraft;
  $('textExplanation').value=d?.text??'';
  $('textAssistance').value=d?.assistance??'source';
  $('textComposer').open=true;
  $('textDraftContext').textContent=different?'已恢复原草稿。要讲新的一点，先保存或清空这份草稿。':d?(d.kind==='partial'?'已恢复上次局部讲解草稿':'已恢复上次完整讲解草稿'):'';
  $('textDraftStatus').textContent=d?'文字草稿已保存在本机':'';
  $('saveTextExplanation').disabled=!d?.text.trim();
  $('discardTextDraft').hidden=!d;
}
function captureTextDraft(){
  if(!topic||!pending||record||capturePending||processing)return;
  topic.textDraft={...(topic.textDraft??pending),text:$('textExplanation').value,assistance:$('textAssistance').value};
  voiceDrafts.mark(topic);$('saveTextExplanation').disabled=!topic.textDraft.text.trim();$('discardTextDraft').hidden=false;
}
$('textExplanation').oninput=$('textAssistance').onchange=captureTextDraft;
$('textExplanation').onblur=()=>act(()=>voiceDrafts.flush());
$('discardTextDraft').onclick=()=>confirmDelete('清空尚未保存为讲解的文字草稿。已保存的讲解和反馈不受影响。',async()=>{
  await voiceDrafts.flush();delete topic.textDraft;await save();renderTextComposer();
},$('discardTextDraft'),$('textExplanation'));
$('saveTextExplanation').onclick=()=>act(async()=>{
  if(!canNavigate()||!topic.textDraft?.text.trim())return;
  processing=true;setTextBusy(true);const target=topic;
  try{
    await flushDrafts();const a=makeTextAttempt(target,target.textDraft,{source:goalSource(target)});
    if(target.continuationIntent?.issueIds?.length)a.judgementIssues=target.continuationIntent.issueIds.map(id=>issueForAttempt(target.studyIssues.find(i=>i.id===id),target));
    delete target.continuationIntent;
    target.attempts.push(a);delete target.textDraft;target.resume={view:'attempt',attemptId:a.id};current=a;
    try{await save(target);}finally{reveal('recording',false);renderAttempt();}
    focusHit($('voiceHeading'));notice(isFirstTextReview(a)?'':'文字讲解已保存在本机，尚未发送给 AI。');
  }catch(e){
    if(e.message==='INVALID_FEEDBACK_REFERENCE')return notice('原反馈无法核对，文字草稿已保留。');
    throw e;
  }finally{processing=false;setTextBusy(false);}
});
function renderComparison(){
  reveal('attemptComparison',false);if(!current?.parentId&&!current?.continuation)return;
  const result=comparisonFor(topic,current);if(!result)return;
  reveal('attemptComparison');$('comparisonContext').textContent=current.focus??'完整讲解对照';
  $('comparisonNote').textContent=result.reason??result.note;
  reveal('checkOriginal',!!current.feedbackRef&&!!result.beforeReports?.length);
  $('comparisonColumns').hidden=!!result.reason;
  if(result.reason)return;
  const labels={none:'无提示（自报）',keywords:'关键词（自报）',source:'参考材料',unknown:'参考情况未记录'};
  for(const [side,version,attempt,reports] of [['before',result.before,result.parent,result.beforeReports],['after',result.after,current,result.afterReports]]){
    $(side+'Version').textContent=(side==='before'?'上一次':'这一次')+' · '+(attempt.inputMode==='text'?'文字':'录音')+' · '+labels[attempt.assistance]+(current.continuation?' · 依据：'+attempt.source.title:'')+' · 版本 '+version.id.slice(0,8);
    $(side+'Text').textContent=version.spans.map(s=>s.text).join('\n');
    $(side+'Reports').replaceChildren(...(reports.length?reports.map(r=>{
      const item=el('section');item.append(el('p','该版本反馈 · '+(r.createdAt?new Date(r.createdAt).toLocaleString():'历史日期未记录'),'muted'));appendJudgementSummary(item,r);item.append(...r.findings.map(f=>el('p',f.message)));return item;
    }):[el('p','该版本尚无内容反馈。','muted')]));
  }
}
for(const mode of ['Text','Voice'])$('choose'+mode).onclick=()=>{reveal('voiceComposer',mode==='Voice');reveal('textComposer',mode==='Text');$('chooseText').setAttribute('aria-pressed',String(mode==='Text'));$('chooseVoice').setAttribute('aria-pressed',String(mode==='Voice'));$(mode==='Text'?'textExplanation':'start').focus();};
$('explain').onclick=()=>prepare();$('fullAgain').onclick=()=>prepare('full',null,current?.id);
$('cancelRecord').onclick=()=>{if(!record&&!capturePending)reveal('recording',false);};
$('uploadAudio').onclick=()=>{if(canNavigate())$('audioFile').click();};
$('audioFile').onchange=()=>act(async()=>{
  const file=$('audioFile').files[0];$('audioFile').value='';
  if(!file||!canNavigate()||!topic||!pending)return;
  const target=topic,plan={...pending},terms=transcriptionTerms(target.transcriptionTerms??'');capturePending=true;setTextBusy(true);$('uploadAudio').disabled=true;$('start').disabled=true;$('transcriptionTerms').disabled=true;
  notice('正在本机检查音频…');
  try{
    await flushDrafts();
    const audio=audioFile(file),prepared=await prepareAudio(audio);
    if(topic!==target||deleted.has(target.id))throw Error('CAPTURE_CANCELLED');
    const a={id:uid(),createdAt:Date.now(),...plan,transcriptionTerms:terms,assistance:'unknown',captureOrigin:'upload',fileName:file.name,
      source:structuredClone(target.selectedGoal?goalSource(target):target.source),anchors:structuredClone(target.selectedGoal?[target.selectedGoal]:target.goals),anchorVersion:target.selectedGoal?.id??target.anchorVersion??null,
      audio,duration:prepared.duration,observation:prepared.observation,interrupted:false,raw:null,corrections:[],reports:[],status:'SAVED'};
    target.attempts.push(a);target.resume={view:'attempt',attemptId:a.id};current=a;
    replayWaves.set(audio,new Blob([prepared.wav],{type:'audio/wav'}));
    reveal('recording',false);
    try{await save(target);}finally{renderAttempt();}
    $('attemptPanel').scrollIntoView({behavior:'instant',block:'start'});$('retryAsr').focus();
    notice(['NEAR_SILENT','CLIPPING'].includes(a.observation.reason)?'原声已保存，但声音过轻或失真，请试听后换一段音频。':'原声已保存。点击“开始转写”才会发送音频。');
  }finally{capturePending=false;setTextBusy(false);$('uploadAudio').disabled=false;$('start').disabled=false;$('transcriptionTerms').disabled=false;}
});
function stopRecording(interrupted=false){if(!record)return;record.interrupted ||= interrupted;if(record.recorder.state!=='inactive')record.recorder.stop();}
function resetRecordingUI(){
  setTextBusy(!!record||capturePending||processing);
  delete document.body.dataset.recording;$('transcriptionTerms').disabled=false;$('uploadAudio').disabled=false;$('start').disabled=false;reveal('start');reveal('finish',false);$('assistance').disabled=false;reveal('materialPanel');reveal('chatForm');document.querySelector('.learning').hidden=false;$('promptView').textContent='';
}
$('finish').onclick=()=>stopRecording();
$('start').onclick=()=>act(async()=>{
  reveal('voiceComposer');reveal('textComposer',false);
  if(record||capturePending||controller||processing||memoryOnly)return notice('请先等当前处理完成。');
  if(!topic||!pending)return;
  const target=topic,plan={...pending},assistance=$('assistance').value,terms=transcriptionTerms(target.transcriptionTerms??'');
  const active=()=>topic===target&&!deleted.has(target.id);
  capturePending=true;setTextBusy(true);$('start').disabled=true;$('uploadAudio').disabled=true;$('transcriptionTerms').disabled=true;let stream,context;
  try{
    // The ledger's unchanged 60-attempt cap applies after valid audio is saved;
    // retained invalid captures are not valid-attempt registrations.
    if(!active())throw new Error('CAPTURE_CANCELLED');
    await flushDrafts();
    const attemptId=uid();
    stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1},video:false});
    if(!active())throw new Error('CAPTURE_CANCELLED');
    const type=['audio/webm;codecs=opus','audio/webm'].find(x=>MediaRecorder.isTypeSupported(x));if(!type)throw new Error('RECORDING_FORMAT_UNSUPPORTED');
    context=new AudioContext();await context.resume();const analyser=context.createAnalyser();context.createMediaStreamSource(stream).connect(analyser);
    if(!active())throw new Error('CAPTURE_CANCELLED');
    const recorder=new MediaRecorder(stream,{mimeType:type}),chunks=[];const started=performance.now();
    record={id:attemptId,recorder,stream,context,started,interrupted:false,target,...plan,assistance,terms};
    const own=record;recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
    recorder.onerror=()=>stopRecording(true);stream.getAudioTracks().forEach(track=>{track.onended=()=>stopRecording(true);track.onmute=()=>stopRecording(true);});
    recorder.onstop=()=>act(async()=>{
      try{
      clearInterval(own.tick);stream.getTracks().forEach(t=>{t.onended=null;t.onmute=null;t.stop();});await context.close();record=null;delete document.body.dataset.recording;
      resetRecordingUI();if(!active())throw new Error('CAPTURE_CANCELLED');
      const audio=new Blob(chunks,{type:recorder.mimeType});if(!audio.size)throw new Error('NO_AUDIO');
      const a={id:own.id,createdAt:Date.now(),kind:own.kind,focus:own.focus,parentId:own.parentId,parentVersionId:own.parentVersionId,...(own.feedbackRef?{feedbackRef:own.feedbackRef}:{}),assistance:own.assistance,transcriptionTerms:own.terms,source:structuredClone(own.target.selectedGoal?goalSource(own.target):own.target.source),anchors:structuredClone(own.target.selectedGoal?[own.target.selectedGoal]:own.target.goals),anchorVersion:own.target.selectedGoal?.id??own.target.anchorVersion??null,audio,captureDuration:Math.min(180,(performance.now()-started)/1000),interrupted:own.interrupted,raw:null,corrections:[],reports:[],status:'SAVED'};
      own.target.attempts.push(a);own.target.resume={view:'attempt',attemptId:a.id};current=a;
      try{await save();}catch(e){renderAttempt();throw e;}
      reveal('recording',false);renderAttempt();await processAudio(a);
      }finally{record=null;capturePending=false;resetRecordingUI();}
    });
    recorder.start(1000);
    const samples=new Float32Array(analyser.fftSize);own.tick=setInterval(()=>{const seconds=(performance.now()-started)/1000;$('timer').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;analyser.getFloatTimeDomainData(samples);$('level').value=Math.min(1,Math.sqrt(samples.reduce((s,x)=>s+x*x,0)/samples.length)*5);if(seconds>=179.5)stopRecording();},100);
    reveal('start',false);reveal('finish');$('assistance').disabled=true;reveal('materialPanel',own.assistance==='source');reveal('chatForm',false);document.querySelector('.learning').hidden=true;$('promptView').textContent=own.assistance==='keywords'?target.goals.map(g=>g.text).join(' · '):'';document.body.dataset.recording='true';$('sourceDetails').open=true;$('finish').focus();notice('正在录音。按“结束讲解”完成本次尝试。');
  }catch(e){clearInterval(record?.tick);record=null;stream?.getTracks().forEach(t=>{t.onended=null;t.onmute=null;t.stop();});try{if(context&&context.state!=='closed')await context.close();}finally{capturePending=false;resetRecordingUI();}notice(e.name==='NotAllowedError'?'麦克风权限未允许。学习内容已保留，请在浏览器中允许麦克风后重试。':friendly(e.message));}
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&record)stopRecording(true);if(document.hidden)act(flushDrafts);});
window.addEventListener('beforeunload',e=>{if(record||capturePending||memoryOnly||controller||processing||setupDraft.dirty||chat.hasPendingDraft||practice.hasPendingDraft||voiceDrafts.pending){e.preventDefault();e.returnValue='';}});
async function processAudio(a,{acceptFragment=false}={}){
  if(processing)throw new Error('REQUEST_IN_PROGRESS');if(memoryOnly)throw new Error('STORAGE_FAILED');processing=true;
  const previousStatus=a.status;notice('原声已保存，正在检查声音……');
  try{
    const prepared=await prepareAudio(a.audio,a.interrupted&&!acceptFragment&&!a.fragmentAcceptedAt);a.duration=prepared.duration;a.observation=prepared.observation;
    await save();
    if(a.interrupted&&!acceptFragment&&!a.fragmentAcceptedAt||['NEAR_SILENT','CLIPPING'].includes(a.observation.reason)){a.status='SOUND_EVIDENCE_INSUFFICIENT';await save();renderAttempt();return notice(a.interrupted?'采集中断，已保留收到的声音。可回听后转写这一片段，或用文字接着讲。':'音量或失真可能影响转写。原声已保留，可回听、用文字继续或重新录制。');}
    if(acceptFragment){a.fragmentAcceptedAt=Date.now();await save();}
    if(serviceCapabilities?.ai!==true){renderAttempt();return notice('本次未发送转写请求。音频已保存在本机，配置 AI 后可转写，也可用文字继续。');}
    const wav=prepared.wav;
    replayWaves.set(a.audio,new Blob([wav],{type:'audio/wav'}));
    await api('/api/register',{attemptId:a.id});
    const result=await api('/api/asr',wav,{'Content-Type':'audio/wav','X-Attempt-Id':a.id,'X-Transcription-Terms':encodeURIComponent((a.transcriptionTerms??[]).join(','))});
    if(deleted.has(a)||!topic||deleted.has(topic.id))return;
    a.raw={...result,id:uid(),origin:'ASR',createdAt:Date.now()};a.status='REVIEW_REQUIRED';await save();renderAttempt();notice('转写完成。诊断将使用当前文字；建议回听检查关键字，也可直接确认文字并继续。');
  }catch(e){
    // A received transcript remains usable when only the local write failed.
    if(e.message!=='STORAGE_FAILED'){
      a.status=e.notSent?previousStatus:'PARTIAL';a.error=e.message;
      try{await save();}catch(storageError){renderAttempt();throw storageError;}
    }
    renderAttempt();throw e;
  }
  finally{processing=false;if(current===a){$('retryAsr').disabled=serviceCapabilities?.ai!==true;$('audioContinueText').disabled=false;}}
}
$('retryAsr').onclick=()=>act(()=>{if(!canNavigate())return;return processAudio(current,{acceptFragment:!!current.interrupted});});
$('audioContinueText').onclick=()=>{if(canNavigate())prepare('full',null,current?.id);};
function latest(a){return a.corrections.at(-1)??a.raw;}
function attemptRequest(a){const v=latest(a);return {id:a.id,sourceId:a.source.id,transcriptVersion:v.id,...(a.inputMode==='text'?{inputMode:'text'}:{duration:a.duration,...(a.raw?.timing?.level==='recording'?{timing:'recording'}:{})}),spans:v.spans,kind:a.kind,focus:a.focus,assistance:a.assistance,reviewed:v.reviewed===true,interrupted:a.interrupted,...(a.fragmentAcceptedAt?{fragmentAccepted:true}:{}),...(a.contentScope?{scope:a.contentScope}:{})};}
async function play(start=0,end=current?.duration,onComplete){
  const attempt=current,original=attempt.audio,request=++replayRequest;playEnd?.cancel('superseded');$('player').pause();
  let wav=replayWaves.get(original);
  if(!wav){let context;try{
    context=new AudioContext();const decoded=await context.decodeAudioData(await original.arrayBuffer());
    const offline=new OfflineAudioContext(1,Math.ceil(decoded.duration*16000),16000),source=offline.createBufferSource();source.buffer=decoded;source.connect(offline.destination);source.start();
    const normalized=await offline.startRendering();wav=new Blob([waveBytes(normalized.getChannelData(0))],{type:'audio/wav'});replayWaves.set(original,wav);
  }finally{if(context&&context.state!=='closed')await context.close();}}
  if(request!==replayRequest||current!==attempt||deleted.has(attempt))return;
  if(replayOriginal!==original){if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(wav);$('player').src=blobURL;replayOriginal=original;}
  const player=$('player');if(player.readyState===0)await new Promise((resolve,reject)=>{
    const done=()=>{player.removeEventListener('loadedmetadata',loaded);player.removeEventListener('error',failed);};
    const loaded=()=>{done();resolve();},failed=()=>{done();reject(new Error('REPLAY_LOAD_FAILED'));};
    player.addEventListener('loadedmetadata',loaded);player.addEventListener('error',failed);
  });
  if(request!==replayRequest||current!==attempt||deleted.has(attempt))return;
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
  const matching=reports.slice().reverse().find(r=>same(versions.find(v=>v.id===r.transcriptVersion))&&sameJudgement(r,a.judgementIssues));
  const report=matching??reports.at(-1),version=report&&versions.find(v=>v.id===report.transcriptVersion);
  return {draft,report,version,current:!!matching,changed:!same(latest(a)),...(diagnosisStates.get(a)??{})};
}
function focusDiagnosis(){const heading=$('contentHeading');heading.focus();heading.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
function isFirstTextReview(a){
  return a.inputMode==='text'&&a.kind==='full'&&!a.parentId&&!a.continuation&&!memoryOnly&&!a.reports.length&&!a.corrections.length;
}
function placeRepeatAtReview(show,secondary=false){
  const repeat=$('fullAgain'),group=$(show?'reviewActions':'moreAttemptActions');
  if(repeat.parentElement!==group){if(show)group.append(repeat);else group.prepend(repeat);}
  repeat.textContent=show?'再讲一遍':'重新完整讲';
  repeat.classList.toggle('quiet',show&&secondary);
}
function updateDiagnosisState(){
  const a=current;if(!a?.raw)return;renderNextEvidence();const v=diagnosisView(a);
  const ai=serviceCapabilities?.ai===true,local=isFirstTextReview(a)&&!v.pending&&!v.error&&!v.saveFailed;
  placeRepeatAtReview(local,ai);
  $('confirm').hidden=local&&!ai;
  $('confirm').classList.toggle('view-result',v.current&&!v.pending&&!v.saveFailed);
  $('confirm').disabled=!!v.pending||!!v.saveFailed||!v.current&&serviceCapabilities?.ai!==true;for(const e of editors.values())e.readOnly=!!v.pending;
  $('confirm').textContent=!v.current&&serviceCapabilities?.ai!==true?'配置 AI 后可分析':v.pending?'诊断中…':v.current?'查看反馈':v.error?'确认当前文字并再次诊断':v.report||v.changed?'确认修改并重新诊断':'确认并诊断';
  $('diagnosisState').classList.toggle('sr-only',v.current&&!v.pending&&!v.error&&!v.saveFailed);
  const binding=v.version?'版本 '+v.version.id.slice(0,8)+' · '+new Date(v.report.createdAt).toLocaleString():'';
  const stateMessage=v.pending?'当前文字与适用条件已确认，正在诊断…':v.error||(
    v.current?'诊断完成':v.report?'文字或适用条件已修改，先前结果已过时。':
    local?'文字讲解已保存在本机，尚未发送给 AI。'+(ai?'':'配置 AI 后可分析。'):''
  );
  const sendHint=!v.current&&!v.pending&&!v.saveFailed&&serviceCapabilities?.ai===true?'确认后会把材料选段和确认文字发给 AI。':'';
  $('diagnosisState').textContent=stateMessage+sendHint;
  $('resultBinding').textContent=v.report?(v.pending?'先前结果（新诊断进行中）':v.current?'当前结果':'先前结果，仅供查看，不适用于当前文字或条件')+' · '+binding:'';
  renderJudgementChoices({root:$('judgementChoices'),topic,attempt:a,disabled:!!v.pending||processing,change:(issue,checked)=>act(async()=>{
    if(!canNavigate())return;processing=true;updateDiagnosisState();
    try{await voiceDrafts.flush();const next=(a.judgementIssues??[]).filter(i=>i.id!==issue.id);if(checked)next.push(issue);a.judgementIssues=judgementIssues(next,a.source);await save();}
    finally{processing=false;if(current===a)updateDiagnosisState();}
  }),continueIssue:id=>act(()=>materials.continueIssue(id)),create:()=>{if(!canNavigate())return;$('studyIssues').open=$('issueEditor').open=true;$('issueQuestion').focus();$('issueEditor').scrollIntoView({block:'center'});}});
  reveal('analysisDetails',!!v.report);
  const trace=v.report?.analysis;
  $('analysisInfo').textContent=trace?`分析依据：${a.inputMode==='text'?'已确认的文字讲解':'已确认的转写文字'}\n模型：${trace.model??'未记录'}\nAPI 请求：${trace.requestId??'未取得'}\n本机请求：${trace.reservationId??'未记录'}`:'历史报告未记录分析模型与请求标识。';
  renderComparison();
  $('feedback').replaceChildren();if(v.report&&v.version)renderFeedback(v.report,{version:v.version,stale:!v.current||!!v.pending});
}
function renderAttempt(){
  if(!current)return;renderNextEvidence();$('explain').textContent=topic.textDraft?'继续文字草稿':'我来讲讲 ↗';const a=current,typed=a.inputMode==='text';editors.clear();reveal('attemptComparison',false);reveal('attemptPanel');reveal('searchExcerpt',false);reveal('analysisDetails',false);$('voiceDraftStatus').textContent=a.transcriptDraft?'核对草稿已保存 · 尚未确认':'';$('attemptKind').textContent=(a.kind==='partial'?'局部':'完整')+(typed?'文字讲解':a.captureOrigin==='upload'?'上传音频':'录音');
  replayRequest++;replayOriginal=null;if(blobURL)URL.revokeObjectURL(blobURL);blobURL=typed?null:URL.createObjectURL(a.audio);if(blobURL)$('player').src=blobURL;else $('player').removeAttribute('src');$('player').hidden=typed;$('audioDetails').hidden=typed;
  const soundIssue=a.interrupted?'录音中断':a.observation?.reason==='NEAR_SILENT'?'音量过低':a.observation?.reason==='CLIPPING'?'录音失真':null;
  $('audioStatus').textContent=`${a.duration?`${a.duration.toFixed(1)} 秒 · `:''}${soundIssue??'原声已保留'}${a.captureOrigin==='upload'?` · ${a.fileName} · 录制时的提示条件未知`:''}。${a.transcriptionTerms?.length?` 转写术语：${a.transcriptionTerms.join('、')}。`:''}`;
  $('voiceState').textContent=a.fragmentAcceptedAt?'你选择了保留的录音片段；反馈只核对已录下的内容，不作为完整讲解评价。':typed?'':a.raw?'':soundIssue?`${soundIssue}，保留内容可回听；可用文字继续，或在核对后转写片段。`:a.status==='SAVED'?'试听后开始转写。':'转写未完成，原声已保留。';
  $('continuationInfo').hidden=!a.continuation;
  if(a.continuation){
    const ref=a.continuation;$('attemptKind').textContent='承接文字';$('voiceState').textContent='从先前表达承接的文字，可继续修改；尚不代表一次新的独立作答。';
    $('continuationText').textContent=`原依据：${ref.sourceTitle}\n本次依据：${a.source.title}${ref.intent?'\n继续的问题：'+ref.intent:''}\n旧讲解和反馈保留原依据；确认当前文字后才按本次材料分析。${ref.retainedFragment?'本次仍只核对保留片段，不评价未录内容。':''}${ref.fromDraft?'本次包含尚未确认的编辑。':''}${ref.unappliedConditions?.length?'\n尚未沿用的条件：'+ref.unappliedConditions.join('、')+'。这些条件引用了未采用的材料版本，请按当前依据重新核对。':''}`;
    $('continuationOrigin').hidden=!continuationOrigin(topic,ref).attempt;
  }
  $('retryAsr').textContent=serviceCapabilities?.ai!==true?'配置 AI 后可转写':a.interrupted?'转写保留片段 · AI':a.status==='SAVED'?'开始转写':'重试转写';$('retryAsr').disabled=processing||serviceCapabilities?.ai!==true;$('audioContinueText').hidden=typed||!!a.raw;$('audioContinueText').disabled=processing;$('attemptHeading').textContent=typed?'讲解与反馈':'回听与反馈';$('voiceHeading').textContent=typed?'核对讲解文字':a.raw?'核对转写':'试听原声';
  reveal('transcriptHeading',!!a.raw);reveal('rawTranscriptDetails',!!a.raw);reveal('contentPane',!!a.raw);reveal('processDetails',!!a.raw&&!typed&&!a.interrupted);$('attemptPanel').classList.toggle('awaiting-transcript',!a.raw);
  $('rawTranscriptLabel').textContent=typed?'最初保存的文字':'原始转写与回听';$('rawPlaybackStatus').textContent='';renderRawPlayback($('rawText'),a.raw,anchor=>act(()=>play(anchor.start,anchor.end)),label=>{$('rawPlaybackStatus').textContent=label;});$('transcript').replaceChildren();$('feedback').replaceChildren();$('observations').replaceChildren();$('processFeedback').replaceChildren();
  reveal('retryAsr',!typed&&!a.raw&&(!soundIssue||a.interrupted));reveal('confirm',!!a.raw);reveal('reviewHelp',!!a.raw&&!typed);reveal('reviewHint',!!a.raw);reveal('diagnosisState',!!a.raw);reveal('resultBinding',!!a.raw);
  if(!a.raw)placeRepeatAtReview(false);
  if(a.raw){$('reviewHint').textContent=(a.raw.timing?.level==='recording'?'未提供词句时间，只能回听整段录音；文字分段不表示音频位置。':a.raw.wordTiming?.status==='PARTIAL'?'部分词时间不可用，回听会扩大范围。':'')+'重点核对数字、术语、否定与条件。诊断只使用确认后的文字，回听可选。';const v=latest(a),texts=transcriptTexts(a);v.spans.forEach((s,i)=>{const row=el('div',undefined,'spanRow'),editor=el('textarea');editor.setAttribute('aria-label',typed?'核对文字讲解':a.raw.timing?.level==='recording'?'核对转写文字（无词句时间）':`核对文字 ${s.start.toFixed(1)} 至 ${s.end.toFixed(1)} 秒`);editor.value=texts[i];editor.rows=2;editor.maxLength=2000;editor.oninput=()=>{updateTranscriptDraft(a,v.spans.map(span=>({id:span.id,text:editors.get(span.id).value})));voiceDrafts.mark(topic);const state=diagnosisStates.get(a);if(state&&!state.pending&&!state.saveFailed)diagnosisStates.delete(a);updateDiagnosisState();};editor.onblur=()=>act(()=>voiceDrafts.flush());editors.set(s.id,editor);const b=!typed&&button(a.raw.timing?.level==='recording'?'回听整段录音（无词句时间）':`回听 ${s.start.toFixed(1)}–${s.end.toFixed(1)} 秒`,()=>play(s.start,s.end,()=>{b.textContent='已回听 ✓';}));if(b)row.append(b);row.append(editor);$('transcript').append(row);});
    for(const report of a.reports.filter(r=>r.transcriptVersion===v.id)){
      if(report.channel==='delivery')$('processFeedback').append(el('p','历史过程报告（旧格式，未作为定位证据）','muted'),...report.findings.map(f=>el('p',f.message)));
    }
    if(!typed)renderProcess(a);updateDiagnosisState();
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
  const target=topic;if(current!==a||!target?.attempts.includes(a)||deleted.has(a))throw new Error('INVALID_REFERENCE');
  const evidence=confirmLocalProcess(attemptRequest(a),event,a.observation?.events??[]);
  if(!processFor(a).some(e=>e.id===evidence.id))a.reports.push({channel:'process',attemptId:a.id,transcriptVersion:evidence.transcriptVersion,processEvidence:[evidence],createdAt:Date.now()});
  processing=true;
  try{await save();if(topic===target&&!deleted.has(a)){renderAttempt();notice('过程证据已在本机保存，未调用模型；它本身不表示理解有误。');}}finally{processing=false;}
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
  if(view.current){await voiceDrafts.flush();updateDiagnosisState();focusDiagnosis();return;}
  processing=true;diagnosisStates.set(a,{pending:true});updateDiagnosisState();let complete=false;
  try{
    await voiceDrafts.flush();
    const corrected=revisedTranscript(a,view.draft.map(text=>({text})));a.corrections.push(corrected);delete a.transcriptDraft;await save();await diagnose(a);complete=true;
  }catch(e){diagnosisStates.set(a,{saveFailed:e.message==='STORAGE_FAILED',error:e.message==='STORAGE_FAILED'?'本机保存失败；请重试保存或导出，不要重新提交诊断。':'本次诊断未完成或结果未知；先前结果已保留，不会自动重试。'});throw e;}
  finally{processing=false;const state=diagnosisStates.get(a);if(state?.pending)diagnosisStates.delete(a);if(current===a){updateDiagnosisState();if(complete)focusDiagnosis();}}
});
async function diagnose(a){
  const channel='content',events=[],request=attemptRequest(a);notice('正在核对内容和逻辑……');
  const issues=judgementIssues(a.judgementIssues,a.source);
  const result=await api('/api/diagnose',{source:a.source,attempt:request,channel,events,...(issues.length?{judgementIssues:issues}:{})});
  if(deleted.has(a)||!topic||deleted.has(topic.id))return;
  validateJudgementReport(result.value,a.source,request,issues);a.reports.push({...result.value,id:uid(),channel,analysis:analysisTrace(result,a.inputMode),createdAt:Date.now()});a.status='DIAGNOSED';topic.resume={view:'attempt',attemptId:a.id};await save();renderAttempt();renderPractice();notice('内容反馈已保存。');
}
function renderFeedback(report,{version=latest(current),stale=false}={}){
  if(report.channel!=='content')return;
  if(!version.reviewed||current.interrupted&&!current.fragmentAcceptedAt){$('feedback').append(el('p','先确认用于诊断的转写，再查看内容定位。','muted'));return;}
  appendJudgementSummary($('feedback'),report,!report.judgement||stale?{}:{canPractice:serviceCapabilities?.ai===true,onPractice:issueId=>act(async()=>{
    if(!canNavigate())return;await flushDrafts();
    await practice.fromConditions({sourceId:report.sourceId,attemptId:report.attemptId,transcriptVersion:report.transcriptVersion,reportId:report.id,issueIds:[issueId]});
  })});
  let targets=[];try{const {sourceId,attemptId,transcriptVersion,findings}=report;targets=localize({source:current.source,attempt:{...attemptRequest(current),transcriptVersion:version.id,spans:version.spans,reviewed:version.reviewed===true},report:{sourceId,attemptId,transcriptVersion,findings},evidence:(current.reports??[]).filter(r=>r.channel==='process'&&r.transcriptVersion===version.id).flatMap(r=>r.processEvidence),events:current.observation?.events??[]}).diagnosticTargets;}catch{ $('feedback').append(el('p','该反馈尚未通过当前来源／转写校验，不生成定位建议。','muted')); }
  if(!report.findings.length&&!report.judgement)$('feedback').append(el('p','本次没有足够证据生成此类反馈。'));
  const labels={supported:'已表达',missing:'本次尚未表达',incorrect:'需要澄清',unknown:'证据不足'},order={incorrect:0,missing:1,unknown:2,supported:3};
  const overview=el('div',undefined,'feedback-overview');
  const supportedCount=report.findings.filter(f=>f.status==='supported').length;let supportedGroup;
  for(const status of ['incorrect','missing','unknown','supported']){const count=report.findings.filter(f=>f.status===status).length;if(count&&!(status==='supported'&&supportedCount>1))overview.append(el('span',`${labels[status]} ${count}`));}
  if(report.findings.length>1)$('feedback').append(overview);
  // Keep the original finding index for evidence IDs while grouping by status.
  for(const [index,f] of [...report.findings.entries()].sort((a,b)=>order[a[1].status]-order[b[1].status])){const card=el('article',undefined,'finding');card.dataset.status=f.status;card.append(el('strong',labels[f.status]),el('h4',f.message));
    const evidence=el('details');evidence.append(el('summary','查看材料与原话'),el('blockquote',`材料：${f.sourceQuote}`));
    const material=current.source;
    evidence.append(button('查看材料位置',async()=>{
      if(!canNavigate())return;
      if(report.id){
        const ref=feedbackReference(current,report,index);
        topic.resume={view:'attempt',attemptId:current.id,feedbackOrigin:{origin:{feedbackRef:ref},fromRecord:true}};
        await save();
      }
      const drawer=$('sourceDrawer');
      $('drawerTitle').textContent=material.title;
      const node=renderMaterial({textNode:$('drawerText'),locationNode:$('drawerLocation'),source:material,quote:f.sourceQuote});
      $('sourceReturn').onclick=()=>drawer.close();
      drawer.onclose=()=>{if(drawer.open)return;reveal('sourceReturn',false);focusHit(card.isConnected?card:$('contentHeading'));};
      reveal('sourceReturn');drawer.showModal();focusHit(node);
    }));
    if(f.spanId){const span=version.spans.find(s=>s.id===f.spanId),anchor=current.inputMode!=='text'&&quotePlayback(current.raw,span,f.quote);evidence.append(el('blockquote',`本次原话：${f.quote}`));if(anchor){const replay=button(playbackLabel(anchor),()=>play(anchor.start,anchor.end));replay.dataset.replay=anchor.level;evidence.append(replay);}}else if(current.inputMode!=='text')evidence.append(el('p','未表达的内容没有音频位置。','muted'));
    if(!f.spanId&&current.inputMode==='text')evidence.append(el('p','这项内容未在本次讲解中找到对应原话。','muted'));
    card.append(evidence);
    const target=targets.find(t=>t.contentFindingIds.includes(`content:${current.id}:${report.transcriptVersion}:${index}`));
    const condition=report.judgement?.assessments.find(a=>a.findingIndexes.includes(index));
    if(condition)card.append(el('p',`本项按“${report.judgement.issues.find(i=>i.id===condition.issueId).question}”的所选条件核对。可修改讲解再次分析，或从上方条件卡进入新练习。`,'muted'));
    if(target&&!stale&&!condition){card.dataset.targetId=target.id;
      evidence.append(el('p',`原补学建议：${target.focus}`,'muted'));
      if(target.processEvidenceIds.length)card.append(el('p',`另有 ${target.processEvidenceIds.length} 条同段过程观察，见“讲解过程”；时间相邻不证明理解有误。`,'muted'));
      const taskTarget={attempt:{...attemptRequest(current),transcriptVersion:version.id,spans:version.spans,reviewed:version.reviewed===true},
        report:{sourceId:report.sourceId,attemptId:report.attemptId,transcriptVersion:report.transcriptVersion,findings:report.findings},findingIndex:index};
      const answer=button('检验理解',async()=>{if(!canNavigate())return;await flushDrafts();await practice.fromFeedback({...taskTarget,feedbackRef:feedbackReference(current,report,index)});},'quiet diagnosticTarget');answer.dataset.answerTarget=target.id;
      const alternatives=el('div',undefined,'compact-actions feedback-alternatives');
      alternatives.append(button('再学这一点',async()=>{if(!canNavigate())return;if(report.id)topic.repairRef=feedbackReference(current,report,index);topic.focus=target.focus;await teach('请针对这一点帮助我理解，不要直接给整篇背诵稿。','repair',target.focus,{internalStarter:true});$('messages').scrollIntoView({behavior:'smooth'});}),button('再讲这一点',()=>prepare('partial',target.focus,current.id,feedbackReference(current,report,index))));
      card.append(alternatives,answer);
      if(f.status!=='unknown')card.append(button('独立检验',async()=>{if(!canNavigate())return;await flushDrafts();await practice.fromFeedback({...taskTarget,feedbackRef:feedbackReference(current,report,index)},{closedBook:true});},'quiet'));}
    if(f.status==='supported'&&supportedCount>1){
      if(!supportedGroup){supportedGroup=el('details',undefined,'supported-findings');supportedGroup.append(el('summary',`已表达 ${supportedCount} 项`));$('feedback').append(supportedGroup);}
      supportedGroup.append(card);
    }else $('feedback').append(card);
  }
}
$('checkOriginal').onclick=()=>act(()=>checkFromReference(current?.feedbackRef));
async function checkFromReference(ref){
  if(!canNavigate()||!ref)return;
  const match=resolveFeedback(topic,{feedbackRef:ref});
  if(!match.finding||!['missing','incorrect'].includes(match.finding.status))return notice('请回到当时反馈核对适用条件。');
  const attempt={...attemptRequest(match.attempt),transcriptVersion:match.version.id,spans:match.version.spans,reviewed:true};
  await flushDrafts();
  const {sourceId,attemptId,transcriptVersion,findings}=match.report;
  await practice.fromFeedback({attempt,report:{sourceId,attemptId,transcriptVersion,findings},findingIndex:ref.findingIndex,feedbackRef:ref},{closedBook:true});
}
$('apply').onclick=()=>act(async()=>{if(!canNavigate())return;await flushDrafts();await practice.start();});
$('startPractice').onclick=()=>act(async()=>{if(!canNavigate())return;await flushDrafts();await practice.open();});
async function exportTopic(target=topic){
  if(!target)return;
  const url=URL.createObjectURL(new Blob([await encodeBackup(target)],{type:'application/json'}));const link=el('a');link.href=url;link.download=`study-${target.id}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
$('export').onclick=()=>act(exportTopic);
$('recoveryExport').onclick=()=>act(exportTopic);
$('topicExport').onclick=()=>act(async()=>{await flushDrafts();await exportTopic();});
$('retrySave').onclick=()=>act(async()=>{if(storageConflict)return;if(chat.hasPendingDraft||practice.hasPendingDraft||materials.hasPendingDraft||voiceDrafts.pending)await flushDrafts();else await save();chat.render();if(current){diagnosisStates.delete(current);renderAttempt();}renderPractice();renderChatRecovery();notice('已重新保存到本机。');});
function abortPending(){controller?.abort();}
$('deleteAttempt').onclick=()=>act(async()=>{if(!current)return;await voiceDrafts.discard();abortPending();deleted.add(current);topic.attempts=topic.attempts.filter(a=>a.id!==current.id);await save();$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);current=null;reveal('attemptPanel',false);notice('这次原声及其关联转写、纠正和反馈已从本地删除。已导出副本和已在途的云请求不受此操作控制。');});
function resumeTopic(target,point=resumePoint(target)){
  topic=target;target.resume=point;current=null;$('player').pause();reveal('recording',false);reveal('attemptPanel',false);reveal('history',false);reveal('searchReturn',false);renderTopic();
  if(point.view==='attempt'){current=target.attempts.find(a=>a.id===point.attemptId);if(current)renderAttempt();if(point.feedbackOrigin){showFeedbackOrigin(point.feedbackOrigin.origin,point.feedbackOrigin.target);if(point.feedbackOrigin.fromRecord)reveal('returnToPractice',false);}}
  if(point.view==='practice')practice.focusPanel();
  $('goalEditor').open=false;
}
$('continuationOrigin').onclick=()=>act(async()=>{
  if(!canNavigate()||!current?.continuation)return;await flushDrafts();const ref=current.continuation,old=continuationOrigin(topic,ref);if(!old.attempt)return;
  selectContext(topic,ref.sourceId);topic.resume={view:'attempt',attemptId:old.attempt.id};await save();resumeTopic(topic);
});
function resumeLastActivity(target){
  const point=resumePoint(target);
  resumeTopic(target,point);
  if(target.textDraft&&point.view!=='practice'&&!point.feedbackOrigin){
    const draft=target.textDraft;
    showPreparation(draft.kind,draft.focus,draft.parentId,draft.feedbackRef);
  }else if(point.view==='attempt'&&!point.feedbackOrigin){
    focusHit($('attemptHeading'));
  }
}
function renderHome(records){
  const last=records[0];
  reveal('homeResume',!!last);
  document.querySelector('#setup .welcome h1').textContent=last?'新主题':'今天想讲清什么？';
  if(!last)return;
  $('resumeTitle').textContent=last.studyTitle??last.source.title;
  const point=resumePoint(last);
  const round=point.view==='practice'&&activePractice(last);
  const entry=point.view==='attempt'&&learningRecord(last).find(e=>e.attempt.id===point.attemptId&&e.current);
  $('resumeDetail').textContent=round?roundState(round)+' · '+round.question:last.textDraft?'继续讲解 · '+(last.textDraft.focus||last.textDraft.text.slice(0,70)):entry?entry.state+' · '+(entry.finding?.message??entry.reason):point.view==='practice'?'查看待处理的练习':point.view==='attempt'?'继续核对上次讲解':'回到材料与讨论';
  $('resumeLast').onclick=()=>act(()=>continueTopic(last.id));
}
async function refreshHome(){renderHome((await db.all()).sort((a,b)=>activityTime(b)-activityTime(a)));}
async function continueTopic(id,point,hitKey){
  if(!canNavigate())return;
  processing=true;$('workspace').setAttribute('aria-busy','true');
  try{
    await flushDrafts();const target=await db.get(id);
    if(!target)return notice('这条学习记录已不存在，请重新打开学习记录。');
    const hit=hitKey&&resolveRecordHit(target,hitKey);
    if(hit){if(hit.target.contextId)selectContext(target,hit.target.contextId);point=hitDestination(hit);if(hit.target.kind==='practice')point.roundId=hit.target.roundId;}
    if(point?.contextId)selectContext(target,point.contextId);
    if(point?.pendingFeedbackRef){
      if(!sameFeedbackReference(target.taskUnavailable?.origin?.feedbackRef,point.pendingFeedbackRef))return notice('这条反馈已没有待检验项。');
      target.activePracticeId=null;point={view:'practice'};
    }else if(point?.roundId){target.activePracticeId=point.roundId;point={view:'practice'};}
    if(point)target.resume=point;
    if(point||hit)resumeTopic(target);else resumeLastActivity(target);
    await save();
    if(hit){await new Promise(requestAnimationFrame);locateHit(hit);reveal('searchReturn');}
  }finally{processing=false;$('workspace').removeAttribute('aria-busy');renderChatRecovery();}
}
function expiryLabel(t){return '保留至 '+new Date((t.restoredAt??t.createdAt)+RETENTION_MS).toLocaleString()+' · 继续学习不会延长，请及时导出备份';}
let historyRecords=[],historyLimit=20;
async function history(){
  if(!canNavigate())return;
  processing=true;$('history').setAttribute('aria-busy','true');
  try{
    await flushDrafts();
    historyRecords=(await db.all()).sort((a,b)=>activityTime(b)-activityTime(a));historyLimit=20;
    reveal('history');renderHistory();$('historyTitle').focus();
    $('history').scrollIntoView({behavior:'smooth'});
  }finally{processing=false;$('history').removeAttribute('aria-busy');}
}
function renderHistory(){
  const matches=searchRecords(historyRecords,$('historySearch').value,$('historyFilter').value);
  const list=$('historyList');list.replaceChildren();
  $('historyCount').textContent=`${matches.length} 条记录`;
  $('historyClear').hidden=!$('historySearch').value&&$('historyFilter').value==='all';
  $('historyMore').hidden=matches.length<=historyLimit;
  for(const {topic:t,hits} of matches.slice(0,historyLimit)){
    const point=resumePoint(t),rounds=practiceRounds(t),row=el('div');
    const next=point.view==='attempt'?'继续核对与反馈':point.view==='practice'?'继续情境练习':'继续学习';
    row.append(el('strong',t.studyTitle??t.source.title),el('p',expiryLabel(t),'muted expiry-label'));
    if(hasDraft(t))row.append(el('span','有草稿','tag draft-tag'));
    row.append(el('p',`${new Date(activityTime(t)).toLocaleString()} · ${learningContexts(t).reduce((n,c)=>n+c.attempts.length,0)} 次讲解 · ${learningContexts(t).reduce((n,c)=>n+(c.practiceRounds?.length??0),0)} 道情境题${t.restoredAt?' · 恢复副本':''}`,'muted'));
    const hitButton=hit=>button(hit.snippet,()=>continueTopic(t.id,null,hit.key),'quiet history-hit history-snippet');
    row.append(...hits.slice(0,3).map(hitButton));
    if(hits.length>3){const more=el('details');more.append(el('summary',`其余 ${hits.length-3} 处匹配`));more.ontoggle=()=>{if(more.open&&more.children.length===1)more.append(...hits.slice(3).map(hitButton));};row.append(more);}
    const actions=el('div',undefined,'compact-actions');
    actions.append(button(next,()=>continueTopic(t.id),'quiet history-continue'),button('导出备份',async()=>{if(!canNavigate())return;const saved=await db.get(t.id);if(saved)await exportTopic(saved);}));
    actions.append(button('删除主题',async()=>{if(topic?.id===t.id)await discardDrafts();else await flushDrafts();abortPending();deleted.add(t.id);await db.delete(t.id);if(topic?.id===t.id){topic=null;current=null;$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);reveal('workspace',false);reveal('dock',false);reveal('setup');renderPractice();}await refreshHome();await history();},'danger'));row.append(actions);
    const attempts=learningContexts(t).flatMap(c=>c.attempts.map(a=>({a,contextId:c.source.id,label:c.source.title})));
    if(attempts.length){const details=el('details');details.append(el('summary',`讲解记录 · ${attempts.length}`));for(const {a,contextId,label} of attempts)details.append(button(`${a.kind==='partial'?'局部':'完整'}${a.inputMode==='text'?'文字':''} · ${new Date(a.createdAt).toLocaleTimeString()}${t.materials?' · '+label:''}`,()=>continueTopic(t.id,{view:'attempt',attemptId:a.id,contextId})));row.append(details);}
    list.append(row);
  }
  if(!matches.length)list.append(el('p',historyRecords.length?'没有匹配的记录。':'还没有保存的学习记录。'));
}
$('recordClose').onclick=()=>$('recordDialog').close();
$('openRecord').onclick=()=>act(async()=>{
  if(!canNavigate())return;
  await flushDrafts();
  const list=$('recordItems');list.replaceChildren();
  $('recordContext').textContent=topic.source.title+' · 当前材料组合';
  const entries=learningRecord(topic);
  if(!entries.length)list.append(el('p','保存并确认讲解后，这里会汇集原话、诊断与后续练习。'));
  const jump=(point)=>{ $('recordDialog').close();return continueTopic(topic.id,point); };
  for(const e of entries){
    const card=el('article',undefined,'record-item');
    card.append(el('strong',e.state),el('h3',e.finding?.message??e.issue?.question??e.reason));
    if(e.goal)card.append(el('p','当时的目标 · '+e.goal,'muted'));
    const details=el('details');details.append(el('summary','核对原文与学习经过'));
    if(e.finding){
      details.append(el('blockquote',e.finding.sourceQuote),el('p','初讲 · '+(e.finding.quote??'本次未表达')));
      if(e.repeat){const v=e.repeat.corrections.at(-1)??e.repeat.raw;details.append(el('p','局部重讲 · '+(v?.spans.map(s=>s.text).join(' ')??'原声待转写')));}
      if(e.round)details.append(el('p','练习 · '+e.round.question),el('p','作答 · '+(e.round.answers.at(-1)?.text??'尚未提交')));
    }else details.append(el('p',e.reason),...(e.issue?.evidence??[]).map(v=>el('blockquote',v.quote)));
    card.append(details);
    const actions=el('div',undefined,'compact-actions');
    actions.append(button('查看原讲解',()=>jump({view:'attempt',attemptId:e.attempt.id,...(e.ref?.reportId?{feedbackOrigin:{origin:{feedbackRef:e.ref},fromRecord:true}}:{})})));
    if(e.repeat)actions.append(button('查看重讲',async()=>{await jump({view:'attempt',attemptId:e.repeat.id});$('attemptComparison').open=true;focusHit($('attemptComparison'));}));
    if(e.pendingCheck)actions.append(button('继续待检验',()=>jump({view:'practice',pendingFeedbackRef:e.ref})));
    if(e.round)actions.append(button('查看这道题',()=>jump({view:'practice',roundId:e.round.id})));
    card.append(actions);list.append(card);
  }
  $('recordDialog').showModal();
});
$('repairReturn').onclick=()=>act(()=>{
  const ref=topic?.repairRef,match=ref&&resolveFeedback(topic,{feedbackRef:ref});
  if(!match?.finding)return notice('原反馈已删除，可重新选择一条反馈。');
  prepare('partial',match.finding.repair,match.attempt.id,ref);
});
$('goalEditor').ontoggle=()=>{
  if(!$('goalEditor').open||!topic)return;
  const options=[el('option','自定目标'),...topic.goals.map(g=>el('option',g.text))];
  $('goalCandidates').replaceChildren(...options);
  const value=topic.selectedGoal??topic.goals[0];
  $('goalCandidates').selectedIndex=topic.selectedGoal||!topic.goals.length?0:1;
  $('goalText').value=value?.text??topic.setupContext?.focus??'';
  $('goalQuote').value=value?.sourceQuote??'';$('goalStatus').textContent='';
};
$('goalCandidates').onchange=()=>{
  const goal=topic.goals[$('goalCandidates').selectedIndex-1];
  $('goalText').value=goal?.text??'';$('goalQuote').value=goal?.sourceQuote??'';
};
$('saveGoal').onclick=()=>act(async()=>{
  if(!canNavigate())return;
  const text=$('goalText').value.trim(),sourceQuote=$('goalQuote').value.trim();
  if(!text||!sourceQuote||!topic.source.text.includes(sourceQuote)){
    $('goalStatus').textContent='请填写目标，并粘贴当前材料中可核对的原句。';return;
  }
  topic.selectedGoal={id:uid(),text,sourceQuote};await save();renderTopic();
  $('goalStatus').textContent='新讲解将采用此目标；原反馈的文字重讲沿用当时目标。';
});
$('historySearch').oninput=$('historyFilter').onchange=()=>{historyLimit=20;renderHistory();};
$('historyClear').onclick=()=>{$('historySearch').value='';$('historyFilter').value='all';historyLimit=20;renderHistory();$('historySearch').focus();};
$('historyMore').onclick=()=>{historyLimit+=20;renderHistory();};
$('historyButton').onclick=()=>act(history);
$('searchReturn').onclick=()=>act(history);
function showFeedbackOrigin(origin,target){
  const match=origin?.conditionRef?resolveConditionFeedback(topic,origin.conditionRef):resolveFeedback(topic,origin,target);
  if(!match.report){notice(match.reason);return false;}
  const {report,version,finding}=match;
  $('searchExcerptTitle').textContent=(topic.resume?.feedbackOrigin?.fromRecord?'当时反馈':'练习原反馈')+' · 只读 · 版本 '+version.id.slice(0,8);
  if(origin.conditionRef){
    $('searchExcerptText').textContent=[...match.context.issues.flatMap(i=>['当时采用的条件：'+i.condition,...i.evidence.map(e=>e.title+'：'+e.quote)]),...report.judgement.assessments.filter(a=>origin.conditionRef.issueIds.includes(a.issueId)).map(a=>a.reason),...report.findings.map(f=>f.message),'该版本完整文字：'+version.spans.map(s=>s.text).join('\n')].join('\n\n');
    reveal('searchReplay',false);reveal('searchExcerpt');reveal('returnToPractice');focusHit($('searchExcerpt'));return true;
  }
  $('searchExcerptText').textContent=[finding.message,'材料：'+finding.sourceQuote,'当时原话：'+(finding.quote??'本次尚未表达'), '当时建议：'+(finding.repair??'无'), '该版本完整文字：'+version.spans.map(s=>s.text).join('\n')].join('\n\n');
  const span=version.spans.find(s=>s.id===finding.spanId);
  reveal('searchReplay',!!span&&match.attempt.inputMode!=='text');$('searchReplay').textContent=match.attempt.raw?.timing?.level==='recording'?'回听整段录音（无词句时间）':'回听这段原声';
  $('searchReplay').onclick=()=>act(()=>play(span.start,span.end));
  reveal('searchExcerpt');reveal('returnToPractice');focusHit($('searchExcerpt'));
  return true;
}
async function openFeedbackOrigin(origin,target){
  if(!canNavigate())return;
  await flushDrafts();const match=origin?.conditionRef?resolveConditionFeedback(topic,origin.conditionRef):resolveFeedback(topic,origin,target);
  if(!match.report)return notice(match.reason);
  if(!origin.conditionRef)origin.feedbackRef??=feedbackReference(match.attempt,match.report,match.index);
  topic.resume={view:'attempt',attemptId:match.attempt.id,feedbackOrigin:{origin,target}};
  await save();resumeTopic(topic);
}
async function continuePracticeGap(gap){
  if(!canNavigate())return;
  processing=true;
  try{
    await flushDrafts();
    const {origin,target}=gap,ref=origin?.feedbackRef;
    const match=resolveFeedback(topic,origin,target),source=goalSource(topic);
    if(!ref||!match.finding)return '这点仍待检验，但原反馈已无法定位。';
    if(source.id!==match.attempt.source.id||source.text!==match.attempt.source.text||
      (source.anchorVersion??null)!==(match.attempt.source.anchorVersion??null))return '这点仍待检验。请先回到原材料和原重点。';
    const focus=repairFocus(match.finding.repair);
    topic.textDraft??={kind:'partial',focus,parentId:ref.attemptId,
      parentVersionId:ref.transcriptVersion,feedbackRef:structuredClone(ref),text:'',assistance:'source'};
    const attemptId=topic.textDraft.parentId??ref.attemptId;
    topic.resume=topic.attempts.some(a=>a.id===attemptId)?{view:'attempt',attemptId}:{view:'learn'};
    await save();
    resumeTopic(topic);
    showPreparation('partial',focus,ref.attemptId,ref);
  }finally{processing=false;}
}
$('returnToPractice').onclick=()=>act(()=>practice.open());
function locateHit(hit){
  reveal('returnToPractice',false);
  const t=hit.target;
  if(t.kind==='message')return chat.locate(t.index);
  if(t.kind==='material'){materials.showMaterial(t.materialId);return focusHit($('materialPreview'));}
  if(t.kind==='studyIssue'){$('studyIssues').open=true;return focusHit([...$('studyIssueList').children].find(e=>e.dataset.issueId===t.issueId));}
  if(t.kind==='source'){$('sourceDetails').open=true;return focusHit($('sourceText'));}
  if(t.kind==='contextNote'){$('chatContext').open=true;return focusHit($('contextNote'));}
  if(t.kind==='title')return focusHit($('topicTitle'));
  if(t.kind==='textDraft'){showPreparation();$('textComposer').open=true;return focusHit($('textExplanation'));}
  if(t.kind==='chatDraft')return focusHit($('chat'));
  if(t.kind==='practice')return practice.locate(t,focusHit);
  if(t.kind==='transcriptDraft')return focusHit(editors.get(t.spanId));
  let span=null,label=hit.label;
  if(t.kind==='transcript'){
    const match=transcriptHit(current,t);
    if(match.current)return focusHit(editors.get(t.spanId));
    span=match.span;label+=` · 版本 ${match.version.id.slice(0,8)} · 只读`;
  }else if(t.kind==='report'){
    const report=current.reports[t.reportIndex],finding=report.findings[t.index];
    span=[current.raw,...current.corrections].find(v=>v.id===report.transcriptVersion)?.spans.find(s=>s.id===finding.spanId);
    label+=` · 版本 ${report.transcriptVersion.slice(0,8)} · 只读`;
  }
  $('searchExcerptTitle').textContent=label;$('searchExcerptText').textContent=hit.text;
  reveal('searchReplay',!!span&&current.inputMode!=='text');$('searchReplay').textContent=current.raw?.timing?.level==='recording'?'回听整段录音（无词句时间）':'回听这段原声';
  $('searchReplay').onclick=()=>act(()=>play(span.start,span.end));
  reveal('searchExcerpt');focusHit($('searchExcerpt'));
}
$('searchExcerptClose').onclick=()=>act(async()=>{if(!canNavigate())return;const changed=!!topic.resume?.feedbackOrigin;if(changed)delete topic.resume.feedbackOrigin;reveal('searchExcerpt',false);focusHit(editors.values().next().value??$('contentHeading'));if(changed)await save();});
function canNavigate(){if(memoryOnly){notice(friendly('STORAGE_FAILED'));return false;}if(record||capturePending||controller||processing||importPending){notice(friendly('REQUEST_IN_PROGRESS'));return false;}return true;}
async function newTopic(){
  if(importPending||!canNavigate())return false;
  processing=true;
  try{
    await flushDrafts();abortPending();clearImport();materials.clearFilePreview();topic=null;current=null;
    reveal('workspace',false);reveal('dock',false);reveal('history',false);reveal('recording',false);reveal('attemptPanel',false);reveal('searchReturn',false);reveal('setup');
    setupDraft.restore();updateCounts();renderPractice();await refreshHome();notice('');$('source').focus({preventScroll:true});window.scrollTo(0,0);return true;
  }finally{processing=false;}
}
$('newTopic').onclick=()=>act(newTopic);$('revise').onclick=()=>act(async()=>{
  const s=topic.source,context=topic.setupContext;if(!await newTopic())return;
  if(setupDraft.hasContent()){
    $('extractedText').value=s.text;$('selectedFile').textContent=s.title;reveal('importPreview');
    importDocument={...(s.provenance??{fileName:s.title,text:s.text,regions:[]}),revisionOf:s.id};
    notice('已有新建草稿已保留。当前主题材料放在预览中，可选择替换后编辑。');
  }else{
    $('setupFocus').value=context?.focus??'';$('setupKnown').value=context?.known??'';$('title').value=s.title;$('source').value=s.text;setupDraft.capture({provenance:s.provenance,revisionOf:s.id});
    notice('新版材料将建立新的学习记录；旧来源、标准和讲解保留。');
  }
  updateCounts();
});
$('deleteAll').onclick=()=>act(async()=>{if(record)throw new Error('RECORDING_ACTIVE');await discardDrafts();abortPending();for(const t of await db.all())deleted.add(t.id);await db.clear();setupDraft.clear();clearImport();updateCounts();if(topic)deleted.add(topic.id);topic=null;current=null;memoryOnly=false;reveal('storageRecovery',false);$('player').pause();if(blobURL)URL.revokeObjectURL(blobURL);reveal('workspace',false);reveal('dock',false);reveal('history',false);reveal('setup');reveal('attemptPanel',false);renderHome([]);notice('全部本地学习对象已删除。费用账本不含正文，独立保留以防重置预算。导出副本不受此操作控制。');});
// Presentation-only confirmation: cancellation never reaches the original destructive handler.
function confirmDelete(scope,action,trigger,fallback=null){
  if(record||capturePending||processing){notice(friendly('REQUEST_IN_PROGRESS'));return;}
  const dialog=$('deleteDialog');if(dialog.open)return;
  $('deleteScope').textContent=scope;dialog.returnValue='';
  const restore=()=>{const target=trigger?.isConnected&&trigger.getClientRects().length?trigger:fallback?.getClientRects().length?fallback:!$('history').hidden?$('historyTitle'):$('source');target.focus();};
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
for(const link of document.querySelectorAll('a[href="/demo"]'))link.onclick=e=>{e.preventDefault();if(canNavigate())act(async()=>{await flushDrafts();location.assign('/demo');});};
const chat=mountChat({getTopic:()=>topic,save,act,focusHit});
const voiceDrafts=createDraftSaver({save,onError:error=>act(()=>Promise.reject(error)),onStatus:status=>{
  $('termDraftStatus').textContent=status==='error'?'术语未保存':status==='saving'?'正在保存…':status==='saved'?'已保存':'';
  $('textDraftStatus').textContent=status==='error'?(storageConflict?storageConflictMessage:'文字草稿尚未保存，请重试保存。'):status==='saving'?'正在保存草稿…':topic?.textDraft?'文字草稿已保存在本机':'';
  $('voiceDraftStatus').textContent=status==='error'?(storageConflict?storageConflictMessage:'核对草稿未保存'):status==='saving'?'正在保存核对草稿…':current?.transcriptDraft?'核对草稿已保存 · 尚未确认':'';
}});
$('transcriptionTerms').oninput=()=>{if(!topic||capturePending||record)return;topic.transcriptionTerms=$('transcriptionTerms').value;voiceDrafts.mark(topic);};
$('transcriptionTerms').onblur=()=>act(()=>voiceDrafts.flush());
function renderNextEvidence(){
  if(!topic)return;
  const entries=learningRecord(topic);
  const last=topic.attempts?.at(-1);
  const waiting=last&&(!topic.selectedGoal||last.source.anchorVersion===topic.selectedGoal.id)&&
    (last.transcriptDraft||!last.reports?.some(r=>r.channel==='content'&&r.attemptId===last.id&&r.sourceId===last.source.id&&r.transcriptVersion===latest(last)?.id&&sameJudgement(r,last.judgementIssues)));
  const draft=topic.textDraft;
  const e=!draft&&!waiting&&entries.find(entry=>entry.current);
  $('nextState').textContent=draft?'讲解草稿':waiting?(last.raw?'讲解待确认':'原声待核对'):e?.state??'待讲解';
  $('nextFocus').textContent=e?.finding?.message??e?.reason??topic.selectedGoal?.text??topic.setupContext?.focus??'';
  const sameGap=e?.state==='待巩固'&&e.attempt.id===current?.id&&e.finding?.repair&&!e.report.judgement;
  $('nextEvidence').hidden=!$('attemptPanel').hidden&&(!!waiting&&last.id===current?.id||sameGap);
  const proof=async()=>{
    await continueTopic(topic.id,{view:'attempt',attemptId:e.attempt.id,...(e.ref?.reportId?{feedbackOrigin:{origin:{feedbackRef:e.ref},fromRecord:true}}:{})});
    if(!e.ref?.reportId)focusHit($('contentHeading'));
  };
  $('nextProof').hidden=!e;$('nextProof').onclick=()=>act(proof);
  let label,action;
  if(draft){
    label='继续文字草稿';action=()=>prepare(draft.kind,draft.focus,draft.parentId,draft.feedbackRef);
  }else if(waiting){
    label=last.raw?'核对这次讲解':'试听这次原声';
    action=async()=>{await continueTopic(topic.id,{view:'attempt',attemptId:last.id});focusHit($('voiceHeading'));};
  }else if(!e){
    label='开始讲解';action=()=>prepare();
  }else if(e.state==='本次独立检验通过'||e.state==='本次已表达'){
    label=e.state==='本次独立检验通过'?'查看本轮总结':'查看本次表达';action=()=>$('openRecord').click();
  }else if(e.round){
    label=e.state==='题目待核对'?'继续核对题目':e.state==='待提交作答'?'继续作答草稿':'回到这道题';
    action=async()=>{await continueTopic(topic.id,{view:'practice',roundId:e.round.id});if(e.state==='题目待核对')focusHit($('reviewHeading'));};
  }else if(e.repeat&&e.ref?.reportId&&['missing','incorrect'].includes(e.finding?.status)){
    label='做新情境检验';action=()=>checkFromReference(e.ref);
  }else if(e.state==='待巩固'&&e.ref?.reportId&&e.finding?.repair&&!e.report.judgement){
    label='重讲这一点';action=()=>prepare('partial',e.finding.repair,e.attempt.id,e.ref);
  }else if(e.issue){
    label='核对适用条件';action=async()=>{await continueTopic(topic.id,{view:'attempt',attemptId:e.attempt.id});$('judgementChoices').open=true;focusHit($('judgementChoices'));};
  }else{
    label='核对反馈依据';action=proof;
  }
  $('nextAction').textContent=label;
  $('nextAction').onclick=()=>act(async()=>{if(canNavigate())await action();});
}
async function flushDrafts(){setupDraft.flush();await chat.flushDraft();await practice.flushDraft();await voiceDrafts.flush();await materials.flushDraft();}
async function discardDrafts(){await chat.discardDraft();await practice.discardDraft();await voiceDrafts.discard();await materials.discardDraft();}
const materials=mountMaterialSet({getTopic:()=>topic,save,request:api,canStart:canNavigate,setBusy:value=>{processing=value;if(current?.raw)updateDiagnosisState();},beforeChange:flushDrafts,onSwitch:()=>resumeTopic(topic),onReference:()=>practice.noteReference('material'),act});
const practice=mountPractice({getTopic:()=>topic,save,request:api,canStart:canNavigate,aiReady:()=>serviceCapabilities?.ai===true,requireAI:()=>{if(serviceCapabilities?.ai!==true)throw new Error('CREDENTIAL_MISSING');},
  onChanged:renderNextEvidence,setBusy:value=>{processing=value;},act,onFeedback:openFeedbackOrigin,onContinueGap:continuePracticeGap,onOpen:()=>{current=null;$('player').pause();reveal('recording',false);reveal('attemptPanel',false);}});
mountBackup({getStore:()=>db,canStart:canNavigate,setBusy:value=>{processing=value;if(!value)renderChatRecovery();},
  beforeRestore:flushDrafts,onRestore:target=>{resumeTopic(target);notice('备份已恢复为新副本。');}});
function renderPractice(){practice.render();}
const setupDraft=mountSetupDraft({$,storage:{getItem:key=>localStorage.getItem(key),setItem:(key,value)=>localStorage.setItem(key,value),removeItem:key=>localStorage.removeItem(key)}});
$('setupDraftRetry').onclick=()=>act(()=>setupDraft.flush());
$('undoImport').onclick=()=>act(()=>{setupDraft.undo();updateCounts();notice('已恢复替换前的正文和标题。');});
$('clearSetupDraft').onclick=()=>confirmDelete('清空尚未开始的新建草稿（正文、标题和学习偏好）。已有学习记录不受影响。',()=>{setupDraft.clear();clearImport();updateCounts();},$('clearSetupDraft'));
updateCounts();
$('refreshCapabilities').onclick=()=>act(refreshCapabilities);
renderService();
await act(async()=>{
  db=await openStore();
  const all=(await db.all()).sort((a,b)=>activityTime(b)-activityTime(a));
  renderHome(all);
  const entry=requestedStudyEntry(new URL(window.location.href));
  if(!entry&&all.length&&!setupDraft.hasContent())resumeLastActivity(all[0]);
  if(entry==='new')document.getElementById('newMaterialHeading').focus();
  await refreshCapabilities();await updateBudget();
});
