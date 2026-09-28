# Active Handoff — Replay Environment Probe 03 / B-REPLAY-ENV-03

Updated: 2026-09-28
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / SAME TASK / VALIDATION PROBE / FREEZE PRODUCT REPLAY LOGIC INITIALLY**

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

Expected HEAD:
`f06900fa9dcffd7768a1ec283715a50f6570832e`

Preserve all current uncommitted Batch B + Replay Correction 01 + Replay Correction 02 work. Do not reset/clean/checkout/rebase/fetch/pull/amend.

Before probe work:
- report HEAD and tracked modified/new file set;
- confirm the worktree matches the delivered Correction 02 packet materially;
- do not change production `app.mjs` replay behavior before the environment probe.

## 1. Task

**Task ID: B-REPLAY-ENV-03.**

Goal:
determine whether the residual early replay pause is a product/browser behavior reproducible in a representative normal Edge session, or a long-headless-suite/test-environment artifact.

This is a **validation probe**, not a third production replay correction.

## 2. Known evidence

Two evidence-backed replay defects are already corrected and must remain:
1. sparse `timeupdate` cadence no longer causes genuine coverage to be discarded;
2. gated replay uses the normalized WAV/diagnostic clock while preserving the original stored/exported Blob, eliminating compressed-container vs ASR time-coordinate mismatch.

Current deterministic replay safety: 10/10 PASS.

One complete final headless browser run: 46/46 PASS including B3.

Next unchanged long-headless run:
- saved archived-ASR replay requested [0, 6.460000038146973];
- normalized media duration 7.31;
- play promise resolved;
- active/started/identity/genuine true;
- media played only to 0.101635 then emitted native `pause`;
- ended=false;
- no app replay cancellation reason;
- gate correctly refused completion.

Do not make another production replay edit based only on this trace.

## 3. Probe environment

Use a fresh **non-headless Microsoft Edge** process and temporary isolated profile for each probe run.

Requirements:
- do not use the owner's normal Edge profile;
- no owner learning data or physical microphone;
- same local loopback fake-provider server/test ledger/network guard;
- no live provider/API call;
- keep `--autoplay-policy=no-user-gesture-required` only if already required, but the critical replay action must also be triggered by a trusted CDP pointer/input event rather than DOM `.click()`;
- do not hide/minimize/background the page in a way that intentionally invokes browser media throttling/suspension; an off-screen visible window is acceptable only if `visibilityState` stays visible and media remains active;
- record Edge version, page visibility/focus, relevant lifecycle state where accessible, media events and `__studyReplayObserver` internal events.

A test-harness-only mode/flag may be added if necessary. Do not modify product replay semantics.

## 4. E0 — targeted scenario

In each fresh browser/profile, run only the representative replay chain needed to answer the environment question:

1. Load isolated product with archived synthetic ASR/saved WAV fixture.
2. Open the saved attempt.
3. Confirm diagnosis is blocked before replay.
4. Trigger the transcript replay of the real saved-ASR segment (0 to ~6.46s) using trusted pointer/input.
5. Verify genuine native coverage and `已完整回听 ✓`.
6. Confirm content diagnosis can proceed with the fake provider.
7. Trigger the related local process candidate replay using trusted pointer/input.
8. Confirm/save one process evidence item.
9. Verify duplicate confirmation does not duplicate.
10. Reload/history and verify process evidence persists.
11. Verify fake-provider call count and test ledger do not increase for process confirmation.
12. Verify 内容理解 / 讲解过程 remain separate.

No full 46-case browser suite in E0.

## 5. E1 — three fresh representative runs

Execute E0 **three times**, each in a new Edge process and new isolated browser profile, unchanged product code and unchanged probe assertions.

Do not restart a failed three-run sequence until green.

Record for each run:
- exit/result;
- Edge version;
- profile/run ID;
- visibilityState / hasFocus around replay;
- requested interval, native duration, played range, currentTime;
- pause/ended events;
- internal replay completion/cancel reason;
- B3 persistence and zero-dispatch result.

If any run fails, stop after that failure and return evidence. Do not modify product replay logic in this task.

## 6. Interpretation and allowed outcome

### Outcome A — all three representative runs PASS

Return evidence that normal non-headless replay is stable under the targeted flow.

Do not change production replay code.

A test-harness-only change may:
- retain a dedicated fresh-browser replay integration mode;
- document that long headless native playback is a known test-environment reliability limitation;
- keep deterministic replay safety + targeted fresh-browser replay integration as the future gate.

If test-harness-only changes are needed, include them in the review packet. Do not commit yet unless MASTER explicitly authorizes after reviewing the probe.

### Outcome B — any representative run reproduces unexplained early pause

Return BLOCKED with full browser/internal trace.

Do not edit production replay logic during this probe.

State whether visibility/focus/lifecycle changed and whether the pause had any app cancellation path. MASTER will decide whether another product correction is justified.

## 7. Zero-call and protected boundaries

No:
- live ASR/Tutor/diagnosis/model access;
- physical microphone;
- owner profile/data;
- provider/model/retention/storage-schema/origin/budget/pricing change;
- new audio dependency;
- PTE/prosody/personality scoring;
- production replay tolerance/coverage change;
- push/merge/reset/clean/amend;
- Phase 3B.

Use synthetic/offline fixture audio and injected fake providers only.

## 8. Delivery Packet

Return:
- Task ID and canonical commit.
- Exact local identity and worktree preservation.
- Probe harness/test-only diff if any.
- Three run results or the first failed run under the stop rule.
- Full media/internal replay traces for the critical transcript replay and B3 candidate replay.
- visibility/focus/lifecycle evidence.
- zero-live-call evidence.
- interpretation: representative session stable vs residual browser/product issue reproduced.
- Tests Not Run / Unknown / Blocking / User Decision Needed / Future Optional.
- no product commit/push/merge unless separately authorized.

Package evidence for MASTER inspection without local-path assumptions.

## 9. Stop conditions

STOP if:
- current worktree differs materially from the delivered Correction 02 packet;
- a non-headless isolated Edge process/profile cannot be safely created without touching owner profile;
- probe requires production replay behavior modification;
- live provider/user data might be touched;
- any representative E1 run fails;
- a new dependency or broad harness rewrite becomes necessary.

## 10. Canonical short trigger

```text
继续同一个 Batch B Codex 任务，执行验证探针：B-REPLAY-ENV-03。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。

保持 F:\Chat-Codex-Handoff\validation-repo、prototype/study-teachback-v0.1、HEAD f06900fa9dcffd7768a1ec283715a50f6570832e，以及全部未提交 Batch B + Replay Correction 01/02 改动。禁止 reset/clean/checkout/fetch/pull/amend。

这次先冻结 production replay 逻辑，不要继续猜修。目标只是在更具代表性的 **non-headless Edge + fresh isolated profile** 中区分：残余 early pause 是长 headless suite 环境 flake，还是正常浏览器也会复现。

严格按 HANDOFF E0–E1：每次新建 Edge 进程/临时 profile，只跑 saved archived-ASR 0–6.46s replay + content confirm + B3 candidate replay/process persistence/zero-dispatch 链路；关键 replay 点击用 trusted CDP pointer/input，不用 DOM .click()。记录 visibilityState/hasFocus/lifecycle、native media events 和 __studyReplayObserver 内部状态。完全不改 product replay 行为，连续做三次 fresh representative run；任何一次失败立即停下返回，不重启三连跑直到偶然变绿。

继续 zero live product API、无真实麦克风、无 owner profile/data、无模型/provider/retention/数据库 schema/预算/新依赖变化、不 push/merge、不进入 Phase 3B。若三次都 PASS，只返回“代表性浏览器稳定 / headless 长套件限制”的证据与必要 test-harness-only diff；仍不要自行 commit 产品。若任何一次复现 early pause，就 BLOCKED 返回完整 trace，不要再修 production code。

完成后返回完整 review packet，然后停下交 MASTER 审查。
```

## 11. Classification

Completed:
- Batch A accepted.
- Batch B architecture reviewed.
- Replay Correction 01/02 found and fixed two evidence-backed replay defects.

Validation Needed:
- B-REPLAY-ENV-03 to classify the residual native early pause.

User Decision Needed:
- none.

Next smallest step:
send the environment-probe trigger to the same Codex task; preserve worktree; do not modify production replay logic.
