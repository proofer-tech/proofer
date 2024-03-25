CREATE INDEX IF NOT EXISTS "idx_ghi_number" ON "proofer"."github_issue" ("number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_ghpr_number" ON "proofer"."github_pull_request" ("number");--> statement-breakpoint
ALTER TABLE "proofer"."github_commit" ADD CONSTRAINT "uidx_ghc_sha" UNIQUE("sha");