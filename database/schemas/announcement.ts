import { schema } from "@/database/engine";
import { serial, varchar, text, timestamp } from "drizzle-orm/pg-core/index";

export const Announcement = schema.table("announcement", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 })
    .notNull()
    .unique("announcement_uidx_slug"),
  title: varchar("title", { length: 256 }).notNull(),
  contents: text("contents"),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
