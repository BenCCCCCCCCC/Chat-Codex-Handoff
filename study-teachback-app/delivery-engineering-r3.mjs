import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {observations,normalizeASR,validateFindings} from './core.mjs';
import {semantic,ledger} from './provider.mjs';
import {DELIVERY,deliverySchema} from './schemas.mjs';
const out=new URL('../artifacts/study-teachback/build-01r3/DELIVERY_ENGINEERING.json',import.meta.url);
if(existsSync(out))throw Error('DELIVERY_CHECK_ALREADY_STARTED');
const b=readFileSync(new URL('./runtime/synthetic-mandarin-v2.wav',import.meta.url));let pcm;
for(let o=12;o+8<=b.length;){const n=b.readUInt32LE(o+4);if(b.toString('ascii',o,o+4)==='data'){pcm=Float32Array.from({length:n/2},(_,i)=>b.readInt16LE(o+8+i*2)/32768);break;}o+=8+n+(n%2);}
const acoustic=observations([pcm],16000),raw=normalizeASR(JSON.parse(readFileSync(new URL('../artifacts/study-teachback/build-01r2/SYNTHETIC_ASR_FIELDS.json',import.meta.url))),7.31);
const source={id:'delivery-source',title:'合成工程材料',text:raw.text};
const attempt={id:'delivery-fixture',sourceId:source.id,transcriptVersion:'saved-fifth',duration:7.31,spans:raw.spans,reviewed:false};
const receipt={kind:'LIVE_LUNA_ON_EXISTING_SYNTHETIC_MECHANICAL_OBSERVATIONS',ownerConfirmed:false,physicalMic:false,acoustic,source,attempt,paidWhisperCalls:0};
writeFileSync(out,JSON.stringify({...receipt,status:'STARTED'}),{flag:'wx'});
try{const r=await semantic(DELIVERY+' 本次是合成音频的工程测试，没有用户回听确认。只能描述给定近静音机械候选，不能声称已经影响真实用户表达，不得评价流利度或知识；可返回空findings表示证据不足。',{source,attempt,events:acoustic.events,confirmation:'NOT_OWNER_CONFIRMED_ENGINEERING_ONLY'},deliverySchema);validateFindings(r.value,source,attempt,'delivery',acoustic.events);Object.assign(receipt,{status:'REFERENCE_SCHEMA_VALID_REVIEW_REQUIRED',...r});}catch(e){receipt.status='BLOCKED';receipt.category=/^[A-Z_0-9]+$/.test(e.message)?e.message:'REQUEST_FAILED';}
receipt.ledger=ledger.summary();writeFileSync(out,JSON.stringify(receipt,null,2));console.log(JSON.stringify(receipt,null,2));
