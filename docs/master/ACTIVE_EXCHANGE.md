# ACTIVE_EXCHANGE

state: WAITING_OWNER
turn_id: CORRECTNESS-BOUNDARIES-01-HOST-BROWSER-VERIFY
task: BATCH-C-HOST-BROWSER-VERIFY-01
writer: CHAT_MASTER
transport_only: true
accepted_product_base_head: dd8317b43100b8cbaad684cab7fc02957e32de62

## Status

Do not execute or repeat CORRECTNESS-BOUNDARIES-01.

Batch C currently has:
- focused correctness boundaries: 11/11 PASS
- full isolated Node/offline: 114/114 PASS
- git diff --check: PASS
- live provider calls: 0
- no Batch C commit yet

The remaining evidence is one browser regression outside the Codex Windows sandbox.

Owner will run from a normal Windows PowerShell:

node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01

After the owner reports PASS/FAIL to MASTER, MASTER will replace this file with a new CHAT_TO_CODEX turn.

## Operating rule

In future authorized turns Codex may analyze, recommend, self-review, test and perform bounded in-scope self-correction as defined in the latest CURRENT_STATE/HANDOFF.

WAITING_OWNER is not execution authorization.


## Correction

Previous owner attempt did not execute tests because MASTER supplied an invalid batch name.

Use exactly:
`node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01`

Remain in WAITING_OWNER until MASTER receives the real PASS/FAIL result.


## Owner host browser run started

Owner executed the corrected command successfully from normal Windows PowerShell:

node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01

The runner accepted the batch and created output under:
artifacts/study-teachback/correctness-boundaries-01/browser-1790650146813-0XtnC0

No PASS/FAIL result has been reported yet.

Remain in WAITING_OWNER. Do not execute Codex work until MASTER receives the final host-browser result.
