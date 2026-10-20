// Re-score public historical responses without importing a provider or making requests.
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {asrScore,contentScore} from './quality-eval.mjs';
const root=new URL('../',import.meta.url);
const read=path=>{const data=readFileSync(new URL(path,root));return {path,sha256:createHash('sha256').update(data).digest('hex'),value:JSON.parse(data)};};
const asr=read('artifacts/study-teachback/build-01r2/SYNTHETIC_ASR_FIELDS.json');
const content=['LUNA_LOGIC.json','LUNA_LOGIC_REV2.json','LUNA_LOGIC_REV3.json'].map(name=>{
  const data=read('artifacts/study-teachback/build-01r3/'+name);
  return {path:data.path,sha256:data.sha256,at:data.value.at,
    cases:data.value.cases.filter(c=>c.result&&(!c.id||!['learn','repair','apply'].includes(c.id))).map(c=>({
      id:c.id,originalStatus:c.status,
      ...c.fixture&&c.expectation?contentScore({...c,source:c.source??data.value.source}):
        {rescored:false,reason:'Historical record lacks fixed fixture/expectation; preserve original blocked result',category:c.category}
    }))};
});
const report={kind:'HISTORICAL_RESCORING_NO_NEW_API',sourceDate:'2026-09-10',newAPICalls:0,
  asr:{path:asr.path,sha256:asr.sha256,model:'whisper-1',sample:'Synthetic Huihui, 7.31 seconds',
    ...asrScore('只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。',asr.value,7.31),
    review:'Differences are traditional vs simplified characters; negation and condition direction preserved. One synthetic voice does not establish natural speech accuracy.'},
  content,limitations:'Historical revisions changed prompts/validation; not controlled model comparisons or current accuracy estimates. Verdict pass does not establish useful repair advice.'};
writeFileSync(new URL('../docs/research/voice-quality-baseline.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({asr:report.asr,content:content.map(x=>({path:x.path,cases:x.cases}))},null,2));
