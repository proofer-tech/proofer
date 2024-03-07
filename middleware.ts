import { NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

function notFound(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = `/404`;
  return NextResponse.rewrite(url);
}

async function RouterMiddleware(req: NextRequest) {
  const hostname = (req.headers.get("host") || "").replace(
    ".localhost:3000",
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  );
  const subDomain = hostname.split(".")[0];

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

  const health = (await get("health")) as { [key: string]: Health };
  if (health?.[subDomain]?.state === "MAINTENANCE")
    return NextResponse.rewrite(
      new URL(
        `${req.nextUrl.protocol}//${hostname.replace(`${subDomain}.`, "")}/health`,
        req.url,
      ),
    );

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
  for (let middleware of [RouterMiddleware]) {
    let response = await middleware(req);
    if (response) return response;
  }

  return NextResponse.next();
}
