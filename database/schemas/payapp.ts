import { schema } from "@/database/engine";
import { jsonb, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const PayAppCallback = schema.table("payapp_callback", {
  id: serial("id").primaryKey(),
  raw_body: text("raw_body").notNull(),
  parsed: jsonb("parsed").notNull(),
  mul_no: varchar("mul_no", { length: 32 }),
  pay_state: varchar("pay_state", { length: 8 }),
  received_at: timestamp("received_at").defaultNow().notNull(),
});
