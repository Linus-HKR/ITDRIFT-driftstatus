import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const schedule = sqliteTable("schedule", {
  id: integer().primaryKey({ autoIncrement: true }),
});

export const internalUsers = sqliteTable("internal_users", {
  id: integer().primaryKey({ autoIncrement: true }),
  username: text().unique().notNull(),
  name: text().notNull(),
});
