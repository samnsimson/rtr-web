import type {
	User,
	RTR,
	Job,
	RecruiterProfile,
	CandidateProfile,
	JobApplication,
	Document,
	UserRole,
	CompanySize,
	RemotePreference,
	WorkType,
	JobType,
	CompensationType,
	RTRStatus,
	ApplicationStatus,
	DocumentType,
	NotificationType,
} from "@prisma/client";

// User-related types
export type UserWithProfiles = User & {
	recruiterProfile: RecruiterProfile | null;
	candidateProfile: CandidateProfile | null;
};

export type CandidateWithProfile = User & {
	candidateProfile: CandidateProfile | null;
};

export type RecruiterWithProfile = User & {
	recruiterProfile: RecruiterProfile | null;
};

// RTR-related types
export type RTRWithDetails = RTR & {
	candidate: CandidateProfile & {
		user: User;
	};
	recruiter: RecruiterProfile & {
		user: User;
	};
	job: Job | null;
	history: Array<{
		id: string;
		action: string;
		details: string | null;
		createdAt: Date;
		user: User;
	}>;
	documents: Document[];
};

export type RTRCreateData = {
	candidateId: string;
	recruiterId: string;
	jobId?: string;
	notes?: string;
	expiresAt?: Date;
};

export type RTRStatusUpdateData = {
	rtrId: string;
	status: RTRStatus;
	userId: string;
	details?: string;
};

// Job-related types
export type JobWithDetails = Job & {
	recruiter: RecruiterProfile & {
		user: User;
	};
	applications: JobApplication[];
	rtrs: RTR[];
};

export type JobCreateData = {
	title: string;
	company: string;
	description: string;
	requirements: string[];
	location: string;
	workType: WorkType;
	jobType: JobType;
	compensation: CompensationType;
	salaryMin?: number;
	salaryMax?: number;
	benefits: string[];
	recruiterId: string;
	expiresAt?: Date;
};

export type JobUpdateData = Partial<Job>;

// Profile-related types
export type RecruiterProfileCreateData = {
	userId: string;
	companyName: string;
	companyWebsite?: string;
	industry?: string;
	companySize?: CompanySize;
	location?: string;
	bio?: string;
	linkedinUrl?: string;
};

export type CandidateProfileCreateData = {
	userId: string;
	title?: string;
	experience?: number;
	skills?: string[];
	resumeUrl?: string;
	linkedinUrl?: string;
	portfolioUrl?: string;
	location?: string;
	willingToRelocate?: boolean;
	remotePreference?: RemotePreference;
	expectedSalary?: number;
};

export type ProfileUpdateData = Partial<RecruiterProfile> | Partial<CandidateProfile>;

// User management types
export type UserCreateData = {
	email: string;
	name?: string;
	password?: string;
	role?: UserRole;
	phone?: string;
};

export type UserUpdateData = Partial<User>;

// Application types
export type JobApplicationCreateData = {
	jobId: string;
	candidateId: string;
	coverLetter?: string;
};

export type ApplicationStatusUpdateData = {
	applicationId: string;
	status: ApplicationStatus;
};

// Document types
export type DocumentCreateData = {
	rtrId: string;
	name: string;
	type: DocumentType;
	url: string;
	size: number;
	mimeType: string;
};

// Notification types
export type NotificationCreateData = {
	userId: string;
	title: string;
	message: string;
	type: NotificationType;
	data?: any;
};

// Search and filter types
export type CandidateSearchFilters = {
	location?: string;
	skills?: string[];
	experienceMin?: number;
	experienceMax?: number;
};

export type JobSearchFilters = {
	location?: string;
	workType?: WorkType;
	jobType?: JobType;
	compensation?: CompensationType;
};

// Analytics types
export type RTRStats = {
	total: number;
	pending: number;
	signed: number;
	expired: number;
	viewed: number;
};

export type JobStats = {
	total: number;
	active: number;
	closed: number;
	applications: number;
};

export type Timeframe = "week" | "month" | "year";

// Database operation result types
export type DatabaseResult<T> = {
	data: T | null;
	error?: string;
	success: boolean;
};

export type PaginationParams = {
	page: number;
	limit: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
};

export type PaginatedResult<T> = {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNext: boolean;
	hasPrev: boolean;
};

export type JobFormData = {
	title: string;
	company: string;
	description: string;
	requirements: string[];
	location: string;
	workType: WorkType | undefined;
	jobType: JobType | undefined;
	compensation: CompensationType | undefined;
	salaryMin?: number;
	salaryMax?: number;
	benefits: string[];
	expiresAt: string;
};
