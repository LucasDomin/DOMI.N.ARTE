export const dynamic = "force-dynamic";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { seedIfEmpty } from "@/lib/seed";

export async function GET() {
  if (!db) return Response.json({ ok: false, error: "DATABASE_URL not configured" }, { status: 503 });
  try {
    await seedIfEmpty();
    await db.execute(sql`select 1`);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
