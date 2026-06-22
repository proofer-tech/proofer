import React from "react";
import Image from "next/image";
import InquireButton from "../InquireButton";

const MARQUEE = [
  "현장 진단",
  "DX 전환",
  "AI 자동화",
  "풀스택 개발",
  "팀 빌딩",
  "외주 문의",
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
          <h1>
            <span id="heroType">
              <span data-li="0">비즈니스에</span>
              <br />
              <span className="hl" data-li="1">
                기술을 더하다
              </span>
            </span>
            <span className="caret" />
          </h1>
          <p className="sub reveal d1">
            현장을 직접 보고 문제부터 진단합니다. 사람으로 풀 일은 컨설팅으로,
            도구가 필요한 일은 직접 만들어 해결합니다.
          </p>
          <div className="mini-metrics reveal d2">
            <span>
              정산 시간 <b>90% 단축</b>
            </span>
            <span className="dotx">·</span>
            <span>
              매장 마진 <b>10~20%p 개선</b>
            </span>
            <span className="dotx">·</span>
            <span>
              채용 준비 <b>40분 → 10분</b>
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
