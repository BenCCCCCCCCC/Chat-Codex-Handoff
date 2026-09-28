# Active Handoff — Batch B Correction / REPLAY-GATE-01

Updated: 2026-09-28
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / SAME TASK / PRESERVE UNCOMMITTED B WORK**

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

Expected HEAD remains Batch A local commit:
`f06900fa9dcffd7768a1ec283715a50f6570832e`

Important: Batch B changes are intentionally **uncommitted**. Preserve them exactly. Do not reset/clean/checkout/rebase/fetch/pull to remove them.

Before editing, report:
- HEAD;
- tracked modified/new Batch B files;
- unrelated untracked artifacts;
- confirmation that the current worktree corresponds to the delivered Batch B patch.

If current tracked work no longer matches the delivered Batch B review bundle, STOP and report the divergence.

## 1. Task

**Task ID: B-REPLAY-GATE-01 / Correction Packet for DIAGNOSTIC-LOCALIZATION-01.**

This is a real Must Fix discovered during Batch B regression.

Goal:
diagnose and minimally resolve the repeated replay-completion failure so the existing full browser suite can complete and the already-written B3 native browser process-evidence persistence test can actually run.

This correction does **not** reopen B1/B2/B4 architecture scope and does not authorize Phase 3B.

## 2. Known evidence

The same check failed in:
- Batch B baseline browser after 18 passing checks;
- Batch B browser run after 24 passing checks;
- second Batch B browser run after 24 passing checks.

Failure:
`WAIT_FAILED document.querySelector('#transcript button').textContent.includes('✓')`

Test:
`diagnosis blocked before segment replay; correction keeps original identity and audio`

Batch A had previously observed one replay timeout followed by an exact 40/40 retry. The repeated Batch B failures upgrade this from a non-blocking unknown to an acceptance blocker.

Batch B did not modify the production `play()` function before this failure was observed, so do not assume B caused it.

## 3. Non-negotiable replay semantics

Do not make the suite green by weakening the safety gate.

A requested replay segment counts as complete only when the requested audio interval was genuinely played with the existing tolerance.

Must NOT count as complete merely because:
- currentTime was seeked/jumped near the end;
- the user/browser skipped a large interval;
- playback never successfully started;
- a stale event/callback from another replay fires;
- coverage is below the intended requirement.

Do not replace replay with a checkbox, automatic confirmation, or a new skip/adaptive policy.

## 4. C0 — focused reproduction and root cause

On the current uncommitted B worktree:

- use the existing zero-live-call wrapper/isolated Edge profile/synthetic saved audio;
- reproduce the failing replay check in a focused way where possible;
- collect bounded diagnostics for media state relevant to the failure (for example play promise/result, currentTime progression, timeupdate/playing/pause/ended/seeking events, requested interval, accumulated coverage and completion callback);
- identify whether the defect is:
  - production replay coverage bookkeeping,
  - headless/browser event timing,
  - test harness media control,
  - or another bounded cause.

Do not leave verbose debug logging in production unless it is genuinely needed product behavior. Diagnostic-only instrumentation may remain in test code only when useful and non-noisy.

C0 must end with an evidence-backed root-cause statement, not a guess.

## 5. C1 — minimal correction

Apply the smallest correction consistent with section 3.

If production `play()` / coverage bookkeeping is the root cause:
- make completion robust to legitimate browser event cadence;
- still reject seeks/skips/insufficient playback;
- ensure replay state is isolated per invocation and old handlers cannot complete a newer replay.

If the isolated test harness is the root cause:
- fix only the harness/media-driving logic;
- add a focused assertion proving production replay completion still requires genuine coverage.

Do not redesign the player or replay UX.

## 6. C2 — focused replay regression

Add/adjust deterministic coverage for at least:
- normal full requested-segment playback -> completion;
- insufficient playback -> no completion;
- seek/jump to end -> no false completion;
- new replay supersedes stale callback/state;
- rejected/failed play does not mark heard.

Use existing architecture where possible. Do not add a new media framework/dependency.

## 7. C3 — unblock Batch B native browser evidence

The full browser suite must reach and PASS the Batch B test:
`B3 local process confirmation requires replay, stores separate evidence and makes zero provider dispatches`.

Verify in the final browser run:
- confirmation before candidate replay is blocked;
- valid candidate replay then permits local process confirmation;
- exactly one process report persists;
- duplicate confirmation does not duplicate it;
- reload/history preserves it;
- process report contains no knowledge status or sourceQuote;
- content finding and process section remain separate;
- fake-provider call count does not increase;
- test ledger is unchanged by process confirmation.

Do not replace this with the existing VM/unit B3 test; both can coexist.

## 8. C4 — final stability/regression gate

On unchanged final code:

1. Run full Node suite -> PASS with fresh count.
2. Run focused diagnostic suite -> PASS with fresh count.
3. Run full browser suite **three consecutive times**, exact same code and command -> every run must complete PASS. No code/test change between these three runs.
4. `git diff --check` -> PASS.
5. Confirm zero live product/provider calls with the existing guard/receipts.
6. Confirm protected boundaries unchanged:
   - no provider/model switch;
   - no retention/storage schema/budget-cap change;
   - no new dependency;
   - no owner profile/audio;
   - no push/merge.

If any of the three consecutive browser runs fails at replay or another product-relevant assertion, return BLOCKED with evidence. Do not loop/retry until green.

## 9. Commit policy

Only after C0–C4 pass:
- create one focused local commit containing the delivered Batch B changes plus the minimal R07 correction;
- stage only the known Batch B/correction files;
- no push/merge/amend/reset.

If C0–C4 do not all pass, leave the worktree reviewable and do not create a false-success commit.

## 10. Delivery Packet

Return:
- Task ID and canonical commit read.
- Root cause and evidence.
- Repo/branch/base/final HEAD.
- Exact changed file list and complete patch/new files.
- C0/C1/C2/C3/C4 PASS/FAIL/BLOCKED mapping.
- Fresh Node/focused diagnostic counts.
- All three consecutive full-browser run counts/exits.
- Explicit B3 browser persistence/zero-dispatch evidence.
- Zero-live-call evidence.
- Tests Not Run / Unknown / Blocking / User Decision Needed / Future Optional.
- Confirmation no Phase 3B, push or merge.

Package the review evidence so MASTER can inspect it without local-path assumptions.

## 11. Stop conditions

STOP if:
- current uncommitted B work differs materially from the delivered review bundle;
- safe isolated replay reproduction cannot be established;
- the fix would require weakening replay confirmation;
- a live provider call occurs/is about to occur;
- owner data/credentials might be touched;
- a new dependency, model/provider/storage/retention migration, or broad player rewrite is required;
- unrelated work would be overwritten.

## 12. Canonical correction trigger

```text
继续同一个 Batch B Codex 任务，执行 Correction Packet：B-REPLAY-GATE-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 分支最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。

保持当前 F:\Chat-Codex-Handoff\validation-repo、prototype/study-teachback-v0.1 和现有未提交 Batch B 改动；HEAD 应仍为 f06900fa9dcffd7768a1ec283715a50f6570832e。不要 reset/clean/checkout/fetch/pull 丢掉 Batch B 工作。

只处理当前真实 Must Fix：重复出现的 replay-completion regression。按 HANDOFF C0–C4 先复现并用证据判断是 production replay bookkeeping 还是 headless/test harness 问题，再做最小修正。禁止通过降低覆盖要求、seek 到结尾、自动标记已回听、跳过 replay 等方式让测试变绿。

修正后必须让 B3 浏览器级过程证据保存/刷新/零 semantic dispatch 测试真正执行并通过；最终 Node 和 focused diagnostic 全绿，并在完全不改代码/测试的情况下连续三次执行完整 browser suite 都 PASS。继续保持 zero live product API、无真实麦克风、无模型/provider/retention/数据库 schema/预算/新依赖变化，不 push/merge，不进入 Phase 3B。

如果三次 browser 稳定性无法通过，就 BLOCKED 返回，不要反复重试到偶然成功。完成后返回新的完整 review packet、root-cause evidence、diff、C0–C4 结果和所有未验证项，然后停下交 MASTER 审查。
```

## 13. Classification

Completed:
- Batch B implementation delivered and reviewed.
- B1/B2/B4 accepted at scoped engineering/fixture level.

Blocked:
- Overall Batch B acceptance on R07 replay gate.
- B3 native browser persistence evidence not reached.
- B5 full browser regression.

User Decision Needed:
- none for this bounded correction.

Next smallest step:
owner sends the correction trigger to the **same Codex task**. Codex preserves current B work, resolves only R07, returns evidence, and stops.
