(() => {
  const button = document.getElementById('sos');
  if (!button) return;
  button.addEventListener('click', event => {
    event.preventDefault(); event.stopImmediatePropagation();
    if (document.getElementById('sos-overlay')) return;
    const overlay = document.createElement('div'); overlay.id = 'sos-overlay';
    overlay.innerHTML = '<div class="sos-message"><div class="sos-icon">!</div><h2>긴급 신고 접수중</h2><p>현재 위치와 긴급 상황을 확인하고 있습니다.</p><a href="tel:119" class="sos-call">119 전화 연결</a><button class="sos-close">닫기</button></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.sos-close').onclick = () => overlay.remove();
  }, true);
})();
