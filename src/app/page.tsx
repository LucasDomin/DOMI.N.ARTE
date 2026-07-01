import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";
import type { Project } from "@/db/schema";
import HomePageClient from "./home-client";

async function getPublishedProjects(): Promise<Project[]> {
  if (!db) return DEFAULT_PROJECTS.filter((p) => !p.isDraft) as Project[];
  try {
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.isDraft, false))
      .orderBy(desc(projects.createdAt));
    return result.length > 0 ? result : DEFAULT_PROJECTS.filter((p) => !p.isDraft) as Project[];
  } catch {
    return DEFAULT_PROJECTS.filter((p) => !p.isDraft) as Project[];
  }
}

export default async function HomePage() {
  const publishedProjects = await getPublishedProjects();
  return <HomePageClient initialProjects={publishedProjects} />;
}
