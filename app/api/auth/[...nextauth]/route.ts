import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: 'USER' as UserRole,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const findUser = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                if (!findUser) return null;

                const isPasswordValid = await compare(credentials.password, findUser.password);
                if (!isPasswordValid || !findUser.verified) return null;

                return {
                    id: String(findUser.id),
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            if (!user?.email) return false;
            try {
                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email },
                        ],
                    },
                });

                if (findUser) {
                    await prisma.user.update({
                        where: { id: findUser.id },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });
                } else {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            fullName: user.name || `User #${user.id}`,
                            password: hashSync(user.id.toString(), 10),
                            verified: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    });
                }
                return true;
            } catch (e) {
                console.error("SignIn Error: ", e);
                return false;
            }
        },
        async jwt({ token }) {
            const findUser = await prisma.user.findFirst({
                where: { email: token.email },
            });

            if (findUser) {
                token.id = findUser.id;
                token.email = findUser.email;
                token.fullName = findUser.fullName;
                token.role = findUser.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
