import React from "react";
import AxInquireButton from "@/app/subs/ax/components/AxInquireButton";
import Enter from "@/app/subs/ax/components/Enter";
import Lines from "@/app/subs/ax/components/Lines";
import type { Contact as ContactContent } from "@/app/subs/ax/content/types";
import styles from "./Contact.module.scss";

export default function Contact({ contact }: { contact: ContactContent }) {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.content}>
        <Enter index={0}>
          <div className="ax-eyebrow">PROOF OF VALUE</div>
        </Enter>
        <Enter index={1}>
          <h2 className={styles.headline}>
            <Lines lines={contact.headline} />
          </h2>
        </Enter>
        <Enter index={2}>
          <p className={styles.desc}>{contact.desc}</p>
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
