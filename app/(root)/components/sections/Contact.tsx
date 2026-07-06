import React from "react";
import InquireButton from "../InquireButton";

export default function Contact() {
  return (
    <section className="page snap" id="contact" data-sec="문의">
      <span className="orb o1" />
      <span className="orb o2" />
      <span className="orb o3" />
      <div className="wrap final-wrap reveal">
        <h2>
          기업가치를 증명할
          <br />
          준비가 되셨다면.
        </h2>
        <p>컨설팅 · 밸류업 · 외주 · 제휴. 무엇이든 편하게 말씀해 주세요.</p>
        <div id="finalCTA">
          <InquireButton className="btn cta-big">
            무료상담 신청{" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </InquireButton>
        </div>
        <div className="final-echo">PROOF OF VALUE</div>
      </div>
    </section>
  );
}
