import {normalizeASR} from './core.mjs';
import {sanitizeError} from './safe-auth-evidence.mjs';
// Synthetic diagnostic only: persist allowlisted text/time evidence before validation.
// No headers, arbitrary provider fields, or secrets are retained.
export function captureASREvidence(data,duration,secret,persist){
  const text=v=>typeof v==='string'?sanitizeError({error:{message:v}},secret).message:null;
  const time=v=>Number.isFinite(v)?v:null;
  const snapshot={text:text(data?.text),words:Array.isArray(data?.words)?data.words.slice(0,3000).map(w=>({word:text(w?.word),start:time(w?.start),end:time(w?.end)})):null,segments:Array.isArray(data?.segments)?data.segments.slice(0,150).map(s=>({text:text(s?.text),start:time(s?.start),end:time(s?.end)})):null};
  persist(snapshot);
  try{
    const transcription=normalizeASR(data,duration);
    if(!transcription.words.length)throw Error('ASR_NO_WORDS');
    return {outcome:'HTTP_PASS_TIMESTAMP_REVIEW_REQUIRED',transcription};
  }catch(e){return {outcome:'ASR_VALIDATION_FAILED',validationCategory:/^[A-Z_]+$/.test(e.message)?e.message:'LOCAL_VALIDATION_FAILURE'};}
}
