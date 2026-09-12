# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED (ENGINEERING/UI SCOPE)**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

**LOCAL-LAUNCH-SMOKE-01 — AUTHORIZED / NOT YET EXECUTED**

**OWNER-VALIDATION-01 — OWNER-DEFERRED / NOT EXECUTED**

Active product: **知而能讲**, Windows local-Web Study-first + spoken teach-back alpha.

Current MASTER-accepted feature checkpoint:
`a4a360d4e86a71db39213cb42baca29837b433bd`

Feature branch:
`prototype/study-teachback-v0.1`

## LOCAL-LAUNCH-01 MASTER review

Git comparison confirms `a4a360d...` is one normal descendant commit ahead of the previously accepted `3a6137d...`.

Verified implementation:
- repo-root `Start-Study.cmd` and `Stop-Study.cmd`;
- `study-teachback-app/launch.ps1` plus focused launch tests;
- paths resolve from the launcher location rather than caller CWD;
- target remains exactly `http://127.0.0.1:4317/`;
- an already verified product server is reused before new-start prerequisite checks;
- unknown port owners and stale process state fail closed and are not killed blindly;
- new startup requires already-configured local prerequisites and performs no automatic installation/system configuration;
- readiness is confirmed before the browser-open boundary;
- launcher-owned shutdown is identity-checked; reused servers are not claimed or stopped;
- runtime ownership state is local/ignored and contains no learning data.

Verified evidence:
- Windows PowerShell 5.1 launcher suite **14/14 PASS**;
- repo-root and unrelated `System32` CWD paths PASS;
- missing prerequisite cases fail closed;
- free-port startup/readiness/open-boundary PASS;
- timeout cleanup PASS;
- unknown occupied port preserved PASS;
- verified existing-server reuse PASS, including reuse when the caller environment lacks new-start prerequisites;
- stale ownership refusal PASS;
- Node regression **45/45 PASS**;
- extraction regression **6/6 PASS**;
- Edge not rerun because product HTML/JS/server/business logic did not change; accepted R2 Edge27/27 remains historical evidence only;
- usage ledger before/after exactly unchanged;
- new paid product API calls **0**.

Tracked evidence:
`artifacts/study-teachback/local-launch-01/`

## Evidence boundary

The task contract explicitly allowed automated interception of browser opening, so the launcher is accepted at engineering scope.

Still **Unknown / not yet verified**:
- actual Windows Explorer/Shell double-click of `Start-Study.cmd`;
- actual default-browser window opening to the exact URL;
- actual visible console + Enter stop experience;
- Ctrl+C/window-close behavior;
- whether the Windows Shell environment currently carries all already-configured runtime prerequisites;
- live learning/model behavior when the server was started by this launcher.

No live learning/model request is needed for the next launch smoke.

README also contains stale/over-broad wording: it presents double-click and Ctrl+C as normal verified paths even though those were not manually run, and it still states an outdated reason for Owner Validation being paused. This is a documentation/evidence mismatch, not a launcher-code blocker.

## Product decision

**LOCAL-LAUNCH-01 = MASTER-ACCEPTED at engineering scope.**

No installer/native wrapper/PWA/service/background-daemon/store/public-release scope follows automatically.

## LOCAL-LAUNCH-SMOKE-01

Next smallest experiment: one real Windows Shell/default-browser smoke, with **0 provider/model calls** and no learning/file/microphone operation.

Allowed:
- invoke the real launcher through a Windows Shell/Explorer-equivalent path when safe;
- verify the actual server/port identity and default-browser target;
- verify the normal visible stop path when safely automatable, otherwise leave it Unknown and use the existing identity-checked recovery stop;
- verify usage ledger unchanged;
- correct README wording so it distinguishes verified automation from still-unverified manual shell behavior;
- track a small smoke receipt and push only that bounded docs/evidence delta if anything changes.

Do not install dependencies, alter OS/browser policy, add background services, package a native wrapper, or run a learning/model request.

If the real Shell path is blocked because the Shell environment lacks an already-configured prerequisite, return to MASTER as a product/bootstrap decision rather than silently persisting new configuration.

## Retained boundaries

All accepted source-ingestion, R3/R4, storage, budget and model boundaries remain unchanged. Owner Validation remains deferred and no real owner file/microphone journey has been executed.

## Classification

Completed: UI R2; launch preflight; LOCAL-LAUNCH-01 implementation and MASTER engineering review.

Verified: accepted SHA `a4a360d...`; launcher fail-closed/ownership behavior; PS5.1 14/14; Node45/45; extraction6/6; unchanged ledger; zero new paid calls.

Likely: the launcher reduces the current manual repo/shell/server/URL startup burden once the real Shell path is confirmed.

Unknown: real Explorer/default-browser/console lifecycle; owner journey; broader distribution/bootstrap.

Not Done: LOCAL-LAUNCH-SMOKE-01; OWNER-VALIDATION-01; installer/native packaging/public release/external validation.

Must Fix: no launcher-code blocker; README evidence/status wording must be reconciled before claiming the end-user one-action path is fully validated.

User Decision Needed: none for the zero-provider Shell smoke. New credential-persistence/bootstrap design, installer/native wrapper/system startup/public distribution still require owner decision.

Future Optional: Edge install-as-app/manifest/icon after the launch path is proven; broader AT/device testing; runtime bundling only when a real distribution need appears.

## Next Smallest Step

**Run LOCAL-LAUNCH-SMOKE-01 only. Do not start installer/native-wrapper/PWA work.**
