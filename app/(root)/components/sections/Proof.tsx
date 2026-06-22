import React from "react";
import Image from "next/image";

export default function Proof() {
  return (
    <section className="page snap" id="proof" data-sec="만든 것·변화">
      <div className="wrap">
        <div className="sect-head reveal" style={{ maxWidth: 780 }}>
          <div className="eyebrow">WHAT WE BUILT &amp; CHANGED</div>
          <h2>우리의 일처럼 고객의 문제를 대합니다</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            우리가 쓸 도구부터 직접 만들어 봤습니다. 그 경험으로 고객의 변화를
            만듭니다.
          </p>
        </div>
        <div className="proof-grid">
          <div className="reveal d1">
            <div className="sub-eyebrow">만들어온 것들</div>
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
                  style={{
                    color: "var(--blue)",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
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
            </div>
            <div
              className="past"
              style={{ gridTemplateColumns: "1fr", marginTop: 12 }}
            >
              <a
                className="past-item"
                href="https://insight.proofer.tech/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/branding.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div>
                  <b>Proofer Insight</b>
                  <span>노코드 대시보드 빌더</span>
                </div>
                <span className="st">중단</span>
              </a>
              <a
                className="past-item"
                href="https://devm.proofer.tech/"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/branding.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <div>
                  <b>Proofer DevM</b>
                  <span>개발자 성과 추적 대시보드</span>
                </div>
                <span className="st">중단</span>
              </a>
              <a
                className="past-item"
                href="https://medium.com/proofer-blog/newsletter"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/assets/images/team/measurable-developer.webp"
                  alt=""
                  width={24}
                  height={24}
                />
                <div>
                  <b>Measurable Developer</b>
                  <span>개발자 성과 측정 뉴스레터</span>
                </div>
                <span className="st">중단</span>
              </a>
            </div>
          </div>
          <div className="reveal d2">
            <div className="sub-eyebrow">현장에서 만든 변화</div>
            <div className="feature" style={{ marginBottom: 12 }}>
              <span className="ftag">직접 경영 참여 · 리테일</span>
              <div>
                <div className="big">
                  <span className="count" data-to="90">
                    0
                  </span>
                  <small>% ↓</small>
                </div>
                <div className="lab">정산 시간 단축 (3명·1주 → 1명·2시간)</div>
              </div>
              <div className="fdesc">
                사업구조 재설계와 운영 시스템화로 기업가치를 끌어올렸습니다.
                매장 마진도 10~20%p 개선됐습니다.
              </div>
            </div>
            <div className="mini-cases">
              <div className="mini-case">
                <span className="mtag">멘토링</span>
                <div>
                  <b>예비창업 팀들</b>
                  <span>외주 발주법부터 팀 빌딩까지</span>
                </div>
              </div>
              <div className="mini-case">
                <span className="mtag">풀스택 외주</span>
                <div>
                  <b>모 스타트업</b>
                  <span>기획부터 AI까지, 출시 후 실사용 중</span>
                </div>
              </div>
              <div className="mini-case">
                <span className="mtag">기술 자문</span>
                <div>
                  <b>모 부동산 중개법인</b>
                  <span>매번 개발 대신 템플릿화 구조 제안</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
