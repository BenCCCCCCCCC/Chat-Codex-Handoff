# Active Handoff — PHASE3B-LIVE-01 Proposal

Updated: 2026-09-28
Role: 00 MASTER
Status: **READY FOR OWNER DECISION / NOT AUTHORIZED / NOT STARTED**

## 0. Binding

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Accepted HEAD:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Canonical authority:
`meta/master-state/docs/master/CURRENT_STATE.md`
and
`meta/master-state/docs/master/HANDOFF.md`.

Do not execute this task unless the owner explicitly authorizes it after reading the cost/request proposal.

## 1. Experiment purpose

One real owner recording is intended to answer only:
- whether real capture/original-audio/ASR/replay works;
- whether critical Mandarin transcript meaning survives or can be safely corrected;
- whether local speech-process evidence co-locates with a useful reasoning transition;
- whether combined content + process localization is useful to the owner;
- whether replay burden is tolerable.

It does not prove learning efficacy or market demand.

## 2. Authorized scope if owner says yes

Source:
use a **new clean topic** with the same bounded synthetic laboratory-visitor-rules material. Do not inspect/recover the old expirable topic.

Owner speech:
- one 20–45 second natural Mandarin explanation;
- no prompt assistance;
- explain why registration is not sufficient for entry and include relevant additional conditions;
- natural self-correction allowed.

Provider-call ceiling:
- exactly one ASR submission;
- exactly one content-diagnosis semantic request after transcript review;
- at most one initial Tutor/Learn semantic request **only if normal fresh-topic UI requires it to reach recording**;
- zero Repair/Apply calls;
- zero automatic retries.

Total maximum provider calls = **3**.
Minimum expected provider calls = **2**.

## 3. Cost boundary

One ASR reservation under current ledger = US$0.018 exposure.

One maximum semantic reservation = US$0.00816.

Therefore:
- ASR + diagnosis <= US$0.02616 incremental local exposure;
- ASR + optional Tutor + diagnosis <= **US$0.03432** incremental local exposure.

No retry is authorized.

The current official `whisper-1` list price is US$0.006/minute; `gpt-5.6-luna` standard prices are US$0.20/M input, US$1.20/M output and US$0.25/M cache-write input. A conservative provider-billing estimate for one full ASR minute plus two max-sized semantic requests is <= ~US$0.02232, excluding account-specific billing effects.

Cost estimate is not account balance.

## 4. Model decision for this experiment

Keep `whisper-1` for this single experiment because the validated application currently requires word/segment timestamps and current OpenAI guidance still directs timestamp-dependent file transcription to `whisper-1`.

Do not interpret this as long-term approval. `whisper-1` is deprecated and scheduled for removal on 2027-02-26. After Phase 3B, perform a separate migration/timing decision before long-term/public use.

Keep `gpt-5.6-luna` for semantic requests; no model change is needed for this bounded experiment.

## 5. Execution checkpoints if authorized

### L0 — pre-live identity
Confirm:
- HEAD = `dd8317b...`;
- tracked clean;
- ledger lock absent;
- ledger SHA/exposure still consistent with the preflight or report any harmless drift before provider use.

No old-topic inspection.

### L1 — clean topic / optional Tutor
Create a new clean topic from the same synthetic source.

Source import/paste is local.

If and only if the normal UI requires Tutor/Learn to reach recording, allow **one** Tutor semantic request. Otherwise skip it.

If this request fails: STOP. No retry.

### L2 — one physical recording + ASR
Use `无提示`.

Record one natural 20–45 second Mandarin explanation.

Preserve original audio.

Submit exactly **one** ASR request.

If ASR/provider/ledger fails: STOP. No retry.

### L3 — mandatory replay/transcript checkpoint
Before any content diagnosis:
- replay the saved audio through the validated replay path;
- compare audio with raw ASR transcript;
- inspect critical negations, numbers, conditions and domain terms;
- correct only ASR mishearing;
- preserve raw and corrected transcript versions;
- do not turn a genuine spoken mistake into a corrected performance.

If critical transcript uncertainty remains, STOP and return checkpoint evidence to MASTER before diagnosis.

### L4 — one content diagnosis
If transcript review is acceptable, allow exactly one `gpt-5.6-luna` content-diagnosis request.

Local process evidence confirmation remains zero semantic/provider dispatch.

Inspect:
- 内容理解;
- 讲解过程;
- diagnostic target / focused next action;
- whether process evidence is genuinely useful vs decorative;
- whether any process-only signal creates a false knowledge judgment.

No Repair/Apply provider call.

### L5 — return evidence and stop
Return:
- provider calls actually made;
- ledger before/after SHA/summary;
- original-audio save status;
- raw/corrected transcript checkpoint;
- critical ASR errors/corrections;
- content findings;
- process evidence;
- diagnostic target;
- owner judgment: useful / not useful / mixed and why;
- replay burden/friction;
- any false inference;
- Unknown / Blocking / Future Optional.

Do not continue into a second recording.

## 6. Stop rules

STOP with no retry for:
- provider 401/403/404/model-access failure;
- provider/network failure;
- ASR unusable transcript;
- missing/corrupt original audio;
- replay cannot complete;
- source/attempt/version identity loss;
- unexpected extra provider dispatch;
- ledger/budget error;
- app requests a Repair/Apply or second ASR;
- old owner-data risk.

## 7. Explicit authorization requirement

Do not execute unless owner gives an unambiguous authorization such as:

`Authorize PHASE3B-LIVE-01 under the 3-call maximum, zero-retry, US$0.03432 local-exposure limit.`

If owner does not authorize, remain stopped.

## 8. Classification

Ready:
- bounded live experiment.

Not Authorized:
- all live provider and microphone actions.

Next step:
owner decision only.
