# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: FILE-IMPORT-AUTO-USE-01
task: FILE-IMPORT-AUTO-USE-01
writer: CHAT_MASTER
transport_only: true
accepted_base_head: 89c23a155ac7c32e6357b33144edf93bd9850309

## Instruction

Execute FILE-IMPORT-AUTO-USE-01 as defined in the latest CURRENT_STATE.md and HANDOFF.md.

Owner-observed issue:
a supported DOCX parsed successfully, but the preview text was not automatically placed into the actual learning source. The user had to discover and click “use all text” before Start/Learn could work.

Owner intent:
uploading a small supported file should be sufficient to make the material ready for learning.

Required:
- <=5000 extracted characters: auto-populate full source locally after extraction;
- >5000: no silent truncation or arbitrary chunk; require explicit subsection selection with clear notice;
- preserve preview and intentional manual subset override;
- preserve filename title, setupContext provenance and zero extra provider calls.

Use Astra autonomy inside scope:
analyze -> design -> implement -> test -> self-review -> iterate until acceptance or stop condition.

No live provider/API.
No Phase3B.
No model/provider/budget/retention/dependency changes.
No push/merge.

At completion write CODEX_TO_CHAT back to this same remote ACTIVE_EXCHANGE.md and verify the relay write/readback/sole meta path as required by the permanent relay rule.

If browser UI validation cannot run reliably inside Codex sandbox, return NEEDS_HOST_VERIFY without final product commit.
