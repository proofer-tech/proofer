import React from "react";
import InquireButton from "../InquireButton";

export default function Contact() {
  return (
    <section className="page snap" id="contact" data-sec="문의">
      <span className="orb o1" />
      <span className="orb o2" />
      <span className="orb o3" />
      <div className="wrap final-wrap reveal">
        <h2>프루퍼와 이야기 나눠 보세요</h2>
        <p>
          컨설팅, 업무 상담, 외주 문의, 제휴까지. 무엇이든 편하게 말씀해 주세요.
        </p>
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
        <div className="final-echo">비즈니스에 기술을 더하다</div>
      </div>
    </section>
  );
}
