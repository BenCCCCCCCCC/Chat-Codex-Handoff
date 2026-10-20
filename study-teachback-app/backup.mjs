import {sourceValue, identifier, setupContextValue, spanValue, validateFindings} from './core.mjs';
import {termSnapshot} from './transcription-terms.mjs';

export const BACKUP_LIMIT = 128 * 1024 * 1024;
const FORMAT = 'study-teachback-export-v1';
const check = value => { if (!value) throw Error('BACKUP_INVALID'); };
const object = value => check(value && typeof value === 'object' && !Array.isArray(value));
const string = (value, max=16000) => check(typeof value === 'string' && value.length <= max);
const date = value => check(Number.isFinite(value) && value > 0);
const list = value => { check(Array.isArray(value)); return value; };
function unique(items) {
  const ids = items.map(item => identifier(item.id));
  check(new Set(ids).size === ids.length);
}
function messages(items) {
  for (const item of list(items)) { object(item); check(['user','assistant'].includes(item.role)); string(item.text); }
}

export async function encodeBackup(topic) {
  const data = structuredClone(topic);
  for (const attempt of data.attempts) {
    const bytes = new Uint8Array(await attempt.audio.arrayBuffer());
    let binary = '';
    for (let i=0; i<bytes.length; i+=8192) binary += String.fromCharCode(...bytes.subarray(i,i+8192));
    attempt.audio = {mime:attempt.audio.type, base64:btoa(binary)};
  }
  return JSON.stringify({format:FORMAT, exportedAt:new Date().toISOString(),
    notice:'导出副本不受应用内删除控制', topic:data}, null, 2);
}

// Validate the data that the application renders or uses as request context before
// one atomic insert. Preserve original identifiers and unknown historical fields.
export function decodeBackup(text) {
  if (typeof text !== 'string' || new TextEncoder().encode(text).length > BACKUP_LIMIT) throw Error('BACKUP_TOO_LARGE');
  try {
    const envelope = JSON.parse(text);
    if (envelope?.format !== FORMAT) throw Error('BACKUP_FORMAT');
    const t = envelope.topic; object(t); identifier(t.id); date(t.createdAt); sourceValue(t.source);
    if (t.updatedAt != null) date(t.updatedAt);
    if (t.restoredAt != null) date(t.restoredAt);
    setupContextValue(t.setupContext);
    for (const goal of list(t.goals)) { string(goal.text,200); string(goal.sourceQuote,600); check(t.source.text.includes(goal.sourceQuote)); }
    if(t.chatDraft!=null)string(t.chatDraft,2000);
    if(t.contextNote!=null)string(t.contextNote,1000);
    if(t.transcriptionTerms!=null)string(t.transcriptionTerms,160);
    messages(t.messages); list(t.attempts); unique(t.attempts);
    if (t.question != null) string(t.question,1000);
    if (t.focus != null) string(t.focus,1000);
    if (t.resume != null) { object(t.resume); check(['learn','attempt','practice'].includes(t.resume.view)); }
    if (t.chatRequest) {
      const r=t.chatRequest; object(r); identifier(r.id); string(r.message,2000); messages(r.history);
      check(['learn','repair'].includes(r.mode)); check(['pending','unknown','complete'].includes(r.status));
      check(typeof r.internalStarter === 'boolean');
      if (r.focus != null) string(r.focus,1000);
      if (r.contextNote != null) string(r.contextNote,1000);
      if (r.contextUsage != null) {
        for(const key of ['historyUsed','historyOmitted'])check(Number.isInteger(r.contextUsage[key])&&r.contextUsage[key]>=0);
        check(r.contextUsage.historyUsed+r.contextUsage.historyOmitted<=6);
      }
    }
    for (const a of t.attempts) {
      if(a.transcriptionTerms!=null)termSnapshot(a.transcriptionTerms);
      sourceValue(a.source); check(a.source.id===t.source.id && a.source.text===t.source.text);
      date(a.createdAt); check(['full','partial'].includes(a.kind)); check(['none','keywords','source','unknown'].includes(a.assistance));
      if (a.focus != null) string(a.focus,1000);
      // Failed/interrupted captures are still recoverable archives. Existing API
      // validation decides whether their duration permits further processing.
      if (a.duration != null) check(Number.isFinite(a.duration) && a.duration>=0);
      const versions = [...list(a.corrections)];
      if (a.raw) versions.unshift(a.raw);
      unique(versions);
      for (const v of versions) {
        if (v.text != null) string(v.text);
        check(Number.isFinite(a.duration));
        for (const span of list(v.spans)) spanValue(span,a.duration);
        unique(v.spans);
      }
      if (a.corrections.length) check(a.raw && a.corrections.every(v=>
        v.spans.length===a.raw.spans.length && v.spans.every(s=>a.raw.spans.some(raw=>raw.id===s.id))));
      if(a.transcriptDraft){
        const d=a.transcriptDraft,v=versions.at(-1);object(d);check(v&&d.baseVersionId===v.id);date(d.updatedAt);
        unique(list(d.edits));check(d.edits.length===v.spans.length);
        for(const edit of d.edits){check(v.spans.some(s=>s.id===edit.id));string(edit.text,2000);}
      }
      const events=a.observation?.events ?? [];
      for (const event of list(events)) {
        identifier(event.id); check(Number.isFinite(event.start)&&Number.isFinite(event.end)&&event.end>event.start);
      }
      for (const report of list(a.reports)) {
        object(report); check(report.attemptId===a.id);
        const version=versions.find(v=>v.id===report.transcriptVersion); check(version);
        if(report.analysis){
          object(report.analysis);check(report.analysis.method==='confirmed_transcript');
          for(const key of ['model','reservationId','requestId'])if(report.analysis[key]!=null)string(report.analysis[key],200);
        }
        if (['content','delivery'].includes(report.channel)) {
          const {sourceId,attemptId,transcriptVersion,findings}=report;
          validateFindings({sourceId,attemptId,transcriptVersion,findings},a.source,
            {id:a.id,transcriptVersion,spans:version.spans},report.channel,events);
        } else {
          check(report.channel==='process');
          for (const evidence of list(report.processEvidence)) object(evidence);
        }
      }
      object(a.audio); string(a.audio.mime,100); string(a.audio.base64,BACKUP_LIMIT);
      check(a.audio.mime==='' || /^audio\/[a-z0-9.+-]+(?:;[a-z0-9= .+-]+)?$/i.test(a.audio.mime));
      check(a.audio.base64.length%4===0 && /^[A-Za-z0-9+/]*={0,2}$/.test(a.audio.base64));
      const binary=atob(a.audio.base64), bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
      a.audio=new Blob([bytes],{type:a.audio.mime});
    }
    if (t.practiceRounds != null) {
      unique(list(t.practiceRounds));
      for (const round of t.practiceRounds) {
        date(round.createdAt); string(round.question,1000); string(round.introduction); string(round.draft,2000);
        if(round.origin!=null){
          object(round.origin);
          for(const key of ['targetId','sourceId','attemptId','transcriptVersion'])string(round.origin[key],1000);
          check(round.origin.sourceId===t.source.id);
        }
        unique(list(round.answers));
        for (const answer of round.answers) {
          string(answer.text,2000); check(['pending','unknown','complete'].includes(answer.status));
          if (answer.result != null) string(answer.result);
        }
      }
    }
    if (t.apply) {
      object(t.apply); string(t.apply.question,1000);
      for (const key of ['answer','result']) if(t.apply[key]!=null)string(t.apply[key]);
    }
    if (t.practiceRequest) { object(t.practiceRequest); check(['pending','unknown'].includes(t.practiceRequest.status)); }
    return t;
  } catch (error) {
    throw Error(error.message==='BACKUP_FORMAT' ? 'BACKUP_FORMAT' : 'BACKUP_INVALID');
  }
}

export function restoredCopy(topic, {now=Date.now(), id=crypto.randomUUID()}={}) {
  const copy=structuredClone(topic);
  copy.id=id; copy.restoredFrom=topic.id; copy.restoredAt=now; copy.updatedAt=now;
  // Pending records are historical outcomes, never a reason to auto-dispatch.
  if (copy.chatRequest?.status==='pending') copy.chatRequest.status='unknown';
  if (copy.practiceRequest?.status==='pending') copy.practiceRequest.status='unknown';
  for (const round of copy.practiceRounds??[]) for (const answer of round.answers) {
    if (answer.status==='pending') answer.status='unknown';
  }
  return copy;
}
