# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED (ENGINEERING/UI SCOPE)**

**OWNER-VALIDATION-01 — OWNER-DEFERRED / NOT EXECUTED**

Active product: **知而能讲**, existing local Web Study-first + spoken teach-back app.
Flow remains:
`local file extraction -> preview/select -> Learn -> continuous Explain -> replay/confirm -> Diagnose -> legitimate Repair/new attempt -> Apply`.

## Exact product state

Private repo: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current MASTER-accepted feature checkpoint:
`3a6137d9b39d8e2bdfef8e6366d9bceec7d01031`

R1 reviewed SHA: `3ca0722c5c9ef3f4136865e9fb973f4d74ea8b42`
Pre-UI accepted checkpoint: `a99d380473a1eac45ada67022c589d654db9c7cd`

Git comparison confirms R2 is a normal two-commit descendant of R1, with no merge-back or destructive lineage issue.

## MASTER review — R2

R2 fixes the three owner-raised product issues without reopening core learning logic.

### Verified from product source

- Initial screen now presents a first-class native `#sourceFile` area labelled `选择学习文件`.
- Supported formats are visible beside the action: PDF / DOCX / PPTX / TXT / MD, max 10 MB.
- The local-processing boundary is adjacent to the file action: the raw file is parsed locally and selected text is only sent after explicit Learn.
- Manual paste is retained as a clear secondary route (`或直接粘贴文字`).
- Filename and extraction status are shown after selection, before preview/selection.
- Preview remains explicit and selected Learn source remains limited to 5,000 characters.
- Headings/body use the neutral local sans-serif stack; deliberate CJK serif/display styling is removed.
- Decorative `01 /`, `LEARN`, `EXPLAIN`, `DIAGNOSE` presentation prefixes are removed from product-facing phase labels.
- Design-reference selectors/direction names/test badges are not part of production runtime.

### Verified from R2 evidence

R2 Delivery Packet / tracked evidence reports and records:
- Node **45/45 PASS**;
- Edge **27/27 PASS** in actual Edge with synthetic media and stub providers;
- extraction **6/6 PASS** using the existing repo-owned environment;
- focused desktop 1440 and mobile 390 checks confirm the native file entry is visible in the initial viewport;
- file import/preview preserves zero provider calls before explicit Learn;
- filename and `解析完成` state are asserted in the browser test;
- existing recording/replay/feedback/repair/history/delete/recovery regressions remain passing;
- screenshot evidence is bound to the R2 source commit and clearly labelled as actual product with synthetic fixtures/stub provider;
- no live physical microphone and no live model API were used in the R2 browser run.

Safe ledger before/after is unchanged:
- requests 37;
- known cost US$0.01179245;
- exposure US$0.06859995 / US$5;
- four unsettled reservations;
- new paid product API calls 0;
- no recharge/provider change.

## Product decision

**UI-UX-FOUNDATION-01R2 = ACCEPTED at engineering/UI scope.**

This means the bounded GUI correction has satisfied the current acceptance criteria. It does NOT mean Owner Validation, learning efficacy, full WCAG/AT certification, release readiness or cross-platform packaging is complete.

One small non-blocking polish item remains: the footer summary still says `数据与本次验证边界`; a future copy-polish pass may rename this to a more product-facing `数据与隐私` while preserving the required disclosure content. Do not open another correction round solely for this wording.

## Retained engineering boundaries

SOURCE-INGESTION-01R remains accepted: repo-owned ignored `.venv`, Python 3.14.6 setup, pinned pypdf 6.18.0, no runtime auto-install/private runtime coupling, local extraction, no OCR/raw-file provider fallback, 10 MB / 30 MB / 100 pages-slides / 200k extracted / 5000 selected limits.

R3/R4 remains authoritative: original audio saved before ASR; strict segment validity; word timing PARTIAL without fabricated precision; critical replay/confirmation; raw/corrected transcript separation; source/anchor/attempt identity; content/delivery separation; meaningful remediation guard; no knowledge repair for supported/delivery; missing content has no audio timestamp; no global/PTE score or psychological/accent inference; history/export/delete/quota/pending-navigation and seven-day cleanup retained.

Models remain `whisper-1` + `gpt-5.6-luna`; semantic Responses calls retain store=false. No automatic provider/model switch or recharge.

## Classification

Completed:
- BUILD-01 / R3 / R4 engineering baseline;
- SOURCE-INGESTION-01 + portability recovery;
- UI-UX-FOUNDATION-01 R1 implementation;
- R2 owner-feedback correction and MASTER delta review.

Verified:
- remote feature SHA `3a6137d...` and normal lineage;
- R2 source-level file-entry / neutral-font / simplified-copy changes;
- Node 45/45, Edge 27/27, extraction 6/6;
- import/preview zero-provider guard;
- unchanged safe ledger / zero new paid product calls.

Likely:
- the current first-screen information hierarchy is materially closer to the owner's stated product expectation; this is still a product judgment, not broad user research.

Unknown:
- real owner file/microphone journey;
- actual user-facing latency/usability over a full session;
- broader assistive-technology/device compatibility;
- learning efficacy;
- release/distribution requirements.

Not Done:
- OWNER-VALIDATION-01;
- external learner validation;
- installer/native packaging/public deployment/release.

Must Fix:
- none currently blocking the accepted R2 engineering/UI scope.

User Decision Needed:
- none for closing R2;
- any native shell/installer/public distribution/provider/budget expansion still requires owner decision.

Future Optional:
- rename footer copy from validation wording to product-facing privacy wording;
- broader AT/device testing;
- other visual directions; do not implement by default.

## Next Smallest Step

Owner previously asked to continue software/product/app landing work while the real walkthrough is deferred. Before any packaging/native-shell implementation, run a bounded **LOCAL-LAUNCH-PREFLIGHT-01** research/collision check only: inspect current Windows launch friction, current official/local-web installability options and existing lightweight projects/patterns; compare repo-local one-command/browser launch, PWA/installable-web, and native wrapper/installer paths; recommend the smallest option that removes a real observed launch/setup cost without expanding to a heavy desktop shell. **No implementation, installer, paid API, public deployment or framework change is authorized by this preflight itself.**
