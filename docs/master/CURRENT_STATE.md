# CURRENT_STATE — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Product/default branch: prototype/study-teachback-v0.1
Canonical state branch: meta/master-state

## 当前决定与授权

定位 **个人学习＋作品展示**。用户授权公开仓库及现有 Git 历史、README、产品与设计研究、自主审核实现、commit/push/PR/merge，以及有意义的批次交接；无需每个小动作询问。减少冗余文字和重复测试。旧 no push/merge 和每次字节变化全量重跑限制已被后续授权取代。

本轮优先用真实学习材料评估理解检验覆盖与有效性，改善无效题处理。本批只做离线工作，API 0次、费用US$0，未申请或使用新真实调用额度。过去所有批准额度均已结束，新调用仍须先提方案和预算。

## 最新交付

[Issue #27](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/27) / [PR #28](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/28)。
实现头535b873c7fd31c5c6fb9848a2539cd3b55bea74f，合并8634919019c95eefd4ca4d3bfb4a9a06109e7922。
[CI39458861900](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39458861900)完整Node／Edge PASS，job118752743540；提取器按范围跳过。PR已合并、Issue关闭。

- 冻结8段中文教程（Python3.14／MDN各4段），保留边界、例外、类型与数值，未改写为规则句式。source-rules-v1实际生成0/8；生成题有效性N/A，学习效果未知。完整逐例输入／返回和hash入库，不把拒绝当成有效题。
- 便利样本、非盲测、只有编程自学；目标和有效／无效参照题由本次编码助手编写并复核，没有独立教师或真实学习者。多数参照也只测单步应用，不能证明迁移或长期保持。
- 所有练习增加“题目有疑问”：先flush草稿，再保存round.review held；暂停判答，不增加成绩或调用；草稿仍可编辑。历史反馈折叠为未复核，隐藏旧判断标签／依据，保留原始内容。标记随刷新和v1备份保持；搜索明确待复核反馈，命中可展开旧文本。
- 用户标记可撤回，但这不是系统认定题目有效；撤回本身不判答或调用。主动换AI题会排除待核对旧题的历史上下文，不继续沿用可疑前提。本机任务与来源／题面快照不一致也暂停，origin local_check不能撤回绕过。
- 本批不是自动语义审题器。普通开放AI题仍可能给错题／错反馈，未标记时不会自动识别；没有后台审核或自动重出题。损坏本机任务的备份仍拒绝，不靠review绕过原校验。
- 无题页面只说未生成合适题目，保留返回对话和旧题选择；普通换题明确标AI。CONTENT、TEACH、ASR、模型、source-rules-v1均未改，没有恢复上轮失败的AI出题／评分候选。
- 本机规则仍仅支持整段等于引文的三类有限句式：必要前提、正整数克数配比、三个不同动作的顺序；非通用中文语义解析，不验证上游诊断。只核对本题选项，不推导掌握度。
- 原词／零长度词邻近回听保留，不插值或修改原时间；无声学理解或流利度总分。

[本批记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-10-21-real-material-review.md)、
[固定方案](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/2026-10-21-real-material-plan.md)、
[离线结果](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/real-material-offline.json)。
材料docs/research/fixtures/real-material-corpus.json SHA256 acbcd9074e06323229af4c144e4db7b88e428faa44b11ba622533b79b6b1c30d（本次读取字节）；引擎hash在结果JSON。
Python摘录PSF-2.0、MDN与作者参照CC BY-SA2.5，署名／许可单列；不改变项目源代码许可未选状态。

## 验证与环境

本地定向Node41/41，既有Edge一条整合路径通过：立即标记时落盘、刷新保留选择、暂停判答、旧反馈折叠、撤回、390px布局；手机截图已查看。随后自审补充排除held题的模型历史，只复验practice.test.mjs 8/8，未重复本机浏览器。完整回归以最终CI为准，不为文档或提交重跑。
本地收据artifacts/study-teachback/correctness-hygiene-01/node-1792513874677-CBofZw、browser-1792513882984-5z71e9。仅模拟provider，生产账本前后未变：
SHA256 9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e。历史4笔未结算不变。
当前4321无provider预览仍为PID15608；只读核对命令及新practiceFlag页面已提供，未重启。用户刷新后载入客户端；无公共部署。下次停进程先核对完整命令和监听PID。常规npm start／4317。

## 上一轮真实实验的拒绝决定（PR #26）

4份来源各生成一次；另用4个人工固定题目×两个答案测评分，共12次。第二阶段并非评分第一阶段生成的题。作者自编样本，编码代理逐例复核，非独立人类盲评。

- 必要条件题有效改变推理方向；配方题换3份但把乙的缺口扩展成两个量都必须正确。
- 顺序题仍问与原解释相同的错误序列，原因未知题也重问已解释的无依据因果。
- 引用／结构校验全部通过，但人工题评分仅6/8：故意不成立的资金题两次都未返回unanswerable。正确质疑材料不足的答案被判partial，另一个猜数字答案被判incorrect；评分器应先拒绝题目，而不能要求学习者满足无依据标准。
- 因解释复述和错误评分对象，拒绝AI候选，不追加调用，不以结构有效冒称语义有效。本机引擎是上一轮实验后的有限替代；本轮新增真实教程覆盖证据0/8，仍没有付费效果比较。
- 实际预留US$0.042374、估算US$0.00410625、新增未结算0；不是最终账单。
- task-split-live.mjs --approved-budget-usd=0.10已执行，不得重跑或换输出目录绕过。配置fixtures/task-split-config.json冻结；公开报告保留原始全部字段，再附人工复核。

原收据ignored artifacts/study-teachback/task-split-01/live-quality.json，
SHA256 4dd6fa677c043b361635af451e0e4fb2f88939a94403dea0cc667d3d89d1ec16。
获批实验后的生产账本SHA256 9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e。


## 历史结果与产品边界继续有效

PR24实现9a681061、合并afdabb5a，CI39448586476 PASS：直接repair作答入口被本批独立任务替换；零长度词边界回听保留。历史MInDS-28段首“我”由9.62–16.04整段缩至9.62–10.00邻近范围，无人工词对齐，不能称准确率。
PR24固定12次understanding-probes实验：预留US$0.0495065、估算US$0.0062383；两臂引用6/6，五条建议复述4/5→2/5，但候选预设“其他升级要求”，故恢复baseline。通用oracle5/6→6/6受错误例含supported影响，不证明漏检改善。原收据SHA256 4f0ee76950be02ca554f93faf378a4838ec9def3f00d53b7dbd7ab4ecb4b59a7，docs/research/understanding-probes-live.json不重写。

PR21/22术语12次：预留US$0.103472、估算US$0.0093652；FLEURS-32 ePC→Eee PC、严格差异3/52→1/52；无关词表例不插词但零长度1→2。四文本判断4/4、单动作2/3→3/3、复述2/3→2/3。当时接受CONTENT仍为当前生产配置。原收据SHA256 a1c0718fa6be2cc5486d468abae2c7d3cc4bac5ac99a4ac757ece97107d56292。

PR19自然语音11次：估算US$0.0080848，预留US$0.084016。两条FLEURS朗读12.12／13.86秒，相对稿件严格差异3/52、0/37；MInDS17.152秒参考也是自动ASR，不报准确率。零长度词0／1／4，无人工时间对齐。四文本两臂4/4但仍重复建议／多追问。原收据SHA256 cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。公开语音单独CC BY4.0。更早14次US$0.0066592、9次US$0.004224，以及 ]、. .、6/7、自我修正误判、CHANNEL_LEAK证据保留。全部旧额度结束。

已有功能包括公开整理、工作台／示例、情境练习、备份恢复、草稿／查找／分页、搜索精确命中／手动上下文、转写草稿／请求追踪、音频上传、简体提示、词／短引文回听。
contextNote最多1000字，最近六条整消息按24k输入上界移除最旧历史，不自动摘要。上传3分钟／25MiB，选择文件仅本地保存，显式转写才调用。原声保留、临时16kHz单声道处理。可选术语最多8项／每项24字／总80字，attempt快照不随主题改变，不从材料自动采集。材料上限5000字；原记录createdAt七天、恢复副本restoredAt七天；128MB v1备份不升级数据库。
语音路径仍为本机原声→Whisper→用户校对→Luna分析确认文字；过程独立。强制终止未落盘、跨标签页协调、服务端持久去重未解决，未知结果显式重试可能再计费；无多分钟自动分段或自动纠正原文。

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

本批完成。优先让题目与标准能够被明确审阅／编辑；若尝试AI，应先独立判断题目是否成立，再判断答案。利用冻结语料设计包含正确质疑、猜测答案和错误标准的比较，另留未参与调试的材料；不能只添加正则迎合8例。新真实实验重新报调用数和预算，不恢复旧失败候选或重跑旧入口，不延用额度。
真实学习者与保持／迁移数据仍缺；不能凭参照题或工程测试称学习效果已证明。自然语音和Issue #3同输入多源研究继续保留，不调停顿阈值。

历史快照：[本轮之前完整状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/63107f3a69ee75666fe8a2e4590c65e330a2bfa5/docs/master/CURRENT_STATE.md)。
