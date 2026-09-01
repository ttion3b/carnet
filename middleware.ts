import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_SECRET, COOKIE_NAME } from "@/lib/constants";

const PUBLIC = new Set(["/", "/connexion", "/inscription"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  let loggedIn = false;

  if (token) {
    try {
      await jwtVerify(token, new TextEncoder().encode(AUTH_SECRET));
      loggedIn = true;
    } catch {
      loggedIn = false;
    }
  }

  if (!loggedIn && !PUBLIC.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (loggedIn && (pathname === "/connexion" || pathname === "/inscription")) {
    return NextResponse.redirect(new URL("/accueil", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
