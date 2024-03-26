import { NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";
import { pick } from "lodash";
import { db } from "@/database/engine";
import {
  GitHubInstallation,
  GitHubRepository,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github";
import { and, eq } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiWorkspaceUserRequired } from "@/app/subs/app/[workspaceSlug]/api/base";
import moment from "moment";
import { notFound } from "next/navigation";

interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  visibility: string;
}

export interface Installation {
  target_type: string;
  repository_selection: string;
  avatar_url: string;
  name: string;
  bio: string;
  blog: string;
  repositories: Repository[];
}
export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { params, workspace }: any) => {
    const { installationId } = params;
    const row = (
      await db
        .select()
        .from(GitHubInstallation)
        .where(eq(GitHubInstallation.installation_id, installationId))
        .innerJoin(
          WorkspaceToGitHubInstallation,
          and(
            eq(WorkspaceToGitHubInstallation.workspace_id, workspace.id),
            eq(WorkspaceToGitHubInstallation.installation_id, installationId),
          ),
        )
    )[0];
    if (!row) return notFound();

    let installation = row.github_installation;
    if (installation.updated_at < moment().subtract(1, "hours").toDate()) {
      const octokit = await GitHubApp.getInstallationOctokit(installationId);
      const installationResponse = await octokit.rest.apps.getInstallation({
        installation_id: installationId,
      });
      const accountResponse = await octokit.rest.users.getByUsername({
        username: installationResponse.data.account?.name!,
      });
      installation = (
        await db
          .update(GitHubInstallation)
          .set(
            Object.assign(
              { updated_at: new Date() },
              pick(installationResponse.data, [
                "target_type",
                "repository_selection",
              ]),
              pick(accountResponse.data as {}, [
                "avatar_url",
                "name",
                "bio",
                "blog",
              ]),
            ),
          )
          .where(eq(GitHubInstallation.installation_id, installationId))
          .returning()
      )[0];
    }

    const repositories = await db
      .select()
      .from(GitHubRepository)
      .where(eq(GitHubRepository.installation_id, installationId));

    return NextResponse.json(Object.assign(installation, { repositories }));
  }),
);
export const DELETE = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { params }: any) => {
    const { workspaceSlug, installationId } = params;
    try {
      await GitHubApp.octokit.rest.apps.deleteInstallation({
        installation_id: installationId,
      });
    } catch (e) {
      if (e.status !== 404) throw e;
    }

    await db.transaction(async (db) => {
      const { workspace_to_github_installation } = (
        await db
          .select()
          .from(WorkspaceToGitHubInstallation)
          .innerJoin(
            Workspace,
            eq(WorkspaceToGitHubInstallation.workspace_id, Workspace.id),
          )
          .where(
            and(
              eq(WorkspaceToGitHubInstallation.installation_id, installationId),
              eq(Workspace.slug, workspaceSlug),
            ),
          )
      )[0];
      if (!workspace_to_github_installation) return notFound();
      await db
        .delete(WorkspaceToGitHubInstallation)
        .where(
          eq(
            WorkspaceToGitHubInstallation.uuid,
            workspace_to_github_installation.uuid,
          ),
        );
      await db
        .delete(GitHubInstallation)
        .where(eq(GitHubInstallation.installation_id, installationId));
    });
    return new Response(null, { status: 204 });
  }),
);
