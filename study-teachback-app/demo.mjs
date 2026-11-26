// Authored examples only. Deliberately no API, storage, or microphone dependency.
const samples=[
  {
    "title": "数组长度等于队列容量吗？",
    "source": "用长度为 N 的数组实现循环队列。若用 front 和 rear 判空，并约定留一个空位来区分队满与队空，最多可存 N−1 项。另一种实现用 count 记录项数，允许占满 N 个位置。",
    "goal": "说明结论依赖哪一种判满约定。",
    "explanation": "同样是长度为 8 的数组，两个实现会给出不同的容量。先找出各自用来区分空与满的信息。",
    "thinking": "“最多放 7 项”这句话还需要交代什么？",
    "answers": [
      "循环队列总要留一个位置，所以长度为 8 的数组最多放 7 项。",
      "用预留空位区分满和空时，长度 8 最多放 7 项。改用 count 记录项数后，可以放满 8 项。"
    ],
    "finding": "把预留空位这一实现约定推广到了所有循环队列。",
    "supported": "你说明了两种判满方式，也给出了各自的容量。",
    "repair": "只重讲“留一个位置”的适用条件。",
    "scenario": "一个容量监控器用 count 记录项数，数组长度 12。它收到第 12 项时还需要预留一个位置吗？",
    "choices": [
      "可以存入第 12 项",
      "必须保留最后一个空位"
    ],
    "correct": "对。count 已区分空与满，因此这个实现允许放满 12 项。",
    "incorrect": "先核对题面的判满方式。这一题采用 count，可以占满数组。"
  },
  {
    "title": "警报响起，异常有多常见？",
    "source": "同一天检查 1,000 件零件。其中 20 件异常，有 18 件触发警报。另外 980 件正常，其中 98 件也触发警报。已知警报响起时，分母应取所有触发警报的零件。",
    "goal": "区分“异常时会报警”和“报警后确实异常”。",
    "explanation": "这两种概率共享 18 件零件，但选取人群不同。先圈出题目已经告诉你的那个条件。",
    "thinking": "如果拿到的是一件已经报警的零件，该在哪一组里数？",
    "answers": [
      "异常件里有九成会报警，所以听到警报就有九成概率是异常件。",
      "18/20 回答的是异常件的报警比例。已知报警时，应在 18+98 件报警零件中看有多少异常。"
    ],
    "finding": "把异常组作为分母，回答了另一个条件下的问题。",
    "supported": "你分别找到了两种条件对应的分母。",
    "repair": "从“在所有报警件里”开始重讲判断方法。",
    "scenario": "次日有 12 件异常零件报警，另有 28 件正常零件报警。随机选一件已经报警的零件，它异常的比例是多少？",
    "choices": [
      "12 / 40，即 30%",
      "12 / 28，约 43%"
    ],
    "correct": "对。应在全部 40 件报警零件中取比例，异常部分占 12/40。",
    "incorrect": "28 只包含正常报警件。异常报警件也要计入分母。"
  }
];
const $=id=>document.getElementById(id);
let sample=0,step=0,answer=0;
function node(tag,text,cls){const e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e;}
function render(focus=true){
  const item=samples[sample];
  $('demoTitle').textContent=item.title;$('demoSource').textContent=item.source;$('demoGoal').textContent=item.goal;
  $('demoExplanation').textContent=item.explanation;$('demoThinking').textContent=item.thinking;
  $('answerA').textContent=item.answers[0];$('answerB').textContent=item.answers[1];
  $('demoScenario').textContent=item.scenario;$('practiceA').textContent=item.choices[0];$('practiceB').textContent=item.choices[1];
  $('demoHeading').textContent=['读材料','选择讲解','核对反馈','换个情境'][step];
  ['demoRead','demoExplain','demoResult','demoPractice'].forEach((id,i)=>$(id).hidden=i!==step);
  for(const mark of document.querySelectorAll('[data-demo-step]')){if(Number(mark.dataset.demoStep)===step)mark.setAttribute('aria-current','step');else mark.removeAttribute('aria-current');}
  for(const button of document.querySelectorAll('[data-sample]'))button.setAttribute('aria-pressed',String(Number(button.dataset.sample)===sample));
  $('demoBack').hidden=step===0;$('demoNext').hidden=step===3;
  $('demoNext').textContent=['看看怎么讲','查看示例反馈','换个情境试试'][step]??'';
  if(step===2){
    const card=node('article','', 'finding');card.dataset.status=answer===0?'incorrect':'supported';
    card.append(node('strong',answer===0?'需要澄清':'已表达'),node('p',answer===0?item.finding:item.supported));
    const evidence=node('details','');evidence.append(node('summary','查看材料与原话'),node('blockquote','材料：'+item.source),node('blockquote','示例原话：'+item.answers[answer]));
    card.append(evidence,node('p',answer===0?item.repair:'下一步：试一个新情境，看看条件是否还能用对。','diagnosticTarget'));
    $('demoFindings').replaceChildren(card);
    $('demoRepair').hidden=answer!==0;
    if(answer===0)$('demoNext').textContent='用重讲去做新题';
  }
  if(focus)$('demoHeading').focus();
}
$('demoNext').onclick=()=>{
  if(step===2&&answer===0&&!$('demoRewrite').value.trim()){$('demoRewrite').focus();return;}
  step=Math.min(3,step+1);render();};
$('demoBack').onclick=()=>{step=Math.max(0,step-1);render();};
for(const radio of document.querySelectorAll('[name=exampleAnswer]'))radio.onchange=()=>{answer=Number(radio.value);$('practiceFeedback').textContent='';$('demoTrail').hidden=true;};
$('demoUseRepair').onclick=()=>{$('demoRewrite').value=samples[sample].answers[1];$('demoNext').focus();};
function reset(){$('demoRewrite').value='';$('demoTrail').hidden=true;step=0;answer=0;document.querySelector('[name=exampleAnswer][value="0"]').checked=true;$('practiceFeedback').textContent='';render();}
for(const button of document.querySelectorAll('[data-sample]'))button.onclick=()=>{sample=Number(button.dataset.sample);reset();};
$('demoReset').onclick=reset;
function submitChoice(index){
  const item=samples[sample],feedback=index===0?item.correct:item.incorrect;
  $('practiceFeedback').textContent=feedback;
  $('demoTrailText').textContent=['原讲解 · '+item.answers[answer],...(answer===0?['重讲 · '+$('demoRewrite').value.trim()]:[]),'本题作答 · '+item.choices[index],feedback].join('\n\n');
  $('demoTrail').hidden=false;
}
$('practiceA').onclick=()=>submitChoice(0);
$('practiceB').onclick=()=>submitChoice(1);
render(false);
