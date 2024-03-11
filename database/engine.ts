import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { pgSchema } from "drizzle-orm/pg-core";
export const verceldb = pgSchema("verceldb");

export const db = drizzle(sql);
