# Active Handoff — PHASE3B-PREFLIGHT-01

Updated: 2026-09-28
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / READ-ONLY / ZERO LIVE API CALLS**

## 0. Authority and binding

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Canonical branch:
`meta/master-state`

Read latest:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`

Record the immutable canonical commit actually read.

Execution checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Expected accepted local HEAD:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Do not try to match the older remote product branch. No fetch/pull/reset/rebase/checkout/clean/amend.

## 1. Task

**Task ID: PHASE3B-PREFLIGHT-01.**

Goal:
collect the minimum safe local facts needed for MASTER to decide whether one real Phase 3B recording is necessary, technically ready and affordable.

This task is **read-only** and **zero live product/provider calls**.

Do not modify product code, docs, runtime state, browser data or Git history. No commit.

## 2. Mandatory preflight checks

### P0 — repo identity

Report:
- cwd;
- Git top-level;
- branch;
- HEAD;
- tracked worktree status;
- unrelated untracked items separately.

PASS requires HEAD exactly:
`dd8317b43100b8cbaad684cab7fc02957e32de62`.

If HEAD/tracked work differs, STOP and report. Do not repair it.

### P1 — provider configuration read

Read production source only.

Report from `study-teachback-app/provider.mjs`:
- configured transcription model name;
- configured semantic model name;
- transcription endpoint path/URL family;
- semantic endpoint path/URL family;
- currently requested transcription response/timestamp granularity options;
- any timeout/retry behavior relevant to one bounded call.

Do not reveal or print credential values. Do not test provider access. Do not call model-list/model endpoints.

### P2 — safe ledger read

Read the application ledger file directly from disk only if it exists:
`study-teachback-app/runtime/usage.json`.

Do not start `server.mjs`, `Start-Study.cmd`, the browser app or any script that could create/reserve/settle a ledger event.

Before parsing:
- compute file SHA256;
- confirm no `.lock` file is present; if lock exists, report and STOP ledger interpretation rather than deleting it.

Parse read-only and report:
- ledger version/pricing metadata present in file;
- total request reservations;
- distinct attempts;
- reserved minutes;
- reserved input/output;
- known estimated settled cost;
- total exposure under existing reserve accounting;
- unsettled reservation count;
- latest few event types/categories only, with timestamps/model/kind/status where non-sensitive;
- do not return source text, prompts, raw responses, secrets or owner content.

Also read current hard limits and pricing constants from `ledger.mjs`.

Use existing pure summary logic only if it can be invoked with a temporary/read-only copy and is proven not to mutate the production file. Direct JSON parsing/calculation is preferred.

### P3 — mechanical readiness only

Using only the read-only ledger/config facts:
- state whether one additional normal owner ASR attempt and the expected bounded semantic steps are mechanically below the application hard caps;
- do NOT infer provider account balance, billing credit, model access or API-key validity;
- do NOT reserve anything;
- do NOT call the provider.

If exact semantic request count for the later experiment is not yet fixed, report a range/unknown rather than inventing one.

### P4 — data safety

Do not inspect the historical browser IndexedDB merely to see whether the old clean topic exists.

Reason:
opening the app/store can trigger expiry on old records.

Do not use browser forensics, copy browser profile databases or alter timestamps.

Report historical topic survival as UNKNOWN unless a safe pre-existing export/file is already present and can be read without touching live browser storage. Do not search unrelated user directories broadly.

### P5 — zero-call proof

Report:
- files read;
- hashes where useful;
- commands executed;
- confirmation that no app/server/browser was launched;
- no microphone access;
- no provider/API request;
- no files changed;
- no Git write operation;
- final tracked worktree still clean.

## 3. Protected boundaries

No:
- live ASR/Tutor/diagnosis/model-list/access probe;
- API-key validation;
- physical microphone;
- app/browser launch;
- owner browser profile/IndexedDB access;
- code/doc/runtime write;
- ledger reserve/settle/failure event;
- provider/model/retention/storage-schema/budget change;
- new dependency;
- push/merge/commit/reset/clean/rebase/amend.

If safe ledger read is impossible, return BLOCKED for that part. Do not weaken boundaries.

## 4. Delivery receipt

Return:
- Task ID and canonical commit read;
- P0–P5 PASS / FAIL / BLOCKED / UNKNOWN mapping;
- repo/branch/HEAD/worktree;
- provider configuration facts;
- ledger SHA and safe summary;
- hard caps/constants;
- mechanical headroom conclusion with caveats;
- files/commands read-only evidence;
- Tests Not Run;
- Unknown;
- Blocking;
- User Decision Needed;
- Future Optional.

Do not propose or execute a live call inside this task.

## 5. Canonical short trigger

```text
继续当前项目，执行只读预检：PHASE3B-PREFLIGHT-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。

执行目录 F:\Chat-Codex-Handoff\validation-repo，分支 prototype/study-teachback-v0.1，本地 accepted HEAD 应为 dd8317b43100b8cbaad684cab7fc02957e32de62。若 HEAD 或 tracked work 不匹配立即停下，不要 fetch/pull/reset/rebase 修正。

严格按 HANDOFF P0–P5 只读执行：读取 provider.mjs 当前模型/endpoint/timestamp 配置；安全直接读取 study-teachback-app/runtime/usage.json 和 ledger.mjs 的 limits/pricing，先检查 lock，再计算当前本地 ledger summary 和机械 headroom。不要启动 app/server/browser，不要 openStore/IndexedDB，不要碰历史 owner topic，不要检查 API key 有效性，不要调用任何 provider/model/list endpoint，不要录音，不要修改任何文件或 Git 状态。

返回 repo/branch/HEAD、provider 配置、ledger SHA/summary、hard caps、是否机械上可容纳一次受限 Phase3B 尝试（不是消费授权）、P0–P5 证据、Unknown/Blocking/User Decision Needed，并确认 zero live API / zero file change / final tracked clean。完成后停下交 MASTER；不要开始真实 Phase 3B。
```

## 6. Classification

Completed:
- Batch B accepted and finalized locally at `dd8317b...`.

Ready:
- zero-call Phase 3B preflight.

Not Authorized:
- real microphone / ASR / semantic provider calls.

Next smallest step:
send PHASE3B-PREFLIGHT-01 to Codex, return the read-only receipt to MASTER, then MASTER performs current public model/rate check and presents the owner a concrete live-test decision.
