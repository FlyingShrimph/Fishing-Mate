(() => {
  const container = document.querySelector('.zone-map');
  if (!container) return;
  const css = document.createElement('link'); css.rel='stylesheet'; css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
  const script = document.createElement('script'); script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = () => {
    setTimeout(() => {
    container.innerHTML = '<div id="live-danger-map"></div>';
    const map = L.map('live-danger-map', { zoomControl: true }).setView([35.1796,129.1996], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
    const zones = [
      { name:'화명 생태공원', lat:35.2050, lon:129.0120, color:'#ee6a52', text:'수변 접근 주의' },
      { name:'삼락 생태공원', lat:35.1700, lon:128.9900, color:'#ee6a52', text:'수변 접근 주의' },
      { name:'일광해수욕장', lat:35.2630, lon:129.2500, color:'#edae45', text:'해파리 출현 주의' },
      { name:'부산항 앞바다', lat:35.0750, lon:129.0750, color:'#ee6a52', text:'선박 통항 · 접근 주의' },
      { name:'고래섬(모자섬)', lat:35.0450, lon:128.9700, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'중리해변', lat:35.0650, lon:129.0650, color:'#ee6a52', text:'해안 접근 주의' },
      { name:'동삼동 어항 방파제', lat:35.0750, lon:129.0770, color:'#ee6a52', text:'방파제 접근 주의' },
      { name:'신전항', lat:35.0900, lon:128.9300, color:'#ee6a52', text:'항구 접근 주의' },
      { name:'국제수산물 도매시장', lat:35.0760, lon:129.0170, color:'#ee6a52', text:'돌제부두 접근 주의' },
      { name:'해운대해수욕장', lat:35.1580, lon:129.1600, color:'#ee6a52', text:'해안 접근 주의' },
      { name:'홍티항', lat:35.0700, lon:128.9800, color:'#ee6a52', text:'항구 접근 주의' },
      { name:'명지 중리항', lat:35.1100, lon:128.9200, color:'#ee6a52', text:'포구 접근 주의' },
      { name:'공수항 방파제', lat:35.1900, lon:129.2300, color:'#ee6a52', text:'방파제 접근 주의' },
      { name:'동백섬 갯바위', lat:35.1530, lon:129.1520, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'이기대 어울마당 갯바위', lat:35.1220, lon:129.1200, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'오륙도 스카이워크 밑 갯바위', lat:35.1000, lon:129.1240, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'화손대 갯바위', lat:35.0400, lon:128.9700, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'오랑대 갯바위', lat:35.2000, lon:129.2400, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'외양포 갯바위', lat:34.9900, lon:128.8200, color:'#ee6a52', text:'갯바위 접근 주의' },
      { name:'감수서', lat:35.0200, lon:128.8300, color:'#ee6a52', text:'갯바위 접근 주의' }
    ];
    zones.forEach(zone => { L.circleMarker([zone.lat,zone.lon],{radius:8,color:zone.color,fillColor:zone.color,fillOpacity:.95}).addTo(map).bindPopup(`<b>${zone.name}</b><br>${zone.text}`); L.circle([zone.lat,zone.lon],{radius:500,color:zone.color,fillColor:zone.color,fillOpacity:.08,weight:1}).addTo(map); });
    const list = document.createElement('div'); list.className = 'danger-zone-list'; list.innerHTML = '<b>등록된 위험 구역</b><div class="danger-zone-items"></div><div class="danger-zone-pages"><button type="button" class="zone-prev">이전</button><span class="zone-page"></span><button type="button" class="zone-next">다음</button></div>'; container.parentElement.appendChild(list);
    let page = 0; const pageSize = 5; const items = list.querySelector('.danger-zone-items'); const pageLabel = list.querySelector('.zone-page');
    const renderZonePage = () => { const total = Math.ceil(zones.length / pageSize); page = Math.max(0, Math.min(page, total - 1)); items.innerHTML = zones.slice(page * pageSize, page * pageSize + pageSize).map(zone => `<span>● ${zone.name}</span>`).join(''); pageLabel.textContent = `${page + 1} / ${total}`; list.querySelector('.zone-prev').disabled = page === 0; list.querySelector('.zone-next').disabled = page === total - 1; };
    list.querySelector('.zone-prev').onclick = () => { page--; renderZonePage(); }; list.querySelector('.zone-next').onclick = () => { page++; renderZonePage(); }; renderZonePage();
    let current;
    window.addEventListener('fishingmate:location', event => {
      const { latitude, longitude } = event.detail;
      if (current) current.remove();
      current = L.circleMarker([latitude,longitude],{radius:9,color:'#2868e5',fillColor:'#2868e5',fillOpacity:1,weight:3}).addTo(map).bindPopup('<b>현재 위치</b>').openPopup();
      map.setView([latitude,longitude], 14);
    });
    setTimeout(() => map.invalidateSize(), 250);
    }, 1200);
  };
  document.head.appendChild(script);
})();
