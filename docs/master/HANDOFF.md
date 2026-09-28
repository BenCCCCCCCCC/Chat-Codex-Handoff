# Active Handoff — PHASE3B-BROWSER-STARTUP-01

Updated: 2026-09-29
Role: 00 MASTER
Status: **READY / ZERO PROVIDER CALLS / NO MICROPHONE / DO NOT RESUME LIVE FLOW**

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

Original PHASE3B-LIVE-01 authorization remains recorded but is **paused** during this diagnostic:
- maximum 3 provider calls;
- zero retries;
- incremental exposure ceiling US$0.03432.

This task must consume none of that allowance.

## 1. Known blocker

The previous live attempt passed L0 and had the source material available.

A fresh isolated Edge profile was launched before `开始学习` was clicked. Browser control returned:
`Target crashed`.

No topic creation, Tutor call, recording, ASR or diagnosis occurred.

Provider calls = 0.
Exposure increment = US$0.
Ledger SHA unchanged:
`d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

The service process was exited.

A later attempt to verify the isolated Edge process for cleanup returned `Access denied`. Its residual state is unknown. **Do not touch or kill that unknown process in this diagnostic.**

Existing task artifacts:
`artifacts/study-teachback/phase3b-live-01`

## 2. Task

**Task ID: PHASE3B-BROWSER-STARTUP-01.**

Goal:
diagnose the isolated Edge `Target crashed` event and establish a safe repeatable fresh-browser startup path for the accepted local product.

This is an environment diagnostic only.

Do not resume L1/live provider flow inside this task.

## 3. D0 — identity/evidence preservation

Before any new launch:
- confirm cwd / Git root / branch / HEAD;
- tracked worktree must remain CLEAN;
- confirm ledger lock absent and record ledger SHA/exposure;
- list existing files in `artifacts/study-teachback/phase3b-live-01`;
- do not delete/overwrite those existing artifacts.

If repo identity differs, STOP.

## 4. D1 — inspect the failed launch

Using only the current task/session artifacts and launcher/harness source/commands:
- identify Edge executable path and version used;
- record exact launch arguments;
- record temporary `--user-data-dir` path if known;
- record headless/non-headless mode;
- record remote-debugging/CDP configuration;
- record target/navigation timeline;
- capture any process exit code, stderr, crash message or CDP disconnect reason already available;
- determine the narrowest evidence-supported stage of failure:
  - browser process creation;
  - target creation;
  - navigation;
  - product-page load;
  - browser-control attachment.

Do not inspect owner Edge profile or unrelated system logs broadly.

If root cause is provable from existing evidence, report it. Otherwise explicitly say UNKNOWN.

## 5. D2 — fresh blank-target probe

Launch a **new non-headless Microsoft Edge process** with a **brand-new temporary isolated profile**.

Use the minimum safe arguments required for browser control. Do not reuse the prior profile.

First open only `about:blank` or an equivalent blank local page.

Verify:
- newly launched process is owned/identifiable by this task;
- browser target/CDP connection succeeds;
- target remains alive for a bounded observation interval;
- page is visible/non-headless;
- no owner profile is used;
- no external/provider request occurs.

Cleanup:
- close only the browser process/profile created by this probe using its known owned handle/PID/normal browser-control close path;
- if cleanup returns Access denied, do not escalate or kill; record and STOP before further probes.

If the blank target crashes, STOP and return evidence. Do not launch product/server.

## 6. D3 — local product-root probe

Only if D2 PASS.

Start the accepted local server only for local page loading.

Before launch, establish from code/config that simply loading the root page does not itself send Tutor/ASR/diagnosis requests.

Launch a new non-headless Edge process with a new temporary profile.

Navigate to the local product root only.

Do **not**:
- paste/click the learning source into a topic;
- click `开始学习`;
- create a topic intentionally;
- grant/use microphone;
- trigger any provider action.

Verify:
- target remains alive for a bounded interval;
- expected product title/root DOM exists;
- local/loopback requests only;
- fresh profile contains no historical owner topic;
- provider-call count/ledger unchanged.

Close only this newly launched owned browser process/profile normally.

If target crashes, collect bounded target/browser/server trace and STOP.

## 7. D4 — repeatability

If D3 PASS, repeat D3 **two additional times**, each with:
- new Edge process;
- new isolated temporary profile;
- same launcher/configuration;
- unchanged product code.

Total product-root startup probes = 3.

Any failure stops immediately. Do not restart the three-run sequence until green.

Record run IDs, Edge version, target lifetime/result, visibility/focus where useful, cleanup status and local request summary.

## 8. Protected boundaries

No:
- Tutor/ASR/diagnosis/model-list/provider access;
- microphone;
- `开始学习`;
- live topic workflow;
- old owner profile/IndexedDB inspection;
- interaction with the unknown Access-denied Edge process;
- privilege elevation;
- Windows/browser policy change;
- product/provider/model/retention/schema/budget change;
- new dependency;
- reset/clean/rebase/amend/push/merge.

Session/test artifacts may be added only under the Phase3B artifact area. Do not commit them.

## 9. Acceptance

PASS requires:
- D0 PASS;
- blank target survives and closes cleanly;
- local product root survives and closes cleanly in 3 fresh representative profiles/processes;
- no provider call/microphone/topic interaction;
- ledger unchanged;
- tracked worktree CLEAN;
- no interaction with owner profile or unknown residual process.

This task does not prove real L1/L2 success. It only clears the browser-start blocker.

## 10. Delivery receipt

Return:
- canonical commit read;
- D0–D4 mapping;
- exact Edge version/path and launch args;
- original failed-launch stage/root cause if proven;
- blank-target result;
- 3 product-root startup results if reached;
- cleanup result for each newly owned process/profile;
- note that prior Access-denied process was untouched;
- local request/network summary;
- ledger before/after SHA/summary;
- provider calls = 0;
- microphone = 0;
- topic creation/live actions = 0;
- session artifact files created;
- final tracked status;
- Blocking / Unknown / User Decision Needed / Future Optional.

Stop and return to MASTER. Do not resume PHASE3B-LIVE-01 in this task.

## 11. Canonical trigger

```text
继续当前同一项目，但先暂停 PHASE3B-LIVE-01，执行零调用环境诊断：PHASE3B-BROWSER-STARTUP-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录 canonical commit。

目录 F:\Chat-Codex-Handoff\validation-repo，branch prototype/study-teachback-v0.1，accepted HEAD 必须仍为 dd8317b43100b8cbaad684cab7fc02957e32de62，tracked clean，ledger lock absent。原 live 授权的 3-call / zero-retry / US$0.03432 额度保持冻结，本任务必须 0 provider calls、0 microphone、0 topic/live action。

按 HANDOFF D0–D4：先保留并检查已有 artifacts/study-teachback/phase3b-live-01 会话证据，记录上次 Edge executable/version/launch args/CDP/target timeline，能证明根因才下结论；不能就标 UNKNOWN。不要触碰上次那个 Access denied 的未知 Edge 进程，不要提权或强杀。

然后用 brand-new temporary isolated profile 启动一个新的 non-headless Edge：先只验证 about:blank/blank target 能稳定存活并正常关闭；通过后才启动本地 server、用另一 fresh profile 只打开 product root，禁止点击“开始学习”、禁止创建 topic、禁止麦克风和任何 provider action。product-root startup 在完全相同代码/配置下用 3 个独立 fresh Edge process/profile 验证；任何一次失败立即停下，不要循环到偶然变绿。

只允许 loopback/local 请求和 task-owned 临时 profile/session artifacts；不要读取 owner Edge profile/IndexedDB。每个新启动的 Edge 只用自己的已知 handle/PID/正常 close 路径清理，若清理 Access denied 就停止，不要 escalation/kill。

返回 D0–D4、Edge path/version/args、原 crash stage/root cause（若可证）、blank-target、3 次 product-root startup、每次 cleanup、local requests、ledger before/after SHA、0 provider/0 microphone/0 topic、artifact 清单、final tracked clean、Unknown/Blocking。然后停下交 MASTER，禁止在本任务内恢复真实 Phase 3B。
```

## 12. Classification

Ready:
- zero-call browser startup diagnostic.

Paused:
- owner-authorized PHASE3B-LIVE-01.

User Decision Needed:
- none for this diagnostic.

Next step:
send the canonical trigger to Codex; diagnose startup only; return to MASTER.
