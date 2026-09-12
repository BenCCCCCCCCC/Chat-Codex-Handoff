# Active Handoff — LOCAL-LAUNCH-SMOKE-01

Updated: 2026-09-12
Role: 00 MASTER
Status: **LOCAL-LAUNCH-01 MASTER-ACCEPTED (ENGINEERING SCOPE) / REAL WINDOWS SHELL SMOKE NEXT**
Owner Validation: **OWNER-DEFERRED / NOT EXECUTED**

## Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current MASTER-accepted feature SHA:
`a4a360d4e86a71db39213cb42baca29837b433bd`

Read `docs/master/CURRENT_STATE.md` and this file from `meta/master-state`; do not switch the product worktree to the meta branch. Preserve unexpected work; no reset/clean/force.

## Accepted LOCAL-LAUNCH-01 evidence

MASTER reviewed only the delta from `3a6137d...` to `a4a360d...`.

Accepted at engineering scope:
- one normal descendant commit;
- repo-root `Start-Study.cmd` / `Stop-Study.cmd`;
- PowerShell launcher and focused tests;
- script-relative path resolution;
- exact loopback target `http://127.0.0.1:4317/`;
- safe existing-server reuse before new-start prerequisite checks;
- unknown port/stale process state fail closed without blind kill;
- readiness before browser-open boundary;
- identity-checked owned shutdown and no ownership of reused servers;
- no auto install/system policy mutation/background service/provider request;
- Windows PowerShell 5.1 **14/14 PASS**;
- Node **45/45 PASS**;
- extraction **6/6 PASS**;
- Edge not rerun because product runtime/UI/business code did not change;
- usage ledger hash unchanged and new paid product calls **0**.

Evidence:
`artifacts/study-teachback/local-launch-01/`

## Why another tiny smoke is needed

The original task explicitly allowed browser-open interception in automation. Therefore this is **not a launcher implementation failure**.

But the following end-user claims remain unverified:
- actual Windows Shell/Explorer-style invocation of `Start-Study.cmd`;
- actual default-browser opening to the product URL;
- actual visible console + Enter stop interaction;
- Ctrl+C/window-close lifecycle;
- whether the Shell environment currently contains all already-configured new-start prerequisites.

README currently speaks more strongly than the evidence on double-click/Ctrl+C and also contains an outdated Owner Validation reason. Reconcile the wording during this smoke; do not fabricate validation.

## LOCAL-LAUNCH-SMOKE-01 — bounded task

This is a **zero-provider, no-learning Windows launch smoke**, not OWNER-VALIDATION-01.

### Goal

Validate as much of the real user-facing Windows start/open/stop path as can be safely automated without touching learning data, microphone, files or provider/model APIs.

### Allowed

1. Confirm branch/HEAD/worktree/ledger and no unknown listener on port 4317 before starting.
2. Check only prerequisite presence/status needed to know whether the existing environment can launch; never expose secret values.
3. Invoke the actual root `Start-Study.cmd` through a real Windows Shell/ShellExecute/Explorer-equivalent path when safely possible, rather than calling only internal PowerShell functions.
4. Do **not** perform any Learn/ASR/Diagnose action.
5. Verify actual listener/product identity on `127.0.0.1:4317`.
6. Verify an actual default-browser request/window targets the exact loopback URL if that can be observed safely without changing browser settings.
7. If the visible launcher console can be safely controlled, exercise the normal Enter stop. If not, mark it NOT RUN and use `Stop-Study.cmd` only for launcher-owned recovery.
8. Verify the server is stopped afterward if and only if this smoke started/owned it; pre-existing verified servers must not be stopped.
9. Verify usage ledger before/after unchanged and provider/model requests caused by this smoke = 0.
10. Update README only to reflect evidence accurately:
   - do not state Explorer double-click/default-browser/CTRL+C as verified unless actually observed;
   - Owner Validation reason must say owner-deferred/not executed, not portability review pending;
   - Enter is the verified normal stop only if actually exercised; recovery stop remains identity-checked.
11. Track a compact human-readable smoke receipt. Normal fast-forward push to the same feature branch only if docs/evidence change.

### Stop / report instead of fixing automatically

Stop and return to MASTER if:
- port 4317 has an unknown owner;
- real Shell launch requires new persistent secret/configuration behavior;
- the current Shell environment lacks a required prerequisite and making it available would require persistent credential/config changes;
- an actual browser open would require changing defaults/policies;
- any provider/model request occurs unexpectedly;
- launcher ownership is ambiguous;
- system-level installation or policy mutation appears necessary.

Do not work around these by installing, storing secrets, editing registry/PATH/policies, killing unknown processes or adding a service.

### Explicitly out of scope

- real owner source file/microphone journey;
- live model request;
- new setup/credential persistence system;
- Edge/PWA app installation;
- manifest/service worker/offline cache;
- desktop shortcut creation;
- Electron/Tauri/WebView2;
- MSI/MSIX/Store/installer;
- system startup/background service;
- public distribution/release.

## Required return

```text
Status: LOCAL-LAUNCH-SMOKE-01 PASS / PARTIAL / BLOCKED
Branch: prototype/study-teachback-v0.1
Exact remote SHA: <sha or unchanged>
Base accepted SHA: a4a360d4e86a71db39213cb42baca29837b433bd
Actual Shell invocation: PASS / NOT RUN / BLOCKED
Actual default-browser open: PASS / NOT RUN / BLOCKED
Actual normal Enter stop: PASS / NOT RUN / BLOCKED
Recovery stop: PASS / NOT RUN
Provider/model calls: 0 / unexpected
Ledger before/after: <safe summary>
README correction: <yes/no + exact scope>
Evidence: <path>
Must Fix / User Decision Needed / Future Optional
Owner Validation: OWNER-DEFERRED / NOT EXECUTED
```

## Classification

Completed: LOCAL-LAUNCH-01 implementation and MASTER engineering acceptance.
Verified: automated lifecycle/fail-closed behavior and regressions listed above.
Unknown: real Shell/default-browser/control-window lifecycle and Shell prerequisite inheritance.
Not Done: this smoke; Owner Validation; packaging/distribution.
Must Fix: README evidence/status wording before calling one-action end-user launch fully verified.
User Decision Needed: none for this smoke; persistent bootstrap/installer/native/public distribution decisions stay with owner.
Future Optional: Edge install-as-app/manifest/icon only after real launch path is proven.

## Next Smallest Step

**Execute LOCAL-LAUNCH-SMOKE-01 now. Do not begin packaging/native-wrapper/PWA work.**
