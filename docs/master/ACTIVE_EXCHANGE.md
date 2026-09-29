# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: PROJECT-WIDE-REVIEW-01
task: PROJECT-WIDE-REVIEW-01
writer: CHAT_MASTER
transport_only: true

## Instruction

Perform the read-only project-wide review defined in the latest:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

First inventory the tracked project and state exactly what active project body you fully reviewed.

Read the active source/config/test/docs broadly enough to understand the actual product, retained handoff tooling, authority/state model, validation history and current accepted local baseline.

You are explicitly encouraged to make independent suggestions.

Classify all findings as:
- Must Fix
- User Decision Needed
- Future Optional

Also distinguish:
- Verified
- Likely
- Unknown

For every Must Fix, cite concrete file paths/symbols/evidence.

Do not automatically implement any suggestion.

Do not modify:
- product files
- tests
- runtime state
- CURRENT_STATE.md
- HANDOFF.md
- provider/budget/ledger
- product branch

Do not run provider/API calls or Phase3B.

Do not push/merge.

At completion, replace only this file with a CODEX_TO_CHAT review using the same turn_id.

Include:
- coverage manifest
- architecture map
- end-to-end product flow
- active vs stale/historical map
- strengths
- confirmed risks
- simplification/maintainability opportunities
- product suggestions
- exchange/handoff workflow assessment
- classifications
- evidence status
- recommended next smallest experiments
- no-change receipt

If external/current capability knowledge would materially affect a recommendation and you do not verify it, mark it `Needs MASTER freshness check`.

Use optimistic concurrency. If this exchange changed incompatibly after your read, stop rather than overwrite.

## Product identity

repo: BenCCCCCCCCC/Chat-Codex-Handoff
local_checkout: F:\Chat-Codex-Handoff\validation-repo
product_branch: prototype/study-teachback-v0.1
accepted_product_head: dd8317b43100b8cbaad684cab7fc02957e32de62

## Write authorization

For this turn only, you may update exactly:
`meta/master-state:docs/master/ACTIVE_EXCHANGE.md`

No other GitHub write is authorized.
