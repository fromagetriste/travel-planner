import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.image = token.picture; 
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.picture = profile.picture;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
});

// changed the Sign In option to switch from GitHub to Google instead
// import GitHubProvider from "next-auth/providers/github";
// export const { auth, handlers, signIn, signOut } = NextAuth({
//   providers: [
//     GitHubProvider({
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
// });
