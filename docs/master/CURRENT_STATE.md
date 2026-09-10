# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-00 MASTER REVIEW PASS WITH CORRECTIONS / BUILD-01 READY FOR ONE CONSOLIDATED OWNER APPROVAL / IMPLEMENTATION NOT STARTED**

The active direction is unchanged: **Study-first + in-product spoken teach-back** with the continuous product flow `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. The app/plugin itself records formal attempts; manual pre-record/upload is not the normal consumer journey.

The owner supplied the actual BUILD-00 `PREFLIGHT.md`. MASTER reviewed it, checked its internal evidence, and rechecked current OpenAI official model/transcription/data-control documentation. BUILD-00 is accepted as **PASS WITH TWO BUILD-TIME CORRECTIONS**, not a runtime/product PASS.

A new bounded implementation contract now exists at:
`docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`

It is prepared but **not executable until the owner explicitly approves the consolidated development/audio/API/data/spend bundle**. PRODUCT-CORE-01 remains PAUSED, INTERVIEW-DEMO-01 SUPERSEDED, and Gate5 external execution ON HOLD.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — active build contract pending owner approval
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — current product/UX/engineering baseline and earlier source research

Research/state writes do not authorize local product execution, paid calls, product push/merge or publication.

## BUILD-00 Verified Review

Supplied PREFLIGHT explicitly states it is decision material, not execution authorization. MASTER accepts the following as Codex-local observations recorded in that artifact:
- repo `F:\Chat-Codex-Handoff\validation-repo`
- branch `prototype/acceptance-evidence-p0`
- HEAD `a1c37af2d68cce8f0574b89b01975e9223f6cea2`
- one worktree; tracked/staged diff empty at inspection time
- existing untracked `.codex/hooks.json`, `T09_LIVE_PACKET.txt`, `artifacts/` preserved
- Node 24.19.0 available; selected cloud route requires no new npm/Python/ffmpeg/speech package for v0.1
- Python 3.14.6 observed but local WhisperX route is not selected; Edge first browser target
- no server/browser/mic/API/model/install/paid execution in BUILD-00.

MASTER did not rerun these Windows commands, so they remain verified through the supplied Codex artifact, not an independent second-machine execution.

## Build-Time Corrections

**C1 semantic model freshness.** PREFLIGHT proposed GPT-4.1 mini. Current OpenAI model guidance on 2026-09-11 recommends GPT-5.6 Luna for cost-sensitive/high-volume workloads; current published price is lower than GPT-4.1 mini and Luna supports Responses/structured output. BUILD-01 therefore uses `gpt-5.6-luna` as the initial semantic Tutor/assessment candidate. No automatic upgrade/provider switch. If challenge cases fail, report quality failure rather than silently buy a stronger model.

**C2 ASR rationale.** Keep `whisper-1` for initial ASR because this product needs word/segment timestamps. Current OpenAI transcription docs recommend `gpt-transcribe` for ordinary transcription, but explicitly direct timestamp-requiring workflows to `whisper-1`; `timestamp_granularities[]` remains whisper-1-specific. Do not describe Whisper as the current general-purpose recommendation. Critical recognition errors fail closed into replay/correction; no default dual-ASR voting.

## Product / Four Layers

**User/scenario:** adult Mandarin learner who has studied a limited source and wants to explain a concept/rule/process in their own words. AI-light status is a low-friction design constraint, not low domain knowledge.

**Product:** one learning tutor + formal spoken teach-back workspace. Teaching itself is a strong native-Chat baseline. Proposed incremental value is controlled original audio, replayable/time-linked evidence, separate transcript/audio/source records, knowledge-versus-delivery separation, ASR/tool-error attribution, targeted re-teaching/re-recording, and a distinct new-application step.

**v0.1/MVP:** one local Web surface, limited source/task type, text Tutor, persistent `我来讲讲`, in-product microphone recording, faithful timestamped transcription where supported, conservative audio observations, source-linked content/logic and delivery feedback, targeted partial/full re-record, one related Apply item, history/export/delete. No default audio upload, realtime duplex Tutor, PTE-equivalent score, pronunciation/accent grading, full knowledge graph or external-user platform.

**Feasibility:** selected zero-new-package route is plausible using existing Node + browser APIs + cloud ASR/semantic APIs. Audio observations without a dedicated VAD dependency must remain conservative pause/near-silence candidates, not validated PTE fluency. Reliability is an engineering test question, not presumed from components.

## Data / Privacy / Cost Review

PREFLIGHT data design is accepted with the active build contract refinements:
- local raw audio/transcripts/observations/attempt state in IndexedDB; visible quota/storage failure; prototype expiry max 7 days when the app is opened to perform cleanup; explicit local delete; exported copies outside app-delete control
- formal attempt audio may be sent only after owner approval to `/v1/audio/transcriptions`
- selected limited source/transcript/event data may be sent to `/v1/responses` with `store=false`
- no repo/private-client/history bulk upload, third-party telemetry or third-party voices.

Fresh official OpenAI check: API data is not used for training unless opted in; `/v1/audio/transcriptions` currently lists no abuse-monitoring or application-state retention; ordinary `/v1/responses` has default abuse-monitoring retention up to 30 days absent approved controls, while `store=false` avoids normal response application-state storage. Australia is listed for regional storage subject to eligibility but not regional processing. BUILD-01 therefore requires explicit owner acceptance of default/global cross-border processing; no claim of Australia-local inference.

Budget envelope remains conservative: owner decision requested for **US$10 maximum new cash for BUILD-01 only**, with an internal **US$5 API reservation/stop cap**, no auto recharge and no auto model escalation. Caps are ceilings, not spend targets. Runtime must record actual model/date/usage/cost assumptions.

## Build Architecture / Engineering Plan

Use isolated `study-teachback-app/`, native HTML/CSS/JS + current Node standard library, loopback-only server, Edge first target, browser getUserMedia/MediaRecorder/Web Audio/audio/IndexedDB. No npm install, Python/ffmpeg/WhisperX/CUDA, new browser, daemon or public host in the selected route.

ASR: `whisper-1` with timestamp output. Semantic route: `gpt-5.6-luna` via Responses, `store=false`. External learning repos are architecture references only unless licenses are separately verified; the reviewed `mattdiep15/feynman` implementation must not be copied merely because source is public.

Continuous implementation after approval:
A Learn/Tutor/state + natural teach-back transition;
B in-product capture/original audio/replay/timebase/failure recovery;
C actual ASR/timestamps + conservative audio observations + transcript correction/versioning;
D separated content/logic and delivery analysis + schema/reference validation;
E Diagnose -> targeted Repair -> partial/full re-record -> related Apply -> history/export/delete;
F engineering challenge suite + one review bundle/Delivery Packet -> one integrated owner walkthrough.

Do not stop after each internal batch for normal UI decisions. Foundational measurement/ASR/error-attribution tests remain engineering quality and cannot be postponed until market validation.

## Build Gate / User Decision Needed

One consolidated owner decision remains before BUILD-01 execution. Approval would cover only:
1. local product-code development, local branch and local commits under the bounded contract; no push/merge/release
2. loopback Node server + target Edge + explicit microphone use for this product
3. owner-selected low-risk single-speaker audio/source data sent through OpenAI default/global endpoints under the documented retention/cross-border conditions
4. `whisper-1` and `gpt-5.6-luna` paid API use only
5. US$10 total new cash cap and US$5 internal API reservation/stop cap.

No ordinary design micro-decisions require further approval. If the owner declines paid/data processing, only an offline partial build can proceed and may not claim full live pipeline PASS.

## Required Challenge Cases

At minimum: correct-with-pauses vs fluent-wrong; omitted condition vs valid paraphrase vs self-repair; critical ASR negation/number/term error; silence/noise/clipping; microphone denial/device interruption/decode failure; source revision preserving old attempt; corrected transcript vs partial/full re-record; absent content with no fabricated timestamp; invalid model source/span/time references; API timeout/retry/budget stop; truthful history/export/delete.

Engineering fixtures do not establish user learning gains.

## State Summary

Completed: actual PREFLIGHT reviewed; current official ASR/model/data facts refreshed; BUILD-00 accepted; BUILD-01 product/engineering contract prepared; cost/privacy/build gate consolidated.
Verified: supplied BUILD-00 artifact facts at their recorded local scope plus current official public documentation. No new live microphone/API/model result.
Likely: bounded zero-package Web route can implement a useful auditable v0.1; reliability/benefit unmeasured.
Unknown: actual API credential/access, Mandarin timestamp/fidelity, audio-observation quality, latency, real spend, user learning/reuse and market value.
Not Done: owner build approval, local implementation, live audio/model tests, integrated owner walkthrough, external users or release.
Must Fix: use current semantic candidate rather than freezing GPT-4.1 mini; describe Whisper timestamp specialization accurately; no fake VAD/PTE fluency claims or source-code reuse without license.
User Decision Needed: approve/adjust the one consolidated BUILD-01 development + microphone/data/API/budget package.
Future Optional: dedicated VAD/local ASR stack, gpt-transcribe comparison, realtime voice Tutor, English/PTE pronunciation, native app/plugin distribution, external learner study; inactive.
