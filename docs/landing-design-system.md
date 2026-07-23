# 프루퍼 랜딩페이지 디자인 시스템

> 출처: `app/(root)/home.scss` (랜딩 전용 자체완결형 스타일시트, `.home-root` 스코프).
> Figma 변수/스타일로 옮기기 위한 토큰 정리. clamp() 값은 `최소 / 데스크톱(최대)` 형태로 표기하며,
> Figma는 고정 크기이므로 **데스크톱(최대)값을 기본 토큰**으로 쓰는 걸 권장.

---

## 1. 색상 (Colors)

### 브랜드
| 토큰 | HEX | 용도 |
|---|---|---|
| Blue | `#344FE0` | 메인 브랜드, 버튼, 강조 텍스트·아이콘 |
| Blue Deep | `#0020B6` | 호버·심층 배경, 그라데이션 끝점 |
| Blue Soft | `#EEF2FF` | 뱃지/칩 배경, 하이라이트 셀 |
| Green | `#45AF66` | 보조 브랜드, 성공/라이브 상태 |
| Green Soft | `#E7F6EC` | 라이브 뱃지 배경 |

### 중립 (텍스트·면·선)
| 토큰 | HEX | 용도 |
|---|---|---|
| Ink | `#0B1020` | 기본 본문/제목 텍스트 |
| Gray | `#5B6172` | 보조 텍스트(muted), 설명문 |
| Line | `#E9EBF2` | 카드·구분선 테두리 |
| BG | `#FFFFFF` | 페이지 배경 |
| BG Alt | `#F6F7FA` | #problem / #why 섹션 배경 |
| Card Grad Bottom | `#FBFCFF` · `#F6F8FF` · `#EFF3FF` | 카드 하단 미세 그라데이션(l1/l2/l3) |

### 시맨틱 / 액센트
| 토큰 | HEX | 용도 |
|---|---|---|
| Menu Ink | `#2B3146` | 헤더 메뉴·태그 텍스트 |
| Green Text | `#2C7A47` | 라이브 태그 텍스트 |
| Green Text Alt | `#1F9C52` | 비교표 체크 아이콘 |
| Green Bright | `#9BE3B4` | 파란 배경 위 체크·강조(솔루션/CTA) |
| Warn BG | `#FFF3E0` | soon 뱃지·partial 셀 배경 |
| Warn Text | `#9A6400` / `#C98A00` | soon 뱃지·partial 텍스트 |
| Neutral Tag BG | `#F1F4FA` · `#EEF0F4` | 팀 태그·과거 이력 상태칩 배경 |
| Neutral Tag Text | `#8A90A0` | 이력 상태칩 텍스트 |
| Marquee Gray | `#9AA1B4` | 로고 마퀴 텍스트 |
| Dot Off | `#D2D7E6` | 도트 내비 비활성 |
| Border Hover | `#CDD6FF` / `#CDD8FF` | 카드 호버 테두리 |
| No Mark | `#C2C7D4` | 비교표 미지원(–) |

### 다크(파란 배경) 위 텍스트
| HEX | 용도 |
|---|---|
| `#FFFFFF` | 제목·본문 |
| `#DFE6FF` | 솔루션 본문 |
| `#E8EEFF` / `#EAF0FF` | 리스트·노트 |
| `#CDD8FF` | 다크 아이브로우 |

### 그라데이션
| 이름 | 값 | 용도 |
|---|---|---|
| Brand (blue→green) | `linear-gradient(115deg, #344FE0, #45AF66)` | 하이라이트 텍스트, 지표 숫자, 카드 테두리 |
| Blue Depth | `linear-gradient(135deg, #344FE0, #0020B6)` | 프로필 배경, 솔루션 sweep |
| Blue Feature | `linear-gradient(150deg, #0020B6, #344FE0)` | 피처 카드 |
| Progress | `linear-gradient(90deg, #344FE0, #45AF66)` | 상단 진행 바 |
| Contact BG | `linear-gradient(120deg, #0020B6, #344FE0, #0020B6)` | 최종 CTA 배경(애니메이션) |
| Contact Orbs | `#6F8CFF` · `#45AF66` · `#9DB4FF` | 배경 블러 오브 |

---

## 2. 타이포그래피 (Typography)

- **폰트**: `LINESeedKR` (폴백: `-apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`)
- **기본 line-height**: 1.5
- **제목 공통**: weight 700, letter-spacing −0.02em
- **웨이트**: 400(본문) · 700(제목·강조·태그) · 800(비교표 체크·플로우 번호)

### 타입 스케일 (최소 / 데스크톱)
| 역할 | 크기 (px) | line-height | letter-spacing |
|---|---|---|---|
| Display / Hero H1 | 36 / **64** | 1.06 | −0.02em |
| Final H2 | 30 / **52** | 1.1 | −0.02em |
| Solution H2 | 26 / **44** | 1.16 | −0.02em |
| Section H2 | 25 / **38** | 1.14 | −0.02em |
| H3 (카드 제목) | 18 / **23** | 1.2 | −0.02em |
| Team Name H3 | **21** | — | −0.02em |
| Body Large / Sub | 15.5 / **18** | 1.5~1.72 | — |
| Body | **16** (16.5) | 1.5~1.62 | — |
| Body Small | **14.5** | 1.55~1.62 | — |
| Nav Menu | **15.5** | — | (700) |
| Caption / Tag | **12** (11~13) | — | (700) |
| Eyebrow | **13** | — | +0.1em (700) |
| Sub-eyebrow | **13** | — | +0.06em (700) |
| Footer | **13.5** | — | — |

### 디스플레이 숫자 (지표)
| 역할 | 크기 (px) | 비고 |
|---|---|---|
| Feature Big | 46 / **84** | weight 700, lh 1, 단위(small) 0.34em |
| Case Metric Num | 38 / **58** | Brand 그라데이션 텍스트 |
| Final Echo | 26 / **62** | 흰색 9% 투명 워터마크 |

---

## 3. 여백 · 레이아웃 (Spacing / Layout)

| 항목 | 값 |
|---|---|
| 컨테이너 max-width (`.wrap`) | **1160px** |
| 컨테이너 좌우 패딩 | **24px** |
| 섹션 패딩 (`.page`, 데스크톱) | **84px 0 48px** |
| 섹션 패딩 (모바일) | 88px 0 56px |
| 섹션 헤더 하단 여백 | 26px |
| 섹션 헤더 max-width | 680px |

### 반복되는 갭·패딩 스텝
- **갭 스케일**: 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 26 · 30 · 34 · 38 · 40 · 42 px
- **카드 패딩**: 16~30px (표준 카드 22~26px, 피처 30px)
- **뱃지/칩 패딩**: 세로 3~6px · 가로 9~11px
- **버튼 패딩**: 12px 20px (기본) / 18px 36px (CTA large)

### 브레이크포인트
| 값 | 동작 |
|---|---|
| 980px | 도트 내비 숨김 |
| 880px | 그리드 1열 전환, 스냅 해제 |
| 780px | 헤더 메뉴 숨김 |
| 680px | 도킹 CTA 하단 고정바 |
| 560px | 팀 카드 세로 정렬 |

---

## 4. 라운드 (Radius)

| 토큰 | 값 | 용도 |
|---|---|---|
| Base (`--r`) | **16px** | 표준 카드(made-card, prob-card) |
| Pill | **999px** | 버튼, 태그, 칩, 뱃지 |
| Card SM | 13 / 14px | mini-case, past-item, signal |
| Card MD | **18px** | 카드·표·지표 카드·bubble |
| Card LG | **20px** | 컨설팅 레이어, 피처, 플로우 |
| Card XL | **22px** | 팀 카드, 프로필 이미지(내부 18px) |
| Small | 9px | 소셜 아이콘 버튼 |
| Full | 50% | 도트·오브·플로우 번호 원 |

> 참고: Tailwind/앱 토큰(`--radius: 0.5rem`)과 별개. 랜딩은 위 `--r: 16px` 체계를 사용.

---

## 5. 그림자 (Shadow)

| 토큰 | 값 | 용도 |
|---|---|---|
| Card Hover (`--shadow`) | `0 18px 50px -22px rgba(20,30,80,.34)` | 카드 호버 상승 |
| Button Primary | `0 10px 22px -10px rgba(52,79,224,.85)` | 파란 버튼 |
| Layer | `0 -12px 30px -22px rgba(20,30,80,.55), 0 12px 26px -18px rgba(20,30,80,.32)` | 컨설팅 스택 카드 |
| Card Soft | `0 10px 30px -22px rgba(20,30,80,.5)` | 문제 카드 기본 |
| CTA Big | `0 16px 44px -10px rgba(0,8,70,.55)` | 최종 CTA 버튼 |
| Dock CTA | `0 20px 50px -16px rgba(20,30,80,.6)` | 도킹 바 |

---

## 6. 모션 (참고)

- **이징**: `cubic-bezier(0.2, 0.7, 0.2, 1)` (reveal), `cubic-bezier(0.2, 0.8, 0.2, 1)` (chat pop)
- **reveal**: opacity 0→1 + translateY(26px→0), 0.6s / 지연 0.06·0.08·0.16·0.24·0.32s
- **호버 상승**: translateY(−4 ~ −8px), 0.2~0.35s
- `prefers-reduced-motion` 시 배경·플로티 애니메이션 정지
