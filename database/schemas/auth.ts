import { prooferSchema } from "@/database/engine";
import { char, serial, uniqueIndex } from "drizzle-orm/pg-core";

export const User = prooferSchema.table(
  "user",
  {
    id: serial("id").primaryKey(),
    email: char("email", { length: 64 }).notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("idx_email").on(table.email),
    };
  },
);
