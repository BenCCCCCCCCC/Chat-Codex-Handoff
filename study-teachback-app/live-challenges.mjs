import { semantic, ledger } from './provider.mjs';
import { contentInput,validateFindings,validateTeaching } from './core.mjs';
import { CONTENT,TEACH,findingsSchema,teachingSchema } from './schemas.mjs';
import { writeFileSync,readFileSync } from 'node:fs';
import {cases,plantSource,verdictPass} from './logic-fixtures.mjs';
// Recovery stop is retained; absent/incomplete evidence also blocks paid semantic runs.
const auth=JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r/AUTH_DIAGNOSTIC.json',import.meta.url),'utf8'));
if(auth.outcome!=='AUTH_PASS_TIMESTAMP_TRANSPORT_VALID')throw new Error('AUTH_RECOVERY_STOP_NO_PAID_CALLS');
const source=plantSource;
const receipt={kind:'LIVE_API_SYNTHETIC_ENGINEERING_FIXTURES',at:new Date().toISOString(),source,cases:[],speechEvidence:false,oracleVersion:'BUILD-01R-necessary-not-sufficient',qualitativeReview:'REQUIRED_NOT_ESTABLISHED_BY_SCHEMA_OR_STATUS'};
for(const {id,words,expectation,source}of cases){
  const a={id,sourceId:source.id,transcriptVersion:'fixture-confirmed-1',duration:20,spans:[{id:'s0',start:0,end:20,text:words}],assistance:'none',kind:'full',focus:null,reviewed:true,interrupted:false};
  let response;
  try{const r=await semantic(CONTENT,contentInput(source,{...a,fluency:id==='fluent_wrong'?'smooth':'slow',pauses:12}),findingsSchema);response=r;validateFindings(r.value,source,a,'content');const pass=verdictPass(expectation,r.value.findings);receipt.cases.push({id,expectation,status:pass?'PASS':'FAIL',source,fixture:a,model:r.model,usage:r.usage,result:r.value});console.log(id+': '+(pass?'PASS':'FAIL'));}
  catch(e){receipt.cases.push({id,status:'BLOCKED',category:e.message,result:response?.value??null});console.log(id+': BLOCKED '+e.message);break;}
}
if(!receipt.cases.some(c=>c.status==='BLOCKED'))for(const mode of ['learn','repair','apply']){
  try{const r=await semantic(TEACH,{source,mode,message:mode==='apply'?'请给一个新的相关应用情境，不要公布答案。':'请用简短的中文解释这个规则。',focus:mode==='repair'?'土壤湿润时为何不能继续按干燥条件浇水':null,history:[]},teachingSchema);validateTeaching(r.value,source);receipt.cases.push({id:mode,status:'SCHEMA_VALID_REVIEW_REQUIRED',model:r.model,usage:r.usage,result:r.value});console.log(mode+': valid');}catch(e){receipt.cases.push({id:mode,status:'BLOCKED',category:e.message});break;}
}
receipt.ledger=ledger.summary();writeFileSync(new URL(`./evidence/live-challenges-${Date.now()}.json`,import.meta.url),JSON.stringify(receipt,null,2));
