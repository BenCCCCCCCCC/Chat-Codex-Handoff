# Active Handoff

Updated: 2026-09-10
Role: 00 MASTER

## Immediate State

**DIRECTION-DEEPENING-01 v4 / STUDY-FIRST + IN-APP TEACH-BACK DESIGN / NO LOCAL IMPLEMENTATION STARTED**

Latest owner correction: remove the rigid `confirm evaluation requirements -> upload your recording` journey. The product should first teach the user in a Study-Mode-like flow, then let them naturally enter a formal explain-back attempt. The app/plugin itself records the microphone; manual upload is not the default consumer workflow.

This supersedes v3 interaction order while preserving its dual-channel audio/transcript pipeline, evidence/error rules, PTE-like dimensional separation and Chat-substitution gate. PRODUCT-CORE-01 remains paused, INTERVIEW-DEMO-01 superseded, Gate5 external execution ON HOLD. No previous READY build prompt is active.

## Authority / Baseline

Read `BenCCCCCCCCC/Chat-Codex-Handoff` / `meta/master-state`:
1. docs/master/CURRENT_STATE.md
2. this HANDOFF
3. docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md v4

Last owner/Codex-reported local code state remains:
- `F:\Chat-Codex-Handoff\validation-repo`
- `prototype/acceptance-evidence-p0`
- `a1c37af2d68cce8f0574b89b01975e9223f6cea2`

Historical P0 source/bundle review PASS FOR COMPARISON ENTRY and reported PS5.1 54/54 remain unchanged. No new code/audio/model/runtime receipt. Preserve all source/history and any later-discovered partial work; no reset.

## Product Flow — Current Contract

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

This is one continuous learning experience, not separate tutor and scoring products.

### Learn

User starts with a topic or limited source. Tutor asks what they know/where they are stuck, explains in layers, uses questions/examples/short checks and may give direct explanation when requested. Internally create source-bound versioned learning anchors as needed; ordinary users see only a few plain-language learning goals, not a criteria approval form.

Only material ambiguity that materially affects assessment should trigger a clarification. Never wait until after the recording to silently change the criteria.

### Explain

`我来讲讲` is a persistent first-level action. The user can begin whenever they feel ready; Tutor may suggest but does not certify readiness. Record assistance level (no prompt / keywords / source visible).

The product requests microphone permission and records the formal attempt itself. Normal path is Start -> continuous explanation -> Finish -> replay. Do not ask users to pre-record elsewhere and upload. A file-import path, if retained, is a bounded fallback/test aid only.

Keep ordinary voice-to-text questions to Tutor distinct from a formal explain-back attempt. Do not score casual questions or acknowledgements as oral performance.

### Diagnose

One original recording feeds:
- audio quality/activity/timing observations;
- faithful ASR/transcript and optional alignment;
then separate source-bound content/logic assessment and contextual delivery interpretation.

Content/logic does not first see labels such as low fluency. Observable pauses/repetition/rate do not automatically lower knowledge. Critical negation/number/condition/jargon recognition uncertainty blocks dependent negative feedback until replay/correction.

Important feedback is limited and actionable, each linked to actual source/attempt/audio span. Program owns numeric durations/timestamps/references; models explain supported evidence but do not invent measurements.

### Repair / Re-explain

Clicking a knowledge or logic gap returns to targeted teaching, a probing question or a new example. Delivery findings produce narrow speaking practice rather than a personality/mental-state judgment.

User may record a new local explanation for the affected point or a new full attempt. Preserve the earlier audio/transcript; a corrected transcript is not a new spoken attempt.

### Apply

Use one related new situation for limited application evidence. Same-question repair and new-task performance stay separate. Do not claim stable mastery, exam equivalence or long-term transfer from one session.

## Form Factor / Why Not Plain Chat

Current Study Mode already supports guided learning, questions and understanding checks. That part is a strong baseline, not our proprietary feature.

The proposed extra product capability is controlled original recording, time-aligned replay, audio/transcript/source versions, separate knowledge and delivery diagnostics, ASR/tool-error attribution and a single learning state that routes findings back to reteaching/re-recording/new application.

If an equal-tool Chat Skill/Plugin can lawfully provide the same raw-audio access, timing, state and UX with lower burden, use that form. Do not force standalone software. Current raw host-Voice microphone/audio access for a plugin has not been established; no client-private file extraction. A small owned Web/PWA recorder remains the controlled implementation candidate.

Browser microphone capture is technically plausible with user-granted media APIs in secure contexts; this is a platform capability, not a local runtime receipt or permission to record now.

## Engineering Sequence For The Later Build Package

A. Tutor/source/learning-state skeleton plus natural teach-back transition.
B. In-app microphone capture, original-audio save/replay/timebase and failure recovery.
C. Actual audio observation, ASR/alignment and transcript correction/versioning.
D. Separated content/logic and delivery analysis with source/audio anchors.
E. Feedback -> targeted teaching -> partial/full re-record -> new application -> history/export/delete.
F. Challenge cases, truthful feature matrix, one review bundle and one integrated owner walkthrough.

Required challenge cases include: correct content with pauses; fluent wrong content; omitted condition; self-repair; ASR inversion of a critical negative/number; device interruption; source/rubric revision; corrected text versus genuinely new recording.

Long-term learning efficacy, retention, target demand/payment and distribution follow after a working bounded product. Foundational measurement/calibration cannot be deferred because false feedback is a functional defect.

## Retained Gates

This state authorizes product/engineering design maintenance only. No local development, new branch/commit, microphone use, actual recording or upload, ASR/model/API call, dependency install/service, spending, external user/contact, public hosting, push/merge/release or private-client data access has been authorized by this UX correction.

Do not force old PowerShell/WinForms architecture on this consumer product. End users must not supply developer API keys/Git/Codex. Provider, retention/deletion, cost and region/privacy need an explicit engineering decision when actual implementation is scoped.

## State Summary

Completed: rigid criteria/upload flow removed; Study-first tutor, natural `我来讲讲`, in-product recording and continuous Repair/Re-explain flow integrated into the product contract.
Verified: current Study Mode and browser microphone-recording platform capabilities from official/reference sources; prior P0 evidence only at old scope.
Likely: the revised journey is more natural and product-like than separate scoring setup/upload; not user-tested.
Unknown: actual usability, Mandarin ASR/alignment/diagnosis, plugin raw-audio support, latency/cost, repeat value and learning effect.
Not Done: local product implementation, real audio/model tests, integrated owner use, external study/release.
Must Fix: no default upload path, mandatory criteria-confirm form, test-before-teach UX or accidental scoring of normal Tutor speech.
User Decision Needed: none for normal design; actual development/audio/API/install/spend/deployment gates remain.
Future Optional: realtime conversational voice tutor, PTE/English pronunciation, mobile native app, broad knowledge graph/multi-user learning; inactive.
