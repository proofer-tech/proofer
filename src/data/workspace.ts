import { db } from "@/database/engine";
import { Workspace, WorkspaceMember } from "@/database/schemas/workspace";
import { and, eq, InferSelectModel } from "drizzle-orm";
import { User } from "@/database/schemas/auth";

export async function findWorkspace(
  slug: string,
): Promise<InferSelectModel<typeof Workspace> | undefined> {
  const records = await db
    .select()
    .from(Workspace)
    .where(eq(Workspace.slug, slug));
  return records[0];
}

export async function findMember(
  workspace: InferSelectModel<typeof Workspace>,
  user: InferSelectModel<typeof User>,
): Promise<InferSelectModel<typeof WorkspaceMember> | undefined> {
  const records = await db
    .select()
    .from(WorkspaceMember)
    .where(
      and(
        eq(WorkspaceMember.workspaceId, workspace.id),
        eq(WorkspaceMember.userId, user.id),
      ),
    );
  return records[0];
}
