# Active Handoff — UI-UX-FOUNDATION-01R2

Updated: 2026-09-12
Role: 00 MASTER
Status: R1 MASTER REVIEW = MUST FIX / R2 CORRECTION AUTHORIZED
Owner Validation: OWNER-DEFERRED / NOT EXECUTED

## Correction target

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
R1 remote SHA to continue from: `3ca0722c5c9ef3f4136865e9fb973f4d74ea8b42`
Accepted pre-UI checkpoint: `a99d380473a1eac45ada67022c589d654db9c7cd`
Task: `UI-UX-FOUNDATION-01R2`

Read canonical `docs/master/CURRENT_STATE.md` and this file from `meta/master-state`. Do not switch the product worktree to the meta branch. Preserve unexpected work; no reset/clean/force.

## Why R1 is not accepted yet

R1 implementation/evidence is coherent at engineering scope and reports Node 44/44, Edge 26/26, extraction 6/6, zero new paid product API calls and unchanged ledger. MASTER review found no reason to reopen core business logic.

Owner then provided direct product feedback:

1. reduce nonessential interface text/meta copy;
2. the product does not need a deliberately Chinese/editorial visual style;
3. file upload/import needs to be obvious — the owner did not perceive it.

The screenshot the owner referenced is the design/reference page, not runtime production. Its top `层级/方向/状态` controls, design annotations, synthetic labels and `A / 纸页书桌` footer are reference-only and must never appear in production. Nevertheless the runtime also needs correction: the actual `#sourceFile` exists but is visually secondary, and R1 uses CJK-serif/display treatment plus mixed `01 /`, `LEARN`, `EXPLAIN`, `DIAGNOSE` labels.

## Must Fix — exact bounded delta

### MF1 — simplify product-facing copy/chrome

- Remove decorative phase numbering and English prefixes from user-facing headings (`01 /`, `LEARN`, `EXPLAIN`, `DIAGNOSE`) unless an English word is genuinely necessary for meaning.
- Remove/reduce redundant helper/meta copy that repeats the same concept on the same screen.
- Keep required privacy, cloud-processing, evidence/replay, destructive-action, error and budget meaning. Consolidate rather than delete safety information.
- Do not add design-system names, direction names, synthetic/test badges, debug labels or reference navigation to runtime.
- Keep Chinese product copy natural and concise; this request is about visual neutrality, not switching the product language to English.

### MF2 — neutral modern visual direction

- Stop forcing a Chinese editorial/serif identity. Use the existing local neutral sans-serif stack consistently for headings and body (`Segoe UI`, `Microsoft YaHei`, `Noto Sans CJK SC`, sans-serif fallbacks).
- Remove `Noto Serif CJK SC` / `Songti SC` / `SimSun` as intentional display styling.
- Keep a calm learning product feel, but avoid calligraphy/editorial-paper cues as a branding requirement.
- Warm neutral surfaces and green accents may remain if they work; do not spend scope on a total rebrand or theme switcher.
- Prioritize hierarchy from size/weight/spacing over extra labels and decorative copy.

### MF3 — make file import a first-class entry

Reuse the existing `#sourceFile` input, existing file types and extraction handler. **Do not create a cloud upload endpoint.**

On the initial setup screen, the first obvious action must be a prominent file-import area/button, with wording such as:

`选择学习文件`
`PDF · DOCX · PPTX · TXT · MD，最大 10 MB`
`仅在本机解析文件；点击“开始学习”后才发送你选中的文字。`

Requirements:
- visible without hunting through a conventional form label;
- accessible native file input remains keyboard/screen-reader operable (may be visually styled but not replaced by an inaccessible fake control);
- manual paste/text entry is clearly available as a secondary path, e.g. divider `或直接粘贴文字`;
- chosen filename and extraction state are visible after selection;
- preview/selection remains explicit, <=5000 chars, excessive selection rejected not silently truncated;
- import/preview itself invokes no provider and raw file remains local/not persisted/no fallback upload;
- provider/model work starts only after explicit Learn, exactly as before.

Do not add drag-and-drop as a requirement unless it is trivial and introduces no new dependency/logic; file-picker clarity is sufficient for this correction.

### MF4 — first-screen/flow visual review

The first runtime screenshot at 1440 and 390 must clearly show the file-import entry. Capture also the post-extraction preview so the difference between `choose file` and `preview/select` is unambiguous.

The production UI should visually read as:

`选择文件 / 粘贴文字 -> 核对并选段 -> 开始学习`

not as a design document or a long explanatory form.

## Must preserve

No change to model/provider choices, extraction runtime, persistence schema, data contracts, ASR/feedback semantics, repair gates or budget policy.

Preserve:
- `.md/.txt/.pdf/.docx/.pptx` local extraction;
- no OCR / no raw-file provider fallback;
- 10 MB input, 30 MB Office expansion, 100 pages/slides, 200k extracted chars, 5000 selected chars;
- original audio saved locally before ASR;
- strict segment timing and PARTIAL word-timing behavior;
- full segment replay / critical ASR confirmation before dependent negative judgment;
- raw/corrected transcript separation;
- supported/delivery -> no targeted knowledge remediation;
- meaningful repair-focus guard;
- missing content -> no fabricated audio span;
- no psychological/intelligence/confidence/accent inference or global/PTE score;
- continuous formal recording Start -> Finish, no pause/resume;
- history/export/delete/recovery/pending-navigation/quota/seven-day cleanup;
- scoped delete confirmation added in R1;
- no unsafe innerHTML for model/user text.

Models remain `whisper-1` + `gpt-5.6-luna`. R2 newly authorized paid product API calls = **0**. Do not recharge/reset/switch provider.

## Required implementation/review evidence

Keep this a correction on the same task/branch. Do not re-open B/C themes or make a new app.

At minimum:
- actual diff for `index.html`, `style.css`, presentation-only JS if needed;
- retained Node/Edge/extraction regressions with actual new counts;
- focused test verifying `#sourceFile` is present, accepted extensions unchanged and visible primary import copy exists;
- focused browser check that import/preview still makes zero provider calls;
- 1440 + 390 initial-screen screenshots showing prominent file entry;
- post-extraction preview screenshot;
- Learn + recording + review/feedback smoke screenshots if presentation changes affect them;
- safe ledger before/after unchanged, zero new paid product API calls;
- explicit note that Owner Validation remains deferred/not executed.

Do not merely edit screenshots/reference HTML. The actual `study-teachback-app` runtime must change.

## Concise Correction Packet for Codex

```text
UI-UX-FOUNDATION-01R2 — SAME TASK CORRECTION

Continue from remote SHA:
3ca0722c5c9ef3f4136865e9fb973f4d74ea8b42

Read meta/master-state:
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md

MASTER review result for R1: MUST FIX.
Core learning/ASR/source-ingestion logic is not being reopened.

Only fix these product-facing items:
1. Reduce nonessential UI/meta text and remove decorative `01 /`, `LEARN`, `EXPLAIN`, `DIAGNOSE`-style prefixes where not needed; preserve necessary safety/privacy/evidence/error meaning, consolidated.
2. Remove deliberate Chinese-editorial/serif styling. Use the existing neutral local sans-serif UI stack for headings/body. No rebrand/theme system.
3. Make existing `#sourceFile` a clearly visible primary first-screen entry: `选择学习文件` / supported formats / max 10 MB / local-parsing note. Manual paste is secondary (`或直接粘贴文字`). Keep the actual native accessible file input and existing extraction handler; NO cloud raw-file upload endpoint.
4. After selection show filename/extraction status; keep explicit preview/selection <=5000 and provider call only after explicit Learn.
5. Production must contain no design-reference controls, direction/style names, synthetic/test badges or annotation copy.

Do not change models/providers/business schema/ASR semantics/R3-R4 gates/budget. New paid product API calls = 0.

Rerun retained Node + Edge + extraction tests and focused file-entry/import-zero-provider checks. Capture 1440 + 390 initial screen with obvious file entry plus post-extraction preview. Preserve failed receipts.

Normal fast-forward push same private feature branch only.
Return exact remote SHA + changed files + actual test results + evidence path + ledger before/after + Must Fix/User Decision/Future Optional.
Owner Validation remains OWNER-DEFERRED / NOT EXECUTED.
```

## Exit condition

R2 is ready for MASTER review only when the actual product runtime—not the reference page—shows an obvious file-import entry and the visual/copy simplification is evidenced. No merge/release follows automatically.
