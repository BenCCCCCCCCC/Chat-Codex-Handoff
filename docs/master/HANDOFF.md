# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01 PARTIAL / BLOCKED AT WHISPER HTTP 401 / PRIVATE FEATURE-BRANCH SYNC AUTHORIZED / REMOTE MASTER REVIEW NEXT**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

BUILD-00 is accepted. BUILD-01 was owner-approved and has produced a Codex/user-reported partial implementation plus a transcription blocker. The owner has now explicitly approved a workflow change: Codex may push MASTER-approved bounded **private feature-branch checkpoints** to the existing private GitHub repository so MASTER can inspect the implementation and evidence directly, without requiring the owner to manually upload Delivery Packets/review bundles each time.

This does not reopen product direction. PRODUCT-CORE-01 stays PAUSED; INTERVIEW-DEMO-01 stays SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

Preserve local work and unexpected partial state; no reset.

## Latest BUILD-01 Receipt — Not Yet Remote-Verified

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

The commit was not previously visible on GitHub because the original BUILD-01 contract prohibited push. That restriction is now narrowed by the owner decision below. Until the branch is synced and inspected, the implementation/test claims remain reported rather than MASTER-verified.

## Standing Private Feature-Branch Sync Permission

For a MASTER-approved bounded build, Codex may push ordinary review checkpoints to the existing private repository without a fresh owner approval each time, subject to all of these limits:

- only the explicitly named non-default feature branch from the active build handoff; current branch is `prototype/study-teachback-v0.1`;
- normal fast-forward push only; no force push, remote branch deletion or destructive history rewrite;
- no merge/rebase into default/master/main/meta state, no release, no public deployment or public sharing;
- only approved-scope source plus review/evidence files needed for MASTER inspection;
- no API keys, secrets, credential files, private client data, sensitive materials, raw third-party audio or other data outside the approved repository boundary;
- owner-selected raw test audio/material remains local by default. Push sanitized evidence/results instead unless a later explicit owner decision authorizes committing the raw data;
- `DELIVERY_PACKET.md` and other human-readable manifests/test/auth evidence should be tracked on the branch. A ZIP may remain as a local convenience, but it must not be the only review source because MASTER cloud review should not depend on an opaque binary artifact;
- before push, verify branch/HEAD/worktree and preserve unexpected work;
- after push, report the exact remote branch and pushed SHA.

This standing permission exists specifically to reduce manual file transfer between Codex and MASTER. It is not blanket approval for arbitrary GitHub writes.

## Blocker Interpretation / What Not To Do

HTTP 401 is an authentication/authorization failure at the audio-transcription request boundary. It does **not** show that Mandarin ASR/timestamps are poor.

Because successful real `gpt-5.6-luna` calls are reported in the same build, a total API outage/account failure is not established. Plausible causes include route-specific credential propagation/selection, Authorization construction, proxy/config differences or account/project authorization. These are hypotheses only until remote source/evidence is read.

Do not:
- switch to `gpt-transcribe`, another provider or local ASR just to get green;
- install npm/Python/ffmpeg/WhisperX/Silero/local models;
- reveal/print/store secret keys in artifacts;
- raise US$5/US$10 limits;
- weaken timestamp requirements or mark transcription mocked/live when it is not;
- merge/release/public host.

## Immediate Next Action — Current Checkpoint Sync

Codex should now perform a **sync-only checkpoint step**, not resume product development yet:

1. verify the current local branch/worktree and preserve commit `be5cef57564ed16bf2f25467ad0247bb9d7a717a` lineage;
2. ensure product source and human-readable review evidence are tracked on `prototype/study-teachback-v0.1` (including `DELIVERY_PACKET.md` and sufficient sanitized test/auth evidence); if this requires one additional evidence-only local commit, create it normally with hooks preserved;
3. do not add secrets or raw private test audio/material;
4. normal fast-forward push `prototype/study-teachback-v0.1` to `origin`;
5. return the pushed SHA and remote branch only after confirming remote success;
6. no merge/release/public action.

After sync, MASTER will inspect the exact branch/commit/diff and readable evidence through GitHub. The owner should not need to manually upload the packet/ZIP.

## Smallest Recovery Experiment After Remote Review

If remote evidence identifies a normal implementation/config bug within already-approved credential handling, issue a **narrow BUILD-01R transcription-auth fix** only:
- preserve branch/worktree/commit lineage;
- inspect auth-path code/config without printing secrets;
- compare Responses versus audio request header/project/base-url construction;
- correct only the identified bug;
- run the minimum single authorized short audio transcription needed to prove authentication and timestamp response;
- keep existing model/provider/budget/data scope;
- if successful, resume remaining BUILD-01 challenge/integration work;
- if still 401, stop and classify exact blocker.

If a fix requires the owner to enter/replace a key, change API project/account/org, grant additional access, or perform any other new credential operation, that is **User Decision Needed**. Ask once with precise UI/action instructions; do not request the secret in chat or artifact.

## Active Build Contract — Updated Only For Private Sync

Approved:
- local product branch/code/commits **plus private feature-branch checkpoint push under the standing policy above**;
- loopback Node + Edge + explicit in-product mic;
- owner-selected low-risk single-speaker audio/source through OpenAI default/global endpoints;
- API models only `whisper-1` + `gpt-5.6-luna`;
- BUILD-01 cash <= US$10; internal API reservation/hard stop <= US$5; no auto recharge/escalation.

Still prohibited without a new owner decision:
- merge/default-branch integration;
- release/public hosting/public sharing;
- force push/destructive remote changes;
- new provider/model/dependency;
- new credential/account handling beyond the existing approved path;
- external users, third-party voices or sensitive data.

The product still requires content/logic and delivery separation, original-audio preservation, critical-ASR fail-closed behavior, targeted reteaching/re-record, related Apply, history/export/delete, and the required challenge suite. Highest final status remains:
**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**.

## State Summary

Completed: partial local implementation/blocker receipt returned; calls stopped; owner approved standing private feature-branch checkpoint sync to remove manual artifact uploads.

Verified: prior BUILD-00/public technical facts only; current BUILD-01 branch/evidence still awaits remote sync and MASTER inspection.

Likely: blocker is localized to transcription authentication because real Luna is reported working; not yet proven.

Unknown: precise 401 cause, exact feature completeness, local test evidence, timestamp quality, final cost/latency/delete behavior.

Not Done: private feature-branch sync, MASTER remote artifact/source review, transcription auth recovery, end-to-end voice PASS, integrated owner walkthrough, external validation/release.

Must Fix: sync readable review evidence with the private feature branch; resolve or precisely classify the transcription auth blocker; no fake end-to-end status or unauthorized workaround.

User Decision Needed: none for ordinary private feature-branch checkpoint pushes under this policy or read-only diagnosis. New credential/account handling, provider/model/dependency/budget/scope expansion, merge/release/public actions still require approval.

Future Optional: dedicated VAD/local ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
