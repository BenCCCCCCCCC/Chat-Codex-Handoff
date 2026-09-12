# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01 R1 — IMPLEMENTED / MASTER REVIEW = MUST FIX**

**UI-UX-FOUNDATION-01R2 — CORRECTION AUTHORIZED / NOT YET EXECUTED**

**OWNER-VALIDATION-01 — OWNER-DEFERRED / NOT EXECUTED**

Active product: **知而能讲**, existing local Web Study-first + spoken teach-back app.
Flow remains:
`local file extraction -> preview/select -> Learn -> continuous Explain -> replay/confirm -> Diagnose -> legitimate Repair/new attempt -> Apply`.

## Exact product state

Private repo: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
R1 reviewed remote SHA: `3ca0722c5c9ef3f4136865e9fb973f4d74ea8b42`
Accepted pre-UI engineering checkpoint: `a99d380473a1eac45ada67022c589d654db9c7cd`

Git comparison confirms R1 is a normal two-commit descendant of the accepted checkpoint. R1 delivery reports Node 44/44, Edge 26/26, extraction 6/6, zero new paid product API calls and unchanged ledger. These engineering results are accepted as evidence for the implemented delta, but the UI itself is not accepted because owner review found product-facing issues.

## MASTER review — R1

### Verified

- Product code still contains a real local file input: `#sourceFile`, accepting `.md,.txt,.pdf,.docx,.pptx`; file selection remains local extraction and provider access still begins only after explicit Learn.
- The user screenshot is the separate design/reference page in state `02 · 提取预览`, not the actual product runtime. Reference-only controls/labels such as level/direction/state selectors and design annotations are not production controls.
- However, the production entry currently presents file selection as a conventional inline native file input under the label `从本机导入材料`; it is visually secondary and easy to miss.
- Production R1 intentionally uses a paper/editorial direction with a CJK serif display stack and mixed phase labels such as `01 /`, `LEARN`, `EXPLAIN`, `DIAGNOSE`.

### Owner feedback — now authoritative

1. Product-facing UI should reduce nonessential explanatory/meta copy and visual noise.
2. The product does **not** need a deliberately Chinese/editorial style.
3. File upload/import must be an obvious first-class entry; the owner did not perceive one in the current experience/reference.

These are **Must Fix** for R2, not Future Optional.

## R2 bounded correction

R2 stays on the same feature branch and does not change models, extraction contracts, ASR/semantic logic, persistence schema, budget or release scope.

Required:
- move from deliberate Chinese editorial styling to a neutral modern learning/product UI; use the existing local sans-serif UI stack consistently for headings/body and remove forced CJK serif display styling;
- reduce nonessential product chrome/copy: remove decorative numbering/English phase prefixes and redundant helper/meta sentences where safety meaning is already conveyed elsewhere; keep legally/operationally important privacy, processing, error and evidence text but consolidate it;
- first screen must visibly prioritize `选择学习文件 / 上传学习文件（本地解析）`, using the existing `#sourceFile` and existing extraction handler rather than a new upload backend;
- show supported formats and local-processing note adjacent to the primary file action; keep paste/manual text as an explicit secondary route;
- after selection, clearly show chosen filename/extraction status and continue into preview/selection; no provider call before explicit Learn;
- no design-reference selectors, style names, synthetic/test badges or design annotations in production UI;
- preserve all R3/R4/source-ingestion/storage/budget guards and accessibility behavior.

No framework rewrite, new endpoint, cloud raw-file upload, OCR, drag-and-drop dependency, native shell, installer or paid design/model call is authorized merely for this correction.

## Retained engineering boundaries

SOURCE-INGESTION-01R remains accepted: repo-owned ignored `.venv`, Python 3.14.6 setup, pinned pypdf 6.18.0, no runtime auto-install/private runtime coupling, local extraction, no OCR/raw-file provider fallback, 10 MB / 30 MB / 100 pages-slides / 200k extracted / 5000 selected limits.

R3/R4 remains authoritative: original audio saved before ASR; strict segment validity; word timing PARTIAL without fabricated precision; critical replay/confirmation; raw/corrected transcript separation; source/anchor/attempt identity; content/delivery separation; meaningful remediation guard; no knowledge repair for supported/delivery; missing content has no audio timestamp; no global/PTE score or psychological/accent inference; history/export/delete/quota/pending-navigation and seven-day cleanup retained.

Models remain `whisper-1` + `gpt-5.6-luna`; new paid product API calls for R2 = 0. Last reviewed safe ledger remains known US$0.01179245, exposure US$0.06859995 / US$5, four unsettled reservations, US$10 cash ceiling. Codex must verify before/after safely and not recharge/reset.

## Classification

Completed: R1 implementation and evidence package.
Verified: R1 normal lineage; reported 44/44 Node, 26/26 Edge, 6/6 extraction and zero paid calls; actual product contains the local file input.
Likely: a simpler neutral UI with a first-class file action will better match the owner's stated product expectation.
Unknown: R2 visual result until implemented/reviewed; owner real file/mic journey remains deferred.
Not Done: R2 correction and MASTER acceptance; OWNER-VALIDATION-01; external validation/release.
Must Fix: simplify nonessential UI copy/chrome; remove deliberate Chinese-editorial styling; make file import unmistakable.
User Decision Needed: none for this bounded correction.
Future Optional: broader AT/device testing and other visual directions; do not expand now.

## Next Smallest Step

**Send one concise correction packet to the same Codex task: implement UI-UX-FOUNDATION-01R2 on top of `3ca0722...`, rerun focused + retained regressions with zero paid calls, push the same private feature branch, and return exact remote SHA/evidence for MASTER delta review.**
