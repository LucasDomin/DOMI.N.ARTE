import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeDrafts = searchParams.get("includeDrafts") === "true";
  if (!db) {
    return NextResponse.json(includeDrafts ? DEFAULT_PROJECTS : DEFAULT_PROJECTS.filter((p) => !p.isDraft));
  }
  try {
    const rows = includeDrafts
      ? await db.select().from(projects).orderBy(desc(projects.createdAt))
      : await db.select().from(projects).where(eq(projects.isDraft, false)).orderBy(desc(projects.createdAt));
    return NextResponse.json(rows.length ? rows : DEFAULT_PROJECTS.filter((p) => !p.isDraft));
  } catch {
    return NextResponse.json(DEFAULT_PROJECTS);
  }
}

export async function POST(req: NextRequest) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await req.json();

    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json({ error: "O título do projeto é obrigatório." }, { status: 400 });
    }

    const slug = body.slug || body.title.toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    if (!slug) {
      return NextResponse.json({ error: "Não foi possível gerar um slug válido a partir do título." }, { status: 400 });
    }

    const [project] = await db.insert(projects).values({
      slug, title: body.title.trim(),
      subtitle: body.subtitle || "", category: body.category || "identidade",
      client: body.client || "", year: body.year || "", location: body.location || "",
      duration: body.duration || "", format: body.format || "",
      coverImage: body.coverImage || "", color: body.color || "#C9A56C",
      description: body.description || "", context: body.context || "",
      concept: body.concept || "", direction: body.direction || "",
      challenge: body.challenge || "", solution: body.solution || "",
      result: body.result || "", headline: body.headline || "",
      subheadline: body.subheadline || "", mainVideo: body.mainVideo || "",
      isDraft: body.isDraft ?? false, featured: body.featured ?? false,
      stills: body.stills || [], credits: body.credits || [],
      awards: body.awards || [], tags: body.tags || [],
      seoTitle: body.seoTitle || "", seoDescription: body.seoDescription || "",
      seoOgImage: body.seoOgImage || "",
    }).returning();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    // Unique constraint violation on slug — friendly message instead of raw DB error
    const msg = error instanceof Error ? error.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return NextResponse.json({ error: "Já existe um projeto com esse slug. Escolha outro título ou slug." }, { status: 409 });
    }
    console.error("POST /api/projects failed:", error);
    return NextResponse.json({ error: "Não foi possível criar o projeto. Tente novamente." }, { status: 500 });
  }
}
