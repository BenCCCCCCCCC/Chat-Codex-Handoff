# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01 / R3 REMOTE REVIEWED — ENGINEERING READINESS PASS WITH ONE MUST FIX / BUILD-01R4 AUTHORIZED BEFORE OWNER VALIDATION**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`.

MASTER directly reviewed private `prototype/study-teachback-v0.1` at `4e57edfb57495cddd0870029782b987dc7502800`.

Most R3 evidence is accepted at its stated scope: Node 33/33, Edge 21/21, saved real ASR transcript + strict segment timing with word timing PARTIAL, corrected necessary/sufficient verdicts, lifecycle recovery and readable private review evidence.

However final owner-walkthrough entry is temporarily held by one concrete known defect found during MASTER review. Active narrow contract:

`docs/research/strategy-reset-01/BUILD_01R4_FEEDBACK_ACTION_GATING.md`

`OWNER-VALIDATION-01` remains prepared but **NOT YET OPEN**.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R4_FEEDBACK_ACTION_GATING.md` — active Must Fix
4. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — prepared, gated on R4 PASS
5. `docs/research/strategy-reset-01/BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md`
6. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`

## Accepted R3 evidence

Verified from remote source/evidence:
- Node final **33/33 PASS**;
- Edge final **21/21 PASS** at stated synthetic/stub browser scope;
- real fifth Whisper response reprocessed with no additional ASR request: transcript + strict segment timing PASS, all 22 word entries preserved, zero-duration provider word retained and marked unusable; word timing PARTIAL;
- critical unusable/missing word timing falls back to validated segment replay + user confirmation;
- content and delivery schemas are separated;
- corrected live Luna verdict challenge reaches **7/7** after earlier 6/7 and CHANNEL_LEAK failures were preserved and fixed rather than hidden;
- export, quota recovery, per-attempt deletion, pending-navigation/stale-result protections and history/expiry paths passed final engineering checks;
- R3 made **zero new Whisper requests**;
- review manifest excluded-path/static-credential scan PASS.

Latest reviewed ledger estimate: known cost **US$0.01179245**, exposure **US$0.06859995 / US$5**, four historical unsettled reservations preserved, no recharge/reset/relabel.

## Must Fix — feedback action correctness

Direct review of retained `LUNA_LOGIC_REV3.json` found the `self_repair` case contains a correct `supported` finding whose `repair` field is literally:

`". ."`

The verdict is correct, but this is not meaningful remediation guidance.

Current `renderFeedback(...)` renders both `再学这一点` and `再讲这一点` for **every finding**, including `supported`, and passes `f.repair` into the next repair/re-record focus. Therefore this retained live output could create an incoherent user-facing action path.

This is a known product defect already visible before owner validation. Under the project rule “test owner experience only after coherent functionality”, the owner should not be asked to rediscover it manually.

## BUILD-01R4 — authorized within existing scope

No new owner decision is needed. No new Whisper request is allowed/needed.

R4 must:
- hide remediation actions for `supported` findings;
- define which finding statuses may expose targeted remediation;
- fail closed on punctuation-only/empty-equivalent repair text when an action is actually exposed;
- preserve valid repair flow for `missing/incorrect/actionable unknown`;
- keep delivery observations separate from knowledge remediation;
- regress against the retained real Luna `supported + repair=". ."` evidence and malformed repair cases;
- rerun Node/Edge suites;
- fast-forward push sanitized evidence to the same private branch.

Do not rewrite the historical 7/7 receipt. It remains useful verdict evidence and also evidence of why action gating is needed.

## Timestamp / ASR policy — unchanged

Segments remain strict hard evidence: finite, ordered, in range and positive duration.

Word timing remains auxiliary/partial evidence: finite, ordered, in range, `end >= start`; zero-duration words are preserved and marked unusable, never interpolated/widened/merged.

Current classification remains:
**ASR TRANSCRIPT + SEGMENT TIMESTAMP TRANSPORT PASS / WORD TIMESTAMPS PARTIAL / HUMAN REPLAY REVIEW REQUIRED**.

## Owner validation status

`OWNER-VALIDATION-01` is prepared but must wait for R4 PASS.

No owner microphone action should begin yet. After R4 passes and MASTER reviews the new checkpoint, owner approval will open one bounded integrated microphone walkthrough.

## State Summary

Completed: R3 implementation/evidence package; timestamp degradation policy; corrected bounded Luna verdict logic; lifecycle/browser engineering checks; owner-validation protocol preparation.

Verified: remote `4e57edfb57495cddd0870029782b987dc7502800`, Node 33/33, Edge 21/21, corrected Luna verdict 7/7 at bounded synthetic scope, segment PASS / word timing PARTIAL, known user-facing repair-action defect.

Likely: R4 is a small local product-correctness fix; no provider/model/ASR work should be necessary.

Unknown: owner-mic end-to-end behavior remains untested.

Not Done: R4 fix/regression, then integrated owner walkthrough and post-walkthrough MASTER acceptance.

Must Fix: supported findings must not expose meaningless remediation; actionable statuses must fail closed on meaningless repair text.

User Decision Needed: **none for R4**. Owner approval will be requested only after R4 passes.

Future Optional: broader feedback-copy calibration, device coverage, calibrated acoustics/alignment, external learner study and learning-effect evaluation.

## Next Smallest Step

**Codex executes BUILD-01R4 from `4e57edfb...` without new Whisper calls, pushes the fixed checkpoint, and MASTER rechecks only this feedback-action delta plus regressions before opening OWNER-VALIDATION-01.**