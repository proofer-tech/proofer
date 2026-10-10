CREATE TYPE "public"."article_source" AS ENUM('native', 'medium_publication', 'medium_personal');--> statement-breakpoint
CREATE TYPE "public"."article_status" AS ENUM('draft', 'published', 'unlisted');--> statement-breakpoint
CREATE TYPE "public"."author_kind" AS ENUM('org', 'person');--> statement-breakpoint
CREATE TYPE "public"."article_redirect_kind" AS ENUM('medium', 'legacy_blog', 'slug_change');--> statement-breakpoint
CREATE TABLE "article_redirect" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_path" varchar(512) NOT NULL,
	"article_id" integer NOT NULL,
	"kind" "article_redirect_kind" NOT NULL,
	CONSTRAINT "article_redirect_uidx_from_path" UNIQUE("from_path")
);
--> statement-breakpoint
CREATE TABLE "article_revision" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" integer NOT NULL,
	"body_md" text NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "asset" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" integer,
	"original_url" text,
	"url" text NOT NULL,
	"width" integer,
	"height" integer,
	"alt" text,
	"caption" text
);
--> statement-breakpoint
CREATE TABLE "author" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(64) NOT NULL,
	"kind" "author_kind" DEFAULT 'person' NOT NULL,
	"display_name" varchar(64) NOT NULL,
	"bio" text,
	"avatar_url" text,
	"medium_username" varchar(64),
	"medium_url" text,
	"website_url" text,
	"same_as" jsonb,
	"is_default" boolean DEFAULT false NOT NULL,
	CONSTRAINT "author_uidx_slug" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "article_to_tag" ALTER COLUMN "article_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "article_to_tag" ALTER COLUMN "article_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "subtitle" varchar(160) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "body_md" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "source_html" text;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "status" "article_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "published_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "author_id" integer;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "canonical_url" text;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "source" "article_source" DEFAULT 'native' NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "medium_post_id" varchar(16);--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "medium_url" text;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "cover_asset_id" integer;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "reading_minutes" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "word_count" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "keywords" text[];--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "content_hash" varchar(64) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "slug" varchar(64);--> statement-breakpoint
ALTER TABLE "tag" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "article_redirect" ADD CONSTRAINT "article_redirect_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article_revision" ADD CONSTRAINT "article_revision_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asset" ADD CONSTRAINT "asset_article_id_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."article"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_cover_asset_id_asset_id_fk" FOREIGN KEY ("cover_asset_id") REFERENCES "public"."asset"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "article" ADD CONSTRAINT "article_uidx_medium_post_id" UNIQUE("medium_post_id");--> statement-breakpoint
ALTER TABLE "article_to_tag" ADD CONSTRAINT "article_to_tag_uidx_article_name" UNIQUE("article_id","name");--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_uidx_slug" UNIQUE("slug");