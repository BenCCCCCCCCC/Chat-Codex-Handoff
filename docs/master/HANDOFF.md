# HANDOFF — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Canonical branch: meta/master-state

先读 CURRENT_STATE、README、docs/TESTING.md、docs/iterations/2026-10-20-audio-upload-quality.md，以及本轮方案／结果 docs/research/2026-10-20-voice-quality-plan.md、voice-quality-live.json。旧 ACTIVE_EXCHANGE 只作历史，不恢复旧限制或额度。

## 已完成本批

[PR #15](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/15) 已合并并关闭 Issue #14。实现头 330ab48adcdbfdad96a2f4e870efaf9b4805cfbd，合并 7c4ec2e02c5e80bf0892d296875d79eb1508ae04。[CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39423978423) 一次完整 Node／Edge PASS，独立提取器跳过。

- audio-input.mjs：文件限 25 MiB／3 分钟，按扩展名规范音频 MIME；浏览器解码支持决定实际格式。统一归一化后检查，修复右声道声音遗漏；WeakMap 临时缓存不改变原始字节。
- app.mjs：上传选择只本地检查、保存与试听，点击开始转写才请求；刷新不自动调用。上传锁定、草稿写入、存储失败恢复与既有管线复用，删除／换主题后的迟到结果不复活记录。原声与文件名、captureOrigin=upload、assistance=unknown 可 v1 备份恢复。未知辅助条件不伪装为脱稿。
- 未转写时隐藏空核对／反馈和过程区域；音频详情折叠。API 仍是 whisper-1 转写，人工确认后 gpt-5.6-luna 对照文字与材料；内容不含声学特征，生产提示及模型不变。
- quality-eval.mjs：严格 CER 只做 NFKC／去空白标点，不丢简繁／否定／数字；时间字段有效性不等于定位准确。verdict、引用和无文字建议索引分开。quality-history.mjs 不导入 provider、不联网复算历史。
- quality-live.mjs：显式参数、既有报告拒绝覆盖、累计预算和次数限制，复用全局账本。固定 hash 的旧 System.Speech WAV 有 18 字节 fmt，脚本仅对此固定 fixture 去两字节扩展生成标准头，PCM 不变，不是通用 WAV 解析器。

此前 PR #2／#5／#7／#9／#11／#13 均已完成。搜索命中定位、旧转写只读、对话手动要点／历史预算、聊天与转写草稿、失败恢复、情境练习、请求追踪不要重复实现。七天原记录保留、恢复副本从 restoredAt 七天、128 MB 备份不变。

## 真实实验及授权已使用

用户明确批准本次固定一条合成音频＋七条固定文字及一次自我修正重复，最多九次、US$0.10。实际九次完成，账本新增估算 US$0.004224，无新增未结算；累计保守预留 US$0.0455655。无充值、自动 API 重试、个人麦克风。本次剩余预算不继续使用，旧 Phase 3B 额度不恢复。

首次预检因旧 WAV 容器格式在任何请求前停止，记录保留为 artifacts/study-teachback/audio-upload-quality-01/preflight-stopped-zero-requests.json。修正预处理后原方案执行，最终本地原收据 live-quality.json。公开版本 docs/research/voice-quality-live.json 只含合成样本、响应／requestId／reservationId／评分和人工阅读说明，未公开原生产账本。

- ASR：7.31 秒 Huihui 合成声音，24 字，严格 CER 9/24（37.5%）全为简繁差异；否定词／条件方向保留。一个词 w14 零长度，不能用词级定位有效性证明时间准确。
- 内容：8/8 verdict 与引用检查符合要求。valid_paraphrase 的 supported repair 是 ]；ticket_sufficient_strengthening 开头条件表达含混，后句方向正确。前者不作为产品补救操作展示，未丢弃正确内容结果，也未改写模型输出。两次自我修正都接受最终立场，但条数 1 vs 3，不能估计稳定率。
- 历史复算保留 6/7、自我修正错误、CHANNEL_LEAK 中止、后续 7/7 与“. .”建议；历史提示／校验不同，不作受控比较。

这些不是自然语音、课程覆盖、总体准确率或学习成效验证。不要声称模型质量全面通过。

## 验证与本地环境

本地 F:\Chat-Codex-Handoff\validation-repo 已回到默认产品分支并同步合并，工作区干净。canonical 只读最新 meta/master-state，旧本地 meta worktree 不是权威。

定向 Node 43/43、Edge 2/2；首个 Edge 运行仅第二条脚本 async 语法错误，修正后只复验两条。桌面／390px 手机截图已看。最后小改动及新增建议标记由完整 PR CI 验证，不再本地全量重跑。新聚焦入口：node/browser diagnosis-state-ux-01 --audio-only。

本地收据在 ignored artifacts/study-teachback/diagnosis-state-ux-01/ 的 node-1792499554934-YDGwQ7、browser-1792499585435-dCH4E9。测试保持 synthetic credential、loopback only、独立账本与浏览器；其账本 hash 前后相同。单独批准的实验使最终生产账本 SHA256 变为 db2331acab4254609349d75ad99db1f368ca140fcc4f61160556ee8d7f22a220，不能写成本批无真实 API。

4321 已重启并刷新新版无 provider 预览，当前 exec session 86781；若下次需重启，先只读核对监听 PID 和完整命令，不按旧 PID 停进程。常规 npm start / 4317，/demo 无 API 示例。没有公共部署。

## 后续判断

用户授权自主方案、实现、自审、push/PR/merge 和按批次留痕，减少冗余文字／测试。下一轮可针对简体偏好、领域词汇、含混解释或空建议设计单变量比较；自然语音要另定自愿样本及预算。本轮实验不要重复运行或换目录绕过已有报告。强制关闭前未落盘、跨标签页并发与持久请求去重仍未解决。

Issue #3 同输入多源研究保留。Phase 3B 仍仅有界可行性 PASS，两份相同输入历史报告均保留，历史直接请求归因未知；新 requestId 不能追溯改变旧结论。多源影响当前判断的冲突需裁决，其余可见不阻塞；2–4 份仅受控样本，非产品文件上限；详细用户决定见 CURRENT_STATE。许可证未选，无总体掌握分或跨课程收益声明。

历史链：[前批交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/6c4ad447733e824986c94c0dd09db852bb4aa5f7/docs/master/HANDOFF.md)。
