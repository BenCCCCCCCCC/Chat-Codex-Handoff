# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED (ENGINEERING/UI SCOPE)**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

**LOCAL-LAUNCH-SMOKE-01 — PARTIAL / CLOSED AS EVIDENCE**

**LOCAL-LAUNCH-LIFECYCLE-DIAG-01 — INCONCLUSIVE / CLOSED**

**LOCAL-BOOTSTRAP-PREFLIGHT-01 — PASS / NO NEW IMPLEMENTATION AUTHORIZED**

**OWNER-VALIDATION-01 — PREPARED / READY TO EXECUTE / NOT YET EXECUTED**

Active product: **知而能讲**, Windows local-Web Study-first + spoken teach-back alpha.

Flow:
`local file extraction -> preview/select -> Learn -> continuous Explain -> replay/confirm -> Diagnose -> legitimate Repair/new attempt -> Apply`.

## Exact product state

Private repo: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current remote feature HEAD verified by MASTER:
`912bce6542eef4fe813f32fe4e160acd97ca2d71`

Accepted product/UI implementation is contained in the normal lineage through `3a6137d...`; accepted launcher implementation is `a4a360d...`. Later feature commits contain docs/evidence corrections only and do not alter study runtime behavior.

Current authoritative read order:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md`
4. prior R4/R3/source-ingestion evidence only when a specific boundary needs verification.

## Pre-validation engineering state

Retained accepted evidence:
- source extraction 6/6 PASS;
- Node 45/45 PASS at the latest UI regression scope;
- Edge 27/27 PASS using actual Edge with synthetic media/stub providers;
- PowerShell launcher suite 14/14 PASS at engineering scope;
- repo-owned ignored `.venv` and pinned `pypdf==6.18.0` extraction contract;
- no runtime auto-install/private Codex runtime coupling;
- local raw-file extraction and explicit preview/selection;
- no OCR and no raw-file provider fallback;
- 10 MB input / 30 MB Office expansion / 100 pages-slides / 200k extracted chars / 5,000 selected chars;
- original audio saved locally before ASR;
- strict valid segment timing; unusable word times remain PARTIAL and are never widened/interpolated;
- critical ASR uncertainty requires replay/user confirmation;
- raw/corrected transcript separation;
- content/delivery separation and meaningful remediation gating;
- supported/delivery findings do not expose targeted knowledge remediation;
- missing content has no fabricated audio timestamp;
- history/export/delete/quota/pending-navigation/seven-day cleanup protections;
- scoped Cancel-first deletion confirmation;
- models remain `whisper-1` + `gpt-5.6-luna`, semantic Responses `store=false`;
- no global/PTE score and no psychological/intelligence/confidence/accent inference from acoustics.

Last reviewed safe ledger evidence before Owner Validation:
- known cost: US$0.01179245;
- exposure: US$0.06859995 / US$5;
- four historical unsettled reservations;
- BUILD-01 new-cash ceiling: US$10;
- launch/UI/diagnostic work added 0 paid product calls.

These numbers are historical review evidence, not a substitute for the fresh live ledger check that Codex must perform immediately before the owner walkthrough.

## Launcher evidence boundary

The repo-owned Windows launcher remains accepted at engineering scope, but Explorer double-click/default-browser/visible-console Enter/Ctrl+C lifecycle is not fully verified. The bounded lifecycle diagnosis was INCONCLUSIVE and is closed; no launcher defect was proven and no further automated desktop probing is authorized by default.

**OWNER-VALIDATION-01 must therefore use the direct, already-established server start path rather than making launcher UX part of the validation:**

`node study-teachback-app/server.mjs`

Keep `http://127.0.0.1:4317` available and have the owner operate the browser manually. This isolates the learning/product journey from the still-unverified launcher-interaction edge.

## OWNER-VALIDATION-01 preparation decision

The owner has now asked to prepare OWNER-VALIDATION-01. The prior approval remains valid; no new model/provider/budget/data expansion is introduced.

Purpose: validate one coherent real-owner journey:

`File import -> preview/select -> Learn -> Explain -> replay/confirm -> Diagnose -> Repair/Re-explain if warranted -> Apply -> export/history review`.

### Test source

Use one owner-controlled, low-risk supported file. Preferred bounded fixture, if already available locally, is the previously prepared synthetic DOCX:

`OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`

It contains deliberately useful condition logic (registration is necessary but not sufficient for entry), no personal data and no need for OCR. If that fixture is not locally available, the owner may instead choose any low-risk DOCX/PDF/PPTX/MD/TXT whose meaning they can personally verify.

Do not use sensitive/private-client material for this run.

### Execution scope

Codex prepares runtime only; the owner performs file selection, learning interaction and microphone actions.

Before owner interaction Codex must:
1. verify repo `F:\Chat-Codex-Handoff\validation-repo`, branch `prototype/study-teachback-v0.1`, HEAD equals or normally descends from `912bce...`, remote lineage and worktree;
2. preserve unrelated work and current ledger; no reset/clean/force;
3. verify the existing repo-owned extractor runtime and pypdf 6.18.0; do not reinstall if already valid;
4. safely verify the existing model-access configuration is available without exposing or rewriting it;
5. safely record current ledger summary;
6. start only `node study-teachback-app/server.mjs` on the existing loopback origin;
7. confirm safe readiness with GET-only status checks and no Tutor/ASR/provider request;
8. return `OWNER_VALIDATION_READY` and wait.

### Owner walkthrough

1. Open `http://127.0.0.1:4317`.
2. Import the selected low-risk supported file.
3. Check filename, extraction state and preview. Confirm critical condition wording/order is understandable.
4. Select a coherent section <=5,000 characters; import/preview alone must not create a provider/model request.
5. Start Learn and ask at least one normal Tutor question.
6. Click `我来讲讲`; record about 20–45 seconds in natural language. Include at least one condition relation and, if natural, one genuine self-correction; do not read a polished script.
7. Verify original audio is playable and retained. Review the raw transcript and timing notice.
8. Fully replay every validated segment before confirmation. Correct critical negation, number, condition or jargon errors before diagnosis. Word-level PARTIAL timing is acceptable; do not require fabricated precision.
9. Review diagnosis. Check that the final corrected stance is judged, a withdrawn earlier statement is not punished twice, missing content has no fake timestamp, and supported/delivery findings do not expose knowledge-remediation actions.
10. Delivery feedback may be empty. Any near-silence candidate must be replay-confirmed before interpretation.
11. Use targeted repair/reteaching only if a real actionable content gap exists. At most one re-explanation attempt is authorized. Preserve the original attempt.
12. Use Apply once and verify it is a related but new situation, not the same-task repair and not a long-term mastery claim.
13. Export locally and inspect that the existing export contains the selected source, original audio, raw/corrected transcript versions and reports. Review history/source-version behavior. Do not delete evidence before MASTER review.
14. Tell MASTER whether the walkthrough completed and any visible friction/failure. No raw audio/file upload to Chat is required.

### Live-call boundary

For this owner validation only, normal live calls to the already-approved `whisper-1` + `gpt-5.6-luna` are authorized for one coherent walkthrough and at most one naturally warranted targeted re-explanation. Existing US$5 exposure hard stop and US$10 cash ceiling remain unchanged. No repeated stress testing/retry loop.

### Stop conditions

Stop and return to MASTER if any of the following occurs:
- raw imported file is unexpectedly sent to provider or persisted contrary to contract;
- extraction silently corrupts critical meaning without understandable preview;
- extractor/runtime guard fails;
- critical ASR meaning error cannot be safely corrected;
- diagnosis materially contradicts confirmed source/transcript;
- source/audio/span evidence is fabricated or misattached;
- remediation gating regresses;
- repeated API retry becomes necessary;
- budget/access/storage guard fails;
- original audio, source identity, attempt identity or corrected/raw version lineage is lost/corrupted.

Minor copy/layout friction is recorded but is not an automatic stop if the journey remains coherent.

## After the walkthrough

After the owner says the walkthrough is complete, Codex must:
- stop only the server/process it prepared for the walkthrough;
- collect sanitized step-level PASS/FAIL/UNKNOWN and safe model/request/cost metadata;
- never commit raw owner files/audio, secrets, `.env`, browser profiles or `.venv`;
- normal fast-forward push only `prototype/study-teachback-v0.1` with tracked human-readable owner-validation evidence;
- return exact remote SHA, walkthrough summary, safe ledger before/after and unresolved items.

MASTER then reviews only the new owner-validation evidence.

Possible outcomes:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`;
- `OWNER VALIDATION PASS WITH MUST FIX`;
- `OWNER VALIDATION BLOCKED`.

No merge/release/external-user action follows automatically.

## Classification

Completed:
- engineering readiness through UI R2 and local launcher engineering acceptance;
- source-ingestion/ASR/R4/storage/budget protections;
- bounded launch diagnostics/bootstrap preflight;
- OWNER-VALIDATION-01 preparation protocol refreshed against current feature state.

Verified:
- remote feature HEAD `912bce...`;
- retained engineering evidence above;
- current validation may use the direct server path without depending on unverified launcher UI lifecycle.

Likely:
- the product is ready for a bounded real-owner file + microphone journey at the existing alpha scope.

Unknown:
- real owner document extraction quality;
- real physical-microphone/ASR/semantic behavior and latency;
- real owner-facing friction and learning usefulness.

Not Done:
- actual OWNER-VALIDATION-01 walkthrough;
- post-run MASTER acceptance;
- external validation/installer/release.

Must Fix:
- none known before execution.

User Decision Needed:
- none to execute this already-approved bounded owner validation.

Future Optional:
- manual launcher UX smoke;
- fresh-machine onboarding/distribution only after owner validation or a separate explicit decision.

## Next Smallest Step

**Codex prepares the current branch/runtime and returns `OWNER_VALIDATION_READY`; then the owner performs exactly one bounded file + microphone walkthrough.**
