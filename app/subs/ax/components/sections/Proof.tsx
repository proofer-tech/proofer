import React from "react";
import Image from "next/image";

export default function Proof() {
  return (
    <section className="page snap" id="proof" data-sec="근거">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">PROOF</div>
          <h2>근거</h2>
        </div>

        <div className="sub-eyebrow">만드는 회사가 가르칩니다</div>
        <div className="made-row">
          <div className="made-card">
            <div className="top">
              <Image
                src="/assets/images/with-cto/logo.svg"
                alt="with CTO:"
                width={120}
                height={32}
              />
              <span className="pill live">● 활동 중</span>
            </div>
            <p className="muted">
              프루퍼가 여는 커뮤니티입니다. CTO들이 각자 막힌 대목과 풀어낸
              사례를 여기서 꺼내 놓습니다.
            </p>
            <a
              href="https://with-cto.proofer.tech"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--blue)", fontWeight: 700, fontSize: 14 }}
            >
              바로가기 →
            </a>
          </div>
          <div className="made-card">
            <div className="top">
              <Image
                src="/assets/images/stream/logo_with_label.png"
                alt="스트림"
                width={120}
                height={26}
                style={{ height: 26, width: "auto" }}
              />
              <span className="pill soon">준비 중</span>
            </div>
            <p className="muted">
              인재 데이터를 한곳에 모으고 그 위에서 채용 실무를 자동화하는 AX
              솔루션입니다. 프루퍼가 지금 만들고 있습니다.
            </p>
          </div>
          <div className="made-card">
            <div className="top">
              <Image
                src="/assets/images/branding.svg"
                alt="Proofer Insight"
                width={32}
                height={32}
              />
              <span className="pill live">● 운영 중</span>
            </div>
            <p className="muted">
              데이터만 붙이면 됩니다. 코드를 한 줄도 쓰지 않고 대시보드가 나오는
              서비스이고, 기획부터 개발까지 프루퍼가 했습니다.
            </p>
            <a
              href="https://insight.proofer.tech/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--blue)", fontWeight: 700, fontSize: 14 }}
            >
              바로가기 →
            </a>
          </div>
        </div>

        <div className="proof-secondary">
          <div className="sub-eyebrow">사업을 바꿔 본 팀입니다</div>
          <div className="case-metrics">
            <div className="case-metric">
              <div className="cm-num">
                <span className="count" data-to="40">
                  0
                </span>
                <small>%</small>
              </div>
              <div className="cm-tag">핵심 인력 교체</div>
              <div className="cm-desc">
                사업구조를 다시 짜고, 손으로 굴러가던 운영을 시스템으로
                옮겼습니다. 조직 체질이 따라 바뀌었습니다.
              </div>
            </div>
            <div className="case-metric">
              <div className="cm-num">
                +
                <span className="count" data-to="15">
                  0
                </span>
                <small>%p</small>
              </div>
              <div className="cm-tag">영업이익률 개선</div>
              <div className="cm-desc">
                한 해만 오른 숫자가 아닙니다. 가맹점 마진율을 손보고 새는 비용을
                하나씩 막아서 올린 폭입니다.
              </div>
            </div>
            <div className="case-metric">
              <div className="cm-num">
                <span className="count" data-to="62">
                  0
                </span>
                <small>개</small>
              </div>
              <div className="cm-tag">가맹점 확대</div>
              <div className="cm-desc">
                주요 유통 채널과 손잡고 가맹점을 늘리면서 브랜드 가치도 같이
                끌어올렸습니다.
              </div>
            </div>
          </div>
          <div className="case-exit">
            어려워진 회사에 들어가 구조부터 다시 짰고, 1년 만에{" "}
            <b>매각까지 끝냈습니다</b>
          </div>
        </div>

        <div className="proof-secondary">
          <div className="sub-eyebrow">누가 가르치는가</div>
          <div className="team-grid">
            <a
              className="tcard"
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
                <p className="role">
                  강의는 대표가 직접 맡습니다. 10년 넘게 현업에서 코드를 쓴
                  사람이 그대로 강단에 섭니다.
                </p>
                <div className="tags">
                  <span>건국대 경영공학</span>
                  <span>토스</span>
                  <span>개발 10년+</span>
                  <span>예비창업패키지 &apos;25</span>
                </div>
              </div>
            </a>
            <div className="tcard">
              <div className="pic green">
                <span className="pic-ph" aria-hidden="true">
                  L
                </span>
              </div>
              <div className="tinfo">
                <h3>
                  Louis <span>이사</span>
                </h3>
                <p className="role">
                  교육을 조직에 심는 설계를 맡습니다. 20년을 HR에서 보내고
                  스타트업 대표까지 해 봤으니, 배운 것이 조직에 남으려면 무엇을
                  바꿔야 하는지 압니다.
                </p>
                <div className="tags">
                  <span>연세대 MBA</span>
                  <span>쿠팡</span>
                  <span>HR 20년+</span>
                  <span>스타트업 대표</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
