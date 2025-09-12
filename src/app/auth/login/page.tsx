import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
	const session = await auth();
	if (session) return redirect("/api/auth/callback");
	return <LoginForm />;
};

export default LoginPage;
