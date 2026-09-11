import { spawn } from 'node:child_process';
import { isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

export function extractSource(bytes, kind, {python=process.env.STUDY_PYTHON || fileURLToPath(new URL(process.platform==='win32'?'./.venv/Scripts/python.exe':'./.venv/bin/python',import.meta.url))}={}) {
  if(!['md','txt','pdf','docx','pptx'].includes(kind))throw new Error('FORMAT_UNSUPPORTED');
  if(bytes.length>10*1024*1024)throw new Error('FILE_TOO_LARGE');
  if(!isAbsolute(python))throw new Error('EXTRACTOR_SETUP_REQUIRED');
  return new Promise((resolve,reject)=>{
    const child=spawn(python,['-I',fileURLToPath(new URL('./extract_source.py',import.meta.url)),kind],{windowsHide:true,stdio:['pipe','pipe','ignore'],env:{SystemRoot:process.env.SystemRoot}});
    let output='',done=false;
    const finish=(error,value)=>{if(done)return;done=true;clearTimeout(timer);error?reject(new Error(error)):resolve(value);};
    const timer=setTimeout(()=>{child.kill();finish('EXTRACTION_TIMEOUT');},15000);
    child.on('error',()=>finish('EXTRACTOR_SETUP_REQUIRED'));
    child.stdin.on('error',()=>{});
    child.stdout.on('data',chunk=>{output+=chunk.toString();if(output.length>2_000_000){child.kill();finish('DOCUMENT_LIMIT');}});
    child.on('close',code=>{if(code!==0)return finish('INVALID_DOCUMENT');try{const result=JSON.parse(output);finish(result.error,result);}catch{finish('INVALID_DOCUMENT');}});
    child.stdin.end(bytes);
  });
}
