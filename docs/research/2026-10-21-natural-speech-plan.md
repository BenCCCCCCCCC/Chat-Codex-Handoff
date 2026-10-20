# 真人语音、数字术语与内容反馈：固定小样本计划

状态：**用户已明确批准本轮，最高 US$0.15**。上轮额度已结束，不继承剩余额度。先完成离线检查，再执行一次固定比较。

## 样本与配置

固定输入见 `study-teachback-app/natural-speech-fixtures.mjs`；三个音频已转换、冻结 hash，
许可与来源见 `study-teachback-app/fixtures/natural-speech/README.md`。

- 真人朗读 FLEURS 两条：12.12 秒，含华硕／Eee PC／2007／IT；13.86 秒，含净空 15 米和完工／通车日期。
- MInDS-14 中文情境引导口语一条：17.152 秒，账户余额／app／不能使用。参考文字来自 Google ASR，**不计转写准确率**，仅作诊断线索。不能代表日常自由对话。
- 三条各转写一次：Whisper-1、zh、现行简体提示、词／段时间；不把正确答案塞进提示。共 **3 次 ASR**。
- 内容分析独立使用四条固定文字，不把未人工确认的 ASR 输出自动作为分析输入：数值错误（50 vs 15 米）、缓存概念与步骤中的自我修正、无来源的通车原因、备份必要条件误推。
- 每条比较两臂，共 **8 次语义调用**。基线冻结在 `fixtures/natural-speech-baseline.json`，来源 `673eca6b7a47369c71de032c7e6f66636c2930ae`。候选为本轮 CONTENT：检查相关数值／单位／机制／来源边界，短引文，一两句具体解释，一个下一步问题，去掉固定条件解释句式。模型 GPT-5.6-Luna、schema 和参数不变。
- 总计 **最多 11 次调用**。内容两臂交替先后；每个结果立即保存，不自动重试、不临时调提示、不追加样本。不符合预期也保留。网络或结构错误停止剩余调用。

## 分开评估

1. 朗读文本严格 CER（保留简繁及数字写法差异）；这只是相对朗读稿的差异，实际读漏／读错未经人工核验。
2. 预先列出的数字、单位、日期、术语和否定表达是否保留。允许已列数字写法／大小写变体，有边界检查，避免把 115 米算作 15 米。词项存在不代表语义角色正确。
3. 时间戳有效、零长度词数、可定位引文范围。**没有独立人工时间标注，不报告时间定位准确率。**
4. 内容判断、证据引用、是否要求修正已正确内容；人工逐条检查解释与追问的具体性、重复和模板痕迹。四例不产生稳定质量率或泛化结论。

## 预算与执行

2026-10-21 核对 [Whisper-1](https://developers.openai.com/api/docs/models/whisper-1)
$0.006/分钟；[GPT-5.6-Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna)
输入 $0.20/百万 token、输出 $1.20/百万 token。

沿用生产保守预留：三次 ASR 各按 3 分钟，共 $0.054；
八次内容各最多 24,000 输入／1,800 输出，输入按缓存写入 $0.25/百万预留，共 $0.06528。
**总预留 US$0.11928，硬上限 US$0.15**。不会充值、购买或以实际费用较低为由扩大次数。
与生产全局账本同时受限；原始用量、requestId、reservationId 和输入／配置 hash 随结果保存。

批准后唯一入口：`node study-teachback-app/natural-speech-live.mjs --approved-budget-usd=0.15`。
已有输出拒绝覆盖。评估报告与 GitHub 批次记录一起发布；公开许可样本归因保留。

## 资料与产品边界

[OpenAI 转写指南](https://developers.openai.com/api/docs/guides/transcription)建议用代表性录音与数字、专名等关键差异评估。
[Speech to text](https://developers.openai.com/api/docs/guides/speech-to-text)说明 Whisper 可返回词／段时间戳，
这里保持模型以便比较；未评估其他转写模型。
[MInDS 论文](https://arxiv.org/abs/2104.08524)与
[FLEURS 数据集](https://huggingface.co/datasets/google/fleurs)用于确认采集方式和参考文字来源。

语音仍是“浏览器解码 → ASR → 用户校对文字 → 内容模型”。本轮加强文本中的数值与概念判断和引文回听，
不把停顿、响度或口音变成理解／流利度评分，不宣称模型直接听懂了声音表现。
