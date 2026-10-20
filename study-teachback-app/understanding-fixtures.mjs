import {analysisCases} from './natural-speech-fixtures.mjs';
// Two previously inspected cases plus four new author-written cases. Not a blind test.
export const understandingCases=[
  ...analysisCases.slice(2),
  {id:'procedure_order',source:{id:'probe-order',title:'自编：样品封存',text:'封存样品时先称量，再密封，最后贴标签。称量的是样品本身的质量。'},
    words:'先密封，再把标签贴上，最后称量就能得到样品本身的质量。',expectation:'wrong',
    review:'指出称量顺序不符。检验应选择或判断一个假设操作，不能提供完整正确步骤让用户照抄。'},
  {id:'ratio_scale',source:{id:'probe-ratio',title:'自编：混合配方',text:'每份混合物由2克甲和3克乙组成。配制多份时，两种原料都按份数成倍增加。'},
    words:'配两份要4克甲和3克乙，因为乙的用量不用变。',expectation:'wrong',
    review:'指出乙也随份数增加。可换一个份数检验同一比例，假设说清，不把算好的新答案放在题干。'},
  {id:'some_to_all',source:{id:'probe-scope',title:'自编：抽样记录',text:'本次从仓库抽取的10个零件中有2个出现裂纹。这条记录没有检查仓库其余零件。'},
    words:'这说明仓库里的每个零件都有裂纹。',expectation:'unsupported_strengthening',
    review:'区分样本事实与总体断言，不能反向断言其余无裂纹；用一个新说法是否能推出检验范围，不再要求复述样本数字。'},
  {id:'withdrawn_dissolving_claim',source:{id:'probe-dissolve',title:'自编：溶解',text:'糖在水中溶解后仍然存在，只是分散在水中。水蒸发后可以得到糖。'},
    words:'糖溶解后就消失了。不对，我收回这句，糖仍然存在，只是分散在水里，水蒸发后能得到糖。',expectation:'correct',
    review:'只评价修正后的正确立场；不针对撤回的错误出检验题，也不为了出题硬造缺口。'}
];
