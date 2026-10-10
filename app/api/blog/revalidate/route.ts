import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { BLOG_TAG, articleTag } from "@/lib/blog/queries";

function secretMatches(given: string | null): boolean {
  const secret = process.env.BLOG_REVALIDATE_SECRET;
  if (!secret || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(secret);
  return a.length === b.length && timingSafeEqual(a, b);
}

// POST { slug? } + Authorization: Bearer <BLOG_REVALIDATE_SECRET>
// 글 태그(slug 가 있을 때)와 목록 태그를 비운다.
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!secretMatches(auth?.startsWith("Bearer ") ? auth.slice(7) : null))
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const slug = typeof body?.slug === "string" ? body.slug : "";
  const tags = [...(slug ? [articleTag(slug)] : []), BLOG_TAG];
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: tags });
}
