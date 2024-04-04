import { withCommand } from "@/src/decorators/api";
import { dz } from "@/database/engine";
import {
  GitHubCommit,
  GitHubInstallation,
  GitHubRepository,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github/raw";
import { eq, InferSelectModel } from "drizzle-orm";
import fromAsync from "array-from-async";
import { extractAllBranches } from "@/src/github/branches";
import { extractAllCommits } from "@/src/github/commits";
import { BadRequest, NotFound } from "http-errors";
import { GitHubApp } from "@/src/integrations/github";
import { withUserSafe } from "@/src/decorators/github";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { getWorkspaceIdFromInstallationId } from "@/src/data/github";
import { GitHubEvent } from "@/src/github/types";

export const GET = withCommand(async function (req) {
  const repository_id = req.nextUrl.searchParams.get("repository_id");
  if (repository_id === null) throw BadRequest("repository_id is required");
  const repository = (
    await dz
      .select()
      .from(GitHubRepository)
      .where(eq(GitHubRepository.id, parseInt(repository_id)))
  )[0];
  if (!repository)
    throw NotFound(`Repository with id ${repository_id} not found`);
  const workspace_id = await getWorkspaceIdFromInstallationId(
    repository.installation_id,
  );

  const octokit = await GitHubApp.getInstallationOctokit(
    repository.installation_id,
  );
  const branches = await fromAsync<typeof extractAllBranches>(
    extractAllBranches(octokit, repository),
  );
  await Promise.all(
    branches.map((branch) =>
      fromAsync<typeof extractAllCommits>(
        extractAllCommits(octokit, {
          repository: repository,
          sha: branch.name,
        }),
      ).then(async (commits) => {
        if (commits.length === 0) return [];
        await withUserSafe(
          dz
            .insert(GitHubCommit)
            .values(commits)
            .onConflictDoUpdate({
              target: GitHubCommit.sha,
              set: conflictUpdateSetAllColumns(GitHubCommit),
            })
            .returning(),
          { octokit },
        );

        await withUserSafe(
          dz
            .insert(ProcessedGitHubTimeSeries)
            .values(
              commits.map((commit) => ({
                workspace_id: workspace_id,
                event: GitHubEvent.commit,
                reference_id: commit.sha,
                installation_id: repository.installation_id,
                repository_id: repository.id,
                user_id: commit.author_id,
                timestamp: commit.timestamp,
              })),
            )
            .onConflictDoUpdate({
              target: [
                ProcessedGitHubTimeSeries.workspace_id,
                ProcessedGitHubTimeSeries.event,
                ProcessedGitHubTimeSeries.reference_id,
              ],
              set: conflictUpdateSetAllColumns(ProcessedGitHubTimeSeries),
            }),
          { octokit },
        );
        return commits;
      }),
    ),
  );
});
