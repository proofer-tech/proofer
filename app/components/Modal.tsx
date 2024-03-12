import { Box, Group, Image, Modal, Text } from "@mantine/core";
import React from "react";
import NotReadyYetLetter from "@/app/components/NotReadyYetLetter";

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
