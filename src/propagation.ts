import { dz } from "@/database/engine";
import { Command } from "@/database/schemas/command";
import crypto from "crypto";
import { encrypt } from "@/src/crypto";
import { InferSelectModel } from "drizzle-orm";

export function generateHash(seed: string) {
  return crypto.createHash("md5").update(seed).digest("hex");
}
export async function bookCommand(
  name: string,
  {
    searchParams,
    hash,
    parents,
    seed,
  }: {
    parents?: InferSelectModel<typeof Command>;
    searchParams?: URLSearchParams;
    hash?: string;
    seed?: string;
  },
) {
  return dz
    .insert(Command)
    .values({
      parents: parents?.hash,
      hash:
        hash ||
        generateHash(
          `${seed || parents?.hash || generateHash(new Date().getTime().toString())}.${name}`,
        ),
      name: name,
      arguments: encrypt(searchParams?.toString() || ""),
    })
    .onConflictDoNothing();
}

export async function propagate(
  type: "commands" | "events",
  path: string,
  searchParams?: URLSearchParams,
) {
  const commandURL = new URL(`/${type}/${path}`, process.env.AUTH0_BASE_URL);
  if (searchParams) commandURL.search = searchParams.toString();
  fetch(commandURL, {
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      Authorization: `Bearer ${process.env.EDA_SECRET}`,
    },
    referrerPolicy: "no-referrer",
  });
}
