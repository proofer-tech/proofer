DO $$ BEGIN
 CREATE TYPE "enum_command_state" AS ENUM('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'CANCELLED', 'TIMEOUT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "proofer"."command" ALTER COLUMN "state" SET DATA TYPE enum_command_state;--> statement-breakpoint
ALTER TABLE "proofer"."command" ADD COLUMN "parents" varchar(64);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "proofer"."command" ADD CONSTRAINT "command_parents_command_hash_fk" FOREIGN KEY ("parents") REFERENCES "proofer"."command"("hash") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
