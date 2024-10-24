import React from "react";
import Background from "@/app/components/Background";
import {
  Blockquote,
  Container,
  Divider,
  Group,
  Image,
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
      <Group justify={"center"} px={"md"}>
        <Image
          fit={"cover"}
          radius={"md"}
          alt={"대시보드 예시"}
          src={"/assets/images/devm/dashboard-example.png"}
          className={"shadow-sm"}
        />
      </Group>
      <Container>
        <Space h={"xl"} />
        <Space py={"xl"}>
          <Down />
        </Space>
        <Space h={"xl"} />
        <Stack>
          <Stack gap={0}>
            <Text c={"var(--mantine-color-gray-8)"} fw={400} size={"lg"}>
              개발자 관리 컨설팅
            </Text>
            <Title order={3}>일단 개발자는 채용했는데 ...</Title>
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
              비즈니스 기술 로드맵 설계
            </Text>
            <Title order={3}>기술이 중요한건 알겠는데 ...</Title>
          </Stack>
          <Blockquote color="green" p={"xl"}>
            <List spacing={"xs"} size={"md"}>
              <ListItem>
                비즈니스 로드맵에 기술적인 시야가 모자란 것 같으신가요?
              </ListItem>
              <ListItem>
                앞으로 개발팀을 어떻게 구성해야 할 지 고민도 되시겠죠.
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
            <Group justify={"center"} pb={"xl"}>
              <Image src={"/assets/images/devm/reference.png"} />
            </Group>
            <Title order={4} ta={"center"} c={"var(--mantine-color-gray-7)"}>
              프루퍼 데브엠이 해결 해줄 수 있습니다
            </Title>
            <Group pt={"sm"} pb={"md"} justify={"center"}>
              <Divider w={"5em"} />
            </Group>
            <Text ta={"center"}>
              2주간 개발자 1:1 미팅과 대표님과의 긴밀한 협업을 통해 회사의
              개발팀을 진단하고 비즈니스 목표와 개발자들의 성장이 고려된 지표를
              설계하여 앞으로도 지속적으로 확인해볼 수 있는 실시간 업무 데이터
              기반 개발자 성과추적 대시보드를 제공합니다.
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
