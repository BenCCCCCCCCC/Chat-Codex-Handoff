import assert from 'node:assert/strict';
import {createHash,randomUUID} from 'node:crypto';
import {existsSync,lstatSync,mkdirSync,readFileSync,readdirSync,realpathSync,writeFileSync} from 'node:fs';
import {registerHooks} from 'node:module';
import {basename,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {DatabaseSync} from 'node:sqlite';

// Test-only. No live transport, key reader, URL, model sender or switch to enable one.
if(!process.permission||['child','worker','addons','wasi'].some(k=>process.permission.has(k)))throw Error('NEEDS_SCOPED_NODE_PERMISSION');
const blocked=()=>{throw Error('OFFLINE_TRANSPORT_DISABLED');};
for(const k of ['fetch','WebSocket','EventSource'])Object.defineProperty(globalThis,k,{value:blocked});
Object.defineProperty(process,'getBuiltinModule',{value:blocked});
registerHooks({resolve:blocked}); // The already loaded modules above are the whole test dependency set.
const [phase,flag,outarg]=process.argv.slice(2);
assert(process.argv.length===5&&flag==='--out'&&['reserve-and-crash','verify-restart'].includes(phase));
const out=realpathSync(outarg);
assert.match(basename(out),/^diag-journal-[A-Za-z0-9_-]+$/);
const root=fileURLToPath(new URL('../../../',import.meta.url));
const rel=relative(root,out);
assert(rel.startsWith('..')||/^artifacts[\\/]/.test(rel),'TEST_OUTPUT_ONLY');
const dbPath=join(out,'journal.sqlite');
if(phase==='reserve-and-crash')assert.deepEqual(readdirSync(out),[],'NEED_EMPTY_RUN_DIR');
else assert(existsSync(dbPath),'MISSING_ORIGINAL_JOURNAL');
for(const name of ['journal.sqlite','journal.sqlite-journal','journal.sqlite-wal','journal.sqlite-shm']){
 const f=join(out,name);if(existsSync(f))assert(lstatSync(f).isFile()&&!lstatSync(f).isSymbolicLink(),'PLAIN_TEST_FILES_ONLY');
}
const manifestRaw=readFileSync(join(dirname(fileURLToPath(import.meta.url)),'run-manifest.json'),'utf8').replaceAll('\r\n','\n');
const manifestHash=createHash('sha256').update(manifestRaw,'utf8').digest('hex');
assert.equal(manifestHash,'832bd32efebd04b1d8a2869c58a7cfd9421cfcfd1eba165d3bb437a67692699b','LOCKED_MANIFEST_MISMATCH');
const manifest=JSON.parse(manifestRaw), slots=manifest.slots, reserves=manifest.pricing.worstCaseReservedUnitsByProfile;
assert.equal(manifest.status,'OFFLINE_MOCK_ONLY_NOT_AUTHORIZED_TO_SEND');
assert.equal(slots.length,24);
const budget=slots.reduce((n,x)=>n+reserves[x.profile],0);
assert.equal(budget,manifest.pricing.aggregate24SlotReservedUnits);
const db=new DatabaseSync(dbPath,{allowExtension:false,enableForeignKeyConstraints:true});
db.exec("PRAGMA journal_mode=DELETE; PRAGMA synchronous=FULL; PRAGMA busy_timeout=2000; PRAGMA trusted_schema=OFF;");
// FULL is for a filesystem-backed local journal; this test demonstrates process restart, not recovery after storage loss.
const tx=fn=>{db.exec('BEGIN IMMEDIATE');try{const result=fn();db.exec('COMMIT');return result;}
 catch(e){try{db.exec('ROLLBACK');}catch{}throw e;}};
const changes=(q,...args)=>{const result=db.prepare(q).run(...args);assert.equal(result.changes,1,'JOURNAL_STATE_CHANGED');};
const now=()=>new Date().toISOString();
if(phase==='reserve-and-crash')tx(()=>{
 db.exec(`CREATE TABLE run(id INTEGER PRIMARY KEY CHECK(id=1), manifest_hash TEXT NOT NULL, budget INTEGER NOT NULL);
 CREATE TABLE slot(
  seq INTEGER PRIMARY KEY, slot_id TEXT UNIQUE NOT NULL, case_id TEXT NOT NULL, profile TEXT NOT NULL, rep INTEGER NOT NULL,
  blind_id TEXT UNIQUE NOT NULL, reserve_units INTEGER NOT NULL CHECK(reserve_units>0), state TEXT NOT NULL
     CHECK(state IN ('not_sent','reserved_maybe_dispatched','unknown','mock_success','mock_failed_known')),
  settled_units INTEGER CHECK(settled_units BETWEEN 0 AND reserve_units),
  reserved_at TEXT, finished_at TEXT, failure TEXT, raw_response TEXT,
  CHECK ((state IN ('mock_success','mock_failed_known'))=(settled_units IS NOT NULL))
 );`);
 changes('INSERT INTO run VALUES(1,?,?)',manifestHash,budget);
 const insert=db.prepare("INSERT INTO slot(seq,slot_id,case_id,profile,rep,blind_id,reserve_units,state) VALUES(?,?,?,?,?,?,?,'not_sent')");
 for(const [i,s] of slots.entries())insert.run(i+1,s.slotId,s.caseId,s.profile,s.replicate,randomUUID(),reserves[s.profile]);
});
const rows=()=>db.prepare('SELECT * FROM slot ORDER BY seq').all();
const stable=()=>tx(()=>{
 const meta=db.prepare('SELECT * FROM run WHERE id=1').get();assert(meta&&meta.manifest_hash===manifestHash&&meta.budget===budget,'JOURNAL_HEADER_MISMATCH');
 assert.deepEqual(rows().map(s=>[s.seq,s.slot_id,s.case_id,s.profile,s.rep,s.reserve_units]),slots.map((s,i)=>[i+1,s.slotId,s.caseId,s.profile,s.replicate,reserves[s.profile]]));
});
stable();
const exposure=items=>items.reduce((sum,s)=>sum+(s.state==='not_sent'?0:s.settled_units??s.reserve_units),0);
const interruptRecovery=()=>tx(()=>db.prepare(`UPDATE slot SET state='unknown',failure='process_interrupted_before_outcome',finished_at=?
  WHERE state='reserved_maybe_dispatched'`).run(now()).changes);
const reserveNext=()=>tx(()=>{
 const r=rows();
 if(r.some(s=>['reserved_maybe_dispatched','unknown','mock_failed_known'].includes(s.state)))return null;
 const next=r.find(s=>s.state==='not_sent');if(!next)return null;
 if(exposure(r)+next.reserve_units>budget)return null; // No additional allocation or retry.
 changes("UPDATE slot SET state='reserved_maybe_dispatched',reserved_at=? WHERE seq=? AND state='not_sent'",now(),next.seq);
 return next;
});
const integral=value=>Number.isSafeInteger(value)&&value>=0;
function settleMock(s,result){
 const p=manifest.proposedProfiles[s.profile],u=result?.usage;
 const raw=typeof result?.raw==='string'&&Buffer.byteLength(result.raw,'utf8')<=1048576?result.raw:null;
 const known=raw!==null&&['usable','failed'].includes(result.disposition)&&integral(u?.inputTokens)&&u.inputTokens<=manifest.constraints.reservedInputTokensPerSlot&&
  integral(u?.totalOutputTokens)&&u.totalOutputTokens<=p.maxTotalOutputTokens&&integral(u?.reasoningTokens)&&u.reasoningTokens<=u.totalOutputTokens;
 const candidate=known?u.inputTokens*Math.max(p.standardShortInputUsdPerMillion,p.standardShortDefaultCacheWriteUsdPerMillion)*1000+u.totalOutputTokens*p.standardShortOutputUsdPerMillion*1000:null;
 const safe=integral(candidate)&&candidate<=s.reserve_units, terminal=safe?(result.disposition==='usable'?'mock_success':'mock_failed_known'):'unknown';
 const failure=terminal==='mock_success'?null:terminal==='mock_failed_known'?'mock_unusable_output':'mock_unknown_usage_or_unsupported_result';
 tx(()=>changes("UPDATE slot SET state=?,settled_units=?,failure=?,raw_response=?,finished_at=? WHERE seq=? AND state='reserved_maybe_dispatched'",terminal,safe?candidate:null,failure,raw,now(),s.seq));
}
function tryNextMock(pureMock){
 const slot=reserveNext();if(!slot)return false; // COMMIT completed before the callback even has an input.
 let result;
 try{result=pureMock({inputSHA256:manifest.cases[slot.case_id]});}catch{result={raw:null};}
 settleMock(slot,result);return true;
}
const diagnostic=join(out,'mock-boundary.json');
if(phase==='reserve-and-crash'){
 tryNextMock(fixture=>{
  assert.deepEqual(Object.keys(fixture),['inputSHA256']);
  assert.equal(fixture.inputSHA256,manifest.cases[slots[0].caseId]);
  const r=rows()[0];assert(r.state==='reserved_maybe_dispatched'&&r.reserve_units===reserves.luna);
  writeFileSync(diagnostic,JSON.stringify({enteredMock:1,blindId:r.blind_id,reservedAt:r.reserved_at,heldUnits:r.reserve_units})+'\n',{flag:'wx'});
  process.exit(77); // Terminate the entire process without running outcome/close logic.
 });
 throw Error('CRASH_FIXTURE_DID_NOT_EXIT');
}
const witness=JSON.parse(readFileSync(diagnostic,'utf8'));
try{
 const before=rows()[0];assert.equal(witness.enteredMock,1);assert.equal(before.state,'reserved_maybe_dispatched');
 assert.equal(before.blind_id,witness.blindId);assert.equal(before.reserved_at,witness.reservedAt);assert.equal(before.reserve_units,witness.heldUnits);
 assert.equal(interruptRecovery(),1);
 let replayed=0;
 assert.equal(tryNextMock(()=>{replayed++;throw Error('MUST_NOT_DISPATCH_AFTER_UNKNOWN');}),false);
 const after=rows();assert.equal(replayed,0);assert.equal(exposure(after),reserves.luna);assert.equal(after[0].state,'unknown');
 assert.equal(after[0].blind_id,witness.blindId);assert.equal(after[0].reserved_at,witness.reservedAt);
 assert.equal(after[0].failure,'process_interrupted_before_outcome');assert.equal(after[0].raw_response,null);
 assert(after.slice(1).every(x=>x.state==='not_sent'));assert.equal(new Set(after.map(s=>s.blind_id)).size,24);
 const op=join(out,'operator'), review=join(out,'for-reviewers');
 mkdirSync(op);mkdirSync(review);
 const save=(d,name,x)=>writeFileSync(join(d,name),JSON.stringify(x,null,2)+'\n',{flag:'wx'});
 save(op,'mock-audit-with-blind-map.json',{mockOnly:true,manifestHash,rows:after});
 // This crash produced no reviewable content. The prior preflight tests a populated, shuffled blind export.
 save(review,'mock-blind-output.json',{purpose:'ROUTING_MOCK_NOT_HUMAN_GRADING',rows:[]});
 const receipt={status:'PASS_PROCESS_RESTART_OFFLINE_ONLY',manifestHash,slotCount:after.length,crossedMockBoundary:witness.enteredMock,
  initialState:before.state,restartState:after[0].state,stableIdentity:true,unknownReserveUnits:exposure(after),nextMockCalls:replayed,
  notSent:after.filter(s=>s.state==='not_sent').length,rawOutputReceived:false,reviewerRows:0,providerRequests:0,spentUsd:0,humanCalibration:'pending'};
 save(op,'receipt.json',receipt);
 console.log(JSON.stringify(receipt));
}finally{db.close();}
