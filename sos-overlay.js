(() => {
  const button = document.getElementById('sos');
  if (!button) return;
  button.addEventListener('click', event => {
    event.preventDefault(); event.stopImmediatePropagation();
    if (document.getElementById('sos-overlay')) return;
    const overlay = document.createElement('div'); overlay.id = 'sos-overlay';
    overlay.innerHTML = '<div class="sos-message"><div class="sos-icon">!</div><h2>긴급 신고 접수중</h2><p>신고 시 아래 현재 좌표를 알려주세요.</p><div class="sos-coordinates">현재 위치 확인 중…</div><button class="sos-close">닫기</button></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.sos-close').onclick = () => overlay.remove();
    const coordinates = overlay.querySelector('.sos-coordinates');
    if (!navigator.geolocation) { coordinates.textContent = '이 브라우저에서는 위치 정보를 사용할 수 없습니다.'; return; }
    navigator.geolocation.getCurrentPosition(position => { coordinates.textContent = `위도 ${position.coords.latitude.toFixed(6)} · 경도 ${position.coords.longitude.toFixed(6)}`; }, () => { coordinates.textContent = '위치 권한을 허용하면 현재 좌표가 표시됩니다.'; }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
  }, true);
})();
