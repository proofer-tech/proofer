CREATE TABLE IF NOT EXISTS "proofer"."processed_github_pull_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"installation_id" integer NOT NULL,
	"repository_id" integer NOT NULL,
	"pull_request_id" integer,
	"number" integer NOT NULL,
	"title" varchar(100) NOT NULL,
	"html_url" varchar(512) NOT NULL,
	"coding_time" integer,
	"pickup_time" integer,
	"review_time" integer,
	"deploy_time" integer,
	CONSTRAINT "uidx_pghpr_pull_request_id" UNIQUE("pull_request_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_pghpr_pull_number" ON "proofer"."processed_github_pull_request" ("number");