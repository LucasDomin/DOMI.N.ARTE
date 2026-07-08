import type { Metadata } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Project } from "@/db/schema";
import { SAMPLE_PROJECTS } from "@/lib/sample-projects";
import WorkPageClient from "./work-page-client";

async function getProject(slug: string): Promise<Project | null> {
  if (!db) {
    const sample = SAMPLE_PROJECTS.find((p) => p.slug === slug);
    return (sample as unknown as Project) ?? null;
  }
  try {
    const [p] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (p) return p;
    // Fallback to sample if not found in DB (helps preview before real content exists)
    const sample = SAMPLE_PROJECTS.find((s) => s.slug === slug);
    return (sample as unknown as Project) ?? null;
  } catch {
    const sample = SAMPLE_PROJECTS.find((s) => s.slug === slug);
    return (sample as unknown as Project) ?? null;
  }
}

async function getAdjacentProjects(currentSlug: string) {
  if (!db) {
    const all = SAMPLE_PROJECTS as unknown as Project[];
    const idx = all.findIndex((p) => p.slug === currentSlug);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx > 0 ? all[idx - 1] : all[all.length - 1] ?? null,
      next: idx < all.length - 1 ? all[idx + 1] : all[0] ?? null,
    };
  }
  try {
    const all = await db.select().from(projects).where(eq(projects.isDraft, false)).orderBy(desc(projects.createdAt));
    if (all.length === 0) {
      const sampleAll = SAMPLE_PROJECTS as unknown as Project[];
      const idx = sampleAll.findIndex((p) => p.slug === currentSlug);
      if (idx === -1) return { prev: null, next: null };
      return {
        prev: idx > 0 ? sampleAll[idx - 1] : sampleAll[sampleAll.length - 1] ?? null,
        next: idx < sampleAll.length - 1 ? sampleAll[idx + 1] : sampleAll[0] ?? null,
      };
    }
    const idx = all.findIndex((p) => p.slug === currentSlug);
    return {
      prev: idx > 0 ? all[idx - 1] : all[all.length - 1] ?? null,
      next: idx < all.length - 1 ? all[idx + 1] : all[0] ?? null,
    };
  } catch {
    return { prev: null, next: null };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Obra não encontrada — DOMI.N.ARTE" };
  const title = `${project.title} — DOMI.N.ARTE`;
  const description = project.subtitle || project.description || `${project.category} · ${project.client}`;
  const image = project.seoOgImage || project.coverImage;
  return {
    title, description,
    openGraph: { title, description, type: "article", images: image ? [{ url: image, width: 1200, height: 630 }] : [] },
    twitter: { card: "summary_large_image", title, description, images: image ? [image] : [] },
    alternates: { canonical: `/work/${slug}` },
  };
}

export async function generateStaticParams() {
  // Always include sample slugs so preview pages work pre-database
  const sampleParams = SAMPLE_PROJECTS.map((p) => ({ slug: p.slug }));
  if (!db) return sampleParams;
  try {
    const rows = await db.select({ slug: projects.slug }).from(projects).where(eq(projects.isDraft, false));
    return rows.length > 0 ? rows.map((p) => ({ slug: p.slug })) : sampleParams;
  } catch {
    return sampleParams;
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, adjacent] = await Promise.all([getProject(slug), getAdjacentProjects(slug)]);
  if (!project || project.isDraft) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@type": "Organization", name: "DOMI.N.ARTE" },
    dateCreated: project.year,
    image: project.coverImage,
    genre: project.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WorkPageClient project={project} nextProject={adjacent.next} prevProject={adjacent.prev} />
    </>
  );
}
