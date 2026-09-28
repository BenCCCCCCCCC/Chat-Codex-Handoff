# Current State

Updated: 2026-09-29 — GPU bypass failed; Edge policy/minimal-launch decomposition next
Role: 00 MASTER / authoritative dynamic state

## 1. Current status

**Batch A:** MASTER-ACCEPTED.

**Batch B / Phase 3A:** MASTER-ACCEPTED and finalized locally at:
`dd8317b43100b8cbaad684cab7fc02957e32de62`.

**PHASE3B-LIVE-01:** OWNER-AUTHORIZED but PAUSED before first provider call / recording.

**PHASE3B-BROWSER-STARTUP-01:** BLOCKED at fresh `about:blank` Edge startup.

**PHASE3B-GPU-ISOLATION-01:** BLOCKED — `--disable-gpu` did not avoid the same fatal startup path.

**PHASE3B-EDGE-MINIMAL-LAUNCH-01:** BLOCKED before Edge start because the Codex process could not create the requested dedicated profile directory under `%LOCALAPPDATA%`.

**PHASE3B-HOST-BROWSER-SMOKE-01:** READY / OWNER MANUAL ACTION / OUTSIDE CODEX SANDBOX / ZERO PROVIDER CALLS.

**PHASE3B-EDGE-MINIMAL-LAUNCH-01:** READY / NOT DISPATCHED / ZERO PROVIDER CALLS / ZERO MICROPHONE / READ-ONLY POLICY CHECK + REVERSIBLE FRESH-PROFILE LAUNCH ONLY.

Original live authorization remains fully unused:
- max 3 provider calls;
- zero retries;
- incremental local exposure ceiling US$0.03432;
- one recording maximum.

## 2. GPU isolation receipt

Codex read canonical commit:
`067b25ffe6da3e2cdb6523a9126ce7c8beea6881`.

Repo identity remained correct and tracked CLEAN.

H1 default-GPU control:
- FAIL;
- fresh non-headless Edge;
- fresh temporary profile;
- loopback CDP blank target;
- target/CDP created then `Page.enable` timed out;
- GPU subprocess repeatedly exited `-1073741790`;
- stderr: `GPU process isn't usable. Goodbye.`;
- main browser exited.

H2 same configuration plus `--disable-gpu`:
- FAIL in the same general startup path;
- same GPU-process exit value and fatal message.

H3 product-root probes:
- not run because H2 failed.

Provider = 0.
Microphone = 0.
Topic/live actions = 0.
Incremental exposure = US$0.
Ledger SHA unchanged:
`d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

No system settings, drivers, policies or extra sandbox flags were changed.

## 3. Interpretation

The evidence rules out the simple hypothesis that hardware GPU acceleration alone is sufficient to explain/avoid the startup failure.

Do not infer that the graphics driver is the root cause.

Observed GPU subprocess exit `-1073741790` maps to Windows status `0xC0000022` (ACCESS_DENIED), but the denied object/path/policy remains unknown.

The next diagnostic must decompose browser startup rather than add more GPU flags.

## 4. Current official Edge/Chromium constraints relevant to the next diagnostic

Microsoft Edge UserDataDir policy documentation states that when the policy is enabled, Edge uses the policy-specified data directory regardless of the command-line `--user-data-dir` value. Therefore the prior launch argument alone is not proof that the effective runtime profile was the intended temporary directory.

Microsoft Edge RemoteDebuggingAllowed policy can allow or block remote debugging.

Current upstream Chromium security behavior requires remote debugging to use a non-default data directory; using a custom isolated user-data directory is the recommended debugging pattern.

Microsoft/Chromium documentation supports creating separate user-data directories for development/debugging. A dedicated fresh directory under the current user's local application-data space is a supported pattern; do not point to the owner's existing Edge User Data directory.

Decision:
- first inspect the relevant Edge policy values read-only;
- then decompose launch from minimum browser process -> remote-debugging target;
- use a dedicated fresh probe directory under `%LOCALAPPDATA%` rather than a temp-directory-only assumption;
- do not touch the owner/default Edge profile;
- no policy or registry writes.

## 5. PHASE3B-EDGE-MINIMAL-LAUNCH-01 goal

Answer, in order:

1. Is an Edge policy overriding user-data-dir or remote debugging?
2. Can a minimal fresh-profile Edge process stay alive without CDP?
3. If yes, does adding remote debugging introduce the failure?
4. If both pass, can the product root load safely under the same minimal browser configuration?

This is an environment decomposition probe only.

## 6. Diagnostic sequence

### M0 — identity / ledger / evidence
Confirm:
- accepted HEAD `dd8317b...`;
- tracked CLEAN;
- ledger lock absent;
- ledger SHA/exposure unchanged;
- prior Phase3B startup/GPU artifacts preserved.

### M1 — read-only Edge policy inspection
Read only the relevant Microsoft Edge policy values from both current-user and local-machine policy locations, where present:
- `UserDataDir`;
- `RemoteDebuggingAllowed`.

Also report whether the effective Edge executable is the stable channel path already observed.

Do not:
- write registry/policy;
- enumerate unrelated policy trees;
- read owner profile contents.

Interpretation:
- if `UserDataDir` is set, report its value/path semantics but do not open that directory;
- if `RemoteDebuggingAllowed=0`, remote debugging is policy-blocked; STOP after reporting because bypassing policy is not authorized;
- if values are absent/default-allow, continue.

### M2 — minimal no-CDP browser process
Create a brand-new dedicated isolated directory under the current user's local app data, for example:
`%LOCALAPPDATA%\ChatCodexPhase3B\edge-probe-<run-id>`.

This must not be under or inside the owner's normal `%LOCALAPPDATA%\Microsoft\Edge\User Data` tree.

Launch non-headless Edge with the smallest safe args:
- `--user-data-dir=<new dedicated directory>`;
- `--no-first-run`;
- `--no-default-browser-check`;
- `about:blank`.

Do NOT include:
- remote-debugging flags;
- proxy/host-resolver blocking flags;
- `--disable-background-networking`;
- GPU/sandbox flags.

Observe for a bounded interval using the process handle only:
- process remains alive;
- exit code if it exits;
- stderr if available.

Do not automate/page-control the browser in M2.

Close only this task-owned process normally.

If M2 fails with the same GPU fatal exit, STOP. This places the blocker below CDP/product harness.

### M3 — minimal CDP browser process
Only if M2 PASS.

Use another new local-app-data isolated directory.

Launch the same minimum args plus:
- `--remote-debugging-address=127.0.0.1`;
- `--remote-debugging-port=0`.

No proxy/host-resolver/background-network flags yet.

Open about:blank.

Verify:
- DevToolsActivePort/CDP endpoint;
- target creation;
- `Page.enable`;
- bounded target lifetime;
- clean close.

If M3 fails while M2 passed, classify the failure as introduced by the remote-debugging/control path or its interaction with policy/runtime; STOP. Do not add other flags.

### M4 — minimal product-root probe
Only if M3 PASS.

Start local product server after confirming root load alone does not dispatch provider requests.

Use a new local-app-data isolated profile with the M3 minimum CDP config.

Open product root only.

No source submit/topic/Tutor/ASR/diagnosis/microphone.

Run up to three fresh product-root startups, each a new process/profile, same code/config. Any failure stops.

Verify:
- target/title/basic DOM;
- bounded survival;
- ledger unchanged;
- no provider call;
- normal task-owned cleanup.

Do not require zero Microsoft/browser background traffic in this diagnostic because the proxy/host-resolver blocking flags are intentionally removed to isolate startup behavior. Instead record any observed network endpoints at a high level and confirm that no OpenAI/provider endpoint is contacted.

## 7. Protected boundaries

No:
- provider/model API;
- microphone;
- topic/live workflow;
- old owner Edge profile/IndexedDB;
- policy/registry writes;
- owner default profile path access;
- driver/Edge reinstall/reset;
- sandbox bypass flags;
- GPU flags;
- privilege elevation;
- unknown process interaction;
- new dependency;
- product code modification;
- Git write/push/merge/reset/clean/rebase/amend.

Probe profile/artifacts may be created only in the dedicated probe path/artifact area.

## 8. Outcomes

### Outcome A — M2 fails
Minimal Edge with a fresh local-app-data profile fails even without CDP. Keep live test blocked. Browser/system environment is the current blocker; do not continue harness experiments automatically.

### Outcome B — M2 passes, M3 fails
The remote-debugging/control path or relevant Edge policy/runtime interaction is the blocker. Return evidence. Do not attempt policy bypass.

### Outcome C — M2/M3/M4 pass
A stable minimum browser-control path exists. The prior aggressive/offline launch configuration or temp-profile environment was part of the failing condition. Return to MASTER; do not resume live test inside this task.

## 9. Delivery receipt

Return:
- canonical commit;
- M0–M4 mapping;
- exact registry/policy locations and relevant values only;
- Edge executable/version;
- dedicated probe profile root used;
- exact M2/M3 launch args;
- M2 process result;
- M3 CDP/Page.enable result;
- M4 product-root runs if reached;
- stderr/exit comparison;
- high-level observed network endpoints if available, explicitly whether any OpenAI/provider endpoint appeared;
- cleanup result for task-owned processes/profiles;
- ledger before/after SHA;
- provider 0 / microphone 0 / topic 0 / exposure 0;
- final tracked CLEAN;
- Blocking / Unknown / User Decision Needed / Future Optional.

Stop for MASTER.

## 10. Classification

Completed:
- Batch A/B;
- Phase3B preflight/source recovery;
- startup probe;
- GPU bypass A/B.

Ready:
- policy/minimal-launch decomposition.

Paused:
- owner-authorized PHASE3B-LIVE-01.

User Decision Needed:
- none for this zero-call diagnostic.

## 11. Next smallest step

Execute PHASE3B-EDGE-MINIMAL-LAUNCH-01. Do not change system/browser policy or product behavior. Return evidence to MASTER before any live-flow resume.

## Codex Windows sandbox conclusion — 2026-09-29

OpenAI's current Windows Codex sandbox documentation states that default Codex execution is write-restricted to the workspace and configured writable roots, and that descendant processes inherit the same sandbox boundary.

Therefore the new evidence is consistent with the following explanation:
- Codex could not create the requested `%LOCALAPPDATA%\ChatCodexPhase3B\...` profile directory because it was outside the sandbox's writable roots;
- Edge launched by Codex is also a sandbox descendant and inherits those filesystem/network restrictions;
- the earlier Edge/GPU ACCESS_DENIED failures are therefore likely caused or materially contributed to by the Codex sandbox rather than by product code.

This is the strongest current explanation, not proof of the exact denied filesystem object in every previous GPU crash.

Decision:
- stop browser/microphone validation from inside Codex;
- do not enable Codex Full Access, broad writable roots, ACL edits, elevation or sandbox bypass just to run this validation;
- perform one zero-call browser/server smoke manually in the owner's normal Windows session outside Codex sandbox.

Manual smoke binding:
- repo: `F:\Chat-Codex-Handoff\validation-repo`;
- accepted HEAD: `dd8317b43100b8cbaad684cab7fc02957e32de62`;
- fresh Edge profile: `F:\Chat-Codex-Handoff\phase3b-edge-profile-01` (outside repo and outside default Edge profile);
- server: `node .\study-teachback-app\server.mjs` from repo root;
- Edge: normal user-launched `msedge.exe` with only `--user-data-dir`, `--no-first-run`, `--no-default-browser-check` and the local URL.

The smoke must not click Start Learning, create a topic, use microphone, or trigger Tutor/ASR/diagnosis. Existing 3-call / zero-retry / US$0.03432 live authorization remains paused and unused.

If the root page opens stably outside Codex sandbox, resume Phase3B manually in that same fresh profile. If it fails, keep Phase3B blocked and investigate the real host environment.