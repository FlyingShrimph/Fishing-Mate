(() => {
  const container = document.querySelector('.zone-map');
  if (!container) return;
  const css = document.createElement('link'); css.rel='stylesheet'; css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
  const script = document.createElement('script'); script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  script.onload = () => {
    container.innerHTML = '<div id="live-danger-map"></div>';
    const map = L.map('live-danger-map', { zoomControl: true }).setView([35.1796,129.1996], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors' }).addTo(map);
    const zones = [
      { name:'송정 방파제 외곽', lat:35.1796, lon:129.1996, color:'#ee6a52', text:'너울성 파도 · 접근 주의' },
      { name:'구덕포 갯바위', lat:35.1747, lon:129.2075, color:'#edae45', text:'미끄럼 주의' }
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
  };
  document.head.appendChild(script);
})();
