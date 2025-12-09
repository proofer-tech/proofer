import NotionPageToHtml from "notion-page-to-html";
import { NextRequest, NextResponse } from "next/server";
import { withApiUserRequired } from "@/src/decorators/api";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

const auth0 = new Auth0Client();

export const GET = async (req: NextRequest) => {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return withApiUserRequired(async (req: NextRequest) => {
    const notionPageURLString = req.nextUrl.searchParams.get("notion_page_url");
    const notionPageURL = new URL(notionPageURLString!);
    const pageId = notionPageURL.pathname.split("/").pop();
    const { title, html, cover } = await NotionPageToHtml.convert(
      `https://notion.so/${pageId}`,
      {
        bodyContentOnly: true,
      },
    );
    return NextResponse.json({ title, html, cover });
  })(req);
};
