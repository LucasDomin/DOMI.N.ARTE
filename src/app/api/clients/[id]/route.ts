import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  try {
    const body = await req.json();
    const updateData: Record<string, unknown> = { ...body };
    delete updateData.id;
    updateData.updatedAt = new Date();
    const [client] = await db.update(clients).set(updateData).where(eq(clients.id, parseInt(id))).returning();
    return client ? NextResponse.json(client) : NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("PUT /api/clients/[id] failed:", error);
    return NextResponse.json({ error: "Não foi possível atualizar o cliente." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  const { id } = await params;
  try {
    await db.delete(clients).where(eq(clients.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/clients/[id] failed:", error);
    return NextResponse.json({ error: "Não foi possível remover o cliente." }, { status: 500 });
  }
}
