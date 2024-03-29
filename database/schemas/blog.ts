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

    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => ({
    createdAtIdx: index("article_idx_createdAt").on(table.createdAt),
  }),
);

export const Tag = prooferSchema.table("tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique("tag_uidx_name"),
});

export const ArticleToTag = prooferSchema.table("article_to_tag", {
  id: serial("id").primaryKey(),
  articleId: serial("articleId").references(() => Article.id, {
    onDelete: "cascade",
  }),
  tagName: varchar("name", { length: 64 })
    .notNull()
    .references(() => Tag.name, {
      onDelete: "cascade",
    }),
});
