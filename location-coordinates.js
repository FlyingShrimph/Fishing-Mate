(() => {
  const button = document.getElementById('locate');
  const toast = document.getElementById('toast');
  if (!button || !toast) return;
  const show = message => { toast.innerHTML = message; toast.classList.add('show'); };
  button.addEventListener('click', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!navigator.geolocation) { show('이 브라우저에서는 위치 정보를 사용할 수 없습니다.'); return; }
    show('현재 위치를 확인하는 중입니다…');
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude.toFixed(6);
      const lon = position.coords.longitude.toFixed(6);
      const accuracy = Math.round(position.coords.accuracy);
      window.dispatchEvent(new CustomEvent('fishingmate:location', { detail: { latitude: position.coords.latitude, longitude: position.coords.longitude } }));
      show(`<b>현재 위치</b><br>위도 ${lat} · 경도 ${lon}<br><small>정확도 약 ${accuracy}m</small>`);
    }, error => show(error.code === 1 ? '위치 권한을 허용해 주세요.' : '현재 위치를 확인하지 못했습니다.'), { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
  }, true);
})();
