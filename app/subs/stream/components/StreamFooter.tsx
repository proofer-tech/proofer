import { Container, Box, Text } from "@mantine/core";
import styles from "./StreamFooter.module.scss";

export default function StreamFooter() {
  return (
    <footer className={styles.footer}>
      <Container size="lg">
        <Box className={styles.footerBottom}>
          <Text size="sm" c="dimmed">
            © 2026 Stream by Proofer Inc. All rights reserved.
          </Text>
        </Box>
      </Container>
    </footer>
  );
}
