# Active Handoff — POST UI-UX-FOUNDATION-01R2

Updated: 2026-09-12
Role: 00 MASTER
Status: **UI-UX-FOUNDATION-01R2 MASTER-ACCEPTED / LOCAL-LAUNCH-PREFLIGHT-01 NEXT**
Owner Validation: **OWNER-DEFERRED / NOT EXECUTED**

## 0. Accepted product checkpoint

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current MASTER-accepted remote SHA:
`3a6137d9b39d8e2bdfef8e6366d9bceec7d01031`

R2 continues normally from R1 `3ca0722c5c9ef3f4136865e9fb973f4d74ea8b42`.

## 1. R2 acceptance result

Owner feedback after R1 required:
1. less nonessential product text/meta chrome;
2. no deliberately Chinese/editorial/serif visual identity requirement;
3. a clearly visible file-import/upload entry.

R2 is accepted because the actual product runtime now:
- presents `选择学习文件` as the first prominent action;
- shows PDF/DOCX/PPTX/TXT/MD and max 10 MB beside it;
- keeps the raw-file/local parsing boundary visible;
- keeps manual paste as a secondary path;
- shows selected filename and extraction state before preview;
- retains explicit preview/selection and the 5,000-char guard;
- uses the local neutral sans-serif stack consistently;
- removes decorative `01 /`, `LEARN`, `EXPLAIN`, `DIAGNOSE` prefixes;
- contains no design-reference direction/state controls in production.

Tracked R2 evidence:
`artifacts/study-teachback/ui-ux-foundation-01r2/`

Actual recorded results:
- Node 45/45 PASS;
- Edge 27/27 PASS with synthetic media/stub provider;
- extraction 6/6 PASS;
- initial file-entry visible at 1440x900 and 390x900;
- import/preview zero provider calls before explicit Learn;
- filename and extraction-state assertions pass;
- existing recording/replay/repair/history/delete/recovery regressions pass;
- safe ledger unchanged: 37 requests, known US$0.01179245, exposure US$0.06859995 / US$5, four unsettled reservations;
- new paid product API calls 0.

Owner Validation remains deferred: no real owner file, physical microphone, live owner semantic journey or efficacy claim is implied.

Non-blocking polish only: footer summary still uses `数据与本次验证边界`; a future copy pass may use `数据与隐私` while retaining the disclosure. Do not open a correction round solely for this.

## 2. Retained product/engineering contract

Active product: **知而能讲 / Study-first + spoken teach-back**.
Flow:
`local file extraction -> preview/select -> Learn -> continuous Explain -> replay/confirm -> Diagnose -> legitimate Repair/new attempt -> Apply`.

Keep unchanged unless new evidence requires a MASTER decision:
- source ingestion formats/limits and local raw-file extraction;
- no OCR or raw-file provider fallback;
- repo-owned extractor venv and pinned pypdf;
- no automatic dependency installation/private Codex runtime dependency;
- original audio saved before ASR;
- strict segment timing and PARTIAL word-timing behavior;
- human replay/critical-ASR confirmation;
- raw/corrected transcript separation;
- source/anchor/attempt identity;
- content/delivery separation;
- supported/delivery -> no targeted knowledge remediation;
- meaningful repair-focus guard;
- missing content -> no fabricated audio span;
- no psychological/intelligence/confidence/accent inference and no global/PTE score;
- continuous Start -> Finish formal recording, no normal pause/resume;
- history/export/delete/recovery/quota/pending-navigation/seven-day cleanup;
- scoped Cancel-first delete confirmation;
- models only `whisper-1` + `gpt-5.6-luna`, semantic Responses store=false;
- no automatic model/provider switch or recharge.

## 3. Why the next task is not another UI correction

R2 satisfies the current owner-facing UI correction. Do not keep iterating typography/copy merely to increase polish.

Owner previously requested progress on software/product/app landing while the real owner walkthrough is deferred. The next unresolved productization question is how a Windows user launches/opens the local product without turning the project into a heavyweight native app prematurely.

This is a new implementation area, so project rules require freshness/collision research before code.

## 4. LOCAL-LAUNCH-PREFLIGHT-01 — research only

Goal:

> Identify the smallest launch/distribution approach that reduces real setup/launch friction for the current Windows local-Web product while preserving the existing local-first/explicit-control architecture.

No code, commit, feature-branch push, installer, native shell or public deploy is authorized by the preflight itself.

Research at minimum:
1. Current official/currently supported Windows/browser install/launch options relevant to localhost/local Web apps (including PWA/installable-Web constraints where applicable).
2. Current Node/local-server startup path and what the user must manually do today.
3. Existing lightweight open-source patterns/projects for a one-command local server + browser launch.
4. Compare at least these routes:
   - **Route A: repo-local one-command launcher** — checks prerequisites, starts existing Node server, opens correct local URL, clear shutdown/recovery;
   - **Route B: installable Web/PWA path** — only if actually compatible with current local origin/offline/update/privacy constraints;
   - **Route C: native wrapper/installer (Electron/Tauri/etc.)** — research cost/benefit only, not authorized implementation.
5. Evaluate against the project's real criteria: fewer manual steps, low maintenance, no credential/token handling, correct repo/version, fail closed, no hidden background service, no auto-upload/paid API.
6. Check current OpenAI/Codex/Windows Desktop capabilities and relevant GitHub projects before recommending custom code, per project rules.

Output classification:
- Verified external/current facts;
- current-product source facts;
- likely tradeoffs;
- unknowns requiring a tiny experiment;
- recommended smallest route;
- what must NOT be implemented yet.

If Route A is clearly lowest-cost and no current capability/project already solves it, MASTER may define a later bounded implementation task. Any installer/native wrapper/public distribution/new framework must return to owner for decision before implementation.

## 5. Current state classification

Completed:
- UI-UX-FOUNDATION-01 R1 + R2 correction;
- R2 MASTER delta review.

Verified:
- accepted feature SHA `3a6137d...`;
- Node45/45, Edge27/27, extraction6/6;
- prominent local file entry and zero-provider import/preview guard;
- unchanged safe ledger and zero new paid calls.

Likely:
- current GUI is adequate to stop synthetic visual iteration and move to the next productization question.

Unknown:
- real owner end-to-end journey;
- best low-friction local launch/distribution route;
- broader AT/device compatibility and learning efficacy.

Not Done:
- OWNER-VALIDATION-01;
- launch/distribution preflight;
- installer/native packaging/public release;
- external validation.

Must Fix:
- none blocking R2 acceptance.

User Decision Needed:
- none for research-only LOCAL-LAUNCH-PREFLIGHT-01;
- native wrapper/installer/public distribution/new paid/provider/framework scope requires owner decision.

Future Optional:
- footer wording polish;
- broader AT/device validation;
- alternate visual directions.

## Next Smallest Step

**Run LOCAL-LAUNCH-PREFLIGHT-01 as research/collision check only. Do not code or package yet. Owner Validation remains deferred.**
