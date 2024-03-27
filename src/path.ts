import { Workspace } from "@/database/schemas/workspace";
import { InferSelectModel } from "drizzle-orm";

function getPathPrefix() {
  return process.env.NEXT_PUBLIC_APP_PREFIX || "";
}

export function getAppPathBlocks(pathname: String) {
  const prefix = getPathPrefix();
  const pathnameWithoutPrefix = pathname.slice(prefix.length);

  return pathnameWithoutPrefix.split("/").slice(1);
}

export const generateAppPath = (
  path: string,
  workspace?: InferSelectModel<typeof Workspace>,
) => {
  const prefix = getPathPrefix();
  let workspacePathBlocks = [prefix];

  if (workspace) workspacePathBlocks.push(workspace.slug);
  if (path) workspacePathBlocks.push(path);

  return workspacePathBlocks.join("/").replace("//", "/");
};
