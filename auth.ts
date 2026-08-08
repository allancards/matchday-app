// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // Mantém JWT (não usa adapter)
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Quando o usuário faz login pela primeira vez, salvamos no banco
      if (account && profile) {
        const email = profile.email as string;
        const name = profile.name as string;
        const image = profile.picture as string;

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          // Cria o usuário no banco
          user = await prisma.user.create({
            data: {
              email,
              name,
              image,
            },
          });
        }

        // Armazena o ID do usuário no token
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Injeta o ID do usuário na sessão
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});