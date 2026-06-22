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
            진단에서 시작해 개발, 조직 설계까지. 필요한 단계만큼 위로 쌓아
            올립니다. 카드를 확인해 보세요.
          </p>
        </div>
        <div className="stack">
          <div className="layer l3">
            <div className="lh">
              <span className="num">03</span>
              <h3>조직 &amp; 팀 설계</h3>
              <span className="tagr">조직을 키우는 팀</span>
            </div>
            <div className="desc">
              직접 채용이 맞는지, 외주로 레버리지하는 게 맞는지 함께 봅니다.
              개발팀을 어떻게 꾸리고 키울지까지 설계합니다.
            </div>
          </div>
          <div className="layer l2">
            <div className="lh">
              <span className="num">02</span>
              <h3>개발 &amp; 구축</h3>
              <span className="tagr">만들 사람이 필요한 팀</span>
            </div>
            <div className="desc">
              진단에서 멈추지 않습니다. 기획부터 앱, 서버, AI까지 직접 만들어
              드립니다. 기술 자문도 함께합니다.
            </div>
          </div>
          <div className="layer l1 open">
            <div className="lh">
              <span className="num">01</span>
              <h3>진단 &amp; 전환 (DX·AX)</h3>
              <span className="tagr">막막한 팀</span>
            </div>
            <div className="desc">
              현장을 직접 보고 무엇을 바꿀지 진단합니다. 프로세스 재설계부터
              디지털화, AI 자동화까지 함께 끌고 갑니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
