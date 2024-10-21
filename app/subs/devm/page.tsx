import React from "react";
import Background from "@/app/components/Background";
import {
  Blockquote,
  Container,
  Divider,
  Group,
  List,
  ListItem,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { InquireWidget } from "../../components/Inquire";
import { Done, Down } from "@/app/components/Divider";
import Hero from "@/app/subs/devm/components/Hero";

export default function Page() {
  return (
    <>
      <Background />
      <Hero />
      <Container>
        <Space py={"xl"}>
          <Down />
        </Space>
        <Space h={"xl"} />
        <Stack>
          <Stack gap={0}>
            <Text c={"var(--mantine-color-gray-8)"} fw={400} size={"lg"}>
              개발자 관리에 대하여 ...
            </Text>
            <Title order={3}>일단 개발자는 채용했는데</Title>
          </Stack>
          <Blockquote color="green" p={"xl"}>
            <List spacing={"xs"} size={"md"}>
              <ListItem>
                개발자의 프로젝트 완수속도나 완성도가 마음에 들지 않나요?
              </ListItem>
              <ListItem>개발자의 적정연봉을 설정하기 어렵지 않나요?</ListItem>
              <ListItem>
                우리 개발자가 알아서 잘 성장했으면 싶기도 하죠.
              </ListItem>
            </List>
          </Blockquote>
        </Stack>
        <Space h={"4em"} />
        <Stack>
          <Stack gap={0}>
            <Text c={"var(--mantine-color-gray-8)"} fw={400} size={"lg"}>
              비즈니스에 대하여 ...
            </Text>
            <Title order={3}>지속적인 비즈니스 측면에서</Title>
          </Stack>
          <Blockquote color="green" p={"xl"}>
            <List spacing={"xs"} size={"md"}>
              <ListItem>
                앞으로의 비즈니스 로드맵에 기술적인 시야가 필요하신가요?
              </ListItem>
              <ListItem>
                앞으로 개발팀을 어떻게 구성해야 할 지도 고민이 많으실 겁니다.
              </ListItem>
            </List>
          </Blockquote>
        </Stack>
        <Space py={"xl"}>
          <Space h={"xl"} />
          <Done />
          <Space h={"xl"} />
        </Space>
        <Stack>
          <Stack gap={"xs"} align={"center"}>
            <Title order={4} ta={"center"} c={"var(--mantine-color-gray-7)"}>
              프루퍼 데브엠이 해결 해줄 수 있습니다
            </Title>
            <Group pt={"sm"} pb={"md"} justify={"center"}>
              <Divider w={"5em"} />
            </Group>
            <Text ta={"center"}>
              2주간 회사의 개발팀을 진단하고 비즈니스의 목표와 개발자들의 성장을
              고려하여 지표를 설정하여 지속적으로 확인해볼 수 있는 실시간 업무
              데이터 기반 개발자 성과추적 대시보드를 제공합니다.
            </Text>
          </Stack>
          <InquireWidget btnText={"무료상담 신청"}>
            <Text size={"sm"} c={"var(--color-white)"}>
              상담을 통해 더 자세한 내용을 확인해보세요.
            </Text>
            <Text size={"lg"} fw={700} c={"var(--color-white)"}>
              도입 무료상담 신청하기
            </Text>
          </InquireWidget>
        </Stack>
      </Container>
      <Space h={"10vh"} />
    </>
  );
}
