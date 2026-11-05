# sism.proofer.tech 첫 화면(`/`) 스펙

요구사항 `7da2261b`에서 정했습니다. 프루퍼 주식회사의 SI SM(외주 개발과 운영 유지관리) 서비스 사이트이고,
이 문서는 첫 화면 `/` 하나와 proofer.tech 쪽 진입점을 다룹니다.

## 1. 원본

- 시안: Claude Design 캔버스 "sism.proofer.tech 시안"의 첫 화면 아트보드
- 레포 안의 사본(이 문서가 가리키는 원본): `docs/sism-home/`
  - `Main.dc.html`: 시안 html. 문구와 배치, 반응형 CSS(helmet 의 style)의 단일 출처입니다
  - `motion-spec.md`: 구간별 모션 설계표. 모션의 단일 출처입니다
  - `motion.js`, `motion-reference.html`: 모션 참고 페이지와 그 스크립트(셀렉터가 섹션 id 기준)
- 이미지는 큐 첨부 `.dira/attachments/sism-20261105/`에서 `public/assets/images/sism/`로 옮깁니다.
  옮긴 뒤에는 그 폴더가 원본입니다. 시안 안의 `/_blob/` 주소와 파일의 대응은 다음과 같습니다.
  - `dc751ef5...` -> `sism-hero-office.jpg` (히어로 배경)
  - `8ded4c52...` -> `proofer-mark.svg` (헤더 로고 마크)
  - `5af080bd...` -> `proofer-logo.svg` (푸터 로고)
  - `e7bd8825...` -> `cert-g2b.jpg`, `99b3f1cf...` -> `cert-sw.jpg`, `a6b2d3ef...` -> `cert-venture.jpg`,
    `657b3bbd...` -> `cert-sme.jpg` (등록 서류, 가림 처리된 판)
- 구현이 끝나면 `app/subs/sism/` 의 컴포넌트 문자열이 화면 문구의 원본을 대신합니다.

## 2. 라우팅과 서브도메인

- `src/constants.ts` 의 `SUB_DOMAIN` 에 `sism: "sism"` 을 더하고 `app/subs/sism/` 아래에 페이지를 둡니다.
  `proxy.ts` 는 그 목록에 있는 호스트만 rewrite 하므로 다른 손질은 필요 없습니다.
- proofer.tech 는 와일드카드 DNS 라 sism.proofer.tech 는 이미 응답합니다(지금은 루트 랜딩을 보여 줍니다).
  DNS 레코드와 Vercel 도메인 등록 작업은 따로 하지 않습니다. 상수를 넣는 커밋부터 `/` 가 있어야 404 가 나지 않습니다.
- `app/subs/sism/layout.tsx` 는 루트(`app/(root)/components/Providers`)와 같은 Providers(채널톡, Tally)를 씌웁니다.
  `Organization` 구조화 데이터는 ax 레이아웃과 같은 형식으로 넣고 url 만 sism 으로 씁니다.

## 3. 메타데이터, 사이트맵, robots

- `/`: title `프루퍼 SI SM | 외주 개발과 운영 유지관리`, description 은 히어로 서브 문구를 바탕으로 씁니다.
  canonical 과 og:url 은 `https://sism.proofer.tech` 이고 OG 이미지는 루트의 `/assets/images/og-image.webp` 를 씁니다.
- `app/subs/sism/sitemap.ts`: `/` 하나. `LAST_MODIFIED` 는 고정 날짜(배포하는 날)입니다.
- robots: ax 와 같은 Route Handler(`app/subs/sism/robots.txt/route.ts`)로 전부 `Allow: /` 이고
  `https://sism.proofer.tech/sitemap.xml` 을 가리킵니다.
- 루트 사이트맵(`app/(root)/sitemap.ts`)에 `generateUrl("/", SUB_DOMAIN.sism)` 항목을 더합니다.

## 4. 구성 (시안 순서)

문구는 시안 그대로 옮깁니다. 5절의 곳만 시안과 다릅니다. 괄호 안은 섹션 id 입니다.

1. 헤더와 히어로 (`#top`): `sism-hero-office.jpg` 배경, 브랜드 "SI SM", 메뉴 일곱 개(서비스 `#scope`, 비용 `#price`,
   업무 시스템 `#specialty`, 업종 `#industry`, 수행 이력 `#proof`, 등록 서류 `#credentials`, 자주 묻는 질문 `#faq`)와
   무료상담 신청, 영문 라벨 "SYSTEM INTEGRATION + SYSTEM MANAGEMENT", 헤드라인 "내 사업처럼 / 만들고, 관리합니다"
   ("내 사업" 은 파랑에서 초록 그라데이션), 서브 문구, 버튼 둘(무료상담 신청, 비용 보기 = `#price`)
2. 등록과 인증 띠 네 칸(나라장터 경쟁입찰참가자격, 소프트웨어사업자 신고, 벤처기업 확인, 수행 프로젝트 100건+)
3. PROBLEM (`#problem`): 고민 카드 네 장. 일러스트는 시안의 인라인 SVG 를 코드로 옮깁니다(이미지 파일로 바꾸지 않습니다)
4. OUR ANSWER (`#scope`): 운영과 유지관리(03 SM), 사내 시스템과 연동(02 SI), 웹과 앱(01 SI) 세 줄과 태그
5. ENGAGEMENT MODEL (`#price`): 가격 카드 네 장(250만원, 800만원, 450만원, 월 90만원 부터), "부가세 별도입니다.",
   "이메일로 견적 받아보기" 박스
6. SPECIALTY (`#specialty`): ERP, CRM, HRM, KMS 카드
7. WHO WE WORK WITH (`#industry`): 업종 카드 여섯 장
8. PROOF (`#proof`): 수행 이력 여섯 칸과 "100건이 넘는 프로젝트 가운데 일부입니다." 줄, 무료상담 신청
9. CREDENTIALS (`#credentials`): 등록 서류 네 장 갤러리. 누르면 원본 크기 이미지를 봅니다
10. HOW TO WORK WITH US (`#partner`) 두 장, 자주 묻는 질문 (`#faq`) 다섯 문답, 상담 CTA (`#contact`), 푸터

- 반응형은 시안 helmet style 의 1100px, 960px, 760px, 420px 구간 규칙이 기준입니다. 960px 이하에서 메뉴가
  햄버거로 접히고, 항목을 누르면 그 섹션으로 가며 메뉴가 닫힙니다. 모바일 메뉴는 모션 설정과 상관없이 동작합니다.
- 디자인 토큰과 글꼴은 Proofer Design System(LINE Seed Sans KR, 파랑 `#344fe0`, 초록 `#45af66`)을 따르고,
  `app/globals.scss` 의 `LINESeedKR` 글꼴 선언처럼 사이트에 이미 있는 것을 씁니다.
- 스타일은 `app/subs/sism/` 안에만 둡니다. 다른 서브도메인과 루트의 스타일시트는 고치지 않습니다.

## 5. 시안과 다르게 옮기는 곳

- 운영과 유지관리 줄의 태그 "월간 개선 보고"는 "개선 요청 처리"로 씁니다(매달 무엇을 준다는 약속을 하지 않습니다).
- 상담 버튼("무료상담 신청": 헤더, 히어로, 수행 이력 줄, 상담 CTA, 모바일 메뉴)은 전부 채널톡 메신저를 엽니다.
  ax 의 `app/subs/ax/components/AxInquireButton` 과 같은 방식(`useChannelIOApi().showMessenger`,
  `src/hooks/channel.ts` 의 로드 확인)이고, Tally 팝업은 쓰지 않습니다(요구사항 aa57ff47).
  시안의 `mailto:info@proofer.tech` 는 시안 도구에 상담 흐름이 없어서 쓴 자리입니다.
- 채널톡 위젯은 2절의 Providers 가 모든 페이지에 띄웁니다. 환경변수는 다른 곳과 같은 `NEXT_PUBLIC_CHANNEL_ID_PLUGIN_KEY` 입니다.
- "이메일로 견적 받아보기"는 시안 그대로 제목("견적 요청")과 작성 양식이 채워진 mailto 입니다.
- 푸터의 회사 표기는 루트 푸터와 같게 "프루퍼 주식회사", 대표 "임한솔, 임덕만" 으로 씁니다
  (시안의 "프루퍼주식회사 | 대표이사 임한솔" 대신).

## 6. 표기 규칙

- 고객사 실명을 쓰지 않습니다. 수행 이력은 업종 표현으로만 씁니다.
- 수행 이력에 수행 주체(개인 수행, 법인 설립 전 등)를 적지 않습니다.
- 등록 서류 이미지는 1절의 가림 처리된 네 장만 씁니다. 원본 서류, 2쪽, 표준재무제표는 올리지 않습니다.
- 회사 호칭은 "프루퍼 주식회사" 입니다.
- 화면 문구에 키보드 기본 밖 특수문자(em dash, 가운뎃점, 화살표 문자 등)를 쓰지 않습니다.

## 7. 모션 (GSAP + ScrollTrigger, anime.js)

`docs/sism-home/motion-spec.md` 의 설계표가 기준이고, `docs/sism-home/motion.js` 를 옮겨 씁니다.

- 레포에 이미 있는 npm `gsap`(ScrollTrigger 포함)을 씁니다. anime.js 는 npm `animejs` 로 넣습니다
  (요구사항이 지정한 의존입니다). cdnjs 스크립트 태그는 쓰지 않습니다.
- 표의 행 전부를 구현합니다: 히어로 인트로, 배경 패럴랙스, 미니 헤더(진행 막대, 현재 섹션 밑줄), 섹션 머리 리빌,
  카드 배치 등장, PROBLEM 일러스트 모션, 서비스 줄 태그, 가격 카운트업, 업무 시스템 약어, 수행 이력 더보기 줄,
  등록 서류 기울기, FAQ 여닫기, 마지막 상담 박스, 버튼 자석 효과, 메뉴 이동 부드러운 스크롤.
- `prefers-reduced-motion: reduce` 이면 아무것도 움직이지 않고 처음부터 최종 상태로 보입니다(가격은 목표 금액).
  JS 가 돌기 전에도 글자가 숨겨진 채 남지 않습니다.
- 모션 코드는 클라이언트 컴포넌트 하나에서만 등록하고, 페이지를 떠날 때 정리합니다(`gsap.context` revert 등).
  다른 서브도메인과 루트에는 anime.js 가 로드되지 않습니다.

## 8. proofer.tech 진입점

proofer.tech 가 ax.proofer.tech 로 보내는 두 자리와 같은 방식으로 답니다.

- 헤더 메뉴(`app/(root)/components/Header.tsx`): "AX 교육" 바로 뒤에 "SI SM" 링크, 같은 화살표 아이콘과
  `target="_blank"`, href `generateUrl("/", SUB_DOMAIN.sism)`
- 푸터(`app/(root)/components/Footer.tsx`): "프루퍼 AX" 링크 아래 "프루퍼 SI SM" 링크, 같은 속성
- 그 밖의 proofer.tech 화면은 바꾸지 않습니다.

## 9. 검증

- `pnpm install` 뒤 `npx tsc --noEmit`, 바꾼 파일만 `npx eslint`, `npx next build`
- 1440px, 768px, 390px 에서 `/` 스크린샷을 시안(`docs/sism-home/Main.dc.html` 을 같은 폭으로 렌더한 것)과
  비교합니다. 세 폭 모두 가로 스크롤이 없습니다(`document.documentElement.scrollWidth <= innerWidth`).
- 채널톡 버튼이 보이고, 무료상담 신청 버튼(960px 이하 모바일 메뉴 포함)이 메신저를 엽니다. 390px 에서 채널톡 버튼이
  미니 헤더와 하단 콘텐츠(상담 CTA, 푸터)를 가리지 않습니다.
- proofer.tech, ax.proofer.tech 의 `/` 가 바뀌기 전과 같게 보입니다(proofer.tech 헤더와 푸터의 진입점 링크만 다릅니다).
