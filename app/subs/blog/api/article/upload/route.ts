import { NextRequest, NextResponse } from "next/server";
import { base64ToFile } from "@/src/file";
import { put } from "@vercel/blob";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { withApiUserRequired } from "@/src/decorators/api";

export const POST = withApiAuthRequired(
  withApiUserRequired(async (req: NextRequest) => {
    const { title, image }: any = await req.json();

    const imageFile = base64ToFile(image);
    const ext = imageFile.name.split(".").pop();
    const blob = await put(`blog/articles/${title}.${ext}`, imageFile, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  }),
);
