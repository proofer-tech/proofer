import { withCommand } from "@/src/decorators/api";
import { dz } from "@/database/engine";
import {
  GitHubPullRequest,
  GitHubPullRequestReview,
  GitHubPullRequestReviewComment,
  GitHubRepository,
} from "@/database/schemas/github/raw";
import { eq, InferSelectModel } from "drizzle-orm";
import fromAsync from "array-from-async";
import { BadRequest, NotFound } from "http-errors";
import { GitHubApp } from "@/src/integrations/github";
import { catchFKUserReferenceError } from "@/src/github/users";
import {
  extractAllPullRequestReviewComments,
  extractAllPullRequestReviews,
  extractAllPullRequests,
} from "@/src/github/pulls";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";
import { withUserSafe } from "@/src/decorators/github";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { GitHubEvent } from "@/src/github/types";
import { getWorkspaceIdFromInstallationId } from "@/src/data/github";

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
  const pulls: InferSelectModel<typeof GitHubPullRequest>[] =
    (await fromAsync<typeof extractAllPullRequests>(
      extractAllPullRequests(octokit, {
        repository: repository,
      }),
    ).then(async (pulls) => {
      if (pulls.length === 0) return [];
      return withUserSafe(
        dz
          .insert(GitHubPullRequest)
          .values(pulls)
          .onConflictDoUpdate({
            target: GitHubPullRequest.pull_request_id,
            set: conflictUpdateSetAllColumns(GitHubPullRequest),
          })
          .returning(),
        { octokit },
      );
    })) || [];

  await withUserSafe(
    dz
      .insert(ProcessedGitHubTimeSeries)
      .values(
        pulls.map((pull) => ({
          workspace_id: workspace_id,
          event: GitHubEvent["pull_request.opened"],
          reference_id: pull.pull_request_id.toString(),
          repository_id: repository.id,
          installation_id: repository.installation_id,
          user_id: pull.user_id,
          timestamp: pull.timestamp,
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

  await Promise.all(
    pulls.map((pull: any) =>
      fromAsync<typeof extractAllPullRequestReviews>(
        extractAllPullRequestReviews(
          octokit,
          repository,
          pull.pull_request_id,
          pull.number,
        ),
      ).then(async (reviews) => {
        if (reviews.length === 0) return [];

        await withUserSafe(
          dz
            .insert(GitHubPullRequestReview)
            .values(reviews)
            .onConflictDoUpdate({
              target: GitHubPullRequestReview.review_id,
              set: conflictUpdateSetAllColumns(GitHubPullRequestReview),
            }),
          { octokit },
        );

        await withUserSafe(
          dz
            .insert(ProcessedGitHubTimeSeries)
            .values(
              reviews.map((review) => ({
                workspace_id: workspace_id,
                event: GitHubEvent["pull_request_review.submitted"],
                reference_id: review.review_id.toString(),
                repository_id: repository.id,
                installation_id: repository.installation_id,
                user_id: review.user_id,
                timestamp: review.timestamp,
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

        await fromAsync<typeof extractAllPullRequestReviewComments>(
          extractAllPullRequestReviewComments(octokit, repository, pull.number),
        ).then(async (comments) => {
          if (comments.length === 0) return [];
          await withUserSafe(
            dz
              .insert(GitHubPullRequestReviewComment)
              .values(comments)
              .onConflictDoUpdate({
                target: GitHubPullRequestReviewComment.review_comment_id,
                set: conflictUpdateSetAllColumns(
                  GitHubPullRequestReviewComment,
                ),
              }),
            { octokit },
          );

          await withUserSafe(
            dz
              .insert(ProcessedGitHubTimeSeries)
              .values(
                comments.map((comment) => ({
                  workspace_id: workspace_id,
                  event: GitHubEvent["pull_request_review_comment.created"],
                  reference_id: comment.review_comment_id.toString(),
                  repository_id: repository.id,
                  installation_id: repository.installation_id,
                  user_id: comment.user_id,
                  timestamp: comment.timestamp,
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
        });
      }),
    ),
  );
});
