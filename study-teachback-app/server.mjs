import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { semantic, transcribe, ledger } from './provider.mjs';
import { sourceValue, attemptValue, contentInput, validateTeaching, validateFindings, text, requireValue } from './core.mjs';
import { teachingSchema, findingsSchema, deliverySchema, TEACH, CONTENT, DELIVERY } from './schemas.mjs';

const files={'/':'index.html','/app.mjs':'app.mjs','/core.mjs':'core.mjs','/storage.mjs':'storage.mjs','/style.css':'style.css'};
export function createServer({semanticCall=semantic,asrCall=transcribe,book=ledger}={}) {
  let busy=false;
  return http.createServer(async(req,res)=>{
    const expected=`127.0.0.1:${req.socket.localPort}`, origin=`http://${expected}`;
    const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; media-src 'self' blob:; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",'Permissions-Policy':'microphone=(self), camera=()'};
    const json=(status,data)=>{res.writeHead(status,{...headers,'Content-Type':'application/json'});res.end(JSON.stringify(data));};
    if(req.headers.host!==expected)return json(403,{error:'HOST_REJECTED'});
    const path=req.url?.split('?')[0];
    if(req.method==='GET' && files[path]){
      try {const file=files[path];res.writeHead(200,{...headers,'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':'text/javascript'});res.end(await readFile(new URL(file,import.meta.url)));}catch{json(500,{error:'FILE_UNAVAILABLE'});}return;
    }
    if(req.method==='GET' && path==='/api/status')return json(200,{keyConfigured:!!process.env.OPENAI_API_KEY,ledger:book.summary(),models:['whisper-1','gpt-5.6-luna']});
    if(req.method!=='POST'||req.headers.origin!==origin||req.headers['x-study-request']!=='1')return json(403,{error:'ORIGIN_REJECTED'});
    if(!['/api/teach','/api/diagnose','/api/asr','/api/register'].includes(path))return json(404,{error:'NOT_FOUND'});
    if(busy)return json(409,{error:'REQUEST_IN_PROGRESS'});
    busy=true; const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
    try {
      const limit=path==='/api/asr'?5_760_044:80000;const parts=[];let length=0;
      for await(const part of req){length+=part.length;requireValue(length<=limit,'INPUT_TOO_LARGE');parts.push(part);}
      const bytes=Buffer.concat(parts);
      if(path==='/api/asr')return json(200,await asrCall(bytes,req.headers['x-attempt-id'],{signal:controller.signal}));
      requireValue(req.headers['content-type']==='application/json','CONTENT_TYPE');
      const b=JSON.parse(bytes.toString('utf8'));
      if(path==='/api/register'){book.register(b.attemptId);return json(200,{registered:true});}
      const source=sourceValue(b.source);
      if(path==='/api/teach'){
        requireValue(['learn','repair','apply','apply_answer'].includes(b.mode),'INVALID_MODE');
        const input={source,mode:b.mode,message:text(b.message,2000),focus:b.focus?text(b.focus,1000):null,history:Array.isArray(b.history)?b.history.slice(-6).map(m=>({role:m.role==='assistant'?'assistant':'user',text:text(m.text,2500)})):[]};
        const result=await semanticCall(TEACH,input,teachingSchema,{signal:controller.signal});return json(200,{...result,value:validateTeaching(result.value,source)});
      }
      const attempt=attemptValue(b.attempt), input=contentInput(source,attempt);
      if(b.channel==='content'){
        const result=await semanticCall(CONTENT,input,findingsSchema,{signal:controller.signal});return json(200,{...result,value:validateFindings(result.value,source,attempt,'content')});
      }
      requireValue(b.channel==='delivery'&&Array.isArray(b.events)&&b.events.length>0&&b.events.length<=8,'SOUND_EVIDENCE_INSUFFICIENT');
      const events=b.events.map(e=>{requireValue(e.confirmed===true&&e.type==='near_silence_candidate'&&typeof e.id==='string'&&Number.isFinite(e.start)&&Number.isFinite(e.end)&&e.start>=0&&e.end>e.start&&e.end<=attempt.duration,'INVALID_EVENT');return {id:e.id,type:e.type,start:e.start,end:e.end};});
      const result=await semanticCall(DELIVERY,{...input,attempt,events},deliverySchema,{signal:controller.signal});return json(200,{...result,value:validateFindings(result.value,source,attempt,'delivery',events)});
    }catch(e){const safe=/^[A-Z][A-Z0-9_]+$/.test(e.message)?e.message:'REQUEST_FAILED';json(422,{error:safe});}
    finally{busy=false;}
  });
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const server=createServer();server.listen(4317,'127.0.0.1',()=>console.log('Study Teach-back: http://127.0.0.1:4317 (loopback only)'));
  process.on('SIGINT',()=>server.close(()=>process.exit(0)));
}
