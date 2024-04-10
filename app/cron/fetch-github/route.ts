import { GitHubApp } from "@/src/integrations/github";
import { bookCommand } from "@/src/propagation";
import { withBearer } from "@/src/decorators/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = withBearer(
  process.env.CRON_SECRET,
  async function (_: NextRequest) {
    for await (const {
      installation,
    } of GitHubApp.eachInstallation.iterator()) {
      bookCommand("fetch-github/installations", {
        searchParams: new URLSearchParams({
          installation_id: installation.id.toString(),
        }),
      });
    }
    return NextResponse.json({});
  },
);
