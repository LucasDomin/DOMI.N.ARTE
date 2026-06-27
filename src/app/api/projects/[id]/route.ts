import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if looking up standard numeric id or slug
    if (isNaN(parseInt(id))) {
      const [project] = await db.select().from(projects).where(eq(projects.slug, id));
      if (!project) {
        const fallback = DEFAULT_PROJECTS.find((p) => p.slug === id);
        if (fallback) return NextResponse.json(fallback);
        return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }
      return NextResponse.json(project);
    }

    const projectId = parseInt(id);
    const [project] = await db.select().from(projects).where(eq(projects.id, projectId));
    if (!project) {
      const fallback = DEFAULT_PROJECTS.find((p) => p.id === projectId);
      if (fallback) return NextResponse.json(fallback);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    const { id } = await params;
    const fallback = DEFAULT_PROJECTS.find((p) => p.slug === id || p.id === parseInt(id));
    if (fallback) return NextResponse.json(fallback);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await req.json();

    // Prevent direct id modification or empty slugs
    const updateData: Record<string, any> = { ...body };
    delete updateData.id;
    updateData.updatedAt = new Date();

    const [project] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, projectId))
      .returning();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update project";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    await db.delete(projects).where(eq(projects.id, projectId));

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete project";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
