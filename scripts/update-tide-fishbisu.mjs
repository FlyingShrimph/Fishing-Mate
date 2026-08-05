import { writeFile } from 'node:fs/promises';
const now = new Date();
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now);
const month = date.slice(0, 7);
const day = date.slice(8, 10);
const url = `https://fishbisu.com/harbors/%EB%B6%80%EC%82%B0/calendar/${month}`;
const html = await (await fetch(url, { headers: { 'User-Agent': 'Fishing-Mate/1.0' } })).text();
const start = html.indexOf(`2026-${month.slice(5)}-${day}`);
const end = html.indexOf(`2026-${month.slice(5)}-${String(Number(day) + 1).padStart(2, '0')}`, start + 10);
const block = html.slice(start, end > start ? end : start + 30000);
const points = [];
for (const type of ['low', 'high']) {
  const re = new RegExp(`${type}-(\\d{2}:\\d{2})-[^\\n]{0,600}?children\\\":\\\"(\\d+)cm`, 'g');
  for (const match of block.matchAll(re)) points.push({ time: `${date}T${match[1]}:00+09:00`, levelCm: Number(match[2]), type: type === 'low' ? '간조' : '만조' });
}
points.sort((a, b) => new Date(a.time) - new Date(b.time));
if (!points.length) throw new Error('No tide events found on Fishbisu page.');
await writeFile('tide-data.json', JSON.stringify({ updatedAt: now.toISOString(), station: '부산', source: '낚시비서 부산 물때 달력', sourceUrl: url, points }, null, 2) + '\n');
