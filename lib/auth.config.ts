// auth.config.ts
import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      checks: ['none'],
    }),
  ],
  pages: {
    signIn: "/sign-in",
  }
} satisfies NextAuthConfig
