CREATE TABLE IF NOT EXISTS "proofer"."article" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(256) NOT NULL,
	"origin" varchar(512) NOT NULL,
	"title" varchar(256) NOT NULL,
	"contents" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "article_uidx_slug" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."article_to_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"articleId" serial NOT NULL,
	"name" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	CONSTRAINT "tag_uidx_name" UNIQUE("name")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_idx_createdAt" ON "proofer"."article" ("createdAt");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."article_to_tag" ADD CONSTRAINT "article_to_tag_articleId_article_id_fk" FOREIGN KEY ("articleId") REFERENCES "proofer"."article"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."article_to_tag" ADD CONSTRAINT "article_to_tag_name_tag_name_fk" FOREIGN KEY ("name") REFERENCES "proofer"."tag"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
