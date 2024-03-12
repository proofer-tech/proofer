import { prooferSchema } from "@/database/engine";
import { serial, text, uniqueIndex } from "drizzle-orm/pg-core";

export const User = prooferSchema.table(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("idx_email").on(table.email),
    };
  },
);
