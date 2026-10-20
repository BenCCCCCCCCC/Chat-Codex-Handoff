# HANDOFF — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Canonical branch: meta/master-state

先读 CURRENT_STATE，再读 README、docs/TESTING.md 与 docs/iterations/2026-10-20-drafts-history-voice.md。旧 ACTIVE_EXCHANGE 仅作历史，不恢复旧限制或调用额度。

## 本批已完成

[PR #11](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/11) 已合并，关联 Issue #10：
- 合并 1472487d2b04f57c5721f9747e43b7a10592ac51
- 实现头 b14b72a167a1c2913211cc243f2fa13448d5007c
- [最终 CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39415611782)：完整 Node／Edge 回归 PASS；Python 独立提取按改动范围跳过。

chat-ui.mjs 按主题管理 chatDraft，输入停止约 350 ms 后存入 IndexedDB；刷新／切换／导入恢复保留草稿。发送仅清掉本次内容，回复不覆盖下一句。draft-save.mjs 同时用于聊天与练习：等待已有写入、合并新输入、失败保留、明确删除时取消排队写入。导航与备份恢复前 flush；保存恢复不重新请求模型。

record-search.mjs 本地搜索主题、材料、聊天、草稿、原始／修订转写、反馈与练习，支持多个词和类型筛选；记录展示片段、20 条一页、最近活动排序。讲解列表折叠。查找进入主题，未实现命中位置直接跳转。

长对话最近 24 条起步，按批加载旧消息；追加节点保留向上阅读位置，提供“最新消息”。模型请求仍用材料＋最近 6 条消息，界面明确提示；没有后台摘要、没有新增调用成本。手机输入和发送并排，下一步栏回到文档流；长转写说明按需展开。

语音检查修复 ASR 已返回但本机保存失败被误标 PARTIAL 的路径：保留 raw／REVIEW_REQUIRED，不自动重复写入或转写；恢复本机保存后可继续确认与诊断。过轻、失真、中断显示具体状态并保留原声供回听重录。文字确认与内容诊断保持版本绑定，过程观察仍与知识判断分开。

恢复未完成聊天或导入副本后，释放忙锁时会重新启用重试入口。记录页提供 aria-busy，动作须等加载完成。备份兼容原 v1、chatDraft 可选，无数据库版本迁移。

PR #2／#5／#7／#9 已完成的公开整理、工作台、固定示例、练习续接、聊天失败恢复与备份恢复不要重新列作待办。七天原记录保留、恢复副本从 restoredAt 七天、128 MB 备份、费用账本边界不变。

## 验证与接手

本地 F:\Chat-Codex-Handoff\validation-repo 已回到产品默认分支并同步上述合并，工作区干净。先查看 git status；canonical 只以最新 meta/master-state 为准，旧本地 meta worktree 不用于推断当前状态。

定向 Node 30/30，Edge 三条新流程 3/3。手机遮挡修正后只重跑三条路径；完整回归交 CI。首次 CI 的新流程及语音相关检查均通过，旧删除用例因没有等记录页加载而被忙锁拦下，修正状态／等待后最终 CI PASS。未本地重复完整回归，也不因交接或合并重跑。

没有真实模型／ASR／个人录音，本地生产账本不变。真实 MediaRecorder、解码、IndexedDB、合成录音和模拟 provider 验证了保存恢复及报告关联；不能据此声称自然语音准确、流利度评估有效或学习效果已证实。检测器参数保持不变。截图均来自模拟材料与响应。

正常 npm start / 4317；模型功能需要服务端配置。聊天 4321 为已更新的无 provider 预览；本次进程由当前聊天启动，不应误停用户其他服务。/demo 是固定样例，不读个人记录。

按 docs/TESTING.md 选范围：新聚焦入口 node/browser diagnosis-state-ux-01 --workspace-only。文案与交接不全量，不逐字段穷举，不因通过后提交而重跑。强制关闭时尚未完成的草稿写入无法保证保留；跨标签页编辑协调／持久请求去重、第三方导出恢复、损坏备份自动修复尚未实现。

## 后续与保留判断

用户授权自主决定实现、自审、push/PR/merge 与批次交接，明确要求减少冗余文字和测试；不需再为常规动作请求许可。下一轮根据实际使用决定搜索命中跳转或明确触发的上下文整理。不要把本机自动保存描述为云备份，也不要默认增加模型摘要请求。

Issue #3 同输入基线比较协议保留。真实语音／模型质量实验需新的样本、服务与预算约定，旧 Phase 3B 额度已耗尽。

定位个人学习＋作品展示。先具体错误／遗漏／下一步，证据按需；无总体掌握分。停顿不能独立证明知识缺口。Phase 3B 仅有界可行性 PASS，两份同输入历史报告均保留，不能挑选有利结果或声称已确定调用归因。多源冲突仍为研究假设，影响判断的冲突需裁决，其余可见不阻塞；详细用户决定见 CURRENT_STATE。许可证尚未选择。

前批详细交接与历史链见[聊天与备份恢复快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/255d40fcec1e1ab65b0739c93a7b46fe7ee99e05/docs/master/HANDOFF.md)。
