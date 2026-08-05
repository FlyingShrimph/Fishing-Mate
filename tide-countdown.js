(() => {
  const card = document.querySelector('.tide');
  if (!card) return;
  fetch(`tide-data.json?v=countdown-${Date.now()}`).then(r => r.json()).then(data => {
    const points = (data.points || []).filter(point => Number(point.levelCm) > 100).map(point => ({ ...point, at: new Date(point.time).getTime() })).sort((a,b) => a.at-b.at);
    const label = card.querySelector('.tide-main small'), value = card.querySelector('.tide-main strong'), info = card.querySelector('.tide-main span');
    const render = () => { const next = points.find(point => point.at > Date.now()); if (!next) { if(label) label.textContent='오늘의 만조 예보가 종료되었습니다'; if(value) value.textContent='--:--:--'; return; } const remaining=Math.max(0,next.at-Date.now()), total=Math.floor(remaining/1000), h=String(Math.floor(total/3600)).padStart(2,'0'), m=String(Math.floor(total%3600/60)).padStart(2,'0'), s=String(total%60).padStart(2,'0'), time=new Intl.DateTimeFormat('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(next.at)); if(label) label.textContent='다음 만조까지'; if(value) value.textContent=`${h}:${m}:${s}`; if(info) info.innerHTML=`만조 ${time}　<span class="orange">▲ ${next.levelCm}cm</span>`; };
    render(); setInterval(render, 1000);
  }).catch(() => {});
})();
