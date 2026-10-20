# CURRENT_STATE — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Product/default branch: prototype/study-teachback-v0.1
Canonical state branch: meta/master-state

## 当前决定与授权

定位 **个人学习＋作品展示**。用户授权公开仓库及现有 Git 历史、README、产品与设计研究、自主审核实现、commit/push/PR/merge，以及有意义的批次交接；无需每个小动作询问。旧 no push/merge 和每次字节变化全量重跑限制已被后续授权取代。

本轮要求优先语音核心、上传已有音频、分别评估转写和内容质量、精简页面与测试。用户明确批准固定 1 次合成 ASR＋8 次固定文本内容调用，最多 US$0.10。本次九次已完成，新增账本估算 US$0.004224；授权不扩大到新样本／持续调用，不继续花剩余额度。无个人麦克风授权。旧 Phase 3B 额度仍已耗尽。

## 最新交付

- 仓库 public，默认分支 prototype/study-teachback-v0.1。
- [Issue #14](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/14) / [PR #15](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/15) 已合并。
- 分支 codex/audio-upload-and-quality；实现头 330ab48adcdbfdad96a2f4e870efaf9b4805cfbd。
- 合并提交 7c4ec2e02c5e80bf0892d296875d79eb1508ae04。
- [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39423978423) 一次完整 Node／Edge PASS，独立提取器按范围跳过；job 118631733723。

“我来讲讲 → 上传音频”：选择文件只在本机解码、检查、保存原始字节并试听；点击“开始转写”才发送。支持浏览器可解码的 WAV/MP3/M4A/MP4/WebM/OGG/FLAC/AAC，最长 3 分钟、最大 25 MiB，不静默截断。无效／超长文件不创建尝试或调用 API。刷新不重试，失败复用原尝试与显式重试。captureOrigin、fileName 和 unknown 辅助条件随 v1 备份保留。

浏览器统一对单声道 16 kHz 临时音频做检查和 ASR，修复只检查左声道造成的误判；存储／导出原字节不改。未转写时隐藏空白反馈、核对标题和过程区域，细节按需展开。内容模型仍只接收确认后的文字与材料，模型及生产提示不变。

[批次说明](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-10-20-audio-upload-quality.md)包含实现、验证、实验与限制。[方案](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/2026-10-20-voice-quality-plan.md)与[完整合成结果](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/voice-quality-live.json)已公开，无个人录音。使用 OpenAI Docs 技能核对官方 ASR／模型价格与接口。

此前 PR #2／#5／#7／#9／#11／#13 的公开整理、工作台／固定示例、独立情境练习、恢复与备份、聊天草稿／本地查找／分页、命中消息及旧转写定位、手动上下文和转写草稿／请求追踪均已完成。旧转写只读，不覆盖当前；contextNote 1000 字，最近最多六条整消息按 24k 输入预算移除最旧历史；没有自动摘要。原记录 createdAt 七天到期；恢复副本从 restoredAt 七天，128 MB v1 备份，无数据库升级。

## 分离质量结果

转写与内容独立，不把桩测试或引用有效视作学习效果。quality-history.mjs 离线复算公开历史；quality-eval.mjs 输出 CER、时间有效性、verdict、引用和无文字建议索引，理由／建议仍需阅读。

- 新 Whisper 单条 7.31 秒合成普通话：严格 CER 9/24=37.5%，九处均为简繁书写差异，否定词和条件方向保留。22 词中 w14 时间长度为零；不能把 CER 当语义错率，也未评估人工时间对齐准确性。
- 新内容七条不同固定文本＋一次自我修正重复：8/8 verdict 符合预期，8/8 引用／版本有效。一条 supported repair 只有 ]；另一条持票条件解释开头含混，后续方向与结论正确。产品不将 supported repair 生成补救操作。两次自我修正 verdict 相同，反馈条数 1 vs 3，不能据此推断稳定率。
- 历史首轮 6/7，自我修正误判；第二轮 CHANNEL_LEAK 停止；修订 7/7 但一条建议只有“. .”。历史提示与校验不同，不构成受控 A/B。两类报告原样保留。
- 新实验 9 请求，保守实际预留合计 US$0.0455655，新增已知估算 US$0.004224，新增未结算 0。首次仅本地 WAV 容器预检停止（0 请求），保存记录后标准化容器，PCM 未变，才执行原方案。没有自动 API 重试或充值。
- 只覆盖一个合成声音和简单规则。自然口语、噪声、数字／术语、课程、总体准确率和学习收益仍未知。

## 验证与精简原则

本地定向 Node 43/43、Edge 2/2：实际浏览器双声道解码、选择／刷新不调用、显式转写与重试、核对后诊断、原声备份和坏文件／超长边界。已查看桌面／手机截图。首次 Edge 第二条脚本缺 async 导致语法错误，只修复并复验两条；完整回归留给一次 PR CI。文案／提交／合并不重跑。

离线测试的 synthetic credential、loopback 网络、独立账本与浏览器照旧，测试前后生产账本未变。另行获批的真实实验改变了生产账本，最终 SHA256 db2331acab4254609349d75ad99db1f368ca140fcc4f61160556ee8d7f22a220，不得误报本批完全无 API。常用新增聚焦参数 --audio-only。详见 docs/TESTING.md。

强制终止前未完成的写入、跨标签页协调、服务端持久请求去重仍未解决。未知结果显式重试可能再次计费。未添加多分钟自动分段或自动纠正原文。

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

本轮上传与分离小样本评估已完成。从真实使用反馈决定下一批。可优先比较简体偏好、领域词汇提示，或改进含混解释／无文字建议；每项只改一个变量，新真实调用须新定样本与预算。不要继续消耗本次余额、扩大到用户个人录音、直接调停顿阈值或宣称自然语音有效。

[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 同输入多源研究仍保留。没有公共部署；4321 为本聊天无 provider 预览，已刷新新版；正常 npm start / 4317，预览不启用付费能力。

前批详情见[PR #13 后交接快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/6c4ad447733e824986c94c0dd09db852bb4aa5f7/docs/master/CURRENT_STATE.md)。
