// Local task coverage only: no provider imports, credentials, fetches or grading.
import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {boundedTask} from './bounded-understanding.mjs';

const corpusURL=new URL('../docs/research/fixtures/real-material-corpus.json',import.meta.url);
const bytes=readFileSync(corpusURL),corpus=JSON.parse(bytes);
const sha=value=>createHash('sha256').update(value).digest('hex');
const cases=corpus.cases.map(c=>{
  const source={id:c.id,title:c.title,text:c.text};
  // Give the grammar its best supported entry: one target quoting the whole
  // excerpt. These are authored targets, not live content-analysis results.
  const target={id:`target:${c.id}`,sourceQuote:c.text,...c.target,quote:null};
  return {id:c.id,input:{source,target},output:boundedTask({source,target}),
    generatedValidity:null,referenceReview:c.reference.review,invalidReason:c.invalid.reason};
});
const generated=cases.filter(c=>c.output.exercise).length;
const report={
  version:corpus.version,method:'offline-source-rules-coverage',apiCalls:0,costUSD:0,
  corpusSHA256:sha(bytes),
  engineSHA256:sha(readFileSync(new URL('./bounded-understanding.mjs',import.meta.url))),
  sampleSize:cases.length,generated,coverage:generated/cases.length,
  generatedValidity:{reviewed:0,valid:null,rate:null,
    reason:generated?'需要逐题人工复核；脚本不把结构通过当作题目有效。':'没有生成题，分母为零，记 N/A。'},
  learningEffectiveness:null,
  limitations:['编程教程便利样本，非盲测或代表性样本','目标和参照题为助手编写；非独立评审',
    '只评估本机生成入口；未测试内容诊断或 AI 情境练习','无真实学习者或学习保持结果'],
  cases
};
writeFileSync(new URL('../docs/research/real-material-offline.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({sampleSize:cases.length,generated,coverage:report.coverage,
  generatedValidity:report.generatedValidity,apiCalls:0,costUSD:0,corpusSHA256:report.corpusSHA256}));
