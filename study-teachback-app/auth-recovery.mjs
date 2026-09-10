import { readFileSync,writeFileSync,mkdirSync,existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Ledger } from './ledger.mjs';
import { waveBytes,waveDuration,normalizeASR } from './core.mjs';
import { fingerprint,sanitizeError,safeRequestId } from './safe-auth-evidence.mjs';
import { fileURLToPath } from 'node:url';

// Same lexical credential value for both requests. No environment dump, raw headers or raw error persistence.
if(existsSync(new URL('../artifacts/study-teachback/build-01r/AUTH_DIAGNOSTIC.json',import.meta.url)))throw new Error('DIAGNOSTIC_ALREADY_RECORDED_NO_AUTOMATIC_RETRY');
const secret=process.env.OPENAI_API_KEY;
if(!secret)throw new Error('CREDENTIAL_MISSING');
const book=new Ledger(fileURLToPath(new URL('./runtime/usage.json',import.meta.url)));
const before=book.read(), beforeBytes=readFileSync(book.path);
const receipt={at:new Date().toISOString(),kind:'BUILD_01R_SAME_PROCESS_AUTH',credentialFingerprint:fingerprint(secret),fingerprintAlgorithm:'SHA-256 truncated to 12 hex',credentialSource:'existing OPENAI_API_KEY captured once',sameProcess:true,records:[],ledgerBefore:book.summary(),ledgerBeforeSha256:createHash('sha256').update(beforeBytes).digest('hex')};
const body={model:'gpt-5.6-luna',store:false,background:false,service_tier:'default',reasoning:{effort:'none'},max_output_tokens:64,input:'Reply with OK only.'};
async function send(model,body,reservation){
  const entry={model,credentialFingerprint:fingerprint(secret),httpStatus:null,requestId:null};receipt.records.push(entry);
  try{
    const response=await fetch('https://api.openai.com/v1/'+(model==='whisper-1'?'audio/transcriptions':'responses'),{method:'POST',headers:{Authorization:`Bearer ${secret}`,...(model==='whisper-1'?{}:{'Content-Type':'application/json'})},body:model==='whisper-1'?body:JSON.stringify(body),signal:AbortSignal.timeout(60000)});
    entry.httpStatus=response.status;entry.requestId=safeRequestId(response.headers.get('x-request-id'));
    if(!response.ok){let data;try{data=await response.json();}catch{}entry.error=sanitizeError(data,secret);entry.status='HTTP_FAILURE';book.failure(reservation.id,'HTTP_ERROR',response.status);return {entry};}
    const data=await response.json();entry.status='HTTP_PASS';return {entry,data};
  }catch{entry.status='NETWORK_OR_RESPONSE_FAILURE';book.failure(reservation.id,'NETWORK_OR_RESPONSE_FAILURE');return {entry};}
}
try{
  const lunar=book.reserve({kind:'semantic',input:Buffer.byteLength(JSON.stringify(body))+2048,output:64});
  const luna=await send('gpt-5.6-luna',body,lunar);
  if(luna.data){
    const usage={input_tokens:luna.data.usage?.input_tokens,output_tokens:luna.data.usage?.output_tokens};book.settle(lunar.id,usage,luna.entry.requestId);luna.entry.usage=usage;
    luna.entry.status=luna.data.status==='completed'&&luna.data.model==='gpt-5.6-luna'?'PASS':'MODEL_RESULT_UNAVAILABLE';
  }
  if(luna.entry.status!=='PASS')receipt.outcome='STOP_PAID_CALLS_LUNA_FAILED';
  else{
    const raw=readFileSync(new URL('./runtime/synthetic-mandarin-v2.wav',import.meta.url));let pcm;
    for(let o=12;o+8<=raw.length;){const size=raw.readUInt32LE(o+4);if(raw.toString('ascii',o,o+4)==='data'){pcm=Float32Array.from({length:size/2},(_,i)=>raw.readInt16LE(o+8+i*2)/32768);break;}o+=8+size+(size%2);}
    if(!pcm)throw new Error('FIXTURE_INVALID');
    const wav=new Uint8Array(waveBytes(pcm)),duration=waveDuration(wav);
    receipt.audio={kind:'EXISTING_SYNTHETIC_MANDARIN_WINDOWS_VOICE',duration,originalSha256:createHash('sha256').update(raw).digest('hex'),ownerVoice:false};
    const form=new FormData();form.set('model','whisper-1');form.set('language','zh');form.set('response_format','verbose_json');form.append('timestamp_granularities[]','word');form.append('timestamp_granularities[]','segment');form.set('file',new Blob([wav],{type:'audio/wav'}),'synthetic.wav');
    const r=book.reserve({kind:'asr',attemptId:'synthetic-mandarin-build01',minutes:3});
    const whisper=await send('whisper-1',form,r);
    if(whisper.data){book.settle(r.id,{seconds:duration},whisper.entry.requestId);receipt.transcription=normalizeASR(whisper.data,duration);whisper.entry.status='PASS';receipt.outcome='AUTH_PASS_TIMESTAMP_TRANSPORT_VALID';}
    else receipt.outcome=whisper.entry.httpStatus===401?'STOP_PAID_CALLS_WHISPER_401':'STOP_PAID_CALLS_WHISPER_OTHER_FAILURE';
  }
}catch(e){receipt.outcome='STOP_PAID_CALLS_DIAGNOSTIC_INCOMPLETE';receipt.localCategory=/^[A-Z_]+$/.test(e.message)?e.message:'LOCAL_FAILURE';}
receipt.ledgerAfter=book.summary();receipt.priorLedgerEventsUnchanged=JSON.stringify(book.read().events.slice(0,before.events.length))===JSON.stringify(before.events);
const dir=new URL('../artifacts/study-teachback/build-01r/',import.meta.url);mkdirSync(dir,{recursive:true});
writeFileSync(new URL('AUTH_DIAGNOSTIC.json',dir),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify(receipt,null,2));
