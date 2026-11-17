// Offsets always refer to the actual selected text. No page or quote inference.
export function importedDocument(blocks,fileName){
  let offset=0;
  const regions=blocks.map(block=>{const region={label:block.label??'正文',start:offset,end:offset+block.text.length};offset=region.end+2;return region;});
  return {fileName,text:blocks.map(block=>block.text).join('\n\n'),regions};
}
export function selectedProvenance(document,start=0,end=document?.text.length){
  if(!document)return null;
  const raw=document.text.slice(start,end),text=raw.trim();
  if(!text)return null;
  const begin=start+raw.length-raw.trimStart().length,stop=begin+text.length;
  const regions=document.regions.filter(r=>r.end>begin&&r.start<stop&&r.end>r.start)
    .map(r=>({label:r.label,start:Math.max(r.start,begin)-begin,end:Math.min(r.end,stop)-begin}));
  if(!regions.length)return null;
  return {fileName:document.fileName,text,regions};
}
export function validateSourceProvenance(source){
  const p=source.provenance;if(p==null)return;
  const check=value=>{if(!value)throw Error('INVALID_SOURCE_PROVENANCE');};
  check(typeof p.fileName==='string'&&p.fileName.length>0&&p.fileName.length<=260&&p.text===source.text);
  check(Array.isArray(p.regions)&&p.regions.length>0&&p.regions.length<=100);
  let end=0;
  for(const r of p.regions){
    check(typeof r.label==='string'&&r.label.length>0&&r.label.length<=100);
    check(Number.isInteger(r.start)&&Number.isInteger(r.end)&&r.start>=end&&r.end>r.start&&r.end<=source.text.length);
    end=r.end;
  }
}
export function quoteLocations(source,quote){
  if(!quote)return [];
  let regions=[];try{validateSourceProvenance(source);regions=source.provenance?.regions??[];}catch{}
  const result=[];
  for(let start=source.text.indexOf(quote);start>=0;start=source.text.indexOf(quote,start+1)){
    result.push({start,end:start+quote.length,labels:[...new Set(regions.filter(r=>r.start<start+quote.length&&r.end>start).map(r=>r.label))]});
  }
  return result;
}

export function renderMaterial({textNode,locationNode,source,quote=null}){
  textNode.replaceChildren();
  let provenance;try{validateSourceProvenance(source);provenance=source.provenance;}catch{}
  const matches=quoteLocations(source,quote),intervals=[];
  for(const match of matches){
    if(intervals.at(-1)?.end>=match.start)intervals.at(-1).end=Math.max(intervals.at(-1).end,match.end);
    else intervals.push({...match});
  }
  let cursor=0,first=null;
  for(const match of intervals){
    textNode.append(document.createTextNode(source.text.slice(cursor,match.start)));
    const mark=document.createElement('mark');mark.textContent=source.text.slice(match.start,match.end);
    textNode.append(mark);first??=mark;cursor=match.end;
  }
  textNode.append(document.createTextNode(source.text.slice(cursor)));
  const labels=quote?[...new Set(matches.flatMap(m=>m.labels))]:[...new Set(provenance?.regions.map(r=>r.label)??[])];
  locationNode.textContent=(provenance?`${provenance.fileName} · ${labels.join(' / ')}`:'手动输入或历史材料 · 未记录原文件页码')+
    (quote?(matches.length>1?` · 引文出现 ${matches.length} 处，均已标出`:matches.length?' · 已定位反馈引文':' · 此材料中未找到引文'):'');
  return first??textNode;
}
