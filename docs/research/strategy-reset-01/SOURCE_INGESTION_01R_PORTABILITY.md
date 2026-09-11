# SOURCE-INGESTION-01R — extractor runtime portability recovery

Date: 2026-09-12
Role: 00 MASTER
Status: **PASS / MASTER-ACCEPTED / CLOSED**

## Trigger

SOURCE-INGESTION-01 added local `.md/.txt/.pdf/.docx/.pptx` extraction + preview/selection before Learn. MASTER found the first implementation depended on a Codex-private Python runtime. A normal Python 3.14.6 probe then showed `pypdf` was absent, so MASTER authorized a repo-owned local venv with pinned `pypdf==6.18.0`.

## Reviewed checkpoint

Private feature branch:

`prototype/study-teachback-v0.1`

Accepted remote HEAD:

`a99d380473a1eac45ada67022c589d654db9c7cd`

GitHub comparison shows this is one normal descendant commit from `dc4893c5ca146037c8a498755854b3ce5cb73c62`.

## Accepted implementation

Runtime contract:
- repo-owned local venv: `study-teachback-app/.venv`;
- bootstrap/setup interpreter: ordinary Python 3.14.6;
- pinned dependency: `pypdf==6.18.0`;
- wheel SHA256 pinned in `requirements-extractor.txt`: `05b762b77bcb9dcb4a7c91fcf5dded585b25bee7269ab3d3001d7c55fa1b324b`;
- one-time explicit setup used hash verification, binary-only and no-deps;
- `.venv` is ignored and not committed;
- normal runtime does not auto-install/download anything;
- default launcher is repo-relative `.venv/Scripts/python.exe` on Windows, with optional absolute non-secret `STUDY_PYTHON` override;
- no active `.cache/codex-runtimes`, `codex-primary-runtime`, ChatGPT/Codex private runtime or private app path dependency;
- extractor subprocess retains `-I`, restricted environment and 15-second timeout;
- missing interpreter fails `EXTRACTOR_SETUP_REQUIRED`;
- missing/wrong pypdf fails `EXTRACTOR_DEPENDENCY_REQUIRED`;
- missing setup/dependency never invokes model/provider and does not alter ledger.

Source-ingestion contract remains unchanged:
- MD/TXT/PDF/DOCX/PPTX local extraction;
- preview + explicit selection before Learn;
- no provider/model call merely from file import;
- no raw-file cloud fallback;
- no raw document persistence in learning history;
- 10 MB input, 30 MB Office archive expansion, 100 pages/slides, 200k extracted characters, 5k selected source limit;
- no OCR; complex layout/reading order must be reviewed in preview.

## Verification

Accepted evidence:
- extraction tests: **6/6 PASS**;
- Node: **42/42 PASS**;
- Edge: **23/23 PASS** at actual Edge / synthetic media / stub-provider scope;
- real absent-interpreter and empty-venv dependency cases fail closed over HTTP;
- provider invocation count remains zero in setup/import failure regressions;
- live ledger unchanged;
- **0 new paid calls**;
- README updated with actual file-ingestion workflow, setup prerequisite, pinned dependency, supported formats, limits and no-OCR/complex-layout limitation;
- historical initial static-test failure was retained, corrected, and final suite passed.

Latest live ledger remains known conservative cost `US$0.01179245`, exposure `US$0.06859995 / US$5`, with four historical unsettled reservations preserved.

## Scope interpretation

This closes the specific private-runtime portability defect for the tested Windows/local-alpha environment. It is not proof of installer quality or broad cross-platform compatibility. `.venv` setup remains an explicit developer/alpha prerequisite.

Other-machine/non-Windows behavior, richer packaging/installer UX, OCR and layout-aware extraction remain unverified/out of scope.

## Owner-validation consequence

OWNER-VALIDATION-01 is now **RESUMED**. Existing owner approval remains valid because this recovery changed no provider/model/budget/data boundary.

The resumed walkthrough should begin with one low-risk imported file -> preview/selection -> Learn, then proceed through the existing real-owner microphone journey.

## State classification

Completed: private-runtime removal, repo-owned extractor setup, regression and README correction.

Verified: `a99d380...`; pypdf 6.18.0 pinned/hash setup; extraction 6/6; Node 42/42; Edge 23/23; zero paid calls; unchanged ledger.

Must Fix: none remaining in this recovery.

Not Done: real owner file + microphone walkthrough; broader packaging/device/document compatibility.

User Decision Needed: none for resuming the already-approved OWNER-VALIDATION-01.

Future Optional: installer UX, OCR, richer page/slide provenance, layout-aware parsing, wider OS/device compatibility.