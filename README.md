# 知而能讲 — Study-first + in-app teach-back

当前产品是 `study-teachback-app/`：先学习有限材料，再在应用内录音讲解、确认当前转写文字（可选回听）、查看反馈，并按需要补学、重讲或尝试新情境。当前阶段面向个人使用与作品展示；工程测试不代表学习效果或完整 owner 验收。

## 产品入口

- [产品说明与现有安装前提](study-teachback-app/README.md)
- Windows 启动：[Start-Study.cmd](Start-Study.cmd)；异常关闭后的身份校验恢复：[Stop-Study.cmd](Stop-Study.cmd)
- 新服务需要已有 Node、产品 Python 环境与指定版本 pypdf，以及服务端进程凭据。启动器不会自动安装、充值或修改系统策略。真实模型调用需要单独授权；启动说明不是调用授权。

截至 2026-09-30，已接受的产品行为基线为 `aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`（可选转写回听）。Phase 3B 真实 owner 验证已完成：1 次 Tutor、1 次真实录音、1 次 ASR、1 次内容诊断，重试 0 次。原三次 live 调用授权已全部用完，没有后续真实调用授权；新实验须另行明确授权。动态状态以 canonical 文档为准。

内容诊断使用用户明确确认的当前文字，逐段或完整回听是建议而非硬门槛；过程候选仍须回听对应片段后确认保存。过程证据不能单独证明知识理解有误。单次真实验证不代表跨课程学习效果、完整产品验收或阶段正式关闭；阶段关闭由 MASTER 决定。

## 唯一动态状态与任务来源

仓库：`BenCCCCCCCCC/Chat-Codex-Handoff`；产品分支：`prototype/study-teachback-v0.1`。

权威分支是 **`meta/master-state`**，路径分别为：

- [docs/master/CURRENT_STATE.md（canonical）](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/CURRENT_STATE.md)
- [docs/master/HANDOFF.md（canonical）](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/HANDOFF.md)

分支名不是目录前缀。产品 checkout 内的同名文件只是指针，不是第二份实时状态。执行前读取 canonical 分支并记录实际 commit；不要因旧本地副本而执行历史任务，也不要为了读文档切换产品分支。

## 开发交接工具（保留）

`handoff-kit/` 是开发工作流工具，不是当前学习产品。历史证据保留原路径。

- [Handoff CLI 说明](handoff-kit/README.md) 与 [实验窗口说明](handoff-kit/ui/README.md)
- 窗口入口：[Start-Handoff.cmd](Start-Handoff.cmd)
- 首次绑定：`.\handoff-kit\configure.ps1 -OriginChat 'https://chatgpt.com/g/PROJECT_ID/c/CONVERSATION_ID'`
- 显式更换 MASTER：同一命令加 `-Rebind`；不会自动改绑。
- Stop Hook 生成交付包后，运行 `.\handoff-kit\handoff.ps1 -CopyOnly` 仅复制，或 `.\handoff-kit\handoff.ps1` 复制并打开已绑定的网页对话。

用户自行粘贴、发送，MASTER 审查 delta；工具不自动发送，不合并聊天历史，也不自动 push/merge。可不使用窗口，继续使用原 CLI 路径。
