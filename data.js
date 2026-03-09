// 港股IPO数据模块 - 支持实时数据更新

export const ipoData = [
  {
    id: 1,
    code: "02692.HK",
    name: "兆威机电",
    nameEn: "Zhaowei Machinery",
    industry: "工业机器人",
    industryTag: "制造业",
    status: "listed",
    statusLabel: "已上市",
    issuePrice: 71.28,
    currency: "HKD",
    listDate: "2026-03-09",
    recruitStart: "2026-02-28",
    recruitEnd: "2026-03-05",
    marketCap: "208.64亿",
    fundraising: "约18亿港元",
    isAH: true,
    aDiscount: "44%",
    firstDayChange: "+9.43%",
    firstDayChangeNum: 9.43,
    currentPrice: 77.99,
    subscriptionTimes: "1536.76倍",
    darkboardChange: "+16.16%",
    cornerstone: ["高瓴资本", "中信证券"],
    cornerstoneRatio: "35%",
    score: 8.5,
    scoreBreakdown: { fundamental: 9, valuation: 8, industry: 8, institution: 9, heatLevel: 9 },
    recommendation: "建议参与",
    recommendColor: "green",
    summary: "中国微型传动系统龙头企业，A+H股同步上市，H股较A股折价约44%，安全边际充足。",
    highlights: [
      "全球微型传动系统细分龙头，市占率持续提升",
      "A股折价44%，H股具备明显安全边际",
      "高瓴资本等顶级机构基石投资，机构认可度高",
      "公开认购超1536倍，市场热度极高",
      "暗盘涨幅16.16%，首日表现超预期"
    ],
    risks: [
      "工业机器人行业竞争加剧",
      "A股若大幅下跌，折价优势可能收窄",
      "估值相对较高，需关注业绩持续性"
    ],
    financials: { revenue2024: "约35亿元", netProfit2024: "约5亿元", grossMargin: "约35%", pe: "约28倍", roe: "约18%" },
    analysis: "兆威机电是本轮港股打新中的明星标的。作为A+H股，H股较A股折价44%提供了充足的安全边际。高瓴资本等顶级机构的基石投资进一步背书，公开认购超1500倍的热度也印证了市场对其的高度认可。首日涨幅9.43%，暗盘涨幅16.16%，表现超出预期。对于散户而言，此类AH折价+顶级基石的组合是港股打新的理想标的。"
  },
  {
    id: 2,
    code: "02649.HK",
    name: "优乐赛共享",
    nameEn: "Youlesai Sharing",
    industry: "汽车服务",
    industryTag: "消费服务",
    status: "listed",
    statusLabel: "已上市",
    issuePrice: 11.00,
    currency: "HKD",
    listDate: "2026-03-09",
    recruitStart: "2026-02-28",
    recruitEnd: "2026-03-05",
    marketCap: "6.1亿",
    fundraising: "1.76亿港元",
    isAH: false,
    aDiscount: "-",
    firstDayChange: "-31.82%",
    firstDayChangeNum: -31.82,
    currentPrice: 7.50,
    subscriptionTimes: "5297.23倍",
    darkboardChange: "-",
    cornerstone: [],
    cornerstoneRatio: "0%",
    score: 3.5,
    scoreBreakdown: { fundamental: 4, valuation: 3, industry: 4, institution: 2, heatLevel: 5 },
    recommendation: "不建议参与",
    recommendColor: "red",
    summary: "汽车共享包装服务商，小盘股，无基石投资者，首日暴跌31.82%，是典型的高认购倍数破发案例。",
    highlights: [
      "公开认购超5297倍，认购热度极高",
      "汽车共享包装属于细分新兴赛道",
      "募资规模小，流通盘较小"
    ],
    risks: [
      "无基石投资者，机构认可度低",
      "商业模式较新，盈利能力存疑",
      "小盘股流动性差，波动极大",
      "首日暴跌31.82%，已验证破发风险",
      "高认购倍数不等于高质量，需警惕炒作"
    ],
    financials: { revenue2024: "约2亿元", netProfit2024: "亏损", grossMargin: "约20%", pe: "亏损", roe: "负值" },
    analysis: "优乐赛共享是2026年港股打新中的典型破发案例。尽管公开认购超5297倍，但无基石投资者、商业模式不成熟、盈利能力存疑等问题导致首日暴跌31.82%。这提醒散户：高认购倍数≠好标的，小盘股+无基石+亏损是破发的高危组合。此类标的应坚决回避。"
  },
  {
    id: 3,
    code: "02715.HK",
    name: "埃斯顿",
    nameEn: "Estun Automation",
    industry: "工业机器人",
    industryTag: "智能制造",
    status: "listed",
    statusLabel: "已上市",
    issuePrice: 15.36,
    currency: "HKD",
    listDate: "2026-03-09",
    recruitStart: "2026-02-28",
    recruitEnd: "2026-03-05",
    marketCap: "130亿",
    fundraising: "约15亿港元",
    isAH: true,
    aDiscount: "40%",
    firstDayChange: "-10%+",
    firstDayChangeNum: -10,
    currentPrice: 13.82,
    subscriptionTimes: "19.67倍",
    darkboardChange: "-8.2%",
    cornerstone: [],
    cornerstoneRatio: "约15%",
    score: 5.5,
    scoreBreakdown: { fundamental: 6, valuation: 5, industry: 7, institution: 4, heatLevel: 5 },
    recommendation: "谨慎参与",
    recommendColor: "yellow",
    summary: "工业机器人龙头A+H股，H股较A股折价40%，但暗盘跌8.2%，首日破发，市场对工业机器人板块存在分歧。",
    highlights: [
      "中国工业机器人龙头企业之一",
      "A股折价40%，具备一定安全边际",
      "受益于制造业自动化升级大趋势"
    ],
    risks: [
      "暗盘跌8.2%，市场情绪偏弱",
      "工业机器人行业竞争激烈，利润率承压",
      "认购倍数仅19.67倍，市场热度不足",
      "首日破发，短期持有风险较高"
    ],
    financials: { revenue2024: "约60亿元", netProfit2024: "约3亿元", grossMargin: "约28%", pe: "约35倍", roe: "约8%" },
    analysis: "埃斯顿作为工业机器人龙头，基本面尚可，但H股上市表现令人失望。暗盘跌8.2%已预示破发，首日跌幅超10%。主要问题在于：工业机器人行业竞争加剧、估值偏高、市场对制造业景气度存在担忧。对于散户而言，此类标的需等待估值回调后再考虑介入，打新阶段风险较大。"
  },
  {
    id: 4,
    code: "03268.HK",
    name: "美格智能",
    nameEn: "MeiG Smart",
    industry: "无线通信",
    industryTag: "半导体/通信",
    status: "upcoming",
    statusLabel: "即将上市",
    issuePrice: 28.86,
    currency: "HKD",
    listDate: "2026-03-10",
    recruitStart: "2026-02-28",
    recruitEnd: "2026-03-05",
    marketCap: "约80亿",
    fundraising: "约8亿港元",
    isAH: true,
    aDiscount: "48%",
    firstDayChange: "待定",
    firstDayChangeNum: null,
    currentPrice: null,
    subscriptionTimes: "待公布",
    darkboardChange: "待定",
    cornerstone: ["某国资基金"],
    cornerstoneRatio: "约20%",
    score: 7.0,
    scoreBreakdown: { fundamental: 7, valuation: 8, industry: 7, institution: 6, heatLevel: 7 },
    recommendation: "建议参与",
    recommendColor: "blue",
    summary: "无线通信模组企业，A+H股，H股较A股折价48%，折价幅度为近期最高，具备较强安全边际。",
    highlights: [
      "H股折价48%，为近期AH股中折价最高",
      "无线通信模组市场需求稳定增长",
      "受益于物联网、5G应用普及"
    ],
    risks: [
      "无线通信模组行业竞争激烈",
      "毛利率相对较低，盈利能力一般",
      "A股若下跌，折价优势可能缩小"
    ],
    financials: { revenue2024: "约30亿元", netProfit2024: "约1.5亿元", grossMargin: "约22%", pe: "约25倍", roe: "约12%" },
    analysis: "美格智能最大亮点是H股较A股折价高达48%，是近期AH股中折价最高的标的，安全边际充足。无线通信模组受益于物联网和5G普及，行业景气度尚可。但需注意行业竞争激烈、毛利率偏低的问题。综合来看，折价优势明显，建议适量参与打新，首日可考虑获利了结。"
  },
  {
    id: 5,
    code: "待定",
    name: "飞速创新",
    nameEn: "FEISUOCHUANGXIN",
    industry: "DTC网络解决方案",
    industryTag: "互联网/科技",
    status: "recruiting",
    statusLabel: "招股中",
    issuePrice: "待定",
    currency: "HKD",
    listDate: "2026年3月下旬",
    recruitStart: "2026-03-10",
    recruitEnd: "2026-03-14",
    marketCap: "待定",
    fundraising: "约20亿港元",
    isAH: false,
    aDiscount: "-",
    firstDayChange: "待定",
    firstDayChangeNum: null,
    currentPrice: null,
    subscriptionTimes: "招股中",
    darkboardChange: "待定",
    cornerstone: ["中金公司", "中信建投"],
    cornerstoneRatio: "约30%",
    score: 8.8,
    scoreBreakdown: { fundamental: 9, valuation: 8, industry: 9, institution: 9, heatLevel: 8 },
    recommendation: "强烈推荐",
    recommendColor: "green",
    summary: "全球第二大在线DTC网络解决方案提供商，2024年收入26.12亿元，净利润3.97亿元，毛利率超50%，盈利能力突出。",
    highlights: [
      "全球第二大DTC网络解决方案商，市占率6.9%",
      "毛利率超50%，盈利能力极强",
      "2025年前9月净利润4.23亿元，同比高增长",
      "中金、中信建投等顶级券商保荐",
      "基石投资者比例约30%，机构认可度高"
    ],
    risks: [
      "DTC赛道竞争加剧，市场份额可能受压",
      "国际业务拓展面临政策和汇率风险",
      "估值定价尚未公布，存在高估值风险"
    ],
    financials: { revenue2024: "26.12亿元", netProfit2024: "3.97亿元", grossMargin: "超50%", pe: "待定", roe: "约25%" },
    analysis: "飞速创新是本轮港股打新中最值得关注的标的之一。作为全球第二大DTC网络解决方案商，其50%+的毛利率在科技公司中属于顶级水平，盈利能力远超同类。2025年前9月净利润已超2024年全年，增长势头强劲。中金、中信建投等顶级机构保荐，基石比例约30%，机构认可度高。唯一需要关注的是最终定价，若PE合理（30倍以内），强烈建议积极参与打新。"
  },
  {
    id: 6,
    code: "待定",
    name: "国民技术",
    nameEn: "Nationz Technologies",
    industry: "集成电路/MCU",
    industryTag: "半导体",
    status: "upcoming",
    statusLabel: "即将招股",
    issuePrice: "待定",
    currency: "HKD",
    listDate: "2026年3月底",
    recruitStart: "2026-03-17",
    recruitEnd: "2026-03-21",
    marketCap: "待定",
    fundraising: "约10亿港元",
    isAH: true,
    aDiscount: "待定",
    firstDayChange: "待定",
    firstDayChangeNum: null,
    currentPrice: null,
    subscriptionTimes: "待公布",
    darkboardChange: "待定",
    cornerstone: [],
    cornerstoneRatio: "待定",
    score: 5.8,
    scoreBreakdown: { fundamental: 5, valuation: 6, industry: 8, institution: 4, heatLevel: 6 },
    recommendation: "谨慎参与",
    recommendColor: "yellow",
    summary: "中国平台型MCU市场前五，32位MCU领域前三，2024年亏损2.56亿元，2025年前9月亏损收窄至0.76亿元，扭亏预期是关键。",
    highlights: [
      "国产替代概念，MCU市场需求持续增长",
      "32位MCU领域前三，技术实力较强",
      "40纳米eFlash制程量产领先",
      "亏损持续收窄，扭亏预期明确",
      "A+H股，H股可能存在折价空间"
    ],
    risks: [
      "连续亏损，盈利能力尚未验证",
      "半导体行业周期波动风险",
      "MCU市场竞争激烈，价格战持续",
      "无基石投资者信息，机构认可度待观察"
    ],
    financials: { revenue2024: "11.61亿元", netProfit2024: "亏损2.56亿元", grossMargin: "约30%", pe: "亏损", roe: "负值" },
    analysis: "国民技术是典型的'国产替代+扭亏预期'逻辑标的。MCU赛道受益于国产替代大趋势，技术实力尚可，但连续亏损是最大隐患。2025年亏损收窄至0.76亿元，若2026年能实现扭亏，估值将大幅提升。对于散户而言，此类标的风险较高，建议等待招股价公布后，结合AH折价率和最终定价再决定是否参与。若折价超40%且估值合理，可小仓位参与。"
  },
  {
    id: 7,
    code: "待定",
    name: "纳真科技",
    nameEn: "Nazheng Technology",
    industry: "光模块",
    industryTag: "半导体/AI基础设施",
    status: "upcoming",
    statusLabel: "递表审核中",
    issuePrice: "待定",
    currency: "HKD",
    listDate: "2026年Q2",
    recruitStart: "待定",
    recruitEnd: "待定",
    marketCap: "待定",
    fundraising: "待定",
    isAH: false,
    aDiscount: "-",
    firstDayChange: "待定",
    firstDayChangeNum: null,
    currentPrice: null,
    subscriptionTimes: "待公布",
    darkboardChange: "待定",
    cornerstone: [],
    cornerstoneRatio: "待定",
    score: 9.0,
    scoreBreakdown: { fundamental: 9, valuation: 8, industry: 10, institution: 9, heatLevel: 9 },
    recommendation: "强烈关注",
    recommendColor: "green",
    summary: "全球第五大光模块厂商，2025年净利润8.73亿元，受益于AI数据中心爆发式增长，是AI基础设施核心受益标的。",
    highlights: [
      "全球第五大光模块厂商，行业地位突出",
      "2025年净利润8.73亿元，盈利能力强劲",
      "AI数据中心建设爆发，光模块需求激增",
      "受益于英伟达GPU供应链，客户质量高",
      "光模块是AI基础设施不可或缺的核心组件"
    ],
    risks: [
      "光模块行业竞争加剧，价格可能下降",
      "AI资本开支若放缓，需求可能受影响",
      "估值可能较高，需关注最终定价"
    ],
    financials: { revenue2024: "约50亿元", netProfit2024: "约6亿元", grossMargin: "约25%", pe: "待定", roe: "约20%" },
    analysis: "纳真科技是目前港股IPO管线中最值得期待的标的。光模块是AI数据中心的核心基础设施，随着全球AI算力需求爆发，光模块需求量激增。纳真科技作为全球第五大光模块厂商，2025年净利润高达8.73亿元，盈利能力强劲。这类AI基础设施标的在港股市场极为稀缺，预计上市后将受到机构和散户的热烈追捧。强烈建议提前关注，一旦开始招股应积极参与。"
  },
  {
    id: 8,
    code: "待定",
    name: "华明装备",
    nameEn: "Huaming Equipment",
    industry: "电力设备",
    industryTag: "工业/能源",
    status: "upcoming",
    statusLabel: "递表审核中",
    issuePrice: "待定",
    currency: "HKD",
    listDate: "2026年Q2",
    recruitStart: "待定",
    recruitEnd: "待定",
    marketCap: "待定",
    fundraising: "待定",
    isAH: true,
    aDiscount: "待定",
    firstDayChange: "待定",
    firstDayChangeNum: null,
    currentPrice: null,
    subscriptionTimes: "待公布",
    darkboardChange: "待定",
    cornerstone: [],
    cornerstoneRatio: "待定",
    score: 7.5,
    scoreBreakdown: { fundamental: 8, valuation: 7, industry: 7, institution: 7, heatLevel: 7 },
    recommendation: "建议关注",
    recommendColor: "blue",
    summary: "全球变压器分接开关第二大厂商，2025年利润7.2亿元，A+H股，受益于全球电网升级和新能源建设。",
    highlights: [
      "全球变压器分接开关第二大厂商",
      "2025年净利润7.2亿元，盈利稳健",
      "受益于全球电网升级和新能源建设",
      "A+H股，H股可能存在折价空间",
      "细分行业龙头，竞争壁垒较高"
    ],
    risks: [
      "电力设备行业增速相对平稳",
      "全球贸易摩擦可能影响海外业务",
      "估值需等待招股书公布后评估"
    ],
    financials: { revenue2024: "约40亿元", netProfit2024: "约6亿元", grossMargin: "约35%", pe: "待定", roe: "约18%" },
    analysis: "华明装备是细分行业龙头，全球变压器分接开关第二大厂商，盈利稳健。受益于全球电网升级和新能源建设的长期趋势，业务前景良好。作为A+H股，H股折价将是重要的参考指标。若折价超35%且PE合理，建议积极参与打新。整体而言，这是一只稳健型打新标的，适合风险偏好较低的散户。"
  }
];

export const calendarData = [
  {
    date: "3月9日",
    weekday: "周一",
    events: [
      { name: "兆威机电", code: "02692.HK", type: "listing", color: "green" },
      { name: "优乐赛共享", code: "02649.HK", type: "listing", color: "red" },
      { name: "埃斯顿", code: "02715.HK", type: "listing", color: "red" }
    ]
  },
  {
    date: "3月10日",
    weekday: "周二",
    events: [
      { name: "美格智能", code: "03268.HK", type: "listing", color: "yellow" },
      { name: "飞速创新", code: "待定", type: "recruiting", color: "blue" }
    ]
  },
  {
    date: "3月17日",
    weekday: "周一",
    events: [
      { name: "国民技术", code: "待定", type: "recruiting", color: "blue" }
    ]
  },
  {
    date: "3月下旬",
    weekday: "待定",
    events: [
      { name: "纳真科技", code: "待定", type: "upcoming", color: "purple" },
      { name: "华明装备", code: "待定", type: "upcoming", color: "purple" }
    ]
  }
];

export const chartData = {
  industry: {
    labels: ["AI/科技", "半导体", "生物医药", "工业制造", "消费服务", "金融科技", "其他"],
    values: [28, 18, 15, 14, 10, 8, 7]
  },
  monthly: {
    months: ["1月", "2月", "3月(预)"],
    values: [420, 310, 193]
  },
  performance: {
    ranges: ["跌>20%", "跌10-20%", "跌0-10%", "涨0-10%", "涨10-20%", "涨>20%"],
    counts: [3, 4, 3, 6, 5, 5]
  }
};

// ============ 实时数据模拟引擎 ============

// 实时行情数据（已上市股票的模拟实时价格）
export const liveQuotes = {
  "02692.HK": { price: 77.99, change: 9.43, changeAmt: 6.71, volume: 12840000, turnover: 1001.2 },
  "02649.HK": { price: 7.50, change: -31.82, changeAmt: -3.50, volume: 5620000, turnover: 42.2 },
  "02715.HK": { price: 13.82, change: -10.05, changeAmt: -1.54, volume: 8930000, turnover: 123.4 },
};

// 实时新闻/公告流
export const liveNews = [
  { time: "17:22", tag: "公告", color: "yellow", text: "兆威机电(02692.HK) 首日收盘价77.99港元，较发行价涨9.43%" },
  { time: "17:18", tag: "预警", color: "red", text: "优乐赛共享(02649.HK) 首日暴跌31.82%，散户损失惨重，警惕小盘股风险" },
  { time: "17:15", tag: "分析", color: "blue", text: "飞速创新今日开始招股，DTC赛道龙头，毛利率超50%，机构认购踊跃" },
  { time: "17:10", tag: "数据", color: "green", text: "港交所数据：2026年3月已有8只新股完成招股，认购总额超1200亿港元" },
  { time: "17:05", tag: "市场", color: "purple", text: "恒生指数今日收涨1.23%，科技板块领涨，AI概念股持续活跃" },
  { time: "16:58", tag: "公告", color: "yellow", text: "美格智能(03268.HK) 明日上市，暗盘报价较发行价溢价约5%，关注度较高" },
  { time: "16:45", tag: "分析", color: "blue", text: "纳真科技递表港交所，光模块龙头，AI基础设施核心受益，预计Q2上市" },
  { time: "16:30", tag: "数据", color: "green", text: "埃斯顿(02715.HK) 首日破发，收跌10%，工业机器人板块估值承压" },
  { time: "16:20", tag: "策略", color: "orange", text: "专家提示：港股打新需关注暗盘表现，暗盘涨超10%可积极参与首日交易" },
  { time: "16:05", tag: "市场", color: "purple", text: "南向资金今日净流入港股超85亿港元，科技股获大幅增持" },
];

// 模拟实时价格波动
export function simulatePriceUpdate() {
  const updates = {};
  Object.keys(liveQuotes).forEach(code => {
    const q = liveQuotes[code];
    // 随机小幅波动 ±0.5%
    const fluctuation = (Math.random() - 0.5) * 0.01 * q.price;
    const newPrice = Math.max(0.01, q.price + fluctuation);
    const issuePrice = code === "02692.HK" ? 71.28 : code === "02649.HK" ? 11.00 : 15.36;
    const newChangeAmt = newPrice - issuePrice;
    const newChange = (newChangeAmt / issuePrice) * 100;
    updates[code] = {
      price: parseFloat(newPrice.toFixed(2)),
      change: parseFloat(newChange.toFixed(2)),
      changeAmt: parseFloat(newChangeAmt.toFixed(2)),
      volume: q.volume + Math.floor(Math.random() * 50000),
      turnover: parseFloat((q.turnover + Math.random() * 0.5).toFixed(1))
    };
    liveQuotes[code] = updates[code];
  });
  return updates;
}

// 模拟招股中标的的认购倍数更新
export function simulateSubscriptionUpdate() {
  const recruitingIpos = ipoData.filter(d => d.status === 'recruiting');
  return recruitingIpos.map(ipo => ({
    id: ipo.id,
    name: ipo.name,
    // 模拟认购倍数随时间增长
    subscriptionTimes: `${(Math.random() * 500 + 100).toFixed(0)}倍(实时)`
  }));
}

// 生成随机新闻条目
const newsTemplates = [
  (name, code) => ({ tag: "公告", color: "yellow", text: `${name}(${code}) 最新价格更新，市场关注度持续升温` }),
  (name) => ({ tag: "分析", color: "blue", text: `机构研报：${name}基本面扎实，建议关注打新机会` }),
  (name) => ({ tag: "数据", color: "green", text: `${name}认购倍数持续攀升，散户参与热情高涨` }),
  (name) => ({ tag: "预警", color: "red", text: `注意：${name}估值偏高，建议谨慎评估风险后参与` }),
  () => ({ tag: "市场", color: "purple", text: `港股市场今日成交活跃，新股板块表现亮眼` }),
];

export function generateLiveNews() {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const randomIpo = ipoData[Math.floor(Math.random() * ipoData.length)];
  const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
  const newsItem = template(randomIpo.name, randomIpo.code);
  return { time: timeStr, ...newsItem };
}
