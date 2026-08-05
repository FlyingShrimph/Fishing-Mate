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
      { name:'부산항 앞바다', lat:35.0750, lon:129.0750, color:'#ee6a52', text:'선박 통항 · 접근 주의' }
    ];
    zones.forEach(zone => { L.circleMarker([zone.lat,zone.lon],{radius:8,color:zone.color,fillColor:zone.color,fillOpacity:.95}).addTo(map).bindPopup(`<b>${zone.name}</b><br>${zone.text}`); L.circle([zone.lat,zone.lon],{radius:500,color:zone.color,fillColor:zone.color,fillOpacity:.08,weight:1}).addTo(map); });
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
