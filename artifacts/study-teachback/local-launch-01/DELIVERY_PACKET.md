# LOCAL-LAUNCH-01

Status: READY_FOR_MASTER_REVIEW
Base: 3a6137d9b39d8e2bdfef8e6366d9bceec7d01031
Branch: prototype/study-teachback-v0.1
Owner Validation: DEFERRED / NOT EXECUTED

Changed: repo-root Start-Study.cmd / Stop-Study.cmd; app launch.ps1 / launch-tests.ps1; README and this evidence. No backend/server/product code changed.

The launcher resolves its own path, identifies/reuses an existing configured server first, then checks Node/extractor/key only for new startup. It waits for real GET readiness before opening the exact loopback URL. A visible controlling window owns a new child; Enter/Ctrl+C cleanup or identity-checked recovery Stop is provided. Reuse acquires no ownership. Unknown port/process and stale PID state fail closed. No installs/system changes/secret persistence.

## Source-integrity review

Actual source assertions and WindowsPS51 parsing verify pure URL, pypdf.__version__, %~dp0, $_.Exception, Win32_Process and OPENAI_API_KEY. No Markdown/escaped underscore/tilde/comment pollution. Initial12/12 receipt retained; its prerequisite-before-reuse order was corrected after owner review. Final regression reuses a verified existing service even with caller Node, extractor and key simultaneously unavailable.

## Actual tests

Windows PowerShell5.1: 14/14 PASS (LAUNCH_TESTS.txt/json). Source parse/bytes; root and System32 CWD; missing Node/extractor/dependency/key; free-port startup/readiness/exact intercepted URL; timeout cleanup; unknown occupancy left alive; existing server reuse; missing caller prerequisites during reuse; launcher-owned recovery stop; stale PID refusal; no stop ownership for pre-existing server; ledger equality.

Fresh Node45/45 and extraction6/6 PASS. Edge NOT RERUN because only external launch scripts/docs changed; accepted R2 Edge27/27 remains historical, not a fresh result. Browser opening was intercepted at the OpenUrl boundary. Actual Explorer double-click/default-browser window, manual Ctrl+C/window-close UX and owner journey NOT RUN. Tests use actual child processes and recovery shutdown.

Provider calls/new paid product API: 0. Launcher has GET-only readiness and no provider endpoint operation; live ledger unchanged. Test credential was temporary in-memory non-secret text, never persisted or sent. Before/after: 37 requests, four unsettled reservations, known US$0.01179245, exposure US$0.06859995 / US$5, US$10 cash ceiling. Hash equality is in launch receipt; safe summary is in LEDGER_CHECK.json.

## Limits

Node is discovered through PATH, not bundled. Current test environment supplies it; Explorer's environment may differ. New starts need existing runtime/key configuration. No install/distribution claim.

Reuse currently requires the exact absolute server.mjs command-line path plus product GET signatures. Relative command lines/unverifiable ownership fail closed. Abrupt controller closure may require Stop-Study.cmd; stale ownership state requires inspection. Stopping cannot recall already-sent API requests.

Completed/Verified: bounded launcher and automated WindowsPS51 lifecycle. Unknown: Explorer/browser UI and owner journey. Must Fix: none observed in final tested scope; MASTER review pending. User Decision Needed: none in scope. Future Optional: broader manual lifecycle verification and distribution decisions. No venv/raw audio/files/secrets/profile/dynamic PID state included.
