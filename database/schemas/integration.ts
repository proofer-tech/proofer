import { prooferSchema } from "@/database/engine";
import { varchar, serial, uniqueIndex, text } from "drizzle-orm/pg-core";

export const Integration = prooferSchema.table(
  "integration",
  {
    id: serial("id").primaryKey(),
    categoryStr: varchar("category_str", { length: 16 }).notNull(),

    slug: varchar("slug", { length: 16 }).notNull(),
    name: varchar("name", { length: 16 }).notNull(),
    description: text("description").default(""),

    iconUrl: text("icon_url"),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex("idx_slug").on(table.slug),
    };
  },
);

export const IntegrationTag = prooferSchema.table(
  "integration_tag",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 16 }).notNull(),
    color: varchar("color", { length: 16 }).default("gray"),
  },
  (table) => {
    return {
      nameIdx: uniqueIndex("idx_name").on(table.name),
    };
  },
);
