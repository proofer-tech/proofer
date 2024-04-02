import { NextRequest, NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";
import { getAllRepositories } from "@/src/data/github";
import {
  extractAllPullRequestReviewComments,
  extractAllPullRequestReviews,
  extractAllPullRequests,
} from "@/src/github/pulls";
import { dz } from "@/database/engine";
import {
  GitHubCommit,
  GitHubIssue,
  GitHubPullRequest,
  GitHubPullRequestReview,
  GitHubPullRequestReviewComment,
  GitHubUser,
} from "@/database/schemas/github/raw";
import { getUser } from "@/src/github/users";
import { extractAllCommits } from "@/src/github/commits";
import { extractAllBranches } from "@/src/github/branches";
import { Octokit } from "octokit";
import { extractAllIssues } from "@/src/github/issues";
import fromAsync from "array-from-async";
import { NotFound } from "http-errors";

const catchFKUserNotFound = async (octokit: Octokit, e: any) => {
  if (e.code !== "23503") return e;
  const userIdExp = new RegExp(/=\((\d+)\)/);
  const userId = userIdExp.exec(e.detail)?.[1];

  if (!userId) return e;
  await addUser(octokit, parseInt(userId));
};

async function addUser(octokit: Octokit, user_id: number) {
  const user = await getUser(octokit, user_id);
  if (user !== null)
    return dz.insert(GitHubUser).values(user).onConflictDoNothing();
  throw NotFound(`User with id ${user_id} not found`);
}

export const GET = async (_: NextRequest, { params }: any) => {
  const { installationId } = params;
  const octokit = await GitHubApp.getInstallationOctokit(installationId);
  const repositories = await getAllRepositories(installationId);

  const responseList: any[] = [];
  for (const repo of repositories) {
    const pulls = await fromAsync<typeof extractAllPullRequests>(
      extractAllPullRequests(octokit, {
        repositories: [repo],
      }),
    );
    if (pulls.length > 0) {
      let insertPrFlag = true;
      while (insertPrFlag) {
        await dz
          .insert(GitHubPullRequest)
          .values(pulls)
          .onConflictDoNothing()
          .then((r) => {
            insertPrFlag = false;
            return r;
          })
          .catch(async (e) => await catchFKUserNotFound(octokit, e));
      }
    }

    for (const pull of pulls) {
      const reviews = await fromAsync<typeof extractAllPullRequestReviews>(
        extractAllPullRequestReviews(
          octokit,
          repo,
          pull.pull_request_id,
          pull.number,
        ),
      );
      if (reviews.length > 0)
        await dz
          .insert(GitHubPullRequestReview)
          .values(reviews)
          .onConflictDoNothing();

      const comments = await fromAsync<
        typeof extractAllPullRequestReviewComments
      >(extractAllPullRequestReviewComments(octokit, repo, pull.number));
      if (comments.length > 0)
        await dz
          .insert(GitHubPullRequestReviewComment)
          .values(comments)
          .onConflictDoNothing();
    }

    const issues = await fromAsync<typeof extractAllIssues>(
      extractAllIssues(octokit, repo),
    );
    if (issues.length > 0)
      await dz.insert(GitHubIssue).values(issues).onConflictDoNothing();

    for await (const branch of extractAllBranches(octokit, repo)) {
      const commits = await fromAsync<typeof extractAllCommits>(
        extractAllCommits(octokit, {
          repositories: repositories,
          sha: branch.name,
        }),
      );
      if (commits.length > 0) {
        let insertCommitsFlag = true;
        while (insertCommitsFlag) {
          await dz
            .insert(GitHubCommit)
            .values(commits)
            .onConflictDoNothing()
            .then((r) => {
              insertCommitsFlag = false;
              return r;
            })
            .catch(async (e) => await catchFKUserNotFound(octokit, e));
        }
      }
    }
  }

  return NextResponse.json(responseList);
};
