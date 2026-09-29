# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: SETUP-FLOW-01
task: SETUP-FLOW-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

## Instruction

Execute SETUP-FLOW-01 exactly as defined in the latest CURRENT_STATE.md and HANDOFF.md.

Owner decision:
- user must not be required to type a Topic/Title;
- source material alone is sufficient to start learning;
- title must be derived locally;
- optional setup context may include:
  - what the user wants to focus on;
  - what the user believes they already understand;
- setup context is metadata/context, not role=user conversation history and not proof of mastery.

Use Astra/Codex proactively:
- inspect current setup flow and request contracts;
- choose the smallest coherent implementation;
- reproduce the current empty-title blocker;
- implement;
- self-review;
- run zero-call tests;
- perform up to two in-scope correction passes if needed.

Do not:
- make live provider calls;
- resume Phase3B;
- add AI title generation;
- add dependencies;
- broaden onboarding;
- change model/provider/budget/retention;
- push/merge.

At completion write only this ACTIVE_EXCHANGE.md with CODEX_TO_CHAT.

If UI changes require host browser validation that cannot be trusted inside Codex sandbox, return NEEDS_HOST_VERIFY and do not create a final commit based on stale browser evidence.
