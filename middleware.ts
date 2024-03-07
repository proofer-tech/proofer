import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { Health } from "@/app/interfaces";

function notFound(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = `/404`;
  return NextResponse.rewrite(url);
}
async function StaticMiddleware(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  if (
    path.startsWith("/_") ||
    path.startsWith("/fonts") ||
    path.startsWith("/images") ||
    path.startsWith("/scripts") ||
    (path !== "/" && !path.slice(1).includes("/") && path.includes(".")) // root files
  )
    return NextResponse.next();
}
async function MaintenanceMiddleware(req: NextRequest) {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  if (path.startsWith("/api")) return NextResponse.next();

  const health = (await get("health")) as { [key: string]: Health };
  if (
    process.env.NODE_ENV === "production" &&
    health?.[subDomain]?.state === "MAINTENANCE"
  ) {
    const pureHostname = hostname.replace(`${subDomain}.`, "");
    return NextResponse.rewrite(
      new URL(
        `${req.nextUrl.protocol}//${pureHostname}/health?service=${subDomain}`,
        req.url,
      ),
    );
  }
}

async function RouterMiddleware(req: NextRequest) {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  if (path.startsWith("/api")) return NextResponse.next();

  const health = (await get("health")) as { [key: string]: Health };
  if (
    process.env.NODE_ENV === "production" &&
    health?.[subDomain]?.state === "MAINTENANCE"
  ) {
    const pureHostname = hostname.replace(`${subDomain}.`, "");
    return NextResponse.rewrite(
      new URL(
        `${req.nextUrl.protocol}//${pureHostname}/health?service=${subDomain}`,
        req.url,
      ),
    );
  }

  if (subDomain === "app")
    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  else if (path.startsWith("/app")) return notFound(req);

  if (subDomain === "team")
    return NextResponse.rewrite(
      new URL(`/team${path === "/" ? "" : path}`, req.url),
    );
  else if (path.startsWith("/team")) return notFound(req);
}

export default async function wrapper(req: NextRequest) {
  for (let middleware of [
    StaticMiddleware,
    MaintenanceMiddleware,
    RouterMiddleware,
  ]) {
    let response = await middleware(req);
    if (response) return response;
  }

  return NextResponse.next();
}
