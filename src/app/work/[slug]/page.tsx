import type { Metadata } from "next";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Project } from "@/db/schema";
import WorkPageClient from "./work-page-client";

async function getProject(slug: string): Promise<Project | null> {
  if (!db) return null;
  try {
    const [p] = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return p ?? null;
  } catch { return null; }
}

async function getAdjacentProjects(currentSlug: string) {
  if (!db) return { prev: null, next: null };
  try {
    const all = await db.select().from(projects).where(eq(projects.isDraft, false)).orderBy(desc(projects.createdAt));
    const idx = all.findIndex((p) => p.slug === currentSlug);
    return {
      prev: idx > 0 ? all[idx - 1] : all[all.length - 1] ?? null,
      next: idx < all.length - 1 ? all[idx + 1] : all[0] ?? null,
    };
  } catch { return { prev: null, next: null }; }
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
  if (!db) return [];
  try {
    const rows = await db.select({ slug: projects.slug }).from(projects).where(eq(projects.isDraft, false));
    return rows.map((p) => ({ slug: p.slug }));
  } catch { return []; }
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
