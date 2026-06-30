import type { MetadataRoute } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dominarte.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let publishedProjects: { slug: string; updatedAt: Date | null }[] = [];

  try {
    publishedProjects = await db
      .select({ slug: projects.slug, updatedAt: projects.updatedAt })
      .from(projects)
      .where(eq(projects.isDraft, false))
      .orderBy(desc(projects.createdAt));
  } catch {
    // DB unavailable during build — return static routes only
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = publishedProjects.map((p) => ({
    url: `${BASE_URL}/work/${p.slug}`,
    lastModified: p.updatedAt ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
