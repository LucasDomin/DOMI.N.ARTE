import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").default(""),
  category: text("category").notNull().default("identidade"), // identidade, web, saas
  client: text("client").default(""),
  year: text("year").default(""),
  location: text("location").default(""),
  duration: text("duration").default(""),
  format: text("format").default(""),
  coverImage: text("cover_image"),
  color: text("color").default("#C9A96E"), // accent color per project!
  video: text("video").default(""),
  poster: text("poster").default(""),
  description: text("description").notNull(),
  isDraft: boolean("is_draft").notNull().default(false),
  stills: jsonb("stills").default([]), // array of { url: string, type: string, order: number }
  credits: jsonb("credits").default([]), // array of { role: string, name: string }
  awards: jsonb("awards").default([]), // array of strings
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const siteConfig = pgTable("site_config", {
  id: text("id").primaryKey().default("default"),
  heroImages: jsonb("hero_images").default([]),
  heroScenes: jsonb("hero_scenes").default([]),
  heroReels: jsonb("hero_reels").default([]),
  backgroundVideo: jsonb("background_video").default({ url: "", poster: "" }),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type SiteConfig = typeof siteConfig.$inferSelect;
