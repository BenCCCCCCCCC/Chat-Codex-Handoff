import test from 'node:test';
import assert from 'node:assert/strict';
import {boundedTask,assessBoundedTask} from './bounded-understanding.mjs';
import {taskSplitCases} from './task-split-fixtures.mjs';
import {encodeBackup,decodeBackup} from './backup.mjs';

test('local tasks apply only explicit whole-material rules and keep unknown causes ungraded',()=>{
  const necessary=boundedTask(taskSplitCases[0].context);
  assert.equal(assessBoundedTask(necessary,taskSplitCases[0].source,taskSplitCases[0].context.target,'c1').verdict,'correct');
  const scale=boundedTask(taskSplitCases[1].context);
  assert.equal(scale.exercise.expectedAnswer,'9克。');
  assert.deepEqual(scale.exercise.assumptions,['假设配制3份混合物。']);
  const order=structuredClone(taskSplitCases[2].context);
  order.source.text=order.target.sourceQuote='封存样品时先称量，再密封，最后贴标签。';
  const task=boundedTask(order);
  assert.equal(task.exercise.expectedAnswer,'不符合。应先密封，再贴标签。');
  assert.deepEqual(task.exercise.basisQuotes,[order.source.text]);
  assert.equal(boundedTask(taskSplitCases[3].context).exercise,null);
  const exception=structuredClone(taskSplitCases[0].context);
  exception.source.text+='但紧急升级除外。';
  assert.equal(boundedTask(exception).exercise,null,'do not ignore a rule outside the selected quotation');
});

test('backup preserves local choice and judgement; a changed answer key cannot silently change the result',async()=>{
  const {source,context}=taskSplitCases[0],task=boundedTask(context),choiceId=task.exercise.correctChoice;
  const assessment=assessBoundedTask(task,source,context.target,choiceId);
  const topic={id:'topic',createdAt:1000,source,goals:[],messages:[],attempts:[],
    practiceRounds:[{id:'round',createdAt:1000,question:task.exercise.question,introduction:'',draft:'c0',task,taskTarget:context.target,
      origin:{targetId:task.targetId,sourceId:source.id,attemptId:context.target.attemptId,transcriptVersion:context.target.transcriptVersion},
      answers:[{id:'answer',text:'不能',choiceId,assessment,result:assessment.message,status:'complete'}]}]};
  const encoded=await encodeBackup(topic),restored=decodeBackup(encoded);
  assert.deepEqual(restored.practiceRounds,topic.practiceRounds);
  const edited=JSON.parse(encoded);edited.topic.practiceRounds[0].task.exercise.correctChoice='c0';
  assert.throws(()=>decodeBackup(JSON.stringify(edited)),/BACKUP_INVALID/);
});
