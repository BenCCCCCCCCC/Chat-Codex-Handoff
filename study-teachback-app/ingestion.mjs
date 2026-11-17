import { spawn } from 'node:child_process';
import { isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultPython=()=>process.env.STUDY_PYTHON || fileURLToPath(new URL(process.platform==='win32'?'./.venv/Scripts/python.exe':'./.venv/bin/python',import.meta.url));
export function extractSource(bytes, kind, {python=defaultPython()}={}) {
  if(!['md','txt','pdf','docx','pptx'].includes(kind))throw new Error('FORMAT_UNSUPPORTED');
  if(bytes.length>10*1024*1024)throw new Error('FILE_TOO_LARGE');
  if(kind==='txt'||kind==='md'){
    let value;
    const encoding=bytes[0]===0xff&&bytes[1]===0xfe?'utf-16le':bytes[0]===0xfe&&bytes[1]===0xff?'utf-16be':'utf-8';
    try{value=new TextDecoder(encoding,{fatal:true}).decode(bytes);}catch{throw Error('TEXT_ENCODING_UNSUPPORTED');}
    if(value.includes('\0'))throw Error('INVALID_DOCUMENT');
    if([...value].length>200000)throw Error('DOCUMENT_LIMIT');
    if(!value.trim())throw Error('NO_EXTRACTABLE_TEXT');
    return {blocks:[{label:'全文',text:value}]};
  }
  return runExtractor(bytes,kind,python);
}
export async function extractionCapabilities({python=defaultPython()}={}){
  try{return await runExtractor(Buffer.alloc(0),'--capabilities',python);}
  catch{return {text:true,office:false,pdf:false};}
}
function runExtractor(bytes,kind,python){
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
