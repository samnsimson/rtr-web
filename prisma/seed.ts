import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserRole, RemotePreference, WorkType, JobType, CompensationType, RTRStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Hash passwords
	const hashedPassword = await bcrypt.hash("W3lcome!", 12);

	// Create sample users
	const recruiter = await prisma.user.upsert({
		where: { email: "recruiter@example.com" },
		update: {},
		create: {
			email: "recruiter@example.com",
			name: "John Recruiter",
			role: UserRole.RECRUITER,
			password: hashedPassword,
			phone: "555-0123",
			recruiterProfile: {
				create: {
					companyName: "TechCorp Inc.",
					companyWebsite: "https://techcorp.com",
					industry: "Technology",
					companySize: "MEDIUM",
					location: "San Francisco, CA",
				},
			},
		},
		include: {
			recruiterProfile: true,
		},
	});

	const candidate = await prisma.user.upsert({
		where: { email: "candidate@example.com" },
		update: {},
		create: {
			email: "candidate@example.com",
			name: "Sam Nishanth Simson",
			role: UserRole.CANDIDATE,
			password: hashedPassword,
			phone: "555-0456",
			candidateProfile: {
				create: {
					title: "Senior Software Engineer",
					experience: 5,
					skills: ["React", "TypeScript", "Node.js", "Python"],
					location: "Jacksonville, FL",
					remotePreference: RemotePreference.ANY,
					expectedSalary: 120000,
				},
			},
		},
		include: {
			candidateProfile: true,
		},
	});

	// Create sample job
	const job = await prisma.job.create({
		data: {
			title: "Senior Software Engineer",
			company: "TechCorp Inc.",
			description:
				"We are looking for a Senior Software Engineer with strong React and TypeScript skills. The ideal candidate will have 5+ years of experience in frontend development and be comfortable working in a remote environment.",
			requirements: ["React", "TypeScript", "5+ years experience", "Node.js", "Git"],
			location: "San Francisco, CA",
			workType: WorkType.REMOTE,
			jobType: JobType.FULL_TIME,
			compensation: CompensationType.SALARY,
			salaryMin: 120000,
			salaryMax: 150000,
			benefits: ["Health Insurance", "401k", "Remote Work", "Flexible Hours", "Professional Development"],
			recruiterId: recruiter.recruiterProfile!.id,
		},
	});

	// Create sample RTR
	const rtr = await prisma.rTR.create({
		data: {
			candidateId: candidate.candidateProfile!.id,
			recruiterId: recruiter.recruiterProfile!.id,
			jobId: job.id,
			status: RTRStatus.PENDING,
			notes: "Excellent candidate with strong React skills and 5 years of experience. Perfect fit for the Senior Software Engineer role.",
			expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		},
	});

	// Create some additional sample data for testing
	const additionalJob = await prisma.job.create({
		data: {
			title: "Full Stack Developer",
			company: "TechCorp Inc.",
			description: "We are looking for a Full Stack Developer who can work on both frontend and backend systems.",
			requirements: ["React", "Node.js", "PostgreSQL", "3+ years experience"],
			location: "New York, NY",
			workType: WorkType.HYBRID,
			jobType: JobType.FULL_TIME,
			compensation: CompensationType.SALARY,
			salaryMin: 100000,
			salaryMax: 130000,
			benefits: ["Health Insurance", "401k", "Hybrid Work", "Stock Options"],
			recruiterId: recruiter.recruiterProfile!.id,
		},
	});

	const additionalRTR = await prisma.rTR.create({
		data: {
			candidateId: candidate.candidateProfile!.id,
			recruiterId: recruiter.recruiterProfile!.id,
			jobId: additionalJob.id,
			status: RTRStatus.SIGNED,
			notes: "Candidate has signed the RTR and is ready for placement.",
			signedAt: new Date(),
			expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
		},
	});

	// Create RTR history entries
	await prisma.rTRHistory.createMany({
		data: [
			{
				rtrId: rtr.id,
				userId: recruiter.id,
				action: "CREATED",
				details: "RTR created by recruiter",
			},
			{
				rtrId: rtr.id,
				userId: candidate.id,
				action: "SENT",
				details: "RTR sent to candidate for review",
			},
			{
				rtrId: additionalRTR.id,
				userId: recruiter.id,
				action: "CREATED",
				details: "RTR created by recruiter",
			},
			{
				rtrId: additionalRTR.id,
				userId: candidate.id,
				action: "SIGNED",
				details: "RTR signed by candidate",
			},
		],
	});

	console.log("Seed data created successfully:");
	console.log({
		recruiter: {
			id: recruiter.id,
			email: recruiter.email,
			profileId: recruiter.recruiterProfile!.id,
		},
		candidate: {
			id: candidate.id,
			email: candidate.email,
			profileId: candidate.candidateProfile!.id,
		},
		jobs: [job.id, additionalJob.id],
		rtrs: [rtr.id, additionalRTR.id],
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
		console.log("Database seeded successfully!");
	})
	.catch(async (e) => {
		console.error("Error seeding database:", e);
		await prisma.$disconnect();
		process.exit(1);
	});
