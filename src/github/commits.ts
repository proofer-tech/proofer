import { Octokit, RequestError } from "octokit";
import { GitHubCommit } from "@/database/schemas/github/raw";
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
}
export async function* extractAllCommits(
  octokit: Octokit,
  options: extractAllCommitsOptions,
) {
  for (const repo of options.repositories) {
    const [ownerName, repoName] = repo.full_name.split("/");

    try {
      const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
        owner: ownerName,
        repo: repoName,
        per_page: 100,
        sha: options.sha,
      });
      for (const commit of commits) yield serializeCommit(repo.id, commit);
    } catch (e) {
      if (!(e instanceof RequestError && e.status === 404)) throw e;
    }
  }
}
