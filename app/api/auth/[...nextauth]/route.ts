import NextAuth, { NextAuthOptions } from 'next-auth';
import {authOptions} from "@/shared/services/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
