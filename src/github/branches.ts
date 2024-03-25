import { Octokit } from "octokit";
import { InferSelectModel } from "drizzle-orm";
import { GitHubRepository } from "@/database/schemas/github";

export async function* extractAllBranches(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
) {
  const [owner, repoName] = repo.full_name.split("/");
  const response = await octokit.rest.repos.listBranches({
    owner: owner,
    repo: repoName,
  });
  for (const branch of response.data) {
    yield branch;
  }
}
