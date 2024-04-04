CREATE TABLE IF NOT EXISTS "proofer"."github_issue_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"issue_id" varchar(32) NOT NULL,
	"comment_id" integer NOT NULL,
	"body" text,
	"html_url" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghic_comment_id" UNIQUE("comment_id")
);
--> statement-breakpoint
ALTER TABLE "proofer"."processed_github_time_series" DROP CONSTRAINT "processed_github_time_series_installation_id_github_installation_id_fk";
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghic_created_at" ON "proofer"."github_issue_comment" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghic_timestamp" ON "proofer"."github_issue_comment" ("timestamp");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."processed_github_time_series" ADD CONSTRAINT "processed_github_time_series_installation_id_github_installation_installation_id_fk" FOREIGN KEY ("installation_id") REFERENCES "proofer"."github_installation"("installation_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue_comment" ADD CONSTRAINT "github_issue_comment_issue_id_github_issue_issue_id_fk" FOREIGN KEY ("issue_id") REFERENCES "proofer"."github_issue"("issue_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue_comment" ADD CONSTRAINT "github_issue_comment_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
