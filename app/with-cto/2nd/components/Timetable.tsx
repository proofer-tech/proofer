"use client";

import { Box, Divider, Flex, Group, Paper, Stack, Text } from "@mantine/core";
import { useIsMobileMedia } from "@/src/hooks/mediaQuery";
import { useHover } from "@mantine/hooks";

function TimetableBranch({
  type = "default",
  active = false,
}: {
  type?: "start" | "default" | "end";
  active?: boolean;
}) {
  return (
    <Stack align={"center"} gap={0} h={"100%"}>
      <Group h={"100%"}>
        <Divider
          orientation="vertical"
          h={"100%"}
          size={"2px"}
          color={type !== "start" ? "#344FE0" : "transparent"}
        />
      </Group>
      <Paper radius={100} bd={"#ffffff 2px solid"} p={"4px"}>
        <Paper
          w={"16px"}
          h={"16px"}
          radius={100}
          bd={"#344FE0 2px solid"}
          bg={active ? "#344FE0" : "transparent"}
          style={{ transitionDuration: "0.3s" }}
        />
      </Paper>
      <Group h={"100%"}>
        <Divider
          orientation="vertical"
          h={"100%"}
          size={"2px"}
          color={type !== "end" ? "#344FE0" : "transparent"}
        />
      </Group>
    </Stack>
  );
}
function TimetableBox({
  time,
  content,
  active = false,
}: {
  time: string;
  content: string;
  active?: boolean;
}) {
  return (
    <Box py={"0.5em"} w={"100%"}>
      <Paper
        bg={active ? "#344FE0" : "#F5F5FD"}
        radius={"12px"}
        py={"md"}
        px={"lg"}
        w={"100%"}
        style={{ transitionDuration: "0.3s" }}
      >
        <Stack gap={0}>
          <Text
            c={active ? "#FFFFFF" : "black"}
            fw={600}
            style={{ transitionDuration: "0.3s" }}
          >
            {time}
          </Text>
          <Text
            c={active ? "#FFFFFF" : "#223DCC"}
            fw={600}
            style={{ transitionDuration: "0.3s" }}
          >
            {content}
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}

function TimetableRow({
  timeSet,
  type = "default",
}: {
  timeSet: { time: string; content: string };
  type: "start" | "default" | "end";
}) {
  const { hovered, ref } = useHover();
  return (
    <Group ref={ref} wrap={"nowrap"} gap={"lg"} h={"6em"}>
      <TimetableBranch type={type} active={hovered} />
      <TimetableBox
        time={timeSet.time}
        content={timeSet.content}
        active={hovered}
      />
    </Group>
  );
}
function TimetableRows({
  timeSet,
  start = false,
  end = false,
}: {
  timeSet: { time: string; content: string }[];
  start?: boolean;
  end?: boolean;
}) {
  return (
    <Stack w={"100%"} gap={0}>
      {timeSet.map((set, index) => {
        return (
          <TimetableRow
            key={set.time}
            timeSet={set}
            type={
              start && index === 0
                ? "start"
                : end && index === timeSet.length - 1
                  ? "end"
                  : "default"
            }
          />
        );
      })}
    </Stack>
  );
}
export default function Timetable() {
  const isMobileMedia = useIsMobileMedia();
  return (
    <Flex
      direction={isMobileMedia ? "column" : "row"}
      wrap={"nowrap"}
      gap={isMobileMedia ? 0 : "xl"}
    >
      <TimetableRows
        start
        timeSet={[
          { time: "19:00-19:25", content: "사전 네트워킹" },
          { time: "19:25-19:30", content: "오프닝" },
          { time: "19:30-20:00", content: "러닝쉐어(연사강연)" },
          { time: "20:00-20:15", content: "Q&A" },
        ]}
      />
      <TimetableRows
        end
        timeSet={[
          { time: "20:15-20:40", content: "테이블 토크" },
          { time: "20:40-20:50", content: "발표 및 안내" },
          { time: "20:50-21:10", content: "주제별 네트워킹" },
          { time: "21:10-22:00", content: "자유 네트워킹" },
        ]}
      />
    </Flex>
  );
}
