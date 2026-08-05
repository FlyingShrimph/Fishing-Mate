(() => {
  const card = document.querySelector('.zone');
  if (!card) return;
  const zones = [
    { name: '화명 생태공원', lat: 35.2050, lon: 129.0120, warning: '수변 접근 주의' },
    { name: '삼락 생태공원', lat: 35.1700, lon: 128.9900, warning: '수변 접근 주의' },
    { name: '일광해수욕장', lat: 35.2630, lon: 129.2500, warning: '해파리 출현 주의' },
    { name: '부산항 앞바다', lat: 35.0750, lon: 129.0750, warning: '선박 통항 · 접근 주의', severity: 'danger' }
  ];
  const distance = (a, b) => { const R=6371000, p=Math.PI/180, x=(b.lat-a.lat)*p, y=(b.lon-a.lon)*p; return 2*R*Math.asin(Math.sqrt(Math.sin(x/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(y/2)**2)); };
  window.addEventListener('fishingmate:location', event => {
    const here = { lat: event.detail.latitude, lon: event.detail.longitude };
    const nearest = zones.map(zone => ({ ...zone, meters: distance(here, zone) })).sort((a,b) => a.meters-b.meters)[0];
    const badge = card.querySelector('.badge');
    const rows = card.querySelectorAll('.zone-row');
    const isDanger = nearest.severity === 'danger' || nearest.meters < 500;
    if (badge) { badge.textContent = isDanger ? '접근 주의' : '안전 거리'; badge.className = `badge ${isDanger ? 'danger' : ''}`; }
    if (rows[0]) rows[0].innerHTML = `<span class="dot ${isDanger ? 'red' : 'orange-dot'}"></span><b>${nearest.name}</b><small>${nearest.warning} · ${Math.round(nearest.meters)}m</small><button>상세</button>`;
    if (rows[1]) rows[1].innerHTML = `<span class="dot"></span><b>현재 위치 기준 안내</b><small>${nearest.meters < 500 ? '위험 지역과 가까워요' : '위험 지역에서 떨어져 있어요'}</small>`;
  });
})();
