import { auth as middleware } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middlewareHandler(req: NextRequest) {
	const session = await middleware();
	console.log("🚀 ~ middlewareHandler ~ session:", session);
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
