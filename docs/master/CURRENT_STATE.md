# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**SOURCE-INGESTION-01 REMOTE REVIEWED / PARTIAL ACCEPTED — PORTABILITY MUST FIX / OWNER-VALIDATION-01 PAUSED**

Active product remains **Study-first + in-product spoken teach-back** with:

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

and now adds a bounded source-ingestion entry:

`MD/TXT/PDF/DOCX/PPTX -> local extraction -> preview/selection -> existing Learn`.

MASTER directly reviewed private `prototype/study-teachback-v0.1` at remote HEAD:

`dc4893c5ca146037c8a498755854b3ce5cb73c62`

The prior BUILD-01R4 engineering state remains accepted. OWNER-VALIDATION-01 is still approved in principle but is now **PAUSED** because SOURCE-INGESTION-01 introduced one product-runtime portability defect that should be fixed before the real owner walkthrough.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md` — active narrow Must Fix
4. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — approved but paused
5. `docs/research/strategy-reset-01/BUILD_01R4_FEEDBACK_ACTION_GATING.md` — PASS / closed
6. earlier R3 / BUILD-01 contracts only as evidence boundaries.

## SOURCE-INGESTION-01 — accepted evidence

GitHub comparison shows the new feature HEAD is a normal two-commit descendant of accepted R4 checkpoint `09698dfb...`.

Accepted at current-machine engineering scope:
- `.md/.txt/.pdf/.docx/.pptx` import;
- local extraction before model use;
- preview + explicit selection into the existing maximum-5000-character source editor;
- no automatic model call when a file is imported;
- raw file/full preview not persisted as learning history;
- TXT/MD strict text decoding; DOCX/PPTX ZIP/XML extraction without executing macros/external relationships; PDF text extraction only;
- scanned/image-only PDF has no OCR fallback;
- 10 MB input, 30 MB Office archive expansion, 100 page/slide and 200k extracted-character limits; 15-second extractor timeout;
- Python extraction **6/6 PASS**;
- Node **40/40 PASS**;
- Edge **23/23 PASS** at actual Edge / synthetic-media / stub-provider scope;
- **0 new paid calls**, no ledger reset/relabel.

The feature correctly keeps file import separate from OpenAI provider calls until the user explicitly starts Learn. The browser UI also warns that scans/images/charts/comments/notes are outside extraction scope and requires preview checking.

## Must Fix — extractor runtime portability

`study-teachback-app/ingestion.mjs` currently launches Python from the hard-coded private development path:

`%USERPROFILE%/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`

and relies on `pypdf` available inside that Codex runtime.

This is not accepted as a product-owned runtime contract. It can break when Codex/runtime/cache state changes and would make owner validation depend on a private dev environment rather than the application itself.

The feature-branch `study-teachback-app/README.md` is also stale: it still says there is no normal file-upload workflow and reports older engineering test counts.

Active recovery contract:

`docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md`

Required outcome:
- no hard-coded Codex/ChatGPT private runtime path;
- explicit supported extractor runtime + safe fail-closed behavior when unavailable;
- no silent install/download/provider fallback;
- preserve local-only extraction and current safety/size limits;
- truthful README/runtime prerequisite documentation;
- zero new paid calls;
- extraction/Node/Edge regressions remain green.

## Previously accepted engineering state — unchanged

Do not reopen unless the portability recovery changes it:
- BUILD-01R4 Node 38/38 and Edge 22/22 before ingestion;
- real Whisper transcript + strict segment timestamp transport PASS;
- word timing PARTIAL, zero-duration provider values preserved rather than fabricated;
- critical timing uncertainty falls back to validated segment replay + human confirmation;
- corrected bounded Luna necessary/sufficient verdict challenge 7/7 after retained failures were fixed rather than hidden;
- content/delivery separation and R4 remediation gating;
- original audio saved before ASR;
- export/quota/per-attempt-delete/pending-navigation/history/expiry engineering checks at stated scope.

Latest reviewed API ledger remains the pre-ingestion value because ingestion made no paid/provider calls:
- known conservative cost `US$0.01179245`;
- exposure `US$0.06859995 / US$5`;
- BUILD-01 new-cash ceiling `US$10`;
- four historical unsettled reservations preserved.

## Owner validation status

OWNER-VALIDATION-01 is **PAUSED**, not cancelled. Do not execute the microphone walkthrough from `dc4893c...` until SOURCE-INGESTION-01R passes MASTER review.

After recovery, resume the already-approved owner protocol from the new feature HEAD and exercise one low-risk imported file through preview/selection before the Learn + microphone journey.

## State Summary

Completed: BUILD-01 through R4; SOURCE-INGESTION-01 feature implementation and current-machine engineering tests; private remote review.

Verified: remote `dc4893c...`; extraction 6/6; Node 40/40; Edge 23/23; no new paid calls; local preview/selection architecture; hard-coded Codex runtime dependency.

Likely: source-ingestion behavior is suitable for the v0.1 flow once its runtime dependency is product-owned or explicitly supported.

Unknown: portability outside the current Codex runtime; owner real-file extraction quality; complex PDF/document reading order; real owner microphone journey.

Not Done: SOURCE-INGESTION-01R portability recovery; README/runtime documentation correction; resumed OWNER-VALIDATION-01; external validation/release.

Must Fix: remove the private Codex runtime dependency before owner validation.

User Decision Needed: none for the narrow portability recovery. New decision only if recovery requires a materially larger packaging/dependency architecture or another retained boundary.

Future Optional: OCR, richer page/slide provenance UI, layout-aware extraction, broader document/device compatibility, external learner study and learning-effect evaluation.

## Next Smallest Step

**Codex executes SOURCE-INGESTION-01R from `dc4893c...`: remove the private Codex runtime dependency without changing provider/model/data scope, rerun extraction/Node/Edge tests with zero paid calls, push a sanitized checkpoint, and return exact SHA for MASTER review.**