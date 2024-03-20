import { db } from "@/database/engine";
import {
  GitHubInstallation,
  GitHubRepository,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github";
import { eq, InferSelectModel } from "drizzle-orm";
import { generateAppPath } from "@/src/path";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { GitHubApp } from "@/src/integrations/github";
import { pick } from "lodash";
import { integer, text, timestamp, varchar } from "drizzle-orm/pg-core/index";
import { undefined } from "zod";
import moment from "moment";

export default async function GitHubSetupPage({ params, searchParams }: any) {
  const headerList = headers();
  const installationId = parseInt(searchParams.installation_id);
  const installationUUID = searchParams.state;
  const bridge = (
    await db
      .update(WorkspaceToGitHubInstallation)
      .set({ installation_id: installationId })
      .where(eq(WorkspaceToGitHubInstallation.uuid, installationUUID))
      .returning()
  )[0];
  if (!bridge) return;

  for await (const {
    octokit,
    installation,
  } of GitHubApp.eachInstallation.iterator()) {
    if (installation.id !== installationId) continue;
    if (installation.account === null) throw Error();
    const accountResponse = await octokit.rest.users.getByUsername({
      username: installation.account.login,
    });

    await db
      .insert(GitHubInstallation)
      .values({
        installation_id: installation.id,
        ...pick(installation, ["target_type", "repository_selection"]),
        ...pick(accountResponse.data, ["avatar_url", "name", "bio", "blog"]),
      } as InferSelectModel<typeof GitHubInstallation>)
      .onConflictDoNothing({ target: GitHubInstallation.installation_id });
    const repos = await octokit.rest.apps.listReposAccessibleToInstallation();

    for (const repo of repos.data.repositories) {
      await db.insert(GitHubRepository).values({
        installation_id: installation.id,
        repository_id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        visibility: repo.visibility,
        created_at: moment(repo.created_at!).toDate(),
        updated_at: moment(repo.updated_at!).toDate(),
      });
    }
  }

  const appPath = generateAppPath(
    `/${params["workspace-slug"]}/integrations/github/${installationId}`,
  );
  const setupURL = new URL(
    headerList.get("X-Forwarded-Proto") +
      "://" +
      headerList.get("host") +
      appPath,
  );

  return redirect(setupURL.toString());
}
