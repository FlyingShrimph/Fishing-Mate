(() => {
  const button = document.getElementById('isolation');
  const card = document.querySelector('.tide');
  const toast = document.getElementById('toast');
  if (!button || !card || !toast) return;
  button.textContent = '조석 알림 설정하기　→';
  const show = message => { toast.innerHTML = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 5000); };
  button.addEventListener('click', event => {
    event.preventDefault(); event.stopImmediatePropagation();
    let menu = card.querySelector('.tide-alert-menu');
    if (menu) { menu.remove(); return; }
    menu = document.createElement('div'); menu.className = 'tide-alert-menu';
    menu.innerHTML = '<b>알림 받을 조석을 선택하세요</b><div><button data-kind="만조">만조 30분 전</button><button data-kind="간조">간조 30분 전</button></div>';
    button.before(menu);
    menu.querySelectorAll('button').forEach(option => option.onclick = () => schedule(option.dataset.kind));
  }, true);
  function schedule(kind) {
    fetch(`tide-data.json?v=alert-${Date.now()}`).then(r => r.json()).then(data => {
      const event = data.points.find(point => (Number(point.levelCm) > 100 ? '만조' : '간조') === kind && new Date(point.time).getTime() > Date.now());
      if (!event) { show(`오늘 예정된 ${kind} 정보가 없습니다.`); return; }
      const alertAt = new Date(event.time).getTime() - 30 * 60 * 1000;
      const wait = alertAt - Date.now();
      if (wait <= 0) { show(`${kind} 시간이 30분 이내입니다.`); return; }
      if ('Notification' in window && Notification.permission === 'default') Notification.requestPermission();
      const notify = () => { const time = new Intl.DateTimeFormat('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(event.time)); if ('Notification' in window && Notification.permission === 'granted') new Notification(`조석 알림 · ${kind}`, { body: `${time} ${kind} 예정 수위 ${event.levelCm}cm까지 30분 남았습니다.` }); show(`${kind} 알림을 ${Math.round(wait / 60000)}분 후에 보내도록 설정했습니다.`); };
      setTimeout(notify, wait); localStorage.setItem('fishingmate-tide-alert', JSON.stringify({ kind, event: event.time }));
      card.querySelector('.tide-alert-menu')?.remove();
    }).catch(() => show('조석 데이터를 불러오지 못했습니다.'));
  }
})();
