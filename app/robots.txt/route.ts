import { NextRequest } from "next/server";
import { resolveRobots } from "next/dist/build/webpack/loaders/metadata/resolve-route-data";
import { SUB_DOMAIN } from "@/src/constants";
import { generateUrl } from "@/src/path";

export async function GET(req: NextRequest) {
  const hostname = req.headers.get("host") || req.nextUrl.host;
  let subDomain = hostname.split(".")[0];
  subDomain = subDomain === "www" ? "" : subDomain;
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
      });
  }

  const response = new Response(
    resolveRobots({
      rules: rulesMap,
      sitemap: generateUrl("/sitemap.xml", subDomain),
    }),
  );
  response.headers.set("content-type", "text/plain;charset=UTF-8");

  return response;
}
