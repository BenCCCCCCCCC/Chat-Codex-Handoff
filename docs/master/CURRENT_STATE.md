# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — UX-03 evidence review PASS / UX-02 PARTIAL due real packet-label parser gap**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

The owner-approved UX-02 / UX-03 correction has been implemented and self-tested at local HEAD `3a925c13dae51e7d3f3a89977a993ebafb771f1d`. MASTER has now independently reviewed the transferred correction diff, Review Evidence, Desktop Route Probe, screenshot inventory and representative screenshots.

Overall Spike acceptance remains open because one narrow recognizability defect was found before owner live validation.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Local branch: `prototype/usability-spike-01`
- Prior accepted GUI HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Current correction HEAD reviewed: `3a925c13dae51e7d3f3a89977a993ebafb771f1d`
- Pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

No product/code push, merge, external sharing, release, paid use, dependency installation or privilege escalation is authorized.

## MASTER Independent Delta Review

### UX-03 — Copy-only return

**PASS for owner entry.**

Reviewed core change is narrow and backward compatible:

- `handoff.ps1` adds only optional `[switch] $CopyOnly`;
- all existing repo/binding/metadata/packet/URL validation remains before clipboard preparation;
- no-argument behavior still copies and requests opening the stored HTTPS Chat URL;
- `-CopyOnly` copies the same packet and skips `Start-Process`;
- no auto paste/send was added.

Transferred evidence reports final core `43/43 PASS` and UI `57/57 PASS`, including zero open requests for CopyOnly, exact fixture payload, existing fail-closed cases, both GUI routes' confirmation/change/busy guards, and unchanged live binding/metadata/packet/Hook hashes.

Representative uploaded screenshot hashes match the transferred final inventory at HEAD `3a925c13...`.

### UX-02 — Delivery identity summary

**PARTIAL — one narrow parser Must Fix.**

The implementation correctly separates:

- first Markdown heading when present;
- captured/file time;
- packet-declared version versus checkout HEAD;
- informational version relationship;
- exact packet-byte SHA-256 fingerprint;
- raw packet preview.

However, the version parser only accepts a fixed set of labels at the beginning of a line, including `Correction / Final HEAD`, `Final HEAD`, `After HEAD`, `Current HEAD` and selected Chinese equivalents.

The actual Codex Delivery Packet that triggered this review uses the real label form:

`唯一 correction / final HEAD：<sha>`

That label is semantically explicit but is not matched by the current parser because of the leading qualifier `唯一`. A previously observed real packet form `After HEAD / commit：<sha>` is likewise outside the current exact label grammar.

Therefore this real current packet can still show `交付版本：未提供` despite containing an explicit final version. That directly weakens the approved UX-02 recognizability goal and should be corrected before asking the owner to validate the summary.

Do not broaden this into arbitrary SHA scanning. The fix must remain label-based and conservative.

## Required Narrow Fix — UX-04

**UX-04 — recognize bounded real-world final-version label variants without guessing.**

Minimum requirements:

- preserve current explicit-label-only approach;
- support the current real form `唯一 correction / final HEAD`;
- support the previously observed real form `After HEAD / commit`;
- keep `Before HEAD` excluded;
- do not accept arbitrary prose SHA values;
- conflicting recognized final/current declarations remain `不明确（查看原文）`;
- add focused tests using these exact real-style variants;
- no visual redesign, no new metadata model, no new transport behavior.

Expected implementation scope should normally be limited to `handoff-kit/ui/PanelAdapter.ps1` and `handoff-kit/ui/tests.ps1`, plus refreshed evidence if needed. Stop if a broader change appears necessary.

## Desktop Route Probe 01

MASTER reviewed the read-only evidence:

- `Get-AppxPackage -Name *ChatGPT*` -> 0 matches;
- `Get-AppxPackage -Name *OpenAI*` -> 0 matches;
- no matching StartApps entry was exposed;
- no manifest query or URI launch occurred;
- no internal ChatGPT files/private state were read.

Result remains **Unknown / inconclusive**, not `Desktop absent` and not `Desktop unsupported`.

No exact ordinary-Chat conversation route can be proven from this probe. Do not invent or live-test URI paths now.

## Classification

### Must Fix

- **UX-04 — bounded real packet final-version label recognition.**

### User Decision Needed

None for this narrow correction; it is within the already approved UX-02 recognizability scope.

### Future Optional

- improved read-only Desktop package identification if a safe reliable identifier source is found;
- exact native Desktop routing only with supported evidence;
- browser exact-tab focus only if extension/setup cost is justified later;
- visual polish/high-DPI/accessibility after functional owner acceptance.

## Next Smallest Step

Send one concise UX-04 Correction Packet to the **same Codex task** at local HEAD `3a925c13dae51e7d3f3a89977a993ebafb771f1d`.

Do not add features or repeat Desktop research. Fix only the conservative label parser and tests, rerun the final UI suite and relevant core regression, regenerate evidence as needed, and stop at `READY FOR OWNER VALIDATION` if green.

Only after UX-04 closes should the owner run the real `仅复制交付` GUI validation.