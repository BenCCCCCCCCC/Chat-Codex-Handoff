# BUILD-01R3 / BUILD-01 Delivery Packet

**STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION**

Bounded engineering readiness only: no physical-owner-microphone validation, calibrated alignment or learning-efficacy claim.

Branch `prototype/study-teachback-v0.1`; before local/remote HEAD `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`. After SHA is the normal descendant commit containing this packet, also reported in final handback. Current MASTER state, HANDOFF, R3 policy, R2 recovery and original BUILD-01 contract read. Lineage/unrelated untracked files preserved.

## Timestamp policy

[OFFLINE_ASR.json](OFFLINE_ASR.json) reprocesses the fifth saved real response. Transcript + one strict segment PASS; all 22 words retained. `w14` / “土” keeps start=end=4.579999923706055 and is flagged `UNUSABLE_ZERO_DURATION`. Word timing PARTIAL; human replay required. No provider values widened/interpolated/merged/rewritten. Segment end 6.460000038146973 is within 7.31s.

Segments remain finite, in range, ordered and positive duration. Words require finite in-range nondecreasing bounds with end >= start. Zero-duration/missing word timing cannot be a precise anchor; positive-duration anchors must be contained in a validated segment. Primary product playback uses segments. All transcripts require complete replay/user confirmation before diagnosis, including negation/number/condition/term errors. This is conservative gating, not automatic detection of every ASR error.

## Feature matrix

| Scope | Implemented / engineering verification |
| --- | --- |
| Learn/source/goals | Source-versioned Tutor; live Learn/Repair/Apply condition-direction review |
| Explain | Native in-app recording, no normal upload; Edge synthetic MediaRecorder/decode |
| Original audio | Saved before ASR; denied/interrupted/decode/timeout/budget cases preserve records |
| Timestamp degradation | Exact saved response + malformed cases; raw values preserved, strict segment validity |
| Critical ASR | Node negation/number/condition/term fail-closed tests; real saved segment replay/correction in Edge |
| Content/logic | Necessary/sufficient and explicit withdrawn-claim rules; content schema excludes observation/event IDs |
| Delivery | Separate observation-only schema; real synthetic PCM candidate; live unconfirmed probe abstains; confirmed-candidate browser stub flow |
| Repair/re-record/Apply | Targeted repair; distinct partial/full identities; Apply object and answer distinct |
| Export | Every audio byte plus raw/corrected versions/reports/source compared to IndexedDB |
| Quota | Forced quota exception; memory audio export, retry-save and unsaved navigation guard |
| Delete/history | Per-attempt linked objects removed; other attempts preserved; expiry/reload/source revisions |
| Pending navigation | Busy/stale-history guards; delete-all cannot be undone by late response; unload warning |
| Owner microphone | [Walkthrough prepared](OWNER_WALKTHROUGH.md), not executed |

## Live logic results and retained failures

1. [First run](LUNA_LOGIC.json): **6/7**. Model accepted final self-correction but also marked its withdrawn earlier claim incorrect. Failure retained.
2. Explicit final-stance instruction added. [Second run](LUNA_LOGIC_REV2.json): first case **CHANNEL_LEAK**. Shared schema allowed content to emit observation; runtime guard correctly rejected it.
3. Separate content/delivery schemas implemented; guards not weakened and bad output not filtered into PASS. [Third run](LUNA_LOGIC_REV3.json): **7/7** verdicts pass. Both plant/ticket necessary-to-sufficient strengthenings rejected; self-repair only supports final stance. Learn/Repair/Apply schemas/references and actual prose reviewed: necessary-condition direction preserved. Limited concrete Apply scenario is not long-term transfer evidence.
4. [Delivery probe](DELIVERY_ENGINEERING.json): actual Luna on existing synthetic PCM/segment, explicitly without owner confirmation. Empty findings accepted as conservative abstention, NOT proof of positive real-user delivery interpretation.

Final 7/7 is bounded synthetic evidence, not statistical reliability. Historical BUILD-01 5/5 remains schema/channel evidence only. Three explicit source/schema versions and failed receipts preserved; no provider/model switch or Whisper retry.

## Tests / screenshots

- [Node final](NODE_TESTS_FINAL.txt): **33/33 PASS**, real-response/malformed timestamp regression and existing safety/budget tests; stub provider and isolated test ledgers.
- [Final Edge](browser-1789080806401.json): **21/21 PASS**, actual headless Edge, synthetic media/stub provider, saved fifth-response data/original synthetic WAV replay. No physical owner mic or live browser ASR calls.
- Historical R3 browser runs retained: 15-pass/1-fail reload null-element waiting; 19/19; 8-pass/1-fail asynchronous budget-message waiting. Reload wait was fixed. Budget wait did not reproduce in final full run; timing-sensitive automation remains a limitation.
- Actual [learning screenshot](browser-learning.png) and [saved real ASR replay screenshot](browser-real-asr.png) show synthetic/stub engineering sessions, not live AI or owner evidence.

Schema-valid is not necessarily semantically correct. Finite fixture PASS cannot guarantee future diagnoses. Physical microphone/full live journey remains the next owner validation stage.

## Ledger / data

[LEDGER_VERIFICATION.json](LEDGER_VERIFICATION.json) verifies the complete R2 event prefix unchanged and **zero new ASR reservations**. [USAGE_LEDGER.json](USAGE_LEDGER.json) is a review snapshot, never a replacement runtime ledger. Four old unsettled reservations preserved; learning-data deletion never resets budget.

R3: **19 Luna requests**, including failed results and delivery abstention; **11,328 input / 3,954 output tokens**; new conservative estimate **US$0.00757680**. Current known cost **US$0.01179245**; exposure **US$0.06859995 / US$5**. Total requests 37; reserved ASR minutes unchanged at 15. No purchase/recharge; US$10 cash ceiling unchanged; invoice unknown. Existing conservative rates remain in ledger.mjs.

No new audio sent to ASR. Only self-authored synthetic text/observations sent to Luna. No private audio/key/header/.env/runtime/profile/client files in review. Save/export/delete/expiry verified at stated local scope. Exported copies and already-sent cloud requests cannot be recalled. Responses store=false; global processing is not Australian-local processing.

## State / next step

- Completed / Verified: R3 policy, exact response regression, final bounded 7/7 after recorded fixes, Node 33 and Edge 21, export/quota/delete/navigation recovery, review bundle and walkthrough preparation.
- Not Done: owner physical-microphone walkthrough/full live journey, external learning validation, calibrated acoustic/word precision.
- Likely: segment-first replay supports this v0.1 flow with partial word timing; broader generalization unestablished.
- Unknown: future semantic reliability, real owner mic/ASR quality, invoice and broader device/storage behavior.
- Must Fix before claiming owner validation complete: execute/assess prepared walkthrough; critical unconfirmed ASR or misdiagnosis remains a stop for that result.
- User Decision Needed: owner go-ahead for the future live microphone/ASR walkthrough; no sixth synthetic retry implied.
- Future Optional: calibrated acoustic/alignment work and broader semantic/learning-effect evaluation.

[REVIEW_MANIFEST.json](REVIEW_MANIFEST.json) lists canonical Git hashes of source/readable evidence. Earlier packets/manifests remain historical. Private feature-branch fast-forward push only; no merge/release/public deployment/force push.
