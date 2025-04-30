import { Box, Button, Group, Image, Modal, Stack, Text } from "@mantine/core";
import React from "react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";
import { useChannelIOApi } from "react-channel-plugin";

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
              src="/assets/images/branding.svg"
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
              src="/assets/images/branding.svg"
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
      <NotReadyYetLetter from={false} c={"var(--color-darkgray)"} />
    </Modal>
  );
}

interface ServiceEndedModalProps {
  isOpened: boolean;
  onCloseClick: () => void;
}

export function ServiceEndedModal({
  isOpened,
  onCloseClick,
}: ServiceEndedModalProps) {
  const { showMessenger } = useChannelIOApi();
  return (
    <Modal
      opened={isOpened}
      onClose={onCloseClick}
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
      title={
        <Group>
          <Box w={"1em"} h={"1em"}>
            <Image
              src="/assets/images/branding.svg"
              alt="프루퍼 로고"
              width={"100%"}
            />
          </Box>
          <Text fz={"1.3em"} fw={700}>
            서비스가 종료되었습니다.
          </Text>
        </Group>
      }
    >
      <Stack>
        <Text>
          관심 보내주셔서 감사합니다. 서비스의 히스토리를 포함한 문의는 아래
          문의하기를 통해 부탁드리겠습니다.
        </Text>
        <Button onClick={() => showMessenger()}>문의하기</Button>
      </Stack>
    </Modal>
  );
}
