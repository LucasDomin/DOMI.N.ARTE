/**
 * Homepage — Server Component shell.
 *
 * Rationale: The interactive parts (Loader, Parallax, AnimatePresence) are
 * client-only. But the work showcase data should be fetched on the server so
 * the page is SSR-ready and the projects are available without a client fetch.
 * We pass the data down as props to the client shell.
 */
import type { Metadata } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";
import type { Project } from "@/db/schema";
import HomePageClient from "./home-client";

export const metadata: Metadata = {
  title: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
  description:
    "Plataforma editorial de direção criativa. Identidade visual, motion, storytelling cinematográfico. Estúdio independente.",
  openGraph: {
    title: "DOMI.N.ARTE — Direção criativa para marcas que lideram",
    description:
      "Interseção autoral entre branding, arte digital, motion e storytelling cinematográfico.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMI.N.ARTE",
    description: "Plataforma editorial de direção criativa.",
  },
};

async function getPublishedProjects(): Promise<Project[]> {
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
