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

export const PUT = withApiAuthRequired(async function route(
  req: NextRequest,
  { params }: any,
) {
  const workspace = (
    await db.select().from(Workspace).where(eq(Workspace.slug, params.slug))
  )[0];
  if (!workspace) return notFound();

  const user = (await findUserFromSession())!;
  const member = await findMember(workspace, user);
  if (member === undefined)
    throw Boom.forbidden("워크스페이스의 멤버만 호출할 수 있습니다.");
  else if (!member.isManager)
    throw Boom.forbidden("워크스페이스의 관리자만 호출할 수 있습니다.");

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
});
