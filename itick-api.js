// ============ iTick API 封装模块 ============
// 文档：https://docs.itick.org/en/rest-api/stocks/stock-ipo

const ITICK_BASE_URL = 'https://api.itick.org';

// 内置默认 Token（可通过设置面板覆盖）
const DEFAULT_TOKEN = '5efa644bfe8b45ff9a8d99ad34aaa4f42a8b467d687b4aa1a4d23f1e8924c433';

// 从 localStorage 读取 token，或使用内置默认值
export function getToken() {
  return localStorage.getItem('itick_token') || DEFAULT_TOKEN;
}

export function setToken(token) {
  localStorage.setItem('itick_token', token.trim());
}

export function hasToken() {
  return !!getToken();
}

// 通用请求函数
async function fetchItick(path, params = {}) {
  const token = getToken();
  if (!token) throw new Error('请先设置 iTick API Token');

  const url = new URL(`${ITICK_BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: {
      'accept': 'application/json',
      'token': token
    }
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  const json = await res.json();

  // iTick 返回 code=0 表示成功
  if (json.code !== 0 && json.code !== undefined) {
    throw new Error(`iTick API 错误 (code=${json.code}): ${json.msg || '未知错误'}`);
  }
  return json.data ?? json;
}

// ============ IPO 数据接口 ============

/**
 * 获取港股即将上市/近期上市的 IPO 列表
 * @param {'upcoming'|'recent'} type
 */
export async function fetchHKIpoList(type = 'upcoming') {
  return await fetchItick('/stock/ipo', { region: 'HK', type });
}

/**
 * 获取港股实时报价
 * @param {string} code 股票代码，如 '700'
 */
export async function fetchHKQuote(code) {
  return await fetchItick('/stock/quote', { region: 'HK', code });
}

/**
 * 批量获取港股实时报价
 * @param {string[]} codes 股票代码数组
 */
export async function fetchHKQuotes(codes) {
  if (!codes || codes.length === 0) return {};
  // iTick 支持逗号分隔批量查询
  const codeStr = codes.join(',');
  try {
    const data = await fetchItick('/stock/quote', { region: 'HK', code: codeStr });
    // 返回可能是数组或单个对象，统一转为 { code: data } 格式
    if (Array.isArray(data)) {
      const result = {};
      data.forEach(item => { if (item.sc || item.code) result[item.sc || item.code] = item; });
      return result;
    }
    if (data && (data.sc || data.code)) {
      return { [data.sc || data.code]: data };
    }
    return data || {};
  } catch (e) {
    console.warn('批量报价获取失败，尝试逐个获取:', e.message);
    // 降级：逐个获取
    const result = {};
    for (const code of codes.slice(0, 5)) { // 限制最多5个避免频率限制
      try {
        const q = await fetchHKQuote(code);
        if (q) result[code] = q;
        await new Promise(r => setTimeout(r, 200)); // 避免频率限制
      } catch (err) {
        console.warn(`获取 ${code} 报价失败:`, err.message);
      }
    }
    return result;
  }
}

/**
 * 获取股票基本信息
 * @param {string} code
 */
export async function fetchHKStockInfo(code) {
  return await fetchItick('/stock/info', { region: 'HK', code });
}

// ============ 数据格式化工具 ============

/**
 * 将 iTick IPO 数据格式化为平台内部格式
 */
export function formatIpoItem(raw) {
  const now = Date.now();
  const listTs = raw.dt; // 毫秒
  const subStart = raw.bs ? raw.bs * 1000 : null;
  const subEnd = raw.es ? raw.es * 1000 : null;

  // 判断状态
  let status = 'upcoming';
  if (listTs && listTs <= now) {
    status = 'listed';
  } else if (subStart && subEnd && now >= subStart && now <= subEnd) {
    status = 'recruiting';
  } else if (subEnd && now > subEnd && listTs && listTs > now) {
    status = 'upcoming';
  }

  // 格式化日期
  const formatDate = (ts) => {
    if (!ts) return '待定';
    const d = new Date(ts);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  };

  // 股票代码格式化（港股加 .HK 后缀）
  const code = raw.sc ? `${String(raw.sc).padStart(5, '0')}.HK` : '待定';

  return {
    id: raw.sc || Math.random(),
    code,
    rawCode: String(raw.sc || ''),
    name: raw.cn || raw.name || '未知',
    nameEn: raw.en || '',
    industry: raw.sector || raw.industry || '未分类',
    industryTag: raw.sector || '未分类',
    status,
    statusLabel: status === 'listed' ? '已上市' : status === 'recruiting' ? '招股中' : '即将上市',
    issuePrice: raw.pr || raw.price || '待定',
    currency: 'HKD',
    listDate: formatDate(listTs),
    recruitStart: formatDate(subStart),
    recruitEnd: formatDate(subEnd),
    marketCap: raw.mc || '待定',
    fundraising: raw.ra || '待定',
    isAH: false,
    aDiscount: '-',
    firstDayChange: '待定',
    firstDayChangeNum: null,
    subscriptionTimes: '待公布',
    darkboardChange: '待定',
    cornerstone: [],
    cornerstoneRatio: '待定',
    // 评分将由本地分析逻辑生成
    score: null,
    scoreBreakdown: { fundamental: 5, valuation: 5, industry: 5, institution: 5, heatLevel: 5 },
    recommendation: '待分析',
    recommendColor: 'gray',
    summary: raw.cn ? `${raw.cn} 港股IPO，发行价 ${raw.pr || '待定'}，预计上市日期 ${formatDate(listTs)}。` : '数据加载中...',
    highlights: [],
    risks: [],
    financials: {
      revenue2024: '待披露',
      netProfit2024: '待披露',
      grossMargin: '待披露',
      pe: '待定',
      roe: '待披露'
    },
    analysis: '数据来源：iTick 实时 API，详细分析请参考招股说明书。',
    _raw: raw
  };
}

/**
 * 将 iTick 报价数据格式化
 */
export function formatQuote(raw) {
  if (!raw) return null;
  return {
    price: parseFloat(raw.ld || raw.lp || raw.close || 0),
    change: parseFloat(raw.chp || raw.change_percent || 0),
    changeAbs: parseFloat(raw.ch || raw.change || 0),
    volume: raw.v || raw.volume || 0,
    open: parseFloat(raw.o || raw.open || 0),
    high: parseFloat(raw.h || raw.high || 0),
    low: parseFloat(raw.l || raw.low || 0),
    prevClose: parseFloat(raw.pc || raw.prev_close || 0),
    timestamp: raw.t || raw.timestamp || Date.now()
  };
}

// ============ API 连通性测试 ============
export async function testConnection() {
  try {
    // 用腾讯(700)测试连通性
    const data = await fetchHKQuote('700');
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}