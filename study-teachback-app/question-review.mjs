import {identifier,requireValue,text} from './core.mjs';

export const practicePaused=round=>['held','replaced'].includes(round?.review?.status);
export function answerDisposition(round,answer){
  if(round.review?.status==='replaced')return 'excluded';
  if(round.reviewHistory?.some(r=>r.resolution!=='withdrawn'&&r.answerIds.includes(answer.id)))return 'excluded';
  return round.review?.status==='held'?'pending':'current';
}
export function beginReview(round,origin,{uid=()=>crypto.randomUUID(),now=Date.now}={}){
  if(round.review?.status==='replaced')return;
  round.review={id:uid(),createdAt:now(),note:'',basisQuote:'',proposedQuestion:'',answerIds:round.answers.map(a=>a.id),...round.review,status:'held',origin};
}
export function reviewBasis(review,source){
  requireValue(typeof review?.note==='string'&&review.note.trim()&&typeof review?.basisQuote==='string'&&review.basisQuote.trim(),'REVIEW_BASIS_REQUIRED');
  const note=text(review?.note?.trim(),1000),basisQuote=text(review?.basisQuote?.trim(),1500);
  requireValue(/[\p{L}\p{N}]/u.test(note)&&/[\p{L}\p{N}]/u.test(basisQuote)&&source.text.includes(basisQuote),'REVIEW_BASIS_REQUIRED');
  return {note,basisQuote};
}
export function resolveQuestionReview(round,resolution,source,{uid=()=>crypto.randomUUID(),now=Date.now,replacementId}={}){
  requireValue(round.review?.status==='held','REVIEW_NOT_OPEN');
  requireValue(['withdrawn','retained','replaced'].includes(resolution),'INVALID_REVIEW');
  if(resolution!=='withdrawn')reviewBasis(round.review,source);
  if(resolution==='replaced')identifier(replacementId);
  beginReview(round,round.review.origin,{uid,now});
  const entry={...structuredClone(round.review),status:'resolved',resolution,resolvedAt:now(),...(replacementId?{replacementId}:{})};
  (round.reviewHistory??=[]).push(entry);
  round.review=resolution==='replaced'?{...entry,status:'replaced'}:null;
  return entry;
}
export function revisedQuestion(round,source){
  requireValue(round?.review?.status==='held','REVIEW_NOT_OPEN');
  const basis=reviewBasis(round.review,source),question=text(round.review.proposedQuestion?.trim(),1000);
  // The revised text must contain its own scenario; old context is shown, not reused.
  requireValue(question!==round.question.trim(),'QUESTION_UNCHANGED');
  return {question,...basis};
}
export function latestQuestion(rounds,round){
  const seen=new Set();
  while(round?.review?.status==='replaced'&&!seen.has(round.id)){
    seen.add(round.id);const next=rounds.find(r=>r.id===round.review.replacementId&&r.revision?.parentRoundId===round.id);
    if(!next)break;round=next;
  }
  return round;
}
// New fields are optional for historical v1 backups. References stay within a topic.
export function validateQuestionReviews(topic){
  const rounds=topic.practiceRounds??[],ids=new Set(rounds.map(r=>r.id));
  for(const round of rounds){
    const history=round.reviewHistory??[];
    requireValue(Array.isArray(history),'INVALID_REVIEW');
    if(round.review)requireValue(['held','replaced'].includes(round.review.status),'INVALID_REVIEW');
    const seen=new Set();
    for(const r of [...history,...(round.review?[round.review]:[])]){
      requireValue(r&&['held','replaced','resolved'].includes(r.status)&&['learner','local_check'].includes(r.origin),'INVALID_REVIEW');
      requireValue(Number.isFinite(r.createdAt)&&r.createdAt>0,'INVALID_REVIEW');
      if(r.id!=null)identifier(r.id);
      for(const [key,max] of [['note',1000],['basisQuote',1500],['proposedQuestion',1000]])if(r[key]!=null)requireValue(typeof r[key]==='string'&&r[key].length<=max,'INVALID_REVIEW');
      if(r.answerIds!=null)requireValue(Array.isArray(r.answerIds)&&new Set(r.answerIds).size===r.answerIds.length&&r.answerIds.every(id=>round.answers.some(a=>a.id===id)),'INVALID_REVIEW');
      if(r.status!=='held'){
        identifier(r.id);requireValue(Array.isArray(r.answerIds)&&['withdrawn','retained','replaced'].includes(r.resolution)&&Number.isFinite(r.resolvedAt)&&r.resolvedAt>=r.createdAt,'INVALID_REVIEW');
        if(r.resolution!=='withdrawn')reviewBasis(r,topic.source);
        else requireValue(r.origin==='learner','INVALID_REVIEW');
      }
    }
    for(const r of history){requireValue(r.status==='resolved'&&!seen.has(r.id),'INVALID_REVIEW');seen.add(r.id);
      if(r.resolution==='replaced')requireValue(rounds.some(n=>n.id===r.replacementId&&n.revision?.parentRoundId===round.id&&n.revision?.reviewId===r.id),'INVALID_REVIEW_LINK');
    }
    if(round.review?.status==='held')requireValue(!seen.has(round.review.id),'INVALID_REVIEW');
    const replaced=history.filter(r=>r.resolution==='replaced');
    if(replaced.length)requireValue(replaced.length===1&&history.at(-1)===replaced[0]&&round.review?.status==='replaced','INVALID_REVIEW_LINK');
    if(round.review?.status==='replaced')requireValue(history.some(r=>JSON.stringify({...round.review,status:'resolved'})===JSON.stringify(r)),'INVALID_REVIEW_LINK');
    if(round.revision){
      const v=round.revision;identifier(v.parentRoundId);identifier(v.reviewId);
      requireValue(v.method==='learner_review'&&v.sourceId===topic.source.id&&ids.has(v.parentRoundId)&&!round.task,'INVALID_REVIEW_LINK');
      const parent=rounds.find(r=>r.id===v.parentRoundId),event=parent.reviewHistory?.find(r=>r.id===v.reviewId);
      requireValue(event?.resolution==='replaced'&&event.replacementId===round.id&&event.proposedQuestion.trim()===round.question&&v.basisQuote===event.basisQuote.trim()&&v.note===event.note.trim(),'INVALID_REVIEW_LINK');
      const ancestors=new Set([round.id]);let ancestor=parent;
      while(ancestor){requireValue(!ancestors.has(ancestor.id),'INVALID_REVIEW_LINK');ancestors.add(ancestor.id);ancestor=rounds.find(r=>r.id===ancestor.revision?.parentRoundId);}
    }
  }
}
