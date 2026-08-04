# Fishing Mate

## 실시간 조석 정보 설정

이 사이트는 GitHub Actions가 매일 부산항(`DT_0060`) 조석 예보를 받아 `tide-data.json`으로 저장하고, 정적 페이지가 해당 파일을 읽어 표시합니다.

저장소 Settings → Secrets and variables → Actions에서 `TIDE_API_KEY`를 추가하세요. KHOA 해양수산부 API 키를 사용합니다. 기본 API 주소가 아닌 주소를 사용할 경우 `TIDE_API_URL` secret도 추가할 수 있습니다.

설정 후 Actions → Update Busan tide data → Run workflow를 실행하면 즉시 갱신됩니다. 이후 매일 자동 갱신됩니다.
