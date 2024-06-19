import NotionPageToHtml from "notion-page-to-html";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
}
