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
    const filtered = includeHidden ? rows : rows.filter((c) => c.visible);
    return NextResponse.json(filtered.length ? filtered : SAMPLE_CLIENTS);
  } catch {
    return NextResponse.json(SAMPLE_CLIENTS);
  }
}

export async function POST(req: NextRequest) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await req.json();
    const [client] = await db
      .insert(clients)
      .values({
        name: body.name,
        logoUrl: body.logoUrl,
        link: body.link || "",
        order: body.order ?? 0,
        visible: body.visible ?? true,
      })
      .returning();
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
