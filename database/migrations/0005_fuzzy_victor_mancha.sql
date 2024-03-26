ALTER TABLE "proofer"."user" ALTER COLUMN "email" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "proofer"."workspace" ALTER COLUMN "slug" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "proofer"."workspace" ADD COLUMN "name" varchar(16) DEFAULT '' NOT NULL;