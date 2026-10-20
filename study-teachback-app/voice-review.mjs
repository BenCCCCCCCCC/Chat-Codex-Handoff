// Drafts are editable text only; they are never evidence of review or a new attempt.
export function transcriptTexts(attempt) {
  const version=attempt.corrections.at(-1)??attempt.raw;
  const draft=attempt.transcriptDraft;
  return version.spans.map(span=>draft?.baseVersionId===version.id?
    draft.edits.find(edit=>edit.id===span.id)?.text??span.text:span.text);
}
export function updateTranscriptDraft(attempt,edits) {
  const version=attempt.corrections.at(-1)??attempt.raw;
  if(version.spans.every((span,i)=>span.text===edits[i].text))delete attempt.transcriptDraft;
  else attempt.transcriptDraft={baseVersionId:version.id,edits:edits.map(e=>({...e})),updatedAt:Date.now()};
}
export function analysisTrace(result) {
  // Missing metadata in historical reports stays unknown, never inferred.
  return {method:'confirmed_transcript',model:result.model??null,
    reservationId:result.reservationId??null,requestId:result.requestId??null};
}
