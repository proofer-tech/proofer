import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Enter from "@/app/subs/ax/components/Enter";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <Enter index={0}>
          <div className="ax-eyebrow">PROOF OF VALUE</div>
        </Enter>
        <Enter index={1}>
          <h2 className={styles.headline}>
            AI 교육을 성과로 연결할
            <br />
            준비가 되셨다면.
          </h2>
        </Enter>
        <Enter index={2}>
          <p className={styles.desc}>
            강의 · 해커톤 · 컨설팅. 어느 지점부터 시작할지 함께 정해봅시다.
          </p>
        </Enter>
        <div className={styles.actions}>
          <Enter index={3}>
            <AxInquireButton
              className={`ax-btn ${styles.btnLg} ${styles.btnPrimary}`}
            >
              도입 문의하기
            </AxInquireButton>
          </Enter>
          <Enter index={4}>
            <a
              href="https://proofer.tech"
              className={`ax-btn ax-btn--ghost ${styles.btnLg}`}
            >
              프루퍼 소개
            </a>
          </Enter>
        </div>
      </div>
    </section>
  );
}
