# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: BATCH-C-FINALIZE-01
task: BATCH-C-FINALIZE-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: dd8317b43100b8cbaad684cab7fc02957e32de62

## Instruction

Execute the final Batch C self-review/version-finalization task defined in the latest CURRENT_STATE.md and HANDOFF.md.

Host browser validation is now PASS outside Codex sandbox for the current unchanged Batch C worktree.

Evidence:
- focused correctness-boundaries 11/11 PASS
- full Node/offline 114/114 PASS
- git diff --check PASS
- host browser artifact:
  artifacts/study-teachback/correctness-boundaries-01/browser-1790650146813-0XtnC0
- browser wrapper exit 0
- MF-02 C2 delayed-diagnosis/double-confirm case PASS
- production ledger hash unchanged
- zero live provider/microphone

Use Astra/Codex proactively:
- independently review the full Batch C diff against MF-01/02/03 acceptance;
- identify edge cases or mistakes;
- rerun deterministic zero-call checks if useful;
- keep extra recommendations separate.

Critical rule:
If your self-review requires ANY product/test source change after the host browser PASS, do not finalize/commit using the old host result. Return NEEDS_HOST_REVERIFY with the exact reason/diff instead.

If no source/test change is needed:
- stage only the seven Batch C files;
- run git diff --check;
- create one focused local commit;
- no push/merge;
- write the final receipt back to this same ACTIVE_EXCHANGE.md.

Do not modify CURRENT_STATE.md or HANDOFF.md.
Do not resume Phase3B.
Use optimistic concurrency and stop on conflict.
