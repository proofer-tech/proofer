import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  GitHubPullRequest,
  GitHubRepository,
} from "@/database/schemas/github/raw";
import { Octokit } from "octokit";

export async function getPullRequestCycleTime(
  octokit: Octokit,
  repository: InferSelectModel<typeof GitHubRepository>,
  pull: InferInsertModel<typeof GitHubPullRequest>,
) {
  const [owner, repo] = repository.full_name.split("/");

  try {
    const pullRequestCommits = await octokit.paginate(
      octokit.rest.pulls.listCommits,
      {
        owner: owner,
        repo: repo,
        pull_number: pull.number,
      },
    );
    const pullRequestReviews = await octokit.paginate(
      octokit.rest.pulls.listReviews,
      {
        owner: owner,
        repo: repo,
        pull_number: pull.number,
      },
    );
    const pullRequestIssueComments = await octokit.paginate(
      octokit.rest.issues.listComments,
      {
        owner: owner,
        repo: repo,
        issue_number: pull.number,
      },
    );

    if (
      (pull.merged_at && pullRequestReviews.length > 0) ||
      (pullRequestIssueComments.length > 0 && pullRequestCommits.length > 0)
    ) {
      const reviewDateStrings = pullRequestReviews
        .map((r) => r.submitted_at)
        .concat(
          pullRequestIssueComments
            .filter((c) => c.user?.type !== "Bot")
            .map((c) => c.created_at),
        )
        .filter((i) => i && new Date(i).getTime() < pull.merged_at!.getTime())
        .sort((a, b) => new Date(a!).getTime() - new Date(b!).getTime());
      const firstCommitStr = pullRequestCommits[0].commit.author?.date;
      const firstReviewStr = reviewDateStrings[0];
      const lastReviewStr = reviewDateStrings.findLast(() => true);

      if (!firstCommitStr || !firstReviewStr || !lastReviewStr) {
        throw new Error("Invalid dates");
      }

      const firstCommitAt = new Date(firstCommitStr);
      const firstReviewAt = new Date(firstReviewStr);
      const lastReviewAt = new Date(lastReviewStr);

      const codingTime = pull.created_at!.getTime() - firstCommitAt.getTime();
      const pickupTime = firstReviewAt.getTime() - pull.created_at!.getTime();
      const reviewTime = lastReviewAt.getTime() - firstReviewAt.getTime();
      const deployTime = pull.merged_at!.getTime() - lastReviewAt.getTime();

      return {
        codingTime,
        pickupTime,
        reviewTime,
        deployTime,
      };
    } else {
      throw new Error(
        "Pull request is not merged yet, has no reviews, or has no commits.",
      );
    }
  } catch (e) {
    return null;
  }
}
