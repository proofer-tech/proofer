import moment from "moment/moment";
import {
  GitHubPullRequest,
  GitHubPullRequestReview,
  GitHubRepository,
} from "@/database/schemas/github";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { Octokit } from "octokit";
import {
  findPullRequest,
  findRepository,
  getLastPullRequest,
} from "@/src/data/github";

const serializePullRequests = (
  repoId: number,
  data: any,
): InferInsertModel<typeof GitHubPullRequest> => ({
  repository_id: repoId,
  pull_request_id: data.id,
  number: data.number,
  state: data.state,
  title: data.title,
  body: data.body,
  html_url: data.html_url,
  created_at: moment(data.created_at).toDate(),
  updated_at: data.updated_at && moment(data.updated_at).toDate(),
  closed_at: data.closed_at && moment(data.closed_at).toDate(),
  merged_at: data.merged_at && moment(data.merged_at).toDate(),
  user_id: data.user.id,
  assignee_id: data.assignee?.id,
  timestamp: moment(data.created_at).toDate(),
});

interface extractAllPullRequestsOptions {
  repositories: InferSelectModel<typeof GitHubRepository>[];
  bundle?: boolean;
}

export async function* extractAllPullRequests(
  octokit: Octokit,
  options: extractAllPullRequestsOptions,
) {
  for (const repo of options.repositories) {
    const [ownerName, repoName] = repo.full_name.split("/");
    const lastPullRequest = await getLastPullRequest(repo.id);

    let page = 1;
    do {
      const response = await octokit.rest.pulls.list({
        owner: ownerName,
        repo: repoName,
        state: "all",
        sort: "created",
        direction: "desc",
        per_page: 100,
        page: page,
      });
      if (response.data.length === 0) break;

      const pullRequests = [];
      for (const pr of response.data) {
        if (lastPullRequest && pr.id === lastPullRequest.pull_request_id) {
          break;
        }

        if (options?.bundle) {
          pullRequests.push(pr);
        } else yield serializePullRequests(repo.id, pr);
      }
      if (options?.bundle) yield pullRequests;
    } while (page++);
  }
}

const serializePullRequestReviews = (
  pull_request_id: number,
  data: any,
): InferInsertModel<typeof GitHubPullRequestReview> => ({
  review_id: data.id,
  pull_request_id: pull_request_id,
  html_url: data.html_url,
  state: data.state,
  user_id: data.user.id,
  updated_at: moment(data.updated_at).toDate(),
  created_at: moment(data.created_at).toDate(),
  body: data.body,
  timestamp: moment(data.created_at).toDate(),
});

interface extractAllPullRequestReviewsOptions {
  pullRequestIds: number[];
  bundle?: boolean;
}

export async function* extractAllPullRequestReviews(
  octokit: Octokit,
  options: extractAllPullRequestReviewsOptions,
) {
  for (const pullRequestId of options.pullRequestIds) {
    const pullRequest = await findPullRequest(pullRequestId);
    const repository = await findRepository(pullRequest.repository_id);
    const [ownerName, repoName] = repository.full_name.split("/");

    let page = 1;
  }
}
