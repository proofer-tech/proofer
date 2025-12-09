import { NextRequest, NextResponse } from "next/server";
import { base64ToFile } from "@/src/file";
import { put } from "@vercel/blob";
import { withApiUserRequired } from "@/src/decorators/api";
import { Auth0Client } from "@auth0/nextjs-auth0/server";

const auth0 = new Auth0Client();

export const POST = async (req: NextRequest) => {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return withApiUserRequired(async (req: NextRequest) => {
    const { title, image }: any = await req.json();

    const imageFile = base64ToFile(image);
    const ext = imageFile.name.split(".").pop();
    const blob = await put(`blog/articles/${title}.${ext}`, imageFile, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  })(req);
};
