import React from "react";

export default function Consulting() {
  return (
    <section className="page snap" id="consulting" data-sec="컨설팅">
      <div className="wrap consult-grid">
        <div className="reveal">
          <div className="eyebrow">CONSULTING</div>
          <h2
            style={{
              fontSize: "clamp(25px,3.4vw,38px)",
              lineHeight: 1.15,
              margin: "8px 0 14px",
            }}
          >
            겹겹이 쌓아 올리는
            <br />
            프루퍼의 컨설팅
          </h2>
          <p className="muted">
            진단에서 시작해 개발, 비즈니스·조직 설계까지. 필요한 단계만큼 위로
            쌓아 올립니다. 카드를 확인해 보세요.
          </p>
        </div>
        <div className="stack">
          <div className="layer l3">
            <div className="lh">
              <div className="lh-title">
                <span className="num">03</span>
                <h3>진단 &amp; 전환 (DX·AX)</h3>
              </div>
              <span className="tagr">DX·AX 컨설팅</span>
            </div>
            <div className="desc">
              <div className="desc-block">
                <span className="dlabel">DX</span>
                <p>
                  현장을 직접 보고 무엇을 바꿀지 진단합니다. 프로세스 재설계와
                  디지털화부터 시작합니다.
                </p>
              </div>
              <div className="desc-block">
                <span className="dlabel">AX</span>
                <p>
                  시간이 없어 AI를 못 배우고, 사람마다 적응 속도가 다른 문제까지
                  함께 풀며, 도구보다 일하는 방식과 사람을 먼저 바꿉니다.
                </p>
              </div>
            </div>
          </div>
          <div className="layer l2">
            <div className="lh">
              <div className="lh-title">
                <span className="num">02</span>
                <h3>개발 &amp; 구축</h3>
              </div>
              <span className="tagr">시스템 통합</span>
            </div>
            <div className="desc">
              <div className="desc-block">
                <span className="dlabel">구현</span>
                <p>
                  진단에서 멈추지 않습니다. 기획부터 앱, 서버, AI까지 한 팀으로
                  직접 만들어 드립니다.
                </p>
              </div>
              <div className="desc-block">
                <span className="dlabel">검증·자문</span>
                <p>
                  작게 만들어 빠르게 검증하고, 필요하면 기술 자문으로 내부
                  판단도 함께 돕습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="layer l1 open">
            <div className="lh">
              <div className="lh-title">
                <span className="num">01</span>
                <h3>비즈니스 &amp; 조직</h3>
              </div>
              <span className="tagr">비즈니스·조직 컨설팅</span>
            </div>
            <div className="desc">
              <div className="desc-block">
                <span className="dlabel">사업 구조</span>
                <p>
                  사업 구조와 수익 구조를 함께 진단합니다. 운영을 시스템화해
                  마진과 기업가치를 끌어올립니다.
                </p>
              </div>
              <div className="desc-block">
                <span className="dlabel">채용·육성</span>
                <p>
                  직접 채용이 맞는지, 외주로 레버리지하는 게 맞는지 함께 봅니다.
                  조직을 어떻게 꾸리고 키울지 설계합니다.
                </p>
              </div>
              <div className="desc-block">
                <span className="dlabel">역할 재설계</span>
                <p>
                  사업과 일하는 방식이 달라지며 바뀌는 역할과 책임을 어떻게
                  재설계할지까지 함께 봅니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
