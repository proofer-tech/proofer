import React from "react";
import Image from "next/image";

export default function Portfolio() {
  return (
    <section className="page snap" id="portfolio" data-sec="포트폴리오">
      <div className="wrap">
        <div className="sect-head reveal" style={{ maxWidth: 820 }}>
          <div className="eyebrow">PORTFOLIO · SERVICES</div>
          <h2>직접 만들고 운영하는 서비스</h2>
          <p className="muted" style={{ marginTop: 8 }}>
            기술 실행력의 증거입니다. 컨설팅에서 쓰는 방법을 직접 제품으로
            만들어 운영합니다.
          </p>
        </div>
        <div className="reveal d1">
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
            <div className="made-card">
              <div className="top">
                <Image
                  src="/assets/images/dira/icon.svg"
                  alt="dira"
                  width={32}
                  height={32}
                />
                <b style={{ flex: 1, fontSize: 20 }}>dira</b>
                <span className="pill live">● 활동 중</span>
              </div>
              <p className="muted">
                티켓 큐로 AI 에이전트 팀을 돌리는 로컬 멀티 에이전트 매니지먼트
                시스템입니다.
              </p>
              <a
                href="https://dira.proofer.tech"
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
                  src="/assets/images/pofol/icon.svg"
                  alt="포폴 pofol"
                  width={32}
                  height={32}
                />
                <b style={{ flex: 1, fontSize: 20 }}>포폴</b>
                <span className="pill live">● 활동 중</span>
              </div>
              <p className="muted">
                국내 포트폴리오 웹사이트를 직군 구분 없이 모아 보여주는
                아카이브입니다.
              </p>
              <a
                href="https://pofol.works"
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
                  src="/assets/images/hravengers/icon.svg"
                  alt="HR Avengers"
                  width={32}
                  height={32}
                />
                <b style={{ flex: 1, fontSize: 20 }}>HR Avengers</b>
                <span className="pill live">● 운영 중</span>
              </div>
              <p className="muted">
                기업의 성장 단계에 따라 필요한 HR 사항을 진단하고 분석하여
                최적의 해결방안을 찾아드립니다.
              </p>
              <a
                href="https://hravengers.co.kr"
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
              href="https://blog.proofer.tech/tag/%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%83%9D%EC%82%B0%EC%84%B1"
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
