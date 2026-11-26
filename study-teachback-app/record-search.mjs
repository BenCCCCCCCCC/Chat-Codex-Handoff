import {answerDisposition} from './question-review.mjs';
import {learningContexts} from './material-set.mjs';
import {resolveFeedback,sameFeedbackReference} from './feedback-reference.mjs';
import {evidenceSummary} from './conditional-practice.mjs';
const normalize=value=>String(value??'').normalize('NFKC').toLocaleLowerCase();
const field=(label,text,target)=>({label,text,target,key:JSON.stringify(target)});
function contextFields(topic) {
  return [
    field('主题',topic.source.title,{kind:'title'}),
    field('材料',topic.source.text,{kind:'source'}),
    field('文字讲解草稿',topic.textDraft?.text,{kind:'textDraft'}),
    field('草稿',topic.chatDraft,{kind:'chatDraft'}),
    field('对话要点',topic.contextNote,{kind:'contextNote'}),
    ...(topic.messages??[]).map((m,index)=>field('对话',m.text,{kind:'message',index})),
    ...(topic.attempts??[]).flatMap(a=>[
      ...[a.raw,...(a.corrections??[])].filter(Boolean).flatMap(v=>
        v.spans.map(s=>field(v===a.raw?(a.inputMode==='text'?'文字讲解':'原始转写'):'修订文字',s.text,{kind:'transcript',attemptId:a.id,versionId:v.id,spanId:s.id}))),
      ...(a.transcriptDraft?.edits??[]).map(s=>field('核对草稿',s.text,{kind:'transcriptDraft',attemptId:a.id,spanId:s.id})),
      ...(a.reports??[]).flatMap((r,reportIndex)=>(r.findings??[]).map((f,index)=>
        field('反馈',f.message,{kind:'report',attemptId:a.id,reportIndex,index})))
    ]),
    ...(topic.practiceRounds??[]).flatMap(r=>[
      field('题目疑问',r.review?.status==='held'?r.review.note:null,{kind:'practice',roundId:r.id,part:'review'}),
      ...(r.reviewHistory??[]).map(e=>field('题目复核',e.note,{kind:'practice',roundId:r.id,part:'review',reviewId:e.id})),
      field('练习',r.question,{kind:'practice',roundId:r.id}),
      field('练习适用条件',r.conditionContext?.issues.map(i=>i.condition).join('\n'),{kind:'practice',roundId:r.id,part:'conditions'}),
      field('草稿',r.task?r.task.exercise.choices.find(c=>c.id===r.draft)?.label:r.draft,{kind:'practice',roundId:r.id,part:'draft'}),
      ...r.answers.flatMap(a=>[
        field('回答',a.text,{kind:'practice',roundId:r.id,answerId:a.id}),
        field('作答证据',a.evidence?evidenceSummary(a.evidence):null,{kind:'practice',roundId:r.id,answerId:a.id,part:'evidence'}),
        field(answerDisposition(r,a)==='excluded'?'历史反馈（不作答错依据）':answerDisposition(r,a)==='pending'?'待复核反馈':'反馈',a.result,{kind:'practice',roundId:r.id,answerId:a.id,part:'result'})
      ])
    ]),
    ...(!topic.practiceRounds?.length&&topic.apply?[
      field('练习',topic.apply.question,{kind:'practice',roundId:topic.apply.id??'legacy-practice'}),
      field('回答',topic.apply.answer,{kind:'practice',roundId:topic.apply.id??'legacy-practice',answerId:'legacy-answer'}),
      field('反馈',topic.apply.result,{kind:'practice',roundId:topic.apply.id??'legacy-practice',answerId:'legacy-answer',part:'result'})
    ]:[])
  ].filter(({text})=>typeof text==='string'&&text.length);
}
function contextHasDraft(topic) {
  return !!topic.textDraft?.text?.trim() || !!topic.chatDraft?.trim() || !!topic.practiceRounds?.some(r=>r.review?.status!=='replaced'&&(r.draft?.trim()||r.review?.status==='held')) ||
    !!topic.attempts?.some(a=>a.transcriptDraft);
}
function fields(topic){
  if(!topic.materials)return contextFields(topic);
  return [field('主题',topic.studyTitle,{kind:'title'}),
    ...topic.materials.map(m=>field('材料 · '+m.title,m.title+'\n'+m.text,{kind:'material',materialId:m.id})),
    ...(topic.studyIssues??[]).map(item=>field('学习疑点',item.question+'\n'+item.condition,{kind:'studyIssue',issueId:item.id})),
    ...learningContexts(topic).flatMap(c=>contextFields(c).map(f=>field(f.label,f.text,{...f.target,contextId:c.source.id})))];
}
export function hasDraft(topic){return !!topic.materialRevisionDraft||!!topic.materialDraft?.text?.trim()||!!topic.issueDraft?.question?.trim()||learningContexts(topic).some(contextHasDraft);}
export function resolveRecordHit(topic,key) {return fields(topic).find(f=>f.key===key)??null;}
export function pendingCheckInContext(context,ref=context.taskUnavailable?.origin?.feedbackRef){
  if(!sameFeedbackReference(context.taskUnavailable?.origin?.feedbackRef,ref))return null;
  const {attempt,report,version,finding}=resolveFeedback(context,{feedbackRef:ref});
  if(!finding||!version?.reviewed||report.sourceId!==ref.sourceId||report.attemptId!==ref.attemptId||
    context.source.id!==ref.sourceId||attempt.interrupted&&!attempt.fragmentAcceptedAt)return null;
  return {contextId:context.source.id,sourceTitle:context.source.title,ref,label:finding.message};
}
export const pendingChecks=topic=>learningContexts(topic).flatMap(c=>{
  const item=pendingCheckInContext(c);return item?[item]:[];
});
export function searchRecords(records, query='', filter='all') {
  const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
  return records.flatMap(topic=>{
    if(filter==='draft'&&!hasDraft(topic) || filter==='audio'&&!learningContexts(topic).some(c=>c.attempts.length) ||
      filter==='practice'&&!learningContexts(topic).some(c=>c.practiceRounds?.length||c.apply) ||
      filter==='pending'&&!pendingChecks(topic).length)return [];
    const content=fields(topic);
    if(!terms.every(term=>content.some(({text})=>normalize(text).includes(term))))return [];
    const hits=terms.length?content.filter(({text})=>terms.some(term=>normalize(text).includes(term))).map(f=>{
      const at=Math.max(0,normalize(f.text).indexOf(terms.find(term=>normalize(f.text).includes(term)))-24);
      return {...f,snippet:`${f.label} · ${at?'…':''}${f.text.slice(at,at+100)}${f.text.length>at+100?'…':''}`};
    }):[];
    return [{topic,hits,snippet:hits[0]?.snippet??''}];
  });
}
