# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: REPLAY-REVIEW-UX-01-FINALIZE
task: REPLAY-REVIEW-UX-01-FINALIZE
writer: CHAT_MASTER
transport_only: true
accepted_base_head: bdd0635597006881d6f8f7213122ae53ccbc99a9

## Host evidence

Owner host browser validation PASSed outside Codex sandbox for the current uncommitted REPLAY-REVIEW-UX-01 bytes.

Owner screenshot confirms:
- all visible browser cases PASS
- wrapper exit 0
- error null
- production ledger before/after identical
- unchanged=true

## Finalization instruction

Read latest CURRENT_STATE.md and HANDOFF.md first.

Then:
1. inspect the fresh host artifact/receipt directly;
2. confirm exact browser case count and 0 failures;
3. confirm sourceSHA256 binding to the current worktree;
4. confirm no source/test drift after the host run;
5. perform project-aware final self-review of REPLAY-REVIEW-UX-01;
6. run git diff --check;
7. if no further source/test edits are needed, stage only the six authorized task files and create one focused local commit;
8. no product push/merge;
9. write full CODEX_TO_CHAT back to this remote ACTIVE_EXCHANGE and verify readback/sole meta path.

Expected files:
- study-teachback-app/app.mjs
- study-teachback-app/core.mjs
- study-teachback-app/index.html
- study-teachback-app/correctness-boundaries.test.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs

Critical:
if any source/test edit is needed after this host PASS, do not commit with stale evidence; return NEEDS_HOST_REVERIFY.

No live provider/API.
No recording.
No ASR.
No diagnosis.
