# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**SOURCE-INGESTION-01R MASTER-ACCEPTED / OWNER-VALIDATION-01 RESUMED — REAL FILE + MICROPHONE WALKTHROUGH NEXT**

Active product flow:

`MD/TXT/PDF/DOCX/PPTX -> local extraction -> preview/selection -> Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

MASTER directly reviewed private feature branch `prototype/study-teachback-v0.1` at remote HEAD:

`a99d380473a1eac45ada67022c589d654db9c7cd`

SOURCE-INGESTION-01R passes at the tested Windows/local-alpha scope. The portability blocker is closed. OWNER-VALIDATION-01 had already been owner-approved and was only paused; it is now resumed without a new approval because provider/model/budget/data boundaries are unchanged.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — approved/resumed
4. `docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md` — PASS / closed
5. `docs/research/strategy-reset-01/BUILD_01R4_FEEDBACK_ACTION_GATING.md` — PASS / closed
6. earlier R3 / BUILD-01 contracts only as evidence boundaries.

## SOURCE-INGESTION-01R review — PASS

GitHub comparison confirms `a99d380...` is one normal descendant commit ahead of `dc4893c...`.

Accepted runtime strategy:
- repo-owned local virtual environment at `study-teachback-app/.venv`;
- ordinary Python 3.14.6 used for setup;
- pinned `pypdf==6.18.0` with approved wheel SHA256 `05b762b77bcb9dcb4a7c91fcf5dded585b25bee7269ab3d3001d7c55fa1b324b`;
- `.venv` ignored and not committed;
- normal application runtime never auto-installs/downloads dependencies;
- launcher uses repo-relative venv Python, with optional absolute non-secret `STUDY_PYTHON` override;
- no Codex/ChatGPT private runtime/cache dependency;
- child process uses `-I`, restricted environment, 15-second timeout;
- missing interpreter returns `EXTRACTOR_SETUP_REQUIRED`; missing/wrong pypdf returns `EXTRACTOR_DEPENDENCY_REQUIRED`;
- missing runtime/dependency does not invoke provider and does not change ledger.

Source-ingestion behavior remains:
- `.md/.txt/.pdf/.docx/.pptx` local extraction;
- explicit preview/selection before Learn;
- maximum 5,000 characters selected into the existing source editor;
- no raw-file provider fallback and no automatic provider call on import;
- no OCR for scanned/image-only PDFs;
- 10 MB input, 30 MB Office expansion, 100 page/slide, 200k extracted-character limits.

Accepted verification:
- extraction **6/6 PASS**;
- Node **42/42 PASS**;
- Edge **23/23 PASS** at actual Edge / synthetic-media / stub-provider engineering scope;
- real missing-interpreter and empty-venv dependency cases fail closed over HTTP;
- **0 new paid calls**;
- live ledger unchanged: known conservative cost `US$0.01179245`, exposure `US$0.06859995 / US$5`, four historical unsettled reservations preserved;
- historical initial portability-test failure is retained and final rerun passes.

README now documents the file-import workflow, setup prerequisite, pinned dependency, limits, no-OCR/complex-layout limitations and current test state.

## Previously accepted engineering state — unchanged

Do not reopen unless owner validation contradicts it:
- BUILD-01/R3/R4 engineering readiness;
- real Whisper transcript + strict segment timestamp transport PASS;
- word timing PARTIAL; unusable zero-duration provider values are preserved rather than fabricated;
- critical timing uncertainty falls back to validated segment replay + human confirmation;
- corrected bounded Luna necessary/sufficient verdict challenge 7/7 after retained failures were fixed rather than hidden;
- content/delivery separation and R4 remediation gating;
- original audio saved before ASR;
- export/quota/per-attempt-delete/pending-navigation/history/expiry paths at stated engineering scope.

## OWNER-VALIDATION-01 — resumed

The existing owner approval remains valid. The walkthrough should start with one low-risk owner-selected file using the new ingestion path, then continue the already-approved single real-owner microphone journey:

`file import -> preview/select -> Learn -> Explain -> Diagnose -> Repair/Re-explain if warranted -> Apply -> export/history review`

Use only owner-controlled non-sensitive source material and owner's own voice. Models remain `whisper-1` + `gpt-5.6-luna`; US$5 API exposure hard stop and US$10 BUILD-01 cash ceiling remain unchanged. At most one targeted re-explanation attempt is authorized if naturally reached.

Raw owner document and raw owner audio stay local by default and must not be committed. Only sanitized step-level evidence may be pushed to the private feature branch.

Stop and return to MASTER on critical uncorrectable ASR meaning error, material diagnosis contradiction, fabricated/misattached evidence, remediation-gating regression, repeated API retry requirement, failed credential/budget/storage guard, or loss/corruption of original audio/source/attempt identity.

## State Summary

Completed: BUILD-01 through R4; SOURCE-INGESTION-01 + portability recovery; private remote review and engineering regressions.

Verified: remote `a99d380...`; repo-owned `.venv` runtime contract; pypdf 6.18.0 pinned/hash-verified setup; extraction 6/6; Node 42/42; Edge 23/23; zero new paid calls and unchanged ledger.

Likely: current Windows local-alpha runtime is coherent enough for a real file + microphone owner journey.

Unknown: owner real-document extraction quality, complex document reading order, real owner-mic ASR/live semantic behavior, owner-facing latency/friction.

Not Done: resumed OWNER-VALIDATION-01 and post-walkthrough MASTER acceptance; external-user validation/release.

Must Fix: none currently known before owner validation.

User Decision Needed: none to resume the already-approved owner walkthrough. New decision only if a retained stop condition or new scope boundary appears.

Future Optional: installer UX, OCR, richer page/slide provenance, layout-aware extraction, broader OS/device compatibility, external learner study and learning-effect evaluation.

## Next Smallest Step

**Run OWNER-VALIDATION-01 from `a99d380...`: import one low-risk real file, preview/select material, complete one coherent real-owner microphone journey, push only sanitized evidence, then MASTER reviews only the new owner-validation evidence.**