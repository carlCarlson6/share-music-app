import { date, datetime, varchar } from "drizzle-orm/mysql-core";
import { createTable } from "../infrastructure/db/schema";

export const recomendationsTable = createTable("recomendations", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  url: varchar("url", { length: 500 }).notNull(),
  createdAt: datetime("createdAt").notNull(),
});
