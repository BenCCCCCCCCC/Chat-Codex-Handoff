# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01 PARTIAL / BLOCKED AT WHISPER HTTP 401 / MASTER REVIEW OF LOCAL ARTIFACTS REQUIRED BEFORE ACCEPTANCE**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

BUILD-00 is accepted. BUILD-01 was owner-approved and has now produced a Codex/user-reported partial implementation plus a transcription blocker. Do not restart broad research or change product direction because of a 401. PRODUCT-CORE-01 stays PAUSED; INTERVIEW-DEMO-01 stays SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

Preserve local work and unexpected partial state; no reset.

## Latest BUILD-01 Receipt — Not Yet Artifact-Verified

Reported by Codex/user:
- `BUILD-01 PARTIAL / BLOCKED — Whisper API HTTP 401`
- stopped paid/transcription calls; no model switch
- Node 18/18
- Edge 14/14
- real Luna content challenge 5/5
- speech chain not passed
- local commit `be5cef57564ed16bf2f25467ad0247bb9d7a717a`
- unsettled/reserved amount `US$0.02340565 / US$5`
- normal commit with hooks preserved succeeded after a disabled-hooks route was denied
- local artifacts:
  - `F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\build-01\DELIVERY_PACKET.md`
  - `F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\build-01\BUILD-01-review.zip`
- bundle hashes reportedly verified.

MASTER has not yet inspected these local artifacts or local commit. Do not turn 18/18, 14/14 or 5/5 into accepted evidence until packet/bundle review.

## Blocker Interpretation / What Not To Do

HTTP 401 is an authentication/authorization failure at the audio-transcription request boundary. It does **not** show that Mandarin ASR/timestamps are poor.

Because successful real `gpt-5.6-luna` calls are reported in the same build, a total API outage/account failure is not established. Plausible causes include route-specific credential propagation/selection, Authorization construction, proxy/config differences or account/project authorization. These are hypotheses only until evidence is read.

Do not:
- switch to `gpt-transcribe`, another provider or local ASR just to get green;
- install npm/Python/ffmpeg/WhisperX/Silero/local models;
- reveal/print/store secret keys in artifacts;
- raise US$5/US$10 limits;
- weaken timestamp requirements or mark transcription mocked/live when it is not;
- push/merge/release/public host.

## Next Review

Owner should supply only the current Delivery Packet and review bundle to MASTER; no project history needs to be resent.

Review must verify:
1. branch, before/after HEAD, commit, worktree and changed-file evidence;
2. feature matrix: what is implemented/live/offline/blocked;
3. scope of Node 18/18 and Edge 14/14;
4. actual real Luna 5/5 challenge evidence and cost/usage receipts;
5. ASR request implementation and 401 response with secrets redacted;
6. same/different credential/config path between Responses and `/v1/audio/transcriptions`;
7. budget reservation behavior and why US$0.02340565 remains unsettled/reserved;
8. bundle contents/hashes and unverified local retention/delete behavior;
9. Git hook/approval event only insofar as it affects reproducibility or state.

## Smallest Recovery Experiment After Review

If artifact evidence identifies a normal implementation/config bug within already-approved credential handling, issue a **narrow BUILD-01R transcription-auth fix** only:
- preserve branch/worktree/commit lineage;
- inspect auth-path code/config without printing secrets;
- compare Responses versus audio request header/project/base-url construction;
- correct only the identified bug;
- run the minimum single authorized short audio transcription needed to prove authentication and timestamp response;
- keep existing model/provider/budget/data scope;
- if successful, resume remaining BUILD-01 challenge/integration work;
- if still 401, stop and classify exact blocker.

If a fix requires the owner to enter/replace a key, change API project/account/org, grant additional access, or perform any other credential operation, that is **User Decision Needed**. Ask once with precise UI/action instructions; do not request the secret in chat or artifact.

## Active Build Contract — Unchanged

Approved:
- local product branch/code/commits only; no push/merge/release
- loopback Node + Edge + explicit in-product mic
- owner-selected low-risk single-speaker audio/source through OpenAI default/global endpoints
- API models only `whisper-1` + `gpt-5.6-luna`
- BUILD-01 cash <= US$10; internal API reservation/hard stop <= US$5; no auto recharge/escalation.

The product still requires content/logic and delivery separation, original-audio preservation, critical-ASR fail-closed behavior, targeted reteaching/re-record, related Apply, history/export/delete, and the required challenge suite. Highest final status remains:
**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**.

## State Summary

Completed: partial local implementation/blocker receipt returned; calls stopped; local checkpoint commit reportedly exists.

Verified: prior BUILD-00 and public technical facts only; BUILD-01 packet/bundle not yet inspected.

Likely: blocker is localized to transcription authentication because real Luna is reported working; not yet proven.

Unknown: precise 401 cause, exact feature completeness, local test evidence, timestamp quality, final cost/latency/delete behavior.

Not Done: MASTER artifact review, transcription auth recovery, end-to-end voice PASS, integrated owner walkthrough, external validation/release.

Must Fix: resolve or precisely classify transcription auth blocker; no fake end-to-end status or unauthorized workaround.

User Decision Needed: none for artifact review/read-only diagnosis. Only new credential/account handling or any retained scope expansion requires approval.

Future Optional: dedicated VAD/local ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
