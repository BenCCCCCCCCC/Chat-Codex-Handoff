import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from './server.mjs';
import { extractSource } from './ingestion.mjs';

test('local extraction route returns exact text, rejects invalid format/origin, never invokes provider or ledger',async()=>{
  const forbidden=()=>{throw new Error('UNEXPECTED_PAID_OR_LEDGER_CALL');};
  const server=createServer({semanticCall:forbidden,asrCall:forbidden,book:{register:forbidden,summary:forbidden}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin=`http://127.0.0.1:${server.address().port}`;
  try{
    const send=(kind,body,from=origin)=>fetch(origin+'/api/extract',{method:'POST',headers:{Origin:from,'X-Study-Request':'1','X-Source-Format':kind},body});
    for(const kind of ['txt','md']){const r=await send(kind,'只有A才B。');assert.equal(r.status,200);assert.equal((await r.json()).blocks[0].text,'只有A才B。');}
    assert.equal((await send('txt','private','http://example.com')).status,403);
    const invalid=await send('exe','bad');assert.equal((await invalid.json()).error,'FORMAT_UNSUPPORTED');
    const empty=await send('txt',' ');assert.equal((await empty.json()).error,'NO_EXTRACTABLE_TEXT');
  }finally{await new Promise(r=>server.close(r));}
});
test('oversized input is rejected before subprocess extraction',()=>{
  assert.throws(()=>extractSource(Buffer.alloc(10*1024*1024+1),'txt'),/FILE_TOO_LARGE/);
});
