import { pgTable, serial, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

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
  color: text("color").default("#C9A56C"),

  // Obras Narrative (Momento 3)
  description: text("description").notNull(),
  context: text("context").default(""),
  concept: text("concept").default(""),
  direction: text("direction").default(""),
  result: text("result").default(""),

  // State
  isDraft: boolean("is_draft").notNull().default(false),
  featured: boolean("featured").notNull().default(false),

  // Media
  stills: jsonb("stills").default([]),
  credits: jsonb("credits").default([]),
  awards: jsonb("awards").default([]),

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
