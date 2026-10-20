import {activePractice, practiceRounds, createPracticeFlow} from './practice.mjs';

export function mountPractice({getTopic, save, request, canStart, setBusy, act, onOpen}) {
  const $ = id => document.getElementById(id);
  const node = (tag, text, cls) => {
    const e = document.createElement(tag); e.textContent = text;
    if (cls) e.className = cls;
    return e;
  };
  let draftTimer = null, draftTopic = null, draftSaving = 0;
  function flushDraft() {
    clearTimeout(draftTimer); draftTimer = null;
    if (draftTopic) {
      const target = draftTopic; draftTopic = null; draftSaving++;
      return save(target).finally(() => draftSaving--);
    }
  }
  const flow = createPracticeFlow({getTopic, save, request, canStart, setBusy, changed:render});
  function render() {
    const topic = getTopic(), round = activePractice(topic), rounds = practiceRounds(topic);
    $('practicePanel').hidden = !topic || !(round || topic.practiceRequest);
    $('practicePanel').dataset.active = String(topic?.resume?.view === 'practice');
    $('practiceNew').disabled = flow.busy;
    $('startPractice').disabled = flow.busy;
    $('practiceQuestionSelect').disabled = flow.busy;
    $('practiceDraft').disabled = flow.busy;
    $('practiceSubmit').disabled = flow.busy || !round;
    $('practiceQuestionSelect').replaceChildren(...rounds.map((r, i) => {
      const option = node('option', `第 ${i + 1} 题 · ${r.question}`);
      option.value = r.id; option.selected = r === round; return option;
    }));
    $('practiceQuestionSelect').hidden = rounds.length < 2;
    $('practiceBody').hidden = !round;
    $('practiceQuestion').textContent = round?.question ?? '';
    $('practiceIntroduction').textContent = round?.introduction ?? '';
    $('practiceDraft').value = round?.draft ?? '';
    $('practiceSubmit').textContent = flow.busy ? '处理中…' :
      round?.answers.some(a => a.text === round.draft?.trim() && a.status !== 'complete') ? '重试这次回答' : '提交回答';
    $('practiceStatus').textContent = flow.busy ? '正在处理，回答会保留在本机…' :
      topic?.practiceRequest ? '上次出题未完成或结果未知。可手动重新出题；这会发起新的模型请求。' : '';
    $('practiceAnswers').replaceChildren(...(round?.answers ?? []).map((answer, i) => {
      const item = node('article', '', 'practice-answer');
      item.append(node('h4', `第 ${i + 1} 次回答`), node('p', answer.text, 'prewrap'));
      if (answer.result) item.append(node('strong', '本次反馈'), node('p', answer.result, 'prewrap'));
      else item.append(node('p', flow.busy && answer.status === 'pending' ? '反馈生成中…' :
        '这次反馈未完成或结果未知，回答已保留。重新提交会发起新的模型请求。', 'muted'));
      return item;
    }));
    $('practiceDraftLabel').textContent = round?.answers.length ? '再答一次，或补充你的解释' : '你的回答';
  }
  function focusPanel() {
    onOpen();
    queueMicrotask(()=>{
      $('practicePanel').scrollIntoView({behavior:'instant',block:'start'});
      (activePractice(getTopic()) ? $('practiceDraft') : $('practiceHeading')).focus();
    });
  }
  async function start() {
    if (!canStart()) return;
    await flushDraft();
    try { await flow.start(); } finally { focusPanel(); }
  }
  $('practiceNew').onclick = () => act(start);
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
    draftTopic = topic; clearTimeout(draftTimer);
    draftTimer = setTimeout(() => act(flushDraft), 350);
  };
  $('practiceDraft').onblur = () => act(flushDraft);
  async function open() {
    if(!canStart())return;
    if(!activePractice(getTopic())&&!getTopic()?.practiceRequest)return start();
    const topic=getTopic();topic.resume={view:'practice'};
    await save(topic);render();focusPanel();
  }
  return {render, start, open, flushDraft, focusPanel, get hasPendingDraft(){return !!draftTopic || draftSaving > 0;}};
}
