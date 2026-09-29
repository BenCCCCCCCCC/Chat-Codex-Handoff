# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: CORRECTNESS-BOUNDARIES-01
task: CORRECTNESS-BOUNDARIES-01
writer: CHAT_MASTER
transport_only: true
in_reply_to_commit: PROJECT-WIDE-REVIEW-01-receipt-on-meta
accepted_product_head: dd8317b43100b8cbaad684cab7fc02957e32de62

## Instruction

Execute only the bounded correctness task defined in the latest:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

Task: fix the three newly accepted Must Fix findings from PROJECT-WIDE-REVIEW-01:

1. MF-01 Tutor output/history length contract mismatch.
2. MF-02 repeated content confirmation can mutate transcript version while diagnosis is pending.
3. MF-03 GET /api/status ledger read failure lacks a controlled fail-closed boundary.

Requirements:
- verify local repo/branch/HEAD and tracked CLEAN first;
- reproduce each boundary in isolated zero-call tests where practical before fixing;
- make minimum behavior-preserving corrections;
- preserve Batch A/B behavior;
- use fake/stub providers and isolated test ledger only;
- run focused + applicable existing regression;
- no live provider/API;
- no microphone;
- no Phase3B;
- no retention/schema/cap/model/provider change;
- no unrelated refactor;
- no push/merge.

You may create one focused local Batch C commit only after the required evidence passes.

At completion, replace only this ACTIVE_EXCHANGE.md with a structured CODEX_TO_CHAT receipt for the same turn_id, including reproduction/fix/test/diff evidence and all unknowns.

Do not modify CURRENT_STATE.md or HANDOFF.md.

Do not implement any other project-wide review suggestion.

Use optimistic concurrency and fail closed on exchange conflict.
