import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_PROJECTS, Still } from "@/lib/defaults";

export const dynamic = "force-dynamic";
const noDb = () => NextResponse.json({ error: "Database unavailable" }, { status: 503 });

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json([]);
  const { id } = await params;
  try {
    const [project] = await db.select().from(projects).where(eq(projects.id, parseInt(id)));
    return NextResponse.json((project?.stills as Still[]) || []);
  } catch { return NextResponse.json([]); }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return noDb();
  const { id } = await params;
  try {
    const body = await req.json();
    const [project] = await db.select().from(projects).where(eq(projects.id, parseInt(id)));
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const current = (project.stills as Still[]) || [];
    const newStill: Still = { url: body.url, type: body.type || "branding", order: current.length };
    await db.update(projects).set({ stills: [...current, newStill], updatedAt: new Date() }).where(eq(projects.id, parseInt(id)));
    return NextResponse.json(newStill, { status: 201 });
  } catch (error) { console.error("Images route error:", error); return NextResponse.json({ error: "Não foi possível processar a imagem." }, { status: 500 }); }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return noDb();
  const { id } = await params;
  try {
    const body = await req.json();
    const [project] = await db.select().from(projects).where(eq(projects.id, parseInt(id)));
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const current = (project.stills as Still[]) || [];
    if (body.reorder && Array.isArray(body.images)) {
      const map = new Map<string, number>(body.images.map((img: { url: string; order: number }) => [img.url, Number(img.order)]));
      const reordered = current.map((s) => ({ ...s, order: map.get(s.url) ?? s.order })).sort((a, b) => a.order - b.order);
      await db.update(projects).set({ stills: reordered, updatedAt: new Date() }).where(eq(projects.id, parseInt(id)));
      return NextResponse.json({ success: true, stills: reordered });
    }
    if (body.url && body.type) {
      const updated = current.map((s) => s.url === body.url ? { ...s, type: body.type } : s);
      await db.update(projects).set({ stills: updated, updatedAt: new Date() }).where(eq(projects.id, parseInt(id)));
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) { console.error("Images route error:", error); return NextResponse.json({ error: "Não foi possível processar a imagem." }, { status: 500 }); }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return noDb();
  const { id } = await params;
  const url = new URL(req.url).searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });
  try {
    const [project] = await db.select().from(projects).where(eq(projects.id, parseInt(id)));
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const filtered = ((project.stills as Still[]) || []).filter((s) => s.url !== url).map((s, i) => ({ ...s, order: i }));
    await db.update(projects).set({ stills: filtered, updatedAt: new Date() }).where(eq(projects.id, parseInt(id)));
    return NextResponse.json({ success: true, stills: filtered });
  } catch (error) { console.error("Images route error:", error); return NextResponse.json({ error: "Não foi possível processar a imagem." }, { status: 500 }); }
}
