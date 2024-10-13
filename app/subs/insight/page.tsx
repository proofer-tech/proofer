import React from "react";
import Background from "@/app/components/Background";
import {
  Container,
  Divider,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { InquireWidget } from "../../components/Inquire";
import ServiceVideo from "@/app/subs/insight/components/ServiceVideo";
import { Done, Down } from "@/app/components/Divider";
import Hero from "@/app/subs/insight/components/Hero";

export default function Page() {
  return (
    <>
      <Background />
      <Hero />
      <Container>
        <ServiceVideo />
        <Space py={"xl"}>
          <Down />
        </Space>
        <Space h={"xl"} />
        <Stack>
          <Stack gap={0}>
            <Text c={"var(--mantine-color-gray-8)"} fw={400} size={"lg"}>
              개발 없이도 구축할 수 있습니다.
            </Text>
            <Title order={3}>우리에게 꼭 맞는 대시보드</Title>
          </Stack>
          <Text size={"md"} maw={"60em"}>
            비즈니스의 목표 지표를 정의하여 산식을 작성하고 나면 개발자를 통해
            코드를 수정할 필요 없이 프루퍼 인사이트에서 클릭 몇 번 하는
            것만으로도 수정이 가능하며 수정 즉시 공유되어있는 대시보드들에
            자동으로 반영됩니다.
          </Text>
        </Stack>
        <Space h={"4em"} />
        <Stack>
          <Stack gap={0}>
            <Text c={"var(--mantine-color-gray-8)"} fw={400} size={"lg"}>
              비즈니스에만 집중할 수 있습니다.
            </Text>
            <Title order={3}>최소화된 유지보수 리소스</Title>
          </Stack>
          <Text size={"md"} maw={"60em"}>
            기존에는 입맛에 맞추려면 개발자들을 통해 큰 유지보수 비용을 지불
            해야만 했던 대시보드 제작 난이도를 낮추고 속도는 높여 필요한 시점에
            필요한 팀에게 업무 데이터 가시성을 제공할 수 있게 됩니다.
          </Text>
        </Stack>
        <Space py={"xl"}>
          <Space h={"xl"} />
          <Done />
          <Space h={"xl"} />
        </Space>
        <Stack>
          <Stack gap={"xs"} align={"center"}>
            <Title order={4} ta={"center"} c={"var(--mantine-color-gray-7)"}>
              데이터 기반 의사결정의 시작
            </Title>
            <Group pt={"sm"} pb={"md"} justify={"center"}>
              <Divider w={"5em"} />
            </Group>
            <Text ta={"center"}>
              이제 여러분들은 곧 프루퍼 인사이트와 함께 개발자들의 생산성을
              측정하고 더욱 성장시킬 수 있습니다.
              <br />
              업무 데이터의 적시성과 가시성을 확보하여 비즈니스의 속도와 성공
              가능성을 끌어올려보세요.
            </Text>
          </Stack>
          <InquireWidget btnText={"무료상담 신청"}>
            <Text size={"sm"} c={"var(--color-white)"}>
              상담을 통한 온보딩과 함께
            </Text>
            <Text size={"lg"} fw={700} c={"var(--color-white)"}>
              무료로 체험해보기
            </Text>
          </InquireWidget>
        </Stack>
      </Container>
      <Space h={"10vh"} />
    </>
  );
}
