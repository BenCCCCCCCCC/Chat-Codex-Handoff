import test from 'node:test';
import assert from 'node:assert/strict';
import {cases,verdictPass} from './logic-fixtures.mjs';
import {validateFindings} from './core.mjs';
test('ticket strengthening is schema-valid but cannot pass semantic fixture oracle',()=>{
  const c=cases.find(c=>c.id==='ticket_sufficient_strengthening');
  assert.equal(c.source.text,'只有持票者才可以入场。');assert.equal(c.words,'只要持票就一定可以入场。');
  const a={id:'ticket',sourceId:c.source.id,transcriptVersion:'v1',duration:10,spans:[{id:'s0',start:0,end:10,text:c.words}]};
  const r={sourceId:c.source.id,attemptId:a.id,transcriptVersion:'v1',findings:[{status:'supported',message:'来源支持',sourceQuote:c.source.text,spanId:'s0',quote:c.words,eventId:null,repair:'继续'}]};
  validateFindings(r,c.source,a,'content');assert.equal(verdictPass(c.expectation,r.findings),false);
});
test('unsupported strengthening requires explicit rejection or uncertainty, never mixed support',()=>{
  for(const c of cases.filter(c=>c.expectation==='unsupported_strengthening')){
    for(const status of ['incorrect','unknown'])assert(verdictPass(c.expectation,[{status}]));
    for(const findings of [[],[{status:'missing'}],[{status:'supported'},{status:'incorrect'}]])assert.equal(verdictPass(c.expectation,findings),false);
  }
});
test('correct paraphrase and final self-repair cannot pass with conflicting verdicts',()=>{
  assert(verdictPass('correct',[{status:'supported'}]));
  for(const status of ['incorrect','missing','unknown'])assert.equal(verdictPass('correct',[{status:'supported'},{status}]),false);
  assert.equal(verdictPass('wrong',[{status:'supported'},{status:'incorrect'}]),false);
});
