# Active Handoff — PHASE3B-GPU-ISOLATION-01

Updated: 2026-09-29
Role: 00 MASTER
Status: **READY / ZERO PROVIDER CALLS / NO MICROPHONE / REVERSIBLE EDGE LAUNCH A/B ONLY**

## 0. Binding

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Execution checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Accepted HEAD:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Canonical authority:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

Live authorization remains PAUSED and unused:
- max 3 provider calls;
- 0 retries;
- exposure <= US$0.03432.

This diagnostic must use 0 provider calls, 0 microphone, 0 topic/live actions.

## 1. Known evidence

Previous blank-target startup used Edge:
`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
version `154.0.4258.37`.

A new temporary profile and loopback CDP target were created.

Before product navigation:
- `Page.enable` timed out;
- GPU subprocess repeatedly exited `-1073741790`;
- stderr reported `GPU process isn't usable. Goodbye.`;
- main Edge process exited;
- product server/root was never launched.

Do not touch the earlier unknown Access-denied Edge process/profile.

## 2. Task

**Task ID: PHASE3B-GPU-ISOLATION-01.**

Goal:
classify whether bypassing hardware GPU rendering with the reversible Chromium/Edge launch flag `--disable-gpu` establishes a stable isolated browser-control path.

Do not change machine-wide settings or product behavior.

## 3. H0 — identity and ledger

Confirm:
- repo/branch/HEAD;
- tracked CLEAN;
- ledger lock absent;
- ledger SHA/exposure unchanged;
- preserve all prior Phase3B artifacts.

If identity differs, STOP.

## 4. H1 — one default control

Use at most one new default-GPU blank-target control with:
- fresh temporary profile;
- non-headless Edge;
- loopback dynamic CDP port;
- same known safe startup args as the prior diagnostic;
- `about:blank`;
- no product server.

Record:
- target creation;
- `Page.enable`;
- bounded target lifetime;
- GPU stderr;
- process exit/cleanup.

Do not retry the default control.

## 5. H2 — one software-rendering blank probe

Launch another brand-new temporary profile/process with exactly the same configuration plus:

`--disable-gpu`

Do not add:
- `--disable-gpu-sandbox`;
- `--no-sandbox`;
- SwiftShader/ANGLE flags;
- policy/registry changes.

Open `about:blank`.

PASS requires:
- CDP connects;
- `Page.enable` succeeds;
- target stays alive for the bounded interval;
- no fatal GPU/browser exit;
- task-owned process closes normally.

If H2 fails: STOP. Do not add more flags.

## 6. H3 — product-root startup with software rendering

Only if H2 PASS.

First verify from accepted source that loading root page alone does not dispatch Tutor/ASR/diagnosis.

Start local server.

For each of three runs:
- new Edge process;
- new temporary profile;
- same args + `--disable-gpu`;
- product root only;
- no `开始学习`;
- no source submit/topic;
- no microphone;
- no provider action.

Verify:
- target lives through bounded interval;
- expected title/basic DOM;
- loopback/local requests only;
- ledger unchanged;
- normal cleanup.

Any run failure stops immediately. Do not restart sequence until green.

## 7. Outcome handling

If H2 + all H3 runs PASS:
- return PASS evidence;
- do not modify global Edge hardware acceleration;
- do not edit product code;
- do not resume live experiment within this task;
- MASTER will decide whether to resume L1 with the isolated browser launched using `--disable-gpu`.

If H2 fails:
- return BLOCKED;
- do not try further GPU/sandbox flags;
- do not change driver/browser/OS settings.

## 8. Protected boundaries

No:
- provider/API/model list;
- microphone;
- topic/live workflow;
- old IndexedDB/owner profile;
- unknown process interaction;
- driver update/reinstall;
- Edge reset/reinstall;
- registry/group policy/hardware acceleration setting changes;
- `--disable-gpu-sandbox`;
- `--no-sandbox`;
- new dependency;
- product code modification;
- Git write/push/merge/reset/clean/rebase/amend.

Session artifacts only under Phase3B artifact directories.

## 9. Delivery

Return:
- canonical commit;
- H0–H3 results;
- exact Edge args for control and software probe;
- version/path;
- default control result;
- `--disable-gpu` blank result;
- 3 software-rendered product-root results if reached;
- stderr/process cleanup;
- local request summary;
- ledger before/after SHA/summary;
- provider=0, microphone=0, topic=0, exposure=0;
- final tracked CLEAN;
- Blocking / Unknown / User Decision Needed / Future Optional.

Stop for MASTER. Do not resume PHASE3B-LIVE-01.

## 10. Canonical trigger

```text
继续同一个项目，PHASE3B-LIVE-01 继续暂停。执行零调用 A/B 隔离：PHASE3B-GPU-ISOLATION-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录 canonical commit。

目录 F:\Chat-Codex-Handoff\validation-repo，branch prototype/study-teachback-v0.1，accepted HEAD dd8317b43100b8cbaad684cab7fc02957e32de62，tracked 必须 CLEAN，ledger lock absent。原 3-call/zero-retry/US$0.03432 live 授权继续冻结，本任务必须 provider=0、microphone=0、topic/live actions=0。

严格按 HANDOFF H0–H3。先最多做 1 次默认 GPU 的 fresh non-headless Edge + temp profile + loopback CDP + about:blank control，仅记录是否继续复现 GPU process failure，不重试。

然后用另一个 brand-new temp profile/process，以完全相同配置只额外增加 --disable-gpu，再跑 about:blank。禁止 --disable-gpu-sandbox、--no-sandbox、SwiftShader/ANGLE 额外 flags，也不要改 Edge/Windows policy、registry、hardware acceleration setting、driver。若 --disable-gpu blank target 仍失败，立即 BLOCKED 停止，不要继续加 flags。

只有 --disable-gpu blank target PASS 后，才启动本地 server，并用相同 --disable-gpu 配置在 3 个全新 Edge process/profile 中仅打开 product root。禁止点击“开始学习”、禁止创建 topic、麦克风、provider action。每次验证 target/title/basic DOM/local-only requests/ledger unchanged/正常 cleanup；任何一次失败立即停止。

不要碰之前 Access denied 的未知 Edge 进程，不要提权/强杀。返回 H0–H3、control 与 --disable-gpu exact args、Edge path/version、GPU/browser stderr、3 次 product-root 结果（若达到）、每次 cleanup、ledger before/after SHA、0 provider/0 microphone/0 topic/0 exposure、final tracked CLEAN、Unknown/Blocking。然后停下交 MASTER，不得在本任务内恢复 live Phase3B。
```

## 11. Classification

Ready:
- reversible command-line GPU isolation probe.

Paused:
- owner-authorized live experiment.

User Decision Needed:
- none.

Next step:
run the probe and return evidence to MASTER.
