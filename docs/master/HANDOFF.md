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
- Latest reported final regressions before launcher correction: core 43/43 PASS, UI 73/73 PASS.

## UX-05 — Launcher Console Friction

The current `.cmd` entry can leave a persistent black console because it synchronously waits for Windows PowerShell while the WinForms UI is open.

Approved correction remains strictly launcher-level:

- spawn Windows PowerShell asynchronously;
- pass `-WindowStyle Hidden`;
- let the `.cmd` parent exit promptly;
- preserve exact Windows PowerShell 5.1 path, `-NoProfile`, `-STA`, `%~dp0` script-relative pathing and paths with spaces;
- preserve startup error MessageBox behavior in `Start-Handoff.ps1`;
- do not add VBS, compiled EXE, shortcut, installer, dependency, service, registry/global change or a second launcher architecture.

### Owner acceptance criterion — confirmed

The owner explicitly reports that a **very brief launch flash is acceptable**.

Therefore:

- UX-05 passes visually if the persistent/material black console is gone and only a brief flash remains;
- do not claim or pursue completely zero-flash behavior;
- do not introduce a heavier launcher just to remove the brief flash;
- zero-flash work is not a current Future Optional item.

## Correction Packet — same Codex task

If UX-05 has not yet been implemented, use the previously prepared UX-05-only packet with starting HEAD `28828b110263909c5683a8cab54d6832f2ad7ffa`.

Expected product scope is `Start-Handoff.cmd` only unless a tightly bounded test-only change is necessary. Preserve CopyOnly, parser, Desktop Route Probe, GUI layout and core transport behavior.

Run final core and full UI regression, `git diff --check`, create at most one local correction commit, and do not push/merge/share/paid-use. No live handoff or Desktop/browser automation in the Codex turn.

## Owner Validation After UX-05 Review PASS

1. double-click `Start-Handoff.cmd`;
2. confirm no persistent black console remains; a very brief flash is acceptable;
3. confirm the live delivery summary is understandable;
4. tick explicit confirmation;
5. click **仅复制交付**;
6. explicitly report whether CopyOnly opens any new browser/web tab;
7. manually switch to the already-open current ChatGPT Desktop ordinary Chat or web Chat;
8. Ctrl+V and Send without copying anything else;
9. report whether the route is `更简单 / 差不多 / 更麻烦` than the previous forced-open/CLI route.

The pasted packet alone proves returned content only; it does not prove which GUI action was used or that zero tabs opened, so record those observations separately.

## Classification

### Must Fix

- UX-05 persistent launcher console, until corrected or demonstrated absent in the owner run.

### User Decision Needed

None for this bounded correction.

### Future Optional

- improved read-only Desktop package identification;
- native exact-conversation routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified;
- visual polish/high-DPI/accessibility after functional acceptance.

A zero-flash launcher is not currently required or planned.
