import { Paper, Stack, Title } from "@mantine/core";
import React from "react";
import CycleTimeAverage from "@/app/subs/app/[workspaceSlug]/activity/cycle-time/CycleTimeAverage";
import { SearchBarContainer } from "@/src/modules/SearchBarControl/SearchBarContainer";
import { CycleTimeBreakdown } from "@/app/subs/app/[workspaceSlug]/activity/cycle-time/CycleTimeBreakdown";
import CycleTimeTable from "@/app/subs/app/[workspaceSlug]/activity/cycle-time/CycleTimeTable";
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
import {
  ProcessedGitHubPullRequest,
  ProcessedGitHubTimeSeries,
} from "@/database/schemas/github/processed";
import { GitHubPullRequest, GitHubUser } from "@/database/schemas/github/raw";
import dayjs from "@/src/utils/dayjs";
import { GitHubSegment } from "@/src/modules/SegmentControl/types";
import { GitHubEvent } from "@/src/github/types";
import { mapJoinData } from "@/src/utils/drizzle";
import { PageProps } from "@/src/types/general";

export default async function Page({ params, searchParams }: PageProps) {
  const { workspaceSlug } = params;
  const workspace = (
    await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
  )[0];

  let { range, target, relations } = searchParams;
  relations = isString(relations) ? [relations] : relations || [];
  const querySet = dz
    .select()
    .from(ProcessedGitHubPullRequest)
    .innerJoin(
      GitHubPullRequest,
      eq(
        ProcessedGitHubPullRequest.pull_request_id,
        GitHubPullRequest.pull_request_id,
      ),
    )
    .innerJoin(GitHubUser, eq(GitHubPullRequest.user_id, GitHubUser.user_id))
    .innerJoin(
      WorkspaceMemberEmail,
      eq(GitHubUser.email, WorkspaceMemberEmail.email),
    )
    .innerJoin(
      WorkspaceMember,
      eq(WorkspaceMemberEmail.workspace_member_id, WorkspaceMember.id),
    )
    .orderBy(GitHubPullRequest.timestamp);

  const conditions: SQL<any>[] = [];
  const andConditions: SQL<any>[] = [
    eq(WorkspaceMemberEmail.workspace_id, workspace.id),
  ];
  const orConditions: SQL<any>[] = [];
  if (range) {
    const [start, end] = range;
    andConditions.push(
      gte(
        GitHubPullRequest.timestamp,
        dayjs(start).set("hour", 0).set("minute", 0).set("second", 0).toDate(),
      ),
      lt(
        GitHubPullRequest.timestamp,
        dayjs(end).set("hour", 23).set("minute", 59).set("second", 59).toDate(),
      ),
    );
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
  const pullRequests: InferSelectModel<typeof ProcessedGitHubPullRequest>[] =
    range && target
      ? mapJoinData(
          ProcessedGitHubPullRequest,
          { one: [WorkspaceMember] },
          // @ts-ignore
          await querySet.where(...conditions),
        )
      : [];
  return (
    <Stack>
      <SearchBarControl range={range} target={target} relations={relations} />
      <Stack>
        <Paper shadow="xs" p={"xl"}>
          <Stack>
            <CycleTimeAverage pullRequests={pullRequests} />
          </Stack>
        </Paper>
        <Paper shadow="xs" px={"xl"} py={"lg"}>
          <Stack gap={"2em"}>
            <Title order={5}>Average cycle time by PR</Title>
            <CycleTimeBreakdown pullRequests={pullRequests} />
          </Stack>
        </Paper>
        <Paper shadow={"xs"}>
          <CycleTimeTable pullRequests={pullRequests} />
        </Paper>
      </Stack>
    </Stack>
  );
}
