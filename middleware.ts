// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;
  const path = req.nextUrl.pathname;

  // Se não estiver logado e tentar acessar /admin -> vai para /sign-in
  if (!isLoggedIn && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Se estiver logado e tentar acessar /sign-in -> vai para /admin
  if (isLoggedIn && path.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/sign-in"],
};