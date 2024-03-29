import { Workspace } from "@/database/schemas/workspace";
import { InferSelectModel } from "drizzle-orm";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { SUB_DOMAIN } from "@/src/constants";

export function getPathPrefix(subDomain?: string) {
  let pathPrefix = process.env.NEXT_PUBLIC_PATH_PREFIX || "";
  if (pathPrefix && subDomain) pathPrefix = `${pathPrefix}/${subDomain}`;
  return pathPrefix;
}

export function getPathBlocks(pathname: String, subDomain?: string) {
  const prefix = getPathPrefix(subDomain);
  const pathnameWithoutPrefix = pathname.slice(prefix.length);

  return pathnameWithoutPrefix.split("/").slice(1);
}

export const generateSubdomainPath = (path: string, subDomain?: string) => {
  const prefix = getPathPrefix(subDomain);
  let workspacePathBlocks = [prefix];

  if (path) workspacePathBlocks.push(path);
  return workspacePathBlocks.join("/").replace("//", "/");
};

export const generateAppPath = (
  path: string,
  workspace?: InferSelectModel<typeof Workspace>,
) => {
  const workspacePathBlocks = [];
  if (workspace) workspacePathBlocks.push(workspace.slug);
  if (path) workspacePathBlocks.push(path);

  return generateSubdomainPath(workspacePathBlocks.join("/"), SUB_DOMAIN.app);
};

export function getURLFromHeaderList(headerList: ReadonlyHeaders) {
  const protocol = headerList.get("X-Forwarded-Proto") + "://";
  const host = headerList.get("host") || "";
  const nextURL = headerList.get("next-url") || "";

  return new URL(headerList.get("x-url") || `${protocol}${host}${nextURL}`);
}
