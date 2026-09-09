# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — UX-04 IMPLEMENTED + SELF-TESTED / MASTER DELTA REVIEW PENDING**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

The owner-approved UX-04 parser correction has been implemented locally according to Codex's final report. Overall Spike acceptance remains open because MASTER has not yet independently inspected the tiny two-file UX-04 delta, and the owner has not yet performed the real `仅复制交付` flow.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Local branch: `prototype/usability-spike-01`
- UX-04 starting HEAD: `3a925c13dae51e7d3f3a89977a993ebafb771f1d`
- UX-04 reported final HEAD: `28828b110263909c5683a8cab54d6832f2ad7ffa`
- Prior pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

No product/code push, merge, release, external sharing, paid API use, dependency installation or privilege escalation is authorized.

## Prior Accepted Review State

- UX-03 `-CopyOnly` independent review = PASS for owner entry.
- UX-02 summary design = PARTIAL only because two real explicit final-version label variants were not recognized.
- Desktop Route Probe 01 = Unknown / inconclusive; no live URI or internal-client access occurred.

## UX-04 — Reported Implementation

Codex reports exactly one local correction commit from `3a925c13...` to `28828b110...`, changing only:

- `handoff-kit/ui/PanelAdapter.ps1`
- `handoff-kit/ui/tests.ps1`

Reported diff stat: `2 files changed, 11 insertions(+), 1 deletion(-)`.

Reported behavior:

- adds recognition for real explicit label `唯一 correction / final HEAD：<sha>`;
- adds recognition for real explicit label `After HEAD / commit：<sha>`;
- matching is case-insensitive and supports Chinese full-width colon where applicable;
- all previously supported labels remain;
- `Before HEAD` and arbitrary prose SHA remain excluded;
- conflicting recognized final/current declarations remain `不明确（查看原文）`;
- raw packet, fingerprint, checkout HEAD separation, version relation, CopyOnly, transport and UI layout remain unchanged.

This is the intended bounded correction. MASTER has not yet inspected the exact two-file source delta, so this is reported evidence rather than final acceptance.

## Reported Final Regression

On final HEAD `28828b110263909c5683a8cab54d6832f2ad7ffa`:

```text
Core: 43 passed / 0 failed; exit 0
UI:   73 passed / 0 failed; exit 0
```

Reported also:

- `git diff --check` PASS;
- correction-range check PASS;
- test-owned window/process exits normally;
- live binding, metadata, packet and Hook hashes unchanged;
- no Desktop research, live handoff, real clipboard/browser/Desktop action, push or merge.

## Classification

### Must Fix

None newly confirmed by the report. UX-04 remains **pending MASTER source-level confirmation**.

### User Decision Needed

No new scope decision. The next action is evidence transfer for this tiny correction, then real owner validation if no Must Fix appears.

### Future Optional

- better read-only Desktop package identification only if a safe reliable identifier source appears;
- exact native Desktop routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified later;
- visual polish/high-DPI/accessibility after functional owner acceptance.

## Evidence Needed for MASTER Review

Preferred minimum evidence for UX-04:

1. exact correction diff for range `3a925c13dae51e7d3f3a89977a993ebafb771f1d..28828b110263909c5683a8cab54d6832f2ad7ffa` if an artifact exists;
2. otherwise the current `handoff-kit/ui/PanelAdapter.ps1` and `handoff-kit/ui/tests.ps1` files are sufficient for direct comparison against the previously reviewed version.

Do not push code merely for review.

## Next Smallest Step

Transfer the tiny UX-04 source evidence to MASTER. MASTER reviews only this parser/test delta.

If no Must Fix remains, immediately proceed to the real owner GUI validation:

1. after the Codex turn is fully ended, open `Start-Handoff.cmd`;
2. confirm the live summary recognizes the actual packet's explicit final version;
3. confirm target/packet and tick the explicit confirmation;
4. click `仅复制交付`;
5. confirm no new browser tab opens;
6. manually switch to the already-open ordinary ChatGPT Desktop Chat or web Chat;
7. Ctrl+V and Send without copying anything else;
8. report whether the summary is understandable and whether CopyOnly is `更简单 / 差不多 / 更麻烦` than the prior path.

Do not start another feature round before this owner result.
