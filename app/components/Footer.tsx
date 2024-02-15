import { Text, Container, Group, Stack, Image, Anchor } from "@mantine/core";
import React from "react";
import { IconPhoneCall } from "@tabler/icons-react";

export default function Footer() {
  return (
    <Container py={"3em"}>
      <Group>
        <Stack gap={"3em"}>
          <Image radius="md" src="/images/logo.svg" w={"8em"} />
          <Stack gap={1}>
            <Text c={"var(--color-darkgray-2)"}>
              경기도 광명시 오리로 362, 4층
            </Text>
            <Text c={"var(--color-darkgray-2)"}>
              사업자등록번호: 327-87-02020
            </Text>
            <Text c={"var(--color-darkgray-2)"}>
              개인정보관리책임자: 홍제형(info@campersground.kr)
            </Text>
          </Stack>
          <Group>
            <IconPhoneCall color="var(--color-darkgray-2)" size={"1em"} />
            <Anchor href="tel:031-623-0193" target="_blank" underline="never">
              <Text c={"var(--color-darkgray-2)"}>031-623-0193</Text>
            </Anchor>
          </Group>
        </Stack>
        <Stack></Stack>
        <Stack></Stack>
        <Stack></Stack>
      </Group>
    </Container>
  );
}
