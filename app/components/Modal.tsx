import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Image,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";

interface InquireCompletedModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
}

export function InquireCompletedModal({
  isOpened,
  onCloseClick,
}: InquireCompletedModalProps) {
  return (
    <Modal
      opened={isOpened}
      onClose={onCloseClick}
      centered
      title={
        <Group>
          <Box w={"1em"} h={"1em"}>
            <Image
              src="/images/branding.svg"
              alt="프루퍼 로고"
              width={"100%"}
            />
          </Box>
          <Text fz={"1.3em"} fw={700}>
            상담신청이 완료되었습니다.
          </Text>
        </Group>
      }
    >
      <Text>
        입력해주신 연락처로 업무일 기준 2일내에 최대한 빠르게 연락드리겠습니다!
      </Text>
    </Modal>
  );
}

interface NotReadyYetModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
}

export function NotReadyYetModal({
  isOpened,
  onCloseClick,
}: NotReadyYetModalProps) {
  return (
    <Modal
      opened={isOpened}
      onClose={onCloseClick}
      centered
      title={
        <Group>
          <Box w={"1em"} h={"1em"}>
            <Image
              src="/images/branding.svg"
              alt="프루퍼 로고"
              width={"100%"}
            />
          </Box>
          <Text fz={"1.3em"} fw={700}>
            아직 준비중인 기능이에요.
          </Text>
        </Group>
      }
    >
      <Stack gap={"1em"} py={"1em"}>
        <Text c={"var(--color-darkgray)"}>
          프루퍼팀은 사용자 여러분께 더 나은 경험을 제공하기 위해 최선을 다하고
          있어요.
        </Text>
        <Text c={"var(--color-darkgray)"}>
          조금만 기다려주시면, 곧 여러분의 기대를 충족시킬 수 있는 새롭고
          흥미로운 기능을 선보일 예정입니다.
        </Text>
        <Text c={"var(--color-darkgray)"}>
          곧 멋진 소식으로 다시 찾아뵙겠습니다!
        </Text>
        <Group justify={"end"} align={"center"}>
          <Image src="/images/logo.svg" h={"1.5em"} alt={"프루퍼 로고"} />
          <Text>드림</Text>
        </Group>
      </Stack>
      <Divider />
      <Stack align={"end"} pt={"1em"}>
        <Text size={"xs"} ta={"right"}>
          새로운 소식과 유용한 기술 아티클을 제일 먼저 받아보세요.
        </Text>
        <Anchor href={"https://proofer.tech/subscribe"} target={"_blank"}>
          <Button>뉴스레터 구독하기</Button>
        </Anchor>
      </Stack>
    </Modal>
  );
}
