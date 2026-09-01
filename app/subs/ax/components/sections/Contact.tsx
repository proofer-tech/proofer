import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <div className="ax-eyebrow">PROOF OF VALUE</div>
        <h2 className={styles.headline}>
          AI 교육을 성과로 연결할
          <br />
          준비가 되셨다면.
        </h2>
        <p className={styles.desc}>
          강의 · 해커톤 · 컨설팅. 어느 지점부터 시작할지 함께 정해봅시다.
        </p>
        <div className={styles.actions}>
          <AxInquireButton className="ax-btn ax-btn--lg">
            도입 문의하기
          </AxInquireButton>
          <a
            href="https://proofer.tech"
            className="ax-btn ax-btn--ghost ax-btn--lg"
          >
            프루퍼 소개
          </a>
        </div>
      </div>
    </section>
  );
}
