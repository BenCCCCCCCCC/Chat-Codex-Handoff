# 转写书写、词段回听与反馈表达

跟踪：[Issue #16](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/16)。本批从 10 月 20 日开始，跨至悉尼时间 10 月 21 日完成；合并和 CI 状态写入 `meta/master-state`。

## 产品变化

- Whisper-1 现在带简体中文书写提示。只提示语言风格，不传入教材答案，不做简繁转换或覆盖 API 原文；返回值标记 `styleHint=zh-Hans-v1`，旧记录不迁移。
- 打开“原始转写与回听”，直接点击原文中的词。正长度词采用 API 边界，标为“词级参考”；零长度词优先取同段内前后有效词组成的不超过三秒的邻近范围，明确“非独立词时间”，无法取得时回听整段。文字不能与词列表顺序对应时保留纯文本及既有段落回听。
- 这些按钮只控制原声播放，不改变时间戳，不把编辑后的文字强行绑定到旧词时间，不自动确认文字或调用 API。键盘 Enter 可用。原始转写折叠显示，没有新增常驻说明面板。
- 内容反馈的新结构要求 `supported.repair=null`；存在问题才生成具体建议。历史报告的字符串建议仍可导入、查看，supported 从不产生补救操作。旧报告不改写。
- 内容提示明确必要条件方向，指出材料支持的前提与不能推出的充分性；要求只评价自我修正后的最终立场，减少等义重复。模型仍为 GPT-5.6-Luna。
- 页面将“值得核对的关系”精简为“下一步”，去掉确认状态中重复的版本和时间；结果旁仍保留版本绑定，API 信息按需展开。

## 官方依据

使用 OpenAI Docs 技能核对：[Speech to text](https://developers.openai.com/api/docs/guides/speech-to-text) 与 [Transcription API](https://developers.openai.com/api/reference/resources/audio/subresources/transcriptions/methods/create)。Whisper 的 prompt 是短上下文／风格提示，不能当作保证执行的指令；词／段时间来自 `verbose_json`。因此采用简短中文提示，并保留原始响应与人工核对。

[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs) 支持嵌套 anyOf。新 schema 分开“正确且无建议”和“有问题且需建议”，避免强制正确项目填一段无用修正。结构约束不能保证推理或文字质量，仍单独读理由与建议。

## 获批真实比较

用户明确批准[固定方案](../research/2026-10-20-transcript-refinement-plan.md)，最高 **US$0.15**。两臂同一条 7.31 秒合成音频，各一次；六条固定讲解各跑旧／新配置，按样本交替调用顺序，共 **14 次**。基线提示及 schema 冻结于 PR #15；比较整个配置，不能单独归因于提示或 schema。

[全部合成输入、响应、评分与人工复核](../research/transcript-refinement-live.json)均保留，包括 requestId、reservationId、用量和配置 hash。原始本机收据位于 ignored `artifacts/study-teachback/transcript-refinement-01/live-quality.json`，不会覆盖上一批报告。

| 观察 | 旧配置 | 新配置 |
| --- | --- | --- |
| 严格字符差异 | 9/24，全部简繁差异 | 0/24 |
| 否定词和条件方向 | 保留 | 保留 |
| 词时间 | 22 个词，w14 零长度 | 22 个词，w14 仍零长度 |
| 内容固定预期 | 6/6 符合 | 6/6 符合 |
| 引用／版本校验 | 6/6 有效 | 6/6 有效 |
| 正确改述与自我修正 | 合计 4 条 supported，均有多余建议 | 合计 2 条 supported，均 repair=null |

本次没有重现历史的 `]`／`. .` 建议，不能声称测出了它们的发生率下降。新合同消除了“正确也必须填修正文本”的要求。持票案例的新解释明确拆为“入场必须持票；仅持票是否足够，材料没有说明”；新增备份／升级案例也保留正确方向。两臂均接受修正后的最终立场，未重复处罚已撤回句子。

采用新配置，但保留限制：单个合成声音不能保证自然口语或完全简体一致；时间字段有效不代表人工对齐准确率，零长度问题没有被提示修好。六条简单条件规则不能代表课程泛化，候选解释仍有模板感，部分比旧配置长，不能声称整体更精简或更准确。不继续使用剩余预算循环调参。

保守累计预留 **US$0.078774**，本机账本新增费用估算 **US$0.0066592**，新增未结算 0。不是供应商最终账单。无自动 API 重试、无充值、无个人麦克风；14 次完成即停止。

## 验证与交接

本地定向 Node **25/25**；聚焦 Edge **1/1**：词级与邻近范围的真实媒体播放、键盘触发、校对草稿刷新后保留、原文不改、supported 无补救、390px 无横向溢出；桌面与手机截图已查看。首次浏览器脚本未完整发送 CDP Enter 字符，未触发点击；补全输入后只复验这一条，无产品故障或真实请求。

新增两条 Node 行为测试及一条浏览器流程；复用现有备份和确认测试。文案小改通过差异检查，不增加测试。完整 Node／Edge 只留给本批 PR CI，不重跑无关提取器。新聚焦入口 `--refinement-only`，见 [测试约定](../TESTING.md)。

本地收据位于 ignored `artifacts/study-teachback/diagnosis-state-ux-01/`：`node-1792501104378-kg7cfh`、`browser-1792501170350-b28tZI`。离线测试前后生产账本相同；单独授权的真实实验后，账本 SHA256 为 `bff0eb123b80b6283f05abb2fcee29f2860d20279bde1d5c53e615ca7bff512b`。

下一步可优先收集自愿自然语音和数字／术语案例，分别评价词时间与文字内容；新真实样本仍先定方案、预算。不要把范围回听当成修复了 ASR 对齐，不把此次 schema 约束当成消除了所有泛泛建议。Phase 3B 两份历史报告、来源裁决研究、七天保留与备份规则不变。
