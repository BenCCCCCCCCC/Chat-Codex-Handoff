# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-00 ACCEPTED / BUILD-01 READY PENDING ONE OWNER APPROVAL / DO NOT EXECUTE YET**

The owner supplied the actual BUILD-00 `PREFLIGHT.md`; MASTER reviewed it and refreshed current OpenAI official model/transcription/data-control facts. BUILD-00 is **PASS WITH TWO BUILD-TIME CORRECTIONS**. This is sufficient to prepare the next implementation handoff, but paid API/audio/data processing and product-code execution still require one explicit owner decision.

Active product stays:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — next implementation contract, pending approval
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior evidence

Do not run PRODUCT-CORE-01, INTERVIEW-DEMO-01 or older READY prompts. Gate5 remains ON HOLD.

## Accepted BUILD-00 Receipt

Supplied report recorded:
- local repo `F:\Chat-Codex-Handoff\validation-repo`
- branch `prototype/acceptance-evidence-p0`
- HEAD `a1c37af2d68cce8f0574b89b01975e9223f6cea2`
- one worktree; tracked/staged diff empty at inspection
- existing untracked `.codex/hooks.json`, `T09_LIVE_PACKET.txt`, `artifacts/` preserved
- Node 24.19.0; Edge target; no selected route need for npm/Python/ffmpeg/new packages
- no server/browser/microphone/API/model/install/paid execution.

MASTER accepts this through the supplied artifact; Windows commands were not independently rerun here.

## Mandatory Build-Time Corrections

1. **Semantic model freshness:** do not freeze `gpt-4.1-mini`. Current OpenAI guidance recommends GPT-5.6 Luna for cost-sensitive/high-volume workloads, with current lower published input/output price and Responses/structured-output support. BUILD-01 default = `gpt-5.6-luna`; no silent upgrade or provider switch. If quality fails core challenge cases, report failure/partial.
2. **ASR framing:** `whisper-1` remains the initial route specifically because this product needs word/segment timestamps. Current docs recommend `gpt-transcribe` for ordinary transcription but explicitly use Whisper for timestamp workflows. Do not claim Whisper is the newest/best general transcription model. No default two-ASR voting; critical errors fail closed to replay/correction.

## BUILD-01 Product Scope

User: adult Mandarin learner studying a bounded source/concept/rule/process. AI-light is an onboarding constraint, not low knowledge.

Product: Tutor plus formal spoken teach-back in one stateful flow. Increment beyond ordinary Study/Voice is controlled original-audio evidence, time-linked replay, separate raw/corrected transcript, source-bound content/logic vs delivery observations, ASR/tool-error handling, targeted reteaching/re-recording and a separate related Apply task.

v0.1 normal path:
- start/continue a small learning topic/source
- Tutor explains/questions/uses examples; `我来讲讲` is always available
- app itself requests mic and records the formal attempt
- batch ASR + conservative audio observations
- a few source/audio-linked findings
- replay/correct critical ASR issue
- targeted repair; partial or full new recording
- related new application item
- local history/export/delete.

No default audio upload, real-time duplex voice Tutor, pronunciation/accent or personality scoring, PTE equivalence, full knowledge graph/curriculum, external user platform or public deployment.

## Engineering Route After Approval

Local product folder `study-teachback-app/`; new local branch `prototype/study-teachback-v0.1` only if actual starting HEAD/worktree still match. Preserve unexpected work; never reset to force lineage.

Preferred zero-new-package stack:
- native HTML/CSS/JS
- current Node standard library + native fetch/FormData
- loopback-only server/proxy
- Edge first target
- browser getUserMedia/MediaRecorder/Web Audio/native audio/IndexedDB
- no npm install, Python, ffmpeg, WhisperX, CUDA, extra browser, daemon or public host.

ASR = `whisper-1` timestamp route. Semantic = `gpt-5.6-luna` via `/v1/responses`, `store=false`, structured outputs where needed.

The no-package audio checker can only claim conservative measured facts/candidates (duration, clipping/quality, near-silence/pause candidates under recorded thresholds). It is NOT validated VAD, PTE fluency or proof of hesitation. Unsupported cases display evidence-insufficient/PARTIAL. No Silero/local-model installation is implicitly allowed.

Do not copy source from `mattdiep15/feynman` or other public apps unless license is separately verified; current use is architectural reference only.

## Data / Privacy

Only owner-selected low-risk single-speaker test audio/material in this build. No third-party voices, private meetings, sensitive medical/legal/financial content, browser/Chat/Desktop internals or external learner data.

Local: IndexedDB raw audio/transcript/observations/attempts/feedback, prototype max-7-day cleanup-on-open policy, explicit delete, truthful export boundary, visible quota/storage failure.

Cloud after owner approval:
- formal attempt audio -> OpenAI `/v1/audio/transcriptions`
- limited selected source/transcript/events -> `/v1/responses`, `store=false`
- no repo/history/private-client bulk upload; no third-party telemetry.

Fresh official docs: API data not used for training unless opt-in; audio transcriptions currently list no abuse-monitoring/application-state retention; Responses still have default abuse-monitoring retention up to 30 days absent approved controls, while `store=false` avoids normal stored response state. Australia is currently a regional-storage but not regional-processing location; use default/global processing only if owner accepts cross-border processing.

## Cost Gate

One approval bundle proposes:
- **US$10 maximum new cash for BUILD-01 only**
- **US$5 internal API reservation/stop cap**
- no auto recharge
- no auto model/provider escalation
- max 60 formal attempts, <=3 min each
- max 360 reserved ASR billable minutes including retry reservation
- explicit semantic token/request ledger; first cap hit stops paid calls.

US$10 is a ceiling, not a target. Actual use/cost/model/date must be logged. Existing ChatGPT/Codex subscription is not API credit.

## Continuous Build Sequence

After approval, do not return for ordinary micro-decisions:
A. Tutor/source/learning state + natural `我来讲讲` transition
B. in-product capture/original audio/replay/timebase/permission-interruption-quota recovery
C. actual Whisper timestamp path + conservative audio observations + transcript correction/versioning
D. separated content/logic and delivery semantic analysis + schema/span/source/time validation
E. Diagnose -> targeted Tutor Repair -> partial/full re-record -> related Apply -> history/export/delete
F. challenge tests + one review bundle/Delivery Packet -> one integrated owner walkthrough.

Required challenge cases: correct-with-pauses; fluent-wrong; omitted condition/valid paraphrase/self-repair; ASR critical negation-number-term error; silence/noise/clipping; mic denial/device interruption/decode failure; source revision; corrected transcript vs new recordings; missing content without fake timestamp; invalid model references; timeout/retry/budget stop; truthful history/delete/export.

Highest completion claim: **STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**. No learning-effect, retention, market or PTE claim from engineering tests.

## One Consolidated Owner Decision — Required Before Execution

Owner may approve all five in one reply:
1. bounded local product-code development + local branch/commits; no push/merge/release
2. loopback Node server, target Edge and explicit microphone use for this product
3. owner-selected low-risk source/audio data processed through OpenAI default/global endpoints under the stated retention/cross-border conditions
4. paid API use limited to `whisper-1` + `gpt-5.6-luna`
5. US$10 total new-cash ceiling + US$5 internal API reservation/stop ceiling.

If any item is declined, report the resulting partial/offline scope instead of silently substituting a provider, local model or upload workflow.

## State Summary

Completed: actual PREFLIGHT review; current provider/model/data facts refreshed; BUILD-00 accepted; bounded BUILD-01 handoff written.
Verified: supplied local preflight evidence at its recorded scope + current official docs; no new live product/audio/model result.
Likely: zero-new-package bounded Web implementation is feasible; usefulness/reliability not yet proven.
Unknown: API credential/access, Mandarin transcript/timestamp quality, conservative audio checker usefulness, actual latency/cost, user learning/reuse.
Not Done: owner approval, BUILD-01 execution, owner walkthrough, external learner validation or release.
Must Fix: semantic model freshness, correct Whisper timestamp framing, no fake VAD/PTE/hesitation claims, no unlicensed source reuse.
User Decision Needed: approve/adjust the single BUILD-01 execution + microphone/data/API/budget package.
Future Optional: local VAD/ASR, gpt-transcribe A/B, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
