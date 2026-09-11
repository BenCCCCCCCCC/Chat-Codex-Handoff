# OWNER-VALIDATION-01 — Integrated owner microphone walkthrough

Date: 2026-09-11
Role: 00 MASTER
Status: **READY FOR OWNER APPROVAL / NOT EXECUTED**

## 1. Entry gate

MASTER directly reviewed private feature branch `prototype/study-teachback-v0.1` through R4 at:

`09698dfb85c783c67ac83e6462c33d61aee31122`

and accepts the engineering status:

**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**

This is engineering readiness only. It is not owner-validation completion, learning-effect evidence, release approval or external-user approval.

Verified entry evidence includes:
- Node **38/38 PASS**;
- Edge **22/22 PASS** using actual Edge/MediaRecorder/IndexedDB but synthetic media/stub provider where stated;
- real saved Whisper response reprocessed as transcript + strict segment PASS / word timing PARTIAL, with zero-duration provider word preserved rather than fabricated;
- corrected live `gpt-5.6-luna` necessary/sufficient challenge reaches bounded **7/7** after preserving and fixing earlier failed runs;
- content/delivery schema separation;
- feedback remediation actions are now gated: supported/delivery findings do not enter knowledge-remediation flow; malformed actionable repair fails closed;
- export, quota recovery, per-attempt deletion and pending-navigation recovery at reported local engineering scope;
- latest R4 used **0 new paid calls**;
- current known conservative cost `US$0.01179245`; exposure `US$0.06859995 / US$5`.

## 2. Purpose

Validate the coherent owner experience with one real, low-risk owner microphone journey:

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

The goal is actual product usability and evidence behavior. It is not learning efficacy, PTE validity, long-term mastery or market fit.

## 3. Data / spend boundary

Use only:
- owner's own voice;
- one short, non-sensitive, owner-selected concept/rule/process source;
- existing dedicated server-side OpenAI credential;
- approved models `whisper-1` + `gpt-5.6-luna`;
- existing US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling.

Do not use third-party/private/sensitive recordings. Do not paste or expose API keys. No public hosting, external user or release action.

Owner's explicit approval of this protocol authorizes the normal live ASR/semantic calls needed for **one coherent owner walkthrough and, if the flow explicitly offers it, one targeted re-explanation attempt**. It does not authorize repeated stress testing, open-ended retries or new provider/model/dependency work.

## 4. Execution

Codex prepares the local runtime only; owner performs microphone actions in Edge.

1. Verify local repo/branch/HEAD matches or normally descends from `09698df...`; preserve worktree and ledger.
2. Start only `node study-teachback-app/server.mjs`; open `http://127.0.0.1:4317` in Edge.
3. Owner enters one short low-risk source, uses Learn, inspects goals, and asks at least one normal Tutor question.
4. Owner clicks `我来讲讲`, explicitly starts recording, and explains for about 20–45 seconds. Include at least one condition and one natural self-correction.
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
9. Use targeted reteaching only if an actionable gap exists. If useful, perform one partial or full re-explanation; confirm it creates a new attempt while preserving the original.
10. Use Apply; verify it is a new related situation and does not claim long-term transfer/mastery.
11. Export locally and inspect that source, audio, raw/corrected transcript and reports are present. Test per-attempt delete/history behavior only if it does not interfere with reviewing the main walkthrough evidence.
12. Stop the server after the walkthrough.

## 5. Evidence / privacy

Codex may commit only sanitized owner-validation evidence:
- step-level PASS / FAIL / UNKNOWN;
- model/request metadata and safe cost/ledger summaries;
- sanitized text excerpts only if owner explicitly permits them;
- screenshots that do not expose sensitive information.

Do **not** commit owner raw audio, API keys, `.env`, browser profiles, private client files or sensitive source text. Raw owner audio remains local by default.

## 6. Stop conditions

Stop and return to MASTER if any of these occurs:
- invalid/unconfirmed critical ASR changes meaning and cannot be safely corrected through replay;
- content diagnosis materially contradicts confirmed transcript/source;
- source/audio/timestamp evidence is fabricated or misattached;
- supported feedback exposes knowledge-remediation despite R4 guard;
- meaningless repair guidance becomes an actionable route;
- unexpected repeated API retry would be required;
- budget/credential/storage guard fails;
- product loses original audio or corrupts attempt/source identity.

Minor copy/layout friction is recorded for later prioritization but is not automatically a stop unless it blocks the coherent journey.

## 7. Acceptance decision

After execution, MASTER classifies findings as:
- Must Fix;
- User Decision Needed;
- Future Optional.

Possible outcomes:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`;
- `OWNER VALIDATION PASS WITH MUST FIX`;
- `OWNER VALIDATION BLOCKED`.

No merge/release/external-user stage follows automatically. Those remain separate owner decisions.

## 8. Current state classification

Completed: engineering build/readiness review through R4.

Verified: remote `09698df...`, Node 38/38, Edge 22/22, bounded corrected Luna 7/7, ASR segment PASS / word PARTIAL policy, lifecycle checks and R4 action-gating regression.

Not Done: real owner microphone walkthrough/full live journey.

Likely: the coherent flow is ready to be tested by the owner without more synthetic development.

Unknown: real owner mic ASR behavior, live semantic behavior on owner speech, actual usability friction and end-to-end latency.

Must Fix before any stronger product claim: execute and review this owner walkthrough.

User Decision Needed: owner approval to start `OWNER-VALIDATION-01`.

Future Optional: broader devices, calibrated alignment/acoustics, external learners and learning-effect evaluation.