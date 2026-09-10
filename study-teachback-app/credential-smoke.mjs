import {readFileSync,writeFileSync,mkdirSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {Ledger} from './ledger.mjs';
import {fingerprint,sanitizeError,safeRequestId} from './safe-auth-evidence.mjs';
const dir=new URL('../artifacts/study-teachback/credential-recovery/',import.meta.url);
mkdirSync(dir,{recursive:true});const output=new URL('LUNA_SMOKE.json',dir);
if(existsSync(output))throw Error('SMOKE_ALREADY_RECORDED');
const secret=process.env.OPENAI_API_KEY;if(!secret)throw Error('CREDENTIAL_MISSING');
const book=new Ledger(fileURLToPath(new URL('./runtime/usage.json',import.meta.url))),before=book.read();
const receipt={at:new Date().toISOString(),credentialFingerprint:fingerprint(secret),model:'gpt-5.6-luna',ledgerBefore:book.summary(),httpStatus:null,requestId:null};
const body={model:'gpt-5.6-luna',store:false,background:false,service_tier:'default',reasoning:{effort:'none'},max_output_tokens:64,input:'Reply with OK only.'};
const reservation=book.reserve({kind:'semantic',input:Buffer.byteLength(JSON.stringify(body))+2048,output:64});
try{
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(60000)});
  receipt.httpStatus=r.status;receipt.requestId=safeRequestId(r.headers.get('x-request-id'));
  if(!r.ok){let data;try{data=await r.json();}catch{}receipt.error=sanitizeError(data,secret);book.failure(reservation.id,'HTTP_ERROR',r.status);receipt.outcome='STOP_PAID_CALLS';}
  else{const data=await r.json();const usage={input_tokens:data.usage?.input_tokens,output_tokens:data.usage?.output_tokens};book.settle(reservation.id,usage,receipt.requestId);receipt.usage=usage;receipt.returnedModel=data.model;receipt.outcome=data.model==='gpt-5.6-luna'&&data.status==='completed'?'LUNA_PASS':'STOP_RESULT_UNVERIFIED';}
}catch{book.failure(reservation.id,'NETWORK_OR_RESPONSE_FAILURE',receipt.httpStatus);receipt.outcome='STOP_PAID_CALLS';}
receipt.ledgerAfter=book.summary();receipt.priorLedgerEventsUnchanged=JSON.stringify(book.read().events.slice(0,before.events.length))===JSON.stringify(before.events);
writeFileSync(output,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt,null,2));
