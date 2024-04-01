import { prooferSchema } from "@/database/engine";
import { index, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const Article = prooferSchema.table(
  "article",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 })
      .notNull()
      .unique("article_uidx_slug"),
    origin: varchar("origin", { length: 512 }).notNull(),

    title: varchar("title", { length: 256 }).notNull(),
    contents: text("contents").notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    created_at_idx: index("article_idx_created_at").on(table.created_at),
  }),
);

export const Tag = prooferSchema.table("tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique("tag_uidx_name"),
});

export const ArticleToTag = prooferSchema.table("article_to_tag", {
  id: serial("id").primaryKey(),
  article_id: serial("article_id").references(() => Article.id, {
    onDelete: "cascade",
  }),
  tag_name: varchar("name", { length: 64 })
    .notNull()
    .references(() => Tag.name, {
      onDelete: "cascade",
    }),
});
