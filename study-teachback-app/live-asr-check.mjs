import {readFileSync,writeFileSync} from 'node:fs';
import {transcribe,ledger} from './provider.mjs';
import {waveBytes,observations} from './core.mjs';
const raw=readFileSync(new URL('./runtime/synthetic-mandarin-v2.wav',import.meta.url));
let pcm;for(let offset=12;offset+8<=raw.length;){const name=raw.toString('ascii',offset,offset+4),size=raw.readUInt32LE(offset+4);if(name==='data'){pcm=Float32Array.from({length:size/2},(_,i)=>raw.readInt16LE(offset+8+i*2)/32768);break;}offset+=8+size+(size%2);}
if(!pcm)throw new Error('NO_PCM_FIXTURE');
const receipt={at:new Date().toISOString(),kind:'REAL_WHISPER_API_SYNTHETIC_WINDOWS_VOICE',voice:'Microsoft Huihui Desktop',ownerSpeech:false,sourceText:'只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。',duration:pcm.length/16000,observation:observations([pcm],16000)};
try{const result=await transcribe(new Uint8Array(waveBytes(pcm)),'synthetic-mandarin-build01',{fetcher:async(url,options)=>{const response=await fetch(url,options);if(response.ok)receipt.providerOutput=await response.clone().json();return response;}});receipt.result=result;receipt.status='TIMESTAMP_TRANSPORT_PASS_REPLAY_REVIEW_REQUIRED';}
catch(e){receipt.status='PARTIAL';receipt.category=e.message;}
receipt.ledger=ledger.summary();writeFileSync(new URL(`./evidence/live-asr-${Date.now()}.json`,import.meta.url),JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));
