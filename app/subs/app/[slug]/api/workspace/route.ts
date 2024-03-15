import { NextRequest, NextResponse } from "next/server";
import { WorkspaceUpdateDto } from "@/app/subs/app/[slug]/api/workspace/dto";
import { Workspace } from "@/database/schemas/workspace";
import { db } from "@/database/engine";
import { eq } from "drizzle-orm";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { findUserFromSession } from "@/src/data/user";
import { notFound } from "next/navigation";
import * as Boom from "@hapi/boom";
import { findMember } from "@/src/data/workspace";

export const PUT = withApiAuthRequired(async function route(
  req: NextRequest,
  { params, searchParams }: any,
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
  const data: WorkspaceUpdateDto = await req.json();
  if (Object.keys(data).length === 0) return NextResponse.error();
  await db.update(Workspace).set(data).where(eq(Workspace.id, workspace.id));
  return NextResponse.json({}, res);
});
