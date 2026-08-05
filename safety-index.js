(() => {
  const card = document.querySelector('.hero-card');
  if (!card) return;
  card.innerHTML = '<div class="safety-index"><small>KHOA · 바다낚시 안전지수</small><b>부산남부</b><strong id="safety-level">확인 중</strong><span id="safety-date"></span><a href="https://www.khoa.go.kr/khoa/lifeforecast/sub5.do" target="_blank" rel="noopener">공식 지수 보기 ↗</a></div>';
  const now = new Date(), date = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  fetch(`https://www.khoa.go.kr/khoa/lifeforecast/getFishingNew.do?areaCode=28&date=${date}`, { headers: { Accept: 'application/json' } })
    .then(response => { if (!response.ok) throw new Error('KHOA request failed'); return response.json(); })
    .then(data => {
      const rows = data.selectFishing || [], today = rows.filter(row => String(row.date).replaceAll('-','') === date);
      const level = today.find(row => row.pred_type === '일') || today[0];
      const value = level?.fishingIndex || '정보 없음';
      const target = document.getElementById('safety-level'); target.textContent = value; target.className = `safety-${value.replaceAll(' ','')}`;
      document.getElementById('safety-date').textContent = `${date.slice(4,6)}월 ${date.slice(6,8)}일 발표`;
    })
    .catch(() => { document.getElementById('safety-level').textContent = '공식 페이지에서 확인'; document.getElementById('safety-date').textContent = '외부 연결이 제한되었습니다'; });
})();
