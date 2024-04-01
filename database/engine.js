import { pgSchema } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
export const prooferSchema = pgSchema("proofer");
export const dz = drizzle(sql);
