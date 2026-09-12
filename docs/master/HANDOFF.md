# Active Handoff — LOCAL-LAUNCH-01

Updated: 2026-09-12
Role: 00 MASTER
Status: **UI-UX-FOUNDATION-01R2 MASTER-ACCEPTED / LOCAL-LAUNCH-PREFLIGHT-01 PASS / LOCAL-LAUNCH-01 AUTHORIZED**
Owner Validation: **OWNER-DEFERRED / NOT EXECUTED**

## 0. Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current MASTER-accepted product SHA:
`3a6137d9b39d8e2bdfef8e6366d9bceec7d01031`

Read `docs/master/CURRENT_STATE.md` and this file from `meta/master-state`; do not switch the product worktree to the meta branch. Preserve unexpected work; no reset/clean/force.

## 1. Preflight decision

Freshness/collision research is complete. Selected route:

> **Repo-owned Windows one-action launcher**

Reasons:
- current product already works as a loopback Node app and uses browser APIs/IndexedDB/microphone on `http://127.0.0.1:4317`;
- keeping the same origin avoids storage/permission migration;
- Edge can install any site as an app, but that does not start this repo's Node/Python runtime;
- PWA/service-worker work does not remove the local-server requirement;
- Nativefier is archived/unmaintained;
- PWABuilder is active but targets PWA/store packaging, not this local Node+Python sidecar startup;
- Electron/Tauri/WebView2 add build/distribution/signing/runtime integration that is premature for the current single-owner alpha;
- ChatGPT Desktop/Codex built-in browser is useful for development/review but is not an end-user packaging/launch mechanism.

Primary current references are listed in CURRENT_STATE. No installer/native wrapper/public release is authorized here.

## 2. Goal

Reduce normal startup from manual repo/shell/server/URL steps to **one explicit launcher action**, while preserving fail-closed behavior and user control.

This task is about launch ergonomics only. Do not change learning UX, source ingestion semantics, model prompts, ASR behavior, persistence schema or budget logic.

## 3. In scope

Keep implementation small and repo-owned. Suggested shape, not mandatory file names:
- one PowerShell 5.1-compatible launcher;
- optional tiny `.cmd` double-click wrapper that invokes it without bypassing execution/security policy;
- focused launcher tests and README evidence.

A desktop-shortcut creation helper may be documented as future/optional, but **do not create a shortcut on the owner's Desktop or mutate Start/taskbar in this task**.

No external package manager or new framework dependency.

## 4. Required launcher behavior

### A. location / prerequisites

- Resolve repo/app relative to the launcher file itself, never by assuming current working directory.
- Work correctly when invoked from another directory, including `C:\Windows\System32` / a fresh PowerShell directory.
- Check `node` availability; if missing, fail closed with concise instruction. Never download/install Node.
- Check repo-owned extractor Python/pypdf readiness using existing environment/contract; if unavailable/wrong, fail closed. Never recreate/reinstall `.venv` automatically.
- Check only **presence** of `OPENAI_API_KEY` in the launch process. Never print, hash for UI, persist, copy to file, read `.env`, registry credential stores, browser profiles or ChatGPT/Codex internals.
- If the key is absent, fail closed and tell the operator to supply it through the already-approved environment mechanism. Do not invent secret storage in this spike.

### B. port/server ownership

Target remains exactly:
`http://127.0.0.1:4317`

- Probe whether the expected product server is already running.
- Positive identification must be stronger than “port responds”: use safe product/status characteristics sufficient to distinguish this server without exposing user data or secrets.
- If the expected server is already running, reuse it; do not start a duplicate.
- If port 4317 is occupied but product identity cannot be positively established, fail closed and return useful status. **Do not kill/rebind/steal the port.**
- Never kill an unknown process.

### C. startup and readiness

- Start the existing `node study-teachback-app/server.mjs`; do not create another server/backend.
- The server must remain visibly/user-controllably owned. A normal/minimized service console or another transparent bounded process is acceptable for this alpha; a hidden permanent daemon/service is not.
- Wait for actual readiness with a timeout before opening a browser.
- On startup failure/timeout, report a concise cause and leave no misleading “opened successfully” state.
- Do not send any Tutor/ASR/provider request as part of readiness.

### D. open target

- Open only `http://127.0.0.1:4317/` after readiness.
- Default browser is acceptable. Do not automate clicks, paste, send, mic permission or file selection.
- Do not require undocumented Edge command-line flags.
- Do not add PWA/service worker merely to create an app-shaped window.

### E. shutdown/recovery

- Provide a clear user-owned stop path for a process the launcher started.
- Stop logic must act only on positively identified/launcher-owned process state; stale PID/unknown-process cases fail closed.
- If reusing a server that existed before this launcher invocation, the launcher must not later claim ownership or stop it.
- Runtime launch state may live only in an already-ignored local runtime path; no tracked PID/session state and no secrets.

## 5. Security / product invariants

Preserve all currently accepted behavior:
- same exact loopback host/port/origin;
- no raw-file provider fallback/OCR;
- extractor environment and limits;
- original audio saved before ASR;
- strict segment/partial-word timing rules;
- replay/critical-ASR confirmation;
- raw/corrected transcript separation;
- content/delivery/remediation gates;
- history/export/delete/quota/pending-navigation/7-day cleanup;
- models only `whisper-1` + `gpt-5.6-luna`, semantic store=false;
- no recharge/model/provider switch.

No system-wide PATH/environment mutation, no ExecutionPolicy bypass, no registry writes, no Windows service/scheduled task/startup entry, no browser policy change, no `.env`, no browser-profile manipulation.

## 6. Tests/evidence

New paid product API calls allowed: **0**.

Use a temporary fake non-secret key only if a launch smoke needs `keyConfigured=true`; scope it to the test process and prove no provider call occurs. Never write it to disk or evidence.

Test at least:
1. PowerShell 5.1 parse/execution.
2. Invocation from repo root.
3. Invocation from unrelated/fresh CWD.
4. Missing Node -> fail closed, no install.
5. Missing/invalid repo-owned extractor env -> fail closed, no install.
6. Missing `OPENAI_API_KEY` -> fail closed without secret output.
7. Port free -> start expected server -> readiness -> exact URL open path.
8. Expected server already running -> reuse, no duplicate.
9. Port occupied by unknown process -> fail closed, no kill.
10. Startup timeout/error -> no browser-open success claim.
11. Launcher-owned shutdown works.
12. Reused/pre-existing server is never stopped by launcher cleanup.
13. Ledger before/after exactly unchanged; zero provider/model requests caused by launcher.
14. Existing Node/Edge/extraction product regressions remain green unless clearly unnecessary to rerun; if a suite is not rerun, say why.

Browser opening can be safely stubbed/intercepted for automated tests; include one actual Windows smoke only if it does not trigger paid calls or interfere with an unknown running server.

Track human-readable evidence under a new directory such as:
`artifacts/study-teachback/local-launch-01/`

Suggested evidence:
- `DELIVERY_PACKET.md`
- `LAUNCH_TESTS.txt` / structured receipt
- `LEDGER_CHECK.json`
- `CHANGE_MAP.md`
- `KNOWN_LIMITATIONS.md`

Do not commit secrets, raw owner data, `.venv`, browser profiles or dynamic PID state.

## 7. Explicitly out of scope

- Electron/Tauri/WebView2 wrapper;
- PWA service worker/offline cache;
- installer/MSI/MSIX/Store package;
- Node SEA/Python bundling;
- public hosting/deploy/release;
- code signing purchase;
- OS startup/background service/daemon;
- automatic shortcut creation on Desktop/Start/taskbar;
- auto-update;
- telemetry;
- new model/provider/API feature;
- OWNER-VALIDATION-01.

Any of those requires a later MASTER/owner decision supported by evidence.

## 8. Git policy

Standing authorization applies:
- normal fast-forward push only to `prototype/study-teachback-v0.1`;
- human-readable review evidence tracked;
- exact remote SHA returned;
- no merge/default-branch integration, force push, public release or unrelated push.

## 9. Return packet

Return exactly useful evidence, not a long narrative:

```text
Status: LOCAL-LAUNCH-01 READY_FOR_MASTER_REVIEW / BLOCKED
Remote branch: prototype/study-teachback-v0.1
Exact remote SHA: <sha>
Base: 3a6137d9b39d8e2bdfef8e6366d9bceec7d01031
Launcher entry: <path + normal user action>
Changed: <files>
Launch tests: <actual counts/commands>
Product regressions: <actual rerun/not-run>
Ledger before/after: <safe summary>
New paid product API calls: 0
Evidence: <tracked path>
Must Fix / User Decision Needed / Future Optional
Owner Validation: OWNER-DEFERRED / NOT EXECUTED
```

## 10. Current classification

Completed: LOCAL-LAUNCH-PREFLIGHT-01.
Verified: route comparison/current official facts/current source architecture.
Likely: thin launcher is the lowest-cost next productization step.
Unknown: current-machine one-action startup/reuse/shutdown UX until this task runs.
Not Done: LOCAL-LAUNCH-01, Owner Validation, any real installer/distribution.
Must Fix: none known before implementation.
User Decision Needed: none for this bounded launcher; native packaging/system startup/public distribution/new framework requires a new decision.
Future Optional: Edge site-as-app/manifest/icon, runtime bundling, Tauri/WebView2/Electron, desktop shortcut setup, external distribution.

## Next Smallest Step

**Execute LOCAL-LAUNCH-01 now, push only the bounded feature/evidence delta, then MASTER reviews the new delta. Do not begin installer/native-wrapper work.**
