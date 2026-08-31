import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";

export default function Contact() {
  return (
    <section className="page snap" id="contact" data-sec="상담">
      <div className="wrap">
        <div className="section-head">
          <h2>무료 AX 상담</h2>
        </div>
        <AxInquireButton className="btn btn-primary">
          무료 AX 상담
        </AxInquireButton>
      </div>
    </section>
  );
}
