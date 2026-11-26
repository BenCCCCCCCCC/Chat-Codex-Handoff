import {identifier} from './core.mjs';

export const sameFeedbackReference=(a,b)=>!!(a?.reportId&&b?.reportId&&
  ['sourceId','attemptId','transcriptVersion','reportId','findingIndex'].every(k=>a[k]===b[k]));

export function validateFeedbackReference(ref){
  for(const key of ['sourceId','attemptId','transcriptVersion','reportId'])identifier(ref?.[key]);
  if(!Number.isInteger(ref.findingIndex)||ref.findingIndex<0||ref.findingIndex>2)throw Error('INVALID_FEEDBACK_REFERENCE');
  return ref;
}
export function feedbackReference(attempt,report,findingIndex,uid=()=>crypto.randomUUID()){
  if(!attempt.reports.includes(report)||report.channel!=='content'||!report.findings[findingIndex])throw Error('INVALID_FEEDBACK_REFERENCE');
  report.id??=uid();
  return validateFeedbackReference({sourceId:attempt.source.id,attemptId:attempt.id,transcriptVersion:report.transcriptVersion,reportId:report.id,findingIndex});
}
// Old records can resolve only by a unique, exact match. Never pick the latest.
export function resolveFeedback(topic,origin,target){
  if(!origin)return {reason:'这道情境练习没有关联历史反馈。'};
  const ref=origin.feedbackRef,attempt=topic.attempts.find(a=>a.id===(ref?.attemptId??origin.attemptId));
  if(!attempt)return {reason:'原讲解已删除或不在这个备份中。'};
  if(attempt.source.id!==(ref?.sourceId??origin.sourceId))return {reason:'原材料版本无法核对。'};
  let candidates=[];
  if(ref){
    try{validateFeedbackReference(ref);}catch{return {reason:'历史反馈定位记录无效。'};}
    candidates=attempt.reports.filter(r=>r.id===ref.reportId&&r.channel==='content'&&r.transcriptVersion===ref.transcriptVersion)
      .map(report=>({report,index:ref.findingIndex})).filter(({report,index})=>report.findings[index]);
  }else if(target){
    for(const report of attempt.reports.filter(r=>r.channel==='content'&&r.transcriptVersion===origin.transcriptVersion)){
      report.findings.forEach((f,index)=>{if(f.status===target.status&&f.sourceQuote===target.sourceQuote&&f.quote===target.quote&&f.message===target.explanation)candidates.push({report,index});});
    }
  }
  if(candidates.length!==1)return {reason:candidates.length?'旧记录对应多份反馈，无法确定原来那一条。':'原反馈已不存在，或旧记录缺少足够的定位信息。'};
  const {report,index}=candidates[0],version=[attempt.raw,...attempt.corrections].find(v=>v?.id===report.transcriptVersion);
  if(!version)return {reason:'原反馈使用的文字版本已不存在。'};
  return {attempt,report,version,finding:report.findings[index],index};
}
