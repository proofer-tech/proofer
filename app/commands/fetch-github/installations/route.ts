import { withCommand } from "@/src/decorators/api";
import { GitHubApp } from "@/src/integrations/github";
import { dz } from "@/database/engine";
import {
  GitHubInstallation,
  GitHubRepository,
} from "@/database/schemas/github/raw";
import { InferSelectModel } from "drizzle-orm";
import { conflictUpdateSetAllColumns } from "@/src/utils/drizzle";
import dayjs from "@/src/utils/dayjs";
import { flatten, pick } from "lodash";
import { bookCommand } from "@/src/propagation";
import { BadRequest } from "http-errors";

export const GET = withCommand(async function (req, { command }) {
  const installation_id = req.nextUrl.searchParams.get("installation_id");
  if (!installation_id) throw BadRequest("installation_id is required");

  const installationId = parseInt(installation_id);
  const octokit = await GitHubApp.getInstallationOctokit(installationId);
  const response = await octokit.rest.apps.getInstallation({
    installation_id: installationId,
  });
  const installation = response.data;

  if (installation.account === null)
    throw Error("installation account is null");
  const accountResponse = await octokit.rest.users.getByUsername({
    // @ts-ignore
    username: installation.account.login,
  });
  const githubRepositories: any = await octokit.paginate(
    octokit.rest.apps.listReposAccessibleToInstallation,
  );

  await dz
    .insert(GitHubInstallation)
    .values({
      installation_id: installation.id,
      ...pick(installation, ["target_type", "repository_selection"]),
      ...pick(accountResponse.data, ["avatar_url", "name", "bio", "blog"]),
    } as InferSelectModel<typeof GitHubInstallation>)
    .onConflictDoUpdate({
      target: GitHubInstallation.installation_id,
      set: conflictUpdateSetAllColumns(GitHubInstallation),
    });
  if (githubRepositories.length === 0) return;

  const repository_ids = (
    await dz
      .insert(GitHubRepository)
      .values(
        githubRepositories.map((repo: any) => ({
          installation_id: installation.id,
          repository_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          language: repo.language,
          visibility: repo.visibility,
          created_at: dayjs(repo.created_at).toDate(),
          updated_at: dayjs(repo.updated_at).toDate(),
        })),
      )
      .onConflictDoUpdate({
        target: [
          GitHubRepository.installation_id,
          GitHubRepository.repository_id,
        ],
        set: conflictUpdateSetAllColumns(GitHubRepository),
      })
      .returning({ id: GitHubRepository.id })
  ).map((r) => r.id);

  await Promise.all(
    flatten(
      repository_ids.map((repository_id) => [
        bookCommand("fetch-github/pull-requests", {
          parents: command,
          searchParams: new URLSearchParams({
            repository_id: repository_id.toString(),
          }),
        }),
        bookCommand("fetch-github/issues", {
          parents: command,
          searchParams: new URLSearchParams({
            repository_id: repository_id.toString(),
          }),
        }),
        bookCommand("fetch-github/commits", {
          parents: command,
          searchParams: new URLSearchParams({
            repository_id: repository_id.toString(),
          }),
        }),
        bookCommand("fetch-github/cycle-time", {
          parents: command,
          searchParams: new URLSearchParams({
            repository_id: repository_id.toString(),
          }),
        }),
      ]),
    ),
  );
});
