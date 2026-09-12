# Study-first + in-app teach-back

OWNER-VALIDATION-01 remains paused pending MASTER portability review.

## Source entry

Use “从本机导入材料” on the initial Learn screen. MD/TXT/PDF/DOCX/PPTX are extracted locally; preview and select up to 5,000 characters into the existing source editor. Only pressing “开始一起学” sends selected text to the existing Tutor. Raw files are not uploaded to a provider or persisted. Recording remains directly inside the app.

## Explicit setup (Windows, from repo root)

Prerequisites: ordinary Python 3.14.6 (`py -3`), Node and Edge. Create the repo-owned environment once:

```powershell
py -3 -m venv study-teachback-app/.venv
study-teachback-app/.venv/Scripts/python.exe -I -m pip --isolated install --index-url https://pypi.org/simple --only-binary=:all: --no-deps --require-hashes --disable-pip-version-check -r study-teachback-app/requirements-extractor.txt
node study-teachback-app/server.mjs
```

Open http://127.0.0.1:4317 after owner validation resumes. `.venv` is ignored and must be recreated on another machine; it is not vendored. pypdf is pinned to 6.18.0 with the authorized wheel SHA256 in requirements-extractor.txt. Setup is explicit; the running application never installs/downloads dependencies. No global package install is needed.

The default interpreter is `.venv/Scripts/python.exe` on Windows (`.venv/bin/python` on other systems, not verified here). Optional `STUDY_PYTHON` is an absolute, non-secret path to an operator-selected Python with pypdf 6.18.0. The subprocess receives only SystemRoot, uses `-I`, and has a 15-second timeout. Missing interpreter or missing/wrong pypdf returns a setup/dependency error, with no provider fallback. OPENAI_API_KEY remains server-side and is not passed to the extractor.

## Limits

10 MB input; 30 MB total Office ZIP expansion; 100 PDF pages/slides; 200,000 extracted characters; 5,000 characters selected for Learn. TXT/MD support UTF-8 or BOM-marked UTF-16. Invalid/encrypted/oversized documents fail closed. No OCR: image-only PDFs have no extractable text. Complex layout/reading order must be checked in preview. DOCX main-body/table paragraphs and PPTX slide text are supported; headers, notes, comments, charts and embedded image text are excluded.

## Validation

Portability run: extraction 6/6, Node 42/42, Edge 23/23 (see current evidence packet for actual outcome). Edge uses isolated synthetic media and stub providers, not an owner microphone run. Missing interpreter and dependency are exercised through real subprocesses and HTTP, with provider count zero and unchanged test ledger. Active extraction/setup source is checked for private runtime coupling. Historical evidence is retained.

Run extraction tests with `.venv/Scripts/python.exe -B study-teachback-app/extract_source_test.py` from repo root (prefix the executable path with `study-teachback-app/`). Run `node --test study-teachback-app/tests.mjs study-teachback-app/*.test.mjs` and `node study-teachback-app/browser-tests-r4.mjs`.

Existing Learn → Explain → Diagnose → Repair → Re-explain → Apply behavior is unchanged. Segment validity remains strict; unusable word times are preserved, and replay/confirmation is required. Supported/delivery findings do not expose knowledge remediation. Source, audio, raw/corrected versions, feedback and history retain existing local export/delete and seven-day expiry behavior.

US$5 API exposure / US$10 new cash ceiling, no recharge or provider/model switch. No paid calls in this recovery. Owner validation remains paused; no release/public deployment implied.

## UI-UX-FOUNDATION-01

A / 纸页书桌 presentation on the existing app: paper/ink-green tokens, source and AI text separation, mobile source disclosure, real selection counts, continuous single-focus recording, labelled correction fields, and scoped Cancel-first deletion dialogs. Existing R3/R4, local ingestion, audio/version/ledger safeguards remain authoritative. Pending Tutor actions cannot start another Explain workflow.

Current UI validation receipts are in `artifacts/study-teachback/ui-ux-foundation-01/`: fresh Node 44/44; extraction 6/6; see final versioned Edge receipt and Delivery Packet for the final browser count. Old counts above describe historical portability evidence. Actual Edge tests use isolated synthetic media/stub providers; new paid product API calls 0. Owner Validation is OWNER-DEFERRED / NOT EXECUTED. Native browser UI zoom, assistive technology and real owner microphone have not been tested in this task.
