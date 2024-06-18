import { NextRequest, NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { Article } from "@/database/schemas/blog";
import { getTextOf, truncateDescription } from "@/src/manifest";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const articles = await dz
    .select({ id: Article.id, contents: Article.contents })
    .from(Article);

  for (const article of articles) {
    await dz
      .update(Article)
      .set({
        description: truncateDescription(getTextOf(article.contents || ""), {
          length: 77,
        }),
      })
      .where(eq(Article.id, article.id));
  }

  return NextResponse.json({});
}
