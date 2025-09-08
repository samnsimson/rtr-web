import NextAuth from "next-auth";
import type { RecruiterProfile, CandidateProfile } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
			role: string;
			profile?: RecruiterProfile | CandidateProfile | null;
		};
	}

	interface User {
		id: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		role: string;
		profile?: RecruiterProfile | CandidateProfile | null;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		role: string;
		profile?: RecruiterProfile | CandidateProfile | null;
	}
}
