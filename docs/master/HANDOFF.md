# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01R2 REVIEWED / FIFTH WHISPER HTTP 200 / SEGMENT TIMING USABLE + WORD TIMING PARTIAL / BUILD-01R3 AUTHORIZED**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

MASTER directly reviewed private `prototype/study-teachback-v0.1` at remote HEAD `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`. No manual artifact upload is needed.

## Verified fifth ASR evidence

Exactly one fifth authorized `whisper-1` request ran using the existing 7.31-second synthetic Mandarin fixture and the reviewed credential fingerprint. It returned HTTP 200 and, this time, the diagnostic persisted response fields before normalization.

Saved provider evidence contains:
- transcript `只有土壤乾燥時才給這盆植物澆水,土壤濕潤時不要澆水。`;
- 22 word entries;
- one segment from 0 to `6.460000038146973` seconds;
- word index 14 (`土`) has start=end=`4.579999923706055`.

The current shared `spanValue` requires `end > start` for both segments and words, so this one zero-duration word caused `INVALID_TIME`. No sixth request was made; Luna logic was not run after the stop.

## MASTER decision: do not spend another Whisper request

The preserved response is enough to fix the policy offline.

OpenAI's current transcription API documents word/segment timestamp granularities for `verbose_json` but does not guarantee that each returned word has strictly positive duration. Public OpenAI Whisper discussions document real zero/effectively-zero-duration word timestamps and imperfect alignment-derived word timing. Therefore one zero-duration word is treated as an unreliable word boundary, not as proof that the whole transcript and segment timing are unusable.

This also matches the product architecture: current replay/confirmation UI uses ASR **segment spans**, not individual word entries, as its primary audio evidence path.

## BUILD-01R3 — active engineering contract

Read:
`docs/research/strategy-reset-01/BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md`

No new owner approval is needed because this stays inside the already approved build and requires no new provider/model/dependency/budget/data permission.

### Timestamp policy

**Segments remain strict:** finite, ordered, in range, and `end > start`. Bad segment timing remains a hard failure because segment replay is a current product dependency.

**Words become partial-quality timing evidence:** finite, ordered, in range, and `end >= start`. Preserve provider values exactly.

If a word has `end == start`:
- mark its timing unusable/zero-duration;
- do not widen/interpolate/merge it silently;
- do not use it as a precise word-level audio anchor;
- do not fail the entire transcript/segment result solely because of that one word.

Critical negation/number/condition/term with unusable/missing word timing remains fail-closed: replay and confirm the containing validated segment before dependent negative diagnosis.

After offline implementation against the saved real response, current fixture may be called at most:
**ASR TRANSCRIPT + SEGMENT TIMESTAMP TRANSPORT PASS / WORD TIMESTAMPS PARTIAL / HUMAN REPLAY REVIEW REQUIRED**.

That is not calibrated word-alignment accuracy or speech scoring.

## Execution sequence

Codex should now:
1. verify branch/HEAD/worktree and preserve lineage from `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`;
2. implement separate segment/word validators and visible word-timing quality metadata;
3. add offline tests using the exact saved 22-word/1-segment provider shape plus malformed cases;
4. make **no new Whisper request** for this recovery;
5. run the corrected bounded `gpt-5.6-luna` necessary/sufficient-condition logic challenge;
6. if acceptable at its bounded scope, resume remaining BUILD-01 C-F: critical-ASR handling, supported delivery, export completeness, quota recovery, per-attempt delete, pending navigation and browser/integration engineering checks;
7. prepare one integrated owner microphone walkthrough only after engineering readiness;
8. normal fast-forward push sanitized checkpoint to the same private feature branch.

If a new live Whisper request becomes necessary for a different reason, stop and return a specific User Decision Needed. Do not infer permission for a sixth retry.

## Required timestamp regression

At minimum:
- exact current saved response -> segment PASS / word PARTIAL;
- zero-duration word preserved and flagged;
- reversed word, non-finite word, out-of-range word, backward word ordering -> reject;
- zero-duration/invalid segment -> reject;
- critical term with unusable word timing -> segment replay + user confirmation, no precise word anchor;
- no interpolation/mutation of provider values.

## Logic state

The `只有 A 才 B` fix remains accepted offline: it establishes `B -> A`, not `A -> B`. Corrected live Luna logic fidelity is still Not Done and should now be rerun after timestamp regression.

## Cost / limits

Latest reviewed state:
- known conservative cost: `US$0.00421565`;
- exposure: `US$0.06102315 / US$5`;
- BUILD-01 total new-cash ceiling: `US$10`.

Still approved: local code/commits, private feature-branch fast-forward sync, loopback Node + Edge, explicit product mic for owner validation, low-risk single-speaker data, `whisper-1` + `gpt-5.6-luna`, unchanged budget caps.

Still prohibited without new owner decision: another live ASR request, provider/model/dependency change, `gpt-transcribe`, local ASR/VAD install, ledger reset/relabel, public hosting, merge/release, force push, external users, third-party/sensitive audio, secrets/private-client publication.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md`
4. `docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md`
5. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`
6. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
7. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

## Minimal Codex Trigger

```text
执行 BUILD-01R3 并继续 BUILD-01。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: ef918b4eb9329e424ff90256a9f24fa47ae2abe6

先读取 meta/master-state：CURRENT_STATE.md、HANDOFF.md、BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md，以及原 BUILD-01 contracts。

本轮不要再次调用 Whisper。使用已经保存的第五次真实响应离线修正 timestamp policy：segment 仍要求严格正时长；word 允许 start==end 但必须保留并标为 unusable/zero-duration，不能插值、延长、合并或伪造。异常 word timing 不得单独让整个 transcript/segment result 失败；critical term 落在 unusable word timing 时只能回退到 containing segment replay + user confirmation。

用真实保存的 22 words / 1 segment shape 加 malformed cases 做 regression。通过后运行修正后的 bounded gpt-5.6-luna necessary/sufficient logic challenge；若通过其限定门槛，继续原 BUILD-01 剩余 C-F。普通实现细节无需回来确认。

保持原 provider/model/data/budget：whisper-1 + gpt-5.6-luna，US$5 API exposure / US$10 cash ceiling。禁止新的 Whisper retry、换 provider/model、安装依赖、reset ledger、merge/release/public deploy/force push。

完成或真正触发 retained blocker 后，正常 fast-forward push sanitized checkpoint 到 prototype/study-teachback-v0.1，并返回 exact remote SHA + status。无需 owner 手工上传文件。
```

## State Summary

Completed: fifth Whisper response preserved; ASR transport/auth is 200; exact word timing defect isolated; next handling policy defined.

Verified: real transcript, 22 word entries, one valid segment and one zero-duration word at the reviewed remote checkpoint.

Likely: current MVP can safely use segment-level replay while treating exact word timing as partial evidence.

Unknown: broader word-boundary accuracy, corrected live Luna logic quality, remaining C-F and physical-mic full journey.

Not Done: R3 timestamp regression, corrected Luna live challenge, remaining C-F, integrated owner walkthrough, external validation/release.

Must Fix: separate word-timing degradation from strict segment validity; never fabricate exact word times.

User Decision Needed: none for R3/remaining current BUILD-01. A new decision is required only if another live ASR request or another retained boundary is genuinely necessary.

Future Optional: calibrated word alignment/acoustic analysis, local VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
