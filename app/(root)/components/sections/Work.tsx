import React from "react";
import Image from "next/image";

export default function Work() {
  return (
    <section className="page snap" id="work" data-sec="일하는 법">
      <div className="wrap">
        <div className="sect-head center reveal" style={{ margin: "0 auto" }}>
          <div className="eyebrow">HOW WE WORK</div>
          <h2>프루퍼가 일하는 법</h2>
          <p className="muted" style={{ marginTop: 8, fontWeight: 700 }}>
            고객 먼저 · 존중하되 부딪히기 · 배우고 발견하기 · 진짜를 추구
          </p>
        </div>
        <div className="flow" id="flow">
          <div className="flow-card lit">
            <div className="flow-thumb">
              <svg
                viewBox="0 0 360 330"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="보이는 과제 뒤의 진짜 문제"
              >
                <defs>
                  <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7E9BFF" />
                    <stop offset="1" stopColor="#0020B6" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="360" height="330" fill="#EEF2FF" />
                <rect x="0" y="150" width="360" height="180" fill="#D9E3FF" />
                <line
                  x1="18"
                  y1="150"
                  x2="342"
                  y2="150"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeDasharray="2 9"
                  strokeLinecap="round"
                />
                <path d="M150 150 L182 72 L214 150 Z" fill="#fff" />
                <path d="M182 72 L200 112 L214 150 L190 150 Z" fill="#cfe0ff" />
                <circle cx="182" cy="72" r="5" fill="#45AF66" />
                <path
                  d="M118 150 L246 150 L274 246 L214 308 L150 308 L90 246 Z"
                  fill="url(#ice)"
                />
                <path
                  d="M118 150 L182 150 L170 308 L150 308 L90 246 Z"
                  fill="#0020B6"
                  opacity=".22"
                />
                <text
                  x="252"
                  y="120"
                  fontFamily="LINESeedKR,sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B1020"
                >
                  보이는 과제
                </text>
                <text
                  x="262"
                  y="232"
                  fontFamily="LINESeedKR,sans-serif"
                  fontSize="13"
                  fontWeight="700"
                  fill="#fff"
                >
                  진짜 문제
                </text>
              </svg>
            </div>
            <div className="flow-n">STEP 01</div>
            <h3>진짜 문제를 다시 정의합니다</h3>
            <p>
              받은 과제를 그대로 받지 않고, 그 뒤의 진짜 문제부터 봅니다. 더
              많이 만들기보다 덜 만들고 더 잘 굴리는 길을 먼저 찾습니다.
            </p>
          </div>
          <div className="flow-card">
            <div className="flow-thumb">
              <Image
                src="/assets/images/stream/demo-1.png"
                alt="직접 만든 제품"
                width={360}
                height={158}
              />
            </div>
            <div className="flow-n">STEP 02</div>
            <h3>자문에 그치지 않고 직접 만듭니다</h3>
            <p>
              진단과 제안에서 끝내지 않습니다. 기획부터 앱, 서버, AI까지 한
              팀으로 직접 만들어 출시합니다.
            </p>
          </div>
          <div className="flow-card">
            <div className="flow-thumb">
              <Image
                src="/assets/images/devm/dashboard-example.png"
                alt="팀 도구"
                width={360}
                height={158}
              />
            </div>
            <div className="flow-n">STEP 03</div>
            <h3>사람과 팀 구조까지 함께 설계합니다</h3>
            <p>
              문제를 코드로만 풀지 않습니다. 직접 개발이 맞는지, 팀을 키우는 게
              맞는지, 외주가 맞는지. 상황에 맞는 실행 구조를 함께 짭니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
