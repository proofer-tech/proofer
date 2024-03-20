CREATE TABLE IF NOT EXISTS "proofer"."github_commit" (
	"id" serial PRIMARY KEY NOT NULL,
	"commit_id" varchar(100) NOT NULL,
	"sha" varchar(100) NOT NULL,
	"repository_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"committer_id" integer NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghc_commit_id" UNIQUE("commit_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_issue" (
	"id" serial PRIMARY KEY NOT NULL,
	"repository_id" integer NOT NULL,
	"issue_id" integer NOT NULL,
	"number" integer NOT NULL,
	"state" varchar(16) NOT NULL,
	"title" varchar(100) NOT NULL,
	"body" text,
	"html_url" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"closed_at" timestamp,
	"user_id" integer NOT NULL,
	"assignee_id" integer,
	"updated_by_id" integer,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghi_issue_id" UNIQUE("issue_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_pull_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"repository_id" integer NOT NULL,
	"pull_request_id" integer NOT NULL,
	"number" integer NOT NULL,
	"state" varchar(16) NOT NULL,
	"title" varchar(100) NOT NULL,
	"body" text,
	"html_url" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"closed_at" timestamp,
	"merged_at" timestamp,
	"user_id" integer NOT NULL,
	"assignee_id" integer,
	"updated_by_id" integer,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghpr_pull_request_id" UNIQUE("pull_request_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_pull_request_review" (
	"id" serial PRIMARY KEY NOT NULL,
	"pull_request_id" integer NOT NULL,
	"review_id" integer NOT NULL,
	"state" varchar(16) NOT NULL,
	"body" text,
	"html_url" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghprr_review_id" UNIQUE("review_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_pull_request_review_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"review_comment_id" integer NOT NULL,
	"pull_request_review_id" integer NOT NULL,
	"body" text,
	"html_url" varchar(512) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghprrc_review_comment_id" UNIQUE("review_comment_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"login" varchar(100) NOT NULL,
	"email" varchar(100),
	"avatar_url" varchar(512),
	"html_url" varchar(512),
	"type" varchar(32),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ghu_uidx_user_id" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ALTER COLUMN "avatar_url" SET DATA TYPE varchar(512);--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ALTER COLUMN "bio" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ALTER COLUMN "blog" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ALTER COLUMN "full_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ALTER COLUMN "html_url" SET DATA TYPE varchar(512);--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ALTER COLUMN "visibility" SET DATA TYPE varchar(16);--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ALTER COLUMN "visibility" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ADD COLUMN "repository_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ADD COLUMN "name" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_ghr_bridge" ON "proofer"."github_repository" ("installation_id","repository_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_author_id_github_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_committer_id_github_user_id_fk" FOREIGN KEY ("committer_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_user_id_github_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_assignee_id_github_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_updated_by_id_github_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_user_id_github_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_assignee_id_github_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_updated_by_id_github_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review" ADD CONSTRAINT "github_pull_request_review_pull_request_id_github_pull_request_pull_request_id_fk" FOREIGN KEY ("pull_request_id") REFERENCES "proofer"."github_pull_request"("pull_request_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review" ADD CONSTRAINT "github_pull_request_review_user_id_github_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review_comment" ADD CONSTRAINT "github_pull_request_review_comment_pull_request_review_id_github_pull_request_review_review_id_fk" FOREIGN KEY ("pull_request_review_id") REFERENCES "proofer"."github_pull_request_review"("review_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review_comment" ADD CONSTRAINT "github_pull_request_review_comment_user_id_github_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
