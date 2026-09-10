# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01R REMOTE REVIEWED / PARTIAL ACCEPTED / USER DECISION NEEDED — WHISPER HTTP 401 `missing_scope`**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Formal attempts are recorded inside the product; manual pre-record/upload is not the normal consumer journey.

Private feature-branch checkpoint sync is working as intended. MASTER directly reviewed remote `prototype/study-teachback-v0.1` at HEAD `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`; no owner manual artifact upload was required.

BUILD-01 remains a PARTIAL engineering build. BUILD-01R completed the planned safe auth diagnosis and offline logic correction but stopped at an owner-controlled permission gate. PRODUCT-CORE-01 remains PAUSED; INTERVIEW-DEMO-01 remains SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md` — current recovery decision gate
4. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — original owner-approved bounded build
5. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior research

## BUILD-01R Remote Review — Verified

Remote lineage:
- before `99228bed6aa17b05790083de5ecdd45c4a96c28f`
- after `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`
- normal descendant commit; no history rewrite reported.

MASTER directly read the commit, Delivery Packet, auth diagnostic, source changes and tests.

### Auth result

Same-process diagnostic captured one existing runtime `OPENAI_API_KEY` value and used the same irreversible short fingerprint for both requests:
- `gpt-5.6-luna` Responses: HTTP 200;
- `whisper-1` `/v1/audio/transcriptions`: HTTP 401;
- provider error: `invalid_request_error` / `missing_scope` / `param=null`;
- provider message points to insufficient permissions and directs inspection of organization/project roles and restricted API-key scopes.

This establishes a real audio-endpoint authorization/scope blocker. It is not a general invalid-key result, not a Mandarin-quality result, and not a timestamp-quality result. The exact missing scope token was intentionally redacted from committed evidence, so the precise UI control is still Unknown.

### Logic result

The prior necessary/sufficient-condition defect was corrected in source instructions. The product now explicitly preserves `只有 A 才 B` as `B -> A` only and rejects strengthening it into `A -> B`; the ticket example is included.

Offline suite reports 24/24 PASS, covering logic-fixture oracles, safe auth evidence, existing schema/reference/time/channel guards and budget behavior. This is accepted as offline engineering evidence only.

The corrected live Luna semantic rerun was NOT RUN because BUILD-01R correctly stopped paid calls after Whisper 401. The old Luna 5/5 remains real API/schema/channel evidence only, not logic-quality evidence.

## Cost / Ledger

Preserved ledger evidence after BUILD-01R:
- known conservative cost estimate: US$0.00260690;
- exposure including unsettled reservations: US$0.04141440 / US$5;
- BUILD-01 total new-cash ceiling remains US$10;
- no recharge, provider/model switch, package install or ledger reset.

The existing synthetic Whisper fixture has now reached its original two-submission-per-attempt limit. Resume therefore needs one explicit, narrow retry exception rather than resetting/relabeling the attempt.

## User Decision Needed — Current Gate

Owner must inspect/correct the **existing OpenAI Platform key/project/organization permission** without sharing the secret value.

Current evidence supports checking:
1. intended OpenAI Platform organization/project;
2. Project settings -> API Keys -> the existing key used by the build -> Edit permissions;
3. if Restricted, grant the minimum request/write permission for Audio transcription (`POST /v1/audio/transcriptions`) while preserving Responses access;
4. if the endpoint is already allowed, inspect the key principal's project membership and organization role;
5. if the current key cannot be edited because of service-account ownership/role limitations, stop and report that condition before creating or replacing credentials.

Do not paste the key into Chat/Codex/artifacts. Do not broadly switch to All permissions merely as a blind workaround.

After the permission correction, owner must also approve **exactly one extra same-fixture Whisper retry**. This only raises that fixture's ASR submission allowance from 2 to 3; all prior ledger events/reservations/minutes remain intact and the US$5/US$10 ceilings are unchanged.

## Resume Plan After Owner Confirmation

One additional 7.31-second synthetic Mandarin `whisper-1` request only.

If 2xx:
- verify transcript and word/segment timestamps;
- run corrected bounded Luna semantic challenges;
- resume remaining BUILD-01 C-F checks;
- push sanitized checkpoint to `prototype/study-teachback-v0.1`;
- then prepare one integrated owner walkthrough.

If still 401/missing_scope:
- stop paid calls;
- preserve safe request/error evidence;
- no permission widening/provider/model/dependency workaround;
- return exact blocker.

## Standing Private Feature-Branch Sync

For MASTER-approved bounded builds, Codex may fast-forward push the explicitly named private feature branch and sanitized review evidence to the existing private repo without repeated owner approval. No force push, remote deletion, merge/default-branch integration, release/public deployment, secrets/`.env`, raw owner/private audio or sensitive material.

## Active Boundaries

Still approved:
- local code/commits and private checkpoint pushes on `prototype/study-teachback-v0.1`;
- loopback Node + Edge + explicit in-product microphone;
- owner-selected low-risk single-speaker audio/source via OpenAI default/global endpoints;
- models only `whisper-1` and `gpt-5.6-luna`;
- BUILD-01 cash <= US$10; API exposure/reservation hard stop <= US$5; no auto recharge/escalation.

Not authorized without new decision: new provider/model, local ASR/VAD install, `gpt-transcribe`, admin/account APIs, external users, third-party/sensitive audio, public hosting, merge/release, destructive Git, or credentials being disclosed/shared.

## State Summary

Completed: BUILD-01R remote sync/review; same-process auth diagnosis; safe missing-scope evidence; necessary/sufficient logic correction; 24/24 offline suite.

Verified: exact remote commit; Luna 200 + Whisper 401 used the same runtime credential fingerprint; provider classification `missing_scope`; offline logic/safety tests at stated scope; ledger preserved.

Likely: an owner-controlled endpoint permission or organization/project role is blocking audio transcription. Exact UI setting is not yet proven.

Unknown: current key permission details, exact missing scope, successful Mandarin transcript/timestamps, corrected live semantic fidelity, remaining C-F behavior, full owner journey.

Not Done: owner permission correction, one extra bounded Whisper retry, live Luna rerun, successful ASR/timestamps, remaining integration checks, owner walkthrough, external validation/release.

Must Fix: legitimate `/v1/audio/transcriptions` authorization; no blind permission widening or unauthorized workaround; offline test success must not be relabelled live-quality success.

User Decision Needed: inspect/correct the existing key/project/org permission and approve exactly one additional same-fixture Whisper request under unchanged budget.

Future Optional: calibrated acoustic analysis, local VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE, native/plugin distribution and external learner study.

## Next Smallest Step

**Owner adjusts the existing OpenAI Platform permission/role as needed, then explicitly authorizes one extra same-fixture Whisper retry. Codex resumes only that bounded check first.**
