import {BASE} from './schemas.mjs';
const str={type:'string',minLength:1},object=properties=>({type:'object',properties,required:Object.keys(properties),additionalProperties:false});
const quotes={type:'array',items:str,minItems:1,maxItems:3};
export const taskSchema=object({sourceId:str,targetId:str,exercise:{anyOf:[{type:'null'},object({
  kind:{type:'string',enum:['apply_rule','check_claim','retrieve_fact']},
  basisQuotes:quotes,assumptions:{type:'array',items:str,maxItems:1},
  expectedAnswer:str,criterion:str,question:str
})]},unavailableReason:{type:['string','null']}});
export const assessmentSchema=object({sourceId:str,targetId:str,verdict:{type:'string',enum:['correct','partial','incorrect','unanswerable']},message:str,basisQuotes:quotes});
export const TASK=BASE+` 你只负责为一个已解释的内容差异设计一道可独立评分的小检验，不重复纠正解释。保持sourceId与target.id作为targetId。
先选择逐字basisQuotes，再写expectedAnswer和criterion，最后设计question；这些参考判断与标准会在用户答题后才展示。解释不是事实来源，也可能有错误，以材料为准。
目标是让用户应用一个材料中已有关系，或判断一个新说法与材料是否相容；答案不能是直接抄target.explanation里的句子。事实回忆必须标retrieve_fact，不伪装成迁移。
仅可改变材料已有的一个量、一个事件的真假、或一个已有步骤的位置。最多一个假设，完整写入assumptions；question不要藏入另一假设。假设可以改变实例，绝不能增加新规则、要求、资源、因果机制或前提。尤其不要说“还有其他要求”“审核通过”“设备正常”等材料未给出的条件。
来源不足以确定某事，并不等于该事不存在；可检验一个反向断言是否也缺依据。必要条件不能变成充分条件。顺序任务准确指出哪两个步骤的相对次序，不把循环移位误称完全颠倒。
只问一个判断，允许要求给出该判断的简短理由，不追加第二情境。question不泄露参考答案，expectedAnswer和criterion只由basisQuotes及允许的假设推出。
例子仅说明结构：材料说“只有持票者才可入场”，已解释持票不保证入场；可假设“有一人已入场”，问“能否推出此人持票？”。不能假设他未通过身份检查，因为材料没规定这项要求。
若没有来源内且不只是复述已给解释的合适任务，exercise返回null，unavailableReason简短说明；不要为了填结构硬出题。有任务时unavailableReason必须null。
输出前核对：每条所需规则均在basisQuotes中；假设只改变已有实例；题干未给答案；正确答案可按criterion判定。`;
export const ASSESS=BASE+` 仅评价本次理解检验的回答。保持sourceId与task.targetId作为targetId。task的参考答案和标准也可能有误，必须先用source核对，不能因参考答案写了某个额外条件就要求用户说出它。
只根据题目、明确的假设和材料评分：correct=判断及题目要求的理由均成立；partial=方向合理但缺关键依据；incorrect=与材料或允许假设的逻辑冲突；unanswerable=题目本身引入来源外规则、含混或无法由材料评分。
接受等价表述、用户明确修正后的最终立场。不要把未要求的细节当遗漏，不推长期掌握；unanswerable不能归咎用户。
message用一两句直接指出本次答案的关键依据或差异，basisQuotes是材料逐字片段。不再出题，不附改写指令、不追加补学建议、不复述整段旧解释。`;
