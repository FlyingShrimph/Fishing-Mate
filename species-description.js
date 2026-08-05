(() => {
  const card = document.querySelector('.species');
  if (!card) return;
  card.innerHTML = '<div class="panel-head"><div><span class="tag violet">SPECIES CHECK</span><h2>묘사로 어종 확인</h2></div><span class="count">키워드 분석</span></div><div class="description-box"><div class="fish">♓</div><b>물고기의 특징을 입력하세요</b><small>색상, 크기, 무늬, 지느러미, 발견 장소를 적어주세요.</small><textarea id="species-description" placeholder="예: 은빛 몸통, 검은 줄무늬, 약 25cm, 방파제에서 잡았어요"></textarea></div><div class="fish-actions"><button class="secondary" id="species-clear">지우기</button><button class="primary" id="species-check">어종 확인</button></div><div class="safe">✓ 결과는 참고용이며 확정 진단이 아닙니다. 위험해 보이면 만지지 마세요.</div><div id="species-result" hidden></div>';
  const input = document.getElementById('species-description');
  const result = document.getElementById('species-result');
  document.getElementById('species-clear').onclick = () => { input.value = ''; result.hidden = true; };
  document.getElementById('species-check').onclick = () => {
    const text = input.value.trim();
    if (!text) { alert('물고기의 특징을 먼저 입력해 주세요.'); return; }
    const high = ['복어','쏨뱅이','미역치','쑤기미','독가시','독성','독이','날카로운 가시'].some(word => text.includes(word));
    const caution = ['가시','이빨','쏘','검은색','붉은색'].some(word => text.includes(word));
    const group = text.includes('줄무늬') ? '돌돔·벤자리 계열' : text.includes('은빛') ? '전갱이·고등어 계열' : text.includes('납작') ? '가자미·광어 계열' : text.includes('긴') ? '장어·갈치 계열' : '일반 연안 어종';
    const level = high ? '높음' : caution ? '주의' : '낮음';
    const cls = high ? 'high' : caution ? 'medium' : 'low';
    result.hidden = false; result.className = `fish-result ${cls}`;
    result.innerHTML = `<b>추정 어종군: ${group}</b><p>위험도: <strong>${level}</strong></p><p>${high ? '독성 또는 강한 가시가 의심됩니다. 만지거나 먹지 말고 안전거리를 유지하세요.' : caution ? '가시나 공격성이 있을 수 있습니다. 장갑 없이 만지지 말고 추가 확인이 필요합니다.' : '현재 입력된 키워드에서 뚜렷한 위험 신호는 적습니다. 그래도 야생 어종은 주의해서 다루세요.'}</p><small>판단 키워드: ${[...new Set(['복어','쏘기','가시','줄무늬','은빛','납작','긴'].filter(word => text.includes(word)))].join(', ') || '일반 특징'}</small>`;
  };
})();
