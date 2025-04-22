//authOptions.ts file
import prisma from '@/lib/prisma'
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma as any),
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

        if (!user || !user.password){
          throw new Error ('Email id not regiestered')
        }

        const passwordMatch = await bcrypt.compare(credentials.password,user.password);

        if (!passwordMatch) throw new Error ('Invalid Email id or password');

        if (!user.emailVerified) throw new Error ('Email id not verified')

        return user

      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages:{
      signIn:'/auth'
  },
  callbacks: {
    async signIn() {
      return true; // Always allow sign in to proceed
    },

    // Use the session callback instead, which runs after the user is created
    async session({ session}) {
      if (session?.user?.email) {
        // Check if this is a Google or GitHub user and update emailVerified
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: {
            emailVerified: true,
            id: true,
            accounts: { select: { provider: true } },
          },
        });

        if (
          user &&
          !user.emailVerified &&
          user.accounts?.some((acc) =>
            ["google", "github"].includes(acc.provider)
          )
        ) {
          await prisma.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }
      }
      return session;
    },
  },
};

export default authOptions;
