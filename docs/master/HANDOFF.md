# Active Handoff — FILE-IMPORT-AUTO-USE-01 HOST VERIFY

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / OUTSIDE CODEX SANDBOX / ZERO LIVE API

Current evidence:
- focused import tests 8/8 PASS
- full Node/offline 131/131 PASS
- git diff --check PASS
- live provider calls 0
- product changes uncommitted

Owner host command:

Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\run-offline-tests.mjs browser file-import-auto-use-01

Expected browser behavior:
- small parsed file auto-populates the actual learning source
- filename title is present
- source count updates
- preview stays available
- manual subset override still works
- >5000 extracted text is not silently truncated/auto-used
- prior setup/provenance/browser regressions remain green

Return PASS/FAIL and final count to MASTER.

Do not resume Phase3B yet.