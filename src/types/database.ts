// TODO: Replace with GraphQL generated types
// Mock types for now
export type User = {
	id: string;
	email: string;
	name: string | null;
	role: string;
	avatar: string | null;
	phone: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type RTR = {
	id: string;
	candidateId: string;
	recruiterId: string;
	jobId: string | null;
	status: string;
	notes: string | null;
	expiresAt: Date | null;
	signedAt: Date | null;
	viewedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Job = {
	id: string;
	title: string;
	company: string;
	description: string;
	requirements: string[];
	location: string;
	workType: string;
	jobType: string;
	compensation: string;
	salaryMin: number | null;
	salaryMax: number | null;
	benefits: string[];
	recruiterId: string;
	status: string;
	expiresAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};

export type JobApplication = {
	id: string;
	jobId: string;
	candidateId: string;
	status: string;
	coverLetter: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Document = {
	id: string;
	rtrId: string;
	name: string;
	type: string;
	url: string;
	size: number;
	mimeType: string;
	uploadedAt: Date;
};

export type Notification = {
	id: string;
	userId: string;
	title: string;
	message: string;
	type: string;
	data: any;
	isRead: boolean;
	createdAt: Date;
};

export enum UserRole {
	RECRUITER = "RECRUITER",
	CANDIDATE = "CANDIDATE",
	ADMIN = "ADMIN",
}

export enum CompanySize {
	STARTUP = "STARTUP",
	SMALL = "SMALL",
	MEDIUM = "MEDIUM",
	LARGE = "LARGE",
	ENTERPRISE = "ENTERPRISE",
}

export enum RemotePreference {
	ANY = "ANY",
	REMOTE_ONLY = "REMOTE_ONLY",
	HYBRID_ONLY = "HYBRID_ONLY",
	ONSITE_ONLY = "ONSITE_ONLY",
}

export enum WorkType {
	REMOTE = "REMOTE",
	HYBRID = "HYBRID",
	ON_SITE = "ON_SITE",
}

export enum JobType {
	FULL_TIME = "FULL_TIME",
	PART_TIME = "PART_TIME",
	CONTRACT = "CONTRACT",
	INTERNSHIP = "INTERNSHIP",
	FREELANCE = "FREELANCE",
}

export enum CompensationType {
	SALARY = "SALARY",
	HOURLY = "HOURLY",
	PROJECT_BASED = "PROJECT_BASED",
	COMMISSION = "COMMISSION",
}

export enum RtrStatus {
	PENDING = "PENDING",
	SENT = "SENT",
	VIEWED = "VIEWED",
	SIGNED = "SIGNED",
	EXPIRED = "EXPIRED",
	REJECTED = "REJECTED",
}

export enum ApplicationStatus {
	APPLIED = "APPLIED",
	REVIEWING = "REVIEWING",
	INTERVIEWING = "INTERVIEWING",
	OFFERED = "OFFERED",
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
	WITHDRAWN = "WITHDRAWN",
}

export enum DocumentType {
	RESUME = "RESUME",
	COVER_LETTER = "COVER_LETTER",
	PORTFOLIO = "PORTFOLIO",
	OTHER = "OTHER",
}

export enum NotificationType {
	RTR_CREATED = "RTR_CREATED",
	RTR_SIGNED = "RTR_SIGNED",
	RTR_EXPIRED = "RTR_EXPIRED",
	JOB_APPLICATION = "JOB_APPLICATION",
	SYSTEM = "SYSTEM",
}

// User-related types

// RTR-related types
export type RTRWithDetails = RTR & {
	candidate: User;
	recruiter: User;
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

export type RtrStatusUpdateData = {
	rtrId: string;
	status: RtrStatus;
	userId: string;
	details?: string;
};

// Job-related types
export type JobWithDetails = Job & {
	recruiter: User;
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
