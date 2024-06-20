// @ts-nocheck
import { NextRequest } from "next/server";
import { Workspace } from "@/database/schemas/workspace";
import { dz } from "@/database/engine";
import { eq } from "drizzle-orm";
import { AppRouteHandlerFn, WithApiAuthRequired } from "@auth0/nextjs-auth0";
import { findUserFromSession } from "@/src/data/user";
import { notFound } from "next/navigation";
import { findMember } from "@/src/data/workspace";
import { NextApiRequest } from "next";
import { WORKSPACE_DEMO_SLUG } from "@/src/constants";
import { Forbidden, Unauthorized } from "http-errors";
import { NextHandler, NextHandlerContext } from "@/src/types/general";

export const withApiUserRequired: WithApiAuthRequired = (
  apiRoute: AppRouteHandlerFn,
) => {
  const wrapper = async (
    req: NextRequest & NextApiRequest,
    props: NextHandlerContext,
    ...args: []
  ) => {
    const user = await findUserFromSession();
    if (user === undefined) throw new Unauthorized("Need to login");

    return apiRoute(req, { user, ...props }, ...args);
  };
  return wrapper as AppRouteHandlerFn;
};

export const withApiWorkspaceUserRequired: WithApiAuthRequired = (
  apiRoute: AppRouteHandlerFn,
) => {
  const wrapper = async (
    req: NextRequest & NextApiRequest,
    props: NextHandlerContext,
    ...args: []
  ) => {
    const { workspaceSlug } = props.params;
    const user = await findUserFromSession();
    let member;

    if (user === undefined) throw new Unauthorized("Need to login");
    const workspace = (
      await dz.select().from(Workspace).where(eq(Workspace.slug, workspaceSlug))
    )[0];
    if (!workspace) return notFound();

    if (workspaceSlug === WORKSPACE_DEMO_SLUG) {
    } else {
      member = await findMember(workspace.id, user.id);
      if (member === undefined)
        throw Forbidden("You are not a member of this workspace");
    }

    return apiRoute(req, { user, workspace, member, ...props }, ...args);
  };

  return wrapper as AppRouteHandlerFn;
};

export const withBearer = (token?: string, apiRoute: NextHandler) => {
  const wrapper = async (
    req: NextRequest & NextApiRequest,
    props: NextHandlerContext,
    ...args: []
  ) => {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${token}`) {
      throw Unauthorized();
    }

    return apiRoute(req, props, ...args);
  };

  return wrapper as NextHandler;
};
