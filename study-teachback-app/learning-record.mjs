import {answerDisposition,practicePaused} from './question-review.mjs';
import {sameJudgement} from './judgement.mjs';
import {sameFeedbackReference} from './feedback-reference.mjs';

const latest=a=>a.corrections?.at(-1)??a.raw;

export function roundState(round){
  if(practicePaused(round))return '题目待核对';
  if(round.draft?.trim())return '待提交作答';
  const answer=round.answers.filter(a=>answerDisposition(round,a)==='current').at(-1);
  if(!answer)return '待作答';
  if(answer.status!=='complete')return '已作答，待反馈';
  if(answer.conditionResult?.decision==='deferred')return '条件待核对';
  if(answer.assessment?.verdict==='incorrect')return '继续修正';
  if(round.checkMode==='submitted'&&answer.id===round.closedAnswerId&&answer.assessment?.verdict==='correct'){
    return answer.selfReportedUnseen===true?'本次独立检验通过':'首答正确 · 此前是否见题未记录';
  }
  return answer.assessment?.verdict==='correct'?'本题答对，参考情况未核实':'已作答，查看反馈';
}

// The original report and finding index are the unit of work. Text similarity
// cannot establish identity across material versions, conditions or attempts.
export function learningRecord(context){
  const entries=[];
  for(const attempt of context.attempts??[]){
    const lastReport=(attempt.reports??[]).findLast(r=>r.channel==='content'&&r.transcriptVersion===latest(attempt)?.id&&sameJudgement(r,attempt.judgementIssues));
    for(const report of attempt.reports??[]){
      const version=[attempt.raw,...(attempt.corrections??[])].find(v=>v?.id===report.transcriptVersion);
      if(report.channel!=='content'||!version?.reviewed||attempt.interrupted&&!attempt.fragmentAcceptedAt||
        report.sourceId!==attempt.source.id||report.attemptId!==attempt.id)continue;
      const current=report===lastReport&&!attempt.transcriptDraft&&(!context.selectedGoal||context.selectedGoal.id===attempt.source.anchorVersion);
      const goal=attempt.source.anchors?.map(g=>g.text).join('、')??'';
      for(const [index,finding] of report.findings.entries()){
        const ref={sourceId:attempt.source.id,attemptId:attempt.id,transcriptVersion:report.transcriptVersion,reportId:report.id,findingIndex:index};
        const linked=report.id?(context.practiceRounds??[]).filter(r=>sameFeedbackReference(r.origin?.feedbackRef,ref)):[];
        const repeats=report.id?context.attempts.filter(a=>!a.continuation&&sameFeedbackReference(a.feedbackRef,ref)):[];
        const round=linked.at(-1),repeat=repeats.at(-1);
        const pendingCheck=sameFeedbackReference(context.taskUnavailable?.origin?.feedbackRef,ref);
        const state=pendingCheck?(current?'待检验':'历史反馈 · 待检验'):!current?'历史反馈':round?roundState(round):finding.status==='unknown'?'依据待核对':finding.status==='supported'?'本次已表达':repeat?'已重讲，待情境检验':'待巩固';
        entries.push({attempt,report,index,finding,ref,goal,state,round,repeat,current,pendingCheck});
      }
      for(const assessment of report.judgement?.assessments??[]){
        if(assessment.decision!=='deferred')continue;
        const issue=report.judgement.issues.find(i=>i.id===assessment.issueId);
        entries.push({attempt,report,goal,state:current?'条件待核对':'历史反馈',current,issue,reason:assessment.reason});
      }
    }
  }
  const priority=e=>!e.current?3:e.state==='本次已表达'?2:e.state==='本次独立检验通过'?1:0;
  return entries.sort((a,b)=>priority(a)-priority(b)||(b.report.createdAt??0)-(a.report.createdAt??0));
}
export function goalSource(topic){
  const goal=topic.selectedGoal;
  return goal?{...topic.source,anchors:[{text:goal.text,sourceQuote:goal.sourceQuote}],anchorVersion:goal.id}:topic.source;
}
