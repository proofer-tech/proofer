import React from "react";
import { generateUrl } from "@/src/path";
import { SUB_DOMAIN } from "@/src/constants";

const SEGMENTS = [
  {
    path: "/startup",
    label: "스타트업",
    desc: "대표와 팀의 AI Native 업무환경",
  },
  {
    path: "/growth",
    label: "중소-중견",
    desc: "더 큰 회사를 향한 AI Native 전환",
  },
  {
    path: "/enterprise",
    label: "엔터프라이즈",
    desc: "기업 AI 교육, AX 해커톤, AX 컨설팅",
  },
  {
    path: "/open",
    label: "기관 위탁",
    desc: "대학 사업단과 지자체를 위한 공개 AI 교육",
  },
];

export default function Ax() {
  return (
    <section className="page snap" id="ax" data-sec="AX 교육">
      <div className="wrap">
        <div className="sect-head reveal" style={{ maxWidth: 820 }}>
          <div className="eyebrow">PROOFER AX</div>
          <h2>도구보다 일하는 방식과 사람을 먼저 바꾸는 AI 교육</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            AI 도구 사용법이 아니라 우리 회사의 업무 방식을 바꾸는 교육입니다.
            조직의 규모와 상황에 맞는 과정을 골라 보세요.
          </p>
        </div>
        <div className="ax-grid reveal d1">
          {SEGMENTS.map((s) => (
            <a
              key={s.path}
              className="ax-card"
              href={generateUrl(s.path, SUB_DOMAIN.ax)}
              target="_blank"
              rel="noreferrer"
            >
              <b>{s.label}</b>
              <span>{s.desc}</span>
            </a>
          ))}
        </div>
        <div className="ax-cta reveal d2">
          <a
            className="btn btn-primary"
            href={generateUrl("/", SUB_DOMAIN.ax)}
            target="_blank"
            rel="noreferrer"
          >
            프루퍼 AX 바로가기
          </a>
        </div>
      </div>
    </section>
  );
}
