import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {Ledger} from './ledger.mjs';
import {waveBytes,waveDuration} from './core.mjs';
import {captureASREvidence} from './asr-evidence.mjs';
import {fingerprint,sanitizeError,safeRequestId} from './safe-auth-evidence.mjs';
const secret=process.env.OPENAI_API_KEY;
if(!secret)throw Error('CREDENTIAL_MISSING');
const fp=fingerprint(secret);
if(fp!=='deecd15c4b0b')throw Error('RUNTIME_CREDENTIAL_CHANGED');
const dir=new URL('../artifacts/study-teachback/build-01r2/',import.meta.url);
mkdirSync(dir,{recursive:true});
const output=new URL('WHISPER_RETRY.json',dir);
if(existsSync(output))throw Error('RETRY_ALREADY_RECORDED');
const book=new Ledger(fileURLToPath(new URL('./runtime/usage.json',import.meta.url)));
const before=book.read();
if(before.events.filter(e=>e.type==='reserve'&&e.kind==='asr'&&e.attemptId==='synthetic-mandarin-build01').length!==4)throw Error('RETRY_ALLOWANCE_STATE_MISMATCH');
const raw=readFileSync(new URL('./runtime/synthetic-mandarin-v2.wav',import.meta.url));
const hash=createHash('sha256').update(raw).digest('hex');
if(hash!=='7e291bc01d614dfb34068ab3d2d9f4d1217f329ba14b6e4fdb7cea919aba6206')throw Error('FIXTURE_HASH_MISMATCH');
let pcm;for(let o=12;o+8<=raw.length;){const size=raw.readUInt32LE(o+4);if(raw.toString('ascii',o,o+4)==='data'){pcm=Float32Array.from({length:size/2},(_,i)=>raw.readInt16LE(o+8+i*2)/32768);break;}o+=8+size+(size%2);}
if(!pcm)throw Error('FIXTURE_INVALID');
const wav=new Uint8Array(waveBytes(pcm)),duration=waveDuration(wav);
if(Math.abs(duration-7.31)>.001)throw Error('FIXTURE_DURATION_MISMATCH');
const receipt={at:new Date().toISOString(),credentialFingerprint:fp,model:'whisper-1',attemptId:'synthetic-mandarin-build01',submission:5,fixtureSha256:hash,duration,ledgerBefore:book.summary(),httpStatus:null,requestId:null};
const form=new FormData();form.set('model','whisper-1');form.set('language','zh');form.set('response_format','verbose_json');form.append('timestamp_granularities[]','word');form.append('timestamp_granularities[]','segment');form.set('file',new Blob([wav],{type:'audio/wav'}),'synthetic.wav');
const reservation=book.reserve({kind:'asr',attemptId:receipt.attemptId,minutes:3});
try{
  const response=await fetch('https://api.openai.com/v1/audio/transcriptions',{method:'POST',headers:{Authorization:`Bearer ${secret}`},body:form,signal:AbortSignal.timeout(60000)});
  receipt.httpStatus=response.status;receipt.requestId=safeRequestId(response.headers.get('x-request-id'));
  if(!response.ok){let data;try{data=await response.json();}catch{}receipt.error=sanitizeError(data,secret);book.failure(reservation.id,'HTTP_ERROR',response.status);receipt.outcome='STOP_PAID_CALLS_HTTP_FAILURE';}
  else{const data=await response.json();book.settle(reservation.id,{seconds:duration},receipt.requestId);Object.assign(receipt,captureASREvidence(data,duration,secret,snapshot=>writeFileSync(new URL('SYNTHETIC_ASR_FIELDS.json',dir),JSON.stringify(snapshot,null,2)+'\n',{flag:'wx'})));}
}catch{book.failure(reservation.id,'NETWORK_OR_VALIDATION_FAILURE',receipt.httpStatus);receipt.outcome='STOP_PAID_CALLS_NETWORK_OR_VALIDATION_FAILURE';}
receipt.ledgerAfter=book.summary();receipt.priorLedgerEventsUnchanged=JSON.stringify(book.read().events.slice(0,before.events.length))===JSON.stringify(before.events);
writeFileSync(output,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt,null,2));
