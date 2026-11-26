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
