import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/projects/:path*", "/api/config", "/api/upload"],
};

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySessionToken(token);

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return authed ? NextResponse.redirect(new URL("/admin", req.url)) : NextResponse.next();
    }
    if (!authed) return NextResponse.redirect(new URL("/admin/login", req.url));
    return NextResponse.next();
  }

  if (WRITE_METHODS.has(req.method) && !authed) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  return NextResponse.next();
}

export default proxy;
