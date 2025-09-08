import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "./api";

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					if (!credentials?.email || !credentials?.password) return null;
					const result = await api.login(credentials.email as string, credentials.password as string);
					return { accessToken: result.accessToken, refreshToken: result.refreshToken, ...result.user };
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
				token.isActive = user.isActive;
				token.isEmailVerified = user.isEmailVerified;
				token.organizationId = user.organizationId;
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.sub as string;
				session.user.role = token.role as string;
				session.user.isActive = token.isActive as boolean;
				session.user.isEmailVerified = token.isEmailVerified as boolean;
				session.user.organizationId = token.organizationId as string;
				session.accessToken = token.accessToken as string;
				session.refreshToken = token.refreshToken as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
		newUser: "/auth/register",
	},
});
