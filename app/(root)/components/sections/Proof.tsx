import React from "react";
import Image from "next/image";

export default function Proof() {
  return (
    <section className="page snap" id="proof" data-sec="케이스">
      <div className="wrap">
        <div className="sect-head reveal" style={{ maxWidth: 820 }}>
          <div className="eyebrow">PROOF · FLAGSHIP CASE</div>
          <h2>힘들 때 들어가, 1년 만에 &apos;팔리는 회사&apos;로</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            P사가 어려울 때 합류해, 진단·분석부터 직접 만들고 해결했습니다.
            기업가치를 제고하고, 결국 매각에 성공했습니다.
          </p>
        </div>
        <div className="case-metrics reveal d1">
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
              올리브영, 신세계백화점과 협업했습니다.
            </div>
          </div>
        </div>
        <div className="case-exit reveal d2">
          사업구조 재설계 · 운영 시스템화 · 기업가치 제고 → <b>EXIT 성공</b>
        </div>

        <div className="proof-secondary reveal d3">
          <div className="sub-eyebrow">
            기술 실행력의 증거 — 직접 만들어온 것들
          </div>
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
          <div className="past">
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
              </div>{" "}
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
              </div>{" "}
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
              </div>{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
