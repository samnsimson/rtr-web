import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export default async function middlewareHandler(req: NextRequest) {
	const session = await auth();
	if (!session) return NextResponse.redirect(new URL("/auth/login", req.url));
	return NextResponse.next();
}

export const config = {
	matcher: ["/recruiter/:path*", "/candidate/:path*"],
};
