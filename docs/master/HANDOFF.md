# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01 OWNER APPROVED / READY FOR CODEX EXECUTION / NOT YET EXECUTED**

The owner has approved the consolidated BUILD-01 package after MASTER reviewed the actual BUILD-00 PREFLIGHT. Active product stays:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

BUILD-00 is accepted as **PASS WITH TWO BUILD-TIME CORRECTIONS**. PRODUCT-CORE-01 remains PAUSED; INTERVIEW-DEMO-01 remains SUPERSEDED; Gate5 external-user execution remains ON HOLD. Do not run older READY prompts.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — active authorized implementation contract
4. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior evidence

The active BUILD-01 handoff records the exact authorized development/audio/API/data/budget boundaries. No state-branch write is a product push/release.

## Accepted Local Starting Receipt

From the supplied BUILD-00 preflight:
- local repo `F:\Chat-Codex-Handoff\validation-repo`
- branch `prototype/acceptance-evidence-p0`
- HEAD `a1c37af2d68cce8f0574b89b01975e9223f6cea2`
- one worktree; tracked/staged diff empty at inspection
- existing untracked `.codex/hooks.json`, `T09_LIVE_PACKET.txt`, `artifacts/` preserved
- Node 24.19.0; Edge target; selected route needs no npm/Python/ffmpeg/new package installation
- no server/browser/microphone/API/model/install/paid execution occurred in BUILD-00.

Codex must re-verify actual branch/HEAD/worktree before any write. If lineage differs, preserve unexpected work and stop/report rather than reset.

## Owner Approval — Active Scope

The owner's reply **“可以的”** directly followed MASTER's five-item consolidated authorization request and is recorded as approval of all five:
1. bounded local product-code development + local branch/commits; no push/merge/release/public deployment;
2. short-lived loopback Node server, target Edge and explicit in-product microphone use;
3. owner-selected low-risk single-speaker audio/source processing through OpenAI default/global endpoints under the documented retention/cross-border limitations;
4. paid API use limited to `whisper-1` + `gpt-5.6-luna`, no automatic provider/model escalation;
5. US$10 total BUILD-01 new-cash ceiling + US$5 internal API reservation/hard-stop ceiling, no automatic recharge.

Still prohibited without a new owner decision: external-user recruitment/contact, third-party voices, sensitive data, public hosting, product push/merge/release, private Chat/Desktop/client file access, destructive Git actions, new provider/model, new package/model installation, spend above caps or broad scope expansion.

## Mandatory Build-Time Corrections

1. **Semantic model freshness:** use `gpt-5.6-luna` as initial Tutor/semantic candidate, not the PREFLIGHT's GPT-4.1 mini suggestion. Responses API, `store=false`, structured outputs where needed. If quality fails, report failure/partial rather than silently buying a stronger model.
2. **ASR framing:** use `whisper-1` because the product needs word/segment timestamps. Do not describe it as the general newest/best transcription model. No default dual-ASR voting; critical negation/number/condition/term errors fail closed into replay/correction.

## BUILD-01 Product Scope

User: adult Mandarin learner studying a bounded source/concept/rule/process. AI-light is an onboarding constraint, not low knowledge.

Product: Tutor plus formal spoken teach-back in one stateful flow. Increment beyond ordinary Study/Voice is controlled original-audio evidence, time-linked replay, separate raw/corrected transcript, source-bound content/logic vs delivery observations, ASR/tool-error handling, targeted reteaching/re-recording and a separate related Apply task.

v0.1 normal path:
- start/continue a small learning topic/source
- Tutor explains/questions/uses examples; `我来讲讲` always available
- app itself requests mic and records formal attempt
- batch ASR + conservative audio observations
- a few source/audio-linked findings
- replay/correct critical ASR issue
- targeted repair; partial or full new recording
- related new application item
- local history/export/delete.

No default audio upload, realtime duplex Tutor, pronunciation/accent/personality scoring, PTE equivalence, full knowledge graph/curriculum, external user platform or public deployment.

## Engineering Route

Create local branch `prototype/study-teachback-v0.1` only from the accepted starting HEAD if actual state still matches. Product folder: `study-teachback-app/`.

Preferred zero-new-package stack:
- native HTML/CSS/JS
- current Node standard library + native fetch/FormData
- loopback-only server/proxy
- Edge first target
- browser getUserMedia/MediaRecorder/Web Audio/native audio/IndexedDB
- no npm install, Python, ffmpeg, WhisperX, CUDA, extra browser, daemon or public host.

ASR = `whisper-1` timestamp route. Semantic = `gpt-5.6-luna` via `/v1/responses`, `store=false`, structured outputs where needed.

The no-package audio checker may claim only conservative measured facts/candidates such as duration, clipping/quality and near-silence/pause candidates under recorded thresholds. It is not validated VAD, PTE fluency or proof of hesitation. Unsupported cases show `声音证据不足` / PARTIAL. No Silero/local-model installation is implicitly allowed.

Do not copy source from `mattdiep15/feynman` or other public apps unless license is separately verified. Current use is architecture/prior-art reference only.

## Data / Privacy

Only owner-selected low-risk single-speaker test audio/material in BUILD-01. No third-party voices, private meetings, sensitive medical/legal/financial content, browser/Chat/Desktop internals or external learner data.

Local: IndexedDB raw audio/transcript/observations/attempts/feedback, prototype max-7-day cleanup-on-open policy, explicit delete, truthful export boundary, visible quota/storage failure.

Approved cloud route:
- formal attempt audio -> OpenAI `/v1/audio/transcriptions`
- limited selected source/transcript/events -> `/v1/responses`, `store=false`
- no repo/history/private-client bulk upload; no third-party telemetry.

Do not claim Australia-local processing. Preserve documented service-retention/cross-border limitations in user-facing/dev evidence where relevant.

## Cost Gate

Approved:
- **US$10 maximum new cash for BUILD-01 only**
- **US$5 internal API reservation/hard-stop cap**
- no auto recharge
- no auto model/provider escalation
- max 60 formal attempts, <=3 min each
- max 360 reserved ASR billable minutes including retry reservation
- explicit semantic token/request ledger; first cap hit stops paid calls.

US$10 is a ceiling, not a target. Actual use/cost/model/date must be logged. Existing ChatGPT/Codex subscription is not API credit.

## Continuous Build Sequence

Do not return for ordinary micro-decisions:
A. Tutor/source/learning state + natural `我来讲讲` transition
B. in-product capture/original audio/replay/timebase/permission-interruption-quota recovery
C. actual Whisper timestamp path + conservative audio observations + transcript correction/versioning
D. separated content/logic and delivery semantic analysis + schema/span/source/time validation
E. Diagnose -> targeted Tutor Repair -> partial/full re-record -> related Apply -> history/export/delete
F. challenge tests + one review bundle/Delivery Packet -> one integrated owner walkthrough.

Required challenge cases: correct-with-pauses; fluent-wrong; omitted condition/valid paraphrase/self-repair; ASR critical negation-number-term error; silence/noise/clipping; mic denial/device interruption/decode failure; source revision; corrected transcript vs new recordings; missing content without fake timestamp; invalid model references; timeout/retry/budget stop; truthful history/delete/export.

Highest completion claim: **STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**. No learning-effect, retention, market or PTE claim from engineering tests.

## Stop Conditions

Stop and return a concise blocker only if:
- actual repo lineage differs materially from the accepted start;
- approved API credentials/access are unavailable and cannot be established without new credential handling;
- a new dependency/provider/model is genuinely required;
- the US$5 API or US$10 cash ceiling would be exceeded;
- requested data falls outside the approved low-risk single-speaker scope;
- a destructive/public/external action becomes necessary;
- core functionality cannot be implemented without materially expanding scope.

Do not use these as excuses to seek approval for normal implementation details.

## Final Handback

Return exactly one concise Delivery Packet and one whitelist review bundle containing source/diff, environment/runtime receipts, feature matrix, challenge results, actual model/API usage/cost ledger, tested local retention/delete behavior, actual screenshots where safely produced, and Completed / Not Done / Verified / Likely / Unknown plus Must Fix / User Decision Needed / Future Optional.

Do not push/merge/release automatically. External learner efficacy, retention, willingness to pay, plugin-vs-standalone distribution and long-term transfer remain later questions.

## Minimal Trigger

```text
执行 BUILD-01：Study-first + In-app Teach-back v0.1。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected starting branch: prototype/acceptance-evidence-p0
Accepted starting HEAD: a1c37af2d68cce8f0574b89b01975e9223f6cea2

读取 BenCCCCCCCCC/Chat-Codex-Handoff / meta/master-state：
docs/master/CURRENT_STATE.md
docs/master/HANDOFF.md
docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md
docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md

Owner 已批准 BUILD-01 的本地开发、loopback Node + Edge + 产品内麦克风、低风险单人音频/有限材料通过 OpenAI 默认/global API 处理、whisper-1 + gpt-5.6-luna，以及 US$10 总新增现金 / US$5 API reservation hard-stop 上限。

先核对实际 branch/HEAD/worktree；一致则创建本地 prototype/study-teachback-v0.1 并连续执行 A-F。普通实现细节无需回来确认；工程测试随开发进行，最后一次性交付完整可用的 bounded v0.1。

禁止 push/merge/release/public hosting、外部用户/第三方声音/敏感数据、私有 Chat/Desktop/client 文件、破坏性 Git、自动充值、自动换 provider/model、新包/本地模型安装或超预算。若触发 retained stop，准确报告 blocker，不静默替代。

最高状态只可为：STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION。
最终仅返回一个 Delivery Packet + 一个 whitelist review bundle。
```

## State Summary

Completed: BUILD-00 review; current provider/model/data facts refreshed; BUILD-01 contract prepared and owner-approved.
Verified: supplied local preflight evidence at recorded scope + current public docs; no new live product/audio/model result yet.
Likely: zero-new-package bounded Web implementation is feasible; usefulness/reliability not yet proven.
Unknown: actual API credential/access, Mandarin transcript/timestamp quality, conservative audio checker usefulness, actual latency/cost, user learning/reuse.
Not Done: BUILD-01 execution, owner walkthrough, external learner validation or release.
Must Fix: no fake VAD/PTE/hesitation claims, ASR-user blame, fabricated timing, unlicensed source reuse or hidden provider/package escalation.
User Decision Needed: none for ordinary BUILD-01 execution within the approved bundle; only retained stop conditions require a new decision.
Future Optional: local VAD/ASR, `gpt-transcribe` A/B, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
