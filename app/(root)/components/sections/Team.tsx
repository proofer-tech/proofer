import React from "react";
import Image from "next/image";

export default function Team() {
  return (
    <section className="page snap" id="team" data-sec="회사소개">
      <div className="wrap">
        <div
          className="sect-head center reveal"
          style={{ margin: "0 auto 18px" }}
        >
          <div className="eyebrow">TEAM</div>
          <h2>프루퍼를 만드는 사람들</h2>
        </div>
        <div className="team-lead reveal d1">
          <p className="team-lead-head">
            <b className="hl-blue">기술을 깊이 보는 눈</b>과{" "}
            <b className="hl-green">사업·조직을 멀리 보는 눈</b>을 모두 갖춘 팀
          </p>
          <p>
            자동화와 AI까지 한 팀으로, 무엇을 만들지와 그것이 사업에 어떤 기여를
            하는지 이해하며, 고객사의 기존 팀을 함께 이끌고 필요한 사람은 직접
            채용하는 등{" "}
            <b className="hl-ink">
              진단에서 멈추지 않고 고객과 함께 결과를 만듭니다.
            </b>
          </p>
        </div>
        <div className="team-grid">
          <a
            className="tcard reveal d2"
            href="https://www.linkedin.com/in/hsolim"
            target="_blank"
            rel="noreferrer"
          >
            <div className="pic">
              <Image
                src="/assets/images/team/hansol.png"
                alt="임한솔"
                width={120}
                height={120}
              />
            </div>
            <div className="tinfo">
              <h3>
                임한솔 <span>대표</span>
              </h3>
              <p className="role">12년동안 고객과 서비스에 집착해왔습니다.</p>
              <div className="tags">
                <span>건국대 경영공학</span>
                <span>토스</span>
                <span>개발 10년+</span>
                <span>예비창업패키지 ’25</span>
              </div>
            </div>
          </a>
          <a
            className="tcard reveal d3"
            href="https://www.linkedin.com/in/dukman-lim-54b291101"
            target="_blank"
            rel="noreferrer"
          >
            <div className="pic green">
              <Image
                src="/assets/images/team/dukman.png"
                alt="임덕만"
                width={120}
                height={120}
              />
            </div>
            <div className="tinfo">
              <h3>
                임덕만 <span>이사</span>
              </h3>
              <p className="role">20년 동안 사람과 조직을 키워 왔습니다.</p>
              <div className="tags">
                <span>연세대 MBA</span>
                <span>쿠팡</span>
                <span>HR 20년+</span>
                <span>가디언즈랩 대표</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
