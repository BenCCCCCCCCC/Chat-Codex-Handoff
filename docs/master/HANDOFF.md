# Active Handoff

Updated: 2026-09-09
Role: 00 MASTER

## Phase

**STRATEGY-RESET-01 — research-led direction reset / R0 factual inventory READY FOR CODEX**

The owner now prioritizes AI product-manager campus-recruitment capability and plausible product adoption over further optimization of the Chat-to-Codex transport helper. The old instruction to keep patching launcher/tab/parser behavior is superseded. Gate 5 stays ON HOLD.

This is a planning/research phase, not a full application rewrite. This document is a prepared task, NOT a dispatch receipt. MASTER has not started a local Codex run from this Chat.

## Current Evidence and Version

The owner confirms UX-05 executed, brief launch flash is acceptable, and CopyOnly opens no new tab. Manual paste remains necessary and the owner questions the product's value.

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Last reported local branch: `prototype/usability-spike-01`
- Last source-reviewed HEAD before UX-05: `28828b110263909c5683a8cab54d6832f2ad7ffa`
- Actual post-UX-05 HEAD: **unknown; resolve in R0 without resetting anything**.
- Last checked remote product HEAD: `869414c77d227fe2f1675c7cfa08b04250520279`.

The previously reported core 43/43 and UI 73/73 results belong to their recorded revision, not an unknown UX-05 HEAD. No need to rerun these tests for a strategic inventory.

Preserve historical Alpha/Dogfood/UI review outcomes, including their limits. Eventual technical PASS does not erase real setup, wrong-target, retry or evidence-transfer cost.

## New Working Hypothesis

**AI prototype acceptance assistant — a reusable requirement-to-evidence-to-decision module, initially for non-engineering owners of simple Web prototypes.**

Aim: reduce total human effort to make a correct acceptance decision about AI-generated work. Do not optimize solely for fewer clipboard operations.

Candidate flow:

`owner-approved criteria -> existing coding/test tools -> version-bound evidence -> satisfied / failed / insufficient-evidence per criterion -> explicit owner decision or bounded correction`

Do not implement this module yet. First test whether existing Codex + template, Spec Kit/OpenSpec, browser/test/report tools already solve the need. If an existing workflow is sufficient, adapt/contribute rather than build a new platform.

The target user, frequency, value over alternatives, adoption and willingness to pay remain hypotheses. The name is a working description, not a repo rename or new public brand.

## Research Inputs Already Reviewed by MASTER

- Related Library career consultation `规划转写.txt`: full product workflow, AI value/cost, actual outputs. The exact other Project's complete training plan was not available; do not invent it.
- Baidu official campus AI PM J100665 and intern AI assistant/search PM J103598; one ended Alibaba employer-attributed intern listing as supplementary capability evidence. This is a qualitative sample, not a hiring-market census.
- Spec Kit including pinned `templates/commands/converge.md`, OpenSpec, Lovable browser tests, TestSprite GitHub integration, Playwright traces, Vibe Kanban README/company shutdown notice.
- Official Codex App Server/SDK/non-interactive docs and evaluation guidance.

Primary source URLs and bounded conclusions are in CURRENT_STATE. No vendor marketing accuracy/ROI number has been adopted as project evidence. No competitor was installed or run. No external-user interviews were performed.

## R0 — Local Asset and Historical-Evidence Inventory

### Goal

Use real local project facts to prepare a falsifiable reuse/acceptance experiment, not more product functionality.

### Start

Read canonical `CURRENT_STATE.md`, then this `HANDOFF.md` from `meta/master-state`. Do not rely on stale product-branch copies. Existing authorized GitHub read is preferred; a narrow fetch of that ref is allowed when needed, but do not checkout/merge/cherry-pick it.

Verify actual repo, branch, HEAD and worktree. A post-UX-05 commit differing from `28828b...` is expected as a possibility, not automatically an error. Explain its lineage with exact local Git evidence. If location/branch/history conflict cannot be explained by the known UX-05 continuation, stop rather than reset.

### Allowed work

1. **Close the version inventory**
   - Record actual branch and HEAD.
   - Identify the UX-05 commit and exact changed files/diff from the last reviewed HEAD where available.
   - Record tracked/untracked state; distinguish an observed commit from a report of execution.
   - If UX-05 is uncommitted or ambiguous, report accurately without committing/fixing it.

2. **Map existing assets**
   - Read only current project source and existing artifacts needed to identify reusable contracts/functions/tests.
   - Separate reusable domain concepts from Windows/Chat-specific adapters and disposable presentation code.
   - Prefer exact paths/symbols with a brief reuse rationale.
   - No speculative refactor, module extraction, new schema file or framework installation.

3. **Index existing real episodes**
   - Use already-existing repository evidence; do not scrape private Chat history or assume old Chat turns are locally accessible.
   - Candidate topics: wrong MASTER binding, post-turn delivery sequencing, unavailable README evidence, earlier-versus-final test proof, actual final-HEAD label gap, test-process lifecycle, CopyOnly/launcher owner friction.
   - Include only episodes supported by the available evidence; report inaccessible material as unavailable. Fewer supported cases are preferable to fabricated ones.
   - For each supported episode record: ID, source path, task/requirement, time/version context, then-visible evidence, reported decision, subsequently supported result, type of human burden, missing evidence, and whether a deterministic rule or semantic judgment was needed.
   - Distinguish code bug, workflow/instruction error, evidence gap, usability feedback and product-value objection.
   - Historical MASTER/Codex assertions are claims until corroborated. Do not label all prior PASS decisions as ground truth.
   - No invented time savings, interview participants, errors, metrics or business tasks.

4. **Prepare a minimal comparison design**
   - For the available episodes outline baseline A (native tool/basic template), baseline B (existing spec workflow) and candidate C (criterion-linked evidence report).
   - This is an experiment plan, not a tool execution or benchmark result.
   - Name what evidence is missing to judge incremental value and the smallest subsequent experiment.
   - Do not download/install Spec Kit/OpenSpec, launch app-server, call another model, spend API credits, contact users or create tests now.

### Permitted outputs

Write or update at most these two research artifacts under the existing repo:

- `artifacts/strategy-reset-01/ASSET_AND_CASE_INVENTORY.md`
- `artifacts/strategy-reset-01/EVIDENCE_INDEX.json`

These are untracked research outputs. Product source remains read-only. Do not modify canonical MASTER documents from the product branch. Do not add a new README/PRD forest or rewrite old evidence. Reuse an existing output if clearly from this R0 task; do not overwrite unrelated content.

Do not include credentials, real Chat URLs, full private packet bodies or unrelated user files in exported material. References and minimal redacted excerpts are sufficient.

### R0 not allowed

- no source changes, new product files, branches, commits, amend, reset, merge, push or release;
- no test reruns solely for inventory, no synthetic tasks/bugs, no model evaluation run;
- no installation, dependency download, additional agent/model process, API use/paid credits;
- no actual app-server task or new local server/daemon;
- no Desktop URI/registry/package probe, process sweep, internal client/history/cache/credential read;
- no real clipboard/browser/live handoff action;
- no external contact or code/data sharing;
- no UI redesign, new launcher or automatic paste/send.

A read-only file/Git inspection and the two designated research outputs are enough. Stop at a permission barrier; do not bypass it to obtain a more complete inventory.

### R0 final reply

Use a concise evidence-ready response, not another large background dump. Include:

- actual repo/branch/HEAD;
- UX-05 exact version/scope or clearly unresolved status;
- product_files_changed=0, commits_created=0, push=0;
- research files created/updated and whether untracked;
- reusable versus legacy-only assets;
- supported historical case count (not a target count), unsupported cases explicitly excluded;
- at most three findings that could change the new direction;
- existing-tool comparison plan and precise missing evidence;
- Completed / Not Done / Verified / Likely / Unknown;
- Must Fix / User Decision Needed / Future Optional.

Final status: `R0 FACTUAL INVENTORY COMPLETE / READY FOR MASTER DISCOVERY REVIEW`, or honest PARTIAL/BLOCKED. Never report new MVP/market/AI-evaluation PASS.

Do not invoke live handoff within the same turn to copy that turn's future reply. Do not require the owner to generate new tasks for this inventory.

## Next Phases — Prepared, Not Automatically Authorized

### R1 — Existing-tool comparison and problem discovery

Use frozen real task/requirement/evidence snapshots. Compare with existing tools before new implementation. Any actual model execution, installation or fresh technical probe needs a bounded execution decision preserving usage and permission limits.

Prepare problem interviews with a few non-engineering owners of real AI-built prototypes. No participants available does not authorize fake personas as evidence. Obtain owner approval before contacting anyone. A problem interview can use a past real task; it need not require installing our current tool.

### R2 — Bounded feasibility / module prototype

Only if a meaningful gap remains, select the smallest official integration and existing test/trace tools. Owned task IDs/events or explicit artifacts, not interception of existing private Desktop Chat.

Possible MVP: one repo, one simple Web change, approved acceptance criteria, automatic evidence association, criterion-level verdict with insufficiency states, one owner-approved correction. No universal AI product manager or QA platform.

This direction is provisional. Paid use, new installation/runtime, source rewrite or browser testing of even an owned prototype must be covered by the later explicit scope and safety contract.

### R3 — Owner/independent user result and product decision

Assess false acceptance, unnecessary rejection, evidence alignment, total human handling time including setup/transfers, follow-up rounds, actual model/runtime cost and voluntary reuse. Hold out tasks, calibrate against human labels, and do not reuse evaluator feedback as proof of real user value.

Possible outcomes: keep as extension, justify a small standalone surface, contribute to an existing project, pivot to a different validated workflow, or stop. Do not grow scope merely to fill available time.

## Portfolio / Capability Output

The owner should be able to explain user problem, AI suitability, non-AI baseline, PRD and interaction, build-versus-reuse, permissions/failure modes, model/effect evaluation, measured iteration and commercial risk.

Codex writing code is not the owner's claimed engineering authorship; AI agent roles are not real cross-functional stakeholder collaboration. Preserve honest personal contribution and project/production status. No invented users, revenue, improvement percentages or employer achievements.

## State Summary

Completed: first desk research, related career-source reading, candidate evaluation, provisional direction and R0 task.

Verified: the owner's no-new-tab result and acceptable brief flash; previously recorded source/test outcomes; capabilities explicitly supported by reviewed primary sources.

Likely: a reusable acceptance/evidence module may have greater workflow value than transport-only assistance.

Unknown: post-UX-05 HEAD, external demand, frequency/willingness to adopt/pay, superiority over existing tools, actual new integration behavior and economics.

Not Done: R0 local execution, existing-tool runtime comparison, external interviews, new MVP, model eval, independent user outcome or launch.

Must Fix: avoid strategic overclaims and preserve evidence/version distinctions; no new coding defect is invented.

User Decision Needed: none for this narrow inventory under the strategy-reset request. Pause at all later scope, live validation, access, spending and distribution gates.

Future Optional: legacy polish/deep links/tab focus and standalone packaging are not current implementation tasks.
