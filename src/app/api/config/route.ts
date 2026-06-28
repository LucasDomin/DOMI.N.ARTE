import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { siteConfig } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_SITE_CONFIG } from "@/lib/defaults";

export async function GET() {
  try {
    const [config] = await db.select().from(siteConfig).where(eq(siteConfig.id, "default"));
    if (!config) {
      return NextResponse.json(DEFAULT_SITE_CONFIG);
    }
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(DEFAULT_SITE_CONFIG);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    // Remove immutable fields
    const updateData = { ...body };
    delete updateData.id;
    updateData.updatedAt = new Date();

    const [updated] = await db
      .insert(siteConfig)
      .values({ id: "default", ...updateData })
      .onConflictDoUpdate({
        target: siteConfig.id,
        set: updateData,
      })
      .returning();

    return NextResponse.json(updated);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update configuration";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
