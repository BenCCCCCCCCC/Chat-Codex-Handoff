# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: NATIVE-COLLISION-PROBE-01-PREP
task: NATIVE-COLLISION-PROBE-01-PREP
writer: CHAT_MASTER
transport_only: true
status: DISPATCHED / READ_ONLY_EVIDENCE_PREP
accepted_base_head: 20be403f7bb736ab0cde2758af7306a00c2290db

## Owner approval

Owner approved `NATIVE-COLLISION-PROBE-01`.

Resolved Phase 4 product decisions:
- normal source-set scope can be a topic/week bundle or a several-week/module bundle depending on the learner;
- whole-course/semester is not the default Phase 4 target;
- all detected source conflicts should be surfaced;
- if a conflict can change diagnosis or remediation priority, the affected judgment must wait for user arbitration rather than silently selecting a source;
- irrelevant conflicts remain visible but non-blocking;
- source roles are auto-inferred and user-correctable;
- role confirmation is not a blocking up-front step; inferred roles may be shown in a compact/expandable control and should be explicitly confirmed when a role affects conflict/priority.

## Task

Prepare the exact preserved Phase 3B comparison input for `NATIVE-COLLISION-PROBE-01`.

This is read-only evidence retrieval. It is **not** a product implementation task.

Start by reading the latest:
1. docs/master/CURRENT_STATE.md
2. docs/master/HANDOFF.md
3. docs/master/ACTIVE_EXCHANGE.md

Then verify:
- repo = F:\Chat-Codex-Handoff\validation-repo
- branch = prototype/study-teachback-v0.1
- HEAD begins from accepted local HEAD 20be403f7bb736ab0cde2758af7306a00c2290db unless a later local HEAD is documented by the current authoritative state
- tracked worktree status

Locate the preserved Phase 3B owner-validation artifacts for:
`OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`

Return, without paraphrasing:
1. exact source artifact identity/path and, if available, content/hash/receipt binding;
2. exact raw ASR transcript;
3. exact user-confirmed/corrected transcript/explanation actually used for content diagnosis;
4. exact accepted content-diagnosis result/output or structured payload used in the Phase 3B decision;
5. artifact/receipt/export paths and hashes/IDs sufficient to prove the above belong to the same preserved attempt;
6. explicit note of any field that cannot be recovered exactly.

Important:
- do not reconstruct transcript or diagnosis wording from MASTER summaries;
- distinguish raw ASR from user-confirmed/corrected text;
- do not modify product/source/test/documentation files;
- do not rerun Tutor/ASR/diagnosis;
- live provider calls = 0;
- recording = 0;
- ASR = 0;
- diagnosis calls = 0;
- do not create a product commit;
- do not push/merge.

If exact comparison inputs cannot be recovered, return `BLOCKED / EXACT_ARTIFACT_MISSING` with the missing item and searched locations.

## Return

Write `CODEX_TO_CHAT` to this ACTIVE_EXCHANGE with the exact recovered evidence and read-only verification.

No Phase 4 implementation is authorized by this task.
