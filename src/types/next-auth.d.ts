import NextAuth from "next-auth";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			image?: string | null;
			role: string;
			isActive: boolean;
			isEmailVerified: boolean;
			organizationId?: string;
		};
		accessToken: string;
		refreshToken: string;
	}

	interface User {
		id: string;
		name?: string | null;
		image?: string | null;
		role: string;
		isActive: boolean;
		isEmailVerified: boolean;
		organizationId?: string;
		accessToken: string;
		refreshToken: string;
		expiresAt: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role: string;
		isActive: boolean;
		isEmailVerified: boolean;
		organizationId?: string;
		accessToken: string;
		refreshToken: string;
		expiresAt: string;
	}
}
