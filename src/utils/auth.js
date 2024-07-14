import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { login } from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/libs/prisma/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text", placeholder: "" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // if (credentials === null) return null;

        // try {
        //   const user = await login(credentials?.username);

        //   if (user) {
        //     if (credentials?.password == user?.password) {
        //       return user;
        //     } else {
        //       throw new Error("Username or Password is not correct");
        //     }
        //   } else {
        //     throw new Error("User not found");
        //   }
        // } catch (error) {
        //   throw new Error(error);
        // }
        const user = await login(credentials?.username);
        if (credentials?.password == user?.password) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
