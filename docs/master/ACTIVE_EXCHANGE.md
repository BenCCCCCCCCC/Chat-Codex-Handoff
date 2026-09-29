# ACTIVE_EXCHANGE

state: WAITING_OWNER
turn_id: REPLAY-REVIEW-UX-01-HOST-VERIFY
task: REPLAY-REVIEW-UX-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: bdd0635597006881d6f8f7213122ae53ccbc99a9

## Current state

Codex/Astra implemented REPLAY-REVIEW-UX-01 locally and left changes uncommitted.

Evidence:
- focused 36/36 PASS
- full Node/offline 151/151 PASS
- browser syntax PASS
- git diff --check PASS
- zero live API / ASR / recordings
- production ledger unchanged

Codex browser attempt was environment-blocked before application cases.

## Owner action

Run outside Codex in normal Windows PowerShell:

node .\study-teachback-app\run-offline-tests.mjs browser replay-review-ux-01

Run from:
F:\Chat-Codex-Handoff\validation-repo

Do not execute Codex work while state is WAITING_OWNER.

Do not make live provider calls.

After owner reports PASS/FAIL, MASTER decides the next exchange turn.
