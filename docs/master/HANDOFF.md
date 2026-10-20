# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读 CURRENT_STATE、README、docs/TESTING.md、docs/iterations/2026-10-21-natural-speech.md，以及 docs/research/2026-10-21-natural-speech-plan.md、natural-speech-live.json。旧 ACTIVE_EXCHANGE 只作历史，不恢复旧限制或额度。

## 已完成本批

[PR #19](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/19) 已合并，关闭 Issue #18。实现头 ef241317d1a71dd756125607a5774566cd24e171，合并 7ae3db08f2459eecca5ac700da9637c108c08ffa。[CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39431845262) 最终提交完整 Node／Edge PASS，独立提取器按范围跳过，job 118658588345。

- transcript-playback.mjs 新增 quotePlayback：确认段与原始文字和边界相同、引文唯一、字词映射完整且对应词正长度时，前后各留至多0.3秒，标签“原话附近”；其余回听整段。不插值原始时间，缺失内容无音频位置；旧core.replayAnchor合同和原词回听仍保留。
- schemas.mjs 仅改变 CONTENT 提示，增加数字／单位、术语定义、机制与步骤、来源支持边界检查，去掉固定条件解释句式；保留最终自我修正、来源引用／版本、supported.repair=null。Whisper简体提示、Luna模型与schema不改。
- app/style：反馈引文回听使用上述范围，多条supported默认折叠但逐条引文和报告不改；错误、遗漏直显。删除重复核对和播放文案。
- natural-speech-fixtures.mjs 冻结3音频／4文本，fixtures/natural-speech/存转换后PCM16k单声道音频及CC BY 4.0归因。2条FLEURS朗读稿与1条MInDS自动ASR参考分开，不将后者当gold。实际通过产品prepareAudio在隔离隐藏Edge转换，原始hash与转换hash保留。
- natural-speech-eval.mjs：严格字符差异与预声明关键词项分开；数字边界防115当15，不转换输出。自动参考不报字符准确率；时间有效性不是准确率。
- natural-speech-live.mjs：3ASR＋4文本×2提示，硬限11请求／US$0.15，逐响应保存，失败停止，无重试，已有输出拒绝覆盖，与全局账本共限。基线冻结于PR17，新提示与公开报告比较配置一致。不得换目录绕过已执行标记。

此前产品已有上传、草稿、恢复／备份、搜索精确命中、手动上下文、情境练习等，不重复实现。3分钟／25MiB，选择只本地保存试听，显式开始转写；原字节不改。七天原记录、restoredAt七天副本、128MB v1备份不变。内容分析只看确认文字，未知辅助条件不声称脱稿。

## 真实实验已完成，额度不延续

用户明确批准固定方案最高US$0.15；11次全部完成，累计保守预留US$0.084016，账本估算US$0.0080848，新增未结算0。无个人麦克风、充值或重试，不继续使用余额。费用不是供应商最终账单。

原首轮 CI 39431332503 的 Node165/165通过，Edge被旧“词级定位部分不可用”文案断言挡住；移除冗余字面断言，保留真实播放、零长度原值、不可用标记及确认检查，由最终提交 CI 复验。本机未再全量重跑。

收据ignored artifacts/study-teachback/natural-speech-01/live-quality.json，SHA256 cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。公开docs/research/natural-speech-live.json保留全部输入、两臂配置、响应／requestId／reservationId／用量、评分和coding agent逐条文字复核，未公开生产账本事件。

- 两条FLEURS真人朗读相对稿件严格差异3/52、0/37；Eee PC→ePC、及→其。数字和日期保留，但未独立核实实际朗读偏差，不全部归为ASR错误。
- MInDS情境引导口语原参考也是ASR；只记录余额／APP／否定等词项，重复、主语和结尾差异未裁决，不能报准确率或自由口语代表性。
- 45／30／44词各有0／1／4个零长度；没有人工词边界，定位准确率未知。
- 两臂四文本各4/4预期及引用有效。数字误说、自我修正、无依据因果、必要条件方向均处理正确。候选仍有复述式建议、双重追问、三条正确项更碎；产品折叠，不把文字检查通过宣传为表达质量提升或学习效果。
- 原始实验报告不重写。历史14次、9次以及 ]／. .／自我修正误判等都保留。

## 验证与本地环境

本地 F:\Chat-Codex-Handoff\validation-repo 已回产品分支同步合并，工作区干净。canonical只读最新meta/master-state，旧本地meta worktree不作权威。

本地定向Node27/27，Edge1/1；两个新增行为用例及扩展一个浏览器流程，最终折叠改动只复验浏览器；首次旧文案断言失败修正后通过。CI完整回归一次，提交／交接不再复跑。桌面及390px截图已查看。入口node/browser diagnosis-state-ux-01 --refinement-only。

收据ignored artifacts/study-teachback/diagnosis-state-ux-01/ 下 node-1792502767575-CExS1K、browser-1792503012016-j8MMNk。离线前后生产账本相同；单独批准真实实验后最终账本SHA256 b1c8d360f7849ef165239ae9faa975f1ad1514daeef5f2f3501404aa4a6983a7。

4321 已刷新本聊天无 provider 预览，复用原服务（exec session 34023；本轮核对 PID 19584）并保留空白设置页。 下次重启先核对监听PID与完整命令；常规npm start / 4317，/demo无API示例，没有公共部署。

## 后续判断

用户授权自主方案／实现／自审／push／PR／merge和按批次交接，减少冗余文字及测试。优先真人自然讲解的人工文字与词时间标注、数字角色和领域术语，再考虑模型或用户自愿词表提示；不要把教材答案写入转写提示。文本分析继续优化单一追问与避免重复，任何新真实调用先提方案预算。当前批次不得重跑。

强制关闭未落盘、跨标签页协调、服务端持久请求去重仍未解决。Issue #3多源研究保留。Phase3B仅有界可行性PASS，两份相同文字但不同结果历史报告都保留，直接请求归因未知；新requestId不重写旧结论。影响当前判断的冲突需裁决，其他可见不阻塞；2–4份仅受控样本非产品上限。来源角色可改，优先级按来源与目标。完整研究约束见CURRENT_STATE。仓库许可证未选（本批公开语音有单独CC BY4.0归因）；不加总体掌握分，不宣称课程收益。

历史链：[PR #17 后交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/6f666cad899ebf6ea80e27949abdec9cda4e0873/docs/master/HANDOFF.md)。
