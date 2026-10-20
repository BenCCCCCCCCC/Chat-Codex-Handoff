# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读 CURRENT_STATE、README、docs/TESTING.md、docs/iterations/2026-10-21-transcript-refinement.md，以及方案 docs/research/2026-10-20-transcript-refinement-plan.md、完整结果 transcript-refinement-live.json。旧 ACTIVE_EXCHANGE 只作历史，不恢复旧限制或额度。

## 已完成本批

[PR #17](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/17) 已合并并关闭 Issue #16。实现头 25ef54996834f17fb7d6c058ac3b1852b334e4c9，合并 673eca6b7a47369c71de032c7e6f66636c2930ae。[CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39427275271) 第一次运行完整 Node／Edge PASS，独立提取器按范围跳过；job 118642889117。

- provider.mjs：Whisper-1 默认短简体风格提示，styleHint=zh-Hans-v1。内部 prompt=null 仅给受控基线比较；HTTP 接口不接受外部提示。返回原文和时间不转换，未迁移旧记录。
- transcript-playback.mjs：原始文字顺序匹配 API 词列表，直接词回听；零长度词可用同段前后有效词组成 <=3 秒邻近范围，明确非独立词时间，否则回听整段。无法对应文字时纯文本，既有段回听仍可用。不会把用户校对文本映射到原词；原始时间不修补。旧 core.replayAnchor 的精确性合同不改。
- schemas.mjs：嵌套 anyOf 将 supported 的 repair 约束为 null，其余状态具体建议；明确必要条件方向与最终修正立场。core 校验允许 supported null，同时兼容历史字符串修正和 v1 备份；旧 supported 标点建议不显示补救操作、不篡改原报告。
- app/index/style：原始词按钮藏在“原始转写与回听”，无新常驻说明；保留键盘 Enter、范围状态。删除确认状态里重复版本时间，结果旁仍有绑定；补救标题为“下一步”。
- quality-eval.mjs：supported null 不列无效建议，其余质量项分开。quality-refinement-live.mjs：固定双配置、交替内容顺序、14 次／$0.15 上限、逐响应保存、已有输出拒绝覆盖、全局账本共限、无重试。baseline JSON 冻结于 PR #15。容器归一化只作用于 hash 固定的旧合成 WAV，PCM 不变。

此前 PR #2／#5／#7／#9／#11／#13／#15 均已完成：学习工作台、固定免费示例、情境练习、草稿与恢复、v1 导出恢复、本地全文查找及精确命中、长对话分页和手动要点、已有音频上传不要重复实现。上传 3 分钟／25 MiB、选择仅本地保存试听、显式开始转写；单声道 16 kHz 临时处理不改原字节；unknown 辅助条件不声称脱稿。七天原记录、restoredAt 七天副本、128 MB 备份不变。

## 真实实验与额度已使用

用户明确批准本次 2 次相同合成音频 ASR＋6 条固定讲解各旧／新两臂，最多 14 次、US$0.15。十四次全部完成，保守预留 US$0.078774，新增账本费用估算 US$0.0066592，新增未结算 0。没有自动重试、充值或个人麦克风，剩余预算不继续使用，不恢复旧授权。

原收据 ignored artifacts/study-teachback/transcript-refinement-01/live-quality.json，SHA256 91d10439122b10f6da84696c447573c0bb2cdfe89751ed44c23c9333b5fc8123。公开 docs/research/transcript-refinement-live.json 只含合成样本、配置、响应／requestId／reservationId／用量／评分与人工复核，未公开生产账本。

- ASR：7.31 秒 Huihui 合成声音，旧配置 9/24 严格差异均简繁，新提示 0/24；两臂否定词和方向保留。22 词中 w14 都零长度，少量边界约差 0.02 秒，没有人工时间对齐准确率。提示不保证自然语音或全量简体。
- 内容：五条已有开发样本＋一条新增备份升级同类规则，各配置一次。两臂 verdict 和引用均 6/6。本次未重现历史标点建议，不能估计发生率下降。
- 新配置正确改述与自我修正各一条 supported、repair=null；旧配置合计四条 supported 配多余提醒。均未惩罚撤回语句。持票与升级的必要条件表达明确，建议有具体内容；候选仍有模板感，部分更长。
- 比较的是整个提示+schema 配置，不把结果单独归因于提示，不声称整体更准确或更短。这是小样本，不是跨课程／自然语音／稳定率／学习效果验证。
- 上批 voice-quality-live.json 和所有旧报告保留；历史 ]、“. .”、6/7、自我修正误判、CHANNEL_LEAK 等不删除或改写。

## 验证与本地环境

本地 F:\Chat-Codex-Handoff\validation-repo 已回默认产品分支同步合并，工作区干净。canonical 只读最新 meta/master-state，旧本地 meta worktree 不是权威。

定向 Node 25/25，Edge 1/1，桌面／390px 手机截图已看。首次 Edge 的 CDP Enter 脚本缺字符，未触发点击；修正后只复验一条，非产品故障。最终状态文案由差异检查和完整 CI 验证，不再本地全量重跑。新增两条 Node 及一条浏览器流程，复用备份／确认用例。聚焦入口：node/browser diagnosis-state-ux-01 --refinement-only。

本地收据：ignored artifacts/study-teachback/diagnosis-state-ux-01/ 下 node-1792501104378-kg7cfh、browser-1792501170350-b28tZI。离线测试 synthetic credential、loopback、独立账本／浏览器，其生产账本 hash 前后相同。另行批准的真实实验后最终账本 SHA256 bff0eb123b80b6283f05abb2fcee29f2860d20279bde1d5c53e615ca7bff512b。

4321 已重启并刷新本聊天无 provider 预览，exec session 34023；下次重启先核对监听 PID 与完整命令，不按旧 PID 停进程。常规 npm start / 4317，/demo 无 API 示例，没有公共部署。

## 后续判断

用户授权自主方案、实现、自审、push/PR/merge 和按批次交接，减少冗余文字和测试。下一轮可依据真实使用反馈改善解释模板感，或规划自愿自然语音／数字术语／人工词时间基线；任何新真实调用先定样本与预算。不得重跑本批或换目录绕过已有报告，也不要把范围回听当成修好了 ASR 对齐。

强制关闭未落盘、跨标签页协调、服务端持久请求去重仍未解决。Issue #3 同输入多源研究保留。Phase 3B 仅有界可行性 PASS，同输入两份历史报告都保留，直接请求归因未知；新 requestId 不改写旧结论。影响当前判断的多源冲突需裁决，其他可见不阻塞；2–4 份仅受控样本非文件上限。来源角色可改、优先级依据材料与目标，详细决定见 CURRENT_STATE。许可证未选，不加总体掌握分，不宣称课程收益。

历史链：[PR #15 后交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/60179ad4bf8e327e321f80cb783753466daa8c61/docs/master/HANDOFF.md)。
