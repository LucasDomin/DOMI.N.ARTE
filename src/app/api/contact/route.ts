import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Very small, dependency-free email format check — good enough to catch
// typos without the false-negative risk of an over-strict regex.
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  if (!db) {
    return NextResponse.json(
      { error: "Serviço de mensagens indisponível no momento. Escreva para o e-mail listado na página." },
      { status: 503 }
    );
  }
  try {
    const body = await req.json();

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json({ error: "O nome é obrigatório." }, { status: 400 });
    }
    if (!body.email || typeof body.email !== "string" || !isValidEmail(body.email)) {
      return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
    }

    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name: body.name.trim(),
        company: body.company || "",
        email: body.email.trim(),
        type: body.type || "",
        budget: body.budget || "",
        message: body.message || "",
      })
      .returning();

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact failed:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente ou use o e-mail direto." },
      { status: 500 }
    );
  }
}

// Admin-only: list submissions. Guarded here (not via the shared proxy
// matcher) because this route needs the OPPOSITE protection profile from
// projects/config/clients — POST must stay public (anyone can submit the
// contact form), while GET exposes personal data and must be admin-only.
export async function GET(req: NextRequest) {
  const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
  if (!authed) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  if (!db) return NextResponse.json([]);
  try {
    const rows = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET /api/contact failed:", error);
    return NextResponse.json([]);
  }
}
