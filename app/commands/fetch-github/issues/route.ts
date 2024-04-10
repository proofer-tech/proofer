import { withCommand } from "@/src/decorators/api";
import { dz } from "@/database/engine";
import {
  GitHubIssue,
  GitHubIssueComment,
  GitHubRepository,
} from "@/database/schemas/github/raw";
import { eq, InferSelectModel } from "drizzle-orm";
import fromAsync from "array-from-async";
import { BadRequest, NotFound } from "http-errors";
import { GitHubApp } from "@/src/integrations/github";
import { extractAllIssueComments, extractAllIssues } from "@/src/github/issues";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";
import { withUserSafe } from "@/src/decorators/github";
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
  const issuesforInsert = await fromAsync<typeof extractAllIssues>(
    extractAllIssues(octokit, repository),
  );
  if (issuesforInsert.length === 0) return;

  const issues: InferSelectModel<typeof GitHubIssue>[] = await withUserSafe(
    dz
      .insert(GitHubIssue)
      .values(issuesforInsert)
      .onConflictDoUpdate({
        target: GitHubIssue.issue_id,
        set: conflictUpdateSetAllColumns(GitHubIssue),
      })
      .returning(),
    { octokit },
  );

  await withUserSafe(
    dz
      .insert(ProcessedGitHubTimeSeries)
      .values(
        issues.map((issue) => ({
          workspace_id: workspace_id,
          event: GitHubEvent["issues.opened"],
          reference_id: issue.issue_id,
          installation_id: repository.installation_id,
          repository_id: repository.id,
          user_id: issue.user_id,
          timestamp: issue.timestamp,
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
    issues.map((issue) =>
      fromAsync<typeof extractAllIssueComments>(
        extractAllIssueComments(octokit, repository, issue),
      ).then(async (comments) => {
        if (comments.length === 0) return [];
        await withUserSafe(
          dz
            .insert(GitHubIssueComment)
            .values(comments)
            .onConflictDoUpdate({
              target: GitHubIssueComment.comment_id,
              set: conflictUpdateSetAllColumns(GitHubIssueComment),
            })
            .returning(),
          { octokit },
        );

        await withUserSafe(
          dz
            .insert(ProcessedGitHubTimeSeries)
            .values(
              comments.map((comment) => ({
                workspace_id: workspace_id,
                event: GitHubEvent["issue_comment.created"],
                reference_id: comment.comment_id.toString(),
                installation_id: repository.installation_id,
                repository_id: repository.id,
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
      }),
    ),
  );
});
