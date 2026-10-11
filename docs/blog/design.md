# 블로그 비주얼 스펙 (blog.proofer.tech)

> 디자인 기준의 단일 출처는 `docs/landing-design-system.md` 이다. 이 문서는 그 토큰을 블로그 화면에
> 어떻게 쓰는지만 정한다. 새 색, 새 그림자, 새 라운드를 만들지 않는다. 표에 없는 값이 필요하면
> 구현하지 말고 designer 에게 티켓으로 묻는다.
>
> 이 문서를 보고 구현하는 티켓: 12bfd120 (셸, 토큰 정의), 7f9ccca1 (목록 화면), 40781666 (글 화면),
> 320d5799 (본문 요소), e34323ec (OG 이미지).

## 0. 결정 사항

- **라이트 모드 하나로 간다.** 랜딩 디자인 시스템에 다크 모드 정의가 없다. 정의되지 않은 색은 쓸 수
  없으므로 블로그도 다크 모드를 만들지 않는다. `dark:` 접두사를 쓰지 않고, `prefers-color-scheme` 에
  반응하지 않는다. 랜딩이 다크 모드를 정의하면 그때 이 문서를 고친다.
- 화면은 Tailwind 와 shadcn(`components/ui`)만 쓴다. 랜딩의 `home.scss` 는 `.home-root` 스코프라
  import 하지 않고, 필요한 값은 아래 토큰으로만 가져온다.
- 회색 Tailwind 기본값(`gray-*`, `text-gray-*`, `border-gray-*`, `bg-gray-*`)과 `rounded-lg`(앱
  `--radius` 체계)는 블로그 화면에서 전부 아래 토큰으로 바꾼다. 남겨도 되는 예외는 없다.
- 마크업 의미(링크 href, heading 단계, aria-label, 빈 상태 문구)는 바꾸지 않는다. 이 문서는 모양만 정한다.

## 1. 토큰 표

**정의 위치:** 색은 `app/globals.scss` 의 `:root` 에 있는 `--proofer-*` CSS 변수이고, Tailwind 이름은
`tailwind.config.cjs` 의 `theme.extend` 에 둔다. 아래에서 "기존" 은 이미 정의되어 있는 것이고,
"추가" 는 12bfd120 이 같은 두 자리에 더하는 것이다. 다른 파일에 따로 정의하지 않는다.

**구현 위치(12bfd120):** 색 변수는 `app/globals.scss` `:root` 의 `--proofer-*`, Tailwind 이름(색, `rounded-proofer*`, `shadow-proofer-*`, `ease-proofer`, `font-proofer`)은 `tailwind.config.cjs` `theme.extend`, 공통 클래스 묶음은 `app/subs/blog/ui.ts` 의 `FOCUS_RING`, `CARD` 이다.

### 색

| 랜딩 토큰 (HEX)        | 블로그 용도                                                                     | Tailwind 표기                                                                   | 상태                          |
| ---------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| Blue `#344FE0`         | 링크 텍스트, 포커스 링, 활성 페이지 번호, 인용 왼쪽 선, 칩 호버 텍스트, eyebrow | `text-proofer-blue` `ring-proofer-blue` `border-proofer-blue` `bg-proofer-blue` | 기존                          |
| Blue Deep `#0020B6`    | 링크 호버, 칩 활성 텍스트                                                       | `text-proofer-blue-deep`                                                        | 기존                          |
| Blue Soft `#EEF2FF`    | 태그 칩 호버, 활성 칩 배경                                                      | `bg-proofer-blue-soft`                                                          | 기존                          |
| Green `#45AF66`        | 텍스트에 쓰지 않는다(흰 바탕 대비 2.77:1). OG 그라데이션 끝점에만 쓴다          | `bg-proofer-green` (OG 외 사용 금지)                                            | 기존                          |
| Ink `#0B1020`          | 제목, 본문, 저자 이름                                                           | `text-proofer-ink`                                                              | 기존                          |
| Gray `#5B6172`         | 부제, 날짜, 읽는 시간, 캡션, 푸터, 빈 상태 문구                                 | `text-proofer-gray`                                                             | 기존                          |
| Line `#E9EBF2`         | 카드 테두리, 헤더 아래 선, 푸터 위 선, 표 선, 구분선                            | `border-proofer-line` `bg-proofer-line`                                         | 기존                          |
| BG `#FFFFFF`           | 페이지 배경, 카드 배경                                                          | `bg-white`                                                                      | Tailwind 기본                 |
| BG Alt `#F6F7FA`       | 인라인 코드, 코드 블록, 표 머리 행, 아바타 이니셜 배경                          | `bg-proofer-bg-alt`                                                             | 추가 `--proofer-bg-alt`       |
| Menu Ink `#2B3146`     | 헤더 링크, 태그 칩 텍스트                                                       | `text-proofer-menu-ink`                                                         | 추가 `--proofer-menu-ink`     |
| Border Hover `#CDD6FF` | 카드 호버 테두리, 칩 호버 테두리                                                | `border-proofer-border-hover`                                                   | 추가 `--proofer-border-hover` |

Neutral Tag Text `#8A90A0` 와 Marquee Gray `#9AA1B4` 는 흰 바탕 대비가 4.5:1 에 못 미치므로
(`#8A90A0` 3.19:1) 블로그 텍스트에 쓰지 않는다. 지금 `text-gray-400` 로 그린 날짜와 페이지 표기는 모두
Gray 로 올린다.

### 타이포

| 랜딩 토큰                     | 블로그 용도                                                          | Tailwind 표기                                                        | 상태                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 폰트 `LINESeedKR` + 폴백      | 블로그 전체                                                          | `font-proofer`                                                       | 추가 `fontFamily.proofer = ["LINESeedKR", "-apple-system", "\"Apple SD Gothic Neo\"", "\"Malgun Gothic\"", "sans-serif"]` |
| 제목 공통 weight 700, -0.02em | 모든 제목                                                            | `font-bold tracking-[-0.02em]`                                       | 임의값                                                                                                                    |
| Section H2 25 / 38, lh 1.14   | 글 제목(h1)                                                          | `text-[25px] md:text-[38px] leading-[1.14]`                          | 임의값                                                                                                                    |
| H3 18 / 23, lh 1.2            | 목록 카드 제목(h2), 본문 h2                                          | `text-[18px] md:text-[23px] leading-[1.2]` (본문 h2 는 23 고정)      | 임의값                                                                                                                    |
| Team Name H3 21               | 본문 h3 (태그명, 저자명 h1 은 Section H2 를 쓴다)                    | `text-[21px]`                                                        | 임의값                                                                                                                    |
| Body Large 18, lh 1.72        | 본문 문단, 글 부제                                                   | `text-[18px] leading-[1.72]`                                         | 임의값                                                                                                                    |
| Body 16, lh 1.62              | 카드 부제, 저자 카드 소개                                            | `text-base leading-[1.62]`                                           | Tailwind 기본                                                                                                             |
| Body Small 14.5, lh 1.55      | 표, 코드 블록, 캡션, 메타(날짜 줄)                                   | `text-[14.5px] leading-[1.55]`                                       | 임의값                                                                                                                    |
| Nav Menu 15.5 (700)           | 헤더 링크, "블로그" 표기                                             | `text-[15.5px] font-bold`                                            | 임의값                                                                                                                    |
| Caption / Tag 12~13 (700)     | 태그 칩                                                              | `text-[13px] font-bold`                                              | 임의값                                                                                                                    |
| Eyebrow 13, +0.1em (700)      | 목록 화면 제목 위 분류 표기("태그", "저자"), 관련 글 절 제목 위 표기 | `text-[13px] font-bold uppercase tracking-[0.1em] text-proofer-blue` | 임의값                                                                                                                    |
| Footer 13.5                   | 푸터                                                                 | `text-[13.5px]`                                                      | 임의값                                                                                                                    |

한글 줄바꿈은 지금처럼 모든 제목과 본문에 `break-keep` 을 유지한다. 코드에는 `font-mono`(Tailwind
기본 시스템 모노)를 쓴다. 랜딩에 고정폭 폰트 토큰이 없으므로 새 폰트를 들이지 않는다.

### 라운드, 그림자, 모션

| 랜딩 토큰                                    | 블로그 용도                                    | Tailwind 표기                                               | 상태                                                                      |
| -------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| Base `--r` 16px                              | 글 카드, 저자 카드, 링크 카드, 대표 이미지     | `rounded-proofer`                                           | 추가 `borderRadius.proofer = "16px"`                                      |
| Card SM 14px                                 | 코드 블록, 표 감싸개, 본문 이미지, 카드 썸네일 | `rounded-proofer-sm`                                        | 추가 `borderRadius["proofer-sm"] = "14px"`                                |
| Small 9px                                    | 페이지 나눔 버튼, 인라인 코드                  | `rounded-proofer-xs`                                        | 추가 `borderRadius["proofer-xs"] = "9px"`                                 |
| Pill 999px                                   | 태그 칩, 헤더의 proofer.tech 버튼              | `rounded-full`                                              | Tailwind 기본                                                             |
| Full 50%                                     | 아바타                                         | `rounded-full`                                              | Tailwind 기본                                                             |
| Card Hover `--shadow`                        | 글 카드, 링크 카드 호버                        | `shadow-proofer-card`                                       | 추가 `boxShadow["proofer-card"] = "0 18px 50px -22px rgba(20,30,80,.34)"` |
| Card Soft                                    | 저자 카드 기본                                 | `shadow-proofer-soft`                                       | 추가 `boxShadow["proofer-soft"] = "0 10px 30px -22px rgba(20,30,80,.5)"`  |
| 이징 reveal `cubic-bezier(0.2, 0.7, 0.2, 1)` | 모든 호버 전환                                 | `ease-proofer`                                              | 추가 `transitionTimingFunction.proofer`                                   |
| 호버 상승 -4px, 0.2s                         | 글 카드, 링크 카드                             | `transition duration-200 ease-proofer hover:-translate-y-1` | 조합                                                                      |

Button Primary, CTA Big, Dock CTA, Layer 그림자와 reveal 애니메이션은 블로그에 쓰지 않는다. 블로그는
읽는 화면이라 스크롤 등장 애니메이션을 넣지 않는다. 호버 상승은 `motion-reduce:transform-none` 로 끈다.

### 공통 클래스 묶음

아래 두 묶음은 여러 화면이 같이 쓴다. 12bfd120 이 상수(예: `app/subs/blog/ui.ts`)로 한 번 정의하고
나머지 티켓이 가져다 쓰게 하면 값이 갈라지지 않는다.

- **포커스 링** `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-proofer-blue focus-visible:ring-offset-2 focus-visible:ring-offset-white`
  : 링크, 버튼, 칩, 카드 링크 전부에 붙인다. 라운드는 요소의 라운드를 따른다.
- **카드** `rounded-proofer border border-proofer-line bg-white transition duration-200 ease-proofer hover:-translate-y-1 hover:border-proofer-border-hover hover:shadow-proofer-card motion-reduce:transform-none`

## 2. 화면 셸 (`app/subs/blog/layout.tsx`)

전체 래퍼: `min-h-screen bg-white font-proofer text-proofer-ink`.
가로 컨테이너(헤더, 푸터 공통): 랜딩 `.wrap` 과 같게 `mx-auto max-w-[1160px] px-6`.

### 헤더

- 구조: `<header>` 안에 컨테이너 하나, `flex h-[70px] items-center justify-between`.
  아래 선 `border-b border-proofer-line`. 랜딩처럼 스크롤 반투명 처리는 하지 않고 정적으로 둔다
  (`sticky` 도 쓰지 않는다. 읽는 화면의 세로 공간을 지킨다).
- 왼쪽: 블로그 홈 링크 하나(`href="/"`, 지금 링크를 유지). 안에 로고와 블로그 표기를 나란히 둔다.
  - 로고 `<Image src="/assets/images/logo.svg" alt="proofer">`, 높이 31px 너비 auto
    (`className="h-[31px] w-auto"`, 랜딩 헤더와 같은 값).
  - 로고 오른쪽 `gap-2.5` 뒤에 세로 선 하나(`h-4 w-px bg-proofer-line`) 후 `gap-2.5` 뒤에 "블로그"
    (Nav Menu, `text-proofer-menu-ink`).
  - 링크 접근 이름이 "proofer 블로그" 가 되도록 로고 alt 와 표기를 그대로 읽히게 둔다. 별도
    aria-label 을 붙이지 않는다.
- 오른쪽: proofer.tech 로 가는 링크 하나(`href="https://proofer.tech"`). 문구는 "프루퍼 홈" 이다.
  - 모양: 랜딩 `.btn-ghost` 의 블로그판. `inline-flex items-center gap-1.5 rounded-full border border-proofer-blue px-4 py-2 text-[14.5px] font-bold text-proofer-blue transition duration-200 ease-proofer hover:bg-proofer-blue-soft`
  - 문구 뒤에 바깥 화살표를 `aria-hidden` 으로 붙인다(lucide `ArrowUpRight`, 14px).
  - 같은 창에서 연다(`target` 없음).
- 780px 미만: 높이를 `h-14`(56px)로, 로고를 `h-[26px]` 로 줄인다. 오른쪽 버튼은 숨기지 않는다.

### 메인

- `<main>` 은 컨테이너만 잡고 폭은 화면이 정한다: `mx-auto max-w-[1160px] px-6 pb-[84px] pt-12 md:pt-16`.
  아래 패딩 84px 는 랜딩 섹션 패딩 값이다.
- 목록 화면 내용 폭은 `max-w-[760px]`, 글 화면 내용 폭은 `max-w-[680px]` 이고, 둘 다 `mx-auto` 로 가운데 둔다.

### 푸터

- `<footer className="border-t border-proofer-line py-11 text-[13.5px] text-proofer-gray">` (44px 는 랜딩 푸터 위 패딩).
- 컨테이너 안을 `flex flex-wrap items-center justify-between gap-6` 로 나눈다.
  - 왼쪽: 로고(`h-[22px] w-auto`, 랜딩 푸터와 같은 값)와 그 아래 `mt-2.5` 로
    "&copy; 프루퍼주식회사" 한 줄.
  - 오른쪽: 링크 세 개를 `flex gap-5` 로 둔다. "프루퍼 홈"(`https://proofer.tech`),
    "RSS"(`/rss.xml`), "Medium"(`https://medium.com/proofer-blog`). 모양은 `text-proofer-gray hover:text-proofer-blue` 이고 포커스 링을 붙인다.
- 사업자 정보와 벤처 마크는 블로그 푸터에 넣지 않는다. 회사 정보는 프루퍼 홈 링크로 충분하다.

## 3. 목록 화면 (홈 `page.tsx`, 태그 `tag/[slug]`, 저자 `author/[slug]`, `ArticleList.tsx`)

내용 폭 `mx-auto max-w-[760px]`. 위에서 아래로 화면 머리, 태그 칩 줄(홈만), 글 카드 목록, 페이지 나눔 순서다.

### 화면 머리

- 홈: Eyebrow "PROOFER BLOG" 아래 `mt-2` 로 h1 없이 소개 한 줄
  "프루퍼가 쓰는 AI 네이티브 개발과 커뮤니티 이야기"(Body Large, `text-proofer-gray`)를 둔다.
  홈에는 지금 h1 이 없으므로 heading 을 새로 만들지 않고 `<p>` 로 둔다. 머리 아래 여백 `mb-8`.
- 태그: Eyebrow "TAG" 아래 `mt-2` 로 h1 태그명(Section H2 크기), 설명이 있으면 `mt-3` 로 Body
  `text-proofer-gray`. 머리 아래 여백 `mb-10`.
- 저자: Eyebrow "AUTHOR" 를 이름 위에 두고, 아바타 80px(`size-20 rounded-full`)와 이름 블록을
  `flex items-start gap-5` 로 둔다. 소개는 `mt-3` Body `text-proofer-gray`. Medium 과 웹사이트 링크는
  `mt-3 flex gap-4 text-[14.5px]` 에 `text-proofer-blue underline underline-offset-4 hover:text-proofer-blue-deep`.
  아바타가 없으면 아바타 자리를 비우지 않고 이니셜 원(아래 4절 아바타 규칙)을 그린다. 머리 아래 `mb-10`.

### 태그 칩 (홈 머리 아래, 글 화면 태그 줄과 같은 모양)

- 감싸개: 지금의 `<nav aria-label="태그">` 유지, `mb-10 flex flex-wrap gap-2`.
- 칩: `inline-flex items-center rounded-full border border-proofer-line bg-white px-3 py-1.5 text-[13px] font-bold text-proofer-menu-ink transition duration-200 ease-proofer hover:border-proofer-border-hover hover:bg-proofer-blue-soft hover:text-proofer-blue-deep` + 포커스 링.
- 태그 화면에서 현재 태그 칩은 따로 그리지 않는다(태그 화면에는 칩 줄이 없다).
- 칩 텍스트가 길면 `max-w-[220px] truncate` 로 자르고 `title` 에 전체 이름을 둔다.

### 글 카드

- 목록: `<ul className="flex flex-col gap-4">`. 카드 사이 구분선(`divide-y`)은 없애고 카드 간격으로 나눈다.
- 카드 링크: `<Link>` 하나가 카드 전체다. 클래스는 공통 "카드" 묶음 + 포커스 링 +
  `flex gap-5 p-[22px] md:p-[26px]` (랜딩 표준 카드 패딩 22~26px).
- 텍스트 칸(`min-w-0 flex-1`):
  - 제목 h2: H3 토큰 `text-[18px] md:text-[23px] font-bold leading-[1.2] tracking-[-0.02em] text-proofer-ink`, `line-clamp-2 break-keep`.
  - 부제: `mt-2` Body `text-proofer-gray line-clamp-2 break-keep`.
  - 메타 줄: `mt-3` Body Small `text-proofer-gray`. 순서는 저자 이름, 날짜, 읽는 시간이고 구분자는
    지금 코드의 가운뎃점 구분 문자열을 그대로 쓴다.
- 썸네일 칸: 목록 행의 `image` 가 있을 때만 그린다. `shrink-0 w-[120px] md:w-[168px] aspect-[1200/630] overflow-hidden rounded-proofer-sm bg-proofer-bg-alt`, 이미지는 `object-cover h-full w-full`, `alt=""`(제목이 이미 읽힌다).
  - 이미지가 없으면 칸 자체를 그리지 않고 텍스트가 전체 폭을 쓴다. 회색 자리표시자를 두지 않는다.
  - 560px 미만에서는 카드를 `flex-col` 로 바꾸고 썸네일을 `w-full order-first` 로 텍스트 위에 둔다.
- 호버: 카드가 4px 오르고 테두리가 Border Hover, 그림자가 Card Hover 가 된다. 제목 색은 바꾸지 않는다.

### 페이지 나눔

- 지금 구조(`<nav aria-label="페이지">` 안에 이전, `n / 전체`, 다음) 유지, `mt-12 flex items-center justify-center gap-3`.
- 이전, 다음 링크: `inline-flex h-10 items-center rounded-proofer-xs border border-proofer-line px-4 text-[14.5px] font-bold text-proofer-menu-ink hover:border-proofer-border-hover hover:text-proofer-blue` + 포커스 링.
- 가운데 `n / 전체`: `px-2 text-[14.5px] text-proofer-gray tabular-nums`. 현재 쪽 번호 `n` 만 `font-bold text-proofer-ink`.
- 첫 쪽에는 이전을, 마지막 쪽에는 다음을 그리지 않는다(지금 동작 유지). 자리를 비워 두지 않는다.

### 빈 상태

- 문구는 지금 것을 그대로 쓴다("아직 올라온 글이 없습니다.", "이 태그가 붙은 글이 아직 없습니다.").
- 모양: `rounded-proofer border border-dashed border-proofer-line bg-proofer-bg-alt px-6 py-16 text-center text-proofer-gray`.
- 홈 빈 상태에서는 머리와 칩 줄 없이 빈 상태 상자만 그린다(지금 동작 유지).

### 로딩

목록은 서버 렌더라 별도 로딩 화면을 두지 않는다. `loading.tsx` 를 만들지 않는다.

## 4. 글 화면 (`components/PostView.tsx`)

내용 폭 `mx-auto max-w-[680px]`. 대표 이미지만 데스크톱에서 `md:-mx-10`(좌우 40px씩, 760px)로 넓힌다.

| 순서 | 요소                       | 간격 (위)                 | 스타일                                                                                                  |
| ---- | -------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | 태그 eyebrow(첫 태그 하나) | -                         | 태그가 있으면 첫 태그를 Eyebrow 모양 링크로 제목 위에 둔다(`/tag/<slug>`). 없으면 생략                  |
| 2    | 제목 h1                    | `mt-3` (eyebrow 없으면 0) | Section H2 토큰 `text-[25px] md:text-[38px] font-bold leading-[1.14] tracking-[-0.02em] break-keep`     |
| 3    | 부제                       | `mt-4`                    | Body Large `text-proofer-gray break-keep`                                                               |
| 4    | 저자 줄                    | `mt-7`                    | 아래 "저자 줄"                                                                                          |
| 5    | 대표 이미지                | `mt-9`                    | `rounded-proofer` `h-auto w-full`, 감싸개 `md:-mx-10 overflow-hidden rounded-proofer bg-proofer-bg-alt` |
| 6    | 본문                       | `mt-10`                   | 5절 본문 요소 표                                                                                        |
| 7    | 태그 줄                    | `mt-12`                   | 3절 태그 칩과 같은 모양, `flex flex-wrap gap-2`                                                         |
| 8    | 저자 카드                  | `mt-10`                   | 아래 "저자 카드"                                                                                        |
| 9    | 관련 글                    | `mt-16`                   | 아래 "관련 글"                                                                                          |

### 저자 줄

- `flex items-center gap-3`, 아래로 `pb-7 border-b border-proofer-line` 을 둬서 머리와 본문을 나눈다
  (대표 이미지가 있으면 선 없이 이미지가 경계가 된다: `border-b` 는 cover 가 없을 때만).
- 아바타 40px. 이름 링크 `text-[15.5px] font-bold text-proofer-ink hover:text-proofer-blue` + 포커스 링.
- 그 아래 메타 줄 Body Small `text-proofer-gray`(날짜, 읽는 시간).

### 아바타 규칙 (글 화면, 저자 화면 공통)

- 이미지가 있으면 `rounded-full object-cover`.
- 없으면 이니셜 원: `rounded-full bg-proofer-blue-soft font-bold text-proofer-blue` 가운데 정렬,
  글자 크기는 지름의 0.42 배. 이니셜은 장식이라 `aria-hidden`.

### 저자 카드

- `<aside>` 유지. `flex gap-4 rounded-proofer border border-proofer-line bg-white p-6 shadow-proofer-soft`.
- 아바타 56px. 이름 링크 `text-[18px] font-bold text-proofer-ink hover:text-proofer-blue`.
- 소개 `mt-1.5` Body `text-proofer-gray break-keep`.
- 링크 줄 `mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[14.5px]`, 각 링크는 본문 링크 모양
  (`text-proofer-blue underline underline-offset-4 hover:text-proofer-blue-deep`).

### 관련 글

- `<section>` 유지. 위에 Eyebrow "MORE" 를 두고 `mt-2` 로 h2 "같은 태그의 글"(`text-[23px] font-bold tracking-[-0.02em]`), 목록은 `mt-5`.
- 목록 `grid gap-3 md:grid-cols-2`. 각 항목은 공통 "카드" 묶음 + `block p-5` + 포커스 링.
  - 제목 `font-bold text-proofer-ink line-clamp-2 break-keep`.
  - 부제 `mt-1.5 text-[14.5px] text-proofer-gray line-clamp-1`.
  - 날짜 `mt-3 text-[13px] text-proofer-gray`.

## 5. 본문 요소 (`lib/blog/render/index.tsx`)

**읽기 값:** 본문 폭 680px, 글자 18px, 줄 높이 1.72.
근거: 18px LINESeedKR 에서 680px 은 한 줄에 한글 약 36~~40자가 들어가는 폭으로, 한글 본문에서 읽기
편하다고 보는 35~~45자 범위의 안쪽이다. 1.72 는 랜딩 Body Large 의 줄 높이 상한이고, 받침이 많은
한글이 겹쳐 보이지 않는 값이다.

본문 감싸개(`PmdTree`): `font-proofer break-keep text-[18px] leading-[1.72] text-proofer-ink`.
첫 요소의 위 여백은 `[&>*:first-child]:mt-0` 으로 없앤다.

| 요소               | 위 / 아래 간격  | 스타일                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| h2                 | `mt-14 mb-4`    | `text-[23px] font-bold leading-[1.3] tracking-[-0.02em]`                                                                                                                                                                                                                                                                                  |
| h3                 | `mt-10 mb-3`    | `text-[21px] font-bold leading-[1.35] tracking-[-0.02em]`                                                                                                                                                                                                                                                                                 |
| p                  | `my-6`          | 감싸개 값 그대로                                                                                                                                                                                                                                                                                                                          |
| 링크               | -               | `text-proofer-blue underline underline-offset-4 hover:text-proofer-blue-deep` + 포커스 링. 밑줄이 색 외의 단서라 지우지 않는다                                                                                                                                                                                                            |
| strong / em        | -               | strong `font-bold`, em 은 지금 `italic` 을 그대로 둔다                                                                                                                                                                                                                                                                                    |
| 인라인 코드        | -               | `rounded-proofer-xs border border-proofer-line bg-proofer-bg-alt px-1.5 py-0.5 font-mono text-[0.86em] text-proofer-ink`                                                                                                                                                                                                                  |
| 코드 블록          | `my-8`          | `overflow-x-auto rounded-proofer-sm border border-proofer-line bg-proofer-bg-alt p-5 font-mono text-[14.5px] leading-[1.6] text-proofer-ink`. 줄은 접지 않고 가로 스크롤한다. 스크롤 영역에 `tabIndex={0}` 을 줘서 키보드로 스크롤할 수 있게 하고 포커스 링을 붙인다                                                                      |
| 인용               | `my-8`          | `border-l-4 border-proofer-blue pl-5 text-proofer-gray`, 배경 없음. 지금의 `italic` 은 뺀다(LINESeedKR 에 이탤릭이 없어 한글 기울임이 브라우저 합성으로 나오고 읽기를 해친다). 안쪽 첫 문단 `mt-0`, 끝 문단 `mb-0`                                                                                                                        |
| 목록 ul / ol       | `my-6`          | `pl-6 list-disc` / `pl-6 list-decimal`, 항목 `my-1.5`, 마커 `marker:text-proofer-gray`                                                                                                                                                                                                                                                    |
| 표                 | `my-8`          | 감싸개 `overflow-x-auto rounded-proofer-sm border border-proofer-line` (`tabIndex={0}` + 포커스 링). 표 `w-full border-collapse text-[14.5px] leading-[1.55]`. 셀 `border-b border-proofer-line px-4 py-2.5 text-left align-top`, 마지막 행 `border-b-0`. 머리 셀 `bg-proofer-bg-alt font-bold text-proofer-ink`. 세로 선은 그리지 않는다 |
| 본문 이미지        | `my-8` (figure) | 이미지 `h-auto w-full rounded-proofer-sm`                                                                                                                                                                                                                                                                                                 |
| 이미지 묶음(2~3장) | `my-8`          | 지금 그리드 유지, 간격 `gap-2`, 각 이미지 `rounded-proofer-sm`                                                                                                                                                                                                                                                                            |
| 그림 캡션          | `mt-3`          | `text-center text-[14.5px] leading-[1.55] text-proofer-gray`                                                                                                                                                                                                                                                                              |
| 링크 카드          | `my-8`          | 공통 "카드" 묶음 + 포커스 링 + `flex overflow-hidden no-underline`. 텍스트 칸 `p-5 gap-1`: 제목 `font-bold text-[16px] text-proofer-ink line-clamp-2`, 설명 `text-[14.5px] text-proofer-gray line-clamp-2`, URL `text-[13px] text-proofer-gray truncate`. 이미지 칸 `w-[132px] md:w-40 shrink-0 object-cover bg-proofer-bg-alt`           |
| YouTube            | `my-8`          | `aspect-video w-full overflow-hidden rounded-proofer-sm`                                                                                                                                                                                                                                                                                  |
| 구분선             | `my-14`         | 지금의 가운뎃점 세 개 표기 유지, `text-center text-2xl tracking-[0.5em] text-proofer-gray` (Line 은 텍스트에 쓰기엔 대비가 낮다)                                                                                                                                                                                                          |

## 6. OG 이미지 (`og/route.tsx`, 1200x630)

`next/og` 는 CSS 변수와 Tailwind 를 읽지 못하므로 이 절만 HEX 를 직접 쓴다. 값은 전부 1절 토큰의
HEX 이고 새 값이 아니다.

- 배경: BG `#FFFFFF`. 위쪽 가장자리에 높이 12px 막대를 Progress 그라데이션
  `linear-gradient(90deg, #344FE0, #45AF66)` 로 꽉 채운다.
- 안쪽 여백 80px, 세로 `space-between` 로 세 덩어리를 둔다(지금 구조 유지).
  1. 위: 로고 이미지(`/assets/images/logo.svg` 를 절대 URL 로, 높이 44px)와 그 오른쪽 gap 16px 뒤
     세로 선(2px x 28px, Line `#E9EBF2`), 다시 16px 뒤 "블로그"(32px, 700, Menu Ink `#2B3146`).
     로고는 파란색과 초록색 마크라 파란 배경에 올리면 반이 사라진다. 그래서 배경을 흰색으로 정했다.
  2. 가운데: 제목 64px, 700, line-height 1.2, letter-spacing -0.02em, Ink `#0B1020`. 최대 3줄이고 넘치면
     말줄임(`display: -webkit-box`, `WebkitLineClamp: 3`, `overflow: hidden`). 지금처럼 120자에서 먼저 자른다.
  3. 아래: 저자 이름 30px, 700, Blue `#344FE0`. 오른쪽 끝에 `blog.proofer.tech` 24px, Gray `#5B6172`.
     저자가 없으면 왼쪽을 비우고 주소만 둔다.
- 폰트: LINESeedKR 를 써야 한글이 나온다. `next/og` 는 woff2 를 읽지 못하고 저장소에는
  `public/assets/fonts/LINESeedKR-*.woff2` 만 있다. 폰트 파일을 어떻게 공급할지는 e34323ec 의 구현 판단이고,
  모양은 위 값에서 바꾸지 않는다.

## 7. 상태와 접근성

### 상태

| 상태                   | 정의                                                                                                                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 호버(카드)             | 4px 상승 + Border Hover 테두리 + Card Hover 그림자, 0.2s `ease-proofer`. `motion-reduce` 에서 상승만 끈다                                                                                     |
| 호버(링크)             | Blue -> Blue Deep, 밑줄 유지                                                                                                                                                                  |
| 호버(칩)               | Blue Soft 배경 + Border Hover 테두리 + Blue Deep 텍스트                                                                                                                                       |
| 포커스                 | 1절 "포커스 링" 묶음. 키보드 포커스(`focus-visible`)에서만 보이고 마우스 클릭으로는 안 보인다. 링크, 버튼, 칩, 카드, 스크롤 가능한 코드 블록과 표 감싸개 전부                                 |
| 긴 제목                | 목록 카드 제목 `line-clamp-2`, 관련 글 제목 `line-clamp-2`, 글 화면 h1 은 자르지 않고 `break-keep` 으로 줄바꿈한다. 띄어쓰기 없는 긴 영문, URL 은 `break-words` 를 같이 붙여 넘치지 않게 한다 |
| 긴 부제, 설명          | 목록 카드 부제 `line-clamp-2`, 관련 글 부제 `line-clamp-1`, 링크 카드 URL `truncate`                                                                                                          |
| 긴 태그명              | 칩 `max-w-[220px] truncate` + `title`                                                                                                                                                         |
| 이미지 없음(목록)      | 썸네일 칸을 그리지 않는다                                                                                                                                                                     |
| 이미지 없음(글 대표)   | 대표 이미지 블록을 그리지 않고 저자 줄 아래 선이 머리와 본문을 나눈다                                                                                                                         |
| 이미지 없음(링크 카드) | 이미지 칸 없이 텍스트 칸이 전체 폭                                                                                                                                                            |
| 아바타 없음            | 4절 이니셜 원                                                                                                                                                                                 |
| 0건                    | 3절 빈 상태 상자                                                                                                                                                                              |
| 로딩                   | 서버 렌더라 없음. 이미지가 늦게 오는 동안 칸 배경은 BG Alt 로 보인다                                                                                                                          |
| 에러                   | 없는 태그, 저자, 글은 지금처럼 `notFound()`. 404 화면은 이 문서 범위 밖이다                                                                                                                   |

### 접근성 기준

- 텍스트 대비 4.5:1 이상. 이 문서가 쓰는 텍스트 조합의 대비(WCAG 상대 휘도 계산값)는 아래와 같고 전부 통과한다.
  - Ink / 흰색 18.93, Ink / BG Alt 17.67, Menu Ink / 흰색 12.88
  - Gray / 흰색 6.18, Gray / BG Alt 5.77
  - Blue / 흰색 6.29, Blue / BG Alt 5.87, Blue / Blue Soft 5.62, Blue Deep / 흰색 11.16
- 텍스트에 쓰지 않는 색: Green(2.77), Neutral Tag Text(3.19), Line(1.19). Line 은 선과 면에만 쓴다.
- 포커스 링은 Blue 2px + 흰 오프셋 2px 이다. 흰 바탕과 Blue 의 대비가 6.29 라 비텍스트 기준 3:1 을 넘는다.
  `outline-none` 만 쓰고 링을 안 붙이는 일은 없어야 한다.
- 색만으로 의미를 전달하지 않는다. 본문 링크는 밑줄을 유지하고, 현재 쪽 번호는 굵기로도 구분한다.
- 장식 이미지(목록 썸네일, 링크 카드 이미지, 아바타)는 `alt=""` 이고, 이니셜 원은 `aria-hidden` 이다.
  대표 이미지와 본문 이미지는 원고의 alt 를 그대로 쓴다.
