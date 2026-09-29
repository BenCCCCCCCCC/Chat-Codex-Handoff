# Active Handoff — FILE-IMPORT-AUTO-USE-01 FINALIZE

Status: DISPATCHED THROUGH ACTIVE_EXCHANGE

Host browser verification outside Codex sandbox: PASS.

Before final commit Astra must:
- inspect the latest host browser receipt for file-import-auto-use-01 and report exact PASS count / exit / source hashes
- verify no source/test drift after host run
- independently self-review the file-import-auto-use diff
- inspect browser-test media/fixture paths to determine whether the owner-heard moist-soil/watering Chinese audio came from intentional synthetic replay media

If the audio is traceable to a synthetic fixture used by the browser suite, classify it as expected test-environment playback and do not change product behavior.
If it is not traceable, report it as Unknown/Future investigation; do not speculate or modify product audio behavior without evidence.

If no post-host source/test change is needed:
- stage only FILE-IMPORT-AUTO-USE-01 files
- git diff --check
- create one focused local commit
- no push/merge
- return full CODEX_TO_CHAT receipt via remote ACTIVE_EXCHANGE

If any source/test change is made after host PASS, return NEEDS_HOST_REVERIFY instead of relying on stale host evidence.