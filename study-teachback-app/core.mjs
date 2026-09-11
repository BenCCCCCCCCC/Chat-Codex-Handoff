export const RETENTION_MS = 7 * 86400000;
export function requireValue(ok, code) { if (!ok) throw new Error(code); }
export function text(value, max = 12000) { requireValue(typeof value === 'string' && value.trim().length > 0 && value.length <= max, 'INVALID_TEXT'); return value; }
export function identifier(value) { requireValue(typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value), 'INVALID_ID'); return value; }
export function repairFocus(value) {
  requireValue(typeof value==='string'&&value.length<=500,'INVALID_REPAIR_FOCUS');
  const clean=value.replace(/[\p{Cf}\p{Cc}]/gu,'').trim();
  const placeholder=clean.replace(/[^\p{L}\p{N}]/gu,'').toLowerCase();
  requireValue(/\p{L}/u.test(clean)&&! /^(?:na|none|null|undefined|unknown|无|暂无|不适用|无需修正|无需补救|暂无建议|无法判断|不确定)$/u.test(placeholder),'INVALID_REPAIR_FOCUS');
  return clean;
}
// Unknown is actionable only with concrete, non-placeholder guidance. No delivery
// or supported finding can enter the knowledge-remediation route.
export function remediationFocus(f,channel) {
  if(channel!=='content'||!['missing','incorrect','unknown'].includes(f?.status))return null;
  return repairFocus(f.repair);
}
export function sourceValue(s) {
  requireValue(s && typeof s === 'object', 'SOURCE_REQUIRED');
  const result={ id: identifier(s.id), text: text(s.text, 5000), title: text(s.title, 120) };
  if(s.anchors){requireValue(Array.isArray(s.anchors)&&s.anchors.length<=4,'INVALID_ANCHORS');result.anchors=s.anchors.map(g=>{text(g.text,200);text(g.sourceQuote,600);requireValue(result.text.includes(g.sourceQuote),'INVALID_SOURCE_QUOTE');return {text:g.text,sourceQuote:g.sourceQuote};});result.anchorVersion=identifier(s.anchorVersion);}
  return result;
}
export function spanValue(s, duration) {
  requireValue(s && Number.isFinite(s.start) && Number.isFinite(s.end) && s.start >= 0 && s.end > s.start && s.end <= duration + 0.05, 'INVALID_TIME');
  return { id: identifier(s.id), start: s.start, end: s.end, text: text(s.text, 2000) };
}
export function attemptValue(a) {
  requireValue(a && Number.isFinite(a.duration) && a.duration > 0 && a.duration <= 180 && Array.isArray(a.spans) && a.spans.length > 0 && a.spans.length <= 150, 'INVALID_ATTEMPT');
  const spans = a.spans.map(s => spanValue(s, a.duration));
  requireValue(new Set(spans.map(s=>s.id)).size === spans.length && spans.every((s,i) => !i || s.start >= spans[i-1].start), 'INVALID_SPANS');
  requireValue(['none','keywords','source'].includes(a.assistance), 'INVALID_ASSISTANCE');
  requireValue(['full','partial'].includes(a.kind), 'INVALID_ATTEMPT_KIND');
  return { id: identifier(a.id), sourceId: identifier(a.sourceId), transcriptVersion: identifier(a.transcriptVersion), duration: a.duration, spans, assistance: a.assistance, kind: a.kind,
    focus: a.kind === 'partial' ? repairFocus(a.focus) : null, reviewed: a.reviewed === true, interrupted: a.interrupted === true };
}
export function contentInput(source, attempt) {
  const s = sourceValue(source), a = attemptValue(attempt);
  requireValue(a.sourceId === s.id, 'SOURCE_MISMATCH');
  requireValue(a.reviewed && !a.interrupted, 'ASR_REVIEW_REQUIRED');
  // Deliberately omit duration, pauses, energy and all delivery labels.
  return { source: s, attempt: { id:a.id, sourceId:a.sourceId, transcriptVersion:a.transcriptVersion, assistance:a.assistance, kind:a.kind, focus:a.focus, spans:a.spans.map(({id,text})=>({id,text})) } };
}
function exactKeys(v, names) { requireValue(v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === names.length && names.every(k=>Object.hasOwn(v,k)), 'INVALID_SCHEMA'); }
export function validateTeaching(v, source) {
  exactKeys(v, ['sourceId','message','goals','question']);
  requireValue(v.sourceId === source.id && Array.isArray(v.goals) && v.goals.length >= 1 && v.goals.length <= 4, 'INVALID_SOURCE_OR_GOALS');
  text(v.message,4000); text(v.question,1000); v.goals.forEach(g=>{ exactKeys(g,['text','sourceQuote']); text(g.text,200); text(g.sourceQuote,600); requireValue(source.text.includes(g.sourceQuote),'INVALID_SOURCE_QUOTE'); });
  return v;
}
export function validateFindings(v, source, attempt, channel, events = []) {
  exactKeys(v, ['sourceId','attemptId','transcriptVersion','findings']);
  requireValue(v.sourceId === source.id && v.attemptId === attempt.id && v.transcriptVersion === attempt.transcriptVersion, 'INVALID_REFERENCE');
  requireValue(Array.isArray(v.findings) && v.findings.length <= 3,'INVALID_FINDINGS');
  for (const f of v.findings) {
    exactKeys(f,['status','message','sourceQuote','spanId','quote','eventId','repair']);
    requireValue(['supported','missing','incorrect','unknown','observation'].includes(f.status),'INVALID_STATUS');
    text(f.message,1000); text(f.repair,1000); text(f.sourceQuote,600);
    remediationFocus(f,channel);
    requireValue(source.text.includes(f.sourceQuote),'INVALID_SOURCE_QUOTE');
    if (channel === 'content') requireValue(f.eventId === null && f.status !== 'observation','CHANNEL_LEAK');
    if (channel === 'delivery') requireValue(f.status === 'observation' && events.some(e=>e.id===f.eventId),'INVALID_EVENT');
    if (f.status === 'missing') requireValue(f.spanId === null && f.quote === null,'MISSING_HAS_NO_TIME');
    else {
      const span = attempt.spans.find(s=>s.id === f.spanId);
      requireValue(span && typeof f.quote === 'string' && f.quote.trim() && span.text.includes(f.quote),'INVALID_SPAN_QUOTE');
      if (channel === 'delivery') { const event = events.find(e=>e.id === f.eventId); requireValue(event.start < span.end && event.end > span.start,'EVENT_SPAN_MISMATCH'); }
    }
  }
  return v;
}
export function normalizeASR(data, duration) {
  requireValue(Number.isFinite(duration)&&duration>0&&duration<=180,'INVALID_DURATION');
  requireValue(data && Array.isArray(data.segments) && data.segments.length > 0 && data.segments.length <= 150, 'ASR_NO_SEGMENTS');
  const spans = data.segments.map((s,i)=>spanValue({id:`s${i}`,start:s.start,end:s.end,text:s.text},duration));
  requireValue(spans.every((s,i)=>!i||s.start>=spans[i-1].start),'ASR_INVALID_ORDER');
  requireValue(data.words==null||Array.isArray(data.words),'ASR_INVALID_WORDS');
  const words = (data.words??[]).map((w,i)=>{
    requireValue(w&&Number.isFinite(w.start)&&Number.isFinite(w.end)&&w.start>=0&&w.end>=w.start&&w.end<=duration+0.05,'INVALID_WORD_TIME');
    return {id:`w${i}`,start:w.start,end:w.end,text:text(w.word,2000),usable:w.end>w.start,timingQuality:w.end>w.start?'UNVERIFIED_POSITIVE_DURATION':'UNUSABLE_ZERO_DURATION'};
  });
  requireValue(words.every((w,i)=>!i||(w.start>=words[i-1].start&&w.end>=words[i-1].end)),'ASR_INVALID_WORD_ORDER');
  const unusableWordIds=words.filter(w=>!w.usable).map(w=>w.id);
  return { text: text(data.text,16000), spans, words, wordTiming:{status:!words.length||unusableWordIds.length?'PARTIAL':'UNVERIFIED',count:words.length,unusableWordIds,missing:!words.length}, alignment: 'UNVERIFIED_PROVIDER_TIMESTAMPS', reviewRequired: true };
}
// Anchors are selected only inside a caller-selected validated segment. No invented
// word boundary when timing is unusable, missing or ambiguous. Review remains required.
export function replayAnchor(raw,segmentId,wordId=null){
  const s=raw.spans.find(s=>s.id===segmentId);requireValue(s,'INVALID_REFERENCE');
  const w=wordId&&raw.words?.find(w=>w.id===wordId);
  if(w&&w.usable===true&&Number.isFinite(w.start)&&Number.isFinite(w.end)&&w.end>w.start&&w.start>=s.start&&w.end<=s.end)return {level:'word',start:w.start,end:w.end,reviewRequired:true};
  return {level:'segment',start:s.start,end:s.end,reviewRequired:true,preciseWordAnchor:false};
}
export function observations(channels, sampleRate, interrupted = false) {
  if (!channels?.length || !Number.isFinite(sampleRate) || sampleRate <= 0 || !channels[0]?.length) return { status:'PARTIAL', reason:'DECODE_FAILURE', events:[] };
  const pcm = channels[0], duration=pcm.length/sampleRate;
  let clipped=0, energy=0, zero=0;
  for(const x of pcm) { if(!Number.isFinite(x)) return {status:'PARTIAL',reason:'INVALID_PCM',events:[]}; energy+=x*x; if(Math.abs(x)>=0.99)clipped++; if(Math.abs(x)<0.002)zero++; }
  const rms=Math.sqrt(energy/pcm.length), clipping=clipped/pcm.length;
  const config={frameMs:20,nearSilenceRMS:0.008,minCandidateSeconds:0.7,clippingAmplitude:0.99};
  const result={duration,rms,clipping,config,status:'PARTIAL',reason:'UNVALIDATED_ACTIVITY',events:[]};
  if(interrupted)return {...result,reason:'CAPTURE_INTERRUPTED'};
  if(rms<0.008 || zero/pcm.length>0.995)return {...result,reason:'NEAR_SILENT'};
  if(clipping>0.01)return {...result,reason:'CLIPPING'};
  let start=null; const size=Math.max(1,Math.round(sampleRate*.02));
  for(let i=0;i<=pcm.length;i+=size) {
    let power=0; const end=Math.min(i+size,pcm.length); for(let j=i;j<end;j++)power+=pcm[j]*pcm[j];
    const quiet=i<pcm.length && Math.sqrt(power/Math.max(1,end-i))<0.008;
    if(quiet && start===null) start=i/sampleRate;
    if(!quiet && start!==null) { const stop=Math.min(i/sampleRate,duration); if(start>0.1 && stop<duration-.1 && stop-start>=.7) result.events.push({id:`e${result.events.length}`,type:'near_silence_candidate',start,end:stop}); start=null; }
  }
  // No reliable VAD: these events may be background/noise. Require human replay confirmation before interpretation.
  return result;
}
export function waveBytes(pcm, rate=16000) {
  const bytes=new ArrayBuffer(44+pcm.length*2), v=new DataView(bytes);
  const str=(o,s)=>[...s].forEach((c,i)=>v.setUint8(o+i,c.charCodeAt(0)));
  str(0,'RIFF');v.setUint32(4,36+pcm.length*2,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,pcm.length*2,true);
  pcm.forEach((x,i)=>v.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,x))*32767),true));return bytes;
}
export function waveDuration(bytes) {
  const v=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength), s=(o,n)=>String.fromCharCode(...new Uint8Array(bytes.buffer,bytes.byteOffset+o,n));
  requireValue(bytes.byteLength>=44 && s(0,4)==='RIFF' && s(8,4)==='WAVE' && s(12,4)==='fmt ' && s(36,4)==='data','INVALID_WAV');
  requireValue(v.getUint32(16,true)===16 && v.getUint16(20,true)===1 && v.getUint16(22,true)===1 && v.getUint32(24,true)===16000 && v.getUint32(28,true)===32000 && v.getUint16(32,true)===2 && v.getUint16(34,true)===16 && v.getUint32(40,true)===bytes.byteLength-44 && (bytes.byteLength-44)%2===0,'INVALID_WAV_FORMAT');
  const duration=(bytes.byteLength-44)/32000;requireValue(duration>0 && duration<=180,'DURATION_LIMIT');return duration;
}
export function revisedTranscript(attempt, spans) {
  requireValue(spans.length===attempt.raw.spans.length,'INVALID_SPANS');
  return { id:crypto.randomUUID(), at:Date.now(), origin:'USER_REPLAY_CORRECTION', spans: spans.map((s,i)=>({...attempt.raw.spans[i],text:text(s.text,2000)})), reviewed:true };
}
export function prune(records, now=Date.now()) { return records.filter(r=>Number.isFinite(r.createdAt)&&r.createdAt+RETENTION_MS>now); }
