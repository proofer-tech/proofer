import React from "react";
import { ApexWeekTimeHeatMap } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/ApexWeekTimeHeatMap";
import {
  SegmentedControl,
  Stack,
  Group,
  Badge,
  Notification,
  Space,
  Paper,
  TextInput,
  Avatar,
} from "@mantine/core";
import { ActivityTable } from "@/app/subs/app/[workspaceSlug]/activity/ActivityTable";
import { IconSearch, IconMoonStars } from "@tabler/icons-react";
import { SearchGroup } from "@/app/subs/app/[workspaceSlug]/activity/SearchGroup";

export default function Page() {
  return (
    <Stack>
      <SearchGroup />
      <Paper shadow="xs" p="sm">
        <Group align={"center"}>
          <Badge
            size={"lg"}
            color={"gray"}
            variant={"light"}
            leftSection={<IconMoonStars />}
          >
            주로 새벽에 개발합니다
          </Badge>
          <Badge size={"lg"} color={"gray"} variant={"light"}>
            주말에 개발을 쉬지 않습니다
          </Badge>
          <Badge size={"lg"} color={"gray"} variant={"light"}>
            평일 평균 9시간 이상 개발
          </Badge>
          <Badge size={"lg"} color={"gray"} variant={"light"}>
            주말 평균 2시간 이상 개발
          </Badge>
        </Group>
      </Paper>
      <Stack>
        <ApexWeekTimeHeatMap />
        <SegmentedControl
          fullWidth
          data={["전체", "Commit", "Pull Request", "Code Review"]}
        />
        <ActivityTable />
      </Stack>
    </Stack>
  );
}
