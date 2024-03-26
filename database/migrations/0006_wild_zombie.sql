CREATE TABLE IF NOT EXISTS "proofer"."github_installation" (
	"id" serial PRIMARY KEY NOT NULL,
	"installation_id" integer NOT NULL,
	"avatar_url" text,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "ghi_uidx_installation_id" UNIQUE("installation_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_repository" (
	"id" serial PRIMARY KEY NOT NULL,
	"installation_id" integer NOT NULL,
	"full_name" varchar(140) NOT NULL,
	"html_url" varchar(256) NOT NULL,
	"description" text,
	"visibility" varchar(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."integration" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_str" varchar(16) NOT NULL,
	"slug" varchar(16) NOT NULL,
	"name" varchar(16) NOT NULL,
	"description" text DEFAULT '',
	"icon_url" text,
	CONSTRAINT "integration_uidx_slug" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."integration_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(16) NOT NULL,
	"color" varchar(16) DEFAULT 'gray',
	CONSTRAINT "itt_uidx_name" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."integration_to_tag" (
	"integration_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "idx_email";--> statement-breakpoint
DROP INDEX IF EXISTS "idx_slug";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ittt_uidx_bridge" ON "proofer"."integration_to_tag" ("integration_id","tag_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_repository" ADD CONSTRAINT "github_repository_installation_id_github_installation_installation_id_fk" FOREIGN KEY ("installation_id") REFERENCES "proofer"."github_installation"("installation_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."integration_to_tag" ADD CONSTRAINT "integration_to_tag_integration_id_integration_id_fk" FOREIGN KEY ("integration_id") REFERENCES "proofer"."integration"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."integration_to_tag" ADD CONSTRAINT "integration_to_tag_tag_id_integration_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "proofer"."integration_tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "proofer"."user" ADD CONSTRAINT "user_uidx_email" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "proofer"."workspace" ADD CONSTRAINT "workspace_uidx_slug" UNIQUE("slug");