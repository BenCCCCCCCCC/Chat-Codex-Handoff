# Active Handoff — PHASE3B-LIVE-01 OWNER MANUAL PROTOCOL

Updated: 2026-09-29
Role: 00 MASTER
Status: OWNER ACTION / AUTHORIZED LIVE BUDGET / STOP BEFORE DIAGNOSIS

## 1. Binding

Repo: F:\Chat-Codex-Handoff\validation-repo
Branch: prototype/study-teachback-v0.1
Accepted HEAD: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

Run browser/microphone work outside Codex sandbox.

Authorization:
- maximum 3 provider calls total
- zero retries
- incremental local exposure <= US$0.03432
- one recording maximum

At this first checkpoint use at most:
- one Tutor/Learn semantic call if normal fresh-topic flow requires it
- exactly one ASR call
- zero content-diagnosis calls

## 2. Exact synthetic test source

Paste/use exactly this text for the new clean topic:

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

## 3. Owner steps

Step A — Start server
Normal PowerShell:
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs
Keep the server window open.

Step B — Open isolated Edge
Use the already validated fresh isolated Edge profile outside Codex sandbox and open http://127.0.0.1:4317.

Step C — Clean topic
Use the direct-paste source entry. Paste the exact source above. Create a new clean topic. Do not open or reuse an old topic.
Use the normal Start/Learn action once. If this triggers Tutor, that is the one allowed Tutor semantic call.
Do not ask extra Tutor follow-up questions in this experiment.

Step D — Check Tutor meaning
Read the Tutor result normally. It should preserve: registration alone is not sufficient; same-day badge matters; lab open/closed state matters; after 18:00 visitors cannot enter.
If Tutor contradicts the source, STOP.

Step E — Teach-back
Choose the recording / teach-back action and choose no prompt assistance.
Prompt: 请用自己的话解释：为什么完成注册不等于一定可以进入实验室？
Speak naturally for about 20–45 seconds.
Do not read the source word-for-word and do not use a prepared script.
Natural hesitation or genuine self-correction is allowed.

Step F — ASR
Finish the recording normally. Allow exactly one ASR submission. No retry.
If ASR/provider/audio/ledger fails, STOP.

Step G — Replay/transcript check
After ASR, do not start diagnosis.
Replay the saved audio and compare raw ASR against what you actually said.
Check especially: negation words, 18:00, same-day visitor badge, lab open/closed condition, necessary vs sufficient meaning.
If ASR misheard something, edit only the transcription error.
Do not change something you genuinely said incorrectly.
Preserve raw and corrected versions.

Step H — Mandatory STOP
Do not click content diagnosis / confirm diagnosis yet.
Return to MASTER with: raw transcript; corrected transcript or 'no correction needed'; original audio saved yes/no; replay completed normally yes/no; any critical ASR uncertainty; screenshot if useful.

Expected calls at this checkpoint:
- Tutor: 0 or 1
- ASR: exactly 1
- Diagnosis: 0

## 4. Stop rules

Stop with no retry for Tutor/provider failure, ASR/provider failure, missing/corrupt original audio, replay failure, critical transcript uncertainty, unexpected extra provider call, ledger/budget error, or source/attempt/version identity problem.
Do not Repair/Apply. Do not make a second recording. Do not click diagnosis before MASTER review.