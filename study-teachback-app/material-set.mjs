import {sourceValue,identifier,text,requireValue} from './core.mjs';

// Each material combination keeps the existing single-source learning record intact.
// The topic remains the retention/export unit; switching never changes its age.
const learningKeys=['source','goals','selectedGoal','repairRef','anchorVersion','messages','attempts','mode','resume','question','focus','chatDraft','contextNote','chatRequest','practiceRounds','activePracticeId','practiceRequest','taskUnavailable','textDraft','transcriptionTerms','apply','continuationIntent'];
export const materialList=topic=>topic.materials??[topic.source];
// Source IDs are immutable snapshots. Lineage is separate so old reports and
// condition quotes keep their exact names, text and page locations.
export const materialVersion=(topic,id)=>topic.materialVersions?.find(v=>v.id===id)??{id,rootId:id,number:1};
export const currentMaterials=topic=>materialList(topic).filter(m=>!topic.materialVersions?.some(v=>v.parentId===m.id));
export const materialLabel=(topic,id)=>{const m=materialList(topic).find(m=>m.id===id);return m?`${m.title} · v${materialVersion(topic,id).number}`:'历史材料';};
export function revisedMaterialSelection(topic,id){
  const root=materialVersion(topic,id).rootId,selected=topic.activeMaterialIds??[topic.source.id];
  return [...new Set([...selected.filter(s=>materialVersion(topic,s).rootId!==root),id])];
}
export function reviseMaterial(topic,draft,{uid=()=>crypto.randomUUID(),now=Date.now}={}){
  const base=materialList(topic).find(m=>m.id===draft.baseId);
  requireValue(base&&currentMaterials(topic).some(m=>m.id===base.id),'MATERIAL_VERSION_CHANGED');
  const title=text(draft.title.trim(),120),value=text(draft.text.trim(),5000);
  requireValue(title!==base.title||value!==base.text,'MATERIAL_UNCHANGED');
  const source={id:uid(),title,text:value};
  // Edited text is a new local selection; old page offsets are no longer true.
  if(value===base.text&&base.provenance)source.provenance=structuredClone(base.provenance);
  sourceValue(source);requireValue(!materialList(topic).some(m=>m.id===source.id),'INVALID_MATERIAL_SET');
  const note=draft.note?.trim()??'';requireValue(typeof note==='string'&&note.length<=500,'INVALID_MATERIAL_SET');
  const parent=materialVersion(topic,base.id),createdAt=now();requireValue(Number.isFinite(createdAt)&&createdAt>0,'INVALID_MATERIAL_SET');
  initializeMaterials(topic);topic.materials.push(source);
  (topic.materialVersions??=[]).push({id:source.id,rootId:parent.rootId,parentId:base.id,number:parent.number+1,createdAt,kind:value===base.text?'rename':'revision',note});
  delete topic.materialRevisionDraft;return source;
}
export const learningContexts=topic=>[topic,...(topic.studyContexts??[])];
export function initializeMaterials(topic){
  if(topic.materials)return;
  topic.studyTitle=topic.source.title;topic.materials=[structuredClone(topic.source)];topic.activeMaterialIds=[topic.source.id];topic.studyContexts=[];
}
export function materialSource(materials,ids,uid=()=>crypto.randomUUID()){
  requireValue(Array.isArray(ids)&&ids.length>0&&new Set(ids).size===ids.length,'MATERIAL_SELECTION_REQUIRED');
  const chosen=materials.filter(m=>ids.includes(m.id));requireValue(chosen.length===ids.length,'INVALID_MATERIAL_SET');
  if(chosen.length===1)return structuredClone(chosen[0]);
  let value='',regions=[];
  for(const [i,m] of chosen.entries()){
    value+=(i?'\n\n':'')+`【材料 ${i+1}：${m.title}】\n`;const start=value.length;value+=m.text;
    for(const r of m.provenance?.regions??[{label:'原文',start:0,end:m.text.length}])regions.push({label:`${m.title} · ${r.label}`.slice(0,100),start:start+r.start,end:start+r.end});
  }
  requireValue(value.length<=5000,'MATERIAL_SELECTION_TOO_LARGE');
  requireValue(regions.length<=100,'MATERIAL_SELECTION_TOO_LARGE');
  return {id:uid(),title:chosen.map(m=>m.title).join(' + ').slice(0,120),text:value,provenance:{fileName:'本次材料组合',text:value,regions}};
}
const sameSelection=(a,b)=>a.length===b.length&&a.every(id=>b.includes(id));
export function selectMaterials(topic,ids,{uid=()=>crypto.randomUUID()}={}){
  const materials=materialList(topic),source=materialSource(materials,ids,uid);
  initializeMaterials(topic);
  const selected=materials.filter(m=>ids.includes(m.id)).map(m=>m.id);
  if(sameSelection(topic.activeMaterialIds,selected))return false;
  const existing=topic.studyContexts.find(c=>sameSelection(c.materialIds,selected));
  const previous={id:topic.source.id,materialIds:[...topic.activeMaterialIds]};
  for(const key of learningKeys)if(topic[key]!==undefined)previous[key]=topic[key];
  const next=existing??{source,goals:[],messages:[],attempts:[],mode:'learn',resume:{view:'learn'}};
  topic.studyContexts=topic.studyContexts.filter(c=>c!==existing);topic.studyContexts.push(previous);
  for(const key of learningKeys)delete topic[key];
  for(const key of learningKeys)if(next[key]!==undefined)topic[key]=next[key];
  topic.activeMaterialIds=selected;return true;
}
export function selectContext(topic,contextId){
  if(topic.source.id===contextId)return;
  const context=topic.studyContexts?.find(c=>c.id===contextId);requireValue(context,'STUDY_CONTEXT_MISSING');
  selectMaterials(topic,context.materialIds);
}
export function addMaterial(topic,draft,{uid=()=>crypto.randomUUID()}={}){
  const source={id:uid(),title:text(draft.title.trim(),120),text:text(draft.text.trim(),5000),...(draft.provenance?{provenance:structuredClone(draft.provenance)}:{})};
  sourceValue(source);requireValue(currentMaterials(topic).length<12,'MATERIAL_LIMIT');
  initializeMaterials(topic);topic.materials.push(source);delete topic.materialDraft;return source;
}
export function saveStudyIssue(topic,{question='',condition='',status='deferred',evidence=[]},{uid=()=>crypto.randomUUID(),now=Date.now}={}){
  const item={id:uid(),createdAt:now(),question:text(question.trim(),500),condition:condition.trim(),status,evidence:structuredClone(evidence),contextId:topic.source.id,resume:structuredClone(topic.resume??{view:'learn'})};
  if(item.resume.view==='practice')item.resume.roundId=topic.activePracticeId??topic.practiceRounds?.at(-1)?.id;
  validateIssue(topic,item);initializeMaterials(topic);(topic.studyIssues??=[]).push(item);delete topic.issueDraft;return item;
}
function validateIssue(topic,item){
  identifier(item.id);requireValue(Number.isFinite(item.createdAt)&&item.createdAt>0,'INVALID_STUDY_ISSUE');text(item.question,500);
  requireValue(['deferred','condition'].includes(item.status)&&typeof item.condition==='string'&&item.condition.length<=1000,'INVALID_STUDY_ISSUE');
  if(item.status==='condition')text(item.condition,1000);
  requireValue(Array.isArray(item.evidence)&&item.evidence.length>0&&item.evidence.length<=12,'ISSUE_EVIDENCE_REQUIRED');
  for(const e of item.evidence){const source=materialList(topic).find(m=>m.id===e.materialId);requireValue(source&&typeof e.quote==='string'&&e.quote.trim()&&e.quote.length<=1500&&source.text.includes(e.quote),'ISSUE_EVIDENCE_REQUIRED');}
  requireValue(learningContexts(topic).some(c=>c.source.id===item.contextId),'STUDY_CONTEXT_MISSING');
  requireValue(['learn','attempt','practice'].includes(item.resume?.view),'INVALID_STUDY_ISSUE');
  if(item.resume.attemptId!=null)identifier(item.resume.attemptId);
  if(item.resume.roundId!=null)identifier(item.resume.roundId);
}
export function validateMaterialSet(topic){
  if(topic.materials==null){requireValue(!topic.studyContexts?.length&&!topic.studyIssues?.length&&!topic.materialVersions&&!topic.materialRevisionDraft,'INVALID_MATERIAL_SET');return;}
  const materials=topic.materials;requireValue(Array.isArray(materials)&&materials.length>0,'INVALID_MATERIAL_SET');
  const ids=new Set();for(const m of materials){sourceValue(m);requireValue(!ids.has(m.id),'INVALID_MATERIAL_SET');ids.add(m.id);}
  requireValue(topic.materialVersions==null||Array.isArray(topic.materialVersions),'INVALID_MATERIAL_SET');
  const lineage=new Map(),parents=new Set();
  for(const v of topic.materialVersions??[]){
    identifier(v.id);identifier(v.rootId);identifier(v.parentId);
    const parent=lineage.get(v.parentId)??{rootId:v.parentId,number:1},before=materials.findIndex(m=>m.id===v.parentId),after=materials.findIndex(m=>m.id===v.id);
    requireValue(!topic.materialVersions.some(w=>w.id===v.rootId)&&(!topic.materialVersions.some(w=>w.id===v.parentId)||lineage.has(v.parentId)),'INVALID_MATERIAL_SET');
    requireValue(ids.has(v.id)&&ids.has(v.rootId)&&before>=0&&after>before&&!lineage.has(v.id)&&!parents.has(v.parentId)&&v.rootId===parent.rootId&&v.number===parent.number+1&&Number.isFinite(v.createdAt)&&v.createdAt>0&&['rename','revision'].includes(v.kind)&&typeof v.note==='string'&&v.note.length<=500,'INVALID_MATERIAL_SET');
    if(v.kind==='rename')requireValue(materials[before].text===materials[after].text&&JSON.stringify(materials[before].provenance)===JSON.stringify(materials[after].provenance),'INVALID_MATERIAL_SET');
    lineage.set(v.id,v);parents.add(v.parentId);
  }
  requireValue(materials.length-lineage.size<=12,'INVALID_MATERIAL_SET');
  text(topic.studyTitle,120);requireValue(Array.isArray(topic.studyContexts),'INVALID_MATERIAL_SET');
  const contextIds=new Set(),selections=new Set();
  for(const c of learningContexts(topic)){
    requireValue(c===topic||!c.materials&&!c.studyContexts&&!c.studyIssues,'INVALID_MATERIAL_SET');
    const chosen=c===topic?topic.activeMaterialIds:c.materialIds;
    const expected=materialSource(materials,chosen,()=>c.source.id),key=[...chosen].sort().join(',');
    requireValue(!contextIds.has(c.source.id)&&!selections.has(key),'INVALID_MATERIAL_SET');contextIds.add(c.source.id);selections.add(key);
    requireValue(c===topic||c.id===c.source.id,'INVALID_MATERIAL_SET');
    for(const field of ['id','title','text','provenance'])requireValue(JSON.stringify(c.source[field])===JSON.stringify(expected[field]),'INVALID_MATERIAL_SET');
  }
  if(topic.materialDraft){const d=topic.materialDraft;requireValue(typeof d.title==='string'&&d.title.length<=120&&typeof d.text==='string'&&d.text.length<=5000,'INVALID_MATERIAL_SET');if(d.provenance)sourceValue({id:'draft',...d,title:d.title||'未命名'});}
  if(topic.materialRevisionDraft){const d=topic.materialRevisionDraft;requireValue(ids.has(d.baseId)&&typeof d.title==='string'&&d.title.length<=120&&typeof d.text==='string'&&d.text.length<=5000&&typeof d.note==='string'&&d.note.length<=500,'INVALID_MATERIAL_SET');}
  if(topic.issueDraft){
    const d=topic.issueDraft;requireValue(typeof d.question==='string'&&d.question.length<=500&&typeof d.condition==='string'&&d.condition.length<=1000&&['deferred','condition'].includes(d.status),'INVALID_STUDY_ISSUE');
    requireValue(Array.isArray(d.evidence)&&d.evidence.length<=12&&d.evidence.every(e=>ids.has(e.materialId)&&typeof e.quote==='string'&&e.quote.length<=1500),'INVALID_STUDY_ISSUE');
  }
  requireValue(topic.studyIssues==null||Array.isArray(topic.studyIssues),'INVALID_STUDY_ISSUE');const issueIds=new Set();
  for(const item of topic.studyIssues??[]){validateIssue(topic,item);requireValue(!issueIds.has(item.id),'INVALID_STUDY_ISSUE');issueIds.add(item.id);}
}
