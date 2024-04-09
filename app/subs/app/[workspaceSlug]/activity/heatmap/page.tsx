import React from "react";
import { ApexWeekTimeHeatMap } from "@/app/subs/app/[workspaceSlug]/activity/heatmap/ApexWeekTimeHeatMap";
import { Group, Paper, Stack } from "@mantine/core";
import { dz } from "@/database/engine";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import {
  and,
  eq,
  gte,
  inArray,
  InferSelectModel,
  lt,
  or,
  SQL,
} from "drizzle-orm";
import { Workspace, WorkspaceMemberEmail } from "@/database/schemas/workspace";
import { WorkspacePageProps } from "@/app/subs/app/[workspaceSlug]/types";
import dayjs, { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { GitHubEvent } from "@/src/github/types";
import { analyzeTimeSeries } from "@/src/github/insight";
import { isString } from "lodash";
import { GitHubUser } from "@/database/schemas/github/raw";
import { mapJoinData } from "@/src/utils/drizzle";
import SearchBarControl, {
  SearchBarControlProps,
} from "@/src/modules/SearchBarControl/SearchBarControl";
import SegmentControl from "@/src/modules/SegmentControl/SegmentControl";
import { TimeSeriesTable } from "@/src/modules/TimeSeriesTable";
import { GitHubSegment } from "@/src/modules/SegmentControl/types";

interface HeatmapPageProps extends WorkspacePageProps {
  searchParams: SearchBarControlProps & {
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

  let { range, segment, target, relations } = searchParams;
  relations = isString(relations) ? [relations] : relations || [];
  const querySet = dz
    .select()
    .from(ProcessedGitHubTimeSeries)
    .innerJoin(
      GitHubUser,
      eq(ProcessedGitHubTimeSeries.user_id, GitHubUser.user_id),
    )
    .orderBy(ProcessedGitHubTimeSeries.timestamp);
  const conditions: SQL<any>[] = [];
  const andConditions: SQL<any>[] = [
    eq(ProcessedGitHubTimeSeries.workspace_id, workspace.id),
  ];
  const orConditions: SQL<any>[] = [];

  if (range) {
    const [start, end] = range;
    andConditions.push(
      gte(
        ProcessedGitHubTimeSeries.timestamp,
        dayjs(start).set("hour", 0).set("minute", 0).set("second", 0).toDate(),
      ),
      lt(
        ProcessedGitHubTimeSeries.timestamp,
        dayjs(end).set("hour", 23).set("minute", 59).set("second", 59).toDate(),
      ),
    );
  }
  switch (segment ? parseInt(segment) : 0) {
    case GitHubSegment.Commit:
      andConditions.push(
        eq(ProcessedGitHubTimeSeries.event, GitHubEvent.commit),
      );
      break;
    case GitHubSegment["Pull Request"]:
      andConditions.push(
        inArray(ProcessedGitHubTimeSeries.event, [
          GitHubEvent["pull_request_review.submitted"],
          GitHubEvent["pull_request.opened"],
          GitHubEvent["pull_request.closed"],
          GitHubEvent["pull_request_review_comment.created"],
        ]),
      );
      break;
    case GitHubSegment["Issue"]:
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
      {},
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
      {},
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

  if (orConditions.length === 1) andConditions.push(orConditions[0]);
  else andConditions.push(or(...orConditions) as SQL);
  conditions.push(and(...andConditions) as SQL);

  // @ts-ignore
  const timeSeriesSet: InferSelectModel<typeof ProcessedGitHubTimeSeries>[] =
    range && target
      ? mapJoinData(
          ProcessedGitHubTimeSeries,
          {},
          // @ts-ignore
          await querySet.where(...conditions),
        )
      : [];

  return (
    <Stack>
      <SearchBarControl range={range} target={target} relations={relations} />
      <Paper shadow="xs" p="sm">
        <Group align={"center"}>
          {[...analyzeTimeSeries(timeSeriesSet)].map((badge, idx) => (
            <div key={idx}>{badge}</div>
          ))}
        </Group>
      </Paper>
      <Stack>
        <ApexWeekTimeHeatMap timeSeries={timeSeriesSet} />
        <SegmentControl segment={segment ? parseInt(segment) : 0} />
        <TimeSeriesTable timeSeries={timeSeriesSet} />
      </Stack>
    </Stack>
  );
}
