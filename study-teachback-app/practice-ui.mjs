import {activePractice, practiceRounds, createPracticeFlow} from './practice.mjs';
import {createDraftSaver} from './draft-save.mjs';

export function mountPractice({getTopic, save, request, canStart, setBusy, act, onOpen}) {
  const $ = id => document.getElementById(id);
  const node = (tag, text, cls) => {
    const e = document.createElement(tag); e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
  const drafts=createDraftSaver({save,onError:error=>act(()=>Promise.reject(error))});
  const flushDraft=()=>drafts.flush();
  const flow = createPracticeFlow({getTopic, save, request, canStart, setBusy, changed:render});
  function render() {
    const topic = getTopic(), round = activePractice(topic), rounds = practiceRounds(topic);
    const held=round?.review?.status==='held';
    $('practicePanel').hidden = !topic || !(round || topic.practiceRequest || topic.taskUnavailable);
    $('practicePanel').dataset.active = String(topic?.resume?.view === 'practice');
    $('practiceNew').disabled = flow.busy;
    $('practiceNew').hidden = !!round?.task;
    $('practiceNew').textContent = topic?.taskUnavailable ? '另开情境练习 · AI' : '换一道题 · AI';
    $('startPractice').disabled = flow.busy;
    $('practiceQuestionSelect').disabled = flow.busy;
    $('practiceDraft').disabled = flow.busy;
    $('practiceSubmit').disabled = flow.busy || !round || held || !!round.task&&!round.draft;
    $('practiceSubmit').hidden = held;
    $('practiceFlag').hidden = !round || held;
    $('practiceUndoFlag').hidden = !held || round.review.origin!=='learner';
    $('practiceFlag').disabled = $('practiceUndoFlag').disabled = flow.busy;
    $('practiceQuestionSelect').replaceChildren(...rounds.map((r, i) => {
      const option = node('option', `第 ${i + 1} 题${r.review?.status==='held'?' · 待核对':''} · ${r.question}`);
      option.value = r.id; option.selected = r === round; return option;
    }));
    if(!round&&rounds.length){
      const placeholder=node('option','选择已有题目');placeholder.value='';placeholder.selected=true;
      $('practiceQuestionSelect').prepend(placeholder);
    }
    $('practiceQuestionSelect').hidden = !rounds.length || rounds.length===1&&!!round;
    $('practiceBody').hidden = !round;
    $('practiceQuestion').textContent = round?.question ?? '';
    $('practiceAssumptions').textContent = round?.task?.exercise.assumptions.join('\n') ?? '';
    $('practiceAssumptions').hidden = !$('practiceAssumptions').textContent;
    $('practiceIntroduction').textContent = round?.introduction ?? '';
    $('practiceIntroduction').hidden = !round?.introduction;
    $('practiceHeading').textContent = round?.task || topic?.taskUnavailable ? '理解检验' : round?.origin ? '旧建议练习' : '情境练习';
    $('practiceDraft').value = round?.draft ?? '';
    $('practiceDraft').hidden = $('practiceDraftLabel').hidden = !!round?.task;
    $('practiceChoices').hidden = !round?.task;
    $('practiceChoices').replaceChildren(node('legend','你的判断'),...(round?.task?.exercise.choices??[]).map(choice=>{
      const label=node('label',''),input=node('input','');
      input.type='radio';input.name='understanding-choice';input.value=choice.id;
      input.checked=round.draft===choice.id;input.disabled=flow.busy;
      input.onchange=()=>{round.draft=choice.id;topic.resume={view:'practice'};$('practiceSubmit').disabled=held;drafts.mark(topic);};
      label.append(input,node('span',choice.label));return label;
    }));
    $('practiceGuidance').textContent = held ? '草稿自动保存 · 判断已暂停' : round?.task ? '本机核对 · 仅判断这一题' : '草稿自动保存 · 提交后发送给 AI';
    $('practiceSubmit').textContent = flow.busy ? '处理中…' :
      round?.task ? '查看判断' :
      round?.answers.some(a => a.text === round.draft?.trim() && a.status !== 'complete') ? '重试这次回答' : '提交回答';
    $('practiceStatus').textContent = flow.busy ? '正在处理…' :
      held ? (round.review.origin==='local_check' ? '题目与材料记录不一致，已暂停判断。' : '题目待核对，暂不判断你的回答。') :
      topic?.practiceRequest ? '上次出题未完成或结果未知。重试会发起新的模型请求。' :
      topic?.taskUnavailable ? '暂未生成合适的检验题。可以返回对话继续学习。' : '';
    $('practiceAnswers').replaceChildren(...(round?.answers ?? []).map((answer, i) => {
      const item = node('article', '', 'practice-answer');
      item.dataset.answerId=answer.id;
      item.append(node('h4', `第 ${i + 1} 次回答`), node('p', answer.text, 'prewrap'));
      if (answer.result && held) {
        const history=node('details','');
        history.append(node('summary','此前反馈（未复核）'),node('p',answer.result,'prewrap'));
        item.append(history);
      }
      else if (answer.result) item.append(node('strong', answer.assessment ? ({correct:'本题回答成立',partial:'还缺一点依据',incorrect:'本题需要澄清',unanswerable:'题目需调整'}[answer.assessment.verdict]) : '本次反馈'), node('p', answer.result, 'prewrap'));
      else item.append(node('p', flow.busy && answer.status === 'pending' ? '反馈生成中…' :
        held ? '此前反馈未完成，回答已保留。' : '这次反馈未完成或结果未知，回答已保留。重新提交会发起新的模型请求。', 'muted'));
      return item;
    }));
    const scored=round?.answers.some(a=>a.status==='complete');
    $('practiceRubric').hidden = !round?.task || !scored || held;
    $('practiceRubric').open=false;
    $('practiceRubricBody').replaceChildren();
    if(round?.task&&scored){
      const e=round.task.exercise;
      $('practiceRubricBody').append(node('p',e.criterion,'muted'),
        ...e.basisQuotes.map(q=>node('blockquote',q)));
    }
    $('practiceDraftLabel').textContent = round?.answers.length ? '再答一次，或补充你的解释' : '你的回答';
  }
  function focusPanel() {
    onOpen();
    queueMicrotask(()=>{
      $('practicePanel').scrollIntoView({behavior:'instant',block:'start'});
      const round=activePractice(getTopic());
      (round?.task ? ($('practiceChoices').querySelector('input:checked')??$('practiceChoices').querySelector('input')) : round ? $('practiceDraft') : $('practiceHeading')).focus();
    });
  }
  async function start() {
    if (!canStart()) return;
    await flushDraft();
    try { await flow.start(); } finally { focusPanel(); }
  }
  $('practiceNew').onclick = () => act(start);
  $('practiceFlag').onclick = () => act(async () => {
    await flushDraft(); await flow.flagQuestion();
    $('practiceStatus').focus();
  });
  $('practiceUndoFlag').onclick = () => act(async () => {
    await flushDraft(); await flow.withdrawFlag();
    $('practiceStatus').focus();
  });
  $('backToChat').onclick = () => act(async () => {
    if (!canStart()) return;
    await flushDraft();
    const topic=getTopic(); topic.resume={view:'learn'};
    await save(topic); render(); queueMicrotask(()=>$('chat').focus());
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
    if (!round || flow.busy) return;
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
    const answer=target.answerId&&[...$('practiceAnswers').children].find(n=>n.dataset.answerId===target.answerId);
    if(target.part==='result'&&answer?.querySelector('details'))answer.querySelector('details').open=true;
    focusHit(answer??$(target.part==='draft'?(activePractice(getTopic())?.task?'practiceChoices':'practiceDraft'):'practiceQuestion'));
  }
  async function fromFeedback(target){
    if(!canStart())return;
    await flushDraft();
    try{await flow.fromFeedback(target);}finally{focusPanel();}
  }
  return {render, start, open, fromFeedback, flushDraft, focusPanel, locate, discardDraft:()=>drafts.discard(), get hasPendingDraft(){return drafts.pending;}};
}
