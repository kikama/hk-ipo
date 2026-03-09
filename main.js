// 主逻辑模块 - 支持实时数据更新
import { ipoData, calendarData, liveQuotes, liveNews, simulatePriceUpdate, simulateSubscriptionUpdate, generateLiveNews } from './data.js';
import { initCharts } from './charts.js';

// ============ 实时时钟 ============
function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timeStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const el = document.getElementById('update-time');
  if (el) el.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 1000);

// 初始化图表
initCharts();

// ============ 工具函数 ============
function getStatusConfig(status) {
  const map = {
    listed: { label: '已上市', cls: 'bg-gray-700 text-gray-300', dot: 'bg-gray-400' },
    upcoming: { label: '即将上市', cls: 'bg-blue-900/50 text-blue-300', dot: 'bg-blue-400 animate-pulse' },
    recruiting: { label: '招股中', cls: 'bg-green-900/50 text-green-300', dot: 'bg-green-400 animate-pulse' }
  };
  return map[status] || map.listed;
}

function getScoreColor(score) {
  if (score >= 9) return 'text-green-400';
  if (score >= 7) return 'text-blue-400';
  if (score >= 5) return 'text-yellow-400';
  return 'text-red-400';
}

function getScoreBg(score) {
  if (score >= 9) return 'from-green-500/20 to-green-600/10 border-green-500/30';
  if (score >= 7) return 'from-blue-500/20 to-blue-600/10 border-blue-500/30';
  if (score >= 5) return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
  return 'from-red-500/20 to-red-600/10 border-red-500/30';
}

function getRecommendConfig(rec) {
  const map = {
    '强烈推荐': { cls: 'bg-green-500 text-white', icon: 'fa-fire' },
    '强烈关注': { cls: 'bg-green-500/80 text-white', icon: 'fa-eye' },
    '建议参与': { cls: 'bg-blue-500 text-white', icon: 'fa-thumbs-up' },
    '建议关注': { cls: 'bg-blue-400/80 text-white', icon: 'fa-bell' },
    '谨慎参与': { cls: 'bg-yellow-500 text-gray-900', icon: 'fa-triangle-exclamation' },
    '不建议参与': { cls: 'bg-red-500 text-white', icon: 'fa-ban' }
  };
  return map[rec] || { cls: 'bg-gray-600 text-white', icon: 'fa-circle-info' };
}

function renderScoreBar(value, max = 10) {
  const pct = (value / max) * 100;
  let color = 'bg-red-500';
  if (value >= 9) color = 'bg-green-500';
  else if (value >= 7) color = 'bg-blue-500';
  else if (value >= 5) color = 'bg-yellow-500';
  return `<div class="w-full bg-gray-700 rounded-full h-1.5">
    <div class="${color} h-1.5 rounded-full transition-all duration-700" style="width:${pct}%"></div>
  </div>`;
}

// ============ 实时行情条 ============
let newsQueue = [...liveNews];
let newsTicker = null;

function renderLiveTicker() {
  const container = document.getElementById('live-ticker-content');
  if (!container) return;
  const items = newsQueue.slice(0, 15);
  container.innerHTML = items.map(n => {
    const colorMap = {
      yellow: 'text-yellow-400 bg-yellow-400/10',
      red: 'text-red-400 bg-red-400/10',
      blue: 'text-blue-400 bg-blue-400/10',
      green: 'text-green-400 bg-green-400/10',
      purple: 'text-purple-400 bg-purple-400/10',
      orange: 'text-orange-400 bg-orange-400/10'
    };
    const cls = colorMap[n.color] || 'text-gray-400 bg-gray-400/10';
    return `<span class="inline-flex items-center gap-2 mx-6 shrink-0">
      <span class="text-xs px-1.5 py-0.5 rounded ${cls} font-medium">${n.tag}</span>
      <span class="text-xs text-gray-300">${n.time} ${n.text}</span>
    </span>
    <span class="text-gray-700 mx-2">|</span>`;
  }).join('');
}

function addNewsItem(item) {
  newsQueue.unshift(item);
  if (newsQueue.length > 20) newsQueue.pop();
  renderLiveTicker();
}

// ============ 实时价格面板 ============
function renderLivePrices() {
  const container = document.getElementById('live-prices');
  if (!container) return;
  const listedIpos = ipoData.filter(d => d.status === 'listed' && liveQuotes[d.code]);
  container.innerHTML = listedIpos.map(ipo => {
    const q = liveQuotes[ipo.code];
    const isUp = q.change >= 0;
    return `
    <div class="live-price-item flex items-center gap-3 bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 min-w-[200px]" data-code="${ipo.code}">
      <div class="flex-1">
        <div class="text-sm font-bold text-white">${ipo.name}</div>
        <div class="text-xs text-gray-500">${ipo.code}</div>
      </div>
      <div class="text-right">
        <div class="text-lg font-bold ${isUp ? 'text-green-400' : 'text-red-400'} price-value" data-code="${ipo.code}">${q.price.toFixed(2)}</div>
        <div class="text-xs ${isUp ? 'text-green-400' : 'text-red-400'} change-value" data-code="${ipo.code}">
          ${isUp ? '+' : ''}${q.change.toFixed(2)}%
        </div>
      </div>
      <div class="${isUp ? 'text-green-400' : 'text-red-400'} text-lg">
        <i class="fa-solid ${isUp ? 'fa-caret-up' : 'fa-caret-down'}"></i>
      </div>
    </div>`;
  }).join('');
}

// ============ 实时价格更新（闪烁动画）============
function updateLivePrices() {
  const updates = simulatePriceUpdate();
  Object.keys(updates).forEach(code => {
    const q = updates[code];
    const isUp = q.change >= 0;

    // 更新价格显示
    const priceEl = document.querySelector(`.price-value[data-code="${code}"]`);
    const changeEl = document.querySelector(`.change-value[data-code="${code}"]`);
    const itemEl = document.querySelector(`.live-price-item[data-code="${code}"]`);

    if (priceEl) {
      const oldPrice = parseFloat(priceEl.textContent);
      const newPrice = q.price;
      priceEl.textContent = newPrice.toFixed(2);
      priceEl.className = `text-lg font-bold ${isUp ? 'text-green-400' : 'text-red-400'} price-value`;

      // 闪烁效果
      const flashClass = newPrice > oldPrice ? 'price-flash-up' : newPrice < oldPrice ? 'price-flash-down' : '';
      if (flashClass && itemEl) {
        itemEl.classList.add(flashClass);
        setTimeout(() => itemEl.classList.remove(flashClass), 600);
      }
    }
    if (changeEl) {
      changeEl.textContent = `${isUp ? '+' : ''}${q.change.toFixed(2)}%`;
      changeEl.className = `text-xs ${isUp ? 'text-green-400' : 'text-red-400'} change-value`;
    }
  });
}

// ============ 刷新状态指示器 ============
let isRefreshing = false;
let lastRefreshTime = Date.now();
let refreshInterval = 5; // 秒

function updateRefreshStatus() {
  const elapsed = Math.floor((Date.now() - lastRefreshTime) / 1000);
  const remaining = Math.max(0, refreshInterval - elapsed);
  const el = document.getElementById('refresh-countdown');
  if (el) el.textContent = `${remaining}s`;

  const progressEl = document.getElementById('refresh-progress');
  if (progressEl) {
    const pct = ((refreshInterval - remaining) / refreshInterval) * 100;
    progressEl.style.width = `${pct}%`;
  }
}

function triggerRefresh(manual = false) {
  if (isRefreshing) return;
  isRefreshing = true;
  lastRefreshTime = Date.now();

  const btn = document.getElementById('refresh-btn');
  const indicator = document.getElementById('refresh-indicator');
  if (btn) {
    btn.classList.add('animate-spin');
    btn.disabled = true;
  }
  if (indicator) indicator.classList.remove('hidden');

  // 模拟数据刷新
  setTimeout(() => {
    updateLivePrices();

    // 随机添加新闻
    if (Math.random() > 0.4) {
      addNewsItem(generateLiveNews());
    }

    // 更新招股中标的的认购倍数
    const subUpdates = simulateSubscriptionUpdate();
    subUpdates.forEach(update => {
      const el = document.querySelector(`[data-sub-id="${update.id}"]`);
      if (el) {
        el.textContent = update.subscriptionTimes;
        el.classList.add('data-flash');
        setTimeout(() => el.classList.remove('data-flash'), 800);
      }
    });

    if (btn) {
      btn.classList.remove('animate-spin');
      btn.disabled = false;
    }
    if (indicator) indicator.classList.add('hidden');

    if (manual) {
      showToast('数据已刷新', 'success');
    }

    isRefreshing = false;
  }, 800);
}

// ============ Toast 提示 ============
function showToast(msg, type = 'info') {
  const colorMap = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-blue-500', warning: 'bg-yellow-500' };
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-2xl toast-enter ${colorMap[type] || colorMap.info}`;
  toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============ IPO卡片渲染 ============
let currentFilter = 'all';

function renderIpoCard(ipo) {
  const statusCfg = getStatusConfig(ipo.status);
  const recCfg = getRecommendConfig(ipo.recommendation);
  const scoreColor = getScoreColor(ipo.score);
  const scoreBg = getScoreBg(ipo.score);

  const firstDayHtml = ipo.firstDayChangeNum !== null
    ? `<span class="${ipo.firstDayChangeNum >= 0 ? 'text-green-400' : 'text-red-400'} font-bold">${ipo.firstDayChange}</span>`
    : `<span class="text-gray-500">${ipo.firstDayChange}</span>`;

  // 实时价格（已上市股票）
  const liveQ = liveQuotes[ipo.code];
  const livePriceHtml = liveQ
    ? `<div class="flex items-center gap-1 mt-1">
        <span class="text-xs text-gray-500">实时：</span>
        <span class="text-xs font-bold ${liveQ.change >= 0 ? 'text-green-400' : 'text-red-400'} live-card-price" data-code="${ipo.code}">${liveQ.price.toFixed(2)}</span>
        <span class="text-xs ${liveQ.change >= 0 ? 'text-green-400' : 'text-red-400'} live-card-change" data-code="${ipo.code}">(${liveQ.change >= 0 ? '+' : ''}${liveQ.change.toFixed(2)}%)</span>
        <span class="w-1.5 h-1.5 rounded-full ${liveQ.change >= 0 ? 'bg-green-400' : 'bg-red-400'} animate-pulse ml-1"></span>
      </div>`
    : '';

  // 招股中标的显示实时认购倍数
  const subTimesDisplay = ipo.status === 'recruiting'
    ? `<span data-sub-id="${ipo.id}" class="text-yellow-400 font-semibold">${ipo.subscriptionTimes}</span>`
    : `<span class="text-yellow-400">${ipo.isAH ? ipo.aDiscount : ipo.subscriptionTimes}</span>`;

  return `
  <div class="ipo-card bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 cursor-pointer group"
       data-id="${ipo.id}" data-status="${ipo.status}">
    <div class="p-5 pb-3">
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${statusCfg.cls}">
              <span class="w-1.5 h-1.5 rounded-full ${statusCfg.dot}"></span>
              ${statusCfg.label}
            </span>
            ${ipo.isAH ? '<span class="text-xs px-2 py-0.5 rounded-full bg-orange-900/50 text-orange-300">A+H股</span>' : ''}
            ${ipo.status === 'recruiting' ? '<span class="text-xs px-2 py-0.5 rounded-full bg-green-900/50 text-green-300 live-badge"><i class="fa-solid fa-circle text-green-400 text-xs mr-1 animate-pulse"></i>实时</span>' : ''}
          </div>
          <h3 class="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">${ipo.name}</h3>
          <div class="text-xs text-gray-500 mt-0.5">${ipo.code} · ${ipo.industryTag}</div>
          ${livePriceHtml}
        </div>
        <div class="bg-gradient-to-br ${scoreBg} border rounded-xl p-3 text-center min-w-[60px]">
          <div class="text-2xl font-bold ${scoreColor}">${ipo.score}</div>
          <div class="text-xs text-gray-400 mt-0.5">评分</div>
        </div>
      </div>

      <div class="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full ${recCfg.cls} mb-3">
        <i class="fa-solid ${recCfg.icon} text-xs"></i>
        ${ipo.recommendation}
      </div>

      <p class="text-xs text-gray-400 leading-relaxed line-clamp-2">${ipo.summary}</p>
    </div>

    <div class="px-5 py-3 border-t border-gray-800 grid grid-cols-3 gap-3">
      <div class="text-center">
        <div class="text-xs text-gray-500 mb-1">发行价</div>
        <div class="text-sm font-semibold text-white">${typeof ipo.issuePrice === 'number' ? ipo.issuePrice + ' HKD' : ipo.issuePrice}</div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 mb-1">首日涨跌</div>
        <div class="text-sm font-semibold">${firstDayHtml}</div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 mb-1">${ipo.status === 'recruiting' ? '认购倍数' : ipo.isAH ? 'H股折价' : '认购倍数'}</div>
        <div class="text-sm font-semibold">${subTimesDisplay}</div>
      </div>
    </div>

    <div class="px-5 py-3 border-t border-gray-800 space-y-1.5">
      <div class="flex items-center gap-2 text-xs">
        <span class="text-gray-500 w-14 shrink-0">基本面</span>
        ${renderScoreBar(ipo.scoreBreakdown.fundamental)}
        <span class="${getScoreColor(ipo.scoreBreakdown.fundamental)} w-6 text-right">${ipo.scoreBreakdown.fundamental}</span>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span class="text-gray-500 w-14 shrink-0">估值</span>
        ${renderScoreBar(ipo.scoreBreakdown.valuation)}
        <span class="${getScoreColor(ipo.scoreBreakdown.valuation)} w-6 text-right">${ipo.scoreBreakdown.valuation}</span>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span class="text-gray-500 w-14 shrink-0">行业</span>
        ${renderScoreBar(ipo.scoreBreakdown.industry)}
        <span class="${getScoreColor(ipo.scoreBreakdown.industry)} w-6 text-right">${ipo.scoreBreakdown.industry}</span>
      </div>
      <div class="flex items-center gap-2 text-xs">
        <span class="text-gray-500 w-14 shrink-0">机构</span>
        ${renderScoreBar(ipo.scoreBreakdown.institution)}
        <span class="${getScoreColor(ipo.scoreBreakdown.institution)} w-6 text-right">${ipo.scoreBreakdown.institution}</span>
      </div>
    </div>

    <div class="px-5 py-3 border-t border-gray-800 flex items-center justify-between">
      <div class="text-xs text-gray-500">
        <i class="fa-regular fa-calendar mr-1"></i>
        ${ipo.listDate}
      </div>
      <button class="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
        查看详情 <i class="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </div>
  </div>`;
}

function renderIpoCards(filter = 'all') {
  const container = document.getElementById('ipo-cards');
  const filtered = filter === 'all' ? ipoData : ipoData.filter(d => d.status === filter);
  container.innerHTML = filtered.map(renderIpoCard).join('');

  container.querySelectorAll('.ipo-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openModal(id);
    });
  });
}

renderIpoCards();

// 筛选按钮
document.getElementById('filter-btns').addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active', 'border-blue-500', 'bg-blue-500/20', 'text-blue-400',
      'border-yellow-500', 'text-yellow-400', 'border-green-500', 'text-green-400',
      'border-purple-500', 'text-purple-400');
    b.classList.add('border-gray-700', 'text-gray-400');
  });
  const filter = btn.dataset.filter;
  currentFilter = filter;
  btn.classList.remove('border-gray-700', 'text-gray-400');
  const colorMap = {
    all: ['border-blue-500', 'bg-blue-500/20', 'text-blue-400'],
    recruiting: ['border-yellow-500', 'bg-yellow-500/20', 'text-yellow-400'],
    upcoming: ['border-green-500', 'bg-green-500/20', 'text-green-400'],
    listed: ['border-purple-500', 'bg-purple-500/20', 'text-purple-400']
  };
  btn.classList.add(...(colorMap[filter] || colorMap.all));
  renderIpoCards(filter);
});

// ============ 深度分析标签页 ============
const detailIpos = ipoData.filter(d => d.score >= 7 || d.id <= 3);
let activeDetailId = detailIpos[0]?.id;

function renderDetailTabs() {
  const tabsEl = document.getElementById('detail-tabs');
  tabsEl.innerHTML = detailIpos.map(ipo => `
    <button class="detail-tab shrink-0 text-sm px-4 py-2 rounded-full border transition-all ${
      ipo.id === activeDetailId
        ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400'
        : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
    }" data-id="${ipo.id}">
      ${ipo.name}
      <span class="ml-1 text-xs ${getScoreColor(ipo.score)}">${ipo.score}分</span>
    </button>
  `).join('');

  tabsEl.querySelectorAll('.detail-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeDetailId = parseInt(tab.dataset.id);
      renderDetailTabs();
      renderDetailContent();
    });
  });
}

function renderDetailContent() {
  const ipo = ipoData.find(d => d.id === activeDetailId);
  if (!ipo) return;
  const el = document.getElementById('detail-content');
  const recCfg = getRecommendConfig(ipo.recommendation);
  const scoreColor = getScoreColor(ipo.score);
  const liveQ = liveQuotes[ipo.code];

  el.innerHTML = `
  <div class="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
    <div class="p-6 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-2xl font-bold text-white">${ipo.name}</h3>
            <span class="text-gray-400 text-sm">${ipo.code}</span>
            ${ipo.isAH ? '<span class="text-xs px-2 py-0.5 rounded-full bg-orange-900/50 text-orange-300">A+H股</span>' : ''}
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">${ipo.industryTag}</span>
            <span class="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">发行价：${typeof ipo.issuePrice === 'number' ? ipo.issuePrice + ' HKD' : ipo.issuePrice}</span>
            <span class="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">上市日：${ipo.listDate}</span>
            ${liveQ ? `<span class="text-xs px-2 py-1 rounded-full ${liveQ.change >= 0 ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}">
              <i class="fa-solid fa-circle text-xs mr-1 animate-pulse"></i>实时：${liveQ.price.toFixed(2)} HKD (${liveQ.change >= 0 ? '+' : ''}${liveQ.change.toFixed(2)}%)
            </span>` : ''}
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-center">
            <div class="text-4xl font-bold ${scoreColor}">${ipo.score}</div>
            <div class="text-xs text-gray-400">综合评分</div>
          </div>
          <div class="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl ${recCfg.cls}">
            <i class="fa-solid ${recCfg.icon}"></i>
            ${ipo.recommendation}
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-5">
        <div>
          <h4 class="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-comment-dots"></i> 专业分析
          </h4>
          <p class="text-gray-300 text-sm leading-relaxed bg-gray-800/50 rounded-xl p-4">${ipo.analysis}</p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-circle-check"></i> 投资亮点
          </h4>
          <ul class="space-y-2">
            ${ipo.highlights.map(h => `
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <i class="fa-solid fa-check text-green-400 mt-0.5 shrink-0"></i>${h}
              </li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-triangle-exclamation"></i> 风险提示
          </h4>
          <ul class="space-y-2">
            ${ipo.risks.map(r => `
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <i class="fa-solid fa-xmark text-red-400 mt-0.5 shrink-0"></i>${r}
              </li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="space-y-4">
        <div class="bg-gray-800/50 rounded-xl p-4">
          <h4 class="text-sm font-semibold text-gray-300 mb-3">评分细项</h4>
          <div class="space-y-3">
            ${[
              { label: '基本面质量', key: 'fundamental', color: 'bg-yellow-500' },
              { label: '估值合理性', key: 'valuation', color: 'bg-blue-500' },
              { label: '行业景气度', key: 'industry', color: 'bg-green-500' },
              { label: '机构认可度', key: 'institution', color: 'bg-purple-500' },
              { label: '市场热度', key: 'heatLevel', color: 'bg-orange-500' }
            ].map(item => `
              <div>
                <div class="flex justify-between text-xs text-gray-400 mb-1">
                  <span>${item.label}</span>
                  <span class="${getScoreColor(ipo.scoreBreakdown[item.key])}">${ipo.scoreBreakdown[item.key]}/10</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="${item.color} h-2 rounded-full" style="width:${ipo.scoreBreakdown[item.key] * 10}%"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>

        <div class="bg-gray-800/50 rounded-xl p-4">
          <h4 class="text-sm font-semibold text-gray-300 mb-3">关键财务数据</h4>
          <div class="space-y-2">
            ${[
              { label: '2024年收入', value: ipo.financials.revenue2024 },
              { label: '2024年净利润', value: ipo.financials.netProfit2024 },
              { label: '毛利率', value: ipo.financials.grossMargin },
              { label: '市盈率(PE)', value: ipo.financials.pe },
              { label: '净资产收益率', value: ipo.financials.roe }
            ].map(item => `
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">${item.label}</span>
                <span class="text-gray-200 font-medium">${item.value}</span>
              </div>`).join('')}
          </div>
        </div>

        <div class="bg-gray-800/50 rounded-xl p-4">
          <h4 class="text-sm font-semibold text-gray-300 mb-3">基石投资者</h4>
          ${ipo.cornerstone.length > 0
            ? `<div class="flex flex-wrap gap-2">
                ${ipo.cornerstone.map(c => `<span class="text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-300">${c}</span>`).join('')}
              </div>
              <div class="text-xs text-gray-400 mt-2">基石比例：<span class="text-yellow-400">${ipo.cornerstoneRatio}</span></div>`
            : '<div class="text-xs text-gray-500">暂无基石投资者信息</div>'
          }
        </div>

        <div class="bg-gray-800/50 rounded-xl p-4">
          <h4 class="text-sm font-semibold text-gray-300 mb-3">IPO关键信息</h4>
          <div class="space-y-2">
            ${[
              { label: '募资规模', value: ipo.fundraising },
              { label: '市值', value: ipo.marketCap },
              { label: '认购倍数', value: ipo.subscriptionTimes },
              { label: '暗盘涨跌', value: ipo.darkboardChange }
            ].map(item => `
              <div class="flex justify-between text-xs">
                <span class="text-gray-500">${item.label}</span>
                <span class="text-gray-200 font-medium">${item.value}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

renderDetailTabs();
renderDetailContent();

// ============ 打新日历 ============
function renderCalendar() {
  const container = document.getElementById('calendar-grid');
  const typeConfig = {
    listing: { label: '上市', cls: 'bg-green-900/50 text-green-300 border-green-800' },
    recruiting: { label: '招股', cls: 'bg-blue-900/50 text-blue-300 border-blue-800' },
    upcoming: { label: '待定', cls: 'bg-purple-900/50 text-purple-300 border-purple-800' }
  };

  container.innerHTML = calendarData.map(day => `
    <div class="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-600 transition-all">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="text-lg font-bold text-white">${day.date}</div>
          <div class="text-xs text-gray-500">${day.weekday}</div>
        </div>
        <div class="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
          <i class="fa-regular fa-calendar text-yellow-400 text-sm"></i>
        </div>
      </div>
      <div class="space-y-2">
        ${day.events.map(ev => {
          const cfg = typeConfig[ev.type];
          return `<div class="flex items-center justify-between p-2 rounded-lg border ${cfg.cls}">
            <span class="text-sm font-medium">${ev.name}</span>
            <span class="text-xs px-1.5 py-0.5 rounded bg-black/20">${cfg.label}</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}

renderCalendar();

// ============ 弹窗 ============
function openModal(id) {
  const ipo = ipoData.find(d => d.id === id);
  if (!ipo) return;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  const recCfg = getRecommendConfig(ipo.recommendation);
  const scoreColor = getScoreColor(ipo.score);
  const liveQ = liveQuotes[ipo.code];

  content.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-xl font-bold text-white">${ipo.name} <span class="text-gray-500 text-sm font-normal">${ipo.code}</span></h3>
          <div class="text-sm text-gray-400 mt-1">${ipo.industry} · ${ipo.industryTag}</div>
          ${liveQ ? `<div class="flex items-center gap-2 mt-1">
            <span class="w-1.5 h-1.5 rounded-full ${liveQ.change >= 0 ? 'bg-green-400' : 'bg-red-400'} animate-pulse"></span>
            <span class="text-xs ${liveQ.change >= 0 ? 'text-green-400' : 'text-red-400'}">实时价格：${liveQ.price.toFixed(2)} HKD (${liveQ.change >= 0 ? '+' : ''}${liveQ.change.toFixed(2)}%)</span>
          </div>` : ''}
        </div>
        <button id="close-modal" class="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="flex items-center gap-4 mb-5 p-4 bg-gray-800/50 rounded-xl">
        <div class="text-center">
          <div class="text-3xl font-bold ${scoreColor}">${ipo.score}</div>
          <div class="text-xs text-gray-400">综合评分</div>
        </div>
        <div class="flex-1">
          <div class="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${recCfg.cls} mb-2">
            <i class="fa-solid ${recCfg.icon}"></i>
            ${ipo.recommendation}
          </div>
          <p class="text-xs text-gray-400">${ipo.summary}</p>
        </div>
      </div>

      <div class="mb-4">
        <h4 class="text-sm font-semibold text-yellow-400 mb-2">专业分析</h4>
        <p class="text-sm text-gray-300 leading-relaxed">${ipo.analysis}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 class="text-sm font-semibold text-green-400 mb-2">投资亮点</h4>
          <ul class="space-y-1">
            ${ipo.highlights.slice(0, 3).map(h => `<li class="text-xs text-gray-300 flex items-start gap-1.5"><i class="fa-solid fa-check text-green-400 mt-0.5 shrink-0"></i>${h}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-red-400 mb-2">风险提示</h4>
          <ul class="space-y-1">
            ${ipo.risks.slice(0, 3).map(r => `<li class="text-xs text-gray-300 flex items-start gap-1.5"><i class="fa-solid fa-xmark text-red-400 mt-0.5 shrink-0"></i>${r}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 p-4 bg-gray-800/50 rounded-xl text-center">
        <div>
          <div class="text-xs text-gray-500 mb-1">发行价</div>
          <div class="text-sm font-bold text-white">${typeof ipo.issuePrice === 'number' ? ipo.issuePrice + ' HKD' : ipo.issuePrice}</div>
        </div>
        <div>
          <div class="text-xs text-gray-500 mb-1">首日涨跌</div>
          <div class="text-sm font-bold ${ipo.firstDayChangeNum !== null ? (ipo.firstDayChangeNum >= 0 ? 'text-green-400' : 'text-red-400') : 'text-gray-400'}">${ipo.firstDayChange}</div>
        </div>
        <div>
          <div class="text-xs text-gray-500 mb-1">上市日期</div>
          <div class="text-sm font-bold text-white">${ipo.listDate}</div>
        </div>
      </div>
    </div>
  `;

  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
  document.getElementById('close-modal').addEventListener('click', closeModal);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  overlay.classList.remove('flex');
}

document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});

// ============ 平滑滚动 ============
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============ 手动刷新按钮 ============
const refreshBtn = document.getElementById('refresh-btn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => triggerRefresh(true));
}

// ============ 初始化实时组件 ============
renderLiveTicker();
renderLivePrices();

// ============ 自动轮询定时器 ============
// 每5秒更新价格
setInterval(() => {
  updateLivePrices();
  // 同步更新卡片中的实时价格
  Object.keys(liveQuotes).forEach(code => {
    const q = liveQuotes[code];
    document.querySelectorAll(`.live-card-price[data-code="${code}"]`).forEach(el => {
      el.textContent = q.price.toFixed(2);
      el.className = `text-xs font-bold ${q.change >= 0 ? 'text-green-400' : 'text-red-400'} live-card-price`;
    });
    document.querySelectorAll(`.live-card-change[data-code="${code}"]`).forEach(el => {
      el.textContent = `(${q.change >= 0 ? '+' : ''}${q.change.toFixed(2)}%)`;
      el.className = `text-xs ${q.change >= 0 ? 'text-green-400' : 'text-red-400'} live-card-change`;
    });
  });
  updateRefreshStatus();
}, 5000);

// 每15秒添加新闻
setInterval(() => {
  addNewsItem(generateLiveNews());
}, 15000);

// 每30秒更新招股倍数
setInterval(() => {
  const subUpdates = simulateSubscriptionUpdate();
  subUpdates.forEach(update => {
    const el = document.querySelector(`[data-sub-id="${update.id}"]`);
    if (el) {
      el.textContent = update.subscriptionTimes;
      el.classList.add('data-flash');
      setTimeout(() => el.classList.remove('data-flash'), 800);
    }
  });
}, 30000);

// 倒计时更新
setInterval(updateRefreshStatus, 1000);
updateRefreshStatus();
