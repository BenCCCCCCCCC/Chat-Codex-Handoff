# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: PROJECT-WIDE-REVIEW-01
task: PROJECT-WIDE-REVIEW-01
writer: CODEX
transport_only: true
result: REVIEW_COMPLETE_WITH_FINDINGS
date: 2026-09-29

## 1. Identity / read versions

- Repository: BenCCCCCCCCC/Chat-Codex-Handoff
- Actual checkout / Git root: F:/Chat-Codex-Handoff/validation-repo
- Actual branch: prototype/study-teachback-v0.1
- Base and final local HEAD: dd8317b43100b8cbaad684cab7fc02957e32de62
- Tracked worktree: CLEAN at initial and final inspection.
- origin: https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff.git
- Canonical commit actually read: a75d1bd251a8f1f3955e5197056e461d4c219e60
- CURRENT_STATE.md blob: 327df6270459c95b59604b98ac19132a9c190d9b
- HANDOFF.md blob: f3a3a5c7f275b9113c12188927541940498a1389
- Incoming ACTIVE_EXCHANGE.md blob: 6b5966eebbf3e0870786088a87193071edaab44d
- All three canonical documents were read at that immutable commit. This review answers that exact CHAT_TO_CODEX turn.

结论：当前产品具有完整的学习—讲解—证据定位链路，Batch A/B 的主要隔离原则在 accepted source 中可见。本轮发现三个需要处理的源代码边界问题，另有测试可移植性、历史入口和持久化方面的改进建议。以下是只读审查意见，不是实施授权，也不是新一轮测试 PASS。

## 2. Coverage manifest

先列出 tracked inventory，再阅读项目主体。Git tracked 文件总数 338；排除 artifacts/ 与 study-teachback-app/evidence/ 后，主体为 81 个文件，全部全文阅读，包括旧 helper/test，而非只阅读当前入口。完整清单见末尾附录。

已读范围：

| 范围 | 实际阅读 |
| --- | --- |
| 根目录 | README、Start/Stop 入口、BASELINE/T08/T09、三个 GATE4 样例、tracked .codex/capture-session.ps1 |
| 产品 | UI、app/core、diagnostic-localization、schemas、storage、server、provider、ledger、ingestion、Python extractor、启动脚本、依赖声明、README/.gitignore |
| 测试与辅助脚本 | 所有 tracked Node/Python/PowerShell 测试、三个 browser suite、offline wrapper/isolation、fixture、历史 live/credential/ASR helper；只读，不执行 |
| handoff-kit | Common/configure/handoff、WinForms UI/PanelAdapter/launcher、两层测试与 README |
| acceptance-p0 | evidence module、report entry、README、tests |
| 权威文档 | 同一 canonical commit 的 CURRENT_STATE/HANDOFF/ACTIVE_EXCHANGE；产品分支上的两个文档指针 |
| 版本历史 | 最近 12 条提交记录；Batch A f06900f 和 Batch B dd8317b 的文件变化统计，与当前完整源代码交叉核对 |
| 历史证据抽查 | build-01r4/DELIVERY_PACKET.md；local-launch-lifecycle-diag-01/RECEIPT.md；owner-validation-provenance-fix-01/RECEIPT.md |

有意未逐字复核的 257 个 tracked 历史/生成文件位于 artifacts/** 和 study-teachback-app/evidence/**，其中上述三个文字 receipt 已抽查。其余旧 JSON、日志、ledger snapshots、截图等未逐个读取或重新渲染。它们是历史证据，不是当前产品主体；不据此宣称其每条结果都独立复验。

未读取 owner profile、IndexedDB、真实学习内容、credentials、runtime ledger 正文；未审计 ignored runtime 或全部 unrelated untracked artifacts。未读 .codex/hooks.json（untracked），因此不宣称当前 hook 安装状态已经验证。主体 81 文件无 unread/blocked 项；历史证据与本机运行数据有上述明确覆盖限制。

## 3. Architecture / boundaries

| 组件 | 职责与边界 |
| --- | --- |
| Start-Study.cmd / Stop-Study.cmd / launch.ps1 | 本地启动、识别/复用服务及 owned lifecycle；不是付费动作入口本身 |
| index.html / style.css / app.mjs | 原生浏览器 UI；学习对话、录音状态、replay gate、转写编辑、反馈、历史/导出/删除 |
| core.mjs / schemas.mjs | 输入/输出验证、ASR 归一化、音频基本观察、raw/corrected 转写、来源/版本和 remediation 约束 |
| diagnostic-localization.mjs | content findings 与 local process evidence 分离，生成有证据关联的 diagnostic targets；过程证据本身不推出知识错误 |
| storage.mjs | 浏览器 IndexedDB topic 聚合，保存来源、消息、attempt、原声 Blob、转写与报告；现有七天策略 |
| server.mjs | 127.0.0.1 HTTP；静态 allowlist、Host/Origin/custom-header 检查、CSP、请求上限、串行 provider 工作 |
| ingestion.mjs / extract_source.py | 本地文档提取；受限 subprocess、超时、格式/大小限制、固定 pypdf 依赖；不需 provider/OCR |
| provider.mjs / ledger.mjs | 服务端凭据、ASR/semantic 边界、超时和事前 reservation；ledger 锁与累计 hard caps |
| offline wrapper / isolation / fixtures | synthetic credential、stub provider、隔离 ledger、Node 网络拦截、synthetic media；浏览器验证不等于真实麦克风/学习效果验证 |
| handoff-kit / acceptance-p0 | 保留的协作和证据工具，不在学习产品的 browser→server→provider 主链路内 |
| GitHub meta branch | MASTER 决策与任务状态；ACTIVE_EXCHANGE 是串行传输，不是产品数据库或新的决策权威 |

简化数据路径：

材料 → local extraction/确认 → topic → Tutor/Learn → owner 原声 attempt → ASR raw → replay + corrected version → content diagnosis → content findings / local process evidence → diagnostic target → 有界 Repair / partial re-explain / Apply。

浏览器数据保存在本机；provider 只经 server 调用。导出可包含原始音频，应视为学习数据副本。GitHub exchange 本轮只写审查文字，不传 owner 学习数据。

## 4. End-to-end product flow

1. 用户粘贴或本地导入材料，建立 source identity 和 clean topic。初始内部 Learn 指令不写成用户消息；真正用户输入才进入 user history。Repair/Apply 的内部指令也采用 provenance 区分。
2. Tutor 返回结构化目标、讲解和问题，经过 runtime 验证后呈现；后续真实问答保留关联。
3. 准备 full/partial attempt；capturePending 等限制重复启动。获得有效录音后保留 original Blob，再进行解码/质量判断和有效 attempt 注册。失败启动不应消耗有效 attempt，注册幂等。这是已修复 A 的现状，不作为新缺陷。
4. ASR 使用 WAV 派生数据；raw transcript 保留。词级时间不完整时允许按有效 segment 核对，不强造词级对齐。
5. replay 使用 native played coverage / continuity 与 seeking 状态门控。用户只能纠正 ASR 听错，不能把实际讲错改成正确答案。corrected 是新版本，raw 与原音不覆盖。
6. 内容请求只带经验证的内容输入，避免把声学过程直接作为理解判据。source/attempt/transcriptVersion 以及 quote/span 都有验证；missing 没有虚构音频时间点。
7. near-silence 等只是候选观察。经本地回听确认后 process evidence 独立保存并去重，不额外 semantic dispatch；它不直接触发知识补救。其他过程类型的 fixture 支持不意味着生产中已有自动检测能力。
8. diagnostic target 以可操作的内容问题为依据，可附同段过程观察，但时间相邻不证明因果。UI 分开呈现“内容理解”和“讲解过程”。
9. 有效内容 focus 可进入 Repair 或新的 partial attempt；Apply 是独立迁移问题/回答。历史、导出、单次/主题/全部删除、quota 恢复提供数据出口。
10. provider 在调用前预留预算；60 秒 timeout；没有自动 retry loop。当前源代码模型 whisper-1 / gpt-5.6-luna，semantic output cap 1800，输入估算上限 24000；账本 exposure cap $5、cash cap $10、attempts 60、minutes 360、requests 300、input 1,000,000 / output 250,000。这里描述代码常量，不验证当前 provider 余额/报价或实时 ledger headroom，也不代替 Phase3B 的更小授权上限。

## 5. State / authority / historical map

| 类别 | 现状 |
| --- | --- |
| 当前产品事实 | accepted local dd8317b；Batch A/B canonical 已接受 |
| 当前动态权威 | meta/master-state 的 CURRENT_STATE / HANDOFF，由 MASTER 更新 |
| 本轮传输 | ACTIVE_EXCHANGE 同 turn_id 的 CHAT_TO_CODEX → CODEX_TO_CHAT；建议不自动变成需求 |
| 产品分支 docs/master | 指向 canonical 的入口，不应当作最新动态状态副本 |
| retained handoff-kit | 本地 repo/chat binding、STOP metadata、clipboard/manual handoff 和 panel；可作为 fallback，不能替代当前 canonical |
| acceptance-p0、GATE4/T08/T09 | 早期证据/交接机制与样例；不要理解为当前学习产品功能 |
| browser-tests.mjs / browser-tests-r3.mjs | 历史 suite，仍含旧 UI / delivery semantic 假设；当前 wrapper 选择 r4 |
| credential/live/recovery helpers | 历史工程入口，存在真实 provider 行为；不应批量执行来“跑所有测试” |
| artifacts/evidence | 历史时间点 receipt；其旧 owner-validation next-step 不覆盖最新 canonical |
| owner browser validation | 最新 canonical 记录 host smoke PASS；此前 sandbox Edge failure 不作为当前产品 root 缺陷证据 |

本轮接受 MASTER 的 host smoke 结论；它是 owner 报告经 canonical 记录的证据，不是 Codex 本轮重跑。PHASE3B-LIVE-01 继续暂停，授权尚未使用。本轮不重新调查 GPU/Edge、不检查旧 topic、不启动产品。

## 6. Evidence-backed strengths

- **Verified — source:** 内部 Learn/Repair/Apply 与真实 user provenance 分开；有效录音注册时机和重复注册已有专门防线。
- **Verified — source/tests:** raw/ corrected / original audio / report version 的关联，使定位可回听；missing 不伪造时间点。
- **Verified — source/tests:** process evidence 本地保存、去重、reload 关联，独立于 content diagnosis；六类 fixture 检查 process-only 不生成知识错误等定位原则。fixture 的语义期望不代表真实模型质量已证实。
- **Verified — source:** runtime validators 在模型 schema 之外再次校验来源和引用；supported 或无有效 focus 的反馈不提供知识补救按钮。
- **Verified — source:** quota recovery、原声导出、删除与 pending navigation 保护，考虑了失败时数据保全。
- **Verified — source:** bounded provider requests、事前 reservation、failed/unsettled exposure 保留、服务端凭据及本地 server 安全边界。
- **Verified — test design:** offline clean environment 与 test-ledger/网络 guard 是可复用基础，避免默认把工程验证变成真实付费实验。
- **Verified — retained tooling:** handoff repo binding 和 acceptance evidence provenance/integrity 校验有价值；snapshot integrity 与 owner acceptance 被明确区分。
- **Unknown:** 对真实学习者是否有用、false inference 频率、真实麦克风环境下 ASR/replay burden。不能用旧 synthetic PASS 或 host root smoke 替代。

## 7. Must Fix — distinct current defects

以下 Verified 指代码路径已核实，不代表本轮运行重现。优先级是审查建议，MASTER 决定具体修复授权；不撤销既有 A/B 验收。

### MF-01 — Tutor output/history 长度契约不一致

**Classification: Must Fix / Verified（静态契约冲突）；真实输出触发频率 Unknown。**

证据：study-teachback-app/core.mjs:48 的 validateTeaching 接受 message 长度至 4000；app.mjs 的 teach 原样存入 assistant history；server.mjs:38 的 /api/teach 将最近六条 history 逐条交给 text(m.text,2500)。

触发：一个合法的 2501–4000 字符 assistant 回复被保存后，再发下一条正常问题。刚被产品接受的回复在下一次请求中作为 history 又被拒绝，尚未到 provider 即失败。该消息仍在最近六条时会持续影响对话。

最小建议：统一接受与再输入的 history 契约，明确超长处理，不静默改写 provenance；用 fake provider 边界 2500 / 2501 / 4000 验证“接受的输出可以继续对话”。不涉及换模型、预算或架构重构。

### MF-02 — Content confirmation 在 pending diagnosis 时可重复推进版本

**Classification: Must Fix / Verified（未保护的 mutation 路径）；时序影响为静态推演，本轮未运行复现。**

证据：
- app.mjs:225–227 confirm handler 未先检查 controller/processing，直接 revisedTranscript → corrections.push → await save → diagnose。
- app.mjs:16–20 api 的 in-flight guard 在上述 mutation 之后才生效；只禁用 send/explain，未禁用 confirm。
- app.mjs:229–232 diagnosis 捕获 request/version；app.mjs:144–145 latest/attemptRequest 选择最后 correction。
- app.mjs:195 只呈现 report.transcriptVersion === latest version 的报告。

具体时序：第一次确认已发出 version v1 的 diagnosis，但尚未返回；第二次点击 confirm 又保存 v2，然后被 api 的 REQUEST_IN_PROGRESS 拒绝。v1 请求仍可完成并保存，但当前 v2 过滤会隐藏 v1 反馈。即使没有编辑文字也会追加新 correction。这不是 process confirm 的去重问题，也不是重开已修复的 recording registration 问题。

最小建议：在任何 correction mutation 之前对整个确认/保存/dispatch 操作加互斥并反馈 busy；确保单次操作的版本一致。延迟 fake provider 下双击验证只有一次版本推进/dispatch，且结果可见。不要靠放宽版本校验解决。

### MF-03 — /api/status 的 ledger 读取异常没有请求级处理

**Classification: Must Fix / Verified（异常边界缺口）；具体进程退出表现 Likely，未运行复现。**

证据：server.mjs:21 在 POST try/catch 之前直接调用 book.summary()；ledger.mjs:13–15 read 对非 ENOENT 读取/JSON 错误抛 LEDGER_UNREADABLE；summary 默认调用 read。http.createServer 使用 async callback，该 GET 路径未捕获 rejection。

触发：ledger 无法读取或 JSON 损坏时，产品初始化/预算刷新 GET status 不能返回受控错误，异常逃出 callback；在未处理 rejection 的运行环境下可能终止服务。这里并未发现或制造当前 ledger 损坏。

最小建议：将 status 纳入受控的 fail-closed 错误边界，明确“预算未知/不可用”，禁止重置账本或恢复付费操作来绕过；在隔离 fake book/损坏测试 ledger 中验证服务仍可响应且 provider=0。不需要改 caps/schema。

## 8. User Decision Needed

| ID | 证据等级 | 需要决定什么 |
| --- | --- | --- |
| UD-01 修复顺序 | Verified：以上代码边界 | 是否先授权 MF-01/02/03 的窄修复与 zero-call regression，再恢复 owner-led Phase3B。当前不自动实施 |
| UD-02 可复现测试资产 | Verified：browser-tests-r4.mjs:17 直接读取 ignored runtime/synthetic-mandarin-v2.wav；wrapper 不生成该文件 | 是否将固定 synthetic fixture 与 provenance/hash 或明确的准备步骤纳入可交付测试资产。现机可用不等于 clean clone 可复现；不得静默换成不同音频而宣称原覆盖相同 |
| UD-03 ledger 持久化故障策略 | Verified：ledger.mjs:20 直接 writeFileSync 整份 JSON；Likely：中断写可能留下不可读数据 | 是否单独授权 atomic replacement/recovery 设计及故障注入测试。锁解决互斥，不等于断电原子性；不应自动释放 reservation/reset。与 MF-03 的受控错误响应分开 |
| UD-04 历史入口生命周期 | Verified：旧 browser suite/live helpers/delivery semantic route 仍保留 | 保留为明确历史入口，还是逐步移出活动目录。当前 UI process confirmation 是本地，但 server.mjs 的旧 delivery 分支仍能调用 semantic；不是当前 UI 已额外 dispatch 的证据。删接口前查消费者 |
| UD-05 真实产品验收 | Unknown：真实效果与负担；canonical host smoke 已 PASS | 何时由 owner 在 sandbox 外恢复原有一次录音/限额流程；必须先停 replay/transcript checkpoint，不能把本轮审查当作新 live 许可 |
| UD-06 retention/导出预期 | Verified：七天现有策略、JSON/audio 导出，无对应产品导入流程 | 长期个人使用对保留/恢复的预期应由 owner 明确。当前已知策略不是本轮新缺陷，不修改 retention/schema；“可导出”不应等同于“一键恢复” |

## 9. Future Optional / simplification and product suggestions

- **FO-01 — Verified coupling, Likely maintenance cost:** app.mjs 同时承担录音、replay、视图、异步流程与持久化，部分文件行极长；多个测试通过读取/截取源字符串在 VM 中测试函数。下次触及相应行为时，小步提取纯状态转换或稳定依赖注入接口，再保留 UI 集成覆盖。不要为审查而大重构。
- **FO-02 — Verified duplication:** browser legacy/r3/r4 重复大量 harness 和旧语义；README/runner 应明确唯一活动入口及哪些 helpers 会真实付费。可以先加索引/历史标记，再决定迁移；不自动删除证据。
- **FO-03 — Verified retained fallback:** handoff-kit 与新 GitHub relay 并存。明确“正常流程用 exchange，本地手动工具仅 fallback”，保留 repo/session/turn 身份校验。capture-session 固定临时 metadata 和按 session packet 不是多 chat 并发协议；不要扩大为无授权自动路由。
- **FO-04 — Likely UX benefit, Unknown measured benefit:** 用现有独立证据卡先突出一个最值得核对的条件/逻辑关系和一个 focused next action，保留原声入口及“过程观察不证明理解错误”的文案。不要新增综合口语/心理评分。
- **FO-05 — Likely portfolio benefit:** 在完全 synthetic、明确 fake provider 的演示中展示 source → owner utterance fixture → content/process 分离 → target → history；显式区分“工程可工作”和“真实学习有效”。不要把历史真实模型 receipt 当作本轮 live 演示。
- **FO-06 — Unknown benefit:** 量测逐段 replay 的点击数、等待和理解帮助后再优化交互；保持 native coverage 与人工确认要求。不得因为摩擦就 adaptive skip、seek-to-end 或自动标记。
- **FO-07 — Needs MASTER freshness check:** 长期 ASR/Whisper 迁移、替代模型的价格/可用性/时间戳能力均未做外部核验，不作 Must Fix，不提出当下模型切换。代码里的费率是本地预算规则，不是当前官方报价的独立证明。

## 10. Exchange / handoff assessment

**Verified:** 当前 relay 已有 MASTER 记录的单文件往返成功；用户只需小 nudge，Codex 写 receipt，MASTER 读取并决定下一步。对于当前单 owner 串行流程，现有机制足够继续验证；没有证据需要新后台 daemon、额外平台或复杂双向同步。

**Verified limitation:** GitHub file blob SHA 的 optimistic concurrency 能防止同文件丢失更新，但“先检查 meta commit，再 update_file”不是整个 meta branch 的原子 compare-and-swap。如果其他 writer 只改 CURRENT_STATE/HANDOFF，exchange blob 可能不变。当前可通过串行 MASTER turn、写前核对 canonical commit 和回执记录版本减小风险，不能宣称已实现全分支事务。

**Future Optional / Likely benefit — 最小约定：**
- 固定 state、turn_id、writer、in_reply_to commit/blob；本回执已记录 incoming 版本。
- CODEX_TO_CHAT 的重复 nudge 只回报“待 MASTER”，不重做已完成任务。
- 写前检查 exchange 内容与 canonical commit；不兼容变化 fail closed，避免自行合并指令。
- 写后按 commit 检查 changed paths 恰为 ACTIVE_EXCHANGE，并读回正文。
- 保留 Git 历史作审计；摘要不覆盖 canonical 决策，建议列表不等于实施 scope。
- 仅在确有多人并发需求后，由 MASTER 决定是否需要更强的分支级 CAS；当前不增加自动化。

权限边界清楚：Codex 本轮只获单文件 meta write；没有 product push/merge 权限。GitHub receipt 是传输，不是产品版本固化。

## 11. Validation history and evidence limits

- Batch A/B accepted 状态来自本次 canonical read；源码与对应 local commit 范围相符。
- 抽查的历史 R4 packet 记录 Node 38/38、Edge 22/22；早期 provenance packet 记录 Node 48/48、Edge 最终29/29及首轮异常；这些都是各自旧 baseline 的历史数字，不是本轮 fresh counts。
- lifecycle receipt 当时 INCONCLUSIVE；最新 canonical 已补充 owner host smoke PASS。保留旧证据，不把它误升格为当前 root blocker。
- 本轮 fresh test count = 0。Node/browser/Python/PowerShell suite 均未运行；没有更改测试来实现建议。
- 未 claim 全面安全审计、性能基准或真实学习效果。两个交互场景与 status 异常需授权后的隔离 regression 才有运行证据。
- 没有访问外部 OpenAI/provider 资料或端点验证模型/价格；相关建议已标 freshness check。

## 12. Next smallest experiments — recommendations only

1. **先做一组 zero-call 边界 regression（需新授权）：** fake Tutor 长文本续聊；pending content diagnosis 下重复 confirm；GET status 的 fake ledger failure。每项明确预期和 provider=0，先复现再最小修复，不顺带重构。
2. **如需要可交付测试环境：** 在隔离 clean checkout 验证 documented offline setup 和固定 synthetic WAV 可获得性/hash；仅发现缺少 fixture 时停止，不能临时换音频掩盖覆盖变化。不要因 sandbox Edge 失败再无限探针。
3. **仅 MASTER 恢复原授权后：** owner-led 一次自然录音实验，沿既定 replay/transcript checkpoint 再决定 diagnosis；收集 useful/mixed/not useful、false inference 和 replay burden。无需先扩建功能/评分体系。

## 13. No-change receipt / disposition

- Product files changed: 0；tests changed/run: 0；local files created/modified by this review: 0。
- Local commit: none；base = final HEAD dd8317b43100b8cbaad684cab7fc02957e32de62；tracked CLEAN。
- Provider/product API calls: 0；microphone: 0；topic/live actions: 0；incremental provider exposure from this task: 0。
- 没有启动 server、产品网页或浏览器，没有导入会初始化 ledger 的运行模块。
- model/provider/retention/database schema/caps/dependencies 均未修改；runtime/ledger 未写入。未读取 live ledger，故不提供虚构的 before/after hash 测量。
- 无 fetch/pull/reset/clean/checkout/rebase/amend；无 product push/merge。
- 唯一授权写入：GitHub meta/master-state 的 docs/master/ACTIVE_EXCHANGE.md。GitHub 读取及此 receipt 写入不属于 product/provider calls。
- CURRENT_STATE.md / HANDOFF.md 不修改。建议全部未实施。
- 已有 unrelated untracked 保留：.codex/hooks.json、T09_LIVE_PACKET.txt、artifacts/acceptance-p0、strategy-reset-01、usability-spike-01、study-teachback 下 build-00、旧 review ZIP、correctness-hygiene-01、diagnostic-localization-01、b-replay-gate-01/02、b-replay-env-03、phase3b-live/browser-startup/gpu-isolation/edge-minimal-launch artifacts。
- 本次仅运行读取型 Git inventory/identity/status/log/show、Get-Content 和 rg；一个使用非 PowerShell brace expansion 的检索命令在 parse 阶段失败，改成明确文件列表后完成，未产生文件变更。
- **Blocking:** 本轮审查无执行 blocker；MF 项待 MASTER 定优先级/授权，非已完成修复。
- **Unknown:** 本轮没有运行复现；真实 ASR/学习效果/摩擦、当前 live ledger 数值及 provider balance、全部历史 artifact 内容、ignored 本机配置状态未验证。
- **User Decision Needed:** UD-01–06；尤其修复顺序与是否恢复 owner-led 实验。
- **Future Optional:** FO-01–07 及最小 relay 约定，不自动实施。
- **Tests Not Run:** 全部工程 suite、真实 microphone/provider、产品/browser startup、性能/故障注入/clean-clone reproduction。
- Stop: 本轮回执写入后停止，交 MASTER 审查；PHASE3B-LIVE-01 继续暂停。

## Appendix — fully read tracked body (81 files)

Paths below are relative to the verified local Git root, at accepted HEAD.

```text
.codex/capture-session.ps1
BASELINE_C_REPO_STATUS.ps1
GATE4_MANUAL_SAMPLE.md
GATE4_PROTOTYPE_SAMPLE.md
GATE4_TEMPLATE_SAMPLE.md
README.md
Start-Handoff.cmd
Start-Study.cmd
Stop-Study.cmd
T08_PROBE.json
T09_HANDOFF_TO_CHAT.ps1
acceptance-p0/AcceptanceEvidence.psm1
acceptance-p0/Invoke-AcceptanceReport.ps1
acceptance-p0/README.md
acceptance-p0/tests.ps1
docs/master/CURRENT_STATE.md
docs/master/HANDOFF.md
handoff-kit/HandoffKit.Common.ps1
handoff-kit/README.md
handoff-kit/configure.ps1
handoff-kit/handoff.ps1
handoff-kit/tests.ps1
handoff-kit/ui/HandoffPanel.ps1
handoff-kit/ui/PanelAdapter.ps1
handoff-kit/ui/README.md
handoff-kit/ui/Start-Handoff.ps1
handoff-kit/ui/tests.ps1
study-teachback-app/.gitignore
study-teachback-app/README.md
study-teachback-app/access-check.mjs
study-teachback-app/app.mjs
study-teachback-app/asr-evidence.mjs
study-teachback-app/asr-evidence.test.mjs
study-teachback-app/asr-recovery-r2.mjs
study-teachback-app/auth-recovery.mjs
study-teachback-app/browser-tests-r3.mjs
study-teachback-app/browser-tests-r4.mjs
study-teachback-app/browser-tests.mjs
study-teachback-app/core.mjs
study-teachback-app/correctness-hygiene.test.mjs
study-teachback-app/credential-smoke.mjs
study-teachback-app/credential-whisper.mjs
study-teachback-app/dedicated-whisper-retry.mjs
study-teachback-app/delivery-engineering-r3.mjs
study-teachback-app/diagnostic-fixtures.mjs
study-teachback-app/diagnostic-localization.mjs
study-teachback-app/diagnostic-localization.test.mjs
study-teachback-app/extract_source.py
study-teachback-app/extract_source_test.py
study-teachback-app/feedback-actions.test.mjs
study-teachback-app/index.html
study-teachback-app/ingestion.mjs
study-teachback-app/ingestion.test.mjs
study-teachback-app/launch-tests.ps1
study-teachback-app/launch.ps1
study-teachback-app/ledger.mjs
study-teachback-app/live-asr-check.mjs
study-teachback-app/live-challenges-rev2.mjs
study-teachback-app/live-challenges-rev3.mjs
study-teachback-app/live-challenges.mjs
study-teachback-app/logic-fixtures.mjs
study-teachback-app/logic-fixtures.test.mjs
study-teachback-app/portability.test.mjs
study-teachback-app/provenance.test.mjs
study-teachback-app/provider.mjs
study-teachback-app/replay-gate.test.mjs
study-teachback-app/requirements-extractor.txt
study-teachback-app/retry-allowance.test.mjs
study-teachback-app/run-offline-tests.mjs
study-teachback-app/safe-auth-evidence.mjs
study-teachback-app/safe-auth-evidence.test.mjs
study-teachback-app/schemas.mjs
study-teachback-app/server.mjs
study-teachback-app/storage.mjs
study-teachback-app/style.css
study-teachback-app/synthetic-speech.ps1
study-teachback-app/test-isolation.mjs
study-teachback-app/tests.mjs
study-teachback-app/timestamp-policy.test.mjs
study-teachback-app/ui-foundation.test.mjs
study-teachback-app/voice-metadata.ps1
```
