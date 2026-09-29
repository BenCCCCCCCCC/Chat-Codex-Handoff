# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: REPLAY-REVIEW-UX-01
task: REPLAY-REVIEW-UX-01
writer: CODEX_ASTRA
transport_only: true
status: NEEDS_HOST_VERIFY
accepted_base_head: bdd0635597006881d6f8f7213122ae53ccbc99a9
final_head: bdd0635597006881d6f8f7213122ae53ccbc99a9

## Result

Implemented and self-reviewed the owner-approved optional transcript replay UX. Changes remain uncommitted, as required when UI browser validation is environment-blocked.

Read remote ACTIVE_EXCHANGE (incoming blob 5c0187f35fdc223b598ce6c85b4eb0811575a9e2), HANDOFF and CURRENT_STATE, then checked product branch/base, root/product entry documentation, recent history, replay/confirmation/localization/storage/export flows and associated regressions.

Branch: prototype/study-teachback-v0.1.
Exactly six modified files; 47 insertions / 29 deletions:
- study-teachback-app/app.mjs
- study-teachback-app/core.mjs
- study-teachback-app/index.html
- study-teachback-app/correctness-boundaries.test.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs

## UX and data treatment

- Removed the content-confirm handler's per-span heard-set gate and the obsolete in-memory heard set.
- With valid ASR available, the explicit button “确认使用当前文字，开始诊断” saves the currently displayed transcript/editor values and requests the existing single content diagnosis.
- Warning remains visible: diagnosis uses current transcript; ASR can mishear negation, numbers, conditions and terms; replay/edit is recommended, per-span playback optional.
- Native full-audio player and optional per-span playback remain. Successful per-span playback says “本次页面已播放 ✓”; this is transient feedback, not a persisted review assertion.
- New transcript versions use origin USER_TRANSCRIPT_CONFIRMATION instead of falsely claiming USER_REPLAY_CORRECTION.
- Existing reviewed boolean is retained for compatibility and explicitly means confirmation of transcript words for diagnosis, not proof of audio playback. No new storage schema, database version or migration.
- Existing raw ASR and audio stay unchanged; explicit user edits remain in a separate transcript version; no fillers are inserted automatically.
- On diagnosis rerender/history reopening, text confirmation remains visible with “这不表示音频已回听”; optional replay labels do not suggest mandatory repeated playback.
- Older saved versions retain their historical origin; they are not rewritten.
- Process confirmation remains separate and still requires that specific event's genuine completed replay, transcript confirmation, valid event identity/timing and non-interrupted capture.
- NOT_HEARD is now worded specifically for process-candidate replay.
- Existing single-request lock, save-before-dispatch, version binding, content/process separation, provider/model/budget/retention constraints remain.

## Verification

Final focused:
node study-teachback-app/run-offline-tests.mjs review replay-review-ux-01
36/36 PASS, 0 failures.
Artifact: artifacts/study-teachback/replay-review-ux-01/review-1790685313027-yGm1hL

Final full Node/offline:
node study-teachback-app/run-offline-tests.mjs node replay-review-ux-01
151/151 PASS, 0 failures.
Artifact: artifacts/study-teachback/replay-review-ux-01/node-1790685313502-evjSJo

Covers zero-playback diagnosis, current edited text in actual request, preserved raw/audio/version identity, one request under delayed double-confirm, failure unlock, honest rerender state, existing native replay coverage and process-event replay gate, provenance/content/process regressions.
Browser suite updated for optional replay, zero-playback diagnosis, optional replay after diagnosis without additional request, honest persisted confirmation on history reload, and process-specific warning. Ancillary environment/replay modes no longer assert the obsolete content gate.

Browser attempt:
node study-teachback-app/run-offline-tests.mjs browser replay-review-ux-01
Artifact: artifacts/study-teachback/replay-review-ux-01/browser-1790685247121-hCKLvV
Browser JSON: browser-1790685247246.json
Environment-blocked before application cases: CDP_TIMEOUT Runtime.enable.
Edge log: repeated GPU process failure / GPU process isn't usable.
Wrapper exit 1, error null; 0 application cases executed; synthetic provider calls=[], network=[], physicalMicrophone=false, liveAPI=false.
This is NOT a browser PASS. No environment workarounds or real product launch attempted.

All three final receipts have 53/53 source hashes matching current worktree.
Browser syntax check and git diff --check PASS.
Final self-review found no additional in-scope blocking issue. No edits after final receipts.

Production ledger before/after all runs and current work:
1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21
Unchanged. This is the post-completed-Phase3B ledger, newer than the previous b305... snapshot.

## Next gate

Owner runs in normal host PowerShell from F:\Chat-Codex-Handoff\validation-repo:
node .\study-teachback-app\run-offline-tests.mjs browser replay-review-ux-01

Expected full suite now has 52 cases (prior 51 plus history-confirmation UX case). Exact outcome must be verified from fresh host receipt/JSON, not assumed.
Before final commit, confirm host pass and source hashes against the unchanged six-file worktree. Any later source/test change requires fresh host validation.

No final commit, product push or merge performed. Unrelated untracked artifacts/hooks/packet left untouched.

## Project observations

Must Fix candidate / already queued documentation cleanup:
Root/product README and historical canonical summaries still imply Phase3 was never executed or live allowance remains. Latest CURRENT_STATE append and current HANDOFF override those stale passages: Tutor 1 + ASR 1 + content diagnosis 1 are all consumed, retries 0. No further live provider calls authorized.

Future Optional:
Historical saved process observations still are not automatically recomputed; this replay UX change does not alter that accepted limitation.

## Boundary and transport

This engineering turn: live provider calls 0, additional ASR 0, real recordings 0, incremental exposure 0. No owner original audio/export uploaded.
Only synthetic isolated test media/stubs were used.
Only this remote ACTIVE_EXCHANGE is updated for transport; CURRENT_STATE/HANDOFF are untouched. Exact readback and sole changed meta path are verified before reporting relay success.
