import { schema } from "@/database/engine";
import {
  type AnyPgColumn,
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const ArticleStatus = pgEnum("article_status", [
  "draft",
  "published",
  "unlisted",
]);
export const ArticleSource = pgEnum("article_source", [
  "native",
  "medium_publication",
  "medium_personal",
]);
export const AuthorKind = pgEnum("author_kind", ["org", "person"]);
export const RedirectKind = pgEnum("article_redirect_kind", [
  "medium",
  "legacy_blog",
  "slug_change",
]);

export const Author = schema.table("author", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique("author_uidx_slug"),
  kind: AuthorKind("kind").default("person").notNull(),
  display_name: varchar("display_name", { length: 64 }).notNull(),
  bio: text("bio"),
  avatar_url: text("avatar_url"),
  medium_username: varchar("medium_username", { length: 64 }),
  medium_url: text("medium_url"),
  website_url: text("website_url"),
  same_as: jsonb("same_as").$type<string[]>(),
  is_default: boolean("is_default").default(false).notNull(),
});

export const Article = schema.table(
  "article",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 256 })
      .notNull()
      .unique("article_uidx_slug"),

    title: varchar("title", { length: 256 }).notNull(),
    description: varchar("description", { length: 80 }),
    image: text("image"),

    contents: text("contents"),
    origin: varchar("origin", { length: 512 }),

    author: varchar("author", { length: 64 }).default("프루퍼").notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),

    // is_published 는 이행 기간 동안만 둔다. status 로 완전히 넘어가면 지운다.
    is_published: boolean("is_published").default(false).notNull(),

    subtitle: varchar("subtitle", { length: 160 }).default("").notNull(),
    body_md: text("body_md").default("").notNull(),
    source_html: text("source_html"),
    status: ArticleStatus("status").default("draft").notNull(),
    published_at: timestamp("published_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    // 기본 저자(proofer) 시드는 2단계 적재 때 넣는다. 그 전에는 비어 있을 수 있다.
    author_id: integer("author_id").references(() => Author.id),
    canonical_url: text("canonical_url"),
    source: ArticleSource("source").default("native").notNull(),
    medium_post_id: varchar("medium_post_id", { length: 16 }).unique(
      "article_uidx_medium_post_id",
    ),
    medium_url: text("medium_url"),
    cover_asset_id: integer("cover_asset_id").references(
      (): AnyPgColumn => Asset.id,
      { onDelete: "set null" },
    ),
    reading_minutes: integer("reading_minutes").default(0).notNull(),
    word_count: integer("word_count").default(0).notNull(),
    keywords: text("keywords").array(),
    content_hash: varchar("content_hash", { length: 64 }).default("").notNull(),
    // 링크 카드 줄 URL -> 발행 때 받은 제목, 설명, 이미지
    link_cards:
      jsonb("link_cards").$type<
        Record<string, { title?: string; description?: string; image?: string }>
      >(),
  },
  (table) => ({
    created_at_idx: index("article_idx_created_at").on(table.created_at),
    title_idx: index("article_idx_title").on(table.title),
    is_published_idx: index("article_idx_is_published").on(table.is_published),
  }),
);

export const Tag = schema.table("tag", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 64 }).notNull().unique("tag_uidx_name"),
  slug: varchar("slug", { length: 64 }).unique("tag_uidx_slug"),
  description: text("description"),
});

export const ArticleToTag = schema.table(
  "article_to_tag",
  {
    id: serial("id").primaryKey(),
    article_id: integer("article_id")
      .notNull()
      .references(() => Article.id, {
        onDelete: "cascade",
      }),
    tag_name: varchar("name", { length: 64 })
      .notNull()
      .references(() => Tag.name, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    article_tag_uidx: unique("article_to_tag_uidx_article_name").on(
      table.article_id,
      table.tag_name,
    ),
  }),
);

export const Asset = schema.table("asset", {
  id: serial("id").primaryKey(),
  article_id: integer("article_id").references(() => Article.id, {
    onDelete: "cascade",
  }),
  original_url: text("original_url"),
  url: text("url").notNull(),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt"),
  caption: text("caption"),
});

export const ArticleRedirect = schema.table("article_redirect", {
  id: serial("id").primaryKey(),
  from_path: varchar("from_path", { length: 512 })
    .notNull()
    .unique("article_redirect_uidx_from_path"),
  article_id: integer("article_id")
    .notNull()
    .references(() => Article.id, { onDelete: "cascade" }),
  kind: RedirectKind("kind").notNull(),
});

export const ArticleRevision = schema.table("article_revision", {
  id: serial("id").primaryKey(),
  article_id: integer("article_id")
    .notNull()
    .references(() => Article.id, { onDelete: "cascade" }),
  body_md: text("body_md").notNull(),
  content_hash: varchar("content_hash", { length: 64 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
