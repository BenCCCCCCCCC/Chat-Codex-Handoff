# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — UX-04 MASTER DELTA REVIEW PASS / OWNER LIVE VALIDATION READY**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

MASTER has now independently inspected the owner-transferred final `PanelAdapter.ps1` and `ui/tests.ps1` for UX-04. The narrow parser correction is accepted for owner-validation entry. Overall Spike acceptance remains open only because the owner has not yet performed the real GUI `仅复制交付` flow and usability comparison.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Local branch: `prototype/usability-spike-01`
- Prior UX-02 / UX-03 HEAD: `3a925c13dae51e7d3f3a89977a993ebafb771f1d`
- UX-04 final HEAD: `28828b110263909c5683a8cab54d6832f2ad7ffa`
- Pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

No product/code push, merge, release, external sharing, paid API use, dependency installation or privilege escalation is authorized.

## Accepted Owner-Feedback Corrections

### UX-03 — Copy-only return

**PASS for owner live validation.**

- `handoff.ps1 -CopyOnly` keeps the existing validation authority and exact packet copy;
- CopyOnly skips `Start-Process` and therefore does not request opening a web target;
- no-argument legacy behavior remains copy + request opening stored HTTPS Chat URL;
- no automatic paste/send;
- prior independent review accepted the core/UI delta;
- reported final core regression remains `43/43 PASS`.

### UX-02 / UX-04 — Delivery identity summary

**PASS for owner live validation after UX-04.**

MASTER inspected the current parser directly.

The final parser remains conservative and label-based. It now recognizes:

- `唯一 correction / final HEAD：<sha>` case-insensitively;
- `After HEAD / commit：<sha>`;
- all previously accepted explicit final/current labels;
- ASCII or Chinese full-width colon where matched by the grammar.

It still:

- anchors explicit version labels at line start (after optional bullet/whitespace);
- excludes `Before HEAD`;
- excludes arbitrary prose occurrences such as `prose ... <sha>`;
- preserves conflicting recognized final/current versions as `不明确（查看原文）`;
- keeps checkout HEAD separate from packet-declared version;
- keeps raw packet bytes and SHA-256 fingerprint behavior unchanged.

MASTER also inspected the focused tests. They use the exact two real project strings, mixed-case `唯一 CoRrEcTiOn / FiNaL hEaD`, full-width/ASCII colons, conflict handling, and explicit negative cases for `Before HEAD` and prose. No new parser Must Fix was found.

Codex reports final regression at `28828b110...`:

```text
Core: 43 passed / 0 failed; exit 0
UI:   73 passed / 0 failed; exit 0
```

No contradictory source evidence was found in MASTER review.

## Desktop Route Probe 01

Unchanged: **Unknown / inconclusive**.

The narrow current-user `Get-AppxPackage` / `Get-StartApps` queries did not expose a ChatGPT/OpenAI package or StartApps entry, so no manifest was queried. This does not prove absence or unsupported native routing. No URI launch or internal-client access occurred.

Do not broaden Desktop routing work before functional owner acceptance.

## Classification

### Must Fix

None before owner live validation.

### User Decision Needed

No new scope decision. Perform the real owner GUI test now.

### Future Optional

- improved read-only Desktop package identification only if a safe reliable identifier source appears;
- exact native Desktop routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified later;
- visual polish/high-DPI/accessibility after functional acceptance.

## Owner Live Validation — Next Smallest Step

After the Codex turn has fully ended:

1. open `F:\Chat-Codex-Handoff\validation-repo\Start-Handoff.cmd`;
2. ensure the window is real mode, not Demo, and repository is the F: checkout;
3. inspect the live summary for the latest Codex packet:
   - packet title may be `未提供` if the reply contains no Markdown heading — this is acceptable and honest;
   - `交付版本` should resolve to `28828b110263909c5683a8cab54d6832f2ad7ffa` from the explicit `Final HEAD` line in the latest Codex response;
   - `当前项目版本` should show the same HEAD if no later local commit exists;
   - relation should read `与当前项目一致`;
   - capture time and packet fingerprint should be present;
4. confirm the stored return Chat and raw packet are intended;
5. tick the explicit confirmation;
6. click `仅复制交付` once;
7. confirm no new web/browser tab is opened by this action;
8. manually switch to the already-open current MASTER in ordinary ChatGPT Desktop Chat or web Chat;
9. copy nothing else; press Ctrl+V and Send;
10. then report separately whether the summary was understandable and whether CopyOnly is `更简单 / 差不多 / 更麻烦` than the prior forced-open route.

Optional only after the copy-only result: test `复制并打开网页对话` once for backward compatibility.

Do not treat manual Desktop Chat use as proof of native exact-conversation routing.

## Not Done

- real owner CopyOnly -> manual destination -> paste/send validation;
- owner net-usability comparison;
- 150%/200% DPI and exhaustive manual accessibility testing;
- native exact Desktop conversation routing;
- Gate 5/external validation;
- product push/distribution.

Only after the owner result arrives may MASTER classify USABILITY-SPIKE-01 as PASS / PARTIAL / FAIL-PIVOT.