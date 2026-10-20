// Search opens the stored version without changing the learner's current draft.
export function focusHit(node) {
  if(!node)return;
  document.querySelector('.search-hit')?.classList.remove('search-hit');
  node.classList.add('search-hit');
  if(!node.matches('input,textarea,button,select,a[href],[tabindex]'))node.tabIndex=-1;
  node.scrollIntoView({block:'center',behavior:'instant'});
  node.focus({preventScroll:true});
}

export function hitDestination(hit) {
  const t=hit.target;
  return t.attemptId ? {view:'attempt',attemptId:t.attemptId} :
    t.kind==='practice' ? {view:'practice'} : {view:'learn'};
}

export function transcriptHit(attempt, target) {
  const version=[attempt.raw,...attempt.corrections].find(v=>v?.id===target.versionId);
  const span=version?.spans.find(s=>s.id===target.spanId);
  const latest=attempt.corrections.at(-1)??attempt.raw;
  const draft=attempt.transcriptDraft?.edits.find(s=>s.id===target.spanId);
  return {version,span,current:version===latest&&(!draft||draft.text===span?.text)};
}
