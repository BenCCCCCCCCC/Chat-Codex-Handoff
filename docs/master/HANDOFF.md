# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支CURRENT_STATE、产品README、docs/TESTING.md、
docs/iterations/2026-10-21-terminology-feedback.md和docs/research/2026-10-21-terminology-plan.md。
旧ACTIVE_EXCHANGE不恢复限制或额度。

## 本批功能与真实比较已交付

[PR #22](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/22) 已合并本次获批实测结果；报告头c6536ebbf7649898096d4f8cf6b64430b1f54346，合并8dc6ded7eeaa4b49d7e3a08e525a143e647a9762。仅5个结果／文档文件，0产品代码变更；输入／配置hash、12份完整响应、收据和预算核对通过，按路径规则无CI，无重复回归。

[PR #21](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/21) 已合并，Issue #20关闭。
实现头 28f5f8cfe19ce44acd74110766af42d7418d2e58，合并 0e01420c161d89bbba5b7e8c4f9407fcc66ca736。
[CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39442372344) 完整Node／Edge PASS，提取器按范围跳过，job118695278615。

- transcription-terms.mjs：用户短名称按分隔符去重，最多8项／每项24字／总80字；超限明确提示，不截断。录音准备中的输入默认折叠，按主题通过已有draft saver保存。
- app.mjs：开始录音或选择上传前快照词表到attempt.transcriptionTerms。旧录音显式重试仍使用原快照，新主题词表不改它。录音信息详情展示使用的词表。开始录音前flushDrafts；输入在捕获中禁用。v1备份保留草稿和快照，旧缺省数据兼容。
- server/provider：X-Transcription-Terms百分号编码短字符串，服务端解码校验后交给ASR；provider再次验证规范化数组，空列表沿用原简体提示，原始响应带termHints。没有把教材答案自动塞进提示；contentInput仍仅来源与确认文字，词表不充当内容事实。
- transcript-playback.mjs：含零长度词引文可复用wordPlayback的同段邻近有效边界（邻近跨距≤3秒），组合≤6秒，再加≤0.3秒两端上下文。明确label为quote-context／“原话邻近范围，非精确词时间”。确认文字或边界改动、重复引文、缺映射、无邻近边界仍回退整段，不改原始时间、不编造定位。
- CONTENT：合并同一缺口及相关正确表达；一条建议只安排一个动作，避免复述已给解释；不同领域例子不是评估文本答案。候选已完成四例比较，判断无退化、正确项合并和一处多任务改善，因此保留；重复已有结论仍存在。schema／模型不变，原报告不截断／改写。
- 页面：词表默认折叠，录音准备时隐藏重复底部下一步栏，删除重复时长文案。

此前功能无需重复实现：上传3分钟／25MiB，选文件先本地保存，显式开始转写；原始字节保留，临时16kHz单声道。contextNote1000字、六条最近完整历史按24k上界裁剪；七天原记录／恢复副本、128MB v1备份。内容与声音过程分开。

## 本轮真实比较已完成，额度不延续

用户明确回复“批准，最高US$0.15”，按已冻结方案执行12次：FLEURS-32／276各两次ASR，共51.96秒；四固定文本各原提示／候选一次。无重试、充值、追加样本或剩余额度调参。
实际预留US$0.103472，账本新增费用估算US$0.0093652，新增未结算0；不是供应商最终账单。剩余预算不延续，任何新真实实验另提方案和预算。

原脚本入口terminology-live.mjs --approved-budget-usd=0.15已经执行，**不得重跑或换目录／ID绕过已有输出**。
原收据ignored artifacts/study-teachback/terminology-01/live-quality.json，
SHA256 a1c0718fa6be2cc5486d468abae2c7d3cc4bac5ac99a4ac757ece97107d56292。
公开docs/research/terminology-live.json保留输入、配置、原响应、requestId／reservationId／用量、自动检查、编码代理逐例文本复核和派生邻近回听范围；未公开生产账本事件或凭据。基线／候选配置文件和产品提示未再修改。

结果与保留决定：
- FLEURS-32：ePC→Eee PC，严格字符差异3/52→1/52；及→其仍在，华硕／2007／IT保留。45→46词，均无零长度。仅这一条观察到术语恢复，不代表总体准确率。
- FLEURS-276无关词表负对照：均0/37，净空数字／日期保留，华硕／Eee PC／IT未插入。零长度“项”1个→“项、但”2个，不能宣称时间质量改善，也不能由一例证明无关词表安全。
- 两臂四文本各4/4判断符合预期、引用／版本有效。数值错误均2卡、解释60→62字；缓存自我修正正确项3→1、103→67字；无依据原因从时间＋原因未知两项变一个改写；必要条件解释48→56字。
- 可行动建议单一动作2/3→3/3，直接复述已有结论仍2/3→2/3。报告明确复核口径：要求练习但不直接提供答案的数值改写不计答案重复；不同正确方面的三张卡称碎片化，不算同一错误重复。不是独立人类评分或盲测。
- 保留可选术语和当前CONTENT：有名称恢复、正确项合并及一处多任务减少，四例判断无退化。不宣称消除重复、定位准确率提高或学习效果，不追加提示调参。
- 对零长度词，派生邻近引用“项”约4.66–5.70秒、“但”约7.02–9.14秒，保留明确近似标签；不是人工测得的精确时间。

本轮是两个朗读片段与四条已知文本，各臂仅一次；未独立核对实际发音，未标注人工词边界。原文／时间不改，转写与内容判断分开。
当前批次已完成，无待执行请求或待批准额度。

## 已完成的历史实验不重跑

PR19固定11次已全部执行，预留US$0.084016，账本估算US$0.0080848，新增未结算0，不是最终账单。无个人麦克风、充值或重试。docs/research/natural-speech-live.json保留所有输入、输出和复核。
FLEURS严格字符差异3/52、0/37；Eee PC→ePC，及→其。MInDS参考本身为ASR，不报准确率。45/30/44词零长度0/1/4；无人工时间标注。四文本两臂各4/4预期及有效引用，但仍有双追问、复述建议和碎片正确项。
收据ignored artifacts/study-teachback/natural-speech-01/live-quality.json，
SHA256 cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。
更早14次、9次及自我修正误判等全部保留，不重写旧结论。

## 验证和本地环境

本地定向Node28/28、Edge3/3；复用已有案例，新增一个历史真人零长度词引用行为。
首轮CI39442041152 Node159/166，7项因旧录音VM harness缺新依赖提前退出；补齐transcriptionTerms和flushDrafts，原有效录音案例增加快照断言，本地针对性22/22通过；最终完整CI已通过。本机未另跑全套，不因文档／提交变化重复检查。
浏览器测试初次未展开第二个引用详情，修正操作后仅复验回听。桌面术语入口截图已查看；390px由原有流程覆盖。

ignored artifacts/study-teachback/diagnosis-state-ux-01/：
node-1792507226183-v1h8aH、
browser-1792507225270-m6LsXx、
browser-1792507305517-uzKivV、
focused-1792507586060-IA2QH3。
合成凭据／loopback／独立账本；离线测试期间生产账本相同；本次已批准真实实验后账本SHA256
0fa9d40b6e5cbf9582760c1a1f81e517cabadd6f0cae04d40fa036045731a83b。

本地F:\Chat-Codex-Handoff\validation-repo在结束时同步产品合并分支。canonical只读最新meta/master-state，旧本地meta worktree不作权威。
4321本聊天无provider预览已重启以加载新模块，PID24324（启动时核对），IAB空白设置页刷新并保留。下次重启先核对完整命令和监听PID。正常npm start／4317，无公共部署。

## 后续约束

用户授权自主实现／自审／push／PR／merge，按批次交接，减少冗余测试。
本轮固定比较已完成。下一步先针对仍直接给答案让用户复述的建议，用独立任务区分纠正原话与检验理解；不要统一换成另一句模板。更广质量研究需自愿自然语音的人工文本和少量时间标注、数字角色和领域术语。每一新真实实验另报预算；暂不调停顿检测。

强制关闭未落盘、跨标签页协调、服务端持久请求去重未解决。
Phase3B仅有界可行性PASS，两份相同文字但不同结果历史报告都保留，直接请求归因未知；不得把第二份叫重试或挑较好结果。
Issue #3同输入多源研究保留；影响当前诊断的冲突需裁决，其余可见不阻塞；2–4份为受控样本非产品上限；来源角色可改，优先级有来源／目标依据。完整研究约束见CURRENT_STATE。
不加总体掌握分，不宣称课程收益。仓库许可证未选，公开语音仅有单独CC BY4.0许可。

历史链：[PR #21 后、实测批准前交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/5678be6c8385b6ee657c698e0fca26d6dac7cc2e/docs/master/HANDOFF.md)。
