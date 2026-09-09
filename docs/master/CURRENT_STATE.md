# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — OWNER LIVE VALIDATION PARTIAL / UX-05 launcher console Must Fix**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

UX-03 CopyOnly and UX-02/UX-04 delivery-summary parsing remain accepted for owner-validation entry. The owner has now performed the real launcher/return flow far enough to expose one new usability defect: double-clicking `Start-Handoff.cmd` visibly opens a black command window before/alongside the product GUI.

Overall Spike acceptance remains open / PARTIAL until UX-05 is corrected and the owner repeats the real GUI validation.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Local branch: `prototype/usability-spike-01`
- UX-04 final HEAD: `28828b110263909c5683a8cab54d6832f2ad7ffa`
- Pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

No product/code push, merge, release, external sharing, paid API use, dependency installation or privilege escalation is authorized.

## Verified / Accepted Before UX-05

- UX-03 `handoff.ps1 -CopyOnly` independent review = PASS for owner use.
- UX-02/UX-04 summary parser independent review = PASS for owner use.
- Latest reported core regression = `43/43 PASS`.
- Latest reported UI regression = `73/73 PASS`.
- CopyOnly keeps strict validation and skips web-open requests; no-arg route remains backward compatible.
- Parser remains explicit-label-only and now recognizes the real project forms `唯一 correction / final HEAD` and `After HEAD / commit` while excluding Before/prose SHAs.
- Desktop Route Probe 01 remains Unknown/inconclusive; no live Desktop URI test is authorized.

## Owner Live Observation

The owner returned the latest UX-04 Delivery Packet to MASTER and separately reported:

> Double-clicking `Start-Handoff.cmd` shows a clearly visible black command-line window, then the product GUI appears.

Do not infer unreported details such as whether CopyOnly created zero tabs in this specific run or whether every summary field was understood. Those observations must be captured on the repeat owner validation after UX-05.

## UX-05 — Launcher Console Friction

### Root cause confirmed from reviewed source

Current `Start-Handoff.cmd` is:

```bat
@echo off
"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -STA -File "%~dp0handoff-kit\ui\Start-Handoff.ps1"
```

The batch process synchronously waits for the Windows PowerShell process, so its console remains visible while the WinForms UI is running.

`Start-Handoff.ps1` already shows startup failures through a WinForms MessageBox in normal mode, so hiding/detaching the PowerShell console does not require losing the existing user-visible startup-error path.

### Classification

**Must Fix — UX-05.**

This is a real beginner-facing launch usability defect, not cosmetic polish.

### Approved narrow correction

Resume the same Codex task and change only the repo-local launcher behavior necessary to avoid a persistent console window.

Preferred smallest approach to validate first:

- make `Start-Handoff.cmd` spawn Windows PowerShell asynchronously;
- pass `-WindowStyle Hidden` to the PowerShell process;
- allow the `.cmd` parent to exit immediately after a successful spawn;
- preserve `-NoProfile`, `-STA`, script-relative path resolution and paths containing spaces;
- preserve normal-mode startup error visibility through the existing MessageBox;
- do not add a VBS launcher, compiled executable, installer, shortcut, dependency, service or global registration unless this smallest approach demonstrably cannot meet the owner requirement and MASTER approves a new scope.

A brief shell flash inherent to double-clicking a `.cmd` may still need owner observation; the immediate Must Fix is the clearly persistent black console window reported in the real run. Do not claim zero-flash until actually observed.

## Required UX-05 Validation

Codex should:

1. verify repo / branch / HEAD / worktree first;
2. modify only `Start-Handoff.cmd` unless a test-only file needs a tightly bounded update;
3. preserve all current product behavior and core/UI code;
4. run existing core and full UI regression on final HEAD;
5. run `git diff --check`;
6. add a focused launcher check proving the command uses script-relative pathing, Windows PowerShell 5.1, STA, hidden child window and asynchronous parent exit semantics without changing global settings;
7. do not use UI automation or broad process scans to claim visual success;
8. create at most one local correction commit; no push/merge;
9. stop at `IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION` if green.

## Must Fix / User Decision Needed / Future Optional

### Must Fix

- UX-05 — persistent black launcher console in the real owner run.

### User Decision Needed

None for this narrow correction; it is inside the already approved beginner-usability scope.

### Future Optional

- a truly zero-flash launcher type only if a brief `.cmd` flash remains materially annoying after UX-05;
- improved read-only Desktop package identification;
- native exact-conversation routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified;
- visual polish/high-DPI/accessibility after functional acceptance.

## Not Done / Unknown

- owner repeat run after UX-05;
- explicit owner confirmation that `仅复制交付` opens no new tab in the real run;
- owner judgment that the live summary is understandable;
- net-usability comparison versus old CLI/forced-open route;
- 150%/200% DPI and exhaustive accessibility testing;
- native exact Desktop conversation routing;
- Gate 5/external validation;
- product push/distribution.

## Next Smallest Step

Send one concise UX-05 Correction Packet to the same Codex task at local HEAD `28828b110...`. Do not reopen parser, CopyOnly, Desktop routing or visual design.

After UX-05 self-test and MASTER delta review, the owner repeats the real GUI flow and reports console behavior, summary clarity, no-new-tab CopyOnly behavior and whether the route is simpler overall.
