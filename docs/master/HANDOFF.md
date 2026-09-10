# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01R PARTIAL ACCEPTED / DEDICATED OPENAI PROJECT+KEY CREATED / LOCAL REBIND + ONE EXTRA WHISPER RETRY NEXT**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

MASTER directly reviewed remote `prototype/study-teachback-v0.1` at `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`. BUILD-01R verified same-process Luna 200 + Whisper 401 `missing_scope` on the old runtime credential and accepted the necessary/sufficient-condition fix plus 24/24 offline regression at that stated scope.

## Owner Credential Decision

The old BTL project API key was visibly Restricted: Responses had Write while the current permission editor did not expose a separate Audio Transcriptions control. Owner followed MASTER's isolation recommendation and reports completion of a **dedicated OpenAI API Project + dedicated product key**. No key value has been shared with Chat or committed.

Use this new dedicated credential for BUILD-01 only through the existing server-side `OPENAI_API_KEY` environment-variable path. Do not place the secret in prompts, source code, committed `.env`, screenshots, logs or review evidence.

## Local Rebind Procedure

Recommended Windows path avoids putting the secret in terminal command history:
1. Windows search: `编辑账户的环境变量` / `Edit environment variables for your account`.
2. Under **User variables**, create or edit `OPENAI_API_KEY` and paste the new dedicated-project secret there.
3. Confirm/close the dialogs.
4. Fully close and reopen the process that launches Codex/runtime (and any terminal that will run the app) so it inherits the new value.
5. Do not run `echo OPENAI_API_KEY`, do not print the value, and do not paste it into this chat.

Before paid execution, Codex may compute only a non-reversible short fingerprint. The prior old-key fingerprint was `21c4bf00e422`; if the runtime fingerprint is still identical, stop because the old credential is still active. A different fingerprint only proves the runtime value changed, not that the new endpoint permission works.

## One Extra Retry — Explicit Owner Authorization Still Needed

The existing synthetic Whisper attempt already consumed its original two-submission allowance. After the local rebind, owner should send the resume trigger below. Sending it is the explicit approval for **exactly one additional** `whisper-1` request on the same 7.31-second synthetic fixture. Do not reset or relabel the attempt/ledger.

If Whisper returns 2xx:
- validate actual Mandarin transcript + word/segment timestamps;
- run the corrected bounded Luna semantic challenge;
- resume remaining BUILD-01 C-F under the existing contract;
- fast-forward push sanitized review evidence to the same private feature branch.

If Whisper still returns 401/missing_scope:
- stop paid calls immediately;
- preserve request ID + sanitized safe error evidence;
- no provider/model/dependency fallback or permission widening by automation.

## Existing Boundaries

- branch: `prototype/study-teachback-v0.1`
- models only: `whisper-1` + `gpt-5.6-luna`
- total BUILD-01 new cash <= US$10
- API exposure/reservation hard stop <= US$5
- current reviewed exposure: US$0.04141440
- no auto recharge, provider/model escalation, ledger reset, npm/Python/ffmpeg/WhisperX/Silero/local model install
- no public hosting, merge/release, force push, external users, third-party/sensitive recordings, or secret/private-client data publication
- normal fast-forward private checkpoint push remains standing-approved.

## Minimal Resume Trigger

```text
恢复 BUILD-01R / BUILD-01。

Owner 已创建新的 dedicated OpenAI API Project + dedicated product API key，并已在本机把新 secret 绑定到 server-side OPENAI_API_KEY；没有在聊天、源码或 GitHub 中共享 secret。

批准对现有 7.31 秒 synthetic-mandarin-build01 fixture 进行 exactly one 次额外 whisper-1 /v1/audio/transcriptions 重试。只把该 fixture 的 ASR submission allowance 从 2 提高到 3；不得 reset / release / relabel 既有 ledger、reservation、minutes、attempt 或历史事件。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: 97dddd8154b9a0ba340e8c11fc1b0f7db309e879

先读取 meta/master-state 的 CURRENT_STATE.md、HANDOFF.md、BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md 和原 BUILD_01_STUDY_TEACHBACK_HANDOFF.md。

执行顺序：
1. 先核对 branch/HEAD/worktree，保留当前 lineage。
2. 在任何付费调用前，只计算当前 runtime OPENAI_API_KEY 的不可逆短 fingerprint；不得打印/保存 key。若 fingerprint 仍等于旧值 21c4bf00e422，立即停止并返回 OLD_CREDENTIAL_STILL_ACTIVE。
3. 若 fingerprint 已变化，只先执行这一笔额外 Whisper synthetic retry。
4. 若 HTTP 2xx：验证 transcript + word/segment timestamps，然后运行修正后的 bounded Luna logic challenge，并继续 active BUILD-01 剩余 C-F。
5. 若仍 401/missing_scope：立即停止所有 paid calls，保存 x-request-id 与 sanitized error type/code/param/message，不继续 Luna、不换 provider/model、不安装依赖。
6. 保持原预算：US$5 API exposure hard stop / US$10 BUILD-01 new-cash ceiling；不重置账本。
7. 完成或再次阻塞后，正常 fast-forward push sanitized checkpoint 到 private prototype/study-teachback-v0.1；不 merge/release/public deploy/force push。

最终返回 exact remote SHA + status。无需让 owner 手工上传 review 文件。
```

## State Summary

Completed: dedicated project/key created by owner; remote BUILD-01R reviewed; old-key missing_scope diagnosis and logic fix accepted at evidence scope.

Verified: current remote code/evidence; old credential same-process Luna 200 + Whisper 401 missing_scope; 24/24 offline regression.

Likely: dedicated project key should remove the old restricted-key endpoint-scope issue, but not verified until the retry succeeds.

Unknown: whether new key is already inherited by the runtime; successful ASR/timestamps; corrected live semantic fidelity; remaining C-F.

Not Done: new credential runtime verification, one additional Whisper retry, live semantic rerun, end-to-end speech PASS, owner walkthrough, external validation/release.

Must Fix: no secret leakage; no ledger reset; no silent fallback; offline test success cannot be relabelled live quality.

User Decision Needed: explicit one-retry authorization is satisfied when the owner sends the resume trigger after local rebinding.

Future Optional: local/calibrated VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
