# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01R REMOTE REVIEWED / PARTIAL ACCEPTED / USER DECISION NEEDED — `whisper-1` HTTP 401 `missing_scope`**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

Private checkpoint sync is working. MASTER directly reviewed remote `prototype/study-teachback-v0.1` at HEAD `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`. No owner manual Delivery Packet/ZIP upload is required for ordinary checkpoint review.

BUILD-01 remains PARTIAL. BUILD-01R completed its auth diagnosis and offline logic correction, then correctly stopped at an owner-controlled OpenAI permission gate. PRODUCT-CORE-01 stays PAUSED; INTERVIEW-DEMO-01 stays SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`
4. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
5. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

## Verified BUILD-01R Result

Remote lineage:
- before `99228bed6aa17b05790083de5ecdd45c4a96c28f`
- after `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`

Same-process auth diagnostic used one captured existing runtime `OPENAI_API_KEY` value, represented only by the same irreversible short fingerprint on both calls:
- Luna Responses: HTTP 200
- Whisper Audio Transcriptions: HTTP 401
- provider error: `invalid_request_error` / `missing_scope` / `param=null`
- provider text explicitly points to insufficient permissions and checking organization/project roles plus restricted API-key scopes.

This is now a verified endpoint authorization/scope blocker. It is not evidence of invalid whole credential, poor Mandarin recognition, bad timestamps, billing shortage, or a model-quality failure. Exact missing scope was deliberately redacted, so the precise UI setting is still Unknown.

## Logic Fix — Accepted at Offline Scope

The shared Tutor/content instruction now states that `只有 A 才 B` gives `B -> A` only and cannot be strengthened into `A -> B`; an explicit ticket example is included.

Offline suite reports 24/24 PASS, including semantic fixture oracles that reject necessary/sufficient strengthening and safe auth-evidence tests. This is accepted as offline engineering evidence only.

The old real Luna 5/5 is still only API/schema/channel-control evidence. A corrected live semantic rerun has NOT occurred because paid calls stopped after the Whisper 401.

## Current User Decision Needed — One Combined Action

The owner should inspect the **existing OpenAI Platform API key/project/organization permission**. Do not send the secret to Chat or Codex.

### UI steps

1. Open the OpenAI Platform and select the intended organization/project used by this build.
2. Go to Project settings -> API Keys.
3. Find the existing key whose local secret is loaded as `OPENAI_API_KEY`; choose Edit permissions.
4. If permissions are `Restricted`, inspect the Audio/transcription endpoint (`POST /v1/audio/transcriptions`) and grant the minimum request/write permission it needs. Preserve the existing Responses access.
5. If audio transcription is already permitted, inspect the principal's project membership and organization role. The provider error specifically says project Member/Owner and organization Reader/Writer/Owner are relevant.
6. If the key is service-account managed or you cannot edit the needed permission, do not create/replace anything yet; report that exact condition.
7. Do not switch blindly to broad All permissions just to make the test green.

OpenAI's current official help says user-owned API keys can be edited as All / Restricted / Read Only; Restricted permissions can grant endpoint/resource-specific None/Read/Write/request scopes. Project API keys are managed from the selected project's settings, and project memberships/roles also constrain access.

### Retry exception

The existing synthetic ASR attempt has exhausted its original two-submission allowance. After the owner confirms the permission/role correction, they must also explicitly authorize **exactly one additional `whisper-1` request for the same 7.31-second synthetic Mandarin fixture**.

This exception only raises that fixture's submission allowance from 2 to 3. It does not reset/release prior reservations, minutes, request counts or ledger history. Existing US$5 API exposure hard stop and US$10 BUILD-01 cash ceiling remain unchanged.

## Resume Procedure After Owner Confirmation

Codex should first perform only the one additional same-fixture Whisper request.

If HTTP 2xx:
- validate actual transcript and word/segment timestamp payload;
- run the corrected bounded Luna semantic challenge;
- resume remaining BUILD-01 C-F work under the existing contract;
- fast-forward push sanitized evidence to the same private branch;
- then prepare one integrated owner walkthrough.

If still HTTP 401/missing_scope:
- stop paid calls immediately;
- preserve request ID and safe provider error fields;
- do not widen permissions/provider/model/dependencies automatically;
- return precise blocker.

## Cost / Ledger

Current reviewed evidence:
- known conservative cost estimate: `US$0.00260690`
- exposure including unsettled reservations: `US$0.04141440 / US$5`
- BUILD-01 max new cash: `US$10`
- no recharge, provider/model switch, new package/model install or ledger reset.

## Standing Private Sync

Codex may normal fast-forward push the explicitly named private feature branch and sanitized review evidence for MASTER-approved bounded work. No force push, remote deletion, merge/default-branch integration, release/public deploy, secrets/`.env`, raw owner/private audio or sensitive material.

## State Summary

Completed: BUILD-01R same-process auth diagnosis; safe provider error capture; private remote sync/review; necessary/sufficient logic correction; 24/24 offline suite.

Verified: Luna 200 + Whisper 401 with same runtime credential fingerprint; provider `missing_scope`; remote lineage/source/evidence; offline logic/safety results at stated scope.

Likely: key endpoint permission or project/organization role is the blocker. Exact configuration is not yet known.

Unknown: exact missing scope/current key permission, successful Mandarin timestamps, corrected live Luna semantic fidelity, remaining integration behavior.

Not Done: owner permission correction; one extra bounded Whisper request; corrected live semantic run; successful speech chain; owner walkthrough; external validation/release.

Must Fix: legitimate audio-transcription authorization; no blind All-permissions/provider/model/dependency workaround; no live-quality claim from offline 24/24.

User Decision Needed: adjust/confirm existing OpenAI Platform permission/role and approve exactly one additional same-fixture Whisper retry under unchanged budget.

Future Optional: local VAD/ASR, gpt-transcribe comparison, broader acoustic/learning validation, realtime Tutor, English/PTE, native/plugin distribution and external learner study.

## Minimal Resume Trigger — only after owner completes the UI permission check

```text
恢复 BUILD-01R。

我已检查/调整现有 OpenAI Platform 项目/API key 的 audio transcription 权限或相关项目/组织角色；未在聊天中分享任何 key。

批准对现有 synthetic-mandarin-build01 fixture 额外进行 exactly one 次 whisper-1 /v1/audio/transcriptions 重试。仅把该 fixture 的 ASR submission allowance 从 2 提高到 3；不得 reset ledger、reservation、minutes 或历史事件。

保持现有边界：
- branch prototype/study-teachback-v0.1
- models only whisper-1 + gpt-5.6-luna
- US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling
- no provider/model switch, no new dependency/local ASR, no auto recharge
- no secret printing/committing

先只跑这一次 Whisper retry。
若 2xx，按 active BUILD-01R/BUILD-01 handoff 继续 timestamp 验证、修正后的 Luna semantic challenge 和剩余 C-F；若仍 401/missing_scope，立即停止并推送脱敏证据，不做其他 paid calls。

完成后正常 fast-forward push sanitized checkpoint 到同一 private feature branch，并返回 exact remote SHA/status。
```
