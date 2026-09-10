# BUILD-01 private checkpoint review

产品状态：**PARTIAL / BLOCKED — whisper-1 HTTP 401**。本次仅同步，不新增功能、不修 API、不重跑测试、不调用模型。

产品 checkpoint：`be5cef57564ed16bf2f25467ad0247bb9d7a717a`。
Private feature branch：`prototype/study-teachback-v0.1`。
后续 evidence commit 的 Git 父节点就是上述 checkpoint；不改写历史。

## 直接审查入口

| 内容 | 文件 / 证据级别 |
|---|---|
| Delivery Packet、feature matrix、Completed/Not Done/Unknown | [DELIVERY_PACKET.md](./DELIVERY_PACKET.md) |
| 产品源码与运行边界 | [study-teachback-app](../../../study-teachback-app)、[README](../../../study-teachback-app/README.md) |
| Node 18/18 | [engineering-receipt.json](../../../study-teachback-app/evidence/engineering-receipt.json)：既往工具运行的汇总回执；不是本次重跑，也不是逐测试原始 TAP 日志 |
| Node 测试定义 | [tests.mjs](../../../study-teachback-app/tests.mjs) |
| Edge 14/14 | [browser-1789071825159.json](../../../study-teachback-app/evidence/browser-1789071825159.json)：逐项结果；真实 Edge/MediaRecorder/IndexedDB，合成 tone 与 stub provider，非 owner 麦克风/真实 API 集成 |
| Luna 5/5 | [live-challenges-1789071668390.json](../../../study-teachback-app/evidence/live-challenges-1789071668390.json)：真实 Luna、五个自编文本语义案例；另含 Learn/Repair/Apply schema 结果 |
| 早期语义拒绝回执 | [live-challenges-1789071604700.json](../../../study-teachback-app/evidence/live-challenges-1789071604700.json)：空字符串被拒绝的历史结果，保留不覆盖 |
| Luna 实际可达 | [access-check-1789070782691.json](../../../study-teachback-app/evidence/access-check-1789070782691.json)：模型名、usage、合成文本；没有密钥 |
| Whisper 401 | [live-asr-1789071986074.json](../../../study-teachback-app/evidence/live-asr-1789071986074.json)：仅状态/合成材料/费用预留，未记录 provider error body 或认证信息；没有成功时间戳 |
| API usage / cost | [usage-ledger.json](../../../study-teachback-app/evidence/usage-ledger.json)：12 次发起记录，10 次可结算 Luna usage；3999 input、1332 output；费用为保守估算，不是发票 |
| 实际截图 | [browser-learning.png](../../../study-teachback-app/evidence/browser-learning.png)：stub-provider 工程会话，不是 live AI 内容 |
| 当前可审查文件 hash 清单 | [REVIEW_MANIFEST.json](./REVIEW_MANIFEST.json)：按 Git canonical bytes 的 SHA-256 和 Git blob SHA-1；不含自身递归 hash |
| 产品 diff | [a1c37af → be5cef5](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/compare/a1c37af2d68cce8f0574b89b01975e9223f6cea2...be5cef57564ed16bf2f25467ad0247bb9d7a717a) |

## 内容与身份边界

仅纳入 checkpoint 下 27 个已跟踪 app/证据文件和本次 Delivery Packet、索引、manifest。历史父提交维持原状。无 .env/key、runtime 工作目录、浏览器 profile、原始私人音频、敏感学习材料、Chat/Desktop/client 文件。账本保留用于追踪的 request ID；不含认证值或真实学习正文。自编植物浇水文本和实际测试截图属于已授权工程证据。

manifest 文件自身由 evidence commit 和 GitHub blob 身份覆盖，不做递归 hash。每个条目的 hash 对应 Git 提交中的字节，避免 Windows checkout 换行转换造成混淆。原始 ZIP 仅本地保留，其 SHA-256 为 `0b0770a54189b02b2b5017a19b92a2db8e63fb9fc994e25d3b90fb145b35f39c`；其历史 packet 副本不是本次同步说明更新后的 packet。

## 当前限制

Whisper 401 原因未知；没有成功 ASR/时间戳、owner 物理麦克风或完整真实链路验收。导出完整性、quota 恢复、单条删除及 live delivery 等未完成项见 Delivery Packet。同步成功不会提升产品工程验收状态。
