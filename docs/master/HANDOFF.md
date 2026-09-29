# Active Handoff — CORRECTNESS-BOUNDARIES-01 / Batch C

Updated: 2026-09-29
Role: 00 MASTER
Status: **DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO LIVE API / BOUNDED CORRECTION**

## 1. Binding

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Expected base HEAD:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Canonical authority:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

Transport:
- `meta/master-state/docs/master/ACTIVE_EXCHANGE.md`

Before editing:
- verify repo/branch/HEAD;
- tracked worktree must be CLEAN;
- preserve unrelated untracked artifacts;
- if identity/tracked state differs, STOP; do not reset/fetch/pull/rebase.

## 2. Task

**Task ID: CORRECTNESS-BOUNDARIES-01 / Batch C.**

Fix only MF-01, MF-02 and MF-03 from PROJECT-WIDE-REVIEW-01.

This is a correctness batch, not a refactor or feature batch.

Zero live product/provider API calls.

No physical microphone or Phase3B.

## 3. C0 — safe baseline / isolation

Use the accepted existing offline isolation:
- fake/stub providers;
- isolated test ledger;
- no usable persistent provider credentials in test subprocesses;
- outbound provider/network guard where already available.

Inspect affected code/tests first.

Run only safe applicable baseline/focused tests necessary to establish behavior.

Historical counts are context, not fresh evidence.

## 4. C1 — MF-01 Tutor/history contract

First reproduce with fake provider if practical:
- accepted Tutor output boundary 2500 / 2501 / 4000;
- store accepted assistant output;
- send a subsequent normal owner message;
- demonstrate current failure for an output accepted by `validateTeaching` but rejected as history.

Fix with the smallest explicit contract change.

Required properties:
- any Tutor output accepted and persisted by current product can be represented safely in the next Tutor request history;
- no silent provenance rewrite;
- no arbitrary hidden truncation that changes meaning without explicit contract;
- input-size budget remains bounded;
- current normal shorter messages unaffected.

If choosing a lower unified output ceiling, make the acceptance contract consistent at generation/runtime/UI and add boundary tests.
If choosing history handling, preserve deterministic bounded request size and message identity/meaning.

Do not change model/provider/pricing/caps.

## 5. C2 — MF-02 content-confirm concurrency

Reproduce with delayed fake diagnosis:
- one content confirm begins;
- before first diagnosis settles, trigger confirm again;
- verify pre-fix version/request/report inconsistency.

Fix by making the entire confirm -> correction version creation/save -> diagnosis dispatch operation mutually exclusive **before any mutation**.

Required:
- a repeated confirm while pending creates no new correction version;
- only one diagnosis dispatch;
- first result remains associated with the current version and visible;
- busy feedback/state is clear enough to avoid silent no-op ambiguity;
- edited transcript after pending finishes can create the next legitimate version;
- existing raw/corrected provenance and replay gate remain unchanged.

Do not solve by weakening latest-version validation.

## 6. C3 — MF-03 /api/status ledger error boundary

Use isolated fake/corrupt/unreadable ledger conditions only.

Reproduce a status summary/read failure without touching production ledger.

Fix so:
- `GET /api/status` returns a controlled fail-closed response/status;
- server process/request loop remains alive;
- provider work remains unavailable when budget state is unreadable/unknown;
- no ledger reset;
- no reservation release;
- no fabricated zero-usage summary;
- normal healthy status remains unchanged.

Do not change ledger schema/caps/pricing.

## 7. C4 — regression

Required focused coverage:
- MF-01 boundary accepted-output -> next-turn history;
- MF-02 delayed-provider double confirm;
- MF-03 status ledger failure plus subsequent server availability.

Also run relevant existing:
- Node/offline suite;
- provenance/correctness tests;
- applicable browser stub suite if the MF-02/UI behavior is browser-level and safe under existing isolation.

No real browser owner profile, no live provider.

If headless media flake unrelated to these paths appears, classify separately per current canonical strategy; do not edit replay code.

Run `git diff --check`.

## 8. Scope protection

Do not implement:
- portable synthetic WAV packaging;
- atomic ledger rewrite/recovery;
- retention changes;
- legacy helper cleanup;
- ASR/model migration;
- broad `app.mjs` refactor;
- exchange workflow changes;
- Phase3B.

No new dependency.

No push/merge/reset/clean/rebase/amend.

One focused local Batch C commit is permitted only if required tests pass and the diff is bounded.

## 9. Delivery / exchange return

At completion, update only:
`meta/master-state/docs/master/ACTIVE_EXCHANGE.md`
with `CODEX_TO_CHAT` for the same turn.

Include:
- canonical/exchange versions read;
- base/final HEAD and commit status;
- exact changed files;
- reproduction evidence for MF-01/02/03;
- fix summary;
- focused + regression commands/results;
- zero-live-call evidence;
- `diff --check`;
- Tests Not Run;
- Unknown;
- Blocking;
- User Decision Needed;
- Future Optional;
- confirmation no product push/merge and no Phase3B.

Do not change CURRENT_STATE.md or HANDOFF.md.

Use optimistic concurrency on ACTIVE_EXCHANGE and stop on conflict.

## 10. Stop conditions

STOP if:
- accepted base/worktree differs;
- safe zero-live-call isolation cannot be established;
- a fix requires provider/model/storage schema/retention/cap change;
- unrelated work would be overwritten;
- live provider/user data might be touched;
- scope expands beyond MF-01/02/03.

## 11. Classification

Authorized:
- bounded correction of MF-01/02/03;
- isolated zero-call regression;
- one focused local commit after passing evidence;
- one ACTIVE_EXCHANGE reply write.

Not Authorized:
- other suggestions from PROJECT-WIDE-REVIEW-01;
- live Phase3B;
- product push/merge.
