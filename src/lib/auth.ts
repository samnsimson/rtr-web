import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import type { RecruiterProfile, CandidateProfile } from "@prisma/client";
import { UserRole } from "@prisma/client";
import { query } from "./apollo-client";
import { Auth, LoginDocument, LoginMutationVariables } from "@/graphql/generated/graphql";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;
				try {
					const reslut = await query<Auth, LoginMutationVariables>({
						query: LoginDocument,
						variables: { loginInput: { email: credentials.email as string, password: credentials.password as string } },
					});
					console.log("🚀 ~ authorize ~ reslut:", reslut);
					const user = await prisma.user.findUnique({
						where: { email: credentials.email as string },
						include: { recruiterProfile: true, candidateProfile: true },
					});
					if (!user || !user.password) return null;
					const isPasswordValid = bcrypt.compare(credentials.password as string, user.password as string);
					if (!isPasswordValid) return null;
					let profile: RecruiterProfile | CandidateProfile | null = null;
					if (user.role === UserRole.RECRUITER && user.recruiterProfile) profile = user.recruiterProfile;
					else if (user.role === UserRole.CANDIDATE && user.candidateProfile) profile = user.candidateProfile;
					return { id: user.id, email: user.email, name: user.name, role: user.role, profile };
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.profile = user.profile;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub as string;
				session.user.role = token.role as string;
				session.user.profile = token.profile as RecruiterProfile | CandidateProfile | null;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/register",
	},
});
