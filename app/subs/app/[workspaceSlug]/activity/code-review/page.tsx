import React from "react";
import {
  Avatar,
  Divider,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { SearchGroup } from "@/app/subs/app/[workspaceSlug]/activity/SearchGroup";
import CountCard from "./CountCard";
import StrengthCard from "@/app/subs/app/[workspaceSlug]/activity/code-review/StrengthCard";
import ColumnChart from "@/app/subs/app/[workspaceSlug]/activity/code-review/ColumnChart";

export default function Page() {
  return (
    <Stack>
      <SearchGroup />
      <Paper shadow="xs" p={"sm"} py={"lg"}>
        <Group wrap={"nowrap"} gap={0}>
          <CountCard title={"전체 리뷰"} count={12} color={"gray"} />
          <CountCard title={"진행 중인 리뷰"} count={3} color={"blue"} />
          <CountCard title={"완료된 리뷰"} count={6} color={"green"} />
          <CountCard title={"미완료 리뷰"} count={3} color={"red"} />
        </Group>
      </Paper>
      <Paper shadow="xs" p={"sm"} py={"lg"}>
        <ColumnChart />
      </Paper>
      <Paper shadow="xs" p="lg">
        <Stack>
          <Title order={4}>제출자 지표</Title>
          <Group wrap={"nowrap"} align={"start"}>
            <StrengthCard
              title={"평균응답시간"}
              description={
                "PR 제출자가 새로운 커밋이나 의견을 통해 피드백에 얼마나 빠르게 반응하는지를 나타냅니다."
              }
              value={3.5}
              maxValue={24}
              unit={"시간"}
              color={"green"}
            />
            <StrengthCard
              title={"처리된 리뷰 코멘트"}
              description={
                "리뷰 코멘트를 통해 받은 피드백이나 의견으로 변경한 코멘트의 비율을 나타냅니다."
              }
              value={16.5}
              maxValue={100}
              unit={"%"}
              color={"green"}
            />
            <StrengthCard
              title={"리뷰수용성"}
              description={
                "코드 리뷰 과정에서 리뷰어의 피드백을 적극적으로 받아들이며, 필요한 경우 코드 개선을 위해 그 의견을 수용하는 정도를 나타냅니다."
              }
              value={3}
              maxValue={100}
              unit={"%"}
              color={"green"}
            />
            <StrengthCard
              title={"리뷰없이 배포된 PR"}
              description={
                "리뷰되지 않은 상태로 머지 후 배포된 PR 의 비율입니다. 이 비율이 높을수록 코드 품질이 떨어질 수 있습니다."
              }
              value={2}
              maxValue={100}
              unit={"%"}
              color={"green"}
            />
          </Group>
          <Stack w={"100%"}>
            <Space h={"sm"} />
            <Divider variant={"dashed"} />
            <Text size={"xs"} c={"var(--mantine-color-gray-6)"}>
              해당 개발자가 제출한 PR에 리뷰어가 리뷰한 횟수. 리뷰어로 지정된
              횟수가 많을수록 제출자가 리뷰어로써 신임을 주고 있을 수 있습니다.
            </Text>
            <Group px={"1ex"} w={"100%"} gap={"3em"}>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/2.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>홍제형</Text>
                <Text>17회</Text>
              </Group>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/3.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>김개발</Text>
                <Text>8회</Text>
              </Group>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/4.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>박개발</Text>
                <Text>7회</Text>
              </Group>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/5.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>최개발</Text>
                <Text>3회</Text>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </Paper>
      <Paper shadow="xs" p="lg">
        <Stack>
          <Title order={4}>리뷰어 지표</Title>
          <Group wrap={"nowrap"} align={"start"}>
            <StrengthCard
              title={"평균시작시간"}
              description={
                "PR이 제출된 후 리뷰어로 지정되었을 때에 리뷰하는데까지의 시간입니다. 리뷰어가 얼마나 빨리 코드리뷰에 협조하는지를 나타냅니다."
              }
              value={0.6}
              maxValue={24}
              unit={"시간"}
              color={"blue"}
            />
            <StrengthCard
              title={"리뷰 참여도"}
              description={
                "리뷰에 대한 참여와 관심을 의미합니다. 이는 단순히 코드를 제출하고 피드백을 받는 것을 넘어서, 리뷰 과정에 진정으로 참여하고, 피드백을 주고받으며, 코드의 품질 향상과 팀 내 지식 공유에 기여하는 태도를 포함합니다."
              }
              value={36.2}
              maxValue={100}
              unit={"%"}
              color={"blue"}
            />
            <StrengthCard
              title={"리뷰 영향력"}
              description={
                "검토 프로세스 중에 제공된 피드백과 제안이 코드에 얼마나 반영되는지에 대한 비율입니다. 이는 리뷰어가 코드 품질 향상에 얼마나 기여하는지를 나타냅니다."
              }
              value={63.7}
              maxValue={100}
              unit={"%"}
              color={"blue"}
            />
            <StrengthCard
              title={"리뷰 커버리지"}
              description={
                "제출된 리뷰를 위하여 충분한 범위의 코드를 검토했는지를 나타내는 지표입니다. 이는 리뷰어가 코드의 전체적인 품질을 검토하고 있는지를 나타냅니다."
              }
              value={94.8}
              maxValue={100}
              unit={"%"}
              color={"blue"}
            />
          </Group>
        </Stack>
        <Stack w={"100%"}>
          <Space h={"sm"} />
          <Divider variant={"dashed"} />
          <Text size={"xs"} c={"var(--mantine-color-gray-6)"}>
            PR을 제출한 사람들 중 해당 개발자가 리뷰어로 지정된 횟수. 리뷰어로
            지정된 횟수가 많을수록 제출자에게 리뷰어로써 신임을 받고 있을 수
            있습니다.
          </Text>
          <Group px={"1ex"} w={"100%"} gap={"3em"}>
            <Group align={"center"}>
              <Avatar src={"/assets/images/sample/avatar/2.jpg"} size={"sm"} />
              <Text size={"sm"}>홍제형</Text>
              <Text>8회</Text>
            </Group>
            <Group align={"center"}>
              <Avatar src={"/assets/images/sample/avatar/3.jpg"} size={"sm"} />
              <Text size={"sm"}>김개발</Text>
              <Text>2회</Text>
            </Group>
            <Group align={"center"}>
              <Avatar src={"/assets/images/sample/avatar/5.jpg"} size={"sm"} />
              <Text size={"sm"}>최개발</Text>
              <Text>1회</Text>
            </Group>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
