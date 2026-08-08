import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [Google],
  session: { strategy: "jwt" }, // Obrigatório para funcionar com Middleware
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Adicione sua lógica de rotas protegidas aqui se necessário
      return true;
    },
  },
} satisfies NextAuthConfig;
