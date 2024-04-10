import { withBearer } from "@/src/decorators/api";
import { NextRequest, NextResponse } from "next/server";
import { dz } from "@/database/engine";
import { Command, CommandState } from "@/database/schemas/command";
import { eq } from "drizzle-orm";
import { decrypt } from "@/src/crypto";

export const GET = withBearer(
  process.env.CRON_SECRET,
  async function (req: NextRequest) {
    for (const command of await dz
      .select()
      .from(Command)
      .where(eq(Command.state, CommandState.PENDING))) {
      await dz
        .update(Command)
        .set({ state: CommandState.PROCESSING })
        .where(eq(Command.id, command.id));

      const commandURL = new URL(`/commands/${command.name}`, req.url);
      const commandSearchParams = new URLSearchParams(
        (command.arguments && decrypt(command.arguments)) || "",
      );

      commandURL.search = commandSearchParams.toString();
      fetch(commandURL, {
        mode: "no-cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${process.env.EDA_SECRET}`,
          "x-command-hash": command.hash,
        },
        referrerPolicy: "no-referrer",
      });
    }
    return NextResponse.json({});
  },
);
