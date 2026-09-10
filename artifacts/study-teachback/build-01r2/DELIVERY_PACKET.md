# BUILD-01R2 — evidence recovered, timestamp guard stopped

**PARTIAL / ASR_VALIDATION_FAILED — INVALID_TIME.**

Branch: `prototype/study-teachback-v0.1`. Before local/remote HEAD: `cb973500bafbd58fb8154835292db1e30d1c3e0b`. Current MASTER state, HANDOFF, BUILD-01R2 recovery, BUILD-01R recovery and original BUILD-01 handoff read. Runtime fingerprint matched required `deecd15c4b0b`. One normal descendant checkpoint; unrelated untracked files preserved.

Exactly one fifth whisper-1 request sent for existing 7.31-second `synthetic-mandarin-build01`, original audio hash verified. Only this fixture's submission allowance changed 4 → 5. No other model/API calls this turn, no sixth request, no guard relaxation.

HTTP **200**, request ID `req_1136d20fdc6c4f00954060e20866e094`. [WHISPER_RETRY.json](WHISPER_RETRY.json) records exact safe validation category **INVALID_TIME**. [SYNTHETIC_ASR_FIELDS.json](SYNTHETIC_ASR_FIELDS.json) was persisted through asr-evidence.mjs before normalizeASR and retains transcript, 22 word entries and one segment.

Returned text: `只有土壤乾燥時才給這盆植物澆水,土壤濕潤時不要澆水。` Text corresponds to the synthetic rule with traditional-character spelling. This is not an owner-microphone accuracy study. Segment bounds are 0–6.460000038146973 seconds, within the 7.31-second recording.

The 15th word entry (zero-based index 14), `土`, has **start=end=4.579999923706055**. Existing `spanValue` requires end > start, so this zero-duration word causes INVALID_TIME. Word array is nonempty, but full word timestamp validation fails. The saved shape allows offline investigation without another paid request. No times were invented, extended, discarded or merged to force PASS. Authentication remains recovered; no credential action indicated by this result.

## Verification / remaining scope

28/28 offline regression tests PASS; [NODE_TESTS.txt](NODE_TESTS.txt). Updated allowance regression permits exactly five reservations for this one ID, rejects sixth, preserves prior events, and keeps ordinary/similar IDs at two. Provider calls in offline tests are stubs and their ledgers are isolated. Existing normalization guards unchanged.

Completed / Verified: successful response evidence capture before validation, exact local failure category, original fixture identity, preserved historical ledger prefix, fifth-only allowance and tests.

Not Done: full ASR timestamp PASS, corrected bounded Luna logic challenge (not run because of required validation stop), remaining BUILD-01 C–F and owner walkthrough. No new browser screenshot, physical microphone test or data deletion behavior change. Historical Edge and Luna receipts retain their prior scope; no new logic fidelity claim.

Unknown: perceptual accuracy of individual word boundaries and corrected live Luna semantics. This fifth response establishes its own exact failure; it does not reconstruct the lost fourth response.

Must Fix / User Decision Needed: review the preserved zero-duration word and decide any subsequent handling policy offline. Current strict guard remains in force. No further paid retry or validation-policy change is implied by this handback. No additional credentials/provider/model/dependency needed to inspect saved evidence.

Future Optional: broader alignment/acoustic/learning calibration after the bounded pipeline is resolved.

## Budget / data

Known conservative cost **US$0.00421565**; exposure **US$0.06102315 / US$5**. This successful request adds estimated US$0.0008. Totals: 18 requests, 15 reserved audio minutes, one attempt, four existing unsettled reservations unchanged. Original historical events verified unchanged prefix. No reset/release/relabel; no purchases/recharge; US$10 cash ceiling unchanged. Invoice unknown. [USAGE_LEDGER.json](USAGE_LEDGER.json) is a review snapshot, not a replacement ledger.

Only existing synthetic audio sent. No key/header/.env, raw audio, runtime/profile or private-client files committed. Normal private same-branch fast-forward push only; no merge/release/public deploy/force push. [REVIEW_MANIFEST.json](REVIEW_MANIFEST.json) provides canonical Git blob hashes for the readable source/evidence whitelist. Previous manifests remain historical.
