import React from "react";

export default function Solution() {
  return (
    <section className="page snap" id="solution" data-sec="해결">
      <div className="sweep" />
      <div className="wrap inner">
        <div>
          <div className="eyebrow">SOLUTION</div>
          <h2>
            문제부터 정확히 진단하고
            <br />
            필요한 만큼만 만듭니다
          </h2>
          <p>
            문제 해결에 꼭 개발이 필요한 건 아닙니다. 프루퍼는 현장을 먼저 보고
            무엇이 진짜 문제인지부터 진단합니다.
          </p>
          <ul className="solist">
            <li>현장 관찰과 데이터로 진짜 문제를 찾습니다</li>
            <li>사람과 프로세스로 풀리는 일은 컨설팅으로 해결합니다</li>
            <li>도구가 있어야 풀리는 일은 직접 만들어 드립니다</li>
          </ul>
        </div>
        <div className="diagram">
          <svg
            viewBox="0 0 300 320"
            width="100%"
            style={{ maxWidth: 320, margin: "0 auto", display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
            aria-label="해결 방식"
          >
            <g
              fontFamily="LINESeedKR,sans-serif"
              fontWeight="700"
              fontSize="15"
            >
              <rect
                x="75"
                y="14"
                width="150"
                height="50"
                rx="13"
                fill="rgba(255,255,255,.16)"
                stroke="#fff"
                strokeWidth="2"
              />
              <text x="150" y="44" textAnchor="middle" fill="#fff">
                현장 진단
              </text>
              <path
                d="M150 64 L150 112"
                stroke="#fff"
                strokeWidth="3"
                strokeDasharray="6 7"
              />
              <path
                d="M150 112 C150 146 96 150 82 182"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeDasharray="6 7"
                opacity=".9"
              />
              <path
                d="M150 112 C150 146 204 150 218 182"
                fill="none"
                stroke="#9be3b4"
                strokeWidth="3"
                strokeDasharray="6 7"
              />
              <text
                x="80"
                y="208"
                textAnchor="middle"
                fill="#cdd8ff"
                fontSize="12"
              >
                사람·프로세스로
              </text>
              <text
                x="220"
                y="208"
                textAnchor="middle"
                fill="#cdd8ff"
                fontSize="12"
              >
                도구가 필요하면
              </text>
              <rect
                x="16"
                y="218"
                width="128"
                height="50"
                rx="13"
                fill="#fff"
              />
              <text x="80" y="248" textAnchor="middle" fill="#0020B6">
                컨설팅
              </text>
              <rect
                x="156"
                y="218"
                width="128"
                height="50"
                rx="13"
                fill="#9be3b4"
              />
              <text x="220" y="248" textAnchor="middle" fill="#10502c">
                직접 개발
              </text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
