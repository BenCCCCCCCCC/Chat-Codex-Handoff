# OWNER-VALIDATION-01 — Integrated owner file + microphone walkthrough

Date: 2026-09-12
Role: 00 MASTER
Status: **OWNER APPROVED / RESUMED / NOT YET EXECUTED**

## Entry gate

MASTER accepts engineering readiness through BUILD-01R4 plus SOURCE-INGESTION-01R at private feature HEAD:

`prototype/study-teachback-v0.1`

`a99d380473a1eac45ada67022c589d654db9c7cd`

SOURCE-INGESTION-01R closed the temporary portability blocker. The prior owner approval remains valid because provider, model, budget and data boundaries are unchanged.

Accepted entry evidence:
- extraction **6/6 PASS**;
- Node **42/42 PASS**;
- Edge **23/23 PASS** at stated engineering scope;
- repo-owned `.venv` extractor contract using Python 3.14.6 and pinned `pypdf==6.18.0`;
- missing runtime/dependency fails closed with no provider invocation and unchanged ledger;
- prior ASR segment PASS / word timing PARTIAL policy;
- bounded corrected Luna logic 7/7;
- R4 feedback-action gating;
- latest known conservative cost `US$0.01179245`, exposure `US$0.06859995 / US$5`.

This is engineering readiness only, not owner-validation completion, learning-effect evidence or release approval.

## Purpose

Validate one coherent real-owner journey:

`File import -> preview/select -> Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

## Approved boundary

Use one owner-controlled low-risk supported file and the owner's own voice. Live calls remain limited to `whisper-1` + `gpt-5.6-luna` for one coherent walkthrough and at most one targeted re-explanation if naturally reached. Existing US$5 API exposure and US$10 BUILD-01 cash ceilings remain unchanged.

No repeated stress testing, new provider/model/dependency/OCR work, public hosting, external users or release action is authorized.

Raw owner audio and raw imported documents remain local by default and are not part of the review checkpoint.

## Execution

1. Verify local repo/branch/HEAD equals or normally descends from `a99d380...`; preserve worktree and ledger.
2. Verify `study-teachback-app/.venv` is present and pypdf 6.18.0 is available. Do not reinstall if already valid.
3. Start `node study-teachback-app/server.mjs`; keep `http://127.0.0.1:4317` available.
4. Owner imports one low-risk DOCX/PDF/PPTX/MD/TXT file, reviews the preview and selects <=5000 characters.
5. Confirm import/preview alone does not create a provider request and that selected text becomes the learning source. Then start Learn and ask at least one normal Tutor question.
6. Owner uses `我来讲讲` and records about 20–45 seconds with at least one condition and one natural self-correction.
7. Verify original audio remains available; inspect raw transcript and word-timing notice.
8. Fully replay each validated segment and correct any critical negation/number/condition/term ASR error before confirmation.
9. Inspect content feedback and evidence links. Confirm condition direction, withdrawn-claim handling, missing-content timestamp behavior and R4 remediation gating.
10. If a near-silence candidate appears, replay/confirm it before delivery interpretation.
11. Use targeted reteaching only if a real actionable gap exists; at most one partial/full re-explanation if useful.
12. Use Apply and verify it is a related new situation without mastery claims.
13. Export locally and inspect selected source, audio, raw/corrected transcript and reports.
14. Stop the server after the walkthrough.

## Source-ingestion checks

Record whether the chosen file is accepted locally, extracted content/order is understandable enough for the selected section, limitations are visible in preview, selected text rather than the raw full document becomes the source, and import alone causes no provider call.

Complex-layout mismatch is not automatically a product-wide failure if preview exposes it and the owner can select/correct a bounded source. Silent corruption or unintended raw-content transmission is a stop.

## Evidence

After the run, Codex may commit only sanitized step-level PASS / FAIL / UNKNOWN, safe request/model/cost metadata, and non-sensitive review notes/screenshots as needed. Do not commit raw owner audio or raw owner files.

## Stop conditions

Stop and return to MASTER if any of these occurs:
- raw imported file is unexpectedly sent to provider or persisted contrary to the contract;
- extraction silently corrupts critical meaning without an understandable preview;
- extractor/runtime guard fails;
- critical ASR meaning error cannot be safely corrected;
- diagnosis materially contradicts confirmed transcript/source;
- evidence is fabricated or misattached;
- remediation gating regresses;
- repeated API retry is required;
- budget/credential/storage guard fails;
- original audio or source/attempt identity is lost or corrupted.

Minor copy/layout friction is recorded but is not automatically a stop.

## Acceptance decision

Possible outcomes:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`;
- `OWNER VALIDATION PASS WITH MUST FIX`;
- `OWNER VALIDATION BLOCKED`.

No merge/release/external-user step follows automatically.

## State classification

Completed: engineering readiness through R4; SOURCE-INGESTION-01 + portability recovery; owner approval.

Verified: remote `a99d380...`; extraction 6/6; Node 42/42; Edge 23/23; pinned repo-owned extractor setup; zero new paid calls in portability recovery.

Not Done: actual owner file + microphone walkthrough and post-run MASTER review.

Must Fix: none known before execution.

User Decision Needed: none to resume; approval is already satisfied. New decision only if execution hits a retained boundary.

Future Optional: installer UX, broader devices, calibrated alignment/acoustics, OCR/layout-aware extraction, external learners and learning-effect evaluation.