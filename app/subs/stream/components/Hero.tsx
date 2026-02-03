"use client";
import { Box, Container, Group, rem, Text, Title, Anchor } from "@mantine/core";
import { useIsDesktopMedia, useIsTabletMedia } from "@/src/hooks/mediaQuery";
import Link from "next/link";
import styles from "./Hero.module.scss";

const STATS = [
  { number: "1,000+", label: "기업 인재 DB 관리" },
  { number: "99.9%", label: "데이터 정확도" },
  { number: "24/7", label: "자동 업데이트" },
];

export default function Hero() {
  const isDesktop = useIsDesktopMedia();
  const isTablet = useIsTabletMedia();
  const titleSize = isDesktop ? rem(64) : isTablet ? rem(48) : rem(36);

  return (
    <section className={styles.hero}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        poster="/assets/images/stream/banner.png"
        aria-hidden
      >
        <source src="/assets/images/stream/background.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} role="presentation" />
      <Container size="lg" className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeIcon}>✨</span>
            <span>인재 데이터 관리의 새로운 표준</span>
          </div>
          <Title
            order={1}
            className={styles.heroTitle}
            style={{ fontSize: titleSize }}
          >
            인재 데이터가{" "}
            <span className={styles.gradientText}>끊임없이 흐르는</span>
            <br />
            조직 내 인재 허브
          </Title>
          <Text className={styles.heroDescription}>
            외부 인재 데이터와 사내 인재 정보를 연결·통합하여
            <br />
            HR·TA 조직의 인재 관리를 혁신하는 B2B SaaS 플랫폼
          </Text>
          <Text className={styles.heroNotice}>
            - (공개예정) 일부 기업 대상 테스트 중 -
          </Text>
          <Group
            className={styles.heroCta}
            justify="center"
            gap="md"
            wrap="wrap"
          >
            <Link href="#features" style={{ textDecoration: "none" }}>
              <Anchor component="span" className={styles.btnSecondary}>
                자세히 알아보기
              </Anchor>
            </Link>
          </Group>
          <Group className={styles.heroStats} justify="center" gap="xl">
            {STATS.map((item) => (
              <Box key={item.label} className={styles.statItem}>
                <Text className={styles.statNumber}>{item.number}</Text>
                <Text className={styles.statLabel}>{item.label}</Text>
              </Box>
            ))}
          </Group>
        </div>
      </Container>
    </section>
  );
}
