import {sourceValue,contentInput,validateFindings,requireValue,text} from './core.mjs';

// A task is separate from an explanation and from the legacy repair suggestion.
export function taskContext(source,attempt,report,findingIndex){
  const input=contentInput(source,attempt);
  validateFindings(report,input.source,attempt,'content');
  const finding=report.findings[findingIndex];
  requireValue(Number.isInteger(findingIndex)&&finding&&['incorrect','missing','unknown'].includes(finding.status),'INVALID_TASK_TARGET');
  return {source:input.source,target:{id:`target:content:${attempt.id}:${attempt.transcriptVersion}:${findingIndex}`,
    attemptId:attempt.id,transcriptVersion:attempt.transcriptVersion,
    status:finding.status,sourceQuote:finding.sourceQuote,quote:finding.quote,explanation:finding.message}};
}
export function validateTask(task,source){
  source=sourceValue(source);
  requireValue(task&&task.sourceId===source.id,'SOURCE_MISMATCH');
  requireValue(/^target:content:[a-zA-Z0-9_-]{1,80}:[a-zA-Z0-9_-]{1,80}:\d+$/.test(task.targetId),'INVALID_TASK_TARGET');
  if(task.exercise===null){
    text(task.unavailableReason,300);return task;
  }
  requireValue(task.unavailableReason===null,'INVALID_TASK');
  const e=task.exercise;
  requireValue(e&&['apply_rule','check_claim','retrieve_fact'].includes(e.kind),'INVALID_TASK');
  text(e.question,500);text(e.expectedAnswer,800);text(e.criterion,800);
  requireValue(Array.isArray(e.basisQuotes)&&e.basisQuotes.length>0&&e.basisQuotes.length<=3,'INVALID_TASK_BASIS');
  for(const quote of e.basisQuotes)requireValue(source.text.includes(text(quote,1500)),'INVALID_SOURCE_QUOTE');
  requireValue(Array.isArray(e.assumptions)&&e.assumptions.length<=1,'INVALID_TASK');
  for(const assumption of e.assumptions)text(assumption,300);
  // Exact quotations establish traceability, not semantic correctness.
  return task;
}
export function validateTaskResult(result,source,targetId){
  validateTask(result,source);requireValue(result.targetId===targetId,'INVALID_TASK_TARGET');return result;
}
export function validateAssessment(result,source,targetId){
  requireValue(result?.sourceId===source.id&&result.targetId===targetId,'INVALID_TASK_TARGET');
  requireValue(['correct','partial','incorrect','unanswerable'].includes(result.verdict),'INVALID_ASSESSMENT');
  text(result.message,1000);
  requireValue(Array.isArray(result.basisQuotes)&&result.basisQuotes.length>0&&result.basisQuotes.length<=3,'INVALID_TASK_BASIS');
  for(const quote of result.basisQuotes)requireValue(source.text.includes(text(quote,1500)),'INVALID_SOURCE_QUOTE');
  return result;
}
