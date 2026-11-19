import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdirSync,mkdtempSync} from 'node:fs';
import {join} from 'node:path';
import {Ledger} from '../../../study-teachback-app/ledger.mjs';
import {runBatch,preflight} from './run.mjs';
if(!process.env.STUDY_TEST_OUTPUT||process.env.OPENAI_API_KEY!=='synthetic-offline-test-only')throw Error('TEST_ISOLATION_REQUIRED');
const setup=()=>{const directory=mkdtempSync(join(process.env.STUDY_TEST_OUTPUT,'batch-'));return {directory,book:new Ledger(join(directory,'ledger.json')),secret:'synthetic-offline-test-only'};};
const response=()=>new Response(JSON.stringify({text:'合成返回',segments:[{text:'合成返回',start:0,end:1}],words:[]}),{status:200,headers:{'x-request-id':'req_synthetic'}});
test('frozen eight-pair run reserves below approved cap, sends each pair once, and cannot restart',async()=>{
  const options=setup();let calls=0;const pairs=new Set();
  const report=await runBatch({...options,fetcher:async(url,request)=>{
    calls++;assert.equal(url,'https://api.openai.com/v1/audio/transcriptions');assert.equal(request.redirect,'error');
    const model=request.body.get('model'),audio=await request.body.get('file').arrayBuffer(),pair=model+':'+audio.byteLength;
    assert(!pairs.has(pair));pairs.add(pair);return response();
  }});
  assert.equal(calls,16);assert.equal(report.status,'COMPLETE_REVIEW_PENDING');assert(report.reservedUSD<=.30);assert(Math.abs(report.reservedUSD-preflight().reservedCeilingUSD)<1e-12);
  assert.equal(report.batchLedgerEvents.filter(e=>e.type==='reserve').length,16);assert.equal(report.exposureUSD,report.knownEstimateUSD);
  await assert.rejects(runBatch({...options,fetcher:async()=>{calls++;return response();}}),/BATCH_ALREADY_STARTED_NO_RETRY/);assert.equal(calls,16);
});
test('real-service failure stops the batch without retry or spending the remaining allowance',async()=>{
  const options=setup();let calls=0;
  const report=await runBatch({...options,fetcher:async()=>++calls===1?response():new Response(JSON.stringify({error:{code:'model_not_found',message:'candidate unavailable'}}),{status:404})});
  assert.equal(calls,2);assert.equal(report.status,'STOPPED_NO_RETRY');assert.equal(report.stopCategory,'API_HTTP_404');
  assert.equal(report.requests[1].error.code,'model_not_found');assert.equal(report.requests[1].costEstimateUSD,undefined);assert(report.exposureUSD>report.knownEstimateUSD);
  await assert.rejects(runBatch({...options,fetcher:async()=>{calls++;return response();}}),/BATCH_ALREADY_STARTED_NO_RETRY/);assert.equal(calls,2);
});
