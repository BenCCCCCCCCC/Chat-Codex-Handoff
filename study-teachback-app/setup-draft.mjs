import {RETENTION_MS} from './core.mjs';

export const SETUP_DRAFT_KEY='study-setup-draft-v1';
const fields=['source','title','setupFocus','setupKnown'];
const empty=()=>Object.fromEntries(fields.map(key=>[key,'']));
const valid=value=>value&&fields.every(key=>typeof value[key]==='string');

// Small, synchronous saves protect the setup page even before a topic exists.
// The creation date, like a topic's, is not extended by subsequent edits.
export function mountSetupDraft({$,storage,now=Date.now}){
  let state=null,dirty=false;
  const values=()=>Object.fromEntries(fields.map(key=>[key,$(key).value]));
  const filled=value=>fields.some(key=>value[key].trim());
  function status(message){
    $('setupDraftStatus').textContent=message;
    $('setupDraftRetry').hidden=!dirty;
    $('undoImport').hidden=!state?.undo;
  }
  function flush(){
    if(!dirty)return;
    try{
      if(state)storage.setItem(SETUP_DRAFT_KEY,JSON.stringify(state));
      else storage.removeItem(SETUP_DRAFT_KEY);
      dirty=false;status(state?'新建草稿已保存在本机 · 从创建起保留七天':'');
    }catch{
      status('新建草稿尚未保存。请重试保存，或复制文字后再离开。');
      throw Error('SETUP_DRAFT_SAVE_FAILED');
    }
  }
  function capture(){
    const current=values();
    if(!state&&!filled(current))return;
    state={version:1,createdAt:state?.createdAt??now(),fields:current,undo:state?.undo??null};
    dirty=true;flush();
  }
  function restore(){
    const value=state?.fields??empty();
    for(const key of fields)$(key).value=value[key];
    status(dirty?'新建草稿尚未保存。请重试保存，或复制文字后再离开。':state?'新建草稿已保存在本机 · 从创建起保留七天':'');
  }
  try{
    const raw=storage.getItem(SETUP_DRAFT_KEY);
    if(raw){
      const saved=JSON.parse(raw);
      if(saved.version!==1||!Number.isFinite(saved.createdAt)||!valid(saved.fields)||(saved.undo&&!valid(saved.undo)))throw Error('INVALID_DRAFT');
      if(saved.createdAt+RETENTION_MS>now())state=saved;
      else storage.removeItem(SETUP_DRAFT_KEY);
    }
    restore();
  }catch{status('无法读取新建草稿。请保留此页文字，检查浏览器存储后重试。');}
  for(const key of fields)$(key).addEventListener('input',()=>{try{capture();}catch{}});
  return {
    capture,flush,restore,
    get dirty(){return dirty;},
    hasContent:()=>filled(values()),
    replaceMaterial(text,filename){
      const before=values();
      state={version:1,createdAt:state?.createdAt??now(),fields:before,undo:before};
      $('source').value=text;
      // A title entered by the learner is never a side effect of file import.
      if(!$('title').value.trim())$('title').value=filename;
      capture();
    },
    undo(){
      if(!state?.undo)return;
      // Preserve learning preferences edited after the material was replaced.
      const current=values();
      state.fields={...current,source:state.undo.source,title:state.undo.title};state.undo=null;
      restore();dirty=true;flush();
    },
    clear(){state=null;dirty=true;flush();restore();}
  };
}
