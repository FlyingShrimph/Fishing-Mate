import { writeFile } from 'node:fs/promises';

const apiKey = process.env.TIDE_API_KEY;
if (!apiKey) throw new Error('Add TIDE_API_KEY to GitHub Actions secrets.');
const url = new URL(process.env.TIDE_API_URL || 'https://www.khoa.go.kr/oceangrid/grid/api/tideObsPreTab/search.do');
url.searchParams.set('ServiceKey', apiKey);
url.searchParams.set('ObsCode', 'DT_0060');
url.searchParams.set('Date', new Date().toISOString().slice(0, 10).replaceAll('-', ''));
url.searchParams.set('ResultType', 'json');

const res = await fetch(url);
if (!res.ok) throw new Error(`Tide API HTTP ${res.status}`);
const raw = await res.json();
const items = raw?.result?.data ?? raw?.response?.body?.items?.item ?? raw?.items ?? raw?.data ?? [];
const points = (Array.isArray(items) ? items : [items]).map(x => ({
  time: x.tph_time || x.predcDate || x.predicDate || x.tideTime || x.time,
  levelCm: Number(x.tph_level ?? x.tideLevel ?? x.tideHeight ?? x.level)
})).filter(x => x.time && Number.isFinite(x.levelCm)).sort((a, b) => new Date(a.time) - new Date(b.time));
if (!points.length) throw new Error('No tide points found; check API key or response format.');
await writeFile('tide-data.json', JSON.stringify({ updatedAt: new Date().toISOString(), station: '부산항', points }, null, 2) + '\n');
