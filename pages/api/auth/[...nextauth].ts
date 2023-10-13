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
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const res = await fetch('http://localhost:3000/api/login', {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
          headers: {"Content-Type": "application/json"}
        })  
        const data = await res.json()
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (
          !user ||
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          return null;
        }

        return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            photo: data.user.photo,
            role: data.user.role
        }
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
          role: token.role,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log({ token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          photo: u.photo,
          role: u.role,
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
