import {text,identifier,repairFocus,requireValue} from './core.mjs';
import {validateFeedbackReference,resolveFeedback} from './feedback-reference.mjs';
import {learningContexts} from './material-set.mjs';
export function validateTextDraft(d){
  requireValue(d&&typeof d.text==='string'&&d.text.length<=2000,'INVALID_TEXT');
  requireValue(['full','partial'].includes(d.kind)&&['none','keywords','source','unknown'].includes(d.assistance),'INVALID_ATTEMPT');
  if(d.kind==='partial')repairFocus(d.focus);
  if(d.parentId!=null)identifier(d.parentId);
  if(d.parentVersionId!=null)identifier(d.parentVersionId);
  if(d.feedbackRef){validateFeedbackReference(d.feedbackRef);requireValue(d.parentId===d.feedbackRef.attemptId&&d.parentVersionId===d.feedbackRef.transcriptVersion,'INVALID_FEEDBACK_REFERENCE');}
  return d;
}
export function makeTextAttempt(topic,draft,{uid=()=>crypto.randomUUID(),now=Date.now,source=topic.source}={}){
  validateTextDraft(draft);const value=text(draft.text.trim(),2000),createdAt=now();
  if(draft.feedbackRef){
    const origin=resolveFeedback(topic,{feedbackRef:draft.feedbackRef}).attempt?.source;
    requireValue(origin&&source.id===origin.id&&source.text===origin.text,'INVALID_FEEDBACK_REFERENCE');
    source=origin;
  }
  return {id:uid(),createdAt,inputMode:'text',kind:draft.kind,focus:draft.focus??null,parentId:draft.parentId??null,
    parentVersionId:draft.parentVersionId??null,...(draft.feedbackRef?{feedbackRef:structuredClone(draft.feedbackRef)}:{}),
    assistance:draft.assistance,source:structuredClone(source),
    raw:{id:uid(),createdAt,origin:'USER_TEXT',text:value,spans:[{id:'p0',text:value}],reviewed:true},
    corrections:[],reports:[],status:'SAVED'};
}
export function comparisonFor(topic,attempt){
  if(attempt.continuation?.attemptId){
    const ref=attempt.continuation,parent=learningContexts(topic).find(c=>c.source.id===ref.sourceId)?.attempts.find(a=>a.id===ref.attemptId);
    const before=[parent?.raw,...(parent?.corrections??[])].find(v=>v?.id===ref.versionId),after=attempt.corrections.at(-1)??attempt.raw;
    if(!before||!after)return {reason:'原讲解或原文字版本已删除，当前续学文字与反馈仍保留。'};
    return {before,after,parent,beforeReports:parent.reports.filter(r=>r.channel==='content'&&r.transcriptVersion===before.id),afterReports:attempt.reports.filter(r=>r.channel==='content'&&r.transcriptVersion===after.id),
      note:'前后采用的材料不同，各自反馈只对应当时依据。承接文字不是一次新的独立作答。'+(ref.fromDraft?'左侧为当时保存版本，不包含未确认的编辑。':'')};
  }
  if(!attempt.parentId)return null;
  const parent=topic.attempts.find(a=>a.id===attempt.parentId);
  if(!parent)return {reason:'原讲解已删除或不在此备份中，本次讲解仍保留。'};
  if(parent.source.id!==attempt.source.id||parent.source.text!==attempt.source.text)return {reason:'前后材料不同，未将两次讲解并作同一依据的对照。'};
  const versions=[parent.raw,...parent.corrections].filter(Boolean);
  const before=attempt.parentVersionId?versions.find(v=>v.id===attempt.parentVersionId):versions.length===1?versions[0]:null;
  const after=attempt.corrections.at(-1)??attempt.raw;
  if(!before||!after)return {reason:'旧记录未固定原文字版本，或讲解尚未取得文字，暂不能准确对照。'};
  const match=attempt.feedbackRef&&resolveFeedback(topic,{feedbackRef:attempt.feedbackRef});
  const report=match?.attempt===parent&&match.version?.id===before.id?match.report:null;
  const beforeReports=attempt.feedbackRef?(report?[report]:[]):parent.reports.filter(r=>r.channel==='content'&&r.transcriptVersion===before.id);
  return {before,after,parent,beforeReports,afterReports:attempt.reports.filter(r=>r.channel==='content'&&r.transcriptVersion===after.id),
    note:attempt.feedbackRef&&!report?'原反馈已不存在；以下仅对照保存的文字。':attempt.transcriptDraft?'右侧为已保存版本，尚未确认的编辑不作为本次反馈依据。':'仅并列保存的表达与反馈，不据此判定已经掌握。'};
}
