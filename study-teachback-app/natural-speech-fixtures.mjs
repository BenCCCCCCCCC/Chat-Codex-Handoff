// Frozen before real requests. Reading references are not verified audio alignments.
export const speechCases=[
  {id:'fleurs-32',file:'fleurs-32.wav',duration:12.12,sha256:'4283ce701e38d310c93fa0cbe3090c4dfd3a71028bb4e30711eb92a182842dd7',
    referenceType:'reading_script',reference:'早先于全球发布的华硕 Eee PC 个人笔记本，因成本节约及功能性因素，成为 2007 年台北 IT 资讯月备受瞩目的话题。',
    critical:[
      {label:'华硕',kind:'term',aliases:['华硕','華碩']},
      {label:'Eee PC',kind:'term',aliases:['Eee PC','EEEPC']},
      {label:'2007 年',kind:'number',aliases:['2007年','二零零七年','二〇〇七年','两千零七年','二千零七年']},
      {label:'IT',kind:'term',aliases:['IT']}
    ]},
  {id:'fleurs-276',file:'fleurs-276.wav',duration:13.86,sha256:'fa65e2b392de85398253848c969c6fe56f4e88bde30a6b0bb0c30d663c0a1f20',
    referenceType:'reading_script',reference:'桥下垂直净空 15 米。该项目于 2011 年 8 月完工，但直到 2017 年 3 月才开始通车。',
    critical:[
      {label:'垂直净空',kind:'term',aliases:['垂直净空','垂直淨空']},
      {label:'15 米',kind:'number',aliases:['15米','十五米']},
      {label:'2011 年',kind:'number',aliases:['2011年','二零一一年','二〇一一年','二千零一十一年','两千零一十一年']},
      {label:'8 月',kind:'number',aliases:['8月','八月']},
      {label:'2017 年',kind:'number',aliases:['2017年','二零一七年','二〇一七年','二千零一十七年','两千零一十七年']},
      {label:'3 月',kind:'number',aliases:['3月','三月']}
    ]},
  {id:'minds-28',file:'minds-28.wav',duration:17.152,sha256:'49bbc9252dccccc94f0d1ec18283e8021b00b34c006c3aa51a04c548c6569858',
    referenceType:'automatic_unverified',reference:'你好请您请您能帮我查一下我现在账户的余额吗我手机上的app不能使用我想你在打电话来查询一下目前账户的余额有多少',
    critical:[
      {label:'账户余额（分开提及亦可）',kind:'term',aliases:['余额','餘額']},
      {label:'app',kind:'term',aliases:['app']},
      {label:'不能使用',kind:'negation',aliases:['不能使用']}
    ]}
];
export const analysisCases=[
  {id:'number_unit_swap',source:{id:'natural-numbers',title:'自编：桥梁数据',text:'桥下垂直净空15米。项目于2011年8月完工，2017年3月通车。'},
    words:'桥下净空是50米，项目2011年8月完工，2017年3月通车。',expectation:'wrong',
    review:'指出50与15米冲突；若另列正确日期，不应视为整条错误。'},
  {id:'term_mechanism_repair',source:{id:'natural-cache',title:'自编：缓存',text:'缓存保存近期使用的数据副本。读取时先检查缓存；命中就读取副本，未命中才访问原始存储。缓存容量有限，需要淘汰条目。'},
    words:'缓存是把所有数据永久存进去。等等，这句话不对。它只保留近期数据的副本；读取先查缓存，找不到才访问原始存储，容量不够要淘汰一些条目。',expectation:'correct',
    review:'接受最终修正和等价术语；不针对已撤回句再提建议。'},
  {id:'unexplained_cause',source:{id:'natural-process',title:'自编：项目时间',text:'项目于2011年8月完工，2017年3月通车。材料没有交代两者相隔多年的原因。'},
    words:'2017年才通车，是因为材料费用上涨。',expectation:'unsupported_strengthening',
    review:'应指出原因缺证据而非断言费用没有上涨；建议应围绕区分事实与推测。'},
  {id:'condition_specificity',source:{id:'natural-backup',title:'自编：升级条件',text:'只有完成备份才能升级系统。'},
    words:'只要完成备份就一定能升级系统。',expectation:'unsupported_strengthening',
    review:'明确备份必要但不保证可以升级；不机械复述长模板，追问不重复解释。'}
];
