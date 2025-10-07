# 남편 점수 테스트 사이트 - 할 일 목록

## 1. Google AdSense 설정
- [ ] Google의 사이트 검토 완료 대기 (2-4주 소요)
- [ ] 사이트 승인 후 광고 단위(ad slot) 생성
- [ ] 광고 단위 코드 업데이트
  ```html
  현재: data-ad-slot="XXXXXXXXXX"
  추후: 실제 광고 슬롯 ID로 교체 필요
  ```

## 2. 이미지 관련
- [ ] 파비콘 이미지 제작 및 추가 (32x32 크기)
- [ ] OG 이미지 제작 및 추가 (1200x630 크기)
- [ ] 트위터 카드 이미지 URL 업데이트
  ```html
  현재: content="https://your-website-url.com/og-image.jpg"
  수정: content="https://scoremyoppa.site/images/og-image.jpg"
  ```

## 3. 도메인/호스팅 설정
- [ ] DNS 전파 완료 확인
- [ ] SSL 인증서 정상 작동 확인
- [ ] Cloudflare 설정 최적화
  - [ ] 항상 HTTPS 사용 활성화
  - [ ] 자동 HTTPS 다시 쓰기 활성화
  - [ ] 캐싱 설정 최적화

## 4. 성능 최적화
- [ ] 이미지 최적화
- [ ] CSS/JS 파일 압축
- [ ] 브라우저 캐싱 설정
- [ ] 모바일 성능 테스트

## 5. 테스트
- [ ] 크로스 브라우저 테스트
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] 모바일 디바이스 테스트
  - [ ] iOS
  - [ ] Android
- [ ] 다국어 지원 테스트
  - [ ] 한국어
  - [ ] 영어
  - [ ] 일본어
  - [ ] 중국어

## 6. SEO 최적화
- [ ] robots.txt 파일 생성
- [ ] sitemap.xml 파일 생성
- [ ] Google Search Console 등록
- [ ] 메타 태그 검증

## 7. 분석 도구 설정
- [ ] Google Analytics 설정
- [ ] 이벤트 트래킹 설정
  - [ ] 테스트 시작
  - [ ] 테스트 완료
  - [ ] 결과 공유
  - [ ] 언어 변경

## 8. 보안
- [ ] XSS 방어 검증
- [ ] CSRF 방어 검증
- [ ] 콘텐츠 보안 정책(CSP) 설정
- [ ] 보안 헤더 설정

## 9. 사용자 경험 개선
- [ ] 로딩 애니메이션 최적화
- [ ] 오류 처리 개선
- [ ] 접근성 개선
- [ ] 사용자 피드백 수집 방안 마련

## 우선순위
1. 이미지 관련 작업 (파비콘, OG 이미지)
2. Google AdSense 설정
3. DNS/SSL 설정 완료
4. SEO 최적화
5. 분석 도구 설정
6. 나머지 최적화 작업

## 참고 사항
- 도메인: scoremyoppa.site
- Google AdSense ID: ca-pub-9708700594020227
- 리포지토리: https://github.com/jacho0227-ops/husband-score-test