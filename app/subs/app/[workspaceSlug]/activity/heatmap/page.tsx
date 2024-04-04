import React from "react";
import { ApexWeekTimeHeatMap } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/ApexWeekTimeHeatMap";
import { Badge, Group, Paper, SegmentedControl, Stack } from "@mantine/core";
import { ActivityTable } from "@/app/subs/app/[workspaceSlug]/activity/ActivityTable";
import { IconMoonStars } from "@tabler/icons-react";
import { SearchGroup } from "@/app/subs/app/[workspaceSlug]/activity/SearchGroup";
import { dz } from "@/database/engine";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { eq } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { WorkspacePageProps } from "@/app/subs/app/[workspaceSlug]/types";

export default async function Page({ params }: WorkspacePageProps) {
  const { workspaceSlug } = params;
  const workspace = (
    await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
  )[0];
  const timeSeriesSet = await dz
    .select()
    .from(ProcessedGitHubTimeSeries)
    .where(eq(ProcessedGitHubTimeSeries.workspace_id, workspace.id))
    .orderBy(ProcessedGitHubTimeSeries.timestamp);
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
        <ApexWeekTimeHeatMap timeSeries={timeSeriesSet} />
        <SegmentedControl
          fullWidth
          data={["전체", "Commit", "Pull Request", "Code Review"]}
        />
        <ActivityTable />
      </Stack>
    </Stack>
  );
}
