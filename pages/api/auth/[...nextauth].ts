import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prismaClient } from "utils/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      const { role, id } = user;
      return { ...session, user: { ...session.user, role, id } };
    },
  },
};

export default NextAuth(authOptions);
