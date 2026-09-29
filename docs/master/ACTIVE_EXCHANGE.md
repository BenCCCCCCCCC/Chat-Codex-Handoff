# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: REPLAY-REVIEW-UX-01
task: REPLAY-REVIEW-UX-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: bdd0635597006881d6f8f7213122ae53ccbc99a9

## Instruction

Execute REPLAY-REVIEW-UX-01 from the latest CURRENT_STATE and HANDOFF.

Owner decision:
per-span replay should be recommended, not a hard prerequisite for content diagnosis.

Current Phase3B live experiment is complete:
- Tutor 1 used
- ASR 1 used
- content diagnosis 1 used
- retries 0
- no more live provider calls authorized

Use project-aware Astra autonomy:
- inspect current replay/transcript/process architecture;
- choose the smallest coherent UX/data-model change;
- implement/test/self-review inside scope;
- preserve the specific replay requirement for process-candidate confirmation if needed;
- do not add provider calls.

No live API, no recording, no ASR, no push/merge.

Return CODEX_TO_CHAT through this remote ACTIVE_EXCHANGE.
