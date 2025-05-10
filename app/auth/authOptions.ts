//authOptions.ts file
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Email id not regiestered");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Invalid Email id or password");

        if (!user.emailVerified) throw new Error("Email id not verified");

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: { accounts: true },
        });

        if (existingUser) {
          // User exists with credentials - update their profile
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              isSocialLogin: true,
              emailVerified: new Date(),
            },
          });

          // Check if they already have this provider connected
          const hasProvider = existingUser.accounts.some(
            (acc) => acc.provider === account.provider
          );

          if (!hasProvider) {
            // Create the account connection manually since the adapter isn't doing it
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            });
          }

          // Use the existingUser instead of the incoming user
          user.id = existingUser.id;
          return true;
        }
      }
      return true;
    },

    // Keep your existing session callback
  },
};

export default authOptions;
