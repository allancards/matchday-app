// middleware.ts
import NextAuth from "next-auth"
import {authConfig} from "./auth.config"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// 1. Inicializa o ambiente do Auth.js com a configuração leve
const { auth } = NextAuth(authConfig)

// 2. Exporta a função padrão com o nome estrito que o Next.js exige
export default auth((req) => {
  const isLoggedIn = !!req.auth; // O Auth.js injeta a sessão logada direto aqui
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
})

export const config = {
  // Mantém os seus matchers originais protegendo as rotas corretas
  matcher: ["/admin/:path*", "/sign-in"],
};
