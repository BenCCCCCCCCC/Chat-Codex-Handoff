import { mkdirSync, readFileSync, writeFileSync, openSync, closeSync, unlinkSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';

export const PRICING = Object.freeze({ date: '2026-09-11', whisperMinute: 0.006, lunaInputMillion: 0.20, lunaOutputMillion: 1.20, lunaCacheWriteMillion: 0.25,
  sources: ['https://developers.openai.com/api/docs/models/gpt-5.6-luna', 'https://developers.openai.com/api/docs/models/whisper-1'] });
export const LIMITS = Object.freeze({ dollars: 5, cash: 10, attempts: 60, minutes: 360, requests: 300, input: 1_000_000, output: 250_000 });

// Append-only events. An unfinished reservation remains charged against the cap.
// Exclusive lock prevents two local processes from racing the same ledger.
export class Ledger {
  constructor(path) { this.path = path; mkdirSync(dirname(path), { recursive: true }); }
  read() {
    try { return JSON.parse(readFileSync(this.path, 'utf8')); }
    catch (e) { if (e.code === 'ENOENT') return { version: 1, pricing: PRICING, events: [] }; throw new Error('LEDGER_UNREADABLE'); }
  }
  transaction(fn) {
    let fd;
    try { fd = openSync(this.path + '.lock', 'wx'); } catch { throw new Error('LEDGER_LOCKED'); }
    try { const data = this.read(); const result = fn(data); writeFileSync(this.path, JSON.stringify(data, null, 2), { mode: 0o600 }); return result; }
    finally { closeSync(fd); unlinkSync(this.path + '.lock'); }
  }
  summary(data = this.read()) {
    const reservations = data.events.filter(e => e.type === 'reserve');
    const settled = new Map(data.events.filter(e => e.type === 'settle').map(e => [e.id, e]));
    return { requests: reservations.length, attempts: new Set([...data.events.filter(e=>e.type==='attempt').map(e=>e.attemptId),...reservations.filter(e => e.kind === 'asr').map(e => e.attemptId)]).size,
      minutes: reservations.reduce((s,e) => s + e.minutes, 0), inputReserved: reservations.reduce((s,e) => s + e.input, 0), outputReserved: reservations.reduce((s,e) => s + e.output, 0),
      exposureUSD: reservations.reduce((s,e) => s + (settled.get(e.id)?.costUSD ?? e.reserveUSD), 0),
      knownCostUSD: [...settled.values()].reduce((s,e) => s + e.costUSD, 0),
      unsettled: reservations.filter(e => !settled.has(e.id)).length, cashSpentUSD: 0, cashNote: 'No purchase/recharge performed by app; provider billing balance not inspected.' };
  }
  register(attemptId) {
    if(typeof attemptId!=='string'||!/^[a-zA-Z0-9_-]{1,80}$/.test(attemptId))throw new Error('INVALID_ID');
    return this.transaction(data=>{if(data.events.some(e=>(e.type==='attempt'||e.type==='reserve'&&e.kind==='asr')&&e.attemptId===attemptId))return;if(this.summary(data).attempts>=LIMITS.attempts)throw new Error('ATTEMPT_LIMIT');data.events.push({type:'attempt',attemptId,at:new Date().toISOString()});});
  }
  reserve({ kind, attemptId = null, input = 0, output = 0, minutes = 0 }) {
    if (!['asr','semantic'].includes(kind) || ![input, output, minutes].every(x => Number.isFinite(x) && x >= 0)) throw new Error('INVALID_RESERVATION');
    return this.transaction(data => {
      const s = this.summary(data);
      const reserveUSD = kind === 'asr' ? minutes * PRICING.whisperMinute : (input * PRICING.lunaCacheWriteMillion + output * PRICING.lunaOutputMillion) / 1e6;
      const old = data.events.filter(e => e.type === 'reserve' && e.kind === 'asr' && e.attemptId === attemptId);
      // Owner-approved fifth submission for ASR evidence recovery for this existing synthetic fixture only.
      const submissionLimit = attemptId === 'synthetic-mandarin-build01' ? 5 : 2;
      if (kind === 'asr' && (!attemptId || minutes !== 3 || old.length >= submissionLimit || (!old.length && !data.events.some(e=>e.type==='attempt'&&e.attemptId===attemptId) && s.attempts >= LIMITS.attempts))) throw new Error('ATTEMPT_LIMIT');
      if (s.requests >= LIMITS.requests || s.exposureUSD + reserveUSD > LIMITS.dollars || s.minutes + minutes > LIMITS.minutes || s.inputReserved + input > LIMITS.input || s.outputReserved + output > LIMITS.output) throw new Error('BUDGET_STOP');
      const e = { type: 'reserve', id: randomUUID(), at: new Date().toISOString(), model: kind === 'asr' ? 'whisper-1' : 'gpt-5.6-luna', kind, attemptId, input, output, minutes, reserveUSD };
      data.events.push(e); return e;
    });
  }
  settle(id, usage, requestId) {
    return this.transaction(data => {
      const r = data.events.find(e => e.type === 'reserve' && e.id === id);
      if (!r || data.events.some(e => e.type === 'settle' && e.id === id)) throw new Error('INVALID_SETTLEMENT');
      let costUSD;
      if (r.kind === 'asr') {
        if (!Number.isFinite(usage.seconds) || usage.seconds < 0 || usage.seconds > 180) throw new Error('INVALID_USAGE');
        costUSD = Math.ceil(usage.seconds) / 60 * PRICING.whisperMinute;
      } else {
        if (!Number.isInteger(usage.input_tokens) || !Number.isInteger(usage.output_tokens) || usage.input_tokens < 0 || usage.output_tokens < 0 || usage.input_tokens > r.input || usage.output_tokens > r.output) throw new Error('INVALID_USAGE');
        // Conservative billed estimate: do not subtract cache discounts; include cache-write premium.
        costUSD = (usage.input_tokens * PRICING.lunaCacheWriteMillion + usage.output_tokens * PRICING.lunaOutputMillion) / 1e6;
      }
      data.events.push({ type: 'settle', id, at: new Date().toISOString(), usage, requestId, costUSD, costBasis: 'conservative public-rate estimate, not invoice' });
    });
  }
  failure(id, category, httpStatus = null) { this.transaction(data => data.events.push({ type: 'failure', id, at: new Date().toISOString(), category, httpStatus })); }
}
