import {taskContext} from './understanding-task.mjs';
import {boundedTask,validateBoundedTask,assessBoundedTask} from './bounded-understanding.mjs';
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
  if(topic?.taskUnavailable)return null;
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
  if (saved?.view === 'practice' && (activePractice(topic) || topic.practiceRequest || topic.taskUnavailable)) return {view:'practice'};
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
  async function checkLocalTask(topic, round) {
    if (!round.task) return true;
    try {
      validateBoundedTask(round.task,topic.source,round.taskTarget);
      if (round.question !== round.task.exercise?.question) throw Error('INVALID_TASK');
      return true;
    } catch {
      // A broken question/source binding is a task problem, never an answer grade.
      round.review={status:'held',origin:'local_check',createdAt:now()};
      await save(topic);
      return false;
    }
  }
  return {
    get busy() { return busy; },
    fromFeedback: target => run(async topic => {
      const context=taskContext(topic.source,target.attempt,target.report,target.findingIndex),rounds=practiceRounds(topic);
      const same=r=>JSON.stringify(r.taskTarget)===JSON.stringify(context.target);
      const existing=rounds.find(same);
      topic.resume={view:'practice'};
      if(existing){topic.taskUnavailable=null;topic.practiceRequest=null;topic.activePracticeId=existing.id;await save(topic);return;}
      // Keep an unavailable result visible when the same feedback is reopened.
      if(topic.taskUnavailable&&JSON.stringify(topic.taskUnavailable.target)===JSON.stringify(context.target)){
        topic.activePracticeId=null;await save(topic);return;
      }
      const task=boundedTask(context);
      topic.taskUnavailable=null;topic.practiceRequest=null;
      if(task.exercise){
        const round={id:uid(),createdAt:now(),question:task.exercise.question,introduction:'',assistance:'source_visible',
          draft:'',answers:[],task,taskTarget:context.target,
          origin:{targetId:context.target.id,sourceId:topic.source.id,attemptId:context.target.attemptId,transcriptVersion:context.target.transcriptVersion}};
        rounds.push(round);topic.activePracticeId=round.id;
      }else{
        topic.taskUnavailable={target:context.target,reason:task.unavailableReason};topic.activePracticeId=null;
      }
      await save(topic);
    }),
    start: () => run(async topic => {
      const rounds = practiceRounds(topic);
      topic.taskUnavailable=null;
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
      if (!round || round.review?.status==='held' || !text) return;
      if (text.length > 2000) throw new Error('INPUT_TOO_LARGE');
      topic.resume = {view:'practice'};
      if(round.task){
        if (!await checkLocalTask(topic,round)) return;
        const assessment=assessBoundedTask(round.task,topic.source,round.taskTarget,text);
        if(!round.answers.some(a=>a.choiceId===text&&a.status==='complete')){
          round.answers.push({id:uid(),text:round.task.exercise.choices.find(c=>c.id===text).label,
            choiceId:text,createdAt:now(),completedAt:now(),status:'complete',result:assessment.message,assessment});
        }
        round.draft='';await save(topic);return;
      }
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
    flagQuestion: () => run(async topic => {
      const round=activePractice(topic);
      if (!round || round.review?.status==='held') return;
      round.review={status:'held',origin:'learner',createdAt:now()};
      topic.resume={view:'practice'};
      await save(topic);
    }),
    withdrawFlag: () => run(async topic => {
      const round=activePractice(topic);
      if (round?.review?.origin!=='learner') return;
      if (!await checkLocalTask(topic,round)) return;
      round.review=null;
      await save(topic);
    }),
    async select(id) {
      if (busy || !canStart()) return;
      const topic = getTopic();
      if (!practiceRounds(topic).some(r => r.id === id)) return;
      topic.taskUnavailable=null;
      topic.activePracticeId = id; topic.resume = {view:'practice'};
      changed(); await save(topic);
    }
  };
}
