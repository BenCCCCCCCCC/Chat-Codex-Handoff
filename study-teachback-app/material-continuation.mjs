import {identifier,text,requireValue} from './core.mjs';
import {materialList,materialSource,learningContexts,selectMaterials} from './material-set.mjs';
import {makeTextAttempt} from './text-teachback.mjs';
import {issueForAttempt,judgementIssues} from './judgement.mjs';

// Continuing is an explicit local copy into new evidence. Browsing history still
// restores its own workspace; neither action rewrites an existing report.
export function captureMaterialWork(topic,{draft=false}={}){
  const attempt=topic.resume?.view==='attempt'?topic.attempts.find(a=>a.id===topic.resume.attemptId):null;
  const version=attempt?.corrections.at(-1)??attempt?.raw;
  const d=draft?topic.textDraft:!attempt?topic.textDraft:null;
  const value=d?.text??(attempt?.transcriptDraft?.edits??version?.spans??[]).map(s=>s.text).join('\n');
  return {text:value,kind:d?.kind??attempt?.kind??'full',focus:d?.focus??attempt?.focus??null,
    ref:{sourceId:topic.source.id,sourceTitle:topic.source.title,...(attempt&&version&&!d?{attemptId:attempt.id,versionId:version.id}:{}),fromDraft:!!d||!!attempt?.transcriptDraft,...(!d&&(attempt?.interrupted||attempt?.contentScope==='retained_fragment')?{retainedFragment:true}:{})},
    conditions:structuredClone(attempt?.judgementIssues??[]),intent:topic.chatDraft?.trim()||topic.focus||topic.question||topic.setupContext?.focus||'',
    contextNote:topic.contextNote??'',goals:structuredClone(topic.goals??[])};
}
export function continueWithMaterials(topic,ids,{work=captureMaterialWork(topic),issueIds=[],uid=()=>crypto.randomUUID(),now=Date.now}={}){
  const currentIds=topic.activeMaterialIds??[topic.source.id],same=ids.length===currentIds.length&&ids.every(id=>currentIds.includes(id));
  const existing=learningContexts(topic).find(c=>{const chosen=c===topic?currentIds:c.materialIds;return chosen.length===ids.length&&chosen.every(id=>ids.includes(id));});
  const source=existing?.source??materialSource(materialList(topic),ids,uid),context={...topic,source,activeMaterialIds:ids};
  const conditions=work.conditions.filter(i=>i.evidence.every(e=>ids.includes(e.materialId))).map(i=>({...structuredClone(i),sourceId:source.id}));
  for(const id of issueIds){const issue=topic.studyIssues?.find(i=>i.id===id);requireValue(issue,'INVALID_STUDY_ISSUE');const selected=issueForAttempt(issue,context),index=conditions.findIndex(i=>i.id===id);if(index>=0)conditions[index]=selected;else conditions.push(selected);}
  judgementIssues(conditions,source);
  const current=same&&topic.resume?.view==='attempt'&&work.ref.attemptId===topic.resume.attemptId&&topic.attempts.find(a=>a.id===topic.resume.attemptId);
  // Validate the whole operation before moving the current workspace.
  let continued;
  if(!current&&work.text.trim()){
    requireValue(work.text.length<=2000,'CONTINUATION_TOO_LONG');
    continued=makeTextAttempt({source},{text:work.text,kind:work.kind,focus:work.focus,assistance:'source'},{uid,now});
    continued.raw.reviewed=false;continued.judgementIssues=conditions;if(work.ref.retainedFragment)continued.contentScope='retained_fragment';
    continued.continuation={...structuredClone(work.ref),reason:'materials',intent:work.intent,contextNote:work.contextNote};
    const unapplied=work.conditions.filter(i=>!conditions.some(c=>c.id===i.id)).map(i=>i.question);
    if(unapplied.length)continued.continuation.unappliedConditions=unapplied;
  }
  if(!same)selectMaterials(topic,ids,{uid:()=>source.id});
  if(!existing){topic.goals=work.goals.filter(g=>source.text.includes(g.sourceQuote));topic.contextNote=work.contextNote;topic.chatDraft=work.intent;}
  if(continued){topic.attempts.push(continued);topic.resume={view:'attempt',attemptId:continued.id};}
  else if(current){current.judgementIssues=conditions;}
  else {topic.resume={view:'learn'};topic.continuationIntent={...structuredClone(work.ref),intent:work.intent,contextNote:work.contextNote,issueIds};}
  return continued??current??null;
}
export function continueStudyIssue(topic,id,options={}){
  const issue=topic.studyIssues?.find(i=>i.id===id);requireValue(issue,'INVALID_STUDY_ISSUE');
  const ids=[...new Set([...(topic.activeMaterialIds??[topic.source.id]),...issue.evidence.map(e=>e.materialId)])];
  return continueWithMaterials(topic,ids,{...options,issueIds:[id]});
}
export function continuationOrigin(topic,ref){
  const context=learningContexts(topic).find(c=>c.source.id===ref.sourceId),attempt=context?.attempts.find(a=>a.id===ref.attemptId);
  const version=[attempt?.raw,...(attempt?.corrections??[])].find(v=>v?.id===ref.versionId);
  return {context,attempt,version};
}
export function validateContinuation(ref){
  identifier(ref.sourceId);text(ref.sourceTitle,120);requireValue(typeof ref.fromDraft==='boolean','INVALID_CONTINUATION');
  if(ref.attemptId){identifier(ref.attemptId);identifier(ref.versionId);}
  if(ref.unappliedConditions){requireValue(Array.isArray(ref.unappliedConditions)&&ref.unappliedConditions.length<=3,'INVALID_CONTINUATION');ref.unappliedConditions.forEach(q=>text(q,500));}
  requireValue(typeof ref.intent==='string'&&ref.intent.length<=2000&&typeof ref.contextNote==='string'&&ref.contextNote.length<=1000,'INVALID_CONTINUATION');
}
