import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    const dbProjects = includeDrafts
      ? await db.select().from(projects).orderBy(desc(projects.createdAt))
      : await db
          .select()
          .from(projects)
          .where(eq(projects.isDraft, false))
          .orderBy(desc(projects.createdAt));

    if (dbProjects.length === 0) {
      return NextResponse.json(
        includeDrafts ? DEFAULT_PROJECTS : DEFAULT_PROJECTS.filter((p) => !p.isDraft)
      );
    }

    return NextResponse.json(dbProjects);
  } catch {
    return NextResponse.json(DEFAULT_PROJECTS);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      subtitle,
      category,
      client,
      year,
      location,
      duration,
      format,
      coverImage,
      color,
      description,
      context,
      concept,
      direction,
      result,
      isDraft,
      featured,
      stills,
      credits,
      awards,
    } = body;

    const slug =
      body.slug ||
      title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const [project] = await db
      .insert(projects)
      .values({
        slug,
        title,
        subtitle: subtitle || "",
        category: category || "identidade",
        client: client || "",
        year: year || "",
        location: location || "",
        duration: duration || "",
        format: format || "",
        coverImage: coverImage || "",
        color: color || "#C9A56C",
        description: description || "",
        context: context || "",
        concept: concept || "",
        direction: direction || "",
        result: result || "",
        isDraft: isDraft !== undefined ? isDraft : false,
        featured: featured !== undefined ? featured : false,
        stills: stills || [],
        credits: credits || [],
        awards: awards || [],
      })
      .returning();

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
