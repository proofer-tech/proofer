// @ts-nocheck
import { NextRequest } from "next/server";
import { Workspace } from "@/database/schemas/workspace";
import { dz } from "@/database/engine";
import { eq, InferSelectModel } from "drizzle-orm";
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
import { Forbidden, NotFound, Unauthorized } from "http-errors";
import { Command, CommandState } from "@/database/schemas/command";
import { withLock } from "@/src/redis";
import { NextHandler, NextHandlerContext } from "@/src/types/general";

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
      else if (!member.is_manager)
        throw Forbidden("워크스페이스의 관리자만 호출할 수 있습니다.");
    }

    return apiRoute(req, { workspace, user, ...props }, ...args);
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

export type CommandHandlerContext = NextHandlerContext & {
  command: InferSelectModel<typeof Command>;
};
export type CommandHandler = (
  req: NextRequest,
  ctx: CommandHandlerContext,
) => Promise<Response> | Response | void | Promise<void>;
export const withCommand = (apiRoute: CommandHandler) =>
  withBearer(
    process.env.EDA_SECRET,
    async (
      req: NextRequest & NextApiRequest,
      props: CommandHandlerContext,
      ...args: []
    ) => {
      const hash = req.headers.get("x-command-hash");
      if (!hash) throw Forbidden();
      const command = (
        await dz.select().from(Command).where(eq(Command.hash, hash)).limit(1)
      )[0];
      if (!command) throw NotFound();

      let response = new Response();
      await withLock(
        { id: `command:${command.hash}`, lease: 1000 },
        async () => {
          try {
            response =
              (await apiRoute(
                req,
                Object.assign(props, { command }),
                ...args,
              )) || response;

            await dz
              .update(Command)
              .set({ state: CommandState.SUCCESS })
              .where(eq(Command.id, command.id));
          } catch (e) {
            const uuid = crypto.randomUUID();
            console.error("Command error occurred: ", uuid);
            console.log(uuid, e);

            await dz
              .update(Command)
              .set({ state: CommandState.FAILED, memo: uuid })
              .where(eq(Command.id, command.id));
          }
        },
        async () =>
          await dz
            .update(Command)
            .set({
              state: CommandState.PENDING,
              memo: `lock acquire failed at: ${new Date().toISOString()}`,
            })
            .where(eq(Command.id, command.id)),
      );
      return response;
    },
  );
