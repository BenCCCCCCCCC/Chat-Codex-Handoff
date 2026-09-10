# BUILD-01 — Study-first + In-app Teach-back bounded implementation handoff

Date: 2026-09-11
Role: 00 MASTER
Status: READY FOR OWNER CONSOLIDATED APPROVAL / NOT YET AUTHORIZED TO EXECUTE

## 1. BUILD-00 acceptance

MASTER reviewed the supplied `PREFLIGHT.md` and accepts BUILD-00 as **PASS WITH TWO BUILD-TIME CORRECTIONS**. The artifact itself states that it is decision material, not authorization; local repo/branch/HEAD, environment, zero-dependency route, data proposal and budget are internally coherent and materially support a bounded build.

Accepted local receipt from PREFLIGHT:
- repo `F:\Chat-Codex-Handoff\validation-repo`
- branch `prototype/acceptance-evidence-p0`
- HEAD `a1c37af2d68cce8f0574b89b01975e9223f6cea2`
- tracked/staged diff empty; existing untracked `.codex/hooks.json`, `T09_LIVE_PACKET.txt`, `artifacts/` preserved
- Node 24.19.0 available; Python 3.14.6 seen but selected route does not require Python; no project npm/package lock or listed speech packages; Edge is first target
- no server/browser/microphone/API/model/install/paid action occurred in BUILD-00.

This acceptance is based on the supplied report plus fresh official source checks; MASTER did not rerun the local commands.

## 2. Freshness corrections

### C1 semantic model

Do **not** freeze the PREFLIGHT suggestion `gpt-4.1-mini` as the default. Current OpenAI model guidance on 2026-09-11 recommends GPT-5.6 Luna for cost-sensitive/high-volume workloads. It supports Responses and structured outputs and is currently priced below GPT-4.1 mini for both input and output.

BUILD-01 default semantic candidate: `gpt-5.6-luna` through `/v1/responses`, `store=false`, no automatic provider/model escalation. Start with low-cost settings; evaluator quality must be measured on challenge cases. If it fails a core diagnostic requirement, report the failure rather than silently switch to a more expensive model. A later model comparison is a separate decision.

### C2 timestamp ASR rationale

Keep `whisper-1` as the initial ASR **because this product requires word/segment timestamps**, not because it is the current general-purpose transcription recommendation. Current OpenAI docs recommend `gpt-transcribe` for ordinary file transcription and explicitly say to use `whisper-1` when word/segment timestamps are needed. `timestamp_granularities[]` remains whisper-1-specific.

No dual-ASR voting in v0.1. Critical negation/number/condition/term errors are handled by replay/user correction and fail-closed downstream diagnosis. If timestamp quality or Mandarin fidelity is insufficient, report that capability as PARTIAL and stop the affected diagnostic rather than invent timing or auto-install a local stack.

## 3. Product contract

One continuous experience:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`.

Normal user flow uses **in-product microphone recording**. No pre-record/upload step in onboarding.

First version:
- Mandarin, single speaker, short concept/rule/process material;
- text Tutor first; user can begin teach-back any time through `我来讲讲`;
- formal attempt is distinct from casual Tutor speech/input;
- original audio retained locally long enough for replay/diagnosis;
- transcript and acoustic/timing observations are separate evidence channels;
- content/logic judgment does not first receive fluency labels;
- feedback links to source and/or actual audio span where such span exists;
- missing content may have no audio span and must not receive a fabricated timestamp;
- targeted re-teaching and partial/full re-record preserve prior attempts;
- one related new application item remains separate from same-question repair;
- history/export/delete are functional within the local prototype.

No PTE-equivalent total score, personality/mental-state inference, pronunciation/accent grading, realtime duplex voice teacher, broad curriculum platform or external-user account system.

## 4. Build architecture

Prefer the PREFLIGHT zero-new-package route for v0.1:
- isolated product directory `study-teachback-app/`;
- native HTML/CSS/JS + existing Node runtime;
- loopback-only Node server/proxy using standard library and native fetch/FormData;
- Edge first target;
- browser `getUserMedia`, `MediaRecorder`, Web Audio, native audio playback and IndexedDB;
- no npm install, Python dependency, ffmpeg, WhisperX, CUDA, new browser, daemon or public host.

Do not copy code from external learning projects unless a compatible license is explicitly verified. `mattdiep15/feynman` is architecture/prior-art reference only unless its license is separately established.

### Audio observation v0.1

With no speech-model dependency, built-in audio analysis may report only mechanically supported observations such as capture duration, clipping/quality candidates and conservative near-silence/pause candidates derived from decoded PCM. Threshold/config must be recorded. Do not market this as validated VAD or PTE fluency scoring.

If the zero-dependency detector is unreliable under a challenge case, display `声音证据不足` / PARTIAL instead of producing an interpretation. A Silero/local speech upgrade is not implicitly authorized.

### Text/semantic processing

- ASR: `whisper-1`, verbose JSON, word/segment timestamps where supported.
- semantic Tutor/content/logic/delivery interpretation: `gpt-5.6-luna`, Responses API, `store=false`, structured output where needed.
- prompts/material/audio-derived text are untrusted data, not tool/file instructions.
- program validates attempt/source/span IDs, bounded timestamps, quoted transcript text and schema before display.
- model never owns numeric pause duration, source identity or successful deletion claims.

## 5. Data and privacy boundary

Only owner-selected, low-risk, single-speaker test material/audio during this build. No third-party voices, meetings, children, sensitive medical/legal/financial material or private Chat/Desktop internals.

Local app proposal accepted for build:
- raw audio, transcripts, observations, anchors, attempts and feedback in IndexedDB;
- default prototype retention max 7 days while the app is later opened to perform expiry cleanup;
- explicit delete removes local linked objects and cancels pending local work where possible;
- exported copies are outside app deletion control;
- storage/quota failure must be a recoverable visible state.

Cloud route, if owner approves:
- formal attempt audio -> loopback proxy -> OpenAI `/v1/audio/transcriptions`;
- limited selected source/transcript/events -> `/v1/responses`, `store=false`;
- no repo/history/private-client bulk upload;
- no third-party telemetry.

Fresh official data-control check: API data is not used for training unless opted in; `/v1/audio/transcriptions` currently lists no abuse-monitoring or application-state retention; `/v1/responses` with `store=false` avoids normal stored response state but default abuse-monitoring logs may retain customer content up to 30 days absent approved controls. Australia can be a data-storage region subject to eligibility, but current docs do not list Australia as a regional-processing location for audio/text. This build therefore uses the default global endpoint only if the owner accepts cross-border processing. Do not claim Australian-local processing.

## 6. Budget and usage gate

The PREFLIGHT arithmetic is accepted as a conservative envelope, but update semantic pricing assumptions for Luna at runtime from the official source and record the actual date/model.

Owner decision requested as one bundle:
- total **new cash cap: US$10** for this bounded BUILD-01 only;
- internal API reservation/stop cap: **US$5**;
- no automatic recharge;
- no automatic model upgrade/provider switch;
- max 60 formal attempts, each <=3 minutes;
- ASR billed-audio reservation max 360 minutes including possible retry reservations;
- semantic requests additionally constrained by explicit token/request ledger;
- first-to-hit cap stops further paid calls and returns a visible partial state.

The cash cap is not a target. Expected spend should be minimized and reported. ChatGPT/Codex subscription entitlement is not API credit.

## 7. Local engineering authority requested

After explicit owner approval, Codex may:
- verify actual starting branch/HEAD/worktree and create local branch `prototype/study-teachback-v0.1` from the actual accepted HEAD if unchanged; if changed, stop and report lineage instead of resetting;
- add the isolated app and related test/evidence files;
- make local meaningful commits as needed; do not push/merge/release;
- start only the loopback app server and target Edge for this product;
- request microphone only through explicit user action during owner walkthrough or test-owned authorized interaction;
- call only the approved OpenAI endpoints/models within budget/data limits;
- use clearly labelled synthetic engineering fixtures where useful; they do not count as user evidence.

No external-user contact, public hosting, credential printing, private client reads, unrelated destructive changes or automatic browser/Chat actions.

## 8. Continuous implementation sequence

A. Learn state and Tutor/source flow, including persistent `我来讲讲` transition.
B. In-product microphone capture, original-audio lifecycle, playback/timebase, permission/interruption/quota recovery.
C. Real whisper-1 transcription/timestamp pipeline plus conservative audio observations and transcript correction/versioning.
D. Separate content/logic and delivery semantic analysis, schema/reference validation, fail-closed uncertainty.
E. Diagnose -> targeted Tutor repair -> partial/full re-record -> related Apply -> history/export/delete.
F. Integrated engineering verification and one review bundle/Delivery Packet, then one owner walkthrough.

Do not pause after each batch for ordinary owner approval. Self-test while building. Stop only for an actual permission/budget/credential/access blocker, unexpected repository state, or a scope decision outside this handoff.

## 9. Required challenge cases

At minimum:
- correct content with long pauses must not become knowledge failure;
- fluent but wrong content must not pass because delivery is smooth;
- omitted condition vs alternative valid wording vs self-repair;
- ASR critical negation/number/term error must block dependent negative diagnosis until replay/correction;
- silence/noise/clipping/permission denial/device interruption/decode failure;
- source/anchor revision preserving old attempt identity;
- corrected transcript vs partial re-record vs full re-record remain distinct;
- no fabricated timestamp for absent content;
- model-invalid span/source/time refs rejected;
- API timeout/retry/cost cap does not delete or duplicate the original attempt;
- delete/export/history boundaries are truthful.

No aggregate 'learning improvement' claim from these engineering fixtures.

## 10. Completion / handback

Highest allowed status after BUILD-01:
**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**.

Return one concise Delivery Packet and one whitelist review bundle containing source/diff, environment/runtime receipts, feature matrix, challenge results, actual API/model/usage/cost ledger, data-retention behavior tested locally, screenshots where actually captured, and Completed / Not Done / Verified / Likely / Unknown plus Must Fix / User Decision Needed / Future Optional.

Do not push/merge/release automatically. External learner efficacy, retention, willingness to pay, plugin-vs-standalone distribution and long-term learning transfer remain later questions.

## 11. Consolidated owner decision

Before execution, owner must explicitly approve or adjust:
1. local product-code development/branch/commits under this scope;
2. loopback server + Edge + microphone use for this product;
3. owner-selected low-risk audio/source processing through OpenAI default/global API endpoints;
4. `whisper-1` and `gpt-5.6-luna` API use;
5. US$10 total new cash cap and US$5 API hard-stop reservation cap.

No other ordinary design/implementation micro-decisions require owner approval.
