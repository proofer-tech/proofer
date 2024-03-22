import moment from "moment/moment";
import { GitHubRepository } from "@/database/schemas/github";
import { InferSelectModel } from "drizzle-orm";
import { Octokit } from "octokit";

const serializeCommits = (repoId: number, data: any) => ({
  repository_id: repoId,

  sha: data.sha,
  message: data.commit.message,
  author_name: data.commit.author?.name,
  author_email: data.commit.author?.email,
  author_id: data.author?.id,
  committer_id: data.committer?.id,
  created_at: moment(data.commit.author?.date!).toDate(),
  updated_at: moment(data.commit.committer?.date!).toDate(),
  timestamp: moment(data.commit.author?.date!).toDate(),
});
interface extractAllCommitsOptions {
  since?: Date;
  until?: Date;
  repositories: InferSelectModel<typeof GitHubRepository>[];
  bundle?: boolean;
}
export async function* extractAllCommits(
  octokit: Octokit,
  options: extractAllCommitsOptions,
) {
  const since = options.since || moment("1996-05-20").toDate();
  const until = options.until || new Date();

  for (const repo of options.repositories) {
    const [ownerName, repoName] = repo.full_name.split("/");
    yield await octokit.paginate(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: ownerName,
        repo: repoName,
        per_page: 100,
        since: since.toISOString(),
        until: until.toISOString(),
      },
      (response) => {
        const commits = response.data.map((data) =>
          serializeCommits(repo.id, data),
        );
        return options?.bundle ? [commits] : commits;
      },
    );
  }
}
