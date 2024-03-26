ALTER TABLE "proofer"."github_commit" DROP CONSTRAINT "github_commit_repository_id_github_repository_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_issue" DROP CONSTRAINT "github_issue_repository_id_github_repository_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request" DROP CONSTRAINT "github_pull_request_repository_id_github_repository_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request_review" DROP CONSTRAINT "github_pull_request_review_pull_request_id_github_pull_request_pull_request_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_pull_request_review_comment" DROP CONSTRAINT "github_pull_request_review_comment_pull_request_review_id_github_pull_request_review_review_id_fk";
--> statement-breakpoint
ALTER TABLE "proofer"."github_repository" DROP CONSTRAINT "github_repository_installation_id_github_installation_installation_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "github_commit_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "proofer"."github_pull_request" ADD CONSTRAINT "github_pull_request_repository_id_github_repository_id_fk" FOREIGN KEY ("repository_id") REFERENCES "proofer"."github_repository"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "proofer"."github_pull_request_review_comment" ADD CONSTRAINT "github_pull_request_review_comment_pull_request_review_id_github_pull_request_review_review_id_fk" FOREIGN KEY ("pull_request_review_id") REFERENCES "proofer"."github_pull_request_review"("review_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."github_repository" ADD CONSTRAINT "github_repository_installation_id_github_installation_installation_id_fk" FOREIGN KEY ("installation_id") REFERENCES "proofer"."github_installation"("installation_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
