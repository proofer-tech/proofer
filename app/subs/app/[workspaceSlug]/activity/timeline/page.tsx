import React from "react";
import { SegmentedControl, Stack } from "@mantine/core";
import { ApexTimeline } from "@/app/subs/app/[workspaceSlug]/activity/timeline/ApexTimeline";
import { ActivityTable } from "@/app/subs/app/[workspaceSlug]/activity/ActivityTable";
import SearchBarControl from "@/src/modules/SearchBarControl/SearchBarControl";
import { dz } from "@/database/engine";
import {
  Workspace,
  WorkspaceMember,
  WorkspaceMemberEmail,
} from "@/database/schemas/workspace";
import { and, eq, gte, InferSelectModel, lt, or, SQL } from "drizzle-orm";
import { isString } from "lodash";
import dayjs, { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { PageProps } from "@/src/types/general";
import SegmentControl from "@/src/modules/SegmentControl/SegmentControl";
import { TimeSeriesTable } from "@/src/modules/TimeSeriesTable";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { mapJoinData } from "@/src/utils/drizzle";
import { GitHubUser } from "@/database/schemas/github/raw";

export default async function Page({ params, searchParams }: PageProps) {
  const { workspaceSlug } = params;
  const workspace = (
    await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
  )[0];

  let { range, segment, target, relations } = searchParams;
  relations = isString(relations) ? [relations] : relations || [];

  if (!range) {
    const today = new Date();
    range = [
      startOfWeek(dayjs(today).subtract(4, "weeks").toDate()).toISOString(),
      endOfWeek(today).toISOString(),
    ];
  }
  const [start, end] = range;
  const querySet = dz
    .select()
    .from(ProcessedGitHubTimeSeries)
    .innerJoin(
      GitHubUser,
      eq(ProcessedGitHubTimeSeries.user_id, GitHubUser.user_id),
    )
    .innerJoin(
      WorkspaceMemberEmail,
      eq(GitHubUser.email, WorkspaceMemberEmail.email),
    )
    .innerJoin(
      WorkspaceMember,
      eq(WorkspaceMemberEmail.workspace_member_id, WorkspaceMember.id),
    )
    .orderBy(ProcessedGitHubTimeSeries.timestamp);

  const conditions: SQL<any>[] = [];
  const andConditions: SQL<any>[] = [
    eq(ProcessedGitHubTimeSeries.workspace_id, workspace.id),
    gte(ProcessedGitHubTimeSeries.timestamp, dayjs(start).toDate()),
    lt(ProcessedGitHubTimeSeries.timestamp, dayjs(end).toDate()),
  ];
  const orConditions: SQL<any>[] = [];

  if (orConditions.length === 1) andConditions.push(orConditions[0]);
  else andConditions.push(or(...orConditions) as SQL);
  conditions.push(and(...andConditions) as SQL);

  // @ts-ignore
  const timeSeriesSet: InferSelectModel<typeof ProcessedGitHubTimeSeries>[] =
    mapJoinData(
      ProcessedGitHubTimeSeries,
      { one: [WorkspaceMember] },
      // @ts-ignore
      await querySet.where(...conditions),
    );

  return (
    <Stack>
      <SearchBarControl range={range} target={target} relations={relations} />
      <ApexTimeline timeSeries={timeSeriesSet} />
      <SegmentControl segment={segment ? parseInt(segment) : 0} />
      <TimeSeriesTable timeSeries={timeSeriesSet} />
    </Stack>
  );
}
