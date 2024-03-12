CREATE TABLE IF NOT EXISTS "proofer"."user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "proofer"."user" ("email");