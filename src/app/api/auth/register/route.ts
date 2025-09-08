/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

// TODO: Replace with GraphQL types
enum UserRole {
	RECRUITER = "RECRUITER",
	CANDIDATE = "CANDIDATE",
	ADMIN = "ADMIN",
}

const registerSchema = z.object({
	firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
	lastName: z.string().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
	email: z.string().email("Invalid email format").min(1, "Email is required"),
	phone: z.string().optional(),
	password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password must be less than 100 characters"),
	role: z.nativeEnum(UserRole),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validationResult = registerSchema.safeParse(body);
		if (!validationResult.success) {
			const errors = validationResult.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
			return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
		}
		const { firstName, lastName, email, phone, password, role } = validationResult.data;

		// TODO: Replace with GraphQL mutation to check if user exists
		// Mock check for now
		const hashedPassword = await bcrypt.hash(password, 12);

		// TODO: Replace with GraphQL mutation to create user
		// Mock user creation for now
		const mockUser = {
			id: "mock-user-id",
			email,
			name: `${firstName} ${lastName}`,
			role,
			phone,
			createdAt: new Date().toISOString(),
		};

		return NextResponse.json({ message: "User created successfully", user: mockUser }, { status: 201 });
	} catch (error: any) {
		console.log("🚀 ~ POST ~ error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
