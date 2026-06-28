import "server-only";
import { db } from "@/db";
import { projects, siteConfig } from "@/db/schema";
import { sql } from "drizzle-orm";
import { DEFAULT_PROJECTS, DEFAULT_SITE_CONFIG } from "./defaults";

export async function seedIfEmpty() {
  try {
    const count = await db.select({ c: sql<number>`count(*)` }).from(projects);
    if (Number(count[0]?.c ?? 0) === 0) {
      // Map out id from DEFAULT_PROJECTS since id is autoincrement serial primary key
      const payload = DEFAULT_PROJECTS.map(({ id, ...p }) => ({
        ...p,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await db.insert(projects).values(payload);
    }

    const configCount = await db.select({ c: sql<number>`count(*)` }).from(siteConfig);
    if (Number(configCount[0]?.c ?? 0) === 0) {
      await db.insert(siteConfig).values({
        id: "default",
        manifestoTitle: DEFAULT_SITE_CONFIG.manifestoTitle,
        manifestoText1: DEFAULT_SITE_CONFIG.manifestoText1,
        manifestoText2: DEFAULT_SITE_CONFIG.manifestoText2,
        manifestoText3: DEFAULT_SITE_CONFIG.manifestoText3,
        aboutTitle: DEFAULT_SITE_CONFIG.aboutTitle,
        aboutText1: DEFAULT_SITE_CONFIG.aboutText1,
        aboutText2: DEFAULT_SITE_CONFIG.aboutText2,
        contactEmail: DEFAULT_SITE_CONFIG.contactEmail,
        contactPhone: DEFAULT_SITE_CONFIG.contactPhone,
        contactAvailability: DEFAULT_SITE_CONFIG.contactAvailability,
        socialInstagram: DEFAULT_SITE_CONFIG.socialInstagram,
        socialBehance: DEFAULT_SITE_CONFIG.socialBehance,
        socialLinkedin: DEFAULT_SITE_CONFIG.socialLinkedin,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}
