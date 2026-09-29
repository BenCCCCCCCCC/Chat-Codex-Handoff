# ACTIVE_EXCHANGE

state: WAITING_OWNER
turn_id: SETUP-FLOW-01-HOST-VERIFY
task: SETUP-FLOW-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

## Status

SETUP-FLOW-01 implementation exists locally and is uncommitted.

Evidence:
- focused setup: 9/9 PASS
- full Node/offline: 123/123 PASS
- git diff --check: PASS
- live provider calls: 0
- browser inside Codex: environment-blocked before product cases

Owner must now run outside Codex:

node .\study-teachback-app\run-offline-tests.mjs browser setup-flow-01

Do not execute Codex work while state is WAITING_OWNER.

After owner reports PASS/FAIL, MASTER will write the next CHAT_TO_CODEX turn.

## Astra autonomy

Future authorized turns may iterate freely inside approved scope until acceptance passes or a stop condition triggers. Earlier fixed two-pass language is superseded.
