import Background from "@/app/components/Background";
import React from "react";
import { Box, Divider, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import ResponsiveFlexChild from "@/app/with-cto/components/ResponsiveFlexChild";
import CopyWithCTOButton from "@/app/with-cto/components/CopyWithCTOButton";

export default function Page() {
  return (
    <>
      <Background />
      <ResponsiveFlexChild
        desktopSize={"1200px"}
        tabletSize={"100%"}
        mobileSize={"100%"}
      >
        <Group justify={"center"} align={"start"} w={"100%"} py={"xl"}>
          <ResponsiveFlexChild
            desktopSize={"512px"}
            tabletSize={"320px"}
            mobileSize={"100%"}
            mb={"xl"}
          >
            <Stack align={"end"} w={"100%"} px={"xl"}>
              <Group
                wrap={"nowrap"}
                w={"100%"}
                justify={"start"}
                align={"center"}
                mb={"-20px"}
              >
                <Image
                  src={"/assets/images/with-cto/logo.svg"}
                  width={80}
                  height={80}
                  alt={"with CTO: 로고"}
                />
                <Divider
                  w={"100%"}
                  color={"var(--color-primary)"}
                  size={"2px"}
                />
              </Group>
              <Title order={1} ta={"right"} size={"1.8em"}>
                CTO들의 위대한 시작
                <br />
                with CTO: the agora of CTO
              </Title>
              <Box>
                <Text>
                  DEVIEW, if KAKAO, SLASH 등 현업 개발자들을 타겟팅한 컨퍼런스,
                  커뮤니티는 많습니다.
                </Text>
                <br />
                <Text>
                  하지만 조직 내에서 CTO 역할을 맡게 된 분들을 위한 컨퍼런스나
                  모임은 굉장히 찾기 힘든 것 같습니다(기술적인 의사결정,
                  인사적인 고민들도 매번 어렵다고요!)
                </Text>
                <br />
                <Text>
                  회사의 CTO로서 여러분들이 겪고 있는 고민과 도전, 그리고 그
                  사례들을 서로 나눌 수 있는 자리를 프루퍼팀의 CTO도 찾다 찾다가
                  없어서, 안되겠다 우리가 만들어야겠다! 싶어 자리를 만들어보려고
                  합니다.
                </Text>
                <br />
                <Text>
                  이번 자리가 바쁜 CTO 여러분들에게 시간이 아깝지 않은 유익한
                  자리가 되기를 바라며, 한번의 이벤트로 끝날 게 아니라 앞으로도
                  계속 이어져 함께 성장을 도모할 수 있는 자리가 될 수 있도록
                  꾸준히 함께하겠습니다!
                </Text>
              </Box>
              <CopyWithCTOButton />
            </Stack>
          </ResponsiveFlexChild>
          <ResponsiveFlexChild
            desktopSize={"600px"}
            tabletSize={"400px"}
            mobileSize={"100%"}
          >
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScLVdSIVNUm8I8RIhevh0rvg80lKYxqTitC3BNFiLv9LDyKvw/viewform?embedded=true"
              style={{
                width: "100%",
                height: "3000px",
                border: 0,
              }}
            >
              로드 중…
            </iframe>
          </ResponsiveFlexChild>
        </Group>
      </ResponsiveFlexChild>
    </>
  );
}
