import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET() {
	const session = await auth();
	if (!session?.user?.role) return redirect("/dashboard");
	switch (session.user.role) {
		case UserRole.RECRUITER:
			return redirect("/recruiter");
		case UserRole.CANDIDATE:
			return redirect("/candidate");
		default:
			return redirect("/dashboard");
	}
}
