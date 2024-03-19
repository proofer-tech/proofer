import { NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";
import { pick } from "lodash";
import { db } from "@/database/engine";
import {
  GitHubInstallation,
  WorkspaceToGitHubInstallation,
} from "@/database/schemas/github";
import { and, eq } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiWorkspaceUserRequired } from "@/app/subs/app/[workspace-slug]/api/base";
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
    const installationId = parseInt(params["installation-id"]);
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
      const installationResponse = await GitHubApp.octokit.request(
        `/app/installations/${installationId}`,
      );
      const accountResponse = await fetch(
        installationResponse.data.account.url,
      );
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
              pick(await accountResponse.json(), [
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

    const repositories = [];
    if (installation.repository_selection === "selected") {
      for await (const { repository } of GitHubApp.eachRepository.iterator({
        installationId: installationId,
      })) {
        repositories.push(
          pick(repository, [
            "name",
            "description",
            "html_url",
            "language",
            "visibility",
          ]),
        );
      }
    }

    return NextResponse.json(Object.assign(installation, { repositories }));
  }),
);
export const DELETE = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { params }: any) => {
    const workspaceSlug = params["workspace-slug"];
    const installationId = parseInt(params["installation-id"]);
    const response = await GitHubApp.octokit.request(
      `DELETE /app/installations/${installationId}`,
    );
    if (response.status !== 204) throw new Error("연동 해제에 실패했습니다.");

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
    await db
      .delete(WorkspaceToGitHubInstallation)
      .where(
        eq(
          WorkspaceToGitHubInstallation.uuid,
          workspace_to_github_installation.uuid,
        ),
      );

    return new Response(null, { status: response.status });
  }),
);
