import { NextRequest, NextResponse } from "next/server";

function notFound(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = `/404`;
  return NextResponse.rewrite(url);
}
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  const subDomain = hostname.split(".")[0];

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // public 리소스
  if (
    path.startsWith("/_") ||
    path.startsWith("/fonts") ||
    path.startsWith("/images") ||
    path.startsWith("/scripts") ||
    !path.slice(-1, 1).includes("/") // root files
  )
    return NextResponse.next();

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

  return NextResponse.next();
}
