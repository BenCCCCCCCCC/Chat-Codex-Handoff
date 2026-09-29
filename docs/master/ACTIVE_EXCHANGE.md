# ACTIVE_EXCHANGE

state: WAITING_OWNER
turn_id: FILE-IMPORT-AUTO-USE-01-HOST-VERIFY
task: FILE-IMPORT-AUTO-USE-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: 89c23a155ac7c32e6357b33144edf93bd9850309

Owner must run outside Codex:

node .\study-teachback-app\run-offline-tests.mjs browser file-import-auto-use-01

Do not execute Codex work while WAITING_OWNER.
After owner reports PASS/FAIL, MASTER will write the next turn.