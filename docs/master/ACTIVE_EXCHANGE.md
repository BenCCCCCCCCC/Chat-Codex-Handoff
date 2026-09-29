# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: PROCESS-EVIDENCE-FEASIBILITY-01-PROJECT-AWARE-FINALIZE
task: PROCESS-EVIDENCE-FEASIBILITY-01-FINALIZE
writer: CHAT_MASTER
transport_only: true
accepted_base_head: ac875a100b159781037746ea0b8bd2188457d13a

## Instruction

Execute the latest HANDOFF as a project-aware Astra finalization turn.

Before finalizing, establish enough current project context to reason independently:
- read canonical CURRENT_STATE/HANDOFF/ACTIVE_EXCHANGE;
- verify repo/branch/HEAD/status;
- inspect root/product entry docs;
- inspect recent relevant git history;
- inspect current process-evidence implementation plus adjacent architecture/tests;
- expand repository reading scope whenever it helps validate assumptions or expose integration risk.

You have broad autonomy to analyze/explore the repository.

Important boundary:
broad reading/analysis does NOT automatically expand implementation scope.

Inside PROCESS-EVIDENCE-FEASIBILITY-01 scope you may self-review and iterate freely.

Outside-scope findings must be returned separately as Must Fix candidate / User Decision Needed / Future Optional / Project observations.

Host browser validation has PASSed for the current bytes.

Therefore:
- if no source/test change is needed, inspect host receipt/hashes and create one focused local commit;
- if any source/test change is needed after broader self-review, return NEEDS_HOST_REVERIFY instead of relying on stale host evidence.

Also verify the current project state recognizes that the real owner checkpoint already used one Tutor call and one ASR call; the remaining live call is held for content diagnosis.

No live API.
No live diagnosis.
No product push/merge.

Write the complete CODEX_TO_CHAT receipt back to this remote ACTIVE_EXCHANGE and verify readback/sole meta path.
