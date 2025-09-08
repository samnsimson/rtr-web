import { getClient } from "./apollo-client";
import { AuthUser, LoginDocument, LoginMutation, LoginMutationVariables } from "@/graphql/generated/graphql";
import { ApiHelper } from "./api-helper";

class Api extends ApiHelper {
	async login(email: string, password: string) {
		const client = await getClient();
		const { data } = await client.mutate<LoginMutation, LoginMutationVariables>({ mutation: LoginDocument, variables: { loginInput: { email, password } } });
		if (!data || !data.login) throw new Error("Login failed");
		const { accessToken, refreshToken, user } = data.login;
		return { accessToken, refreshToken, user: this.getUserObject(user as AuthUser) };
	}
}

export const api = new Api();
