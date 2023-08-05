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
      authorize: async (credentials: UserCredentials, _req) => {
        const { email, password } = credentials;
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user && bcrypt.compareSync(password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              role: user.role,
              photo: user.photo,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          photo: token.photo,
          roles: token.role,
        },
      };
    },
    jwt: async ({ token, user }) => {
      // console.log("JWT CALLBACK: ", { token, user })
      if (user) {
        token.id = user.id;
        //@ts-ignore
        token.role = user.role;
        //@ts-ignore

        token.photo = user.photo;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
