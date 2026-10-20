import {repairFocus} from './core.mjs';
// Practice records are separate from tutoring messages and recorded attempts.
export function practiceRounds(topic) {
  if (!topic) return [];
  if (!Array.isArray(topic.practiceRounds)) {
    const legacy = topic.apply;
    topic.practiceRounds = legacy?.question ? [{
      id: legacy.id ?? 'legacy-practice', createdAt: legacy.createdAt ?? topic.createdAt,
      question: legacy.question, introduction: '', draft: '', assistance: legacy.assistance ?? 'source_visible',
      answers: legacy.answer ? [{id:'legacy-answer', text:legacy.answer, result:legacy.result ?? null,
        status:legacy.result ? 'complete' : 'unknown', createdAt:legacy.createdAt ?? topic.createdAt}] : []
    }] : [];
  }
  return topic.practiceRounds;
}

export function activePractice(topic) {
  const rounds = practiceRounds(topic);
  return rounds.find(r => r.id === topic?.activePracticeId) ?? rounds.at(-1) ?? null;
}

export function activityTime(topic) {
  return Math.max(topic.updatedAt ?? 0, topic.createdAt ?? 0,
    ...(topic.attempts ?? []).map(a => a.createdAt ?? 0),
    ...practiceRounds(topic).map(r => r.createdAt ?? 0));
}

export function resumePoint(topic) {
  const saved = topic.resume;
  if (saved?.view === 'learn') return saved;
  if (saved?.view === 'practice' && (activePractice(topic) || topic.practiceRequest)) return {view:'practice'};
  const attempt = (topic.attempts ?? []).find(a => a.id === saved?.attemptId);
  if (attempt) return {view:'attempt', attemptId:attempt.id};
  if (['apply','apply_answer'].includes(topic.mode) && activePractice(topic)) return {view:'practice'};
  const last = (topic.attempts ?? []).at(-1);
  return last ? {view:'attempt', attemptId:last.id} : {view:'learn'};
}

export function createPracticeFlow({getTopic, canStart, setBusy, save, request, changed,
  uid = () => crypto.randomUUID(), now = () => Date.now()}) {
  let busy = false;
  async function run(work) {
    if (busy || !canStart()) return;
    const topic = getTopic();
    if (!topic) return;
    busy = true; setBusy(true); changed();
    try { return await work(topic); }
    finally { busy = false; setBusy(false); changed(); }
  }
  async function failed(topic, record, error) {
    // A response may have reached the provider even if this client saw an error.
    if (error.message !== 'STORAGE_FAILED') { record.status = 'unknown'; await save(topic); }
    throw error;
  }
  return {
    get busy() { return busy; },
    fromFeedback: target => run(async topic => {
      const question=repairFocus(target.focus),rounds=practiceRounds(topic);
      // Regenerating a report can change the task without changing its target ID.
      let round=rounds.find(r=>r.origin?.targetId===target.id&&r.question===question);
      if(!round){
        round={id:uid(),createdAt:now(),question,introduction:'',assistance:'source_visible',draft:'',answers:[],
          origin:{targetId:target.id,sourceId:target.sourceId,attemptId:target.attemptId,transcriptVersion:target.transcriptVersion}};
        rounds.push(round);
      }
      topic.activePracticeId=round.id;topic.resume={view:'practice'};
      await save(topic);
    }),
    start: () => run(async topic => {
      const rounds = practiceRounds(topic);
      topic.resume = {view:'practice'};
      const operation = topic.practiceRequest = {status:'pending', createdAt:now()};
      try {
        await save(topic);
        const history = [...topic.messages, ...rounds.slice(-3).map(r => ({role:'assistant', text:r.question}))].slice(-6);
        const result = await request('/api/teach', {source:topic.source, setupContext:topic.setupContext,
          mode:'apply', message:'给我一个新的、相关的应用情境，不要先公布答案。', focus:null, history});
        const round = {id:uid(), createdAt:now(), question:result.value.question,
          introduction:result.value.message, assistance:'source_visible', draft:'', answers:[]};
        rounds.push(round); topic.activePracticeId = round.id;
        topic.practiceRequest = null;
        await save(topic);
      } catch (error) { await failed(topic, operation, error); }
    }),
    answer: () => run(async topic => {
      const round = activePractice(topic), text = round?.draft?.trim();
      if (!text) return;
      if (text.length > 2000) throw new Error('INPUT_TOO_LARGE');
      topic.resume = {view:'practice'};
      // Looking at the same answer again does not buy another model response.
      if (round.answers.some(a => a.text === text && a.status === 'complete')) {
        round.draft = ''; await save(topic); return;
      }
      let answer = round.answers.findLast(a => a.text === text && a.status !== 'complete');
      if (!answer) {
        answer = {id:uid(), text, createdAt:now(), result:null, status:'pending'};
        round.answers.push(answer);
      }
      answer.status = 'pending';
      try {
        await save(topic);
        const prior = round.answers.filter(a => a !== answer && a.status === 'complete')
          .flatMap(a => [{role:'user',text:a.text},{role:'assistant',text:a.result}]);
        const result = await request('/api/teach', {source:topic.source, setupContext:topic.setupContext,
          mode:'apply_answer', message:text, focus:round.question,
          history:[{role:'assistant',text:round.introduction || round.question}, ...prior].slice(-6)});
        answer.result = result.value.message; answer.status = 'complete'; answer.completedAt = now();
        round.draft = ''; await save(topic);
      } catch (error) { await failed(topic, answer, error); }
    }),
    async select(id) {
      if (busy || !canStart()) return;
      const topic = getTopic();
      if (!practiceRounds(topic).some(r => r.id === id)) return;
      topic.activePracticeId = id; topic.resume = {view:'practice'};
      changed(); await save(topic);
    }
  };
}
