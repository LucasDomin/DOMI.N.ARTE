import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  getAdminPassword,
} from "@/lib/auth";

export const runtime = "nodejs";

// LOGIN
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password !== getAdminPassword()) {
      // Constant-ish failure; avoid leaking which part failed
      return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
    }

    const token = await createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }
}

// LOGOUT
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
