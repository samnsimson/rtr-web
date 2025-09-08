import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "@/graphql/generated/graphql";

export async function GET() {
	const session = await auth();
	if (!session?.user?.role) return redirect("/dashboard");
	switch (session.user.role) {
		case UserRole.OrganizationOwner:
		case UserRole.OrganizationAdmin:
		case UserRole.RecruiterManager:
		case UserRole.Recruiter:
			return redirect("/recruiter");
		case UserRole.Candidate:
			return redirect("/candidate");
		default:
			return redirect("/dashboard");
	}
}
