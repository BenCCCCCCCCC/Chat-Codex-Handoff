# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01 — CODEX-REPORTED PARTIAL / BLOCKED AT WHISPER AUTH / MASTER ARTIFACT REVIEW PENDING**

The active product direction remains **Study-first + in-product spoken teach-back** with the continuous flow `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Formal attempts are recorded inside the product; manual pre-record/upload is not the normal consumer journey.

BUILD-00 remains MASTER-accepted as **PASS WITH TWO BUILD-TIME CORRECTIONS**. BUILD-01 was owner-approved and Codex has now returned a partial/blocker receipt. This is **not** yet a MASTER acceptance of the implementation because the local Delivery Packet and review bundle have not been inspected in this Chat.

PRODUCT-CORE-01 remains PAUSED; INTERVIEW-DEMO-01 remains SUPERSEDED; Gate5 external-user execution remains ON HOLD. No older READY prompt overrides this state.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — active bounded implementation contract
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior research

State writes do not authorize push/merge/release/public deployment.

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
- artifacts reportedly exist at:
  - `F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\build-01\DELIVERY_PACKET.md`
  - `F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\build-01\BUILD-01-review.zip`
- bundle entries were reported hash-verified.

These facts remain at the **Codex/user-reported** level until the Delivery Packet and review bundle are supplied/inspected. The commit is local and was not authorized for push; MASTER has not observed it through the remote GitHub connector.

## Preliminary Blocker Interpretation

A 401 from `/v1/audio/transcriptions` is an authentication/authorization failure at the transcription request boundary, not evidence that Mandarin recognition or timestamp quality failed. Because Codex reports successful real Luna calls in the same build, total OpenAI API unavailability is not established; the fault may be route-specific credential propagation/selection, request construction, or another auth-path difference. This is only a hypothesis until the implementation/log evidence is reviewed.

Do **not** switch to another ASR/provider/model, install WhisperX/local models, print or expose keys, raise budget, or weaken the timestamp requirement merely to bypass the blocker.

## Product / Four Layers — Unchanged

**User/scenario:** adult Mandarin learner studying a bounded source/concept/rule/process and wanting to explain it in their own words.

**Product:** one learning tutor + formal spoken teach-back workspace. Increment over ordinary Study/Voice is controlled original-audio evidence, time-linked replay, separate raw/corrected transcript, knowledge-versus-delivery separation, ASR/tool-error attribution, targeted reteaching/re-recording and a distinct related Apply step.

**v0.1/MVP:** one local Web surface; text Tutor; persistent `我来讲讲`; in-product microphone recording; timestamped transcription where supported; conservative audio observations; source-linked content/logic and delivery feedback; targeted partial/full re-record; related application item; history/export/delete.

**Feasibility:** partial engineering evidence is now reported for the local Web/Tutor/content side, but the actual full speech pipeline remains blocked at API authentication. No claim of end-to-end product usability yet.

## Active Build-Time Boundaries

Approved route remains:
- local `study-teachback-app/` on local branch/commits only;
- native HTML/CSS/JS + existing Node + Edge + browser media APIs + IndexedDB;
- ASR = `whisper-1` because timestamps are required;
- semantic = `gpt-5.6-luna` via Responses, `store=false`;
- no auto provider/model switch, new package/local-model install, public hosting, push/merge/release, external users or sensitive/third-party recordings;
- BUILD-01 new cash <= US$10; internal API reservation/hard stop <= US$5.

The zero-dependency audio checker may only report supported observations/candidates; no validated VAD/PTE/hesitation claims.

## Next Smallest Step

**Inspect the single BUILD-01 Delivery Packet and whitelist review bundle, then isolate the Whisper 401 using existing approved scope.**

The review should establish:
1. actual branch / before-after HEAD / changed files / commit evidence;
2. what Node 18/18 and Edge 14/14 cover;
3. actual Luna 5/5 challenge inputs/expected/outputs and model/runtime receipts;
4. exact transcription request path, Authorization-header construction, environment-variable/credential selection and proxy boundary without exposing the secret value;
5. exact 401 response metadata/error body with secrets redacted;
6. whether the same approved credential path is used for Responses and audio transcription;
7. whether the blocker is code/config/auth/account capability and what smallest fix is possible without new provider/dependency/budget scope;
8. review-bundle hashes/contents and any unverified features.

If the evidence shows an implementation/config bug within the already-approved credential path, Codex may correct and rerun the bounded transcription check under the existing BUILD-01 authorization. If resolving it requires entering/replacing/revealing credentials, changing account/project/provider/model, installing anything, or other new credential handling, return one consolidated User Decision Needed rather than improvising.

## State Summary

Completed: BUILD-01 produced a local implementation/checkpoint and blocker receipt; paid calls were stopped; canonical state records the receipt.

Verified by MASTER: BUILD-00/public documentation at prior scope only. No new BUILD-01 local source, tests, real Luna result or 401 trace has yet been independently inspected here.

Likely: substantial non-ASR product work exists and the blocker is localized to the transcription auth boundary, but this remains unverified until artifact review.

Unknown: exact implementation completeness; actual Node/Edge/Luna evidence; cause of Whisper 401; Mandarin transcript/timestamp quality; real full-pipeline latency/cost; local deletion/history behavior.

Not Done: MASTER review of Delivery Packet/review bundle, 401 resolution, successful end-to-end speech attempt, integrated owner walkthrough, external learner validation or release.

Must Fix: full speech chain is blocked; do not relabel content-only success as v0.1 end-to-end PASS; do not bypass with unauthorized provider/model/dependency or expose credentials.

User Decision Needed: **none yet for diagnosis within existing scope**. A new decision is required only if the evidence shows new credential handling/account change/provider/model/dependency/budget/scope is necessary.

Future Optional: dedicated VAD/local ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
