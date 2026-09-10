# 知而能讲 — BUILD-01 partial implementation

**BUILD-01R PARTIAL / USER DECISION NEEDED: same-process Luna 200 + Whisper 401 (`missing_scope`). Paid calls stopped.**

Do not treat this checkout as ready for integrated owner validation. Stop occurred on 2026-09-11 Australia/Sydney; no fallback model/provider was used.

Native HTML/CSS/JS, Node standard library, Edge, IndexedDB, MediaRecorder and Web Audio. No package installation or build step. The product captures its own audio; there is no normal file-upload interface.

After the retained API-access blocker is resolved and work is resumed, the developer command is `node study-teachback-app/server.mjs`, using an already-configured process OPENAI_API_KEY. Open http://127.0.0.1:4317 in Edge. Users are not asked to supply API keys. Never print or include keys in review bundles. No server is left running in this handback.

## Implemented surface

Study/source dialogue, background versioned learning goals, persistent teach-back action, continuous recording with assistance levels, original Blob storage before processing, decoding/near-silence/clipping candidates, fixed Whisper timestamp transport, raw/corrected transcript separation, replay confirmation before diagnosis, separate content and delivery calls with reference/schema checks, targeted repair, new partial/full recordings, Apply, history, JSON export and deletion.

Code is partial, with bounded evidence rather than a full production claim. Word timing is provider-unverified; source-bound coarse segment playback is used. All initial transcripts require replay confirmation; this deliberately conservative gate prevents unknown ASR words from becoming automatic negative diagnosis. Voice observations are not calibrated VAD or fluency scores.

## Evidence and limits

- `node --test study-teachback-app/tests.mjs`: last observed run 18/18. Includes schema/time/source guards, channel isolation, four critical-ASR classes, sound fixtures, versions, expiry and reservation/HTTP failure behavior. These are engineering fixtures, not ASR accuracy measurements.
- `browser-tests.mjs`: 14/14 in actual Edge headless, using generated WebAudio tones and stubbed provider responses. Real MediaRecorder/decode/IndexedDB were exercised. Evidence records distinguish these from live API runs. Profile and mock ledger are isolated under runtime and excluded from Git/review.
- Historical Luna 5/5 is schema/channel evidence only, NOT accepted logic fidelity. BUILD-01R corrected necessary/sufficient-condition instructions and seven fixtures, including the explicit ticket counterexample. Updated live semantic run is NOT DONE because auth recovery requires paid calls to stop. Offline fixture-oracle tests do not prove model semantics.
- Original `live-asr-check.mjs`: one actual Whisper request, for a self-authored 7.31s synthetic Mandarin fixture produced with an already-installed Windows voice. HTTP 401; no transcription or timestamps obtained. Nothing proves ordinary Mandarin mic fidelity yet.
- `browser-learning.png` is an actual screenshot of the stub-provider engineering session, not a screenshot of live AI output.
- Export content completeness, quota recovery, individual-attempt delete, live delivery interpretation and full real-API integration still need verification. Seven-day reopening cleanup, history persistence and delete-all were verified in Edge.

## Data and budget

Browser origin stores complete topic objects with linked original audio/transcript/corrections/reports. Expiry runs on open after seven days. Delete removes local objects; exported copies and already-in-flight provider requests cannot be recalled. No cloud conversation storage: Responses uses store=false, background=false. Global API processing is not Australian-local processing.

The runtime ledger is independent of learning-data deletion and must be preserved on resume. Caps: US$5 API exposure, US$10 new cash (no recharge/purchases in app), 60 formal registrations, two ASR submissions per ID, 360 reserved audio minutes, 300 total API requests, 1M reserved input tokens and 250k reserved output tokens. Whichever cap is reached first stops requests. A crash/timeout keeps its reservation. A leftover lock/corrupt ledger fails closed; do not delete/reset it to obtain more budget.

Only whisper-1 and gpt-5.6-luna and their two fixed global endpoints are coded. Rate assumptions dated 2026-09-11 are in ledger.mjs. Costs are conservative public-rate estimates, not a provider invoice. The evidence ledger snapshot is read-only review data, not a replacement for the live runtime ledger.

## Resume blockers / unfinished work

1. Owner must inspect existing key endpoint permissions and project/organization membership: the BUILD-01R same-process diagnostic identifies `missing_scope` for `/v1/audio/transcriptions` while Luna passes. Specific missing-scope text was conservatively redacted. No credential replacement or paid retry is authorized by the diagnosis itself. The synthetic attempt has now used both permitted ASR submissions; do not reset its ledger or relabel it to evade that cap.
2. Complete successful ASR timestamp and negation/number/condition/term checks with the existing fail-closed gate, then live delivery and full journey tests.
3. Finish export/quota/individual delete and pending-navigation recovery checks. Review Tutor prose for necessary/sufficient-condition fidelity; schema validity alone does not establish semantic correctness.
4. Run the integrated owner walkthrough with the owner's explicit in-product recording action. Synthetic fixtures are not owner recordings or learning-efficacy evidence.

The original accepted branch/history and unrelated untracked files are preserved. Private feature-branch checkpoint pushes are owner-authorized. No merge, release, public hosting, external users, installed dependencies, automatic recharge or provider/model change occurred.

BUILD-01R readable evidence: [Delivery Packet](../artifacts/study-teachback/build-01r/DELIVERY_PACKET.md), [review manifest](../artifacts/study-teachback/build-01r/REVIEW_MANIFEST.json). Original BUILD-01 manifest remains a historical checkpoint manifest.
