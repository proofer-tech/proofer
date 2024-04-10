import { schema } from "@/database/engine";
import { index, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createEnumType } from "@/src/utils/drizzle";

export enum CommandState {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  TIMEOUT = "TIMEOUT",
}
export const CommandStateEnum = createEnumType(
  "enum_command_state",
  CommandState,
);
export const Command: any = schema.table(
  "command",
  {
    id: serial("id").primaryKey(),
    parents: varchar("parents", { length: 64 }).references(() => Command.hash, {
      onDelete: "cascade",
    }),
    hash: varchar("hash", { length: 64 }).unique().notNull(),
    name: varchar("name", { length: 64 }).notNull(),
    arguments: text("arguments").notNull().default(""),

    state: CommandStateEnum("state").default(CommandState.PENDING),
    memo: text("memo").default(""),

    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    idx_cmd_name: index("command_name_idx").on(table.name),
    idx_cmd_state: index("state_idx").on(table.state),
  }),
);
