# V1 本地候选 · 审核修复与验证准备

本批依据 [MASTER 第三轮审核](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/e8aa09ea03d6db69290be94aefee739ca9e9c366/docs/master/reviews/2026-11-26-v1-review-queue.md)，交付 Windows 本地候选 1.0.0-rc.1 的两处修复、研究执行包和案例演示。可运行代码定在 [90a711b](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/90a711b3dc98a9cd084c630b4aefc961680cec86)。[修复 PR #47](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/47) 的 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/45824578826) 已通过。

## 审核回执

| 情境 | 修复前 | 修复后与证据 |
| --- | --- | --- |
| 在手机宽度查一段长原文 | 命中第 32 节时，只能滚到文末点返回。 | 390 × 844 的 Edge 窗口，4,026 字合成材料，正文滚到中段；引文和头部返回按钮同时可见。按按钮的屏幕坐标点击后，焦点回到原反馈卡。[实页](v1-experience/long-source-return.png) |
| 修改已诊断的讲解 | 旧反馈仍在时，重新诊断与“查看反馈”都降为文字链接。 | 在 1280 像素宽的 Edge 窗口编辑文字，旧反馈可读，按钮恢复蓝色主操作，旁边注明材料选段和确认文字会发给 AI。停在发送前。隔离复现的模型调用和出站尝试均为 0。[实页](v1-experience/revised-diagnosis.png) |

## 拿到候选后怎么试

[从 GitHub 下载固定版本源码 ZIP](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/archive/90a711b3dc98a9cd084c630b4aefc961680cec86.zip)，解压并进入含有 `Start-Study.cmd` 的目录。Windows 需装 Node.js 24 和 Edge。运行启动器，选择 **免费示例 → 数据结构 · 循环队列**。在“总要留一个位置”的讲解上打开依据，重讲适用条件，再回答第 12 项能否存入。首次体验无需 Key。

在本机从同一提交另行生成源码 ZIP，解压到独立的、含中文和空格的目录。未配置 Key 和提取器，启动器报告 READY，`/demo` 返回 200，服务正常停止。另在隔离 Edge 实际完成上述示例的六个画面。[31 秒实页演示与产品案例](../portfolio/README.md)。本次通过启动器脚本驱动，Explorer 手动双击和实体麦克风录音质量仍待核对。

## 研究交接

[执行包](../research/v1-fieldwork/README.md)包括两次会面的主持用语、观察表、随机盲号交接、缺席及参考分母、匿名结果页、招募与预算提案。本机冻结 2 份学习材料、4 份延迟题和 1 份评分锚点；仓库保存文件指纹，供审题人核对版本。

用标明 TABLETOP 的合成记录排练了一次表单交接。按签到序号 2 的逆序回访；一道题在首答前因见过主版本换备用，未给具体理由仍留在分析分母；另一道自报查阅，排除出独立分析。评分副本只含盲号、题号及首答，保留原现场记录。排练未进行真人双评，进入实研前仍需独立审题。**实际招募 0 人，实际研究支出 ¥0。**

真正启动研究，需确定主持人、允许的招募渠道、两服务的实际数据设置及费用。拟 6 人、总额最多 ¥330。新增模型对照、生产转写切换和公开发行仍待相应决定。
