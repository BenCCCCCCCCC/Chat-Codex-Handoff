# Current State

Updated: 2026-09-10
Role: 00 MASTER / authoritative dynamic state

## Stage

**DIRECTION-DEEPENING-01 v4 — STUDY-FIRST / IN-APP TEACH-BACK FLOW SELECTED / IMPLEMENTATION NOT STARTED**

Latest owner correction: the product should not feel like `confirm rubric -> upload a recording`. It should first help the user learn in a Study-Mode-like dialogue, then let the user naturally switch into a formal explain-back attempt. Recording is a first-class product capability: the app/plugin itself captures the microphone audio. Manual upload is removed from the normal user journey.

MASTER adopts this correction. Prior v3 dual-channel audio/transcript architecture, source-linked content/logic assessment, delivery observations, ASR error protection and no-uncalibrated-total-score rules remain. The experience is now one continuous loop: **Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply**.

No product code, microphone capture, model/API run, installation, deployment or local Codex dispatch occurred in this turn. PRODUCT-CORE-01 remains PAUSED, INTERVIEW-DEMO-01 SUPERSEDED and Gate5 external execution ON HOLD.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` **v4** — current product/UX/engineering baseline.

Earlier v3 technical/source research remains in Git history. Old READY briefs are not active build permissions. Research/state updates are not product-code push or publication.

## Preserved Product Receipt

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Branch: `prototype/acceptance-evidence-p0`
- Latest owner/Codex-reported HEAD: `a1c37af2d68cce8f0574b89b01975e9223f6cea2`
- Prior P0 source/bundle review: PASS FOR COMPARISON ENTRY only; PS5.1 54/54 remains Codex-reported.
- No later product HEAD or execution receipt is known.

Preserve old source/evidence and any unexpected partial work; no reset. P0 may contribute provenance/error-state ideas but does not dictate consumer UI or Windows/Git onboarding.

## Product / Four Layers

**User/scenario:** adult who has just studied a limited source and needs to explain a concept/rule/mechanism in their own words. Mandarin, single speaker, short low-risk learning task first. AI-light status is a low-friction design constraint, not low subject knowledge.

**Product:** a learning tutor and spoken teach-back workspace in one experience. The user first learns through explanation/questions/examples, then taps `我来讲讲` whenever ready. The same learning state drives formal recording, source/audio-linked diagnosis, targeted reteaching and re-explanation.

**v0.1:** one Web/PWA surface; limited source/topic; tutor dialogue; always-available teach-back action; in-app microphone recording; faithful transcript/replay; audio observations; separate content/logic and delivery interpretation; a few anchored feedback items; targeted partial/full re-record; one new application task; attempt history/export/delete. Manual audio upload is not the standard path.

**Feasibility:** browser microphone capture is practical through user-granted media APIs in a secure context; existing VAD/ASR/alignment/playback components remain reusable. Main uncertainty is evidence quality, timing/alignment, semantic fairness, cost/latency and whether users prefer this over ordinary Study/Voice plus a capable Skill.

## Current Interaction Contract

### Learn

User begins with a topic/source. Tutor asks what they know, explains in layers, checks understanding and can answer directly when requested. It may create versioned `learning_anchors` internally, but users do not pass through a technical `confirm criteria` form. Front stage shows only a few plain-language learning goals. Real ambiguity is resolved conversationally.

### Transition

`我来讲讲` stays visible throughout learning. Tutor may suggest it but does not certify readiness. User can continue studying or begin at any time. The attempt records assistance level: no prompt / keywords / source visible.

### Explain

The product itself records the microphone. Formal attempt is distinct from ordinary spoken questions to the tutor. First version prefers one continuous recording with Start/Finish; explicit/device interruptions are metadata and are excluded from natural pause observations. Uploading a previously recorded file is development/fallback only, not normal UX.

### Diagnose

One original audio recording feeds parallel audio-observation and ASR/transcript branches, then source-bound content/logic and contextual delivery analyses. Content assessment does not first receive a label such as “low fluency”. Every important finding can navigate to the original audio/text/source. Critical ASR ambiguity blocks dependent negative judgment until replay/correction.

### Repair / Re-explain

A knowledge/logic issue returns directly to targeted teaching or a probing question. A delivery issue produces a narrow speaking exercise. User may re-record only that explanation or make a fresh full attempt. Old recordings remain evidence; corrected text never becomes a new oral performance.

### Apply

A new but related example provides limited transfer evidence. Same-question improvement and new-task performance remain separate; no long-term mastery or exam prediction claim.

## Why This Is Not Just Study Mode + Mic

Official Study Mode already provides guided questions, stepwise explanations and understanding checks, so the teaching portion is not proprietary value. If this product only adds microphone input and a model-generated comment, it should not be built independently.

Candidate incremental value is controlled raw-attempt audio, replayable evidence, separate transcript/audio/source versions, measurable delivery events, knowledge-versus-delivery separation, error attribution, targeted re-teaching and re-recording tied to the same learning gap, and a distinct new-task check.

A Chat/Skill/Plugin with equivalent lawful audio/state tools remains the strong baseline. If it provides the same experience with less setup, use that surface rather than forcing a standalone app. Plugin access to host Voice raw audio remains Unknown; do not extract private client files. A small owned Web recorder is currently the controllable engineering candidate, not a final distribution decision.

## Engineering Sequence

A. Tutor/source/learning state and seamless teach-back transition.
B. In-app microphone capture, audio storage/replay/timebase and recoverable failures.
C. Audio-observation + ASR/alignment quality pipeline.
D. Separated content/logic and delivery analysis with validated anchors.
E. Diagnose -> targeted Repair -> partial/full re-record -> Apply -> history/delete.
F. Relevant engineering challenge cases and one integrated owner walkthrough.

Engineering must cover fluent-wrong, correct-with-pauses, missing information, self-repair, critical ASR negation/number errors, device interruption, source revision and recording-version distinction. Long-term learning efficacy/retention/commercial validation remain later.

## Completed / Verified / Likely / Unknown / Not Done

Completed: owner UX correction incorporated; study-first flow, natural transition, in-product recording, background criteria and continuous learning/teach-back loop specified; v3 technical evidence safeguards retained.

Verified: current official Study Mode supports guided questioning, stepwise explanation, uploaded materials and understanding checks; browser media APIs can request user microphone access and record audio in supported secure contexts. No new local runtime or model result.

Likely: this continuous flow is less rigid than the prior criteria/upload design and better matches an ordinary learning session. This is a product judgment, not a user-study result.

Unknown: actual tutor-to-teach-back usability, Mandarin ASR/alignment and diagnosis accuracy, plugin microphone/raw-audio support, latency/cost, repeated use and learning transfer.

Not Done: local implementation, real audio pipeline/model evaluation, integrated owner use, competitor runtime comparison, external learners or release.

Must Fix: no default `upload your recording`, no separate mandatory `confirm criteria` gate, no test-first experience before teaching, no treating casual tutor speech input as a formal attempt.

User Decision Needed: none for normal product iteration; actual development/runtime/API/audio-data/install/spend/deployment gates remain.

Future Optional: realtime full-duplex tutor, English/PTE pronunciation, native mobile/desktop apps, broad knowledge graph, multiplayer learning; inactive.
