(() => {
  const card = document.querySelector('.species');
  if (!card) return;
  card.innerHTML = '<div class="panel-head"><div><span class="tag violet">SPECIES CHECK</span><h2>묘사로 어종 확인</h2></div><span class="count">사용자 입력 기반</span></div><div class="description-box"><div class="fish">♓</div><b>물고기의 특징을 입력하세요</b><small>색상, 크기, 무늬, 모양, 발견 장소를 자세히 적어주세요.</small><textarea id="species-description" placeholder="예: 은빛 몸통, 검은 줄무늬, 약 25cm, 방파제에서 잡았어요"></textarea></div><div class="fish-actions"><button class="secondary" id="species-clear">지우기</button><button class="primary" id="species-check">어종 확인</button></div><div class="safe">✓ 결과는 참고용이며 확실하지 않으면 만지지 마세요.</div><div id="species-result" hidden></div>';
  const input = document.getElementById('species-description');
  const result = document.getElementById('species-result');
  document.getElementById('species-clear').onclick = () => { input.value = ''; result.hidden = true; };
  document.getElementById('species-check').onclick = () => {
    const text = input.value.trim();
    if (!text) { alert('물고기의 특징을 먼저 입력해 주세요.'); return; }
    const danger = ['복어','쏨뱅이','미역치','쑤기미','독','가시'].some(word => text.includes(word));
    const group = text.includes('줄무늬') ? '돌돔·벤자리 등 줄무늬 어종' : text.includes('은빛') ? '전갱이·고등어 등 회유성 어종' : text.includes('납작') ? '가자미·광어 등 납작한 어종' : '특징이 비슷한 연안 어종';
    result.hidden = false;
    result.innerHTML = `<b>예상 어종군: ${group}</b><p>${danger ? '독성이나 가시가 있을 수 있으니 만지지 말고 전문가에게 확인받으세요.' : '몸 길이, 지느러미 색, 발견 장소를 더 입력하면 정확도가 높아집니다.'}</p>`;
  };
})();
