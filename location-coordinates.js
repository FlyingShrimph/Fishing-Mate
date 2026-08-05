(() => {
  const button = document.getElementById('locate');
  const toast = document.getElementById('toast');
  if (!button || !toast || !navigator.geolocation) return;
  const show = message => { toast.innerHTML = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 6000); };
  button.addEventListener('click', event => {
    event.stopImmediatePropagation();
    show('현재 위치를 확인하는 중입니다…');
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude, accuracy } = position.coords;
      const lat = latitude.toFixed(6), lon = longitude.toFixed(6);
      show(`<b>현재 위치</b><br>위도 ${lat} · 경도 ${lon}<br><small>정확도 약 ${Math.round(accuracy)}m</small>`);
    }, error => {
      const message = error.code === 1 ? '위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해 주세요.' : '현재 위치를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.';
      show(message);
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
  }, true);
})();
