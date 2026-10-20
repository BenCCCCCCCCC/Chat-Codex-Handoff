// Presentation controls share the existing guarded actions; no storage or API calls.
const $=id=>document.getElementById(id);
$('newStudy').onclick=()=>$('newTopic').click();
$('closeHistory').onclick=()=>{ $('history').hidden=true; $('historyButton').focus(); };
for(const control of document.querySelectorAll('[data-prompt]')){
  control.onclick=()=>{
    if($('send').disabled)return;
    const input=$('chat');
    if(!input.value.trim())input.value=control.dataset.prompt;
    input.focus();
  };
}
function reflectStage(){
  const history=!$('history').hidden, working=!$('workspace').hidden;
  const step=!working?0:!$('recording').hidden?2:!$('attemptPanel').hidden?3:$('practicePanel').dataset.active==='true'?4:1;
  for(const item of document.querySelectorAll('.journey li')){
    if(Number(item.dataset.step)===step)item.setAttribute('aria-current','step');
    else item.removeAttribute('aria-current');
  }
  $('viewTitle').textContent=history?'学习记录':['开始一轮学习','理解与提问','用自己的话讲','核对与补学','情境练习'][step];
  $('topicExport').hidden=!working||history;
  $('workspace').dataset.view=step===4?'practice':'learn';
  document.body.dataset.history=String(history);
  $('newStudy').classList.toggle('active',!history&&!working);
  $('historyButton').classList.toggle('active',history);
}
const stageObserver=new MutationObserver(reflectStage);
for(const id of ['setup','workspace','recording','attemptPanel','history'])stageObserver.observe($(id),{attributes:true,attributeFilter:['hidden']});
stageObserver.observe($('practicePanel'),{attributes:true,attributeFilter:['data-active']});
reflectStage();
