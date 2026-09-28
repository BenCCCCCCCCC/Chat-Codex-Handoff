# Current State

Updated: 2026-09-28
Role: 00 MASTER / authoritative dynamic state

## Stage

**OWNER-VALIDATION-01 — IN PROGRESS / CLEAN PHASE 2 PASS / PHASE 3 NOT EXECUTED**

**ARCHITECTURE-REVIEW-01 — REMOTE SOURCE REVIEW COMPLETE / REFACTOR PROPOSALS NOT IMPLEMENTED**

The owner explicitly confirmed that the last test has not been performed and requested a broad review of product necessity, architecture, workflow, and development process before continuing. Do not treat the old instruction to immediately resume Phase 3 as the current next action.

Active product: **知而能讲** (Study-first + in-app teach-back), not the historical Handoff helper.
Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
Local checkout recorded historically: `F:\Chat-Codex-Handoff\validation-repo`
Feature branch: `prototype/study-teachback-v0.1`
Accepted feature HEAD, also confirmed as the remote branch HEAD during this review:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

The local checkout, browser storage, running server, microphone, and current usage ledger were NOT inspected during this review. Remote source is not proof of local synchronization.

## Authority and current scope

Read this file and `docs/master/HANDOFF.md` on `meta/master-state` for dynamic state.
The feature branch still contains stale Handoff-era copies at the same paths; those copies are not authoritative. The root README also describes the historical Handoff product, and the app README repeats outdated Owner Validation NOT EXECUTED statements. These are confirmed documentation defects, not evidence that the accepted clean Phase 2 has been reversed.

This review updates only the two canonical dynamic-state documents. It does not change feature code, storage retention, model/provider configuration, budgets, local files, repository visibility, or publishing/release behavior. No tests or live model calls were run in this review.

## Retained accepted engineering work

- `OWNER-VALIDATION-PROVENANCE-FIX-01` — MASTER-ACCEPTED for the initial Learn starter at the accepted feature HEAD.
- `UI-UX-FOUNDATION-01R2` — MASTER-ACCEPTED.
- `LOCAL-LAUNCH-01` — MASTER-ACCEPTED, engineering scope only.
- Historical provenance-fix test receipts: Node 48/48, Edge 29/29, zero paid calls for that correction. These are retained historical results, not fresh 2026-09-28 runs.

## OWNER-VALIDATION evidence retained

### Phase 1 — PASS

The owner imported `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx` in the real product.

Verified at that time:
- local DOCX extraction worked;
- necessary-vs-sufficient meaning remained intact;
- same-day visitor badge, laboratory-open state and 18:00 limit remained understandable;
- selected extracted material became the learning source;
- import/preview/use-all added zero provider requests and the ledger remained byte-identical;
- server remained ready.

Minor non-blocking extraction issue: literal `&#x20;` after the title.

### Original Phase 2 — initial-starter provenance defect corrected

The initial Learn starter was wrongly displayed/persisted as owner-authored. The correction at `f6a000c...` made that starter request input only, prevented fabricated user history on initial Tutor failure, and preserved the first genuine owner input as the first stored user message.

The contaminated historical topic must not be resumed as a clean baseline. Do not assume its browser record still exists today.

### Clean Phase 2 rerun — PASS

The owner created a clean topic using the same synthetic DOCX and performed the minimal Learn path in the real browser.

Verified from the owner's screenshots:
- before owner input, only Tutor/assistant content appeared;
- the automatic initial starter was not shown as `你的想法`;
- the first user bubble was exactly the owner-authored question;
- the Tutor retained registration/badge/open-state/18:00 constraints without inventing a guarantee of entry.

This acceptance remains valid for that historical run and that initial-entry scope.

## ARCHITECTURE-REVIEW-01 findings

### R01 — retention makes the old Phase 3 continuation unsafe to assume

Confirmed source behavior: `storage.mjs` calls `api.expire()` during `openStore()`. It deletes entire topics based on topic `createdAt + 7 days`, not the date of the latest attempt.

The clean topic documented on 2026-09-12 is older than seven days on 2026-09-28. If that is still the same record and its timestamp was unchanged, it became eligible for deletion around 2026-09-19 on the next store opening. Actual local existence or deletion has NOT been verified.

Do not tell the owner to reload/restart just to resume the old topic. First establish whether the record is still available and preserve it when safely possible. If it has expired, create a new clean topic from the same synthetic material, perform only the minimal provenance/source sanity check, then conduct the still-unrun Phase 3. Do not claim restoration without evidence. Do not silently extend retention or erase old ledger events.

### R02 — generated-message provenance fix does not cover Repair and Apply

Confirmed by source inspection:
- `teach()` defaults `internalStarter=false` and then appends its message with `role:'user'`.
- the `再学这一点` action calls `teach()` with an application-generated repair instruction without the internal flag;
- the `试一个新情境` action does the same for Apply.
- `provenance.test.mjs` covers the initial Learn entry, not these two action paths.

Therefore those program-generated instructions are still stored as user messages. This is a new uncovered scope of the same defect; it does not invalidate the verified initial-Learn correction. A bounded correction should distinguish actual typed/spoken owner messages from UI-triggered application instructions and extend zero-provider-call regression coverage to Learn/Repair/Apply success and failure. Proposed code change is NOT implemented.

### R03 — product/state identity is misleading at ordinary entry points

Root README, app README, and feature-branch state copies disagree with the canonical active product and phase. Proposed remedy: a product-first entry README and explicit ref-aware pointers, not more version-suffixed Current State files or immediate repository renaming.

### R04 — application, experiments, and historical exceptions need clearer boundaries

The app directory mixes runtime modules with browser-test revisions, credential/live-call probes, and recovery scripts. `ledger.mjs` contains a five-submission exception for historical `synthetic-mandarin-build01`, while normal attempts use two.

Proposed remedy: separate active runtime, zero-call tests, explicitly gated live tools, and retained evidence. Keep production caps unchanged and preserve historical ledger events. Do not move live hook/launcher/helper dependencies until their references are checked.

### R05 — registration occurs before successful microphone acquisition

`app.mjs` calls `/api/register` before `getUserMedia()`, while the ledger counts registration events towards the 60-attempt cap. Denied permission or failed capture can therefore consume registered attempts despite no saved recording. Confirmed call ordering; the owner's actual remaining quota is unknown.

Proposed remedy: make recording creation and budget registration distinct, with a single/idempotent registration after successful acquisition or durable audio save and before any paid ASR call. Do not retroactively delete billing/attempt events merely to restore quota.

### R06 — engineering validity is not semantic or product validity

Existing safeguards worth retaining: local source extraction, explicit send, original audio retention, raw/corrected transcript versions, source/attempt/version binding, required replay, content/delivery separation, quote/reference validation, and conservative budget reservations.

`validateTeaching`/`validateFindings` enforce schema/references/quote presence; they cannot prove that a conclusion follows from the quoted source. Existing logic fixtures already acknowledge this separation. Keep schema validity, semantic correctness, and user benefit as separate acceptance categories.

Near-silence candidates are explicitly uncalibrated observations, not measures of knowledge, personality, or fluency. Do not strengthen these claims.

## Product/refactor proposals — not new approved requirements

Working value hypothesis: help adult Chinese learners learn a bounded source, explain it themselves, find an evidence-grounded gap, and repair/re-explain it. Preserve Study-first and in-app recording; do not replace the product with manual audio uploads or a generic chat wrapper.

Focus validation on whether the grounded recording/review/repair loop provides enough additional value over ordinary assisted study to justify its effort. Market necessity, willingness to repeat, and willingness to pay remain unverified.

Prefer a small modular monolith with clearer UI/workflow/domain/provider/storage/test boundaries. Do not introduce a new frontend framework, agent framework, vector database, microservices, cloud accounts, or full Handoff bridge merely to look more structured.

Preserve `http://127.0.0.1:4317`, the current IndexedDB name/schema, raw/corrected separation, and live-call boundaries during an initial behavior-preserving refactor. Changing origin or schema requires an explicit data-migration plan.

Potential UX improvement, pending design approval: count actually played audio coverage across segments so one complete playback can satisfy the existing review requirement; never replace required replay with an unchecked confirmation. Retention duration and research/validation friction need owner input before changing behavior.

## Live-call boundary retained, not exercised by this audit

Approved owner journey models remain `whisper-1` and `gpt-5.6-luna`. No provider/model switch, recharge, or stress loop. US$5 application exposure hard stop and US$10 cash ceiling remain. The application budget ledger is not a live account billing balance.

The last explicitly read ledger before the provenance correction was requests 39, known cost US$0.01293075, exposure US$0.06973825, unsettled 4. The clean Phase 2 run subsequently used expected live Tutor requests; these figures are HISTORICAL and not current. No fresh ledger was read today.

No additional live request is authorized solely by this review. Existing bounded owner-journey authorization remains subject to preflight/data checks and its original stop conditions. Do not retry ASR without explicit approval after reviewing the failure evidence.

## Classification

Completed: historical readiness, real-owner Phase 1, initial-starter provenance correction, clean Phase 2; remote source/structure review on 2026-09-28.
Verified today: remote branch HEAD, relevant source behavior and documentation contradictions.
Unknown: local HEAD/server/storage/ledger, survival of the old clean topic, physical microphone/ASR/replay UX, downstream diagnosis/repair/apply/export journey, repeated learning benefit.
Not Done: Phase 3 and onward; final Owner Validation; proposed code/documentation-entry refactor; fresh test rerun.
Must address before automatic continuation: stale continuation assumption caused by seven-day expiry. No actual data loss is asserted.
Must fix before claiming full-flow provenance: generated Repair/Apply instructions stored as user-authored.
User decisions needed: primary near-term outcome/use case, why Phase 3 was deferred, acceptable review effort, and desired learning-history retention.
Future Optional: literal `&#x20;` cleanup; unrelated test-page exception only if reproduced; cosmetic or framework changes.

## Next Smallest Step

Review the findings with the owner and settle the product priorities. Establish old-topic availability without causing an avoidable expiry/reload loss. Then prepare a bounded zero-call correction/refactor batch with explicit regression scope; do not restart the whole project and do not mark the still-unrun microphone test PASS.

If the owner chooses to resume Phase 3 after that preflight, retain the original boundary: one natural 20–45 second recording, original-audio save and ASR, replay/transcript checkpoint returned to MASTER BEFORE any diagnosis confirmation.
