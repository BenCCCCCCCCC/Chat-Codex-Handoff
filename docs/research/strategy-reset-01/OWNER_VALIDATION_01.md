# OWNER-VALIDATION-01 — Integrated owner microphone walkthrough

Date: 2026-09-11
Role: 00 MASTER
Status: **OWNER APPROVED / ACTIVE / NOT YET EXECUTED**

## 1. Entry gate

MASTER directly reviewed private feature branch `prototype/study-teachback-v0.1` through R4 at:

`09698dfb85c783c67ac83e6462c33d61aee31122`

and accepts the engineering status:

**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**

The owner then replied `继续`; this is accepted as explicit approval to execute this bounded protocol.

This is still not owner-validation completion, learning-effect evidence, release approval or external-user approval.

Verified entry evidence includes:
- Node 38/38 PASS;
- Edge 22/22 PASS at stated engineering scope;
- real saved Whisper response reprocessed as transcript + strict segment PASS / word timing PARTIAL;
- corrected bounded Luna necessary/sufficient challenge 7/7 after retained failed runs were fixed rather than hidden;
- content/delivery separation;
- R4 feedback-action gating and meaningful repair-focus guard;
- export/quota/per-attempt-delete/pending-navigation recovery at stated scope;
- latest reviewed known cost US$0.01179245 and exposure US$0.06859995 / US$5.

## 2. Purpose

Validate one coherent real-owner journey:

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

The goal is actual product usability and evidence behavior, not learning efficacy, PTE validity, long-term mastery or market fit.

## 3. Approved data / spend boundary

Use only:
- owner's own voice;
- one short non-sensitive owner-selected source;
- existing dedicated server-side OpenAI credential;
- `whisper-1` + `gpt-5.6-luna`;
- existing US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling.

This approval authorizes the normal live ASR/semantic calls needed for **one coherent owner walkthrough and at most one targeted re-explanation attempt if the product naturally offers it**.

It does not authorize repeated stress testing, open-ended retries, new provider/model/dependency work, public hosting, external users or release action.

Raw owner audio remains local by default. Do not commit API keys, `.env`, browser profiles, private client files or raw owner audio.

## 4. Execution

Codex prepares the local runtime only; owner performs the microphone actions in Edge.

1. Verify local repo/branch/HEAD equals or normally descends from `09698df...`; preserve worktree and ledger.
2. Start only `node study-teachback-app/server.mjs`; keep `http://127.0.0.1:4317` available.
3. Owner enters one short low-risk source, uses Learn, inspects goals and asks at least one normal Tutor question.
4. Owner clicks `我来讲讲`, explicitly starts recording and explains for about 20–45 seconds. Include at least one condition and one natural self-correction.
5. Finish in-app; verify original audio is retained. Review raw transcript and visible word-timing quality notice.
6. Fully replay each validated segment before confirming. Correct any critical negation/number/condition/term transcription error. Unusable/missing word timing must not produce an invented precise anchor.
7. Inspect content/logic feedback. Check:
   - withdrawn earlier statement is not separately punished after explicit correction;
   - missing content has no fabricated timestamp;
   - necessary conditions are not strengthened into sufficient conditions;
   - source/audio links point to real preserved evidence;
   - supported findings do not show targeted remediation;
   - actionable remediation appears only with meaningful repair guidance.
8. If a mechanical near-silence candidate appears, owner must replay/confirm it before delivery interpretation. Empty/insufficient delivery findings are a valid conservative outcome.
9. Use targeted reteaching only if a real actionable gap exists. If useful, perform at most one partial or full re-explanation and confirm it creates a new attempt while preserving the original.
10. Use Apply; verify it is a new related situation and does not claim long-term transfer/mastery.
11. Export locally and inspect that source, audio, raw/corrected transcript and reports are present. Test delete/history only if it does not destroy evidence still needed for assessment.
12. Stop the server after the walkthrough.

## 5. Suggested low-risk source

To minimize setup while avoiding reuse of the exact engineering fixture, the owner may use this short source or replace it with another non-sensitive source:

`只有已经完成注册的访客才可以进入实验室。进入前还必须佩戴当天发放的访客证。完成注册并不意味着一定可以进入；如果当天实验室关闭，就不能进入。`

A useful Tutor question is:

`完成注册就一定能进入实验室吗？为什么？`

During the formal explanation, the owner should speak naturally and include one self-correction rather than reading a polished script.

## 6. Evidence / privacy

After the run, Codex may commit only sanitized validation evidence that the owner permits:
- step-level PASS / FAIL / UNKNOWN;
- safe request/model/cost metadata;
- sanitized text excerpts only if needed and owner-approved;
- non-sensitive screenshots only if needed.

Do not commit owner raw audio, API keys, `.env`, browser profiles, private client files or sensitive source text.

The owner should not be asked to manually upload a review ZIP. The private feature-branch sync remains the review path.

## 7. Stop conditions

Stop and return to MASTER if any of these occurs:
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

Completed: engineering build/readiness review through R4 and owner approval for this walkthrough.

Verified: remote `09698df...`, Node 38/38, Edge 22/22, bounded corrected Luna 7/7, ASR segment PASS / word PARTIAL policy, lifecycle checks and R4 action-gating regression.

Not Done: actual owner microphone walkthrough/full live journey and post-run MASTER review.

Likely: the coherent flow is ready for owner testing without more synthetic development.

Unknown: real owner mic ASR behavior, live semantic behavior on owner speech, actual usability friction and end-to-end latency.

Must Fix before any stronger product claim: execute and review this owner walkthrough.

User Decision Needed: none to start; owner approval is already satisfied. A new decision is needed only if execution hits a retained boundary.

Future Optional: broader devices, calibrated alignment/acoustics, external learners and learning-effect evaluation.