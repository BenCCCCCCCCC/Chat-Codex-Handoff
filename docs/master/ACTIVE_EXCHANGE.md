# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: SETUP-FLOW-01-RELAY-RECOVERY-V2
task: SETUP-FLOW-01-RELAY-RECOVERY
writer: CHAT_MASTER
transport_only: true
original_turn_id: SETUP-FLOW-01
accepted_base_head: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

## Instruction

Do NOT redo SETUP-FLOW-01.

Recover the already-executed result from:
F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\setup-flow-01\meta-master-state\docs\master\ACTIVE_EXCHANGE.md
and the existing local worktree/artifacts.

Important clarification:
You ARE explicitly authorized and REQUIRED to write the recovered receipt to GitHub:
`meta/master-state/docs/master/ACTIVE_EXCHANGE.md`
using the authenticated GitHub connector.

This meta-branch transport commit is allowed and is NOT a product commit/push.

Do not commit/push/merge the product branch.
Do not modify CURRENT_STATE.md or HANDOFF.md.
Do not make new product/test changes.

Write CODEX_TO_CHAT with the full recovered SETUP-FLOW-01 result.

After writing:
1. read back ACTIVE_EXCHANGE from the resulting GitHub commit;
2. verify state=CODEX_TO_CHAT and this recovery turn_id;
3. verify full receipt content is present;
4. verify only ACTIVE_EXCHANGE changed on meta/master-state.

Only then report success.

If GitHub write/readback verification fails, report BLOCKED in Codex UI instead of claiming the relay completed.
