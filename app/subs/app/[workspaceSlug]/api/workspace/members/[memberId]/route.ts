import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiWorkspaceUserRequired } from "@/src/decorators/api";
import { NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { WorkspaceMember } from "@/database/schemas/workspace";
import { and, eq } from "drizzle-orm";

export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (_: any, { workspace, params }: any) => {
    const { memberId } = params;
    const member = (
      await dz
        .select()
        .from(WorkspaceMember)
        .where(
          and(
            eq(WorkspaceMember.workspace_id, workspace.id),
            eq(WorkspaceMember.id, memberId),
          ),
        )
    )[0];
    return NextResponse.json(member || {});
  }),
);
