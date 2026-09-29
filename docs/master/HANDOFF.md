# Active Handoff — PROJECT-WIDE-REVIEW-01

Updated: 2026-09-29
Role: 00 MASTER
Status: **DISPATCHED THROUGH ACTIVE_EXCHANGE / READ-ONLY PROJECT REVIEW**

## 1. Task

Codex performs a broad read-only review of the active project and returns its analysis through:
`meta/master-state/docs/master/ACTIVE_EXCHANGE.md`.

The task is analysis only.

No product implementation is authorized.

## 2. Required coverage

Before conclusions, inventory the tracked project and report review coverage.

Fully review the active project body:
- root active docs/config;
- `study-teachback-app/` source/UI/runtime modules/tests/helpers;
- retained `handoff-kit/` and related integration tooling;
- tracked workflow/project config such as relevant `.codex/` files;
- active tracked documentation outside generated artifact/raw-evidence directories;
- relevant recent Git history;
- latest canonical `CURRENT_STATE.md` and `HANDOFF.md`.

Do not spend time byte-reading every historical/generated artifact. List skipped path categories and reasons.

Do not claim complete project review if material active tracked files were not read.

## 3. Required analysis

Return:
- coverage manifest;
- architecture map;
- end-to-end product flow;
- state/authority map;
- active vs stale/historical file map;
- evidence-backed strengths;
- confirmed source/architecture risks;
- simplification/maintainability opportunities;
- product suggestions;
- GitHub exchange/handoff workflow assessment;
- Must Fix / User Decision Needed / Future Optional;
- Verified / Likely / Unknown;
- next smallest experiment recommendations.

Every Must Fix should cite concrete files/symbols/evidence.

Do not reopen already-fixed Batch A/B issues unless current accepted HEAD still contains a distinct unresolved problem.

## 4. Recommendation authority

Codex is explicitly encouraged to make suggestions.

However:
- suggestions do not become implementation scope;
- no code is changed;
- no tests are changed/run merely to implement a suggestion;
- no provider call;
- no Phase3B execution;
- no push/merge;
- no CURRENT_STATE/HANDOFF write.

Recommendations dependent on current external capabilities should be marked `Needs MASTER freshness check` unless verified.

## 5. Exchange return

Read the current `ACTIVE_EXCHANGE.md` and record its turn/version.

At the end, overwrite only that same file with:
- state = `CODEX_TO_CHAT`;
- same turn_id;
- task = `PROJECT-WIDE-REVIEW-01`;
- review coverage;
- full structured findings;
- classification;
- unknowns;
- recommended next steps;
- no-change receipt.

Use optimistic concurrency and fail closed on exchange conflict.

No other GitHub file may be changed.

## 6. Stop

After writing the review into ACTIVE_EXCHANGE, stop.

Do not auto-start a fix or Phase 3B.
