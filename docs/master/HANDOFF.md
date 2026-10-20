# HANDOFF — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支 CURRENT_STATE，再读产品 README、docs/TESTING.md、docs/iterations/2026-10-20-practice-resume.md。旧 ACTIVE_EXCHANGE 只作历史，不恢复旧限制／调用额度。

## 已完成

仓库 public，默认分支 prototype/study-teachback-v0.1。PR #2 完成公开整理与诊断状态；PR #5 完成工作台与 /demo 固定示例。

本批 [PR #7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/7) 已合并：
- 合并：8312df0f51ba2ccbac3ba311a3ea9e46b32aa34a
- 实现头：2f080135a675e323ad2bc75e50c0cbfc99a4f197
- [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39408854296)：PASS — Node 154、Edge 55；Python 独立提取按范围跳过

独立情境练习支持出题、回答、反馈、再答、多题回看。每次回答单独保存；草稿自动保存；失败保留回答，刷新不自动重试；相同已有成功反馈的回答复用结果。普通聊天与录音独立。

重开恢复最近主题及学习／核对／练习位置；记录按活动时间排序。历史入口读取最新保存记录，并在读取期间保持忙状态，防止旧内存遮蔽数据库更新。

数据为主题的可选 practiceRounds、activePracticeId、practiceRequest、resume、updatedAt 字段。旧 topic.apply 兼容读入且保留原字段；导出 v1 包含新记录，无 IndexedDB 版本迁移。七天到期仍由 createdAt 决定。

## 接手方式

本地 F:\Chat-Codex-Handoff\validation-repo。先查看 git status、分支与远端；以最新产品合并和本 canonical 为准，不使用旧本地 meta 分支。

正常运行 npm start，入口 4317；真实 Tutor／出题／反馈需要原有服务端 API 配置。当前聊天 4321 是已更新的无 provider 临时预览，不能把它视为已启用模型。/demo 仍是独立固定样例。

用户本轮明确优先实际学习流程与核心功能。后续从真实断点选一个完整批次，例如普通聊天失败恢复、导出恢复；不要重复完成工作台、固定示例或本轮练习。
Issue #3 的同输入比较协议与受控样本研究仍保留，可离线推进；实际模型比较需要新增服务／预算约定。

用户已授权常规实现、自审、push/PR/merge 与批次交接，不必每个动作询问。没有新增真实模型实验额度，原 Phase 3B 额度不能复用。

## 验证与限制

局部 Node 13/13。四个练习结果用例替换三个旧 apply 聊天用例；浏览器三个新流程替换三个旧路径，总数仍 55。无为文案／结构新增断言。

本地两次浏览器在异步等待和旧入口预期中断，修正后交由 CI，没有第三次本地全量。首次 CI Node 通过，Edge 捕获重开同 ID 旧对象问题；实际实现已修复，最终 CI 见上。文件提取未改，独立 Python 套件按范围跳过。

本轮没有真实模型调用或个人录音，生产账本未变。截图使用合成材料、模拟响应，工程流程通过不证明模型准确率或学习效果。跨标签页持久请求去重仍未实现。

继续遵循 docs/TESTING.md：按影响验证；文档不全量；通过后不因提交或交接再跑；保留保存、版本与调用费用相关行为。

## 保留判断

定位是个人学习＋作品展示。结论先说明错误／遗漏／下一步，证据按需，不做无依据总体分数。
Phase 3B 是有界可行性 PASS，非普遍学习效果；两份同输入历史报告均保留，不能挑选有利结果或声称已确定调用归因。
多源冲突仍是研究假设；相关冲突需裁决，无关冲突可见不阻塞；说话停顿不能独立判知识缺口。
许可证尚未选择。前一批详细交接见 [工作台快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/5288d44c55d6945244269923b90eed6ac007575d/docs/master/HANDOFF.md)。
