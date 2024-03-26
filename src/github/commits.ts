import { Octokit } from "octokit";
import { GitHubCommit } from "@/database/schemas/github";
import { InferInsertModel } from "drizzle-orm";
import moment from "moment";

function serializeCommit(
  repo_id: number,
  data: any,
): InferInsertModel<typeof GitHubCommit> {
  return {
    repository_id: repo_id,

    sha: data.sha,
    author_id: data.author?.id,
    committer_id: data.committer?.id,
    message: data.commit.message,

    created_at: moment(data.created_at).toDate(),
    updated_at: moment(data.updated_at).toDate(),

    timestamp: moment(data.created_at).toDate(),
  };
}
interface extractAllCommitsOptions {
  repositories: any;
  sha?: string;
  bundle?: boolean;
}
export async function* extractAllCommits(
  octokit: Octokit,
  options: extractAllCommitsOptions,
) {
  for (const repo of options.repositories) {
    const [ownerName, repoName] = repo.full_name.split("/");

    let page = 1;
    do {
      const response = await octokit.rest.repos.listCommits({
        owner: ownerName,
        repo: repoName,
        per_page: 100,
        page: page,
        sha: options.sha,
      });
      if (response.data.length === 0) break;

      const commits = response.data.map((commit) =>
        serializeCommit(repo.id, commit),
      );
      for (const commit of commits) {
        if (!options?.bundle) yield commit;
      }
      if (options?.bundle) yield commits;
    } while (page++);
  }
}
