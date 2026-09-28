# Active Handoff — PHASE3B-LIVE-01 Proposal

Updated: 2026-09-28
Role: 00 MASTER
Status: **OWNER-AUTHORIZED / READY TO EXECUTE / NOT STARTED**

## 0. Binding

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Accepted HEAD:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Canonical authority:
`meta/master-state/docs/master/CURRENT_STATE.md`
and
`meta/master-state/docs/master/HANDOFF.md`.

Owner authorization has been explicitly recorded: maximum 3 provider calls, zero retries, incremental local exposure ceiling US$0.03432. Execute only within this bounded protocol.

## 1. Experiment purpose

One real owner recording is intended to answer only:
- whether real capture/original-audio/ASR/replay works;
- whether critical Mandarin transcript meaning survives or can be safely corrected;
- whether local speech-process evidence co-locates with a useful reasoning transition;
- whether combined content + process localization is useful to the owner;
- whether replay burden is tolerable.

It does not prove learning efficacy or market demand.

## 2. Authorized scope if owner says yes

Source:
use a **new clean topic** with the same bounded synthetic laboratory-visitor-rules material. Do not inspect/recover the old expirable topic.

Owner speech:
- one 20–45 second natural Mandarin explanation;
- no prompt assistance;
- explain why registration is not sufficient for entry and include relevant additional conditions;
- natural self-correction allowed.

Provider-call ceiling:
- exactly one ASR submission;
- exactly one content-diagnosis semantic request after transcript review;
- at most one initial Tutor/Learn semantic request **only if normal fresh-topic UI requires it to reach recording**;
- zero Repair/Apply calls;
- zero automatic retries.

Total maximum provider calls = **3**.
Minimum expected provider calls = **2**.

## 3. Cost boundary

One ASR reservation under current ledger = US$0.018 exposure.

One maximum semantic reservation = US$0.00816.

Therefore:
- ASR + diagnosis <= US$0.02616 incremental local exposure;
- ASR + optional Tutor + diagnosis <= **US$0.03432** incremental local exposure.

No retry is authorized.

The current official `whisper-1` list price is US$0.006/minute; `gpt-5.6-luna` standard prices are US$0.20/M input, US$1.20/M output and US$0.25/M cache-write input. A conservative provider-billing estimate for one full ASR minute plus two max-sized semantic requests is <= ~US$0.02232, excluding account-specific billing effects.

Cost estimate is not account balance.

## 4. Model decision for this experiment

Keep `whisper-1` for this single experiment because the validated application currently requires word/segment timestamps and current OpenAI guidance still directs timestamp-dependent file transcription to `whisper-1`.

Do not interpret this as long-term approval. `whisper-1` is deprecated and scheduled for removal on 2027-02-26. After Phase 3B, perform a separate migration/timing decision before long-term/public use.

Keep `gpt-5.6-luna` for semantic requests; no model change is needed for this bounded experiment.

## 5. Execution checkpoints if authorized

### L0 — pre-live identity
Confirm:
- HEAD = `dd8317b...`;
- tracked clean;
- ledger lock absent;
- ledger SHA/exposure still consistent with the preflight or report any harmless drift before provider use.

No old-topic inspection.

### L1 — clean topic / optional Tutor
Create a new clean topic from the same synthetic source.

Source import/paste is local.

If and only if the normal UI requires Tutor/Learn to reach recording, allow **one** Tutor semantic request. Otherwise skip it.

If this request fails: STOP. No retry.

### L2 — one physical recording + ASR
Use `无提示`.

Record one natural 20–45 second Mandarin explanation.

Preserve original audio.

Submit exactly **one** ASR request.

If ASR/provider/ledger fails: STOP. No retry.

### L3 — mandatory replay/transcript checkpoint
Before any content diagnosis:
- replay the saved audio through the validated replay path;
- compare audio with raw ASR transcript;
- inspect critical negations, numbers, conditions and domain terms;
- correct only ASR mishearing;
- preserve raw and corrected transcript versions;
- do not turn a genuine spoken mistake into a corrected performance.

If critical transcript uncertainty remains, STOP and return checkpoint evidence to MASTER before diagnosis.

### L4 — one content diagnosis
If transcript review is acceptable, allow exactly one `gpt-5.6-luna` content-diagnosis request.

Local process evidence confirmation remains zero semantic/provider dispatch.

Inspect:
- 内容理解;
- 讲解过程;
- diagnostic target / focused next action;
- whether process evidence is genuinely useful vs decorative;
- whether any process-only signal creates a false knowledge judgment.

No Repair/Apply provider call.

### L5 — return evidence and stop
Return:
- provider calls actually made;
- ledger before/after SHA/summary;
- original-audio save status;
- raw/corrected transcript checkpoint;
- critical ASR errors/corrections;
- content findings;
- process evidence;
- diagnostic target;
- owner judgment: useful / not useful / mixed and why;
- replay burden/friction;
- any false inference;
- Unknown / Blocking / Future Optional.

Do not continue into a second recording.

## 6. Stop rules

STOP with no retry for:
- provider 401/403/404/model-access failure;
- provider/network failure;
- ASR unusable transcript;
- missing/corrupt original audio;
- replay cannot complete;
- source/attempt/version identity loss;
- unexpected extra provider dispatch;
- ledger/budget error;
- app requests a Repair/Apply or second ASR;
- old owner-data risk.

## 7. Explicit authorization — SATISFIED

Owner authorization recorded on 2026-09-28:

`Authorize PHASE3B-LIVE-01 under the 3-call maximum, zero-retry, US$0.03432 local-exposure limit.`

This does not authorize any call outside sections 2–6, any retry, second recording, Repair/Apply, model migration, push/merge, or continuation after stop conditions.

## 8. Canonical execution trigger

```text
执行已获 owner 授权的 PHASE3B-LIVE-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。

执行目录 F:\Chat-Codex-Handoff\validation-repo，分支 prototype/study-teachback-v0.1；accepted HEAD 必须是 dd8317b43100b8cbaad684cab7fc02957e32de62，tracked worktree 必须 clean。若不匹配立即停下，不要 fetch/pull/reset/rebase 修正。

Owner 已明确授权边界：最多 3 次 provider calls、零重试、增量 local exposure 上限 US$0.03432。严格执行 HANDOFF L0–L5 和 stop rules，只做一次 20–45 秒真实中文录音。使用新 clean topic 和同一 bounded synthetic laboratory-visitor-rules source；不要检查旧 topic 是否还存在。

调用上限：
- exactly 1 次 ASR；
- exactly 1 次 content-diagnosis semantic request；
- at most 1 次初始 Tutor/Learn semantic request，仅当 fresh-topic 正常 UI 确实需要；
- 0 Repair/Apply；
- 0 retry；
- maximum 3 provider calls total。

先做 L0 身份/ledger 检查。L1 新建 clean topic；若 UI 不需要 Tutor 就不要调用。L2 由 owner 自然录制一次 20–45 秒中文，无提示，保存 original audio，仅提交 1 次 ASR。任何 provider/network/ledger/音频错误都立即停止，不重试。

L3 必须先停在 replay/transcript checkpoint：让 owner 回听保存音频，对照 raw ASR，重点核对否定词、数字、条件、术语；只能修正 ASR 听错，保留 raw/corrected，不能把 owner 真正说错的内容改成正确答案。若仍有关键不确定性，停止并把 checkpoint 交 MASTER，不得进入 diagnosis。

只有 transcript 可用后，L4 才允许 exactly 1 次 gpt-5.6-luna content diagnosis。process evidence 保持本地、零 semantic dispatch。检查“内容理解 / 讲解过程 / diagnostic target”，不得让 process-only signal 产生知识错误结论。不要 Repair/Apply，不要第二次录音。

L5 返回完整证据：实际 provider call 数、ledger before/after SHA/summary、original audio 保存状态、raw/corrected transcript、关键 ASR 错误、content findings、process evidence、diagnostic target、owner 对 usefulness/replay burden/false inference 的判断、Unknown/Blocking/Future Optional。然后停止交 MASTER；禁止自动继续。
```

## 9. Classification

Authorized:
- one bounded PHASE3B-LIVE-01 execution under the recorded 3-call / zero-retry / US$0.03432 incremental exposure ceiling.

Not Authorized:
- second recording, retry, Repair/Apply provider calls, model migration, broader spend, push/merge, or any automatic continuation after this experiment.

Next step:
send the canonical execution trigger to Codex and execute only this bounded live experiment.
