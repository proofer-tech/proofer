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
  const issues: InferSelectModel<typeof GitHubIssue>[] = await fromAsync<
    typeof extractAllIssues
  >(extractAllIssues(octokit, repository)).then(async (issues) => {
    if (issues.length === 0) return;
    return withUserSafe(
      dz
        .insert(GitHubIssue)
        .values(issues)
        .onConflictDoUpdate({
          target: GitHubIssue.issue_id,
          set: conflictUpdateSetAllColumns(GitHubIssue),
        })
        .returning(),
      { octokit },
    );
  });

  await Promise.all(
    issues.map((issue) =>
      fromAsync<typeof extractAllIssueComments>(
        extractAllIssueComments(octokit, repository, issue),
      ).then(async (comments) => {
        if (comments.length === 0) return;
        return withUserSafe(
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
      }),
    ),
  );
});
