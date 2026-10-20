const normalize=value=>String(value??'').normalize('NFKC').toLocaleLowerCase();
function fields(topic) {
  return [
    ['主题',topic.source.title],['材料',topic.source.text],['草稿',topic.chatDraft],
    ...(topic.messages??[]).map(m=>['对话',m.text]),
    ...(topic.attempts??[]).flatMap(a=>[
      ['转写',a.raw?.text],...(a.raw?.spans??[]).map(s=>['转写',s.text]),
      ...(a.corrections??[]).flatMap(v=>v.spans.map(s=>['修订',s.text])),
      ...(a.reports??[]).flatMap(r=>(r.findings??[]).map(f=>['反馈',f.message]))
    ]),
    ...(topic.practiceRounds??[]).flatMap(r=>[
      ['练习',r.question],['草稿',r.draft],...r.answers.flatMap(a=>[['回答',a.text],['反馈',a.result]])
    ]),
    ['练习',topic.apply?.question],['回答',topic.apply?.answer]
  ].filter(([,text])=>typeof text==='string'&&text.length);
}
export function hasDraft(topic) {
  return !!topic.chatDraft?.trim() || !!topic.practiceRounds?.some(r=>r.draft?.trim());
}
export function searchRecords(records, query='', filter='all') {
  const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
  return records.flatMap(topic=>{
    if(filter==='draft'&&!hasDraft(topic) || filter==='audio'&&!topic.attempts.length ||
      filter==='practice'&&!topic.practiceRounds?.length&&!topic.apply)return [];
    const content=fields(topic);
    if(!terms.every(term=>content.some(([,text])=>normalize(text).includes(term))))return [];
    const match=terms.length?content.find(([,text])=>terms.some(term=>normalize(text).includes(term))):null;
    let snippet='';
    if(match) {
      const [label,text]=match, at=Math.max(0,normalize(text).indexOf(terms.find(term=>normalize(text).includes(term)))-24);
      snippet=`${label} · ${at?'…':''}${text.slice(at,at+100)}${text.length>at+100?'…':''}`;
    }
    return [{topic,snippet}];
  });
}
