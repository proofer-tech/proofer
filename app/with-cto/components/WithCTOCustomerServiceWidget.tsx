"use client";
import CustomerServiceWidget from "@/app/components/CustomerServiceWidget";
import { Anchor, Button, CopyButton, Text } from "@mantine/core";
import React from "react";
import { useIsChannelIOLoaded } from "@/src/hooks/channel";
import { useChannelIOApi } from "react-channel-plugin";

export default function WithCTOCustomerServiceWidget() {
  const isChannelIOLoaded = useIsChannelIOLoaded();
  const { showMessenger } = useChannelIOApi();

  return (
    <CustomerServiceWidget
      buttons={[
        <Anchor
          key={"join"}
          href={
            "https://proofer.tech/with-cto/join?utm_source=proofer&utm_medium=landing&utm_campaign=cta&utm_content=join"
          }
        >
          <Button
            w={"80px"}
            h={"80px"}
            color={"var(--color-primary)"}
            radius={100}
            fw={"semi-bold"}
            fz={"md"}
          >
            참여
            <br />
            하기
          </Button>
        </Anchor>,
        <CopyButton
          key={"share"}
          value="https://proofer.tech/with-cto/join?utm_source=proofer&utm_medium=landing&utm_campaign=cta&utm_content=share"
        >
          {({ copied, copy }) => (
            <Button
              w={"80px"}
              h={"80px"}
              color={!copied ? "black" : "grey"}
              radius={100}
              fw={"semi-bold"}
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
          fw={"semi-bold"}
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
          프루퍼에 궁금하신게 있나요?
        </Text>,
        <Text key={"content"}>몇 분 내 답변을 드릴게요</Text>,
      ]}
    />
  );
}
