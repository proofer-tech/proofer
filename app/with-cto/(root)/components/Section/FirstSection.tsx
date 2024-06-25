import { Box, Container, Group, Stack, Title } from "@mantine/core";
import FirstBackground from "@/app/with-cto/(root)/components/Background/FirstBackground";
import ResponsiveLogoImage from "@/app/with-cto/(root)/components/ResponsiveLogoImage";

export default function FirstSection() {
  return (
    <Box
      w={"100%"}
      h={"calc(100vh - var(--app-shell-header-height))"}
      maw={"1040px"}
      mx={"auto"}
    >
      <FirstBackground />
      <Container h={"100%"}>
        <Group w={"100%"} h={"100%"} align={"start"}>
          <Stack
            px={"lg"}
            style={{
              position: "relative",
              top: "min(calc(10vw + 5vh), 20vh)",
            }}
          >
            <Title order={1} fz={"2em"} c={"#151410"}>
              CTO들의 위대한 시작,
              <br />그 두번째 만남
            </Title>
            <ResponsiveLogoImage />
          </Stack>
        </Group>
      </Container>
    </Box>
  );
}
