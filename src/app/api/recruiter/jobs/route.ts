import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/db";
import { auth } from "@/lib/auth";
import { validateZod, createValidationErrorResponse } from "@/lib/validation";
import { removeUndefinedValues } from "@/lib/utils";
import { JobCreateData } from "@/types/database";
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

		const db = new DatabaseService();
		const userWithProfile = await db.getUserWithProfile(session.user.id);
		if (!userWithProfile?.recruiterProfile?.id) return NextResponse.json({ error: "Recruiter profile not found" }, { status: 404 });

		const filters: any = {};
		if (validatedParams?.query) filters.query = validatedParams.query;
		if (validatedParams?.workType) filters.workType = validatedParams.workType;
		if (validatedParams?.jobType) filters.jobType = validatedParams.jobType;
		if (validatedParams?.compensation) filters.compensation = validatedParams.compensation;

		const result = await db.getJobsWithPagination(userWithProfile.recruiterProfile.id, validatedParams?.page, validatedParams?.limit, filters);
		const jobsWithAppCount = result.jobs.map((job: any) => ({
			...job,
			applications: Array.isArray(job.applications) ? job.applications.length : 0,
			createdAt: job.createdAt.toISOString(),
			expiresAt: job.expiresAt ? job.expiresAt.toISOString() : undefined,
		}));

		return NextResponse.json({ jobs: jobsWithAppCount, total: result.total, page: validatedParams?.page, limit: validatedParams?.limit });
	} catch (error) {
		console.error("Error fetching jobs:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

		const db = new DatabaseService();
		const userWithProfile = await db.getUserWithProfile(session.user.id);
		if (!userWithProfile?.recruiterProfile?.id) return NextResponse.json({ error: "Recruiter profile not found" }, { status: 404 });

		const body = await request.json();
		console.log("🚀 ~ POST ~ body:", body);
		const { data, error } = validateZod(createJobSchema, body);
		if (error) return NextResponse.json(createValidationErrorResponse(error), { status: 400 });

		const jobData = { ...(data || {}), recruiterId: userWithProfile.recruiterProfile.id };
		const job = await db.createJob(jobData as JobCreateData);
		return NextResponse.json({ message: "Job created successfully", job });
	} catch (error) {
		console.error("Error creating job:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
