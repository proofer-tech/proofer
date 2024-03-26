"use client";
import { Box, Group, Stack, Text } from "@mantine/core";
import React from "react";
import moment from "moment";
import "moment-duration-format";

interface CycleTimeColumnItf {
  title: string;
  description: string;
  minutes: number;
  score: number;
}

interface CycleTimeColumnProps {
  cycleTime: CycleTimeColumnItf;
}
function CycleTimeColumn({ cycleTime }: CycleTimeColumnProps) {
  let bg = "transparent";
  let performance = "보통";
  if (cycleTime.score < 50) {
    bg = "red";
    performance = "나쁜";
  } else if (cycleTime.score < 80) {
    bg = "yellow";
    performance = "중간";
  } else {
    bg = "green";
    performance = "높은";
  }

  const durationString = moment
    .duration(cycleTime.minutes * 60, "seconds")
    // @ts-ignore
    .format("d일 h시간 m분");

  return (
    <Stack w={"100%"} px={"0.5ex"} gap={"1ex"}>
      <Text size={"sm"} fw={700}>
        {cycleTime.title}
      </Text>
      <Group gap={"0.5ex"}>
        <Text c={bg} fw={700}>
          {performance}
        </Text>
        <Text>퍼포먼스</Text>
      </Group>
      <Text fw={700} c={bg}>
        {durationString}
      </Text>
      <Text size={"xs"} c={"var(--mantine-color-gray-6)"}>
        {cycleTime.description}
      </Text>
    </Stack>
  );
}
interface CycleTimeGraphProps {
  score: number;
}
function CycleTimeGraph(props: CycleTimeGraphProps) {
  let bg = "transparent";
  if (props.score < 50) bg = "red";
  else if (props.score < 80) bg = "yellow";
  else bg = "green";

  return <Box h={"0.5em"} bg={bg} w={"100%"}></Box>;
}

export default function CycleTimeAverage() {
  const cycleTimes: CycleTimeColumnItf[] = [
    {
      title: "코딩에 걸리는 시간",
      description: "첫 번째 커밋부터 PR 생성까지 경과된 시간입니다.",
      minutes: 60 * 24 * 2 + 10 * 60,
      score: 66,
    },
    {
      title: "리뷰를 픽업하는 시간",
      description:
        "PR이 공개된 시점과 해당 PR을 처음 검토하는 시점 사이의 시간입니다. 리뷰어가 동료의 PR을 얼마나 빨리 픽업하는지를 나타냅니다.",
      minutes: 60 * 10 + 4,
      score: 75,
    },
    {
      title: "리뷰에 걸리는 시간",
      description:
        "PR의 첫 번째 검토부터 해당 PR이 병합될 때까지의 시간입니다. 제출자가 코드리뷰를 얼마나 빨리 통합할 수 있는지를 나타냅니다.",
      minutes: 7 * 60 + 58,
      score: 85,
    },
    {
      title: "배포에 걸리는 시간",
      description:
        "PR이 병합되는 시점부터 프로덕션에 배포되는 시점까지의 시간입니다. 코드를 얼마나 빨리 배포할 수 있는지를 나타냅니다.",
      minutes: 60 * 24 + 39,
      score: 39,
    },
  ];

  return (
    <Stack gap={"0.5em"}>
      <Group
        wrap={"nowrap"}
        gap={"0.5em"}
        style={{ borderRadius: "0.5em", overflow: "hidden" }}
      >
        {cycleTimes.map((cycleTime, idx) => (
          <CycleTimeGraph key={idx} score={cycleTime.score} />
        ))}
      </Group>
      <Group wrap={"nowrap"} gap={"0.5em"} align={"start"}>
        {cycleTimes.map((cycleTime, idx) => (
          <CycleTimeColumn key={idx} cycleTime={cycleTime} />
        ))}
      </Group>
    </Stack>
  );
}
