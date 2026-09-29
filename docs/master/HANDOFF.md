# Active Handoff — SETUP-FLOW-01 FINALIZE

Updated: 2026-09-29
Role: 00 MASTER
Status: DISPATCHED THROUGH ACTIVE_EXCHANGE / ASTRA SELF-REVIEW + LOCAL COMMIT

## 1. Binding

Repo:
F:\Chat-Codex-Handoff\validation-repo

Branch:
prototype/study-teachback-v0.1

Base HEAD:
ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

SETUP-FLOW-01 changes are currently uncommitted.

## 2. Accepted evidence before finalization

Focused:
9/9 PASS.

Full Node/offline:
123/123 PASS.

Host browser outside Codex sandbox:
artifact:
artifacts/study-teachback/setup-flow-01/browser-1790660416802-ZP4imb

Owner-observed:
- setup source-only/context cases PASS;
- existing browser regressions PASS;
- isolation synthetic credential / loopback / test ledger;
- wrapper exit 0;
- production ledger unchanged.

Codex must inspect the receipt and confirm the exact total PASS count and source hash binding before final commit.

## 3. Final self-review

Astra should independently review the full SETUP-FLOW-01 diff for:
- source-only start;
- direct-paste auto title;
- file-import filename title;
- fallback title;
- optional focus/known metadata;
- setupContext persistence/reload;
- no setup context in role=user history;
- known is self-report, not mastery evidence;
- exactly one existing Tutor request, no extra call;
- legacy records/defaults remain compatible;
- existing provenance and Batch A/B/C behavior stay intact;
- no hidden model/provider/budget/retention/schema/dependency change.

Astra may rerun deterministic zero-call tests if useful.

## 4. Autonomy / correction rule

Astra may iterate freely inside SETUP-FLOW-01 scope.

If self-review finds no source/test change needed after the host run:
- stage only the SETUP-FLOW-01 files;
- run git diff --check;
- create one focused local commit;
- no product push/merge;
- return receipt through ACTIVE_EXCHANGE.

If Astra changes any product/test source after the host run:
- do not finalize using the old host evidence;
- return NEEDS_HOST_REVERIFY with the exact post-host change/reason;
- MASTER will arrange another host run.

Hard stop if the same failure signature survives three meaningful fix/test cycles or another scope/risk boundary is reached.

## 5. Commit scope

Expected files:
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/core.mjs
- study-teachback-app/index.html
- study-teachback-app/provenance.test.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/schemas.mjs
- study-teachback-app/server.mjs
- study-teachback-app/setup-flow.test.mjs

No blanket git add.

Suggested commit message:
feat: make learning setup source-first

No push/merge/amend/reset/rebase.

## 6. Exchange return

Write only meta/master-state/docs/master/ACTIVE_EXCHANGE.md.

Include:
- canonical/exchange versions read;
- host receipt exact case count/result and source-hash identity;
- self-review findings;
- whether any post-host code/test change occurred;
- tests rerun, if any;
- git diff --check;
- exact committed files;
- base/final HEAD;
- final tracked status;
- unrelated untracked preserved;
- zero live provider/microphone/exposure;
- no push/merge/Phase3B;
- extra recommendations separately.

Do not modify CURRENT_STATE.md or HANDOFF.md.
