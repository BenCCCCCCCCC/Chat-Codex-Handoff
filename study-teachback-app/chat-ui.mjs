import {createDraftSaver} from './draft-save.mjs';

export function mountChat({getTopic,save,act}) {
  const $=id=>document.getElementById(id), list=$('messages'), input=$('chat'), pageSize=24;
  let bound=null, first=0, rendered=0, draftState='';
  const saver=createDraftSaver({save,onError:error=>act(()=>Promise.reject(error)),
    onStatus:status=>{draftState=status;renderDraftStatus();}});
  function renderDraftStatus() {
    $('chatDraftStatus').textContent=draftState==='error'?'草稿未保存':draftState==='saving'?'保存中…':getTopic()?.chatDraft?'草稿已保存':'';
  }
  const nearEnd=()=>list.scrollHeight-list.scrollTop-list.clientHeight<64;
  function scrollState() {$('chatLatest').hidden=nearEnd();}
  function messageNode(message) {
    const node=document.createElement('div');
    node.className=`message ${message.role}`;node.textContent=message.text;return node;
  }
  function controls() {
    $('chatOlder').hidden=first===0;
    $('chatOlder').textContent=`查看更早的 ${Math.min(first,pageSize)} 条`;
    $('chatContext').hidden=(getTopic()?.messages.length??0)<=6;
    document.querySelector('.prompt-starters').hidden=!!getTopic()?.messages.some(m=>m.role==='user');
  }
  function render() {
    const topic=getTopic();
    if(!topic)return;
    const changed=bound!==topic, follow=changed||nearEnd();
    if(changed || topic.messages.length<rendered) {
      bound=topic;first=Math.max(0,topic.messages.length-pageSize);rendered=first;
      list.replaceChildren();draftState=topic.chatDraft?'saved':'';
    }
    if(input.value!==(topic.chatDraft??''))input.value=topic.chatDraft??'';
    list.append(...topic.messages.slice(rendered).map(messageNode));rendered=topic.messages.length;
    controls();renderDraftStatus();
    if(follow)list.scrollTop=list.scrollHeight;
    scrollState();
  }
  $('chatOlder').onclick=()=>{
    const topic=getTopic();if(!topic)return;
    const before=list.scrollHeight, top=list.scrollTop, next=Math.max(0,first-pageSize);
    list.prepend(...topic.messages.slice(next,first).map(messageNode));first=next;
    list.scrollTop=top+list.scrollHeight-before;controls();scrollState();
  };
  $('chatLatest').onclick=()=>{list.scrollTop=list.scrollHeight;scrollState();};
  list.addEventListener('scroll',scrollState,{passive:true});
  input.addEventListener('input',()=>{
    const topic=getTopic();if(!topic)return;
    topic.chatDraft=input.value;topic.resume={view:'learn'};saver.mark(topic);
  });
  input.addEventListener('blur',()=>act(()=>saver.flush()));
  return {render,flushDraft:()=>saver.flush(),discardDraft:()=>saver.discard(),get hasPendingDraft(){return saver.pending;}};
}
