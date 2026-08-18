CREATE TABLE IF NOT EXISTS "proofer"."payapp_callback" (
	"id" serial PRIMARY KEY NOT NULL,
	"raw_body" text NOT NULL,
	"parsed" jsonb NOT NULL,
	"mul_no" varchar(32),
	"pay_state" varchar(8),
	"received_at" timestamp DEFAULT now() NOT NULL
);
