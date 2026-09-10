# BUILD-01R3 — Word-timestamp degradation policy + BUILD-01 resume

Date: 2026-09-11
Role: 00 MASTER
Status: AUTHORIZED WITHIN EXISTING BUILD-01 BOUNDARY / NO SIXTH WHISPER REQUEST

## 1. Trigger and reviewed evidence

MASTER directly reviewed private feature branch `prototype/study-teachback-v0.1` at remote HEAD `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`.

The fifth authorized `whisper-1 /v1/audio/transcriptions` request succeeded at HTTP transport level and its safe response fields were persisted before validation:
- request id `req_1136d20fdc6c4f00954060e20866e094`;
- transcript: `只有土壤乾燥時才給這盆植物澆水,土壤濕潤時不要澆水。`;
- 22 provider word entries;
- 1 segment, start `0`, end `6.460000038146973`, within the 7.31-second fixture;
- one word entry, zero-based index 14 (`土`), has start=end=`4.579999923706055`.

Current `normalizeASR` routes both segment and word timing through the same `spanValue` guard, which requires `end > start`; therefore the single zero-duration word makes the entire response fail `INVALID_TIME`.

The saved response is sufficient for offline policy work. **Do not make a sixth Whisper request to investigate this case.**

## 2. External/reference interpretation

Current OpenAI transcription API documentation states that `timestamp_granularities` may request `word` and/or `segment` timestamps with `verbose_json`, but it does not state that every returned word is guaranteed a strictly positive duration.

Public OpenAI Whisper discussion #2249 documents real API users observing zero/effectively-zero-duration word timestamps from `whisper-1`; discussion #1855 also notes that Whisper word timestamps are alignment-derived and are not perfectly accurate, especially around pauses. These are public implementation/community observations, not an OpenAI service guarantee.

Therefore a zero-duration provider word must not be silently widened/interpolated and must not be treated as a precise audio boundary. It also should not invalidate an otherwise usable transcript and valid segment-level time range when the product does not require exact word boundaries for its primary replay flow.

## 3. MASTER product/engineering decision

The current v0.1 product contract already permits degradation from unavailable/unreliable word-level positioning to a coarser verified replay span. The actual product UI currently replays ASR **segments** (`attempt.raw.spans`) for transcript review and evidence; it does not require individual `words[]` to drive the primary replay control.

Therefore BUILD-01R3 changes the timestamp acceptance policy as follows.

### Segment timestamps — hard validity gate

Segments remain strict:
- finite numeric start/end;
- `start >= 0`;
- `end > start`;
- end within audio duration tolerance;
- nondecreasing order;
- nonempty transcript text.

A bad segment still fails ASR timing validation because segment replay is a current product dependency.

### Word timestamps — partial-quality evidence, not all-or-nothing gate

Provider word entries must be preserved, not fabricated or silently rewritten.

For each word:
- start/end must be finite;
- `start >= 0`;
- `end >= start` is allowed;
- end must remain within audio duration tolerance;
- ordering must not go backwards.

If `end == start`, mark that word timing as **unusable / zero-duration**. Do not widen it, borrow a neighbor's boundary, merge it invisibly, or claim precise word-level playback for it.

The response may still be accepted as:
- transcript available;
- segment-level timing available;
- word timing **PARTIAL**.

Record count/IDs of unusable word timings so the degradation is visible in evidence.

### Feedback/replay consequence

- Normal transcript review and important feedback may continue to use validated segment-level spans.
- Word-level exact anchors may only be used for words with usable positive-duration timing.
- If a critical negation/number/condition/term lands on an unusable/missing word boundary, dependent negative diagnosis remains fail-closed until the user replays/validates the containing segment. Do not invent a word boundary.
- Delivery observations remain derived from the product's own audio-time measurements plus validated segment context; provider word timing is not a fluency measurement.

This is a degradation policy based on preserved real response evidence, not a blanket relaxation of all timestamp guards.

## 4. ASR status for current synthetic fixture

After implementing the policy offline against the preserved `SYNTHETIC_ASR_FIELDS.json`, the fifth response may be classified at most as:

**ASR TRANSCRIPT + SEGMENT TIMESTAMP TRANSPORT PASS / WORD TIMESTAMPS PARTIAL / HUMAN REPLAY REVIEW REQUIRED**

provided the new validator confirms:
- transcript nonempty;
- segment array valid;
- word array nonempty and globally in-range/nondecreasing;
- exactly the observed zero-duration word is flagged rather than repaired.

Do not claim calibrated word alignment accuracy from this one synthetic sample. Traditional-vs-simplified orthography in the transcript is not itself a logic error; user correction/versioning remains part of the product flow.

## 5. Authorized continuation

No new owner decision is required. This work stays inside the existing BUILD-01 product/model/provider/data/budget scope and uses already-preserved provider evidence.

Codex may now:
1. implement separate segment-vs-word timestamp validation and explicit word timing quality metadata;
2. add offline regression using the exact preserved fifth-response shape plus malformed cases;
3. **make no new Whisper request for this recovery**;
4. run the already-authorized corrected `gpt-5.6-luna` necessary/sufficient-condition semantic challenge;
5. if semantic challenge is acceptable at its stated bounded scope, resume remaining BUILD-01 C-F engineering work;
6. complete export completeness, quota recovery, per-attempt delete and pending-navigation/browser checks;
7. exercise live delivery only using actually supported audio evidence and segment-level replay fallback;
8. prepare the product for one integrated owner microphone walkthrough after engineering readiness;
9. normal fast-forward push sanitized source/evidence checkpoints to `prototype/study-teachback-v0.1`.

If a new live Whisper request becomes genuinely necessary for a new reason, stop and return a specific User Decision Needed; do not turn this policy correction into an implicit sixth retry.

## 6. Required offline timestamp cases

At minimum add/test:
- current preserved 22-word/1-segment response with one zero-duration word -> segment PASS / word PARTIAL;
- reversed word (`end < start`) -> reject;
- word outside audio duration -> reject;
- non-finite word time -> reject;
- backward word ordering -> reject;
- invalid/zero-duration segment -> reject;
- critical term with unusable word boundary -> no precise word anchor; segment replay + user confirmation required;
- no silent interpolation/merging/mutation of provider times.

## 7. Boundaries

Still approved:
- local code/commits + private feature-branch fast-forward checkpoint push;
- loopback Node + Edge + explicit product microphone for the eventual owner walkthrough;
- owner-selected low-risk single-speaker data through approved OpenAI default/global endpoints;
- models only `whisper-1` + `gpt-5.6-luna`;
- BUILD-01 new cash <= US$10; API exposure/reservation hard stop <= US$5.

Still prohibited without a new owner decision:
- sixth same-fixture Whisper retry or other extra live ASR beyond existing authorization;
- `gpt-transcribe`, another provider/model, local ASR/VAD install or new dependencies;
- ledger reset/relabel to bypass limits;
- public hosting, merge/release, force push;
- external users, third-party/sensitive audio, secrets/private-client publication.

## 8. Handback target

If the timestamp-policy regression, corrected live Luna logic challenge and remaining C-F engineering checks pass at their stated scope, highest allowed status remains:

`STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION`

This still does not establish learning efficacy, calibrated speech scoring, market demand or PTE equivalence.
