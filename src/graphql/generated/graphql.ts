import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** The status of a job application */
export enum ApplicationStatus {
  Accepted = 'ACCEPTED',
  Applied = 'APPLIED',
  Interviewing = 'INTERVIEWING',
  Offered = 'OFFERED',
  Rejected = 'REJECTED',
  Reviewing = 'REVIEWING',
  Withdrawn = 'WITHDRAWN'
}

export type Auth = {
  __typename?: 'Auth';
  accessToken: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  refreshToken: Scalars['String']['output'];
  tokenType: Scalars['String']['output'];
  user: AuthUser;
};

export type AuthUser = {
  __typename?: 'AuthUser';
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Org>;
  role: UserRole;
};

export enum BillingInterval {
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY'
}

export type CandidateProfile = {
  __typename?: 'CandidateProfile';
  applications?: Maybe<Array<JobApplication>>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  education?: Maybe<Scalars['String']['output']>;
  expectedSalary?: Maybe<Scalars['Float']['output']>;
  experience?: Maybe<Scalars['Float']['output']>;
  experienceLevel?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  portfolioUrl?: Maybe<Scalars['String']['output']>;
  remotePreference: RemotePreference;
  resumeUrl?: Maybe<Scalars['String']['output']>;
  rtrs?: Maybe<Array<Rtr>>;
  skills?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
  willingToRelocate: Scalars['Boolean']['output'];
};

export type CandidateProfileResponse = {
  __typename?: 'CandidateProfileResponse';
  createdAt: Scalars['DateTime']['output'];
  expectedSalary?: Maybe<Scalars['Int']['output']>;
  experience?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  portfolioUrl?: Maybe<Scalars['String']['output']>;
  remotePreference: RemotePreference;
  resumeUrl?: Maybe<Scalars['String']['output']>;
  skills?: Maybe<Array<Scalars['String']['output']>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  willingToRelocate: Scalars['Boolean']['output'];
};

/** The size of the company */
export enum CompanySize {
  Enterprise = 'ENTERPRISE',
  Large = 'LARGE',
  Medium = 'MEDIUM',
  Small = 'SMALL',
  Startup = 'STARTUP'
}

/** The type of compensation for a job */
export enum CompensationType {
  Commission = 'COMMISSION',
  Hourly = 'HOURLY',
  ProjectBased = 'PROJECT_BASED',
  Salary = 'SALARY'
}

export type CompiledRtrTemplateInput = {
  candidate?: InputMaybe<RtrTemplateCandidateInput>;
  jobId: Scalars['String']['input'];
  templateId: Scalars['String']['input'];
};

export type CreateCandidateProfileInput = {
  expectedSalary?: InputMaybe<Scalars['Int']['input']>;
  experience?: InputMaybe<Scalars['Int']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  portfolioUrl?: InputMaybe<Scalars['String']['input']>;
  remotePreference?: InputMaybe<RemotePreference>;
  resumeUrl?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  willingToRelocate?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateDocumentInput = {
  mimeType: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rtrId: Scalars['String']['input'];
  size: Scalars['Int']['input'];
  type: DocumentType;
  url: Scalars['String']['input'];
};

export type CreateJobApplicationInput = {
  candidateId: Scalars['String']['input'];
  coverLetter?: InputMaybe<Scalars['String']['input']>;
  jobId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
};

export type CreateJobInput = {
  benefits: Array<Scalars['String']['input']>;
  company: Scalars['String']['input'];
  compensation: CompensationType;
  description: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  jobType: JobType;
  location: Scalars['String']['input'];
  requirements: Array<Scalars['String']['input']>;
  salaryMax?: InputMaybe<Scalars['Int']['input']>;
  salaryMin?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<JobStatus>;
  title: Scalars['String']['input'];
  workType: WorkType;
};

export type CreateNotificationInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: NotificationType;
  userId: Scalars['String']['input'];
};

export type CreateOrganizationInput = {
  companySize?: InputMaybe<CompanySize>;
  description?: InputMaybe<Scalars['String']['input']>;
  industry?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type CreateOverviewInput = {
  /** Include detailed breakdowns */
  includeDetailedBreakdowns?: Scalars['Boolean']['input'];
  /** Include monthly metrics */
  includeMonthlyMetrics?: Scalars['Boolean']['input'];
  /** Organization ID */
  organizationId: Scalars['String']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  currency: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  savePaymentMethod?: InputMaybe<Scalars['Boolean']['input']>;
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRtrHistoryInput = {
  action: Scalars['String']['input'];
  details?: InputMaybe<Scalars['String']['input']>;
  rtrId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateRecruiterProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateRtrInput = {
  compensation: Scalars['Int']['input'];
  compensationType: CompensationType;
  email: Scalars['String']['input'];
  employerDetailsRequired?: InputMaybe<Scalars['Boolean']['input']>;
  expiresAt?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  jobId: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  photoIdRequired?: InputMaybe<Scalars['Boolean']['input']>;
  referencesRequired?: InputMaybe<Scalars['Boolean']['input']>;
  resumeRequired?: InputMaybe<Scalars['Boolean']['input']>;
  rtrTemplateId: Scalars['String']['input'];
  skillsRequired?: InputMaybe<Scalars['Boolean']['input']>;
  status?: InputMaybe<RtrStatus>;
};

export type CreateRtrTemplateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  text?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  billingInterval: BillingInterval;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  planId: Scalars['String']['input'];
  planType: PlanType;
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type Document = {
  __typename?: 'Document';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  rtr: Rtr;
  rtrId: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  type: DocumentType;
  uploadedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type DocumentResponse = {
  __typename?: 'DocumentResponse';
  id: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rtrId: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  type: DocumentType;
  uploadedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type DocumentToIndexInput = {
  /** Document ID */
  id: Scalars['String']['input'];
};

/** The type of document being stored */
export enum DocumentType {
  Contract = 'CONTRACT',
  CoverLetter = 'COVER_LETTER',
  Other = 'OTHER',
  Resume = 'RESUME',
  RtrForm = 'RTR_FORM'
}

export type IndexConfigInput = {
  /** Distinct attribute */
  distinctAttribute?: InputMaybe<Scalars['String']['input']>;
  /** Filterable attributes */
  filterableAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Index name */
  name: Scalars['String']['input'];
  /** Primary key field */
  primaryKey?: InputMaybe<Scalars['String']['input']>;
  /** Ranking rules */
  rankingRules?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Searchable attributes */
  searchableAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Sortable attributes */
  sortableAttributes?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Stop words */
  stopWords?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Synonyms mapping */
  synonyms?: InputMaybe<Scalars['String']['input']>;
};

export type IndexStatsType = {
  __typename?: 'IndexStatsType';
  /** Field distribution statistics */
  fieldDistribution: Scalars['String']['output'];
  /** Whether index is currently being built */
  isIndexing: Scalars['Boolean']['output'];
  /** Number of documents in index */
  numberOfDocuments: Scalars['Int']['output'];
};

export type IndexType = {
  __typename?: 'IndexType';
  /** Filterable attributes */
  filterableAttributes?: Maybe<Array<Scalars['String']['output']>>;
  /** Index name */
  name: Scalars['String']['output'];
  /** Primary key field */
  primaryKey?: Maybe<Scalars['String']['output']>;
  /** Searchable attributes */
  searchableAttributes?: Maybe<Array<Scalars['String']['output']>>;
  /** Sortable attributes */
  sortableAttributes?: Maybe<Array<Scalars['String']['output']>>;
};

export type Job = {
  __typename?: 'Job';
  applications?: Maybe<Array<JobApplication>>;
  benefits: Array<Scalars['String']['output']>;
  company: Scalars['String']['output'];
  compensation: CompensationType;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  jobType: JobType;
  location: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  recruiter: RecruiterProfile;
  recruiterId: Scalars['String']['output'];
  requirements: Array<Scalars['String']['output']>;
  rtrs?: Maybe<Array<Rtr>>;
  salaryMax?: Maybe<Scalars['Float']['output']>;
  salaryMin?: Maybe<Scalars['Float']['output']>;
  status: JobStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workType: WorkType;
};

export type JobApplication = {
  __typename?: 'JobApplication';
  appliedAt: Scalars['DateTime']['output'];
  candidate: Scalars['String']['output'];
  candidateId: Scalars['String']['output'];
  coverLetter?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  job: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  organizationId?: Maybe<Scalars['String']['output']>;
  status: ApplicationStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type JobListFiltersInput = {
  compensation?: InputMaybe<CompensationType>;
  jobType?: InputMaybe<JobType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  workType?: InputMaybe<WorkType>;
};

export type JobResponse = {
  __typename?: 'JobResponse';
  benefits: Array<Scalars['String']['output']>;
  company: Scalars['String']['output'];
  compensation: CompensationType;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  jobId?: Maybe<Scalars['String']['output']>;
  jobType: JobType;
  location: Scalars['String']['output'];
  organization: Organization;
  organizationId?: Maybe<Scalars['String']['output']>;
  recruiter: User;
  recruiterId: Scalars['String']['output'];
  requirements: Array<Scalars['String']['output']>;
  salaryMax?: Maybe<Scalars['Int']['output']>;
  salaryMin?: Maybe<Scalars['Int']['output']>;
  status: JobStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  workType: WorkType;
};

export type JobResponsePaginated = {
  __typename?: 'JobResponsePaginated';
  data: Array<JobResponse>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type JobSearchFiltersInput = {
  /** Compensation type filters */
  compensation?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Job type filters */
  jobType?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Location filter */
  location?: InputMaybe<Scalars['String']['input']>;
  /** Recruiter ID filter */
  recruiterId?: InputMaybe<Scalars['String']['input']>;
  /** Maximum salary filter */
  salaryMax?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum salary filter */
  salaryMin?: InputMaybe<Scalars['Int']['input']>;
  /** Status filter */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Work type filters */
  workType?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The current status of a job posting */
export enum JobStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  Inactive = 'INACTIVE'
}

/** The type of employment for a job */
export enum JobType {
  Contract = 'CONTRACT',
  Freelance = 'FREELANCE',
  FullTime = 'FULL_TIME',
  Internship = 'INTERNSHIP',
  PartTime = 'PART_TIME'
}

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDocuments: Scalars['Boolean']['output'];
  approveRtr: RtrResponse;
  cancelSubscription: Subscription;
  createCandidateProfile: CandidateProfileResponse;
  createDocument: DocumentResponse;
  createIndex: Scalars['Boolean']['output'];
  createJob: JobResponse;
  createJobApplication: JobApplication;
  createNotification: NotificationResponse;
  createOrganization: Organization;
  createOrganizationUser: User;
  createOverview: Overview;
  createPayment: Payment;
  createRTRHistory: RtrHistoryResponse;
  createRecruiterProfile: RecruiterProfileResponse;
  createRtr: RtrResponse;
  createRtrTemplate: RtrTemplate;
  createSubscription: Subscription;
  createUser: UserResponse;
  deleteAllDocuments: Scalars['Boolean']['output'];
  deleteDocuments: Scalars['Boolean']['output'];
  deleteIndex: Scalars['Boolean']['output'];
  deleteOverview: Scalars['Boolean']['output'];
  indexCandidateProfiles: Scalars['Boolean']['output'];
  indexJobs: Scalars['Boolean']['output'];
  indexRecruiterProfiles: Scalars['Boolean']['output'];
  indexSingleJob: Scalars['Boolean']['output'];
  indexUsers: Scalars['Boolean']['output'];
  login: Auth;
  markRtrAsViewed: RtrResponse;
  processPayment: Payment;
  refreshOverview: Overview;
  refreshToken: Auth;
  register: Auth;
  reindex: Scalars['Boolean']['output'];
  reindexAll: Scalars['Boolean']['output'];
  rejectRtr: RtrResponse;
  removeCandidateProfile: Scalars['Boolean']['output'];
  removeDocument: DocumentResponse;
  removeJob: JobResponse;
  removeJobApplication: JobApplication;
  removeJobFromIndex: Scalars['Boolean']['output'];
  removeNotification: NotificationResponse;
  removeOrganization: Scalars['Boolean']['output'];
  removeOverview: Overview;
  removeRTRHistory: RtrHistoryResponse;
  removeRecruiterProfile: Scalars['Boolean']['output'];
  removeRtr: Scalars['Boolean']['output'];
  removeRtrTemplate: RtrTemplate;
  removeUser: Scalars['Boolean']['output'];
  removeUserFromOrganization: Scalars['Boolean']['output'];
  updateCandidateProfile: CandidateProfileResponse;
  updateDocument: DocumentResponse;
  updateDocuments: Scalars['Boolean']['output'];
  updateJob: JobResponse;
  updateJobApplication: JobApplication;
  updateJobInIndex: Scalars['Boolean']['output'];
  updateNotification: NotificationResponse;
  updateOrganization: Organization;
  updateOverview: Overview;
  updateRTR: RtrResponse;
  updateRTRHistory: RtrHistoryResponse;
  updateRecruiterProfile: RecruiterProfileResponse;
  updateRtrTemplate: RtrTemplate;
  updateSubscription: Subscription;
  updateUser: UserResponse;
  updateUserRole: User;
};


export type MutationAddDocumentsArgs = {
  documents: Array<DocumentToIndexInput>;
  indexName: Scalars['String']['input'];
};


export type MutationApproveRtrArgs = {
  id: Scalars['String']['input'];
};


export type MutationCancelSubscriptionArgs = {
  id: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCandidateProfileArgs = {
  createCandidateProfileInput: CreateCandidateProfileInput;
};


export type MutationCreateDocumentArgs = {
  createDocumentInput: CreateDocumentInput;
};


export type MutationCreateIndexArgs = {
  config: IndexConfigInput;
};


export type MutationCreateJobArgs = {
  createJobInput: CreateJobInput;
};


export type MutationCreateJobApplicationArgs = {
  createJobApplicationInput: CreateJobApplicationInput;
};


export type MutationCreateNotificationArgs = {
  createNotificationInput: CreateNotificationInput;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: CreateOrganizationInput;
};


export type MutationCreateOrganizationUserArgs = {
  createUserInput: CreateOrganizationUserInput;
  organizationId: Scalars['String']['input'];
};


export type MutationCreateOverviewArgs = {
  createOverviewInput: CreateOverviewInput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreateRtrHistoryArgs = {
  createRTRHistoryInput: CreateRtrHistoryInput;
};


export type MutationCreateRecruiterProfileArgs = {
  createRecruiterProfileInput: CreateRecruiterProfileInput;
};


export type MutationCreateRtrArgs = {
  createRtrInput: CreateRtrInput;
};


export type MutationCreateRtrTemplateArgs = {
  createRtrTemplateInput: CreateRtrTemplateInput;
};


export type MutationCreateSubscriptionArgs = {
  createSubscriptionInput: CreateSubscriptionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAllDocumentsArgs = {
  indexName: Scalars['String']['input'];
};


export type MutationDeleteDocumentsArgs = {
  documentIds: Array<Scalars['String']['input']>;
  indexName: Scalars['String']['input'];
};


export type MutationDeleteIndexArgs = {
  indexName: Scalars['String']['input'];
};


export type MutationIndexCandidateProfilesArgs = {
  batchSize?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationIndexJobsArgs = {
  batchSize?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationIndexRecruiterProfilesArgs = {
  batchSize?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationIndexSingleJobArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationIndexUsersArgs = {
  batchSize?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationMarkRtrAsViewedArgs = {
  id: Scalars['String']['input'];
};


export type MutationProcessPaymentArgs = {
  processPaymentInput: ProcessPaymentInput;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationReindexArgs = {
  documents: Array<DocumentToIndexInput>;
  indexName: Scalars['String']['input'];
};


export type MutationReindexAllArgs = {
  batchSize?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationRejectRtrArgs = {
  id: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRemoveCandidateProfileArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveJobArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveJobApplicationArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveJobFromIndexArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOverviewArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRtrHistoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRecruiterProfileArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRtrArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRtrTemplateArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserFromOrganizationArgs = {
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationUpdateCandidateProfileArgs = {
  id: Scalars['String']['input'];
  updateCandidateProfileInput: UpdateCandidateProfileInput;
};


export type MutationUpdateDocumentArgs = {
  id: Scalars['Int']['input'];
  updateDocumentInput: CreateDocumentInput;
};


export type MutationUpdateDocumentsArgs = {
  documents: Array<DocumentToIndexInput>;
  indexName: Scalars['String']['input'];
};


export type MutationUpdateJobArgs = {
  id: Scalars['String']['input'];
  updateJobInput: UpdateJobInput;
};


export type MutationUpdateJobApplicationArgs = {
  id: Scalars['String']['input'];
  updateJobApplicationInput: UpdateJobApplicationInput;
};


export type MutationUpdateJobInIndexArgs = {
  jobId: Scalars['String']['input'];
};


export type MutationUpdateNotificationArgs = {
  id: Scalars['Int']['input'];
  updateNotificationInput: UpdateNotificationInput;
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['String']['input'];
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateOverviewArgs = {
  updateOverviewInput: UpdateOverviewInput;
};


export type MutationUpdateRtrArgs = {
  id: Scalars['String']['input'];
  updateRtrInput: UpdateRtrInput;
};


export type MutationUpdateRtrHistoryArgs = {
  id: Scalars['Int']['input'];
  updateRTRHistoryInput: CreateRtrHistoryInput;
};


export type MutationUpdateRecruiterProfileArgs = {
  id: Scalars['String']['input'];
  updateRecruiterProfileInput: UpdateRecruiterProfileInput;
};


export type MutationUpdateRtrTemplateArgs = {
  updateRtrTemplateInput: UpdateRtrTemplateInput;
};


export type MutationUpdateSubscriptionArgs = {
  id: Scalars['String']['input'];
  updateSubscriptionInput: UpdateSubscriptionInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserRoleArgs = {
  newRole: UserRole;
  organizationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  actionUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: NotificationType;
  user: User;
  userId: Scalars['String']['output'];
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: NotificationType;
  userId: Scalars['String']['output'];
};

/** The type of notification being sent */
export enum NotificationType {
  Error = 'ERROR',
  Info = 'INFO',
  JobUpdate = 'JOB_UPDATE',
  RtrUpdate = 'RTR_UPDATE',
  Success = 'SUCCESS',
  Warning = 'WARNING'
}

export type Org = {
  __typename?: 'Org';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Organization = {
  __typename?: 'Organization';
  candidateProfiles?: Maybe<Array<CandidateProfile>>;
  companySize?: Maybe<CompanySize>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<Array<Document>>;
  id: Scalars['String']['output'];
  industry?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  jobApplications?: Maybe<Array<JobApplication>>;
  jobs?: Maybe<Array<Job>>;
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notifications?: Maybe<Array<Notification>>;
  payments?: Maybe<Array<Payment>>;
  recruiterProfiles?: Maybe<Array<RecruiterProfile>>;
  rtrHistory?: Maybe<Array<RtrHistory>>;
  rtrTemplates?: Maybe<Array<RtrTemplate>>;
  rtrs?: Maybe<Array<Rtr>>;
  subscriptions?: Maybe<Array<Subscription>>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
  website?: Maybe<Scalars['String']['output']>;
};

export type Overview = {
  __typename?: 'Overview';
  /** Number of accepted applications */
  acceptedApplications: Scalars['Int']['output'];
  /** Number of active jobs */
  activeJobs: Scalars['Int']['output'];
  /** Applications this month */
  applicationsThisMonth: Scalars['Int']['output'];
  /** Number of closed jobs */
  closedJobs: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** Number of expired RTRs */
  expiredRtrs: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** Number of applications in interview stage */
  interviewingApplications: Scalars['Int']['output'];
  /** Jobs created this month */
  jobsThisMonth: Scalars['Int']['output'];
  organization: Organization;
  organizationId: Scalars['String']['output'];
  /** Number of pending RTRs */
  pendingRtrs: Scalars['Int']['output'];
  /** Number of rejected applications */
  rejectedApplications: Scalars['Int']['output'];
  /** Number of rejected RTRs */
  rejectedRtrs: Scalars['Int']['output'];
  /** Number of applications under review */
  reviewingApplications: Scalars['Int']['output'];
  /** RTRs created this month */
  rtrsThisMonth: Scalars['Int']['output'];
  /** Number of signed RTRs */
  signedRtrs: Scalars['Int']['output'];
  /** Total number of candidates */
  totalCandidates: Scalars['Int']['output'];
  /** Total number of job applications */
  totalJobApplications: Scalars['Int']['output'];
  /** Total number of jobs */
  totalJobs: Scalars['Int']['output'];
  /** Total number of organizations */
  totalOrganizations: Scalars['Int']['output'];
  /** Total number of recruiters */
  totalRecruiters: Scalars['Int']['output'];
  /** Total number of RTRs */
  totalRtrs: Scalars['Int']['output'];
  /** Total number of users */
  totalUsers: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OverviewQueryInput = {
  includeApplicationMetrics?: InputMaybe<Scalars['Boolean']['input']>;
  includeDetailedBreakdowns?: InputMaybe<Scalars['Boolean']['input']>;
  includeJobMetrics?: InputMaybe<Scalars['Boolean']['input']>;
  includeMonthlyMetrics?: InputMaybe<Scalars['Boolean']['input']>;
  includeRtrMetrics?: InputMaybe<Scalars['Boolean']['input']>;
  includeUserMetrics?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaginationDto = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  invoiceUrl?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod: PaymentMethod;
  receiptUrl?: Maybe<Scalars['String']['output']>;
  refundedAmount?: Maybe<Scalars['Float']['output']>;
  refundedAt?: Maybe<Scalars['DateTime']['output']>;
  status: PaymentStatus;
  stripeChargeId?: Maybe<Scalars['String']['output']>;
  stripeInvoiceId?: Maybe<Scalars['String']['output']>;
  stripePaymentIntentId?: Maybe<Scalars['String']['output']>;
  subscription?: Maybe<Subscription>;
  subscriptionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Card = 'CARD',
  Other = 'OTHER',
  Wallet = 'WALLET'
}

export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export enum PlanType {
  Premium = 'PREMIUM',
  Standard = 'STANDARD'
}

export type ProcessPaymentInput = {
  customerId?: InputMaybe<Scalars['String']['input']>;
  paymentMethodId?: InputMaybe<Scalars['String']['input']>;
  subscriptionId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  activeSubscription?: Maybe<Subscription>;
  applicationStats: Scalars['String']['output'];
  candidateProfile: CandidateProfileResponse;
  candidateProfiles: Array<CandidateProfileResponse>;
  compiledRtrTemplate: RtrTemplateResponse;
  document: DocumentResponse;
  documents: Array<DocumentResponse>;
  getActiveJobs: SearchResultType;
  getExpiringJobs: SearchResultType;
  getIndexStats: IndexStatsType;
  getJobsByRecruiter: SearchResultType;
  getRecentJobs: SearchResultType;
  job: JobResponse;
  jobApplication: JobApplication;
  jobApplications: Array<JobApplication>;
  jobApplicationsByCandidate: Array<JobApplication>;
  jobApplicationsByJob: Array<JobApplication>;
  jobs: JobResponsePaginated;
  jobsByOrganization: Array<JobResponse>;
  jobsByRecruiter: Array<JobResponse>;
  listIndexes: Array<IndexType>;
  me: UserResponse;
  notification: NotificationResponse;
  notifications: Array<NotificationResponse>;
  organization: Organization;
  organizationPayments: Array<Payment>;
  organizationStats: Scalars['String']['output'];
  organizationSubscriptions: Array<Subscription>;
  organizationUsers: Array<User>;
  organizations: Array<Organization>;
  overview: Overview;
  overviewById: Overview;
  overviewByOrganization: Overview;
  overviewDashboard: Overview;
  overviewMetrics: Overview;
  overviews: Array<Overview>;
  payment: Payment;
  payments: Array<Payment>;
  recruiterProfile: RecruiterProfileResponse;
  recruiterProfiles: Array<RecruiterProfileResponse>;
  rtr: RtrResponse;
  rtrHistories: Array<RtrHistoryResponse>;
  rtrHistory: RtrHistoryResponse;
  rtrTemplate: RtrTemplate;
  rtrTemplates: Array<RtrTemplate>;
  rtrs: Array<RtrResponse>;
  rtrsByCandidate: Array<RtrResponse>;
  rtrsByJob: Array<RtrResponse>;
  rtrsByRecruiter: Array<RtrResponse>;
  search: SearchResultType;
  searchJobs: SearchResultType;
  searchJobsByCompany: SearchResultType;
  searchJobsByLocation: SearchResultType;
  searchJobsBySalaryRange: SearchResultType;
  searchJobsBySkills: SearchResultType;
  searchJobsByWorkType: SearchResultType;
  subscription: Subscription;
  subscriptionPlan: SubscriptionPlan;
  subscriptionPlans: Array<SubscriptionPlan>;
  subscriptionPlansByType: Array<SubscriptionPlan>;
  subscriptions: Array<Subscription>;
  user: UserResponse;
  userPayments: Array<Payment>;
  users: Array<UserResponse>;
  verifyToken: Scalars['String']['output'];
};


export type QueryCandidateProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryCompiledRtrTemplateArgs = {
  compiledTemplateInput: CompiledRtrTemplateInput;
};


export type QueryDocumentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetActiveJobsArgs = {
  options?: InputMaybe<SearchOptionsInput>;
};


export type QueryGetExpiringJobsArgs = {
  daysUntilExpiry?: InputMaybe<Scalars['Float']['input']>;
  options?: InputMaybe<SearchOptionsInput>;
};


export type QueryGetIndexStatsArgs = {
  indexName: Scalars['String']['input'];
};


export type QueryGetJobsByRecruiterArgs = {
  options?: InputMaybe<SearchOptionsInput>;
  recruiterId: Scalars['String']['input'];
};


export type QueryGetRecentJobsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryJobArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobApplicationArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobApplicationsByCandidateArgs = {
  candidateId: Scalars['String']['input'];
};


export type QueryJobApplicationsByJobArgs = {
  jobId: Scalars['String']['input'];
};


export type QueryJobsArgs = {
  filters: JobListFiltersInput;
};


export type QueryJobsByOrganizationArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryJobsByRecruiterArgs = {
  recruiterId: Scalars['String']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrganizationPaymentsArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryOrganizationStatsArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryOrganizationSubscriptionsArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryOrganizationUsersArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryOverviewArgs = {
  query?: InputMaybe<OverviewQueryInput>;
};


export type QueryOverviewByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['String']['input'];
};


export type QueryRecruiterProfileArgs = {
  id: Scalars['String']['input'];
};


export type QueryRtrArgs = {
  id: Scalars['String']['input'];
};


export type QueryRtrHistoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRtrTemplateArgs = {
  id: Scalars['String']['input'];
};


export type QueryRtrsArgs = {
  filters?: InputMaybe<RtrFiltersInput>;
};


export type QueryRtrsByCandidateArgs = {
  candidateId: Scalars['String']['input'];
};


export type QueryRtrsByJobArgs = {
  jobId: Scalars['String']['input'];
};


export type QueryRtrsByRecruiterArgs = {
  recruiterId: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  indexName: Scalars['String']['input'];
  options?: InputMaybe<SearchOptionsInput>;
  query: Scalars['String']['input'];
};


export type QuerySearchJobsArgs = {
  filters?: InputMaybe<JobSearchFiltersInput>;
  options?: InputMaybe<SearchOptionsInput>;
  query: Scalars['String']['input'];
};


export type QuerySearchJobsByCompanyArgs = {
  company: Scalars['String']['input'];
  options?: InputMaybe<SearchOptionsInput>;
};


export type QuerySearchJobsByLocationArgs = {
  location: Scalars['String']['input'];
  options?: InputMaybe<SearchOptionsInput>;
};


export type QuerySearchJobsBySalaryRangeArgs = {
  maxSalary: Scalars['Float']['input'];
  minSalary: Scalars['Float']['input'];
  options?: InputMaybe<SearchOptionsInput>;
};


export type QuerySearchJobsBySkillsArgs = {
  options?: InputMaybe<SearchOptionsInput>;
  skills: Array<Scalars['String']['input']>;
};


export type QuerySearchJobsByWorkTypeArgs = {
  options?: InputMaybe<SearchOptionsInput>;
  workType: Array<Scalars['String']['input']>;
};


export type QuerySubscriptionArgs = {
  id: Scalars['String']['input'];
};


export type QuerySubscriptionPlanArgs = {
  id: Scalars['String']['input'];
};


export type QuerySubscriptionPlansByTypeArgs = {
  planType: PlanType;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserPaymentsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<PaginationDto>;
};

export type Rtr = {
  __typename?: 'RTR';
  candidate: CandidateProfile;
  candidateEmail: Scalars['String']['output'];
  candidateFirstName: Scalars['String']['output'];
  candidateLastName?: Maybe<Scalars['String']['output']>;
  candidatePhone?: Maybe<Scalars['String']['output']>;
  compensation?: Maybe<Scalars['Float']['output']>;
  compensationType?: Maybe<CompensationType>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  documents?: Maybe<Array<Document>>;
  employerDetailsRequired?: Maybe<Scalars['Boolean']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  history?: Maybe<Array<RtrHistory>>;
  id: Scalars['String']['output'];
  job?: Maybe<Job>;
  notes?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  photoIdRequired?: Maybe<Scalars['Boolean']['output']>;
  recruiter: RecruiterProfile;
  referencesRequired?: Maybe<Scalars['Boolean']['output']>;
  resumeRequired?: Maybe<Scalars['Boolean']['output']>;
  rtrTemplate: RtrTemplate;
  signedAt?: Maybe<Scalars['DateTime']['output']>;
  skillsRequired?: Maybe<Scalars['Boolean']['output']>;
  status: RtrStatus;
  updatedAt: Scalars['DateTime']['output'];
  viewedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RtrHistory = {
  __typename?: 'RTRHistory';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  rtr: Rtr;
  rtrId: Scalars['String']['output'];
  user: User;
  userAgent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type RtrHistoryResponse = {
  __typename?: 'RTRHistoryResponse';
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  rtrId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

/** The status of a Right to Represent agreement */
export enum RtrStatus {
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Sent = 'SENT',
  Signed = 'SIGNED',
  Viewed = 'VIEWED'
}

export type RecruiterProfile = {
  __typename?: 'RecruiterProfile';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  jobs?: Maybe<Array<Job>>;
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  rtrs?: Maybe<Array<Rtr>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RecruiterProfileResponse = {
  __typename?: 'RecruiterProfileResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  linkedinUrl?: Maybe<Scalars['String']['output']>;
  organizationId?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String']['input'];
};

export type RegisterInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

/** The remote work preference of a candidate */
export enum RemotePreference {
  Any = 'ANY',
  HybridOnly = 'HYBRID_ONLY',
  OnSiteOnly = 'ON_SITE_ONLY',
  RemoteOnly = 'REMOTE_ONLY'
}

export type RtrFiltersInput = {
  candidateName?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  jobTitle?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<RtrStatus>;
};

export type RtrResponse = {
  __typename?: 'RtrResponse';
  candidate: CandidateProfile;
  candidateEmail: Scalars['String']['output'];
  candidateFirstName: Scalars['String']['output'];
  candidateId?: Maybe<Scalars['String']['output']>;
  candidateLastName: Scalars['String']['output'];
  candidatePhone: Scalars['String']['output'];
  compensation: Scalars['Float']['output'];
  compensationType: CompensationType;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById: Scalars['String']['output'];
  employerDetailsRequired: Scalars['Boolean']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  job?: Maybe<JobResponse>;
  jobId: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  organizationId: Scalars['String']['output'];
  photoIdRequired: Scalars['Boolean']['output'];
  recruiter: RecruiterProfile;
  recruiterId: Scalars['String']['output'];
  referencesRequired: Scalars['Boolean']['output'];
  resumeRequired: Scalars['Boolean']['output'];
  rtrTemplate?: Maybe<RtrTemplateResponse>;
  rtrTemplateId: Scalars['String']['output'];
  signedAt?: Maybe<Scalars['DateTime']['output']>;
  skillsRequired: Scalars['Boolean']['output'];
  status: RtrStatus;
  updatedAt: Scalars['DateTime']['output'];
  viewedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RtrTemplate = {
  __typename?: 'RtrTemplate';
  author: User;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  html?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
  rtrs?: Maybe<Array<Rtr>>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RtrTemplateCandidateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type RtrTemplateResponse = {
  __typename?: 'RtrTemplateResponse';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  html: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  text: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SearchOptionsInput = {
  /** Attributes to crop */
  attributesToCrop?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Attributes to highlight */
  attributesToHighlight?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Attributes to retrieve */
  attributesToRetrieve?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Crop length for text */
  cropLength?: InputMaybe<Scalars['Int']['input']>;
  /** Filter string or array */
  filter?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Highlight post-tag */
  highlightPostTag?: InputMaybe<Scalars['String']['input']>;
  /** Highlight pre-tag */
  highlightPreTag?: InputMaybe<Scalars['String']['input']>;
  /** Number of results to return */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Pagination offset */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Sort criteria */
  sort?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchResultType = {
  __typename?: 'SearchResultType';
  /** Estimated total number of hits */
  estimatedTotalHits: Scalars['Int']['output'];
  /** Search result hits */
  hits: Array<Scalars['String']['output']>;
  /** Number of results returned */
  limit: Scalars['Int']['output'];
  /** Pagination offset */
  offset: Scalars['Int']['output'];
  /** Processing time in milliseconds */
  processingTimeMs: Scalars['Int']['output'];
  /** Search query */
  query: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  amount: Scalars['Float']['output'];
  autoRenew: Scalars['Boolean']['output'];
  billingInterval: BillingInterval;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Array<Payment>>;
  plan: SubscriptionPlan;
  planId: Scalars['String']['output'];
  planType: PlanType;
  startDate: Scalars['DateTime']['output'];
  status: SubscriptionStatus;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type SubscriptionPlan = {
  __typename?: 'SubscriptionPlan';
  billingInterval: BillingInterval;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  features: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  maxJobs: Scalars['Float']['output'];
  maxRTRs: Scalars['Float']['output'];
  maxUsers: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  planType: PlanType;
  price: Scalars['Float']['output'];
  stripePriceId?: Maybe<Scalars['String']['output']>;
  stripeProductId?: Maybe<Scalars['String']['output']>;
  subscriptions?: Maybe<Array<Subscription>>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Inactive = 'INACTIVE',
  PastDue = 'PAST_DUE',
  Unpaid = 'UNPAID'
}

export type UpdateCandidateProfileInput = {
  id: Scalars['String']['input'];
};

export type UpdateJobApplicationInput = {
  coverLetter?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ApplicationStatus>;
};

export type UpdateJobInput = {
  id: Scalars['String']['input'];
};

export type UpdateNotificationInput = {
  id: Scalars['String']['input'];
};

export type UpdateOrganizationInput = {
  companySize?: InputMaybe<CompanySize>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  industry?: InputMaybe<Scalars['String']['input']>;
  linkedinUrl?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOverviewInput = {
  /** Overview ID */
  id: Scalars['String']['input'];
  /** Include detailed breakdowns */
  includeDetailedBreakdowns?: InputMaybe<Scalars['Boolean']['input']>;
  /** Include monthly metrics */
  includeMonthlyMetrics?: InputMaybe<Scalars['Boolean']['input']>;
  /** Organization ID */
  organizationId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRtrInput = {
  id: Scalars['String']['input'];
};

export type UpdateRecruiterProfileInput = {
  id: Scalars['String']['input'];
};

export type UpdateRtrTemplateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  html?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  cancelledAt?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<SubscriptionStatus>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  candidateProfile?: Maybe<CandidateProfile>;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['String']['output']>;
  createdRtrTemplates?: Maybe<Array<RtrTemplate>>;
  createdUsers?: Maybe<Array<User>>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Notification>>;
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Array<Payment>>;
  phone?: Maybe<Scalars['String']['output']>;
  recruiterProfile?: Maybe<RecruiterProfile>;
  role: UserRole;
  rtrHistory?: Maybe<Array<RtrHistory>>;
  rtrs?: Maybe<Array<Rtr>>;
  subscriptions?: Maybe<Array<Subscription>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

/** The role of the user in the system */
export enum UserRole {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE',
  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationOwner = 'ORGANIZATION_OWNER',
  Recruiter = 'RECRUITER',
  RecruiterManager = 'RECRUITER_MANAGER'
}

/** The type of work arrangement for a job */
export enum WorkType {
  Hybrid = 'HYBRID',
  OnSite = 'ON_SITE',
  Remote = 'REMOTE'
}

export type JobQueryFragmentFragment = { __typename?: 'JobResponse', id: string, jobId?: string | null, organizationId?: string | null, title: string, description: string, company: string, location: string, workType: WorkType, jobType: JobType, compensation: CompensationType, salaryMin?: number | null, salaryMax?: number | null, recruiterId: string, benefits: Array<string>, requirements: Array<string>, createdAt: any, updatedAt: any, expiresAt?: any | null, status: JobStatus };

export type CreateJobMutationVariables = Exact<{
  createJobInput: CreateJobInput;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'JobResponse', id: string, title: string, company: string, description: string, location: string, workType: WorkType, jobType: JobType, compensation: CompensationType, salaryMin?: number | null, salaryMax?: number | null, benefits: Array<string>, recruiterId: string, organizationId?: string | null, status: JobStatus, expiresAt?: any | null, createdAt: any } };

export type CreateRtrTemplateMutationVariables = Exact<{
  createRtrTemplateInput: CreateRtrTemplateInput;
}>;


export type CreateRtrTemplateMutation = { __typename?: 'Mutation', createRtrTemplate: { __typename?: 'RtrTemplate', id: string, name: string, description?: string | null, text?: string | null, html?: string | null, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string }, author: { __typename?: 'User', id: string, name?: string | null } } };

export type CreateRtrMutationVariables = Exact<{
  input: CreateRtrInput;
}>;


export type CreateRtrMutation = { __typename?: 'Mutation', createRtr: { __typename?: 'RtrResponse', id: string, status: RtrStatus, expiresAt?: any | null, signedAt?: any | null, viewedAt?: any | null, createdAt: any, updatedAt: any, resumeRequired: boolean, photoIdRequired: boolean, employerDetailsRequired: boolean, referencesRequired: boolean, skillsRequired: boolean, job?: { __typename?: 'JobResponse', id: string, title: string, description: string } | null, recruiter: { __typename?: 'RecruiterProfile', id: string }, rtrTemplate?: { __typename?: 'RtrTemplateResponse', id: string, name: string, description: string } | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', expiresAt: any, tokenType: string, accessToken: string, refreshToken: string, user: { __typename?: 'AuthUser', id: string, name: string, role: UserRole, isActive: boolean, isEmailVerified: boolean, organization?: { __typename?: 'Org', id: string } | null } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshTokenInput: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Auth', tokenType: string, accessToken: string, refreshToken: string, expiresAt: any, user: { __typename?: 'AuthUser', id: string, name: string, role: UserRole, isActive: boolean, isEmailVerified: boolean, organization?: { __typename?: 'Org', id: string } | null } } };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Auth', accessToken: string, refreshToken: string, user: { __typename?: 'AuthUser', id: string, name: string, role: UserRole, isActive: boolean, isEmailVerified: boolean, organization?: { __typename?: 'Org', id: string } | null } } };

export type GetCompiledRtrTemplateQueryVariables = Exact<{
  input: CompiledRtrTemplateInput;
}>;


export type GetCompiledRtrTemplateQuery = { __typename?: 'Query', compiledRtrTemplate: { __typename?: 'RtrTemplateResponse', id: string, name: string, description: string, text: string, html: string, createdAt: any, updatedAt: any } };

export type JobDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type JobDetailQuery = { __typename?: 'Query', job: { __typename?: 'JobResponse', id: string, jobId?: string | null, organizationId?: string | null, title: string, description: string, company: string, location: string, workType: WorkType, jobType: JobType, compensation: CompensationType, salaryMin?: number | null, salaryMax?: number | null, recruiterId: string, benefits: Array<string>, requirements: Array<string>, createdAt: any, updatedAt: any, expiresAt?: any | null, status: JobStatus, recruiter: { __typename?: 'User', id: string, name?: string | null, email: string, phone?: string | null }, organization: { __typename?: 'Organization', id: string, name: string, website?: string | null, linkedinUrl?: string | null, logo?: string | null } } };

export type ListJobsQueryVariables = Exact<{
  filters: JobListFiltersInput;
}>;


export type ListJobsQuery = { __typename?: 'Query', jobs: { __typename?: 'JobResponsePaginated', total: number, page: number, data: Array<{ __typename?: 'JobResponse', id: string, jobId?: string | null, organizationId?: string | null, title: string, description: string, company: string, location: string, workType: WorkType, jobType: JobType, compensation: CompensationType, salaryMin?: number | null, salaryMax?: number | null, recruiterId: string, benefits: Array<string>, requirements: Array<string>, createdAt: any, updatedAt: any, expiresAt?: any | null, status: JobStatus }> } };

export type ListRtrTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListRtrTemplatesQuery = { __typename?: 'Query', rtrTemplates: Array<{ __typename?: 'RtrTemplate', id: string, name: string, description?: string | null, text?: string | null, html?: string | null, createdAt: any, updatedAt: any, organization: { __typename?: 'Organization', id: string }, author: { __typename?: 'User', id: string, name?: string | null } }> };

export type ListRtrsQueryVariables = Exact<{
  filters?: InputMaybe<RtrFiltersInput>;
}>;


export type ListRtrsQuery = { __typename?: 'Query', rtrs: Array<{ __typename?: 'RtrResponse', id: string, candidateFirstName: string, candidateLastName: string, candidateEmail: string, candidatePhone: string, compensation: number, compensationType: CompensationType, status: RtrStatus, jobId: string, recruiterId: string, rtrTemplateId: string, candidateId?: string | null, createdById: string, expiresAt?: any | null, job?: { __typename?: 'JobResponse', id: string, title: string, company: string } | null, createdBy?: { __typename?: 'User', id: string, name?: string | null } | null }> };

export type OverviewQueryVariables = Exact<{
  query?: InputMaybe<OverviewQueryInput>;
}>;


export type OverviewQuery = { __typename?: 'Query', overview: { __typename?: 'Overview', id: string, organizationId: string, totalRtrs: number, pendingRtrs: number, signedRtrs: number, expiredRtrs: number, rejectedRtrs: number, totalCandidates: number, totalRecruiters: number, totalOrganizations: number, totalJobs: number, activeJobs: number, closedJobs: number, totalJobApplications: number, reviewingApplications: number, interviewingApplications: number, acceptedApplications: number, rejectedApplications: number, rtrsThisMonth: number, jobsThisMonth: number, applicationsThisMonth: number, totalUsers: number } };

export type RecentRtrsQueryVariables = Exact<{
  filters?: InputMaybe<RtrFiltersInput>;
}>;


export type RecentRtrsQuery = { __typename?: 'Query', rtrs: Array<{ __typename?: 'RtrResponse', id: string, candidateFirstName: string, candidateLastName: string, candidateEmail: string, candidatePhone: string, compensation: number, compensationType: CompensationType, status: RtrStatus, recruiterId: string, rtrTemplateId: string, candidateId?: string | null, createdById: string, expiresAt?: any | null, signedAt?: any | null, job?: { __typename?: 'JobResponse', id: string, title: string, company: string } | null, createdBy?: { __typename?: 'User', id: string, name?: string | null } | null }> };

export type RtrTemplateDetailQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RtrTemplateDetailQuery = { __typename?: 'Query', rtrTemplate: { __typename?: 'RtrTemplate', id: string, name: string, description?: string | null, text?: string | null, html?: string | null } };

export const JobQueryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JobQueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JobResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"workType"}},{"kind":"Field","name":{"kind":"Name","value":"jobType"}},{"kind":"Field","name":{"kind":"Name","value":"compensation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMin"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMax"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<JobQueryFragmentFragment, unknown>;
export const CreateJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createJobInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createJobInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"workType"}},{"kind":"Field","name":{"kind":"Name","value":"jobType"}},{"kind":"Field","name":{"kind":"Name","value":"compensation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMin"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMax"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateJobMutation, CreateJobMutationVariables>;
export const CreateRtrTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRtrTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createRtrTemplateInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRtrTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRtrTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRtrTemplateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createRtrTemplateInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateRtrTemplateMutation, CreateRtrTemplateMutationVariables>;
export const CreateRtrDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createRtr"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRtrInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRtr"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createRtrInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"signedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"resumeRequired"}},{"kind":"Field","name":{"kind":"Name","value":"photoIdRequired"}},{"kind":"Field","name":{"kind":"Name","value":"employerDetailsRequired"}},{"kind":"Field","name":{"kind":"Name","value":"referencesRequired"}},{"kind":"Field","name":{"kind":"Name","value":"skillsRequired"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recruiter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rtrTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<CreateRtrMutation, CreateRtrMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"tokenType"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshTokenInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshTokenInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshTokenInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenType"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetCompiledRtrTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCompiledRtrTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompiledRtrTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"compiledRtrTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"compiledTemplateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetCompiledRtrTemplateQuery, GetCompiledRtrTemplateQueryVariables>;
export const JobDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"jobDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JobQueryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"recruiter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"linkedinUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JobQueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JobResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"workType"}},{"kind":"Field","name":{"kind":"Name","value":"jobType"}},{"kind":"Field","name":{"kind":"Name","value":"compensation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMin"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMax"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<JobDetailQuery, JobDetailQueryVariables>;
export const ListJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobListFiltersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JobQueryFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JobQueryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JobResponse"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"workType"}},{"kind":"Field","name":{"kind":"Name","value":"jobType"}},{"kind":"Field","name":{"kind":"Name","value":"compensation"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMin"}},{"kind":"Field","name":{"kind":"Name","value":"salaryMax"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"benefits"}},{"kind":"Field","name":{"kind":"Name","value":"requirements"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ListJobsQuery, ListJobsQueryVariables>;
export const ListRtrTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listRtrTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rtrTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ListRtrTemplatesQuery, ListRtrTemplatesQueryVariables>;
export const ListRtrsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"listRtrs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RtrFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rtrs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"candidateFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"candidateLastName"}},{"kind":"Field","name":{"kind":"Name","value":"candidateEmail"}},{"kind":"Field","name":{"kind":"Name","value":"candidatePhone"}},{"kind":"Field","name":{"kind":"Name","value":"compensation"}},{"kind":"Field","name":{"kind":"Name","value":"compensationType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"rtrTemplateId"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"company"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ListRtrsQuery, ListRtrsQueryVariables>;
export const OverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"overview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OverviewQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"overview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"totalRtrs"}},{"kind":"Field","name":{"kind":"Name","value":"pendingRtrs"}},{"kind":"Field","name":{"kind":"Name","value":"signedRtrs"}},{"kind":"Field","name":{"kind":"Name","value":"expiredRtrs"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedRtrs"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecruiters"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecruiters"}},{"kind":"Field","name":{"kind":"Name","value":"totalOrganizations"}},{"kind":"Field","name":{"kind":"Name","value":"totalJobs"}},{"kind":"Field","name":{"kind":"Name","value":"activeJobs"}},{"kind":"Field","name":{"kind":"Name","value":"closedJobs"}},{"kind":"Field","name":{"kind":"Name","value":"totalJobApplications"}},{"kind":"Field","name":{"kind":"Name","value":"reviewingApplications"}},{"kind":"Field","name":{"kind":"Name","value":"interviewingApplications"}},{"kind":"Field","name":{"kind":"Name","value":"acceptedApplications"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedApplications"}},{"kind":"Field","name":{"kind":"Name","value":"rtrsThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"jobsThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"totalUsers"}}]}}]}}]} as unknown as DocumentNode<OverviewQuery, OverviewQueryVariables>;
export const RecentRtrsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentRtrs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RtrFiltersInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rtrs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"candidateFirstName"}},{"kind":"Field","name":{"kind":"Name","value":"candidateLastName"}},{"kind":"Field","name":{"kind":"Name","value":"candidateEmail"}},{"kind":"Field","name":{"kind":"Name","value":"candidatePhone"}},{"kind":"Field","name":{"kind":"Name","value":"compensation"}},{"kind":"Field","name":{"kind":"Name","value":"compensationType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"recruiterId"}},{"kind":"Field","name":{"kind":"Name","value":"rtrTemplateId"}},{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"createdById"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"signedAt"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"company"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RecentRtrsQuery, RecentRtrsQueryVariables>;
export const RtrTemplateDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"rtrTemplateDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rtrTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}}]}}]}}]} as unknown as DocumentNode<RtrTemplateDetailQuery, RtrTemplateDetailQueryVariables>;