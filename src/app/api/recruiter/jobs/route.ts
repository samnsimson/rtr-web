import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { validateZod, createValidationErrorResponse } from "@/lib/validation";
import { removeUndefinedValues } from "@/lib/utils";
import { getJobsQuerySchema, createJobSchema } from "@/zod/schema";

export async function GET(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const { searchParams } = new URL(request.url);
		const cleanedParams = removeUndefinedValues({
			page: searchParams.get("page") || "1",
			limit: searchParams.get("limit") || "10",
			query: searchParams.get("query") || undefined,
			workType: searchParams.get("workType") || undefined,
			jobType: searchParams.get("jobType") || undefined,
			compensation: searchParams.get("compensation") || undefined,
		});

		const { data: validatedParams, error: queryError } = validateZod(getJobsQuerySchema, cleanedParams);
		if (queryError) return NextResponse.json(createValidationErrorResponse(queryError), { status: 400 });

		// Check if user has recruiter role
		if (session.user.role !== "RECRUITER") return NextResponse.json({ error: "Access denied. Recruiter role required." }, { status: 403 });

		// TODO: Replace with GraphQL query
		// Mock data for now
		const mockJobs = [
			{
				id: "1",
				title: "Senior Software Engineer",
				company: "Tech Corp",
				location: "Remote",
				workType: "REMOTE",
				jobType: "FULL_TIME",
				compensation: "SALARY",
				salaryMin: 80000,
				salaryMax: 120000,
				status: "ACTIVE",
				applications: 5,
				createdAt: new Date().toISOString(),
				expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
			},
		];

		return NextResponse.json({
			jobs: mockJobs,
			total: mockJobs.length,
			page: validatedParams?.page,
			limit: validatedParams?.limit,
		});
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		// Check if user has recruiter role
		if (session.user.role !== "RECRUITER") return NextResponse.json({ error: "Access denied. Recruiter role required." }, { status: 403 });

		const body = await request.json();
		console.log("🚀 ~ POST ~ body:", body);
		const { data, error } = validateZod(createJobSchema, body);
		if (error) return NextResponse.json(createValidationErrorResponse(error), { status: 400 });

		// TODO: Replace with GraphQL mutation
		// Mock response for now
		const mockJob = {
			id: "mock-job-id",
			...data,
			recruiterId: session.user.id,
			status: "ACTIVE",
			createdAt: new Date().toISOString(),
		};

		return NextResponse.json({ message: "Job created successfully", job: mockJob });
	} catch (error) {
		console.error("Error creating job:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
