# Active Handoff — PHASE3B-LIVE-01 Proposal

Updated: 2026-09-28
Role: 00 MASTER
Status: **OWNER-AUTHORIZED / L0 PASS / MATERIAL RECOVERED / READY TO RESUME L1**

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

## 1.1 Canonical synthetic source for L1

The exact synthetic source is embedded here so Codex does not need a local file path, old browser topic, or invented substitute.

Source provenance: owner's Library file `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`. It is synthetic validation material, not private course content.

Use the following text as the clean-topic learning source:

```text
实验室访客入场规则
（OWNER-VALIDATION-01 测试材料）

本文件为合成测试材料，仅用于验证本地文档提取、预览、选段与学习流程。

一、访客入场规则

• 只有已经完成注册的访客才有资格申请进入实验室。
• 实际进入实验室前，访客还必须佩戴当天发放的访客证。
• 完成注册并不意味着访客一定可以进入实验室。
• 如果当天实验室关闭，即使访客已经完成注册并佩戴当天访客证，也不能进入实验室。
• 访客证只在发放当天有效，次日不能继续使用。
• 每天 18:00 后停止访客入场。

理解提示：“完成注册”是申请进入实验室所需的条件之一，但它本身并不能单独保证最终可以进入；开放状态、当天访客证和入场时间仍然会影响结果。

二、条件核对表

已完成注册：不足以单独保证进入。只是必要条件之一；仍需满足当天访客证、开放状态和时间限制。

佩戴当天访客证：不足以单独保证进入。仍然不能绕过实验室关闭状态或 18:00 后停止入场的限制。

实验室关闭：这是阻止进入的状态；即使其他条件已经满足，此时仍不得进入。

三、学习后解释问题

学习后，请用自己的话解释：为什么“完成注册”不等于“一定可以进入实验室”？

说明：回答时可以结合“当天访客证”“实验室是否开放”和“18:00 后停止入场”等条件，但不要照读原文。
```

The table content above is normalized into sentences only to remove DOCX extraction line wrapping; its meaning and conditions are unchanged.

Do not:
- search the local disk for another copy;
- inspect old browser topics;
- substitute a different laboratory rule set;
- add facts not present in this source.

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

## 8. Canonical resume trigger

\`\`\`text
继续已获 owner 授权的 PHASE3B-LIVE-01，从 L1 恢复。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录 actual canonical commit。

上一次 L0 已 PASS，且 0 provider calls / 0 recording / US$0 exposure。先只做快速身份与 ledger-drift sanity check：执行目录 F:\Chat-Codex-Handoff\validation-repo，branch prototype/study-teachback-v0.1，accepted HEAD 必须仍为 dd8317b43100b8cbaad684cab7fc02957e32de62，tracked clean，ledger lock absent。若身份/ledger 出现异常漂移就停下；不要重新做旧 topic 检查。

L1 材料已经由 MASTER 找回并完整嵌入最新 HANDOFF 的 “Canonical synthetic source for L1”。直接使用该正文新建 clean topic；不要再向 owner 要文件路径，不要搜本地旧副本，不要检查旧 topic，也不要编造替代材料。

Owner 原授权不变：maximum 3 provider calls total、zero retries、incremental local exposure <= US$0.03432。正常 fresh-topic 入口确认会需要一次 Tutor，因此在授权内最多允许：
- at most 1 initial Tutor/Learn semantic call；
- exactly 1 ASR；
- exactly 1 content-diagnosis semantic call；
- 0 Repair/Apply；
- 0 retry。

按 HANDOFF L1–L5 执行。新建 clean topic 后如 UI 正常路径需要 Tutor，允许一次；失败立即停，不重试。随后让 owner 只录一次 20–45 秒自然中文、无提示，保存 original audio，仅提交 1 次 ASR。

ASR 后必须先停在 replay/transcript checkpoint，让 owner 回听并核对 raw ASR 的否定词、数字、条件和术语。只能修 ASR 听错，保留 raw/corrected；不能把 owner 实际说错的内容改正确。若关键不确定性未解决，就停止交 MASTER，不得 diagnosis。

只有 transcript 可用后才允许 exactly 1 次 gpt-5.6-luna content diagnosis。process evidence 必须保持本地零 semantic dispatch。检查 内容理解 / 讲解过程 / diagnostic target，不得由 process-only signal 制造知识错误结论。禁止 Repair/Apply 和第二次录音。

最后返回实际 provider calls、ledger before/after SHA/summary、incremental exposure、original audio 保存状态、raw/corrected transcript、关键 ASR error/correction、content findings、process evidence、diagnostic target、owner usefulness/replay burden/false inference 判断及 Unknown/Blocking/Future Optional。然后停止交 MASTER，不得自动继续。
\`\`\`

## 9. Classification

Authorized:
- one bounded PHASE3B-LIVE-01 execution under the recorded 3-call / zero-retry / US$0.03432 incremental exposure ceiling.

Not Authorized:
- second recording, retry, Repair/Apply provider calls, model migration, broader spend, push/merge, or any automatic continuation after this experiment.

Next step:
send the canonical execution trigger to Codex and execute only this bounded live experiment.
