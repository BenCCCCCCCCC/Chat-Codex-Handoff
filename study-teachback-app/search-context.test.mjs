import test from 'node:test';
import assert from 'node:assert/strict';
import {searchRecords,resolveRecordHit} from './record-search.mjs';
import {hitDestination,transcriptHit} from './search-focus.mjs';
import {semantic} from './provider.mjs';
import {TEACH,teachingSchema} from './schemas.mjs';

test('search keeps individual message and transcript-version locators without changing the active correction',()=>{
  const a={id:'attempt',raw:{id:'raw',spans:[{id:'s0',text:'不要浇水'}]},
    corrections:[{id:'reviewed',spans:[{id:'s0',text:'要浇水'}]}]};
  const topic={source:{title:'植物',text:'规则'},messages:[{role:'user',text:'不要浇水吗？'}],attempts:[a]};
  const before=structuredClone(topic),hits=searchRecords([topic],'不要')[0].hits;
  assert.equal(hits.length,2);
  assert.deepEqual(hits[0].target,{kind:'message',index:0});
  const hit=resolveRecordHit(topic,hits[1].key);
  assert.deepEqual(hitDestination(hit),{view:'attempt',attemptId:'attempt'});
  assert.equal(transcriptHit(a,hit.target).current,false);
  assert.equal(transcriptHit(a,hit.target).span.text,'不要浇水');
  assert.deepEqual(topic,before);
  assert.equal(resolveRecordHit({...topic,attempts:[]},hit.key),null);
});

test('provider trims oldest complete history entries within the fixed budget and returns actual usage and request trace',async()=>{
  const input={source:{id:'source',title:'规则',text:'条件'.repeat(500)},message:'为什么？',contextNote:'已确认的讨论要点',
    history:Array.from({length:6},(_,i)=>({role:'assistant',text:i+'讲'.repeat(3999)}))};
  const before=structuredClone(input);let dispatched,reserved,settled;
  const book={reserve:request=>{reserved=request;return {id:'local-test-request'};},settle:(...args)=>{settled=args;},failure:()=>assert.fail('unexpected failure')};
  const result=await semantic(TEACH,input,teachingSchema,{book,fetcher:async(_,options)=>{
    dispatched=JSON.parse(options.body);
    return new Response(JSON.stringify({status:'completed',model:'test-model',usage:{input_tokens:100,output_tokens:10},
      output:[{content:[{type:'output_text',text:'{"ok":true}'}]}]}),{headers:{'x-request-id':'req_synthetic'}});
  }});
  const sent=JSON.parse(dispatched.input);
  assert(sent.history.length>0&&sent.history.length<6);
  assert.deepEqual(sent.history,input.history.slice(-sent.history.length));
  assert.equal(sent.contextNote,input.contextNote);assert.deepEqual(sent.source,input.source);assert.equal(sent.message,input.message);
  assert(reserved.input<=24000);assert.equal(dispatched.store,false);assert.deepEqual(input,before);
  assert.deepEqual(result.contextUsage,{historyUsed:sent.history.length,historyOmitted:6-sent.history.length});
  assert.equal(result.requestId,'req_synthetic');assert.equal(result.reservationId,'local-test-request');
  assert.equal(settled[2],result.requestId);
});
