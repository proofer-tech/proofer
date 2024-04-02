import moment from "moment/moment";
import {
  GitHubPullRequest,
  GitHubPullRequestReview,
  GitHubPullRequestReviewComment,
  GitHubRepository,
} from "@/database/schemas/github/raw";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { Octokit, RequestError } from "octokit";

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
  merge_commit_sha: data.merge_commit_sha,
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
    try {
      const pulls = await octokit.paginate(octokit.rest.pulls.list, {
        owner: ownerName,
        repo: repoName,
        state: "all",
        sort: "created",
        direction: "desc",
        per_page: 100,
      });
      for (const pull of pulls) yield serializePullRequests(repo.id, pull);
    } catch (e) {
      if (!(e instanceof RequestError && e.status === 404)) throw e;
    }
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

export async function* extractAllPullRequestReviews(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
  pull_request_id: number,
  pullNumber: number,
) {
  const [ownerName, repoName] = repo.full_name.split("/");

  try {
    const reviews = await octokit.paginate(
      octokit.rest.pulls.listReviews.endpoint.merge({
        owner: ownerName,
        repo: repoName,
        pull_number: pullNumber,
        per_page: 100,
      }),
    );
    for (const review of reviews)
      yield serializePullRequestReviews(pull_request_id, review);
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
}

const serializePullRequestReviewComments = (
  data: any,
): InferInsertModel<typeof GitHubPullRequestReviewComment> => {
  return {
    review_comment_id: data.id,
    pull_request_review_id: data.pull_request_review_id,
    user_id: data.user.id,
    body: data.body,
    html_url: data.html_url,
    created_at: moment(data.created_at).toDate(),
    updated_at: moment(data.updated_at).toDate(),
    timestamp: moment(data.created_at).toDate(),
  };
};
export async function* extractAllPullRequestReviewComments(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
  pullNumber: number,
) {
  const [ownerName, repoName] = repo.full_name.split("/");
  try {
    const comments = await octokit.paginate(
      octokit.rest.pulls.listReviewComments.endpoint.merge({
        owner: ownerName,
        repo: repoName,
        pull_number: pullNumber,
        per_page: 100,
      }),
    );
    for (const comment of comments)
      yield serializePullRequestReviewComments(comment);
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
}
