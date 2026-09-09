# Active Handoff

Updated: 2026-09-09
Role: 00 MASTER

## Phase

**USABILITY-SPIKE-01 — UX-03 review PASS / UX-04 parser correction required before owner live validation**

Gate 5 remains ON HOLD. Do not start another feature round or Desktop-routing implementation.

## Current Local State

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Branch: `prototype/usability-spike-01`
- Current reviewed HEAD: `3a925c13dae51e7d3f3a89977a993ebafb771f1d`
- Prior accepted GUI HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Pushed product branch remains older and must not be used as a reset source.

No push, merge, external sharing, release, paid API, dependency installation or privilege escalation is authorized.

## MASTER Delta Review Result

### UX-03 CopyOnly

PASS for owner validation entry.

Reviewed implementation keeps the accepted validation authority in `handoff.ps1` and adds only optional `-CopyOnly`. No-arg behavior remains copy + open stored HTTPS target. CopyOnly retains validation and exact copy but makes no open request. No auto paste/send.

Transferred final evidence reports core `43/43 PASS`, UI `57/57 PASS`, exact fixture packet, zero CopyOnly open requests, backward-compatible open-web route and final live-file hash preservation.

### UX-02 summary

Most of the summary design is correct, but one real parser gap remains.

Current parser recognizes fixed beginning-of-line labels such as `Correction / Final HEAD`, `Final HEAD`, `After HEAD`, `Current HEAD`, `最终 HEAD`, etc.

The actual latest Codex packet uses:

`唯一 correction / final HEAD：<sha>`

A prior real packet used:

`After HEAD / commit：<sha>`

Both are explicit final-version declarations but the current grammar does not match them. As a result, the owner could still see `交付版本：未提供` for a packet that clearly declares its final version.

This is a bounded UX correctness issue, not a transport defect.

## Correction Packet — UX-04 only

Send the following to the **same Codex task**:

```text
USABILITY-SPIKE-01 Correction — UX-04 only.

MASTER independently reviewed UX-02 / UX-03 evidence.

UX-03 CopyOnly is accepted for owner-validation entry.
Do not change CopyOnly, core transport behavior, Desktop Route Probe, UI layout, or product scope.

One UX-02 parser gap remains.

Current expected local state:
- repo: F:\Chat-Codex-Handoff\validation-repo
- branch: prototype/usability-spike-01
- starting HEAD: 3a925c13dae51e7d3f3a89977a993ebafb771f1d

The current Get-DeliverySummary parser accepts fixed labels such as Correction / Final HEAD, Final HEAD, After HEAD and Current HEAD, but it misses two real packet label forms already observed in this project:

1. `唯一 correction / final HEAD：<sha>`
2. `After HEAD / commit：<sha>`

These are explicit final-version declarations. The current parser may therefore show `交付版本：未提供` even though the real packet contains a final version.

Fix only this conservative label grammar.

Requirements:
1. Keep explicit-label-only parsing. Do NOT scan arbitrary prose for SHAs.
2. Recognize `唯一 correction / final HEAD` case-insensitively as a final declaration.
3. Recognize `After HEAD / commit` as a final declaration.
4. Preserve all currently accepted labels and Chinese equivalents.
5. Continue excluding `Before HEAD`.
6. Multiple conflicting recognized final/current declarations must remain `不明确（查看原文）`.
7. Add focused tests using the exact two real-style strings above, including Chinese full-width colon where applicable.
8. Keep raw packet, fingerprint, checkout HEAD separation and version-relation behavior unchanged.
9. Expected code scope: `handoff-kit/ui/PanelAdapter.ps1` + `handoff-kit/ui/tests.ps1` only. If broader product changes are required, STOP and report.
10. Run final UI suite and relevant core regression on final HEAD; report exact counts and git diff --check.
11. At most one local correction commit. Do not push/merge.
12. No Desktop URI research, browser automation, live handoff, clipboard/browser/Desktop action, visual polish or new feature work.

Final Delivery Packet:
- before/final HEAD
- exact two-file diff/stat
- parser rule change
- exact new tests and results
- final core/UI counts
- git diff --check
- worktree status
- Must Fix / User Decision Needed / Future Optional

If green, return IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION.
Do not run live handoff in the same turn.
```

## Desktop Route Probe 01

Read-only result remains inconclusive:

- no `*ChatGPT*` / `*OpenAI*` current-user package matches;
- no manifest/URI launch;
- Desktop app presence = Unknown;
- exact ordinary Chat route cannot be proven.

Do not repeat or broaden this probe in UX-04.

## Owner Validation After UX-04 PASS

Then the owner tests the real GUI:

1. open `Start-Handoff.cmd` after the Codex turn fully ends;
2. verify the live summary now recognizes the actual packet version where explicitly declared;
3. confirm target/packet and tick confirmation;
4. click `仅复制交付`;
5. confirm no browser tab opens;
6. manually switch to already-open ChatGPT Desktop ordinary Chat or web Chat;
7. Ctrl+V and Send without copying anything else;
8. report whether the summary was understandable and whether CopyOnly is `更简单 / 差不多 / 更麻烦` than the prior path.

Do not treat manual Desktop use as proof of native exact-conversation routing.

## Classification

### Must Fix

- UX-04 parser recognition of bounded real final-version label variants.

### User Decision Needed

None for UX-04.

### Future Optional

- improved read-only Desktop package identification;
- native exact-conversation routing only with supported evidence;
- exact browser-tab focus only if extension/setup cost is justified later;
- visual polish/high-DPI/accessibility after functional acceptance.