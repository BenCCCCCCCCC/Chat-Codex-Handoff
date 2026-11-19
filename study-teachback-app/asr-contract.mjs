import {normalizeASR,requireValue,text} from './core.mjs';
import {termSnapshot} from './transcription-terms.mjs';

// Candidate support is offline preparation. The HTTP route has no model switch.
export const PRODUCTION_ASR_MODEL='whisper-1';
export const ASR_PROFILES=Object.freeze({
  'whisper-1':Object.freeze({date:'2026-09-11',rateUSD:0.006,unit:'minute',timing:'provider',source:'https://developers.openai.com/api/docs/models/whisper-1'}),
  'gpt-transcribe':Object.freeze({date:'2026-11-19',rateUSD:0.0045,unit:'minute',timing:'recording',source:'https://developers.openai.com/api/docs/models/gpt-transcribe'})
});
export function asrProfile(model){const p=ASR_PROFILES[model];requireValue(p,'ASR_MODEL_UNSUPPORTED');return p;}
export function transcriptionForm(bytes,{model=PRODUCTION_ASR_MODEL,prompt='',terms=[]}={}){
  asrProfile(model);terms=termSnapshot(terms);
  const form=new FormData();form.set('model',model);form.set('file',new Blob([bytes],{type:'audio/wav'}),'attempt.wav');
  if(model==='whisper-1'){
    form.set('language','zh');form.set('response_format','verbose_json');
    for(const level of ['word','segment'])form.append('timestamp_granularities[]',level);
    prompt=[prompt,terms.length?`相关名称：${terms.join('、')}。`:null].filter(Boolean).join(' ');
  }else{
    requireValue(terms.every(t=>!/[<>\r\n]/.test(t)),'TRANSCRIPTION_TERMS_LIMIT');
    form.append('languages[]','zh');for(const term of terms)form.append('keywords[]',term);
  }
  if(prompt)form.set('prompt',prompt);return form;
}
export function normalizeTranscription(data,duration,model=PRODUCTION_ASR_MODEL){
  const profile=asrProfile(model);
  if(profile.timing==='provider')return normalizeASR(data,duration);
  requireValue(Number.isFinite(duration)&&duration>0&&duration<=180,'INVALID_DURATION');
  const value=text(data?.text,16000),spans=[];
  // Text chunks only. Every replay covers the actual recording, not a guessed
  // sentence interval. No provider timestamps or text/acoustic co-location.
  for(let offset=0;offset<value.length;offset+=2000)spans.push({id:`s${spans.length}`,text:value.slice(offset,offset+2000),start:0,end:duration});
  return {text:value,spans,words:[],wordTiming:{status:'UNAVAILABLE',count:0,unusableWordIds:[],missing:true},
    timing:{level:'recording',origin:'local_audio_duration'},alignment:'NO_PROVIDER_TIMESTAMPS',reviewRequired:true};
}
