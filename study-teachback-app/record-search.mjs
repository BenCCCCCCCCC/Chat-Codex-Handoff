const normalize=value=>String(value??'').normalize('NFKC').toLocaleLowerCase();
const field=(label,text,target)=>({label,text,target,key:JSON.stringify(target)});
function fields(topic) {
  return [
    field('主题',topic.source.title,{kind:'title'}),
    field('材料',topic.source.text,{kind:'source'}),
    field('草稿',topic.chatDraft,{kind:'chatDraft'}),
    field('对话要点',topic.contextNote,{kind:'contextNote'}),
    ...(topic.messages??[]).map((m,index)=>field('对话',m.text,{kind:'message',index})),
    ...(topic.attempts??[]).flatMap(a=>[
      ...[a.raw,...(a.corrections??[])].filter(Boolean).flatMap(v=>
        v.spans.map(s=>field(v===a.raw?'原始转写':'修订文字',s.text,{kind:'transcript',attemptId:a.id,versionId:v.id,spanId:s.id}))),
      ...(a.transcriptDraft?.edits??[]).map(s=>field('核对草稿',s.text,{kind:'transcriptDraft',attemptId:a.id,spanId:s.id})),
      ...(a.reports??[]).flatMap((r,reportIndex)=>(r.findings??[]).map((f,index)=>
        field('反馈',f.message,{kind:'report',attemptId:a.id,reportIndex,index})))
    ]),
    ...(topic.practiceRounds??[]).flatMap(r=>[
      field('练习',r.question,{kind:'practice',roundId:r.id}),
      field('草稿',r.task?r.task.exercise.choices.find(c=>c.id===r.draft)?.label:r.draft,{kind:'practice',roundId:r.id,part:'draft'}),
      ...r.answers.flatMap(a=>[
        field('回答',a.text,{kind:'practice',roundId:r.id,answerId:a.id}),
        field('反馈',a.result,{kind:'practice',roundId:r.id,answerId:a.id,part:'result'})
      ])
    ]),
    ...(!topic.practiceRounds?.length&&topic.apply?[
      field('练习',topic.apply.question,{kind:'practice',roundId:topic.apply.id??'legacy-practice'}),
      field('回答',topic.apply.answer,{kind:'practice',roundId:topic.apply.id??'legacy-practice',answerId:'legacy-answer'}),
      field('反馈',topic.apply.result,{kind:'practice',roundId:topic.apply.id??'legacy-practice',answerId:'legacy-answer',part:'result'})
    ]:[])
  ].filter(({text})=>typeof text==='string'&&text.length);
}
export function hasDraft(topic) {
  return !!topic.chatDraft?.trim() || !!topic.practiceRounds?.some(r=>r.draft?.trim()) ||
    !!topic.attempts?.some(a=>a.transcriptDraft);
}
export function resolveRecordHit(topic,key) {return fields(topic).find(f=>f.key===key)??null;}
export function searchRecords(records, query='', filter='all') {
  const terms=normalize(query).trim().split(/\s+/).filter(Boolean);
  return records.flatMap(topic=>{
    if(filter==='draft'&&!hasDraft(topic) || filter==='audio'&&!topic.attempts.length ||
      filter==='practice'&&!topic.practiceRounds?.length&&!topic.apply)return [];
    const content=fields(topic);
    if(!terms.every(term=>content.some(({text})=>normalize(text).includes(term))))return [];
    const hits=terms.length?content.filter(({text})=>terms.some(term=>normalize(text).includes(term))).map(f=>{
      const at=Math.max(0,normalize(f.text).indexOf(terms.find(term=>normalize(f.text).includes(term)))-24);
      return {...f,snippet:`${f.label} · ${at?'…':''}${f.text.slice(at,at+100)}${f.text.length>at+100?'…':''}`};
    }):[];
    return [{topic,hits,snippet:hits[0]?.snippet??''}];
  });
}
