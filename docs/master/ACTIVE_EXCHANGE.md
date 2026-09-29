# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: FILE-IMPORT-AUTO-USE-01-FINALIZE
task: FILE-IMPORT-AUTO-USE-01-FINALIZE
writer: CODEX
transport_only: true
accepted_base_head: 89c23a155ac7c32e6357b33144edf93bd9850309
result: COMPLETE

## Local finalization

Base: 89c23a155ac7c32e6357b33144edf93bd9850309
Final local HEAD: ac875a100b159781037746ea0b8bd2188457d13a
Branch: prototype/study-teachback-v0.1
Commit: fix: auto-use small imported learning materials
Exactly four files, 45 insertions / 4 deletions:
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/file-import-auto-use.test.mjs

Final tracked worktree/index CLEAN. Existing unrelated untracked files and artifacts preserved.
No post-host product/test edits. No product push/merge, no Phase3B.

Authority read through GitHub:
- ACTIVE_EXCHANGE incoming blob 36360c3ef72bfa387237d71205226c3db6aac0cc.
- HANDOFF blob 6f4c211959c659fb5658aa0fa26ffd7ce3e997ff.
- CURRENT_STATE blob a32f9f62d78ff54449f0b216065d93efff1194ea.

## Evidence and review

Directly inspected latest host artifact:
artifacts/study-teachback/file-import-auto-use-01/browser-1790667633028-nTLkuH
receipt.json exit=0.
browser-1790667633180.json: exactly 50 cases, 50 PASS, 0 FAIL; liveAPI=false, physicalMicrophone=false.
All 52 sourceSHA256 entries match current files before staging, before commit and after commit.
Staged paths exactly matched the four listed above; index contents matched the tested worktree with Git EOL normalization.
git diff --check and git diff --cached --check PASS.

Existing focused evidence: 8/8 PASS, import-1790666547107-RSldRU.
Existing full Node/offline evidence: 131/131 PASS, node-1790666547461-hQb29f.
No tests rerun this finalization; no source changes required.

Independently reviewed full tracked diff and new test file. No blocking finding:
- Successful extraction of normalized full text <=5000 reuses existing useImported(true), updates source/title/count and retains preview.
- >5000 keeps full preview and existing source, explicitly requests a selected subsection and never truncates/chunks.
- Manual subset override and clear-preview behavior preserved; clearing source still fails closed.
- Direct paste, filename title, setupContext and role=user provenance remain intact.
- No added provider dispatch, model/dependency/schema/retention/budget change.

## Audible Chinese phrase investigation — EXPECTED TEST-FIXTURE PLAYBACK

Traceable fixture:
study-teachback-app/runtime/synthetic-mandarin-v2.wav
SHA256: 7e291bc01d614dfb34068ab3d2d9f4d1217f329ba14b6e4fdb7cea919aba6206
Duration: 7.31 seconds.

Evidence chain:
1. study-teachback-app/synthetic-speech.ps1 lines 1-13 identifies engineering-only synthetic audio, selects installed Microsoft Huihui Desktop voice, writes this WAV and speaks:
   只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。
2. Current WAV hash matches fixtureSha256 in artifacts/study-teachback/build-01r2/WHISPER_RETRY.json. Archived SYNTHETIC_ASR_FIELDS.json transcribes the same sentence. The historical provider run is archived evidence; no provider call was made in this investigation.
3. browser-tests-r4.mjs lines 17-18 reads the archived ASR and the WAV. Lines 285-288 insert the WAV as an IndexedDB attempt audio Blob and intentionally click transcript replay in the case "saved real ASR PARTIAL words replay through validated segment before diagnosis".
4. The current host replay-snapshots.json records playing/play-resolved for that case (duration 7.31), then genuine-coverage of segment 0..6.460000038146973, with blobMatches=true and attemptMatches=true. The following B3 process case also replays a region of that same fixture.

Conclusion: the moist-soil/watering Chinese speech has a verified intentional synthetic replay path in this browser suite. Classify as expected test-environment playback, not newly generated product speech. The phrase owner heard is approximate; no recording of the owner's acoustic event was supplied, so exact audible timing cannot be independently matched. No product audio behavior was changed; fixture generation and live ASR helpers were not executed.

## Safety and remaining status

Production ledger before/after host and after local commit unchanged:
d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525
Live provider calls 0; physical microphone use 0; incremental exposure 0.
Browser host evidence uses synthetic media and stubbed provider; full Node's deliberate outbound negative probe was blocked before I/O.

Blocking: none for this finalization.
Tests Not Run: live provider/ASR/Phase3B; no new browser run needed for unchanged host-tested source.
Unknown: exact timing of owner-heard sound, since no owner recording supplied; fixture replay origin itself is supported by source, hash and host playback logs.
User Decision Needed: MASTER acceptance and separately controlled next live checkpoint.
Future Optional: none added; do not change product audio behavior on this evidence.

Only remote docs/master/ACTIVE_EXCHANGE.md is written as authorized transport. CURRENT_STATE/HANDOFF untouched. Read back the resulting commit and verify exact receipt, state/turn and sole meta path before reporting relay success.
