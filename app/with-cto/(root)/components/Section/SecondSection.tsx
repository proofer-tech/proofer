"use client";
import {
  Box,
  Container,
  Group,
  Paper,
  Space,
  Stack,
  StackProps,
  Text,
  Title,
} from "@mantine/core";
import SecondBackground from "@/app/with-cto/(root)/components/Background/SecondBackground";
import AnimatedDottedCircle from "@/app/with-cto/(root)/components/AnimatedDottedCircle";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";

interface GraphicProps extends StackProps {}
function Graphic(props: GraphicProps) {
  return (
    <Stack gap={0} align={"center"} {...props} py={"1em"}>
      <Group gap={"32px"} wrap={"nowrap"}>
        <AnimatedDottedCircle
          size={67}
          baseColor={"var(--color-primary)"}
          highlightColor={"#51C675"}
        />
        <Paper
          radius={100}
          bg={"var(--color-primary)"}
          py={"0.3em"}
          px={"0.8em"}
          fz={"3em"}
          fw={900}
          c={"white"}
          style={{
            fontFamily: "Avenir",
            transform: "rotate(-6deg)",
            position: "relative",
            top: "-0.1em",
          }}
        >
          CTO
        </Paper>
      </Group>
      <Group
        style={{ transform: "rotate(8deg)" }}
        align={"center"}
        wrap={"nowrap"}
      >
        <Text
          fw={900}
          fz={"2.8em"}
          c={"var(--color-primary)"}
          style={{ fontFamily: "Avenir" }}
        >
          Communication
        </Text>
        <Stack gap={"6.25px"}>
          <Paper
            w={"12px"}
            h={"12px"}
            bg={"var(--color-primary)"}
            radius={100}
          ></Paper>
          <Paper
            w={"12px"}
            h={"12px"}
            bg={"var(--color-secondary)"}
            radius={100}
          ></Paper>
        </Stack>
      </Group>
      <Group py={"1em"} wrap={"nowrap"}>
        <Paper
          radius={"100px 100px 0px 100px"}
          bg={"var(--color-secondary)"}
          py={"1em"}
          px={"2em"}
        >
          <Text
            c={"white"}
            fz={"3em"}
            fw={900}
            style={{ fontFamily: "Avenir" }}
          >
            Conference
          </Text>
        </Paper>
        <AnimatedDottedCircle
          size={78}
          baseColor={"#51C675"}
          highlightColor={"white"}
          style={{ position: "relative", left: "-48px" }}
        />
      </Group>
    </Stack>
  );
}

export default function SecondSection() {
  const isMobileMedia = useIsMobileMedia();
  return (
    <Box
      w={"100%"}
      mih={"calc(100vh - var(--app-shell-header-height))"}
      maw={"1040px"}
      mx={"auto"}
    >
      <Container h={"100%"} py={isMobileMedia ? 0 : "xl"}>
        <Group
          w={"100%"}
          h={"100%"}
          align={isMobileMedia ? "start" : "center"}
          py={"xl"}
        >
          <Stack
            p={"lg"}
            style={{ position: "relative" }}
            w={isMobileMedia ? "100%" : "50%"}
          >
            <Title order={1} fz={"2em"} c={"#151410"}>
              2024년 8월 9일 금요일
              <br />
              오후 6시 30분
              <br />
              엔스페이스에서 만나요
            </Title>
            <Space h={"lg"} />
            <Graphic
              style={
                isMobileMedia ? {} : { position: "absolute", right: "-90%" }
              }
            />
            <Space h={"lg"} hiddenFrom={"md"} />
            <Stack>
              <Text>
                DEVIEW, if KAKAO, SLASH 등 현업 개발자들을 타겟팅한 컨퍼런스,
                커뮤니티는 많습니다.
              </Text>
              <Text>
                하지만 조직 내에서 CTO 역할을 맡게 된 분들을 위한 컨퍼런스나
                모임은 굉장히 찾기 힘든 것 같습니다(기술적인 의사결정, 인사적인
                고민들도 매번 어렵다고요!)
              </Text>
              <Text>
                회사의 CTO로서 여러분들이 겪고 있는 고민과 도전, 그리고 그
                사례들을 서로 나눌 수 있는 자리를 프루퍼팀의 CTO도 찾다 찾다가
                없어서, 안되겠다 우리가 만들어야겠다! 싶어 자리를 만들어보려고
                합니다.
              </Text>
              <Text>
                이번 자리가 바쁜 CTO 여러분들에게 시간이 아깝지 않은 유익한
                자리가 되기를 바라며, 한번의 이벤트로 끝날 게 아니라 앞으로도
                계속 이어져 함께 성장을 도모할 수 있는 자리가 될 수 있도록
                꾸준히 함께하겠습니다!
              </Text>
            </Stack>
          </Stack>
        </Group>
      </Container>
      <SecondBackground />
    </Box>
  );
}
