// Manual entry for the separately approved fixed comparison. No automatic retry.
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {understandingCases} from './understanding-fixtures.mjs';
import {analysisScore} from './natural-speech-eval.mjs';
import {contentInput} from './core.mjs';
import {CONTENT,findingsSchema} from './schemas.mjs';
if(process.argv.length!==3||process.argv[2]!=='--approved-budget-usd=0.10')throw Error('EXPLICIT_PLAN_AND_BUDGET_APPROVAL_REQUIRED');
const dir=new URL('../artifacts/study-teachback/understanding-probes-01/',import.meta.url);
const output=new URL('live-quality.json',dir),hash=value=>createHash('sha256').update(value).digest('hex');
if(existsSync(output))throw Error('BATCH_ALREADY_STARTED_NO_AUTOMATIC_RETRY');
const configs=Object.fromEntries(['baseline','candidate'].map(arm=>[arm,JSON.parse(readFileSync(new URL(`./fixtures/understanding-${arm}.json`,import.meta.url)))]));
if(configs.candidate.contentPrompt!==CONTENT||JSON.stringify(configs.candidate.schema)!==JSON.stringify(findingsSchema))throw Error('CANDIDATE_CHANGED');
if(!process.env.OPENAI_API_KEY)throw Error('CREDENTIAL_MISSING');
const {semantic,ledger}=await import('./provider.mjs');
let requests=0,reserved=0;
const book={
  reserve(args){
    if(args.kind!=='semantic')throw Error('BATCH_SCOPE_STOP');
    const cost=(args.input*.25+args.output*1.20)/1e6;
    if(requests>=12||reserved+cost>.10)throw Error('BATCH_BUDGET_STOP');
    const r=ledger.reserve(args);requests++;reserved+=cost;return r;
  },
  settle:(...args)=>ledger.settle(...args),failure:(...args)=>ledger.failure(...args)
};
const report={kind:'UNDERSTANDING_PROBES_COMPARISON',startedAt:new Date().toISOString(),budgetUSD:.10,
  contentFixtures:understandingCases,inputHash:hash(JSON.stringify(understandingCases)),
  configs,configHashes:Object.fromEntries(Object.entries(configs).map(([k,v])=>[k,hash(JSON.stringify(v))])),
  status:'STARTED',cases:[],ledgerBefore:ledger.summary()};
mkdirSync(dir,{recursive:true});writeFileSync(output,JSON.stringify(report,null,2),{flag:'wx'});
const save=()=>writeFileSync(output,JSON.stringify({...report,requests,reservedUSD:reserved,ledgerAfter:ledger.summary()},null,2));
try{
  for(const [index,c] of understandingCases.entries()){
    const fixture={id:c.id,sourceId:c.source.id,transcriptVersion:'understanding-fixed-v1',duration:20,
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
