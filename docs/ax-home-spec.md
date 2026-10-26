# ax.proofer.tech 첫 화면(`/`) 스펙

요구사항 `9aa64bf1`에서 정했습니다. 진입점별 판(`/startup`, `/growth`, `/enterprise`, `/open`)은
`docs/ax-landing-spec.md`가 계속 단일 출처이고, 이 문서는 `/` 하나만 다룹니다.

## 1. 원본

- 시안: Claude Design 캔버스 "ax.proofer.tech 웹 시안"의 첫 화면 아트보드
- 원본 html과 이미지: `.dira/attachments/ax-home-20261026/` (`README.md`에 `/_blob/` 주소와 파일의 대응이 있습니다)
- 시안 안의 `Main.dc.html`은 `/enterprise`, `Startup.dc.html`은 `/startup`, `Growth.dc.html`은 `/growth`,
  `Open.dc.html`은 `/open`입니다.
- 이미지는 `public/assets/images/ax/home/`에 둡니다(`ax-hero.jpg`, `ax-org-bg.jpg`, `hansol.jpg`, `hr.jpg`, `dev.jpg`, `ai.jpg`).

## 2. 라우팅

- `/`는 새 첫 화면입니다. 기존 헤더(AudienceTabs, SegmentTabs), Dock, 레이아웃 푸터를 쓰지 않고
  시안의 헤더와 푸터를 따로 그립니다.
- 기존 네 판은 라우트 그룹 하나(`app/subs/ax/(segments)/`)로 묶고, 헤더와 Dock과 푸터는 그 그룹의
  레이아웃으로 옮깁니다. 네 판의 내용과 디자인은 바꾸지 않습니다.
- `Providers`, `ax.scss`, `Organization` 구조화 데이터는 `app/subs/ax/layout.tsx`에 남겨 `/`도 받습니다.
- 기존 헤더의 브랜드 로고(AX)는 `#top`이 아니라 `/`로 갑니다.
- 기존 AudienceTabs의 "기업 교육" 탭은 `/`가 아니라 `/enterprise`로 갑니다(`/`가 더는 엔터프라이즈 판이 아니므로).

## 3. 메타데이터, 사이트맵, robots

- `/`: 제목과 설명과 OG를 새 첫 화면 내용으로 새로 씁니다. canonical은 `https://ax.proofer.tech`입니다.
  OG 이미지는 기존 `og-image.webp`를 그대로 씁니다.
- `/enterprise`: 지금까지 canonical이 `/`였습니다. `/`의 내용이 바뀌므로 canonical을
  `https://ax.proofer.tech/enterprise`로 바꾸고, 제목과 설명과 키워드는 지금 값을 그대로 둡니다.
- 사이트맵은 `/`, `/startup`, `/growth`, `/enterprise`, `/open` 다섯 개입니다. `LAST_MODIFIED`를 올립니다.
- robots는 지금처럼 전부 `Allow: /`이고 사이트맵 주소를 가리킵니다.

## 4. 구성 (시안 순서)

문구는 시안 그대로 옮깁니다. 아래 5절의 두 곳만 시안과 다릅니다.

1. 히어로 (`#top`): `ax-hero.jpg` 전면 배경, 헤드라인 "AI를 들였는데 / 일하는 방식은 그대로라면", 소개 문장,
   버튼 두 개(무료상담 신청, 커리큘럼 보기 = `#start`), 서비스 네 줄
2. 함께한 곳 (`#cases`): 두 줄이 반대 방향으로 흐르는 마퀴 띠. 기관명은 시안의 이니셜 표기 그대로
3. 팀 (`#team`): 왼쪽에 소개와 차별점 세 가지, 오른쪽에 네 사람(아바타 이미지)
4. AI Native 조직 (`#org`): `ax-org-bg.jpg` 어두운 배경, 숫자 칸 두 개, 조직 설계 세 줄
5. 커리큘럼 (`#start`): 상황별 네 행(각 "자세히 보기"는 `/enterprise`)과 회사 규모별 링크
   (스타트업 `/startup`, 중소, 중견기업 `/growth`, 엔터프라이즈 `/enterprise`, 공개 교육 `/open`,
   전체 커리큘럼 PDF는 `SEGMENTS.enterprise.pdf`)
6. 결과 확인: 비교표(흔히 보는 AX 교육, 컨설팅 / 프루퍼 주식회사)와 단계별 세 칸
7. 자주 묻는 질문 (`#faq`), 상담 CTA (`#contact`), 푸터

- 상담 버튼("무료상담 신청")은 전부 `AxInquireButton`을 씁니다.
- 디자인 토큰과 글꼴은 Proofer Design System(LINE Seed Sans KR, 파랑 `#344fe0`, 초록 `#45af66`)을 따르고,
  `ax.scss`에 이미 있는 토큰이 있으면 그것을 씁니다.
- PDF 링크는 시안에 적힌 판본(`v=20261025`)이 아니라 사이트의 `PDF_VERSION`을 따릅니다.

## 5. 시안과 다르게 옮기는 곳

- FAQ의 세 번째 문답("견적과 일정은 언제 받을 수 있나요?")은 답 전체가 "[회신 기간 입력]"이 들어간 한 문장이라
  문답째 뺍니다. 회신 기간이 정해지면 다시 넣습니다.
- 비교표 "들어오는 사람" 행의 왼쪽 칸 "강사 또는 컨설턴트"는 "외부 컨설턴트"로 씁니다("강사" 금지 규칙).

## 6. 표기 규칙

- 고객사 실명을 쓰지 않습니다. 이니셜과 업종으로만 씁니다.
- 팀원 중 임한솔만 실명을 씁니다. 나머지는 직함과 이력만 씁니다.
- 매각 규모(금액)와 플랫폼팀장 직함을 쓰지 않습니다.
- 교육, 해커톤 등의 기간을 숫자로 적지 않습니다.
- "강사"라는 말과 교육을 앞세운 표현을 쓰지 않습니다.

## 7. 모션 (GSAP + ScrollTrigger)

`docs/ax-landing-spec.md` 4.4절(시차 배경 금지 등)은 기존 네 판의 규칙이고 `/`에는 적용하지 않습니다.
`/`의 모션은 시안 html 끝의 `componentDidMount` 코드가 기준입니다. `gsap`은 npm 패키지로 넣습니다.

- 첫 진입: 히어로 배경이 살짝 확대된 상태에서 제자리로 돌아오고, 헤드라인 두 줄이 아래에서 차례로 올라오고,
  소개 문장과 버튼과 서비스 줄이 시차를 두고 나타납니다.
- 히어로 패럴랙스: 스크롤하면 배경은 느리게 내려가고 글자는 빨리 올라가며 흐려집니다.
- AI Native 조직 섹션: 배경 사진이 반대 방향으로 천천히 움직입니다.
- 스크롤 리빌: 섹션 제목은 아래에서 떠오르고, 목록과 칸은 0.1초 간격으로 따라 올라옵니다. 한 번만 나타납니다.
- `prefers-reduced-motion: reduce`이면 아무것도 움직이지 않고 처음부터 최종 상태로 보입니다(마퀴 포함).

## 8. 검증

- `npx tsc --noEmit`, 바꾼 파일만 `npx eslint`, `npx next build`
- 1440px와 390px에서 `/` 스크린샷을 시안과 비교합니다.
- `/startup`, `/growth`, `/enterprise`, `/open`이 바뀌기 전과 같게 보이고, 헤더 로고가 `/`로 갑니다.
