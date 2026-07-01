import type { MetadataRoute } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://domi-n-arte.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: { slug: string; updatedAt: Date | null }[] = [];
  try {
    if (!db) throw new Error("no db");
    slugs = await db
      .select({ slug: projects.slug, updatedAt: projects.updatedAt })
      .from(projects)
      .where(eq(projects.isDraft, false))
      .orderBy(desc(projects.createdAt));
  } catch { /* build-time: no db */ }

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...slugs.map((p) => ({
      url: `${BASE_URL}/work/${p.slug}`,
      lastModified: p.updatedAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
