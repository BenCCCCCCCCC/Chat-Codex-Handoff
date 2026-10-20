import {mkdirSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {taskSplitCases} from './task-split-fixtures.mjs';
import {TASK,ASSESS,taskSchema,assessmentSchema} from './understanding-task-prompts.mjs';
import {validateTaskResult,validateAssessment} from './understanding-task.mjs';
if(process.argv.length!==3||process.argv[2]!=='--approved-budget-usd=0.10')throw Error('EXPLICIT_PLAN_AND_BUDGET_APPROVAL_REQUIRED');
const dir=new URL('../artifacts/study-teachback/task-split-01/',import.meta.url),output=new URL('live-quality.json',dir);
const hash=x=>createHash('sha256').update(x).digest('hex');
if(existsSync(output))throw Error('BATCH_ALREADY_STARTED_NO_AUTOMATIC_RETRY');
const config=JSON.parse(readFileSync(new URL('./fixtures/task-split-config.json',import.meta.url)));
if(JSON.stringify(config)!==JSON.stringify({TASK,ASSESS,taskSchema,assessmentSchema}))throw Error('CONFIG_CHANGED');
if(!process.env.OPENAI_API_KEY)throw Error('CREDENTIAL_MISSING');
const {semantic,ledger}=await import('./provider.mjs');
let requests=0,reserved=0;
const book={reserve(args){
  const cost=(args.input*.25+args.output*1.20)/1e6;
  if(args.kind!=='semantic'||requests>=12||reserved+cost>.10)throw Error('BATCH_BUDGET_STOP');
  const r=ledger.reserve(args);requests++;reserved+=cost;return r;
},settle:(...a)=>ledger.settle(...a),failure:(...a)=>ledger.failure(...a)};
const report={kind:'SEPARATE_TASK_AND_ASSESSMENT',startedAt:new Date().toISOString(),budgetUSD:.10,config,
  configHash:hash(JSON.stringify(config)),fixtures:taskSplitCases,inputHash:hash(JSON.stringify(taskSplitCases)),
  status:'STARTED',generation:[],assessment:[],ledgerBefore:ledger.summary()};
mkdirSync(dir,{recursive:true});writeFileSync(output,JSON.stringify(report,null,2),{flag:'wx'});
const save=()=>writeFileSync(output,JSON.stringify({...report,requests,reservedUSD:reserved,ledgerAfter:ledger.summary()},null,2));
try{
  for(const c of taskSplitCases){
    const result=await semantic(TASK,c.context,taskSchema,{book});
    report.generation.push({id:c.id,result});save();
    validateTaskResult(result.value,c.source,c.context.target.id);
    console.log(JSON.stringify({completed:c.id,phase:'generation',requests}));
  }
  for(const c of taskSplitCases)for(const [index,a] of c.answers.entries()){
    const result=await semantic(ASSESS,{source:c.source,task:c.goldTask,answer:a.text},assessmentSchema,{book});
    report.assessment.push({id:c.id,index,expected:a.expectedVerdict,result});save();
    validateAssessment(result.value,c.source,c.goldTask.targetId);
    console.log(JSON.stringify({completed:c.id,index,phase:'assessment',requests}));
  }
  report.status='COMPLETE_MANUAL_REVIEW_REQUIRED';
}catch(e){report.status='STOPPED';report.error=/^[A-Z0-9_]+$/.test(e.message)?e.message:'LOCAL_FAILURE';process.exitCode=1;}
finally{save();}
console.log(JSON.stringify({status:report.status,requests,reservedUSD:reserved,output:output.href}));
