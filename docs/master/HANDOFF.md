# Active Handoff — CORRECTNESS-HYGIENE-01

## 0. Project identity precheck

Before dispatching Batch A, run one read-only identity check in the Codex project currently open. This check is mandatory because the owner is not certain which Codex project currently points to the product checkout.

Expected identity:
- local repo root: `F:\\Chat-Codex-Handoff\\validation-repo`
- repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
- product branch: `prototype/study-teachback-v0.1`
- expected accepted base: `f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

Read-only checks only:
- print/return the actual working directory;
- resolve the Git top-level path;
- report current branch;
- report current HEAD;
- report configured remotes if present;
- report whether `study-teachback-app/`, `handoff-kit/`, and `.git` belong to this repo;
- do not modify files, switch branch, fetch/pull/reset/clean, run tests, start the app, or call any provider API.

PASS only if the repo root and branch match the expected product checkout. HEAD may differ only if there is already documented local work; if it differs, report the exact divergence and STOP before Batch A. If the path/branch/repo is wrong or ambiguous, stop and return the observed identity. Do not attempt to move/copy/create/switch projects automatically.

### Canonical read-only precheck trigger

```text
先不要执行 Batch A，也不要修改任何文件。只做项目身份确认：告诉我当前 Codex 打开的实际工作目录、Git top-level、当前 branch、HEAD、remote（如有），并确认是否存在 study-teachback-app/ 和 handoff-kit/。预期项目是 F:\Chat-Codex-Handoff\validation-repo，分支 prototype/study-teachback-v0.1，仓库 BenCCCCCCCCC/Chat-Codex-Handoff，已接受基线 f6a000ca96fedfbeb9eaa803dfcd990a13d90c53。禁止 switch/fetch/pull/reset/clean、禁止运行测试、禁止启动应用、禁止 API 调用、禁止改文件。若路径或分支不匹配，立即停下，只报告你实际看到的项目身份；若匹配，也先停下等我下一条指令。
```

Only after MASTER/owner confirms this precheck is acceptable should the Batch A trigger in section 12 be sent.

**Project identity precheck result: PASS.** The owner reported that all expected identity fields matched: local repo path, repository identity, branch, HEAD/base, and expected project structure. This authorizes sending the Batch A trigger only; it does not mark A as started until Codex receives that trigger, and it does not authorize Batch B or live API work.

Updated: 2026-09-28 — executable task, not an execution receipt
Role: 00 MASTER
Status: **READY / NOT DISPATCHED / NOT STARTED**

## 1. Read first and bind the correct work

Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`.
Canonical instruction branch: `meta/master-state`.
Read in order and record the actual document commit used:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`

Branch and path are separate values; `meta/master-state` is not a directory. Product-checkout copies of these paths are currently stale historical Handoff-tool state and must not supply the task.

Execution checkout: `F:\Chat-Codex-Handoff\validation-repo`.
Execution branch: `prototype/study-teachback-v0.1`.
Expected accepted base: `f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`.
Product: **知而能讲** — Study-first + in-app teach-back.

Do not switch the product checkout to the meta branch. Use an already-authorized GitHub read or a narrow fetch/read of that one ref without checkout, pull, merge or product push. Never use credentials copied from ChatGPT internals. If canonical instructions cannot be read, report the exact access issue; do not silently substitute stale local documents or request a whole-project re-explanation.

The owner said at 2026-09-28 16:45 +10:00 that the old trigger was not sent. No dispatch, execution, local changes or tests are inferred from these MASTER documentation commits.

## 2. Goal and scope

**Task ID: CORRECTNESS-HYGIENE-01 / Batch A.**

Fix three already-observed correctness/entrypoint defects and supply evidence for delta review. This is a bounded validation-stage correction, not a new product implementation or architecture rewrite.

- R02: UI-generated Learn/Repair/Apply instructions must not be attributed to the owner.
- R03: ordinary repository/app entry documents must identify the active product and point to canonical state.
- R05: failed microphone/capture startup must not consume a valid attempt registration; repeat registration must not double-count the same attempt.

Batch A is the only executable batch. Batch B / Phase 3A remains a later plan until MASTER explicitly accepts A and issues a separate task. No live Phase 3/3B in this batch.

## 3. Non-negotiable boundaries

Zero **live product/provider** API calls: no real ASR, Tutor, diagnosis, TTS, model list/access probes, model fallback or retry. Local loopback HTTP tests with injected fakes, GitHub document reads and public documentation reads are allowed; they are not live product inference.

Preserve production model/provider configuration, pricing, caps, existing retry limits, ledger event history, raw audio, transcript versions, origin, database identity/schema and retention policy. No recharge, new credentials, global environment/policy changes, new dependencies, public release, repository rename, broad file moves or GUI redesign.

Never open/reload the owner's learning profile or invoke `openStore()` against owner data to inspect it. Current expiry can delete a topic based on creation + seven days. No launch of the real Start-Study flow as a test shortcut. Use isolated browser profiles, synthetic data and test ledgers.

Do not kill an unknown process, replace an occupied port owner, change the user's system policy, reset/clean/force, amend history or overwrite unrelated work. No push or merge. Do not upload raw owner recordings or secrets with the Delivery Packet.

## 4. A0 — preflight and baseline

Before modifications:
- Confirm actual repo root, branch, HEAD, tracked/untracked/ignored status and relevant pre-existing changes.
- Compare with the expected base. If branch/base differs, report the diff in identity and stop before editing; do not reset to the expected commit. Unrelated pre-existing work may remain if it can be kept separate; conflicting changes require a bounded decision.
- Read affected runtime/test code before running it. Establish that test providers are injected fakes, ledgers are isolated and historical artifacts will not be overwritten. Do not rely on missing credentials alone to guarantee zero calls.
- Test processes must not inherit usable provider credentials. Use process-local synthetic credentials only when required by tests, and enforce test-level outbound-provider blocking or equivalent auditable interception. Do not edit the user's persistent credentials or runtime provider configuration.
- Reuse the existing test framework. For freshness, use the current official documentation references in CURRENT_STATE and the repository's existing tests; no paid capability probe or unrelated framework/library survey.
- Run the applicable baseline tests safely, then reproduce R02/R05 in focused isolated regressions where possible. Label pre-existing failures separately from new regressions. Do not manufacture a successful baseline or run historical live scripts.

A0 evidence: identity, relevant initial worktree summary, baseline commands/results, isolation method and any unmet preconditions.

## 5. A1 — R02 message provenance

Inspect `study-teachback-app/app.mjs`, especially `teach()`, initial Learn, `再学这一点`, `试一个新情境`, and the genuine answer submit path.

Required behavior:
- App-generated action instructions remain available as the immediate request's internal context, but do not become stored/rendered owner utterances or later fabricated owner history.
- Actual typed owner questions/answers remain genuine user messages. Do not hide all user messages as a shortcut.
- Initial Learn success/failure retains the already-accepted provenance fix.
- Repair and Apply success, validation rejection and request failure do not append generated owner messages.
- Application navigation/focus and existing request gating retain their behavior except the necessary correction.
- Do not rewrite old owner records, migrate message schema or retroactively clean historical evidence in this batch.

Required tests: initial Learn, Repair, Apply across success and failure/rejection; first and subsequent actual owner input; persisted messages, rendered messages and subsequent request history. Use fake provider responses, including an invalid source quote. A short behavior-preserving helper or explicit provenance flag is acceptable; no messaging-framework rewrite.

## 6. A2 — R03 product/state entry documents

Update only the relevant entry documents:
- root `README.md`;
- `study-teachback-app/README.md`;
- the product-branch copies of `docs/master/CURRENT_STATE.md` and `docs/master/HANDOFF.md`, converted into explicit non-authoritative/ref-aware pointers.

Required behavior:
- A new reader can identify 知而能讲, its existing startup prerequisites and the canonical instruction branch without mistaking the old Handoff helper for the main product.
- Retain Handoff kit links and operational paths as development tooling; do not delete the tool or its historical evidence.
- Remove misleading blanket Owner Validation NOT EXECUTED claims; state historical Phase1/clean Phase2 acceptance and still-unrun physical Phase3 accurately, or point to dynamic state rather than duplicating it.
- Preserve genuine unknowns: local microphone, full owner journey, launcher/manual observations and fresh test status are not upgraded to PASS.
- Do not create extra suffixed snapshots or a second authoritative task list. Editing feature-branch pointer files does not authorize modifying the meta branch from Codex.

Required checks: old executable next steps no longer masquerade as current; repo/ref/path references correct; local links and startup paths consistent. Documentation checks must not launch the owner application.

## 7. A3 — R05 recording registration and idempotency

Inspect recording lifecycle in `app.mjs`, `/api/register` in `server.mjs`, and `Ledger.register` in `ledger.mjs`.

Required outcomes, rather than a mandated large redesign:
- Permission denial, unsupported recording format, failed recorder startup and empty/invalid capture must not consume a durable valid-attempt registration.
- Register only at a valid capture boundary. Prefer successful original-audio preservation before registration, then enforce registration/limits before any ASR submission. A minimal alternative must prove the same safety properties without migrations.
- Repeating registration for the same valid attempt ID is idempotent: no extra attempt event/count. It must not create new ASR allowances, clear reserves or bypass total limits.
- A new attempt at the 60-attempt cap is refused before ASR. Existing per-attempt submission limits and the historical synthetic-fixture exception remain unchanged; the exception is not a new authorization to spend.
- Invalid IDs, ledger lock/corruption and quota failures fail closed before provider dispatch. They do not erase already-saved original audio or fabricate a new attempt.
- Moving asynchronous startup must not allow a late permission/capture completion to attach audio to a different/deleted topic. Keep necessary UI pending guards; do not redesign general navigation.

Required isolated tests: denied permission; unsupported/throwing startup; empty capture; one successful synthetic capture with exactly one registration; duplicate same-ID registration without double-counting or new allowances; cap boundary; invalid ID/ledger failure blocks provider stub dispatch; retained audio on registration failure; late-startup identity/navigation protection. Use synthetic media, not the owner's physical microphone.

No production ledger schema change or historical event deletion. Changes to server code are limited to the registration path and any minimum enforcement needed before ASR; do not alter ASR transport/model configuration.

## 8. A4 — regression, work product and commit policy

Likely implementation surface: `app.mjs`, `ledger.mjs`, only necessary registration-related lines of `server.mjs`, A2 documents, provenance/recording regression tests, and minimal test-harness isolation/output-path fixes. Do not modify `provider.mjs`, model prompts/diagnostic schema, retention code or audio algorithms. If a protected change is genuinely necessary, return BLOCKED with the smallest proposed exception instead of expanding the task.

Use the existing Node suite and relevant browser stub suite after first checking safety. Existing reference commands are:

```text
node --test study-teachback-app/tests.mjs study-teachback-app/*.test.mjs
node study-teachback-app/browser-tests-r4.mjs
```

These are reference commands, not permission to bypass A0 isolation. Adapt invocation to the local shell as necessary and report the actual command. Test harness outputs must go to a new run directory, not overwrite older acceptance artifacts. Missing fixture/tool/dependency is NOT RUN/BLOCKED, never silently fixed by a paid call or unapproved installation. Local deterministic synthetic fixture creation is allowed only when clearly labelled and sufficient for the same engineering test; it cannot replace a real-owner test claim.

Record fresh counts and exits. Historical Node48/48 or Edge29/29 are context, not the required future counts. Include targeted evidence of zero provider traffic/fake-provider use; unchanged production ledger hash or absence, where safely observable, is supporting evidence, not proof by itself.

Place new synthetic/non-sensitive review artifacts under `artifacts/study-teachback/correctness-hygiene-01/<run-id>/` without replacing historical files. Keep the evidence set small: Delivery Packet, complete patch/new-file contents, raw test logs and an acceptance-index table with references/hashes. Existing equivalent conventions may be reused if the paths remain explicit.

After required checks pass, one focused **local** commit for A is permitted. Stage only enumerated A files; no blanket staging or unrelated files. If blocked, return the uncommitted diff and failures instead of committing a false success. Never push/merge/amend/reset. A local commit is not MASTER acceptance.

## 9. Acceptance matrix and Delivery Packet

Report each ID as PASS / FAIL / NOT RUN / BLOCKED with actual evidence:

| ID | Acceptance |
| --- | --- |
| A0 | Correct base/worktree; baseline recorded; owner data isolated; no live provider path |
| A1 | Learn/Repair/Apply provenance across success/failure plus real-owner-input preservation |
| A2 | Product-first entry; canonical ref-aware pointers; no invented validation status |
| A3 | Failed startup does not consume attempts; valid capture registers once; guards and identity preserved |
| A4 | Fresh applicable regression, complete delta evidence, zero-live-call evidence and protected-scope check |

Delivery Packet must include:
- Task ID and canonical document commit actually read.
- Repo/branch/base/final HEAD; local commit or uncommitted state; pre-existing work preserved.
- Exact changed-file list and complete reviewable diff, including newly added files. A local path or a statement that tests passed is not remote review evidence.
- Commands, results, logs and the acceptance-ID mapping; exact test context (fake provider/synthetic media).
- Confirmed zero live product calls, with how enforced/observed; no secrets or owner content.
- Tests Not Run, Unknown/Unverified, Blocking, User Decision Needed and Future Optional separately.
- Confirmation: no model/provider/retention/schema/cap change, no product push/merge and no automatic start of B.

Because product push is prohibited, include the complete patch/new-file content directly in an accessible delivery attachment or response, not only an inaccessible local filename or a GitHub link to an unpushed commit. Use the existing Handoff return path if available; user remains in control of paste/send. Do not build another transport.

MASTER reviews only A's delta/evidence and updates the canonical status after checking it. Schema/quote tests are not proof of semantic correctness or user learning. Fake-media tests are not a physical microphone test. Clear Must Fix items return to the same task; new ideas do not become automatic repairs.

## 10. Stop conditions

Stop and report a bounded blocker if the baseline conflicts, canonical docs cannot be read, safe test isolation cannot be established, real provider traffic occurs or is about to occur, owner data/credentials might be touched, protected schema/model/cap changes are necessary, or unrelated work would be overwritten. Do not weaken tests, reset the ledger, switch models, install new dependencies, kill processes or retry live calls to make the report green.

Return after A even when PASS. B and live Phase3 are not automatic continuation steps.

## 11. Deferred sequence — recorded, not executable under A

**Batch B / Phase 3A — DIAGNOSTIC-LOCALIZATION-01:** after A acceptance, MASTER issues a separate bounded task for contentFindings, processEvidence and diagnosticTarget separation. A process event needs no textbook quote or knowledge verdict. A localization candidate is not proven misunderstanding.

Retain six fixture cases: fluent wrong; hesitant correct; uncertain/unexpressed relation with related process evidence; correct explicit self-repair; unreviewed critical ASR error; content gap without acoustic signal. Fixture outputs are pre-labelled expectations, not actual recognition results. Missing content has no fabricated literal timestamp; only independently supported neighboring audio associations may be shown. Timing uncertainty stays visible. No new pitch/pronunciation/emotion scoring or audio ML dependency merely to fill a feature list. Two feedback areas: 内容理解 / 讲解过程.

**Phase 3B — real owner evidence:** after a specific necessity/cost decision and safe data preflight, resume the still-unrun bounded recording checkpoint: one natural 20–45 second explanation, preserve audio, approved ASR and existing local observations, stop at replay/transcript before diagnosis. Confirm critical negations/numbers/conditions/terms and retain raw/corrected versions. PARTIAL timing is acceptable; no fabricated precision. A later controlled content-only versus dual-evidence comparison may test added localization value; one recording or a passing fixture suite cannot establish learning efficacy.

Before live work, recheck official model/timestamp contracts and rates plus a fresh safe ledger. The official deprecation/timestamp references are in CURRENT_STATE; they do not authorize changing models in A. Historical US$5/US$10 ceilings are not current spending permission. No owner-funded call just to check access.

**Retention/replay/backlog:** customizable retention with defaults/reminders is recorded but not implemented. Exact defaults, expiry/grace/migration and replay-policy changes need a separate decision. Broad reorganization, historical retry-exception cleanup, advanced prosody and a separate interview product remain out of A. Do not make all future improvements prerequisites for one real-owner checkpoint.

## 12. Canonical short trigger

Use when the owner is ready; this is the complete short trigger to copy, backed by the task above:

```text
执行 Batch A — CORRECTNESS-HYGIENE-01。先读取仓库 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 分支中的 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录实际读取的文档 commit。执行目录 F:\Chat-Codex-Handoff\validation-repo，产品分支 prototype/study-teachback-v0.1。按 HANDOFF 的 A0–A4 先核对基线和测试隔离，只修 R02/R03/R05。禁止真实产品 API 调用、修改 retention/模型/provider/数据库 schema/预算上限，禁止 push/merge；不得自动进入 Batch B。读不到权威文件或基线不符就报告，不用旧副本或 reset 代替。完成后返回完整 Delivery Packet、diff、新文件内容、实际测试证据和未验证项，停下来交由 MASTER 审查。
```

## 13. Classification

Completed: executable Batch A specification and later-stage separation documented.
Verified: remote source/authority reads and historical evidence classification only; no new local tests.
Likely: this focused correction can improve baseline reliability; diagnostic benefit remains a hypothesis.
Unknown: current local state and actual future test outcomes, old-record survival, speech accuracy and value.
Not Done: dispatch, A implementation/regression, B, real Phase3/3B and final owner acceptance.
Next smallest step: owner sends the trigger; Codex executes A only; MASTER reviews its evidence.
