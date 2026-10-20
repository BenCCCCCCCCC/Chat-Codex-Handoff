import {validateFindings,normalizeASR} from './core.mjs';
import {verdictPass} from './logic-fixtures.mjs';

const chars=text=>Array.from(text.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,''));
export function transcriptionScore(reference,text){
  const a=chars(reference),b=chars(text);
  if(!a.length)throw Error('EMPTY_REFERENCE');
  let row=Array.from({length:b.length+1},(_,i)=>({edits:i,insertions:i,deletions:0,substitutions:0}));
  for(let i=1;i<=a.length;i++){
    const next=[{edits:i,insertions:0,deletions:i,substitutions:0}];
    for(let j=1;j<=b.length;j++){
      const cost=a[i-1]===b[j-1]?0:1;
      const options=[
        {...row[j-1],edits:row[j-1].edits+cost,substitutions:row[j-1].substitutions+cost},
        {...row[j],edits:row[j].edits+1,deletions:row[j].deletions+1},
        {...next[j-1],edits:next[j-1].edits+1,insertions:next[j-1].insertions+1}
      ];
      next.push(options.reduce((best,x)=>x.edits<best.edits?x:best));
    }
    row=next;
  }
  return {...row.at(-1),referenceCharacters:a.length,hypothesisCharacters:b.length,
    cer:row.at(-1).edits/a.length,normalization:'NFKC; whitespace/punctuation removed; script and numbers unchanged'};
}
export function asrScore(reference,response,duration){
  let timing;
  try{
    const value=normalizeASR(response.spans?{...response,segments:response.spans,
      words:response.words?.map(w=>({...w,word:w.text}))}:response,duration);
    timing={valid:true,spans:value.spans.length,words:value.words.length,wordTiming:value.wordTiming};
  }catch(e){timing={valid:false,error:e.message};}
  return {reference,text:response.text,...transcriptionScore(reference,response.text),timing,
    criticalTerms:['只有','才','不要'].map(term=>({term,present:response.text.includes(term)})),
    timingAccuracy:'NOT_MEASURED',manualReview:'REQUIRED'};
}
export function contentScore({source,fixture,expectation,result}){
  let evidenceValid=true,error=null;
  try{validateFindings(result,source,fixture,'content');}catch(e){evidenceValid=false;error=e.message;}
  const findings=Array.isArray(result?.findings)?result.findings:[];
  return {expectation,verdictPass:verdictPass(expectation,findings),evidenceValid,error,
    statuses:findings.map(f=>f.status),
    nonInformativeRepairIndices:findings.flatMap((f,i)=>/[\p{L}\p{N}]/u.test(f.repair??'')?[]:[i]),
    reasonAndRepairReview:'REQUIRED'};
}
