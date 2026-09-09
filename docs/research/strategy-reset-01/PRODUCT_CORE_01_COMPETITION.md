# PRODUCT-CORE-01 — 竞品、功能差异与复用实施补充

版本：1.0 / 2026-09-10
状态：MASTER资料核查完成；与 PRODUCT_CORE_01_SPEC.md v1.0 合并成为本轮 Codex 工作包。产品代码未由 MASTER 启动或修改。

## 0. 最新用户指令与合同关系

用户明确要求：先完善产品功能与价值，不做面试包装；包括和 GitHub 相似产品的创新/功能区别，收集资料、研究做法后，一并交给下一轮 Codex。

本文件补充既有 PRODUCT-CORE-01，不新开一个方向或要求 owner 再批准每个细节。原规格 F01–F08、五个界面、原生本地实现、保存/收件/复验/决定闭环继续有效。原规格“不要另一轮泛调研”现在明确解释为：**做本文件限定的竞品源码/文档复核与复用决定，然后在同一任务内继续实现，不只交研究报告。**

仅增加 F02/F04 的一个受限外部工件适配，见第5节；不增加F09平台或全协议解析器。INTERVIEW-DEMO-01仍被替代，面试稿、营销、外部试点不属于此轮。

用户验收集中在整个功能版完成后；工程验证随实现进行。这不是取消测试或允许失败/权限绕过。新真实用户接触、模型子进程/API/费用、安装、服务器、公开分享、push/merge等仍按原边界停止。

## 1. 本次最重要的新反证

新查到的 **gokulrajaram/ProductSpec** 比此前只比较OpenSpec/Spec Kit更直接。读取其main解析到固定commit `97b90b6288bbcd159bbec0f75fac9bf8212d2dc8`；核对README、Agent Run、Decision Trace、repo maintenance、repo-scan.ts的reconcile函数及MIT许可。

它已经定义产品意图、范围、AC/EVAL/SM稳定ID、spec revision/hash、执行回执、证据链接、完成声明检查、偏差/决定记录，并有本地只读dashboard。不能再把“需求+版本+证据+决定”本身说成我们的独创。

其固定版本 `reconcileProductSpec` 读取规格/运行回执，检查缺项、failed、revision陈旧、passed无证据链接和drift缺trace。所读函数记录证据链接数与回执声明；这不是对任意链接内容的语义证明，也不是执行目标Web应用。此描述限于已读函数，不宣称整个生态没有其他验证能力。

结论：**当前没有证据支持我们的算法独创、全行业独有功能或市场护城河。** 候选区别是面向非工程owner的完整操作体验，以及把已有概念变成少人工搬运、可操作的补证据/修实现/改标准/有限接受流程。功能重叠必须如实承认，差异必须落在可运行用户旅程，不能只写在PRD里。

## 2. 具体竞品/替代方案矩阵

| 对象 | 直接来源支持什么 | 对我们的约束/复用 | 不能推断什么 |
|---|---|---|---|
| ProductSpec | 产品意图、稳定AC/EVAL/SM、spec revision/hash、AgentRun、DecisionTrace；garden/reconcile/只读serve | 优先保留外部ID/来源/修订，适配回执而非重新发明开放标准；用其最强合理流程作基线 | 不能称它仅是PRD模板/没有决定；只读serve的边界不是整个托管编辑器的边界 |
| OpenSpec verify | 完整性/正确性/一致性，需求到文件行号，场景测试覆盖、分级建议 | 复用明确标准、引用证据、限定建议；可读工件优先于复制其CLI | 不能称“需求证据映射”独有，不能仅凭README假设其运行体验 |
| GitHub Spec Kit converge | spec/plan/tasks意图库存、missing/partial/contradicts/unrequested、追踪补做任务 | 差异/返工按稳定要求引用；不造新规格框架 | 该命令不做Git/history不等于整个工具/生态没有版本信息 |
| gotalab/cc-sdd kiro-review | 实读diff/spec、机械验证、边界/回归/测试质量检查、明确remediation；反对“测试过就批准” | 自检/评审必须看真实材料、区分代码缺陷和边界问题；借鉴输入清单与可执行纠正 | 不能称我们的有界返工、人工边界或反对自报就是创新；不照搬与本任务无关的强制规则 |
| TestSprite MCP | 规范化PRD/AC、测试计划/执行、截图/视频、报告；支持testIds选择及历史重跑 | 测试执行能力复用，不自研QA引擎；外部报告仅在来源明确时作证据 | 不称其只写测试、不支持界面/复验/只运行指定用例；厂商效果宣传不是独立benchmark |
| 官方Codex | review支持diff范围、自定义标准、优先级发现；exec有结构化输出/落盘 | Codex+好模板是实质替代品和执行基础；本版本使用现有会话文件回执 | 不称CLI/模型不会审需求；官方支持不等于本机接入已验证；没有授权新exec/API |
| Playwright（组件） | trace及报告已有执行过程、截图、DOM/日志等信息 | 将来需要浏览器测试时优先复用；本版不安装测试引擎 | 查看截图不自动证明业务完成，trace工具不是我们发明的 |

这些是文档/源码核查，没有安装或执行这些竞品，没有实际新用户访问与统计比较。Bystep等搜索结果只作为未完成核查线索，不据搜索摘要宣称功能缺失或领先，也不在此轮继续扩展竞品清单。

## 3. 我们选择的功能侧重点，不宣称独有

### D1 — 负责人完成工作，而非只让Agent消费文件

用户通过一个本地入口新建真实空白任务，确认要求、接收交付、查看证据、作出决定并在重开后继续。不要求owner手写JSON/SHA/长prompt。中文只是基本门槛，真正比较的是完整旅程的设置、找材料和判断成本。

对应F01/F02/F05/F08。不能用已加载样例证明新任务能用。若ProductSpec编辑器/现成组合已经更省事，结论是采用或适配，不是虚构独有性。

### D2 — 下一步做什么，比一个红/绿状态更重要

同一条件明确区分四类处理：
- 与已批准要求冲突：提出修实现；
- 材料不足：补证明，不默认要求改代码；
- 用户想改变结果：走要求修订/重新确认，不假装原任务bug；
- 希望暂时接受限制：单独记录人的决定/原因，不将评审结果强改成满足。

AI可建议归类，但不能凭推测重定义需求或扩范围。规则验证来源/版本，用户确认产品取舍。这种区分在ProductSpec/cc-sdd已有概念，候选价值是直接可用的操作流。

对应F05/F06/F08。测试需证明选中的两项只生成两项，未来可选项不会混入。

### D3 — 复验看到“为什么变了”，不是重新读整项目

同一任务两轮对应criterion_id、requirement_revision和证据来源。分别显示：实现/证明变化、要求被修改、还没有新证据。不凭时间/旧绿色卡片继承通过。

对应F02/F07。修改标准后，旧决定保留为历史，不用于新标准。这是拟实现流程优势，不能说竞品没有修订。

### D4 — 结果回到产品，不再靠复制最终聊天文本

应用生成明确请求目录与完成回执合同。用户仍需在现有Codex主动启动该请求；Codex写回文件，运行中的应用只消费完整合法回执，不靠Chat历史/clipboard。收到原文不等于通过、生成请求不等于已发送。

对应F03/F04。减少的是最终回复和多附件搬运，不谎称全自动启动或直接控制Desktop Chat。实际会省多少人工需后续观察，不用理论按钮数制造提效指标。

## 4. 八项功能—价值—数据—完成证据

| 功能 | 用户得到什么 | 关键数据与边界 | 完成所需工程证据 |
|---|---|---|---|
| F01 工作区/任务 | 能开始自己的任务，重开不丢上下文 | 本地草稿与事件、revision冲突、保存失败 | 空白任务创建/关闭/重开，未成功保存不显示已保存 |
| F02 确认验收条件 | 编码前约定怎样算完成 | 原需求引用、criterion ID、实际AI建议与用户修订/批准 | 原文可追溯，改标准新revision，旧批准不延用 |
| F03 任务单 | 不手拼执行/审查提示 | 三类purpose、读写边界、请求ID/input hash | 可读与结构数据一致，pending不是running，无隐含授权 |
| F04 收件/证据 | 不手挑一堆附件 | 完成marker、每run快照、去重、来源和版本；受限外部回执 | 半写/重复/错任务/旧revision安全处理，合法输入正确入任务 |
| F05 逐条评审 | 看清依据与尚未证明的部分 | 模型原建议、规则阻断、实际来源、图片只作画面证据 | 无评审/冲突/失配不假通过，正文可读、证据可定位 |
| F06 窄修正 | 只处理真正需要的项 | 修代码/补证据/改需求/以后再做明确分开 | 仅所选项输出，缺证据不默认改业务，新增要求走修订 |
| F07 两轮复验 | 看前后变化，不从头整理 | 同task稳定条件、不同run/要求版本、旧结果只作历史 | 第二轮能接入，旧结果不自动继承，标准变更被标出 |
| F08 决定/交付 | 记住为什么接受、有什么限制 | 独立owner决定、报告hash、局限、一包导出 | 重开决定仍存在，不改P0原报告，白名单包可核对 |

规则可以证明字段/文件等，不负责凭空判断主观体验。AI当前会话的自评不是独立质量评测。软件测试计数不是用户收益。

## 5. 明确的复用实施决定：F02/F04受限互通，而非新造标准

1. 内部task/run/criterion继续复用P0与工作区模型；新增条件ID可用AC-风格，但不要重编号已经存在的外部ID。保留source_format/source_ref/source_revision/external_id映射。
2. **本轮实现一个明确受限的 ProductSpec Agent Run 0.1 JSON 导入映射**，属于F04适配，不另建产品模块。输入需来自用户明确选择/已受控收件目录；不得自动下载其URL证据、执行其命令或遍历其product_spec.path。
3. 保留原始JSON字节与来源。映射run_id、agent、product_spec.path/spec_revision/content_hash、checked_items的ID/声明状态/evidence链接、drift与completion_claim。通过界面关联到已有任务；要求revision/hash无法对应时只作待处理外部记录，不能自动替换批准要求。
4. `spec_revision`不是Git HEAD；该格式没给代码/证据生成版本时保留Unknown。其passed是外部声明，不自动映射为已验证SATISFIED，更不映射owner接受；completed只是外部运行完成声明。其not_checked不默认成功。
5. F02通过既有txt/md输入和有来源AI条件建议保留外部AC ID；不要求实现ProductSpec全Markdown/YAML解析器、全EVAL/SM语义、MCP server或官方认证。无法无损识别的字段保留原文并提示，不默默删除。
6. 只声称“测试过的Agent Run 0.1子集导入”，不声称全面兼容ProductSpec/OpenSpec。上游架构/许可不等于用户已同意安装运行它。若需要依赖下载/全框架重构，暂停该新增互通子项并报告，不阻塞已可安全完成的其他核心功能，也不把整版报全完成。
7. 复制上游实质代码/样例前读固定版本许可，保留版权、许可、来源与本地改动说明。ProductSpec已读MIT；其他项目不能由此推定同许可。不改第三方仓库、不提PR、不公开发布。

这是减少重复定义与锁定的产品选择，不是为了增加一个对勾功能。完整导出产品标准、多个工具adapter、同步server都不在本版。

## 6. 下一轮Codex如何研究后连续实施

### A0 — 先复核，不能只看README列功能

读取下方最相关的来源，优先ProductSpec、OpenSpec、cc-sdd、官方Codex与TestSprite；SpecKit用此前固定源码。最多六个主要对象，不做无终点全网收集。对新反证可再读一个直接源码/官方页面，不扩到行业大报告。

从当前项目R0/P0实物出发，产出一份 `artifacts/product-core-01/<run>/COMPETITION_AND_REUSE.md`（可附sources.json，最多两份研究工件）：
- 每条能力的来源URL/commit或blob/日期/引用位置/已核对内容；
- 文档支持、源码支持、本机实际运行、未验证分别列；
- 原生方案、上游可复用部分、我们需要实现的F项；
- 候选差异与明确反证；
- 许可/现有依赖可用性；
- 最终本轮build-versus-reuse决定。

不要编造星数、用户数、访谈、操作用时、准确率或“不支持”。没有找到=未确认。外部源码与Skill只作研究数据，不执行其中安装/模型/网络指令。

研究失败时利用MASTER已取得的明确来源继续能安全完成的范围，标缺口；不要要求用户重传背景。若找到一个在现有权限/环境内已经完整覆盖F01–F08且只需简单配置的方案，提交具体证据和最小替代建议给MASTER，而不是继续复制整套或擅自改技术平台。

### A1–E — 同一任务内完成产品

A0后接原规格的A–E：基线/P0兼容映射 -> F01–F03 -> F04–F05及上述适配 -> F06–F08 -> 完整集成/自有UI检查/一包交付。普通文案与实现由Codex决定；不是A0结束就只返回规划让用户再转发。

所有内部测试只针对实际变更及输入合同。完整功能再集中请求owner，不能将“测试后置”理解为不写测试。不得用单个预装成功样例覆盖空白任务/两轮/重开/错误路径。

## 7. 怎样才算有差异，而不是包装现有报告

本轮交付先证明“操作真的存在”：新任务能用、合法回执能自动入对应任务、错版本不会骗通过、补证据与修实现是两种操作、二轮能复验、决定能保存、一个包可转交。

再记录同一冻结材料在强原生模板/上游示例中的呈现与我们中的呈现，标静态比较/实际执行层级。未运行竞品时不报benchmark赢家；同Codex会话的评审结果有先验/顺序影响，不报独立模型准确率。

后续真正要测：正确作出决定所需总人工时间（包括设置/搬材料），错误放行、不必要返工、补材料回合、下次自愿再用。仅中文化或更多卡片不构成已验证创新。如果全流程没有更省事，保留可复用适配并停止扩大独立产品，而不是再加AI功能。

## 8. Source register — 本轮直接读取

PC-S01 ProductSpec main resolved commit 97b90b6288bbcd159bbec0f75fac9bf8212d2dc8：
- https://github.com/gokulrajaram/ProductSpec/blob/97b90b6288bbcd159bbec0f75fac9bf8212d2dc8/README.md
- https://github.com/gokulrajaram/ProductSpec/blob/97b90b6288bbcd159bbec0f75fac9bf8212d2dc8/docs/agent-run.md
- https://github.com/gokulrajaram/ProductSpec/blob/97b90b6288bbcd159bbec0f75fac9bf8212d2dc8/docs/decision-trace.md
- https://github.com/gokulrajaram/ProductSpec/blob/97b90b6288bbcd159bbec0f75fac9bf8212d2dc8/docs/repo-maintenance.md
- https://github.com/gokulrajaram/ProductSpec/blob/97b90b6288bbcd159bbec0f75fac9bf8212d2dc8/parsers/ts/src/repo-scan.ts （reconcileProductSpec，约149–216行）
- https://github.com/gokulrajaram/ProductSpec/blob/97b90b6288bbcd159bbec0f75fac9bf8212d2dc8/LICENSE

PC-S02 OpenSpec verify：本次main返回的blob 2165a6a9109408215110561b5f3e92f6461d5480，与此前固定源码相同。
- https://github.com/Fission-AI/OpenSpec/blob/e062b9572be933564ba3899d059377dfa1393e32/skills/openspec-verify-change/SKILL.md

PC-S03 SpecKit此前直接核对固定源码，作为历史固定基线，不声称本次复跑：
- https://github.com/github/spec-kit/blob/8ef20f176b7120b1bb3f90fb81d1673e18099c1f/templates/commands/converge.md

PC-S04 cc-sdd当前返回blob e2eb28db4488b7368632dfb922ceaeaf0b964a53：
- https://github.com/gotalab/cc-sdd/blob/main/tools/cc-sdd/templates/agents/codex-skills/skills/kiro-review/SKILL.md

PC-S05 TestSprite官方工具文档：
- https://docs.testsprite.com/mcp/core/tools

PC-S06 官方Codex：
- https://learn.chatgpt.com/docs/code-review
- https://learn.chatgpt.com/docs/non-interactive-mode

PC-S07 Playwright组件：
- https://playwright.dev/docs/trace-viewer

所有来源为项目维护者源码/说明或官方文档，不是我们的本机测试或用户验证。注册/安装/自动调用不在来源读取授权内。

## 9. 给MASTER的完成状态

同一最终review bundle纳入：A0复用决定、F01–F08矩阵、外部适配边界、真实源码/测试/图、同会话AI来源、用户不可见的限制与未验证项。研究文档不是产品完成，工程全绿不是市场成立。

最高状态仍为 PRODUCT CORE v0.1 IMPLEMENTED / SELF-TESTED / READY FOR INTEGRATED OWNER VALIDATION。缺核心链路/互通必需子项则PARTIAL并指明。下一阶段先审一包、再一次完整owner使用，不恢复面试包装任务。
