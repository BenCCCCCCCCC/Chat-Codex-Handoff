# CURRENT_STATE — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Product/default branch: prototype/study-teachback-v0.1
Canonical state branch: meta/master-state

## 当前决定与授权

定位 **个人学习＋作品展示**。用户授权公开仓库及现有 Git 历史、README、产品与设计研究、自主审核实现、commit/push/PR/merge，以及有意义的批次交接；无需每个小动作询问。减少冗余文字和重复测试。旧 no push/merge 和每次字节变化全量重跑限制已被后续授权取代。

本轮优先反馈少复述、理解检验与零长度词时间定位。用户明确批准最多US$0.10的6文本×两臂固定比较，12次全部完成：预留US$0.0495065，账本费用估算US$0.0062383，新增未结算0。没有ASR／个人录音／重试／充值／追加调参；额度结束且余量不延续。新真实调用须另定方案和预算。

## 最新交付

[Issue #23](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/23) / [PR #24](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/24)。
实现头9a681061730cb7a1dee0123be90bebfd216c436d，合并afdabb5a48cb7466bc0eead0cb065e3cd21e3e94。
[CI39448586476](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39448586476) 完整Node／Edge PASS，提取器按范围跳过，job118717011775。PR已合并，Issue关闭。

- 当前有效反馈可“试着回答”，直接复用repair进入已有practice，不另调用模型出题；显式提交才走apply_answer。保存origin来源／讲解／转写版本／目标ID，相同目标和题目复用草稿与回答，题目变化或新版本另建。沿用保存、失败恢复、相同完成答案复用及v1备份。
- 补学与重讲收进“其他方式”，删除“下一步”重复前缀与空介绍。历史版本仍无行动入口；新入口不等于已有建议全部变成合格检验题。
- 连续零长度词可借同段有效邻词；段首／段尾缺一侧邻词时可借该段边界，至少一侧有效且范围≤3秒。共享段边界按原始文字顺序确定所属段，无法确定不猜。保持近似标签，不插值、不修改原时间。引用组合≤6秒、前后≤0.3秒及文字一致／唯一映射限制继续有效。
- 历史MInDS-28段首“我”从整段9.62–16.04秒改为邻近9.62–10.00秒；其他内部零长度词范围相同。没有人工词边界，不报告定位准确率。
- 新理解检验CONTENT候选未通过固定比较：存在复述和材料未给出的“其他升级要求”。已恢复本批前的基线原文，schema／TEACH／模型均无变化。不继续调参或从剩余额度追加请求。

[本批记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-10-21-understanding-probes.md)、[批准方案](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/2026-10-21-understanding-probes-plan.md)、[完整响应](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/understanding-probes-live.json)。
两臂冻结于fixtures/understanding-baseline.json与understanding-candidate.json；已完成入口understanding-live.mjs --approved-budget-usd=0.10不得重跑或换目录绕过。

上一批PR21/22（实现28f5f8c、合并0e01420c／8dc6ded7）已完成可选转写术语及单一动作提示，CI39442372344 PASS；细节与术语实验见docs/iterations/2026-10-21-terminology-feedback.md。词表默认折叠，最多8项／每项24字／总80字，按attempt独立快照，备份／重试沿用；不自动从教材采集，不作为内容判断事实。仓库public，许可证尚未选。

此前PR #19及#2／#5／#7／#9／#11／#13／#15／#17已交付公开整理、工作台／示例、情境练习、备份恢复、草稿／查找／分页、搜索精确命中／手动上下文、转写草稿／请求追踪、音频上传、简体提示、词回听及短引文回听。contextNote最多1000字，最近六条整消息按24k输入上界移除最旧历史，不自动摘要。上传3分钟／25MiB，选择文件仅本地保存，显式开始转写才调用。原声字节保留，临时16kHz单声道处理；原记录createdAt七天、恢复副本restoredAt七天，128MB v1备份不升级数据库。

## 质量证据与待评估项

语音仍是“本机原声 → Whisper ASR → 用户校对 → Luna分析确认文字”；声音过程独立，不当作理解／流利度评分。本轮仅6条文本（2旧＋4新自编），两臂每条一次，非盲测；逐例复核由编码代理完成，非独立人类评分。

- 引用／版本有效两臂各6/6；人工检查两臂都检测主要问题或接受正确自我修正。通用自动oracle为基线5/6、候选6/6，因为基线步骤例同时输出incorrect／supported而oracle要求全incorrect，不能将差值称漏检改善。
- 五条可行动建议答案复述4/5→2/5，单一任务均5/5；候选来源内任务4/5，基线5/5。必要条件候选预设材料未给出的其他要求且给出不满足线索，未通过严格任务标准。
- 原因题候选再问已解释的能否确定；步骤题下一步已被message代答，两臂还把移动称量步骤过度描述为全部倒置。配方两臂同为未给答案的同情境计算，无实质改善；抽样候选有一个有效的新反例相容判断。正确修正两臂均无repair。
- 因来源约束退化与复述残留，拒绝候选并恢复基线，不以复述数下降抵消新问题。直接作答UI仍可用于当前建议，但不代表任务质量已解决。
- 实际预留US$0.0495065、费用估算US$0.0062383、新增未结算0；不是最终账单，不花剩余额度。

上一批PR22术语12次：预留US$0.103472、估算US$0.0093652；FLEURS-32 ePC→Eee PC、严格差异3/52→1/52；无关词表例不插词但零长度1→2。四文本判断均4/4，单动作2/3→3/3，答案复述仍2/3→2/3。保留当时的术语与CONTENT，不代表本批候选也被保留。原完整报告docs/research/terminology-live.json不重写、不重跑。

上一批PR19真实11次已完成：FLEURS两条真人朗读12.12／13.86秒，相对稿件严格字符差异3/52、0/37，Eee PC→ePC、及→其；MInDS17.152秒参考也是自动ASR，不报准确率。45／30／44词零长度分别0／1／4；参考朗读稿未独立核实实际读法，时间无人工对齐。四文本两臂各4/4判断预期和引用有效，但候选仍有双重追问、重复建议，正确内容更碎。费用估算US$0.0080848，预留US$0.084016，新增未结算0；不是最终账单，不继续花余额。完整结果 docs/research/natural-speech-live.json，公开样本单独CC BY4.0归因。

更早14次合成比较US$0.0066592、9次US$0.004224，以及 ]、. .、6/7、自我修正误判和CHANNEL_LEAK等证据保留，不混作本轮结果。

## 验证与精简原则

本地定向Node34/34，复用原有Edge一条整合流程通过：真实媒体／键盘回听、直接答题不出题调用、草稿刷新、显式提交一次、390px布局；桌面／手机截图已检查。完整回归只在PR CI执行，文档整理不重复本机全套。原始报告与配置hash、收据及预算另行核对，生产CONTENT与基线一致。

ignored artifacts/study-teachback/diagnosis-state-ux-01/：node-1792509711360-c4NEnm、browser-1792509711022-OAl1pm。合成凭据／loopback／独立账本，离线前后生产账本未变。本批真实实验后的账本SHA256为595884707633855620ddb3c320b9c0ab1403f78c2104a39bb70690dc303eeb7c。
原收据ignored artifacts/study-teachback/understanding-probes-01/live-quality.json，SHA256 4f0ee76950be02ca554f93faf378a4838ec9def3f00d53b7dbd7ab4ecb4b59a7。
历史术语收据SHA256 a1c0718fa6be2cc5486d468abae2c7d3cc4bac5ac99a4ac757ece97107d56292，自然语音cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。都不重写。

强制终止前未落盘、跨标签页协调、服务端持久请求去重仍未解决；未知结果显式重试可能再次计费。没有多分钟自动分段或自动纠正原文。

## 已有证据边界

Phase 3B 仅对有界可行性问题 **CLOSED / PASS**，不代表跨课程／用户学习效果。
历史记录有两份相同确认文字的诊断报告，结果不同；两笔 settled 语义请求与时间强关联，但缺直接 request-ID → report 绑定。不得声称已核实只有一次诊断，不把第二次称为重试，不挑选较有利报告。

语音过程与内容判断分开；停顿、犹豫等过程观察不能独立证明知识缺口。当前生产使用单份有限材料。无总体掌握度评分，不宣称已证明竞争优势。许可证尚未选择。

## 保留的产品研究方向

候选问题：多源材料在明确来源权威与冲突约束下，能否更可靠地判断错误、遗漏和优先补学项。

先做同输入通用基线比较，再决定是否投入多源产品化。已有泛化能力如语音教回、材料上传、引用、缺口与下一步建议不足以单独构成差异化。公开文档不足以证明竞品没有冲突处理。

保留用户既有决定：
- 多来源在概念上受支持；初期受控样本 2–4 份材料，不是产品文件数量上限；
- 每个检测到的冲突可见；影响当前诊断／优先级的冲突需用户裁决，其他冲突可见且不阻塞；
- 来源角色自动推断、用户可改，紧凑展示；不要求所有角色先确认，重要裁决时明确确认；
- 优先级按前置依赖、错误严重性、来源和学习目标支持的重要性排序；无材料依据不得猜考试重点；
- 默认结论优先，证据按需；诊断深度可随目标与材料变化；
- 讲话过程检测保持现状，暂不继续调参，不作为核心差异化；
- 控制样本覆盖一致／互补／冲突来源、目标变化、啰嗦但正确、流畅但错误、证据不足与来源裁决；
- 记录错误／遗漏精确率与召回率、无依据判断、静默裁决冲突、优先项、稳定性与可追溯性；阈值在基线校准后确定。

## 下一步

本批完成。先区分纠正解释与可独立评分的小任务，人工撰写少量任务和评分依据，尤其处理来源不足及假设如何不引入新规则；不要继续只靠加长repair提示，也不能宣称复述已解决。新真实比较需新方案预算，不重跑understanding-live或历史实验。

可再考虑自愿自然讲解的人工文字和少量词边界、数字角色和领域术语。不调停顿阈值；[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3)同输入多源研究保留。

4321本聊天无provider预览仍运行（之前核对PID24324），IAB已刷新到本批静态页面；本批没有重启服务，无新服务端模块。下次重启先核对完整命令与监听PID。常规npm start／4317，无公共部署。
历史快照：[本轮之前的完整状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/c2c5b1d3d5c9662c714723c183bb23eb5ff76df9/docs/master/CURRENT_STATE.md)。
