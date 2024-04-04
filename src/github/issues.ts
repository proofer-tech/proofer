import { Octokit, RequestError } from "octokit";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  GitHubIssue,
  GitHubIssueComment,
  GitHubRepository,
} from "@/database/schemas/github/raw";
import moment from "moment";
import dayjs from "../utils/dayjs";

function serializeGitHubIssue(
  repo_id: number,
  data: any,
): InferInsertModel<typeof GitHubIssue> {
  return {
    repository_id: repo_id,
    issue_id: data.id,
    number: data.number,
    state: data.state,
    title: data.title,
    body: data.body,
    html_url: data.html_url,
    user_id: data.user.id,
    assignee_id: data.user.id,
    created_at: dayjs(data.created_at).toDate(),
    updated_at: dayjs(data.updated_at).toDate(),
    closed_at: data.closed_at && moment(data.closed_at).toDate(),
    timestamp: dayjs(data.created_at).toDate(),
  };
}

export async function* extractAllIssues(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
) {
  const [owner, repoName] = repo.full_name.split("/");
  try {
    const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
      owner: owner,
      state: "all",
      repo: repoName,
    });
    for (const issue of issues) yield serializeGitHubIssue(repo.id, issue);
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
}

function serializeGitHubIssueComment(
  issue_id: string,
  data: any,
): InferInsertModel<typeof GitHubIssueComment> {
  return {
    issue_id: issue_id,
    comment_id: data.id,
    body: data.body,
    html_url: data.html_url,
    user_id: data.user.id,
    created_at: dayjs(data.created_at).toDate(),
    updated_at: dayjs(data.updated_at).toDate(),
    timestamp: dayjs(data.created_at).toDate(),
  };
}

export async function* extractAllIssueComments(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
  issue: InferSelectModel<typeof GitHubIssue>,
) {
  const [owner, repoName] = repo.full_name.split("/");
  try {
    const issueComments = await octokit.paginate(
      octokit.rest.issues.listComments,
      {
        owner: owner,
        repo: repoName,
        issue_number: issue.number,
      },
    );
    for (const issueComment of issueComments)
      yield serializeGitHubIssueComment(issue.issue_id, issueComment);
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
}
