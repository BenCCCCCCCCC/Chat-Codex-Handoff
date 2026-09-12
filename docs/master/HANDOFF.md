# Active Handoff — OWNER-VALIDATION-01 PHASE 3

Updated: 2026-09-12
Role: 00 MASTER
Status: **CLEAN PHASE 2 PASS / PHASE 3 MICROPHONE+ASR NEXT**

## Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Branch: `prototype/study-teachback-v0.1`
Current accepted feature HEAD:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

Direct validation server/origin:
`node study-teachback-app/server.mjs`
`http://127.0.0.1:4317`

Read `docs/master/CURRENT_STATE.md` first. Preserve unrelated work; no reset/clean/force.

## Owner-validation status

Phase 1 real owner file import/preview/selection = PASS.

The original Phase 2 topic exposed a provenance bug and is retained as evidence only; do not resume it.

`OWNER-VALIDATION-PROVENANCE-FIX-01` was MASTER-accepted at `f6a000c...` with Node48/48, Edge29/29 and zero paid calls for the correction.

The Owner then performed a **clean Phase 2 rerun** in the real browser using a new topic and the same synthetic DOCX.

Verified from Owner screenshots:
- initial automatic starter no longer appears as a user bubble;
- before owner input, only Tutor/assistant content appears;
- the first visible `你的想法` is the genuine owner-authored question;
- Tutor responses remain grounded in registration/badge/open-state/18:00 constraints without unsupported guarantees.

Decision: **Clean Phase 2 PASS.**

## Phase 3 — owner action

Use the current clean topic.

1. Click `我来讲讲`.
2. For this validation choose `无提示`.
3. Click `开始录音` and allow the browser microphone if prompted.
4. Keep the product tab visible throughout the recording; do not switch/minimize/hide it because visibility interruption is treated conservatively.
5. Speak naturally for roughly 20–45 seconds. Do not read a polished script.
6. Explain in your own words why registration does not guarantee entry and mention the other relevant constraints.
7. If comfortable, include one genuine self-correction to exercise withdrawn-claim handling later. Example shape only: make an overstatement, then explicitly correct yourself. Do not memorize a fixed script.
8. Click `结束讲解`.
9. Wait for original-audio save and ASR processing.
10. When the replay/transcript screen appears, **do not click the diagnosis-confirm button yet**.
11. Play the original recording and inspect the raw transcript and segment/timing state.
12. Return a screenshot and/or the raw transcript to MASTER before confirming diagnosis.

## Phase 3 review criteria

MASTER will check:
- original audio is retained and playable;
- transcript preserves the owner's actual meaning;
- negation, number, condition and term errors are identifiable/correctable;
- segment timing is valid;
- PARTIAL word timing is acceptable and must not be fabricated into precise timing;
- any self-correction remains distinguishable from the final corrected stance;
- no diagnosis should be trusted until the required replay/correction/confirmation step is complete.

If any critical transcript error exists, the owner corrects the text only after replaying the relevant audio; raw transcript must remain preserved as a separate version.

## Live-call boundary

This phase authorizes the already-approved real ASR request (`whisper-1`) as part of the single owner journey. Do not perform retries unless MASTER explicitly approves after evidence review.

No provider/model switch or recharge. Existing US$5 exposure hard stop and US$10 cash ceiling remain.

A fresh safe ledger checkpoint will be requested after the recording/ASR state is visible, before semantic diagnosis if useful.

## Stop conditions

Stop and return to MASTER if:
- microphone permission requires an unsafe/system-policy workaround;
- recording is interrupted unexpectedly and cannot be represented honestly;
- original audio is unavailable or corrupted;
- critical ASR meaning errors cannot be corrected safely;
- source/attempt/raw-corrected identity is lost;
- repeated ASR/provider retry becomes necessary;
- storage/access/budget guard fails;
- diagnosis appears without the required replay/confirmation gate.

## Classification

Completed: readiness, Phase 1, provenance correction, clean Phase 2.
Verified: real-browser provenance correction and source-grounded Learn interaction.
Unknown: physical microphone, real ASR/timing/replay UX and downstream diagnosis.
Not Done: Phase 3 onward, export/history, final acceptance.
Must Fix: none blocking Phase 3.
User Decision Needed: none.
Future Optional: extraction `&#x20;` cleanup; unrelated test-page exception only if reproduced.

## Next Smallest Step

**Owner records one natural 20–45 second explanation, waits for ASR, then returns the replay/transcript screen to MASTER before confirming diagnosis.**
