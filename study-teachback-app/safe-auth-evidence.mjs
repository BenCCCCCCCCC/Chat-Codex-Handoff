import { createHash } from 'node:crypto';

export const fingerprint = secret => createHash('sha256').update(secret).digest('hex').slice(0,12);
export function sanitizeError(body, secret) {
  const clean = value => {
    if (typeof value !== 'string') return null;
    let s = value.split(secret).join('[REDACTED]');
    s = s.replace(/Bearer\s+[^\s"'<>]+/gi,'[REDACTED_AUTH]')
      .replace(/\bsk-[^\s"'<>]+/gi,'[REDACTED_KEY]')
      .replace(/(incorrect api key provided\s*:)\s*[^\s]+/gi,'$1 [REDACTED_KEY]')
      .replace(/\b(?:proj|org|user)_[a-zA-Z0-9_-]+/g,'[REDACTED_ID]')
      .replace(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g,'[REDACTED_EMAIL]');
    // Also remove long unlabelled tokens and any emitted secret fragment.
    s = s.replace(/[a-zA-Z0-9_*=.-]{24,}/g,'[REDACTED_TOKEN]');
    if(secret.length>=8) for(let i=0;i<=secret.length-8;i++) s=s.split(secret.slice(i,i+8)).join('[REDACTED_FRAGMENT]');
    return s.replace(/[\u0000-\u001f\u007f]/g,' ').slice(0,800);
  };
  const error=body?.error;
  return {type:clean(error?.type),code:clean(error?.code),param:clean(error?.param),message:clean(error?.message)};
}
export function safeRequestId(value) { return typeof value==='string'&&/^req_[a-zA-Z0-9_-]{1,100}$/.test(value)?value:null; }
