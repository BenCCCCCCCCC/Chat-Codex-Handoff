# Active Handoff

Updated: 2026-09-10  
Role: 00 MASTER

## Phase

**STRATEGY-RESET-01 / R1-BUILD-01 OFFLINE P0 APPROVED / EXECUTE IN CODEX NOW**

The owner explicitly approved only `R1-BUILD-01` v0.3. This converts the prepared offline P0 brief into an executable local Codex task. It does not authorize a complete AI MVP, model/API calls, browser/runtime integration, paid use, external users, push/merge/release or legacy-product refactoring.

## Local Starting Receipt

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Expected starting branch: `prototype/usability-spike-01`
- Expected starting HEAD: `0c2440b06ffe5657331d4395a4181929d28c5ebf`
- UX-05 is historical accepted evidence; launcher/parser/tab work remains frozen.
- Preserve existing untracked Hook/T09 packet/artifacts unless the approved build writes new outputs only under its designated directories.

First verify actual repo/branch/HEAD/worktree. If a different HEAD cannot be explained by known continuation, STOP rather than reset. Do not use the older remote product branch as a reset source.

## Required Reading Order

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:

1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/R1_BUILD_BRIEF.md` v0.3

Read `R1_PRODUCT_AND_EVAL.md`, `R1_RESEARCH.md` or `SOURCES_AND_DECISIONS.json` only when needed to resolve product/evidence ambiguity. Do not reload the full historical project unnecessarily.

## Approved Development Contract

Implement the offline acceptance-sheet P0 exactly within `R1_BUILD_BRIEF.md` v0.3.

Allowed development:

- verify baseline and create/safely continue one local branch `prototype/acceptance-evidence-p0`;
- read the two existing R0 local research artifacts directly, without asking the owner to upload them;
- add at most six new product/test files under `acceptance-p0/`;
- create at most two meaningful local commits;
- use existing Windows PowerShell 5.1 and system libraries only;
- generate new per-run artifacts under `artifacts/acceptance-p0/<run_id>/`;
- implement one snapshot -> validate -> render path;
- keep requirement revision, target code revision, evidence generation revision and current snapshot checkout distinct;
- validate scoped provenance/reference/applicability facts without silently upgrading UNKNOWN;
- accept optional structured reviewer suggestions as inert data only; do not call a model;
- emit static Chinese `report.html`, machine-readable `report.json`, source/raw-material index and one whitelist review bundle;
- run the new module's own isolated tests and one supported historical replay where available.

Core truthfulness rules:

- no reviewer => `NOT_REVIEWED`;
- invalid/missing/inapplicable positive support cannot justify `SATISFIED`;
- file existence/hash/exit=0 never auto-approves a business criterion;
- `owner_decision` stays `PENDING` in P0;
- synthetic/demo inputs stay labelled synthetic/demo;
- application-level no-overwrite is not cryptographic provenance;
- do not repair historical unknowns by assigning the current HEAD.

## Do Not Do

- no changes to legacy `handoff-kit/`, `Start-Handoff.cmd`, Hook, binding, packet or old GUI;
- no model/API/additional-agent invocation;
- no browser/Web/server/app-server runtime;
- no dependency install, new runtime, elevation or global config;
- no real clipboard/Chat/Desktop operations;
- no private-client/auth/history/cache reads;
- no external contact, user interview, data sharing or publication;
- no push/merge/release/paid use;
- no full MVP, standalone platform, generic QA engine or new spec framework.

Stop and report if a correct P0 requires any of the above.

## Required Validation / Handoff

On final local HEAD:

- run the P0 module's complete isolated tests and report exact pass/fail/exit;
- run `git diff --check` for the approved range;
- show exact changed files/diff stat and commit(s);
- prove run-directory collision fails without destroying old bytes;
- show hash/path/reference/version mismatch behavior and honest UNKNOWN states;
- show one supported historical replay if local material permits; otherwise state PARTIAL instead of fabricating it;
- report HTML visual rendering as NOT VERIFIED unless safely checked without new browser/client tooling;
- generate exactly one minimal review bundle/index for MASTER, not another many-file upload workflow.

Maximum status:

`P0 IMPLEMENTED / OFFLINE SELF-TESTED / READY FOR COMPARISON REVIEW`

Do not claim AI/model accuracy, complete MVP, user benefit, Web demand, efficiency improvement, market fit or commercial viability.

## Minimal Codex Trigger — Approved

Send this in the same local Codex project:

```text
执行已批准的 R1-BUILD-01 v0.3。
Repo: F:\Chat-Codex-Handoff\validation-repo
Expected starting HEAD: 0c2440b06ffe5657331d4395a4181929d28c5ebf
先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state：
docs/master/CURRENT_STATE.md
docs/master/HANDOFF.md
docs/research/strategy-reset-01/R1_BUILD_BRIEF.md
按完整有界工作包执行；直接读取本地R0材料，不要求用户重传。
不改旧产品、不安装、不额外调用模型/API、不操作真实浏览器/clipboard、不push/merge。
完成后返回 evidence-ready Delivery Packet，最高状态只能是：
P0 IMPLEMENTED / OFFLINE SELF-TESTED / READY FOR COMPARISON REVIEW。
```

## After Codex Returns

MASTER reviews only the new `acceptance-p0/` delta and its single review bundle, then decides whether the P0 adds enough clarity to justify a real comparison. No automatic model/Web/user phase follows from engineering PASS.

## State Summary

Completed: R0, R1 desk research/counterevidence/four-layer/eval design, owner approval of bounded P0.

Verified: source-qualified owner/receipt facts and primary-source capabilities; no fresh MASTER-side Windows run.

Likely: criterion-linked applicable evidence may reduce owner decision burden; still unmeasured.

Unknown: user demand/payment, strong-baseline advantage, model quality, real Web/runtime behavior and economics.

Not Done: P0 implementation, comparison/model eval, interviews, full MVP, external pilot, release.

Must Fix: no new legacy code defect; preserve evidence/version truth and scope.

User Decision Needed: none for this approved P0. Stop again for any scope/runtime/model/user/paid/public expansion.

Future Optional: old polish/deep-links/tab focus/standalone packaging remain inactive. Gate 5 remains ON HOLD.