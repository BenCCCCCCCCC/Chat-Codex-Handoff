# Active Handoff — OWNER-VALIDATION-01 PREPARED

Updated: 2026-09-12
Role: 00 MASTER
Status: **OWNER-VALIDATION-01 PREPARED / READY TO EXECUTE / NOT YET EXECUTED**

## Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current remote feature HEAD verified by MASTER:
`912bce6542eef4fe813f32fe4e160acd97ca2d71`

Canonical read order:
1. `docs/master/CURRENT_STATE.md`
2. this file
3. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md`

The older OWNER_VALIDATION document records the original approved protocol and historical engineering entry gate. This handoff supersedes its old checkpoint number for execution; use the current feature HEAD/normal descendants above.

## What is already accepted

- UI-UX-FOUNDATION-01R2 accepted at engineering/UI scope.
- SOURCE-INGESTION portability accepted.
- R3/R4 ASR/evidence/remediation guards accepted.
- local launcher accepted at engineering scope, but its Explorer/default-browser/interactive-console lifecycle remains unverified.
- lifecycle diagnosis is closed as INCONCLUSIVE; no launcher defect was proven.
- bootstrap preflight is closed; no new setup/installer work is authorized.

Owner Validation remains the next real product gate.

## Important execution choice

Do **not** make launcher UX part of OWNER-VALIDATION-01.

For this run Codex should start the existing server directly:

`node study-teachback-app/server.mjs`

Use the unchanged product origin:

`http://127.0.0.1:4317`

This isolates the real learning/file/microphone journey from the still-unverified Explorer/default-browser/control-console launcher interaction.

## Codex preparation task

Codex prepares runtime only. The owner performs file selection and microphone actions.

Before returning READY:
1. verify repo, branch, remote HEAD lineage and worktree; preserve unrelated work;
2. verify HEAD equals or normally descends from `912bce...`;
3. verify the existing repo-owned extractor runtime and pinned pypdf 6.18.0 without reinstalling a valid environment;
4. verify existing model-access configuration is available without exposing or rewriting it;
5. record a safe current usage-ledger summary;
6. confirm port 4317 has no unknown conflicting listener;
7. start only the existing Node server directly;
8. confirm GET-only readiness/product identity with no Tutor/ASR/model request;
9. keep the server available and return exactly the compact readiness receipt below;
10. then wait for the owner. Do not simulate owner interaction.

Return:

```text
OWNER_VALIDATION_READY
URL: http://127.0.0.1:4317
Branch: <actual branch>
HEAD: <actual sha>
Worktree: <safe summary>
Extractor: <safe readiness summary>
Server: <direct server / readiness summary>
Known cost/exposure: <safe live ledger summary>
Owner Validation: READY / NOT YET EXECUTED
```

Do not push a preparation-only commit unless an actual documentation/evidence correction is necessary.

## Test source

Use one owner-controlled low-risk supported file.

Preferred if already locally available:
`OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`

The fixture is intentionally simple and contains a necessary-vs-sufficient condition relation useful for checking Tutor/diagnosis behavior. If it is not available, the owner may use another low-risk DOCX/PDF/PPTX/MD/TXT whose meaning they can verify personally.

Do not use sensitive/private-client material.

## Owner walkthrough — one coherent journey

1. Open the URL manually.
2. Choose the low-risk file and verify the displayed filename/extraction state.
3. Review the extraction preview. Check critical meaning/order rather than cosmetic whitespace.
4. Select a coherent section <=5,000 characters. Import/preview alone must create no model request.
5. Start Learn; ask at least one normal Tutor question.
6. Click `我来讲讲`; record roughly 20–45 seconds naturally. Include a condition relation and, if it happens naturally, a self-correction. Do not read a polished script.
7. Confirm original audio is playable and retained.
8. Inspect raw transcript/timing notice; fully replay each validated segment. Correct critical negation/number/condition/term errors before confirming text reliability.
9. Inspect diagnosis and evidence links. Check final corrected stance, withdrawn-claim handling, missing-content timestamp behavior and remediation gating.
10. Delivery findings may be empty. Any near-silence candidate needs replay confirmation before interpretation.
11. Use targeted reteaching only if a real actionable gap exists. At most one re-explanation attempt is allowed; the original attempt must remain preserved.
12. Use Apply once. It must be related but new, not merely the same repair task, and must not claim long-term mastery.
13. Export locally; inspect selected source, audio, raw/corrected transcript versions and reports. Review history/source versions. Do not delete evidence yet.
14. Tell MASTER that the walkthrough completed and report visible friction/failures. No raw file/audio upload to Chat is required.

## Live-call boundary

This owner validation authorizes only the already-approved live models (`whisper-1` + `gpt-5.6-luna`) for one coherent owner journey and, only if naturally warranted, one targeted re-explanation.

Keep the existing US$5 exposure hard stop and US$10 cash ceiling. No stress testing, retry loop, provider/model switch or recharge.

## Stop conditions

Stop and return to MASTER if:
- raw imported file is unexpectedly transmitted or persisted contrary to contract;
- extraction silently changes critical meaning without understandable preview;
- extractor/runtime guard fails;
- critical ASR meaning error cannot be safely corrected;
- diagnosis materially contradicts confirmed source/transcript;
- source/audio/span evidence is fabricated or misattached;
- remediation gating regresses;
- repeated API retry becomes necessary;
- budget/access/storage guard fails;
- original audio/source/attempt/version identity is lost or corrupted.

Minor copy/layout friction is logged but is not automatically blocking.

## After owner completion

When the owner reports completion, Codex should:
1. stop only the server/process it prepared for this walkthrough;
2. collect sanitized step-level PASS/FAIL/UNKNOWN and safe model/request/cost metadata;
3. never commit raw owner file/audio or local environment/private browser data;
4. normal fast-forward push only the named private feature branch if tracked validation evidence is added;
5. return exact remote SHA, safe ledger before/after, walkthrough summary and unresolved items.

MASTER then reviews only the new owner-validation delta/evidence.

Possible outcomes:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`
- `OWNER VALIDATION PASS WITH MUST FIX`
- `OWNER VALIDATION BLOCKED`

No merge/release/external-user action follows automatically.

## Classification

Completed: current engineering/UI/ingestion/ASR/storage/budget readiness and validation preparation.

Verified: current remote HEAD `912bce...`; direct-server validation path does not depend on unverified launcher interaction.

Unknown: real owner file extraction quality, physical-microphone/ASR/semantic behavior, latency/friction and learning usefulness.

Not Done: actual OWNER-VALIDATION-01 and MASTER post-run acceptance.

Must Fix: none known before execution.

User Decision Needed: none to run this already-approved bounded validation.

Future Optional: manual launcher UX smoke and distribution/bootstrap work only after this gate or a separate owner decision.

## Next Smallest Step

**Codex performs preparation only and returns `OWNER_VALIDATION_READY`. Owner then executes one bounded file + microphone walkthrough.**
