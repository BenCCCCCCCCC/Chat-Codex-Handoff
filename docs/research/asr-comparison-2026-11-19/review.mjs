// Offline evidence preparation, blinding and aggregation. No fetch or API client.
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomInt} from 'node:crypto';
import {ROOT,hash} from './run.mjs';
import {transcriptionScore} from '../../../study-teachback-app/quality-eval.mjs';
const live=fileURLToPath(new URL('../../../artifacts/study-teachback/asr-comparison-20261119/live/',import.meta.url));
const read=path=>JSON.parse(readFileSync(path,'utf8'));
const write=(path,value)=>writeFileSync(path,JSON.stringify(value,null,2)+'\n',{flag:'wx'});
const run=read(join(live,'run.json')),manifest=read(join(ROOT,'manifest.json'));
if(run.status!=='COMPLETE_REVIEW_PENDING'||run.requests.length!==16)throw Error('INCOMPLETE_BATCH_REPORT_SEPARATELY');
if(run.manifestSHA256!==hash(readFileSync(join(ROOT,'manifest.json'))))throw Error('FIXTURE_CHANGED');
const mode=process.argv[2];
if(mode==='--blind'){
  if(existsSync(join(ROOT,'blinded.json'))||existsSync(join(live,'blinding-map.json')))throw Error('BLINDING_EXISTS');
  const rows=[],mapping=[];
  for(const c of manifest.cases){
    const pair=run.requests.filter(r=>r.caseId===c.id);if(randomInt(2))pair.reverse();
    rows.push({id:c.id,reference:c.reference,critical:c.critical,A:pair[0].provider.text,B:pair[1].provider.text});
    mapping.push({id:c.id,A:pair[0].model,B:pair[1].model});
  }
  write(join(live,'blinding-map.json'),mapping);write(join(ROOT,'blinded.json'),rows);
  console.log(JSON.stringify(rows,null,2));
}else if(mode==='--publish'){
  const judgement=read(join(ROOT,'blind-review.json'));
  if(judgement.blindedSHA256!==hash(readFileSync(join(ROOT,'blinded.json'))))throw Error('REVIEW_NOT_BOUND');
  const mapping=read(join(live,'blinding-map.json'));
  const rows=run.requests.map(r=>{
    const c=manifest.cases.find(c=>c.id===r.caseId),map=mapping.find(m=>m.id===c.id),label=map.A===r.model?'A':'B';
    const review=judgement.cases.find(j=>j.id===c.id)?.[label];if(!review)throw Error('REVIEW_MISSING');
    return {...r,scriptDifference:transcriptionScore(c.reference,r.provider.text),blindLabel:label,review};
  });
  const summary=run.config.models.map(model=>{
    const items=rows.filter(r=>r.model===model),edits=items.reduce((n,r)=>n+r.scriptDifference.edits,0),characters=items.reduce((n,r)=>n+r.scriptDifference.referenceCharacters,0);
    const times=items.map(r=>r.elapsedMs).sort((a,b)=>a-b);
    return {model,successful:items.filter(r=>r.status==='COMPLETE').length,reviewOutcomes:items.reduce((n,r)=>{n[r.review.outcome]=(n[r.review.outcome]??0)+1;return n;},{}),scriptDifference:{edits,referenceCharacters:characters,rate:edits/characters},latencyMs:{median:(times[3]+times[4])/2,min:times[0],max:times.at(-1)},costEstimateUSD:items.reduce((n,r)=>n+r.costEstimateUSD,0),timing:items.map(r=>({id:r.caseId,alignment:r.normalized.alignment,spans:r.normalized.spans.length,words:r.normalized.words.length,unusableWords:r.normalized.wordTiming.unusableWordIds.length}))};
  });
  const evidence={kind:run.kind,authorization:'USER_APPROVED_SYNTHETIC_ONLY_16_CALLS_USD_0_30_NO_RETRY',inputFreezeCommit:'7a2a3bae5302735ca2c3d00230f544ac0779137e',startedAt:run.startedAt,finishedAt:run.finishedAt,status:'COMPLETE_REVIEWED',sourceRunStatus:run.status,config:run.config,manifestSHA256:run.manifestSHA256,configSHA256:run.configSHA256,requestCount:rows.length,reservedUSD:run.reservedUSD,knownEstimateUSD:run.knownEstimateUSD,exposureUSD:run.exposureUSD,productionModel:run.productionModel,ledgerHashes:read(join(live,'ledger-hashes.json')),batchLedgerEvents:run.batchLedgerEvents,requests:rows,summary,
    limits:['Frozen local TTS script, not independent human transcription','Assistant text review with hidden model labels, not human blinded listening','Synthetic fixtures do not establish real learner accuracy','Public-rate duration estimate, not provider invoice','No production switch']};
  const serialized=JSON.stringify(evidence);
  if((process.env.OPENAI_API_KEY&&serialized.includes(process.env.OPENAI_API_KEY))||/Bearer\s|\bsk-[a-zA-Z0-9]/.test(serialized))throw Error('SECRET_REVIEW_REQUIRED');
  write(join(ROOT,'blinding-map.json'),mapping);write(join(ROOT,'evidence.json'),evidence);
  console.log(JSON.stringify({summary,requestCount:evidence.requestCount,knownEstimateUSD:evidence.knownEstimateUSD,exposureUSD:evidence.exposureUSD,ledgerHashes:evidence.ledgerHashes},null,2));
}else throw Error('Use --blind then --publish after independent text review');
