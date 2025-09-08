"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserRole } from "@/graphql/generated/graphql";

interface LoginCredentials {
	email: string;
	password: string;
}

interface RegisterCredentials {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	confirmPassword: string;
	role: UserRole;
}

export const useAuth = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const login = async (credentials: LoginCredentials) => {
		setIsLoading(true);
		setError(null);

		try {
			await signIn("credentials", {
				email: credentials.email,
				password: credentials.password,
				redirect: true,
				callbackUrl: "/api/auth/callback",
			});
		} catch (err: any) {
			console.log("🚀 ~ login ~ err:", err);
			setError("An error occurred during login");
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (credentials: RegisterCredentials) => {
		setIsLoading(true);
		setError(null);

		if (credentials.password !== credentials.confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return false;
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName: credentials.firstName,
					lastName: credentials.lastName,
					email: credentials.email,
					phone: credentials.phone,
					password: credentials.password,
					role: credentials.role,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.error || "Registration failed");
				return false;
			}

			router.push("/auth/login?message=Registration successful! Please log in.");
			return true;
		} catch (err: any) {
			console.log("🚀 ~ register ~ err:", err);
			setError("An error occurred during registration");
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		await signOut({ redirect: false });
		router.push("/auth/login");
	};

	return {
		session,
		status,
		isLoading,
		error,
		login,
		register,
		logout,
		isAuthenticated: !!session,
		user: session?.user,
	};
};
