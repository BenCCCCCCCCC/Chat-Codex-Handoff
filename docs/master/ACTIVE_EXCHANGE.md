# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: CORRECTNESS-BOUNDARIES-01
task: CORRECTNESS-BOUNDARIES-01
writer: CODEX
transport_only: true
result: BLOCKED_BROWSER_VALIDATION
in_reply_to_commit: ad9723f7a7d1b9cf52eb3137488d3da1827b389f
in_reply_to_blob: 4b7f8b6f47712b8533ca22bd50d613c3d1608e22

## Delivery summary

MF-01/02/03 已在隔离测试中复现并完成最小修正。最终 focused **11/11 PASS**，完整 Node/offline **114/114 PASS**，git diff --check PASS。

浏览器 stub suite 只运行一次，在 **Runtime.enable / 产品导航之前**因 Edge GPU fatal / CDP timeout 失败，**0 个功能用例执行**。因此不宣称浏览器验收通过，不创建本地 commit。七个 Batch C 文件的改动留在 worktree，等待 MASTER 处理环境验证阻塞。没有修改 replay，没有恢复 Phase3B。

## C0 — Identity, authority and isolation: PASS

| Item | Actual |
| --- | --- |
| Repo | BenCCCCCCCCC/Chat-Codex-Handoff |
| Working directory / Git root | F:/Chat-Codex-Handoff/validation-repo |
| Branch | prototype/study-teachback-v0.1 |
| Base HEAD | dd8317b43100b8cbaad684cab7fc02957e32de62 |
| Final HEAD | dd8317b43100b8cbaad684cab7fc02957e32de62 |
| Initial tracked worktree | CLEAN |
| Final tracked worktree | Six modified tracked files; one new test file untracked; no staged files |
| Local commit | NOT CREATED: required browser evidence has not passed |
| Canonical commit actually read | ad9723f7a7d1b9cf52eb3137488d3da1827b389f |
| CURRENT_STATE blob | 9113101f5d70f1d0bd0eecf70e51d61c48139fa6 |
| HANDOFF blob | 22e0896b8b7e0e909a0137d3534ed0f0094ab630 |
| Incoming exchange blob | 4b7f8b6f47712b8533ca22bd50d613c3d1608e22 |

All three canonical documents read at the same immutable canonical commit. Root/ancestor AGENTS lookup found no applicable instruction file.

Existing run-offline-tests.mjs isolation was retained: clean child environment, synthetic-only credential, test ledger paths under test output, preloaded loopback fetch/net and TLS tripwire. No physical microphone/owner browser data. Production usage.json was hashed only, not used by test ledger operations. Lock absent at initial/final checks.

## Exact changed files

1. study-teachback-app/core.mjs — shared existing 4000-character Tutor message ceiling.
2. study-teachback-app/server.mjs — assistant history uses same ceiling; controlled status error; budget-read guard before paid-work routes/registration.
3. study-teachback-app/app.mjs — confirm operation lock before mutation, finally release, busy notice; explicit unavailable budget display.
4. study-teachback-app/correctness-boundaries.test.mjs — NEW, 11 focused zero-call regressions.
5. study-teachback-app/correctness-hygiene.test.mjs — corrupt ledger route expectation 422 → controlled 503; zero dispatch assertion retained.
6. study-teachback-app/browser-tests-r4.mjs — delayed fake content response + repeat-confirm assertions added to existing genuine replay case.
7. study-teachback-app/run-offline-tests.mjs — boundaries mode and correctness-boundaries-01 output namespace only.

No unrelated files staged/edited. Existing untracked .codex/hooks.json, T09_LIVE_PACKET.txt, historical review ZIP and prior artifacts preserved. New session artifacts only under artifacts/study-teachback/correctness-boundaries-01/, plus the existing wrapper's dedicated temporary Edge profile.

## C1 — MF-01: PASS in focused + offline regression

### Reproduction on unchanged production code

Command:
`node study-teachback-app/run-offline-tests.mjs boundaries correctness-boundaries-01`

Definitive pre-fix receipt:
`artifacts/study-teachback/correctness-boundaries-01/boundaries-1790645914481-Zwx9Dx/`

Actual teach() handler stores the validated fake reply via a persistence snapshot, then sends a real subsequent user question to an actual isolated loopback server:

| Accepted assistant reply | Before | After |
| --- | --- | --- |
| 2500 characters | next turn 200 | next turn 200 |
| 2501 characters | 422 INVALID_TEXT before second stub dispatch | next turn 200, exact history text preserved |
| 4000 characters | 422 INVALID_TEXT before second stub dispatch | next turn 200, exact history text preserved |

### Fix

core exports TUTOR_MESSAGE_LIMIT=4000 and validateTeaching uses it. server assistant history validation uses the same constant; user history limit remains 2500, owner message limit remains 2000, recent-history selection remains last six complete entries.

No output lowering, message rewriting, role/provenance rewrite or new truncation. Existing 80,000-byte HTTP body limit and provider 24,000 input-bound guard are unchanged. The new overflow test verifies six whole entries survive, 4001-character output/history is rejected, oversized body is rejected, and oversized semantic input is rejected before the fake transport/reservation. Very large combined source/history can still hit the existing aggregate cap: this is explicit bounded behavior, not a promise that arbitrary long conversations always dispatch.

No model/provider/pricing/budget change.

## C2 — MF-02: PASS in focused + offline; browser execution BLOCKED

### Reproduction

The VM harness executes the actual app confirm handler, api(), diagnose(), latest/attemptRequest and renderAttempt code. It uses delayed fake fetch, persistence snapshots, synthetic raw transcript/audio and a minimal DOM adapter; it is not claimed as a full browser test.

Definitive pre-fix trace:

```json
{"correctionsDuring":2,"dispatches":1,"current":"ff702d59-94fe-4f72-967e-e3cb7dff0cf9","report":"a249f197-b83c-45fb-ac73-7b2b6faa2295","visible":0}
```

The second click created v2 before api rejected it; the first response remained v1 and was filtered out by actual latest-version rendering.

Final focused trace:

```json
{"correctionsDuring":1,"dispatches":1,"current":"883fc91d-8a98-4e71-960d-93c132afd10d","report":"883fc91d-8a98-4e71-960d-93c132afd10d","visible":1}
```

### Fix and checked properties

Existing processing flag now covers the entire confirm → version creation → save → dispatch → validation/save/render operation, with guard before any correction mutation and finally release.

- Repeated confirm during pending diagnosis creates no correction and no extra dispatch.
- Repeated confirm while initial save is pending also creates no correction.
- REQUEST_IN_PROGRESS is surfaced through existing friendly message, with an initial save/diagnosis busy notice.
- First result remains associated with latest version and is rendered.
- After completion, a legitimate edited/replayed confirmation can create a new version and matching report.
- No replay → no correction; failed fake provider/save releases operation lock.
- Raw transcript and replay gate/version validation preserved.

Browser r4 existing replay case now holds the fake diagnosis until a second confirm has been asserted, then releases it and checks saved version/report and visible finding. This browser case **did not execute** because startup failed. No fake “heard” marker, seek-to-end, relaxed coverage, adaptive skip, or replay bypass was added.

## C3 — MF-03: PASS in focused + offline

### Reproduction

Two isolated conditions:
- synthetic ledger file containing malformed JSON;
- isolated Ledger instance whose read() throws LEDGER_UNREADABLE.

Pre-fix actual async request callback rejected with LEDGER_UNREADABLE. The test deliberately invoked the callback directly first to capture rejection without crashing the whole test runner. This proves the missing error boundary; it does not claim a pre-fix process crash was independently reproduced.

### Fix and after evidence

- GET /api/status catches summary/read errors and returns **503 {error: "BUDGET_UNAVAILABLE"}**, with no fabricated ledger summary.
- Paid-work routes / teach / diagnose / ASR and registration check budget readability before dispatch; extraction remains local and independent.
- Real loopback HTTP tests after the fix receive controlled 503 for status and paid-work routes; repeated root GET remains 200 on the same server.
- Fake provider invocation count stays zero under corrupt/unreadable budget conditions.
- Synthetic ledger bytes, including the existing unsettled reservation in the unreadable case, remain identical.
- Healthy status remains 200 with the existing summary/models.
- UI replaces stale budget text with “预算状态暂不可用；无法确认可用额度。” instead of silently retaining stale values.
- No ledger reset, reservation release, schema/cap/pricing edit or atomic-persistence refactor.

## C4 — Fresh regression results

All commands run from the verified root with Node v24.21.0. No historical test counts substituted.

| Command | Fresh result | Artifact directory |
| --- | --- | --- |
| node study-teachback-app/run-offline-tests.mjs boundaries correctness-boundaries-01 | Pre-fix definitive: 3 PASS / 6 expected FAIL; defects C1/C2/C3 reproduced | boundaries-1790645914481-Zwx9Dx |
| same boundaries command | Initial post-fix: 9/9 PASS | boundaries-1790645961106-zQTjUM |
| same boundaries command, final expanded coverage | **11/11 PASS**, 0 skipped/cancelled | boundaries-1790646058788-5cLvfX |
| node study-teachback-app/run-offline-tests.mjs node correctness-boundaries-01 | **114/114 PASS**, 0 skipped/cancelled | node-1790646077974-5Xrmbp |
| node study-teachback-app/run-offline-tests.mjs browser correctness-boundaries-01 | **FAIL at startup / BLOCKED**, 0 functional cases executed; one suite-completion failure | browser-1790646060288-LTPU7l |
| git diff --check | **PASS**, exit 0 | CLI verification; CRLF conversion warnings only |
| git diff --exit-code -- provider.mjs ledger.mjs storage.mjs schemas.mjs requirements-extractor.txt (full product paths) | **PASS**, no diff | CLI verification |

All artifact directories in the table are under:
`F:/Chat-Codex-Handoff/validation-repo/artifacts/study-teachback/correctness-boundaries-01/`

Each completed wrapper invocation has receipt.json and tests.log, sourceSHA256 map, command, environment key list, and production-ledger before/after hashes. Node aggregate includes provenance/correctness, six diagnostic fixtures, process evidence, replay safety, ingestion, timestamp, budget and other existing offline tests.

### Test-development failures preserved

- First pre-fix attempt boundaries-1790645885216-o7w5sp: C1/C3 reproduced, but C2 extraction used a nonexistent end-marker and raised VM SyntaxError. Corrected only the test harness marker and pending-save cleanup, then obtained definitive C2 reproduction above. Do not count that first C2 failure as product evidence.
- First expanded Node attempt node-1790646037083-PgeZbZ: 113/114; new history test accidentally sent eight 4000-character Chinese entries, exceeding the existing HTTP byte cap before last-six selection. The fixture now has two short older entries and six long recent entries; oversized eight-entry rejection is retained as an additional explicit assertion. No production cap was changed to make it pass.
- No restart-until-green browser loop. Browser suite attempted exactly once.

## Browser startup blocker evidence

Files:
- browser-1790646060288-LTPU7l/edge.log
- browser-1790646060288-LTPU7l/browser-1790646060412.json
- browser-1790646060288-LTPU7l/receipt.json
- browser-1790646060288-LTPU7l/tests.log

Observed:
- Fresh task-owned profile: C:/Users/14057/AppData/Local/Temp/study-edge-Yk7K8f
- Edge process identified by its own stderr PID: 22080.
- DevTools browser listener announced on loopback port 64607.
- GPU child repeated exit_code=-1073741790.
- Fatal stderr: "GPU process isn't usable. Goodbye."
- Suite error: CDP_TIMEOUT Runtime.enable.
- Product Page.navigate not reached; content-confirm/replay/other browser assertions not run.
- Receipt calls=[], network=[], screenshots=[], physicalMicrophone=false, liveAPI=false. Empty network here is limited to the uninitialized page instrumentation, not proof of all Edge background destinations.
- Existing harness cleanup ran and wrapper exited 1; later Get-Process confirmed task Edge PID 22080 no longer present. Test loopback server closed in harness finally.
- Read-only CIM query for task Node processes returned Access denied; no escalation or unknown-process termination was attempted. Session control returned the completed failure receipt; no second browser launch.
- Consistent with canonical sandbox-browser limitation. Exact OS/policy/runtime root cause is **UNKNOWN**; this is not evidence that product root or the new confirmation behavior failed.
- No GPU/policy/sandbox flag experiments, profile forensics, registry changes or replay edits.

## Zero-live-call evidence / protected scope

- Existing wrapper removes persistent provider credentials and supplies only synthetic-offline-test-only.
- Existing test-isolation preloader restricts Node fetch/net to loopback, denies TLS, and rejects owner-ledger read/transaction.
- Focused tests use explicit fake providers/fetchers and isolated Ledger paths. Browser server receives stub providers; startup failed before product navigation, browser stub calls count 0.
- Final focused outbound tripwire count 0. Full Node suite records one deliberate negative outbound probe in existing A0, blocked before I/O; no real endpoint request.
- Production ledger SHA256 before and after all wrappers and final hash:
  **D17AF9EC53787E484CD66B8928A80023D7A7A9570372F3FA64AA4C71F7E9C525**
- Ledger lock absent before/final. No ledger mutation/reservation/cost from this task; live product/provider calls=0, physical microphone=0, owner topic/live actions=0, incremental live exposure=0.
- provider.mjs / ledger.mjs / storage.mjs / schemas.mjs / dependency declaration have no diff.
- Replay function region (normalized LF) unchanged; before and after SHA256:
  ccbe3e6c6bd0125ed130e19df451f3c10d85725ab305931d22a5ae216a8f2cfb
- No model/provider/retention/database schema/budget caps/pricing/dependency change.
- No unrelated backlog implementation; no product push/merge/fetch/pull/reset/clean/rebase/amend; no commit/staging.
- CURRENT_STATE / HANDOFF untouched. Only this exchange reply is written to GitHub meta branch, with incoming file blob optimistic concurrency and canonical recheck.

## Tests Not Run

- Successful browser UI execution of C2 and the remaining r4 functional suite: startup blocked before first case.
- No separate browser-environment, GPU or minimal-launch retries.
- No live provider/microphone/Phase3B or owner profile/topic inspection.
- No new standalone Python/PowerShell launcher suite: unchanged paths; applicable Node ingestion regression did run.
- No atomic ledger crash-recovery test/refactor, fixture portability work, retention or model migration.

## Unknown

- Browser-specific outcome of the new C2 case remains unverified.
- Exact environmental cause of GPU fatal / access restrictions; no new root-cause claim.
- Real owner ASR/usefulness/replay burden and natural trigger frequency remain unmeasured.
- No provider billing balance inspection; exposure=0 is incremental task activity, not provider account balance.

## Blocking

Required browser regression evidence is missing. **Batch C is not ready for acceptance/commit on the current evidence alone.**
Changes are preserved, Node/focused green, final HEAD unchanged. No commit created.

## User Decision Needed

MASTER should decide the smallest separately authorized host-side isolated fake-provider browser validation path, consistent with the accepted sandbox limitation. No need to resume live Phase3B or spend provider calls to validate this fix. Do not treat this suggestion as new execution authorization.

## Future Optional

None implemented. Previously retained fixture portability / ledger atomic persistence / legacy cleanup / retention / model migration remain separate backlog.

## Full tracked diff against base

The following is the exact unstaged Git diff for the six tracked files; new file follows separately. It contains all product/test/runner changes. No product commit was made.

```diff
diff --git a/study-teachback-app/app.mjs b/study-teachback-app/app.mjs
index b1e0bf6..537c2e5 100644
--- a/study-teachback-app/app.mjs
+++ b/study-teachback-app/app.mjs
@@ -19,7 +19,7 @@ async function api(path,body,headers={}){
   try{const response=await fetch(path,{method:'POST',headers:{'X-Study-Request':'1',...headers,...(body instanceof ArrayBuffer?{}:{'Content-Type':'application/json'})},body:body instanceof ArrayBuffer?body:JSON.stringify(body),signal:controller.signal});const result=await response.json();if(!response.ok)throw new Error(result.error);return result;}
   finally{controller=null;$('send').disabled=false;$('explain').disabled=false;$('workspace').removeAttribute('aria-busy');updateBudget();}
 }
-async function updateBudget(){try{const s=await(await fetch('/api/status')).json();$('budget').textContent=`本次账本：${s.ledger.requests} 次请求；已知费用估算 $${s.ledger.knownCostUSD.toFixed(6)}；含未结算预留 $${s.ledger.exposureUSD.toFixed(6)} / $5。现金新增上限 $10，不自动充值。`; }catch{}}
+async function updateBudget(){try{const response=await fetch('/api/status');if(!response.ok)throw new Error('BUDGET_UNAVAILABLE');const s=await response.json();$('budget').textContent=`本次账本：${s.ledger.requests} 次请求；已知费用估算 $${s.ledger.knownCostUSD.toFixed(6)}；含未结算预留 $${s.ledger.exposureUSD.toFixed(6)} / $5。现金新增上限 $10，不自动充值。`; }catch{$('budget').textContent='预算状态暂不可用；无法确认可用额度。';}}
 function renderTopic(){
   reveal('setup',false);reveal('workspace');reveal('dock');$('topicTitle').textContent=topic.source.title;$('sourceText').textContent=topic.source.text;
   $('goals').replaceChildren(...(topic.goals??[]).map(g=>el('li',g.text)));
@@ -223,8 +223,13 @@ function renderProcess(a){
   }
 }
 $('confirm').onclick=()=>act(async()=>{
+  if(record||capturePending||controller||processing)throw new Error('REQUEST_IN_PROGRESS');
   const a=current; if(!a?.raw)return;if(a.raw.spans.some(s=>!heard.has(s.id)))throw new Error('NOT_HEARD');
-  const corrected=revisedTranscript(a,a.raw.spans.map(s=>({text:editors.get(s.id).value})));a.corrections.push(corrected);await save();await diagnose(a);
+  processing=true;
+  try{
+    notice('正在保存核对版本并核对内容，请稍候……');
+    const corrected=revisedTranscript(a,a.raw.spans.map(s=>({text:editors.get(s.id).value})));a.corrections.push(corrected);await save();await diagnose(a);
+  }finally{processing=false;}
 });
 async function diagnose(a){
   const channel='content',events=[],request=attemptRequest(a);notice('正在核对内容和逻辑……');
diff --git a/study-teachback-app/browser-tests-r4.mjs b/study-teachback-app/browser-tests-r4.mjs
index 487d1e6..d0ffc73 100644
--- a/study-teachback-app/browser-tests-r4.mjs
+++ b/study-teachback-app/browser-tests-r4.mjs
@@ -13,12 +13,14 @@ const environmentProbe=process.argv.includes('--environment-probe');
 const probe={mode:environmentProbe?'NON_HEADLESS_TRUSTED_POINTER':'EXISTING_SUITE',lifecycle:[],states:[],trustedInputs:[]};
 const run=Date.now(), profile=process.env.STUDY_TEST_PROFILE??mkdtempSync(root+'edge-test-');
 const calls=[],cases=[],errors=[],network=[];let failASR=null,delaySemantic=0,rejectStarter=false,failTeach=false,failRegister=false;const provenanceRequests=[];
+let diagnosisGate=null;
 const savedASR=normalizeASR(JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r2/SYNTHETIC_ASR_FIELDS.json',import.meta.url))),7.31);
 const savedWave=[...readFileSync(new URL('./runtime/synthetic-mandarin-v2.wav',import.meta.url))];
 const testBook=new Ledger(root+`browser-test-ledger-${run}.json`),register=testBook.register.bind(testBook);
 testBook.register=id=>{if(failRegister)throw Error('LEDGER_LOCKED');return register(id);};
 const server=createServer({book:testBook,semanticCall:async(prompt,input)=>{
   calls.push({kind:input.mode??(input.events?'delivery':'content'),sourceId:input.source.id,focus:input.focus??null});if(delaySemantic)await new Promise(r=>setTimeout(r,delaySemantic));
+  if(!input.mode&&!input.events&&diagnosisGate)await diagnosisGate;
   if(input.mode)provenanceRequests.push(structuredClone(input));
   if(failTeach){failTeach=false;throw Error('API_RESULT_UNAVAILABLE');}
   if(rejectStarter){rejectStarter=false;return {value:{sourceId:input.source.id,message:'Rejected stub',goals:[{text:'Goal',sourceQuote:'NOT IN SOURCE'}],question:'Question'}};}
@@ -219,7 +221,22 @@ try{
     await evaluate(`window.rejectPermission()`);await until(`!document.getElementById('start').disabled`);assert.equal(testBook.summary().attempts,before);
   });
   await check('native MediaRecorder + decode + original IndexedDB Blob + exactly one registration',async()=>{const before=testBook.summary().attempts;await evaluate(`window.testMic='tone'`);await click('start');await until(`!document.getElementById('finish').hidden`);assert.equal(testBook.summary().attempts,before);await shot('recording','recording');assert(await evaluate(`document.body.dataset.recording==='true' && document.querySelector('.learning').hidden`));await pause(1400);await click('finish');await until(`document.querySelectorAll('#transcript textarea').length===1`);const t=(await evaluate(all))[0];assert.equal(t.attempts.length,1);assert(t.attempts[0].audio.size>0);assert(t.attempts[0].raw.spans.length);assert.equal(t.attempts[0].corrections.length,0);assert.equal(testBook.summary().attempts,before+1);assert.equal(testBook.read().events.filter(e=>e.type==='attempt'&&e.attemptId===t.attempts[0].id).length,1);});
-  await check('diagnosis blocked before segment replay; correction keeps original identity and audio',async()=>{await shot('partial-review','attemptPanel');await click('confirm');await until(`document.getElementById('notice').textContent.includes('逐段完整回听')`);await evaluate(`document.querySelector('#transcript button').click()`);await until(`document.querySelector('#transcript button').textContent.includes('✓')`);const before=(await evaluate(all))[0].attempts[0];await evaluate(`document.querySelector('#transcript textarea').value='只有土壤干燥才浇水，湿润时先不浇。'`);await click('confirm');await until(`document.querySelectorAll('.finding').length===1`);const after=(await evaluate(all))[0].attempts[0];assert.equal(after.id,before.id);assert.equal(after.audio.size,before.audio.size);assert.equal(after.raw.text,before.raw.text);assert.equal(after.corrections.length,1);assert.notEqual(after.raw.id,after.corrections[0].id);});
+  await check('C2 diagnosis replay gate and delayed double confirm preserve one visible current-version report',async()=>{
+    await shot('partial-review','attemptPanel');await click('confirm');await until(`document.getElementById('notice').textContent.includes('逐段完整回听')`);
+    await evaluate(`document.querySelector('#transcript button').click()`);await until(`document.querySelector('#transcript button').textContent.includes('✓')`);
+    const before=(await evaluate(all))[0].attempts[0],count=calls.length;
+    await evaluate(`document.querySelector('#transcript textarea').value='只有土壤干燥才浇水，湿润时先不浇。'`);
+    let release;diagnosisGate=new Promise(r=>release=r);
+    try{
+      await click('confirm');for(let i=0;i<100&&calls.length===count;i++)await pause(50);assert.equal(calls.length,count+1);
+      const pending=(await evaluate(all))[0].attempts[0];assert.equal(pending.corrections.length,1);
+      await click('confirm');await until(`document.getElementById('notice').textContent.includes('上一个请求仍在完成')`);
+      const duplicate=(await evaluate(all))[0].attempts[0];assert.deepEqual(duplicate.corrections,pending.corrections);assert.equal(calls.length,count+1);
+    }finally{release();diagnosisGate=null;}
+    await until(`document.querySelectorAll('.finding').length===1`);const after=(await evaluate(all))[0].attempts[0];
+    assert.equal(after.id,before.id);assert.equal(after.audio.size,before.audio.size);assert.equal(after.raw.text,before.raw.text);
+    assert.equal(after.corrections.length,1);assert.notEqual(after.raw.id,after.corrections[0].id);assert.equal(after.reports.at(-1).transcriptVersion,after.corrections[0].id);
+  });
   await check('targeted repair routes feedback back into tutor',async()=>{await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再学这一点').click()`);await until(`document.getElementById('phase').textContent.includes('再学这一点') && document.querySelectorAll('.message.assistant').length===2`);assert(calls.some(c=>c.kind==='repair'));});
   await check('partial re-record is a new attempt with parent and focus',async()=>{await evaluate(`[...document.querySelectorAll('.finding button')].find(b=>b.textContent==='再讲这一点').click()`);await click('start');await until(`!document.getElementById('finish').hidden`);await pause(1200);await click('finish');await until(`document.getElementById('notice').textContent.includes('转写完成')`);const t=(await evaluate(all))[0];assert.equal(t.attempts.length,2);assert.equal(t.attempts[1].kind,'partial');assert.equal(t.attempts[1].parentId,t.attempts[0].id);assert.notEqual(t.attempts[1].id,t.attempts[0].id);});
   await check('new Apply task and answer stay separate from same-topic repair',async()=>{await click('apply');await until(`document.getElementById('phase').textContent.includes('换个情境') && document.getElementById('question').textContent.includes('现在')`);await evaluate(`document.getElementById('chat').value='不需要，因为还是湿的。';document.getElementById('chatForm').requestSubmit()`);await until(`document.querySelectorAll('.message.assistant').length===4`);assert((await evaluate(all))[0].apply.answer);});
diff --git a/study-teachback-app/core.mjs b/study-teachback-app/core.mjs
index 3bb35c2..eaa6a55 100644
--- a/study-teachback-app/core.mjs
+++ b/study-teachback-app/core.mjs
@@ -1,4 +1,5 @@
 export const RETENTION_MS = 7 * 86400000;
+export const TUTOR_MESSAGE_LIMIT = 4000;
 export function requireValue(ok, code) { if (!ok) throw new Error(code); }
 export function text(value, max = 12000) { requireValue(typeof value === 'string' && value.trim().length > 0 && value.length <= max, 'INVALID_TEXT'); return value; }
 export function identifier(value) { requireValue(typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value), 'INVALID_ID'); return value; }
@@ -45,7 +46,7 @@ function exactKeys(v, names) { requireValue(v && typeof v === 'object' && !Array
 export function validateTeaching(v, source) {
   exactKeys(v, ['sourceId','message','goals','question']);
   requireValue(v.sourceId === source.id && Array.isArray(v.goals) && v.goals.length >= 1 && v.goals.length <= 4, 'INVALID_SOURCE_OR_GOALS');
-  text(v.message,4000); text(v.question,1000); v.goals.forEach(g=>{ exactKeys(g,['text','sourceQuote']); text(g.text,200); text(g.sourceQuote,600); requireValue(source.text.includes(g.sourceQuote),'INVALID_SOURCE_QUOTE'); });
+  text(v.message,TUTOR_MESSAGE_LIMIT); text(v.question,1000); v.goals.forEach(g=>{ exactKeys(g,['text','sourceQuote']); text(g.text,200); text(g.sourceQuote,600); requireValue(source.text.includes(g.sourceQuote),'INVALID_SOURCE_QUOTE'); });
   return v;
 }
 export function validateFindings(v, source, attempt, channel, events = []) {
diff --git a/study-teachback-app/correctness-hygiene.test.mjs b/study-teachback-app/correctness-hygiene.test.mjs
index fbf5ef5..dac448b 100644
--- a/study-teachback-app/correctness-hygiene.test.mjs
+++ b/study-teachback-app/correctness-hygiene.test.mjs
@@ -43,9 +43,9 @@ for (const failure of ['invalid','lock','corrupt','cap']) test(`A3 HTTP ${failur
     const id=failure==='invalid'?'bad/id':'new';
     const headers={Origin:origin,'X-Study-Request':'1'};
     const reg=await fetch(origin+'/api/register',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({attemptId:id})});
-    assert.equal(reg.status,422);
+    assert.equal(reg.status,failure==='corrupt'?503:422);
     const asr=await fetch(origin+'/api/asr',{method:'POST',headers:{...headers,'Content-Type':'audio/wav','X-Attempt-Id':id},body:waveBytes(new Float32Array(16000))});
-    assert.equal(asr.status,422);assert.equal(calls,0);
+    assert.equal(asr.status,failure==='corrupt'?503:422);assert.equal(calls,0);
   } finally { await new Promise(r=>server.close(r)); }
 });
 
diff --git a/study-teachback-app/run-offline-tests.mjs b/study-teachback-app/run-offline-tests.mjs
index fe243a3..14e7f96 100644
--- a/study-teachback-app/run-offline-tests.mjs
+++ b/study-teachback-app/run-offline-tests.mjs
@@ -7,9 +7,9 @@ import { createHash } from 'node:crypto';
 import { tmpdir } from 'node:os';
 const repo = fileURLToPath(new URL('../', import.meta.url));
 const mode = process.argv[2];
-if (!['node', 'browser-env', 'replay', 'browser-replay', 'browser', 'focused', 'diagnostic', 'provenance-baseline'].includes(mode)) throw Error('Use node, browser, focused, diagnostic or provenance-baseline');
+if (!['node', 'browser-env', 'replay', 'browser-replay', 'browser', 'focused', 'boundaries', 'diagnostic', 'provenance-baseline'].includes(mode)) throw Error('Use node, browser, focused, boundaries, diagnostic or provenance-baseline');
 const batch=process.argv[3]??'correctness-hygiene-01';
-if(!['correctness-hygiene-01','diagnostic-localization-01'].includes(batch))throw Error('INVALID_TEST_BATCH');
+if(!['correctness-hygiene-01','diagnostic-localization-01','correctness-boundaries-01'].includes(batch))throw Error('INVALID_TEST_BATCH');
 const parent = join(repo, 'artifacts/study-teachback', batch);
 mkdirSync(parent, { recursive: true });
 const output = mkdtempSync(join(parent, `${mode}-${Date.now()}-`));
@@ -28,7 +28,7 @@ if(mode==='provenance-baseline'){
   if(base.status!==0){writeFileSync(join(output,'baseline-source-error.log'),`${base.error?.code??''}\n${base.stderr??''}`);throw Error('BASELINE_SOURCE_UNAVAILABLE: '+output);}
   env.STUDY_TEST_APP_SOURCE=join(output,'accepted-base-app.mjs');writeFileSync(env.STUDY_TEST_APP_SOURCE,base.stdout);
 }
-const files = mode === 'browser-env' ? ['study-teachback-app/browser-tests-r4.mjs','--environment-probe'] : mode === 'browser-replay' ? ['study-teachback-app/browser-tests-r4.mjs','--replay-only'] : mode === 'browser' ? ['study-teachback-app/browser-tests-r4.mjs'] : mode === 'replay' ? ['--test','study-teachback-app/replay-gate.test.mjs'] : mode === 'diagnostic' ? ['--test','study-teachback-app/diagnostic-localization.test.mjs'] : mode === 'provenance-baseline' ? ['--test','study-teachback-app/provenance.test.mjs'] : mode === 'focused' ? ['--test', 'study-teachback-app/correctness-hygiene.test.mjs'] : ['--test', 'study-teachback-app/tests.mjs', ...readdirSync(new URL('./', import.meta.url)).filter(f => f.endsWith('.test.mjs')).sort().map(f => `study-teachback-app/${f}`)];
+const files = mode === 'boundaries' ? ['--test','study-teachback-app/correctness-boundaries.test.mjs'] : mode === 'browser-env' ? ['study-teachback-app/browser-tests-r4.mjs','--environment-probe'] : mode === 'browser-replay' ? ['study-teachback-app/browser-tests-r4.mjs','--replay-only'] : mode === 'browser' ? ['study-teachback-app/browser-tests-r4.mjs'] : mode === 'replay' ? ['--test','study-teachback-app/replay-gate.test.mjs'] : mode === 'diagnostic' ? ['--test','study-teachback-app/diagnostic-localization.test.mjs'] : mode === 'provenance-baseline' ? ['--test','study-teachback-app/provenance.test.mjs'] : mode === 'focused' ? ['--test', 'study-teachback-app/correctness-hygiene.test.mjs'] : ['--test', 'study-teachback-app/tests.mjs', ...readdirSync(new URL('./', import.meta.url)).filter(f => f.endsWith('.test.mjs')).sort().map(f => `study-teachback-app/${f}`)];
 const args = ['--import', guard, ...files];
 const ledger = join(repo, 'study-teachback-app/runtime/usage.json');
 const hash = () => existsSync(ledger) ? createHash('sha256').update(readFileSync(ledger)).digest('hex') : 'ABSENT';
diff --git a/study-teachback-app/server.mjs b/study-teachback-app/server.mjs
index 8c0392a..ba87aa8 100644
--- a/study-teachback-app/server.mjs
+++ b/study-teachback-app/server.mjs
@@ -3,7 +3,7 @@ import { extractSource } from './ingestion.mjs';
 import { readFile } from 'node:fs/promises';
 import { fileURLToPath } from 'node:url';
 import { semantic, transcribe, ledger } from './provider.mjs';
-import { sourceValue, attemptValue, contentInput, validateTeaching, validateFindings, text, requireValue, repairFocus, waveDuration } from './core.mjs';
+import { sourceValue, attemptValue, contentInput, validateTeaching, validateFindings, text, requireValue, repairFocus, waveDuration, TUTOR_MESSAGE_LIMIT } from './core.mjs';
 import { teachingSchema, findingsSchema, deliverySchema, TEACH, CONTENT, DELIVERY } from './schemas.mjs';
 
 const files={'/':'index.html','/app.mjs':'app.mjs','/core.mjs':'core.mjs','/storage.mjs':'storage.mjs','/style.css':'style.css','/diagnostic-localization.mjs':'diagnostic-localization.mjs'};
@@ -18,12 +18,19 @@ export function createServer({semanticCall=semantic,asrCall=transcribe,book=ledg
     if(req.method==='GET' && files[path]){
       try {const file=files[path];res.writeHead(200,{...headers,'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':'text/javascript'});res.end(await readFile(new URL(file,import.meta.url)));}catch{json(500,{error:'FILE_UNAVAILABLE'});}return;
     }
-    if(req.method==='GET' && path==='/api/status')return json(200,{keyConfigured:!!process.env.OPENAI_API_KEY,ledger:book.summary(),models:['whisper-1','gpt-5.6-luna']});
+    if(req.method==='GET' && path==='/api/status'){
+      try{return json(200,{keyConfigured:!!process.env.OPENAI_API_KEY,ledger:book.summary(),models:['whisper-1','gpt-5.6-luna']});}
+      catch{return json(503,{error:'BUDGET_UNAVAILABLE'});}
+    }
     if(req.method!=='POST'||req.headers.origin!==origin||req.headers['x-study-request']!=='1')return json(403,{error:'ORIGIN_REJECTED'});
     if(!['/api/teach','/api/diagnose','/api/asr','/api/register','/api/extract'].includes(path))return json(404,{error:'NOT_FOUND'});
     if(busy)return json(409,{error:'REQUEST_IN_PROGRESS'});
     busy=true; const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
     try {
+      // Unknown budget state must fail before any paid-work dispatch or registration.
+      if(path!=='/api/extract'){
+        try{book.summary();}catch{return json(503,{error:'BUDGET_UNAVAILABLE'});}
+      }
       const limit=path==='/api/extract'?10*1024*1024:path==='/api/asr'?5_760_044:80000;const parts=[];let length=0;
       for await(const part of req){length+=part.length;requireValue(length<=limit,'INPUT_TOO_LARGE');parts.push(part);}
       const bytes=Buffer.concat(parts);
@@ -35,7 +42,7 @@ export function createServer({semanticCall=semantic,asrCall=transcribe,book=ledg
       const source=sourceValue(b.source);
       if(path==='/api/teach'){
         requireValue(['learn','repair','apply','apply_answer'].includes(b.mode),'INVALID_MODE');
-        const input={source,mode:b.mode,message:text(b.message,2000),focus:b.mode==='repair'?repairFocus(b.focus):b.focus?text(b.focus,1000):null,history:Array.isArray(b.history)?b.history.slice(-6).map(m=>({role:m.role==='assistant'?'assistant':'user',text:text(m.text,2500)})):[]};
+        const input={source,mode:b.mode,message:text(b.message,2000),focus:b.mode==='repair'?repairFocus(b.focus):b.focus?text(b.focus,1000):null,history:Array.isArray(b.history)?b.history.slice(-6).map(m=>({role:m.role==='assistant'?'assistant':'user',text:text(m.text,m.role==='assistant'?TUTOR_MESSAGE_LIMIT:2500)})):[]};
         const result=await semanticCall(TEACH,input,teachingSchema,{signal:controller.signal});return json(200,{...result,value:validateTeaching(result.value,source)});
       }
       const attempt=attemptValue(b.attempt), input=contentInput(source,attempt);

```

## Full new file — study-teachback-app/correctness-boundaries.test.mjs

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import vm from 'node:vm';
import { createServer } from './server.mjs';
import { Ledger } from './ledger.mjs';
import { revisedTranscript, validateFindings, waveBytes } from './core.mjs';
import { semantic } from './provider.mjs';
import { TEACH, teachingSchema } from './schemas.mjs';

const app=readFileSync(new URL('./app.mjs',import.meta.url),'utf8');
const book=()=>new Ledger(join(mkdtempSync(join(tmpdir(),'batch-c-')),'ledger.json'));
const source={id:'source',title:'Synthetic rule',text:'Only enter when open.'};
async function listen(server){await new Promise(r=>server.listen(0,'127.0.0.1',r));return `http://127.0.0.1:${server.address().port}`;}
const post=(origin,path,body)=>fetch(origin+path,{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify(body)});

for(const length of [2500,2501,4000])test(`C1 accepted Tutor ${length} characters survives persisted next-turn history unchanged`,async()=>{
  const requests=[],b=book(),reply='讲'.repeat(length),saved=[];
  const server=createServer({book:b,semanticCall:async(_,input)=>{
    requests.push(structuredClone(input));return {value:{sourceId:source.id,message:reply,goals:[{text:'Condition',sourceQuote:source.text}],question:'Why?'}};
  }});
  const origin=await listen(server),topic={id:'topic',source:structuredClone(source),messages:[],goals:[]};
  const context=vm.createContext({topic,record:null,capturePending:false,controller:null,processing:false,deleted:new Set(),structuredClone,uid:()=> 'anchor',repairFocus:x=>x,
    save:async()=>saved.push(structuredClone(topic)),renderTopic(){},notice(){},friendly:x=>x,
    api:async(path,body)=>{const response=await post(origin,path,body),result=await response.json();assert.equal(response.status,200,JSON.stringify(result));return result;}});
  vm.runInContext(app.slice(app.indexOf('async function teach('),app.indexOf('let importPending')),context);
  try{
    await vm.runInContext("teach('internal','learn',null,{internalStarter:true})",context);
    assert.equal(saved.at(-1).messages[0].text,reply);
    await vm.runInContext("teach('Why does registration not suffice?')",context);
    assert.equal(requests.length,2);assert.deepEqual(requests[1].history,[{role:'assistant',text:reply}]);
    assert.equal(topic.messages.filter(m=>m.role==='user').length,1);assert.equal(b.summary().requests,0);
  }finally{await new Promise(r=>server.close(r));}
});

function confirmationHarness(){
  const nodes=new Map(),saved=[],visible=[],notices=[],pending=[];
  const $=id=>{if(!nodes.has(id))nodes.set(id,{children:[],value:'',append(...x){this.children.push(...x);},replaceChildren(...x){this.children=x;},setAttribute(){},removeAttribute(){}});return nodes.get(id);};
  const a={id:'attempt',source,duration:1,kind:'full',assistance:'none',audio:new Blob(['synthetic']),raw:{id:'raw',text:'Enter when open.',spans:[{id:'s0',start:0,end:1,text:'Enter when open.'}]},corrections:[],reports:[]};
  let saveGate=null;
  const context=vm.createContext({$,current:a,topic:{id:'topic',attempts:[a]},record:null,capturePending:false,processing:false,controller:null,deleted:new Set(),
    heard:new Set(),editors:new Map(),revisedTranscript,validateFindings,AbortController,ArrayBuffer,
    blobURL:null,replayRequest:0,replayOriginal:null,URL:{createObjectURL:()=> 'blob:synthetic',revokeObjectURL(){}},
    notice:x=>notices.push(x),friendly:x=>x,act:async fn=>{try{await fn();}catch(e){notices.push(e.message);}},
    reveal(){},el:()=>({setAttribute(){},append(){}}),button:()=>({}),renderProcess(){},renderFeedback:r=>visible.push(r),updateBudget(){},
    save:async()=>{saved.push(structuredClone(a));if(saveGate)await saveGate;},
    fetch:async(_,options)=>{const request=JSON.parse(options.body);return new Promise((resolve,reject)=>pending.push({request,reject,resolve:()=>resolve({ok:true,json:async()=>({value:{sourceId:source.id,attemptId:a.id,transcriptVersion:request.attempt.transcriptVersion,findings:[]}})})}));}});
  vm.runInContext(app.slice(app.indexOf('async function api('),app.indexOf('async function updateBudget(')),context);
  vm.runInContext(app.slice(app.indexOf('function latest('),app.indexOf('async function play(')),context);
  vm.runInContext(app.slice(app.indexOf('function renderAttempt('),app.indexOf('function processFor(')),context);
  vm.runInContext(app.slice(app.indexOf("$('confirm').onclick"),app.indexOf('function renderFeedback(')),context);
  return {a,context,pending,saved,visible,notices,click:()=>$('confirm').onclick(),review(text='Enter when open.') {context.heard.add('s0');context.editors.set('s0',{value:text});},blockSave(){let release;saveGate=new Promise(r=>release=r);return ()=>{saveGate=null;release();};}};
}
const drain=async()=>{for(let i=0;i<30;i++)await Promise.resolve();};

test('C2 delayed diagnosis double confirm preserves current version and visible report; later edit works',async()=>{
  const h=confirmationHarness(),raw=JSON.stringify(h.a.raw);h.review();const first=h.click();await drain();
  assert.equal(h.pending.length,1);const version=h.a.corrections[0].id;
  await h.click();const during=h.a.corrections.length;
  h.pending[0].resolve();await first;
  console.log(JSON.stringify({case:'C2 pending double confirm',correctionsDuring:during,dispatches:h.pending.length,current:h.a.corrections.at(-1).id,report:h.a.reports[0].transcriptVersion,visible:h.visible.length}));
  assert.equal(during,1);assert.equal(h.pending.length,1);assert.equal(h.a.corrections.at(-1).id,version);assert.equal(h.visible.length,1);
  assert(h.notices.includes('REQUEST_IN_PROGRESS'));assert.equal(JSON.stringify(h.a.raw),raw);assert.equal(h.context.processing,false);
  h.review('Enter only when open.');const next=h.click();await drain();assert.equal(h.pending.length,2);h.pending[1].resolve();await next;
  assert.equal(h.a.corrections.length,2);assert.notEqual(h.a.corrections[1].id,version);assert.equal(h.a.reports[1].transcriptVersion,h.a.corrections[1].id);
});
test('C2 lock precedes asynchronous persistence and releases after save failure',async()=>{
  const h=confirmationHarness();h.review();const release=h.blockSave(),first=h.click();await drain();const second=h.click();await drain();
  const during=h.a.corrections.length;release();await drain();for(const p of h.pending)p.resolve();await Promise.all([first,second]);
  assert.equal(during,1);assert.equal(h.pending.length,1);
  h.review();h.context.save=async()=>{throw Error('STORAGE_FAILED');};await h.click();assert.equal(h.context.processing,false);assert.equal(h.pending.length,1);
});
test('C2 no replay creates no correction; failed provider releases operation for explicit later confirmation',async()=>{
  const h=confirmationHarness();await h.click();assert.equal(h.a.corrections.length,0);assert(h.notices.includes('NOT_HEARD'));
  h.review();const first=h.click();await drain();h.pending[0].reject(Error('SYNTHETIC_FAILURE'));await first;
  assert.equal(h.context.processing,false);assert.equal(h.context.controller,null);
  const next=h.click();await drain();h.pending[1].resolve();await next;assert.equal(h.visible.length,1);
});

for(const failure of ['corrupt','unreadable'])test(`C3 ${failure} ledger status is controlled, loop stays alive and provider dispatch stays blocked`,async()=>{
  const b=book();b.reserve({kind:'semantic',input:12,output:12});
  if(failure==='corrupt')writeFileSync(b.path,'{broken synthetic ledger');
  else b.read=()=>{throw Error('LEDGER_UNREADABLE');};
  const before=readFileSync(b.path,'utf8');let calls=0;
  const server=createServer({book:b,semanticCall:async()=>{calls++;return {};},asrCall:async()=>{calls++;return {};}});
  // Invoke the actual async listener first: pre-fix rejection is captured by node:test,
  // not leaked as an unhandled rejection that would terminate the whole runner.
  let status,body;await server.listeners('request')[0]({method:'GET',url:'/api/status',headers:{host:'127.0.0.1:4318'},socket:{localPort:4318}},
    {writeHead:s=>status=s,end:x=>body=JSON.parse(x)});
  assert.equal(status,503);assert.equal(body.error,'BUDGET_UNAVAILABLE');assert.equal(body.ledger,undefined);
  const origin=await listen(server);
  try{
    assert.equal((await fetch(origin+'/api/status')).status,503);assert.equal((await fetch(origin+'/')).status,200);
    const r=await post(origin,'/api/teach',{source,mode:'learn',message:'Why?',history:[]});assert.equal(r.status,503);
    const asr=await fetch(origin+'/api/asr',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','X-Attempt-Id':'synthetic'},body:waveBytes(new Float32Array(16000))});assert.equal(asr.status,503);
    const attempt={id:'attempt',sourceId:source.id,transcriptVersion:'v1',duration:1,spans:[{id:'s0',start:0,end:1,text:'Rule'}],kind:'full',assistance:'none',reviewed:true};
    assert.equal((await post(origin,'/api/diagnose',{source,attempt,channel:'content'})).status,503);
    assert.equal(calls,0);assert.equal(readFileSync(b.path,'utf8'),before);assert.equal((await fetch(origin+'/')).status,200);
  }finally{await new Promise(r=>server.close(r));}
});
test('C3 healthy status retains ledger summary and read does not write',async()=>{
  const b=book();b.reserve({kind:'semantic',input:10,output:10});const before=readFileSync(b.path,'utf8'),server=createServer({book:b});const origin=await listen(server);
  try{const r=await fetch(origin+'/api/status');assert.equal(r.status,200);const value=await r.json();assert.deepEqual(value.ledger,b.summary());assert.deepEqual(value.models,['whisper-1','gpt-5.6-luna']);assert.equal(readFileSync(b.path,'utf8'),before);}
  finally{await new Promise(r=>server.close(r));}
});

test('C1 history stays at six whole messages; output/history ceiling and provider input budget still reject overflow',async()=>{
  const b=book(),requests=[];let output='Short reply';
  const server=createServer({book:b,semanticCall:async(_,input)=>{requests.push(input);return {value:{sourceId:source.id,message:output,goals:[{text:'Condition',sourceQuote:source.text}],question:'Why?'}};}});
  const origin=await listen(server),history=Array.from({length:8},(_,i)=>({role:'assistant',text:i<2?'Old message '+i:String(i)+'讲'.repeat(3999)}));
  try{
    const payload={source,mode:'learn',message:'Why?',history};assert.equal((await post(origin,'/api/teach',payload)).status,200);
    assert.deepEqual(requests[0].history,history.slice(-6));
    assert.equal((await post(origin,'/api/teach',{...payload,history:Array.from({length:8},()=>({role:'assistant',text:'讲'.repeat(4000)}))})).status,422);assert.equal(requests.length,1);
    assert.equal((await post(origin,'/api/teach',{...payload,history:[{role:'assistant',text:'x'.repeat(4001)}]})).status,422);assert.equal(requests.length,1);
    output='x'.repeat(4001);assert.equal((await post(origin,'/api/teach',{...payload,history:[]})).status,422);
    let dispatches=0;const before=b.summary();
    await assert.rejects(semantic(TEACH,requests[0],teachingSchema,{book:b,fetcher:async()=>{dispatches++;throw Error('UNEXPECTED');}}),/INPUT_TOO_LARGE/);
    assert.equal(dispatches,0);assert.deepEqual(b.summary(),before);
  }finally{await new Promise(r=>server.close(r));}
});
test('C3 unavailable status replaces stale budget display without showing zero usage',async()=>{
  const node={textContent:'old budget'};
  const context=vm.createContext({$:()=>node,fetch:async()=>({ok:false,json:async()=>({error:'BUDGET_UNAVAILABLE'})})});
  vm.runInContext(app.slice(app.indexOf('async function updateBudget('),app.indexOf('function renderTopic(')),context);
  await vm.runInContext('updateBudget()',context);assert.match(node.textContent,/预算状态暂不可用/);assert(!node.textContent.includes('$0'));
});


```

## Stop

Stop for MASTER review. PHASE3B-LIVE-01 remains PAUSED and its previous authorization unspent. No automatic next experiment, browser rerun, fix expansion, commit or live action.
