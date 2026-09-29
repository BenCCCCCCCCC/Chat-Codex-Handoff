# Active Handoff — SETUP-FLOW-01 RELAY RECOVERY v2

Updated: 2026-09-29
Role: 00 MASTER
Status: RECOVER EXISTING RESULT / REMOTE EXCHANGE WRITE EXPLICITLY AUTHORIZED

## 1. Do not re-execute SETUP-FLOW-01

The owner reports the original task was executed in a previous Codex chat.

A local draft receipt exists at:
F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\setup-flow-01\meta-master-state\docs\master\ACTIVE_EXCHANGE.md

Read that local receipt plus the current local worktree/artifacts only to recover what already happened.

Do not redo implementation or rerun tests merely to create a relay message.

## 2. Critical transport clarification

“Do not commit/push product” does NOT prohibit the exchange write.

For this recovery turn, Codex is explicitly authorized and required to update exactly:
`docs/master/ACTIVE_EXCHANGE.md`
on:
`meta/master-state`
using the authenticated GitHub connector / Contents API.

That write will create a GitHub meta-branch commit. This is expected and authorized transport behavior.

Not authorized:
- product-branch commit/push/merge;
- CURRENT_STATE.md or HANDOFF.md changes;
- any other GitHub path.

## 3. Required receipt

Write the recovered SETUP-FLOW-01 result as CODEX_TO_CHAT.

Include:
- original task result: COMPLETE / NEEDS_HOST_VERIFY / BLOCKED;
- exact local base/final HEAD and commit status;
- exact changed files;
- implementation summary;
- tests already run/results;
- zero-live-call evidence;
- provenance/setup-context evidence;
- whether host browser verification is required;
- self-review findings;
- Blocking / Unknown / User Decision Needed / Future Optional.

If local evidence is incomplete, say so. Do not fill gaps by reimplementation.

## 4. Required relay verification

After GitHub update:
- read back ACTIVE_EXCHANGE from the returned commit;
- verify same recovery turn_id and state CODEX_TO_CHAT;
- verify full receipt is present;
- verify the meta commit changed only ACTIVE_EXCHANGE.

Only then report relay success in Codex UI.

If connector write/readback/path verification fails, report BLOCKED and leave product state untouched.

## 5. Astra autonomy rule

For future execution tasks Astra may analyze, recommend, implement, test, self-review and iterate freely inside approved scope until acceptance passes.

Stop for MASTER on scope/risk boundaries, or if the same failure signature survives three meaningful fix/test cycles.

This recovery turn itself is evidence recovery only; do not use autonomy to reopen SETUP-FLOW-01 implementation.
