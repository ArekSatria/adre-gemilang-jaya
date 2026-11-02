import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_STR = process.env.JWT_SECRET || "adre-esports-secret-key-change-this-in-production-2026";
const SECRET_KEY = new TextEncoder().encode(SECRET_STR);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hanya periksa rute /admin
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("adre_admin_token")?.value;
    let isAuthenticated = false;

    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        isAuthenticated = true;
      } catch {
        isAuthenticated = false;
      }
    }

    // Jika belum login dan mencoba akses dashboard admin
    if (!isAuthenticated && pathname !== "/admin/login") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Jika sudah login dan mencoba akses halaman login lagi
    if (isAuthenticated && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
