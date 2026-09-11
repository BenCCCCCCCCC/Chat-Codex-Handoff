# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01 / R3 ENGINEERING READINESS PASS WITH ONE MUST FIX / EXECUTE BUILD-01R4 BEFORE OWNER VALIDATION**

Active product flow remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`.

MASTER reviewed private `prototype/study-teachback-v0.1` at `4e57edfb57495cddd0870029782b987dc7502800`.

The checkpoint is very close to owner validation, but `OWNER-VALIDATION-01` is temporarily gated by one known user-facing feedback-action defect discovered in the retained live Luna evidence.

## Read order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R4_FEEDBACK_ACTION_GATING.md`
4. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — prepared, do not execute until R4 PASS
5. `docs/research/strategy-reset-01/BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md`
6. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`

## What remains accepted

Do not reopen already accepted work unless R4 changes it:
- Node 33/33 and Edge 21/21 at their stated scopes;
- transcript + segment timestamp transport PASS, word timing PARTIAL;
- zero-duration word preserved and never fabricated;
- critical word-timing fallback to segment replay + human confirmation;
- content/delivery schema separation;
- corrected necessary/sufficient-condition verdicts at bounded synthetic scope;
- export/quota/per-attempt-delete/pending-navigation recovery;
- no new Whisper request in R3;
- current budget/ledger boundaries.

## Must Fix evidence

`artifacts/study-teachback/build-01r3/LUNA_LOGIC_REV3.json` retains a `self_repair` result where a `supported` finding has `repair: ". ."`.

Current `study-teachback-app/app.mjs` renders `再学这一点` and `再讲这一点` for every finding and feeds `f.repair` into the next Tutor/re-record focus.

Therefore a correct finding can expose an incoherent remediation action. This is known before owner validation and should be fixed before asking the owner to test the coherent experience.

## BUILD-01R4 execution

Read `BUILD_01R4_FEEDBACK_ACTION_GATING.md` and make only the bounded delta:

1. `supported` findings must not expose targeted remediation buttons.
2. Define the content statuses that may expose `再学这一点` / `再讲这一点` (normally `missing`, `incorrect`, and an actionable `unknown`).
3. For any status that exposes remediation, punctuation-only/empty-equivalent `repair` must fail closed; it must not become Tutor focus or re-record focus.
4. Delivery `observation` remains separate and must not turn into a knowledge-deficit remediation route.
5. Preserve valid targeted repair/re-record behavior for genuine gaps.
6. Add regression using the retained real Luna `supported + repair=". ."` output and malformed actionable-repair cases.
7. Rerun Node + Edge engineering suites.
8. No new Whisper request. No new live Luna call is required merely for this UI/runtime guard. If a live call is genuinely necessary, stop and ask MASTER.
9. Normal fast-forward push sanitized evidence to the same private feature branch.

Do not rewrite or delete the historical live evidence.

## Boundaries

Keep:
- branch `prototype/study-teachback-v0.1`;
- `whisper-1` + `gpt-5.6-luna` only;
- US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling;
- no ledger reset/relabel;
- no provider/model/dependency/local-ASR/VAD change;
- no merge/release/public deploy/force push;
- no owner microphone or external user yet.

## Acceptance after R4

If the bounded fix and regressions pass, MASTER should inspect only:
- feedback-action gating delta;
- regression evidence;
- any changed test counts.

Then the expected next state is:

**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**

At that point owner approval opens `OWNER-VALIDATION-01`.

## State Summary

Completed: R3 engineering build and broad evidence package.

Verified: one known supported-finding remediation defect exists despite correct 7/7 verdict classification.

Not Done: R4 fix/regression; owner walkthrough.

Must Fix: feedback remediation action gating and meaningful actionable repair guard.

User Decision Needed: none for R4.

Future Optional: broader copy-quality calibration after integrated owner validation.

## Minimal Codex Trigger

```text
执行 BUILD-01R4：feedback action gating。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: 4e57edfb57495cddd0870029782b987dc7502800

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/BUILD_01R4_FEEDBACK_ACTION_GATING.md

本轮只修已知 feedback-action defect，不重新发散已接受 R3 范围。

必须：
1. supported finding 不显示“再学这一点 / 再讲这一点”；
2. 只对真正需要 remediation 的 content status 暴露这些动作；
3. actionable finding 的 repair 若为空/等价空/纯标点（例如 `. .`），必须 fail closed，不能作为 Tutor/re-record focus；
4. delivery observation 不得被路由成 knowledge remediation；
5. 用已保留的真实 Luna `supported + repair=". ."` 作为 regression fixture；
6. 保持 valid missing/incorrect/unknown targeted repair 流程；
7. rerun Node + Edge suites并保存 readable evidence。

不要调用新的 Whisper。不要为了这项 fix 自动调用 Luna；如果认为 live call 必须，先停止回报 MASTER。

保持原预算/模型/ledger/Git 边界；完成后 normal fast-forward push 到同一 private feature branch。

最终返回：status、remote branch、exact remote SHA、Node result、Edge result、new paid calls（应为0）。
```
