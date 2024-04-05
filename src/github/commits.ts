import { Octokit, RequestError } from "octokit";
import { GitHubCommit } from "@/database/schemas/github/raw";
import { InferInsertModel } from "drizzle-orm";
import dayjs from "@/src/utils/dayjs";

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

    created_at: dayjs(data.commit.author.date).toDate(),
    updated_at: dayjs(data.commit.committer.date).toDate(),

    timestamp: dayjs(data.commit.author.date).toDate(),
  };
}
interface extractAllCommitsOptions {
  repository: any;
  sha?: string;
}
export async function* extractAllCommits(
  octokit: Octokit,
  { repository, sha }: extractAllCommitsOptions,
) {
  const [ownerName, repoName] = repository.full_name.split("/");

  try {
    const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
      owner: ownerName,
      repo: repoName,
      per_page: 100,
      sha: sha,
    });
    for (const commit of commits) yield serializeCommit(repository.id, commit);
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
}
