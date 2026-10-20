# CURRENT_STATE — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Product/default branch: prototype/study-teachback-v0.1
Canonical state branch: meta/master-state

## 当前决定与授权

定位 **个人学习＋作品展示**。用户授权公开仓库及现有 Git 历史、README、产品与设计研究、自主审核实现、commit/push/PR/merge，以及有意义的批次交接；无需每个小动作询问。旧 no push/merge 和每次字节变化全量重跑限制已被后续授权取代。

本轮优先简繁一致性、时间定位、无效建议和含混解释，继续精简页面及冗余测试。用户明确批准固定 2 次合成 ASR＋6 条固定讲解各两配置，最多 14 次、US$0.15。十四次已完成，新增账本估算 US$0.0066592，新增未结算 0；授权不扩大到新样本／持续调用，不继续花剩余额度。上一批 US$0.10 固定实验与旧 Phase 3B 额度均不恢复。无个人麦克风授权。

## 最新交付

- 仓库 public，默认分支 prototype/study-teachback-v0.1。
- [Issue #16](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/16) / [PR #17](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/17) 已合并。
- 分支 codex/transcript-timing-feedback；实现头 25ef54996834f17fb7d6c058ac3b1852b334e4c9。
- 合并提交 673eca6b7a47369c71de032c7e6f66636c2930ae。
- [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39427275271) 第一次运行完整 Node／Edge PASS，独立提取器按范围跳过；job 118642889117。

Whisper-1 新增短简体风格提示，返回 styleHint=zh-Hans-v1；不传教材答案，不做自动简繁转换，原始响应保留。展开“原始转写与回听”可点词：正长度词用提供方边界，标为词级参考；零长度词用同段前后有效词组成的不超过三秒的邻近范围，明确非独立词时间；无法取得时用整段。顺序文字映射失败时保留纯文本和既有段落回听。不会把校对后的文字强行对应旧词时间，不自动确认或调用 API。

GPT-5.6-Luna 内容新 schema 要求 supported.repair=null，其余状态保留具体建议。兼容旧报告字符串修正，不改写历史。提示明确必要条件方向及材料未支持的充分性；只评价自我修正后的最终立场。页面保持结论优先、证据折叠，删除重复版本状态文字，将补救提示改为“下一步”。

[批次说明](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-10-21-transcript-refinement.md)、[方案](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/2026-10-20-transcript-refinement-plan.md)、[完整合成比较与人工复核](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/transcript-refinement-live.json)。使用 OpenAI Docs 技能核对 Whisper 提示、词段时间及嵌套 anyOf 结构化输出；模型不变，提示和输出合同已更新。

此前 PR #2／#5／#7／#9／#11／#13／#15 的公开整理、工作台／固定示例、独立情境练习、恢复与备份、聊天草稿／本地查找／分页、精确命中与手动上下文、转写草稿／请求追踪、已有音频上传均已完成。上传最长 3 分钟、25 MiB，选择文件只本机保存和试听，点击“开始转写”才调用；统一单声道 16 kHz 临时音频检查，存储／导出原字节不变。旧转写只读；contextNote 1000 字，最多六条整消息按 24k 输入预算移除最旧历史，没有自动摘要。原记录 createdAt 七天到期；恢复副本从 restoredAt 七天，128 MB v1 备份，无数据库升级。

## 分离质量结果

转写与内容独立，不把桩测试或引用有效视作学习效果。quality-history.mjs 离线复算历史；quality-eval.mjs 输出 CER、时间有效性、verdict、引用和无文字建议索引；新 supported null 是无须建议，不作为无效建议。

- 本轮两次 Whisper 同条 7.31 秒 Huihui 合成普通话：旧配置严格 CER 9/24=37.5%，全部简繁差异；新提示 0/24，否定词和条件方向均保留。两臂 22 词中 w14 仍零长度，少数边界约差 0.02 秒。没有人工时间准确率测量，范围回听不代表修复对齐。
- 六条固定讲解各跑旧／新提示+schema 配置。五条已有开发样本、一条新增备份升级条件案例，不是跨课程验证。两臂 verdict 与引用均 6/6；本次未重现历史标点建议，不声称发生率下降。
- 候选正确改述和自我修正各一条 supported、repair=null；基线合计四条 supported 附多余提醒。两臂均接受最终立场，未处罚撤回句子。持票／备份解释方向清楚；候选仍有“要发生……”模板感，部分更长，不能声称全面更短或更准确。
- 14 请求全部完成，实际保守预留 US$0.078774，账本新增估算 US$0.0066592，无新增未结算、自动重试或充值。不继续使用剩余额度。
- 上批 9 请求 US$0.004224，7 条不同文本＋1 次自我修正重复，8/8 verdict／引用但有 ] 建议及含混开头。更早历史 6/7、自我修正误判、CHANNEL_LEAK 停止、7/7 与“. .”仍保留。历史配置不同，不混作同条件比较。
- 一个合成声音与简单规则不能保证自然口语、噪声、数字／术语、课程泛化、总体准确率或学习收益；提示不保证全部返回简体。

## 验证与精简原则

本地定向 Node 25/25，聚焦 Edge 1/1：原文词和邻近范围真实回听、Enter、草稿刷新、原始记录不改、supported 无补救、390px 无横向溢出；桌面与手机截图已查看。首次 Edge 测试脚本未完整发送 Enter 字符，补全后只复验此条。新增两条 Node 行为用例及一条浏览器流程，复用旧备份／确认测试；完整回归留给本批 CI。

离线测试 synthetic credential、loopback、独立账本与浏览器照旧，前后生产账本未变。单独批准的真实实验改变生产账本，最终 SHA256 bff0eb123b80b6283f05abb2fcee29f2860d20279bde1d5c53e615ca7bff512b，不得误报本批无 API。新增聚焦参数 --refinement-only，详见 docs/TESTING.md。文案／提交／合并不重跑。

强制终止前未完成写入、跨标签页协调、服务端持久请求去重仍未解决；未知结果显式重试可能再计费。未添加多分钟自动分段或自动纠正原文。

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

本批已完成，等待真实使用反馈。可优先考虑自愿自然语音、数字／术语和人工词时间标注，或降低解释的模板感；任何新增真实调用仍先定样本、比较对象及预算。不要继续消耗本次余额、扩大到个人录音、直接调停顿阈值，或把词段回听称为 ASR 对齐准确率提升。

[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 同输入多源研究仍保留。没有公共部署；4321 已刷新本聊天无 provider 预览，正常 npm start / 4317。

前批详情见 [PR #15 后交接快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/60179ad4bf8e327e321f80cb783753466daa8c61/docs/master/CURRENT_STATE.md)。
