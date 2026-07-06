import React from "react";
import Image from "next/image";
import InquireButton from "../InquireButton";

const MARQUEE = [
  "밸류업",
  "EXIT 준비",
  "운영 시스템화",
  "영업이익 개선",
  "조직 체질 개선",
  "직접 경영참여",
];

// 한 그룹이 화면 폭보다 넓도록 충분히 반복한 뒤, 같은 그룹을 두 번 이어 붙여
// translateX(-50%) 로 끊김 없이 무한 반복시킨다.
const MARQUEE_GROUP = [...MARQUEE, ...MARQUEE, ...MARQUEE];
const MARQUEE_TRACK = [...MARQUEE_GROUP, ...MARQUEE_GROUP];

export default function Hero() {
  return (
    <section className="page snap" id="hero" data-sec="홈">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow reveal">
            GROWTH CONSULTING · PROOF OF VALUE
          </div>
          <h1>
            <span id="heroType">
              <span data-li="0">기업가치를</span>
              <br />
              <span className="hl" data-li="1">
                &apos;증명&apos;합니다
              </span>
            </span>
            <span className="caret" />
          </h1>
          <p className="sub reveal d1">
            운영효율을 극한까지 끌어올려,
            <br />
            &apos;팔리는 회사&apos;를 직접 만드는 그로스 파트너.
          </p>
          <div className="mini-metrics reveal d2">
            <span>
              영업이익률 <b>+15%p 이상</b>
            </span>
            <span className="dotx">·</span>
            <span>
              가맹점 <b>62개 확대</b>
            </span>
            <span className="dotx">·</span>
            <span>
              조직 체질 <b>40% 교체</b>
            </span>
          </div>
          <div className="reveal d3" style={{ marginTop: 30 }}>
            <InquireButton
              className="btn btn-primary"
              style={{ padding: "14px 26px", fontSize: 16 }}
            >
              무료상담 신청
            </InquireButton>
          </div>
        </div>
        <div className="hero-art reveal d2">
          <Image
            className="photo floaty"
            id="heroPhoto"
            src="/assets/images/magnifier-2.png"
            alt="현장을 진단하는 프루퍼"
            width={410}
            height={410}
            priority
          />
          <Image
            className="mark"
            id="markA"
            src="/assets/images/branding.svg"
            style={{ width: 30, height: "auto", top: "6%", left: "6%" }}
            alt=""
            width={30}
            height={30}
          />
          <Image
            className="mark"
            id="markB"
            src="/assets/images/branding.svg"
            style={{ width: 22, height: "auto", bottom: "14%", right: "4%" }}
            alt=""
            width={22}
            height={22}
          />
        </div>
      </div>
      <div className="hero-marquee">
        <div className="track">
          {MARQUEE_TRACK.map((m, i) => (
            <React.Fragment key={i}>
              <span className="pp">{m}</span>
              <span>·</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
