// Authored examples only. Deliberately no API, storage, or microphone dependency.
const samples=[
  {title:'什么时候给植物浇水？',source:'只有土壤干燥时，才给这盆植物浇水。土壤仍然湿润时，不要浇水。判断前，先检查土壤的状态。',goal:'把“检查 → 条件 → 行动”连起来。',explanation:'这段材料不只是在说“给植物浇水”。关键是先检查土壤，再按干湿决定行动。把条件漏掉，即使话说得很顺，也可能做出相反的选择。',thinking:'如果刚下过雨，但土壤仍然湿润，现在该怎么做？',answers:['植物需要水，所以每天都要给这盆植物浇水。','我会先检查土壤。只有土壤干了才浇；如果还是湿的，就先不浇。'],finding:'“每天都浇水”把行动变成了固定安排，忽略了材料要求的干燥条件。',supported:'你把检查、干燥时浇水和湿润时不浇三个部分连在了一起。',repair:'先补上条件：不是到时间就浇，而是检查后再决定。',scenario:'昨天给这盆植物浇过水，今天检查时土壤仍然湿润。按照材料，现在应该怎么做？',choices:['先不浇水','按每天的安排再浇一次'],correct:'对。是否浇水取决于土壤状态，而不是距离上次浇水过了多久。',incorrect:'回到材料的条件：土壤仍然湿润时不浇。固定的时间安排不能代替检查。'},
  {title:'有票，就一定能进馆吗？',source:'参观者需要同时满足两个条件才能进入展馆：持有有效门票，而且展馆处于开放时间。闭馆期间，即使有有效门票也不能进入。',goal:'理解两个条件需要同时满足。',explanation:'有效门票是必要条件，但不是唯一条件。讲清楚规则，需要把“有效门票”和“开放时间”都保留下来，不能把其中一个当成充分保证。',thinking:'如果已经买票，但到达时展馆已闭馆，有票还能进去吗？',answers:['只要买到了有效门票，就可以进入展馆。','进入展馆要同时有有效门票，并且在开放时间。已经闭馆的话，有票也不能进。'],finding:'“只要有票就能进入”漏掉了开放时间，把一个必要条件当成了充分条件。',supported:'你保留了门票和开放时间两个条件，也说明了闭馆时的情况。',repair:'先把“同时满足”讲清楚，再用闭馆的情况检查自己的解释。',scenario:'小林有今天的有效门票，但到达时展馆已经闭馆。根据材料，应该怎么判断？',choices:['现在不能进入','有票就可以进入'],correct:'对。持票与开放时间需要同时满足；有票不代表任何时间都能进入。',incorrect:'这里还缺少开放时间这个条件。闭馆期间，有效门票也不能让这次入馆成立。'}
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
  $('demoHeading').textContent=['先抓住关键关系','用自己的话讲，不只复述','结论之后，还能查证据','换个情境，检查理解'][step];
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
  }
  if(focus)$('demoHeading').focus();
}
$('demoNext').onclick=()=>{step=Math.min(3,step+1);render();};
$('demoBack').onclick=()=>{step=Math.max(0,step-1);render();};
for(const radio of document.querySelectorAll('[name=exampleAnswer]'))radio.onchange=()=>{answer=Number(radio.value);};
function reset(){step=0;answer=0;document.querySelector('[name=exampleAnswer][value="0"]').checked=true;$('practiceFeedback').textContent='';render();}
for(const button of document.querySelectorAll('[data-sample]'))button.onclick=()=>{sample=Number(button.dataset.sample);reset();};
$('demoReset').onclick=reset;
$('practiceA').onclick=()=>{$('practiceFeedback').textContent=samples[sample].correct;};
$('practiceB').onclick=()=>{$('practiceFeedback').textContent=samples[sample].incorrect;};
render(false);
