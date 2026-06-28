import { db } from "@/db";
import { sql } from "drizzle-orm";
import { seedIfEmpty } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Prime the database securely
    await seedIfEmpty();

    // Verify database link
    await db.execute(sql`select 1`);
    return Response.json({ ok: true, seeded: true });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Healthcheck failed";
    return Response.json({ ok: false, error: errorMsg }, { status: 500 });
  }
}
