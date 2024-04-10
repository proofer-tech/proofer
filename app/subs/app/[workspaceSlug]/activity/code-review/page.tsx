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
import { SearchBarContainer } from "@/src/modules/SearchBarControl/SearchBarContainer";
import CountCard from "./CountCard";
import StrengthCard from "@/app/subs/app/[workspaceSlug]/activity/code-review/StrengthCard";
import ColumnChart from "@/app/subs/app/[workspaceSlug]/activity/code-review/ColumnChart";

export default function Page() {
  return (
    <Stack>
      <SearchBarContainer />
      <Paper shadow="xs" p={"sm"} py={"lg"}>
        <Group wrap={"nowrap"} gap={0}>
          <CountCard title={"Total Reviews"} count={12} color={"gray"} />
          <CountCard title={"Reviews in Progress"} count={3} color={"blue"} />
          <CountCard title={"Completed Reviews"} count={6} color={"green"} />
          <CountCard title={"Pending Reviews"} count={3} color={"red"} />
        </Group>
      </Paper>
      <Paper shadow="xs" p={"sm"} py={"lg"}>
        <ColumnChart />
      </Paper>
      <Paper shadow="xs" p="lg">
        <Stack>
          <Title order={4}>Submitter Metrics</Title>
          <Group wrap={"nowrap"} align={"start"}>
            <StrengthCard
              title={"Average Response Time"}
              description={
                "Indicates how quickly a PR submitter reacts to feedback through new commits or comments."
              }
              value={3.5}
              maxValue={24}
              unit={"hours"}
              color={"green"}
            />
            <StrengthCard
              title={"Processed Review Comments"}
              description={
                "The percentage of comments changed based on feedback or suggestions received through review comments."
              }
              value={16.5}
              maxValue={100}
              unit={"%"}
              color={"green"}
            />
            <StrengthCard
              title={"Review Acceptance"}
              description={
                "Indicates the extent to which a submitter actively accepts feedback during the code review process and makes necessary code improvements."
              }
              value={3}
              maxValue={100}
              unit={"%"}
              color={"green"}
            />
            <StrengthCard
              title={"PRs Deployed Without Review"}
              description={
                "The percentage of PRs that are merged and deployed without being reviewed. A higher ratio could indicate a decrease in code quality."
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
              The number of times a reviewer has reviewed PRs submitted by this
              developer. A higher number of reviews as a reviewer can indicate
              trustworthiness in the reviewer&apos;s role.
            </Text>
            <Group px={"1ex"} w={"100%"} gap={"3em"}>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/2.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>Je-Hyung Hong</Text>
                <Text>17 times</Text>
              </Group>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/3.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>Kim Developer</Text>
                <Text>8 times</Text>
              </Group>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/4.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>Park Developer</Text>
                <Text>7 times</Text>
              </Group>
              <Group align={"center"}>
                <Avatar
                  src={"/assets/images/sample/avatar/5.jpg"}
                  size={"sm"}
                />
                <Text size={"sm"}>Choi Developer</Text>
                <Text>3 times</Text>
              </Group>
            </Group>
          </Stack>
        </Stack>
      </Paper>
      <Paper shadow="xs" p="lg">
        <Stack>
          <Title order={4}>Reviewer Metrics</Title>
          <Group wrap={"nowrap"} align={"start"}>
            <StrengthCard
              title={"Average Start Time"}
              description={
                "The time it takes from when a PR is submitted to when the assigned reviewer starts the review. It indicates how quickly a reviewer collaborates in the code review process."
              }
              value={0.6}
              maxValue={24}
              unit={"hours"}
              color={"blue"}
            />
            <StrengthCard
              title={"Review Participation"}
              description={
                "The percentage of total PRs that a developer has participated in reviewing. It shows how much a reviewer contributes to improving code quality within the group."
              }
              value={36.2}
              maxValue={100}
              unit={"%"}
              color={"blue"}
            />
            <StrengthCard
              title={"Review Influence"}
              description={
                "The ratio of feedback and suggestions provided during the review process that are implemented in the code. It shows the contribution of a reviewer to enhancing code quality."
              }
              value={63.7}
              maxValue={100}
              unit={"%"}
              color={"blue"}
            />
            <StrengthCard
              title={"Review Coverage"}
              description={
                "Indicates whether a sufficient range of code has been reviewed for submitted reviews. It shows if the reviewer is assessing the overall quality of the code."
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
            The number of times this developer has been assigned as a reviewer
            among the submitted PRs. A higher number of assignments as a
            reviewer can indicate trust from the submitters.
          </Text>
          <Group px={"1ex"} w={"100%"} gap={"3em"}>
            <Group align={"center"}>
              <Avatar src={"/assets/images/sample/avatar/2.jpg"} size={"sm"} />
              <Text size={"sm"}>Je-Hyung Hong</Text>
              <Text>8 times</Text>
            </Group>
            <Group align={"center"}>
              <Avatar src={"/assets/images/sample/avatar/3.jpg"} size={"sm"} />
              <Text size={"sm"}>Kim Developer</Text>
              <Text>2 times</Text>
            </Group>
            <Group align={"center"}>
              <Avatar src={"/assets/images/sample/avatar/5.jpg"} size={"sm"} />
              <Text size={"sm"}>Choi Developer</Text>
              <Text>1 time</Text>
            </Group>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
