# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01 — OWNER APPROVED / READY FOR CODEX EXECUTION / NOT YET EXECUTED**

The active product direction remains **Study-first + in-product spoken teach-back** with the continuous flow `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. The app/plugin itself records formal attempts; manual pre-record/upload is not the normal consumer journey.

BUILD-00 is MASTER-accepted as **PASS WITH TWO BUILD-TIME CORRECTIONS** after review of the supplied `PREFLIGHT.md`. Immediately after MASTER presented the consolidated five-item BUILD-01 authorization package, the owner replied **“可以的”**. In direct context, this is accepted as approval of the whole bounded bundle, not a partial approval.

A bounded implementation contract is active at `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`.

PRODUCT-CORE-01 remains PAUSED; INTERVIEW-DEMO-01 remains SUPERSEDED. Gate5 external-user execution remains ON HOLD. No older READY prompt overrides this state.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — active engineering contract
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior research

Research/state writes are not product push, merge, release or publication.

## Accepted BUILD-00 Receipt

From the supplied preflight:
- repo `F:\Chat-Codex-Handoff\validation-repo`
- branch `prototype/acceptance-evidence-p0`
- HEAD `a1c37af2d68cce8f0574b89b01975e9223f6cea2`
- one worktree; tracked/staged diff empty at inspection
- existing untracked `.codex/hooks.json`, `T09_LIVE_PACKET.txt`, `artifacts/` preserved
- Node 24.19.0 available; Edge first target; selected route needs no npm/Python/ffmpeg/speech package installation
- Python 3.14.6 observed but local WhisperX route is not selected
- no server/browser/microphone/API/model/install/paid execution occurred in BUILD-00.

MASTER did not rerun the Windows commands; these are accepted from the supplied Codex artifact. Historical P0 review remains PASS FOR COMPARISON ENTRY only; PS5.1 54/54 remains Codex-reported.

## Build-Time Corrections

1. **Semantic model freshness:** BUILD-01 uses `gpt-5.6-luna` as the initial Tutor/semantic candidate rather than the PREFLIGHT's GPT-4.1 mini suggestion. Use Responses with `store=false`, structured output where needed, no silent model/provider escalation.
2. **ASR framing:** keep `whisper-1` specifically because the product needs word/segment timestamps. Do not describe it as the current general-purpose transcription recommendation. No default dual-ASR voting; critical negation/number/condition/term ambiguity fails closed to replay/correction.

## Owner-Approved BUILD-01 Bundle

Approved in one bundle:
1. local product-code development, local branch and local commits under the active handoff; **no push/merge/release/public deployment**;
2. short-lived loopback Node server, target Edge and product-controlled microphone capture through explicit user/test action;
3. owner-selected, low-risk, single-speaker audio and limited learning-source data processed through OpenAI default/global API endpoints under the documented retention/cross-border limitations;
4. API use limited to `whisper-1` and `gpt-5.6-luna`; no automatic provider/model switch;
5. total BUILD-01 new cash cap **US$10**, with internal API reservation/hard-stop cap **US$5**, no automatic recharge.

Not authorized: external-user recruitment/contact, third-party voices, sensitive data, public hosting, product push/merge/release, private Chat/Desktop/client-file reads, destructive Git actions, new provider/model, new package/model installation, or spend beyond the stated caps.

## Product / Four Layers

**User/scenario:** adult Mandarin learner who has studied a limited source and wants to explain a concept/rule/process in their own words. AI-light status is a low-friction design constraint, not low domain knowledge.

**Product:** one learning tutor + formal spoken teach-back workspace. Teaching itself is a strong native-Chat baseline. Incremental value is product-controlled original audio, replayable/time-linked evidence, separate transcript/audio/source records, knowledge-versus-delivery separation, ASR/tool-error attribution, targeted re-teaching/re-recording and a distinct related Apply step.

**v0.1/MVP:** one local Web surface; limited source/task type; text Tutor; persistent `我来讲讲`; in-product microphone recording; faithful timestamped transcription where supported; conservative audio observations; source-linked content/logic and delivery feedback; targeted partial/full re-record; one related application item; history/export/delete. No default audio upload, realtime duplex Tutor, PTE-equivalent score, pronunciation/accent grading, full knowledge graph or external-user platform.

**Feasibility:** selected route is zero-new-package native HTML/CSS/JS + existing Node + Edge + browser media APIs + IndexedDB + OpenAI APIs. Actual Mandarin fidelity, timestamp quality, delivery-observation usefulness, semantic fairness, latency and cost remain runtime unknowns to be tested during engineering.

## Architecture / Measurement Boundaries

One formal attempt retains original audio and feeds separate audio-observation and ASR/transcript branches. Content/logic analysis does not first receive fluency labels. Delivery interpretation may use mechanically supported audio events plus transcript context. Program validates source/attempt/span IDs, timestamps and schemas before display.

The zero-dependency audio checker may report only supported observations such as duration, clipping/quality candidates and conservative near-silence/pause candidates. It is not a validated VAD/PTE fluency scorer. Weak evidence yields `声音证据不足` / PARTIAL rather than manufactured interpretation.

Do not infer lack of knowledge from pauses/fillers/accent/self-repair. Do not let ASR error become user knowledge failure. Corrected transcript, partial re-record and full re-record are distinct objects. Missing content may have no audio span and must not receive a fabricated timestamp.

## Data / Privacy / Budget

Only owner-selected, low-risk, single-speaker test material/audio during BUILD-01. No third-party voices, meetings, children, sensitive medical/legal/financial data or private client internals.

Local prototype stores raw audio, transcripts, observations, anchors, attempts and feedback in IndexedDB with max-7-day prototype retention when the app is later opened for expiry cleanup; explicit local delete must remove linked local objects where possible. Exported copies remain outside app deletion control.

Approved cloud route:
- formal attempt audio -> loopback proxy -> OpenAI `/v1/audio/transcriptions`;
- limited selected source/transcript/events -> `/v1/responses`, `store=false`;
- no bulk repo/history/private-client upload and no third-party telemetry.

Budget limits: total BUILD-01 new cash <= US$10; internal API reservation/hard stop <= US$5; max 60 formal attempts <=3 minutes each; ASR reservation max 360 billed minutes including retry reservation; explicit request/token ledger; first hit cap stops further paid calls. Cash cap is a ceiling, not a spending target.

## Continuous Engineering Sequence

A. Learn state and Tutor/source flow + persistent `我来讲讲` transition.
B. In-product microphone capture, original-audio lifecycle, playback/timebase, failure recovery.
C. Real `whisper-1` transcription/timestamps + conservative audio observations + transcript correction/versioning.
D. Separate content/logic and delivery semantic analysis + schema/reference validation + fail-closed uncertainty.
E. Diagnose -> targeted Tutor Repair -> partial/full re-record -> related Apply -> history/export/delete.
F. Integrated engineering verification + one review bundle/Delivery Packet -> one owner walkthrough.

Do not pause after each internal batch for ordinary approval. Stop only for a real retained permission/budget/credential/access blocker, unexpected repository lineage or scope expansion beyond the handoff.

Required challenge cases include correct-with-pauses, fluent-wrong, omitted condition vs valid wording vs self-repair, critical ASR negation/number/term error, silence/noise/clipping/permission denial/device interruption/decode failure, source/anchor revision, corrected transcript vs re-record identities, no fabricated timestamp for missing content, invalid refs rejected, API timeout/retry/cost cap behavior and truthful delete/export/history boundaries.

## Completion Target

Highest allowed result:
**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**.

Return one concise Delivery Packet and one whitelist review bundle with source/diff, runtime receipts, feature matrix, challenge results, actual model/API usage and cost ledger, local data-retention behavior, actual screenshots where available, and Completed / Not Done / Verified / Likely / Unknown plus Must Fix / User Decision Needed / Future Optional.

No automatic push/merge/release. External learner efficacy, retention, willingness to pay, plugin-vs-standalone distribution and long-term learning transfer remain later questions.

## State Summary

Completed: actual PREFLIGHT reviewed; current model/ASR/data facts refreshed; BUILD-00 accepted; BUILD-01 contract prepared and owner-approved.
Verified: supplied BUILD-00 artifact facts at recorded local scope + current public technical documentation; no new live product/audio/model result yet.
Likely: bounded zero-package Web implementation can exercise the full Study->Teach-back product mechanism; reliability/benefit unmeasured.
Unknown: actual API credential/access, Mandarin transcript/timestamp quality, conservative audio checker usefulness, latency, real spend, user learning/reuse and market value.
Not Done: BUILD-01 local execution, live audio/model challenge runs, integrated owner walkthrough, external users or release.
Must Fix: no fake VAD/PTE/hesitation claims, no ASR-user blame, no fabricated timing or unlicensed source reuse, no hidden provider/package escalation.
User Decision Needed: none for ordinary BUILD-01 execution within the approved bundle; only retained stop conditions require a new decision.
Future Optional: dedicated VAD/local ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE pronunciation, native/plugin distribution, external learner study.

## Next Smallest Step

**Codex executes BUILD-01 from the active engineering handoff, verifying actual local lineage before any write.**
