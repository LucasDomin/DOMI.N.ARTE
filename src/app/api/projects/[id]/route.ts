import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_PROJECTS } from "@/lib/defaults";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!db) {
    const f = DEFAULT_PROJECTS.find((p) => p.slug === id || p.id === parseInt(id));
    return f ? NextResponse.json(f) : NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const bySlug = isNaN(parseInt(id));
    const [project] = bySlug
      ? await db.select().from(projects).where(eq(projects.slug, id))
      : await db.select().from(projects).where(eq(projects.id, parseInt(id)));
    if (!project) {
      const f = DEFAULT_PROJECTS.find((p) => p.slug === id);
      return f ? NextResponse.json(f) : NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  try {
    const body = await req.json();
    const updateData: Record<string, unknown> = { ...body };
    delete updateData.id;
    updateData.updatedAt = new Date();
    const [project] = await db.update(projects).set(updateData).where(eq(projects.id, parseInt(id))).returning();
    return project ? NextResponse.json(project) : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  try {
    await db.delete(projects).where(eq(projects.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
