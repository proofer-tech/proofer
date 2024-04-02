import { withCronApi } from "@/src/api-decorators";
import { NextRequest, NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { ProcessedGitHubTimeSeries } from "@/database/schemas/github/processed";
import { Command, CommandState } from "@/database/schemas/command";
import { eq } from "drizzle-orm";
import { withLock } from "@/src/redis";

const serverlessFunctionPathMap: any = {
  health: "/api/health",
};
export const GET = withCronApi(async function (req: NextRequest) {
  for (const command of await dz
    .select()
    .from(Command)
    .where(eq(Command.state, CommandState.PENDING))) {
    await withLock({ id: `command:${command.hash}`, lease: 1000 }, async () => {
      const serverlessFunctionPath = serverlessFunctionPathMap[command.name];
      if (serverlessFunctionPath === undefined) {
        await dz
          .update(Command)
          .set({ state: CommandState.FAILED })
          .where(eq(Command.id, command.id));
        console.error("Unknown command: ", command.hash);
        return;
      }

      await dz
        .update(Command)
        .set({ state: CommandState.PROCESSING })
        .where(eq(Command.id, command.id));

      const commandURL = new URL(serverlessFunctionPath, req.url);
      for (const [k, v] of new URLSearchParams(
        [`hash=${command.hash}`, command.arguments].join("&"),
      )) {
        commandURL.searchParams.set(k, v);
      }
      fetch(commandURL);
    });
  }
  return NextResponse.json({});
});
