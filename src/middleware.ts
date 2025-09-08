import { auth as middleware } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "@prisma/client";

export default async function middlewareHandler(req: NextRequest) {
	const session = await middleware();
	const isLoggedIn = !!session;
	const { pathname } = req.nextUrl;
	const publicRoutes = ["/auth/login", "/auth/register", "/"];
	const protectedRoutes = ["/recruiter", "/candidate", "/rtr"];
	const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
	const isPublicRoute = publicRoutes.some((route) => pathname === route);

	if (isProtectedRoute && !isLoggedIn) return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
	if (isLoggedIn && (pathname === "/auth/login" || pathname === "/auth/register")) {
		// Redirect based on user role
		if (session?.user?.role === UserRole.RECRUITER) {
			return NextResponse.redirect(new URL("/recruiter", req.nextUrl));
		} else if (session?.user?.role === UserRole.CANDIDATE) {
			return NextResponse.redirect(new URL("/candidate", req.nextUrl));
		}
		// Fallback to dashboard if role is not set
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	}
	if (isLoggedIn && pathname === "/") {
		// Redirect based on user role
		if (session?.user?.role === UserRole.RECRUITER) {
			return NextResponse.redirect(new URL("/recruiter", req.nextUrl));
		} else if (session?.user?.role === UserRole.CANDIDATE) {
			return NextResponse.redirect(new URL("/candidate", req.nextUrl));
		}
		// Fallback to dashboard if role is not set
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
