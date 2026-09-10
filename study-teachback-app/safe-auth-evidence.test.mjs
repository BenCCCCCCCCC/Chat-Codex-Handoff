import test from 'node:test';
import assert from 'node:assert/strict';
import {fingerprint,sanitizeError,safeRequestId} from './safe-auth-evidence.mjs';
const fake='sk-proj-FICTITIOUS_ONLY_1234567890abcdefgh';
test('same in-memory credential gets same irreversible short fingerprint',()=>{assert.equal(fingerprint(fake),fingerprint(fake));assert.match(fingerprint(fake),/^[0-9a-f]{12}$/);assert.notEqual(fingerprint(fake),fingerprint(fake+'x'));});
test('error sanitizer redacts full/masked key, bearer, IDs and email; ignores unapproved fields',()=>{const r=sanitizeError({error:{type:'invalid_request_error',code:'invalid_api_key',param:null,message:`Incorrect API key provided: ${fake}. Bearer ${fake} sk-proj-FICT****abcdefgh proj_secretid a@example.com`,headers:{Authorization:fake}}},fake);const s=JSON.stringify(r);assert(!s.includes(fake));assert(!s.includes('abcdefgh'));assert(!s.includes('FICT****'));assert(!s.includes('a@example.com'));assert(!s.includes('proj_secretid'));assert.deepEqual(Object.keys(r),['type','code','param','message']);assert.equal(r.code,'invalid_api_key');});
test('missing malformed errors and request headers fail closed',()=>{assert.deepEqual(sanitizeError({error:'bad'},fake),{type:null,code:null,param:null,message:null});assert.equal(safeRequestId('req_123456'), 'req_123456');assert.equal(safeRequestId('Bearer '+fake),null);});
