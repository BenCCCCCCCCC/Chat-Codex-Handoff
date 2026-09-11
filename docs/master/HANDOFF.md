# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**OWNER-VALIDATION-01 APPROVED / ACTIVE — START THE SINGLE INTEGRATED OWNER MICROPHONE WALKTHROUGH**

Active product flow:

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

MASTER-accepted engineering checkpoint:

`prototype/study-teachback-v0.1`

`09698dfb85c783c67ac83e6462c33d61aee31122`

The owner replied `继续`; this satisfies the approval gate for `OWNER-VALIDATION-01`. Do not resume synthetic development first.

## Read order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md`
4. earlier R4/R3 contracts only as boundaries/evidence.

## Codex setup

Codex should:
1. verify `F:\Chat-Codex-Handoff\validation-repo` and branch `prototype/study-teachback-v0.1`;
2. verify local HEAD equals or normally descends from `09698dfb85c783c67ac83e6462c33d61aee31122` and preserve worktree/ledger;
3. do **not** make implementation changes or paid calls merely to prepare;
4. start only `node study-teachback-app/server.mjs`;
5. keep the server available at `http://127.0.0.1:4317` while the owner performs the browser walkthrough;
6. return a concise `OWNER_VALIDATION_READY` receipt with URL, branch, HEAD, and current safe ledger summary; never print the API key.

## Owner walkthrough

Use one short, non-sensitive concept/rule/process and the owner's own voice. One coherent journey is authorized, plus at most one targeted re-explanation attempt if the product naturally offers it.

Owner should:
1. use Learn and ask at least one normal Tutor question;
2. press `我来讲讲`, explicitly record about 20–45 seconds, include at least one condition and a natural self-correction;
3. finish in-app and verify original audio remains available;
4. inspect raw transcript and word-timing quality notice;
5. fully replay every validated segment before confirming, correcting any critical negation/number/condition/term ASR error;
6. inspect content/logic feedback and evidence links;
7. verify a withdrawn earlier claim is not separately punished after explicit correction;
8. verify supported findings expose no targeted remediation and actionable repair appears only for meaningful gaps;
9. if a near-silence candidate exists, replay/confirm it before any delivery interpretation; empty/insufficient delivery findings are acceptable;
10. use targeted reteaching if a real actionable gap exists and, if useful, perform one new re-explanation attempt;
11. use Apply and check it is a related new situation without long-term mastery claims;
12. export locally and check source/audio/raw+corrected transcript/reports are present; avoid deleting evidence needed for review until the walkthrough is assessed.

## Boundaries

Authorized:
- owner voice only;
- one short non-sensitive source;
- `whisper-1` + `gpt-5.6-luna` only;
- normal live calls for this one journey and at most one re-explanation;
- US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling;
- private fast-forward review checkpoint after the run.

Not authorized:
- open-ended retries/stress testing;
- new provider/model/dependency/local ASR/VAD;
- public hosting, merge/release, force push;
- external users or third-party/sensitive audio;
- committing raw owner audio, secrets, `.env`, browser profile or private client files.

## Stop conditions

Stop and return to MASTER if:
- a critical ASR meaning error cannot be safely corrected;
- diagnosis materially contradicts the confirmed transcript/source;
- evidence is fabricated/misattached;
- supported/delivery feedback regresses into knowledge remediation;
- repeated API retry is required;
- credential/budget/storage guard fails;
- original audio or attempt/source identity is lost/corrupted.

Minor copy/layout friction is evidence for later prioritization, not automatically a stop.

## After walkthrough

The owner only needs to report whether the journey completed and any visible failure/friction. Do not require the owner to manually upload review bundles.

Codex should then stop the server, collect only sanitized run evidence that the owner permits, normal fast-forward push to the same private feature branch, and return exact remote SHA/status. Raw owner audio stays local.

MASTER will review only the new owner-validation evidence and classify:
- Must Fix;
- User Decision Needed;
- Future Optional.

Possible final gate results:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`;
- `OWNER VALIDATION PASS WITH MUST FIX`;
- `OWNER VALIDATION BLOCKED`.

No merge/release/external-user step follows automatically.

## Minimal Codex trigger

```text
开始 OWNER-VALIDATION-01。

Owner 已批准本轮单次 integrated microphone walkthrough。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Accepted engineering checkpoint: 09698dfb85c783c67ac83e6462c33d61aee31122

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/OWNER_VALIDATION_01.md

只准备运行环境，不做新的 synthetic 开发。

1. 核对 branch / HEAD / worktree / ledger；保留 lineage。
2. 启动：node study-teachback-app/server.mjs
3. 保持 http://127.0.0.1:4317 可用，等待 Owner 在 Edge 中执行 walkthrough。
4. 不打印或暴露 OPENAI_API_KEY。
5. 本轮批准正常 live whisper-1 + gpt-5.6-luna 调用，仅限一个 coherent owner journey，以及产品自然触发时最多一次 targeted re-explanation。
6. 保持 US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling；无自动充值/切模。
7. 不 merge/release/public deploy/force push，不使用第三方/敏感音频。

准备完成后只返回：
OWNER_VALIDATION_READY
URL: http://127.0.0.1:4317
Branch: <branch>
HEAD: <sha>
Known cost/exposure: <safe summary>

然后等待 Owner 完成浏览器操作，不自行代替 Owner 做麦克风 walkthrough。
```

## State Summary

Completed: engineering readiness through R4 and owner approval to start validation.

Not Done: actual owner browser/microphone journey and post-run MASTER acceptance.

Must Fix: none known before execution.

User Decision Needed: none unless a retained stop condition or new boundary occurs.

Future Optional: broader device/copy/acoustic/external-user work after this gate.