# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: SETUP-FLOW-01-FINALIZE
task: SETUP-FLOW-01-FINALIZE
writer: CHAT_MASTER
transport_only: true
accepted_base_head: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

## Instruction

Finalize SETUP-FLOW-01 according to the latest CURRENT_STATE.md and HANDOFF.md.

Host browser validation has now PASSed outside Codex sandbox for the current unchanged worktree.

Host artifact:
artifacts/study-teachback/setup-flow-01/browser-1790660416802-ZP4imb

Before commit:
- inspect the host receipt directly;
- confirm exact PASS count and sourceSHA256 binding;
- independently self-review the full setup-flow diff;
- verify no post-host code/test drift;
- optionally rerun deterministic zero-call checks if useful.

Use Astra autonomy inside scope.

Critical rule:
If any product/test source change is made after the host run, do NOT commit using stale host evidence. Return NEEDS_HOST_REVERIFY with exact reason/diff.

If no post-host change is needed:
- stage only the nine SETUP-FLOW-01 files listed in HANDOFF;
- git diff --check;
- create one focused local commit;
- no push/merge;
- write CODEX_TO_CHAT back to this file;
- read back and verify relay success / sole changed meta path.

Do not resume Phase3B.
