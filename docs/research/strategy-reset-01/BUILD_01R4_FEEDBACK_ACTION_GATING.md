# BUILD-01R4 — Feedback action gating before owner validation

Date: 2026-09-11
Role: 00 MASTER
Status: AUTHORIZED WITHIN EXISTING BUILD-01 / MUST FIX BEFORE OWNER WALKTHROUGH

## 1. Trigger

MASTER reviewed remote `prototype/study-teachback-v0.1` at `4e57edfb57495cddd0870029782b987dc7502800`.

Most R3 engineering evidence is accepted at its stated scope: Node 33/33, Edge 21/21, transcript+segment ASR evidence with word timing PARTIAL, corrected necessary/sufficient verdicts, lifecycle recovery and private review bundle.

However direct review of `LUNA_LOGIC_REV3.json` found one retained live output in the `self_repair` case where a `supported` finding has:

`repair: ". ."`

The final verdict itself is correct, but this is not meaningful repair guidance.

Current `renderFeedback(...)` renders `再学这一点` and `再讲这一点` actions for **every** finding, including `supported`. Both actions pass `f.repair` into the next Tutor/re-record focus. Therefore the retained `". ."` value is potentially user-visible/actionable and can create an incoherent repair path.

This is a known product defect already visible in synthetic evidence. The owner should not be asked to discover it during integrated validation.

## 2. MASTER decision

Engineering readiness is **PASS WITH ONE MUST FIX**, not yet owner-walkthrough entry.

Product rule:
- `supported` findings are evidence of what the learner already expressed correctly; they should not expose targeted `再学这一点` / `再讲这一点` remediation actions by default.
- remediation actions belong to `missing`, `incorrect`, or actionable `unknown` findings.
- `observation` delivery findings may keep only actions appropriate to confirmed delivery evidence; do not route a meaningless repair string into Tutor/re-record.
- runtime must not accept punctuation-only/empty-equivalent repair guidance for findings that actually expose a remediation action.

Do not alter past evidence or relabel the retained live 7/7 verdict run. Keep the `". ."` output as proof of why the UI/runtime guard is needed.

## 3. Allowed fix

No new Whisper request. No provider/model/dependency change.

Codex may:
1. update feedback rendering so `supported` findings do not show remediation buttons;
2. define the exact set of statuses that expose `再学这一点` / `再讲这一点`;
3. add a runtime guard for remediation text used by those actions so punctuation-only values such as `". ."` fail closed rather than becoming Tutor focus;
4. ensure `missing/incorrect/unknown` remediation remains source/attempt/version-bound and does not fabricate audio spans;
5. ensure delivery observations remain separate from knowledge remediation and do not become a knowledge-deficit route;
6. add offline regression using the retained real Luna self-repair output plus malformed repair cases;
7. rerun Node and Edge engineering suites.

A new live Luna call is **not required** merely to fix this known presentation/action defect. If Codex believes a live call is genuinely required, stop and return to MASTER rather than spending automatically.

## 4. Acceptance gate

BUILD-01R4 passes when:
- retained `supported + repair=". ."` fixture renders as correct evidence with **no remediation action**;
- `incorrect/missing/actionable unknown` with punctuation-only repair is rejected/fails closed;
- valid actionable repair still routes correctly to targeted reteaching and partial/full re-explanation;
- content/delivery channel separation remains intact;
- no new Whisper call;
- final Node/Edge suites pass with readable evidence;
- sanitized checkpoint is fast-forward pushed to the same private feature branch.

After R4 passes, MASTER may restore:

`STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION`

and then request owner approval for `OWNER-VALIDATION-01`.

## 5. Boundaries

Keep:
- branch `prototype/study-teachback-v0.1`;
- models only `whisper-1` + `gpt-5.6-luna`;
- no new live call required for R4;
- US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling;
- no ledger reset/relabel;
- no merge/release/public deploy/force push;
- no external users or owner microphone yet.

## 6. State classification

Completed: R3 engineering implementation and evidence review except owner validation.

Verified: the retained live self-repair output contains one punctuation-only `repair` value while the current UI exposes remediation actions for every finding.

Must Fix: gate remediation actions by finding status and fail closed on meaningless repair text when an action is exposed.

Not Done: R4 regression, then owner walkthrough.

User Decision Needed: none for R4; this is within the already-approved product correctness scope.

Future Optional: broader feedback-copy quality calibration after owner validation.