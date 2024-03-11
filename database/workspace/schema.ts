import { verceldb } from "@/database/engine";
import { integer, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const User = verceldb.table(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const Workspace = verceldb.table(
  "workspace",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    ownerId: integer("owner_id")
      .notNull()
      .references(() => User.id),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex("slug_idx").on(table.slug),
    };
  },
);
