# Active Handoff

Updated: 2026-09-10
Role: 00 MASTER

## Active Task

**PRODUCT-CORE-01 — AI 原型验收助手：本地功能闭环 v0.1**

READY FOR CODEX / AUTHORIZED UNDER OWNER'S PRODUCT-FIRST DIRECTION / NOT STARTED BY MASTER.

The owner explicitly says it is too early for interview-demo packaging: define concrete product features/value, complete the product workflow and then request concentrated testing. Ordinary product and implementation choices are delegated to MASTER.

This task REPLACES INTERVIEW-DEMO-01. Do not execute both. Do not write interview scripts, add a marketing site, do another broad research pass or stop at a preloaded report viewer.

## Start / Read Order

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Expected branch: `prototype/acceptance-evidence-p0`
Last reviewed/reported HEAD: `a1c37af2d68cce8f0574b89b01975e9223f6cea2`

Read from `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:

1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. **`docs/research/strategy-reset-01/PRODUCT_CORE_01_SPEC.md` v1.0**

The third file is the full feature, value, error-state, architecture, scope and acceptance contract. Read old research only for an actual ambiguity. Prefer existing authorized GitHub access; a narrow fetch of the state ref is allowed if needed, but do not checkout/merge/cherry-pick it into the product.

Verify actual repo/branch/HEAD/worktree. There is no receipt of INTERVIEW-DEMO-01 execution; do not invent one. If any prior work already exists, preserve and explain it; do not delete/reset or duplicate it. Unexplained incompatible state is a stop condition. Prefer continuing on the same local branch.

## Deliver A Usable Product Slice, Not A Scripted Demo

User flow:

`new task -> requirements/criteria -> explicit approval -> bounded Codex request -> structured file receipt -> evidence-backed criterion review -> selected correction -> second run comparison -> saved owner decision/archive`

A user must be able to create their own new task, not only play a prepared example. Close/reopen must preserve drafts, approved criteria, runs and decisions correctly.

Complete all eight linked capabilities:

- F01 workspace/tasks and actual local persistence;
- F02 original requirement preservation, editable/AI-proposed criteria and approved revisions;
- F03 readable + structured work orders for existing Codex, honest pending/running/failed states;
- F04 completed-response inbox, safe intake, P0 snapshots and evidence/target-version association;
- F05 plain-Chinese criterion suggestions with directly accessible evidence, source and uncertainty;
- F06 selected-only repair/proof requests with no unrequested scope;
- F07 same-task second-round comparison without automatic inheritance of old PASS;
- F08 separate explicit owner decisions/limits, history and one export package.

Five UI surfaces can share one native window: workspace, requirements, delivery/review, correction/recheck, decision/history.

## Implementation Boundary

Default: already available Windows PowerShell 5.1 + Windows Forms/.NET + local JSON. This provides actual file I/O and save/reopen without installing a runtime or starting a server. This is new `acceptance-app/`, not a rewrite of the old handoff GUI.

- Maximum 14 new application/test/necessary-documentation files under acceptance-app; use fewer when sensible.
- At most 4 meaningful local commits; explicitly stage intended paths, no git add . or amend/reset.
- Persistent data: `artifacts/acceptance-app/workspaces/<id>/` in the F-drive repo.
- New build/test/review evidence: `artifacts/product-core-01/<unique-run>/`.
- Read old R0/P0 artifacts directly; do not ask owner to reupload.
- Preserve handoff-kit, original launcher, Hook, real binding/packet and historical artifacts.

Reuse P0 public APIs. Only the minimal backward-compatible adaptations explicitly listed in section 5 of the spec are approved in P0 module/tests/README: real workspace-task mode, correct run/source context and minimal integration fields. Old validation/Unknown/synthetic/version and no-auto-owner-approval behavior must remain; no new validation engine in the GUI. A broader core rewrite still stops.

New image viewing is a bounded attachment surface; PNG/JPEG bytes require safe copy/hash/size/dimension controls. P0 receives a truthful descriptor if required, not an assertion that the image or workflow was verified. No SVG/HTML/remote embeds.

## AI / Automation Truthfulness

This version uses the existing Codex conversation as the actual executor/reviewer through structured request/response files. The user initiates Codex once with the generated short trigger. The open application consumes completed receipts from its explicit per-request inbox, not from hidden Chat history or final-message clipboard.

The app does NOT automatically launch a model, API or existing Desktop Chat. No false 'AI working' animation or claim of dispatch from merely generating a file. No response means waiting; malformed/old/partial response is not task completion.

The current executing Codex session may actually produce sourced requirement/review responses to app-generated requests. Record prompt/input hash/output/source and known metadata, no private-client reads. Same-session/self-review is not independent benchmarking. No additional codex exec/API/subagent/model process.

Models propose semantics; rules validate references/provenance/versions; humans decide. Original P0 report remains PENDING; new owner decisions are separate local attributed records. Unknown/mismatch cannot silently become satisfied or a full approval. Limited acceptance keeps warnings and a reason.

## Do Not Fragment Owner Gates

Proceed through internal batches A–E in the spec without asking owner to approve ordinary labels, controls, file layouts or each small component.

Finish the defined functionality before asking for an integrated owner walkthrough. This does not mean skipping engineering tests: test each implemented dependency and complete end-to-end checks before delivery. If safe environment permissions prevent essential work, stop with precise PARTIAL/BLOCKED rather than claim completion or seek workarounds.

Allowed testing: this application's own windows/processes and isolated task data; deterministic lifecycle/readiness/cleanup, not broad process enumeration. No real Chat/browser profile/clipboard operations, new tool installation or global configuration. No legacy-test reruns just to inflate counts; test P0 regression when adapting P0.

Use synthetic fixtures for engineering edge cases and supported existing material for input integration. Label modes; no invented real users, timing savings, actual browser executions or business results. No fake screenshots.

## Must Return One Complete Delivery

- Branch, before/after full HEAD and local commits.
- Exact source scope, diff and P0 compatibility explanation.
- F01–F08 matrix: implemented, actually self-tested, not verified or blocked.
- Actual test commands/counts/exit, evidence paths and owned-process cleanup.
- New-task save/reopen, requirement revision, inbox, review, narrow correction, two-run comparison and decision persistence evidence.
- Actual screenshots of the owned UI if safely captured; untested DPI/visual states explicit.
- One minimal redacted whitelist review ZIP with index/SHA256, usable entry, sources/diff, receipts and short usage instructions.
- Completed / Not Done / Verified / Likely / Unknown.
- Must Fix / User Decision Needed / Future Optional.

Highest status:

`PRODUCT CORE v0.1 IMPLEMENTED / SELF-TESTED / READY FOR INTEGRATED OWNER VALIDATION`

Missing core flows => PARTIAL/BLOCKED. Do not use a preloaded successful sample as proof new tasks work. Engineering completion is not market/AI-quality/user-benefit PASS.

## Retained Stop Boundaries

No paid use, extra model/API, installation/new runtime/service/network server, elevation/global settings, private client/auth/history reads, destructive unrelated changes, external contact/data sharing, product push/merge/release, auto paste/send, browser extension/tab control or complete commercial platform.

No new interview-preparation task or larger product stage follows automatically. After one integrated delivery, MASTER reviews one package and then requests one consolidated owner journey.

## Minimal Codex Trigger

```text
改为执行 PRODUCT-CORE-01 v1.0；暂停并替代 INTERVIEW-DEMO-01。
Repo: F:\Chat-Codex-Handoff\validation-repo
Branch: prototype/acceptance-evidence-p0
Last reviewed HEAD: a1c37af2d68cce8f0574b89b01975e9223f6cea2
先读 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state：
docs/master/CURRENT_STATE.md
docs/master/HANDOFF.md
docs/research/strategy-reset-01/PRODUCT_CORE_01_SPEC.md
按完整规格连续完成F01–F08，从空白任务到保存决定/二轮复验；不要只做预置演示、写面试稿或返回计划。
普通实现自行决定，工程自测随实现进行，完成功能后再集中交用户验收。复用P0，兼容修改仅限规格授权范围。
保留旧工程与未跟踪材料；不额外模型/API/安装/服务/真实Chat或clipboard操作，不push/merge/付费/发布。
最终只交一份完整Delivery Packet和单个review bundle。真正权限/风险/范围阻断则准确报告PARTIAL/BLOCKED。
```

## State Summary

Completed: latest direction applied; concrete feature/value/flow/error requirements; implementation scope; superseded demo task; executable handoff.
Verified: prior P0 evidence and user's present direction; no new local execution.
Likely: a persistent requirement-to-decision flow may be more useful than a report viewer; needs usage evidence.
Unknown: product-core implementation and net value, independent model quality, target adoption/payment.
Not Done: this build, integrated owner validation, strong runtime comparison, external research execution and commercial release.
Must Fix: no newly alleged legacy bug; avoid fake functionality/status/AI or false saved approvals.
User Decision Needed: none for ordinary work in this scoped build; genuine retained gates remain.
Future Optional: interview packaging, brand redesign, direct model connector, multi-agent/cloud/desktop routing; not this task. Gate 5 ON HOLD.
