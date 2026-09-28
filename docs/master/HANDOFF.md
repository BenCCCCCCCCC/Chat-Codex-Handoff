# Active Handoff — ARCHITECTURE-REVIEW-01 / PHASE 3 NOT RUN

Updated: 2026-09-28
Role: 00 MASTER
Status: **REMOTE REVIEW COMPLETE / OWNER PRIORITIES AND SAFE CONTINUATION NEXT**

Read `docs/master/CURRENT_STATE.md` on **`meta/master-state`** first. Same-named files on the feature branch are stale historical Handoff-tool documents, not current project authority.

## Product and baseline

Product: **知而能讲** — Study-first + in-app teach-back.
Repo: `BenCCCCCCCCC/Chat-Codex-Handoff`
Recorded local checkout: `F:\Chat-Codex-Handoff\validation-repo`
Feature branch: `prototype/study-teachback-v0.1`
Accepted feature HEAD, confirmed on the remote branch on 2026-09-28:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

Direct server/origin remains:
`node study-teachback-app/server.mjs`
`http://127.0.0.1:4317`

These are identity records, not an instruction to launch or reload before the retention preflight below. Local checkout, process, storage, microphone and ledger were not inspected by the remote review. Preserve unrelated work; no reset/clean/force.

## Owner request and work actually performed

The owner confirmed that the last test has not been done and the project remains at Phase 3. They requested review/optimization/refactoring of structure, workflow, rationale and necessity, and invited questions for iteration.

The review read canonical state, remote branch identity, root/app READMEs, feature-branch state, and relevant runtime/validation/test source. It identified concrete issues and proposed a bounded refactor. Only the two canonical state documents were changed. Feature code, runtime state, budgets and models were not changed. No local/browser tests and no paid calls were run.

Do not describe the refactor proposals as implemented, historical 48/48 or 29/29 as rerun, or Phase 3 as complete.

## Retained owner validation

- Phase 1 import/preview/selection: PASS, historical real-owner evidence.
- Initial Learn starter provenance correction: accepted at `f6a000c...`; historical Node48/48 and Edge29/29, zero paid calls for the correction.
- Clean Phase 2: PASS in the real owner browser. Only actual owner input appeared as the first user bubble; Tutor remained grounded in registration/badge/open-state/18:00 constraints.
- Original contaminated Phase 2 topic: evidence only, not a clean continuation target.
- Phase 3 microphone/ASR/replay: NOT EXECUTED.
- Diagnose/Repair/Apply/export-history owner journey and final acceptance: NOT DONE.

## Immediate retention preflight — do not skip

`study-teachback-app/storage.mjs` executes expiry on `openStore()`, deleting entire topics whose `createdAt` is at least seven days old. The date of a new attempt does not refresh that topic deadline.

A clean topic created on 2026-09-12 would be eligible for deletion from approximately 2026-09-19 on a subsequent open. Today is 2026-09-28. We do not know whether that topic remains in the owner's browser or has already been deleted.

Before recommending refresh/restart:
- establish whether the owner still has an open page containing the record;
- preserve available data through an existing safe export/read-only path when possible; do not invoke the application's expiry routine just to inspect it;
- do not promise recovery of a deleted record;
- if the topic is gone, use the same synthetic source to create a new clean topic and perform a minimal provenance/source check before the first Phase 3 run;
- do not silently extend retention, change origin/database identity, clear storage, or reset the ledger.

A local operator may inspect/export, but this remote review has not performed that operation. Do not claim local backup or synchronization.

## Confirmed source findings for a bounded correction

### R02 — generated Repair/Apply messages

In `app.mjs`, `teach()` stores its input as `role:'user'` unless `internalStarter:true` is passed. Initial Learn passes the flag. The `再学这一点` and `试一个新情境` handlers generate instructions but omit it. These remain fabricated user-history entries in the broader flow.

Proposed minimal correction: retain internal instructions as request context only, or introduce explicit message/action provenance without representing them as typed/spoken owner utterances. Cover initial Learn, Repair, Apply, real owner answers, and request failures. Preserve the already-passing initial Learn behavior. No patch has been applied.

### R03 — entrypoint/state contradictions

Root README describes old Handoff; app README repeats obsolete Owner Validation NOT EXECUTED; feature-branch dynamic-state copies are stale. Proposed product-first README and ref-aware state pointer. Keep only one dynamic authority on `meta/master-state`, not a new chain of suffixed snapshots.

### R04 — runtime vs historical experiments

Separate active runtime, zero-call tests, explicit live probes and historical evidence. The production ledger contains a five-call special case for `synthetic-mandarin-build01`; normal attempts use two. Isolate historical exceptions without increasing caps or rewriting ledger history. Do not blindly move hook, helper or launcher paths that are still in use.

### R05 — failed microphone startup consumes registered attempts

`/api/register` currently precedes `getUserMedia()`. Registration contributes to the 60-attempt cap even when capture does not start. Proposed transaction ordering/idempotency improvement must still enforce limits before any paid ASR request and must not clear historical reservations.

## Proposed architecture/process direction — pending iteration

Preserve the current lightweight modular approach. Organize by responsibility rather than experiment revision: browser entry/workflow/recording/replay/views; domain/source/attempt/validation; server/provider/ledger/ingestion; zero-call tests; separately gated live tools; retained evidence.

No framework rewrite, agent framework, vector store, microservices, new repository, public deployment or model upgrade is justified solely by this review. Keep origin `http://127.0.0.1:4317`, database name/schema, source/attempt/version identities and raw audio intact for an initial behavior-preserving batch.

Keep three kinds of acceptance separate:
1. engineering behavior and regression tests;
2. real owner completion of the audio/repair journey;
3. repeatable user benefit compared with ordinary assisted study.

Quote presence and valid IDs do not prove correct entailment. Existing semantic fixtures are useful but do not establish learning efficacy or market demand. Near-silence observation must not become a knowledge/fluency/personality score.

Avoid full re-audits for every ordinary UI adjustment. Use risk-proportionate review; retain stronger checks for provenance, data loss, audio meaning, money and irreversible operations. Do not bypass the current diagnosis confirmation boundary without an explicit new decision.

## Questions to settle with the owner

- Which near-term outcome has priority: repeated personal use, a demonstrable portfolio product, or initial external-user validation?
- Which concrete learning task should the first useful end-to-end scenario represent?
- What prevented Phase 3: opportunity/time, launch friction, confusing steps, low perceived benefit, privacy/cost concern, or something else?
- What replay/correction effort feels acceptable, and which learning-history retention behavior is wanted?

Do not re-ask whether in-app recording or Study-first is wanted; both are established constraints.

## Phase 3 protocol retained for later resumption

After safe preflight and an appropriate clean topic:
1. Choose `我来讲讲` and `无提示` for this bounded validation.
2. Record roughly 20–45 seconds naturally; explain why registration does not guarantee entry and mention the remaining conditions. An optional genuine self-correction may exercise withdrawn-claim handling. Do not require a memorized script.
3. Keep the tab visible during capture; hiding/muting/interruption is conservatively handled.
4. Finish and allow original-audio save plus the approved ASR request.
5. Stop at replay/transcript UI. Do not confirm diagnosis yet.
6. Replay original audio, inspect segments/timing and correct critical negation/number/condition/term errors while retaining the raw transcript separately.
7. Return the replay/transcript checkpoint to MASTER before diagnosis. A fresh safe ledger checkpoint should be read, not inferred from historical totals.

Word timing may be PARTIAL; do not fabricate precise alignment. All required segments must be replayed. Text correction is not a new spoken performance.

## Live boundary and stop conditions

Only the previously approved coherent owner journey remains in scope: `whisper-1` and `gpt-5.6-luna`; no switch, recharge or stress loop; US$5 exposure and US$10 cash ceiling. This review performed no live calls and does not add a retry allowance. ASR retry requires explicit approval after evidence review.

Stop for unsafe permission workarounds, missing/corrupt original audio, unresolved critical ASR meaning errors, lost source/attempt/version identity, repeated retry, storage/access/budget failure, or diagnosis without replay/confirmation.

## Next Smallest Step

Discuss the review findings and owner priorities, resolve record availability safely, then scope a small zero-call correction/refactor batch. Preserve the feature baseline and do not restart the project or rerun every historical gate. Phase 3 remains not run until the real owner recording is actually performed.
