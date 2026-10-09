ALTER TABLE IF EXISTS "proofer"."article" SET SCHEMA "public";
--> statement-breakpoint
ALTER TABLE IF EXISTS "proofer"."article_to_tag" SET SCHEMA "public";
--> statement-breakpoint
ALTER TABLE IF EXISTS "proofer"."tag" SET SCHEMA "public";
--> statement-breakpoint
ALTER TABLE IF EXISTS "proofer"."payapp_callback" SET SCHEMA "public";
--> statement-breakpoint
CREATE VIEW "proofer"."payapp_callback" AS SELECT * FROM "public"."payapp_callback";
