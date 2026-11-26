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
