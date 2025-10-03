import { z } from "zod";
import { WorkType, JobType, CompensationType } from "@/graphql/generated/graphql";

// Zod schema for GET query parameters
export const getJobsQuerySchema = z.object({
	page: z
		.string()
		.optional()
		.transform((val) => parseInt(val || "1")),
	limit: z
		.string()
		.optional()
		.transform((val) => parseInt(val || "10")),
	query: z.string().optional(),
	workType: z.enum(WorkType).optional(),
	jobType: z.enum(JobType).optional(),
	compensation: z.enum(CompensationType).optional(),
});

// Zod schema for POST body
export const createJobSchema = z
	.object({
		title: z.string().min(1, "Title is required"),
		company: z.string().min(1, "Company is required"),
		description: z.string().min(1, "Description is required"),
		requirements: z.array(z.string()).default([]),
		location: z.string().min(1, "Location is required"),
		workType: z.array(z.string()).transform((val) => val[0]),
		jobType: z.array(z.string()).transform((val) => val[0]),
		compensation: z.array(z.string()).transform((val) => val[0]),
		salaryMin: z.number().positive().optional(),
		salaryMax: z.number().positive().optional(),
		benefits: z.array(z.string()).default([]).nullable(),
		expiresAt: z
			.string()
			.optional()
			.transform((val) => (val ? new Date(val) : undefined)),
	})
	.refine(
		(data: any) => {
			if (data.salaryMin && data.salaryMax && data.salaryMax <= data.salaryMin) return false;
			return true;
		},
		{
			message: "Maximum salary must be greater than minimum salary",
			path: ["salaryMax"],
		},
	);

export const rtrEmployerDetailFormSchema = z.object({
	employerName: z.string().min(1, "Employer name is required"),
	contactPersonName: z.string().min(1, "Contact person name is required"),
	employerEmail: z.email("Invalid email address"),
	employerPhone: z
		.string()
		.min(1, "Employer phone is required")
		.regex(/^\d{10}$/, "Invalid phone number"),
});

export const rtrReferenceSchema = z.object({
	name: z.string().min(1, "Reference name is required"),
	email: z.email("Invalid email address"),
	phone: z
		.string()
		.min(1, "Reference phone is required")
		.regex(/^\d{10}$/, "Invalid phone number"),
});

export const rtrFormStepTwoSchema = (resumeRequired: boolean, photoIdRequired: boolean, employerDetailsRequired: boolean, referencesRequired: boolean, skillsRequired: boolean) => {
	return z.object({
		resume: resumeRequired ? z.instanceof(File, { message: "Resume is required" }) : z.instanceof(File).optional(),
		photoId: photoIdRequired ? z.instanceof(File, { message: "Photo ID is required" }) : z.instanceof(File).optional(),
		employerName: employerDetailsRequired ? z.string().min(1, "Employer name is required") : z.string().optional(),
		contactPersonName: employerDetailsRequired ? z.string().min(1, "Contact person name is required") : z.string().optional(),
		employerEmail: employerDetailsRequired ? z.email("Invalid email address") : z.string().optional(),
		employerPhone: employerDetailsRequired ? z.string().regex(/^\d{10}$/, "Invalid phone number") : z.string().optional(),
		references: referencesRequired ? rtrReferenceSchema.array().min(1, "References are required") : rtrReferenceSchema.array().optional(),
		skills: skillsRequired ? z.array(z.string()).min(1, "Skills are required") : z.array(z.string()).optional(),
	});
};
