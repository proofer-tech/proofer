import { dz } from "@/database/engine";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import { and, eq, InferSelectModel, isNotNull } from "drizzle-orm";
import { WorkspaceToGitHubInstallation } from "@/database/schemas/github";

export async function findWorkspace(
  slug: string,
): Promise<InferSelectModel<typeof Workspace> | undefined> {
  const records = await dz
    .select()
    .from(Workspace)
    .where(eq(Workspace.slug, slug));
  return records[0];
}

export async function getFirstMember(
  workspaceId: number,
): Promise<InferSelectModel<typeof WorkspaceMember> | undefined> {
  const records = await dz
    .select()
    .from(WorkspaceMember)
    .where(eq(WorkspaceMember.workspace_id, workspaceId));
  return records[0];
}

export async function findMember(
  workspace_id: number,
  userId: number,
): Promise<InferSelectModel<typeof WorkspaceMember> | undefined> {
  const records = await dz
    .select()
    .from(WorkspaceMember)
    .where(
      and(
        eq(WorkspaceMember.workspace_id, workspace_id),
        eq(WorkspaceMember.user_id, userId),
      ),
    );
  return records[0];
}

export const getWorkspaceToGitHubInstallationList = async (
  workspace_id: number,
) => {
  return dz
    .select()
    .from(WorkspaceToGitHubInstallation)
    .where(
      and(
        eq(WorkspaceToGitHubInstallation.workspace_id, workspace_id),
        isNotNull(WorkspaceToGitHubInstallation.installation_id),
      ),
    );
};

export const getUserWorkspaces = async (userId: number) => {
  const querySet = await dz
    .select()
    .from(Workspace)
    .innerJoin(WorkspaceMember, eq(WorkspaceMember.user_id, userId));
  return querySet.map((row) => row.workspace);
};
