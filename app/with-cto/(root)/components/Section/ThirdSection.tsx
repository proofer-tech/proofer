import { Box, Center, Container, Stack, Text, Title } from "@mantine/core";
import Timetable from "@/app/with-cto/(root)/components/Timetable";

export default function ThirdSection() {
  return (
    <Box
      w={"100%"}
      h={"calc(100vh - var(--app-shell-header-height))"}
      maw={"1040px"}
      mx={"auto"}
    >
      <Container h={"100%"}>
        <Center w={"100%"} h={"100%"}>
          <Stack gap={"xl"} w={"100%"}>
            <Stack gap={"md"}>
              <Title>타임테이블</Title>
              <Text>
                참여비는 없습니다! CTO님 혼자서 외롭게 고민하던 내용과 이제부턴
                함께할 마음만 들고오시면 됩니다!!
              </Text>
            </Stack>
            <Timetable />
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
