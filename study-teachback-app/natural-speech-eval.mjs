import {transcriptionScore,asrScore,contentScore} from './quality-eval.mjs';
import {quotePlayback} from './transcript-playback.mjs';
// Explicit aliases only; never silently convert the ASR text or CER reference.
const compact=text=>text.normalize('NFKC').replace(/\s/gu,'').toLowerCase();
const numeric=/[0-9零〇一二两三四五六七八九十百千万亿点]/u;
export function criticalPresence(text,item){
  const value=compact(text);
  return item.aliases.some(alias=>{
    const term=compact(alias);let at=value.indexOf(term);
    while(at>=0){
      const before=value[at-1]??'',after=value[at+term.length]??'';
      const leftBad=numeric.test(term[0])?numeric.test(before):/[a-z]/u.test(term[0])&&/[a-z0-9]/u.test(before);
      const rightBad=numeric.test(term.at(-1))?numeric.test(after):/[a-z]/u.test(term.at(-1))&&/[a-z0-9]/u.test(after);
      if(!leftBad&&!rightBad)return true;
      at=value.indexOf(term,at+1);
    }
    return false;
  });
}
export function speechScore(fixture,result,duration){
  const timing=asrScore(fixture.reference,result,duration).timing;
  return {referenceType:fixture.referenceType,
    characterDifference:fixture.referenceType==='reading_script'?transcriptionScore(fixture.reference,result.text):null,
    critical:fixture.critical.map(item=>({label:item.label,kind:item.kind,present:criticalPresence(result.text,item)})),
    timing:{...timing,zeroLengthWords:(result.words??[]).filter(w=>w.start===w.end).length},
    timingAccuracy:'NOT_MEASURED_NO_HUMAN_ALIGNMENT',
    interpretation:fixture.referenceType==='reading_script'?'Difference from reading script; actual reading not human verified':'Automatic reference; lexical observations only, no accuracy score'};
}
export function analysisScore(c,fixture,result,raw=null){
  const score=contentScore({source:c.source,fixture,expectation:c.expectation,result});
  // This case contains correct dates as well as a wrong height; separate supported
  // findings are acceptable. This oracle only checks the existence of the error.
  if(c.id==='number_unit_swap')score.verdictPass=result.findings.some(f=>f.status==='incorrect');
  return {...score,supportedAdviceAbsent:result.findings.filter(f=>f.status==='supported').every(f=>f.repair===null),
    messageCharacters:result.findings.map(f=>Array.from(f.message).length),
    anchors:raw?result.findings.filter(f=>f.spanId).map(f=>quotePlayback(raw,fixture.spans.find(s=>s.id===f.spanId),f.quote)):[],
    manualCriteria:c.review};
}
