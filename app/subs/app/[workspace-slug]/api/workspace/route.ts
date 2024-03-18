import { NextRequest, NextResponse } from "next/server";
import { Workspace } from "@/database/schemas/workspace";
import { db } from "@/database/engine";
import { eq } from "drizzle-orm";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { findUserFromSession } from "@/src/data/user";
import { notFound } from "next/navigation";
import * as Boom from "@hapi/boom";
import { findMember } from "@/src/data/workspace";
import { put } from "@vercel/blob";
import { base64ToFile } from "@/src/file";
import { keysToCamelCase } from "@/src/object";
import { withApiWorkspaceUserRequired } from "@/app/subs/app/[workspace-slug]/api/base";

export const PUT = withApiAuthRequired(
  withApiWorkspaceUserRequired(async function route(
    req: NextRequest,
    { params, workspace }: any,
  ) {
    const res = new NextResponse();
    const data = await req.json();

    if (data.logo_url) {
      const file = base64ToFile(data.logo_url);
      const blob = await put(
        `uploads/workspaces/${workspace.id}/${file.name}`,
        file,
        {
          access: "public",
        },
      );
      data.logo_url = blob.url;
    }

    const updateData = keysToCamelCase(data);

    await db
      .update(Workspace)
      .set(updateData)
      .where(eq(Workspace.id, workspace.id));
    return NextResponse.json(Object.assign(workspace, updateData), res);
  }),
);
