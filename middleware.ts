import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { Health } from "@/app/src/interfaces";
const isProduction = process.env.NODE_ENV === "production";

function notFound(req: NextRequest): NextResponse {
  const url = new URL(req.url);
  url.pathname = `/404`;
  return NextResponse.rewrite(url);
}

function getPath(req: NextRequest): string {
  const searchParams = req.nextUrl.searchParams.toString();
  return `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
}

async function isStaticFile(req: NextRequest): Promise<boolean> {
  const path = getPath(req);
  const staticPaths = ["/_", "/fonts", "/images", "/scripts"];

  return (
    staticPaths.some((staticPath) => path.startsWith(staticPath)) ||
    (path !== "/" && !path.slice(1).includes("/") && path.includes("."))
  );
}

async function handleStaticMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  if (await isStaticFile(req)) {
    return NextResponse.next();
  }
}

async function handleMaintenanceMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];
  const path = getPath(req);

  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  const health = (await get("health")) as { [key: string]: Health };
  if (isProduction && health?.[subDomain]?.state === "MAINTENANCE") {
    const pureHostname = hostname.replace(`${subDomain}.`, "");
    const maintenanceUrl = new URL(
      `${req.nextUrl.protocol}//${pureHostname}/health?service=${subDomain}`,
      req.url,
    );
    return NextResponse.rewrite(maintenanceUrl);
  }
}

async function handleRouterMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];
  const path = getPath(req);

  if (subDomain === "app") {
    const rewriteUrl = new URL(`/app${path === "/" ? "" : path}`, req.url);
    return NextResponse.rewrite(rewriteUrl);
  } else if (path.startsWith("/app")) {
    return notFound(req);
  }

  if (subDomain === "team") {
    const rewriteUrl = new URL(`/team${path === "/" ? "" : path}`, req.url);
    return NextResponse.rewrite(rewriteUrl);
  } else if (path.startsWith("/team")) {
    return notFound(req);
  }
}

export default async function wrapper(req: NextRequest): Promise<NextResponse> {
  const middlewares = [
    handleStaticMiddleware,
    handleMaintenanceMiddleware,
    handleRouterMiddleware,
  ];

  for (const middleware of middlewares) {
    const response = await middleware(req);
    if (response) {
      return response;
    }
  }

  return NextResponse.next();
}
