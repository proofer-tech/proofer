import Image from "next/image";
import styles from "./CTASection.module.scss";

export default function CTASection() {
  return (
    <section id="demo" className={styles.ctaSection}>
      <div className="mx-auto w-full max-w-[1184px] px-4">
        <div className={styles.ctaContent}>
          <div className={styles.ctaIcon}>
            <Image
              src="/assets/images/stream/logo-icon.png"
              alt="Stream"
              width={60}
              height={60}
            />
          </div>
          <h2 className={styles.ctaTitle}>지금 바로 Stream을 시작하세요</h2>
          <p className={styles.ctaDescription}>
            무료 데모를 신청하고, 인재 데이터 관리의 새로운 경험을 느껴보세요.
            <br />
            전문 컨설턴트가 귀사의 상황에 맞는 최적의 솔루션을 제안해드립니다.
          </p>
          <div
            className={`${styles.ctaFeatures} flex flex-wrap items-center justify-center gap-8`}
          >
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>신용카드 불필요</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>14일 무료 체험</span>
            </div>
            <div className={styles.ctaFeature}>
              <span className={styles.ctaFeatureIcon}>✓</span>
              <span>온보딩 지원</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
