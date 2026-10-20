import test from 'node:test';
import assert from 'node:assert/strict';
import { writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import vm from 'node:vm';
import { contentFindings, processEvidence, confirmLocalProcess, localize } from './diagnostic-localization.mjs';
import { diagnosticFixtures, fixtureSummary } from './diagnostic-fixtures.mjs';
import { validateFindings } from './core.mjs';
const results=[];
for(const fixture of diagnosticFixtures)test(`B1/B2 fixture ${fixture.id}`,()=>{
  const before=JSON.stringify(fixture);let output,actual;
  try{output=localize(fixture);actual=fixtureSummary(output);}catch(e){actual={blocked:e.message};}
  results.push({fixture:structuredClone(fixture),expected:fixture.expected,actual,output:output??null});
  if(process.env.STUDY_TEST_OUTPUT)writeFileSync(join(process.env.STUDY_TEST_OUTPUT,'fixture-results.json'),JSON.stringify(results,null,2));
  assert.deepEqual(actual,fixture.expected);assert.equal(JSON.stringify(fixture),before);
});
const copy=id=>structuredClone(diagnosticFixtures.find(f=>f.id===id));

test('B1 process contract rejects knowledge, textbook, repair and person-score fields',()=>{
  const f=copy('hesitant-correct');
  for(const key of ['status','sourceQuote','repair','confidence','anxiety','personality','accent','score']){
    assert.throws(()=>processEvidence([{...f.evidence[0],[key]:'forbidden'}],f.attempt),/PROCESS_FIELD_LEAK/);
  }
  for(const type of ['incorrect','missing','unknown','supported','anxiety','pitch_score'])assert.throws(()=>processEvidence([{...f.evidence[0],type}],f.attempt),/INVALID_PROCESS_TYPE/);
  assert(!('sourceQuote' in processEvidence(f.evidence,f.attempt)[0]));
});
test('B1 process references, finite timing, overlap and literal quote fail closed',()=>{
  const f=copy('uncertain-relation'),e=f.evidence[0];
  for(const mutation of [{attemptId:'other'},{transcriptVersion:'other'},{spanId:'ghost'},{start:-1},{end:99},{start:NaN},{end:1},{start:7,end:8},{quote:'not spoken'},{spanId:null,quote:'fragment'},{start:null,end:null,spanId:null},{confirmation:'human_confirmed'}]){
    assert.throws(()=>processEvidence([{...e,...mutation}],f.attempt));
  }
  assert.throws(()=>processEvidence([e,e],f.attempt),/INVALID_PROCESS_ID/);
  const spanOnly={...e,start:null,end:null,quote:f.attempt.spans[0].text.slice(0,2)};
  assert.equal(processEvidence([spanOnly],f.attempt)[0].start,null);
  assert.equal(localize({...f,evidence:[spanOnly]}).diagnosticTargets[0].processEvidenceIds.length,1);
});
test('B1 local event provenance cannot be fabricated or promoted without replay/review',()=>{
  const f=copy('hesitant-correct'),event={id:'e0',type:'near_silence_candidate',start:1,end:2,heard:true};
  const e=confirmLocalProcess(f.attempt,event,[event]);
  assert.equal(e.confirmation,'human_confirmed');assert.equal(e.spanId,null);assert.equal(e.quote,null);
  assert.throws(()=>processEvidence([e],f.attempt,[]),/INVALID_PROCESS_EVENT/);
  assert.throws(()=>processEvidence([{...e,type:'restart'}],f.attempt,[event]),/INVALID_PROCESS_EVENT/);
  assert.throws(()=>processEvidence([{...e,end:3}],f.attempt,[event]),/INVALID_PROCESS_EVENT/);
  assert.throws(()=>confirmLocalProcess(f.attempt,{...event,heard:false},[event]),/NOT_HEARD/);
  assert.throws(()=>confirmLocalProcess({...f.attempt,reviewed:false},event,[event]),/ASR_REVIEW_REQUIRED/);
  assert.throws(()=>confirmLocalProcess({...f.attempt,interrupted:true},event,[event]),/ASR_REVIEW_REQUIRED/);
  assert.throws(()=>processEvidence([e],f.attempt,[{...event,heard:false}]),/PROCESS_REVIEW_REQUIRED/);
});
test('B2 all process-only types produce no knowledge target; candidates never corroborate content',()=>{
  const f=copy('uncertain-relation');
  for(const type of ['near_silence','restart','self_repair','repetition','coarse_segment'])assert.equal(localize({...f,report:null,evidence:[{...f.evidence[0],type}]}).diagnosticTargets.length,0);
  const event={id:'e0',type:'near_silence_candidate',start:1,end:2,heard:true};
  const e={...confirmLocalProcess(f.attempt,event,[event]),confirmation:'candidate'};
  const result=localize({...f,evidence:[e],events:[event]});
  assert.equal(result.diagnosticTargets.length,1);assert.deepEqual(result.diagnosticTargets[0].processEvidenceIds,[]);
});
test('B2 missing finding never borrows a neighboring process timestamp; non-overlap is not attached',()=>{
  const f=copy('gap-without-process'),event={id:'e0',type:'near_silence_candidate',start:1,end:2,heard:true};
  const result=localize({...f,evidence:[confirmLocalProcess(f.attempt,event,[event])],events:[event]});
  assert.equal(result.contentFindings[0].spanId,null);assert.equal(result.contentFindings[0].quote,null);
  assert.equal(result.diagnosticTargets[0].contentLocation,null);assert.deepEqual(result.diagnosticTargets[0].processEvidenceIds,[]);assert.equal(result.processEvidence.length,1);
  const other=copy('uncertain-relation');other.evidence[0]={...other.evidence[0],spanId:null,start:7,end:8};
  assert.deepEqual(localize(other).diagnosticTargets[0].processEvidenceIds,[]);
});
test('B1 existing content validation is reused, including source, version, quote and missing-time checks',()=>{
  const f=copy('fluent-wrong');
  for(const mutate of [r=>r.sourceId='wrong',r=>r.attemptId='wrong',r=>r.transcriptVersion='wrong',r=>r.findings[0].sourceQuote='fabricated',r=>r.findings[0].quote='fabricated',r=>r.findings[0].eventId='e0',r=>r.findings[0].status='observation',r=>r.findings[0].repair='. .']){
    const report=structuredClone(f.report);mutate(report);
    assert.throws(()=>validateFindings(report,f.source,f.attempt,'content'));
    assert.throws(()=>contentFindings(report,f.source,f.attempt));
  }
  const missing=copy('gap-without-process');missing.report.findings[0].spanId='s0';assert.throws(()=>localize(missing),/MISSING_HAS_NO_TIME/);
  assert.throws(()=>localize({...f,attempt:{...f.attempt,reviewed:false},report:null,evidence:[]}),/ASR_REVIEW_REQUIRED/);
});
test('B3 actual local confirmation saves without semantic dispatch, deduplicates and isolates versions',async()=>{
  const f=copy('hesitant-correct'),event={id:'e0',type:'near_silence_candidate',start:1,end:2,heard:false};
  const a={...f.attempt,source:f.source,raw:{id:f.attempt.transcriptVersion,reviewed:true,spans:f.attempt.spans},corrections:[],reports:[],observation:{events:[event]}};
  const saved=[];let dispatches=0,failSave=false;
  const context=vm.createContext({current:a,topic:{id:'topic',attempts:[a]},deleted:new Set(),processing:false,
    confirmLocalProcess,canNavigate:()=>true,latest:a=>a.corrections.at(-1)??a.raw,
    attemptRequest:a=>({...a,sourceId:a.source.id,transcriptVersion:(a.corrections.at(-1)??a.raw).id,reviewed:(a.corrections.at(-1)??a.raw).reviewed}),
    save:async()=>{if(failSave)throw Error('STORAGE_FAILED');saved.push(structuredClone(context.topic));},renderAttempt(){},notice(){},
    api(){dispatches++;throw Error('UNEXPECTED_DISPATCH');},fetch(){dispatches++;throw Error('UNEXPECTED_DISPATCH');},diagnose(){dispatches++;throw Error('UNEXPECTED_DISPATCH');}});
  const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
  vm.runInContext(app.slice(app.indexOf('function processFor('),app.indexOf('function renderProcess(')),context);
  const confirm=()=>vm.runInContext('confirmProcess(current,current.observation.events[0])',context);
  await assert.rejects(confirm(),/NOT_HEARD/);assert.equal(saved.length,0);
  event.heard=true;await confirm();await confirm();assert.equal(a.reports.length,1);assert.equal(saved.length,2);
  assert.equal(a.reports[0].processEvidence[0].confirmation,'human_confirmed');assert.equal(dispatches,0);
  assert.equal(localize({...f,report:null,evidence:a.reports[0].processEvidence,events:[event]}).diagnosticTargets.length,0);
  a.corrections.push({...a.raw,id:'new-version'});assert.equal(vm.runInContext('processFor(current).length',context),0);
  failSave=true;await assert.rejects(confirm(),/STORAGE_FAILED/);assert.equal(context.processing,false);
  failSave=false;await confirm();assert.equal(a.reports.length,2);assert.equal(saved.at(-1).attempts[0].reports[1].transcriptVersion,'new-version');assert.equal(dispatches,0);
  context.deleted.add(a);await assert.rejects(confirm(),/INVALID_REFERENCE/);
});
