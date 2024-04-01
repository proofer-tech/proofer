CREATE TABLE IF NOT EXISTS "proofer"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(64) NOT NULL,
	CONSTRAINT "user_uidx_email" UNIQUE("email")
);
--> statement-breakpoint
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
CREATE TABLE IF NOT EXISTS "proofer"."github_commit" (
	"id" serial PRIMARY KEY NOT NULL,
	"sha" varchar(100) NOT NULL,
	"repository_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	"committer_id" integer NOT NULL,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "uidx_ghc_sha" UNIQUE("sha")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_installation" (
	"id" serial PRIMARY KEY NOT NULL,
	"installation_id" integer NOT NULL,
	"avatar_url" varchar(512),
	"name" varchar(100) NOT NULL,
	"bio" varchar(128),
	"blog" varchar(128),
	"target_type" varchar(32),
	"repository_selection" varchar(16),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ghi_uidx_installation_id" UNIQUE("installation_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."github_issue" (
	"id" serial PRIMARY KEY NOT NULL,
	"repository_id" integer NOT NULL,
	"issue_id" varchar(32) NOT NULL,
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
	"merge_commit_sha" varchar(64),
	"user_id" integer NOT NULL,
	"assignee_id" integer,
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
CREATE TABLE IF NOT EXISTS "proofer"."github_repository" (
	"id" serial PRIMARY KEY NOT NULL,
	"installation_id" integer NOT NULL,
	"repository_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"html_url" varchar(512) NOT NULL,
	"description" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"language" varchar(32),
	"visibility" varchar(16)
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
CREATE TABLE IF NOT EXISTS "proofer"."workspace_to_github_installation" (
	"id" serial PRIMARY KEY NOT NULL,
	"uuid1" uuid DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" integer NOT NULL,
	"installation_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."integration" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_str" varchar(16) NOT NULL,
	"slug" varchar(16) NOT NULL,
	"name" varchar(16) NOT NULL,
	"description" text DEFAULT '',
	"icon_url" text,
	"is_implemented" boolean DEFAULT false,
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
	"id" serial PRIMARY KEY NOT NULL,
	"integration_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."workspace" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(64) NOT NULL,
	"name" varchar(16) DEFAULT '' NOT NULL,
	"owner_id" integer NOT NULL,
	"logo_url" text,
	CONSTRAINT "workspace_uidx_slug" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "proofer"."workspace_member" (
	"id" serial PRIMARY KEY NOT NULL,
	"workspace_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"is_manager" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "article_idx_createdAt" ON "proofer"."article" ("createdAt");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghc_created_at" ON "proofer"."github_commit" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghc_timestamp" ON "proofer"."github_commit" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghi_number" ON "proofer"."github_issue" ("number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghi_created_at" ON "proofer"."github_issue" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghi_timestamp" ON "proofer"."github_issue" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghpr_number" ON "proofer"."github_pull_request" ("number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghpr_created_at" ON "proofer"."github_pull_request" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghpr_timestamp" ON "proofer"."github_pull_request" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprr_created_at" ON "proofer"."github_pull_request_review" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprr_timestamp" ON "proofer"."github_pull_request_review" ("timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprrc_created_at" ON "proofer"."github_pull_request_review_comment" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghprrc_timestamp" ON "proofer"."github_pull_request_review_comment" ("timestamp");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uidx_ghr_bridge" ON "proofer"."github_repository" ("installation_id","repository_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "wtgi_uidx_bridge" ON "proofer"."workspace_to_github_installation" ("workspace_id","installation_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ittt_uidx_bridge" ON "proofer"."integration_to_tag" ("integration_id","tag_id");--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_author_id_github_user_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_committer_id_github_user_user_id_fk" FOREIGN KEY ("committer_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_issue" ADD CONSTRAINT "github_issue_assignee_id_github_user_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_assignee_id_github_user_user_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review" ADD CONSTRAINT "github_pull_request_review_pull_request_id_github_pull_request_pull_request_id_fk" FOREIGN KEY ("pull_request_id") REFERENCES "proofer"."github_pull_request"("pull_request_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review" ADD CONSTRAINT "github_pull_request_review_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review_comment" ADD CONSTRAINT "github_pull_request_review_comment_pull_request_review_id_github_pull_request_review_review_id_fk" FOREIGN KEY ("pull_request_review_id") REFERENCES "proofer"."github_pull_request_review"("review_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_pull_request_review_comment" ADD CONSTRAINT "github_pull_request_review_comment_user_id_github_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."github_user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_repository" ADD CONSTRAINT "github_repository_installation_id_github_installation_installation_id_fk" FOREIGN KEY ("installation_id") REFERENCES "proofer"."github_installation"("installation_id") ON DELETE cascade ON UPDATE no action;
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
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace" ADD CONSTRAINT "workspace_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "proofer"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace_member" ADD CONSTRAINT "workspace_member_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "proofer"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."workspace_member" ADD CONSTRAINT "workspace_member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "proofer"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
