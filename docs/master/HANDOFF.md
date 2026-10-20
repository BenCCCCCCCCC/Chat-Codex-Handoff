# HANDOFF — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支 CURRENT_STATE，再读产品分支 README、docs/TESTING.md 和 docs/iterations/2026-10-20-workspace-ux.md。旧 ACTIVE_EXCHANGE 仅作历史背景，不能恢复旧任务或限制。

## 已完成

仓库已公开，默认分支 prototype/study-teachback-v0.1。前一批 PR #2 完成公开整理、诊断状态体验、README、调研、合成音频与轻量 CI。

用户最新要求先学习设计再改善粗糙界面，本批将工作台和免费示例前置。
[PR #5](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/5) 已合并；合并提交 355174b5dbeeaf3a51d22012e73fab50956616cc，实现头 fa3d5f02e3437ab20dd21ce323569bec02232462。
[CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39405480113)：PASS — Node 153、Python 6、Edge 55。

完成新首页、桌面／小屏导航、阶段提示、可选学习设置、材料与对话工作区、保留草稿的提问建议、结论优先与证据展开。
独立 /demo 包含两个预编写主题、两种讲解对比、证据与情境练习；无 API、个人存储访问或麦克风依赖。不是模型实测，也未部署公共网站。

本地 Edge 一次 55/55，通过截图检查桌面、小屏、学习与反馈。首次 CI 有两条旧样式／HTML 断言失败；精简重复静态测试，并改善输入框对比度。局部 UI 3/3；其余交由最终 CI，没有再次本地全量重跑。本轮没有真实模型调用或个人录音，生产账本未变。

## 下一位接手者

本地仓库 F:\Chat-Codex-Handoff\validation-repo；先查看 git status、分支及远端状态，避免覆盖他人改动。以远端产品最新合并与本 canonical 为准；旧本地 meta 分支落后，不要将其当成当前状态。

从根目录 npm start 后访问 /demo 可免费体验，示例本身无需 Python。真实文件提取与模型能力的安装／key 要求见 README。当前聊天的 4321 端口仅为无 provider 的临时预览，不能代替正常产品启动。

下一批 [Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 仍保留：冻结同输入通用基线比较协议和受控多源案例。先读取既有准确源材料、确认文字与两份诊断结果；不重构原话、不挑选有利结果。初期 2–4 份材料，覆盖冲突、前置依赖、目标变化与弃权。用户体验反馈可以调整下一批顺序；不要把已完成的免费示例重新列为待实现。

用户授权常规自主审核、实现、push/PR/merge 和批次交接，无需每个小动作询问。没有新增付费模型实验额度；原 Phase 3B 配额已耗尽。

按影响选择验证：文档不跑产品全量；通过且代码未变不因提交／交接重跑；新增检查关注用户行为，保留保存、版本与调用费用相关回归。沿用 docs/TESTING.md。

## 不能丢失的判断

定位：个人学习＋作品展示。结果先讲错在哪里、漏在哪里、先补哪里；不要无依据总体打分。
Phase 3B 是有界可行性 PASS，不是普遍学习效果证明。两份历史相同输入报告均保留；确切历史调用归因仍待核对。
多源冲突是研究假设；相关冲突需用户裁决，无关冲突可见且不阻塞。说话停顿不能独立判知识错误。
先比较实际价值，再决定多源 UI；来源角色推断可纠正，不能替代权威裁决。许可证尚未选择。

前一批交接见 [公开整理快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc6ee83b8b2548eeee2e27bfb2584a8f1679cada/docs/master/HANDOFF.md)。更早 HOST VERIFY REQUIRED、未提交、no push/merge 与全量重跑限制已被后续结果和用户指示取代。
