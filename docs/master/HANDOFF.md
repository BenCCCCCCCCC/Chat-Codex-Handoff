# Active Handoff

Updated: 2026-09-09
Role: 00 MASTER

## Phase

**USABILITY-SPIKE-01 — OWNER LIVE VALIDATION PARTIAL / UX-05 launcher console correction**

Gate 5 remains ON HOLD. Do not start another feature round, Desktop routing implementation, browser integration or visual redesign.

## Current Local State

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Branch: `prototype/usability-spike-01`
- Current accepted local HEAD before UX-05: `28828b110263909c5683a8cab54d6832f2ad7ffa`
- Pushed product branch remains older; do not reset local work to it.

No push, merge, release, external sharing, paid API, dependency installation or privilege escalation is authorized.

## Prior Review State

- UX-03 CopyOnly = PASS for owner-validation entry.
- UX-02 / UX-04 delivery-summary parser = PASS for owner-validation entry.
- Desktop Route Probe 01 = Unknown / inconclusive; do not broaden it now.
- Latest reported final regressions before this owner observation: core 43/43 PASS, UI 73/73 PASS.

## Real Owner Observation

The owner used the real launcher and reported:

> `Start-Handoff.cmd` visibly opens a black command-line window, then the product GUI appears.

This is a real beginner-facing launch friction. Do not classify it as mere visual polish.

Current launcher source is synchronous:

```bat
@echo off
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -STA -File "%~dp0handoff-kit\ui\Start-Handoff.ps1"
```

Because the batch process waits for PowerShell, the console remains visible while the WinForms UI is running.

Normal `Start-Handoff.ps1` startup errors are already surfaced by MessageBox, so the child console can be hidden without removing the existing user-visible startup-error path.

## Must Fix — UX-05

**Goal:** remove the persistent black console from the normal double-click experience with the smallest bounded launcher-only change.

### Correction Packet — send to the same Codex task

```text
USABILITY-SPIKE-01 Correction — UX-05 only.

Real owner validation found one launch usability defect:
double-clicking Start-Handoff.cmd leaves a clearly visible black command-line window while/around the WinForms product launch.

Current expected local state:
- repo: F:\Chat-Codex-Handoff\validation-repo
- branch: prototype/usability-spike-01
- starting HEAD: 28828b110263909c5683a8cab54d6832f2ad7ffa

Do not modify CopyOnly, delivery-summary parsing, transport, Desktop Route Probe, GUI layout, core configure/common/handoff behavior, or product scope.

Root cause is bounded: Start-Handoff.cmd synchronously invokes Windows PowerShell, so the CMD console waits for the GUI process.

Fix only UX-05.

Requirements:
1. Prefer the smallest launcher-only correction in Start-Handoff.cmd.
2. Spawn Windows PowerShell asynchronously so the .cmd parent exits promptly.
3. Pass -WindowStyle Hidden to the child PowerShell process so no persistent PowerShell console remains.
4. Preserve exact Windows PowerShell 5.1 path, -NoProfile, -STA, script-relative `%~dp0` pathing and paths containing spaces.
5. Preserve existing Start-Handoff.ps1 normal startup-error MessageBox behavior; do not hide errors by replacing that script path.
6. Do not add VBS, a compiled EXE, shortcut/installer, new dependency, service, registry/global setting or another launcher type in this correction.
7. Do not claim completely zero visual flash from a .cmd until owner observation proves it. The acceptance target for UX-05 is removal of the persistent black console window reported by the owner.
8. Add/adjust a focused launcher check only if needed to prove asynchronous + hidden-child semantics and path safety. Do not use UI Automation, WMI/CIM sweeps or broad process enumeration.
9. Rerun the existing core suite and full UI suite on final HEAD; report exact counts.
10. Run git diff --check.
11. Expected product scope is Start-Handoff.cmd only; if a test file must change, keep it test-only and explain. If a broader product change is required, STOP and report.
12. At most one local correction commit. No push/merge/share/paid use.
13. No Desktop URI research, browser automation, live handoff, real clipboard/browser/Desktop action or visual polish.

If green, return IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION.
Do not run live handoff in the same turn.
```

## Owner Validation After UX-05 PASS

After Codex finishes and MASTER reviews the tiny launcher delta:

1. double-click `Start-Handoff.cmd` again;
2. confirm whether the previously persistent black console is gone;
3. record whether any brief launch flash remains and whether it materially matters;
4. confirm the live delivery summary is understandable;
5. tick the explicit confirmation;
6. click **仅复制交付**;
7. explicitly report whether CopyOnly opens any new browser/web tab;
8. manually switch to the already-open current ChatGPT Desktop ordinary Chat or web Chat;
9. Ctrl+V and Send without copying anything else;
10. report whether the route is `更简单 / 差不多 / 更麻烦` than the previous forced-open/CLI route.

The pasted packet itself proves returned content only; it does not by itself prove which GUI route was used or whether zero tabs opened. Capture those observations explicitly.

## Classification

### Must Fix

- UX-05 persistent launcher console.

### User Decision Needed

None for this bounded correction.

### Future Optional

- a truly zero-flash launcher type only if brief `.cmd` flash remains a meaningful owner problem;
- improved read-only Desktop package identification;
- native exact-conversation routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified;
- visual polish/high-DPI/accessibility after functional acceptance.
