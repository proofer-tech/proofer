ALTER TABLE "proofer"."user" ALTER COLUMN "email" SET DATA TYPE char(64);--> statement-breakpoint
ALTER TABLE "proofer"."workspace" ALTER COLUMN "slug" SET DATA TYPE char(16);--> statement-breakpoint
ALTER TABLE "proofer"."workspace" DROP COLUMN IF EXISTS "title";