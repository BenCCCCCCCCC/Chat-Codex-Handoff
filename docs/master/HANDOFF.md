# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支CURRENT_STATE、产品README、docs/TESTING.md、
docs/iterations/2026-10-21-understanding-probes.md和对应research方案／完整JSON。
旧ACTIVE_EXCHANGE不恢复限制或预算。

## 本批已交付

[PR #24](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/24)已合并，[Issue #23](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/23)关闭。
实现头9a681061730cb7a1dee0123be90bebfd216c436d，合并afdabb5a48cb7466bc0eead0cb065e3cd21e3e94。
[CI39448586476](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39448586476)完整Node／Edge PASS，提取器按范围跳过，job118717011775。

- practice.mjs.fromFeedback直接复用repair为题目，不生成新题请求；显式答题走已有apply_answer。origin保存targetId／sourceId／attemptId／transcriptVersion，同目标同题复用，题目或版本变化另建。沿用草稿、失败重试、完成同答复用；backup保留origin且校验source。
- app.mjs只从localize有效的当前报告生成“试着回答”；历史报告不生成。补学／重讲收在“其他方式”，删重复前缀。practice-ui在新题打开后聚焦答题框，空introduction隐藏。新入口可用不代表旧repair都成为好题。
- transcript-playback.mjs将连续零长度词作为片段取有效邻词。段首／尾缺一侧邻词可用对应段边界，至少另一侧有效、跨度≤3秒；共享边界先按原文顺序映射到段，不能确定就不猜。不插值、不改时间；引用原有唯一／未编辑／映射规则、组合6秒和0.3秒padding保持。
- 历史MInDS-28段首“我”9.62–16.04整段变9.62–10.00邻近范围，其余既有内部零长度词范围相同；无人工对齐，不称准确率提升。
- 新CONTENT候选已撤回，当前schemas.mjs与本轮之前完全相同。冻结candidate仅供研究留痕，**不要误恢复成生产配置**。TEACH／schema／模型未变。

## 本轮真实调用已全部完成

用户明确批准“最高US$0.10”，6固定文本×两臂=12次内容分析；无ASR、个人录音、重试、充值或追加调参。
预留US$0.0495065；账本新增估算US$0.0062383；新增未结算0（历史4笔未结算仍在），不是最终账单。
额度不延续，任何新真实实验须另提方案预算。

入口understanding-live.mjs --approved-budget-usd=0.10已执行，不得重跑或换目录／ID绕过。
原收据ignored artifacts/study-teachback/understanding-probes-01/live-quality.json，SHA256
4f0ee76950be02ca554f93faf378a4838ec9def3f00d53b7dbd7ab4ecb4b59a7。
公开docs/research/understanding-probes-live.json保留所有输入、两臂完整提示、响应／用量、
原自动分数、编码代理逐例复核和撤回理由；未公开凭据或生产账本事件。
固定两臂为fixtures/understanding-baseline.json／understanding-candidate.json。

结果：
- 引用版本两臂均6/6。主要问题两臂人工复核均识别；自动5/6→6/6来自通用oracle对错误例含supported的限制，不证明候选多找出一处错误。
- 五条可行动建议复述4/5→2/5，单任务均5/5；候选1/5预设来源未给出的“其他升级要求”，且用“不满足”暗示结论，不接受这种交换。
- 原因候选仍问message刚给出的结论；步骤下一步仍照抄解释，双方把移到末尾称量说成全部倒置，解释过度。配方两组都需计算但同一情境，未改善；抽样候选的反例相容判断有效；撤回错误两组正确接受且无repair。
- 撤回候选恢复baseline，保留新作答及回听功能。不宣称解决反馈复述、总体质量或学习收益；2旧＋4新作者自编例不是盲测，无独立人类评分。

## 验证与环境

本地只跑Node34/34及原有Edge一条整合流程：真实媒体／键盘、直接答题零出题调用、
草稿刷新、显式提交一次、390px布局。桌面反馈／手机答题截图已查看。完整回归只由PR CI执行。
本轮本地收据：artifacts/study-teachback/diagnosis-state-ux-01/node-1792509711360-c4NEnm、
browser-1792509711022-OAl1pm。合成凭据、loopback、独立账本；离线期间生产账本未变。
获批实验后账本SHA256为595884707633855620ddb3c320b9c0ab1403f78c2104a39bb70690dc303eeb7c。
文档／提交不触发本机全套重跑。

本地F:\Chat-Codex-Handoff\validation-repo最终同步产品默认分支；canonical只读meta/master-state，旧本地meta工作树非权威。
4321无provider预览保留（前轮核对PID24324），本批只刷新IAB静态客户端，无服务端模块变化，无重启或公共部署。下次停止／重启先核对完整命令和监听PID。正常npm start／4317。

## 历史实验与约束继续有效

术语PR21/22：12调用已完成，预留US$0.103472、估算US$0.0093652，docs/research/terminology-live.json。
原收据SHA256 a1c0718fa6be2cc5486d468abae2c7d3cc4bac5ac99a4ac757ece97107d56292。
Eee PC名称恢复但另一音频零长度增加；四例单动作2/3→3/3、答案复述仍2/3→2/3。当时接受的CONTENT即本轮恢复的baseline。
自然语音PR19：11调用US$0.0080848，原收据SHA256 cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。
更早14次US$0.0066592、9次US$0.004224及所有失败证据继续保留；全部额度结束，不重跑。

此前功能：可选术语最多8项／24字每项／总80字，attempt快照不随主题编辑改变；不自动收集教材答案。
上传3分钟／25MiB、原声本地保存再显式转写；contextNote1000字、最近六条整消息24k输入上界；七天原记录／恢复副本和128MB v1备份，无数据库迁移。
强制关闭未落盘、跨标签页协调、服务端持久请求去重未解决，结果未知的显式重试可能再计费。

用户授权自主实现／自审／push／PR／merge，按批次交接，减少冗余测试。
下一步先把纠正解释与独立可评分任务分开，人工写少量题目／评分依据，明确来源不足和假设的规则边界；不要继续单靠加长repair提示。新真实实验另报方案预算。可研究自愿自然语音人工文本／少量边界，不调停顿阈值。
Phase3B仅有界可行性PASS；两份相同文字却不同结果历史报告均保留，直接请求归因未知，不把第二份叫重试。
Issue #3同输入多源研究继续：影响当前诊断的冲突需裁决，其余可见不阻塞；2–4份为受控样本非产品上限；角色可改，优先级有来源／目标依据，完整约束见CURRENT_STATE。
不加总体掌握分，不宣称课程收益。仓库许可证未选；公开语音单独CC BY4.0。

历史快照：[本批之前完整交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/c2c5b1d3d5c9662c714723c183bb23eb5ff76df9/docs/master/HANDOFF.md)。
