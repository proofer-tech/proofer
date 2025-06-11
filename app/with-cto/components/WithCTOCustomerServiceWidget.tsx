"use client";
import CustomerServiceWidget from "@/app/components/CustomerServiceWidget";
import { Affix, Anchor, Button, CopyButton, Stack, Text } from "@mantine/core";
import React from "react";
import { useIsChannelIOLoaded } from "@/src/hooks/channel";
import { useChannelIOApi } from "react-channel-plugin";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";

interface WithCTOCustomerServiceWidgetProps {
  withJoinBtn?: boolean;
}
export default function WithCTOCustomerServiceWidget({
  withJoinBtn = true,
}: WithCTOCustomerServiceWidgetProps) {
  const isMobileMedia = useIsMobileMedia();
  const isChannelIOLoaded = useIsChannelIOLoaded();
  const { showMessenger } = useChannelIOApi();

  return (
    <>
      <CustomerServiceWidget
        position={{
          bottom: isMobileMedia ? 92 : 60,
          right: isMobileMedia ? 25 : 98,
        }}
        buttons={[
          withJoinBtn ? (
            <Anchor
              key={"join"}
              href={
                "https://event-us.kr/withcto/event/106074/applicant?utm_source=proofer&utm_medium=organic"
              }
            >
              <Button
                w={"80px"}
                h={"80px"}
                color={"var(--color-primary)"}
                radius={100}
                fw={600}
                fz={"md"}
              >
                참여
                <br />
                하기
              </Button>
            </Anchor>
          ) : (
            <></>
          ),
          <CopyButton key={"share"} value="https://with-cto.proofer.tech">
            {({ copied, copy }) => (
              <Button
                w={"80px"}
                h={"80px"}
                color={!copied ? "black" : "grey"}
                radius={100}
                fw={600}
                fz={"md"}
                onClick={copy}
              >
                {!copied ? (
                  <>
                    링크
                    <br />
                    공유
                  </>
                ) : (
                  <>
                    복사
                    <br />
                    완료
                  </>
                )}
              </Button>
            )}
          </CopyButton>,
          <Button
            key={"contact"}
            w={"80px"}
            h={"80px"}
            color={"black"}
            radius={100}
            fw={600}
            fz={"md"}
            onClick={() => (isChannelIOLoaded ? showMessenger() : null)}
          >
            문의
            <br />
            하기
          </Button>,
        ]}
        guidelines={[
          <Text key={"title"} fw={"bold"}>
            행사에 대해 궁금하신게 있나요?
          </Text>,
          <Text key={"content"}>몇 분 내 답변을 드릴게요</Text>,
        ]}
        onMobileClick={() => (isChannelIOLoaded ? showMessenger() : null)}
      />
      {withJoinBtn ? (
        <Affix position={{ left: 0, bottom: 0 }} w={"100%"} hiddenFrom={"sm"}>
          <Anchor
            key={"join"}
            href={
              "https://with-cto.proofer.tech/join?utm_source=proofer&utm_medium=landing&utm_campaign=cta&utm_content=join"
            }
          >
            <Button color={"black"} w={"100%"} h={"80px"} radius={0}>
              <Stack gap={0}>
                <Text fz={"lg"} fw={"bold"}>
                  with CTO: 참여하기
                </Text>
                <Text fz={"md"}>함께할 마음만 들고오세요</Text>
              </Stack>
            </Button>
          </Anchor>
        </Affix>
      ) : (
        <></>
      )}
    </>
  );
}
