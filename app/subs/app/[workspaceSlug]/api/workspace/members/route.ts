import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiWorkspaceUserRequired } from "@/src/decorators/api";
import { NextRequest, NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { WorkspaceMember } from "@/database/schemas/workspace";
import { and, eq, or, SQL } from "drizzle-orm";

export const GET = withApiAuthRequired(
  withApiWorkspaceUserRequired(async (req: NextRequest, { workspace }: any) => {
    const memberIds = req.nextUrl.searchParams.getAll("member_id");

    const andConditions = [eq(WorkspaceMember.workspace_id, workspace.id)];
    if (memberIds.length > 0)
      andConditions.push(
        or(
          ...memberIds.map((id) => eq(WorkspaceMember.id, parseInt(id))),
        ) as SQL,
      );

    const members = await dz
      .select()
      .from(WorkspaceMember)
      // @ts-ignore
      .where(and(...andConditions));

    return NextResponse.json(members);
  }),
);
