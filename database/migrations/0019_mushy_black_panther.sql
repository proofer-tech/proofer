ALTER TABLE "proofer"."article" ALTER COLUMN "origin" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."article" ALTER COLUMN "contents" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "proofer"."article" ADD COLUMN "description" varchar(80);--> statement-breakpoint
ALTER TABLE "proofer"."article" ADD COLUMN "image" text;