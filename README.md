# 知而能讲 · Study & Teach-back

**把材料学进去，再用自己的话讲出来。**

面向个人学习与作品展示的学习原型：导入一小段材料，先理解，再录音讲解，核对转写后查看哪些内容已表达、哪些遗漏、哪些需要澄清。反馈关联材料、讲解原话和录音，方便回到具体问题继续学习。

当前是 Windows 本地应用。工程测试验证流程和数据边界；尚无跨课程、跨用户的学习效果验证。

![从材料开始：新的学习工作台入口](docs/images/study-start.png)

*截图来自本地界面；下方学习工作区使用隔离测试中的材料和模拟响应。*

## 一轮学习

1. **放入材料**：粘贴文字或导入 MD、TXT、PDF、DOCX、PPTX。自动生成主题名，可选填写学习重点和已有理解。
2. **先学习**：围绕材料提问、解释和核对，不必先准备一份标准讲稿。
3. **我来讲讲**：在应用内录音，保留原声；核对自动转写，可选回听、修正识别错误。
4. **查看反馈**：区分已表达、尚未表达、需要澄清和证据不足；文字修改后旧结果会标记过时。
5. **继续练习**：针对某一点补学、局部重讲，或进入独立的情境练习：先作答，再看反馈，还可以修改后再答。
6. **接着上次学**：学习记录按最近活动排序；重新打开时恢复最近主题及核对／练习位置。

重复查看相同文字的已有结果不会重新调用诊断。诊断进行时锁定提交和文字编辑，避免覆盖输入或并发重复请求。

![学习工作区：左侧材料，右侧学习对话，下方录音入口](docs/images/study-workspace.png)

## 把理解用起来

在学习区点“练一个新情境”，或在讲解反馈后点“试一个新情境”。每道题、每次回答与对应反馈分别保留，可以切回旧题继续作答，不覆盖普通学习对话或录音。

回答草稿自动保存在本机。请求失败会保留回答，刷新不会自动重试；再次提交完全相同且已有反馈的回答，会复用已有结果。练习记录也包含在本轮导出中，仍随主题遵循原有七天保留规则。

![独立情境练习：问题、回答、反馈与再次作答](docs/images/study-practice.png)

*此截图使用工程材料和模拟响应，验证真实产品流程，不代表模型反馈质量。实际出题与反馈需要 API key。*

## 先体验一个例子

启动后打开 **`http://127.0.0.1:4317/demo`**，或点击首页“先看一个例子”。不需要 API key。

示例包含“植物浇水的条件”和“持票与开放时间”两组材料：读材料、对比两种讲解、展开反馈证据，再做一道情境题。材料、讲解和反馈均为预先编写，不评价自由输入、不录音、不调用 AI，也不读取或写入个人学习记录。

![独立示例：对照结论、材料与原话](docs/images/study-demo.png)

## 为什么做这个项目

“听懂了”与“能清楚解释”之间存在距离。本项目探索如何把一次讲解变成可核对、可补学的具体反馈。原声、转写修订和诊断版本保持关联；停顿等过程观察单独呈现，不作为“不理解”的证据。

同类产品已经广泛覆盖 AI 辅导、语音讲解和材料引用。接下来的研究重点是：**多份材料冲突时，如何避免凭空判错，并确定应先补哪一点**。这是待验证的方向，当前产品仍使用单份有限材料，不宣称已有竞争优势。

详见[产品与机制调研](docs/research/2026-10-20-landscape.md)、[设计与技能资料](docs/research/design-and-skills.md)、[工作台设计依据](docs/research/2026-10-20-workspace-design.md)和[迭代路线](docs/ROADMAP.md)。

## 本地运行

已验证环境：Windows、Node.js 24、Python 3.14、Microsoft Edge。Node 运行时没有第三方 npm 依赖；文件提取使用固定版本 pypdf 6.18.0。

```powershell
git clone --branch prototype/study-teachback-v0.1 https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff.git
cd Chat-Codex-Handoff
py -3 -m venv study-teachback-app/.venv
study-teachback-app/.venv/Scripts/python.exe -I -m pip --isolated install --index-url https://pypi.org/simple --only-binary=:all: --no-deps --require-hashes --disable-pip-version-check -r study-teachback-app/requirements-extractor.txt
```

界面与独立示例可直接运行 `npm start`，打开 `http://127.0.0.1:4317/`；只体验示例无需 Python 提取环境。实际 Tutor、转写和诊断需要在服务进程环境中配置自己的 `OPENAI_API_KEY`，并承担对应 API 费用。没有 key 时不提供真实模型反馈，不会悄悄替换成模拟结果。

已配置环境也可双击 [Start-Study.cmd](Start-Study.cmd)。停止与异常恢复见 [Stop-Study.cmd](Stop-Study.cmd)。[详细安装与数据说明](study-teachback-app/README.md)包含文件限制、启动器行为与现有模型配置。

## 不花费 API 额度的验证

完成 Python 提取环境安装后，在仓库根目录运行：

```powershell
npm test
npm run test:extract
npm run test:browser
```

测试包装器使用模拟凭据、模拟 provider、独立账本和独立 Edge profile，阻止测试 Node 进程访问外部网络。浏览器回归使用合成音频，不打开物理麦克风。日志写入 ignored `artifacts/`，不覆盖已有记录。

[GitHub Actions](.github/workflows/offline-tests.yml)在代码 PR 上运行 Node 回归，按改动选择浏览器和提取器检查；纯文档修改不触发，不再对同一提交同时执行 push 与 PR 两轮检查。以上命令是可选验证范围，日常不要求全部重跑。遵循[按影响验证的约定](docs/TESTING.md)。[公开整理](docs/iterations/2026-10-20.md)、[工作台迭代](docs/iterations/2026-10-20-workspace-ux.md)与[学习流程迭代](docs/iterations/2026-10-20-practice-resume.md)记录实际结果；浏览器测试通过不代表模型准确率或教学效果。

## 数据与能力边界

- 原文件在本机提取；点击开始学习才发送选定材料。转写会发送音频，内容诊断会发送材料及确认的文字到模型服务。
- 学习记录与原声保存在浏览器 IndexedDB，默认七天过期；可导出和删除。
- 单轮材料最多 5,000 字；输入文件最多 10 MB；无 OCR。复杂版式请核对提取预览。
- 现有成本账本使用历史固定费率估算并限制请求；不能代替服务商账单或账户消费限制。
- 尚未实现多人账户、云同步、生产多文件工作区、跨标签页持久去重，以及经过验证的总体掌握度评分。

## 项目结构与协作

| 路径 | 用途 |
| --- | --- |
| `study-teachback-app/` | 原生 HTML/CSS/JavaScript 前端、Node 服务、Python 提取器与测试 |
| `study-teachback-app/fixtures/` | 可分发合成音频，不含个人录音 |
| `docs/research/` | 有来源的竞品、设计、机制和技能资料 |
| `docs/iterations/` | 按批次记录的审核、验证与交接 |
| `handoff-kit/`、`acceptance-p0/` | 保留的历史开发工具，不是学习产品入口 |

仓库名称沿用早期开发工具名称；当前产品分支是 `prototype/study-teachback-v0.1`。动态交接仍在 **`meta/master-state`**：
[CURRENT_STATE](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/CURRENT_STATE.md) · [HANDOFF](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/HANDOFF.md)。

按有意义的改进批次提交，使用 Issue/PR 留下问题、决定和验证结果。代码公开与开源许可证是两件事；当前尚未选择项目许可证。

*English: A local, source-grounded study and spoken teach-back prototype. Import learning material, explain it aloud, review the transcript, and follow evidence-linked feedback. Intended for personal learning and a product portfolio; learning efficacy is not yet established.*
