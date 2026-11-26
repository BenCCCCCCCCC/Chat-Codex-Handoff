import test from 'node:test';
import assert from 'node:assert/strict';
import {roundState,learningRecord} from './learning-record.mjs';

test('only the eligible first answer closes a gap, and review suspends that conclusion',()=>{
  const answer={id:'first',status:'complete',assessment:{verdict:'correct'}};
  const round={draft:'',answers:[answer]};
  assert.equal(roundState(round),'本题答对，参考情况未核实');
  Object.assign(round,{checkMode:'submitted',closedAnswerId:'first'});
  assert.equal(roundState(round),'本次独立检验通过');
  round.review={status:'held'};
  assert.equal(roundState(round),'题目待核对');
  round.review=null;round.reviewHistory=[{resolution:'retained',answerIds:['first']}];
  assert.equal(roundState(round),'待作答');
});
test('similar feedback from another report cannot inherit a re-explanation or practice result',()=>{
  const source={id:'s',text:'须签到。'},version={id:'v',reviewed:true},finding={status:'missing',sourceQuote:'须签到。',message:'遗漏签到'};
  const report=id=>({id,attemptId:'a',sourceId:'s',channel:'content',transcriptVersion:'v',findings:[finding]});
  const ref={sourceId:'s',attemptId:'a',transcriptVersion:'v',reportId:'r1',findingIndex:0};
  const attempt={id:'a',source,raw:version,corrections:[],reports:[report('r1'),report('r2')]};
  const again={id:'b',source,feedbackRef:ref,raw:{id:'w'},reports:[]};
  const rows=learningRecord({attempts:[attempt,again],practiceRounds:[{origin:{feedbackRef:ref},answers:[]}]});
  assert.equal(rows[0].report.id,'r2');assert.equal(rows[0].state,'待巩固');assert.equal(rows[0].repeat,undefined);
  assert.equal(rows[1].state,'历史反馈');assert.equal(rows[1].repeat.id,'b');
});
