import { prooferSchema } from "@/database/engine";
import { varchar, serial, uniqueIndex } from "drizzle-orm/pg-core";

export const User = prooferSchema.table(
  "user",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 64 }).notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("idx_email").on(table.email),
    };
  },
);
