import { Paper, Stack, Title } from "@mantine/core";
import React from "react";
import CycleTimeAverage from "@/app/subs/app/[workspaceSlug]/activity/cycle-time/CycleTimeAverage";
import { SearchGroup } from "@/src/modules/SearchByMember/SearchGroup";
import { CycleTimeBreakdown } from "@/app/subs/app/[workspaceSlug]/activity/cycle-time/CycleTimeBreakdown";
import CycleTimeTable from "@/app/subs/app/[workspaceSlug]/activity/cycle-time/CycleTimeTable";

export default function Page() {
  return (
    <Stack>
      <SearchGroup />
      <Stack>
        <Paper shadow="xs" p={"xl"}>
          <Stack>
            <Title order={5}>평균 6일 8시간 소요</Title>
            <CycleTimeAverage />
          </Stack>
        </Paper>
        <Paper shadow="xs" px={"xl"} py={"lg"}>
          <Stack gap={"2em"}>
            <Title order={5}>PR 별 평균 사이클 타임</Title>
            <CycleTimeBreakdown />
          </Stack>
        </Paper>
        <Paper shadow={"xs"}>
          <CycleTimeTable />
        </Paper>
      </Stack>
    </Stack>
  );
}
