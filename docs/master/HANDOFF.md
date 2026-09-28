# Active Handoff — Batch B Replay Correction 02 / B-REPLAY-GATE-02

Updated: 2026-09-28
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / SAME TASK / PRESERVE ALL CURRENT UNCOMMITTED WORK**

## 0. Authority and worktree binding

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

Expected HEAD:
`f06900fa9dcffd7768a1ec283715a50f6570832e`

HEAD is expected to remain at Batch A because Batch B and Correction 01 are intentionally uncommitted.

Preserve the entire current worktree:
- Batch B architecture changes;
- `diagnostic-localization*.mjs` and fixtures;
- Correction 01 replay changes;
- `replay-gate.test.mjs`;
- browser diagnostics and offline test routing.

Do not reset/clean/checkout/rebase/fetch/pull/amend.

Before editing:
- report HEAD and tracked modified/new file set;
- compare the current worktree against the delivered Correction 01 packet where practical;
- if material divergence exists, STOP and report rather than reconstructing by guess.

## 1. Task

**Task ID: B-REPLAY-GATE-02 / second Correction Packet for DIAGNOSTIC-LOCALIZATION-01.**

Correction 01 proved and fixed one production replay defect: genuine playback could be rejected when `timeupdate` cadence was sparse.

However the final unchanged browser stability gate still failed on run 2 after continuous natural playback to media end. Therefore Batch B remains blocked.

Goal:
identify and minimally fix the **residual replay completion/cancellation path**, then satisfy the unchanged Batch B/C4 acceptance gate.

This task does not reopen content/process architecture and does not authorize Phase 3B.

## 2. Known residual evidence

Failed final run trace:
- displayed replay target: approximately `0.0–0.8s`;
- play request at currentTime 0;
- play promise resolved;
- no later seek recorded;
- time progressed around `0.217224 -> 0.484476 -> 0.751277 -> 0.781`;
- native `played` range progressed continuously `[0, currentTime]`;
- media ended naturally at duration approximately `0.781`;
- button still did not become `已完整回听 ✓`.

The external trace does not contain the app's exact requested `end`, internal replay invocation state, coverage accumulator used by the corrected handler, continuity result or cancellation/completion reason. Do not claim an endpoint mismatch, epsilon bug, source replacement or event-order bug without new evidence.

## 3. Non-negotiable semantics

Preserve the original safety meaning:

- completion requires genuine played coverage of the requested interval with the existing bounded tolerance;
- seeking/jumping to the end cannot satisfy replay;
- historical/native played ranges from another invocation cannot be reused;
- stale callbacks/promises cannot complete a newer invocation;
- failed/rejected playback cannot mark heard;
- source/current-attempt replacement must fail closed;
- replay is not replaced by a checkbox, auto-confirm, skip or adaptive policy.

Do not lower the threshold or widen tolerance merely because the displayed duration is rounded.

## 4. D0 — internal state instrumentation and bounded reproduction

First add the smallest **test-only** replay decision observer.

It must be able to capture, for each replay invocation/event:
- invocation ID;
- requested start and exact requested end;
- attempt/blob identity check outcome;
- started state;
- currentTime;
- last;
- covered;
- native played ranges;
- genuine-continuity decision;
- seeking state;
- active/inactive state;
- event type;
- cancellation reason, if any;
- completion eligibility and final completion reason.

Preferred implementation:
- a test-only observer callback/hook enabled only by the isolated test environment, or equivalent non-user-visible test seam;
- no production console spam and no user-facing telemetry.

The observer must not alter replay decisions.

Reproduce the residual path with this observer. Use at most **three focused residual-reproduction attempts** on unchanged code. Do not run full suites repeatedly before the root cause is known.

If no residual failure can be reproduced in those bounded focused attempts, use the exact prior failing trace plus deterministic unit simulation to capture the suspected internal branch. If an evidence-backed second root cause still cannot be established, STOP as BLOCKED; do not edit production replay logic speculatively.

D0 result must state root cause #2 with direct internal-state evidence.

## 5. D1 — minimal second correction

Only after D0 establishes root cause #2:

- apply the smallest behavior-preserving fix;
- add a focused regression test that fails under the pre-fix condition and passes under the fix;
- retain all Correction 01 protections.

If the cause is numeric/endpoint comparison:
- use a mathematically bounded epsilon/normalization based on media/request precision, not UI rounding;
- do not materially enlarge replay tolerance.

If the cause is event/cancellation ordering:
- fix invocation state/ordering without making old handlers reusable.

If the cause is test harness only:
- change the harness only and prove production replay semantics are unchanged.

Do not redesign the player.

## 6. D2 — focused replay safety suite

Final focused replay tests must cover both Correction 01 and Correction 02 failure modes:

- sparse legitimate event cadence completes;
- natural end near requested endpoint completes when coverage is genuine;
- insufficient coverage does not complete;
- unplayed jump does not complete;
- seek invalidates;
- stale callback does not complete;
- late old play promise does not activate;
- rejected play does not complete;
- source/attempt replacement does not complete;
- new root-cause-specific regression passes.

## 7. D3 — Batch B browser E2E

On final code, the full browser suite must reach and pass:
`B3 local process confirmation requires replay, stores separate evidence and makes zero provider dispatches`.

Verify:
- pre-replay process confirm blocked;
- genuine replay accepted;
- exactly one process report persisted;
- duplicate confirm does not duplicate;
- reload/history preserves it;
- no knowledge status/sourceQuote leakage;
- content/process sections separate;
- fake-provider call count unchanged;
- test ledger unchanged.

## 8. D4 — final stability gate

After final code is frozen:

1. Full Node suite PASS.
2. Focused diagnostic suite PASS.
3. Focused replay safety suite PASS.
4. `git diff --check` PASS.
5. Full browser suite **three consecutive exact runs**, unchanged code/command, all PASS.
6. If any of the three browser runs fails, STOP. Do not restart the sequence or retry until green.
7. Zero-live-call receipts/guards remain valid.
8. Protected boundaries remain unchanged.
9. Only after all above pass: create one focused local commit containing Batch B + both replay corrections. No push/merge.

## 9. Protected boundaries

No:
- live ASR/Tutor/diagnosis/model call;
- physical microphone;
- provider/model change;
- retention/storage schema/origin/budget/pricing change;
- new dependency;
- PTE/pronunciation/emotion/personality scoring;
- broad replay UX redesign;
- reset/clean/amend/push/merge;
- Phase 3B.

Use isolated profiles, synthetic media, fake providers and test ledgers.

## 10. Delivery Packet

Return:
- Task ID and canonical commit.
- Root cause #2 with internal-state evidence.
- Exact pre/post replay logic delta.
- Repo/branch/base/final HEAD and commit status.
- D0–D4 mapping.
- Focused replay tests and fresh counts.
- Node + diagnostic fresh counts.
- All three final browser run results.
- B3 E2E persistence/zero-dispatch evidence.
- Zero-live-call evidence.
- Complete reviewable patch/new files.
- Tests Not Run / Unknown / Blocking / User Decision Needed / Future Optional.
- Confirmation no Phase 3B/push/merge.

## 11. Stop conditions

STOP if:
- current worktree diverges materially from the delivered Correction 01 packet;
- D0 cannot establish root cause #2 with bounded evidence;
- the only way to pass is to weaken replay semantics/tolerance without justification;
- live provider/user data might be touched;
- a new dependency or broad player redesign appears necessary;
- any of the three final browser stability runs fails.

## 12. Canonical short trigger

```text
继续同一个 Batch B Codex 任务，执行第二个 Correction Packet：B-REPLAY-GATE-02。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 分支最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。

保留当前 F:\Chat-Codex-Handoff\validation-repo、prototype/study-teachback-v0.1 以及所有未提交的 Batch B + B-REPLAY-GATE-01 改动；HEAD 仍应为 f06900fa9dcffd7768a1ec283715a50f6570832e。禁止 reset/clean/checkout/fetch/pull/amend 丢弃现有工作。

当前第一处 sparse-timeupdate replay bug 已经证实并部分修复，但最终稳定性 run 2 仍在自然连续播放到结尾后没有标记回听完成。不要猜第二个根因。严格按 HANDOFF D0–D4：先加最小 test-only replay 内部状态观察，记录 exact start/end、started、last、covered、played ranges、genuine、active、seeking 和 cancel/complete reason；用最多三次 focused reproduction 建立 root cause #2 证据，再做最小修正。

禁止降低 replay 覆盖要求、扩大容差来迁就 UI 四舍五入、自动打勾、seek 到结尾、跳过 replay。修完后必须通过 focused replay safety、Node、diagnostic，并在完全不改代码/测试的情况下连续三次完整 browser suite 全 PASS；任何一次失败就 BLOCKED 停止，不要重启三连跑直到偶然变绿。B3 浏览器持久化/刷新/zero semantic dispatch 也必须真正执行并通过。

继续保持 zero live product API、无真实麦克风、无模型/provider/retention/数据库 schema/预算/新依赖变化，不 push/merge，不进入 Phase 3B。完成后返回新的完整 review packet、root cause #2 evidence、diff、D0–D4 结果和所有未验证项，然后停下交 MASTER 审查。
```

## 13. Classification

Completed:
- Batch A accepted.
- Batch B architecture delivered/reviewed.
- Replay Correction 01 found and fixed one genuine production bookkeeping defect.

Blocked:
- Batch B overall acceptance.
- Replay reliability after Correction 01.

User Decision Needed:
- none.

Next smallest step:
send B-REPLAY-GATE-02 to the same Codex task; preserve current worktree; determine second root cause before any further production replay edit.
