import {createDraftSaver} from './draft-save.mjs';

export function mountChat({getTopic,save,act,focusHit}) {
  const $=id=>document.getElementById(id), list=$('messages'), input=$('chat'), pageSize=24;
  let bound=null, first=0, end=0, known=0, draftState='';
  const saver=createDraftSaver({save,onError:error=>act(()=>Promise.reject(error)),
    onStatus:status=>{draftState=status;renderDraftStatus();}});
  function renderDraftStatus() {
    const status=draftState==='error'?'未保存':draftState==='saving'?'保存中…':'已保存';
    $('chatDraftStatus').textContent=getTopic()?.chatDraft?`草稿${status}`:'';
    $('contextStatus').textContent=`${getTopic()?.contextNote?.length??0} / 1,000 · ${status}`;
  }
  const nearEnd=()=>list.scrollHeight-list.scrollTop-list.clientHeight<64;
  function scrollState() {$('chatLatest').hidden=end===known&&nearEnd();}
  function messageNode(message,index) {
    const node=document.createElement('div');node.dataset.messageIndex=index;node.tabIndex=-1;
    node.className=`message ${message.role}`;node.textContent=message.text;return node;
  }
  const nodes=(start,stop)=>getTopic().messages.slice(start,stop).map((m,i)=>messageNode(m,start+i));
  function controls() {
    $('chatOlder').hidden=first===0;$('chatOlder').textContent=`查看更早的 ${Math.min(first,pageSize)} 条`;
    $('chatNewer').hidden=end===known;$('chatNewer').textContent=`查看后面的 ${Math.min(known-end,pageSize)} 条`;
    document.querySelector('.prompt-starters').hidden=!!getTopic()?.messages.some(m=>m.role==='user');
    scrollState();
  }
  function range(start,stop){first=start;end=stop;list.replaceChildren(...nodes(first,end));controls();}
  function render() {
    const topic=getTopic();if(!topic)return;
    const changed=bound!==topic, follow=changed||(end===known&&nearEnd()), previous=known;
    known=topic.messages.length;
    if(changed||known<previous){bound=topic;range(Math.max(0,known-pageSize),known);draftState=topic.chatDraft?'saved':'';}
    else if(end===previous){list.append(...nodes(end,known));end=known;}
    if(input.value!==(topic.chatDraft??''))input.value=topic.chatDraft??'';
    if($('contextNote').value!==(topic.contextNote??''))$('contextNote').value=topic.contextNote??'';
    const request=topic.chatRequest,usage=request?.contextUsage;
    $('contextScope').textContent='参考材料、对话要点和最近最多 6 条消息。'+
      (usage?`上次使用 ${usage.historyUsed} 条${usage.historyOmitted?`，因长度略去较早的 ${usage.historyOmitted} 条`:''}。`:'')+
      (request?.status!=='complete'&&request?.contextNote!==undefined?'重试沿用发送时的要点。':'');
    controls();renderDraftStatus();
    if(follow)list.scrollTop=list.scrollHeight;scrollState();
  }
  $('chatOlder').onclick=()=>{
    if(!getTopic())return;
    const height=list.scrollHeight,top=list.scrollTop,next=Math.max(0,first-pageSize);
    list.prepend(...nodes(next,first));first=next;list.scrollTop=top+list.scrollHeight-height;controls();
  };
  $('chatNewer').onclick=()=>{const next=Math.min(known,end+pageSize);list.append(...nodes(end,next));end=next;controls();};
  $('chatLatest').onclick=()=>{if(end!==known)range(Math.max(0,known-pageSize),known);list.scrollTop=list.scrollHeight;scrollState();};
  list.addEventListener('scroll',scrollState,{passive:true});
  input.addEventListener('input',()=>{
    const topic=getTopic();if(!topic)return;
    topic.chatDraft=input.value;topic.resume={view:'learn'};saver.mark(topic);
  });
  $('contextNote').addEventListener('input',()=>{
    const topic=getTopic();if(!topic)return;
    topic.contextNote=$('contextNote').value;saver.mark(topic);
  });
  for(const node of [input,$('contextNote')])node.addEventListener('blur',()=>act(()=>saver.flush()));
  function locate(index){
    if(!Number.isInteger(index)||!getTopic()?.messages[index])return false;
    if(index<first||index>=end)range(Math.max(0,index-4),Math.min(known,Math.max(0,index-4)+pageSize));
    focusHit(list.querySelector(`[data-message-index="${index}"]`));controls();return true;
  }
  return {render,locate,flushDraft:()=>saver.flush(),discardDraft:()=>saver.discard(),get hasPendingDraft(){return saver.pending;}};
}
