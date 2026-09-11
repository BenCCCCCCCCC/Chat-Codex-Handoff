# SOURCE-INGESTION-01R — extractor runtime portability recovery

Date: 2026-09-11
Role: 00 MASTER
Status: AUTHORIZED / NARROW MUST-FIX BEFORE OWNER-VALIDATION-01 RESUMES

## Trigger

MASTER reviewed private `prototype/study-teachback-v0.1` at `dc4893c5ca146037c8a498755854b3ce5cb73c62`.

The SOURCE-INGESTION-01 product behavior is accepted at the current-machine engineering scope:
- `.md/.txt/.pdf/.docx/.pptx` local extraction;
- preview/explicit selection before the existing Learn flow;
- 10 MB input, 100 page/slide, 200k extracted-character and Office expansion limits;
- no OCR, no automatic model call on import, no raw document persistence;
- extraction 6/6, Node 40/40, Edge 23/23;
- zero new paid calls and unchanged API ledger.

However the implementation launcher in `study-teachback-app/ingestion.mjs` hard-codes:

`%USERPROFILE%/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`

and implicitly relies on `pypdf` installed inside that Codex runtime. This is a private/dev-environment dependency, not a product-owned runtime contract. It can break after Codex/runtime/cache changes and would make owner validation pass on an environment that the product itself does not actually own.

The feature-branch README is also stale and still says there is no normal file-upload workflow and reports older test counts.

## MASTER decision

SOURCE-INGESTION-01 is **PARTIAL ACCEPTED** at feature/engineering scope, but OWNER-VALIDATION-01 remains paused until the extractor launcher no longer depends on the private Codex runtime path.

Do not reopen the accepted Learn/Explain/Diagnose/R3/R4 behavior.

## Required recovery

Codex should make the smallest portability correction that preserves the already-tested ingestion behavior.

Must:
1. remove all hard-coded references to `.cache/codex-runtimes`, `codex-primary-runtime`, ChatGPT/Codex application internals, credentials, or private app files from the source-ingestion runtime path;
2. define an explicit product-owned extractor runtime contract and fail clearly if it is unavailable;
3. preserve `python -I` isolation (or an equivalently isolated parser process), the restricted subprocess environment, timeout and size/archive/page/text limits;
4. never auto-download or silently install dependencies at runtime;
5. never send the raw document to OpenAI merely as a fallback;
6. preserve local extraction + preview/selection + explicit Learn handoff;
7. keep scanned/image-only PDFs as `NO_EXTRACTABLE_TEXT`; no OCR expansion;
8. update README/runtime setup documentation so supported formats, prerequisites, limits and current test counts are truthful;
9. add a regression proving the launcher contains no Codex-private runtime dependency and that a missing extractor/dependency fails with a safe user-facing error rather than falling back to a model/provider;
10. rerun extraction + Node + Edge regressions with zero new paid calls.

Preferred implementation order:
- first inspect whether a normal product-usable Python launcher exists (`py -3` / `python` or an explicit non-secret config path) and whether `pypdf` is available outside the Codex cache;
- if yes, use it through a bounded discovery/self-check path and document it;
- if not, stop with a precise dependency decision rather than installing, vendoring, or changing architecture automatically.

A package/dependency decision is ordinary implementation work only if it stays local, free, auditable and within this source-ingestion scope; if Codex proposes a materially larger packaging/runtime architecture, return to MASTER before proceeding.

## Validation after recovery

At minimum:
- MD/TXT local import and selection;
- DOCX/PPTX extraction;
- PDF text extraction;
- extractor unavailable/dependency missing fail-closed;
- no provider invocation before Learn;
- full prior Node/Edge regression remains green;
- ledger unchanged;
- private feature-branch fast-forward push only.

No new Whisper/Luna call is needed.

## Owner-validation consequence

OWNER-VALIDATION-01 remains approved in principle but PAUSED. After this recovery passes MASTER review, resume the existing owner walkthrough from the new feature HEAD and exercise the new source-ingestion path with one low-risk owner-selected file before the microphone portion.

## State classification

Completed: SOURCE-INGESTION-01 feature behavior and current-machine tests.

Verified: remote `dc4893c...`; extraction 6/6, Node 40/40, Edge 23/23; no new paid calls; raw-file local extraction design; hard-coded Codex runtime launcher.

Not Done: product-owned extractor runtime portability; truthful README/runtime documentation; owner file+microphone walkthrough.

Must Fix: remove the private Codex runtime dependency before resuming owner validation.

User Decision Needed: none for this narrow recovery. Return only if a larger dependency/packaging architecture or other retained boundary is required.

Future Optional: OCR, richer page/slide provenance UI, layout-aware extraction, wider document/device compatibility.