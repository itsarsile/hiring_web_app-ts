import { prisma } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
            return null;
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
  
          if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
            return null;
          }
  
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            photo: user.photo,
            role: user.role,
          };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {

    session: ({ session, token }) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            photo: token.photo,
            role: token.role 
          },
        };
      },
      jwt: ({ token, user }) => {
        if (user) {
          const u = user as unknown as any;
          return {
            ...token,
            id: u.id,
            photo: u.photo,
            role: u.role
          };
        }
        return token;
      },
  },
};

export default NextAuth(authOptions);
