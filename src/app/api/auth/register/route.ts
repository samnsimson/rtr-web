/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { UserRole, RemotePreference } from "@prisma/client";

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
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });

		const hashedPassword = await bcrypt.hash(password, 12);
		const userData: any = { email, name: `${firstName} ${lastName}`, password: hashedPassword, role, phone };

		if (role === UserRole.RECRUITER) userData.recruiterProfile = { create: { companyName: `${firstName}'s Company`, location: "Not specified" } };
		else if (role === UserRole.CANDIDATE)
			userData.candidateProfile = { create: { title: "Not specified", location: "Not specified", skills: [], remotePreference: RemotePreference.ANY } };
		const user = await prisma.user.create({ data: userData, include: { recruiterProfile: true, candidateProfile: true } });
		const { password: _, ...userWithoutPassword } = user;
		return NextResponse.json({ message: "User created successfully", user: userWithoutPassword }, { status: 201 });
	} catch (error: any) {
		console.log("🚀 ~ POST ~ error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
