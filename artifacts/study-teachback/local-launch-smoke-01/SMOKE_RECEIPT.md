# LOCAL-LAUNCH-SMOKE-01

Status: PARTIAL
Base: a4a360d4e86a71db39213cb42baca29837b433bd
Branch: prototype/study-teachback-v0.1
Date: 2026-09-12
Canonical CURRENT_STATE: 8414951fdb31339ba6c4984c6677944520f33132
Canonical HANDOFF: 3bdb89e155f348c96fb4d028dc2aa0f987aa2b45

## Observations

- Before: accepted HEAD, tracked worktree clean, unrelated untracked files preserved; 4317 had no listener or launcher ownership state. Existing launch environment reported Node/key present and pypdf6.18.0 ready. No secret value inspected/output/persisted; no environment or settings modified.
- Actual Shell invocation: PASS. Windows PowerShell called System.Diagnostics.Process.Start with UseShellExecute=true, WindowStyle=Normal, WorkingDirectory=C:\Windows\System32 and the absolute repo-root Start-Study.cmd path. No internal launch.ps1 function was substituted. This uses the calling process environment; it does not prove Explorer mouse double-click/inheritance.
- At 08:53:44 UTC, actual Node listener and GET /api/status product characteristics (approved models and configured-key boolean) were observed. No learning endpoint was called. Polling did not observe a browser process carrying the exact URL. Read-only UI Automation found no visible product-titled browser window/address or directly identified launcher console. No clicks/keys were sent.
- By the recovery precheck, the observed server/shell and runtime ownership state had disappeared. The recovery guard refused to proceed with no ownership record. This is not evidence of Enter stop or recovery stop.
- One bounded repeat at 08:56:21 UTC put startup and recovery in the same smoke helper to rule out a cross-tool-lifetime explanation. It again observed the listener/product status, but by recovery precheck the ownership state was absent. Stop-Study.cmd was not invoked because there was no positively owned live server to stop. No further retry was performed.
- Final: 4317 listener count0; ownership state absent. No unknown/pre-existing process was stopped. The cause of early launcher/server exit is UNKNOWN; do not attribute it to Enter, Ctrl+C, browser failure or tool lifetime without evidence. No application/launcher code was changed to work around it.

Actual default-browser open: NOT RUN / not verified. The real entry was invoked, but neither exact browser request nor visible product window could be confirmed. This does not prove the browser failed to launch.
Actual normal Enter stop: NOT RUN (console not safely identified).
Recovery stop: NOT RUN (precheck stopped before invoking CMD because ownership state was gone).
Explorer double-click / Ctrl+C / window-close interaction: NOT RUN.

## Ledger and changes

Provider/model calls: 0. No file selection, upload, microphone, Learn, ASR or Diagnose action. Only local status checks. Ledger bytes before/after SHA256 both:
03C05453D3B9A1002DD17B69E6B73C9BE836BA6E11A247FE6E18DC9038104147

Before = after: requests37, attempts1, four unsettled reservations; known US$0.01179245, exposure US$0.06859995 / US$5; cash ceiling US$10. No reset/relabel/recharge.

README corrected to distinguish intended Enter/Ctrl+C/double-click behavior from actual observation, refer to this PARTIAL smoke, and state OWNER-DEFERRED / NOT EXECUTED instead of pending portability review. Stale source-entry button wording updated. No runtime logic modified; product regression suites not rerun for docs/evidence-only delta. Temporary smoke helpers/process metadata remain ignored in runtime, not committed. No screenshot of unrelated desktop/user data captured.

Must Fix: real default-browser/visible-console lifecycle remains unverified before end-user one-action launch can be claimed fully validated.
User Decision Needed: MASTER to classify the interactive-shell/bootstrap observation gap and choose a bounded follow-up; no installation or persistent configuration attempted.
Future Optional: later explicit interactive-desktop verification; no packaging/system setting expansion implied.
Owner Validation: OWNER-DEFERRED / NOT EXECUTED.
