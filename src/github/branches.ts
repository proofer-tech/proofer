import { Octokit, RequestError } from "octokit";
import { InferSelectModel } from "drizzle-orm";
import { GitHubRepository } from "@/database/schemas/github/raw";

export async function* extractAllBranches(
  octokit: Octokit,
  repo: InferSelectModel<typeof GitHubRepository>,
) {
  const [owner, repoName] = repo.full_name.split("/");
  try {
    const branches = await octokit.paginate(octokit.rest.repos.listBranches, {
      owner: owner,
      repo: repoName,
    });
    for (const branch of branches) yield branch;
  } catch (e) {
    if (!(e instanceof RequestError && e.status === 404)) throw e;
  }
}
