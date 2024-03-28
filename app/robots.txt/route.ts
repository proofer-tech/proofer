import { NextRequest } from "next/server";
import { resolveRobots } from "next/dist/build/webpack/loaders/metadata/resolve-route-data";
import { SUB_DOMAIN } from "@/src/constants";

export async function GET(req: NextRequest) {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  const subDomain = hostname.split(".")[0];
  const rulesMap = [];

  switch (subDomain) {
    case SUB_DOMAIN.app:
      rulesMap.push({
        userAgent: "*",
        allow: ["/$"],
        disallow: ["/"],
      });
      break;
    default:
      rulesMap.push({
        userAgent: "*",
        disallow: ["/assets/", "/subs/"],
      });
  }

  const response = new Response(
    resolveRobots({
      rules: rulesMap,
      sitemap: "https://proofer.tech/sitemap.xml",
    }),
  );
  response.headers.set("content-type", "text/plain;charset=UTF-8");

  return response;
}
