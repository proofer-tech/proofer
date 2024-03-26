ALTER TABLE "proofer"."github_installation" ADD COLUMN "bio" varchar(128);--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ADD COLUMN "blog" varchar(128);--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ADD COLUMN "target_type" varchar(32);--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ADD COLUMN "repository_selection" varchar(16);--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."github_installation" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;