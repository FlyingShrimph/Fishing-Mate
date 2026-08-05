(() => {
  const card = document.querySelector('.zone');
  if (!card) return;
  const zones = [
    { name: '화명 생태공원', lat: 35.2050, lon: 129.0120, warning: '수변 접근 주의' },
    { name: '삼락 생태공원', lat: 35.1700, lon: 128.9900, warning: '수변 접근 주의' },
    { name: '일광해수욕장', lat: 35.2630, lon: 129.2500, warning: '해파리 출현 주의' },
    { name: '부산항 앞바다', lat: 35.0750, lon: 129.0750, warning: '선박 통항 · 접근 주의', severity: 'danger' },
    { name: '고래섬(모자섬)', lat: 35.0450, lon: 128.9700, warning: '갯바위 접근 주의' },
    { name: '중리해변', lat: 35.0650, lon: 129.0650, warning: '해안 접근 주의' },
    { name: '동삼동 어항 방파제', lat: 35.0750, lon: 129.0770, warning: '방파제 접근 주의' },
    { name: '신전항', lat: 35.0900, lon: 128.9300, warning: '항구 접근 주의' },
    { name: '국제수산물 도매시장', lat: 35.0760, lon: 129.0170, warning: '돌제부두 접근 주의' },
    { name: '해운대해수욕장', lat: 35.1580, lon: 129.1600, warning: '해안 접근 주의' },
    { name: '홍티항', lat: 35.0700, lon: 128.9800, warning: '항구 접근 주의' },
    { name: '명지 중리항', lat: 35.1100, lon: 128.9200, warning: '포구 접근 주의' },
    { name: '공수항 방파제', lat: 35.1900, lon: 129.2300, warning: '방파제 접근 주의' },
    { name: '동백섬 갯바위', lat: 35.1530, lon: 129.1520, warning: '갯바위 접근 주의' },
    { name: '이기대 어울마당 갯바위', lat: 35.1220, lon: 129.1200, warning: '갯바위 접근 주의' },
    { name: '오륙도 스카이워크 밑 갯바위', lat: 35.1000, lon: 129.1240, warning: '갯바위 접근 주의' },
    { name: '화손대 갯바위', lat: 35.0400, lon: 128.9700, warning: '갯바위 접근 주의' },
    { name: '오랑대 갯바위', lat: 35.2000, lon: 129.2400, warning: '갯바위 접근 주의' },
    { name: '외양포 갯바위', lat: 34.9900, lon: 128.8200, warning: '갯바위 접근 주의' },
    { name: '감수서', lat: 35.0200, lon: 128.8300, warning: '갯바위 접근 주의' },
    { name: '청사포항 방파제', lat: 35.1600, lon: 129.2000, warning: '방파제 접근 주의' },
    { name: '남항대교옆 TTP', lat: 35.0700, lon: 129.0200, warning: '테트라포드 접근 주의' },
    { name: '마린시티 방파제', lat: 35.1560, lon: 129.1400, warning: '방파제 접근 주의' },
    { name: '민락항 방파제', lat: 35.1530, lon: 129.1260, warning: '방파제 접근 주의' },
    { name: '낫개 방파제 TTP', lat: 35.0500, lon: 128.9700, warning: '테트라포드 접근 주의' },
    { name: '성창 방파제', lat: 35.0450, lon: 128.9650, warning: '방파제 접근 주의' },
    { name: '감천항 서방파제', lat: 35.0750, lon: 129.0000, warning: '항만 접근 주의' },
    { name: '감천항 동방파제', lat: 35.0800, lon: 129.0100, warning: '항만 접근 주의' },
    { name: '새바지항', lat: 34.9900, lon: 128.8200, warning: '항구 접근 주의' },
    { name: '칠암항 방파제', lat: 35.2800, lon: 129.2700, warning: '방파제 접근 주의' },
    { name: '문중항 방파제', lat: 35.2850, lon: 129.2500, warning: '방파제 접근 주의' },
    { name: '월드컵 방파제', lat: 35.2400, lon: 129.2200, warning: '방파제 접근 주의' },
    { name: '두송 방파제', lat: 35.0500, lon: 128.9900, warning: '방파제 접근 주의' }
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
