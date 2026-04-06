import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  label: text("label").notNull(),
  page: text("page").notNull(),
  type: text("type").notNull().default("text"),
});

export type SiteContent = typeof siteContentTable.$inferSelect;
