# HANDOFF — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Canonical branch: meta/master-state

先读 CURRENT_STATE，再读产品 README、docs/TESTING.md 和 docs/iterations/2026-10-20-chat-backup.md。旧 ACTIVE_EXCHANGE 只作历史，不恢复旧限制或调用额度。

## 已完成

[PR #9](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/9) 已合并，关联 Issue #8：
- 合并：ac1540837ffc329364677786292cd7407225a036
- 实现头：9b1f6ade07a83c56a725097da8b5fcf473930438
- [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39412499703)：PASS — Node 152、Edge 55；Python 独立提取按范围跳过。

普通聊天保存 chatRequest，显式重试保留原问题与发送时历史；刷新不自动请求，回复后保存失败不重复购买响应。忙锁涵盖保存与请求。首次自动讲解不冒充用户输入。

backup.mjs 编解码旧 v1 格式；backup-ui.mjs 管理本地选择、预览与确认。新副本原子 add，不覆盖原主题；仅主题 ID 新建，录音与来源／转写／报告引用保持。恢复失败保持预览供重试。上限 128 MB。学习日期保留，restoredAt 控制恢复副本新的七天保留期；原主题 createdAt 到期规则不变。恢复不调用模型、不重置账本。

页面删减重复文字；练习和对话分别呈现，历史独立，材料侧栏与底栏下一步动作保留。设计研究记录了 NN/g、RemNote、Obsidian 资料与采用范围。截图为合成材料和模拟响应。

此前 PR #2／#5／#7 的公开整理、诊断版本状态、固定示例、多题练习和续接均已完成，不能重新当作待办。

## 接手与后续

本地 F:\Chat-Codex-Handoff\validation-repo。查看 git status、分支与远端；canonical 只以最新 meta/master-state 为准，旧本地 meta worktree 不用于推断当前状态。

正常 npm start / 4317；模型功能需服务端配置。聊天 4321 是无真实 provider 的预览，不能当作模型已启用。/demo 是独立固定样例。

用户授权自主实现、自审、push/PR/merge 和批次交接，明确减少冗余测试与界面文字。下一轮从实际断点选择：聊天未发送草稿、记录检索、长对话阅读／上下文管理。Issue #3 同输入比较协议保留；真实模型比较需新增服务与预算约定。

局部 Node 7/7、聚焦 Edge 2/2；最终完整 CI 如上。首次 CI 与后续本地检查暴露的是旧等待和删除预期，已按真实回复／忙锁调整，未再重复本地全量。Node 数由 154 降至 152，浏览器仍 55；已有音频导出用例扩展为恢复。无真实模型／个人录音，生产账本未变。

继续按 docs/TESTING.md 验证影响范围；文案／交接不全量；不逐字段穷举。跨标签页持久请求去重、恢复任意第三方格式、损坏文件自动修复尚未实现。未知结果重试可再次计费；工程通过不证明模型准确率或长期学习效果。

## 保留判断

定位个人学习＋作品展示。先给具体错误／遗漏／下一步，证据按需；无总体掌握分。停顿不能独立证明知识缺口。

Phase 3B 仅有界可行性 PASS；两份同输入历史报告均保留，不能挑选有利结果或声称已确定调用归因。多源冲突仍为研究假设：影响判断的冲突需裁决，其他可见不阻塞。许可证尚未选择。

前批详细交接见[练习与续接快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/f97545b7f4f6828070b1e227694cfb45d63b556a/docs/master/HANDOFF.md)。
