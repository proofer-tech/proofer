import {
  Anchor,
  Box,
  BoxProps,
  Button,
  Divider,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import React from "react";

interface NotReadyYetLetterProps extends BoxProps {
  title?: string;
  children?: React.ReactNode;
  from?: boolean;
}
export default function NotReadyYetLetter({
  title,
  children,
  from,
  ...props
}: NotReadyYetLetterProps) {
  return (
    <Box {...props}>
      {title && (
        <Text fz={"1.3em"} fw={700}>
          {title}
        </Text>
      )}
      <Stack gap={"1em"} py={"1em"}>
        <Text>
          프루퍼팀은 사용자 여러분께 더 나은 경험을 제공하기 위해 최선을 다하고
          있어요.
        </Text>
        <Text>
          조금만 기다려주시면, 곧 여러분의 기대를 충족시킬 수 있는 새롭고
          흥미로운 기능을 선보일 예정입니다.
        </Text>
        {children}
        <Text>곧 멋진 소식으로 다시 찾아뵙겠습니다!</Text>
        {from ? (
          <Group justify={"end"} align={"center"}>
            <Image
              src="/assets/images/logo.svg"
              h={"1.5em"}
              alt={"프루퍼 로고"}
            />
            <Text>드림</Text>
          </Group>
        ) : (
          ""
        )}
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
    </Box>
  );
}
