# Active Handoff — Batch B Finalization / B-FINALIZE-01

Updated: 2026-09-28
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / VERSION-FINALIZATION ONLY**

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

Current HEAD before finalization:
`f06900fa9dcffd7768a1ec283715a50f6570832e`

Preserve the current accepted uncommitted worktree containing:
- Batch B diagnostic localization changes;
- Replay Correction 01;
- Replay Correction 02;
- approved test-harness-only B-REPLAY-ENV-03 changes.

Do not reset/clean/checkout/rebase/fetch/pull/amend.

## 1. Task

**Task ID: B-FINALIZE-01.**

Goal:
create one focused **local** commit that freezes the already MASTER-accepted Batch B engineering state.

This is a version-finalization task only.

No new product behavior, test semantics, requirements or architecture changes are authorized.

## 2. Preflight

Before staging:
- report HEAD;
- report tracked modified/new files;
- report unrelated untracked artifacts separately;
- verify the accepted production/app source hashes and probe-harness diff still match the delivered B-REPLAY-ENV-03 bundle;
- verify no tracked file has changed since the accepted probe packet.

If accepted tracked content has drifted, STOP and report. Do not reconstruct/reset.

## 3. Allowed tracked files

Stage only the accepted Batch B/fix/probe files currently in the worktree.

Expected tracked/new product/test surface includes:
- `study-teachback-app/README.md`
- `study-teachback-app/app.mjs`
- `study-teachback-app/browser-tests-r4.mjs`
- `study-teachback-app/correctness-hygiene.test.mjs`
- `study-teachback-app/index.html`
- `study-teachback-app/provenance.test.mjs`
- `study-teachback-app/run-offline-tests.mjs`
- `study-teachback-app/server.mjs`
- `study-teachback-app/style.css`
- `study-teachback-app/diagnostic-fixtures.mjs`
- `study-teachback-app/diagnostic-localization.mjs`
- `study-teachback-app/diagnostic-localization.test.mjs`
- `study-teachback-app/replay-gate.test.mjs`

If the actual accepted tracked set differs, report exact diff against the accepted probe packet before staging.

Do not stage:
- `.codex/hooks.json`;
- `T09_LIVE_PACKET.txt`;
- historical artifact directories;
- owner data;
- review ZIPs;
- unrelated untracked files.

No blanket `git add .` or `git add -A`.

## 4. Final checks

Before commit:
- `git diff --check` must PASS;
- compare staged content to the accepted worktree/probe hashes;
- confirm no provider/model/retention/storage-schema/origin/budget/pricing/new dependency change beyond the already accepted Batch B scope;
- confirm no live provider calls or owner-data actions are performed during finalization.

No full validation suite needs to be rerun solely for version anchoring if the content is byte-identical to the accepted probe packet. If any content changes are required to make finalization possible, STOP and return to MASTER rather than editing.

## 5. Commit

Create one local commit only after all checks pass.

Suggested message:
`feat: separate diagnostic evidence and harden replay validation`

The exact message may be adjusted for clarity, but there must be only one focused Batch B finalization commit.

Do not push, merge, amend, reset or rebase.

## 6. Delivery receipt

Return:
- Task ID and canonical commit read;
- repo/branch/base HEAD/final commit SHA;
- exact staged/committed file list;
- `git diff --stat <base>..<final>`;
- `git diff --check` result;
- final tracked worktree status;
- unrelated untracked items preserved;
- confirmation that committed tracked bytes match the accepted pre-finalization state;
- confirmation: no new behavior/test-policy changes, no live product API, no push/merge;
- Tests Not Run / Unknown / Blocking / User Decision Needed / Future Optional.

Do not begin Phase 3B.

## 7. Stop conditions

STOP if:
- tracked content differs from the accepted B-REPLAY-ENV-03 state;
- an additional code/test behavior change appears necessary;
- staging would include unrelated files;
- owner data/secrets might be included;
- a push/merge/reset/amend would be required.

## 8. Canonical short trigger

```text
继续同一个 Batch B Codex 任务，执行版本固化：B-FINALIZE-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。

保持 F:\Chat-Codex-Handoff\validation-repo、prototype/study-teachback-v0.1 和当前所有已验收但未提交的 Batch B + Replay Correction 01/02 + B-REPLAY-ENV-03 worktree。HEAD 当前应为 f06900fa9dcffd7768a1ec283715a50f6570832e。禁止 reset/clean/checkout/fetch/pull/rebase/amend。

这一步只做版本固化，不允许新增或修改任何产品行为、测试语义、需求或架构。先核对当前 tracked bytes 与已验收的 B-REPLAY-ENV-03 包一致；若有漂移立即停下报告。

只 stage HANDOFF 明确列出的 Batch B/两次 replay 修复/批准的 test-harness 文件；不要 stage .codex/hooks.json、T09_LIVE_PACKET.txt、历史 artifacts 或其他 untracked 文件，禁止 git add . / git add -A。git diff --check 必须 PASS。

确认内容完全一致后创建一个 focused local commit（建议 message：feat: separate diagnostic evidence and harden replay validation）。禁止 push/merge。完成后返回 final commit SHA、完整 committed file list、base..final stat、diff-check、worktree status 和“无新行为变化/无 live API/无 push merge”确认，然后停下交 MASTER 审查。不要进入 Phase 3B。
```

## 9. Classification

Completed:
- Batch B engineering/validation acceptance.
- Environment probe accepted.

Pending:
- one local finalization commit as stable version anchor.

User Decision Needed:
- none for finalization.

Next smallest step:
send B-FINALIZE-01 to the same Codex task; commit the already-accepted state only; return the receipt and stop.
