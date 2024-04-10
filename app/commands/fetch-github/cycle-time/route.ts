import { withCommand } from "@/src/decorators/api";
import { dz } from "@/database/engine";
import { GitHubRepository } from "@/database/schemas/github/raw";
import { eq, InferInsertModel } from "drizzle-orm";
import fromAsync from "array-from-async";
import { BadRequest, NotFound } from "http-errors";
import { GitHubApp } from "@/src/integrations/github";
import { extractAllPullRequests } from "@/src/github/pulls";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";
import { ProcessedGitHubPullRequest } from "@/database/schemas/github/processed";
import { getPullRequestCycleTime } from "@/src/services/cycle-time";

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
  const octokit = await GitHubApp.getInstallationOctokit(
    repository.installation_id,
  );
  const pulls = await fromAsync<typeof extractAllPullRequests>(
    extractAllPullRequests(octokit, {
      repository: repository,
    }),
  );
  const pr_data_list = [];
  for (const pull of pulls) {
    if (!pull.merged_at) continue;
    const cycleTime = await getPullRequestCycleTime(octokit, repository, pull);
    if (!cycleTime) continue;

    pr_data_list.push({
      installation_id: repository.installation_id,
      repository_id: repository.id,
      pull_request_id: pull.pull_request_id,
      pull_number: pull.number,

      title: pull.title,
      html_url: pull.html_url,

      coding_time: cycleTime.codingTime,
      pickup_time: cycleTime.pickupTime,
      review_time: cycleTime.reviewTime,
      deploy_time: cycleTime.deployTime,
    } as InferInsertModel<typeof ProcessedGitHubPullRequest>);
  }
  await dz
    .insert(ProcessedGitHubPullRequest)
    .values(pr_data_list)
    .onConflictDoUpdate({
      target: [ProcessedGitHubPullRequest.pull_request_id],
      set: conflictUpdateSetAllColumns(ProcessedGitHubPullRequest),
    });
});
