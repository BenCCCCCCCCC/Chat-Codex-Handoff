# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: DOC-CLEANUP-PHASE3B-01
task: DOC-CLEANUP-PHASE3B-01
writer: CHAT_MASTER
transport_only: true
status: DISPATCHED / DOCUMENTATION_ONLY
accepted_base_head: aa240f8df5da2cf249b5cd6e9d09308a5ecd1947

## MASTER acceptance

REPLAY-REVIEW-UX-01 is accepted.

Accepted local product commit:
`aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`
`fix: make transcript replay optional for content diagnosis`

Acceptance basis from the completed CODEX_TO_CHAT receipt:
- host browser 52/52 PASS, 0 failures;
- 53/53 host sourceSHA256 entries matched before staging, before commit, and after commit;
- focused 36/36 PASS;
- full Node/offline 151/151 PASS;
- git diff checks PASS;
- exactly six authorized files;
- no post-host source/test drift;
- final tracked worktree clean;
- production ledger unchanged;
- no live provider calls / recordings / ASR / diagnosis during finalization;
- no product push/merge.

No further REPLAY-REVIEW-UX-01 work is requested.

## Approved task

Perform `DOC-CLEANUP-PHASE3B-01` only.

Goal:
reconcile current-facing documentation with the accepted current product state.

Required starting verification:
- repo: `F:\Chat-Codex-Handoff\validation-repo`
- branch: `prototype/study-teachback-v0.1`
- HEAD: `aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`

Inspect:
- root README;
- product README;
- other current canonical/entry-point docs that present current product status.

Correct stale current-facing claims where present:
- Phase 3B has completed;
- original Phase 3B live allowance is fully consumed;
- no further live calls are authorized;
- accepted HEAD is `aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`;
- transcript replay is optional for content diagnosis after explicit current-text confirmation;
- process-candidate confirmation still requires replay of that candidate;
- content/process evidence separation remains mandatory.

Preserve historical handoffs/snapshots when they accurately describe prior state.

## Acceptance criteria

1. documentation-only changes;
2. no product code/test changes;
3. targeted search identifies and resolves known stale current-facing Phase 3 / allowance / mandatory-replay claims in active entry docs;
4. historical evidence is not rewritten as if it were current;
5. `git diff --check` PASS;
6. one focused local documentation commit;
7. no live provider calls, recording, ASR, diagnosis, paid spend, push, or merge;
8. return CODEX_TO_CHAT with:
   - final local HEAD;
   - exact changed paths;
   - diff summary;
   - pre/post targeted search evidence;
   - checks run;
   - unresolved ambiguity / User Decision Needed if any.

## Out of scope

- any new product feature;
- product code or test edits;
- schema / retention / model / provider / budget changes;
- dependency/framework changes;
- live validation;
- product push/merge/public release;
- broad historical-document rewriting.

Reading/analysis may expand as needed to identify current-facing stale docs, but implementation scope must remain documentation-only.

If scope expansion becomes necessary, stop and return User Decision Needed.
