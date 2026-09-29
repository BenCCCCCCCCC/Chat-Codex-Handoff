# ACTIVE_EXCHANGE

state: WAITING_OWNER
turn_id: PHASE3B-LIVE-01-TITLE-CORRECTION
task: PHASE3B-LIVE-01
writer: CHAT_MASTER
transport_only: true
accepted_product_head: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

Root cause identified: source text was present but Topic/Title was empty.
The app returns before teach/provider dispatch when title or source is empty.
Therefore the prior Start/Learn click consumed 0 Tutor calls.

Owner action:
- enter title: 实验室访客入场规则
- click Start/Learn once
- wait for Tutor result
- do not click again while pending

Continue to WAITING_OWNER. No Codex task.