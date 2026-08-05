(() => {
  const card = document.querySelector('.hero-card');
  if (!card) return;
  card.innerHTML = '<div class="safety-index"><small>KHOA · 바다낚시 안전지수</small><b>부산남부</b><strong id="safety-level">확인 중</strong><span id="safety-date"></span><a href="https://www.khoa.go.kr/khoa/lifeforecast/sub5.do" target="_blank" rel="noopener">공식 지수 보기 ↗</a></div>';
  fetch(`safety-index-data.json?v=${Date.now()}`)
    .then(response => { if (!response.ok) throw new Error('Saved KHOA data unavailable'); return response.json(); })
    .then(data => {
      const value = data.index || '정보 없음';
      const target = document.getElementById('safety-level'); target.textContent = value; target.className = `safety-${value.replaceAll(' ','')}`;
      document.getElementById('safety-date').textContent = `${data.date.slice(4,6)}월 ${data.date.slice(6,8)}일 발표 · 출처 ${data.source}`;
    })
    .catch(() => { document.getElementById('safety-level').textContent = '공식 페이지에서 확인'; document.getElementById('safety-date').textContent = '외부 연결이 제한되었습니다'; });
})();
