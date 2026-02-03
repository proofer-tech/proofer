import { Container, Box, Text, Stack } from "@mantine/core";
import { InquireWidget } from "@/app/components/Inquire";
import styles from "./ContactSection.module.scss";

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <Container size="lg">
        <Stack>
          <Box className={styles.contactFormWrapper}>
            <InquireWidget btnText={"문의하기"}>
              <Text size={"sm"} c={"var(--color-white)"}>
                무료 데모 신청 · 가격 및 요금제 · 도입 상담 · 기능·연동 문의
              </Text>
              <Text size={"lg"} fw={700} c={"var(--color-white)"}>
                문의하기
              </Text>
            </InquireWidget>
          </Box>
        </Stack>
      </Container>
    </section>
  );
}
