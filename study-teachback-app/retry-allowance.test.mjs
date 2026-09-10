import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {Ledger} from './ledger.mjs';
test('one fixture gets fifth submission, sixth fails, prior reservations remain charged',()=>{
  const b=new Ledger(join(mkdtempSync(join(tmpdir(),'retry-exception-')),'usage.json'));
  const args={kind:'asr',attemptId:'synthetic-mandarin-build01',minutes:3};
  b.reserve(args);b.reserve(args);b.reserve(args);b.reserve(args);const before=b.read().events;
  b.reserve(args);assert.deepEqual(b.read().events.slice(0,before.length),before);
  assert.equal(b.summary().minutes,15);assert.equal(b.summary().unsettled,5);assert.equal(b.summary().requests,5);
  assert.throws(()=>b.reserve(args),/ATTEMPT_LIMIT/);assert.equal(b.summary().requests,5);
});
test('ordinary and similar-named attempts still get only two submissions',()=>{
  for(const attemptId of ['ordinary','synthetic-mandarin-build01-copy']){
    const b=new Ledger(join(mkdtempSync(join(tmpdir(),'retry-default-')),'usage.json'));
    const args={kind:'asr',attemptId,minutes:3};b.reserve(args);b.reserve(args);assert.throws(()=>b.reserve(args),/ATTEMPT_LIMIT/);
  }
});
