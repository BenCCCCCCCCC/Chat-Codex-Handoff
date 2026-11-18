import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from './server.mjs';
test('interrupted audio needs an explicit fragment choice, sends only fragment scope and cannot produce an omission grade',async()=>{
  const source={id:'s',title:'课程',text:'只有土壤干燥时才浇水。'},attempt={id:'a',sourceId:'s',transcriptVersion:'v',duration:2,spans:[{id:'p',text:'干了才浇水。',start:0,end:2}],assistance:'source',kind:'full',reviewed:true,interrupted:true};
  let calls=0,input,missing=false;const server=createServer({keyConfigured:()=>true,book:{summary:()=>({})},semanticCall:async(_,value)=>{calls++;input=value;return {value:{sourceId:'s',attemptId:'a',transcriptVersion:'v',findings:[{status:missing?'missing':'supported',message:'本片段说明了条件。',sourceQuote:source.text,spanId:missing?null:'p',quote:missing?null:'干了才浇水。',eventId:null,repair:missing?'补充条件。':null}]}};}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  const post=()=>fetch(origin+'/api/diagnose',{method:'POST',headers:{Origin:origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify({source,attempt,channel:'content'})});
  try{assert.equal((await post()).status,422);assert.equal(calls,0);attempt.fragmentAccepted=true;assert.equal((await post()).status,200);assert.equal(input.attempt.scope,'retained_fragment');assert.equal(input.attempt.duration,undefined);missing=true;const result=await post();assert.equal(result.status,422);assert.equal((await result.json()).error,'FRAGMENT_OMISSION_UNSUPPORTED');}finally{await new Promise(r=>server.close(r));}
});
