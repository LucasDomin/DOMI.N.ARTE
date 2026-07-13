import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteConfig } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) return NextResponse.json(DEFAULT_SITE_CONFIG);
  try {
    const [config] = await db.select().from(siteConfig).where(eq(siteConfig.id, "default"));
    return NextResponse.json(config ?? DEFAULT_SITE_CONFIG);
  } catch {
    return NextResponse.json(DEFAULT_SITE_CONFIG);
  }
}

export async function PUT(req: NextRequest) {
  if (!db) return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  try {
    const body = await req.json();
    const updateData = { ...body };
    delete updateData.id;
    updateData.updatedAt = new Date();
    const [updated] = await db
      .insert(siteConfig)
      .values({ id: "default", ...updateData })
      .onConflictDoUpdate({ target: siteConfig.id, set: updateData })
      .returning();
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/config failed:", error);
    return NextResponse.json({ error: "Não foi possível salvar as configurações." }, { status: 500 });
  }
}
