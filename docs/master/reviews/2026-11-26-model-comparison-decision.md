# 知而能讲｜文字模型选型与最小实测决策
2026-11-26｜产品文档，不是已执行的实验。代码以 [#49 产品基线](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/57fad6f5438e801c6b10d12ca383901956ab7210) 核对。

## 基线和建议
- 当前 [provider.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/study-teachback-app/provider.mjs#L20-L51) 固定 `gpt-5.6-luna`、`effort: none`、最多 1,800 输出 Token、60 秒超时；预算预留后发请求，记录实际用量，失败不能视为免费或重试成功。此版不换生产。
- 首个对比只看固定基线与 `gpt-6.2-sol`（建议 medium，锁定实际 API 支持档）。参考高档 `gpt-6.2-astra` 只在前两者有严重分歧且有授权时用于诊断分歧；不作为唯一评委或用户默认。产品/交叉审核使用极高推理是另一条决策。[官方选型](https://developers.openai.com/api/docs/guides/model-selection)
- 1,800 不能直接当高推理输出上限的合理值：推理 Token 也占预算。先固定两种“可部署配置”的同成本/同时间口径与上限，再冻结配置；记录因长度或超时不完整的响应，不删除后再对比。若要单独比较模型能力，再设置同样充分的预算，不能用那个结果推断当前产品延迟。

## 最小两步试验
1. 免费先走完冻结 [14 案例、同输入协议、盲评表](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/57fad6f5438e801c6b10d12ca383901956ab7210/docs/research/quality-baseline-2026-11-18/PROTOCOL.md)的离线输入与评分排练，涵盖等义正确、已纠正答案、前提不足、跨源冲突、关键遗漏、流畅但错误。规则校验能够拒绝假引文，不等于模型解释正确。评审按含义判，不比文采。
2. 如获单独批准：预注册 6 个高风险案例 × 两种配置 × 2 次，共 24 次，无隐性重试；供应商、版本、提示/schema 哈希、样本、最大费用和停止条件在首次调用前冻结。可以测出故障模式，不宣称总体准确率。每次同时记录是否生成可用诊断、是否出现虚构依据／关键条件颠倒／不该判错、首个可操作结果耗时、实际账单/usage 和可能未知支出。独立人盲评为主，分歧留原判和复核理由；本组分母太小不拿 p95 比输赢，先展示逐次、p50 与最慢值。
3. 任何严重错误都列单案与触发范围，先判断能否用确定性约束屏蔽。若 Sol 没具体减少严重误判或挽救不可用诊断，先保留基线；有明确改善才比较每次合格诊断成本与主线等待感。推理升档不自动触发第二次付费调用。工具对比（学习者使用普通助手 vs 本产品）另走形成性研究，不能拿配置对照代替真实用户。

## 预算量级，不是报价或实测
假设单次 6,000 个未缓存输入、1,000 个实际计费输出（含推理），使用同一公开标准费率；未含转写、税、汇率、缓存、重试和失败费用。按 [Luna 官方费率](https://developers.openai.com/api/docs/models/gpt-5.6-luna)与 [OpenAI 价格表](https://developers.openai.com/api/docs/pricing)核对，每次粗算 Luna US$0.0024、Sol US$0.022、Astra US$0.088。每人三次诊断相应约 US$0.0072／0.066／0.264。实际限额要按各配置最坏 Token 数、24 次执行和实际项目权限重新预留，不能用上面均值放行，不假定已有 Key 有访问权。
- ASR 独立：当前 whisper-1，[官方下线 2027-02-26](https://developers.openai.com/api/docs/guides/speech-to-text)；gpt-transcribe 先保持影子候选。旧转写、历史引用、整段回听和文字确认不动；关键数字、否定、术语需独立听审，不能用文字模型输赢抵消。无新调用、预算申请或模型迁移发生。
