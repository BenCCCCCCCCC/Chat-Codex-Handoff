// Manual entry for this fixed, separately approved batch. No retry.
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {speechCases,analysisCases} from './natural-speech-fixtures.mjs';
import {speechScore,analysisScore,criticalPresence} from './natural-speech-eval.mjs';
import {contentInput,waveDuration} from './core.mjs';
import {CONTENT,findingsSchema} from './schemas.mjs';
import {ASR_STYLE_PROMPT} from './provider.mjs';
if(process.argv.length!==3||process.argv[2]!=='--approved-budget-usd=0.15')throw Error('EXPLICIT_PLAN_AND_BUDGET_APPROVAL_REQUIRED');
const dir=new URL('../artifacts/study-teachback/terminology-01/',import.meta.url);
const output=new URL('live-quality.json',dir),hash=value=>createHash('sha256').update(value).digest('hex');
if(existsSync(output))throw Error('BATCH_ALREADY_STARTED_NO_AUTOMATIC_RETRY');
const configs=Object.fromEntries(['baseline','candidate'].map(arm=>[arm,JSON.parse(readFileSync(new URL(`./fixtures/terminology-${arm}.json`,import.meta.url)))]));
if(configs.candidate.contentPrompt!==CONTENT||configs.candidate.asrPrompt!==ASR_STYLE_PROMPT||JSON.stringify(configs.candidate.schema)!==JSON.stringify(findingsSchema))throw Error('CANDIDATE_CHANGED');
const fixtures=speechCases.slice(0,2),audio=fixtures.map(c=>{
  const bytes=readFileSync(new URL('./fixtures/natural-speech/'+c.file,import.meta.url));
  if(hash(bytes)!==c.sha256||Math.abs(waveDuration(bytes)-c.duration)>.001)throw Error('FIXTURE_CHANGED');
  return bytes;
});
if(!process.env.OPENAI_API_KEY)throw Error('CREDENTIAL_MISSING');
const {transcribe,semantic,ledger}=await import('./provider.mjs');
let requests=0,reserved=0;
const book={
  reserve(args){
    const cost=args.kind==='asr'?args.minutes*.006:(args.input*.25+args.output*1.20)/1e6;
    if(requests>=12||reserved+cost>.15)throw Error('BATCH_BUDGET_STOP');
    const r=ledger.reserve(args);requests++;reserved+=cost;return r;
  },
  settle:(...args)=>ledger.settle(...args),failure:(...args)=>ledger.failure(...args)
};
const report={kind:'TERMINOLOGY_AND_SINGLE_ACTION_COMPARISON',startedAt:new Date().toISOString(),budgetUSD:.15,
  speechFixtures:fixtures,contentFixtures:analysisCases,inputHash:hash(JSON.stringify({fixtures,analysisCases})),
  configs,configHashes:Object.fromEntries(Object.entries(configs).map(([k,v])=>[k,hash(JSON.stringify(v))])),
  status:'STARTED',asr:[],cases:[],ledgerBefore:ledger.summary()};
mkdirSync(dir,{recursive:true});writeFileSync(output,JSON.stringify(report,null,2),{flag:'wx'});
const save=()=>writeFileSync(output,JSON.stringify({...report,requests,reservedUSD:reserved,ledgerAfter:ledger.summary()},null,2));
try{
  for(const [i,c] of fixtures.entries()){
    for(const arm of i%2?['candidate','baseline']:['baseline','candidate']){
      const result=await transcribe(audio[i],`terminology-${c.id}`,{book,prompt:configs[arm].asrPrompt,terms:configs[arm].terms??[]});
      const score=speechScore(c,result,waveDuration(audio[i]));
      const hintsPresent=configs.candidate.terms.filter(term=>criticalPresence(result.text,{kind:'term',aliases:[term]}));
      report.asr.push({id:c.id,arm,result,score,hintsPresent,negativeControl:i===1});save();
      console.log(JSON.stringify({completed:c.id,arm,requests}));
      if(!score.timing.valid)throw Error('ASR_TIMING_INVALID');
    }
  }
  for(const [index,c] of analysisCases.entries()){
    const fixture={id:c.id,sourceId:c.source.id,transcriptVersion:'terminology-fixed-text-v1',duration:20,
      spans:[{id:'s0',start:0,end:20,text:c.words}],assistance:'unknown',kind:'full',focus:null,reviewed:true,interrupted:false};
    for(const arm of index%2?['candidate','baseline']:['baseline','candidate']){
      const result=await semantic(configs[arm].contentPrompt,contentInput(c.source,fixture),configs[arm].schema,{book});
      const score=analysisScore(c,fixture,result.value);
      report.cases.push({id:c.id,arm,source:c.source,fixture,result,score});save();
      console.log(JSON.stringify({completed:c.id,arm,requests}));
      if(!score.evidenceValid)throw Error('CONTENT_EVIDENCE_INVALID');
    }
  }
  report.status='COMPLETE_MANUAL_REVIEW_REQUIRED';
}catch(e){report.status='STOPPED';report.error=/^[A-Z0-9_]+$/.test(e.message)?e.message:'LOCAL_FAILURE';process.exitCode=1;}
finally{save();}
console.log(JSON.stringify({status:report.status,requests,reservedUSD:reserved,output:output.href}));
