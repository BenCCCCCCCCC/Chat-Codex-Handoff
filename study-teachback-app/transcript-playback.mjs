// Playback ranges use provider boundaries, never reconstructed word timestamps.
export function wordPlayback(raw,wordId){
  const words=Array.isArray(raw.words)?raw.words:[],index=words.findIndex(w=>w?.id===wordId),word=words[index];
  if(!word)return null;
  const spans=raw.spans.filter(s=>word.start>=s.start&&word.end<=s.end);
  if(spans.length!==1)return null;
  const span=spans[0],valid=w=>w?.usable===true&&Number.isFinite(w.start)&&Number.isFinite(w.end)&&w.end>w.start&&w.start>=span.start&&w.end<=span.end;
  if(valid(word))return {level:'word',start:word.start,end:word.end};
  const before=words.slice(0,index).reverse().find(valid),after=words.slice(index+1).find(valid);
  if(before&&after&&before.end<=word.start&&after.start>=word.end&&after.end-before.start<=3)
    return {level:'context',start:before.start,end:after.end};
  return {level:'segment',start:span.start,end:span.end};
}
export function rawPlaybackParts(raw){
  if(!raw?.text||!Array.isArray(raw.words)||!raw.words.length)return [{text:raw?.text??'尚未取得转写'}];
  const parts=[];let cursor=0;
  for(const word of raw.words){
    if(typeof word?.text!=='string'||!word.text||typeof word.id!=='string')return [{text:raw.text}];
    const at=raw.text.indexOf(word.text,cursor);
    // Cannot establish text-to-word mapping: keep plain original text.
    if(!word.text||at<0)return [{text:raw.text}];
    if(at>cursor)parts.push({text:raw.text.slice(cursor,at)});
    parts.push({text:word.text,wordId:word.id,anchor:wordPlayback(raw,word.id)});
    cursor=at+word.text.length;
  }
  if(cursor<raw.text.length)parts.push({text:raw.text.slice(cursor)});
  return parts;
}
// A corrected or ambiguous quote has no trustworthy word mapping. Keep its segment.
export function quotePlayback(raw,confirmedSpan,quote){
  if(!confirmedSpan)return null;
  const fallback={level:'segment',start:confirmedSpan.start,end:confirmedSpan.end};
  const span=raw?.spans?.find(s=>s.id===confirmedSpan.id);
  if(!span||span.text!==confirmedSpan.text||span.start!==confirmedSpan.start||span.end!==confirmedSpan.end||!quote)return fallback;
  const at=span.text.indexOf(quote),end=at+quote.length;
  if(at<0||span.text.indexOf(quote,at+1)>=0)return fallback;
  const words=(raw.words??[]).filter(w=>w.start>=span.start&&w.end<=span.end);
  const selected=[];let cursor=0,covered=at,contextual=false;
  for(const word of words){
    if(!word.text)return fallback;
    const from=span.text.indexOf(word.text,cursor),to=from+word.text.length;
    if(from<0)return fallback;
    cursor=to;
    if(from>=end||to<=at)continue;
    if(/[\p{L}\p{N}]/u.test(span.text.slice(covered,from)))return fallback;
    const anchor=wordPlayback(raw,word.id);
    if(!anchor||anchor.level==='segment')return fallback;
    contextual ||= anchor.level==='context';
    selected.push(anchor);covered=Math.min(to,end);
  }
  if(!selected.length||/[\p{L}\p{N}]/u.test(span.text.slice(covered,end)))return fallback;
  const start=Math.min(...selected.map(w=>w.start)),stop=Math.max(...selected.map(w=>w.end));
  if(stop<=start||(contextual&&stop-start>6))return fallback;
  return {level:contextual?'quote-context':'quote',start:Math.max(span.start,start-.3),end:Math.min(span.end,stop+.3)};
}
export function playbackLabel(anchor){
  return `${anchor.level==='quote-context'?'原话邻近范围，非精确词时间':anchor.level==='quote'?'原话附近':anchor.level==='word'?'词级参考':anchor.level==='context'?'邻近范围，非独立词时间':'整段回听'} ${anchor.start.toFixed(1)}–${anchor.end.toFixed(1)} 秒`;
}
export function renderRawPlayback(container,raw,onPlay,onStatus){
  container.replaceChildren();
  for(const part of rawPlaybackParts(raw)){
    if(!part.anchor){container.append(document.createTextNode(part.text));continue;}
    const button=document.createElement('button'),label=playbackLabel(part.anchor);
    button.type='button';button.className='word-link';button.textContent=part.text;
    button.dataset.timing=part.anchor.level;button.dataset.wordId=part.wordId;
    button.title=label;button.setAttribute('aria-label',`回听“${part.text}”：${label}`);
    button.onclick=()=>{onStatus(label);onPlay(part.anchor);};
    container.append(button);
  }
}
