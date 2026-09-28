# Active Handoff — Owner clarification / Phase 3 NOT RUN

Updated: 2026-09-28 (after owner answers)
Role: 00 MASTER
Status: **PRIORITIES RECORDED / ZERO-CALL PREPARATION / LIVE RESUMPTION ON COST-READINESS HOLD**

Read `docs/master/CURRENT_STATE.md` on `meta/master-state` first. Same-named files on the feature branch are stale historical Handoff-tool state, not authority.

## Binding and work actually done

Product: **知而能讲** — Study-first + in-app teach-back.
Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
Recorded local checkout: `F:\Chat-Codex-Handoff\validation-repo`
Feature branch: `prototype/study-teachback-v0.1`
Accepted feature HEAD, confirmed on the remote branch on 2026-09-28:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

Server/origin identity: `node study-teachback-app/server.mjs`, `http://127.0.0.1:4317`.
These are identity records, not instructions to start/reload before data preflight. Local checkout, running process, storage and ledger have not been inspected.

The architecture review read remote source; the owner then answered five product questions. Only the two canonical state documents were updated. No feature implementation, local tests, live model calls, retention change, spending, deployment or release occurred. Detailed earlier review remains at commit `9a3c77789f99add12f6523282a2114cc8cb78e39` in these same paths; its open questions/next actions are superseded here.

## Owner decisions — use these, do not ask again

1. Stable personal use comes first; demonstrable/job-search portfolio comes second. No near-term commercialization or external-user priority was chosen.
2. Intended audience is mainly students, provisionally course concepts/learning material. No exact subject/niche is fixed. Interview project explanation is an adjacent hypothesis using the same source-grounded flow, not an approved separate product or tested capability. Speech analysis is for locating where a learner's concept relation / reasoning transition / explanation segment is less familiar or less smooth, not for presentation polish as the primary goal.
3. Phase3 was deferred because of time and incomplete cost preparation. Do not treat deferral as evidence of low value, unwillingness, poor usability or broken microphone.
4. The owner is not yet clear on replay and has not accepted a replay burden/policy. They want answers that are non-redundant, clear, direct, sufficiently complete, unambiguous and simply worded. Apply that preference to AI teaching/feedback and UI instructions first; do not invent a spoken-fluency grading requirement.
5. Retention must be customizable, with a default and reminders. Exact values, anchor, reminder channel and existing-data migration are not decided. This is a requirement, not an implemented feature.

Retain Study-first, in-app recording, original audio and raw/corrected separation. Do not replace learning with testing alone. Feedback must remain separated into **内容理解** and **表达过程证据**. The first evaluates source-grounded content/logic; the second reports observable recording/process evidence and helps localize where to practice. Never infer that a pause alone proves lack of knowledge, and do not add a global speaking/PTE-style score.

## Effective cost boundary

**No additional product API calls until owner readiness and explicit bounded live resumption.** This is the current working instruction, not proof of a new runtime kill switch.

Historical models (`whisper-1`, `gpt-5.6-luna`) and ceilings (US$5 application exposure / US$10 cash) remain constraints, not current permission or evidence of available funds. No provider/model switch, recharge, automatic retry or paid readiness probe.

Last read pre-correction ledger was requests39 / known estimate US$0.01293075 / exposure US$0.06973825 / unsettled4. Later clean Phase2 used live requests. Never report these as current totals.

Before live resumption, verify configured model/endpoint/current official pricing plus a safe fresh ledger and present a bounded cost estimate, request count and retry rule. Model price estimates are not invoices or a bank balance. Separate one-time development-test budget from eventual recurring use budget; neither is set yet.

## Explain replay concretely

Replay = play the user's own saved audio and compare the text transcription. It is not AI reading out its answer. Example: a missing negation in ASR must not be diagnosed as the learner holding the opposite belief.

Current `app.mjs` uses local audio playback; replay itself is not another ASR/model request. The diagnosis-confirm button does initiate a model diagnosis. Current gates require replay of all relevant validated segments. A proposal to credit actual full-player coverage can reduce repeated clicking but is not implemented; do not replace replay with an unchecked checkbox or claim reliable automatic ASR-error detection.

Correction means restoring what was actually said. Editing a transcript into a better answer is not a new oral performance; genuine learning improvement requires new evidence such as a new explanation. Preserve raw and corrected versions.

Feedback proposal: two clearly separated panels. **内容理解**: short conclusion -> main unresolved content/logic point with source evidence -> one useful next action. **表达过程证据**: only useful observable audio/alignment evidence (for example pause location, restart/self-repair, repetition, pacing/segmentation, and later only validated pitch/energy features) -> where to re-explain. Supporting detail can be expandable. Keep essential conditions and uncertainty visible. Do not create arbitrary word limits, hide critical omissions, repeat the whole lesson, fabricate a problem when correct, infer knowledge from hesitation/accent, or infer confidence/anxiety/personality.

## Retention requirement and safe preflight

Current code still deletes whole topics at `createdAt + 7 days` when `openStore()` calls expiry. The unchanged 2026-09-12 topic became eligible around 2026-09-19. Actual survival is unknown.

Do not tell the owner to refresh/restart merely to see whether the old record exists. Preserve accessible data with an existing safe export/read-only path when possible; do not invoke expiry for inspection. Do not promise recovery of deleted data. If already expired, use the same synthetic source in a new clean topic with a minimal provenance/source sanity check. Do not rerun every historical gate or reset ledger history.

Later retention design needs a clear default, user changes, displayed expiry and reminder behavior. A possible 30-day default is a MASTER proposal only. In-app reminders do not run while the app is closed. Define what happens when a user returns after expiry; do not promise notice-before-delete while retaining silent delete-on-open. Existing records need an explicit migration/consent decision. Local keep-until-manual-delete is not guaranteed permanent backup. Do not implement these changes as an incidental refactor.

## Retained acceptance and unresolved findings

Historical Phase1 import/preview/selection = PASS. Initial-Learn provenance correction at `f6a000c...` = accepted, with historical Node48/48 and Edge29/29, zero correction paid calls. Clean real-browser Phase2 = PASS: no internal starter shown as owner speech and source meaning preserved. Historical counts were not rerun. Original contaminated topic must not be used as a clean baseline.

Phase3 microphone/ASR/replay, downstream Diagnose/Repair/Apply/export-history journey and final owner acceptance remain NOT DONE.

Active review issues:
- R01: old-topic expiry/availability; safe preflight before continuation.
- R02: generated `再学这一点` / `试一个新情境` prompts still reach `teach()` without internal provenance and become user-history entries. Initial-Learn acceptance remains valid; extend correction/tests to all relevant action paths before claiming full-flow provenance.
- R03: root README, app README and feature-branch state misidentify product/phase. Correct entrypoints and ref-aware pointers; do not create more suffixed state snapshots.
- R04: runtime mixes historical live/recovery tools and browser-test revisions; ledger has a synthetic-fixture retry exception. Organize only where beneficial; do not rewrite event history, enlarge caps or blindly move working hook/helper/launcher paths.
- R05: attempt registration precedes successful microphone acquisition and consumes attempt quota even on startup failure. Plan idempotent registration at a valid boundary before paid ASR; do not delete historical events to restore quota.
- R06: schema/reference/quote checks do not prove semantic entailment or learning benefit. Keep semantic fixtures, owner feedback and engineering results separate; near-silence events are not calibrated fluency/knowledge scores.

## Next bounded work — preparation, not completed implementation

Proceed with zero-product-API-cost explanation/static walkthrough and prepare a small correction scope for R02/R03/R05. Use existing source or clearly labelled fixtures/prewritten examples, not a real provider disguised as a mock. Do not launch the old browser record as a zero-call inspection because it can trigger expiry; actual app learning/recording actions may also send requests.

Codex remains responsible for implementation and local test execution after a bounded task is ready. Before new implementation, check relevant current official/existing-project options only for the active gap. No framework/agent/vector-store/microservice rewrite, interview subsystem, cloud accounts, new public repository or paid calls.

Required future correction evidence: exact checkout/branch/base/head; bounded diff; zero-provider-call provenance tests covering Learn/Repair/Apply success and failure plus actual owner input; recording-registration failure/idempotency checks; relevant baseline regression; tests not run and unknowns. Preserve unrelated work, origin/database identity, storage schema, audio, ledger events, model configuration and caps. No reset/clean/force/push/merge unless separately authorized for that task.

Broad directory restructuring, new retention UI and replay-policy redesign are not prerequisites for the first Phase3. Keep them separately scoped so review does not indefinitely postpone actual validation.

## Execution status — IMPORTANT

**As of 2026-09-28 16:45 +10:00, the owner has NOT sent the previous Codex instruction.**

Therefore:
- Batch A — CORRECTNESS-HYGIENE-01 = NOT STARTED;
- Batch B — DIAGNOSTIC-LOCALIZATION-01 = NOT STARTED;
- no feature code change, local test run, live product API call, push or merge has occurred from these MASTER planning turns;
- do not interpret canonical documentation commits as implementation evidence.

MASTER discipline from this point:
- every execution requirement must be captured in this canonical HANDOFF before a Codex trigger is given;
- chat-only additions are not authoritative until written here;
- after each Codex return, reconcile exact diff/tests/evidence against this file before updating Completed / Verified / Not Done.

### Canonical Codex trigger for Batch A

Use this only when the owner is ready to start Batch A:

> Execute **Batch A — CORRECTNESS-HYGIENE-01** from the latest `meta/master-state/docs/master/CURRENT_STATE.md` and `meta/master-state/docs/master/HANDOFF.md`. Work only on R02 / R03 / R05 and the required zero-product-API regression coverage. Do not expand scope. Do not use live product APIs. Do not change retention, storage schema, model/provider, budget caps, origin, repository visibility, release/publish behavior, or perform a broad directory move. Preserve unrelated work. Do not push or merge. Return a Delivery Packet with exact checkout/branch/base/head, bounded diff/review evidence, tests run, tests not run, unknowns, and confirmation of zero product API calls.

Codex must treat the detailed Batch A scope, constraints and evidence requirements below as authoritative even if the short trigger omits repeated detail.

## New active zero-call sequence

Do not jump directly to the old paid Phase3 protocol.

### Batch A — CORRECTNESS-HYGIENE-01

Codex scope:
- R02: app-generated Learn/Repair/Apply instructions must not become fabricated owner messages; retain genuine owner input and failure semantics.
- R03: correct misleading repository/app entry documentation and point dynamic state explicitly to meta/master-state, while preserving the Handoff kit as retained tooling rather than pretending it vanished.
- R05: failed microphone permission/startup must not consume a durable attempt registration; registration must be idempotent and enforced before any paid ASR submission.

Constraints:
- zero product API calls;
- no retention, storage schema, model/provider, budget cap, origin, repository visibility, release/publish/push/merge change;
- no broad directory move;
- preserve unrelated work.

Evidence required:
- exact base/head/diff;
- provenance regression for initial Learn, Repair, Apply, real owner input and failure cases;
- denied/failed microphone startup does not consume registered-attempt quota;
- repeated registration path is fail-safe/idempotent as designed;
- relevant existing Node/browser stub tests;
- tests not run / unknowns.

### Batch B — DIAGNOSTIC-LOCALIZATION-01

Start only after Batch A review.

Goal: refactor the evidence model so content judgments and speech-process observations are separate inputs to a bounded localization/verification step.

Required separation:
- content finding can cite source + transcript;
- process evidence can cite audio time/span/metric but must not require a content status or source quote;
- cross-channel localization may prioritize a concept/reasoning transition for verification but cannot convert pause/restart/repetition alone into does-not-understand.

Required zero-call fixture cases:
- fluent wrong;
- hesitant correct;
- missing/uncertain relation + overlapping process signal;
- correct explicit self-repair;
- blocked/unreviewed critical ASR error;
- content gap with no process event.

Keep process evidence minimal in this batch: pause, restart/self-repair, repetition and coarse pacing/segmentation only where deterministic. No pronunciation, pitch/stress grading, emotion/confidence inference, PTE-equivalent score or new audio ML dependency.

Target UI contract after domain tests: two clearly separated panels, 内容理解 and 讲解过程证据, with a focused follow-up such as 只重新解释这一关系 where warranted. UI polish is secondary to evidence separation.

### Freshness finding affecting later live work

Official OpenAI guidance current on 2026-09-28 states that whisper-1 is deprecated for shutdown on 2027-02-26. gpt-transcribe is recommended for general file transcription, while current word/segment timestamp guidance still depends on whisper-1; gpt-live-transcribe does not provide word-level timestamps.

Therefore Batch A/B must not deepen hard dependencies on Whisper-specific timestamp shapes. ASR text and alignment/timing are replaceable capabilities. Do not switch models or make paid comparison calls in the zero-call sequence. Before real Phase3B, perform a focused migration/timing decision with current official docs and an explicit cost estimate.

Existing browser-local VAD/feature libraries exist; do not add them in Batch B unless the fixture experiment itself cannot be performed without them. Real-audio inadequacy, not feature ambition, should trigger a dependency evaluation.

## Phase 3 protocol, retained for explicit later resumption

After data/cost preflight and owner readiness:
1. Use the appropriate clean topic, choose `我来讲讲` and `无提示`.
2. Record one natural 20–45 second explanation of why registration does not guarantee entry and the additional source conditions; optional genuine self-correction, not a memorized script.
3. Keep the tab visible; finish and allow original-audio save plus the authorized ASR request.
4. Stop at replay/transcript. Do not confirm diagnosis yet.
5. Replay original audio, inspect segment/word timing and correct critical ASR errors while preserving raw text. PARTIAL word timing is acceptable; do not fabricate alignment.
6. Return replay/transcript checkpoint to MASTER before diagnosis. Inspect fresh safe ledger, not historical totals.

Stop for unsafe permission workarounds, missing/corrupt audio, unresolved critical transcription errors, lost source/attempt/version identity, repeated retry, storage/access/budget failure or diagnosis bypassing review.

## Classification / next smallest step

Completed: owner decisions recorded; replay/output-quality distinction explained; current state/handoff updated.
Verified: stated owner priorities and source-level playback behavior; no new local verification.
Likely: course-focused flow may cover some project-explanation use; simpler evidence-grounded feedback may help. Neither proven.
Unknown: current records/ledger, affordable live budget, acceptable replay effort, exact retention defaults/reminders, which speech-process features are reliable/useful enough for this diagnostic purpose, and real audio/downstream value.
Not Done: implementation, new tests, live calls, Phase3 and later owner acceptance.
Must Fix: bounded provenance/entrypoint/registration issues; safe old-data preflight before risky continuation.
User Decision Needed: whether to remain zero-call or name a bounded test budget; detailed replay/retention behavior before implementing those features.
Future Optional: broad reorganization, separate interview features, advanced pronunciation/prosody scoring beyond diagnostic localization.

Next smallest step: hand off Batch A — CORRECTNESS-HYGIENE-01 to Codex using the current MASTER context and run only its zero-call regression scope. Return Delivery Packet + review evidence to MASTER. After delta review, decide whether Batch B can start. Do not force a live test now or describe either batch as already implemented.
