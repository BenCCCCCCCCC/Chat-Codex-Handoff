# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED (ENGINEERING/UI SCOPE)**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

**LOCAL-LAUNCH-SMOKE-01 — PARTIAL / CLOSED AS EVIDENCE**

**LOCAL-LAUNCH-LIFECYCLE-DIAG-01 — AUTHORIZED / NOT YET EXECUTED**

**OWNER-VALIDATION-01 — OWNER-DEFERRED / NOT EXECUTED**

Active product: **知而能讲**, Windows local-Web Study-first + spoken teach-back alpha.

Feature branch: `prototype/study-teachback-v0.1`
Current remote feature state reviewed by MASTER: `074941a9072db4f56f04691fe51b9d9ed5194d64`.
Launcher implementation checkpoint: `a4a360d4e86a71db39213cb42baca29837b433bd`.

## LOCAL-LAUNCH-SMOKE-01 MASTER review

Git comparison confirms `074941a...` is one normal docs/evidence commit ahead of the accepted launcher checkpoint. No launcher/product runtime logic changed in the smoke delta.

Verified from the tracked smoke receipt:
- the actual root launcher was invoked through Windows Shell execution rather than by substituting an internal launcher function;
- a real Node listener and the expected local product identity were observed on `127.0.0.1:4317`;
- the smoke did not perform file selection, microphone, Learn, ASR or Diagnose actions;
- provider/model calls caused by the smoke = 0;
- usage ledger bytes before/after are identical;
- no unknown/pre-existing process was stopped;
- README now distinguishes intended launcher behavior from what was actually observed and marks Owner Validation as deferred/not executed.

Not verified:
- actual default-browser window/request to the product URL;
- actual visible launcher console lifecycle;
- actual Enter / Ctrl+C / window-close stop path;
- Explorer mouse double-click specifically.

Critical new observation:
- in two bounded Shell launches, the listener/product became available, then the launcher/server/ownership state disappeared before a recovery stop could be exercised;
- the cause is **UNKNOWN**. Do not attribute it to user input, browser failure, the automation host or launcher code without evidence.

This means the smoke is useful evidence but not a PASS for end-user one-action launch. It also does not yet prove a launcher code defect.

## Product decision

Do **not** start installer, native wrapper, PWA/service-worker, shortcut-installation or system-startup work.

Do **not** immediately rewrite the launcher based on an unknown cause.

Run one bounded, no-product-change lifecycle diagnosis to distinguish:
1. a noninteractive/closed console-input condition in the automation Shell environment;
2. a real launcher/process lifecycle defect;
3. an inconclusive environment boundary.

## LOCAL-LAUNCH-LIFECYCLE-DIAG-01

Goal: explain the early launcher/server exit with the smallest safe experiment.

Authorized:
- temporary ignored diagnostic helpers/process metadata only;
- observe real process tree, exit timing/status, launcher ownership-state create/remove timing and port readiness;
- run a tiny temporary console-input probe through the same Windows Shell execution style to determine whether console input is interactive/redirected/closed and whether a Read-Host-style wait returns immediately;
- use the real launcher at most one additional bounded time if required by the diagnosis;
- no UI clicks or keystrokes are required;
- no learning/file/microphone operation and no provider/model request;
- usage ledger must remain byte-identical;
- track only sanitized diagnostic conclusions/evidence;
- correct the remaining README sentence that says the localhost page should only be opened after Owner Validation resumes; local launch is already an accepted engineering capability even though Owner Validation itself remains deferred.

Not authorized:
- changing launcher/product runtime logic during diagnosis;
- installing/configuring runtimes;
- changing OS/browser settings;
- creating persistent startup/background services;
- native packaging, PWA/service worker or installer;
- repeated trial-and-error retries.

Decision rule after one diagnosis:
- **Environment-limited confirmed:** close the launch smoke gap as automation-limited, keep launcher code unchanged, defer actual Explorer/browser/Enter UX to future owner/manual validation, then move to the next productization preflight.
- **Launcher defect supported by evidence:** return a concise Must Fix and define one bounded correction; do not patch during diagnosis.
- **Inconclusive:** stop; do not keep probing. Preserve the launcher as engineering-accepted but end-user lifecycle unverified.

## Retained engineering state

R2 UI remains accepted. LOCAL-LAUNCH-01 remains accepted at engineering scope: PowerShell 5.1 launcher suite 14/14 PASS, Node45/45, extraction6/6, existing R2 Edge evidence retained, ledger unchanged, zero paid product calls. All source-ingestion, ASR/replay, remediation, storage/history/delete and budget guards remain unchanged.

No external-user/release claim follows. Owner Validation remains deferred.

## Classification

Completed: UI R2; launch preflight; launcher implementation; first real Shell smoke and README evidence correction.

Verified: real Shell invocation reached the expected local product; zero provider/model calls; unchanged ledger; normal Git lineage.

Likely: current smoke environment may not reproduce a normal interactive Explorer console, but this is only a hypothesis until the bounded diagnostic runs.

Unknown: cause of early launcher/server exit; real default-browser and interactive-console UX; real owner learning journey.

Not Done: lifecycle diagnosis; actual Explorer/default-browser/Enter validation; OWNER-VALIDATION-01; packaging/distribution.

Must Fix: no proven launcher-code defect yet. Do not claim end-user one-action launch fully validated.

User Decision Needed: none for the bounded diagnosis. Persistent bootstrap/credential design, installer/native wrapper, OS startup or public distribution still require owner decision.

Future Optional: true manual desktop smoke, Edge install-as-app/manifest/icon, broader packaging only after a real need.

## Next Smallest Step

**Execute LOCAL-LAUNCH-LIFECYCLE-DIAG-01 only. Do not modify production launcher logic during this diagnostic.**
