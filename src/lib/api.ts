import { getClient, getPublicClient } from "./apollo-client";
import {
	AuthUser,
	CompiledRtrTemplateInput,
	CreateJobDocument,
	CreateJobInput,
	CreateJobMutation,
	CreateJobMutationVariables,
	GetCompiledRtrTemplateDocument,
	GetCompiledRtrTemplateQuery,
	GetCompiledRtrTemplateQueryVariables,
	JobDetailDocument,
	JobDetailQuery,
	JobDetailQueryVariables,
	ListJobsDocument,
	ListJobsQuery,
	ListJobsQueryVariables,
	LoginDocument,
	LoginMutation,
	LoginMutationVariables,
	OverviewDocument,
	OverviewQuery,
	OverviewQueryVariables,
	RecentRtrsDocument,
	RecentRtrsQuery,
	RecentRtrsQueryVariables,
	RefreshTokenDocument,
	RefreshTokenMutation,
	RefreshTokenMutationVariables,
	RtrDetailDocument,
	RtrDetailQuery,
	RtrDetailQueryVariables,
} from "@/graphql/generated/graphql";
import { ApiHelper } from "./api-helper";

class Api extends ApiHelper {
	async login(email: string, password: string) {
		const client = getPublicClient();
		const { data } = await client.mutate<LoginMutation, LoginMutationVariables>({ mutation: LoginDocument, variables: { loginInput: { email, password } } });
		if (!data || !data.login) throw new Error("Login failed");
		const { accessToken, refreshToken, tokenType, expiresAt, user } = data.login;
		return { accessToken, refreshToken, tokenType, expiresAt, user: this.getUserObject(user as AuthUser) };
	}

	async createJob(job: CreateJobInput) {
		try {
			const client = getClient();
			const { data } = await client.mutate<CreateJobMutation, CreateJobMutationVariables>({ mutation: CreateJobDocument, variables: { createJobInput: job } });
			if (!data || !data.createJob) throw new Error("Create job failed");
			return data.createJob;
		} catch (error: any) {
			console.error("Create job failed:", error);
			throw error;
		}
	}

	async listJobs(page: number, limit: number) {
		const client = getClient();
		const { data } = await client.query<ListJobsQuery, ListJobsQueryVariables>({ query: ListJobsDocument, variables: { filters: { page, limit } } });
		if (!data || !data.jobs) throw new Error("List jobs failed");
		return data.jobs;
	}

	async getJobDetail(id: string) {
		const client = getClient();
		const { data, error } = await client.query<JobDetailQuery, JobDetailQueryVariables>({ query: JobDetailDocument, variables: { id } });
		if (error) throw new Error(error.message);
		if (!data || !data.job) throw new Error("Get job detail failed");
		return data.job;
	}

	async refreshToken(refreshToken: string) {
		const client = getPublicClient();
		const { data, error } = await client.mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
			mutation: RefreshTokenDocument,
			variables: { refreshTokenInput: { refreshToken } },
		});
		if (error) throw new Error("Token refresh failed");
		if (!data || !data.refreshToken) throw new Error("Token refresh failed");
		const { accessToken, refreshToken: newRefreshToken, user, expiresAt } = data.refreshToken;
		return { accessToken, refreshToken: newRefreshToken, user: this.getUserObject(user as AuthUser), expiresAt };
	}

	async getOverview() {
		const client = getClient();
		const { data, error } = await client.query<OverviewQuery, OverviewQueryVariables>({ query: OverviewDocument });
		if (error) throw new Error(error.message);
		if (!data || !data.overview) throw new Error("Get overview failed");
		return data.overview;
	}

	async getRecentRtrs() {
		const client = getClient();
		const { data, error } = await client.query<RecentRtrsQuery, RecentRtrsQueryVariables>({ query: RecentRtrsDocument });
		if (error) throw new Error(error.message);
		if (!data || !data.rtrs) throw new Error("Get recent RTRs failed");
		return data.rtrs;
	}

	async getRecentJobs() {
		const client = getClient();
		const { data, error } = await client.query<ListJobsQuery, ListJobsQueryVariables>({ query: ListJobsDocument, variables: { filters: { page: 1, limit: 5 } } });
		if (error) throw new Error(error.message);
		if (!data || !data.jobs) throw new Error("Get recent jobs failed");
		return data.jobs;
	}

	async getRtrDetail(id: string) {
		const client = getClient();
		const { data, error } = await client.query<RtrDetailQuery, RtrDetailQueryVariables>({ query: RtrDetailDocument, variables: { id } });
		if (error) throw new Error(error.message);
		if (!data || !data.rtr) throw new Error("Get RTR detail failed");
		return data.rtr;
	}

	async getCompiledRtrTemplateDetail(input: CompiledRtrTemplateInput) {
		const client = getClient();
		const query = GetCompiledRtrTemplateDocument;
		const variables = { input };
		const { data, error } = await client.query<GetCompiledRtrTemplateQuery, GetCompiledRtrTemplateQueryVariables>({ query, variables });
		if (error) throw new Error(error.message);
		if (!data || !data.compiledRtrTemplate) throw new Error("Get RTR template detail failed");
		return data.compiledRtrTemplate;
	}
}

export const api = new Api();
