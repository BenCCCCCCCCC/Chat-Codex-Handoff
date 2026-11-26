import assert from 'node:assert/strict';
import {createHash,randomInt,randomUUID} from 'node:crypto';
import {mkdirSync,readFileSync,readdirSync,realpathSync,writeFileSync} from 'node:fs';
import {registerHooks} from 'node:module';
import {basename,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';

if (!process.permission || ['child','worker','addons','wasi'].some(p=>process.permission.has(p))) {
  throw Error('Requires Node --permission with only scoped file read/write; no process, worker, addon or WASI permissions.');
}
if(process.argv.length!==4||process.argv[2]!=='--out')throw Error('Use --out <new empty dedicated directory>.');
const dir=fileURLToPath(new URL('./',import.meta.url));
const repo=fileURLToPath(new URL('../../../',import.meta.url));
const out=realpathSync(process.argv[3]);
assert.match(basename(out),/^diag-preflight-[A-Za-z0-9_-]+$/);
const relation=relative(repo,out);
assert(relation.startsWith('..')||/^artifacts[\\/]/.test(relation),'OUT_MUST_NOT_BE_PRODUCT_TREE');
assert.deepEqual(readdirSync(out),[],'OUT_NOT_EMPTY');

let blockedProbes=0;
const noTransport=()=>{blockedProbes++;throw Error('OFFLINE_TRANSPORT_DISABLED');};
for (const api of ['fetch','WebSocket','EventSource'])Object.defineProperty(globalThis,api,{value:noTransport,configurable:false,writable:false});
Object.defineProperty(process,'getBuiltinModule',{value:noTransport,configurable:false,writable:false});
const appFiles=new Set(['core.mjs','judgement.mjs','schemas.mjs','source-provenance.mjs'].map(p=>new URL('../../../study-teachback-app/'+p,import.meta.url).href));
registerHooks({
  resolve(specifier,context,nextResolve){
    if (specifier.startsWith('node:')||!specifier.startsWith('.')) return noTransport();
    const r=nextResolve(specifier,context);
    if(!appFiles.has(r.url)) return noTransport();
    return r;
  }
});
// Guards intentionally reject before DNS, sockets, HTTP, provider loading or child processes.
for(const moduleId of ['node:net','node:dns','node:http','../../../study-teachback-app/provider.mjs']) {
  await assert.rejects(import(moduleId),{message:'OFFLINE_TRANSPORT_DISABLED'});
}
assert.throws(()=>globalThis.fetch('https://offline.invalid'),{message:'OFFLINE_TRANSPORT_DISABLED'});
assert.equal(blockedProbes,5);
const {attemptValue,contentInput,sourceValue}=await import('../../../study-teachback-app/core.mjs');
const {JUDGEMENT,judgementIssues,judgementSchema,scopedReport}=await import('../../../study-teachback-app/judgement.mjs');
const {CONTENT}=await import('../../../study-teachback-app/schemas.mjs');
const sha=v=>createHash('sha256').update(v).digest('hex');
const lf=name=>readFileSync(join(dir,name),'utf8').replaceAll('\r\n','\n');
const manifestText=lf('run-manifest.json'),manifest=JSON.parse(manifestText);
assert.equal(manifest.status,'OFFLINE_MOCK_ONLY_NOT_AUTHORIZED_TO_SEND');
assert.equal(manifest.runtimeCommit,'8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4');
const lockedNames=['PROTOCOL.md','controlled-cases.json','review-template.json'];
assert.deepEqual(Object.keys(manifest.artifacts).sort(),lockedNames);
for (const name of lockedNames) assert.equal(sha(lf(name)),manifest.artifacts[name]);
const all=JSON.parse(lf('controlled-cases.json'));
const sourceMap=new Map(all.materials.map(x=>[x.id,x])),caseMap=new Map(all.cases.map(x=>[x.id,x]));
assert.equal(sourceMap.size,4);assert.equal(caseMap.size,14);
const constraints=manifest.constraints, profiles=manifest.proposedProfiles;
assert.deepEqual(constraints,{deadlineMsToComplete:60000,bodyByteLimit:14000,hiddenTokenPadding:2048,reservedInputTokensPerSlot:16048,maxConcurrent:1,retryCount:0,textOnly:true,store:false,background:false,serviceTier:'default',stream:false,promptCacheTtl:'30m',contextPremiumStartsAboveInputTokens:272000});
assert.equal(constraints.bodyByteLimit+constraints.hiddenTokenPadding,constraints.reservedInputTokensPerSlot);
assert(constraints.reservedInputTokensPerSlot<constraints.contextPremiumStartsAboveInputTokens);
assert.deepEqual([profiles.luna.model,profiles.luna.reasoningEffort,profiles.luna.maxTotalOutputTokens,profiles.sol.model,profiles.sol.reasoningEffort,profiles.sol.maxTotalOutputTokens],['gpt-5.6-luna','none',1800,'gpt-6.2-sol','medium',6000]);
assert(Object.values(profiles).every(p=>p.versionConfirmedInProject===null));
assert.equal(manifest.calibrations.independentHumanCalibration,'pending');

function encodeFixture(id) {
  const c=caseMap.get(id);assert(c?.condition);
  const items=c.materialIds.map(key=>sourceMap.get(key));assert(items.every(Boolean));
  const title='练习材料', sourceText=items.map((m,i)=>'【材料 '+(i+1)+'：'+m.title+'】\n'+m.text).join('\n\n');
  const source=sourceValue({id:'source-'+id,title,text:sourceText,anchorVersion:'synthetic-v1',anchors:items.map(m=>({text:c.goal+'\n'+c.question,sourceQuote:m.text}))});
  const attempt=attemptValue({id:'attempt-'+id,sourceId:source.id,transcriptVersion:'confirmed-v1',inputMode:'text',kind:'full',assistance:'unknown',reviewed:true,spans:[{id:'s1',text:c.answer}]});
  const question=id==='defer-one-continue-other'?c.question.split('？')[0]+'？':c.question;
  const issues=judgementIssues([{id:'issue-'+id,sourceId:source.id,question,status:c.condition.status,condition:c.condition.text,evidence:items.map(m=>({materialId:m.id,title:m.title,quote:m.text}))}],source);
  const input={...contentInput(source,attempt),judgementIssues:issues};
  return {input,source,attempt,issues};
}
const instructions=CONTENT+JUDGEMENT, schema=judgementSchema;
assert.equal(sha(instructions),manifest.instructionsSHA256);
assert.equal(sha(JSON.stringify(schema)),manifest.schemaSHA256);
const caseIds=Object.keys(manifest.cases);
assert.equal(caseIds.length,6);assert.deepEqual(caseIds,caseIds.toSorted());
const fixtures=new Map(caseIds.map(id=>[id,encodeFixture(id)]));
for (const [id,f] of fixtures) assert.equal(sha(JSON.stringify(f.input)),manifest.cases[id]);
const expectedSlots=[];
for(const replicate of [1,2])for(const caseId of caseIds)for(const profile of replicate===1?['luna','sol']:['sol','luna']){
  expectedSlots.push({slotId:'E'+String(expectedSlots.length+1).padStart(2,'0'),caseId,replicate,profile});
}
assert.equal(expectedSlots.length,24);
assert.deepEqual(manifest.slots,expectedSlots);
const unitsFor=(key,input,output)=>{
  const p=profiles[key];
  const inRate=Math.max(p.standardShortInputUsdPerMillion,p.standardShortDefaultCacheWriteUsdPerMillion)*1000;
  const outRate=p.standardShortOutputUsdPerMillion*1000;
  assert(Number.isSafeInteger(inRate)&&Number.isSafeInteger(outRate));
  return input*inRate+output*outRate;
};
const reservations=Object.fromEntries(Object.entries(profiles).map(([key,p])=>[key,unitsFor(key,constraints.reservedInputTokensPerSlot,p.maxTotalOutputTokens)]));
const budget=expectedSlots.reduce((sum,s)=>sum+reservations[s.profile],0);
assert.equal(manifest.pricing.costUnitsPerUsd,1000000000);
assert.equal(manifest.pricing.verifiedUTCDate,'2026-11-26');
assert.deepEqual(reservations,manifest.pricing.worstCaseReservedUnitsByProfile);
assert.equal(budget,manifest.pricing.aggregate24SlotReservedUnits);
// Independently hand-calculated with dollars per million (no shared rate/cost routine).
assert.equal(budget,Math.round(1e9*(12*((16048*0.25+1800*1.2)/1e6)+12*((16048*2.50+6000*10.0)/1e6))));
function plannedBytes(profile,input) {
  // Encode in memory to count wire bytes only. There is no URL, Authorization, transport option or sender.
  return Buffer.byteLength(JSON.stringify({model:profile.model,store:false,background:false,service_tier:'default',stream:false,prompt_cache_options:{ttl:'30m'},reasoning:{effort:profile.reasoningEffort},max_output_tokens:profile.maxTotalOutputTokens,instructions,input:JSON.stringify(input),text:{format:{type:'json_schema',name:'learning_response',strict:true,schema}}}),'utf8');
}
const sizeChecks=Object.fromEntries([...fixtures].map(([id,f])=>[id,Object.fromEntries(Object.entries(profiles).map(([key,p])=>{
  const bytes=plannedBytes(p,f.input);
  return [key,bytes];
}))]));
assert(Object.values(sizeChecks).flatMap(x=>Object.values(x)).every(n=>n<=constraints.bodyByteLimit), 'ENCODED_BODY_OVER_CAP '+JSON.stringify(sizeChecks));
const toReviewer=join(out,'for-reviewers'), operator=join(out,'operator');
mkdirSync(toReviewer);mkdirSync(operator);
const save=(dir,name,value)=>writeFileSync(join(dir,name),JSON.stringify(value,null,2)+'\n',{flag:'wx'});
const journal=[],outcomes=new Map(),raw=[],mockInputs=[];
function mockEndpoint(delivery) {
  assert.deepEqual(Object.keys(delivery).sort(),['input','instructions','schema']);
  mockInputs.push(sha(JSON.stringify(delivery.input)));
  if (mockInputs.length===3) return {completed:false,reason:'mock_timeout_unknown_usage',usage:null,timerElapsedMs:constraints.deadlineMsToComplete};
  const {source,attempt,judgementIssues}=delivery.input; // No key, slot, profile, arm, repetition, labels, fees or rubric.
  return {completed:true,usage:{inputTokens:1200,totalOutputTokens:90,reasoningTokens:0},timerElapsedMs:12,
    response:{sourceId:source.id,attemptId:attempt.id,transcriptVersion:attempt.transcriptVersion,findings:[],assessments:[{issueId:judgementIssues[0].id,decision:'judgeable',reason:'夹具，非真实模型输出，不可评分。',findings:[]}]}};
}
let stopped=null, exposure=0;
for (const slot of expectedSlots) {
  if (stopped) {outcomes.set(slot.slotId,{status:'not_sent_after_stop',body:null});continue;}
  const profile=profiles[slot.profile], f=fixtures.get(slot.caseId), reserve=reservations[slot.profile];
  assert(!journal.some(j=>j.slotId===slot.slotId),'SLOT_ALREADY_USED');
  assert(exposure+reserve<=budget,'NEXT_SLOT_WOULD_EXCEED_BOUND');
  const entry={slotId:slot.slotId,heldUnits:reserve,settledUpperUnits:null,status:'reserved'};
  journal.push(entry);exposure+=reserve; // Reserve before mock.
  const response=mockEndpoint({instructions,input:f.input,schema});
  raw.push({slotId:slot.slotId,rawMockResponse:response});
  const u=response.usage;
  if (!u || !Number.isInteger(u.inputTokens) || u.inputTokens<0 || u.inputTokens>constraints.reservedInputTokensPerSlot ||
      !Number.isInteger(u.totalOutputTokens)||u.totalOutputTokens<0||u.totalOutputTokens>profile.maxTotalOutputTokens ||
      !Number.isInteger(u.reasoningTokens)||u.reasoningTokens<0||u.reasoningTokens>u.totalOutputTokens) {
    entry.status='unsettled_full_reserve';stopped='UNKNOWN_USAGE_OR_CAP';outcomes.set(slot.slotId,{status:'mock_unknown_usage',body:null});continue;
  }
  entry.settledUpperUnits=unitsFor(slot.profile,u.inputTokens,u.totalOutputTokens);
  assert(entry.settledUpperUnits<=reserve);
  entry.status='settled_mock_estimate';entry.heldUnits=0;exposure-=reserve-entry.settledUpperUnits;
  assert(response.completed&&response.timerElapsedMs<constraints.deadlineMsToComplete);
  const safe=scopedReport(response.response,f.source,f.attempt,f.issues);
  outcomes.set(slot.slotId,{status:'mock_structural_output_only',body:{findings:safe.findings,assessments:safe.judgement.assessments.map(a=>({decision:a.decision,reason:a.reason,findingIndexes:a.findingIndexes}))}});
}
assert.deepEqual(mockInputs,[manifest.cases[caseIds[0]],manifest.cases[caseIds[0]],manifest.cases[caseIds[1]]]);
assert.equal(stopped,'UNKNOWN_USAGE_OR_CAP');
assert.equal(journal.length,3);assert.equal(journal[2].heldUnits,reservations.luna);
assert.equal(journal[2].settledUpperUnits,null);
assert.equal(outcomes.size,24);
const pairs=expectedSlots.map(s=>({s,blindId:randomUUID(),...outcomes.get(s.slotId)}));
for(let i=pairs.length-1;i>0;i--){const j=randomInt(i+1);[pairs[i],pairs[j]]=[pairs[j],pairs[i]];}
const review=pairs.filter(x=>x.status==='mock_structural_output_only').map(x=>({blindId:x.blindId,caseId:x.s.caseId,availability:x.status,output:x.body,review:{severeUserVisibleError:null,severeRejectedError:null,usable:null,notModelOutput:true}}));
assert.equal(new Set(pairs.map(x=>x.blindId)).size,24);
assert.equal(review.filter(x=>x.availability==='mock_structural_output_only').length,2);
assert.equal(pairs.filter(x=>x.status==='mock_unknown_usage').length,1);
assert.equal(pairs.filter(x=>x.status==='not_sent_after_stop').length,21);
for(const row of review)assert.deepEqual(Object.keys(row),['blindId','caseId','availability','output','review']);
assert(!JSON.stringify(review).match(/gpt-5\.6-luna|gpt-6\.2-sol|slotId|profile|replicate|usageTokens|timerElapsedMs/));
save(toReviewer,'mock-blind-output.json',{purpose:'ROUTING_MOCK_NOT_HUMAN_GRADING',rows:review});
save(operator,'mock-unblind-map.json',{purpose:'OPERATOR_ONLY_KEEP_SEPARATE',rows:pairs.map(x=>({blindId:x.blindId,...x.s,availability:x.status}))});
save(operator,'mock-raw-and-reservations.json',{purpose:'OPERATOR_ONLY',raw,journal});
const receipt={status:'PASS_OFFLINE_ONLY',runtimeCommit:manifest.runtimeCommit,manifestSHA256:sha(manifestText),
  frozenInputs:fixtures.size,slots:expectedSlots.length,maxEncodedBytes:Math.max(...Object.values(sizeChecks).flatMap(x=>Object.values(x))),sizeChecks,
  mockDispatches:mockInputs.length,providerRequests:0,realSpendUsd:0,blockedNetworkOrUnsafeImportProbes:blockedProbes,
  stopped,blindRows:review.length,notSentSlots:21,unknownUsageHeldUnits:journal[2].heldUnits,mockExposureUnits:exposure,
  worstCaseReserveUsd:(budget/manifest.pricing.costUnitsPerUsd).toFixed(6),humanCalibration:'pending',realCompatibility:'not_tested'};
save(operator,'receipt.json',receipt);
console.log(JSON.stringify(receipt,null,2));