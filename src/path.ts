import { Workspace } from "@/database/schemas/workspace";
import { InferSelectModel } from "drizzle-orm";

export function getAppPathBlocks(pathname: String) {
  return pathname.split("/").slice(3);
}

export const generateAppPath = (
  path: string,
  workspace?: InferSelectModel<typeof Workspace>,
) => {
  const prefix = process.env.VERCEL_ENV === "production" ? "" : "/subs/app";
  let workspacePathBlocks = [prefix];

  if (workspace) workspacePathBlocks.push(workspace.slug);
  if (path) workspacePathBlocks.push(path);

  return workspacePathBlocks.join("/").replace("//", "/");
};
