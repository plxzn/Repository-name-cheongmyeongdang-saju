# 청명당 AI 사주연구소 - Vercel 배포

## 배포 방법
1. 이 폴더를 GitHub 저장소에 업로드합니다.
2. Vercel에서 **Add New → Project**를 선택하고 저장소를 Import합니다.
3. Environment Variables에 아래 값을 추가합니다.
   - `ANTHROPIC_API_KEY`: Anthropic Console에서 발급한 API 키
   - `ANTHROPIC_MODEL`: `claude-sonnet-4-6` (필요 시 사용 가능한 모델명으로 변경)
4. Deploy를 누릅니다.

## 로컬 실행
```bash
npm install -g vercel
vercel login
vercel dev
```

`.env.local` 파일에 API 키를 넣어 로컬 테스트할 수 있습니다. `.env.local`은 GitHub에 올리지 마세요.

## 구조
- `index.html`: 프론트엔드 및 사주 계산
- `api/fortune.js`: Anthropic API를 안전하게 호출하는 Vercel Serverless Function
- API 키는 브라우저에 전달되지 않습니다.

## 주의
현재 절기 계산은 근사값입니다. 실제 서비스에서는 정밀 절기 데이터와 음양력 변환을 적용하세요.
