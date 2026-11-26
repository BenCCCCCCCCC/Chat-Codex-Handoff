import http from 'node:http';
import { extractSource,extractionCapabilities } from './ingestion.mjs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { semantic, transcribe, ledger } from './provider.mjs';
import { sourceValue, attemptValue, contentInput, validateTeaching, validateFindings, text, requireValue, repairFocus, waveDuration, TUTOR_MESSAGE_LIMIT, setupContextValue } from './core.mjs';
import { teachingSchema, findingsSchema, deliverySchema, TEACH, CONTENT, DELIVERY } from './schemas.mjs';
import {transcriptionTerms} from './transcription-terms.mjs';
import {judgementIssues,judgementSchema,JUDGEMENT,scopedReport} from './judgement.mjs';
import {practiceConditions,conditionalPracticeSchema,CONDITIONAL_PRACTICE,validateConditionalResult} from './conditional-practice.mjs';

const files={'/bounded-understanding.mjs':'bounded-understanding.mjs','/understanding-task.mjs':'understanding-task.mjs','/transcription-terms.mjs':'transcription-terms.mjs','/transcript-playback.mjs':'transcript-playback.mjs','/audio-input.mjs':'audio-input.mjs','/voice-review.mjs':'voice-review.mjs','/search-focus.mjs':'search-focus.mjs','/chat-ui.mjs':'chat-ui.mjs','/draft-save.mjs':'draft-save.mjs','/record-search.mjs':'record-search.mjs','/':'index.html','/app.mjs':'app.mjs','/core.mjs':'core.mjs','/storage.mjs':'storage.mjs','/style.css':'style.css','/workspace-ui.mjs':'workspace-ui.mjs','/practice.mjs':'practice.mjs','/practice-ui.mjs':'practice-ui.mjs','/backup.mjs':'backup.mjs','/backup-ui.mjs':'backup-ui.mjs','/demo':'demo.html','/demo.mjs':'demo.mjs','/diagnostic-localization.mjs':'diagnostic-localization.mjs'};
export function createServer({semanticCall=semantic,asrCall=transcribe,book=ledger,extractCall=extractSource,capabilityCall=extractionCapabilities,keyConfigured=()=>!!process.env.OPENAI_API_KEY}={}) {
  for(const file of ['closed-check.mjs','learning-record.mjs','navigation.mjs'])files['/'+file]=file;
  files['/setup-draft.mjs']='setup-draft.mjs';
  files['/source-provenance.mjs']='source-provenance.mjs';
  files['/feedback-reference.mjs']='feedback-reference.mjs';
  files['/text-teachback.mjs']='text-teachback.mjs';
  files['/question-review.mjs']='question-review.mjs';
  files['/question-review-ui.mjs']='question-review-ui.mjs';
  files['/material-set.mjs']='material-set.mjs';
  files['/material-continuation.mjs']='material-continuation.mjs';
  files['/material-set-ui.mjs']='material-set-ui.mjs';
  files['/judgement.mjs']='judgement.mjs';files['/judgement-ui.mjs']='judgement-ui.mjs';files['/schemas.mjs']='schemas.mjs';
  files['/conditional-practice.mjs']='conditional-practice.mjs';files['/practice-evidence-ui.mjs']='practice-evidence-ui.mjs';
  let busy=false,extracting=false;
  return http.createServer(async(req,res)=>{
    const expected=`127.0.0.1:${req.socket.localPort}`, origin=`http://${expected}`;
    const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; media-src 'self' blob:; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",'Permissions-Policy':'microphone=(self), camera=()'};
    const json=(status,data)=>{res.writeHead(status,{...headers,'Content-Type':'application/json'});res.end(JSON.stringify(data));};
    if(req.headers.host!==expected)return json(403,{error:'HOST_REJECTED'});
    const path=req.url?.split('?')[0];
    if(req.method==='GET' && files[path]){
      try {const file=files[path];res.writeHead(200,{...headers,'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':'text/javascript'});res.end(await readFile(new URL(file,import.meta.url)));}catch{json(500,{error:'FILE_UNAVAILABLE'});}return;
    }
    if(req.method==='GET' && path==='/api/status'){
      try{return json(200,{keyConfigured:!!process.env.OPENAI_API_KEY,ledger:book.summary(),models:['whisper-1','gpt-5.6-luna']});}
      catch{return json(503,{error:'BUDGET_UNAVAILABLE'});}
    }
    if(req.method==='GET' && path==='/api/health')return json(200,{app:'zhi-er-neng-jiang',apiVersion:1});
    if(req.method==='GET' && path==='/api/capabilities'){
      let imports;try{imports=await capabilityCall();}catch{imports={text:true,office:false,pdf:false};}
      return json(200,{app:'zhi-er-neng-jiang',apiVersion:1,ai:keyConfigured(),imports});
    }
    if(req.method!=='POST'||req.headers.origin!==origin||req.headers['x-study-request']!=='1')return json(403,{error:'ORIGIN_REJECTED'});
    if(!['/api/teach','/api/diagnose','/api/asr','/api/register','/api/extract'].includes(path))return json(404,{error:'NOT_FOUND'});
    const local=path==='/api/extract';
    if(!local&&!keyConfigured())return json(422,{error:'CREDENTIAL_MISSING'});
    if(local?extracting:busy)return json(409,{error:'REQUEST_IN_PROGRESS'});
    if(local)extracting=true;else busy=true;
    const controller=new AbortController();res.on('close',()=>{if(!res.writableEnded)controller.abort();});
    try {
      // Unknown budget state must fail before any paid-work dispatch or registration.
      if(path!=='/api/extract'){
        try{book.summary();}catch{return json(503,{error:'BUDGET_UNAVAILABLE'});}
      }
      // Allow six valid Chinese history messages to reach the provider's budget
      // selection; source, message and per-field limits still apply after parsing.
      const limit=path==='/api/extract'?10*1024*1024:path==='/api/asr'?5_760_044:path==='/api/teach'?128000:80000;const parts=[];let length=0;
      for await(const part of req){length+=part.length;requireValue(length<=limit,'INPUT_TOO_LARGE');parts.push(part);}
      const bytes=Buffer.concat(parts);
      if(path==='/api/extract')return json(200,await extractCall(bytes,req.headers['x-source-format']));
      if(path==='/api/asr'){
        let terms;try{terms=transcriptionTerms(decodeURIComponent(req.headers['x-transcription-terms']??''));}catch{throw Error('TRANSCRIPTION_TERMS_LIMIT');}
        waveDuration(bytes);book.register(req.headers['x-attempt-id']);
        return json(200,await asrCall(bytes,req.headers['x-attempt-id'],{book,signal:controller.signal,terms}));
      }
      requireValue(req.headers['content-type']==='application/json','CONTENT_TYPE');
      const b=JSON.parse(bytes.toString('utf8'));
      if(path==='/api/register'){book.register(b.attemptId);return json(200,{registered:true});}
      const source=sourceValue(b.source);
      if(path==='/api/teach'){
        requireValue(['learn','repair','apply','apply_answer'].includes(b.mode),'INVALID_MODE');
        if(b.practiceConditions){
          requireValue(['apply','apply_answer'].includes(b.mode),'INVALID_MODE');
          const context=practiceConditions(b.practiceConditions,source);
          const previousQuestions=b.previousQuestions??[];requireValue(Array.isArray(previousQuestions)&&previousQuestions.length<=3,'INVALID_PRACTICE_CONDITIONS');
          const input={source,mode:b.mode,practiceConditions:{issues:context.issues},
            ...(b.mode==='apply'?{previousQuestions:previousQuestions.map(q=>text(q,1000))}:{question:text(b.focus,1000),answer:text(b.message,2000)})};
          const result=await semanticCall(CONDITIONAL_PRACTICE,input,conditionalPracticeSchema,{signal:controller.signal});
          return json(200,{...result,value:validateConditionalResult(result.value,source,b.mode)});
        }
        const input={source,setupContext:setupContextValue(b.setupContext),mode:b.mode,message:text(b.message,2000),focus:b.mode==='repair'?repairFocus(b.focus):b.focus?text(b.focus,1000):null,history:Array.isArray(b.history)?b.history.slice(-6).map(m=>({role:m.role==='assistant'?'assistant':'user',text:text(m.text,m.role==='assistant'?TUTOR_MESSAGE_LIMIT:2500)})):[]};
        requireValue(b.contextNote==null||typeof b.contextNote==='string'&&b.contextNote.length<=1000,'INVALID_CONTEXT_NOTE');
        input.contextNote=b.contextNote?.trim()??'';
        const result=await semanticCall(TEACH,input,teachingSchema,{signal:controller.signal});return json(200,{...result,value:validateTeaching(result.value,source)});
      }
      const attempt=attemptValue(b.attempt), input=contentInput(source,attempt);
      if(b.channel==='content'){
        const issues=judgementIssues(b.judgementIssues,source);
        if(issues.length){
          const result=await semanticCall(CONTENT+JUDGEMENT,{...input,judgementIssues:issues},judgementSchema,{signal:controller.signal});
          return json(200,{...result,value:scopedReport(result.value,source,attempt,issues)});
        }
        const result=await semanticCall(CONTENT,input,findingsSchema,{signal:controller.signal});return json(200,{...result,value:validateFindings(result.value,source,attempt,'content')});
      }
      requireValue(attempt.inputMode!=='text'&&attempt.timing!=='recording'&&b.channel==='delivery'&&Array.isArray(b.events)&&b.events.length>0&&b.events.length<=8,'SOUND_EVIDENCE_INSUFFICIENT');
      const events=b.events.map(e=>{requireValue(e.confirmed===true&&e.type==='near_silence_candidate'&&typeof e.id==='string'&&Number.isFinite(e.start)&&Number.isFinite(e.end)&&e.start>=0&&e.end>e.start&&e.end<=attempt.duration,'INVALID_EVENT');return {id:e.id,type:e.type,start:e.start,end:e.end};});
      const result=await semanticCall(DELIVERY,{...input,attempt,events},deliverySchema,{signal:controller.signal});return json(200,{...result,value:validateFindings(result.value,source,attempt,'delivery',events)});
    }catch(e){const safe=/^[A-Z][A-Z0-9_]+$/.test(e.message)?e.message:'REQUEST_FAILED';json(422,{error:safe});}
    finally{if(local)extracting=false;else busy=false;}
  });
}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const server=createServer();server.listen(4317,'127.0.0.1',()=>console.log('Study Teach-back: http://127.0.0.1:4317 (loopback only)'));
  process.on('SIGINT',()=>server.close(()=>process.exit(0)));
}
