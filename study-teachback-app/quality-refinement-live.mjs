// Manual, approved experiment only. Never imported by the offline test runner.
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {asrScore,contentScore} from './quality-eval.mjs';
import {cases} from './logic-fixtures.mjs';
import {contentInput,waveDuration} from './core.mjs';
import {CONTENT,findingsSchema} from './schemas.mjs';

if(process.argv.length!==3||process.argv[2]!=='--approved-budget-usd=0.15')throw Error('EXPLICIT_PLAN_AND_BUDGET_APPROVAL_REQUIRED');
const dir=new URL('../artifacts/study-teachback/transcript-refinement-01/',import.meta.url);
const output=new URL('live-quality.json',dir);
if(existsSync(output))throw Error('BATCH_ALREADY_STARTED_NO_AUTOMATIC_RETRY');
const hash=value=>createHash('sha256').update(value).digest('hex');
const baseline=JSON.parse(readFileSync(new URL('./fixtures/quality-refinement-baseline.json',import.meta.url)));
const audio=readFileSync(new URL('./fixtures/synthetic-mandarin-v2.wav',import.meta.url));
if(hash(audio)!=='7e291bc01d614dfb34068ab3d2d9f4d1217f329ba14b6e4fdb7cea919aba6206')throw Error('FIXTURE_CHANGED');
// Exact container normalization of the hash-pinned fixture; PCM bytes unchanged.
const wav=Buffer.concat([audio.subarray(0,36),audio.subarray(38)]);
wav.writeUInt32LE(16,16);wav.writeUInt32LE(wav.length-8,4);
const duration=waveDuration(wav);
const inputs=['valid_paraphrase','ticket_sufficient_strengthening','self_repair','fluent_wrong','omitted_condition'].map(id=>cases.find(c=>c.id===id));
inputs.push({id:'backup_sufficient_strengthening',source:{id:'engineering-source-backup',title:'自编工程材料：备份与升级',text:'只有完成备份才能升级系统。'},words:'只要完成备份就一定能升级系统。',expectation:'unsupported_strengthening'});
if(inputs.some(c=>!c))throw Error('FIXTURE_MISSING');
if(!process.env.OPENAI_API_KEY)throw Error('CREDENTIAL_MISSING');
const {transcribe,semantic,ledger,ASR_STYLE_PROMPT}=await import('./provider.mjs');
const configs={baseline,candidate:{asrPrompt:ASR_STYLE_PROMPT,contentPrompt:CONTENT,schema:findingsSchema}};
let requests=0,reserved=0;
const book={
  reserve(args){
    const cost=args.kind==='asr'?args.minutes*.006:(args.input*.25+args.output*1.20)/1e6;
    if(requests>=14||reserved+cost>.15)throw Error('BATCH_BUDGET_STOP');
    const r=ledger.reserve(args);requests++;reserved+=cost;return r;
  },
  settle:(...args)=>ledger.settle(...args),failure:(...args)=>ledger.failure(...args)
};
const report={kind:'LIVE_SYNTHETIC_CONFIG_COMPARISON',startedAt:new Date().toISOString(),budgetUSD:.15,
  audioHash:hash(audio),normalizedAudioHash:hash(wav),inputHash:hash(JSON.stringify(inputs)),
  configs,configHashes:Object.fromEntries(Object.entries(configs).map(([k,v])=>[k,hash(JSON.stringify(v))])),
  status:'STARTED',asr:[],cases:[],ledgerBefore:ledger.summary()};
mkdirSync(dir,{recursive:true});writeFileSync(output,JSON.stringify(report,null,2),{flag:'wx'});
const save=()=>writeFileSync(output,JSON.stringify({...report,requests,reservedUSD:reserved,ledgerAfter:ledger.summary()},null,2));
try{
  for(const arm of ['baseline','candidate']){
    const result=await transcribe(wav,`transcript-refinement-${arm}`,{book,prompt:configs[arm].asrPrompt});
    const score=asrScore('只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。',result,duration);
    report.asr.push({arm,result,score});save();
    if(!score.timing.valid)throw Error('ASR_TIMING_INVALID');
  }
  for(const [index,c] of inputs.entries()){
    const fixture={id:c.id,sourceId:c.source.id,transcriptVersion:'refinement-confirmed-v1',duration:20,
      spans:[{id:'s0',start:0,end:20,text:c.words}],assistance:'unknown',kind:'full',focus:null,reviewed:true,interrupted:false};
    for(const arm of index%2?['candidate','baseline']:['baseline','candidate']){
      const result=await semantic(configs[arm].contentPrompt,contentInput(c.source,fixture),configs[arm].schema,{book});
      const score=contentScore({source:c.source,fixture,expectation:c.expectation,result:result.value});
      score.supportedAdviceAbsent=result.value.findings.filter(f=>f.status==='supported').every(f=>f.repair===null);
      report.cases.push({id:c.id,arm,source:c.source,fixture,result,score});save();
      if(!score.evidenceValid)throw Error('CONTENT_EVIDENCE_INVALID');
    }
  }
  report.status='COMPLETE_MANUAL_REVIEW_REQUIRED';
}catch(e){report.status='STOPPED';report.error=/^[A-Z0-9_]+$/.test(e.message)?e.message:'LOCAL_FAILURE';}
finally{save();}
console.log(JSON.stringify({status:report.status,requests,reservedUSD:reserved,output:output.href}));
