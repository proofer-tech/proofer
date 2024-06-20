import { NextRequest, NextResponse } from "next/server";
import { base64ToFile } from "@/src/file";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const { title, image }: any = await req.json();

  const imageFile = base64ToFile(image);
  const ext = imageFile.name.split(".").pop();
  const blob = await put(`blog/articles/${title}.${ext}`, imageFile, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
