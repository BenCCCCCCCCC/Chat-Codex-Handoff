// Never run as a test. Requires the user's explicit approval of the checked-in plan.
import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {asrScore,contentScore} from './quality-eval.mjs';
import {cases} from './logic-fixtures.mjs';
import {contentInput,waveDuration} from './core.mjs';
import {CONTENT,findingsSchema} from './schemas.mjs';

if(process.argv.length!==3||process.argv[2]!=='--approved-budget-usd=0.10')throw Error('EXPLICIT_PLAN_AND_BUDGET_APPROVAL_REQUIRED');
const dir=new URL('../artifacts/study-teachback/audio-upload-quality-01/',import.meta.url);
mkdirSync(dir,{recursive:true});const output=new URL('live-quality.json',dir);
if(existsSync(output))throw Error('BATCH_ALREADY_STARTED_NO_AUTOMATIC_RETRY');
const audio=readFileSync(new URL('./fixtures/synthetic-mandarin-v2.wav',import.meta.url));
const audioHash=createHash('sha256').update(audio).digest('hex');
if(audioHash!=='7e291bc01d614dfb34068ab3d2d9f4d1217f329ba14b6e4fdb7cea919aba6206')throw Error('FIXTURE_CHANGED');
// The hash-pinned System.Speech fixture has an 18-byte fmt chunk (two zero extension bytes).
// Canonicalize its container exactly; the PCM data is unchanged. This is not a general WAV parser.
const wav=Buffer.concat([audio.subarray(0,36),audio.subarray(38)]);
wav.writeUInt32LE(16,16);wav.writeUInt32LE(wav.length-8,4);waveDuration(wav);
if(!process.env.OPENAI_API_KEY)throw Error('CREDENTIAL_MISSING');
const {transcribe,semantic,ledger}=await import('./provider.mjs');
let reserved=0,requests=0;
const book={
  reserve(args){
    const cost=args.kind==='asr'?args.minutes*.006:(args.input*.25+args.output*1.20)/1e6;
    if(requests>=9||reserved+cost>.10)throw Error('BATCH_BUDGET_STOP');
    const r=ledger.reserve(args);reserved+=cost;requests++;return r;
  },
  settle:(...args)=>ledger.settle(...args),failure:(...args)=>ledger.failure(...args)
};
const report={kind:'LIVE_SYNTHETIC_QUALITY_BASELINE',startedAt:new Date().toISOString(),budgetUSD:.10,
  audioHash,normalizedAudioHash:createHash('sha256').update(wav).digest('hex'),contentFixtureHash:createHash('sha256').update(readFileSync(new URL('./logic-fixtures.mjs',import.meta.url))).digest('hex'),
  promptHash:createHash('sha256').update(CONTENT).digest('hex'),status:'STARTED',cases:[],ledgerBefore:ledger.summary()};
writeFileSync(output,JSON.stringify(report,null,2),{flag:'wx'});
const save=()=>writeFileSync(output,JSON.stringify({...report,requests,reservedUSD:reserved,ledgerAfter:ledger.summary()},null,2));
try{
  const result=await transcribe(wav,'audio-upload-quality-01',{book});
  report.asr={result,score:asrScore('只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。',result,7.31)};save();
  if(!report.asr.score.timing.valid)throw Error('ASR_TIMING_INVALID');
  const inputs=[...cases,{...cases.find(c=>c.id==='self_repair'),id:'self_repair_repeat'}];
  for(const c of inputs){
    const fixture={id:c.id,sourceId:c.source.id,transcriptVersion:'quality-confirmed-v1',duration:20,
      spans:[{id:'s0',start:0,end:20,text:c.words}],assistance:'unknown',kind:'full',focus:null,reviewed:true,interrupted:false};
    const result=await semantic(CONTENT,contentInput(c.source,fixture),findingsSchema,{book});
    const score=contentScore({source:c.source,fixture,expectation:c.expectation,result:result.value});
    report.cases.push({id:c.id,source:c.source,fixture,result,score});save();
    if(!score.evidenceValid)throw Error('CONTENT_EVIDENCE_INVALID');
  }
  report.status='COMPLETE_MANUAL_REVIEW_REQUIRED';
}catch(e){report.status='STOPPED';report.error=/^[A-Z0-9_]+$/.test(e.message)?e.message:'LOCAL_FAILURE';}
finally{save();}
console.log(JSON.stringify({status:report.status,requests,reservedUSD:reserved,output:output.href}));
