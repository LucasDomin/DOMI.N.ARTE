import { pgTable, serial, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").default(""),
  category: text("category").notNull().default("identidade"), // branding, motion, film, photography, creative-direction
  client: text("client").default(""),
  year: text("year").default(""),
  location: text("location").default(""),
  duration: text("duration").default(""),
  format: text("format").default(""),
  coverImage: text("cover_image"),
  color: text("color").default("#C9A56C"),

  // Hero section fields
  mainVideo: text("main_video").default(""),
  headline: text("headline").default(""),
  subheadline: text("subheadline").default(""),

  // Obras Narrative (Momento 3)
  description: text("description").notNull(),
  context: text("context").default(""),
  concept: text("concept").default(""), // conceito (backwards compatibility)
  direction: text("direction").default(""), // direção (backwards compatibility)
  challenge: text("challenge").default(""), // desafio (new request)
  solution: text("solution").default(""),
  result: text("result").default(""),

  // State
  isDraft: boolean("is_draft").notNull().default(false),
  featured: boolean("featured").notNull().default(false),

  // Media & Lists
  stills: jsonb("stills").default([]), // array of { url: string, type: string, order: number }
  credits: jsonb("credits").default([]), // array of { role: string, name: string }
  awards: jsonb("awards").default([]), // array of strings
  tags: jsonb("tags").default([]), // array of strings (e.g. branding, motion, film, photography, creative-direction)

  // SEO
  seoTitle: text("seo_title").default(""),
  seoDescription: text("seo_description").default(""),
  seoOgImage: text("seo_og_image").default(""),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Clientes/parceiros — logos exibidos na barra rolante da home
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
  link: text("link").default(""), // URL aberta ao clicar na logo (opcional)
  order: integer("order").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const siteConfig = pgTable("site_config", {
  id: text("id").primaryKey().default("default"),
  manifestoTitle: text("manifesto_title").default(""),
  manifestoText1: text("manifesto_text_1").default(""),
  manifestoText2: text("manifesto_text_2").default(""),
  manifestoText3: text("manifesto_text_3").default(""),
  aboutTitle: text("about_title").default(""),
  aboutText1: text("about_text_1").default(""),
  aboutText2: text("about_text_2").default(""),
  contactEmail: text("contact_email").default(""),
  contactPhone: text("contact_phone").default(""),
  contactAvailability: text("contact_availability").default(""),
  socialInstagram: text("social_instagram").default(""),
  socialBehance: text("social_behance").default(""),
  socialLinkedin: text("social_linkedin").default(""),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type SiteConfig = typeof siteConfig.$inferSelect;
export type NewSiteConfig = typeof siteConfig.$inferInsert;
export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
