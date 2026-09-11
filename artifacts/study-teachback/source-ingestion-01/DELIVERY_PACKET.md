# SOURCE-INGESTION-01 Delivery Packet

Status: IMPLEMENTED / ENGINEERING-TESTED. OWNER-VALIDATION-01 paused by explicit owner instruction; no owner microphone run performed. MASTER ref still describes the earlier walkthrough, and SOURCE_INGESTION_01.md was absent (404); the latest owner instruction supplies this scope.

Before HEAD: 09698dfb85c783c67ac83e6462c33d61aee31122
Branch: prototype/study-teachback-v0.1

## Function matrix

- MD/TXT: UTF-8 (with optional BOM), UTF-16 BOM; strict decoding, no rendered Markdown/HTML.
- PDF: installed pypdf text extraction, page order; encrypted/empty/scanned-only documents rejected. No OCR.
- DOCX: main-body paragraphs/table text, local ZIP/XML parsing; no macros, external relationships or embedded objects executed.
- PPTX: slide text, presentation relationship order when present; no notes/images/charts extraction.
- All: loopback-only authenticated-origin endpoint, 10 MB input / 30 MB Office archive expansion / 100 pages or slides / 200,000 text character limits, 15 second subprocess timeout.
- Preview and explicit text selection, maximum 5,000 characters in the existing source editor, then existing Learn button. No automatic model call on import. Original file and full preview not persisted; selected text uses existing source/history/export/delete/retention behavior.
- Rendering uses textarea/textContent; no document scripts/rendering. Extraction subprocess does not inherit the API key. No document contents in subprocess errors/logs or temporary files.

## Verification

Python extraction 6/6: Mandarin TXT/MD, DOCX/PPTX, real PDF text stream, malformed/empty/encoding failures, limits, XML entities.
Node 40/40: full original suite plus local extraction HTTP origin/format handling and provider/ledger isolation.
Edge 23/23: real isolated Edge, stubbed providers and synthetic media; local MD preview/selection without paid request, and original feedback/recording/storage/expiry/repair regressions.
Initial sandbox Edge debugging timeout retained in browser receipt; escalated isolated rerun passed. This is engineering evidence, not an owner microphone result.
New paid calls: 0. No dependencies installed; reuses existing bundled Python and pypdf. No ledger reset/relabel; see ledger verification.

## Limitations / review classification

Completed / Verified: bounded local extraction + preview/selection integration and stated tests.
Unknown: owner's real documents, complex PDF reading order, image-heavy/layout-heavy documents. DOCX headers/footers/comments and PPTX notes are excluded. Preview must be checked before learning.
Must Fix: none observed in tested scope.
User Decision Needed: resume an owner walkthrough after reviewing this checkpoint; walkthrough remains paused.
Future Optional: OCR, richer layout/provenance presentation, broader encoding/document compatibility; these are not implemented.
Runtime requires the already-installed workspace Python location under USERPROFILE and pypdf; no automatic installation/fallback.

No raw owner documents/audio, credentials, runtime profiles or ZIP review bundles are included. No merge/release/public deployment.
