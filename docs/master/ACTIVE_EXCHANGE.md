# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: PROCESS-EVIDENCE-FEASIBILITY-01-FINALIZE
task: PROCESS-EVIDENCE-FEASIBILITY-01-FINALIZE
writer: CHAT_MASTER
transport_only: true
accepted_base_head: ac875a100b159781037746ea0b8bd2188457d13a

## Instruction

Finalize PROCESS-EVIDENCE-FEASIBILITY-01 according to the latest CURRENT_STATE.md and HANDOFF.md.

Host browser validation now PASSed outside Codex sandbox for the current unchanged worktree.

Owner-observed host evidence:
- all displayed browser cases PASS
- new short-gap local replay/save/no-semantic-call case PASS
- wrapper exit 0
- isolated synthetic credential / loopback / test ledgers
- production ledger SHA unchanged

Before commit:
- inspect the host artifact receipt directly;
- confirm exact PASS count and sourceSHA256 binding;
- independently self-review the full diff;
- confirm no post-host source/test drift.

Critical rule:
if any product/test source change is required after host PASS, do NOT finalize with stale host evidence; return NEEDS_HOST_REVERIFY.

If no post-host change is needed:
- stage only the six files listed in HANDOFF;
- run git diff --check;
- create one focused local commit;
- no push/merge;
- write CODEX_TO_CHAT to this remote ACTIVE_EXCHANGE and verify readback/sole meta path.

Do not resume live owner diagnosis.
