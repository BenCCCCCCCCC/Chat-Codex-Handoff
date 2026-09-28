# Current State

Updated: 2026-09-29 — Edge GPU startup blocker classified for isolated A/B diagnostic
Role: 00 MASTER / authoritative dynamic state

## 1. Current status

**Batch A:** MASTER-ACCEPTED.

**Batch B / Phase 3A:** MASTER-ACCEPTED and finalized locally at:
`dd8317b43100b8cbaad684cab7fc02957e32de62`.

**PHASE3B-LIVE-01:** OWNER-AUTHORIZED but PAUSED before first provider call / recording.

**PHASE3B-BROWSER-STARTUP-01:** BLOCKED at fresh `about:blank` Edge startup.

**PHASE3B-GPU-ISOLATION-01:** READY / NOT DISPATCHED / ZERO PROVIDER CALLS / ZERO MICROPHONE / NO PRODUCT BEHAVIOR CHANGE.

Original live authorization remains fully unused:
- maximum 3 provider calls;
- zero retries;
- incremental local exposure ceiling US$0.03432;
- one recording maximum.

## 2. Browser-start blocker receipt

Codex reported:
- canonical commit read: `8a72c5fce539ed164c6704bad47ea9068a3fafad`;
- repo/branch/HEAD correct;
- tracked worktree CLEAN;
- ledger lock absent;
- provider calls 0;
- microphone 0;
- topic/live actions 0;
- exposure increment US$0;
- ledger SHA unchanged:
  `d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

Fresh non-headless Edge blank-target probe:
- Edge path: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`;
- Edge version: `154.0.4258.37`;
- fresh temporary isolated profile;
- loopback dynamic-port CDP;
- `about:blank` target created;
- `Page.enable` timed out;
- GPU subprocess repeatedly exited with `-1073741790`;
- stderr: `GPU process isn't usable. Goodbye.`;
- browser main process exited `2147483651`;
- normal `Browser.close` did not complete.

The previous unknown Access-denied Edge process was not touched.

Product server/root was not launched because blank-target prerequisite failed.

## 3. Interpretation

The GPU subprocess exit value `-1073741790` maps to Windows status `0xC0000022` (ACCESS_DENIED). This narrows the observed failure to a GPU-process startup/access path but does **not** establish whether the underlying cause is the graphics driver, Edge/ANGLE, security software, OS policy, permissions or another browser-runtime interaction.

The browser main-process exit `2147483651` is recorded as evidence only; it does not independently identify root cause.

MASTER will not authorize:
- driver reinstall/update;
- Edge reinstall/reset;
- registry/group-policy changes;
- hardware acceleration setting changes in the owner's normal profile;
- `--disable-gpu-sandbox`;
- privilege elevation;
- killing unknown Edge/GPU processes.

The next experiment is a reversible command-line A/B isolation using a brand-new temporary profile only.

## 4. Current public documentation check

Chromium documentation describes `--disable-gpu` as a way to force the software path for compositing/rasterization when isolating GPU-process failures.

Microsoft Edge documentation explicitly warns that `--disable-gpu-sandbox` is an unsupported command-line flag with stability/security risks. Therefore this project must not use `--disable-gpu-sandbox`.

This check supports using `--disable-gpu` only as a temporary diagnostic/run-local browser flag; it does not authorize changing machine-wide Edge policy or driver state.

## 5. PHASE3B-GPU-ISOLATION-01 goal

Answer one question:

> Does the accepted isolated Edge/CDP startup become stable when hardware GPU rendering is bypassed with the reversible `--disable-gpu` launch flag?

This is an environment-classification probe, not a product fix.

## 6. Diagnostic sequence

### G0 — identity / evidence preservation

Confirm:
- accepted HEAD `dd8317b...`;
- tracked worktree CLEAN;
- ledger lock absent;
- ledger SHA/exposure unchanged;
- existing browser-start artifacts preserved.

Do not touch the earlier Access-denied process/profile.

### G1 — default-GPU control

Do **one** fresh control launch only if needed to confirm the previous exact failure is still reproducible under the same known-safe blank-target harness.

Use:
- non-headless Edge;
- new temporary profile;
- loopback CDP;
- `about:blank`;
- no product server.

If it reproduces the GPU-process failure, stop the control and continue to G2.

If the default control unexpectedly passes, do not infer the issue is gone; record it and continue to G2 for the actual A/B comparison.

No repeated default attempts.

### G2 — software-rendering blank-target probe

Launch a brand-new non-headless Edge process/profile with the same safe arguments plus **only**:
`--disable-gpu`.

Do not use:
- `--disable-gpu-sandbox`;
- `--no-sandbox`;
- policy/registry edits;
- owner profile.

Open only `about:blank`.

Verify:
- CDP target connection;
- `Page.enable` succeeds;
- target remains alive for bounded observation;
- Edge does not exit;
- task-owned process closes normally.

If `--disable-gpu` blank target fails, STOP. Do not add more GPU flags or modify the machine.

### G3 — software-rendering product-root probe

Only if G2 PASS.

Start local product server in zero-provider-safe mode.

Use new temporary profiles/processes with the same launch configuration + `--disable-gpu`.

Open product root only:
- no learning source submit;
- no `开始学习`;
- no topic;
- no microphone;
- no provider action.

Run three fresh product-root startup probes. Any failure stops.

Verify title/basic DOM, target lifetime, local-only requests, ledger unchanged and clean process shutdown.

## 7. Interpretation

### Outcome A — `--disable-gpu` stable

If blank target and all three product-root starts PASS with `--disable-gpu`:
- classify the current Phase3B startup blocker as isolated to the hardware-GPU browser path under this harness/environment;
- do not claim the underlying driver/security cause is known;
- do not change global Edge settings;
- MASTER may authorize resuming the already-approved Phase3B live experiment using a fresh isolated Edge launched with `--disable-gpu`, because this changes browser rendering mode only and not product/provider behavior;
- live provider budget remains unchanged.

### Outcome B — `--disable-gpu` also fails

If the blank target fails with `--disable-gpu`:
- GPU hardware acceleration is not sufficient to explain/avoid the startup failure;
- keep live Phase3B blocked;
- return evidence;
- do not try SwiftShader, sandbox-disabling, driver changes or extra flags automatically.

## 8. Protected boundaries

No:
- provider/model calls;
- microphone;
- topic creation;
- old owner data/profile;
- unknown process interaction;
- driver/install/reset operations;
- Edge/Windows policy/registry changes;
- `--disable-gpu-sandbox` or `--no-sandbox`;
- new dependency;
- product code changes;
- push/merge/reset/clean/rebase/amend.

Task/session artifacts may be written only under the Phase3B artifact area.

## 9. Delivery receipt

Return:
- canonical commit read;
- G0–G3 mapping;
- exact control/default args and `--disable-gpu` args;
- Edge version/path;
- control result;
- software blank-target result;
- 3 software product-root startup results if reached;
- process cleanup result for task-owned processes;
- GPU/browser stderr comparison;
- ledger before/after SHA;
- provider 0 / microphone 0 / topic 0 / exposure 0;
- final tracked clean;
- Blocking / Unknown / User Decision Needed / Future Optional.

Do not resume PHASE3B-LIVE-01 inside this diagnostic.

## 10. Classification

Completed:
- Batch A/B.
- Phase3B preflight/source recovery.
- browser-start probe that isolated a GPU-process startup failure.

Ready:
- reversible GPU A/B isolation probe.

Paused:
- owner-authorized Phase3B live experiment.

User Decision Needed:
- none for this zero-call probe.

## 11. Next smallest step

Execute PHASE3B-GPU-ISOLATION-01. If `--disable-gpu` establishes a stable fresh isolated browser/product-root path, return to MASTER before resuming live L1.
