(() => {
  const card = document.querySelector('.tide');
  if (!card) return;
  fetch('tide-data.json?v=chart-1').then(r => r.json()).then(data => {
    const points = data.points || [];
    if (points.length < 2) return;
    const old = card.querySelector('.tide-live-graph');
    if (old) old.remove();
    const wrap = document.createElement('div');
    wrap.className = 'tide-chart-wrap';
    wrap.innerHTML = '<div class="tide-chart-head"><span>현재 수위 흐름</span><b id="tide-chart-now"></b></div><svg class="tide-chart" viewBox="0 0 600 150" preserveAspectRatio="none" aria-label="현재 시각 기준 수위 그래프"><path id="tide-chart-line"></path><circle id="tide-chart-dot" r="6"></circle></svg><div class="tide-chart-axis"><span>간조</span><span>현재</span><span>만조</span></div>';
    card.querySelector('.timeline').after(wrap);
    const times = points.map(p => new Date(p.time).getTime()), levels = points.map(p => Number(p.levelCm));
    const min = Math.min(...levels), max = Math.max(...levels), start = times[0], end = times[times.length - 1];
    const valueAt = now => {
      if (now <= start) return levels[0];
      if (now >= end) return levels[levels.length - 1];
      let i = times.findIndex(t => t > now) - 1; if (i < 0) i = 0;
      const ratio = (now - times[i]) / (times[i + 1] - times[i]);
      return levels[i] + (levels[i + 1] - levels[i]) * (0.5 - 0.5 * Math.cos(Math.PI * ratio));
    };
    const render = () => {
      const now = Date.now(), current = valueAt(now), span = Math.max(1, end - start), pts = [];
      for (let i = 0; i <= 100; i++) { const t = start + span * i / 100; const v = valueAt(t); pts.push(`${i * 6},${140 - ((v - min) / Math.max(1, max - min)) * 105}`); }
      document.getElementById('tide-chart-line').setAttribute('d', 'M' + pts.join(' L'));
      const x = Math.max(0, Math.min(600, (now - start) / span * 600));
      const y = 140 - ((current - min) / Math.max(1, max - min)) * 105;
      const dot = document.getElementById('tide-chart-dot'); dot.setAttribute('cx', x); dot.setAttribute('cy', y);
      document.getElementById('tide-chart-now').textContent = `${new Intl.DateTimeFormat('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(now))} · 약 ${Math.round(current)}cm`;
    };
    render(); setInterval(render, 60000);
  }).catch(() => {});
})();
