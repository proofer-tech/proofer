import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { Health } from "@/src/types/health";
import { SUB_DOMAIN } from "@/src/constants";
import { withSubs } from "@/src/path";
const isProduction = process.env.VERCEL_ENV === "production";

function getPath(req: NextRequest): string {
  const searchParams = req.nextUrl.searchParams.toString();
  return `${req.nextUrl.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
}

async function isStaticFile(req: NextRequest): Promise<boolean> {
  const path = getPath(req);
  const staticPaths = ["/_", "/assets"];
  const isRootFile =
    !path.slice(1).includes("/") &&
    path.includes(".") &&
    // sitemap 은 각자의 subdomain 파일을 따라가도록 한다.
    !path.includes("sitemap.xml");

  return (
    staticPaths.some((staticPath) => path.startsWith(staticPath)) ||
    (path !== "/" && isRootFile)
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

async function handleSubdomainMiddleware(
  req: NextRequest,
): Promise<NextResponse | undefined> {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];
  const path = getPath(req);

  if (subDomain === "www") return;

  if (Object.values(SUB_DOMAIN).includes(subDomain as SUB_DOMAIN)) {
    let rewritePath = path;
    if (
      path.startsWith("/api/auth") ||
      path.startsWith("/api/health") ||
      path.startsWith("/auth")
    ) {
      // auth 와 health 는 공통으로 사용합니다.
      return NextResponse.next();
    }

    rewritePath = `/subs/${subDomain}` + rewritePath;
    return NextResponse.rewrite(new URL(rewritePath, req.url));
  } else if (!withSubs && path.startsWith(`/subs`)) {
    const pathBlocks = path.split("/");
    const subDomainOnPath = pathBlocks.slice(2)[0];

    let redirectPath = "/" + pathBlocks.slice(3).join("/");
    const redirectURL = new URL(redirectPath, req.url);

    const hostNameBlocks = redirectURL.hostname.split(".").slice(-2); // Only SLD.TLD
    redirectURL.hostname = [subDomainOnPath, ...hostNameBlocks].join(".");

    return NextResponse.redirect(redirectURL);
  }
}

export default async function wrapper(req: NextRequest): Promise<NextResponse> {
  const middlewares = [
    handleStaticMiddleware,
    handleMaintenanceMiddleware,
    handleSubdomainMiddleware,
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
