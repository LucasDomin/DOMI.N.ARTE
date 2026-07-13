import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { asc } from "drizzle-orm";
import { SAMPLE_CLIENTS } from "@/lib/sample-clients";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeHidden = searchParams.get("includeHidden") === "true";

  if (!db) {
    return NextResponse.json(SAMPLE_CLIENTS);
  }
  try {
    const rows = await db.select().from(clients).orderBy(asc(clients.order));
    // Only fall back to sample data when the table is truly empty —
    // NOT when the user intentionally hid all real clients.
    if (rows.length === 0) return NextResponse.json(SAMPLE_CLIENTS);
    const result = includeHidden ? rows : rows.filter((c) => c.visible);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/clients failed:", error);
    return NextResponse.json(SAMPLE_CLIENTS);
  }
}

export async function POST(req: NextRequest) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await req.json();

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json({ error: "O nome do cliente é obrigatório." }, { status: 400 });
    }

    const [client] = await db
      .insert(clients)
      .values({
        name: body.name.trim(),
        logoUrl: body.logoUrl || "",
        link: body.link || "",
        order: body.order ?? 0,
        visible: body.visible ?? true,
      })
      .returning();
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    console.error("POST /api/clients failed:", error);
    return NextResponse.json({ error: "Não foi possível criar o cliente." }, { status: 500 });
  }
}
