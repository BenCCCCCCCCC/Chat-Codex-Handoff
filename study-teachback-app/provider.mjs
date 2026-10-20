import { Ledger } from './ledger.mjs';
import { fileURLToPath } from 'node:url';
import { waveDuration, normalizeASR, identifier } from './core.mjs';

export const ASR_STYLE_PROMPT='以下是普通话的简体中文转写。';
export const ledger = new Ledger(fileURLToPath(new URL('./runtime/usage.json', import.meta.url)));
export async function transcribe(bytes, attemptId, { fetcher = fetch, book = ledger, signal, prompt = ASR_STYLE_PROMPT } = {}) {
  if (!process.env.OPENAI_API_KEY) throw new Error('CREDENTIAL_MISSING');
  identifier(attemptId);const duration=waveDuration(bytes);
  const reservation=book.reserve({kind:'asr',attemptId,minutes:3});
  const form=new FormData();form.set('model','whisper-1');form.set('language','zh');form.set('response_format','verbose_json');form.append('timestamp_granularities[]','word');form.append('timestamp_granularities[]','segment');form.set('file',new Blob([bytes],{type:'audio/wav'}),'attempt.wav');
  if(prompt)form.set('prompt',prompt);
  try {
    const r=await fetcher('https://api.openai.com/v1/audio/transcriptions',{method:'POST',headers:{Authorization:`Bearer ${process.env.OPENAI_API_KEY}`},body:form,signal:signal?AbortSignal.any([signal,AbortSignal.timeout(60000)]):AbortSignal.timeout(60000)});
    if(!r.ok){book.failure(reservation.id,'HTTP_ERROR',r.status);throw new Error(`API_HTTP_${r.status}`);}
    const data=await r.json();book.settle(reservation.id,{seconds:duration},r.headers.get('x-request-id'));
    return { ...normalizeASR(data,duration), duration, styleHint:prompt===ASR_STYLE_PROMPT?'zh-Hans-v1':'unspecified', model:'whisper-1',reservationId:reservation.id,requestId:r.headers.get('x-request-id') };
  } catch(e){ if(!String(e.message).startsWith('API_HTTP_'))book.failure(reservation.id,'ASR_RESULT_UNAVAILABLE');throw new Error(String(e.message).startsWith('API_HTTP_')?e.message:'ASR_RESULT_UNAVAILABLE'); }
}
export async function semantic(instructions, input, schema, { fetcher = fetch, book = ledger, signal } = {}) {
  if (!process.env.OPENAI_API_KEY) throw new Error('CREDENTIAL_MISSING');
  const body = { model: 'gpt-5.6-luna', store: false, background: false, service_tier: 'default', reasoning: { effort: 'none' }, max_output_tokens: 1800,
    instructions, input: JSON.stringify(input), text: { format: { type: 'json_schema', name: 'learning_response', strict: true, schema } } };
  let encoded = JSON.stringify(body);
  // UTF-8 bytes + schema/protocol margin bounds input tokens for these short text-only requests.
  let tokenBound = Buffer.byteLength(encoded, 'utf8') + 2048;
  const originalHistory=Array.isArray(input.history)?input.history.length:null;
  if(originalHistory!==null){
    input={...input,history:input.history.slice()};
    while(tokenBound>24000&&input.history.length){
      input.history.shift();body.input=JSON.stringify(input);encoded=JSON.stringify(body);
      tokenBound=Buffer.byteLength(encoded,'utf8')+2048;
    }
  }
  if (tokenBound > 24000) throw new Error('INPUT_TOO_LARGE');
  const reservation = book.reserve({ kind: 'semantic', input: tokenBound, output: body.max_output_tokens });
  let response;
  try {
    response = await fetcher('https://api.openai.com/v1/responses', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body: encoded,
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(60000)]) : AbortSignal.timeout(60000) });
    if (!response.ok) { book.failure(reservation.id, 'HTTP_ERROR', response.status); throw new Error(`API_HTTP_${response.status}`); }
    const data = await response.json();
    book.settle(reservation.id, { input_tokens: data.usage?.input_tokens, output_tokens: data.usage?.output_tokens }, response.headers.get('x-request-id'));
    if (data.status !== 'completed') throw new Error('MODEL_INCOMPLETE');
    const output = data.output?.flatMap(x => x.content ?? []).filter(x => x.type === 'output_text').map(x => x.text).join('');
    if (!output) throw new Error('MODEL_NO_OUTPUT');
    return { value: JSON.parse(output), usage: data.usage, model: data.model, reservationId: reservation.id,
      requestId:response.headers.get('x-request-id'),
      ...(originalHistory===null?{}:{contextUsage:{historyUsed:input.history.length,historyOmitted:originalHistory-input.history.length}}) };
  } catch (error) {
    const safeNetworkCodes = ['ENOTFOUND', 'EAI_AGAIN', 'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'EPERM', 'EACCES', 'UND_ERR_CONNECT_TIMEOUT'];
    const code = safeNetworkCodes.includes(error.cause?.code) ? error.cause.code : null;
    if (!String(error.message).startsWith('API_HTTP_')) book.failure(reservation.id, code ?? (error.name === 'TimeoutError' ? 'TIMEOUT' : 'REQUEST_OR_RESPONSE_FAILURE'));
    // Never log provider bodies, keys, source text or raw errors.
    throw new Error(String(error.message).startsWith('API_HTTP_') ? error.message : code ? `NETWORK_${code}` : 'API_RESULT_UNAVAILABLE');
  }
}
