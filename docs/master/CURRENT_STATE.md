# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01 — CODEX-REPORTED PARTIAL / BLOCKED AT WHISPER AUTH / PRIVATE FEATURE-BRANCH SYNC AUTHORIZED / REMOTE REVIEW PENDING**

The active product direction remains **Study-first + in-product spoken teach-back** with the continuous flow `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Formal attempts are recorded inside the product; manual pre-record/upload is not the normal consumer journey.

BUILD-00 remains MASTER-accepted as **PASS WITH TWO BUILD-TIME CORRECTIONS**. BUILD-01 was owner-approved and Codex returned a partial/blocker receipt. The owner has now explicitly approved a process correction: MASTER-approved bounded development checkpoints may be pushed to the existing **private GitHub repository on their explicit non-default feature branch** so MASTER can inspect code/evidence remotely without the owner manually uploading artifacts.

This standing private-branch sync permission does **not** authorize merge, release, public deployment, public sharing, force-push/destructive history rewrite, secret/raw-private-data publication, or unrelated branch pushes. PRODUCT-CORE-01 remains PAUSED; INTERVIEW-DEMO-01 remains SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — active bounded implementation contract
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior research

## BUILD-01 Receipt — Reported, Not Yet MASTER-Verified

Codex/user reports:
- status: **BUILD-01 PARTIAL / BLOCKED — Whisper API HTTP 401**;
- calls stopped immediately after blocker; no provider/model switch;
- Node engineering checks: **18/18**;
- Edge checks: **14/14**;
- real `gpt-5.6-luna` content challenge: **5/5**;
- full speech path did not pass because `whisper-1` transcription returned HTTP 401;
- local commit: `be5cef57564ed16bf2f25467ad0247bb9d7a717a`;
- reported unsettled/reserved API amount: **US$0.02340565 / US$5 internal stop cap**;
- a disabled-hooks commit path was denied by an approval/control, then a normal commit with hooks preserved succeeded;
- local artifacts reportedly exist at:
  - `F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\build-01\DELIVERY_PACKET.md`
  - `F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\build-01\BUILD-01-review.zip`
- bundle entries were reported hash-verified.

The local commit was previously absent from GitHub because the original BUILD-01 authorization prohibited push. That restriction is now narrowed by the owner decision below. Until the checkpoint is pushed and inspected, the BUILD-01 implementation/test claims remain Codex/user-reported rather than MASTER-verified.

## Owner-Approved Private Feature-Branch Sync Policy

Purpose: remove the owner as a manual message/file bus between Codex local implementation and MASTER cloud review.

For a MASTER-approved bounded build, Codex may now push the corresponding **explicitly named private feature branch** and subsequent review checkpoints to `BenCCCCCCCCC/Chat-Codex-Handoff` without asking the owner again for each ordinary checkpoint, provided all of the following hold:

- push only the active non-default feature branch named by the bounded handoff (current: `prototype/study-teachback-v0.1`);
- push only commits within the already approved product scope and review/evidence files needed for MASTER inspection;
- verify actual branch/HEAD/worktree before push and preserve unexpected work;
- normal fast-forward push only; no force push, remote branch deletion or destructive history rewrite;
- no merge/rebase into default/master/main/meta state, no release, no public deploy/share;
- no secrets, API keys, `.env` credentials, private client data, raw third-party audio, sensitive source material or other data outside the approved repository boundary;
- owner-selected raw test audio/material should remain local by default unless a later explicit decision says it is safe/necessary to commit; MASTER review should use sanitized textual/runtime evidence instead;
- human-readable review evidence must be available on the branch. `DELIVERY_PACKET.md`, manifests, test summaries and sanitized error evidence are preferred. An opaque ZIP may remain a local convenience but must not be the only review source because remote text review cannot depend on unpacking an unavailable binary artifact;
- after push Codex reports the remote branch and exact pushed SHA. MASTER then reads commit/diff/evidence directly from GitHub.

This is a standing workflow authorization for private feature-branch checkpoint synchronization, not blanket permission for arbitrary remote operations.

## Preliminary Blocker Interpretation

A 401 from `/v1/audio/transcriptions` is an authentication/authorization failure at the transcription request boundary, not evidence that Mandarin recognition or timestamp quality failed. Because Codex reports successful real Luna calls in the same build, total OpenAI API unavailability is not established; the fault may be route-specific credential propagation/selection, request construction, or another auth-path difference. This remains a hypothesis until remote source/log evidence is reviewed.

Do **not** switch to another ASR/provider/model, install WhisperX/local models, print/expose keys, raise budget, or weaken timestamp requirements merely to bypass the blocker.

## Product / Four Layers — Unchanged

**User/scenario:** adult Mandarin learner studying a bounded source/concept/rule/process and wanting to explain it in their own words.

**Product:** one learning tutor + formal spoken teach-back workspace. Increment over ordinary Study/Voice is controlled original-audio evidence, time-linked replay, separate raw/corrected transcript, knowledge-versus-delivery separation, ASR/tool-error attribution, targeted reteaching/re-recording and a distinct related Apply step.

**v0.1/MVP:** one local Web surface; text Tutor; persistent `我来讲讲`; in-product microphone recording; timestamped transcription where supported; conservative audio observations; source-linked content/logic and delivery feedback; targeted partial/full re-record; related application item; history/export/delete.

**Feasibility:** partial engineering evidence is reported for the local Web/Tutor/content side, but the actual full speech pipeline remains blocked at API authentication. No claim of end-to-end product usability yet.

## Active Build-Time Boundaries

Approved route remains:
- isolated `study-teachback-app/` on `prototype/study-teachback-v0.1`;
- local development/commits plus **private feature-branch checkpoint push under the sync policy above**;
- native HTML/CSS/JS + existing Node + Edge + browser media APIs + IndexedDB;
- ASR = `whisper-1` because timestamps are required;
- semantic = `gpt-5.6-luna` via Responses, `store=false`;
- no auto provider/model switch, new package/local-model install, public hosting, merge/release, external users or sensitive/third-party recordings;
- BUILD-01 new cash <= US$10; internal API reservation/hard stop <= US$5.

The zero-dependency audio checker may only report supported observations/candidates; no validated VAD/PTE/hesitation claims.

## Next Smallest Step

**Sync the current BUILD-01 checkpoint to the approved private feature branch, then MASTER reviews it remotely and isolates the Whisper 401.**

For the current checkpoint Codex should:
1. preserve local branch/commit lineage and verify `prototype/study-teachback-v0.1` / `be5cef57564ed16bf2f25467ad0247bb9d7a717a` (or accurately report a later local commit if evidence files require an additional commit);
2. ensure the product source plus a human-readable `DELIVERY_PACKET.md` and sufficient sanitized review/test/auth evidence are tracked on that branch; do not commit secrets or raw private test audio;
3. use a normal fast-forward push of `prototype/study-teachback-v0.1` to `origin`;
4. return the exact remote branch and pushed SHA; no merge/release/public action.

After remote sync, MASTER will inspect branch/diff/tests/Luna evidence/transcription code/401 evidence directly through GitHub. If the evidence shows an implementation/config bug within the already-approved credential path, a narrow fix and minimal transcription rerun can proceed under the existing BUILD-01 authorization. If resolving it requires entering/replacing credentials, changing account/project/provider/model, installing anything, or other new credential handling, return one consolidated User Decision Needed.

## State Summary

Completed: BUILD-01 produced a local implementation/checkpoint and blocker receipt; paid calls were stopped; owner approved private feature-branch checkpoint synchronization to remove manual artifact uploads.

Verified by MASTER: BUILD-00/public documentation at prior scope; no new BUILD-01 implementation/test evidence yet because the product checkpoint has not been remotely synced.

Likely: substantial non-ASR product work exists and the blocker is localized to transcription authentication, but this remains unverified until remote branch review.

Unknown: exact implementation completeness; actual Node/Edge/Luna evidence; cause of Whisper 401; Mandarin transcript/timestamp quality; real full-pipeline latency/cost; local deletion/history behavior.

Not Done: private branch sync, MASTER review of current checkpoint, 401 resolution, successful end-to-end speech attempt, integrated owner walkthrough, external learner validation or release.

Must Fix: full speech chain remains blocked; no content-only result may be relabelled end-to-end PASS; review artifacts must be remotely inspectable without requiring owner manual upload.

User Decision Needed: none for normal private checkpoint pushes under this policy or diagnosis within existing BUILD-01 scope. New credential/account handling, provider/model/dependency/budget/scope expansion, merge/release/public actions still require a new decision.

Future Optional: dedicated VAD/local ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
