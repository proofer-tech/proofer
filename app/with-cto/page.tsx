import Background from "@/app/components/Background";
import React from "react";
import {
  Container,
  Text,
  Stack,
  Code,
  Group,
  AspectRatio,
  Button,
  Space,
  NavLink,
  Title,
} from "@mantine/core";
import Image from "next/image";
import CopyWithCTOButton from "@/app/with-cto/CopyWithCTOButton";
import { Done, Down } from "../components/Divider";

export default function Page() {
  return (
    <>
      <Background />
      <Container h={"calc(100vh - var(--app-shell-header-height))"}>
        <Stack h={"100%"} justify={"space-between"}>
          <Stack gap={0} justify={"center"} h={"100%"}>
            <Stack gap={0} mb={"md"}>
              <Text size={"md"} c={"var(--mantine-color-gray-8)"}>
                CTO들의 위대한 시작, 그 첫번째 모임
              </Text>
              <Group align={"center"} p={0}>
                <Image
                  src={"/assets/images/with-cto/logo.png"}
                  width={512}
                  height={512}
                  alt={"with CTO:"}
                  style={{
                    maxWidth: "40vw",
                    maxHeight: "50vh",
                    width: "auto",
                    height: "auto",
                  }}
                />
                <Text c={"var(--mantine-color-gray-5)"} size={"xl"}>
                  1st meet
                </Text>
              </Group>
              <Text>
                on <Code>2024.06.07 19:30</Code> at{" "}
                <Code>Google Startup Campus</Code>
              </Text>
            </Stack>
            <Group>
              <Button size={"lg"} component="a" href="https://bit.ly/with-cto">
                참여등록 하러가기
              </Button>
              <CopyWithCTOButton size={"lg"} />
            </Group>
          </Stack>
          <Space pb={"md"}>
            <Down />
          </Space>
        </Stack>
      </Container>
      <Container>
        <Stack h={"100%"} justify={"space-between"}>
          <Group wrap={"nowrap"} py={"xl"}>
            <AspectRatio ratio={16 / 9} w={"30vw"} miw={"160px"}>
              <Image
                src={"/assets/images/with-cto/page1.webp"}
                fill
                alt={"첨부 이미지 1"}
              />
            </AspectRatio>
            <Text>
              DEVIEW, if KAKAO, SLASH 등 현업 개발자들을 타겟팅한 컨퍼런스,
              커뮤니티는 많습니다.
            </Text>
          </Group>
          <Group wrap={"nowrap"} py={"xl"}>
            <Text>
              하지만 조직 내에서 CTO 역할을 맡게 된 분들을 위한 컨퍼런스나
              모임은 굉장히 찾기 힘든 것 같습니다(기술적인 의사결정, 인사적인
              고민들도 매번 어렵다고요!)
            </Text>
            <AspectRatio ratio={16 / 9} w={"50vw"} miw={"160px"}>
              <Image
                src={"/assets/images/with-cto/page2.webp"}
                alt={"첨부 이미지 2"}
                fill
              />
            </AspectRatio>
          </Group>
          <Group wrap={"nowrap"} py={"xl"}>
            <AspectRatio ratio={16 / 9} w={"50vw"} miw={"160px"}>
              <Image
                src={"/assets/images/with-cto/page3.webp"}
                fill
                alt={"첨부 이미지 3"}
              />
            </AspectRatio>
            <Text>
              회사의 CTO로서 여러분들이 겪고 있는 고민과 도전, 그리고 그
              사례들을 서로 나눌 수 있는 자리를 프루퍼팀의 CTO도 찾다 찾다가
              없어서, 안되겠다 우리가 만들어야겠다! 싶어 자리를 만들어보려고
              합니다.
            </Text>
          </Group>
        </Stack>
      </Container>
      <Space py={"4em"} id={"timetable"}>
        <Done />
      </Space>
      <Container>
        <Stack justify={"center"} h={"100%"}>
          <Title order={1}>타임테이블</Title>
          <Space h={"1em"} />
          <>
            <NavLink
              active
              href="#"
              label="사전 네트워킹"
              leftSection={<Code>19:30 ~ 20:00</Code>}
            />
            <NavLink
              active
              href="#"
              label="러닝쉐어(연사강연) - 지속 성장하는 조직 만들기"
              leftSection={<Code>20:00 ~ 20:30</Code>}
            />
            <NavLink
              active
              href="#"
              label="쉬는시간"
              leftSection={<Code>20:30 ~ 20:40</Code>}
            />
            <NavLink
              active
              href="#"
              label="러닝쉐어 - 개발자 성과평가에 대한 해외의 다양한 연구와 사례분석"
              leftSection={<Code>20:40 ~ 21:00</Code>}
            />
            <NavLink
              active
              href="#"
              label="케이터링 & 네트워킹"
              leftSection={<Code>21:00 ~ 22:00</Code>}
            />
          </>
          <Text>
            네트워킹 시간에 즐기실 수 있도록 케이터링과 위스키가 제공될
            예정입니다.
          </Text>
          <Text fw={700}>
            참여비는 없습니다! CTO님 혼자서 외롭게 고민하던 내용과 이제부턴
            함께할 마음만 들고오시면 됩니다!!
          </Text>
          <Text>
            이번 자리가 바쁜 CTO 여러분들에게 시간이 아깝지 않은 유익한 자리가
            되기를 바라며, 한번의 이벤트로 끝날 게 아니라 앞으로도 계속 이어져
            함께 성장을 도모할 수 있는 자리가 될 수 있도록 꾸준히
            함께하겠습니다!
          </Text>
          <Space h={"1em"} />
          <Text>
            그럼 2024년 6월 7일 수요일 저녁 7시 30분 구글 스타트업 캠퍼스에서
            만나요!
          </Text>
          <Group py={"xl"}>
            <Button size={"lg"} component="a" href="https://bit.ly/with-cto">
              참여등록 하러가기
            </Button>
            <CopyWithCTOButton size={"lg"} />
          </Group>
        </Stack>
      </Container>
    </>
  );
}
