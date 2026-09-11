# OWNER-VALIDATION-01 — Integrated owner microphone walkthrough

Date: 2026-09-11
Role: 00 MASTER
Status: **OWNER APPROVED / PAUSED PENDING SOURCE-INGESTION-01R PORTABILITY FIX / NOT YET EXECUTED**

## 1. Entry gate

MASTER previously approved this bounded owner walkthrough after BUILD-01R4. Since then, SOURCE-INGESTION-01 added local file import on private feature branch `prototype/study-teachback-v0.1` through:

`dc4893c5ca146037c8a498755854b3ce5cb73c62`.

The file-ingestion behavior is accepted at current-machine engineering scope, but its extractor currently depends on a hard-coded private Codex runtime path. Therefore this owner validation remains approved in principle but is temporarily **PAUSED** until:

`docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md`

passes MASTER review.

Do not execute the owner microphone walkthrough from the current ingestion checkpoint.

## 2. Purpose after resume

Validate one coherent real-owner journey:

`File/text source -> Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

The goal is actual product usability and evidence behavior, not learning efficacy, PTE validity, long-term mastery or market fit.

## 3. Approved data / spend boundary

Use only:
- owner's own voice;
- one short non-sensitive owner-selected source;
- after portability recovery, preferably one supported low-risk file imported through the new local extraction preview/selection path;
- existing dedicated server-side OpenAI credential;
- `whisper-1` + `gpt-5.6-luna`;
- existing US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling.

The prior owner approval still authorizes the normal live ASR/semantic calls needed for **one coherent owner walkthrough and at most one targeted re-explanation attempt if the product naturally offers it**, once this protocol is resumed by MASTER.

It does not authorize repeated stress testing, open-ended retries, new provider/model work, public hosting, external users or release action.

Raw owner audio and raw imported source files remain local by default. Do not commit API keys, `.env`, browser profiles, private client files, raw owner audio or raw private documents.

## 4. Execution after SOURCE-INGESTION-01R passes

Codex prepares the local runtime only; owner performs file selection and microphone actions in Edge.

1. Verify local repo/branch/HEAD equals or normally descends from the MASTER-accepted post-portability checkpoint; preserve worktree and ledger.
2. Start only `node study-teachback-app/server.mjs`; keep `http://127.0.0.1:4317` available.
3. Owner selects one supported non-sensitive MD/TXT/PDF/DOCX/PPTX file (or uses pasted text if a file-specific limitation is being intentionally avoided), reviews extracted preview and selects a bounded <=5000-character source section.
4. Confirm importing alone does not trigger a provider/model call. Then start Learn, inspect goals and ask at least one normal Tutor question.
5. Owner clicks `我来讲讲`, explicitly starts recording and explains for about 20–45 seconds. Include at least one condition and one natural self-correction.
6. Finish in-app; verify original audio is retained. Review raw transcript and visible word-timing quality notice.
7. Fully replay each validated segment before confirming. Correct any critical negation/number/condition/term transcription error. Unusable/missing word timing must not produce an invented precise anchor.
8. Inspect content/logic feedback. Check:
   - withdrawn earlier statement is not separately punished after explicit correction;
   - missing content has no fabricated timestamp;
   - necessary conditions are not strengthened into sufficient conditions;
   - source/audio links point to real preserved evidence;
   - supported findings do not show targeted remediation;
   - actionable remediation appears only with meaningful repair guidance.
9. If a mechanical near-silence candidate appears, owner must replay/confirm it before delivery interpretation. Empty/insufficient delivery findings are a valid conservative outcome.
10. Use targeted reteaching only if a real actionable gap exists. If useful, perform at most one partial or full re-explanation and confirm it creates a new attempt while preserving the original.
11. Use Apply; verify it is a new related situation and does not claim long-term transfer/mastery.
12. Export locally and inspect that selected source, audio, raw/corrected transcript and reports are present. Test delete/history only if it does not destroy evidence still needed for assessment.
13. Stop the server after the walkthrough.

## 5. Source-ingestion checks during owner validation

Record whether:
- chosen file is accepted locally;
- extracted text ordering/content is understandable enough for the selected section;
- preview makes limitations visible before Learn;
- selected text, not the raw full document, becomes the learning source;
- no unexpected model/provider call occurs during import;
- scanned/image-only/complex-layout limitations are understandable if encountered.

A complex document extraction mismatch is not automatically a product-wide failure if the preview clearly exposes it and the owner can select/correct a bounded source. Silent corruption or sending unintended raw content is a stop.

## 6. Evidence / privacy

After the run, Codex may commit only sanitized validation evidence that the owner permits:
- step-level PASS / FAIL / UNKNOWN;
- safe request/model/cost metadata;
- sanitized text excerpts only if needed and owner-approved;
- non-sensitive screenshots only if needed.

Do not commit owner raw audio, raw owner files, API keys, `.env`, browser profiles, private client files or sensitive source text.

The owner should not be asked to manually upload a review ZIP. Private feature-branch sync remains the review path.

## 7. Stop conditions

Stop and return to MASTER if any of these occurs:
- imported raw file is unexpectedly sent to the model/provider or persisted contrary to the contract;
- source extraction silently substitutes/corrupts critical meaning without an understandable preview;
- invalid/unconfirmed critical ASR changes meaning and cannot be safely corrected through replay;
- content diagnosis materially contradicts confirmed transcript/source;
- source/audio/timestamp evidence is fabricated or misattached;
- supported feedback exposes knowledge remediation despite R4 guard;
- meaningless repair guidance becomes an actionable route;
- unexpected repeated API retry would be required;
- budget/credential/storage guard fails;
- product loses original audio or corrupts attempt/source identity.

Minor copy/layout friction is recorded for later prioritization but is not automatically a stop unless it blocks the coherent journey.

## 8. Acceptance decision

After execution, MASTER classifies findings as:
- Must Fix;
- User Decision Needed;
- Future Optional.

Possible outcomes:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`;
- `OWNER VALIDATION PASS WITH MUST FIX`;
- `OWNER VALIDATION BLOCKED`.

No merge/release/external-user stage follows automatically.

## 9. Current state classification

Completed: engineering build/readiness through R4; SOURCE-INGESTION-01 behavior and current-machine tests; owner approval for the walkthrough.

Verified: source-ingestion remote `dc4893c...`; extraction 6/6; Node 40/40; Edge 23/23; zero new paid calls; known portability defect in extractor launcher.

Not Done: SOURCE-INGESTION-01R portability fix; real owner file + microphone walkthrough; post-run MASTER review.

Must Fix before walkthrough: remove the private Codex runtime dependency and pass the bounded portability regression.

User Decision Needed: none for the narrow portability recovery. A new decision is needed only if recovery hits a larger dependency/packaging boundary.

Future Optional: broader devices, calibrated alignment/acoustics, OCR/layout-aware extraction, external learners and learning-effect evaluation.