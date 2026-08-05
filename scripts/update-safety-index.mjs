import { writeFile } from 'node:fs/promises';

const now = new Date();
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now).replaceAll('-', '');
const url = `https://www.khoa.go.kr/khoa/lifeforecast/getFishingNew.do?areaCode=28&date=${date}`;
const response = await fetch(url, { headers: { Accept: 'application/json', 'User-Agent': 'Fishing-Mate/1.0' } });
if (!response.ok) throw new Error(`KHOA HTTP ${response.status}`);
const raw = await response.json();
const rows = raw?.selectFishing ?? [];
const today = rows.filter(row => String(row.date).replaceAll('-', '') === date);
const selected = today.find(row => row.pred_type === '일') ?? today[0];
if (!selected?.fishingIndex) throw new Error('No 부산남부 fishing index found.');
await writeFile('safety-index-data.json', JSON.stringify({
  updatedAt: now.toISOString(), date, region: '부산남부', index: selected.fishingIndex,
  source: '국립해양조사원(KHOA)', sourceUrl: 'https://www.khoa.go.kr/khoa/lifeforecast/sub5.do'
}, null, 2) + '\n');
