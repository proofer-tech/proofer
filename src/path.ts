import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { SUB_DOMAIN } from "@/src/constants";

export const withSubs = Boolean(parseInt(process.env.NEXT_PUBLIC_WITH_SUBS!));
export function getPathPrefix(subDomain?: string) {
  let pathPrefix = withSubs ? "/subs" : "";
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

export function getURLFromHeaderList(headerList: ReadonlyHeaders) {
  const protocol = headerList.get("X-Forwarded-Proto") + "://";
  const host = headerList.get("host") || "";
  const nextURL = headerList.get("next-url") || "";

  return new URL(headerList.get("x-url") || `${protocol}${host}${nextURL}`);
}

export const generateUrl = (path: string, subDomain?: string) => {
  const prefix = getPathPrefix();
  if (prefix)
    return new URL(
      generateSubdomainPath(path, subDomain),
      process.env.NEXT_PUBLIC_BASE_URL,
    ).toString();

  const hostURL = new URL(process.env.NEXT_PUBLIC_BASE_URL!);
  if (subDomain) hostURL.hostname = `${subDomain}.${hostURL.hostname}`;
  return new URL(generateSubdomainPath(path, subDomain), hostURL).toString();
};
