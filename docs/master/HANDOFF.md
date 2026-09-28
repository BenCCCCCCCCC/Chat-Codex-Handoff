# Active Handoff — DIAGNOSTIC-LOCALIZATION-01 / Batch B

Updated: 2026-09-28 — executable task, not execution receipt
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / NOT STARTED**

## 0. Binding and mandatory preflight

Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`.

Canonical instruction branch: `meta/master-state`.

Read and record the actual immutable canonical commit used:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`

Execution checkout:
`F:\Chat-Codex-Handoff\validation-repo`.

Execution branch:
`prototype/study-teachback-v0.1`.

Expected **local** Batch B base:
`f06900fa9dcffd7768a1ec283715a50f6570832e`.

Important: the remote product branch may still show `f6a000c...` because Batch A was intentionally not pushed. Do not reset/fetch/pull/switch merely to make local match remote.

Before editing:
- report cwd / Git top-level / branch / HEAD;
- report tracked/untracked worktree summary;
- verify HEAD is exactly `f06900fa9dcffd7768a1ec283715a50f6570832e`;
- verify Batch A tracked worktree is clean and unrelated untracked artifacts remain preserved;
- if HEAD differs or there are conflicting tracked changes, STOP and report; do not reset/rebase/amend.

## 1. Goal

**Task ID: DIAGNOSTIC-LOCALIZATION-01 / Batch B / Phase 3A.**

Create a small, explicit evidence architecture that separates:
- what the learner said about the source;
- what was observably present in the explanation process;
- which concept relation/reasoning transition is worth verifying next.

This is a **zero-live-product-API architecture + deterministic fixture validation task**. It is not physical microphone validation, not a new speech-scoring system and not a learning-efficacy test.

## 2. Non-negotiable boundaries

Zero live product/provider calls:
- no real ASR;
- no real Tutor/content diagnosis/process diagnosis;
- no TTS/model-list/access probe;
- no provider fallback/retry.

Use isolated fake/stub providers, synthetic/pre-labelled fixtures and test ledgers only.

Do not:
- modify provider/model configuration or switch away from current production models;
- change retention/storage database schema/origin/budget caps/pricing/ledger history;
- add a new audio ML/VAD/prosody dependency;
- implement pronunciation, pitch/stress grading, emotion/confidence/personality inference or a global speaking/PTE score;
- require exact word timing or hard-code Whisper-specific timing shapes;
- perform broad directory migration/framework rewrite;
- touch owner profile/audio/secrets;
- push/merge/reset/clean/amend;
- automatically start Phase 3B.

Preserve Batch A provenance, recording-registration and entry-document behavior.

## 3. B0 — baseline and isolation

Before feature edits:
- inspect current relevant runtime/test code;
- establish zero-live-call isolation using the existing Batch A test wrapper/guard rather than inventing a second framework;
- run safe applicable baseline tests against local `f06900f...`;
- record exact fresh baseline results and any pre-existing intermittent replay behavior separately;
- do not launch the real owner profile/Start-Study as a shortcut.

B0 PASS requires correct local base/worktree and auditable test isolation.

## 4. B1 — evidence contracts

Introduce or refactor minimal domain contracts for the following three concepts.

### 4.1 contentFindings

Retain source-grounded content/logic semantics:
- supported / missing / incorrect / unknown as applicable;
- source/attempt/transcript identity;
- source quote and transcript span/quote rules already validated by existing content logic;
- final explicitly corrected stance remains authoritative over a withdrawn statement.

Do not weaken existing content validation.

### 4.2 processEvidence

Process evidence is **observable evidence**, not a knowledge verdict.

Minimum contract properties should support:
- stable evidence ID;
- evidence type;
- attempt/transcript identity where relevant;
- real time interval and/or real span reference when available;
- optional literal quote only when it is truly a substring of an existing transcript span;
- provenance/confirmation state sufficient to distinguish pre-labelled fixture, local detector candidate and human-confirmed evidence.

Process evidence MUST NOT require or contain:
- `supported/missing/incorrect/unknown` knowledge status;
- mandatory textbook `sourceQuote`;
- a repair instruction that implies a knowledge deficit;
- confidence/anxiety/personality/accent judgment.

Current confirmed near-silence can be represented as process evidence. Pre-labelled restart/self-repair/repetition/coarse-segmentation fixture evidence may be used to validate the contract/routing, but must not be presented as proof that a production detector exists.

### 4.3 diagnosticTarget

A diagnostic target is a **worth-verifying / worth-re-explaining focus**, not a final diagnosis.

It must:
- identify the concept relation/focus using real content-finding data;
- reference the supporting content finding(s);
- optionally reference related process evidence separately;
- preserve which channel supports which statement;
- never let process evidence alone create a knowledge deficit;
- never fabricate a timestamp for missing content;
- remain actionable with a focused follow-up such as “只重新解释这一关系”.

Avoid opaque numeric scores or invented probabilities.

## 5. B2 — localization rules

Implement a small deterministic localization layer, preferably a pure function/module suitable for direct unit testing.

Required invariants:

1. **Fluent wrong:** an incorrect content finding creates a diagnostic target even when no process evidence exists.
2. **Hesitant correct:** supported content plus pause/restart evidence does NOT create a knowledge-gap target. Process evidence may still be shown separately.
3. **Uncertain/incorrect relation + related process evidence:** the target remains based on the content issue; related process evidence may be attached as corroborating localization context, not proof of ignorance.
4. **Correct explicit self-repair:** final content remains supported; a self-repair process event may be retained, but must not recreate the withdrawn error as an unresolved target.
5. **Critical unreviewed ASR:** downstream content/localization remains blocked until the transcript review requirement is satisfied.
6. **Content gap without process evidence:** missing/incorrect/unknown content still produces the appropriate focused target without an audio timestamp.

For a `missing` finding, `spanId/quote` remain null. Do not attach a process timestamp as “when the missing idea occurred.” A separate neighboring process event may be referenced only as independently observed context.

## 6. B3 — process path and cost discipline

The current process/delivery path is too coupled to content because it requires content-like fields such as a textbook quote/knowledge-shaped output.

Refactor only as much as necessary so a confirmed local process observation can be stored/rendered as process evidence without requiring a content verdict or textbook quote.

Preferred direction for this batch:
- confirmed local near-silence/process evidence should not require a provider semantic call merely to become process evidence;
- keep replay/human confirmation for evidence that currently requires it;
- if removing the process semantic call from the active UI path can be done minimally and safely, test that confirming process evidence adds **zero semantic/provider dispatches**;
- do not remove the content-diagnosis model call or change provider transport/model settings;
- do not perform a broad cleanup of old DELIVERY constants/routes unless required for correctness. Unused legacy code can be recorded as Future Optional rather than expanded scope.

If a minimal local process-evidence path cannot be implemented without protected provider/schema changes beyond this task, STOP with the smallest proposed exception instead of silently widening scope.

## 7. B4 — UI contract

Use two visibly and semantically separate areas:

- **内容理解** — content/logic findings and focused learning action.
- **讲解过程** — observable process evidence with replay/location context.

A process-only observation must not be styled/labeled as a content error.

Where a diagnostic target exists, expose a focused next action such as re-explaining/relearning that relation. Do not redesign the whole app.

Preserve raw/corrected transcript separation and existing replay requirement. This batch does not approve a new skip/adaptive replay policy.

## 8. B5 — required zero-call fixture matrix

At minimum, add deterministic tests for all six cases:

| Fixture | Expected result |
| --- | --- |
| fluent wrong | content target exists; no process evidence required |
| hesitant correct | content remains supported; process evidence separate; no knowledge target |
| uncertain/incorrect relation + related process evidence | one content-based target references process evidence separately |
| explicit correct self-repair | no unresolved knowledge target from withdrawn error; process self-repair may remain |
| critical unreviewed ASR | localization blocked/fails closed |
| content gap without process signal | content target exists; no fabricated audio timestamp |

Fixture labels are oracle inputs for architecture tests, not real detector/model outputs.

Also cover:
- processEvidence rejects knowledge-status/sourceQuote leakage where the contract forbids it;
- invalid event/span/time references fail closed;
- content validation remains unchanged;
- confirming local process evidence does not invoke a live provider and, if B3 local path is adopted, does not invoke the stub semantic process call either;
- two UI areas render independently;
- Batch A provenance/recording-registration regressions remain green.

## 9. Regression and evidence

Reuse Batch A's isolated wrapper/guard. No usable persistent credentials in tests. Block non-loopback outbound traffic. Use fresh run directories and test ledgers.

Run the applicable existing Node/browser suites plus new focused B tests. Report actual commands/counts/exits; historical 79/79 and 40/40 are context, not future results.

The previously observed intermittent native replay timeout is not a B implementation target. If it recurs, report it separately; do not weaken replay assertions or redesign replay to make the suite green.

No real owner microphone test in B.

One focused local commit for B is permitted only after required checks pass. Stage only B files. No push/merge/amend/reset.

## 10. Acceptance matrix

Report B0–B5 as PASS / FAIL / NOT RUN / BLOCKED:

| ID | Acceptance |
| --- | --- |
| B0 | Correct Batch A local base/worktree; isolated zero-live-call baseline |
| B1 | Explicit contentFindings/processEvidence/diagnosticTarget contracts with channel separation |
| B2 | Six localization invariants behave deterministically without process→knowledge inference |
| B3 | Process evidence can exist without textbook quote/knowledge verdict; local confirmed process path does not require an extra semantic provider call if implemented |
| B4 | 内容理解 / 讲解过程 render separately; focused target action does not conflate channels |
| B5 | Fresh focused + applicable regression evidence, complete delta and zero-live-call proof |

## 11. Delivery Packet

Return:
- Task ID and canonical document commit read.
- Repo/branch/base/final local HEAD.
- Exact changed-file list and complete reviewable patch/new files.
- Commands, fresh results and B0–B5 mapping.
- Zero-live-call enforcement/observations.
- Exact fixture definitions and expected/actual outputs.
- Confirmation that process evidence alone never generated a knowledge target.
- Confirmation that missing content received no fabricated spoken timestamp.
- Tests Not Run / Unknown / Blocking / User Decision Needed / Future Optional separately.
- Confirmation: no provider/model/retention/storage schema/cap change, no new dependency, no push/merge, no Phase 3B.

Because no product push is authorized, include reviewable patch/new-file contents in an attachment/response, not only an inaccessible local path.

## 12. Stop conditions

STOP and report if:
- local HEAD is not the accepted Batch A local commit or tracked work conflicts;
- canonical docs cannot be read;
- safe zero-live-call isolation cannot be established;
- a real provider call occurs/is about to occur;
- owner data/credentials could be touched;
- satisfying B requires model/provider switch, storage migration, new audio ML dependency, exact word alignment or broad architecture rewrite;
- content/process separation would require weakening existing source/transcript validation;
- unrelated work would be overwritten.

Return after B even if PASS. Do not start Phase 3B automatically.

## 13. Canonical short trigger

```text
执行 Batch B — DIAGNOSTIC-LOCALIZATION-01 / Phase 3A。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 分支中最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际 canonical commit。执行目录 F:\Chat-Codex-Handoff\validation-repo，分支 prototype/study-teachback-v0.1；先确认本地 HEAD 正好是 Batch A 已接受的本地 commit f06900fa9dcffd7768a1ec283715a50f6570832e，若不匹配或 tracked work 冲突就停下报告，不要 reset/fetch/pull 纠正。

严格按 HANDOFF 的 B0–B5 执行：把 contentFindings、processEvidence、diagnosticTarget 分开；processEvidence 只能是可观察过程证据，不得带知识 verdict 或强制教材 sourceQuote；process evidence 单独存在不能制造“不理解”结论；missing 内容不得伪造音频时间点。实现并验证六个 zero-call fixture，保持“内容理解 / 讲解过程”分区。优先让确认的本地过程证据不需要额外 semantic/provider 调用，但不要改内容诊断模型/provider。

禁止真实产品 API、真实麦克风、模型/provider/retention/数据库 schema/预算上限修改、新音频 ML 依赖、PTE/情绪/人格/口音评分、push/merge、自动进入 Phase 3B。使用 Batch A 已建立的隔离测试框架。完成后返回完整 Delivery Packet、diff/new files、fresh tests、B0–B5 evidence 和所有未验证项，然后停下来交 MASTER 审查。
```

## 14. Classification

Completed:
- Batch A accepted by MASTER from delivered evidence.

Verified:
- Batch A review-bundle integrity and scoped engineering evidence.

Ready:
- Batch B executable specification.

Not Done:
- Batch B dispatch/execution.
- Real microphone/ASR diagnostic-value validation.
- Retention/replay UX work.
- Push/merge/final owner acceptance.

Next smallest step: owner sends the Batch B trigger. Codex executes B only and returns for MASTER review.
