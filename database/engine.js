import { pgTable } from "drizzle-orm/pg-core";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

// public 스키마는 pgSchema("public") 으로 만들 수 없어서 pgTable 을 schema.table 로 노출한다.
export const schema = { table: pgTable };
export const dz = drizzle(sql);
