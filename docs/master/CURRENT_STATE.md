# 知而能讲 · 当前状态

2026-11-18（悉尼） · 产品 `prototype/study-teachback-v0.1` · 基线 [`99d79d7`](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/99d79d773059ba146e2f6ca33559fb313cef5e14) · 本轮为产品审查及 MASTER 规划。

**当前决定**　先让学生每次打开都能回到可做的学习动作，再把课件、笔记和同一处学习疑点串成一次可续接的复习。Codex 可按实际依赖连续交付，最新任务读[工作交接](HANDOFF.md)。

| 状态 | 证据与边界 |
|---|---|
| Completed | [#30](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/30) 保住新建草稿、自定标题与导入撤销，无 AI 可本机开学，TXT/MD 独立导入。[#31](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/31) 保存所选材料的页码、引句与来源修订关系。[#32](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/32) 从练习往返确切历史反馈，保留当前草稿。 |
| Completed | [#33](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/33) 支持文字讲解、显式诊断与按版本对照重讲。[#34](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/34) 可质疑题目、暂停判断、按材料自查、保留原题或修订后重答；原题、回答及旧反馈均可追溯。 |
| Verified | 上述五个 PR 已合并。#34 的 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44092977918) 成功，合成服务及媒体下 Node 190 项、Edge 70 条流程通过，提取器专项按改动跳过。本轮复用该证据。 |
| Verified | 本次用全新 Chromium 153、390×844、无密钥，从正常入口保存材料及文字讲解，页面正确提示需配置 AI 才可分析。此时点“试一个新情境”，观察到零个模型请求 POST，却出现“上次出题未完成或结果未知”。刷新仍进空练习。本机记录为 `resume.view=practice`、`practiceRequest.status=unknown`，仅有一次文字讲解和零道题；历史同时显示“0 道情境题”和“继续情境练习”。[出题状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/study-teachback-app/practice.mjs#L94-L115) · [恢复与提示](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/study-teachback-app/practice-ui.mjs#L65-L73) |
| Verified | 同一窄屏首次进入时，粘贴框起点约在页面第 904 像素；“我来讲讲”默认聚焦录音，文字入口折叠。纯文字讲解保存后仍提示可回听。查阅源码确认当前引用与页码在单份选段内定位，主题列表和到期清理会读完整主题。尚未测量加载延迟。[页面](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/study-teachback-app/index.html) · [来源](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/study-teachback-app/source-provenance.mjs) · [存储](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/study-teachback-app/storage.mjs) |
| Likely | 展示真实待办和适用的来源条件，可以减少回访时重新找材料，以及因题目缺条件而被判错的机会。 |
| Not Done | 免密钥练习入口与恢复修正、完整材料集及跨来源复习、独立题目语义复核、转写服务迁移和 Windows 发行完善。[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 的同输入协议与受控多来源样本仍是研究待办。 |
| Unknown | 真实学生是否能独立完成、能否在未见情境迁移和下次复习时保持；多来源反馈相对通用助手的增益、新转写服务对真实中文课程的质量。本轮未作真人或付费模型验证。 |

**下一步最小实验**　用已复现的一条旅程判断首项修复是否有效：无密钥保存文字讲解，从这里尝试新情境后离开再打开，能直接继续自己的讲解或已有练习，并知道哪些动作需要 AI。这是重现入口，完整产品目标见交接。

**数据和研究口径**　按现有七天政策处理记录；新建材料草稿尚未纳入主题备份，主题内文字讲解草稿可随主题导出。材料目前保存选段及定位；历史来源不延长保留期。按材料自查属于学习者判断，引句命中只证明出处。旧规则在八段真实教程中产出 0/8，已拒绝的候选在八个固定回答中的判断与预期相符 6/8；两项分母各有含义。无新增真实调用额度。[上轮完整证据与兼容细节](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a5af9a1037df3ceccfec58f0c8f9f354c1edfece/docs/master/CURRENT_STATE.md) · [完整路线与原始审查](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md)
