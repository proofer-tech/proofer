import React from "react";
import { ApexWeekTimeHeatMap } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/ApexWeekTimeHeatMap";
import { Group, Paper, Stack } from "@mantine/core";
import { dz } from "@/database/engine";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { and, eq, gte, inArray, InferSelectModel, lt } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { WorkspacePageProps } from "@/app/subs/app/[workspaceSlug]/types";
import dayjs, { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import HeatmapSearchGroup, {
  HeatmapSearchGroupProps,
} from "@/app/subs/app/[workspaceSlug]/activity/heatmap/HeatmapSearchGroup";
import { TimeSeriesTable } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/TimeSeriesTable";
import { GitHubEvent } from "@/src/github/types";
import HeatmapSegmentedControl from "@/app/subs/app/[workspaceSlug]/activity/heatmap/HeatmapSegmentedControl";
import { HeatmapSegment } from "@/src/types/heatmap";
import { analyzeTimeSeries } from "@/src/github/insight";
import { GitHubUser } from "@/database/schemas/github/raw";

interface HeatmapPageProps extends WorkspacePageProps {
  searchParams: HeatmapSearchGroupProps & {
    segment?: string;
  };
}
export default async function Page({ params, searchParams }: HeatmapPageProps) {
  const { workspaceSlug } = params;
  const workspace = (
    await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
  )[0];

  let { range, q, segment } = searchParams;
  if (!range) {
    const today = new Date();
    range = [
      startOfWeek(dayjs(today).subtract(4, "weeks").toDate()).toISOString(),
      endOfWeek(today).toISOString(),
    ];
  }

  const [start, end] = range;
  const conditions = [
    eq(ProcessedGitHubTimeSeries.workspace_id, workspace.id),
    gte(ProcessedGitHubTimeSeries.timestamp, dayjs(start).toDate()),
    lt(ProcessedGitHubTimeSeries.timestamp, dayjs(end).toDate()),
  ];
  const querySet = dz
    .select()
    .from(ProcessedGitHubTimeSeries)
    .orderBy(ProcessedGitHubTimeSeries.timestamp);

  switch (segment ? parseInt(segment) : 0) {
    case HeatmapSegment.Commit:
      conditions.push(eq(ProcessedGitHubTimeSeries.event, GitHubEvent.commit));
      break;
    case HeatmapSegment["Pull Request"]:
      conditions.push(
        inArray(ProcessedGitHubTimeSeries.event, [
          GitHubEvent["pull_request_review.submitted"],
          GitHubEvent["pull_request.opened"],
          GitHubEvent["pull_request.closed"],
          GitHubEvent["pull_request_review_comment.created"],
        ]),
      );
      break;
    case HeatmapSegment["Issue"]:
      conditions.push(
        inArray(ProcessedGitHubTimeSeries.event, [
          GitHubEvent["issues.opened"],
          GitHubEvent["issue_comment.created"],
        ]),
      );
      break;
  }

  const timeSeriesSet = await querySet.where(and(...conditions));
  const timeSeriesUsers = (await dz
    // @ts-ignore
    .selectDistinctOn([GitHubUser.user_id], GitHubUser)
    .from(GitHubUser)
    .innerJoin(
      ProcessedGitHubTimeSeries,
      eq(ProcessedGitHubTimeSeries.user_id, GitHubUser.user_id),
    )
    .where(and(...conditions))) as InferSelectModel<typeof GitHubUser>[];

  return (
    <Stack>
      <HeatmapSearchGroup range={range} q={q} githubUsers={timeSeriesUsers} />
      <Paper shadow="xs" p="sm">
        <Group align={"center"}>
          {[...analyzeTimeSeries(timeSeriesSet)].map((badge) => badge)}
        </Group>
      </Paper>
      <Stack>
        <ApexWeekTimeHeatMap timeSeries={timeSeriesSet} />
        <HeatmapSegmentedControl segment={segment ? parseInt(segment) : 0} />
        <TimeSeriesTable timeSeries={timeSeriesSet} />
      </Stack>
    </Stack>
  );
}
