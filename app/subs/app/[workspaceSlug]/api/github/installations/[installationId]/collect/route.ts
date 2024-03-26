import { NextRequest, NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";
import { getAllRepositories } from "@/src/data/github";
import {
  extractAllPullRequestReviewComments,
  extractAllPullRequestReviews,
  extractAllPullRequests,
} from "@/src/github/pulls";
import { db } from "@/database/engine";
import {
  GitHubCommit,
  GitHubIssue,
  GitHubPullRequest,
  GitHubPullRequestReview,
  GitHubPullRequestReviewComment,
  GitHubUser,
} from "@/database/schemas/github";
import { extractUser } from "@/src/github/users";
import { extractAllCommits } from "@/src/github/commits";
import { extractAllBranches } from "@/src/github/branches";
import { Octokit } from "octokit";
import { extractAllIssues } from "@/src/github/issues";

const catchFKUserNotFound = async (octokit: Octokit, e: any) => {
  if (e.code !== "23503") return e;
  const userIdExp = new RegExp(/=\((\d+)\)/);
  const userId = userIdExp.exec(e.detail)?.[1];

  if (!userId) return e;
  await addUser(octokit, parseInt(userId));
};

async function addUser(octokit: Octokit, user_id: number) {
  const user = await extractUser(octokit, user_id);
  return db.insert(GitHubUser).values(user).onConflictDoNothing();
}

export const GET = async (_: NextRequest, { params }: any) => {
  const { installationId } = params;
  const octokit = await GitHubApp.getInstallationOctokit(installationId);
  const repositories = await getAllRepositories(installationId);

  const responseList: any[] = [];

  for (const repo of repositories) {
    for await (const pulls of extractAllPullRequests(octokit, {
      repositories: [repo],
      bundle: true,
    })) {
      let whileFlag = true;
      while (whileFlag) {
        await db
          .insert(GitHubPullRequest)
          // @ts-ignore
          .values(pulls)
          .onConflictDoNothing()
          .then((r) => {
            whileFlag = false;
            return r;
          })
          .catch(async (e) => await catchFKUserNotFound(octokit, e));
      }

      // @ts-ignore
      for (const pull of pulls) {
        for await (const review of extractAllPullRequestReviews(
          octokit,
          repo,
          pull.pull_request_id,
          pull.number,
        )) {
          await db
            .insert(GitHubPullRequestReview)
            .values(review)
            .onConflictDoNothing();
        }
        for await (const comment of extractAllPullRequestReviewComments(
          octokit,
          repo,
          pull.number,
        )) {
          await db
            .insert(GitHubPullRequestReviewComment)
            .values(comment)
            .onConflictDoNothing();
        }
      }
    }

    for await (const issue of extractAllIssues(octokit, repo)) {
      await db.insert(GitHubIssue).values(issue).onConflictDoNothing();
    }

    for await (const branch of extractAllBranches(octokit, repo)) {
      for await (const commits of extractAllCommits(octokit, {
        repositories: repositories,
        sha: branch.name,
        bundle: true,
      })) {
        let whileFlag = true;
        while (whileFlag) {
          await db
            .insert(GitHubCommit)
            // @ts-ignore
            .values(commits)
            .onConflictDoNothing()
            .then((r) => {
              whileFlag = false;
              return r;
            })
            .catch(async (e) => await catchFKUserNotFound(octokit, e));
        }
      }
    }
  }

  return NextResponse.json(responseList);
};
