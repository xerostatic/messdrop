import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  color: text("color").notNull().default("cyan"),
  depth: integer("depth").notNull().default(1), // 1-5, affects size and blur
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

