# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01R REMOTE REVIEWED / PARTIAL ACCEPTED / DEDICATED API PROJECT+KEY CREATED / LOCAL REBIND + ONE EXTRA WHISPER RETRY PENDING**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Normal flow records inside the product; no pre-record/upload requirement.

Private feature-branch sync is working. MASTER directly reviewed `prototype/study-teachback-v0.1` at `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`.

BUILD-01R verified that one runtime credential can call `gpt-5.6-luna` (HTTP 200) while `whisper-1` `/v1/audio/transcriptions` returns HTTP 401 `missing_scope`. The necessary/sufficient-condition defect was corrected in source and the offline suite reports 24/24 PASS. Corrected live semantic quality and successful ASR/timestamps are still Not Done.

## Owner Credential Decision

The existing BTL project key was Restricted and its visible permission editor exposed Responses Write but did not expose an Audio Transcriptions control. Rather than broadening that existing cross-project key, MASTER recommended isolating this product in a dedicated OpenAI API Project with a dedicated key. Owner now reports this setup is complete (`ok了`). No secret value was shared in Chat or committed to GitHub.

This owner action is accepted as a deliberate credential/project change for BUILD-01 recovery. It replaces the prior assumption that the old BTL key must be retained. The new key must be bound locally only through the approved `OPENAI_API_KEY` environment-variable path; never paste it into Chat/Codex prompts, source, `.env` committed files, logs, screenshots, or review evidence.

OpenAI current guidance recommends keeping API keys out of client-side code/repositories and using environment variables. The product architecture remains server-side/loopback for API calls.

## Resume Gate

Before any paid retry:
1. owner locally replaces the process/user `OPENAI_API_KEY` value with the new dedicated-project key without exposing it in shell history or Chat;
2. restart the process that launches Codex/runtime so the new environment is inherited;
3. Codex verifies only a non-reversible short fingerprint. If it still equals the old reviewed fingerprint `21c4bf00e422`, stop: the old key is still active;
4. owner authorizes exactly **one** extra request for the existing 7.31-second synthetic Mandarin Whisper fixture. This raises only that fixture's submission allowance from 2 to 3; ledger/reservations/history must not be reset.

If that Whisper retry returns 2xx, validate actual transcript + word/segment timestamps, then run the corrected bounded Luna semantic challenge and resume remaining BUILD-01 C-F. If it still returns 401/missing_scope, stop paid calls and preserve sanitized evidence.

## Cost / Boundaries

Reviewed BUILD-01R ledger:
- known conservative cost estimate: `US$0.00260690`
- exposure including unsettled reservations: `US$0.04141440 / US$5`
- BUILD-01 total new-cash ceiling: `US$10`

Still no automatic recharge/model/provider switch, ledger reset, new dependency/local ASR, public hosting, merge/release, external users, third-party/sensitive audio, or secret publication.

Models remain only `whisper-1` + `gpt-5.6-luna`. Private feature-branch checkpoint fast-forward push remains standing-approved for sanitized review evidence.

## State Summary

Completed: remote BUILD-01R review; same-process auth diagnosis; `missing_scope` classification; necessary/sufficient logic correction; 24/24 offline suite; owner created the dedicated product API project/key without sharing the secret.

Verified: remote lineage/evidence; same old runtime credential fingerprint produced Luna 200 and Whisper 401; offline logic/safety tests at stated scope.

Likely: the old key's endpoint permission was the blocker; the dedicated product key should remove that specific restricted-key scope problem, but this is not verified until the bounded retry succeeds.

Unknown: whether the local runtime has been rebound to the new key; successful Mandarin transcript/timestamps; corrected live semantic fidelity; remaining C-F behavior.

Not Done: local environment rebinding confirmation; one extra Whisper retry; corrected live semantic rerun; successful speech chain; integrated owner walkthrough; external validation/release.

Must Fix: use the new dedicated credential only through the secure server-side environment path; do not reset the ledger or silently fall back; do not treat offline 24/24 as live semantic/ASR PASS.

User Decision Needed: owner still needs to explicitly authorize the one additional same-fixture Whisper retry after local rebinding. Sending the approved resume trigger to Codex is sufficient explicit authorization.

Future Optional: calibrated acoustic analysis, local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Next Smallest Step

**Bind the new dedicated-project key to local `OPENAI_API_KEY`, restart Codex/runtime, then send the single bounded resume trigger containing explicit approval for exactly one additional Whisper retry.**
