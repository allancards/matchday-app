// middleware.ts
import NextAuth from "next-auth"
import {authConfig} from "./auth.config"
import { NextResponse } from "next/server"

// O Auth.js gerencia o ciclo do middleware injetando o objeto `auth` automaticamente
export const { auth: middleware } = NextAuth({
  ...authConfig,
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const path = request.nextUrl.pathname;

      // Se tentar acessar o admin sem estar logado -> manda para o sign-in
      if (path.startsWith("/admin") && !isLoggedIn) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Se já estiver logado e tentar ir pro sign-in -> manda de volta pro admin
      if (path.startsWith("/sign-in") && isLoggedIn) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      return true; // Permite o acesso a qualquer outra rota listada no matcher
    },
  },
})

export const config = {
  // Mantém os seus matchers originais intactos
  matcher: ["/admin/:path*", "/sign-in"],
};
