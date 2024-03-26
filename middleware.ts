import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { Health } from "@/src/types/health";
import { notFound } from "next/navigation";
const isProduction = process.env.VERCEL_ENV === "production";

function getPath(req: NextRequest): string {
  const searchParams = req.nextUrl.searchParams.toString();
  return `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
}

async function isStaticFile(req: NextRequest): Promise<boolean> {
  const path = getPath(req);
  const staticPaths = ["/_", "/assets"];

  return (
    staticPaths.some((staticPath) => path.startsWith(staticPath)) ||
    (path !== "/" && !path.slice(1).includes("/") && path.includes("."))
  );
}

async function handleStaticMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  if (await isStaticFile(req)) {
    // static 파일은 무조건 아무 처리없이 return 합니다.
    return NextResponse.next();
  }
}

async function handleMaintenanceMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  if (!isProduction) {
    return;
  }

  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];

  if (getPath(req).startsWith("/api")) {
    // api endpoint 는 maintenance 와 연관이 없도록 한다.
    return;
  }

  const health = (await get("health")) as { [key: string]: Health };
  if (health?.[subDomain]?.state !== "MAINTENANCE") {
    return;
  }

  const pureHostname = hostname.replace(`${subDomain}.`, "");
  const maintenanceUrl = new URL(
    `${req.nextUrl.protocol}//${pureHostname}/health?service=${subDomain}`,
    req.url,
  );
  return NextResponse.rewrite(maintenanceUrl);
}

async function handleRouterMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  if (!isProduction) {
    // 개발환경에서는 localhost 의 쿠키 정책문제로 제외
    return;
  }

  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];
  const path = getPath(req);

  if (["app", "team"].includes(subDomain)) {
    let rewriteUri = path === "/" ? "" : path;
    if (
      path.startsWith("/api/auth") ||
      path.startsWith("/api/health") ||
      path.startsWith("/auth")
    ) {
      // auth 와 health 는 공통으로 사용합니다.
      return NextResponse.next();
    }

    rewriteUri = `/subs/${subDomain}` + rewriteUri;
    return NextResponse.rewrite(new URL(rewriteUri, req.url));
  } else if (path.startsWith(`/subs`)) return notFound();
}

export default async function wrapper(req: NextRequest): Promise<NextResponse> {
  const middlewares = [
    handleStaticMiddleware,
    handleMaintenanceMiddleware,
    handleRouterMiddleware,
  ];
  let response = NextResponse.next();

  for (const middleware of middlewares) {
    const mResponse = await middleware(req);
    if (mResponse) {
      response = mResponse;
      break;
    }
  }

  // url, pathname 넣어줍니다.
  response.headers.set("x-url", req.url);
  response.headers.set("x-pathname", req.nextUrl.pathname);

  return response;
}
