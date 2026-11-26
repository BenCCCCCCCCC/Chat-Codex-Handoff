// The native modal keeps the source, prior feedback and regular practice controls out of reach.
export function mountClosedCheck({flow,flushDraft,markDraft,getTopic,act}){
  const $=id=>document.getElementById(id),dialog=$('closedCheck');
  let active=null;
  function buttons(){
    $('closedSubmit').disabled=flow.busy||!active?.draft||!$('closedAttest').checked;
    $('closedLeave').disabled=flow.busy;
  }
  function render(round,visible){
    if(!visible||round?.checkMode!=='closed'||round.review?.status==='held'){
      if(dialog.open)dialog.close();
      active=null;return;
    }
    if(active!==round){
      active=round;
      $('closedScenario').textContent=round.task.exercise.assumptions.join(' ');
      $('closedQuestion').textContent=round.question;
      $('closedAttest').checked=false;
      const field=$('closedChoices');
      field.replaceChildren(Object.assign(document.createElement('legend'),{textContent:'你的判断'}));
      for(const choice of round.task.exercise.choices){
        const label=document.createElement('label'),radio=document.createElement('input');
        radio.type='radio';radio.name='closed-choice';radio.value=choice.id;radio.checked=round.draft===choice.id;
        radio.onchange=()=>act(async()=>{round.draft=choice.id;markDraft(getTopic());buttons();await flushDraft();});
        label.append(radio,document.createTextNode(choice.label));field.append(label);
      }
    }
    if(!dialog.open){dialog.showModal();$('closedQuestion').focus();}
    buttons();
  }
  $('closedAttest').onchange=buttons;
  $('closedSubmit').onclick=()=>act(async()=>{
    if(!active||$('closedSubmit').disabled)return;
    await flushDraft();await flow.answer({unassisted:true});
  });
  const leave=()=>act(async()=>{await flushDraft();await flow.leaveCheck();});
  $('closedLeave').onclick=leave;
  dialog.oncancel=e=>{e.preventDefault();leave();};
  return {render};
}
