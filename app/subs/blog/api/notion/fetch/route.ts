import NotionPageToHtml from "notion-page-to-html";
import { NextRequest, NextResponse } from "next/server";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiUserRequired } from "@/src/decorators/api";

export const GET = withApiAuthRequired(
  withApiUserRequired(async (req: NextRequest) => {
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
  }),
);
