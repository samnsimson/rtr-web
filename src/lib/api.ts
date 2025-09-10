import { getClient } from "./apollo-client";
import {
	AuthUser,
	CreateJobDocument,
	CreateJobInput,
	CreateJobMutation,
	CreateJobMutationVariables,
	ListJobsDocument,
	ListJobsQuery,
	ListJobsQueryVariables,
	LoginDocument,
	LoginMutation,
	LoginMutationVariables,
	RefreshTokenDocument,
	RefreshTokenMutation,
	RefreshTokenMutationVariables,
} from "@/graphql/generated/graphql";
import { ApiHelper } from "./api-helper";

class Api extends ApiHelper {
	async login(email: string, password: string) {
		const client = await getClient();
		const { data } = await client.mutate<LoginMutation, LoginMutationVariables>({ mutation: LoginDocument, variables: { loginInput: { email, password } } });
		if (!data || !data.login) throw new Error("Login failed");
		const { accessToken, refreshToken, user } = data.login;
		return { accessToken, refreshToken, user: this.getUserObject(user as AuthUser) };
	}

	async createJob(job: CreateJobInput) {
		try {
			const client = await getClient();
			const { data } = await client.mutate<CreateJobMutation, CreateJobMutationVariables>({ mutation: CreateJobDocument, variables: { createJobInput: job } });
			if (!data || !data.createJob) throw new Error("Create job failed");
			return data.createJob;
		} catch (error: any) {
			console.error("Create job failed:", error);
			throw error;
		}
	}

	async listJobs(page: number, limit: number) {
		const client = await getClient();
		const { data } = await client.query<ListJobsQuery, ListJobsQueryVariables>({ query: ListJobsDocument, variables: { pagination: { page, limit } } });
		if (!data || !data.jobs) throw new Error("List jobs failed");
		return data.jobs;
	}

	async refreshToken(refreshToken: string) {
		const client = await getClient();
		const { data } = await client.mutate<RefreshTokenMutation, RefreshTokenMutationVariables>({
			mutation: RefreshTokenDocument,
			variables: { refreshTokenInput: { refreshToken } },
		});
		if (!data || !data.refreshToken) throw new Error("Token refresh failed");
		const { accessToken, refreshToken: newRefreshToken, user } = data.refreshToken;
		return { accessToken, refreshToken: newRefreshToken, user: this.getUserObject(user as AuthUser) };
	}
}

export const api = new Api();
