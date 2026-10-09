import { InquireWidget } from "@/app/components/Inquire";
import styles from "./ContactSection.module.scss";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className="mx-auto w-full max-w-[1184px] px-4">
        <div className="flex flex-col gap-4">
          <div className={styles.contactFormWrapper}>
            <InquireWidget btnText={"문의하기"}>
              <p className="text-sm text-[var(--color-white)]">
                무료 데모 신청 · 가격 및 요금제 · 도입 상담 · 기능·연동 문의
              </p>
              <p className="text-lg font-bold text-[var(--color-white)]">
                문의하기
              </p>
            </InquireWidget>
          </div>
        </div>
      </div>
    </section>
  );
}
