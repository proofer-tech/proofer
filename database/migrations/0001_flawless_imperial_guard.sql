DO $$ BEGIN
 CREATE TYPE "proofer.enum_command_state" AS ENUM('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'CANCELLED', 'TIMEOUT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "enum_github_event_type" AS ENUM('commit', 'push', 'pull_request.opened', 'pull_request.closed', 'pull_request.merged', 'pull_request_review.submitted', 'pull_request_review_comment.created', 'issues.opened', 'issue_comment.created', 'release');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."command" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" varchar(64) NOT NULL,
	"name" varchar(64) NOT NULL,
	"arguments" text DEFAULT '' NOT NULL,
	"state" "proofer.enum_command_state" DEFAULT 'PENDING',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "command_hash_unique" UNIQUE("hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."processed_github_time_series" (
	"id" serial PRIMARY KEY NOT NULL,
	"event" "enum_github_event_type",
	"reference_id" varchar(64) NOT NULL,
	"workspace_id" serial NOT NULL,
	"installation_id" serial NOT NULL,
	"repository_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"timestamp" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "command_name_idx" ON "proofer"."command" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "state_idx" ON "proofer"."command" ("state");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "reference_id_idx" ON "proofer"."processed_github_time_series" ("reference_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."processed_github_time_series" ADD CONSTRAINT "processed_github_time_series_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "proofer"."workspace"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."processed_github_time_series" ADD CONSTRAINT "processed_github_time_series_installation_id_github_installation_id_fk" FOREIGN KEY ("installation_id") REFERENCES "proofer"."github_installation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."processed_github_time_series" ADD CONSTRAINT "processed_github_time_series_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."processed_github_time_series" ADD CONSTRAINT "processed_github_time_series_user_id_github_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
