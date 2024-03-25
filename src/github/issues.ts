import { Octokit } from "octokit";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  GitHubRepository,
  GitHubIssue,
  GitHubUser,
} from "@/database/schemas/github";
import moment from "moment";

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
    created_at: moment(data.created_at).toDate(),
    updated_at: moment(data.updated_at).toDate(),
    closed_at: data.closed_at && moment(data.closed_at).toDate(),
    timestamp: moment(data.created_at).toDate(),
  };
}

export async function* extractAllIssues(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
) {
  const [owner, repoName] = repo.full_name.split("/");
  const issues = await octokit
    .paginate(
      octokit.rest.issues.listForRepo.endpoint.merge({
        owner: owner,
        state: "all",
        repo: repoName,
      }),
    )
    .then((issues) => {
      return issues.map((issue) => serializeGitHubIssue(repo.id, issue));
    });
  for (const issue of issues) {
    yield issue;
  }
}
