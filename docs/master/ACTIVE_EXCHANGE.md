# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: EXCHANGE-RELAY-PROBE-01
task: EXCHANGE-RELAY-PROBE-01
writer: CHAT_MASTER
issued_at: 2026-09-29
transport_only: true

## Instruction

Validate the one-file GitHub relay only.

Read the latest:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`
- this `ACTIVE_EXCHANGE.md`

Then execute only the relay probe defined in HANDOFF.

Do not modify product code, tests, runtime, provider state, budgets, CURRENT_STATE.md or HANDOFF.md.

For this probe, you are authorized to update exactly this file on `meta/master-state`.

Replace this file with a `CODEX_TO_CHAT` receipt containing the required fields from HANDOFF and result `RELAY_WRITE_OK`.

If there is no safe authenticated GitHub write path, return BLOCKED in the Codex UI and do not improvise credentials.

If this exchange/meta state changes incompatibly after your read, fail closed instead of overwriting it.

## Product identity reference

repo: BenCCCCCCCCC/Chat-Codex-Handoff
local_checkout: F:\Chat-Codex-Handoff\validation-repo
product_branch: prototype/study-teachback-v0.1
accepted_product_head: dd8317b43100b8cbaad684cab7fc02957e32de62

## Boundaries

- no product changes
- no tests
- no provider/API calls
- no product push/merge
- no automatic PROJECT-WIDE-REVIEW-01 yet
