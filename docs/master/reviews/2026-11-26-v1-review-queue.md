# 知而能讲 V1.0 · ChatGPT 产品审核接力

2026-11-26。项目负责人确认 Codex 已启动；远端暂未见新实现 PR 或 Codex 回执。此文件是产品审核意见与下一轮接力入口，不是新的工作分支、产品验收结果或对已开始任务的阻塞。以 [HANDOFF](../HANDOFF.md) 的 A–F 和 [核心验收](../PRODUCT_0_TO_1.md) 为准。

**最新 UI 审核口径**：[工作台设计减法与验收](2026-11-26-desktop-ui-direction.md)。用 ChatGPT Desktop 常用工作台的层级和就近操作，结合 HCI／Fluent 2，优先检查主动作是否被重复文案、同权重卡片或导航抢占；不把文案减少当作牺牲状态、风险和证据的理由。以最新实现核对，不重复 #45 已解决的行为。

## 第一轮方向（依据现有基线与规划，未审到新界面）

**首批验收只抓两个实际动作：** 新用户从首页找到一种可做的讲解方式；老用户重开后回到上次具体问题，而不是主题首页或无题的练习页。Apple 风格先体现信息主次、留白和操作反馈。工作台在宽屏保持材料、主任务和证据的关联，窄屏不强行并排三栏；查看原文再返回后焦点、草稿与问题不能丢。项目介绍页可以讲故事，学习页不要让大标题挤掉首屏操作。用一次桌面、一次窄屏的同一路径看方向，别为视觉细节反复全量跑测试。

**判断顺序：** 第一，草稿和证据不中断；第二，用户知道为什么要修正这一点、下一步做什么；第三，界面打磨。理解档案先做“能回到一个待巩固项”，不要优先做统计大屏。状态须可从原报告、原文版本与实际尝试追溯；没有题、草稿未交、有提示与前提未明，不折算成“独立通过”。无 Key 示例与真实分析入口必须说清。

**下一阶段：** 批次 A 的工作台可以直接接 B，不用等评审答复；但在扩大知识点/档案前，先证明一个缺口能完成“查证→重讲→变题→作答→续学”。检查一个正常例和一个条件冲突例。如果首批只提供静态页面，不算完成 A 的功能切片，也不应靠截图宣布可用或 AI 已有效。新 ASR / 全文存储 / 付费调用按已有决策边界，不因同步审核而开放。

## 每次交付后如何同步

1. 查阅当前 PR 的实际 diff、运行报告和对应提交的 CI，检查桌面/窄屏关键证据；报告时间戳不能替代实际版本。测试、截图、模型质量、真实学习效果分开。拿不到可运行界面或回执时说明未验证。
2. 只写有依据且可行动的问题：**Must Fix**（用户路径、历史/存储、错误诊断等阻塞；给症状、证据、修正方向、复验动作）、**Next**（不拦当前 PR 的后续优先级）、**User Decision**（需要产品负责人确认的问题及取舍）。正常设计与工程选择由 Codex 自主决定。
3. 结论以关联 PR/SHA 写入本文件或当期 `docs/master/reviews/`，从 HANDOFF 链接。不要覆盖正在编写的实现报告，不抢占 Codex 正在实施的分支，不因等审核而停下已明确的独立任务。


## 2026-11-26 · 首次远端同步与批次 B 产品建议

**审核状态：待实现回执（非验收）。** 本轮读到 MASTER `9968fff6ce388e43dd9847a7f6e8f85b5ad8181d`；产品仍为 [d1d662d](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/d1d662d2376b5618b03fadff214d4680ebf86e57)，PR 搜索最新 #42、无开放 PR，#43 直接读取为 404。未看到 A 新工作分支或报告；仅能确认用户已告知 Codex 开工，不推断其本地进度。未启动第二个 Codex、未修改产品代码、未运行无关回归。

### 基线 delta：已有行为不要再做一遍

[#35 学习入口与恢复](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/35) 已交付文字默认入口、无 Key 恢复与失败不抢占恢复位置。A 只检查新首页/工作台是否将这些能力自然暴露。[#36 材料组合](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/36)、[#37 条件反馈](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/37)、[#38 独立作答证据](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/38)、[#40 续学](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/40)、[#41 材料版本](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/41) 已有相应功能与工程证据。B 优先组织已有信息和状态，不重新建平行记录或将用户选择/参考自报当事实。

### Next（给 A 的交付重点与 B 的优先级，不阻断当前实现）

1. **首次讲解入口**：在主题首屏给唯一主动作“开始讲解／继续讲解”，默认文字与录音入口可见、等价，不把教程、聊天或配置当必经步骤。无 Key 时可以保存文字/原声、明确哪些动作需要模型；示例不伪装真实 AI。用实际页面完成导入→首次讲解→反馈，重点看视觉主次与首屏操作；若已有则不另加入口。
2. **查证的返回上下文**：反馈中的一个缺口是工作单元；点材料引用时保留 topic / material-version / attempt / report / finding（按已有字段映射）的定位，返回该卡片而非反馈首页；原有未提交文字与位置不丢。宽屏可同屏、窄屏可切换，具体布局由 Codex 决定。先复用现有定位机制。
3. **重开继续的主动作**：首页/主题列表同一个“继续”入口展示上次具体动作（例如“核对讲解”“继续上一题”“重讲时间条件”）；从实际恢复位置推导，不维护第二套进度。打开后应直接处于对应版本和问题，不自动发请求。只用一个未提交草稿及一个查证后的恢复场景核对受影响路径。
4. **B 的缺口闭环**：先用现有门禁合成案例，实现一个缺口卡片从“需要补学”→查看证据→局部重讲→新情境题→看到本轮结论；卡片只显示缺口、为什么、主动作，详细材料/原话按需展开。区分重讲已表达、已作答待评、题目待核对、有辅助作答、已通过本次独立检验；未知参考情况显示“已作答/参考情况未知”，不能算独立通过。材料版本改变时保留旧结论，新目标需要重新核对。不强迫一律重复诊断。
5. **质量评审不等于工程验收**：先用已有合成案例展示 UI 行为与状态正确性；另用非队列领域等义表达、关键条件遗漏、前提冲突各一个例子准备语义审阅。用户可见的“下一步”必须与该缺口关联。离线夹具/CI只能证明行为和契约，不推断学习增益。后续真实研究优先看使用者不靠提示完成路径、24–48 小时的新情境独立解释，而不是自动增加检测项。

**Must Fix：** 暂无基于 A 新实现证据的确认缺陷。若实际版本出现找不到首次讲解、查证后不能返回原问题、重开失去正确草稿/版本/题目、错误计入独立通过，则按用户结果修复；这不是预先判定 A 存在这些问题。

**User Decision Needed：** 当前无新增需即时决定的事项。沿用生产 ASR 切换、额外真实 API 预算、全文保存/数据政策及外传、公开发布的既有边界；普通 UI/领域合同选择由 Codex 自主完成。

**后续接力：** 新 PR/SHA 或报告出现后，对实际 diff、对应截图/可运行路径和验证证据做一次 delta review；若已有更新，不重复 A/B 任务或本轮建议。评审完成即回写本记录，不因等审核停下独立工作。


## 2026-11-26 · A/B 实现增量审核（第一轮）

**状态：A 首条工程切片已合并，B PR 尚未合并；产品体验/质量部分审核，不是整个 V1.0 验收。** 本次实际读取：
- [PR #43](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/43)，审核头 `a001479eddce5f9aac500783d09f1c5e34daa8f9`，合并后产品基线 [bab617e](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/bab617e861dc7cb3f861fcaddc0478884b52b74f)。[A 实现报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a001479eddce5f9aac500783d09f1c5e34daa8f9/docs/iterations/2026-11-26-learning-home.md)、[Windows CI 45802970164](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45802970164) success。
- [PR #44](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/44)，[原实现报告及截图](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/98e51f35e6c928e8baa90f9a28c9d9feea3fd2db/docs/iterations/2026-11-26-understanding-record.md)，原头 `98e51f35e6c928e8baa90f9a28c9d9feea3fd2db`，本次又审查到修正头 [c0ce181](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/c0ce18133e4dfb4735343eca65c9c0ef1b2ad48c)。[原 CI 45803437840](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45803437840) Node 通过、Edge 失败（旧按钮白名单多出一个控件，日志 1!==0）。c0ce181 已删除锁定按钮文案的旧断言、修正重复 DOM id，并要求档案只接受确认文字与正确报告绑定；[新 CI 45803989739](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45803989739) 查询时进行中。不再重复要求已提交的修正；后续确认新 CI 结果即可，不额外重跑全量。
- 已实际打开 A 原/新首页、390px 首页、诊断，以及 B 桌面档案、390px 暂缓截图，审查相关代码 diff（首页、恢复、证据绑定、独立题入口和状态推导）。本次没有访问独立运行中的 Windows 应用；动作行为来自 Codex 隔离 Edge 报告与代码/CI，截图为合成资料/模拟反馈，不能证明真实 AI 质量或学习收益。

### 实质进步（可认可的范围）

- **首次讲解**：A 的 `startTopic(true)` 先本机保存再打开讲解准备，和 AI 讨论分离，报告记录确认前零模拟模型请求。新首页标题传达产品价值，石墨黑、浅灰、蓝色主按钮、顶部导航比旧表单更接近目标；不是只换色。
- **核对与恢复**：A 报告覆盖查看引文后返回、草稿跨首页续写、刷新恢复题目；B 在来源核对处保存 report/finding 定位，局部重讲绑定原反馈，首页继续卡显示具体题目或缺口。B 报告的合成门禁例覆盖初讲漏掉时间→查证→重讲→题目→首答→v6 恢复→题目质疑，手机档案截图明确撤下通过状态。认可这一条工程闭环已经实现并有局部验证，不等于所有学科或用户均可走通。
- **理解档案**：截图可看见来源、初讲未表达、局部重讲、题面和作答；`learning-record.mjs` 通过精确引用而非文本相似性关联。闭卷 modal 遮蔽应用内材料，另有参考自报，状态只针对本次首答；不宣称外部辅助已客观排除或长期掌握。既有规则题范围依然有限。

### Must Fix / 当前有依据的体验缺口（并入 B/C 的顺手修复，不阻断独立工作）

1. **当前学习重点必须推动下一步，而不只是另一个查看入口。** [c0ce181 app.mjs L786–798](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/c0ce18133e4dfb4735343eca65c9c0ef1b2ad48c/study-teachback-app/app.mjs#L786-L798) 的 `renderNextEvidence` 有当前项时无论状态一律“查看该项证据”并跳旧报告；没项时只“选择学习目标”。因此显示“待提交作答”“已重讲，待情境检验”时仍不直接继续题目；所有项已表达/通过时也不明确结案。复用现有状态和入口：待讲解→直接讲解（目标可选），待巩固→补学/重讲，已重讲→检验，待作答→同一题/草稿，题目/条件待核对→对应复核，已完成→本轮总结/下一目标；查看证据保留为次级入口。无需新增平行进度字段。以当前已有门禁例检查两三个转换即可。
2. **独立检验入口不能静默打开普通旧题。** [c0ce181 practice.mjs L127–147](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/c0ce18133e4dfb4735343eca65c9c0ef1b2ad48c/study-teachback-app/practice.mjs#L127-L147) 中 `fromFeedback` 优先复用 existing，`closedBook` 只影响新建且未见题。原先先点“检验理解”/做普通题，重讲后再点“独立检验”会进入普通旧题；这是可从代码确认的语义/入口不一致，不是已经复现的错误判通过。保持既有证据，不能升级旧答为独立。若已有普通题/重复题或无新题，入口明确“继续普通练习”或提示本次无未见的独立题；能生成不同题且有可靠规则时才开启独立检验，不为覆盖率编造题、不暗中调用付费服务。用一次普通题→重讲→独立入口的受影响路径核对。
3. **窄屏首屏仍埋主动作。** [A 390px 截图](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a001479eddce5f9aac500783d09f1c5e34daa8f9/docs/iterations/v1-experience/home-mobile.png) 显示 390×844 窗口已被营销标题、大输入框和上传块占满，最关键“直接讲解”在屏外。桌面截图主动作也在表单底部；诊断页可见“查看当前诊断结果”“重新完整讲”“我来讲讲”等同色竞争，而当前缺口才是主任务。将窄屏导入/粘贴压缩为紧凑选择区，材料就绪时保持清晰主动作（例如在输入附近或窄屏固定操作区），辅助说明和清空草稿后置；反馈完成态让“再讲这一点/下一动作”成为焦点，弱化查看已显示结果与通用底栏。仅检查一张相同窄屏首屏与一次正常操作，不为逐像素增加测试。

### Next（按主路线接续）

- P0 优先把上述三个实际断点并入已有 B/C；保留现有历史、v6、暂停状态和 API 费用控制。B 原运行截图只是旧实现头，c0ce181 的绑定修复用最终 CI 与既有走查证据确认，不宣称已独立运行。
- C 批先做普通学习者日常路径：本地启动、配置时机、真实录音权限可用时走查、长文件重新选段（不改变保存范围）；新首页继续卡/当前学习重点形成一个可完成的日常任务。理解档案 modal 作为查阅入口已可用，暂不扩成图谱/大屏；后续可在工作台显示“本轮已完成/待巩固”的简短总结，帮助返回具体任务。
- D 的研究准备优先衡量真实首次讲解完成率、定位/修正时间、无辅助新题解释而非单一选择题猜中；合成门禁例只证明工程。无需等实际付费研究才推进 C/E 的本地交付。
- README 与介绍页在 E 同步实际能力，明确独立检验是有限规则题、自报参考情况；已预写示例与真实模型分开。

**User Decision Needed：** 无新增即时决策。维持既有 ASR 生产切换、付费调用、全文保存/数据政策及原件外传、公开发布边界。未改产品代码、未发起 CI、未合并 PR；本次只写 MASTER 审核记录。


## 2026-11-26 · #45 本地候选增量审核（第二轮）

**审核范围：** [#44](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/44) 已合并 `13b9cdc43f6dcbf3ddb66cd4c4713792d53855cc`，最终头 `3997213ea8cb781de0d4e3c4d36a007e12ffd03e` 的 [CI 45804569677](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45804569677) success。新增 [#45](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/45) 已合并，远端产品头 [a178fb4](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/a178fb427e14597e76124934b69ddc15dae17779)，最终 PR 头 `84bf29ff8b411c493c324e07c79cac8b2a261f73`。[候选报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/docs/iterations/2026-11-26-local-candidate.md) 的实现基点 f258b9b 首次 CI 失败；后续变更为测试、文档、截图，最终 [CI 45807391200](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45807391200) Windows job 139866105993 的 Node、提取、Edge 均 success。只认可最终头的工程证据，不重跑。读到 CURRENT_STATE 仍为 #44；#45 合并事实以远端为准，Codex 可按正常回执更新状态，不覆盖其并发文档。

### 上一轮三项 Must Fix 的处理情况

- **下一步动作已落实。** #45 diff 中 app.mjs 的 renderNextEvidence 以当前草稿、待确认讲解、原报告/题目状态决定继续文字、核对原声、局部重讲、作答、总结等动作；查看依据变为次级。报告有隔离 Edge 从遗漏到独立首答、刷新及 v6 恢复证据。已看到桌面工作台与反馈截图中“重讲这一点”成为主色按钮，旧底栏降级。不再要求重做该动作映射。
- **普通旧题不再静默作为独立题。** #45 增加提示并报告实际走查普通题→重讲→独立入口，答对仍为普通作答；未见错误升级证据。下述提示持续性是剩余体验问题，不等于原状态逻辑未修。
- **窄屏首屏已修。** [390px 新首页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/docs/iterations/v1-experience/mobile-home.png) 直接讲解固定在屏幕底部、材料粘贴框缩短；此前首屏埋主动作的问题关闭。检查后续布局时不要重新引入这一断点。

### Must Fix（有代码依据的小修，不阻断独立 UI 批次）

**普通题身份不能只靠进入时的一次文案。** [practice-ui.mjs L200–208](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/study-teachback-app/practice-ui.mjs#L200-L208) 仅在 fromFeedback 的调用返回后临时写入 practiceOriginStatus；[L23–33](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/study-teachback-app/practice-ui.mjs#L23-L33) 每次 render 会覆盖为普通历史反馈来源说明，[L70–90](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/study-teachback-app/practice-ui.mjs#L70-L90) 的标题仍可能为“理解检验”。因此重绘/重开后没有稳定的普通/独立身份说明。以现有 round.checkMode、task、answerDisposition 等信息在 render 中派生题目类型，普通题明确普通练习，已提交独立首答与待复核保持各自状态；不要另存重复字段或强制生成新题。只需复用已有普通题复用场景，加一次重开/渲染观察，不跑全套。不主张已复现错误计分。

### Next（与已链接的 desktop-ui-direction 合并，不另开 UI 任务）

- **继续设计减法的证据：** [桌面反馈](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/docs/iterations/v1-experience/desktop-feedback.png) 中焦点虽已到核对讲解文字，反馈本体仍在空聊天、材料卡、整宽疑点卡下方，固定底栏覆盖视口底部；用户已经进入诊断时仍需滚动找结果。下一轮按既有设计方向将当前阶段正文置于主区，把聊天/材料/疑点收为可按需切换的辅助内容，底栏只保留必要动作并留足滚动空间。桌面前后用同一反馈状态截图比较，实际点引用→返回→重讲一次；无需重新做首页或逐像素测试。
- **免费示例更真实但要避免误解。** [demo-course.png](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/docs/iterations/v1-experience/demo-course.png) 课程题材与迁移题优于旧日常例。[demo.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/study-teachback-app/demo.mjs) 仅检查重讲非空、固定判选择题，现有顶部预写提示保留，建议在重讲输入处就地加一句“示例不评价自由文字；下题仅核对选择”，避免用户以为写任何内容都被 AI 判为正确。不是要求接入真实模型。
- **C/E/F 已有具体交付，不重复规划。** 长文件重新导入选段进入新材料版本，报告有超过 5000 字 TXT 尾段及旧版本备份恢复证据，未扩大持久化范围。README 已缩短并提供候选使用说明、90 秒脚本、本地反馈显式导出（代码仅包含版本/环节/影响/用户说明）。启动器 ready、免 Key demo 200、浏览器取得音轨 live→ended 有报告；Explorer 双击、实际麦克风录音质量与归档音频听审仍未验。
- **D 准备已完成一份具体方案**：[形成性研究](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a178fb427e14597e76124934b69ddc15dae17779/docs/research/v1-formative-study.md) 5–8 人、两工具交替、同时间、24–48 小时自由解释、三项评分、记录救援与分母，现参与者 0。下一步先冻结各工具与材料顺序对应关系和未见平行题（统计例数字与免费示例重复，方案已要求更换已见题；执行前落实），以真实使用困难/严重误判驱动改进，不宣称教学有效或已完成商业发布。

**User Decision Needed：** 无新增即时事项。已获批的 ASR 比较仍封存，待听审与生产切换取舍；真实研究/付费/外传/公开发行维持原授权边界。继续本机候选和现有 UI 批次即可。

本轮实际读取 #45 diff、最终 CI/job、README/报告/研究方案与 5 张合成页面截图，未独立运行 Windows 页面，无真实学习者或新模型效果验证。仅回写 MASTER 审核，无产品代码修改、第二个 Codex、CI 触发或 PR 合并。


## 2026-11-26 · #46 聚焦工作台增量审核（第三轮）

**审核范围与结论：** [PR #46](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/46) 已合并，PR 头 `4cbae9056adccaa7f667e790b3d6e6acf4745bfb`，产品远端头 [86dd8b6](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/86dd8b668122174f5e12edf5cda5c99dd04777e2)，CURRENT_STATE 已同步。本轮只审查相对 a178fb4 的 15 个变化文件、[实页报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/docs/iterations/2026-11-26-focused-workspace.md)、桌面反馈及手机引文两张实际截图、研究协议增量；[CI 45809045738](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45809045738) 对应 PR 头为 success，Windows job 139871780147 的 Node 与 Edge 均 success，文件提取专项按影响跳过。未独立运行 Windows 页面，认可工程证据，不推断学习效果。

### 上轮审核关闭项

- **普通题身份持续性：** [practice-ui.mjs L70–79](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/practice-ui.mjs#L70-L79) 已改为按 checkMode、closedAnswerId 和 answerDisposition 每次渲染派生，暂停判断优先，报告说明已见普通题仍为普通练习。关闭上轮一次性提示丢失的 Must Fix，不重复要求重做。
- **反馈优先及减少卡片：** [桌面实页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/docs/iterations/v1-experience/focused-feedback.png) 的当前缺口、核对文字和主修正动作均在视口上部，讨论降至下方，材料边栏去卡片；同一缺口不再另占一个重点卡。回访标题改为“新主题”，续学保留在前。达到本批设计减法的主要目的，不把风格完成度等同可用性实测。
- **查证与续学：** [app.mjs L487–500](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/app.mjs#L487-L500) 先保存精确反馈恢复引用，再打开同版本原文 modal；关闭回到原卡。实际[手机引文截图](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/docs/iterations/v1-experience/source-mobile.png) 可见高亮与返回；报告及更新后的 Edge 源定位检查覆盖回读页码、返回焦点，报告另有 Esc、重讲、18:05 新情境首答、恢复和质疑。认可这一条工程主线；首次讲解依旧沿用 #45 固定入口与已有行为，本轮未独立重测首次入口。
- **免费示例与研究准备：** 重讲处已提示自由文字不评分。研究协议已补齐 S/N 交叉顺序、回访逆序和新的平行情境题，关闭上轮研究准备的两项建议；实际启动前仍应确保参与者未看过公开仓库中的题目及答案（如有接触，另用未公开等价题），不能把公开题天然视为未见题。参与者仍为 0。

### Must Fix（下一次必要的小修，无需新架构或全量回归）

1. **原文抽屉需要始终找得到退出。** [index.html L123](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/index.html#L123) 把唯一可点击返回按钮放在完整原文之后；[style.css L272–286](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/style.css#L272-L286) 抽屉自身滚动且手机最多 85dvh，[app.mjs L496–499](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/app.mjs#L496-L499) 聚焦命中原句而非按钮。短门禁截图正常；接近 5000 字的选段中，命中开头或中段时手机用户可能必须滚到文末才可返回，Esc 不是触屏普遍可用的替代。把“返回反馈”移至固定/粘性抽屉头部或固定操作区，继续走现有 close/focusHit 回原卡机制，确保高亮不被遮挡。只用一次长原文窄屏引用→返回检查；这是由 DOM/样式确认的可发现性风险，未宣称在手机实际复现。
2. **修改讲解后，重新诊断应恢复主操作与发送说明。** [app.mjs L379–396](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/app.mjs#L379-L396) 对旧报告存在但文字/条件改变的情况仍渲染 stale findings，且诊断状态文案只写旧结果过时；[style.css L291–292](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/86dd8b668122174f5e12edf5cda5c99dd04777e2/study-teachback-app/style.css#L291-L292) 只要存在 finding 就把确认按钮降为文本链接，既包括已完成的“查看反馈”，也包括需发新请求的“确认修改并重新诊断”。依据现有 diagnosisView 的 current/pending 状态区别查看与重新诊断；当确需新请求时恢复主按钮，并就地说明将发送材料选段与确认文字（重试同理，不新增弹窗或重复提示）。仅检查编辑已诊断文本→旧报告仍可读→重新诊断入口，不发真实 API。现有过时标记和请求逻辑不需重做；未见错误计分证据。

### Next

- 工程候选现阶段可冻结为形成性走查基线；上述两处在既有维护中顺手修正并绑定实际版本即可，不另立大批 UI 重构，不再重复已通过 A/B 的测试。
- 后续视觉优化依赖真实任务观察。桌面截图仍保留底栏及下方聊天，但缺口已在主区可操作，不将其判为阻塞；等实际观察是否造成重复点击、滚动或模式混淆再决定收起。优先看初次使用者能否自主完成一次纠错，研究中的次日自由解释应区分概念、条件和理由，不能仅用选择题通过代替。
- D 是当前最大的产品证据缺口。已准备研究与顺序，尚未开展；可先准备任务记录表、未见题替换方案、匿名结果模板、待审阅的预算/招募方案。本机物理麦克风、Explorer 双击、独立听审如有合适环境再核对，不重复旧模拟运行。
- V1.0 当前仍为本地候选，作品集可展示产品机制、真实工程截图与已知限制，不宣称用户验证或已对外发布。

**User Decision Needed：** 尚无新授权；真正启动参与者研究、额外付费模型对照、生产 ASR 切换、扩大保存/外传或公开发布时按既有边界集中给方案。当前无具体新增预算或招募决定包，不催促审批。

本轮仅回写 MASTER 审核记录，无产品代码修改、第二 Codex、CI 触发或 PR 合并。


## 2026-11-26 · 独立候选验收：免 Key 与延迟迁移证据（第四轮）

**目标版本**：[合并产品头 839176a](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/839176a8c2b55155256e6928fab1b4d6b5ce69c7)，实际代码 [90a711b](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/90a711b3dc98a9cd084c630b4aefc961680cec86)，MASTER 读取时 `0fc2ea38ee90795e6e23c303f85982a0a56b3904`。核对 [#48](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/48) 已合并，PR 头 `f417912594d8017df906ff9fb74b5adc85d9c545`；[90a711b…839176a](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/compare/90a711b3dc98a9cd084c630b4aefc961680cec86...839176a8c2b55155256e6928fab1b4d6b5ce69c7) 只含 README、研究文件、报告、作品集及 GIF，无应用代码。沿用 #47 已有 Windows CI，不重验 #46–48 的界面与交付。本轮仅远端源码、提交及报告审查，未独立运行 Windows、未触发 CI。

### 验收：分开三条证据线

- 免 Key 首次体验：[交付回执](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/839176a8c2b55155256e6928fab1b4d6b5ce69c7/docs/iterations/2026-11-26-review-delivery.md) 记录干净 ZIP 启停、/demo 200、隔离 Edge 循环队列六画面。[demo.html L18–29](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/demo.html#L18-L29) 明确预写示例、自由文字不评分、输入仅留本页；demo.mjs 无持久化/API，选择题按固定选项评分。它是免配置产品预览，不是次日学习记录或独立效果测量。无需为此扩建 demo。
- 正式学习记录：[B 批记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/docs/iterations/2026-11-26-understanding-record.md) 已报告模拟反馈→原文→重讲→本机新情境首答→刷新/v6 恢复→题目质疑后撤下通过。独立性基于应用内闭卷与自报；选择题正确不等于自由解释正确或长期掌握。已有验收不重复。
- 次日换题：[执行包](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/839176a8c2b55155256e6928fab1b4d6b5ce69c7/docs/research/v1-fieldwork/README.md)、[题本指纹](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/839176a8c2b55155256e6928fab1b4d6b5ce69c7/docs/research/v1-fieldwork/forms.md)、[现场记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/839176a8c2b55155256e6928fab1b4d6b5ce69c7/docs/research/v1-fieldwork/session.md)、[汇总口径](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/839176a8c2b55155256e6928fab1b4d6b5ce69c7/docs/research/v1-fieldwork/results.md) 已区分主/备题、答前见题才替换、答后发现见题则排除、参考/提示/超窗、锁首答及盲评三项；报告合成 TABLETOP 已演练换题与参考排除。私有题面及锚点不能从指纹审查语义，未独立听审或双评，参与者 0。这里是人工研究流程，不是应用内自动次日复习功能。无需重新写研究方案。

### Must Fix / P1（本轮唯一新增可离线核对的缺口）：已见题与首次独立检验的证据边界

**代码证据**：[practice.mjs L127–151](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/practice.mjs#L127-L151) 新闭卷题的 seen 仅在 `learningContexts(topic)` 中查同题面/假设；[material-set.mjs L33](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/material-set.mjs#L33) 的范围仅当前主题和其材料组合；[bounded-understanding.mjs L20–27](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/bounded-understanding.mjs#L20-L27) 对同一门禁原文固定生成同一题。[index.html L134](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/index.html#L134) 只要求“本次作答未另外查看材料、答案或提示”，没有要求声明此前见过题面/答案；[closed-check.mjs L31–35](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/closed-check.mjs#L31-L35) 满足该自报即提交独立首答；[learning-record.mjs L7–16](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/90a711b3dc98a9cd084c630b4aefc961680cec86/study-teachback-app/learning-record.mjs#L7-L16) 正确的 closedAnswerId 派生“本次独立检验通过”。同主题旧题保护 #45–46 已有，不要求重做；跨主题已见但本次没看资料的回答可能符合当前自报，无法凭此作为未见迁移证据。这是新颖性语义缺口，不是断言选择题评分错误，也不是学习者作弊。

**本机最小复现（待 Codex 实测，不把静态推演称为 Windows 已复现）**：复用 #44 的隔离 Edge/模拟诊断门禁材料“门禁要求同时满足两个条件：已实名，并在18:00前签到。”。主题 A：同一缺口重讲→独立题（已实名、18:05）→提交正确首答。另建主题 B，使用相同材料及受控遗漏反馈，走同一重讲→独立入口。预期会得到相同题面、选项与假设，B 因主题内无记录可进入闭卷，勾选本次未另外查阅并作答后可显示独立通过。无需真实 API，不用真的等待一天；两个主题代表不同学习记录。以代码和一次定向实页确认或反证；如实测已另有拦截，记录并关闭 P1，不强行造改动。

**目标与最小验收**：明确分开“首次看见本题（含答案）”与“本次未另查提示”；优先沿用现有闭卷自报及转普通练习入口，让已见/不确定者能继续普通题而不被呈现为未见迁移。可按实际实现选择简短联合自报或独立选项，不新增全局见题追踪、跨到期索引或自动换题机制。若需保存新语义，评估既有合同；不能将历史 v6 的无辅助自报倒推为未见。复用一条两主题定向走查，核对已见/不确定不进入未见独立结论，明确未见且自报无辅助的正常首次答仍可提交，重开保持实际证据；已有题和首答不覆盖。不需要全套测试。研究中的私有主/备用题规则不变，应用内本题首答与 D 批 24–48 小时自由解释仍分别统计。

**Next**：先按上述唯一 P1 做离线复现及有必要的最小修正；无新增大规模 UI 重构、安装或作品集任务。保留 #48 冻结的研究执行包与真实研究待决边界。当前没有 P0 或候选发布阻断结论，未验收真实迁移效果。

**User Decision Needed**：本轮无新增需立即决策。现有 6 人、¥330 研究提案仍待另行批准，当前不招募、不付费、不外传、不改生产 ASR、不发布。

本轮仅维护 MASTER 审核队列；未启动第二 Codex、未改产品代码、未运行本机应用、未触发 CI 或合并。


## 2026-11-26 · #49 独立首答证据增量复核（第五轮）

**范围与基线**：[PR #49](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/49) 已合并，远端产品头 [57fad6f](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/57fad6f5438e801c6b10d12ca383901956ab7210)，实现 `74f7d6112e531dfdf2b5736843b6875060f12a4f`，最终 PR 头 `ee0e0b434712d08d6f8d0b2654bd8759e5e0439e`。相对第四轮 839176a 的 12 个变化文件已核对实际 diff；CURRENT_STATE 与 HANDOFF 已同步。最终 PR 头的 [CI 45830711752](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45830711752) success，Windows job 139946425274 的 Node/Edge 均 success，文件提取按影响跳过。已打开[报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/iterations/2026-11-26-next-day-first-answer.md)及三张实页图片；其中前两张属于修复前的次日走查，第三张为双自报修复后的状态。未独立运行 Windows。

### Must Fix：关闭第四轮 P1；本轮无新增必修

- [闭卷入口](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/closed-check.mjs) 和 [作答逻辑](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/practice.mjs#L181-L204) 均要求未见题与无辅助两项自报才提交独立首答；转普通练习保留选项，不增加跨主题追踪。修复后[实页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/iterations/v1-experience/seen-before-submit.png) 清楚显示已选择答案、仅勾无辅助时主提交禁用，转普通练习仍可点击。认可报告的双主题复现和修正路径；外部实际见题情况仍靠自报。
- [learning-record.mjs L7–18](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/learning-record.mjs#L7-L18)、practice-ui.mjs 与 [backup.mjs L164–175](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/backup.mjs#L164-L175) 核对到新增证据仅属于 closedAnswerId，旧 v6 无该字段时不会补记未见题，档案明确标记旧首答见题情况未记录。报告有新旧 v6 往返及重开保留首答 ID 的证据。关闭 P1，不再要求重复验证该修正。
- 模拟 26 小时重开及配比题从三份变四份：前者验证同一配置恢复，后者由另一份反馈触发，不是自动按日换题，也不是实际延迟学习效果。免 Key 示例重开归零且不生成正式主题，符合当前定位；正式诊断仍需 Key。本轮没有修改首次讲解、引文返回和 #47 的重诊断机制，沿用既有证据，不重复验收。#47 两处已报告修复，#48 已交付研究执行包与案例展示，不重新领取。

### Next（只记录新发现的实页摩擦，非发布阻断）

- [重开实页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/iterations/v1-experience/next-day-resume.png) 的 1280px 普通练习正文仅约 255px 宽，右侧大面积空置，题干、反馈和操作过度挤压。该图为修复前基线；#49 未改工作区 CSS。现有 [index.html L60–71](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/index.html#L60-L71) 中 .lesson-body 是网格子项，[style.css L255–259](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/style.css#L255-L259) 固定双列但正文未显式分配列；材料隐藏时可能自动占第一窄列。下一次有实际维护窗口时，先核对当前候选的同一普通练习恢复画面；若仍存在，材料隐藏时令正文独占可用主区，保留舒适最大行宽和原反馈返回，材料显示时才用双列。仅需同一桌面画面对照和窄屏基本重排；不为此重构其他页面或全量回归。闭卷 modal 的新截图层级清楚，两个确认有直接证据意义，不为减文案合并或去掉。
- D 的真正缺口仍是独立审题及真实参与者的未见题自由解释、盲评和对照，而不是更多代码模拟。候选可作为研究基线，不再为没有新证据的情形新增功能任务。后续研究提案仍保留既有授权边界。

**User Decision Needed**：无新即时决策。已知研究提案 6 人、最多 ¥330 尚未批准；不招募、不付费、不切换生产 ASR、不扩大数据政策、不公开发布。真实参与者 0，未宣称学习效果或比较优势。本轮只回写 MASTER 审核，无产品代码改动、第二 Codex、CI 触发或 PR 合并。


## 2026-11-26 · 八阶段 / AI 放行门槛独立评审（第六轮）

**范围：** MASTER [dd189d2](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/dd189d2d7ecc92d75046a39a4725a650a9ffac90) 的 [V1_EXIT_GATES.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/dd189d2d7ecc92d75046a39a4725a650a9ffac90/docs/master/V1_EXIT_GATES.md)（blob `4ff79274e68ed9ca6543bb56d03fc9f00a688d87`）；当前产品头 [57fad6f](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/57fad6f5438e801c6b10d12ca383901956ab7210)，运行代码 [74f7d61](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/74f7d6112e531dfdf2b5736843b6875060f12a4f)。读 CURRENT_STATE/HANDOFF/既有审核及研究包。#49 已关闭，不重做其验收；本轮评审的是新增产品门槛，不是新工程 PR 或真实用户结果。八阶段与 A–F 主路线保留，只建议以下三个按价值/风险排序的放行修正。P0 表示相应产品决策的门槛，并不意味着现有本地工程候选存在 P0 缺陷或阻止无付费的开发。

### 1. P0 产品决策 / 01–02、08：可证伪的需求与强竞争对照，补全漏斗分母

**已证实：** 现有 [现场执行包](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/research/v1-fieldwork/README.md) 是六人、两领域、两工具、各 8 分钟、24–48 小时回访，真实参与者 0；研究中的题为原创受控材料，不是已发生的真实复习困难。公开产品资料重新核查：[ChatGPT Study Mode](https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt) 支持材料、开放题、纠正和后续练习；[NotebookLM 学习功能](https://blog.google/innovation-and-ai/models-and-research/google-labs/notebooklm-student-features/) 支持材料测验、引文解释及 Learning Guide；[现行官方原文定位说明](https://support.google.com/gemininotebook/answer/16179559) 和 [练习说明](https://support.google.com/gemininotebook/answer/16958963?hl=en) 还明确提供引用跳转、答案解释及闪卡续学。故引用、主动练习、AI 导学或进度恢复均不能直接算独有优势。这只是官方功能核实，不是登录后的比较实测。

**假设及补差：** 真正待验证的是“对同一个理解缺口完成来源核对、重讲和未见题自由解释时，比已有工具更少查找/重述/救援，且证据更易找回、严重错误不增多”。沿用现有六人、S/N 交叉顺序和未公开题，不另起研究。首次会面原有经历问题补“最近一次实际讲不清、30 天内是否再次发生、用什么工具怎样处理、实际花费/遗漏/放弃了什么”；不先介绍卖点，不以兴趣或研究任务本身当作需求。原研究普通 ChatGPT 条件应保持可用的同类学习能力、允许正常引用与复习，不故意禁用必要功能；冻结实际模式、版本/设置及统一任务。六人不分成三个小组；在未来授权和工具可用时选与目标用户真实替代行为最匹配的强对照做现有配对任务；若保留普通助手条件，另以同任务公开合成材料进行 NotebookLM 来源/重讲/恢复的产品走查，单列结果，不把未做的第三工具当已比较。替换或增加服务须先确定授权、数据与费用，不是当前许可。

**具体放行（建议预注册的形成性决策规则，非市场统计阈值）：** 机会：六位中至少四位独立描述近期实际重复场景及现有替代方案的具体摩擦，才能把该场景留作下一轮验证重点；达不到先收窄或停，不作市场规模推断。对照：在可用配对中记录首次独立完成、从任务开始到同一遗漏修正的时间（含失败/截止）、首次查证、操作/提示重写/救援、一次等价的重开恢复任务，以及 24–48 小时未见自由解释三项盲评。首次开始前可用不透露答案的熟悉度/独立解释基线，避免把本来就懂算成产品改善。以每位配对结果为主：建议至少 4 个可比较配对，且其中多数（至少 4 人/6 人的方向性证据才足以优先扩大验证）在至少一个事先选定的协调摩擦指标改善、修正质量不下降；同时列出两领域、工具顺序、严重误判及延迟解释的相反案例。样本不足或混合即未定；若现有助手已轻松完成同任务，不扩大通用定位。此规则仅供是否继续投入/下一轮研究，不是证明统计优势或因果教学效应。保留现有 [结果表](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/research/v1-fieldwork/results.md) 中“合格未见无辅助首答”的条件性比例，但并列报告所有已分配任务/应给延迟题的链路结果和流失（已开始→首次诊断可用→修正→应回访→实际回访→合格独立首答→三项全对），两工具按人配对、列未配对原因；不把失访或已见直接判知识错误，也不能让排除后的高比例掩盖整个任务掉队。另行区分自愿回访与主持人安排的回访，不以研究到场率当自然留存。现场研究尚未授权，本轮只补判据。

### 2. P0 质量与上线决策 / 06–08、AI：先判严重错误与可用性，再比较价格；回滚必须保存新证据

**已证实：** [现有同输入协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/research/quality-baseline-2026-11-18/PROTOCOL.md) 已冻结 14 个合成案例、评审单位、默认三次及所有失败保留，明确尚未冻结通过率。新版八阶段写了严重错误类别和成本/延迟，但未明确严重错误的放行否决、何谓可用诊断，以及失败槽位和原始错误与呈现错误的区分。#42 音频比较已有关键数字误听证据，不重跑。[本机说明](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/README.md) 的备份恢复是建立新副本（另起七天），不是原位回滚合同；当前候选记录仍包含 v6 的新增语义。已见向后读取/往返证据不等于旧程序能不丢语义地处理新数据。未见本轮正式回滚演练证据。

**具体放行 A（模型）：** 复用同输入协议，不新做大规模 eval 平台。先区分两个实验：产品 vs 来源型助手（端到端任务/工作流）与同一产品提示/schema/校验路径下当前文字模型、轻量档、高推理档（模型选型）；不能混报。冻结实际模型/快照或别名限制、参数、输入哈希、输出约束、重复次数、授权预算及评审阈值，再盲评；14 例和基线先用于校准评分规则并独立复核关键锚点，新增反例只补否定/关键数字、错误来源/条件/版本、正确解释不硬判错等真实高影响缺口。每请求按槽位分为合格/不可用/失败，保留拒答、超时、校验拒绝、未知计费。合格诊断须同时有可核对且适用的依据、正确区分已表达/缺口/应暂缓、能帮助当前目标的下一动作；无缺口正确不强补，证据充分时全暂缓不合格。区分原始模型严重错误与程序截住的错误、实际可展示的严重错误；不能靠程序拦截全部获得“质量通过”。建议预注册硬门槛：冻结高影响例中任一**呈现给用户的严重错误**（颠倒关键条件/数字、虚构关键依据、把无证据作答当独立通过或严重错绑）否决该候选切换/扩大灰度；截住的错误算不可用且逐例记录。候选切换还须达到事先冻结的合格数及各关键类别标准（建议小样本不低于生产基线的合格数、无新增关键失败模式），并带来可解释的延迟/费用收益；均值不能抵消重大错判。合格率用所有分配请求槽位、成本用所有实际/未知调用支出对可用结果数、延迟列成功与超时/失败并说明样本量，p95 仅描述性，不宣称 SLA。无独立标注/真实输出或成本未知则暂不切换。零观测严重错误不是零真实风险；真实文本比较、新 ASR 切换仍须批准。方法参考 [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) 的任务相关、盲评和人工校准；不依赖额外托管服务。

**具体放行 B（本机灰度/回滚）：** 将“候选可安装”“AI 可切换”“外部产品可放行”分别记状态。只做一次有用户数据结果的隔离演练：锁定当前/上一可用包 SHA 与独立 profile，保存更新前快照；用合成题在候选中新增讲解、来源版本、独立首答/草稿和对应报告，模拟严重错误触发停止新调用/使用、保存候选生成后的完整快照，回上一已验证包；若旧版不能识别新记录语义，明确不可原地降级，上一版只使用隔离旧快照而新记录完整保留、恢复新版后可重新读取；不能用导入成新副本/重置到期冒充原位无损。证明旧与新增记录仍可回查、费用账本未倒退或重复请求、实际恢复入口/包身份正确，不覆盖生产本机记录。灰度遇重大隐私、串题、丢记录、错误收费或用户可见严重语义错误即暂停受影响路径，定位/修复后定向复验再恢复；不通过改模型或扩大权限绕开。若旧版兼容性未实证，只能记录回滚限制，不宣布正式放行。此为后续 07 放行判据，尚未执行，不启动第二工程，不额外跑全量测试。真实灰度、付费、外传、生产 ASR、公开部署仍须明确批准。

### 3. P1 体验 / 03–05：一条“继续原问题”主线，不再堆卡片（承接已有桌面任务）

**已证实：** 第五轮已有 [窄正文截图](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/iterations/v1-experience/next-day-resume.png) 与 [style.css L255–260](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/style.css#L255-L260) 双列固定/正文未分配列的依据。该截图是修复前的回访走查，当前 CSS 仍为双列；本轮不重复验收 #49，后续 Codex 已有桌面任务，先以实际当前页面确认。可借鉴 [Apple HIG Layout](https://developer.apple.com/design/human-interface-guidelines/layout) 的自适应及阅读行宽、[ChatGPT Desktop 官方导航](https://help.openai.com/en/articles/20001276-moving-to-the-new-chatgpt-desktop-app) 的稳定 Recents/项目入口、NotebookLM 的原句定位和 [RemNote 的待练习队列](https://help.remnote.com/en/articles/16213222-managing-new-cards) 的将未开始内容与当前练习分开；这些是参考，不要求移植完整队列、品牌或卡片。少卡片、减少认知负担是否提升可用性仍是假设。

**方向和放行：** 保留当前桌面练习的一个阅读正文与就近主动作；材料隐藏时正文使用主区、居中/对齐可读宽度（如约 640–760px 上限，按内容与窗口调整，不当固定像素验收）；显示材料时才分栏。回访首页使用一条从既有状态派生的“继续：[具体问题/动作]”，点击直接进入同题、原报告/草稿，不增加第二套进度或重复入口。正文仅保留题面、作答区/本轮结果、一个下一动作；原文/原话、来源版本及历史首答通过短证据入口按需展开，返回仍聚焦原题。未见/无辅助两项自报、实际发送范围/过时/待复核及其他影响判断的提示保留在适当动作旁，不为视觉减法删除。以一个已有 1280px 普通练习恢复场景验证收起/展开材料前后图、提交或继续草稿、查证→返回焦点与原题/版本/答案不变；同一场景在 390px 基本重排与键盘操作，不重复全套。后续产品评估看首次正确动作和多余滚动/找回次数，不以截图美观代替用户观察。待有 PR/SHA、真实页面及报告后原 Chat 再做证据复核；不将本段视为任务已完成。

**Must Fix / Next / User Decision Needed：** 当前无新增已复现的产品 P0；1、2 是产品/模型/发布决定前的门槛补差，3 承接正在安排的桌面任务，普通决策无需请示。下一步 Codex 自主执行已有桌面维护与允许的离线验证；真正启动六人研究、NotebookLM 等新服务的数据交互、额外付费调用、生产转写、对外发行或改变留存需另行授权。本轮仅在已有 MASTER 审核队列追加评审意见，未改产品代码、未启动 Codex、未运行 Windows、未重复 #49 验收/CI、未招募/调用模型/发布。


## 2026-11-26 · #50 普通练习阅读列独立证据复核（第七轮）

**范围：** [PR #50](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/50) 当前 open、未合并，base `57fad6f5438e801c6b10d12ca383901956ab7210`，精确 head [217d222](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/217d2225f74fa34bb69d9e34cb682c11e18b86a4)。核对实际 diff（1 提交、6 文件：CSS +10/-2、20 行报告及四张 PNG）与 [报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/217d2225f74fa34bb69d9e34cb682c11e18b86a4/docs/iterations/2026-11-26-practice-reading-column.md)，实际打开全部四图。仅审本 PR，不重跑 #49。

- **成因已纠正：** 原样式更高特异性的练习材料定位将材料移至第二行，非 DOM 隐藏；正文自动落入第一行窄列。diff 移除两处旧材料定位约束，保留共享 grid 的材料第一行第一列；[CSS L256–268](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/217d2225f74fa34bb69d9e34cb682c11e18b86a4/study-teachback-app/style.css#L256-L268) 在桌面根据直接子级材料可见且 details open 决定双列或 max-width 54rem 的单列，收起仍保留 summary 和重新展开入口。移动端原单列规则 L294–300 保留。不涉及 JS、数据、题目或模型修改。
- **实页核对：** [改前1280](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/217d2225f74fa34bb69d9e34cb682c11e18b86a4/docs/iterations/v1-experience/practice-reading-before.png) 窄正文及大片空置，[展开1280](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/217d2225f74fa34bb69d9e34cb682c11e18b86a4/docs/iterations/v1-experience/practice-reading-open.png) 左材料与右题面顶部对齐（报告 255/770px），[收起1280](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/217d2225f74fa34bb69d9e34cb682c11e18b86a4/docs/iterations/v1-experience/practice-reading-closed.png) 正文居中、材料入口仍在（报告 864px），[收起390](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/217d2225f74fa34bb69d9e34cb682c11e18b86a4/docs/iterations/v1-experience/practice-reading-390.png) 单列可见题面、普通练习与返回原反馈按钮（报告正文358px、文档390px）。截图与测量一致，达到本 P1 布局目标；不据静态图声称键盘行为或独立复测。
- **恢复/查证：** 报告明确隔离 Edge 关闭再重开同一配置，自动断言题目和回答 ID 及普通练习身份不变，键盘 Enter 返回原反馈。配比合成题与四图一致；认可该定向工程证据，但本 Chat 未运行 Windows、未独立操作键盘，截图本身不能证明具体焦点/反馈 ID 或真人次日学习。报告记录产品 API POST、供应商请求均 0。脚本 -SkipBrowser 启停、健康检查及 /demo 200 仅为脚本运行证据，不是 Explorer 双击、物理录音或灰度/无损回滚。

**CI：** [45848545298](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45848545298) 由精确 head 的 workflow 查询关联。Run 45848545298=in_progress/未终态；Windows job 140008500971=in_progress/未终态；Node completed/success，Edge in_progress/未终态，提取 skipped。未新触发或重跑 CI。

**Must Fix：** 目前无代码/实页证据支持新增必修。产品/代码审查无阻塞，条件性支持合并此 SHA；必须等对应 Windows CI 进入 success 终态且 PR 头未变后才放行。

**Next：** CI 终态核对后由 Codex/负责人按既有规则决定合并，若成功关闭第五轮的阅读列 P1，不追加全量回归或额外界面任务。若 CI 失败，先查实际受影响路径。其他 V1 放行门槛、真实用户、回滚仍独立待验证，不属于本 PR。

**User Decision Needed：** 无新增即时决策。仅写审核队列，未修改产品代码、启动 Codex、点击合并、招募、付费或发布。


## 2026-11-26 · 离线 AI 质量与本机回滚放行复核（第八轮）

**范围与基线：** MASTER 读取点 `635b986b32b65e451ce0d210b5440ef7fe84ccde`。产品远端 [8d8f2d7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4)；#50 已合并，精确实现 217d222 的 [Windows CI 45848545298](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45848545298) completed/success，关闭第七轮等待 CI 的条件及桌面 P1，不重审布局。研究提交 [e3416fc](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/e3416fccd2fed596a96ffb294719755895f47c59) 相对产品头只有新增 54 行 [OFFLINE_REHEARSAL_2026-11-26.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/e3416fccd2fed596a96ffb294719755895f47c59/docs/research/quality-baseline-2026-11-18/OFFLINE_REHEARSAL_2026-11-26.md)，不含产品或评测执行代码；远端产品头仍是 8d8f2d7，不把研究提交视为产品合并。已读 [模型决策](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/635b986b32b65e451ce0d210b5440ef7fe84ccde/docs/master/reviews/2026-11-26-model-comparison-decision.md)、[快照回执](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/635b986b32b65e451ce0d210b5440ef7fe84ccde/docs/master/reviews/2026-11-26-local-rollback-receipt.md)、[最新门槛](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/635b986b32b65e451ce0d210b5440ef7fe84ccde/docs/master/V1_EXIT_GATES.md) 及相关源码。本 Chat 未运行 Windows/排练脚本，未见本机私有原回执；下列执行数来自所读报告，结构判断来自源码。

### 1. Must Fix（付费/切换门槛，不是新产品缺陷）：两项负控均留作严重语义盲评，不新增猜测式硬门禁

报告明确是手写占位 6/6 本地 200、8/8 定向拒绝、两项结构合法语义错误均被接受、5 个注入 fetcher 回退场景及既有 judgement 测试 4/4。真实 Luna/Sol 调用、费用、独立人工评审均为 0；这不能推出 6/6 模型正确或 2/2 真实模型错判。八项确定性拒绝保留，不重复加测或重跑。

- **暂缓问题被移到顶层**（defer-one-continue-other）：[judgement.mjs L29–62](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/judgement.mjs#L29-L62) 已能可靠阻止明确 deferred issue 被判为 judgeable、或在其 assessment/findingIndexes 中出现判断，但顶层 finding 没有可信的命题归属；同一材料、同一答句可包含独立的 FIFO 错误。按引用重合、数字或关键词屏蔽会误伤正常多条件回答，要求所有 findings 都绑定暂缓项也会阻塞合法的无关判断。只有已有可信的明确范围/命题 ID 时才可硬拒绝“明确属于 deferred issue 的判断”；模型自行给 ID 不能证明语义归属。当前不扩大 schema，不以 regex 假装修复。盲评硬判据：暂缓唯一容量（不判 8 错），仍须判出后入先出的错误；全题暂缓也不合格。
- **撤回句被当最终观点**（verbose-correct）：[schemas.mjs L9](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/schemas.mjs#L9) 已要求最终立场；[core.mjs L80–101](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/core.mjs#L80-L101) 校验的是精确引用、span 与版本，不能证明引用仍是最终主张。用“收回/不/改为”或最后数字的 regex 会误伤局部自纠、多个条件、引用他人观点及仍错误的最终结论。只有用户已明确确认某个最终命题/精确排除范围时，才可对该明确结构作窄约束；目前不强制新增用户标注步骤。盲评硬判据：最终 9 和预留理由正确，不给撤回的十个另判错；同时用 fluent-wrong 配对检验最终仍说十个时必须指出关键错误。不能因有自纠词就全部放过。
- 原 Chat 按 [controlled-cases.json](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/docs/research/quality-baseline-2026-11-18/controlled-cases.json) 核对上述参照及其余四例的材料、目标和答案：count-adopted 的等义 8、fluent-wrong 的限定 10 格容量错误、insufficient-evidence 的线程安全暂缓、required-omission 的正确 9 但缺明确要求的理由，与作者参照方向一致。这只是看过作者答案后的独立源码/材料复核，非隐藏配置的评审、非教师双评或真实模型输出。可免费先让非出题评审按原材料校准六例（重点是两个负控与配对正确例），记录分歧并先冻结合格定义和严重项；不新增样本集。

### 2. Next：付费前唯一最小可执行准备 = 可离线验收的隔离比较预检包

报告已锁六个语义输入哈希、共同 instructions/schema 哈希、两个配置两次的顺序；但明确说尚非可执行线上清单。相对 8d8f2d7 的研究提交只见报告，没有可在仓库核对的隔离发送器、冻结配置/总预算及盲评导出回执。现有 [provider.mjs L22–57](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/provider.mjs#L22-L57) 固定 Luna/none/1800/60 秒，[ledger.mjs L37–49、53–70](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/ledger.mjs#L37-L70) 拒绝非 Luna 的 semantic 预留且费用按 Luna 算；直接替换模型字符串会混淆计价和部署配置。模型决策的示例成本不是已核实硬上限。

**仅准备一个研究目录内的预检入口和 manifest**（建议路径，尚未创建：`docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs` 及同目录 `run-manifest.json`；复用已有 [PROTOCOL.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/docs/research/quality-baseline-2026-11-18/PROTOCOL.md)、[review-template.json](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/docs/research/quality-baseline-2026-11-18/review-template.json) 与 e3416fc 的映射，不复制数据或改生产代码）。在无真实 Key/出站的 mock 模式中核对六例实际 input/instructions/schema 哈希一致，列出 6×2×2=24 个固定槽位（首轮基线先、次轮候选先）；锁 Luna 与 Sol medium 实际拟用配置、共同等待口径、各自总输出上限（含推理）、费用表/日期和最坏预留计算，独立评测账本与停止条件，保持原始响应、盲号和映射隔离。实际模型快照/可用档/strict schema 接受及账户权限仍待授权后首个正式槽位证实，预检不消费额外一次真实请求。任何不兼容、未知费用或预算无法约束即暂停，保留槽位，不补跑/静默改配置。盲评模板增加/明确严重可呈现错误、原始被拒错误、合格/不可用/失败及费用/耗时的独立字段；所有 24 槽位为分母，零严重错误不是零风险。先用一条两配置 mock 及一条失败/未结算样例确认路由、盲号和预算逻辑；不机械模拟全套网络组合、不建评测平台。

**放行条件：** 无出站回执、实际哈希一致、24 槽位清单、冻结判据/独立参照校准记录、最坏预算可计算和失败不重试；然后才可把具体金额/配置/停止条件作为一次明确的 User Decision Needed 提案。未批准前真实请求为 0，不认为预检能证明真实供应商兼容。若获批后有任何呈现给用户的严重语义错误，该配置不得用于切换/扩大灰度；程序拦截的错误计不可用，不能只比较成功样本。不要用生产的 1800 上限照搬 Sol，或以估算平均费用代替硬预算。不比较第三模型、不改变 ASR、不招募；真实用户迁移仍为另一条证据线。

### 3. Next：承认同结构隔离快照换包子门槛，暂停重复回滚测试

[本地快照回执](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/635b986b32b65e451ce0d210b5440ef7fe84ccde/docs/master/reviews/2026-11-26-local-rollback-receipt.md) 记录旧包 74f7d61→候选 217d222（合并树 8d8f2d7）→旧包/更新前独立 profile→候选/更新后独立 profile，旧题、旧答、原时间与原反馈关联保持，新版可回查新旧两答；三份测试账本一致，服务关闭，无产品 API POST/真实调用。没有导入成新副本或重置期限，符合“旧状态可回退、新状态不被覆盖”的**同数据结构、隔离快照换包**子门槛。基于协调者核对的回执认可此项工程演练，不宣称本 Chat 已检查私有截图或本地原件。

它支持继续安全的本机离线候选使用、同结构换包准备；不支持旧版直接打开新版 profile、跨 schema 原地降级、合并两份分叉状态、真实付费账本回滚、真实灰度/公开发行或 AI 模型切换。第六轮提出的新增材料版本/讲解报告/草稿与模拟严重错误断路，本次回执仅覆盖新增第二条普通答题证据，未分别验证；脚本启停也非 Explorer 双击。无需为了完整表格重做本轮；后续只有实际数据结构、账本或发布路径改变时，对受影响的真实用户结果补定向演练。阶段 07 仍须按发布对象、授权和实际数据兼容性单列，不把此子门槛当整体放行。

**决策总结：** 暂无新增已证实的产品代码 Must Fix；必须补的是实际模型比较的预检/盲评放行证据。三项下一动作仅为：保留并校准两个语义严重项；准备一次隔离比较预检包；关闭同结构快照子项并保留其边界。当前真实参与者 0、此次模型实际输出 0、费用 0。无新即时审批；24 次真实调用须在明确配置和硬预算后单独批准。本轮仅追加原 MASTER 审核队列，未修改产品代码、启用额外 Codex、触发 CI、招募、付费、更换模型或发布。


## 2026-11-26 · 模型比较预检包独立复核（第九轮）

**范围：** 只复核第八轮唯一后继产物 [b646f47](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/b646f47a0de08c37e4146def1ecbf52eb7447957) 的 [MODEL_COMPARISON_PREFLIGHT.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/MODEL_COMPARISON_PREFLIGHT.md)、[run-manifest.json](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/run-manifest.json)、[model-comparison-preflight.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs)。研究提交仅新增三份研究文件；远端产品仍为 8d8f2d7，MASTER 读取点 `478f5117ca6cd4487fee2031dfaaa18d18f516ee`。不重审 #50、不开发、不新建执行任务。

### Offline preflight：PASS_OFFLINE_ONLY（认可，关闭第八轮离线预检子项）

- **24 槽与指纹：** 独立枚举 manifest 得到 E01–E24 全部唯一、6 案例×2 配置×2 次，两轮各按案号顺序并反转 Luna/Sol，12 槽/配置。逐一对照 e3416fc：六个输入哈希及共同 instructions/schema 哈希全一致。另以独立 SHA-256 计算核对 manifest 的 LF 哈希 `832bd32efebd04b1d8a2869c58a7cfd9421cfcfd1eba165d3bb437a67692699b` 与 PROTOCOL、controlled-cases、review-template 三份原始文件，4/4 相符。[脚本 L39–84](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs#L39-L84) 用实际本地规范化/校验函数重建输入并断言指纹，报告记录 6/6 成功；原 Chat 未重跑该 Windows 脚本，不把静态对照及文件哈希称作独立重建六个运行时 payload。
- **无出站范围：** [L8–38](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs#L8-L38) 要求 scoped Node 权限、输出为指定新空目录，禁止子进程/worker/addon/WASI；覆盖浏览器式传输、getBuiltinModule，并将后续模块解析限定四个本地模块。net/dns/http/provider import 及 fetch 五个探针在进程内被阻断，未发送 DNS/TCP/HTTP 或回环请求；没有实际 provider、凭据加载、联网发送器。认可受审代码的程序内隔离，不是对任意代码的系统防火墙、网络抓包或目标 API 项目合规证明。
- **断路：** [L112–155](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs#L112-L155) 先预留再调用纯函数，E01/E02 mock 输入相同且不携带配置/槽号；E03 未知 usage 时保留 Luna 的全额 US$0.006172，后续 21 槽均不发送、无重试。独立复算两个模拟结算加未释放预留为 US$0.010480。只验证所述三次 mock，journal 为内存，60 秒是模拟超时值；不是耐崩溃账本、真实超时/不合格 JSON 计费或网络断路实测。
- **盲评分离：** [L149–160](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs#L149-L160) 给 24 槽生成随机唯一盲号并洗牌，评审侧只导出两条 mock、caseId/可用性及空值评审字段；原始返回、配置、重复、槽位映射、预算留 operator。预检证明交付格式，不证明独立人工盲评或访问权限隔离。真实输出若含自报身份，仅对评审副本去标识，保留原件；不得向评审交付 operator 目录。实际独立参照校准及评分仍 pending。

### 预算核对：US$1.275504 算术与公开标准费率一致，非无条件硬上限

[manifest L21–75](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/run-manifest.json#L21-L75)、[脚本 L85–108](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b646f47a0de08c37e4146def1ecbf52eb7447957/docs/research/quality-baseline-2026-11-18/model-comparison-preflight.mjs#L85-L108) 一致锁定短上下文、Standard、文本、串行、60s、30m TTL，最大编码体 14,000 字节＋2,048 隐藏包装预留＝每槽 16,048 输入 token（本地估算）。Luna 输出上限 1,800；Sol medium 6,000，均为包含推理/可见输出的总量。独立按整数单位复算：

| 配置 | 普通输入/30m 写入/输出（USD/百万 token） | 单槽预留 | 12 槽 |
| --- | --- | --- | --- |
| gpt-5.6-luna | 0.20 / 0.25 / 1.20 | 0.006172 | 0.074064 |
| gpt-6.2-sol | 2.00 / 2.50 / 10.00 | 0.100120 | 1.201440 |
| 合计 | | | 1.275504 |

重新核对公开 [Luna 模型费率](https://developers.openai.com/api/docs/models/gpt-5.6-luna?trk=public_post_comment-text)、[Sol 模型费率](https://developers.openai.com/api/docs/models/gpt-6.2-sol)、[短上下文定价](https://developers.openai.com/api/docs/pricing?context-length=short)、[Prompt caching 官方指南](https://developers.openai.com/api/docs/guides/prompt-caching?site_locale=en) 与[推理上限说明](https://developers.openai.com/api/docs/guides/reasoning)。30m 写入为普通输入价的 1.25 倍**总费率**，不是普通输入上再加一笔；无缓存命中折扣的全量预留在上述假设下保守且正确。12h 写入为 2.5 倍，地区/FedRAMP 等端点可能有额外溢价，不能沿用这一金额。TTL 是缓存最短生命周期，不是删除期限；store:false 亦不证明零保留。项目实际费率、endpoint、tier、权限、数据设置仍未实证。16,048 也非供应商公布的可计费 token 硬限制；超界后停止后续槽并保留未知暴露，不能撤回当前已发请求的费用。真实执行前须锁定可用的保守计费边界/上限及授权；不以预检估算当账户级消费硬封顶、实际账单或付款许可。

### Must Fix / Next / User Decision Needed

- **Must Fix：** 无新增离线预检缺陷。两个手写严重语义负控继续纳入评审；不加 regex，不重跑 #50 或上述预检。
- **Next（只保留既有真实比较放行前置，不另造任务）：** 非出题评审先完成六例评分锚点独立校准，冻结严重项/可用性口径；真实运行须落实报告已经明确的隔离发送、耐崩溃预留与断路、原始响应保存及盲评导出，在实际项目核对模型/参数/费率/缓存及数据处理条件和可执行的成本上限。核对实际运行树及输入指纹；不能直接把本内存 mock 接上网络。账户实际 schema/档位兼容性只能在获批后的首个计入槽位证实，遇不兼容/未知计费即停，不另开探针、不偷偷换档、不补跑。保持原 24 槽与配置，配置或费率条件不成立则先停止，不扩大比较或修改产品。真实调用还须用户明确批准对应预算和停止条件；当前只认可离线准备，未授权真实执行。
- **User Decision Needed：** 当前不执行或申请新额度；六人形成性研究（既有 ¥330 提案）、实际模型比较、生产切换、正式灰度及公开发布均仍未放行，彼此独立。模型比较不能替代真实用户价值或次日迁移证据。本轮实际模型请求 0，实际支出 0，参与者 0。原 Chat 只读报告和源码、独立核对哈希与算术，未运行 Windows、重跑脚本、改产品代码、启动 Codex、招募、付费、更换模型或发布；仅写本审核队列。


## 2026-11-26 · 离线账本重启独立复核（第十轮）

**范围：** [53d752b](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/53d752b9d9d75bd4933f4fe8090ee769c6bea474) 相对 b646f47 仅新增 [MODEL_COMPARISON_JOURNAL.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/MODEL_COMPARISON_JOURNAL.md) 与 [model-comparison-journal.mock.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/model-comparison-journal.mock.mjs)；manifest、预检与产品代码不变，远端产品仍为 8d8f2d7。MASTER 读取点 `6b4332a9f83c1b8d9c829462e7ea262277cf183f`。本轮只审这两份新增产物，不复核 #50 或第九轮预检。

### 审核结论：认可 PASS_PROCESS_RESTART_OFFLINE_ONLY，关闭离线账本的本次中断恢复子项

- **预留先于 mock 边界：** [L28–41、L43–73、L85–90](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/model-comparison-journal.mock.mjs#L28-L90) 核验固定 manifest 指纹、预算及槽身份，SQLite 使用 BEGIN IMMEDIATE、synchronous=FULL。reserveNext 在事务内核对已有未知/待结/已知失败、累计暴露与下一槽，条件更新为 reserved_maybe_dispatched；tx 成功 COMMIT 返回后才进入 pureMock，回调只接 inputSHA256。事务异常不进入回调。没有真实请求发送器或读 Key。
- **实际进程重启及禁止重发：** 报告记录 Linux 云工作区 Node 24.22.3 两个独立进程。[L92–112](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/model-comparison-journal.mock.mjs#L92-L112) 首进程在已提交预留且进入 mock 后写边界见证，exit(77) 未结算；第二进程断言 E01 状态、盲号、预留时间、金额与见证相同，将其持久化为 unknown；后续 tryNextMock 返回 false，回调 0 次，后 23 槽 not_sent，E01 全额 6,172,000 十亿分之一美元（US$0.006172）仍计入暴露。原始响应为 null，未伪造。接受报告的这一条实际进程中断证据；不是断电/磁盘损坏/Windows 重启、真实供应商收费或网络超时的验证。本 Chat 只审源码及回执，未独立运行或取得原 SQLite 文件。
- **结算和盲评边界：** [L74–89](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/model-comparison-journal.mock.mjs#L74-L89) 对 mock 原字符串、usage 范围、推理/输出关系、金额和结果类别设条件；合法已知失败可结算并停止，不支持/未知结果留全额。此次在结算前退出，未执行正常/失败结算分支，不把这些静态逻辑称为运行验证。[L113–124](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/model-comparison-journal.mock.mjs#L113-L124) 操作员文件保存全槽及盲号映射，评审文件为空（无可评输出）；已有非空 mock 导出沿用第九轮证据。SQLite/见证及 operator 目录均属操作员，目录不是 ACL，不能将完整目录交评审；此次无真实输出、无人评分。

### 真实调用前只保留必要前置（不另开离线任务）

**可免费准备：** ① 非出题独立评审完成六例评分校准，先不看作者判分/配置/映射，保留分歧并冻结严重语义项及可用性判据；不重做手写负控或加 regex。② 在既有比较方案内完成独立实际发送路径的最小执行准备和离线核验：复用冻结 manifest、运行时输入/提示/schema 指纹、隔离持久预留及停止逻辑，原始结果/可信 usage/请求归因与结算原子关联、未知或账本异常停止，禁止隐性重发。报告已明确该 mock 不是实际发送器；无须另造 mock 账本或重跑本次中断。实际运行须绑定单一获准 run ID 与唯一持久账本、操作员及恢复路径；[L22–24](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/model-comparison-journal.mock.mjs#L22-L24) 只验证同一路径的空目录/现存数据库，不能防止在另一个空目录新建同 manifest 账本；数据库丢失或路径不明时不得另建账本接续原实验。这是实际运行的必要边界，不是本次单库 mock 的失败。评审仅取得去标识的可评副本，原件/映射/账本访问与删除期限须明确。

**需批准或核对获准项目：** 一次集中确认原 24 槽、具体项目、实际预算上限和停止规则、模型档位/版本、费率与缓存/服务数据处理条件；前轮 US$1.275504 仍仅是原假设下的条件性预留，须落实可执行费用约束。实际授权前不读 Key、不发送请求；供应商实际 schema/档位兼容性只在获批首个正式槽验证，不额外探针、不热改或补跑。若实际条件无法核对则保持暂停。

**Must Fix：** 无新增已证实的离线账本缺陷。本轮关闭此离线子项，不再重复排练。**Next：** 仅完成上述免费准备和明确实际比较授权，不增加工程范围。**User Decision Needed：** 真实 24 槽付费比较仍需单独批准；六人研究、生产模型/ASR 切换、正式灰度及公开发布均仍未放行。本次为 mock 重启报告，真实请求 0、费用 0、独立人评尚未完成。仅追加原审核队列；未改代码、执行脚本、读 Key、调用模型、启动 Codex、招募或发布。


## 2026-11-27 · 全局产品主线审核（第十一轮）

**整体判断：** 基于 #50 合并头 `8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4`、当前 HANDOFF、基础调研专题已记录的“低操作成本查证修正、次日未见题迁移”设计方向（未重新取得完整 Word），现有本地启动/导入、来源版本、证据 ID、草稿与历史/备份、确定性状态和受控模型职责值得保留；应优先打通用户主动选择新学/续学及真实课件下同一缺口的验证链，不换栈、不重复第7–10轮模型/工程排练。次日重开是续学，不是已验证的延迟学习收益。

**两项风险：**
1. P0 入口 Must Fix（代码已核，Windows 待复验）：[demo.html L9、L28](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/demo.html#L9-L28) 两个链接都到 /，[app.mjs L853–858](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/app.mjs#L853-L858) 无新建草稿且有历史时自动续上次活动。示例用户明确要开始自己的学习却回旧题。认可 Codex 正在做的显式新建意图，复用 [newTopic L749–756](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/app.mjs#L749-L756) 与已有新建草稿/保存路径；普通启动保留自动恢复，显式新建/首页不被其覆盖，不清除已有主题或草稿，不隐式发送 AI 请求。无需另派任务。
2. P1 核心价值断点（代码能力限制已核，真实长材料用户路径待核）：[bounded-understanding.mjs L4–12、L58](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/bounded-understanding.mjs#L4-L12) 要求整份 source.text 等于命中引文且只认有限语法；[practice.mjs L127–175](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4/study-teachback-app/practice.mjs#L127-L175) 未匹配进入 taskUnavailable，而普通新情境请求 focus:null、source_visible，未带原缺口 origin。故真实多句课件即使成功诊断/重讲，也可能无法继续同一缺口的独立检验；不能以普通练习答完或恢复原题代替未见迁移。保留安全的规则题与不可判边界，不扩充一堆正则或声称开放题都能独立评分。

**Next：** 承接当前显式新建修复，下一条产品切片聚焦“自己的多句材料→同一缺口修正→有依据的下一步→可继续的验证”。只在现有规则不适用时，保留原 feedbackRef/来源版本/目标与待检验状态，提供明确的针对性开放练习入口（需要模型时显式确认；无 Key 可留草稿或明确待检验）；不虚构题目、评分或完成状态，不新增模型/存储架构，不要求本轮自动按日换题。已有来源/反馈/首答 ID 与备份合同沿用；实际模型调用和用户研究仍按既有授权。

**一个实际入口验收：** 用隔离 Edge、有旧主题 A 的候选，从免费示例点“开始自己的学习”，直接进入新建材料 B（含一条规则和另一句相关说明，不是单句规则夹具），保存文字并用隔离模拟反馈完成一次同缺口重讲；当规则不能出题时，用户仍可沿该缺口进入可继续的练习/待检验路径，不被导回无关对话或误记独立通过；关闭重开后恢复 B 的准确位置，再从记录返回 A，A 的旧证据不变，B 可按原备份机制导出。先验入口→新主题；后续切片仅补实际断点。此为一个纵向验收建议，尚未执行，非已交付。无需付费或重跑全套。原 Chat 未运行本机页面、未改产品代码，Codex 仍是唯一实现者；本轮仅写原审核队列，未扩大数据、费用或发布范围。


## 2026-11-27 · 第十一轮续审回执｜#51 入口修复，CI 待修

[PR #51](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/51) 精确实现 [84885dc](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/84885dc8283718a5b332a147be958ef770f8a98a)（未合并，基线仍 8d8f2d7）。接续本轮 P0，原 Chat 已独立查看 diff、[报告及两张 Windows Edge 实页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/84885dc8283718a5b332a147be958ef770f8a98a/docs/iterations/2026-11-26-demo-own-study.md)；本次接力复查远端状态未变，归档既有结论而非重复执行。产品入口设计可接受：new 进入新材料并聚焦标题，home 保留首页选择，默认 / 保留自动续学与草稿优先；进入主题时 replaceState 清除 entry，已有草稿恢复和旧题旧答保留的定向路线见报告。原 Chat 未独立运行 Windows 页面。无实际学习效果结论。

**Must Fix：** [该 SHA 的 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45867977434) Node regression 失败，Edge regression 跳过。已查看日志及 [provenance.test.mjs L15–31](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/84885dc8283718a5b332a147be958ef770f8a98a/study-teachback-app/provenance.test.mjs#L15-L31)：两项 A1 learn/success、repair/request 报 URL is not defined；新增 renderTopic 使用浏览器 URL/location/history，而 VM 上下文未注入相应环境，截取范围也遗漏 requestedStudyEntry。仅修正既有 VM 测试环境与函数加载，保留原断言；待修正 SHA 的 Node/Edge CI 成功，不把当前红灯称已验收或自行合并。没有已证实的浏览器功能 Must Fix。

**Next：** 入口合并门槛通过后沿第十一轮既定多句材料→同一缺口→针对性练习/待检验切片继续；不重开旧模型评测、重复回归或新建执行任务。**User Decision Needed：** 无新增审批；既有实际付费、数据、生产模型与发布边界不变。未修改产品或发起真实请求。

**Codex 执行回执：** [1208fb7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/1208fb7c9653997e9be479f8b41de659d5ebc31f) 仅补 VM 环境的 URL/location 与加载真实 requestedStudyEntry，原断言、运行时和实页报告不变；原先 2 项本机重现失败后修至 2/2。[对应 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45868278893) Node、Edge 均通过，依据原 Chat 续审关闭 #51 唯一 Must Fix。按 expected head 合并至 [036a361](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/036a361dfaeee6075b9f8c32d112072466933387)，未重复跑测试。

## 2026-11-27 · 第十二至十四轮归档及最终 CI 增量复核｜#52–54

**范围：** 以队列上次已记录的 #51 合并头 [036a361](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/036a361dfaeee6075b9f8c32d112072466933387) 为起点。本次将原 Chat 已完成的第十二、十三、十四轮独立 diff/实页审核结论归档，仅新增核对后续精确提交、CI 和远端合并状态，未重跑已验路径。当前产品分支实际头为 [c81c5fc](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/c81c5fccce4e9ece63af00b30b27e2342c3d9994)，查询无面向该产品分支的开放 PR。

- **第十二轮 [#52](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/52)**：实现 [6b16239](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/6b162390d2b3376d2557d98cf12a6f9008d70896)，[前后实页及报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/6b162390d2b3376d2557d98cf12a6f9008d70896/docs/iterations/2026-11-27-multi-segment-gap.md)。无安全本机题时保留原反馈、版本和待检验状态，支持同点本机重讲和返回，普通无关 AI 出题不再替代；保存重讲不造题、不评分、不记独立通过。单段规则题对照保持。另一份草稿保护当轮仅经源码核对。原审无新增 Must Fix；对应 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45869579086) 已通过，远端已合并至 [15a25a3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/15a25a3f136b2d70e28e08064f816e62120106d5)。多段缺口的独立新情境仍未闭合，不把重讲当迁移证据。
- **第十三轮 [#53](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/53)**：原审 [3db1dc5](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/3db1dc52fbbf566c5df06224bd80063604972871) 认可 A/B 草稿冲突修复：标题、内容和提交同属 A，先保存或清空再切 B；390px 键盘、关闭重开及分别入档见[报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/787bfc0e4c1d85312a25ffc28b6223ed022b6e6e/docs/iterations/2026-11-27-feedback-draft-scope.md)。唯一 Must Fix 为改变学习目标后重讲可能错绑新目标。复审 [787bfc0](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/787bfc0e4c1d85312a25ffc28b6223ed022b6e6e) 新差异及实页：makeTextAttempt 从精确 feedbackRef 取原来源快照，普通新讲解用当前目标，无法定位原反馈则保留草稿，移除保存时覆盖快照；目标 B 仍保留、旧反馈重讲仍用 A。原审关闭该项；对应 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45874302851) 已成功，远端合并至 [97befee](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/97befee09dcded6f23d8cf078e97cd8c2b4f8f05)。
- **第十四轮 [#54](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/54)**：原审 [b051b16](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/b051b163a1b96179456d338c6f0a579871501220) 和[双图/报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b051b163a1b96179456d338c6f0a579871501220/docs/iterations/2026-11-27-first-save-local-next.md) 认可首讲核对区就近显示已存本机及再讲动作、无 Key 不显示禁用诊断，模拟配置后主动确认才发一次 loopback mock、发送范围明示；首次保存失败及已尝试诊断/历史报告不按未发送展示。唯一 CI 阻塞为 [旧 run](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45875375495) 七个 VM 测试缺少 group.prepend，Edge 跳过。本次独立检查最终提交 [ecdb26c](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/ecdb26cc7ec9386216b7459389cc2b524547dd65)：只在 correctness-boundaries.test.mjs 的模拟 DOM 加 prepend 和 parentElement，未删改原断言、运行时或实页。该 SHA 的 [最终 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45875960516) job 140102974372 确认 Node、Edge 两步均 success。关闭该 CI Must Fix；远端 #54 已合并，当前头 c81c5fc。新截图支持 390px 的这条路径，不推断所有视口/设备均实测。

**Must Fix：** 上述已记录或此前独立审核发现的阻塞全部关闭；本次无新增可证实的必修。并非正式发布或真人学习价值放行。

**Next：** 保持 A–F 全局方向，以当前候选的完整任务自主走查为主，优先实际阻断用户完成任务的一个切片；不扩展开放练习或再做旧专项测试。记录中 [CURRENT_STATE](../CURRENT_STATE.md) 的最新源码 ZIP 指向 c81c5fc；其所述干净包启动/关窗恢复/备份恢复/停服回执属于 #53 的 787bfc0，#54 的实页与 CI 是另外的证据，不能合称最新 ZIP 已独立验收。只在下次实际交付走查时核对版本和可继续动作，避免重复打包验证。负责人已明确不亲自试用，Codex 自主进行隔离本机合成课件走查；不要求负责人试用、不招募。真实回访、未见迁移及模型质量尚无新证据。HANDOFF 的较早入口摘要以 CURRENT_STATE 最新实际头及本条记录为准。

**User Decision Needed：** 无新增审批；既有实际付费、数据政策/外传、生产 ASR 切换、招募和公开发行仍未授权。本次为原 Chat 独立源码/截图/报告审核归档及最终 CI 核对，不是独立运行 Windows；未改产品、合并 PR、启动第二个 Codex、发真实请求或重复回归。

## 2026-11-27 · 第十五至十七轮归档与最新候选放行边界

**范围：** 自队列已记录的 #54 合并头 [c81c5fc](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/c81c5fccce4e9ece63af00b30b27e2342c3d9994) 接续。当前远端产品头 [c101706](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/c10170669c397f352b7529d531432acb3bb9175d)，与 CURRENT_STATE / HANDOFF 一致，无面向产品分支的开放 PR。本次归档原 Chat 第十五至十七轮已完成的独立审查；新增仅核对最终修正、CI、合并和证据落库，不重复既有测试。

- **第十五轮 [#55](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/55)**：原审 [3427b83](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/3427b83cfeb68c596f26bb096c83fb09fb4a59c8) 确认事务内 CAS、同对象排队和双页首答保护；同主题材料暂存副本普通写入失败未触发恢复区为 Must Fix。复审 [924d2e5](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/924d2e50ce181d91e479f12d02568ca7a48ff951) 按主题 ID 归属恢复状态，冲突隐藏重试、导出旧页草稿，明确确认备份下载后再刷新或关闭；[修正回执与实页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/924d2e50ce181d91e479f12d02568ca7a48ff951/docs/iterations/2026-11-27-prevent-stale-page-overwrite.md) 记录普通故障解除后恢复草稿、显式保存只增加一个材料版本，以及跨页首答 ID 不变。原审关闭 Must Fix，待 CI。本次新增核对最终 [22d3964](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/22d396461f1ffb44f35542f8eaabbcb0cb4b5689) 仅在 browser-question-review-checks.mjs 等待复核区域可见且输入控件启用，运行时与原断言不变；[对应 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45882063672) job 140123559454 Node、Edge 均 success。远端已合并至 [bd6b569](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/bd6b569f8d39f4f71ff74590db40d328bcf61955)。
- **第十五轮文档支线 [#56](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/56)**：[0c6b7d1](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/0c6b7d1063d1a270b8d1c5541d37a09e7e7f37df) 仅 README，将推荐体验 ZIP 固定于实测 #53 的 787bfc0，最新源码指向 CURRENT_STATE，均非正式发行。原审认可单独合并，无代码依赖；已合并 [0f3bee6](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/0f3bee674de6391fed43f5bb2fb00091d5af8206)，不重复跑回归。
- **第十六轮 [#57](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/57)**：原审精确实现 [d17d1e6](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/d17d1e6543f41a6634306cc11e28a1eacd07be4c) 认可单条 taskUnavailable 与 activePracticeId 分离；旧题、搜索/历史/材料上下文跳转保留待检验，档案按完整 sourceId/attemptId/transcriptVersion/reportId/findingIndex 续接，无新增存储或评分格式。现 PR 已补[隔离 Edge 回执与两张合成实页](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/e8325fa9df1c329721d7dba3b4f09a36da873c48/docs/master/reviews/2026-11-27-pending-check-edge.md)，第十七轮已查看实页：旧题 9 克首答和局部重讲保留，刷新后从匹配档案回原缺口；新增题、作答、评分、独立通过、POST 均为 0。本次核对 [最终 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45882993558) job 140126673443 Node、Edge 均 success，原审两项放行条件均满足，远端已合并至 c101706。
- **第十七轮全局判断**：[最新整包验收回执](2026-11-27-final-package-acceptance.md)确认精确 c101706 的 git archive ZIP 原件在 Windows PS5.1 -NoBrowser + 隔离 Edge 完成免 Key TXT 导入/首讲保存、免费示例预写反馈、重开、v1 备份独立恢复、反馈导出和停服。GitHub 直下 ZIP 超时未验其二进制，最后等待 Edge 父进程退出超时后独立确认已关闭；不称整套自动化脚本通过。免 Key 不生成自有材料的新诊断。工程师视角保留确定性证据、版本和状态架构；交互视角实际 #57 页面正文「就这点再讲」与底部「继续待检验」「我来讲讲」并存，主动作层级可收口，用户是否混淆尚待真人验证；产品视角独立延迟未见迁移才是待验证核心价值，预写反馈、保存重讲与规则题首答都不能代替。

**Must Fix：** #55 原必修与 #57 条件式放行均已关闭；本次无新增有证据的工程阻断。Windows 本地免 Key 文字版工程验收完成，尚未放行真实 AI 质量、受控真人研究或正式发行。

**Next（沿 A–F，非新增任务）：** ① 优先在现有工作台收口当前任务与主动作，Apple/ChatGPT Desktop 仅借层级、稳定导航和就近操作；保持来源查证及档案可达，不模仿外观，不堆面板；仅按新变化验 1280/390px、键盘和原任务返回。② 复用六人方案及既有盲评预检，补独立评分校准，区分操作摩擦、诊断质量与 24–48h 未见自由解释；不新增评测框架、账号/云同步、Agent、模型或泛化评分。③ 交付说明明确实测 ZIP 与同提交源码入口、免 Key 能力、备份及保留期；Explorer 双击和物理麦克风在具备设备条件时定向核对，不重复本次文字整包路径。普通取舍由 Codex 自主推进，不要求负责人代测。

**User Decision Needed：** 无新审批事项；真实付费模型试验、真人招募、数据政策或外传、生产 ASR 切换及公开发布仍按既有授权边界暂停。仅独立源码/截图/回执/CI 审核及归档，未自行运行 Windows 页面、重复回归、启动 Codex、修改产品代码或合并，不宣称真实学习效果。

## 2026-11-27 · 第十八轮归档｜#58–59 最终合并与 CI

**范围：** 从上次已记录的 c101706 接续，仅归档原 Chat 第十八轮两条独立审核及新增的最终 CI／合并状态。产品分支实际头 [e352839](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/e3528391095496de56fb3021ba0c21e3c63232fe)，与 CURRENT_STATE、HANDOFF 和[合并回执](2026-11-27-round-18-receipt.md)一致；远端比较无后续提交，查询无面向产品分支的开放 PR。

- [#58](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/58)：原审精确 [2fadbf5](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/2fadbf5e91a523bb27bcc75b4ce9c0e24414bb5d) 无新增必修。残留启动状态须精确归属、有效结构、旧 PID 确认不存在且端口空闲才原地改名保留；查询异常拒绝处理，保留未知进程保护。隔离 PS5.1 定向 2/2；互斥机制按源码审查，未单独实测并发、跨会话或 Explorer。对应 [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45884819478) job 140132781594 success，Node 通过、Edge 按影响跳过；已合并 [844975b](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/844975b9a097a9441d527e3c8e702f090dd74756)。
- [#59](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/59)：原审精确 [672576d](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/672576da23f39f0ef65a735584e5baedefcec5f4) 的 diff、[1280/390px 两张实页及定向回执](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/672576da23f39f0ef65a735584e5baedefcec5f4/docs/iterations/2026-11-27-pending-check-hierarchy.md) 无新增必修。无同反馈已确认重讲时只突出「再讲这一点」，准确关联的重讲保存后只突出「回看依据」并明确仍待检验；匹配使用完整反馈引用、父讲解、版本及来源快照。保留旧题、讨论与全局入口，报告确认键盘返回原缺口及主动作，0 POST／供应商请求；未新增存储、评分或发送机制。本次新增核对 [最终 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45884887160) job 140133011262 已结束，Node、Edge 与回执保存均 success；实现 head 未变，合并至 e352839，合并差异仅该支线七文件。此前条件式放行已满足。该界面收口不等于多段材料新情境检验已闭合或真人可用性通过。

**Must Fix：** 无新增有证据的阻断。#58、#59 原审放行条件已满足且远端已合并，不重审 #55/#57，不重跑旧回归或整包。

**Next：** 第十七轮待检验主操作收口切片已交付。沿既有 A–F 和 V1_EXIT_GATES，优先补缺失证据；不继续无依据扩建功能。已实际验收且交付的是 c101706 的 git archive ZIP 原件，e352839 仅为含定向验收增量的源码候选。Explorer 双击、物理麦克风在有设备条件时定向核对；复用既有评分校准、六人研究与延迟独立检验协议，真实执行待授权。免 Key 自有材料仍不能生成新诊断，未验证真实模型质量或学习迁移。

**User Decision Needed：** 无新增审批事项；真实付费、招募、数据政策／外传、生产 ASR 切换及公开发行仍按既有边界。本轮仅核对远端证据并归档原审，不独立运行 Windows，不改产品、合并、启动第二个 Codex 或创建实施任务。

## 2026-11-27 · 第十九轮归档｜#60 最终合并与 Beta 准备边界

**范围：** 自队列第十八轮 e352839 接续。当前实际产品头 [ef325a7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/ef325a7385a198b0a68116fd5d79472314bce97d)，无面向产品分支的开放 PR。归档原 Chat 第十九轮四角色审核、两角色代码复审及学习评测盲评；本次新增仅核对最终合并、CI、合并文件一致性与[第十九轮差量回执](2026-11-27-round-19-receipt.md)。

- [#60](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/60) 原 Chat 设计/工程复审精确 head [962f384](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/962f3847da6e782ef50a76b8b6d102a3fb2844d5) 无新增 Must Fix。[定向报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/962f3847da6e782ef50a76b8b6d102a3fb2844d5/docs/iterations/2026-11-27-global-pending-check.md) Node 8/8、Edge workspace 4/4：全局待检验可续接非当前材料组合且无题的原缺口；完整反馈引用在上下文选择前复核，回看依据后恢复筛选/查询/焦点，失效不跳；已有练习筛选、存储协议、评分和模型链路不变。原审未独立取得截图原件或运行 Windows。本次核实 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45912968101) job 140225435150 的 Node、Edge 和回执保存均 success，PR 已合并，七个变更文件在原审核 head 和合并头的 blob 一致；原有条件式放行已满足。
- 差量 ZIP：Codex 回执记录 ef325a7 的 14,716,368 B git archive 原件在中文/空格路径、PS5.1 与隔离 Edge 验证启动残留归档、1280/390 无题待检验精确查证/返回及正常停服，0 POST/外部浏览器请求。c101706 的导入、备份等整包证据独立保留；不把差量验收称作重跑全包，不把 GitHub 自动 ZIP、Explorer 双击、物理麦克风称已实测。原 Chat 本次仅读回执，未运行本机或核验 ZIP 字节。
- 学习证据：合成初讲→修正→模拟 28h 新情境与缺访记录仅是流程准备。原 Chat 12 段手写反馈盲评为 6 可用、5 严重、1 额外待预注册候选（S7A4：虚假确认理由完整并关闭缺口）；回执称与主持人参照一致，未独立读取私有答案。此为 AI 辅助评审校准，不是实际模型准确率或真人双评；候选严重项不追加入冻结口径。

**Must Fix：** 无新增可证实阻断；#60 合并及 CI 门槛已关闭。第十九轮全局回访入口切片和差量候选包验证已完成，不重复实施或回归。

**Next：** 保留 A–F 和 V1_EXIT_GATES 的受控 Beta 准备范围。已有离线证据链和 AI 辅助校准不再重复；未见独立自由解释的 24–48h 迁移、真人可用性和真实模型语义质量仍待实际授权验证。仅据新阻断调整产品，普通取舍由 Codex 自主推进；不新增待检验队列、模型、评测框架或持久化协议。

**User Decision Needed：** 无新增审批事项。真实付费、真人招募、数据政策/外传、生产 ASR 与公开发行继续暂停。本轮仅核对远端并归档既有独立审核，未修改产品、合并、启动 Codex 或重跑测试。

## 2026-11-27 · 用户体验与留存专项判断｜早期痛点回溯

**范围与证据：** 用户另行要求模拟真人使用、以设计师判断，并回溯早期痛点及留存。以产品实际头 [ef325a7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/ef325a7385a198b0a68116fd5d79472314bce97d) 为基线。这是认知走查和产品价值假设审核，不是第十九轮工程回归或新实现验收。复核 [10-20 早期竞品调研](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ef325a7385a198b0a68116fd5d79472314bce97d/docs/research/2026-10-20-landscape.md)、[工作台研究](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ef325a7385a198b0a68116fd5d79472314bce97d/docs/research/2026-10-20-workspace-design.md)、[README](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ef325a7385a198b0a68116fd5d79472314bce97d/README.md)、[形成性研究](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ef325a7385a198b0a68116fd5d79472314bce97d/docs/research/v1-formative-study.md)及第十九轮回执；独立查看仓库中首页、讲解反馈、理解档案、#54 首讲保存、#59 1280/390 待检验 PNG 原件。前述截图分别来自对应迭代，不是本次现场运行；无真人、实模或 Windows 重跑。9 月原始定位是学生看懂却讲不清、缺少输出验证；早期用户问题是待验证需求假设，竞品文档与工程样例不是访谈或留存实证。

**模拟三类行为与产品判断：**
- 首次自学者：准备考试，粘贴课件后直接用自己的话讲，再找反馈。已有首讲显式入口、预写免费示例、保存确认与返回路径；首页“直接讲解”可能被理解成 AI 为我讲，示例能传递机制但不诊断自己的答案。自带材料的真实诊断需配置 API Key；从第一次保存到首次个性化反馈是激活风险，不能把示例完成或仅保存当激活。优先在既有 A/C/E 验证文案、期望与首次价值路径，不扩大服务范围或自动调用。
- 已有基础、复习多段课件者：讲解漏掉缓存有效期等条件，理想体验是看到具体缺口、核对原句、回同一报告局部重讲、回答不同条件的新情境。#47/#52/#53 保证证据返回、同点重讲、旧版关联；#59 实页的单主动作明显改善阅读。实际 [bounded-understanding.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ef325a7385a198b0a68116fd5d79472314bce97d/study-teachback-app/bounded-understanding.mjs) 仅支持整段等于引文且命中窄规则语法；多段课件即使重讲也可能停在“暂未生成合适的检验题／回看依据”，是核心价值的覆盖缺口，不是新增工程回归。保留待检验、不伪造评分，优先在既有 D 研究中观察发生频率、影响及是否值得沿原反馈做针对性新情境；不在无证据时建设开放题系统。
- 隔天再打开的用户：#60 支持从全局待检验恢复精确问题，首页自动续学和理解档案已有基础。建议以“下次要验证的具体问题”和初讲→修正→独立作答证据作为回访价值，而非通用聊天历史、连续签到或无依据掌握分数。七天不续期、手动导出恢复限制长期使用；先观察同周自愿回访与到期前备份体验，长期档案/可变保留期/同步需单独评估与授权，不改既有政策。

**早期痛点→解决→验证：** 看懂错觉→先讲后反馈（查首讲是否无救援完成且发现原未知错误）；知道结论却漏条件/推理→来源绑定的具体反馈与局部重讲（查引用正确性、真正修正）；AI 回答难核查→同一材料与原话定位返回（查用户能否自主找到且判断依据）；会复述但不会应用→未见新情境先交首答（查 24–48h 无辅助自由解释）；学习中断/历史散落→精确恢复和待检验档案（查自愿回访与同点续学）。前四类真实效果尚未证实；最后一类有合成工程证据，尚无真人行为数据。与普通 ChatGPT 同材料同时间比较，不能用竞品存在与否或工具调用量证明优势。

**Must Fix：** 无新增可复现工程阻断；真实个性化反馈及真实多段材料的可检验覆盖仍是产品价值放行风险，不标为已解决。不得把无题待检验算闭合或用示例完成率作真实激活率。

**Next：** 复用既有 D/F 六人走查（不招募、不另建任务）补开放式痛点访谈与行为观察：上次何时发现“以为会却做不出”、现用方法、最费时环节；同输入工具比较、首次反馈价值、查证/修正、无辅助新题及次日自由解释；主持人约定回访与自愿回访分开。建议漏斗按新建/导入→真实诊断并发现具体缺口→重讲→独立检验→自愿续学记分母，记录无 Key、无适用题、中断、到期等退出原因；在当前七天本地政策内观察 D1 与 D7（D7 需明确时间窗，若到期无法观测则报告不可测），不新增联网埋点。候选北极星沿用有效独立检验闭合的唯一缺口数，不把答对已见题、重复重讲或纯点击当成果。留存假设是用户有新的复习需求并信任其具体学习证据，因此回访；未验证，不虚构数值。优先以真实卡点决定 UX 改动，维持 Apple-inspired 层级，少做入口和功能，已有 #59/#60 不重复实施。

**User Decision Needed：** 无本轮新增立即审批；实际真实诊断付费、招募/数据设置、超出现有七天政策的持久理解档案与公开发行仍需明确批准。此条仅维护 MASTER 记录，不改产品、启动执行者、创建额外任务或重跑 CI。

## 2026-11-27 · 第二十轮差量审核｜带条件文字诊断实测

**范围：** 自第十九轮及专项 UX 记录接续；产品远端头仍为 [ef325a7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/ef325a7385a198b0a68116fd5d79472314bce97d)，无面向产品分支的开放 PR。新增实质证据是 [第20轮实验回执](2026-11-27-scoped-text-diagnosis-model-comparison.md)（MASTER [076037a](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/076037ab7339a06b6c9dc332320e25552d66c765)）与 CURRENT_STATE 链接 [aeef1ba](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/aeef1ba14ee7609b0c9ed8e5bb9bf2f5b60d07e7)。两次提交 diff 仅增/改文档；研究分支仍 [53d752b](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/53d752b9d9d75bd4933f4fe8090ee769c6bea474)。核对该冻结清单的 24 个槽、两配置及价格、控制案例原文与产品 provider 当前默认；未取得本机原始响应、实际发送器、盲号映射、逐槽账本、实际账单或人评，不独立断言请求逐槽符合合同/无重发/独立评分正确。报告称获批上限 US$1.30；本轮仅核回执，不另发请求，不将历史预检视作付费授权。

- 回执称 24/24 请求与结构校验通过：Luna 8/12 可用、2 需改、2 严重；Sol 12/12 可用、0 观察到的严重错误，均为 6 个同领域合成案例各两次的配置比较、AI 辅助盲评。两次严重错误集中于同一个“部分暂缓、独立命题仍可判”案例，非两个独立题材；冻结材料明确先进先出、未指定容量实现，不能肯定后进先出或漏掉纠正动作。数值 9 正确但理由未表达的案例应分开评判，不可把数字判错。核对原案例 [controlled-cases.json](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/controlled-cases.json)，上述参照判断合理；未看到模型原始输出，错误分类沿用回执。
- 使用 [冻结费率与配置](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/53d752b9d9d75bd4933f4fe8090ee769c6bea474/docs/research/quality-baseline-2026-11-18/run-manifest.json) 与回执汇总 token 复算：Luna (32636×0.25+2669×1.2)/1e6=US$0.0113618；Sol (35468×2.5+3008×10)/1e6=US$0.11875；合计 US$0.1301118，算术正确，属于费用上界而非账单。报告 p50 2.93/4.17 秒；未取得逐次计时/最慢值，不能独立复算中位数。比较同时改变模型、推理 effort 和输出上限，不能归因于模型单因素。
- [产品 provider.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ef325a7385a198b0a68116fd5d79472314bce97d/study-teachback-app/provider.mjs) 仍固定 Luna / none / 1800；本次无产品改动、新页面证据或新 CI，故不重复验收首讲、查证、重开、工作台与待检验路径，不推断学习效果。研究结果不能替代真实无条件首讲、复杂材料闭环覆盖或 24–48h 学习者独立迁移。

**Must Fix（AI 价值放行，不是新增工程回归）：** 现有结构校验可放行报告所述严重语义误判。按 V1_EXIT_GATES 暂不放行扩大使用或生产文字配置切换；保留该混合可判/不可判用例及理由遗漏用例的冻结语义判据，不能以关键词或伪造引用修复。Sol 仅为下一轮优先验证候选，不宣称零风险。

**Next：** 沿既有 B/D 与 PRD P0 诊断可信度，先利用已有私有回执做独立人工复核和逐槽审计（请求身份、输入/提示/schema、完整响应/使用量、最慢值、盲评原判与分歧、预算及授权边界）；保留私有数据位置，不公开原件，不重复本次 24 次调用。若需在 MASTER 留证，仅保留授权范围内的脱敏核对结论和版本指纹；独立人评未完成即标未定。后续获准试验优先不同领域新材料与无条件首讲，区分带条件路径与全局配置；真实题目与学习者研究按现有授权另行决定，不新增任务或评测框架。

**User Decision Needed：** 无新增可直接执行的审批；回执所述本次 24 槽视为已结束，不沿用未花完上限启动下一次。任何新真实付费、生产模型切换、真人招募、数据政策/外传及公开发布须另行明确授权。此次仅核对远端证据并记录实质模型风险，未修改产品代码、启动 Codex、合并或重复回归。

## 2026-11-27 · 第二十一轮差量归档｜#61 研究口径与作品入口

**范围：** 自第二十轮已记录的产品头 [ef325a7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/ef325a7385a198b0a68116fd5d79472314bce97d) 接续；[PR #61](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/61) 实现 head [59c7789](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/59c77892da26383b91c3659ed5a2550a8897b6d4) 已合并至当前实际产品头 [c0e1f05](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/c0e1f05457736f1a4310130e3a1aa8c9e1ae007c)。[精确差量](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/compare/ef325a7385a198b0a68116fd5d79472314bce97d...c0e1f05457736f1a4310130e3a1aa8c9e1ae007c) 只有 README、作品集 README、研究执行包 README、session、results 五个 Markdown；无开放产品 PR、无运行时/模型/存储或新页面变更。已独立核对 PR 实际补丁、合并差量和新版表单，PR head 无 Actions run；纯文档无需重复 Node/Edge。原 Chat 的六组合成分类与 diff --check 通过为 PR 回执所述，未独立重跑。

- 作品集保留 31 秒预写反馈说明并链接固定动图；README 区分 ef325a7 源码快照及同提交本机原件的第十九轮定向验证、c101706 旧整包走查、#53 历史快照。当前文档头不等于新增可运行候选，未验证 GitHub 自动 ZIP 的字节或实页，不扩大旧包验收范围。
- [现场记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/c0e1f05457736f1a4310130e3a1aa8c9e1ae007c/docs/research/v1-fieldwork/session.md) 与 [汇总表](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/c0e1f05457736f1a4310130e3a1aa8c9e1ae007c/docs/research/v1-fieldwork/results.md) 预先固定主要摩擦指标为同一原句的额外查找次数；首个连续查找不计，连续滚动/展开不拆计，未找到/救援/超时/无有效反馈不作可比较零次；两条件均独立查证和限时改讲才配对，只有次数少且关键条件补齐、质量不降才计改善。未配对仍保留全任务分母；两侧均零且质量相同为持平。保持 [V1_EXIT_GATES](../V1_EXIT_GATES.md) 至少四可比较配对及至少 4/6 招募者改善的双门槛；预约回访与自发回访分开。认可这是研究准备改进，非真人价值证明。初讲已正确、无需纠错时如实记无适用缺口/不可比较，不能逼造错误或用其他指标补算；不同材料的交叉配对仅支持形成性判断。真实执行仍需核对需求访谈门槛、对照设置与材料难度，保留全分母及分歧。

**Must Fix：** 无新增已证实工程阻断。第二十轮 AI 语义质量风险与复杂课件独立检验覆盖仍未放行，本轮不重开既有 UI 验收。

**Next：** 沿已记录 A–F 与 [PRD 竞品机会池](2026-11-27-prd-competitive-analysis.md) 复用现有协议。该主指标只衡量查证摩擦，不代表反馈正确性、总体效率、自然留存或学习迁移；原有独立质量及延迟首答结果仍单列。真人目前为零，尚无新原始模型证据，先补已授权范围内的现有证据核对，不重复已封存调用或扩建功能。无需重新打包或回归未变更的产品路径。

**User Decision Needed：** 无新增审批；既有真实付费、招募、数据政策/外传、生产切换及公开发行边界不变。本次只维护审核队列，未执行 Windows、修改产品、合并、启动第二个 Codex 或创建实施任务。

## 2026-11-27 · #62 差量审核｜AI 能力边界与语义负控

**范围：** 自队列 #61 的 [c0e1f05](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/c0e1f05457736f1a4310130e3a1aa8c9e1ae007c) 接续。[PR #62](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/62) 实现 [7d54346](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/7d54346afd08812ddde04bb24cdffeb925a29ce3) 已合并至实际产品头 [40ee949](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/40ee949d49dc2bf181ab58db8d3b94be75a321f9)，无开放产品 PR。[合并差量](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/compare/c0e1f05457736f1a4310130e3a1aa8c9e1ae007c...40ee949d49dc2bf181ab58db8d3b94be75a321f9) 仅 README 两行、35 行能力边界文档、100 行新增测试；三文件在 PR head 与合并头的 blob 逐一相同。核对实际补丁及 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45948168879)（head 7d54346，job 140337567230）Node regression success，提取与 Edge 按影响跳过，回执保存成功。原本机定向 12 项（含套件父项）及外部请求 0 取自报告，未另重跑。本轮未改运行时、提示词、模型、存储或页面，无新截图、实页、产品 ZIP 或学习效果证据。

- [AI 能力边界与放行标准](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/docs/research/ai-capability-boundaries.md) 区分四类反馈、结构与语义验证，以及独立检验与本次讲解。明确正确结论缺少明确要求的理由应标遗漏，保留正确部分；暂缓仅限对应命题。符合既有价值门槛，不重复设新体系。
- [capability-boundaries.test.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/capability-boundaries.test.mjs) 采用实际本机 HTTP /api/diagnose 路由、注入手写语义返回，断言普通首讲与带条件请求选择不同 prompt/schema；正确的混合暂缓结果保留独立焦点错误的单个修正目标，正确结论与缺理由分开，虚构引文/暂缓项带判定分别拒绝。新增负控在真实原句支持“焦点返回原按钮”、原话却为“焦点跳到页首”时，手写错误 supported 仍返回成功且 diagnosticTargets 长度为 0。该测试通过意味着**现有语义缺陷被锁定为可复现负控，而非已修复**；并非真实模型产生了该输出。它具体说明为何错误可能让用户无从进入同点重讲或新情境检验，但未独立观察真实页面中的该状态。与第二十轮严重错判风险一致，不将结构校验说成语义正确性证明。

**Must Fix（沿用 AI 价值放行门槛，非本 PR 新代码回归）：** 不将错误 supported／漏掉独立可判命题视作通过，不放行受影响路径的生产切换或扩大使用。#62 文档与测试工程范围已合并、CI 通过，无新工程阻断；保留此负控至语义问题真正解决。不得通过删断言、单纯词匹配、降低严重项口径或换模型掩盖。无需重跑已验 UI、整包或先前 24 槽。

**Next：** 承接 Codex 已记录的候选提示词方向，复用现有冻结语义判据及 B/D 质量协议；只在离线可核对范围先审查标签—引文—原话—判断—动作一致性与逐命题暂缓，不把注入手写正确结果或 CI 当成模型质量。后续实际比较需要具体授权且控制变量；若真实评估发现严重错误，按原门槛否决，确认真实纠错路径覆盖后才谈扩大使用。保持 A–F、竞品机会池和已有界面路径，不新增第二执行任务。普通首讲的真实输出、复杂材料的独立检验覆盖、真人回访及学习迁移仍未验证。

**User Decision Needed：** 无新增立即审批。生产文字模型或 ASR 切换、新付费、真人研究、数据外传及发布仍遵循现有授权。仅审核并维护 MASTER 记录，未修改产品、启动 Codex、合并、运行 Windows 页面或重复回归。

## 2026-11-27 · #63 草稿差量审核｜文字诊断提示候选

**范围：** 接续 #62 实际产品头 [40ee949](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/40ee949d49dc2bf181ab58db8d3b94be75a321f9)。远端产品头未变；唯一面向产品分支的开放 PR 为草稿 [#63](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/63)，精确 head [a24474e](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/a24474e68cdbf19b87202cf71034ae7353fc8eb4)。独立核对实际补丁仅增加 33 行 [候选与对照研究文档](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a24474e68cdbf19b87202cf71034ae7353fc8eb4/docs/research/diagnosis-prompt-candidate.md) 及能力边界文档链接两行；未接入运行时、无新模型调用/截图/页面证据，head 无 PR Actions run。12 项离线基线及零外部请求是 #62 已记录的手写响应测试，本轮不重复验收或运行。HANDOFF 明示原项目 Chat 桌面复审未成功；本次仅远端文本独立复审，不称现场复审。

**判断：** 三组成对用例（适用范围、普通首讲正反、材料内指令式话语）合理，分别检查暂缓不吞掉独立错误、真实引文不能支持反向标签、材料内容不能改变诊断职责。候选是语义规则片段而非完整可运行提示，现有 [CONTENT/BASE 与 schema](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/schemas.mjs)、[JUDGEMENT 与归属校验](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/judgement.mjs) 已包含不少同义规则；不能依据新增文字推断质量提高。无运行时变更，首讲入口、查证返回、重开、工作台层级及复杂材料独立检验不重验。已知假 supported 让修正入口消失仍是未解语义风险。

**Must Fix（正式模型对照前的冻结条件，不是草稿工程阻断）：** 候选文案“unknown，如需要，只请确认…”须与现有 findingsSchema 和 validateFindings 保持一致：unknown 必须有非空 repair，只有 supported 的 repair 为 null；将未知前提的可执行确认与按 issueId 暂缓（findings=[]）分开。合并文字时不能丢掉 fragment 禁 missing、partial 仅 focus、目标/最终撤回、等义、非空字段和全局最多三条（含 assessment 内 findings）及 status=condition 仍须核对依据、可暂缓的原约束。带条件路由包含 deferred-only，不是只在确认某条件时才选 JUDGEMENT；A 组锁定选用标准模式及来源依据，B 组只改该 issue 状态/必要条件说明，不把独立焦点错移入 assessments；三组应锁定真实输入 JSON、两版本完整提示与哈希、相同配置/schema、预期逐命题结果及动作。第三组的课堂台词不得成为知识依据；用单一变更对照，不为迎合某个词新增硬编码拦截。上述是候选集成/盲评前的明确条件，不要求在研究草稿阶段改产品或触发真实调用。

**Next：** 沿已领 #63、原 B/D 及能力边界门槛，Codex 在原草稿中收口上述兼容性与冻结材料，复用旧的理由缺失、最终自我修正等既有冻结判据，避免重建评测体系。现有原提示本来就有不可信数据指令和逐命题规则，对照必须仅改变实际提示版本并固定其他参数；没有授权不派发，不把手写结果、CI 或候选设计当实模改进。真实关键反向误判仍否决受影响路径切换。旧模型比较和此前 UI 不重跑，不扩大复杂材料本机题覆盖或假定学习迁移已闭合。

**User Decision Needed：** 无新增立即审批。当前可保留为研究草稿；任何实际付费对照、生产提示/模型切换、数据外传和公开发布仍按既有授权执行。本次未修改产品分支、合并、另派任务、启动第二执行者、重跑 CI 或发起真实模型请求。

## 2026-11-27 · 留存口径补充｜168 小时边界

**差量范围：** #63 草稿仍为 [a24474e](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/a24474e68cdbf19b87202cf71034ae7353fc8eb4)，产品头仍为 [40ee949](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/40ee949d49dc2bf181ab58db8d3b94be75a321f9)，无其他开放 PR。上次审核后新增 [MASTER 8b13742](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/8b13742a5ed9b25f20bbb7d53ba4390231819226) 仅在 CURRENT_STATE 记录存储策略与留存测量备忘；无运行时变更。独立核对其 diff 与两个产品版本中相同 blob 的 [core.mjs L2](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/core.mjs#L2)、[storage.mjs L20–21](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/storage.mjs#L20-L21)、[backup.mjs L210](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/backup.mjs#L210)、[app.mjs L676](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/40ee949d49dc2bf181ab58db8d3b94be75a321f9/study-teachback-app/app.mjs#L676)：打开数据库时按 restoredAt 或 createdAt 加 7 天（168h）清理，等于截止时也清理；编辑不续期，恢复产生新副本与新保留时间。当前源码支持该备忘，但不能推断开着的窗口到点自动清理或供应商删除；内存适配器合成验证为原备忘所述，未独立运行，不重跑浏览器或 CI。

**Must Fix：** 无新增工程阻断，#63 前次候选冻结条件保持。

**Next：** 认可在现有 D/F 机会池中分别记录自愿回访、原缺口可用性、同缺口续学；应记录实际经过时长、到期/未知、恢复副本与约定回访，分母不混用。D7 如与 168h 清理窗口冲突，则原缺口续学不可观测，不以缺失记录推断流失；自愿回访如有合法独立观察仍可单列。六人方案、主要查证摩擦指标及 24–48h 未见迁移不改。未见真实回访或新的模型输出，首讲、查证返回、重开、工作台及独立检验不重复验收。无新增待执行任务。

**User Decision Needed：** 无新增审批。仅记录已存在的七天策略，不变更数据政策、增加遥测或扩大权限。未修改产品代码、发起模型调用、启动第二个 Codex 或合并。
