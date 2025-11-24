import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { UserRole } from "./graphql/generated/graphql";

const recruiterExcludedPaths: Array<string> = ["/recruiter/settings/plans", "/recruiter/settings/account"];
const organizationExcludedPaths: Array<string> = [];

const hasAnyExcludedPath = (paths: string[], path: string) => paths.some((p) => path.startsWith(p));

export default async function middlewareHandler(req: NextRequest) {
	const session = await auth();
	if (!session) return NextResponse.redirect(new URL("/auth/login", req.url));

	switch (session.user.role) {
		case UserRole.RecruiterManager:
		case UserRole.Recruiter:
			if (hasAnyExcludedPath(recruiterExcludedPaths, req.nextUrl.pathname)) return NextResponse.redirect(new URL("/recruiter", req.url));
			return NextResponse.next();
		case UserRole.OrganizationOwner:
		case UserRole.OrganizationAdmin:
			if (hasAnyExcludedPath(organizationExcludedPaths, req.nextUrl.pathname)) return NextResponse.redirect(new URL("/not-found", req.url));
			return NextResponse.next();
		default:
			return NextResponse.next();
	}
}

export const config = {
	matcher: ["/recruiter/:path*", "/candidate/:path*"],
};
