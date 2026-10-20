import {observations,waveBytes} from './core.mjs';

export const AUDIO_LIMIT=25*1024*1024;
const formats={wav:'audio/wav',mp3:'audio/mpeg',m4a:'audio/mp4',mp4:'audio/mp4',webm:'audio/webm',ogg:'audio/ogg',flac:'audio/flac',aac:'audio/aac'};
export function audioFile(file){
  if(!file.size)throw Error('NO_AUDIO');
  if(file.size>AUDIO_LIMIT)throw Error('AUDIO_TOO_LARGE');
  const mime=formats[file.name.split('.').pop().toLowerCase()];
  if(!mime)throw Error('AUDIO_FORMAT_UNSUPPORTED');
  // MIME metadata may be empty or video/mp4 for audio-only files. Keep bytes intact.
  return new Blob([file],{type:mime});
}
const prepared=new WeakMap();
export async function prepareAudio(audio,interrupted=false){
  if(prepared.has(audio)&&!interrupted)return prepared.get(audio);
  const context=new AudioContext();
  try{
    let decoded;
    try{decoded=await context.decodeAudioData(await audio.arrayBuffer());}
    catch{throw Error('AUDIO_DECODE_FAILED');}
    if(!Number.isFinite(decoded.duration)||decoded.duration<=0||decoded.duration>180)throw Error('DURATION_LIMIT');
    const offline=new OfflineAudioContext(1,Math.ceil(decoded.duration*16000),16000);
    const source=offline.createBufferSource();source.buffer=decoded;source.connect(offline.destination);source.start();
    const normalized=await offline.startRendering(),pcm=normalized.getChannelData(0);
    // Inspect exactly the mono signal sent to ASR, including both stereo channels.
    const value={duration:decoded.duration,wav:waveBytes(pcm),observation:observations([pcm],16000,interrupted)};
    if(!interrupted)prepared.set(audio,value);
    return value;
  }finally{await context.close();}
}
