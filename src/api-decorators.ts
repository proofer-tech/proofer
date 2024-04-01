// @ts-nocheck
import { NextRequest } from "next/server";
import { Workspace } from "@/database/schemas/workspace";
import { dz } from "@/database/engine";
import { eq } from "drizzle-orm";
import {
  AppRouteHandlerFn,
  AppRouteHandlerFnContext,
  WithApiAuthRequired,
} from "@auth0/nextjs-auth0";
import { findUserFromSession } from "@/src/data/user";
import { notFound } from "next/navigation";
import { findMember } from "@/src/data/workspace";
import { NextApiRequest } from "next";
import { WORKSPACE_DEMO_SLUG } from "@/src/constants";
import { Forbidden, Unauthorized } from "http-errors";

export const withApiWorkspaceUserRequired: WithApiAuthRequired = (
  apiRoute: AppRouteHandlerFn,
) => {
  const wrapper = async (
    req: NextRequest & NextApiRequest,
    props: AppRouteHandlerFnContext,
    ...args: []
  ) => {
    const { workspaceSlug } = props.params;
    const user = await findUserFromSession();
    if (user === undefined) throw new Unauthorized("잘못된 접근입니다.");
    const workspace = (
      await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
    )[0];
    if (!workspace) return notFound();

    if (workspaceSlug === WORKSPACE_DEMO_SLUG) {
    } else {
      const member = await findMember(workspace.id, user.id);
      if (member === undefined)
        throw Forbidden("워크스페이스의 멤버만 호출할 수 있습니다.");
      else if (!member.isManager)
        throw Forbidden("워크스페이스의 관리자만 호출할 수 있습니다.");
    }

    return apiRoute(req, { workspace, user, ...props }, ...args);
  };

  return wrapper as AppRouteHandlerFn;
};

export const withCronApi = (apiRoute: AppRouteHandlerFn) => {
  const wrapper = async (
    req: NextRequest & NextApiRequest,
    props: AppRouteHandlerFnContext,
    ...args: []
  ) => {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      throw Unauthorized();
    }

    return apiRoute(req, props, ...args);
  };

  return wrapper as AppRouteHandlerFn;
};
