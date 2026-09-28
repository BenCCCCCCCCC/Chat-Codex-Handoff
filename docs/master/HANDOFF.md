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
2. Intended audience is mainly students, provisionally course concepts/learning material. No exact subject/niche is fixed. Interview project explanation is an adjacent hypothesis using the same source-grounded flow, not an approved separate product or tested capability.
3. Phase3 was deferred because of time and incomplete cost preparation. Do not treat deferral as evidence of low value, unwillingness, poor usability or broken microphone.
4. The owner is not yet clear on replay and has not accepted a replay burden/policy. They want answers that are non-redundant, clear, direct, sufficiently complete, unambiguous and simply worded. Apply that preference to AI teaching/feedback and UI instructions first; do not invent a spoken-fluency grading requirement.
5. Retention must be customizable, with a default and reminders. Exact values, anchor, reminder channel and existing-data migration are not decided. This is a requirement, not an implemented feature.

Retain Study-first, in-app recording, original audio and raw/corrected separation. Do not replace learning with testing alone.

## Effective cost boundary

**No additional product API calls until owner readiness and explicit bounded live resumption.** This is the current working instruction, not proof of a new runtime kill switch.

Historical models (`whisper-1`, `gpt-5.6-luna`) and ceilings (US$5 application exposure / US$10 cash) remain constraints, not current permission or evidence of available funds. No provider/model switch, recharge, automatic retry or paid readiness probe.

Last read pre-correction ledger was requests39 / known estimate US$0.01293075 / exposure US$0.06973825 / unsettled4. Later clean Phase2 used live requests. Never report these as current totals.

Before live resumption, verify configured model/endpoint/current official pricing plus a safe fresh ledger and present a bounded cost estimate, request count and retry rule. Model price estimates are not invoices or a bank balance. Separate one-time development-test budget from eventual recurring use budget; neither is set yet.

## Explain replay concretely

Replay = play the user's own saved audio and compare the text transcription. It is not AI reading out its answer. Example: a missing negation in ASR must not be diagnosed as the learner holding the opposite belief.

Current `app.mjs` uses local audio playback; replay itself is not another ASR/model request. The diagnosis-confirm button does initiate a model diagnosis. Current gates require replay of all relevant validated segments. A proposal to credit actual full-player coverage can reduce repeated clicking but is not implemented; do not replace replay with an unchecked checkbox or claim reliable automatic ASR-error detection.

Correction means restoring what was actually said. Editing a transcript into a better answer is not a new oral performance; genuine learning improvement requires new evidence such as a new explanation. Preserve raw and corrected versions.

Feedback proposal: short conclusion -> main unresolved point with evidence -> one useful next action, with supporting detail clearly expandable. Keep essential conditions and uncertainty visible. Do not create arbitrary word limits, hide critical omissions, repeat the whole lesson, fabricate a problem when correct, or infer knowledge from hesitation/accent.

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
Unknown: current records/ledger, affordable live budget, acceptable replay effort, exact retention defaults/reminders, real audio/downstream value.
Not Done: implementation, new tests, live calls, Phase3 and later owner acceptance.
Must Fix: bounded provenance/entrypoint/registration issues; safe old-data preflight before risky continuation.
User Decision Needed: whether to remain zero-call or name a bounded test budget; detailed replay/retention behavior before implementing those features.
Future Optional: broad reorganization, separate interview features and richer expression analysis.

Next smallest step: clarify the flow using a short source/feedback example and prepare the zero-call correction batch. Do not force a test now, reopen the five answered questions, or describe pending changes as shipped.
