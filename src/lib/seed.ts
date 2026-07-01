import "server-only";
import { db } from "@/db";
import { projects, siteConfig } from "@/db/schema";
import { sql } from "drizzle-orm";
import { DEFAULT_PROJECTS, DEFAULT_SITE_CONFIG } from "./defaults";

export async function seedIfEmpty() {
  if (!db) return;
  try {
    const count = await db.select({ c: sql<number>`count(*)` }).from(projects);
    if (Number(count[0]?.c ?? 0) === 0) {
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
        ...DEFAULT_SITE_CONFIG,
        id: "default",
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}
