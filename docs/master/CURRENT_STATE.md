# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — OWNER LIVE VALIDATION PARTIAL / UX-05 launcher console Must Fix**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

UX-03 CopyOnly and UX-02/UX-04 delivery-summary parsing remain accepted for owner-validation entry. The owner exposed one remaining launch friction: `Start-Handoff.cmd` can present a visible console around GUI startup.

Overall Spike acceptance remains open / PARTIAL until UX-05 is corrected and the owner repeats the real GUI validation.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Local branch: `prototype/usability-spike-01`
- UX-04 final HEAD: `28828b110263909c5683a8cab54d6832f2ad7ffa`
- Pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

No product/code push, merge, release, external sharing, paid API use, dependency installation or privilege escalation is authorized.

## Accepted Before UX-05

- UX-03 `handoff.ps1 -CopyOnly` independent review = PASS for owner use.
- UX-02/UX-04 summary parser independent review = PASS for owner use.
- Latest reported core regression = `43/43 PASS`.
- Latest reported UI regression = `73/73 PASS`.
- CopyOnly keeps strict validation and skips web-open requests; no-arg route remains backward compatible.
- Parser remains explicit-label-only and recognizes the real project forms `唯一 correction / final HEAD` and `After HEAD / commit` while excluding Before/prose SHAs.
- Desktop Route Probe 01 remains Unknown/inconclusive; no live Desktop URI test is authorized.

## UX-05 — Launcher Console Friction

Current launcher source synchronously runs Windows PowerShell from `.cmd`, which can leave a visible black console while the WinForms UI is running.

The approved narrow correction remains:

- spawn Windows PowerShell asynchronously;
- use `-WindowStyle Hidden` for the child PowerShell process;
- let the `.cmd` parent exit promptly;
- preserve Windows PowerShell 5.1, `-NoProfile`, `-STA`, script-relative pathing and startup-error MessageBox behavior;
- no VBS, compiled EXE, installer, shortcut, dependency, service, registry/global setting or alternate launcher type.

### Owner acceptance criterion — confirmed 2026-09-09

The owner explicitly accepts a **very brief launch flash** from the `.cmd` entry.

Therefore UX-05 does **not** require a truly zero-flash launcher. The blocking defect is only a **persistent / materially visible black console window** during normal GUI use.

Do not introduce VBS/EXE/installer or another launcher architecture merely to remove an instantaneous flash. If the corrected launcher leaves only the brief flash the owner described as acceptable, treat launcher appearance as acceptable and do not reopen it as Future Optional work unless later real use changes that judgment.

## Classification

### Must Fix

- UX-05 — remove the persistent black launcher console while preserving the current simple repo-local entry.

### User Decision Needed

None for the bounded UX-05 correction.

### Future Optional

- improved read-only Desktop package identification;
- native exact-conversation routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified;
- visual polish/high-DPI/accessibility after functional acceptance.

A zero-flash launcher is **not** currently a Future Optional requirement because the owner accepts the brief flash.

## Not Done / Unknown

- UX-05 implementation evidence / final launcher delta if not yet returned by Codex;
- owner repeat run after UX-05;
- explicit owner confirmation that `仅复制交付` opens no new tab in the real run;
- owner judgment that the live summary is understandable;
- net-usability comparison versus old CLI/forced-open route;
- 150%/200% DPI and exhaustive accessibility testing;
- native exact Desktop conversation routing;
- Gate 5/external validation;
- product push/distribution.

## Next Smallest Step

If the UX-05 correction has not yet been run, send the existing concise UX-05 Correction Packet to the same Codex task at local HEAD `28828b110...`.

If it has already been run and the current real behavior is only the owner-accepted brief flash with no persistent black console, do not change the launcher further; return the Codex UX-05 Delivery Packet / tiny launcher delta for MASTER review, then repeat the real CopyOnly owner flow.
