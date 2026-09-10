import { semantic, ledger } from './provider.mjs';
import { contentInput,validateFindings,validateTeaching } from './core.mjs';
import { CONTENT,TEACH,findingsSchema,teachingSchema } from './schemas.mjs';
import { writeFileSync } from 'node:fs';
const source={id:'engineering-source-1',title:'自编工程材料：植物浇水',text:'只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。'};
const cases=[
  ['correct_with_pauses','土壤干了才浇水，湿润的时候不要浇水。','correct'],
  ['fluent_wrong','土壤越湿越要浇水，湿润时也要浇水。','wrong'],
  ['omitted_condition','给这盆植物浇水。','missing'],
  ['valid_paraphrase','摸起来还是湿的就先别加水，干了再加。','correct'],
  ['self_repair','湿的时候浇水，不对，我说反了，干的时候才浇，湿的时候别浇。','correct']
];
const receipt={kind:'LIVE_API_SYNTHETIC_ENGINEERING_FIXTURES',at:new Date().toISOString(),source,cases:[],speechEvidence:false};
for(const [id,words,expectation]of cases){
  const a={id,sourceId:source.id,transcriptVersion:'fixture-confirmed-1',duration:20,spans:[{id:'s0',start:0,end:20,text:words}],assistance:'none',kind:'full',focus:null,reviewed:true,interrupted:false};
  let response;
  try{const r=await semantic(CONTENT,contentInput(source,{...a,fluency:id==='fluent_wrong'?'smooth':'slow',pauses:12}),findingsSchema);response=r;validateFindings(r.value,source,a,'content');const statuses=r.value.findings.map(f=>f.status);const pass=expectation==='correct'?statuses.includes('supported')&&!statuses.some(s=>['incorrect','missing'].includes(s)):expectation==='wrong'?statuses.includes('incorrect'):statuses.includes('missing');receipt.cases.push({id,expectation,status:pass?'PASS':'FAIL',fixture:a,model:r.model,usage:r.usage,result:r.value});console.log(id+': '+(pass?'PASS':'FAIL'));}
  catch(e){receipt.cases.push({id,status:'BLOCKED',category:e.message,result:response?.value??null});console.log(id+': BLOCKED '+e.message);break;}
}
if(!receipt.cases.some(c=>c.status==='BLOCKED'))for(const mode of ['learn','repair','apply']){
  try{const r=await semantic(TEACH,{source,mode,message:mode==='apply'?'请给一个新的相关应用情境，不要公布答案。':'请用简短的中文解释这个规则。',focus:mode==='repair'?'土壤湿润时为何不能继续按干燥条件浇水':null,history:[]},teachingSchema);validateTeaching(r.value,source);receipt.cases.push({id:mode,status:'SCHEMA_VALID_REVIEW_REQUIRED',model:r.model,usage:r.usage,result:r.value});console.log(mode+': valid');}catch(e){receipt.cases.push({id:mode,status:'BLOCKED',category:e.message});break;}
}
receipt.ledger=ledger.summary();writeFileSync(new URL(`./evidence/live-challenges-${Date.now()}.json`,import.meta.url),JSON.stringify(receipt,null,2));
