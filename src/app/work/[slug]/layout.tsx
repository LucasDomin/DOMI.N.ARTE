import type { Metadata } from "next";
import type { ReactNode } from "react";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";

async function getProject(slug: string) {
  try {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug));
    if (project) return project;
  } catch {
    // fall through to defaults
  }
  return DEFAULT_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Obra não encontrada — DOMI.N.ARTE",
      description: "Esta obra não existe ou ainda não foi publicada.",
    };
  }

  const title = project.seoTitle || `${project.title} — DOMI.N.ARTE`;
  const description =
    project.seoDescription || project.subtitle || project.description || "";
  const ogImage = project.seoOgImage || project.coverImage || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default function WorkLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
