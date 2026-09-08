# 本地交接窗口（实验版）

双击项目根目录 `Start-Handoff.cmd`。需要系统 Windows PowerShell 5.1 和 Windows Forms；遵循本机执行策略，若被组织策略阻止请停止，不调整全局策略。

适用于已经在 Chat 讨论、通过官方 Existing Chat 交给本地 Codex 执行的人。偶尔一次小修改可以继续使用原生流程。

1. 核对项目和已保存的返回 URL；它不代表自动识别当前 MASTER。
2. 首次设置填写一次 URL；换 MASTER 时确认旧、新 URL，使用现有显式 Rebind。
3. 等 Codex 回复完全结束后刷新，阅读已捕获交付。
4. 勾选“本轮 Codex 已结束”，点击准备，再在目标 Chat 手动粘贴发送。

缺少有效 Stop 记录时不会准备交付。本窗口不安装、信任或修改 Hook。捕获时间不是完成或验收保证。

预览在子进程中执行现有核心校验，将剪贴板和网页打开调用替换为内存捕获。只有用户的准备动作调用真实 handoff。动作前后比较 binding、metadata 和 packet；变化后需要重新刷新确认。没有持续监控、多任务保证或自动重试。

正常模式返回成功仅表示核心脚本完成了准备和打开请求，不证明网页已经加载或内容已经发送。原 CLI 回退见 `../README.md`，在 repo 中运行 `.\handoff-kit\handoff.ps1`。

演示：`powershell.exe -NoProfile -STA -File .\handoff-kit\ui\Start-Handoff.ps1 -Demo`。明确标记演示数据；不读取真实交付，不写真实 binding、剪贴板，不打开 Chat。

测试：`powershell.exe -NoProfile -STA -File .\handoff-kit\ui\tests.ps1`。证据保存在 `artifacts/usability-spike-01/`。真实 UI 返回与高 DPI 可读性仍需 owner 验证。
