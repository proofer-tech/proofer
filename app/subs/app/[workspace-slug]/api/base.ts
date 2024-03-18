import { NextRequest, NextResponse } from "next/server";
import { Workspace } from "@/database/schemas/workspace";
import { db } from "@/database/engine";
import { eq } from "drizzle-orm";
import { AppRouteHandlerFn, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { findUserFromSession } from "@/src/data/user";
import { notFound } from "next/navigation";
import * as Boom from "@hapi/boom";
import { findMember } from "@/src/data/workspace";
import { put } from "@vercel/blob";
import { base64ToFile } from "@/src/file";
import { keysToCamelCase } from "@/src/object";
import { NextApiHandler, NextApiRequest } from "next";
import { WithApiAuthRequired } from "@auth0/nextjs-auth0/src/shared";

export function withApiWorkspaceUserRequired(
  apiRoute: AppRouteHandlerFn | NextApiHandler,
) {
  const wrapper = async (
    req: NextRequest & NextApiRequest,
    kwargs: any,
    ...args: []
  ) => {
    const user = await findUserFromSession();
    if (user === undefined) throw Boom.forbidden("잘못된 접근입니다.");
    const workspace = (
      await db
        .select()
        .from(Workspace)
        .where(eq(Workspace.slug, kwargs.params["workspace-slug"]))
    )[0];
    if (!workspace) return notFound();

    const member = await findMember(workspace, user);
    if (member === undefined)
      throw Boom.forbidden("워크스페이스의 멤버만 호출할 수 있습니다.");
    else if (!member.isManager)
      throw Boom.forbidden("워크스페이스의 관리자만 호출할 수 있습니다.");

    kwargs.workspace = workspace;
    kwargs.user = user;

    return apiRoute(req, kwargs, ...args);
  };

  return wrapper as NextApiHandler;
}
