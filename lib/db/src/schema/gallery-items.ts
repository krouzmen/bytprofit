import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const galleryItemsTable = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  description: text("description").notNull().default(""),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type GalleryItem = typeof galleryItemsTable.$inferSelect;
