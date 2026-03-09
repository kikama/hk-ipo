// 图表模块
import { chartData } from './data.js';

export function initCharts() {
  initIndustryChart();
  initMonthlyChart();
  initPerformanceChart();
}

function initIndustryChart() {
  const el = document.getElementById('industryChart');
  if (!el) return;
  const chart = echarts.init(el, 'dark');
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)',
      backgroundColor: '#1f2937',
      borderColor: '#374151',
      textStyle: { color: '#e5e7eb', fontSize: 12 }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#9ca3af', fontSize: 10 },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['38%', '50%'],
      avoidLabelOverlap: false,
      label: { show: false },
      emphasis: {
        label: { show: true, fontSize: 12, fontWeight: 'bold', color: '#fff' }
      },
      data: chartData.industry.labels.map((label, i) => ({
        name: label,
        value: chartData.industry.values[i],
        itemStyle: {
          color: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#6b7280'][i]
        }
      }))
    }]
  });
  window.addEventListener('resize', () => chart.resize());
}

function initMonthlyChart() {
  const el = document.getElementById('monthlyChart');
  if (!el) return;
  const chart = echarts.init(el, 'dark');
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1f2937',
      borderColor: '#374151',
      textStyle: { color: '#e5e7eb', fontSize: 12 },
      formatter: (params) => `${params[0].name}<br/>募资：${params[0].value}亿港元`
    },
    grid: { left: '5%', right: '5%', top: '10%', bottom: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      data: chartData.monthly.months,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9ca3af', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#1f2937' } },
      axisLabel: { color: '#9ca3af', fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: chartData.monthly.values,
      barWidth: '50%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#1d4ed8' }
          ]
        },
        borderRadius: [4, 4, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        color: '#9ca3af',
        fontSize: 10,
        formatter: '{c}亿'
      }
    }]
  });
  window.addEventListener('resize', () => chart.resize());
}

function initPerformanceChart() {
  const el = document.getElementById('performanceChart');
  if (!el) return;
  const chart = echarts.init(el, 'dark');
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981', '#06b6d4'];
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1f2937',
      borderColor: '#374151',
      textStyle: { color: '#e5e7eb', fontSize: 12 },
      formatter: (params) => `${params[0].name}<br/>数量：${params[0].value}只`
    },
    grid: { left: '5%', right: '5%', top: '10%', bottom: '20%', containLabel: true },
    xAxis: {
      type: 'category',
      data: chartData.performance.ranges,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#9ca3af', fontSize: 9, rotate: 30 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#1f2937' } },
      axisLabel: { color: '#9ca3af', fontSize: 10 }
    },
    series: [{
      type: 'bar',
      data: chartData.performance.counts.map((v, i) => ({
        value: v,
        itemStyle: { color: colors[i], borderRadius: [4, 4, 0, 0] }
      })),
      barWidth: '55%',
      label: {
        show: true,
        position: 'top',
        color: '#9ca3af',
        fontSize: 10,
        formatter: '{c}只'
      }
    }]
  });
  window.addEventListener('resize', () => chart.resize());
}
