# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — UX-02 / UX-03 IMPLEMENTED + SELF-TESTED / MASTER EVIDENCE REVIEW PENDING**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

The owner-approved return-UX correction has been implemented locally and self-tested according to Codex's final report. Overall Spike acceptance remains open because MASTER has not yet independently read the new correction diff/evidence and the owner has not yet performed a real `仅复制交付` flow.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Local branch: `prototype/usability-spike-01`
- Prior accepted GUI HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- UX-02 / UX-03 correction final HEAD reported by Codex: `3a925c13dae51e7d3f3a89977a993ebafb771f1d`
- Correction commit count: one local correction commit
- Last independently checked pushed product-branch HEAD remains older: `869414c77d227fe2f1675c7cfa08b04250520279`
- Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`

No product/code push, merge, external sharing, public release, paid API use, dependency installation or privilege escalation is authorized.

## Reported Correction Scope

Codex reports exactly these tracked paths changed:

- `README.md`
- `handoff-kit/handoff.ps1`
- `handoff-kit/tests.ps1`
- `handoff-kit/ui/HandoffPanel.ps1`
- `handoff-kit/ui/PanelAdapter.ps1`
- `handoff-kit/ui/README.md`
- `handoff-kit/ui/tests.ps1`

Reported diff stat: `7 files changed, 141 insertions(+), 40 deletions(-)`.

Core `HandoffKit.Common.ps1`, `configure.ps1`, launcher and Hook were reported unchanged.

## UX-02 — Delivery Identity Clarity

Reported implementation:

- displays title derived from the actual captured packet;
- displays capture time;
- parses only explicit final/current packet-declared version labels;
- keeps current checkout HEAD separate from packet-declared version;
- displays version relationship without treating it as acceptance;
- displays a SHA-256 packet fingerprint derived from exact packet bytes;
- missing/conflicting fields are labelled as unavailable/ambiguous rather than guessed;
- raw packet remains available and unchanged.

This directly addresses the owner's real concern that demo screenshots/current checkout HEAD were not sufficient to recognize the intended live packet.

MASTER has not yet independently reviewed the new parser/diff, so this is reported implementation evidence, not final acceptance.

## UX-03 — Copy-only Return

Reported core interface:

```powershell
.\handoff-kit\handoff.ps1
.\handoff-kit\handoff.ps1 -CopyOnly
```

Reported semantics:

- no-argument behavior remains backward compatible;
- `-CopyOnly` runs the same validation and exact clipboard preparation but makes zero open/navigation requests;
- GUI now provides `仅复制交付` and `复制并打开网页对话` as distinct explicit actions;
- confirmation, target/packet identity re-checks, busy guard and no-auto-paste/send remain.

This is the approved minimal core-interface exception; no broader transport architecture is authorized.

## Reported Final Self-Test Evidence

On final HEAD `3a925c13dae51e7d3f3a89977a993ebafb771f1d` Codex reports:

```text
Core suite: passed=43 failed=0; exit=0
UI suite:   passed=57 failed=0; exit=0
```

Reported coverage includes:

- old no-arg handoff still opens the exact stored URL;
- `-CopyOnly` copies the exact same fixture packet and makes zero open requests;
- fail-closed cases remain fail-closed, including URL validation;
- both GUI routes require explicit confirmation;
- target/packet changes invalidate confirmation;
- busy guard and exact payload behavior pass;
- updated demo screenshots and evidence regenerated;
- live binding / Stop metadata / packet / Hook hashes unchanged by tests;
- no live browser/Desktop navigation, live handoff, push/merge/share/paid use.

`git diff --check`, correction range and Alpha-to-final range were reported PASS.

## Desktop Route Probe 01 — Reported Result

```text
desktop_app_present = Unknown
package_name = None
package_family = None
package_version = None
start_app_id = None
registered_custom_protocols = None
registered_app_uri_hosts = None
exact_ordinary_chat_conversation_route = None
can_prove_exact_conversation_routing = No
live_uri_launches = 0
ui_automation = 0
client_internal_files_read = 0
```

Interpretation:

- narrow `Get-AppxPackage` / `Get-StartApps` queries for ChatGPT/OpenAI returned no match with exit 0;
- this does **not** prove ChatGPT Desktop is absent or unsupported, because the query may not match the actual installed package identity/distribution form;
- no manifest was queried because no exact package match was found;
- no exact native ordinary-Chat conversation route can be proven from this probe;
- do not convert `Unknown` into `No` and do not invent/test URI paths.

No live Desktop navigation is authorized from this result.

## Classification

### Must Fix

None reported by Codex within the approved correction scope.

### User Decision Needed

No new implementation decision yet. First complete MASTER evidence review of the new correction artifacts, then perform the owner real GUI test.

### Future Optional

- a better read-only Desktop package-identification probe only if it can stay within OS-exposed metadata and has a narrower reliable identifier source;
- exact native Desktop routing only if a supported/observable contract is established;
- browser exact-tab focus only if extension/setup cost is later justified;
- UI polish/high-DPI/accessibility after functional owner acceptance.

## Evidence Needed for MASTER Review

Minimum new artifacts to transfer from:

`F:\Chat-Codex-Handoff\validation-repo\artifacts\usability-spike-01\`

1. `UX-02-UX-03.diff`
2. updated `REVIEW_EVIDENCE.md`
3. `DESKTOP_ROUTE_PROBE_01.md`
4. updated `screenshot-inventory.json`
5. representative screenshots at minimum: updated `Captured.png`, copy-only success screenshot, `Success-open-web.png` if present, and `Small-window.png` if materially changed.

Do not push code just to make evidence readable in MASTER.

## Next Smallest Step

1. transfer the minimum new correction evidence to MASTER;
2. MASTER reviews only the UX-02 / UX-03 delta and Desktop probe evidence;
3. if no Must Fix appears, owner runs the real GUI after the Codex turn has fully ended:
   - verify live delivery summary is understandable;
   - use `仅复制交付`;
   - manually switch to the already-open ordinary Desktop Chat or web Chat;
   - Ctrl+V and Send;
   - confirm no new tab was created by CopyOnly;
   - optionally test the secondary web-open route once;
   - report which route is easier.

Do not start another product feature round before this owner result.
