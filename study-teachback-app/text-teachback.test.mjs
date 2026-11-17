import test from 'node:test';
import assert from 'node:assert/strict';
import {makeTextAttempt,comparisonFor} from './text-teachback.mjs';
import {attemptValue,contentInput,revisedTranscript} from './core.mjs';
import {encodeBackup,decodeBackup} from './backup.mjs';
import {createServer} from './server.mjs';
const source={id:'source',title:'Conditions',text:'Only enter when open.'};
const request=a=>({id:a.id,sourceId:a.source.id,inputMode:a.inputMode,transcriptVersion:a.raw.id,spans:a.raw.spans,kind:a.kind,assistance:a.assistance,focus:a.focus,reviewed:true});
test('text attempts have no audio/time and pin comparison to the original version across edits and backup',async()=>{
  const topic={id:'topic',createdAt:1,source,goals:[],messages:[],attempts:[]};
  const first=makeTextAttempt(topic,{text:'Enter when open.',kind:'full',assistance:'source'});topic.attempts.push(first);
  const second=makeTextAttempt(topic,{text:'When closed, do not enter.',kind:'partial',focus:'Explain the condition.',assistance:'none',parentId:first.id,parentVersionId:first.raw.id});topic.attempts.push(second);
  assert.equal(contentInput(source,request(first)).attempt.inputMode,'text');
  assert.equal(first.audio,undefined);assert.equal(first.duration,undefined);assert.equal(first.raw.spans[0].start,undefined);
  first.corrections.push(revisedTranscript(first,[{text:'Later edit of the first attempt.'}]));
  second.transcriptDraft={baseVersionId:second.raw.id,updatedAt:Date.now(),edits:[{id:'p0',text:'Pending edit.'}]};
  const restored=decodeBackup(await encodeBackup(topic)),pair=comparisonFor(restored,restored.attempts[1]);
  assert.equal(pair.before.spans[0].text,'Enter when open.');assert.equal(pair.after.spans[0].text,'When closed, do not enter.');assert.match(pair.note,/尚未确认/);
  delete restored.attempts[1].parentVersionId;assert.match(comparisonFor(restored,restored.attempts[1]).reason,/未固定/);
  restored.attempts.shift();assert.match(comparisonFor(restored,restored.attempts[0]).reason,/删除/);
  const invalid={...request(first),duration:10};assert.throws(()=>attemptValue(invalid),/INVALID_ATTEMPT/);
  assert.throws(()=>attemptValue({...request(first),spans:[{id:'p0',text:'text',start:0,end:1}]}),/INVALID_TEXT_SPAN/);
  assert.throws(()=>makeTextAttempt(topic,{text:'New',kind:'partial',focus:'Condition',assistance:'source',parentId:first.id,parentVersionId:first.raw.id,feedbackRef:{sourceId:source.id,attemptId:'wrong-parent',transcriptVersion:first.raw.id,reportId:'report',findingIndex:0}}),/INVALID_FEEDBACK_REFERENCE/);
  const broken=JSON.parse(await encodeBackup(topic));broken.topic.attempts[0].audio={mime:'audio/wav',base64:''};assert.throws(()=>decodeBackup(JSON.stringify(broken)),/BACKUP_INVALID/);
});
test('text diagnosis uses the existing explicit semantic route and refuses sound analysis before dispatch',async()=>{
  let calls=0;const a=makeTextAttempt({source},{text:'Enter when open.',kind:'full',assistance:'none'});
  const server=createServer({keyConfigured:()=>true,book:{summary:()=>({}),register:()=>assert.fail('Text cannot register audio')},semanticCall:async(_,input)=>{
    calls++;assert.equal(input.attempt.inputMode,'text');assert.equal(input.attempt.spans[0].start,undefined);
    return {value:{sourceId:source.id,attemptId:a.id,transcriptVersion:a.raw.id,findings:[]}};
  }});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;
  try{
    const send=channel=>fetch(origin+'/api/diagnose',{method:'POST',headers:{origin,'X-Study-Request':'1','Content-Type':'application/json'},body:JSON.stringify({source,attempt:request(a),channel,events:[{id:'fake',start:0,end:1,confirmed:true,type:'near_silence_candidate'}]})});
    assert.equal((await send('content')).status,200);assert.equal(calls,1);
    assert.equal((await send('delivery')).status,422);assert.equal(calls,1);
  }finally{await new Promise(r=>server.close(r));}
});
