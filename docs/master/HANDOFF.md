# Active Handoff

Updated: 2026-09-09  
Role: MASTER

## Phase

**USABILITY-SPIKE-01 — READY FOR CODEX / Gate 5 ON HOLD**

Dogfood 02, MF-01, MF-02 and the post-turn return verification remain accepted. The user now requests a visible, easier-to-use prototype and has no external participant. The former external-pilot execution decision is deferred, not failed.

Current local baseline last reported: `a77cacdbda70bcd8b0808a4c4853740f481adbc0` on `prototype/lightweight-handoff-v0.1`, repo `F:\Chat-Codex-Handoff\validation-repo`. Remote product baseline remains `869414c77d227fe2f1675c7cfa08b04250520279`; do not push or reset local work to it.

Current State / Decisions are in the companion canonical CURRENT_STATE.md. Standing MASTER write authority remains limited to these two docs on `meta/master-state`. This handoff prepares local Codex work; it is NOT a dispatch receipt and does not assert that a GUI branch or implementation exists.

## Active Task

# USABILITY-SPIKE-01 — 面向非专业用户的本地交接窗口

状态：READY FOR CODEX；任务已准备，不代表 Codex 已启动，也不代表验收通过。
角色：00｜MASTER 定义范围；Codex 负责本地实现与自测；用户保留真实验证及高风险决定。

## 1. 本轮决定与目的

用户在 Dogfood 02 FULL PASS 后提出：目前没有外部用户，先做好易用性、适用性和可见外观，并允许 Codex 完成一个较完整的本地长任务。

据此：Gate 5 外部试用暂缓。仅批准本文件定义的 **bounded usability prototype**：为现有 Alpha 增加按需打开、单仓库、用户主动操作的本地窗口。这是此前“禁止 GUI / 新 launcher”规则的窄例外，不是批准完整 companion app、服务或无限自主开发。

真实成本：此前用户需要理解 PowerShell、进入正确目录、区分 MASTER 绑定与项目状态、记住在 Codex 回复结束后再运行 helper。做界面的目的就是减少这些负担，不是增加装饰性功能。

目标：让用户打开项目中的一个入口，就能看懂“当前项目是什么、返回哪个 Chat、是否发现已捕获的交付、接下来做什么”，然后显式准备交付并手动发送。

“多数用户是 AI 小白 / 低使用量用户”是用户提出的待验证假设，不是已确认的市场事实。优先设计给非专业但确实需要 Chat 讨论 → Codex 执行的个人用户；偶尔一句话改文件的人可能不需要本工具。不得把使用频率低自动等同于目标用户成立。

## 2. 权威状态与版本

- 本地 repo：`F:\Chat-Codex-Handoff\validation-repo`
- 已知起始 code branch：`prototype/lightweight-handoff-v0.1`
- 最新已报告本地 code HEAD：`a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- 已 push 的旧 code HEAD：`869414c77d227fe2f1675c7cfa08b04250520279`
- GitHub：`BenCCCCCCCCC/Chat-Codex-Handoff`
- 动态状态 ref：`meta/master-state`
- 顺序读取 `docs/master/CURRENT_STATE.md`、`docs/master/HANDOFF.md`。

不要使用产品分支里旧版同名 MASTER 文档作为当前指令。可通过已授权 GitHub read 读取；必要时只执行 `git fetch origin refs/heads/meta/master-state`，随后用 `git show FETCH_HEAD:docs/master/HANDOFF.md` 读取。不要 checkout、merge 或 cherry-pick 状态分支。

先确认真实 repo、branch、HEAD、worktree。上面的本地 HEAD 是 expected，不是可以假报的实测值；若不匹配且无法从明确的本轮续作解释，停止写入并报告，不 reset、不覆盖。

核对无冲突后，在本地从该 HEAD 建立 `prototype/usability-spike-01`。已有同名分支只能在确认属于本任务时安全续作，不覆盖或重置。

必须保留现有 `.codex/hooks.json`、`T09_LIVE_PACKET.txt` 等无关未跟踪文件，不提交、删除或格式化它们。

## 3. 技术与修改边界

默认方案：Windows PowerShell 5.1 + 系统现有 .NET Windows Forms。采用原生控件、布局容器和系统中文字体，不新建 Web 服务，不引入 Node/Electron/Tauri、浏览器内核或下载式 UI 框架。先验证本地依赖确实可用；没有可用依赖就报告，不擅自安装或改栈。

允许的新文件最多 6 个（截图/测试证据不算产品文件）：

- `Start-Handoff.cmd`：仅本项目启动入口，不安装到桌面、PATH、启动项或注册表。
- `handoff-kit/ui/Start-Handoff.ps1`
- `handoff-kit/ui/HandoffPanel.ps1`
- `handoff-kit/ui/tests.ps1`
- `handoff-kit/ui/README.md`
- 若确有必要，最多一个 `handoff-kit/ui/` 下的本地视图/辅助模块。

允许修改现有根 `README.md`，仅增加实验界面的启动方法、适用条件、限制和原 CLI 回退入口。

保留原有 CLI 行为；复用 `HandoffKit.Common.ps1`、`configure.ps1` / `-Rebind`、`handoff.ps1`。它们以及原 `tests.ps1`、`.codex/` 在本轮为只读。不得复制整套核心流程另造一套安全规则。若合理实现必须修改核心接口，明确提出所需最小改动并停在范围 Gate；不要静默绕过。

启动路径必须来自启动器/脚本位置，不依赖调用者当前目录；只绑定该 checkout，不扫描磁盘或管理其他项目。使用明确的 PowerShell 5.1 进程、STA 与工作目录。禁止字符串拼接执行用户内容、`Invoke-Expression`、凭据读取、管理员提权、全局执行策略修改、绕过组织策略。

## 4. 必须做出的可操作界面

### A. 一个主窗口，不做 Dashboard

默认约 960×640，支持合理缩放和小窗口。中文、浅色、清晰留白、统一层级与强调色；优先可读性，不搞装饰动画和自制复杂控件。系统字体，不下载字体/图片。不依靠颜色单独传达状态。

主窗口仅三块：

1. **当前项目**：真实 repo 路径；branch / HEAD 放可展开详情。
2. **返回的 Chat**：读取现有 binding；显示目标，能展开完整 URL；提供“设置 / 更换返回对话”。不得把任意绑定宣称为“已自动确认的当前 MASTER”。
3. **已捕获的交付**：生成时间、只读文本预览、状态说明，以及主按钮“准备交付并打开 Chat”。

提供简短“怎么使用”：先在 Chat 确定任务 → 通过官方 Existing Chat 交给 Codex → Codex 回复完全结束 → 回到本窗口刷新 → 准备交付 → 在目标 Chat 粘贴并发送。

首次展示适用提示：已有 Chat 讨论和本地 Codex 项目才需要本工具；仅偶尔一次小修改可以直接使用原生流程。不是 ChatGPT 的替代聊天界面。

### B. 引导与安全设置

首次无 binding 时显示 URL 输入框和解释，不要求用户编辑 JSON、写命令或找 `.git`。保存通过已有 `configure.ps1`。

更换已有目标时清楚展示旧/新目标，只有用户明确确认才调用已有 `-Rebind`。取消或无效输入不改变 binding。不自动读取剪贴板、浏览器地址栏或标题来猜目标，不自动从聊天正文提取 URL。换 MASTER 仍需提供一次 URL，普通交接不需重复输入。

这轮不做自动安装/信任 Hook。配置文件存在不等于 Hook 已运行或已受信任。缺少可用 Hook 记录时给出准确说明与现有使用文档入口，禁用交付，不冒充“已就绪”。

### C. 诚实的状态与时序

必须区分：未配置目标、无有效交付、发现已捕获交付、metadata 不匹配/不完整、正在准备、准备成功或失败。

只有 Stop 记录不能证明用户当前任务已完成、测试全通过或最近一个运行中 turn 已结束。不要显示虚假的“Codex 已完成 / 当前任务已验收”。`captured_at` 是捕获时间，不是完整性保证。

动作前让用户明确确认“本轮 Codex 已结束，准备返回这份交付”，并能看见目标与预览。刷新或目标/packet 改变后该确认失效。

状态读取用现有项目公开给自身的 repo binding / Stop metadata；保留当前 metadata/repo/URL/packet 检查及 64 KiB 上限。失败或来源不明时不准备交付。

准备动作前重新检查预览对应的 binding、session/turn、packet；如已变化，先刷新并让用户重新确认，不悄悄换成另一份。若调用期间有变化/失败，不得报告完全成功。这里仅做界面动作一致性检查，不新增持久 freshness/consumed 状态、后台任务监控或多任务并发支持。

### D. 复用真实功能，不交付只有外观的模型

正常模式确实从该 repo 读取配置与捕获记录。用户点击时通过现有脚本完成配置/显式 rebind/准备交付，检查子进程退出码并显示错误。核心脚本是最终校验入口，UI 不能放宽其要求。

窗口的打开、刷新和预览本身不得写 clipboard、打开浏览器或改 binding。只有显式用户动作才允许上述副作用。

成功文案应为“交付已准备；已请求打开目标 Chat，请手动粘贴并发送”。`Start-Process` 成功不等于独立确认网页已加载，更不等于发送完成。不得自动 paste/send。

双击主按钮不得并发重复执行。失败后可以由用户手动重试；不后台循环重试、监听剪贴板或恢复覆盖用户的新内容。关闭窗口后不留下常驻进程。

## 5. 自主完成的工作批次

### Batch A — 基线与流程设计

检查本地版本、现有脚本契约、可用 GUI 运行时。根据本文件选择一个布局，列出真实数据、推测、未知状态的区分；直接进入实现，不因颜色、间距、按钮措辞等低风险选择反复询问用户。

最新官方与 collision 研究已由 MASTER 完成，见本文件末尾。仅在发现新的相关差异时补查，不重做大范围研究。

### Batch B — 界面与已有脚本集成

实现单窗口、首次设置、更换目标、交付预览、显式返回动作、错误/空状态、repo-local 启动器。UI 展示与状态/命令适配层分离，便于不碰真实 clipboard/browser 的测试。

### Batch C — 测试、截图和修正

先运行现有 `handoff-kit/tests.ps1` 作为回归。再运行新增 focused tests，使用独立临时 fixture repo 和隔离 TEMP/TMP，不覆盖 live metadata、live packet 或 live binding。

至少覆盖：

- 启动路径含空格、从非 repo 工作目录启动、正确定位自身 checkout。
- 缺 binding / 无效 binding / 错 repo / 缺或损坏 metadata / 缺、空或过大 packet。
- URL 不合法时拒绝保存；取消更换不改状态；默认无静默 rebind。
- 打开/刷新/取消无 clipboard/browser 副作用。
- 动作明确确认前不可执行；刷新/目标或 packet 变化后需重新确认。
- 正确调用 existing configure / rebind / handoff，安全参数传递、退出码和错误显示。
- 正常 payload 含中文、Unicode 和多行内容，预览不改变传输内容。
- 重复点击防并发；执行失败不显示成功；关闭窗口结束自有进程。

单元/fixture 回归是本次实现必需的工程验证，不得称为真实 Desktop dogfood、外部用户反馈或市场证据。

提供隔离 `-Demo` / 测试入口，清楚标记“演示数据，不连接真实交接”。演示操作也不能触碰系统真实 clipboard、浏览器或 live binding。

只对自己开发的窗口进行本地渲染/截图；不对 ChatGPT、Codex 客户端或其他用户窗口使用 UI Automation / DOM / CDP / 浏览器控制。至少交付未配置、已捕获交付、更换目标确认、错误、准备成功这 5 个视图的真实渲染截图。截图里的成功可以使用演示 fixture，但必须标识为演示，不是假造真实返回。

检查正常与较小窗口、长 URL/中文路径、键盘 Tab 顺序、焦点、100%/150%/200% 缩放可读性。能实际测试哪些就记录哪些；截图或缩放测试环境不足时标 NOT VERIFIED，不凭代码推断截图通过，不修改用户全局显示设置。

如可用、确实节省时间，可用最多一个只读 subagent 同时做 UX 文案/状态审查或测试设计；主 Codex 统一集成。不要多 agent 同时写同一文件。使用现有包含额度；不切换到付费 API、不买 credits、遇配额/权限 Gate 停止。

### Batch D — 自审与完整交付

按 Must Fix / User Decision Needed / Future Optional 分类。仅修本轮标准内的真实缺陷，最多两轮完整自审修正后收口；仍有阻断就诚实交付阻断点，不无限循环或填充新任务。

允许最多 3 个有意义的本地 checkpoint commits。只显式 stage 允许文件，不 `git add .`。不 amend 旧 Alpha 历史、不 merge、不 push。

将完整 Review Evidence、测试日志、截图和续作状态放在 repo 内 `artifacts/usability-spike-01/`（本轮允许的证据输出目录；不做新基础设施）。不提交真实 Chat URL、clipboard 内容、live binding 或凭据。截图使用 demo 数据。避免提交大二进制；报告哪些证据未跟踪，不声称 worktree clean。

## 6. 休息期间的运行边界

可以继续本地实现、测试、自审、文档和自有窗口演示渲染，不因普通实现细节向用户反复索取批准。

不得在用户休息期间：

- 修改真实 origin binding；
- 对真实 clipboard 执行测试写入/恢复或打开真实 Chat；
- 运行 live `handoff.ps1` 试图交付当前仍未结束的 Codex turn；
- 自动操作 ChatGPT/Codex 客户端；
- 自动批准客户端出现的权限请求；
- 安装新依赖、提权、改全局配置；
- 联系外部用户、共享代码、发布、push、merge、调用付费 API；
- 新建第二个产品方向或扩张成后台服务。

碰到以上 Gate 或无法按本范围实现时，保存已完成工作、准确解释阻断后停止。不要改用别的高风险路径。

## 7. 最终交付与状态标签

Final Delivery Packet 至少包括：

- Task ID、actual repo/branch、before/after HEAD、每个 checkpoint SHA。
- changed files / exact scope / diff stat / `git diff --check`。
- 足够完成真实 delta review 的源代码 diff，不只有“测试通过”摘要。
- 现有回归、新增测试的真实 commands、outputs、通过/失败数。
- 截图路径、演示/真实模式标注、实际测试的分辨率/缩放。
- 测试隔离证据：live binding/metadata 未被改动；测试 OS 副作用被 mock；不杜撰验证手段。
- Completed / Not Done / Verified / Likely / Unknown。
- Must Fix / User Decision Needed / Future Optional。
- 一次最小 owner 操作验证说明和原 CLI 回退方法。

最终文本必须保持在现有 64 KiB 交付上限以内。完整 evidence 超限时，单独输出 `REVIEW_EVIDENCE.md` 与截图路径/哈希；平台支持附件则附上，不支持则明确说明本地文件不能被 Chat 直接读取、后续可能需要一次附件交接。不得静默丢关键证据，也不得为容纳报告修改上限。

最终状态最多为：

`IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION`

若环境不足则为 `PARTIAL / NEEDS OWNER VALIDATION` 或 `BLOCKED`。绝不能自行宣布真实交接、易用性、外部验证或整个 Spike 已 PASS。

完成后结束 turn 并停止。不要在同一 turn 用 helper 复制“尚未生成的最终回复”；不要要求用户为了收尾再发一轮会覆盖原 packet 的长提示。

## 8. 最后保留给用户的一次最小验证（本轮不代做）

在 Codex 已完全结束后，用户打开 `Start-Handoff.cmd`，确认显示正确项目、当前绑定 Chat 与本次交付；显式点击准备交付，然后在打开的 Chat 手动粘贴发送。MASTER 核对交付、版本、测试与实际体验后才验收。

原 CLI 保留：在 repo 中运行 `.\handoff-kit\handoff.ps1`。GUI 未通过时不牺牲已验证 CLI 路线。

## 9. 研究依据（2026-09-09，本轮 MASTER 已读）

- 当前 canonical：`meta/master-state` 的 CURRENT_STATE/HANDOFF；此前 Dogfood 02、MF-01/MF-02 已完成，post-turn 外部调用成功；不能把单次成功等同零成本或全面稳定。
- OpenAI Projects and chats：`https://learn.chatgpt.com/docs/projects`，继续使用已有官方 Chat→Codex 入口。
- OpenAI Hooks：`https://learn.chatgpt.com/docs/hooks`，Stop 提供最新 assistant message；不能把 Stop 一概当作任务验收成功。
- OpenAI Desktop：`https://help.openai.com/en/articles/20001275/`，Codex 仍为独立 view/history。
- Microsoft Windows Forms/PowerShell 示例：`https://learn.microsoft.com/en-us/powershell/scripting/samples/creating-a-custom-input-box?view=powershell-7.5`，Windows PowerShell 可以使用 .NET 原生窗体；本机兼容性仍须 Codex 实测。
- `joseanu/codex-from-chatgpt` README：MCP + App Server + tunnel，不是直接可替换的 repo-local 无服务界面。
- `David-JA/codex-web-review-relay` README：MCP/native host + Chrome extension + 用户 Arm，包含浏览器发送动作。
- `anightmonarch/codex-bridge-chatgpt` README：Skill/Plugin + browser automation consent，不符合本轮无浏览器控制的边界。

以上比较不代表不存在其他方案。若本地发现已有可直接复用、满足全部边界的原生能力，优先报告并停止重复实现，而不是为本任务硬造工具。
