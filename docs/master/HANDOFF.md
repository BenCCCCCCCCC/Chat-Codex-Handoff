# HANDOFF — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Canonical branch: meta/master-state

先读 CURRENT_STATE、README、docs/TESTING.md 与 docs/iterations/2026-10-20-search-context-voice.md。旧 ACTIVE_EXCHANGE 只作历史，不恢复旧限制或调用额度。

## 已完成本批

[PR #13](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/13) 已合并，关闭 Issue #12。实现头 5d27cd155cadb23d3e2a152891dc76722bc7f363，合并 be9dd41bea1bd704935d4f00d855ad5eda948db7，[最终 CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39420914331) 完整 Node／Edge PASS。

- record-search.mjs 返回逐项 hits/key/target；search-focus.mjs 解析目的视图和转写版本，focusHit 定位／高亮。app 的 locateHit 按消息、来源、要点、草稿、练习和语音路由。历史转写／反馈只读展示，可关联原声，绝不覆盖当前修订。
- chat-ui.mjs 支持消息窗口的前／后加载、最新位置和具体消息定位；默认 24 条。contextNote 最多 1,000 字，复用草稿自动保存；teach 在 chatRequest 内保存要点快照。显式重试使用原快照，不引用新改的要点。
- provider.mjs 在既有输入预算内移除最早整条历史，保留材料／当前问题／要点；输出 contextUsage 使用／省略条数。server 的 teach 请求体容纳 128,000 字节合法中文输入，逐字段和模型费用限制仍在。必需内容超限仍拒绝，没有自动摘要。
- voice-review.mjs 处理未确认 transcriptDraft 和新报告 analysis 元数据。编辑自动保存；确认前等待草稿写入，再建立确认版本并移除草稿。导航／备份／保存恢复／删除沿用统一队列约束。备份兼容 v1，新字段可选，无数据库升级。
- 新内容报告记录 model／reservationId／requestId，原始 ASR 也保存 requestId。未知历史不补造归因。UI 的分析依据折叠，保留报告与确认文字版本绑定。

语音实际机制：浏览器录音与本机声音检查 → whisper-1 API 转写 → 人工确认 → gpt-5.6-luna API 对照材料分析文字 → 本机校验引用／版本／回听。当前没有外部音频上传；内容分析不直接看声学特征。过程观察独立，不把停顿推断成知识缺口。README 已清楚说明。

此前 PR #2／#5／#7／#9／#11 的功能均已完成，不再列为待办。七天保留、恢复副本从 restoredAt 七天、128 MB 备份、费用边界不变。

## 验证与接手

本地 F:\Chat-Codex-Handoff\validation-repo 回到默认产品分支并同步合并，工作区干净。先看 git status；canonical 只读最新 meta/master-state，旧本地 meta worktree 不是当前权威状态。

定向 Node 26/26、聚焦 Edge 3/3，已查看桌面／手机。首次 CI 157/158 的长中文用例因桩反馈仍引用旧来源被拒，修正桩后局部 16/16，再经完整 CI PASS。未本地重复全套；文档／合并后无需重跑。新增 node/browser diagnosis-state-ux-01 --context-only。

本地收据在 ignored artifacts/study-teachback/diagnosis-state-ux-01/ 的 node-1792498099830-VFZvfu、browser-1792498109834-vPD9Mk、boundaries-1792498514478-8BZEoE。公开截图见 docs/images/study-search-location.png、study-transcript-location.png、study-context-mobile.png，全部为合成材料和桩响应。

无真实 ASR／模型／个人麦克风测试，无新增 API 支出，生产账本未变。本批不能证明自然语音识别率、过程检测准确率或教学收益。强制关闭前未落盘的写入、跨标签页并发和持久请求去重仍未解决。

本聊天 4321 已重启并加载新版无 provider 预览。进程由此聊天创建，不应误停其他服务。正常 npm start / 4317；/demo 为固定无 API 示例。

## 后续判断

用户授权自主方案、实现、自审、push/PR/merge 和按批次留痕；减少冗余文字／测试。普通动作不需再次许可。对话要点是手动整理，不宣称完整记忆；本机保存不等于云备份。

语音质量下一步先固定样本，分别衡量转写错误和确认文字后的模型误判，再考虑术语提示／分段／模型比较。Issue #3 的同输入基线比较继续保留；任何真实实验需新增样本／服务／预算范围，旧 Phase 3B 额度已用完。

Phase 3B 仍仅有界可行性 PASS，两份相同输入历史报告均保留，历史直接请求归因未知。新元数据不能改变这个结论。多源材料冲突仍是研究假设：影响判断的冲突需裁决，其余可见不阻塞；2–4 份仅受控样本，非产品文件上限。详细用户决定见 CURRENT_STATE。许可证未选，无总体掌握分或跨课程收益声明。

历史链见[前批交接快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/b392ee55e258d489cdb6a818e6d916bdf46eed69/docs/master/HANDOFF.md)。
