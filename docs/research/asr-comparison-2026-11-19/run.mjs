// Fixed, owner-approved research batch. Never imported by the product server.
import {mkdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {Ledger} from '../../../study-teachback-app/ledger.mjs';
import {waveDuration} from '../../../study-teachback-app/core.mjs';
import {transcriptionForm,normalizeTranscription,ASR_PROFILES,PRODUCTION_ASR_MODEL} from '../../../study-teachback-app/asr-contract.mjs';
import {sanitizeError,safeRequestId} from '../../../study-teachback-app/safe-auth-evidence.mjs';

export const ROOT=fileURLToPath(new URL('./',import.meta.url));
export const hash=value=>createHash('sha256').update(value).digest('hex');
export const CONFIG=Object.freeze({batch:'asr-comparison-2026-11-19',maxRequests:16,budgetUSD:.30,reservationMinutes:3,
  models:['whisper-1','gpt-transcribe'],prompt:'以下是普通话的简体中文转写。',timeoutMs:60000,automaticRetries:0,
  verifiedOn:'2026-11-19',prices:{'whisper-1':.006,'gpt-transcribe':.0045}});

export function preflight(){
  const manifestBytes=readFileSync(join(ROOT,'manifest.json')),manifest=JSON.parse(manifestBytes);
  if(manifest.kind!=='LOCAL_TTS_SYNTHETIC_ONLY'||manifest.cases.length!==8||manifest.casesSHA256!==hash(readFileSync(join(ROOT,'cases.json'))))throw Error('FIXTURE_CHANGED');
  if(PRODUCTION_ASR_MODEL!=='whisper-1')throw Error('PRODUCTION_MODEL_CHANGED');
  for(const model of CONFIG.models)if(ASR_PROFILES[model].rateUSD!==CONFIG.prices[model])throw Error('PRICING_CHANGED');
  const entries=manifest.cases.map(c=>{
    if(c.file!==`audio/${c.id}.wav`||!/^[a-z_]+$/.test(c.id))throw Error('FIXTURE_CHANGED');
    const bytes=readFileSync(join(ROOT,c.file)),duration=waveDuration(bytes);
    if(hash(bytes)!==c.sha256||duration!==c.duration||duration>45)throw Error('FIXTURE_CHANGED');
    return {case:c,bytes,duration};
  });
  if(new Set(entries.map(e=>e.case.id)).size!==8)throw Error('FIXTURE_CHANGED');
  const reservedCeilingUSD=entries.length*CONFIG.models.reduce((n,m)=>n+3*CONFIG.prices[m],0);
  if(reservedCeilingUSD>CONFIG.budgetUSD)throw Error('BATCH_BUDGET_STOP');
  return {entries,manifestSHA256:hash(manifestBytes),configSHA256:hash(JSON.stringify(CONFIG)),reservedCeilingUSD,
    estimatedCeilingUSD:entries.reduce((n,e)=>n+Math.ceil(e.duration)/60*CONFIG.models.reduce((s,m)=>s+CONFIG.prices[m],0),0)};
}

export async function runBatch({directory,book,secret,fetcher=fetch,now=()=>new Date().toISOString()}){
  const prepared=preflight();if(!secret)throw Error('CREDENTIAL_MISSING');
  mkdirSync(directory,{recursive:true});const output=join(directory,'run.json');
  if(existsSync(output))throw Error('BATCH_ALREADY_STARTED_NO_RETRY');
  const report={kind:'APPROVED_SYNTHETIC_ASR_COMPARISON',config:CONFIG,manifestSHA256:prepared.manifestSHA256,configSHA256:prepared.configSHA256,
    startedAt:now(),status:'STARTED',requests:[],reservedUSD:0,ledgerBefore:book.summary(),productionModel:PRODUCTION_ASR_MODEL};
  writeFileSync(output,JSON.stringify(report,null,2),{flag:'wx'}); // Exclusive batch claim, also survives interruption.
  const save=()=>writeFileSync(output,JSON.stringify(report,null,2)+'\n');
  try{
    for(const [index,entry] of prepared.entries.entries()){
      for(const model of index%2?CONFIG.models.toReversed():CONFIG.models){
        const reserveUSD=3*CONFIG.prices[model];
        if(report.requests.length>=16||report.reservedUSD+reserveUSD>CONFIG.budgetUSD)throw Error('BATCH_BUDGET_STOP');
        const form=transcriptionForm(entry.bytes,{model,prompt:CONFIG.prompt,terms:entry.case.terms});
        const reservation=book.reserve({kind:'asr',attemptId:`asr20261119-${entry.case.id}`,model,minutes:3});
        const row={sequence:report.requests.length+1,caseId:entry.case.id,model,audioSHA256:entry.case.sha256,duration:entry.duration,
          reservationId:reservation.id,reserveUSD,startedAt:now(),status:'RESERVED_NOT_YET_DISPATCHED'};
        report.requests.push(row);report.reservedUSD+=reserveUSD;save();
        const started=performance.now();
        try{
          row.status='DISPATCHED';save();
          const response=await fetcher('https://api.openai.com/v1/audio/transcriptions',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${secret}`},body:form,signal:AbortSignal.timeout(CONFIG.timeoutMs)});
          row.httpStatus=response.status;row.requestId=safeRequestId(response.headers.get('x-request-id'));
          const body=await response.text();row.elapsedMs=Math.round(performance.now()-started);row.responseSHA256=hash(body);
          // Exact bytes remain local until inspected; public evidence is allowlisted.
          writeFileSync(join(directory,`response-${row.sequence}.txt`),body,{flag:'wx'});
          let data;try{data=JSON.parse(body);}catch{throw Error('RESPONSE_NOT_JSON');}
          if(!response.ok){row.error=sanitizeError(data,secret);throw Error(`API_HTTP_${response.status}`);}
          if(body.includes(secret))throw Error('UNEXPECTED_SECRET_IN_RESPONSE');
          row.provider={};for(const key of ['text','words','segments','languages','language','duration','model','usage'])if(data[key]!==undefined)row.provider[key]=data[key];
          // Receipt precedes contract validation. A malformed result is still an actual request.
          book.settle(reservation.id,{seconds:entry.duration},row.requestId);
          row.costEstimateUSD=Math.ceil(entry.duration)/60*CONFIG.prices[model];save();
          row.normalized=normalizeTranscription(data,entry.duration,model);row.status='COMPLETE';
        }catch(e){
          row.elapsedMs??=Math.round(performance.now()-started);row.status='FAILED';
          row.category=/^[A-Z0-9_]+$/.test(e.message)?e.message:'REQUEST_OR_RESPONSE_FAILURE';
          book.failure(reservation.id,row.category,row.httpStatus??null);throw Error(row.category);
        }finally{row.finishedAt=now();save();console.log(JSON.stringify({completed:row.sequence,caseId:row.caseId,status:row.status}));}
      }
    }
    report.status='COMPLETE_REVIEW_PENDING';
  }catch(e){report.status='STOPPED_NO_RETRY';report.stopCategory=/^[A-Z0-9_]+$/.test(e.message)?e.message:'LOCAL_FAILURE';}
  finally{
    report.finishedAt=now();report.ledgerAfter=book.summary();
    const ids=new Set(report.requests.map(r=>r.reservationId));report.batchLedgerEvents=book.read().events.filter(e=>ids.has(e.id));
    report.knownEstimateUSD=report.requests.reduce((n,r)=>n+(r.costEstimateUSD??0),0);
    report.exposureUSD=report.requests.reduce((n,r)=>n+(r.costEstimateUSD??r.reserveUSD),0);save();
  }
  return report;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  if(process.argv.length!==3)throw Error('EXPLICIT_BATCH_MODE_REQUIRED');
  if(process.argv[2]==='--preflight'){
    const p=preflight();console.log(JSON.stringify({...p,entries:p.entries.map(e=>({id:e.case.id,duration:e.duration,sha256:e.case.sha256}))},null,2));
  }else{
    if(process.argv[2]!=='--approved-budget-usd=0.30')throw Error('EXPLICIT_PLAN_AND_BUDGET_APPROVAL_REQUIRED');
    // Seal the completed public batch too, including fresh checkouts without artifacts.
    if(existsSync(join(ROOT,'evidence.json')))throw Error('BATCH_COMPLETED_NO_RETRY');
    const directory=fileURLToPath(new URL('../../../artifacts/study-teachback/asr-comparison-20261119/live/',import.meta.url));
    const ledgerPath=fileURLToPath(new URL('../../../study-teachback-app/runtime/usage.json',import.meta.url));
    const before=hash(readFileSync(ledgerPath));
    const report=await runBatch({directory,book:new Ledger(ledgerPath),secret:process.env.OPENAI_API_KEY});
    writeFileSync(join(directory,'ledger-hashes.json'),JSON.stringify({before,after:hash(readFileSync(ledgerPath))},null,2));
    console.log(JSON.stringify({status:report.status,requests:report.requests.length,knownEstimateUSD:report.knownEstimateUSD,exposureUSD:report.exposureUSD,output:directory}));
    if(report.status!=='COMPLETE_REVIEW_PENDING')process.exitCode=1;
  }
}
