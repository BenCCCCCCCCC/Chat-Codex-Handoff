# Current State

Updated: 2026-09-28 — Batch B MASTER review / correction required
Role: 00 MASTER / authoritative dynamic state

## 1. Current status

**OWNER-VALIDATION-01:** clean Phase 2 historically PASS; physical-microphone Phase 3 NOT EXECUTED.

**Batch A — CORRECTNESS-HYGIENE-01:** MASTER-ACCEPTED at local commit `f06900fa9dcffd7768a1ec283715a50f6570832e`; not pushed.

**Batch B — DIAGNOSTIC-LOCALIZATION-01 / Phase 3A:** DELIVERED / MASTER REVIEWED / **BLOCKED BEFORE ACCEPTANCE**.

**Batch B Correction — REPLAY-GATE-01:** READY / NOT DISPATCHED / same Codex task and same uncommitted Batch B worktree.

**Phase 3B — real owner speech evidence:** NOT STARTED / COST-READINESS HOLD.

No live provider/model call is authorized.

## 2. Repository and authority

Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`.

Local checkout: `F:\Chat-Codex-Handoff\validation-repo`.

Product branch: `prototype/study-teachback-v0.1`.

Batch A accepted local base:
`f06900fa9dcffd7768a1ec283715a50f6570832e`.

Batch B did not create a commit. Local HEAD remained `f06900f...`; Batch B changes are unstaged/uncommitted and must be preserved for the correction. Do not reset, clean, checkout away, or try to match the older remote feature HEAD.

Dynamic authority is only:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

## 3. Batch B review receipt

User supplied `Batch-B-review.zip`.

MASTER review ZIP SHA256:
`02c85a14e87dc37e6577914a938fa7b0794acbdfda1dc0f1cefd8923a436e4af`.

The bundle contains Delivery Packet, full patch, complete changed/new files, canonical snapshots, raw Node/browser/diagnostic logs, fixture outputs and identity/evidence receipts. All **93** entries listed in `SHA256SUMS.json` matched their recorded SHA256 values.

Canonical Batch B task commit read by Codex:
`066e76a3295acd6effd57a6920318fc595c295ae`.

Batch B changed tracked files:
- `study-teachback-app/README.md`
- `app.mjs`
- `browser-tests-r4.mjs`
- `index.html`
- `provenance.test.mjs`
- `run-offline-tests.mjs`
- `server.mjs`
- `style.css`
- new `diagnostic-localization.mjs`
- new `diagnostic-fixtures.mjs`
- new `diagnostic-localization.test.mjs`

Patch summary: 11 files, +281 / -23.

No Batch B commit was created because required browser regression did not complete.

## 4. Batch B technical review

MASTER code review finds the intended architecture direction substantially implemented:

### B1 — evidence contracts

`contentFindings` reuses existing source/transcript validation.

`processEvidence` is a distinct allowlisted contract with attempt/transcript identity, time/span location and provenance/confirmation. It rejects knowledge statuses, textbook `sourceQuote`, repair instructions and person-score fields.

`diagnosticTarget` is derived from actionable content findings. Related process evidence is attached separately as co-located observation context, not as proof of misunderstanding.

### B2 — deterministic localization

Six required fixtures match expected outputs:
- fluent wrong -> one content target, no process evidence required;
- hesitant correct -> supported content, one process observation, zero knowledge target;
- uncertain relation + process evidence -> one content-based target with separate related process reference;
- correct self-repair -> supported final stance, no unresolved target;
- unreviewed ASR -> blocked with `ASR_REVIEW_REQUIRED`;
- missing content/no process -> target exists with null content location and no fabricated audio timestamp.

Focused diagnostic suite final result: **14/14 pass**.

Full Node final result: **93/93 pass**.

### B3 — local process path

The active UI path now confirms local near-silence into `processEvidence` without semantic/provider dispatch. Unit/VM coverage confirms deduplication, transcript-version isolation, save failure recovery and zero dispatch.

However the required native browser persistence/reload test was not reached because the full browser suite stopped earlier at the replay-completion regression. Therefore B3 is **PASS at unit/domain scope, browser E2E NOT COMPLETED**.

The legacy server DELIVERY semantic route remains present but is no longer used by the active local process-confirmation UI. Cleanup is not required for this correction unless it causes a correctness problem.

### B4 — UI

The UI is split into:
- **内容理解**
- **讲解过程**

Browser fixture screenshots/tests demonstrate the six diagnostic states and separate panels before the suite reaches the unrelated replay failure.

### Zero-live-call evidence

The existing isolated wrapper/guard remained active:
- synthetic credential only;
- non-loopback network guard;
- isolated test ledgers/profiles;
- fake/stub providers;
- production ledger SHA unchanged across recorded runs:
  `d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`;
- browser observed external requests = 0 in recorded runs.

No real ASR/Tutor/diagnosis/provider call is evidenced.

## 5. Blocking finding — R07 replay-completion reliability

Batch B cannot be MASTER-ACCEPTED yet because full browser regression repeatedly stops on the same pre-existing replay-completion check:

`diagnosis blocked before segment replay; correction keeps original identity and audio`

Observed failure:
`WAIT_FAILED document.querySelector('#transcript button').textContent.includes('✓')`

Recorded runs:
- Batch B baseline browser: 18 checks passed, then replay failure.
- Batch B browser run 1: 24 checks passed (including six new diagnostic fixtures), then same replay failure.
- Batch B browser run 2: 24 checks passed, then same replay failure.

This was a one-off/intermittent unknown in Batch A because an immediate exact retry passed 40/40. In Batch B it reproduced consistently. It is now a real regression/reliability blocker for acceptance because:
1. B5 requires applicable full browser regression.
2. B3 browser-level persistence/zero-dispatch check occurs after this point and was never reached.
3. Phase 3B depends on replay being a trustworthy gate; weakening or bypassing it would invalidate the product evidence model.

No evidence shows Batch B itself caused the replay failure; `play()` was not changed in the Batch B patch. The correction must determine whether the root cause is production replay-completion bookkeeping or the isolated headless test harness.

## 6. Batch B acceptance status

| ID | MASTER status | Conclusion |
| --- | --- | --- |
| B0 | PASS | Correct local Batch A base and zero-live-call isolation evidenced. |
| B1 | PASS | Channel contracts are explicitly separated and fail closed. |
| B2 | PASS | Six fixture invariants and process→knowledge separation pass deterministically. |
| B3 | PARTIAL / BLOCKED | Unit/domain local process confirmation passes; native browser save/reload check not reached. |
| B4 | PASS (scoped) | Separate UI panels and six fixture presentations evidenced. |
| B5 | BLOCKED | Full browser suite repeatedly fails at replay completion; no focused B commit created. |

**Must Fix:** R07 replay-completion reliability sufficient to complete the existing full browser suite and reach B3 browser E2E.

**User Decision Needed:** none. This is a natural Must Fix inside the already-approved Batch B acceptance boundary.

**Future Optional:** legacy DELIVERY semantic route/schema cleanup; broader replay UX redesign; new speech detectors/features. None belongs in R07 correction.

## 7. Correction policy

Use the **same Codex task and same uncommitted Batch B worktree**. Do not restart Batch B or discard the delivered changes.

The correction is narrowly limited to diagnosing and resolving R07 enough to satisfy the previously recorded replay semantics and complete B3/B5 evidence.

Do not:
- bypass replay;
- auto-mark a segment heard;
- weaken the coverage assertion merely to pass headless tests;
- change the replay policy into a skip/adaptive policy;
- add live provider calls;
- change model/provider/retention/storage schema/budget;
- add dependencies;
- broaden into general media-player redesign;
- push/merge/reset/clean/amend;
- start Phase 3B.

## 8. Correction acceptance

R07 correction is accepted only if all of the following are evidenced:

1. Reproduce/instrument the failure on the current Batch B worktree and identify whether the root cause is app playback bookkeeping, browser/test timing, or another bounded cause.
2. Apply the smallest behavior-preserving fix. If the defect is test-only, prove production replay semantics remain unchanged. If production `play()` bookkeeping is defective, fix it without weakening the requirement that the requested segment is actually played.
3. A replay must not be marked complete by seeking/jumping to the end, stale callbacks, a failed `play()`, or insufficient coverage.
4. The previously unreachable B3 browser path must execute and pass:
   - process confirmation before replay remains blocked;
   - after valid replay, one process report is persisted;
   - duplicate confirmation does not duplicate the report;
   - reload/history preserves the process report;
   - no semantic/provider dispatch and no test-ledger change.
5. Full browser regression must complete successfully on the final code. Because the issue is reliability-sensitive, require **three consecutive exact full-browser PASS runs on unchanged code**; report fresh counts for each.
6. Re-run full Node suite and focused diagnostic suite on final code; fresh counts must pass.
7. `git diff --check` passes.
8. After all checks pass, one focused local commit containing Batch B + the minimal R07 correction is permitted. No push/merge.
9. Return a new review packet with complete patch/new files, root-cause evidence, commands/results and C0–C4 mapping.

## 9. Retained owner/product decisions

Stable self-use first, portfolio second. Main scenario remains student course concepts/material.

Speech/process analysis exists to localize a concept/reasoning transition worth checking, not to score speaking ability. Process evidence alone cannot prove misunderstanding.

Retention customisation is recorded but not implemented here.

No live spend until a later concrete Phase 3B rationale, cost preflight and explicit owner permission.

## 10. Classification

Completed:
- Batch A accepted.
- Batch B architecture implementation delivered and reviewed.
- B1/B2/B4 accepted at the stated engineering/fixture scope.

Verified:
- Batch B bundle integrity (93/93 recorded hashes).
- 93/93 final Node and 14/14 focused diagnostic results.
- Six fixture expected/actual equality.
- Repeated browser replay failure on three recorded runs.
- Zero-live-call safeguards/evidence within the delivered bundle.

Unknown:
- R07 exact root cause.
- B3 native browser persistence path outcome.
- Real microphone/ASR/process-detector behavior and diagnostic value.
- Phase 3B cost/value.

Not Done:
- Batch B MASTER acceptance.
- Focused Batch B commit.
- Phase 3B.
- Retention/replay redesign.
- Push/merge/final owner acceptance.

## 11. Next smallest step

Send the canonical **Batch B Correction — REPLAY-GATE-01** trigger from HANDOFF to the same Codex task. Codex preserves the current uncommitted B work, fixes only R07, completes the blocked browser evidence, returns a correction review packet, and stops.
