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
import { isString } from "lodash";
import dayjs, { endOfWeek, startOfWeek } from "@/src/utils/dayjs";
import { PageProps } from "@/src/types/general";
import SegmentControl from "@/src/modules/SegmentControl/SegmentControl";
import { TimeSeriesTable } from "@/src/modules/TimeSeriesTable";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { mapJoinData } from "@/src/utils/drizzle";
import { GitHubUser } from "@/database/schemas/github/raw";
import { GitHubSegment } from "@/src/modules/SegmentControl/types";
import { GitHubEvent } from "@/src/github/types";

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
    mapJoinData(
      ProcessedGitHubTimeSeries,
      { one: [WorkspaceMember] },
      // @ts-ignore
      await querySet.where(...conditions),
    );

  return (
    <Stack>
      <SearchBarControl range={range} target={target} relations={relations} />
      <ApexTimeline
        timeSeries={timeSeriesSet}
        segment={segment ? parseInt(segment) : 0}
        range={range}
      />
      <SegmentControl segment={segment ? parseInt(segment) : 0} />
      <TimeSeriesTable timeSeries={timeSeriesSet} />
    </Stack>
  );
}
