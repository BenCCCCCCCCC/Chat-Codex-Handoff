import {practicePaused,answerDisposition} from './question-review.mjs';
import {mountClosedCheck} from './closed-check.mjs';
import {mountQuestionReview} from './question-review-ui.mjs';
import {activePractice, practiceRounds, createPracticeFlow} from './practice.mjs';
import {createDraftSaver} from './draft-save.mjs';
import {resolveFeedback} from './feedback-reference.mjs';
import {resolveConditionFeedback} from './conditional-practice.mjs';
import {mountPracticeEvidence} from './practice-evidence-ui.mjs';

export function mountPractice({getTopic, save, request, canStart, setBusy, act, onOpen, onFeedback,onChanged=()=>{},requireAI,aiReady=()=>true}) {
  const $ = id => document.getElementById(id);
  const node = (tag, text, cls) => {
    const e = document.createElement(tag); e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
  const drafts=createDraftSaver({save,onStatus:status=>{$('reviewSaveStatus').textContent=status==='error'?'复核草稿未保存，请重试保存。':status==='saving'?'正在保存复核草稿…':status==='saved'?'复核草稿已保存在本机':'';},onError:error=>act(()=>Promise.reject(error))});
  const flushDraft=()=>drafts.flush();
  const flow = createPracticeFlow({getTopic, save, request, canStart, setBusy, requireAI, changed:render});
  const evidenceUI=mountPracticeEvidence({getTopic,flow,drafts,canStart,act});
  const reviewUI=mountQuestionReview({getTopic,flow,drafts,canStart,act});
  const closed=mountClosedCheck({flow,flushDraft,markDraft:t=>drafts.mark(t),getTopic,act});
  function render() {
    const topic = getTopic(), round = activePractice(topic), rounds = practiceRounds(topic);
    onChanged();
    const held=round?.review?.status==='held',paused=practicePaused(round),replaced=round?.review?.status==='replaced';
    const conditionContext=round?.conditionContext??topic?.practiceRequest?.conditionContext;
    const origin=conditionContext?{conditionRef:conditionContext.ref}:round?.origin??topic?.taskUnavailable?.origin,target=round?.taskTarget??topic?.taskUnavailable?.target;
    const destination=topic&&(origin?.conditionRef?resolveConditionFeedback(topic,origin.conditionRef):resolveFeedback(topic,origin,target));
    $('practiceReturn').hidden=!origin;
    $('practiceReturn').disabled=flow.busy||!destination?.report;
    $('practiceOriginStatus').textContent=origin?(destination.report?'来自一次历史反馈；返回不会修改当前讲解。':destination.reason):'';
    $('practicePanel').hidden = !topic || !(round || topic.practiceRequest || topic.taskUnavailable);
    $('practicePanel').dataset.active = String(topic?.resume?.view === 'practice');
    $('practiceNew').disabled = flow.busy;
    $('practiceNew').disabled ||= !aiReady();
    $('practiceNew').hidden = !!round?.task&&!topic?.practiceRequest?.conditionContext;
    $('practiceNew').textContent = topic?.taskUnavailable ? '另开情境练习 · AI' : '换一道题 · AI';
    if(conditionContext)$('practiceNew').textContent=topic?.practiceRequest?.conditionContext?'重试按原条件出题 · AI':'按同样条件换一题 · AI';
    $('startPractice').disabled = flow.busy||!round&&!topic?.practiceRequest&&!topic?.taskUnavailable&&!aiReady();
    $('startPractice').textContent=round?'继续已有练习':topic?.practiceRequest?'查看出题状态':aiReady()?'情境练习':'新情境需配置 AI';
    $('apply').disabled=flow.busy||!aiReady();$('apply').textContent=aiReady()?'试一个新情境 · AI':'新情境需配置 AI';
    $('practiceQuestionSelect').disabled = flow.busy;
    $('practiceDraft').disabled = flow.busy||replaced;
    if(round?.conditionContext)$('practiceDraft').disabled ||= !round.work||!!round.work.answerId||paused;
    $('practiceSubmit').disabled = flow.busy || !round || paused || !!round.task&&!round.draft;
    $('practiceSubmit').disabled ||= !round?.task&&!aiReady();
    if(round?.conditionContext)$('practiceSubmit').disabled ||= !round.work;
    $('practiceSubmit').hidden = paused;
    $('practiceFlag').hidden = !round || paused;
    $('practiceUndoFlag').hidden = !held || round.review.origin!=='learner';
    $('practiceFlag').disabled = $('practiceUndoFlag').disabled = flow.busy;
    $('practiceQuestionSelect').replaceChildren(...rounds.map((r, i) => {
      const option = node('option', `第 ${i + 1} 题${r.review?.status==='held'?' · 待核对':r.review?.status==='replaced'?' · 已修订':r.revision?' · 修订题':''} · ${r.question}`);
      option.value = r.id; option.selected = r === round; return option;
    }));
    if(!round&&rounds.length){
      const placeholder=node('option','选择已有题目');placeholder.value='';placeholder.selected=true;
      $('practiceQuestionSelect').prepend(placeholder);
    }
    $('practiceQuestionSelect').hidden = !rounds.length || rounds.length===1&&!!round;
    $('practiceBody').hidden = !round;
    $('practiceForm').hidden=!!round?.conditionContext&&!round.work;
    closed.render(round,topic?.resume?.view==='practice');
    $('practiceQuestion').textContent = round?.question ?? '';
    $('practiceAssumptions').textContent = round?.task?.exercise.assumptions.join('\n') ?? '';
    $('practiceAssumptions').hidden = !$('practiceAssumptions').textContent;
    $('practiceIntroduction').textContent = round?.introduction ?? '';
    $('practiceIntroduction').hidden = !round?.introduction;
    $('practiceHeading').textContent = round?.revision?'修订题':round?.conditionContext?'按条件练习':round?.task || topic?.taskUnavailable ? '理解检验' : round?.origin ? '旧建议练习' : '情境练习';
    $('practiceDraft').value = round?.draft ?? '';
    $('practiceDraft').hidden = $('practiceDraftLabel').hidden = !!round?.task;
    $('practiceChoices').hidden = !round?.task;
    $('practiceChoices').replaceChildren(node('legend','你的判断'),...(round?.task?.exercise.choices??[]).map(choice=>{
      const label=node('label',''),input=node('input','');
      input.type='radio';input.name='understanding-choice';input.value=choice.id;
      input.checked=round.draft===choice.id;input.disabled=flow.busy||replaced;
      input.onchange=()=>{round.draft=choice.id;topic.resume={view:'practice'};$('practiceSubmit').disabled=paused;drafts.mark(topic);};
      label.append(input,node('span',choice.label));return label;
    }));
    $('practiceGuidance').textContent = replaced?'原题只读 · 请到修订题重新作答':held ? '草稿自动保存 · 判断已暂停' : round?.task ? '本机核对 · 仅判断这一题' : !aiReady()?'草稿可在本机继续 · 配置 AI 后提交':'草稿自动保存 · 提交后发送给 AI';
    $('practiceSubmit').textContent = flow.busy ? '处理中…' :
      round?.task ? '查看判断' :
      round?.answers.some(a => a.text === round.draft?.trim() && a.status !== 'complete' && answerDisposition(round,a)==='current') ? '重试这次回答' : '提交回答';
    $('practiceStatus').textContent = flow.busy ? '正在处理…' :
      replaced ? '题目已修订，原回答和先前反馈保留为历史，不作为答错记录。' :
      held ? (round.review.origin==='local_check' ? '题目与材料记录不一致，已暂停判断。' : round.review.origin==='condition_check'?'条件或题面仍需核对，本次暂缓，不计作答错。':'题目待核对，暂不判断你的回答。') :
      topic?.practiceRequest?.status==='deferred' ? '出题暂缓：'+topic.practiceRequest.reason :
      topic?.practiceRequest ? '上次出题未完成或结果未知，记录仍保留。可先继续讲解或已有练习；配置 AI 后可明确选择重试。' :
      topic?.taskUnavailable ? '暂未生成合适的检验题。可以返回对话继续学习。' : '';
    $('practicePendingConditions').hidden=!topic?.practiceRequest?.conditionContext;
    $('practicePendingConditions').textContent=topic?.practiceRequest?.conditionContext?'待处理的新题采用：'+topic.practiceRequest.conditionContext.issues.map(i=>i.condition).join('；')+'。下方已有题目仍保留各自条件。':'';
    $('practiceAnswers').replaceChildren(...(round?.answers ?? []).map((answer, i) => {
      if(round.conditionContext)return evidenceUI.answerNode(round,answer,i);
      const item = node('article', '', 'practice-answer');
      item.dataset.answerId=answer.id;
      item.append(node('h4', `第 ${i + 1} 次回答`), node('p', answer.text, 'prewrap'));
      const disposition=answerDisposition(round,answer);
      if (answer.result && disposition!=='current') {
        const history=node('details','');
        history.append(node('summary',disposition==='excluded'?'此前反馈（已排除为答错依据）':'此前反馈（未复核）'),node('p',answer.result,'prewrap'));
        item.append(history);
      }
      else if (answer.result) item.append(node('strong', answer.assessment ? ({correct:'本题回答成立',partial:'还缺一点依据',incorrect:'本题需要澄清',unanswerable:'题目需调整'}[answer.assessment.verdict]) : '本次反馈'), node('p', answer.result, 'prewrap'));
      else item.append(node('p', flow.busy && answer.status === 'pending' ? '反馈生成中…' :
        disposition!=='current' ? '此前反馈未完成，回答仅作历史保留，不再重试这次判断。' : '这次反馈未完成或结果未知，回答已保留。重新提交会发起新的模型请求。', 'muted'));
      return item;
    }));
    const scored=round?.answers.some(a=>a.status==='complete'&&answerDisposition(round,a)==='current');
    if(round?.checkMode==='submitted'&&!paused){
      const answer=round.answers.find(a=>a.id===round.closedAnswerId);
      if(answer&&answerDisposition(round,answer)==='current')$('practiceStatus').textContent=answer.assessment.verdict==='correct'?'本次独立检验通过 · 首答正确，自报未另查提示。':'本次独立检验需要修正 · 可返回原反馈。';
    }
    $('practiceRubric').hidden = !round?.task || !scored || paused;
    $('practiceRubric').open=false;
    $('practiceRubricBody').replaceChildren();
    if(round?.task&&scored){
      const e=round.task.exercise;
      $('practiceRubricBody').append(node('p',e.criterion,'muted'),
        ...e.basisQuotes.map(q=>node('blockquote',q)));
    }
    reviewUI.render();
    evidenceUI.render();
    $('practiceDraftLabel').textContent = replaced?'原回答草稿（只读）':round?.answers.length ? '再答一次，或补充你的解释' : '你的回答';
  }
  function focusPanel() {
    onOpen();
    evidenceUI.captureVisible();
    queueMicrotask(()=>{
      $('practicePanel').scrollIntoView({behavior:'instant',block:'start'});
      const round=activePractice(getTopic());
      if($('closedCheck').open)return;
      (round?.review?.status==='held'?$('reviewNote'):round?.review?.status==='replaced'?$('practiceHeading'):round?.task ? ($('practiceChoices').querySelector('input:checked')??$('practiceChoices').querySelector('input')) : round ? $('practiceDraft') : $('practiceHeading')).focus();
    });
  }
  async function start() {
    if (!canStart()) return;
    await flushDraft();
    try { await flow.start(); } finally { if(getTopic()?.resume?.view==='practice')focusPanel(); }
  }
  $('practiceNew').onclick = () => act(start);
  $('practiceFlag').onclick = () => act(async () => {
    evidenceUI.note('review');
    await flushDraft(); await flow.flagQuestion();
    $('reviewHeading').focus();
  });
  $('practiceUndoFlag').onclick = () => act(async () => {
    await flushDraft(); await flow.withdrawFlag();
    $('practiceStatus').focus();
  });
  $('backToChat').onclick = () => act(async () => {
    if (!canStart()) return;
    evidenceUI.note('study');
    await flushDraft();
    const topic=getTopic(); topic.resume={view:'learn'};
    await save(topic); render(); queueMicrotask(()=>$('chat').focus());
  });
  $('practiceReturn').onclick=()=>act(async()=>{
    if(!canStart())return;
    evidenceUI.note('origin');
    await flushDraft();
    const t=getTopic(),r=activePractice(t),saved=r??t.taskUnavailable;
    const context=r?.conditionContext??t.practiceRequest?.conditionContext;
    await onFeedback(context?{conditionRef:context.ref}:saved?.origin,r?.taskTarget??saved?.target);
  });
  $('practiceForm').onsubmit = event => {
    event.preventDefault();
    act(async () => { await flushDraft(); await flow.answer(); });
  };
  $('practiceQuestionSelect').onchange = () => act(async () => {
    const id = $('practiceQuestionSelect').value;
    await flushDraft(); await flow.select(id);
  });
  $('practiceDraft').oninput = () => {
    const topic = getTopic(), round = activePractice(topic);
    if (!round || flow.busy||round.review?.status==='replaced'||round.conditionContext&&(!round.work||round.work.answerId||practicePaused(round))) return;
    round.draft = $('practiceDraft').value;
    topic.resume = {view:'practice'};
    $('practicePanel').dataset.active = 'true';
    drafts.mark(topic);
  };
  $('practiceDraft').onblur = () => act(flushDraft);
  async function open() {
    if(!canStart())return;
    if(!activePractice(getTopic())&&!getTopic()?.practiceRequest&&!getTopic()?.taskUnavailable)return start();
    const topic=getTopic();topic.resume={view:'practice'};
    await save(topic);render();focusPanel();
  }
  function locate(target,focusHit){
    if(target.part==='conditions')return focusHit($('practiceConditions'));
    if(target.part==='review'){
      if(!target.reviewId&&activePractice(getTopic())?.review?.status==='held')return focusHit($('reviewHeading'));
      $('questionReviewHistory').open=true;
      return focusHit([...$('questionReviewEvents').children].find(e=>e.dataset.reviewId===target.reviewId)??$('questionReviewHistory'));
    }
    const answer=target.answerId&&[...$('practiceAnswers').children].find(n=>n.dataset.answerId===target.answerId);
    if(['result','evidence'].includes(target.part)&&answer?.querySelector('details'))answer.querySelector('details').open=true;
    focusHit(answer??$(target.part==='draft'?(activePractice(getTopic())?.task?'practiceChoices':'practiceDraft'):'practiceQuestion'));
  }
  async function fromFeedback(target,options){
    if(!canStart())return;
    await flushDraft();
    try{await flow.fromFeedback(target,options);}finally{focusPanel();}
  }
  async function fromConditions(ref){if(!canStart())return;await flushDraft();try{await flow.fromConditions(ref);}finally{if(getTopic()?.resume?.view==='practice')focusPanel();}}
  return {render, start, open, fromFeedback, fromConditions, noteReference:evidenceUI.note, flushDraft, focusPanel, locate, discardDraft:()=>drafts.discard(), get hasPendingDraft(){return drafts.pending;}};
}
