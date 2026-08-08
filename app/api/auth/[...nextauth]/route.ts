import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { handlers } from "@/auth";
export const { GET, POST } = handlers;

export const authConfig = {
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  // Adicione callbacks ou páginas personalizadas aqui se necessário
} satisfies NextAuthConfig;
