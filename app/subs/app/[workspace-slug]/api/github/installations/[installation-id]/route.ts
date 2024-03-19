import { NextResponse } from "next/server";
import { GitHubApp } from "@/src/integrations/github";
import { pick } from "lodash";
import { db } from "@/database/engine";
import { WorkspaceToGitHubInstallation } from "@/database/schemas/github";
import { and, eq } from "drizzle-orm";
import { Workspace } from "@/database/schemas/workspace";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiWorkspaceUserRequired } from "@/app/subs/app/[workspace-slug]/api/base";

interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  visibility: string;
}

export interface Installation {
  target_type: string;
  single_file_paths: any[];
  permissions: { [key: string]: string };
  repository_selection: string;
  avatar_url: string;
  name: string;
  bio: string;
  blog: string;
  repositories: Repository[];
}
export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { params }: any) => {
    try {
      const installationId = parseInt(params["installation-id"]);
      const installationResponse = await GitHubApp.octokit.request(
        `/app/installations/${installationId}`,
      );
      const accountResponse = await fetch(
        installationResponse.data.account.url,
      );

      const result = Object.assign(
        pick(installationResponse.data, [
          "target_type",
          "single_file_paths",
          "permissions",
          "repository_selection",
        ]),
        pick(await accountResponse.json(), [
          "avatar_url",
          "name",
          "bio",
          "blog",
        ]),
      );

      result["repositories"] = [];
      if (installationResponse.data.repository_selection === "selected") {
        for await (const { repository } of GitHubApp.eachRepository.iterator({
          installationId: installationId,
        })) {
          result["repositories"].push(
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

      return NextResponse.json(result as Installation);
    } catch (e: any) {
      if (e.name === "HttpError")
        return NextResponse.json(e.response.data, {
          status: e.response.status,
        });
      throw e;
    }
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
