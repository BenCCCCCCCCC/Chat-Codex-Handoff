import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';
import { makeTextAttempt } from './text-teachback.mjs';
import { CONTENT, findingsSchema } from './schemas.mjs';
import { JUDGEMENT, judgementSchema } from './judgement.mjs';
import { localize } from './diagnostic-localization.mjs';

// Original synthetic material. Values supplied to the server are hand-written,
// including the knowingly wrong negative control. No model is called.
const esc = '按 Esc 会关闭详情面板。';
const focus = '面板关闭后，键盘焦点回到打开该面板的同一个按钮。';
const drafts = '标准模式下，草稿保存在本机，应用重启后仍可恢复。';
const privateDrafts = '私密会话模式下，草稿仅在会话期间保留，关闭会话后不会在重启时恢复。';
const source = { id: 'interface-notes', title: '详情面板与草稿', text: [esc, focus, drafts, privateDrafts].join('\n') };
const scope = (status) => ({
  id: 'draft-mode', sourceId: source.id, question: '应用重启后能否恢复草稿？', status,
  condition: status === 'condition' ? '本次采用标准模式。' : '当前会话模式未知。',
  evidence: [{ materialId: source.id, title: source.title, quote: drafts }, { materialId: source.id, title: source.title, quote: privateDrafts }],
});
const answer = (text) => {
  const a = makeTextAttempt({ source }, { text, kind: 'full', assistance: 'none' });
  return { id: a.id, transcriptVersion: a.raw.id, spans: a.raw.spans, inputMode: 'text', sourceId: source.id, kind: 'full', assistance: 'none', reviewed: true };
};
const finding = (a, status, sourceQuote, quote, message, repair = null) => ({
  status, message, sourceQuote, spanId: quote === null ? null : a.spans.find(s => s.text.includes(quote))?.id, quote, eventId: null, repair,
});
const wrap = (a, findings) => ({ sourceId: source.id, attemptId: a.id, transcriptVersion: a.transcriptVersion, findings });
const defer = { issueId: 'draft-mode', decision: 'deferred', reason: '先确认会话模式。', findings: [] };
const mix = answer('按 Esc 会关上详情面板，焦点跳到页首；重启后草稿肯定还在。');
const escRight = finding(mix, 'supported', esc, '按 Esc 会关上详情面板', '正确说明 Esc 会关闭面板。');
const fixFocus = a => finding(a, 'incorrect', focus, '焦点跳到页首', '焦点应回原按钮，而不是页首。', '请重新说一遍：关闭面板后焦点回到哪个原触发按钮？');
const plain = (v) => { const { judgement, ...value } = v; return value; };
const targets = (value, attempt) => localize({ source, attempt, report: plain(value) }).diagnosticTargets;

test('text diagnosis capability boundary uses genuine offline HTTP routing', async t => {
  let next, received;
  const server = createServer({ keyConfigured: () => true, book: { summary: () => ({}) },
    semanticCall: async (prompt, input, schema) => { received = { prompt, input, schema }; return { value: next }; } });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  async function check(attempt, issues, output, expected = 200) {
    next = structuredClone(output);
    received = null;
    const response = await fetch(origin + '/api/diagnose', { method: 'POST', headers: {
      Origin: origin, 'X-Study-Request': '1', 'Content-Type': 'application/json',
    }, body: JSON.stringify({ source, attempt, channel: 'content', ...(issues.length ? { judgementIssues: issues } : {}) }) });
    const json = await response.json();
    assert.equal(response.status, expected, JSON.stringify(json));
    assert.deepEqual(received?.input.judgementIssues, issues.length ? issues : undefined);
    assert.equal(received.prompt, issues.length ? CONTENT + JUDGEMENT : CONTENT);
    assert.equal(received.schema, issues.length ? judgementSchema : findingsSchema);
    return json;
  }
  try {
    await t.test('unknown draft mode does not suppress the unrelated focus repair', async () => {
      const value = (await check(mix, [scope('deferred')], { ...wrap(mix, [escRight, fixFocus(mix)]), assessments: [defer] })).value;
      assert.deepEqual(value.findings.map(f => f.status), ['supported', 'incorrect']);
      assert.deepEqual(value.judgement.assessments[0].findingIndexes, []);
      const actualTargets = targets(value, mix);
      assert.equal(actualTargets.length, 1);
      assert.match(actualTargets[0].focus, /原触发按钮/);
      assert.equal(value.findings[1].sourceQuote, focus);
    });
    await t.test('correct outcome with omitted rationale keeps a separate missing finding', async () => {
      const a = answer('还能恢复。');
      const supported = finding(a, 'supported', drafts, '还能恢复。', '恢复结果正确。');
      const missing = finding(a, 'missing', drafts, null, '没有说明标准模式把草稿存在本机。', '补讲恢复结果为什么依赖标准模式的本机保存。');
      const value = (await check(a, [scope('condition')], { ...wrap(a, []), assessments: [{ issueId: 'draft-mode', decision: 'judgeable', reason: '明确采用标准模式。', findings: [supported, missing] }] })).value;
      assert.deepEqual(value.judgement.assessments[0].findingIndexes, [0, 1]);
      assert.deepEqual(value.findings.map(f => f.status), ['supported', 'missing']);
      assert.equal(value.findings[1].spanId, null);
      assert.equal(targets(value, a).length, 1);
    });
    for (const correct of [true, false]) await t.test('ordinary first explanation: ' + (correct ? 'correct focus' : 'reversed focus'), async () => {
      const a = answer(correct ? '回到刚才打开详情面板的那个按钮。' : '焦点跳到页首。');
      const f = correct ? finding(a, 'supported', focus, a.spans[0].text, '正确指出原触发按钮。') : fixFocus(a);
      const { value } = await check(a, [], wrap(a, [f]));
      assert.equal(value.judgement, undefined);
      assert.equal(value.findings[0].sourceQuote, focus);
      assert.equal(targets(value, a).length, correct ? 0 : 1);
    });
    await t.test('structural guard rejects a verdict on the deferred issue', async () => {
      const bad = { ...defer, findings: [fixFocus(mix)] };
      assert.equal((await check(mix, [scope('deferred')], { ...wrap(mix, [escRight]), assessments: [bad] }, 422)).error, 'DEFERRED_JUDGEMENT');
    });
    await t.test('structural guard rejects a fabricated source quote', async () => {
      const bad = { ...fixFocus(mix), sourceQuote: '面板关闭后应重新加载整个网页。' };
      assert.equal((await check(mix, [scope('deferred')], { ...wrap(mix, [bad]), assessments: [defer] }, 422)).error, 'INVALID_SOURCE_QUOTE');
    });
    await t.test('known gap: a genuine quote with the wrong supported label still passes structure', async () => {
      const wrong = finding(mix, 'supported', focus, '焦点跳到页首', '把页首错误认成已清楚表达。');
      const { value } = await check(mix, [scope('deferred')], { ...wrap(mix, [escRight, wrong]), assessments: [defer] });
      assert.equal(value.findings[1].status, 'supported');
      assert.equal(targets(value, mix).length, 0);
    });
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
