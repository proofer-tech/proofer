import React from "react";
import { ApexWeekTimeHeatMap } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/ApexWeekTimeHeatMap";
import { Group, Paper, Stack } from "@mantine/core";
import { dz } from "@/database/engine";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { and, eq, gte, inArray, InferSelectModel, lt, or } from "drizzle-orm";
import { Workspace, WorkspaceMemberEmail } from "@/database/schemas/workspace";
import { WorkspacePageProps } from "@/app/subs/app/[workspaceSlug]/types";
import dayjs, { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import SearchControl, {
  SearchControlProps,
} from "@/src/modules/SearchByMember/SearchControl";
import { TimeSeriesTable } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/TimeSeriesTable";
import { GitHubEvent } from "@/src/github/types";
import HeatmapSegmentedControl from "@/app/subs/app/[workspaceSlug]/activity/heatmap/HeatmapSegmentedControl";
import { HeatmapSegment } from "@/src/types/heatmap";
import { analyzeTimeSeries } from "@/src/github/insight";
import { isString } from "lodash";
import { GitHubUser } from "@/database/schemas/github/raw";
import { mapJoinData } from "@/src/utils/drizzle";

interface HeatmapPageProps extends WorkspacePageProps {
  searchParams: SearchControlProps & {
    segment?: string;
    target?: string;
    relations?: string[];
  };
}
export default async function Page({ params, searchParams }: HeatmapPageProps) {
  const { workspaceSlug } = params;
  const workspace = (
    await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
  )[0];

  let { range, q, segment, target, relations } = searchParams;
  relations = isString(relations) ? [relations] : relations || [];

  if (!range) {
    const today = new Date();
    range = [
      startOfWeek(dayjs(today).subtract(4, "weeks").toDate()).toISOString(),
      endOfWeek(today).toISOString(),
    ];
  }

  const [start, end] = range;
  const andConditions = [
    eq(ProcessedGitHubTimeSeries.workspace_id, workspace.id),
    gte(ProcessedGitHubTimeSeries.timestamp, dayjs(start).toDate()),
    lt(ProcessedGitHubTimeSeries.timestamp, dayjs(end).toDate()),
  ];
  const orConditions = [];
  const querySet = dz
    .select()
    .from(ProcessedGitHubTimeSeries)
    .innerJoin(
      GitHubUser,
      eq(ProcessedGitHubTimeSeries.user_id, GitHubUser.user_id),
    )
    .orderBy(ProcessedGitHubTimeSeries.timestamp);

  switch (segment ? parseInt(segment) : 0) {
    case HeatmapSegment.Commit:
      andConditions.push(
        eq(ProcessedGitHubTimeSeries.event, GitHubEvent.commit),
      );
      break;
    case HeatmapSegment["Pull Request"]:
      andConditions.push(
        inArray(ProcessedGitHubTimeSeries.event, [
          GitHubEvent["pull_request_review.submitted"],
          GitHubEvent["pull_request.opened"],
          GitHubEvent["pull_request.closed"],
          GitHubEvent["pull_request_review_comment.created"],
        ]),
      );
      break;
    case HeatmapSegment["Issue"]:
      andConditions.push(
        inArray(ProcessedGitHubTimeSeries.event, [
          GitHubEvent["issues.opened"],
          GitHubEvent["issue_comment.created"],
        ]),
      );
      break;
  }

  if (target) {
    const githubUsers = mapJoinData(
      GitHubUser,
      [],
      await dz
        .select()
        .from(GitHubUser)
        .innerJoin(
          WorkspaceMemberEmail,
          eq(GitHubUser.email, WorkspaceMemberEmail.email),
        )
        .where(eq(WorkspaceMemberEmail.workspace_member_id, parseInt(target))),
    );
    const githubUserEmails: any = githubUsers
      .filter((ghu) => ghu.email !== null)
      .map((ghu) => ghu.email);

    if (githubUserEmails.length === 0)
      orConditions.push(inArray(GitHubUser.email, [""]));
    else orConditions.push(inArray(GitHubUser.email, githubUserEmails));
  }
  if (relations.length > 0) {
    const githubUsers = mapJoinData(
      GitHubUser,
      [],
      await dz
        .select()
        .from(GitHubUser)
        .innerJoin(
          WorkspaceMemberEmail,
          eq(GitHubUser.email, WorkspaceMemberEmail.email),
        )
        .where(
          inArray(
            WorkspaceMemberEmail.workspace_member_id,
            relations.map(parseInt),
          ),
        ),
    );
    const githubUserEmails: any = githubUsers
      .filter((ghu) => ghu.email !== null)
      .map((ghu) => ghu.email);

    if (githubUserEmails.length === 0)
      orConditions.push(inArray(GitHubUser.email, [""]));
    else orConditions.push(inArray(GitHubUser.email, githubUserEmails));
  }

  const conditions = [];
  if (orConditions.length === 1) andConditions.push(orConditions[0]);
  else conditions.push(or(...orConditions));
  conditions.push(and(...andConditions));

  // @ts-ignore
  const timeSeriesSet: InferSelectModel<typeof ProcessedGitHubTimeSeries>[] =
    mapJoinData(
      ProcessedGitHubTimeSeries,
      [],
      // @ts-ignore
      await querySet.where(...conditions),
    );

  return (
    <Stack>
      <SearchControl
        workspace={workspace}
        range={range}
        q={q}
        targetId={target ? parseInt(target) : undefined}
        relationIds={relations?.map(parseInt)}
      />
      <Paper shadow="xs" p="sm">
        <Group align={"center"}>
          {[...analyzeTimeSeries(timeSeriesSet)].map((badge, idx) => (
            <div key={idx}>{badge}</div>
          ))}
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
