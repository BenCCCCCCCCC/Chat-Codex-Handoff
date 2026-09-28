# Current State

Updated: 2026-09-28 (owner clarification after architecture review)
Role: 00 MASTER / authoritative dynamic state

## Stage

**OWNER-VALIDATION-01 — CLEAN PHASE 2 PASS / PHASE 3 NOT EXECUTED / LIVE RESUMPTION ON COST-READINESS HOLD**

**ARCHITECTURE-REVIEW-01 — REMOTE REVIEW COMPLETE / OWNER PRIORITIES RECORDED / REFACTOR NOT IMPLEMENTED**

Active product: **知而能讲** (Study-first + in-app teach-back), not the historical Handoff helper.
Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
Recorded local checkout: `F:\Chat-Codex-Handoff\validation-repo`
Feature branch: `prototype/study-teachback-v0.1`
Accepted feature HEAD, also confirmed as remote HEAD on 2026-09-28:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

The local checkout, running server, browser records, microphone and current usage ledger have NOT been inspected in these remote review/clarification turns. Remote source is not proof of local synchronization.

## Authority and retained review evidence

Dynamic authority is this file and `docs/master/HANDOFF.md` on `meta/master-state`.
Same-named feature-branch files are stale Handoff-era state, not authority. Root/app README contradictions remain unresolved.

The detailed pre-clarification architecture review is retained at immutable commit `9a3c77789f99add12f6523282a2114cc8cb78e39`, in these same two paths. The concise findings below remain active; that commit's unanswered-owner-question and immediate-next-action wording is superseded by this file.

Only canonical documentation is updated in this clarification. No feature code, stored records, models, budgets, repository visibility, publishing or release behavior changed. No local tests or product API requests were run.

## Owner decisions — confirmed in the current conversation

### D1 — outcomes

Priority order: **stable personal use first; a demonstrable/job-search portfolio second**.
External-user validation and commercialization are not the current priority. Portfolio work must use actual artifacts and verified results; do not invent adoption, learning gains or metrics. A polished demonstration does not replace real owner validation.

### D2 — primary scenario

Main intended audience: students. Primary provisional scenario: course concepts and learning material. The owner has not chosen a precise subject or a narrower student segment; do not invent one as a settled decision.

Explaining an interview project is a plausible adjacent use of the same source-to-explanation flow, not proof that it works and not approval for a second interview-coaching product. No resume scoring, job matching or separate interview subsystem is added.

Retain Study-first and in-app recording. Working product statement: help a student understand a bounded learning source, explain it in their own words, and use both content evidence and speech-process evidence to locate the specific concept relation, reasoning transition, retrieval point or explanation segment that is less familiar / less smooth, then practice that point again. The purpose is diagnostic localization of learning friction, not presentation polish, generic speaking performance or a PTE-equivalent score.

### D3 — reason for deferred Phase 3

The owner states **lack of time and incomplete cost preparation**. Do not infer low product value, lack of interest, microphone failure or confusing launch from non-completion. Repeated value remains unverified for independent reasons, not because this test was deferred.

Current working boundary: **zero additional product API calls until the owner is ready and explicitly resumes a bounded live test**. This is a planning/authorization hold, not a newly implemented application switch. Historical budget ceilings are not permission to spend now.

### D4 — clarity and replay uncertainty

The owner does not yet understand replay or its workflow and has NOT approved a time burden, blanket full-replay policy, a skip policy or an adaptive-replay implementation.

Owner quality preference: non-redundant, clear, direct, sufficiently complete, unambiguous answers in simple wording. Operationalize this first for AI teaching/feedback and UI instructions; do not silently turn it into a new rubric for grading the owner's speech, accent or fluency.

Replay means listening to one's own saved audio while checking the ASR transcript, not AI reading its answer aloud. It protects against transcription errors becoming false knowledge diagnoses. Correcting an ASR mishearing does not count as a new spoken performance; genuine spoken mistakes must not be silently rewritten into evidence of improvement.

Current implementation still requires segment replay before diagnosis. A proposed UX may count genuine complete-player coverage rather than require redundant per-segment clicks. That proposal is not implemented or accepted as a replacement gate; do not bypass current Phase 3 replay/confirmation.

### D5 — retention

The owner approves the requirement direction: **user-customizable retention, with a default and reminders**.
This does not approve an exact duration, deletion anchor, retroactive migration, reminder channel, cloud backup or a current storage-policy change.

MASTER proposal for later design, not an active default: offer a simple default such as 30 days for new records, finite/custom choices and an explicit keep-until-manual-delete choice with local-storage limits disclosed. Show expiry and in-app reminders; allow export or extension before irreversible deletion. An in-app reminder must not be described as a background notification while the app is closed. Decide reopen-after-expiry/grace behavior explicitly; do not delete first and then claim to have warned the user. Existing records require explicit migration/consent; do not silently extend or shorten their lifetime.

### D6 — diagnostic role of speech evidence and feedback split

The owner clarifies that expression analysis is primarily for **more precise localization of where the learner's logic/content is not yet familiar or the explanation process is not smooth**, not for training presentation style as an end in itself.

Feedback should be visibly separated into two areas:
- **内容理解**: source-grounded correctness, completeness, conditions, concept relations, contradictions and unresolved logic.
- **表达过程证据**: observable evidence from the original recording / aligned transcript such as pause location, restart/self-repair, repetition, pacing/segmentation and, only where technically validated and useful, energy/pitch-related features.

Speech-process evidence is a locator and supporting signal, not proof of misunderstanding. A pause, restart, pitch pattern or slower section must not by itself be converted into "you do not understand this". Cross-channel feedback may say that a specific logic transition is worth re-explaining when content evidence and process evidence converge, while preserving the evidence separately. Do not infer confidence, anxiety, personality, accent quality or a global fluency score.

## Product/UX proposals — not implemented

Primary flow remains: selected course material -> clear short teaching -> own explanation -> dual evidence pipeline (ASR/content + original-audio speech process) -> transcript/audio check -> two-part grounded feedback -> optional focused relearning/re-explanation -> optional new application context.

Feedback should keep **内容理解** and **表达过程证据** visually and semantically separate. The content panel should first answer what is correct or needs attention, explain the main unresolved source-grounded gap and offer one useful next step. The process panel should show only useful observable speech evidence and point to where the learner may want to re-explain; it must not downgrade knowledge merely because speech is hesitant. Put supporting source/audio references behind a clear expandable entry when appropriate. This is progressive disclosure, not omission of critical conditions. No arbitrary short-word limit, decorative repetition, compulsory problems when the explanation is already correct, global PTE-style score, or claims of comprehensive mastery from a limited response.

Keep learning-content correctness distinct from wording/conciseness. Concision cannot justify dropping negation, necessary/sufficient conditions, numbers, terms or uncertainty.

The next evidence to collect, when live testing resumes, is whether the two channels can correctly localize a concrete weak/less-familiar point without conflating speech behavior with knowledge, whether the owner recognizes the localization as useful and knows what to practice next, plus actual workflow/cost friction. This is not yet a learning-efficacy or market-demand result.

## Retained owner-validation evidence

### Phase 1 — historical PASS

Owner imported `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx` in the real product. Local extraction/preview/selection worked; registration necessary-vs-sufficient meaning, same-day badge, laboratory-open state and 18:00 constraint remained understandable. Import/preview/use-all added zero provider requests and the ledger was byte-identical. Minor non-blocking literal `&#x20;` after the title.

### Initial-starter provenance correction and clean Phase 2 — historical PASS

`OWNER-VALIDATION-PROVENANCE-FIX-01` was accepted at `f6a000c...`: initial internal Learn instruction is request input only, not a stored owner utterance; initial failure does not fabricate user history.

Historical receipts: Node48/48, Edge29/29, zero paid correction calls. These were NOT rerun today.

In the clean owner-browser rerun, only Tutor content appeared before genuine owner input; the first `你的想法` was the owner's real question. Tutor remained grounded in registration/badge/open-state/18:00 constraints without an unsupported entry guarantee.

The original contaminated topic is evidence only. Neither old topic is assumed to still exist locally.

Retained engineering acceptances: `UI-UX-FOUNDATION-01R2` and `LOCAL-LAUNCH-01` (engineering scope). None establishes physical-microphone success or final owner acceptance.

## Active architecture findings

### R01 — old-topic availability and expiry preflight

`storage.mjs` runs `api.expire()` during `openStore()`, deleting whole topics using `createdAt + 7 days`, not latest attempt/activity. An unchanged 2026-09-12 topic became eligible around 2026-09-19. Actual survival/deletion is unknown.

Do not advise reload/restart merely to inspect it. Preserve an available record via a safe export/read-only path when possible. Do not promise restoration, run expiry during inspection, change origin/database identity or erase the ledger. If expired, use the same synthetic material for a new clean topic plus minimal provenance/source sanity check before the first Phase 3 recording; no need to repeat all historical gates.

### R02 — generated Repair/Apply instructions still stored as user messages

`teach()` defaults `internalStarter=false`. The `再学这一点` and `试一个新情境` handlers omit that flag for app-generated instructions. Existing provenance tests cover initial Learn, not those actions.

Must fix before claiming full-flow provenance; this does not reverse clean initial-Learn acceptance. A bounded correction must distinguish actual owner input from UI-triggered internal context and test Learn/Repair/Apply success/failure without provider calls. Not implemented.

### R03 — misleading entry documentation

Root README describes Handoff, app README repeats obsolete Owner Validation NOT EXECUTED, and feature-branch state copies point to old work. Correct product entrypoints and ref-aware pointers, without new suffix snapshots or automatic repository renaming. Not implemented.

### R04 — runtime, probes and historical exceptions

Runtime code shares a directory with browser-test revisions, credential/live probes and recovery scripts. Ledger includes a five-submission exception for `synthetic-mandarin-build01`; normal attempts use two. Separate responsibilities only where useful, retain evidence/history and caps, and check live hook/helper/launcher paths before moving anything. Broad directory restructuring is not a prerequisite for Phase 3.

### R05 — registration precedes microphone success

`/api/register` precedes `getUserMedia()`, and registrations count toward the 60-attempt limit even after failed capture startup. Actual remaining quota is unknown. Proposed bounded fix: idempotent registration at a valid recording boundary, before paid ASR; no historical ledger reset. Not implemented.

### R06 — validity categories

Retain local extraction, explicit send, original audio, raw/corrected versions, source/attempt/version binding, replay, content/delivery separation, reference validation and conservative budget reservations.

Schema/reference/quote validity is not entailment, learning efficacy or user benefit. Existing logic fixtures have bounded scope. Near-silence candidates are uncalibrated observations, not fluency, knowledge or personality scores.

## Implementation/process boundaries

Prefer small behavior-preserving corrections over framework replacement. Preserve `http://127.0.0.1:4317`, IndexedDB identity/schema, raw audio and version relationships, existing models and caps. Data-policy work needs its own explicit migration/deletion tests.

No new frontend/agent framework, vector store, microservices, cloud account system, public deployment, SaaS, separate interview mode, automatic paste/send or full Handoff bridge.

Before a new implementation batch, do a targeted current official/existing-project check relevant to that gap. Do not reopen every settled architecture choice or run paid probes merely for freshness.

Keep engineering tests, real owner workflow and repeatable value as separate acceptance categories. Review ordinary changes by delta; use stronger review for provenance, data loss, audio meaning and money. Do not require all future UX/retention improvements before one bounded Phase 3 run.

## Cost boundary

Historical approved models: `whisper-1` + `gpt-5.6-luna`; historical application exposure cap US$5 and cash ceiling US$10. These remain ceilings, not a current funding decision or a verified account balance. No switch, recharge, automatic retry or stress loop.

Last explicitly read pre-correction ledger: requests39, known estimate US$0.01293075, exposure US$0.06973825, unsettled4. Clean Phase 2 subsequently used live Tutor requests. These figures are historical and MUST NOT be presented as today's balance/cost.

Before renewed live authorization: verify actual configured endpoint/model/current public rates and a fresh safe ledger; present a bounded experiment's conservative estimate and its request/retry cap. Keep estimates separate from invoices and real account funds. Do not make a paid call solely to check readiness. Discuss development validation budget separately from later recurring personal-use budget; neither number is set by the owner's clarification.

## Classification

Completed: remote architecture review; owner priority/scenario/deferral clarification; canonical state/handoff update. Historical Phase1 and clean Phase2 retained.
Verified: owner's stated decisions; remote feature HEAD; cited source-level behaviors. No new runtime verification.
Likely: a course-learning-first product can also support some source-grounded project explanations; targeted replay/feedback simplification may reduce effort. Both remain hypotheses.
Unknown: local data/server/ledger, exact test and ongoing budget, tolerated replay effort, precise course use case, exact retention/default/reminder semantics, microphone/ASR/downstream experience and repeated value.
Not Done: Phase3 onward; final owner acceptance; proposed code, feedback UI or retention changes; fresh tests/live pricing/ledger verification.
Must Fix: R02 full-flow provenance and R03 misleading state entry; address R01 before risky continuation and R05 in a bounded correctness batch. Do not turn all architecture proposals into Phase3 blockers.
User Decision Needed: live test budget/readiness before spending; exact retention and replay-policy tradeoffs before implementing those behaviors. Do not re-ask the five questions as though unanswered.
Future Optional: dedicated interview features, broad directory cleanup, advanced pronunciation/prosody scoring beyond diagnostic need, literal `&#x20;` cleanup and cosmetic changes.

## Next Smallest Step

Proceed with zero-product-API-cost clarification/static walkthrough and preparation of a small correctness batch (provenance, entry docs and recording registration), preserving existing data. No live requests now. The owner's next useful input is whether to remain zero-call or explicitly set a small bounded test budget; do not demand a complete business plan.

When the owner resumes live testing and data/cost preflight is satisfied, keep Phase3 minimal: one natural 20–45 second explanation -> saved original audio + ASR -> replay/transcript checkpoint to MASTER BEFORE diagnosis. Not executed until real evidence is returned.
