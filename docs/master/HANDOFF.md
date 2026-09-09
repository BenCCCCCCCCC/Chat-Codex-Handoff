# Active Handoff

Updated: 2026-09-09  
Role: MASTER

## Phase

**USABILITY-SPIKE-01 — PARTIAL / UF-01 final validation closure**

Gate 5 remains on hold. The local GUI usability prototype exists at a checkpoint, but the Spike is not yet accepted.

## Current Local State

- repo: `F:\Chat-Codex-Handoff\validation-repo`
- branch reported by Codex: `prototype/usability-spike-01`
- before HEAD: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- current checkpoint HEAD: `9eae64b42a6cc809e61fda60514c09c7b270fe93`
- checkpoint: `feat: checkpoint bounded local handoff panel`
- canonical state used by Codex: `9f093d3cc87378845e2b77d3c4833c349b6b4c33`
- pushed product branch remains older and must not be used as a reset source.

No product/code push, merge, external sharing, public release, paid API, dependency installation or privilege escalation is authorized.

## Checkpoint Scope Reported

```text
M README.md
A Start-Handoff.cmd
A handoff-kit/ui/Start-Handoff.ps1
A handoff-kit/ui/HandoffPanel.ps1
A handoff-kit/ui/PanelAdapter.ps1
A handoff-kit/ui/tests.ps1
A handoff-kit/ui/README.md

7 files changed, 464 insertions(+)
```

Codex reports that accepted core scripts, original tests and Hook were not modified.

## What Is Implemented

- native Chinese Windows Forms panel;
- project / target Chat / captured-delivery preview;
- explicit initial configure;
- explicit rebind flow;
- confirmation before invoking the accepted handoff action;
- isolated demo mode;
- repo-local startup entry;
- relevant usage documentation.

This is implementation evidence, not owner acceptance.

## Validation Status

### PASS evidence reported

- core regression: `30 passed / 0 failed`;
- an earlier complete UI test version: `30 passed / 0 failed` — historical only, not final-checkpoint proof;
- extended checks reached target-change, action-time-change, long-URL and native-focus cases before the lifecycle blocker;
- `git diff --check` PASS;
- baseline-to-HEAD checks PASS;
- normal and small-window demo screenshots inspected;
- live binding / clipboard / browser not intentionally exercised.

### Blocker

Final lifecycle testing failed around `WaitForInputIdle`. The environment then denied the attempted read-only process query. Ctrl+C was sent to the test session, but exit of the spawned demo fixture process could not be confirmed.

This leaves one natural Must Fix:

## UF-01 — deterministic final UI-test lifecycle

Required outcome:

- no broad process enumeration;
- no elevated access;
- no guessing/killing unrelated PowerShell processes;
- test-owned or demo-owned deterministic startup/readiness/close path;
- final isolated suite runs against the **current checkpoint/fix**, not an earlier revision;
- test-created demo processes exit cleanly;
- missing visual evidence is completed;
- final evidence is regenerated from the final tested HEAD.

## User Action Before Resuming

If a visible window clearly labeled as the USABILITY-SPIKE demo/fixture is still open, close that window normally.

If no such demo window is visible, do **not** open Task Manager and kill generic PowerShell processes. The next Codex run must use a safer test-owned lifecycle and determine only what it can prove from its own run.

## Correction Packet — Send to the Same Codex Task

```text
USABILITY-SPIKE-01 Correction — UF-01 only.

The checkpoint implementation is preserved. Do not add product features and do not restart the Spike.

Current expected local state:
- repo: F:\Chat-Codex-Handoff\validation-repo
- branch: prototype/usability-spike-01
- checkpoint HEAD: 9eae64b42a6cc809e61fda60514c09c7b270fe93

The previous turn stopped correctly after the final lifecycle validation hit WaitForInputIdle and subsequent process inspection was denied.

Resume only to close UF-01:

1. Verify repo / branch / HEAD / worktree first. Preserve unrelated untracked `.codex/hooks.json`, `T09_LIVE_PACKET.txt`, and existing artifacts.
2. Do not modify the accepted core handoff scripts, original core tests, Hook, live binding, real clipboard or browser.
3. Diagnose the lifecycle failure from the UI/test code and logs already produced. Do not use broad process enumeration, elevated access, WMI/CIM sweeps, Task Manager automation, or unrelated process killing.
4. Replace the fragile readiness/exit strategy with a deterministic test-owned mechanism. Prefer a demo/test-owned self-close/readiness signal or another mechanism that only concerns the process/window created by that test. Keep any test-only behavior clearly isolated from normal product behavior.
5. If the safest correction only needs `handoff-kit/ui/tests.ps1` and/or UI demo/test-mode code, make that bounded change. If it requires changing core configure/handoff contracts, installing dependencies, global settings, or adding a service/daemon, STOP and report a scope Gate instead.
6. Rerun the existing core regression on the final state and require 30/30 PASS.
7. Rerun the complete isolated UI suite from start to finish on the final state. Report exact pass/fail counts. Do not cite the earlier 30/30 run as final proof.
8. Complete the required demo visual evidence, especially the missing explicit rebind-confirmation view. Confirm normal + smaller-window rendering already checked still matches the final version. Record 100/150/200% DPI only where actually tested; otherwise mark NOT VERIFIED.
9. Confirm the new test run leaves no test-owned demo window/process alive using only deterministic evidence available to the test it created. Do not claim cleanup of the earlier ambiguous process unless actually proven.
10. Regenerate/update `artifacts/usability-spike-01/REVIEW_EVIDENCE.md`, test logs, source diff and screenshot inventory for the final HEAD.
11. Run `git diff --check` and exact scope checks.
12. Create at most one additional local correction checkpoint commit if code/test changes are required. Do not push or merge.

Final status may be:
IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION
only if final core + complete final UI validation pass and required evidence is present.
Otherwise return PARTIAL/BLOCKED honestly.

Final Delivery Packet must include:
- before/correction/final HEAD
- exact changed files and diff stat
- exact UF-01 fix summary
- final core test command + count
- final complete UI test command + count
- screenshot inventory and demo labels
- evidence paths
- test-owned process cleanup evidence
- git diff --check
- current worktree status
- Completed / Not Done / Verified / Likely / Unknown
- Must Fix / User Decision Needed / Future Optional

Do not run live handoff in the same turn.
```

## MASTER Review Boundary

When Codex returns, MASTER must review only the current delta and evidence. Do not reopen already-accepted Alpha history unless new evidence contradicts it.

If final validation passes, the next step is **owner validation of the real GUI**, not another implementation feature round:

- open `Start-Handoff.cmd`;
- confirm project / target / captured packet display;
- exercise one explicit user-controlled prepare/open action after a completed Codex turn;
- manually paste/send;
- compare usability against the CLI path.

## Must Fix

- UF-01 final lifecycle and final-checkpoint isolated validation.

## User Decision Needed

No new scope decision is required for the narrow UF-01 correction.

A user action is only needed to close a clearly visible leftover demo window if one exists. No generic process-killing is requested.

## Future Optional

None added by UF-01. Do not implement daemon/process manager, global launcher, automatic target discovery, clipboard monitoring or a new UI framework.
