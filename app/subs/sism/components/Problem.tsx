import s from "./Problem.module.scss";

const CARDS = [
  {
    l1: "제각각 맡겼더니",
    l2: "조립도 못해보고 끝났어요",
    desc: "디자인, 앱, 서버를 업체마다 따로 맡기면 조율하는 일이 더 커집니다. 문제가 생기면 서로 책임을 미룹니다.",
    art: (
      <>
        <path
          d="M66 44 C100 20, 130 90, 174 48"
          fill="none"
          stroke="#c9cedd"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <path
          d="M60 84 C110 110, 140 20, 180 82"
          fill="none"
          stroke="#c9cedd"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <rect
          x="28"
          y="22"
          width="48"
          height="44"
          rx="10"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <path d="M42 54 L58 34 L64 40 L48 60 Z" fill="#344fe0" />
        <path d="M42 54 L40 62 L48 60 Z" fill="#45af66" />
        <rect
          x="164"
          y="22"
          width="48"
          height="44"
          rx="10"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <rect
          x="178"
          y="28"
          width="20"
          height="32"
          rx="4"
          fill="none"
          stroke="#344fe0"
          strokeWidth="3"
        />
        <circle cx="188" cy="54" r="2" fill="#344fe0" />
        <rect
          x="96"
          y="64"
          width="48"
          height="44"
          rx="10"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <rect x="108" y="72" width="24" height="10" rx="3" fill="#344fe0" />
        <rect x="108" y="86" width="24" height="10" rx="3" fill="#45af66" />
        <circle
          cx="120"
          cy="34"
          r="13"
          fill="#ffffff"
          stroke="#c9cedd"
          strokeWidth="2"
        />
        <text
          x="120"
          y="40"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill="#344fe0"
        >
          ?
        </text>
      </>
    ),
  },
  {
    l1: "기획서가 없어",
    l2: "견적도 못 받고 있어요",
    desc: "만들고 싶은 건 분명한데 문서로 정리하지 못해서 견적 요청부터 막힙니다.",
    art: (
      <>
        <rect
          x="62"
          y="12"
          width="78"
          height="98"
          rx="8"
          fill="#ffffff"
          stroke="#c9cedd"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <rect x="76" y="30" width="40" height="6" rx="3" fill="#dfe5ff" />
        <rect x="76" y="46" width="50" height="5" rx="2.5" fill="#eef0f6" />
        <rect x="76" y="58" width="44" height="5" rx="2.5" fill="#eef0f6" />
        <rect x="76" y="70" width="48" height="5" rx="2.5" fill="#eef0f6" />
        <circle
          cx="164"
          cy="44"
          r="22"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <path
          d="M164 30 a10 10 0 0 1 6 18 v5 h-12 v-5 a10 10 0 0 1 6 -18 z"
          fill="#344fe0"
        />
        <rect x="158" y="55" width="12" height="4" rx="2" fill="#45af66" />
        <path
          d="M150 86 l10 10 M160 86 l-10 10"
          stroke="#c9cedd"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text x="176" y="96" fontSize="12" fontWeight="700" fill="#c9cedd">
          견적
        </text>
      </>
    ),
  },
  {
    l1: "같은 내용을",
    l2: "세 번 입력합니다",
    desc: "메신저로 받은 주문을 엑셀에 옮기고 회계 프로그램에 또 칩니다. 한 곳이 틀리면 어디서 틀렸는지 찾는 일이 따로 생깁니다.",
    art: (
      <>
        <rect
          x="14"
          y="36"
          width="56"
          height="44"
          rx="12"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <path
          d="M26 80 l-4 12 l14 -12"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="24" y="48" width="36" height="5" rx="2.5" fill="#344fe0" />
        <rect x="24" y="60" width="26" height="5" rx="2.5" fill="#dfe5ff" />
        <path
          d="M76 58 h14"
          stroke="#c9cedd"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M86 53 l5 5 l-5 5"
          fill="none"
          stroke="#c9cedd"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="94"
          y="30"
          width="56"
          height="58"
          rx="8"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <path
          d="M94 46 h56 M94 62 h56 M94 76 h56 M114 30 v58"
          stroke="#dfe5ff"
          strokeWidth="1.5"
        />
        <rect x="118" y="50" width="28" height="8" rx="2" fill="#45af66" />
        <path
          d="M156 58 h14"
          stroke="#c9cedd"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M166 53 l5 5 l-5 5"
          fill="none"
          stroke="#c9cedd"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <rect
          x="174"
          y="30"
          width="52"
          height="58"
          rx="8"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <rect x="182" y="38" width="36" height="12" rx="3" fill="#dfe5ff" />
        <g fill="#c9cedd">
          <rect x="182" y="56" width="9" height="8" rx="2" />
          <rect x="195" y="56" width="9" height="8" rx="2" />
          <rect x="208" y="56" width="9" height="8" rx="2" />
          <rect x="182" y="68" width="9" height="8" rx="2" />
          <rect x="195" y="68" width="9" height="8" rx="2" />
        </g>
        <rect x="208" y="68" width="9" height="8" rx="2" fill="#344fe0" />
        <circle cx="214" cy="30" r="9" fill="#f05252" />
        <path
          d="M210 26 l8 8 M218 26 l-8 8"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    l1: "만든 업체가",
    l2: "연락을 끊고 잠수탔어요",
    desc: "소스도 서버 계정도 받아 둔 게 없어서 글자를 고치는 일도 맡길 데가 없습니다. 보안 경고가 떠도 손댈 사람이 없습니다.",
    art: (
      <>
        <rect
          x="40"
          y="26"
          width="64"
          height="70"
          rx="12"
          fill="#ffffff"
          stroke="#dfe5ff"
          strokeWidth="2"
        />
        <rect x="52" y="40" width="40" height="6" rx="3" fill="#344fe0" />
        <rect x="52" y="54" width="30" height="5" rx="2.5" fill="#dfe5ff" />
        <rect x="52" y="66" width="36" height="5" rx="2.5" fill="#dfe5ff" />
        <path
          d="M108 61 h12"
          stroke="#344fe0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M136 61 h12"
          stroke="#c9cedd"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <path
          d="M122 52 l4 7 l-4 3 l5 8"
          fill="none"
          stroke="#f05252"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="176"
          cy="61"
          r="24"
          fill="#ffffff"
          stroke="#c9cedd"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <circle cx="176" cy="54" r="7" fill="#c9cedd" />
        <path d="M164 74 a12 10 0 0 1 24 0" fill="#c9cedd" />
        <path d="M60 102 l12 -20 l12 20 z" fill="#f6b33c" />
        <rect x="71" y="88" width="2.4" height="7" rx="1" fill="#ffffff" />
        <circle cx="72.2" cy="98" r="1.4" fill="#ffffff" />
      </>
    ),
  },
];

export default function Problem() {
  return (
    <section id="problem" className={s.root}>
      <div className={`sism-container ${s.inner}`}>
        <div className={s.head}>
          <div className="sism-label">PROBLEM</div>
          <h2 className="sism-title">
            외주를 맡길 때마다
            <br />
            같은 고민을 반복하시나요?
          </h2>
        </div>
        <div className={s.grid}>
          {CARDS.map((c) => (
            <article key={c.l1} className="sism-card">
              <div aria-hidden="true" className={s.art}>
                <svg viewBox="0 0 240 120" className={s.svg}>
                  {c.art}
                </svg>
              </div>
              <h3 className={s.h3}>
                {c.l1}
                <br />
                {c.l2}
              </h3>
              <p className={s.p}>{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
