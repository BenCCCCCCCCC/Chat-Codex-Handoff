import { attemptValue, contentInput, identifier, requireValue, remediationFocus, validateFindings } from './core.mjs';

// Domain views only: no storage migration, provider, detector or word alignment.
export function contentFindings(report, source, attempt) {
  contentInput(source, attempt);
  validateFindings(report, source, attempt, 'content');
  return report.findings.map((finding, index) => ({
    ...finding, id: `content:${attempt.id}:${attempt.transcriptVersion}:${index}`,
    sourceId: source.id, attemptId: attempt.id, transcriptVersion: attempt.transcriptVersion
  }));
}

const processKeys = ['id','type','attemptId','transcriptVersion','start','end','spanId','quote','origin','confirmation','eventId'];
const processTypes = ['near_silence','short_pause_cluster','restart','self_repair','repetition','coarse_segment'];
export function processEvidence(values, attempt, events = []) {
  const a = attemptValue(attempt);
  requireValue(Array.isArray(values) && values.length <= 150, 'INVALID_PROCESS_EVIDENCE');
  const ids = new Set();
  return values.map(e => {
    requireValue(e && Object.keys(e).length === processKeys.length && processKeys.every(k => Object.hasOwn(e,k)), 'PROCESS_FIELD_LEAK');
    requireValue(typeof e.id === 'string' && e.id === `process:${a.id}:${a.transcriptVersion}:${identifier(e.eventId)}` && !ids.has(e.id), 'INVALID_PROCESS_ID');
    ids.add(e.id);
    requireValue(e.attemptId === a.id && e.transcriptVersion === a.transcriptVersion, 'INVALID_PROCESS_REFERENCE');
    requireValue(processTypes.includes(e.type), 'INVALID_PROCESS_TYPE');
    requireValue(e.origin === 'fixture' && e.confirmation === 'prelabelled' || e.origin === 'local_detector' && ['candidate','human_confirmed'].includes(e.confirmation), 'INVALID_PROCESS_PROVENANCE');
    const timed = e.start !== null || e.end !== null;
    requireValue(!timed || Number.isFinite(e.start) && Number.isFinite(e.end) && e.start >= 0 && e.end > e.start && e.end <= a.duration, 'INVALID_PROCESS_TIME');
    const span = e.spanId === null ? null : a.spans.find(s => s.id === e.spanId);
    requireValue(e.spanId === null || span, 'INVALID_PROCESS_SPAN');
    requireValue(timed || span, 'PROCESS_LOCATION_REQUIRED');
    requireValue(!span || !timed || e.start < span.end && e.end > span.start, 'PROCESS_SPAN_MISMATCH');
    requireValue(e.quote === null || span && typeof e.quote === 'string' && e.quote.trim() && span.text.includes(e.quote), 'INVALID_PROCESS_QUOTE');
    if(e.origin === 'local_detector') {
      const event = events.find(event => event.id === e.eventId);
      requireValue((e.type === 'near_silence' && event?.type === 'near_silence_candidate' || e.type === 'short_pause_cluster' && event?.type === 'short_pause_cluster_candidate') && e.start === event.start && e.end === event.end, 'INVALID_PROCESS_EVENT');
      requireValue(e.confirmation !== 'human_confirmed' || event.heard === true && a.reviewed && !a.interrupted, 'PROCESS_REVIEW_REQUIRED');
    }
    return {...e};
  });
}

export function confirmLocalProcess(attempt, event, events) {
  requireValue(event?.heard === true, 'NOT_HEARD');
  requireValue(attempt.reviewed && !attempt.interrupted, 'ASR_REVIEW_REQUIRED');
  const value = {id:`process:${attempt.id}:${attempt.transcriptVersion}:${event.id}`,type:event.type==='short_pause_cluster_candidate'?'short_pause_cluster':'near_silence',attemptId:attempt.id,transcriptVersion:attempt.transcriptVersion,
    start:event.start,end:event.end,spanId:null,quote:null,origin:'local_detector',confirmation:'human_confirmed',eventId:event.id};
  return processEvidence([value], attempt, events)[0];
}

export function localize({ source, attempt, report, evidence = [], events = [] }) {
  // This gate applies even with no report/evidence: unreviewed ASR cannot create targets.
  contentInput(source, attempt);
  const content = report ? contentFindings(report, source, attempt) : [];
  const process = processEvidence(evidence, attempt, events);
  const targets = content.flatMap(f => {
    const focus = remediationFocus(f, 'content');
    if(!focus) return [];
    const span = f.spanId === null ? null : attempt.spans.find(s => s.id === f.spanId);
    // Only co-located, independently identified process context is associated.
    // Missing content has no spoken span: it never borrows process timing.
    const related = span ? process.filter(e => e.confirmation !== 'candidate' && (e.spanId === span.id || e.start !== null && e.start < span.end && e.end > span.start)) : [];
    return [{id:`target:${f.id}`,kind:'worth_verifying',focus,sourceId:source.id,attemptId:attempt.id,transcriptVersion:attempt.transcriptVersion,
      contentFindingIds:[f.id],processEvidenceIds:related.map(e=>e.id),
      contentLocation:span ? {spanId:span.id,start:span.start,end:span.end,precision:'segment'} : null,
      processContext:related.map(e=>({evidenceId:e.id,relationship:'co_located_observation_not_knowledge_proof'}))}];
  });
  return {contentFindings:content,processEvidence:process,diagnosticTargets:targets};
}
