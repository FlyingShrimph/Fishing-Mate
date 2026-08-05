(() => {
  const card = document.querySelector('.zone');
  if (!card) return;
  const zones = [
    { name: '송정 방파제 외곽', lat: 35.1796, lon: 129.1996, warning: '너울성 파도 · 접근 주의' },
    { name: '구덕포 갯바위', lat: 35.1747, lon: 129.2075, warning: '미끄럼 주의' }
  ];
  const distance = (a, b) => { const R=6371000, p=Math.PI/180, x=(b.lat-a.lat)*p, y=(b.lon-a.lon)*p; return 2*R*Math.asin(Math.sqrt(Math.sin(x/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(y/2)**2)); };
  window.addEventListener('fishingmate:location', event => {
    const here = { lat: event.detail.latitude, lon: event.detail.longitude };
    const nearest = zones.map(zone => ({ ...zone, meters: distance(here, zone) })).sort((a,b) => a.meters-b.meters)[0];
    const badge = card.querySelector('.badge');
    const rows = card.querySelectorAll('.zone-row');
    if (badge) { badge.textContent = nearest.meters < 500 ? '접근 주의' : '안전 거리'; badge.className = `badge ${nearest.meters < 500 ? 'danger' : ''}`; }
    if (rows[0]) rows[0].innerHTML = `<span class="dot ${nearest.meters < 500 ? 'red' : 'orange-dot'}"></span><b>${nearest.name}</b><small>${nearest.warning} · ${Math.round(nearest.meters)}m</small><button>상세</button>`;
    if (rows[1]) rows[1].innerHTML = `<span class="dot"></span><b>현재 위치 기준 안내</b><small>${nearest.meters < 500 ? '위험 지역과 가까워요' : '위험 지역에서 떨어져 있어요'}</small>`;
  });
})();
