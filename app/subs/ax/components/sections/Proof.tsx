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
              CTO들이 고민과 사례를 나누는 커뮤니티입니다.
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
              인재 데이터 허브 위에 채용 실무를 자동화하는 AX 솔루션.
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
            <p className="muted">노코드로 대시보드를 만드는 서비스입니다.</p>
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
                사업구조 재설계 · 운영 시스템화로 조직 체질을 바꿨습니다.
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
              <div className="cm-tag">안정적인 영업이익률</div>
              <div className="cm-desc">
                가맹점 마진율을 개선하고 불필요한 비용을 제거했습니다.
              </div>
            </div>
            <div className="case-metric">
              <div className="cm-num">
                <span className="count" data-to="62">
                  0
                </span>
                <small>개</small>
              </div>
              <div className="cm-tag">가맹점 · 브랜드 가치 제고</div>
              <div className="cm-desc">
                주요 유통 채널과 협업해 브랜드 가치를 끌어올렸습니다.
              </div>
            </div>
          </div>
          <div className="case-exit">
            사업구조 재설계 · 운영 시스템화 · 기업가치 제고 → <b>EXIT 성공</b>
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
                <p className="role">12년동안 고객과 서비스에 집착해왔습니다.</p>
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
                <p className="role">20년 동안 사람과 조직을 키워 왔습니다.</p>
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
