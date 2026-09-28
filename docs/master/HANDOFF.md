# Active Handoff — PHASE3B-EDGE-MINIMAL-LAUNCH-01

Updated: 2026-09-29
Role: 00 MASTER
Status: **READY / ZERO PROVIDER CALLS / READ-ONLY POLICY CHECK + MINIMAL EDGE STARTUP DECOMPOSITION**

## 0. Binding

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Accepted HEAD:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Canonical authority:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

PHASE3B-LIVE-01 remains paused and its 3-call / zero-retry / US$0.03432 authorization remains unused.

This task must make 0 provider calls, use 0 microphone and perform 0 topic/live actions.

## 1. Known evidence

Previous fresh Edge about:blank probes:
- target/CDP could initially be created;
- `Page.enable` then timed out;
- GPU subprocess repeatedly exited `-1073741790` / Windows `0xC0000022` ACCESS_DENIED;
- `--disable-gpu` did not avoid the same fatal startup path;
- product root never launched.

Do not add further GPU/sandbox flags.

## 2. Task

**Task ID: PHASE3B-EDGE-MINIMAL-LAUNCH-01.**

Goal:
decompose the browser failure into policy/profile/basic-process/remote-debugging layers without changing machine or product state.

## 3. N0 — identity/evidence

Confirm:
- repo/branch/HEAD;
- tracked CLEAN;
- ledger lock absent;
- ledger SHA/exposure unchanged;
- prior Phase3B startup/GPU artifacts preserved.

## 4. N1 — read-only Edge policy check

Read only the relevant Microsoft Edge policy values, if present, from both HKCU and HKLM:
- `SOFTWARE\Policies\Microsoft\Edge\UserDataDir`;
- `SOFTWARE\Policies\Microsoft\Edge\RemoteDebuggingAllowed`.

Report:
- key/value present or absent;
- value only for these named settings.

Do not write/delete registry values.
Do not enumerate unrelated policy trees.

Interpretation:
- if `RemoteDebuggingAllowed=0`, STOP; do not bypass policy;
- if `UserDataDir` is configured, report it but do not inspect/open the configured profile directory;
- otherwise continue.

## 5. N2 — minimal Edge with no CDP

Create a new dedicated profile directory under the current user's local app data, e.g.:
`%LOCALAPPDATA%\ChatCodexPhase3B\edge-probe-<run-id>`.

It must be outside:
`%LOCALAPPDATA%\Microsoft\Edge\User Data`.

Launch Edge non-headless with only:
- `--user-data-dir=<dedicated new directory>`;
- `--no-first-run`;
- `--no-default-browser-check`;
- `about:blank`.

Do not include:
- remote-debugging args;
- proxy args;
- host-resolver rules;
- disable-background-networking/component-update/sync;
- GPU/sandbox args.

Do not control the page through CDP.

Using only the task-owned process handle:
- wait a bounded interval;
- record whether process remains alive;
- record exit code/stderr if it exits;
- close normally if alive.

If N2 fails, STOP. Do not continue to remote debugging.

## 6. N3 — minimal Edge + CDP

Only if N2 PASS.

Create a second new dedicated local-app-data profile.

Use the same N2 args plus only:
- `--remote-debugging-address=127.0.0.1`;
- `--remote-debugging-port=0`.

No proxy/network-block/GPU/sandbox flags.

Open about:blank.

Verify:
- CDP endpoint;
- target connection;
- `Page.enable`;
- bounded target lifetime;
- normal close.

If N3 fails while N2 passed, STOP and classify the failure at the remote-debugging/control layer. Do not try policy bypass or extra flags.

## 7. N4 — product-root probe

Only if N3 PASS.

Confirm from accepted source that root-page load alone does not dispatch Tutor/ASR/diagnosis.

Start local server.

For up to three runs:
- new Edge process;
- new local-app-data isolated profile;
- same minimal N3 configuration;
- open product root only;
- no source submit;
- no topic creation;
- no `开始学习`;
- no microphone;
- no provider action.

Verify:
- target/title/basic DOM;
- bounded survival;
- ledger unchanged;
- provider endpoint count = 0;
- normal close.

Any run failure stops immediately. Do not restart sequence until green.

Because network-blocking flags are intentionally removed, record high-level observed network destinations if available. Background Microsoft/Edge traffic is not itself a failure; any OpenAI/provider endpoint contact is a failure.

## 8. Protected boundaries

No:
- provider/API/model list;
- microphone;
- topic/live flow;
- owner Edge profile/IndexedDB;
- read/write of configured policy UserDataDir contents;
- registry/policy writes;
- driver/Edge reinstall/reset;
- GPU/sandbox flags;
- privilege elevation;
- unknown process interaction;
- new dependency;
- product code modification;
- Git write/push/merge/reset/clean/rebase/amend.

Artifacts/probe profiles only in the dedicated probe locations.

## 9. Delivery

Return:
- canonical commit;
- N0–N4;
- relevant Edge policy values/absence;
- Edge version/path;
- N2 profile path/args/process result;
- N3 profile path/args/CDP/Page.enable/result;
- N4 3 startup results if reached;
- stderr/exit comparison;
- high-level network destinations and explicit provider/OpenAI endpoint count;
- task-owned cleanup results;
- ledger before/after SHA/summary;
- provider=0 / microphone=0 / topic=0 / exposure=0;
- final tracked CLEAN;
- Blocking / Unknown / User Decision Needed / Future Optional.

Stop for MASTER; do not resume PHASE3B-LIVE-01.

## 10. Canonical trigger

```text
继续同一项目，PHASE3B-LIVE-01 保持暂停。执行零调用分层诊断：PHASE3B-EDGE-MINIMAL-LAUNCH-01。先读取 BenCCCCCCCCC/Chat-Codex-Handoff 的 meta/master-state 最新 docs/master/CURRENT_STATE.md 和 docs/master/HANDOFF.md，并记录 canonical commit。

目录 F:\Chat-Codex-Handoff\validation-repo，branch prototype/study-teachback-v0.1，accepted HEAD dd8317b43100b8cbaad684cab7fc02957e32de62，tracked CLEAN，ledger lock absent。live 的 3-call/zero-retry/US$0.03432 授权继续冻结，本任务必须 provider=0、microphone=0、topic/live action=0。

严格按 HANDOFF N0–N4。先只读检查 HKCU/HKLM 下 Microsoft Edge 的 UserDataDir 和 RemoteDebuggingAllowed 两个 policy 值，禁止写 registry/policy、禁止枚举无关 policy。若 RemoteDebuggingAllowed=0 就立即停止，不得绕过。

然后不要继续加 GPU flags。创建位于当前用户 %LOCALAPPDATA% 下、且不在 Microsoft\Edge\User Data 内的 brand-new dedicated probe profile。N2 先用最小 Edge 启动：仅 --user-data-dir、--no-first-run、--no-default-browser-check、about:blank；不要 remote debugging、不要 proxy/host-resolver/network-blocking/GPU/sandbox flags，也不要 CDP 控制。只观察 task-owned browser process 是否能稳定存活并正常退出。N2 若失败立即停止。

只有 N2 PASS 后，N3 才用第二个 fresh profile，在同一最小配置上只增加 --remote-debugging-address=127.0.0.1 和 --remote-debugging-port=0，验证 CDP/target/Page.enable/稳定存活/正常 close。失败就停，不要额外 flags。

只有 N3 PASS 后才启动本地 server；N4 使用相同最小 CDP 配置在 3 个全新的 profile/process 中只打开 product root，禁止开始学习、topic、麦克风、provider。验证 title/basic DOM/target survive/ledger unchanged/provider endpoint=0/正常 cleanup；任何一次失败立即停止。

本轮刻意移除 proxy/host-resolver 等 blocking flags 来隔离启动变量，因此只记录高层 network destination；Microsoft/Edge background traffic 不自动算失败，但任何 OpenAI/provider endpoint contact 都算失败。不要读取 owner Edge profile/IndexedDB，不要触碰未知进程，不要改系统/Edge policy/driver。

返回 N0–N4、两个 policy 值/absence、Edge path/version、N2/N3 exact args 和结果、N4 三次结果（若达到）、stderr/exit、network destinations/provider endpoint count、cleanup、ledger before/after SHA、0 provider/0 microphone/0 topic/0 exposure、final tracked CLEAN、Unknown/Blocking。然后停止交 MASTER，不得在本任务内恢复 live Phase3B。
```

## 11. Classification

Ready:
- Edge policy/profile/minimal-launch decomposition.

Paused:
- owner-authorized live experiment.

User Decision Needed:
- none.

Next step:
run the diagnostic and return evidence to MASTER.
