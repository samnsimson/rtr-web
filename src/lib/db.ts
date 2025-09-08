import { prisma } from "./prisma";
import {
	User,
	RTR,
	Job,
	RecruiterProfile,
	CandidateProfile,
	JobApplication,
	Document,
	Notification,
	UserRole,
	RTRStatus,
	JobStatus,
	WorkType,
	JobType,
	CompensationType,
} from "@prisma/client";
import type {
	UserWithProfiles,
	RTRWithDetails,
	JobWithDetails,
	CandidateWithProfile,
	RTRCreateData,
	JobCreateData,
	JobUpdateData,
	RecruiterProfileCreateData,
	CandidateProfileCreateData,
	UserCreateData,
	UserUpdateData,
	JobApplicationCreateData,
	DocumentCreateData,
	NotificationCreateData,
	CandidateSearchFilters,
	JobSearchFilters,
	RTRStats,
	JobStats,
	Timeframe,
} from "@/types/database";

export class DatabaseService {
	// User Management Methods
	async getUserWithProfile(userId: string): Promise<UserWithProfiles | null> {
		return await prisma.user.findUnique({
			where: { id: userId },
			include: {
				recruiterProfile: true,
				candidateProfile: true,
			},
		});
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { email },
		});
	}

	async createUser(userData: UserCreateData): Promise<User> {
		return await prisma.user.create({
			data: userData,
		});
	}

	async updateUser(userId: string, userData: UserUpdateData): Promise<User> {
		return await prisma.user.update({
			where: { id: userId },
			data: userData,
		});
	}

	async deleteUser(userId: string): Promise<User> {
		return await prisma.user.delete({
			where: { id: userId },
		});
	}

	// RTR Management Methods
	async getRTRWithDetails(rtrId: string): Promise<RTRWithDetails | null> {
		return await prisma.rTR.findUnique({
			where: { id: rtrId },
			include: {
				job: true,
				documents: true,
				candidate: { include: { user: true } },
				recruiter: { include: { user: true } },
				history: { include: { user: true }, orderBy: { createdAt: "desc" } },
			},
		});
	}

	async getAllRTRs(recruiterId?: string, candidateId?: string): Promise<RTR[]> {
		const where: any = {};
		if (recruiterId) where.recruiterId = recruiterId;
		if (candidateId) where.candidateId = candidateId;

		return await prisma.rTR.findMany({
			where,
			include: {
				candidate: { include: { user: true } },
				recruiter: { include: { user: true } },
				history: { include: { user: true }, orderBy: { createdAt: "desc" } },
				job: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async createRTR(rtrData: RTRCreateData): Promise<RTR> {
		return await prisma.rTR.create({
			data: rtrData,
		});
	}

	async updateRTRStatus(rtrId: string, status: string, userId: string, details?: string): Promise<RTR> {
		const [updatedRTR] = await prisma.$transaction([
			prisma.rTR.update({
				where: { id: rtrId },
				data: {
					status: status as any,
					...(status === RTRStatus.SIGNED && { signedAt: new Date() }),
					...(status === RTRStatus.VIEWED && { viewedAt: new Date() }),
				},
			}),
			prisma.rTRHistory.create({
				data: {
					rtrId,
					userId,
					action: status,
					details,
				},
			}),
		]);

		return updatedRTR;
	}

	async deleteRTR(rtrId: string): Promise<RTR> {
		return await prisma.rTR.delete({
			where: { id: rtrId },
		});
	}

	// Job Management Methods
	async getJobWithDetails(jobId: string): Promise<JobWithDetails | null> {
		return await prisma.job.findUnique({
			where: { id: jobId },
			include: {
				recruiter: { include: { user: true } },
				applications: true,
				rtrs: true,
			},
		});
	}

	async getAllJobs(recruiterId?: string, status?: string): Promise<Job[]> {
		const where: any = {};
		if (recruiterId) where.recruiterId = recruiterId;
		if (status) where.status = status;

		return await prisma.job.findMany({
			where,
			include: {
				recruiter: { include: { user: true } },
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async createJob(jobData: JobCreateData): Promise<Job> {
		return await prisma.job.create({
			data: jobData,
		});
	}

	async updateJob(jobId: string, jobData: JobUpdateData): Promise<Job> {
		return await prisma.job.update({
			where: { id: jobId },
			data: jobData,
		});
	}

	async deleteJob(jobId: string): Promise<Job> {
		return await prisma.job.delete({
			where: { id: jobId },
		});
	}

	// Profile Management Methods
	async createRecruiterProfile(profileData: RecruiterProfileCreateData): Promise<RecruiterProfile> {
		return await prisma.recruiterProfile.create({
			data: profileData,
		});
	}

	async createCandidateProfile(profileData: CandidateProfileCreateData): Promise<CandidateProfile> {
		return await prisma.candidateProfile.create({
			data: profileData,
		});
	}

	async updateRecruiterProfile(userId: string, profileData: Partial<RecruiterProfile>): Promise<RecruiterProfile> {
		return await prisma.recruiterProfile.update({
			where: { userId },
			data: profileData,
		});
	}

	async updateCandidateProfile(userId: string, profileData: Partial<CandidateProfile>): Promise<CandidateProfile> {
		return await prisma.candidateProfile.update({
			where: { userId },
			data: profileData,
		});
	}

	// Application Management Methods
	async createJobApplication(applicationData: JobApplicationCreateData): Promise<JobApplication> {
		return await prisma.jobApplication.create({
			data: applicationData,
		});
	}

	async updateApplicationStatus(applicationId: string, status: string): Promise<JobApplication> {
		return await prisma.jobApplication.update({
			where: { id: applicationId },
			data: { status: status as any },
		});
	}

	// Document Management Methods
	async createDocument(documentData: DocumentCreateData): Promise<Document> {
		return await prisma.document.create({
			data: documentData,
		});
	}

	async getDocumentsByRTR(rtrId: string): Promise<Document[]> {
		return await prisma.document.findMany({
			where: { rtrId },
			orderBy: {
				uploadedAt: "desc",
			},
		});
	}

	async deleteDocument(documentId: string): Promise<Document> {
		return await prisma.document.delete({
			where: { id: documentId },
		});
	}

	// Notification Methods
	async createNotification(notificationData: NotificationCreateData): Promise<Notification> {
		return await prisma.notification.create({
			data: notificationData,
		});
	}

	async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
		const where: any = { userId };
		if (unreadOnly) where.isRead = false;

		return await prisma.notification.findMany({
			where,
			orderBy: {
				createdAt: "desc",
			},
		});
	}

	async markNotificationAsRead(notificationId: string): Promise<Notification> {
		return await prisma.notification.update({
			where: { id: notificationId },
			data: { isRead: true },
		});
	}

	async markAllNotificationsAsRead(userId: string): Promise<void> {
		await prisma.notification.updateMany({
			where: { userId, isRead: false },
			data: { isRead: true },
		});
	}

	// Search and Filter Methods
	async searchCandidates(query: string, filters?: CandidateSearchFilters): Promise<CandidateWithProfile[]> {
		const where: any = {
			OR: [{ name: { contains: query, mode: "insensitive" } }, { candidateProfile: { title: { contains: query, mode: "insensitive" } } }],
			role: UserRole.CANDIDATE,
		};

		if (filters?.location) {
			where.candidateProfile = { ...where.candidateProfile, location: { contains: filters.location, mode: "insensitive" } };
		}

		if (filters?.skills && filters.skills.length > 0) {
			where.candidateProfile = { ...where.candidateProfile, skills: { hasSome: filters.skills } };
		}

		if (filters?.experienceMin || filters?.experienceMax) {
			where.candidateProfile = {
				...where.candidateProfile,
				experience: {
					...(filters.experienceMin && { gte: filters.experienceMin }),
					...(filters.experienceMax && { lte: filters.experienceMax }),
				},
			};
		}

		return await prisma.user.findMany({
			where,
			include: {
				candidateProfile: true,
			},
		});
	}

	async searchJobs(query: string, filters?: JobSearchFilters): Promise<Job[]> {
		const where: any = {
			OR: [
				{ title: { contains: query, mode: "insensitive" } },
				{ company: { contains: query, mode: "insensitive" } },
				{ description: { contains: query, mode: "insensitive" } },
			],
			status: JobStatus.ACTIVE,
		};

		if (filters?.location) where.location = { contains: filters.location, mode: "insensitive" };
		if (filters?.workType) where.workType = filters.workType;
		if (filters?.jobType) where.jobType = filters.jobType;
		if (filters?.compensation) where.compensation = filters.compensation;

		return await prisma.job.findMany({
			where,
			include: { recruiter: { include: { user: true } } },
			orderBy: { createdAt: "desc" },
		});
	}

	// Analytics and Reporting Methods
	async getRTRStats(recruiterId?: string, timeframe: Timeframe = "month"): Promise<RTRStats> {
		const dateFilter = this.getDateFilter(timeframe);
		const where: any = { createdAt: dateFilter };
		if (recruiterId) where.recruiterId = recruiterId;

		const [total, pending, signed, expired, viewed] = await Promise.all([
			prisma.rTR.count({ where }),
			prisma.rTR.count({ where: { ...where, status: RTRStatus.PENDING } }),
			prisma.rTR.count({ where: { ...where, status: RTRStatus.SIGNED } }),
			prisma.rTR.count({ where: { ...where, status: RTRStatus.EXPIRED } }),
			prisma.rTR.count({ where: { ...where, status: RTRStatus.VIEWED } }),
		]);

		return { total, pending, signed, expired, viewed };
	}

	async getJobStats(recruiterId?: string): Promise<JobStats> {
		const where: any = {};
		if (recruiterId) where.recruiterId = recruiterId;

		const [total, active, closed, applications] = await Promise.all([
			prisma.job.count({ where }),
			prisma.job.count({ where: { ...where, status: JobStatus.ACTIVE } }),
			prisma.job.count({ where: { ...where, status: JobStatus.CLOSED } }),
			prisma.jobApplication.count({ where: { job: where } }),
		]);

		return { total, active, closed, applications };
	}

	async getJobsWithPagination(
		recruiterId?: string,
		page: number = 1,
		limit: number = 10,
		filters?: {
			query?: string;
			workType?: WorkType;
			jobType?: JobType;
			compensation?: CompensationType;
			status?: JobStatus;
		},
	): Promise<{ jobs: Job[]; total: number }> {
		const where: any = {};

		if (recruiterId) where.recruiterId = recruiterId;
		if (filters?.workType) where.workType = filters.workType;
		if (filters?.jobType) where.jobType = filters.jobType;
		if (filters?.compensation) where.compensation = filters.compensation;

		// Add search query
		if (filters?.query) {
			where.OR = [
				{ title: { contains: filters.query, mode: "insensitive" } },
				{ company: { contains: filters.query, mode: "insensitive" } },
				{ description: { contains: filters.query, mode: "insensitive" } },
			];
		}

		const [jobs, total] = await Promise.all([
			prisma.job.findMany({
				where,
				include: {
					recruiter: { include: { user: true } },
					applications: { select: { id: true } },
				},
				orderBy: { createdAt: "desc" },
				skip: (page - 1) * limit,
				take: limit,
			}),
			prisma.job.count({ where }),
		]);

		return { jobs, total };
	}

	// Utility Methods
	private getDateFilter(timeframe: Timeframe): { gte: Date } {
		const now = new Date();
		let startDate: Date;

		switch (timeframe) {
			case "week":
				startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
				break;
			case "month":
				startDate = new Date(now.getFullYear(), now.getMonth(), 1);
				break;
			case "year":
				startDate = new Date(now.getFullYear(), 0, 1);
				break;
			default:
				startDate = new Date(now.getFullYear(), now.getMonth(), 1);
		}

		return { gte: startDate };
	}

	// Cleanup and Maintenance Methods
	async cleanupExpiredRTRs(): Promise<number> {
		const result = await prisma.rTR.updateMany({
			where: {
				expiresAt: { lt: new Date() },
				status: { not: RTRStatus.EXPIRED },
			},
			data: { status: RTRStatus.EXPIRED },
		});

		return result.count;
	}

	async cleanupOldNotifications(daysOld: number = 90): Promise<number> {
		const cutoffDate = new Date(Date.now() - daysOld * 24 * 60 * 60 * 1000);
		const result = await prisma.notification.deleteMany({ where: { createdAt: { lt: cutoffDate }, isRead: true } });
		return result.count;
	}
}

// Export a singleton instance
export const db = new DatabaseService();

// Export individual methods for backward compatibility
export const { getUserWithProfile, getRTRWithDetails } = db;
