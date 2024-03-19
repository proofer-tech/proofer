import { db } from "@/database/engine";
import {
  GitHubInstallation,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github";
import { eq } from "drizzle-orm";
import { generateAppPath } from "@/src/path";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { GitHubApp } from "@/src/integrations/github";
import { pick } from "lodash";

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

  for await (const { installation } of GitHubApp.eachInstallation.iterator()) {
    if (installation.id !== installationId) continue;
    if (installation.account === null) throw Error();
    const account = await fetch(installation.account.url).then((r) => r.json());

    await db.insert(GitHubInstallation).values({
      installation_id: installation.id,
      updated_at: new Date(),
      ...pick(installation, ["target_type", "repository_selection"]),
      ...pick(account, ["avatar_url", "name", "bio", "blog"]),
    });
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
