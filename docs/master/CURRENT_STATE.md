# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01R RESUME REMOTE REVIEWED / PARTIAL ACCEPTED / USER DECISION NEEDED — NEW DEDICATED RUNTIME CREDENTIAL RETURNS `invalid_api_key`**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Normal flow records inside the product; no pre-record/upload requirement.

Private checkpoint sync is working. MASTER directly reviewed `prototype/study-teachback-v0.1` at remote HEAD `79988de15ca72a6e2339cb1a4437448008a02153`.

## Verified Remote Result

The recovery commit is a normal descendant of `97dddd8154b9a0ba340e8c11fc1b0f7db309e879` and records exactly one additional bounded Whisper retry using the existing 7.31-second synthetic Mandarin fixture.

Verified from the remote checkpoint:
- runtime credential fingerprint changed from old `21c4bf00e422` to new `66d86db3fb11`, so a different `OPENAI_API_KEY` value was inherited;
- the one extra `whisper-1` request returned HTTP 401;
- provider safe error classification is `invalid_request_error` / `invalid_api_key` / `param=null`;
- provider message says the supplied API key is incorrect;
- no transcript, word timestamps or segment timestamps were returned;
- no Luna call was made after the failure;
- paid calls stopped immediately;
- offline regression reports 26/26 PASS;
- known conservative cost remains US$0.00260690;
- exposure including unsettled reservations is US$0.05941440 / US$5;
- prior ledger history/reservations were preserved; no reset/relabel/recharge/provider/model switch.

This is a different blocker from the previous old-key `missing_scope` result. Current evidence no longer supports treating endpoint scope as the immediate blocker for the new runtime value. The immediate blocker is that the newly inherited credential value is not accepted as a valid OpenAI API key.

## Interpretation Boundary

`invalid_api_key` establishes that the credential string presented by the runtime was not accepted. It does **not** identify whether the cause is an incomplete/wrong copy, a revoked/deleted key, a value from the wrong account/project, stale local binding, accidental quoting/extra characters, or another credential-state problem. Do not ask for or expose the secret.

Because the full key is only safely available to the owner at creation time and must never be pasted into Chat/GitHub, the next action is an owner-side credential validity/rebinding check in the dedicated OpenAI Platform project. No further paid/model call is authorized until that check is completed.

## Logic / Product State

The necessary/sufficient-condition correction remains accepted at offline scope. Current Tutor/content instructions explicitly preserve `只有 A 才 B` as `B -> A` only and reject strengthening it to `A -> B`. The latest 26/26 offline suite includes the prior logic/safety tests plus the bounded third-submission guard. Corrected live Luna semantic quality is still Not Done.

BUILD-01 remains PARTIAL. Successful ASR/timestamps, real owner microphone flow, live delivery, remaining C-F, export/quota/per-attempt-delete/pending-navigation checks and integrated owner walkthrough are still Not Done.

## Current User Decision Needed

Owner should privately validate/recreate/rebind the **dedicated product API key** in the intended dedicated OpenAI Platform project. Do not send any secret value or screenshot containing it.

Preferred safe recovery:
1. in the dedicated `Chat-Codex-Handoff` OpenAI Platform project, confirm the intended key record still exists and has the intended permissions;
2. because a secret cannot be fully re-opened later, if there is any doubt that the locally stored value is exact, create a fresh dedicated key in that same project rather than guessing/reconstructing the previous secret;
3. bind the fresh secret only to the local server-side `OPENAI_API_KEY` user/process environment path; no committed `.env`, source, prompt or screenshot;
4. fully restart the launching runtime/terminal/Codex so the new value is inherited;
5. after restart, Codex may verify only a non-reversible short fingerprint and must not print the raw value.

After the owner confirms this private key correction, one new explicit execution authorization is required because the same synthetic fixture has consumed three Whisper submissions.

Recommended next bounded experiment after owner approval:
- first one **tiny `gpt-5.6-luna` Responses auth smoke** using the freshly rebound runtime credential; this is to avoid consuming another Whisper submission if the new key is still invalid;
- only if Luna returns 2xx, perform **exactly one additional `whisper-1` request** with the same existing 7.31-second synthetic fixture, raising only that fixture's allowance from 3 to 4;
- keep every previous reservation/event; no reset or relabel;
- if Luna fails `invalid_api_key`, stop before Whisper;
- if Luna passes and Whisper fails `missing_scope`, stop and return to permission/role diagnosis;
- if both pass, validate transcript + word/segment timestamps, run corrected live Luna logic challenges, then resume remaining BUILD-01 C-F.

## Active Boundaries

- branch: `prototype/study-teachback-v0.1`
- private feature-branch fast-forward checkpoint push remains standing-approved
- models only `whisper-1` + `gpt-5.6-luna`
- BUILD-01 total new cash <= US$10
- API exposure/reservation hard stop <= US$5
- no automatic recharge/model/provider switch
- no new dependency/local ASR/VAD
- no public hosting, merge/release, force push, external users, third-party/sensitive recordings, secret/private-client publication

## State Summary

Completed: remote recovery checkpoint reviewed; changed runtime credential confirmed; one authorized third Whisper submission executed and safely classified; 26/26 offline regression; private sync preserved.

Verified: remote SHA `79988de15ca72a6e2339cb1a4437448008a02153`; changed credential fingerprint; Whisper HTTP 401 `invalid_api_key`; no successful transcript/timestamps; ledger/cost/exposure preserved at stated scope.

Likely: the newly created/rebound credential was copied, bound, revoked, or selected incorrectly; this is a hypothesis, not yet proven.

Unknown: exact credential-state mistake; whether a freshly recreated/rebound dedicated key will authenticate; successful Mandarin ASR/timestamps; corrected live semantic fidelity; remaining C-F.

Not Done: credential recovery, valid-key smoke, fourth bounded Whisper retry, successful ASR/timestamps, live Luna logic rerun, remaining integration checks, owner walkthrough, external validation/release.

Must Fix: valid dedicated server-side API credential; no secret exposure; do not burn another Whisper submission before a tiny Luna auth smoke; no ledger reset or silent fallback.

User Decision Needed: privately correct/recreate/rebind the dedicated key, then explicitly approve one tiny Luna auth smoke plus exactly one additional same-fixture Whisper request under unchanged US$5/US$10 limits.

Future Optional: calibrated acoustic analysis, local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Next Smallest Step

**Owner privately corrects/recreates/rebinds the dedicated project key and restarts the runtime. Then authorize one tiny Luna credential smoke; only on 2xx, one fourth and final bounded Whisper retry for the existing synthetic fixture.**
